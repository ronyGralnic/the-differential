"""
Payback Meter - proof of concept (pure Python, standard library only).

Claim A (attribute): the real cost of every request can be measured from the serving loop itself
  (GPU time per decode step, shared by the requests in the batch in proportion to the memory they hold),
  and it differs a lot from "average cost per token".
Claim B (margin): real gross margin per customer and per use can be computed from that cost and the price
  list, and a healthy average can hide uses that barely pay or lose money.
Claim C (payback): a "payback clock" per model version can be computed from the weekly gross profit of that
  version and the week its successor ships.
Claim D (privacy): an industry-level export can be produced without any customer-level number leaving
  the provider (k-anonymity: a segment is published only if it holds at least K customers).

Four labs (run(scenario) for the website):
  1. attribute - one hour of a synthetic serving cluster: activity-based cost vs. average cost per token
  2. margin    - gross margin per customer, real vs. naive
  3. payback   - weeks to pay back the training cost of one model version, for three successor dates
  4. privacy   - what an aggregated export contains, and what it suppresses

HONESTY: the cluster, the customers, their requests, the prices and the training cost are SYNTHETIC
(fixed seed 11). The cost model is deliberately simple: a decode step costs a fixed part plus a part that
grows with the KV-cache tokens held in the batch (decode is memory-bound). Real serving stacks are more
complex; the method (measure per step, allocate by what each request holds) is the point, not the dollars.
"""
import random, json, math

SEED = 11
GPU_HOUR_USD = 2.10            # synthetic all-in cost: chip amortisation + power + hosting, per GPU-hour
GPUS = 8
BASE_STEP_S = 0.030            # fixed part of one decode step
KV_STEP_S = 0.0000008          # extra seconds per KV-cache token held in the batch, per step
PREFILL_S_PER_TOK = 0.00002    # prefill is fast and parallel
MAX_BATCH = 32
PRICE = {"in": 3.0, "out": 15.0, "cached": 0.30}   # USD per million tokens (synthetic price list)

CUSTOMERS = [  # name, requests per hour, input tokens (mean), output tokens (mean), cached share of input
    ("chat",   900,   300,  250, 0.0),
    ("search", 600,  3000,  150, 0.0),
    ("docs",   120, 20000,  200, 0.0),
    ("coder",   80, 60000, 1500, 0.5),
    ("agent",  700,  8000,  300, 0.9),
]

def requests(seed=SEED):
    rng = random.Random(seed); out = []
    for name, n, tin, tout, cached in CUSTOMERS:
        for _ in range(n):
            i = max(20, int(rng.gauss(tin, tin * 0.25))); o = max(10, int(rng.gauss(tout, tout * 0.3)))
            out.append({"c": name, "in": i, "out": o, "cached": int(i * cached), "t": rng.uniform(0, 3600)})
    out.sort(key=lambda r: r["t"]); return out

def price(r):
    return (r["in"] - r["cached"]) * PRICE["in"] / 1e6 + r["cached"] * PRICE["cached"] / 1e6 + r["out"] * PRICE["out"] / 1e6

def serve(reqs):
    """Continuous batching on GPUS identical lanes. Returns gpu-seconds per request (activity-based)."""
    lanes = [[] for _ in range(GPUS)]
    for k, r in enumerate(reqs): lanes[k % GPUS].append(r)
    for lane in lanes:
        queue = list(lane); active = []
        while queue or active:
            while queue and len(active) < MAX_BATCH:
                r = queue.pop(0); r["gpu_s"] = (r["in"] - r["cached"]) * PREFILL_S_PER_TOK; r["left"] = r["out"]; r["kv"] = r["in"]; active.append(r)
            kv_total = sum(a["kv"] for a in active)
            step = BASE_STEP_S + KV_STEP_S * kv_total
            for a in active:                       # fixed part shared equally, memory part by KV held
                a["gpu_s"] += BASE_STEP_S / len(active) + KV_STEP_S * kv_total * (a["kv"] / kv_total)
                a["left"] -= 1; a["kv"] += 1
            active = [a for a in active if a["left"] > 0]
    for r in reqs: r["cost"] = r["gpu_s"] * GPU_HOUR_USD / 3600
    return reqs

_SERVED = {}
def lab_attribute():
    if "rs" not in _SERVED: _SERVED["rs"] = serve(requests())   # simulate once, reuse in every lab
    rs = _SERVED["rs"]; tot_cost = sum(r["cost"] for r in rs); tot_tok = sum(r["in"] + r["out"] for r in rs)
    per_tok = tot_cost / tot_tok
    by = {}
    for r in rs:
        b = by.setdefault(r["c"], {"n": 0, "cost": 0.0, "naive": 0.0, "rev": 0.0})
        b["n"] += 1; b["cost"] += r["cost"]; b["naive"] += (r["in"] + r["out"]) * per_tok; b["rev"] += price(r)
    rows = {c: {"requests": v["n"], "cost_usd": round(v["cost"], 2), "naive_usd": round(v["naive"], 2),
                "naive_error_pct": round((v["naive"] - v["cost"]) / v["cost"] * 100, 1)} for c, v in by.items()}
    worst = max(rows, key=lambda c: abs(rows[c]["naive_error_pct"]))
    return {"requests": len(rs), "gpu_hours": round(sum(r["gpu_s"] for r in rs) / 3600, 2), "total_cost_usd": round(tot_cost, 2),
            "rows": rows, "worst": worst, "worst_error_pct": rows[worst]["naive_error_pct"], "_by": by}

def lab_margin():
    a = lab_attribute(); by = a["_by"]
    rev = sum(v["rev"] for v in by.values()); cost = sum(v["cost"] for v in by.values())
    rows = {c: {"revenue_usd": round(v["rev"], 2), "real_margin_pct": round((v["rev"] - v["cost"]) / v["rev"] * 100, 1),
                "naive_margin_pct": round((v["rev"] - v["naive"]) / v["rev"] * 100, 1)} for c, v in by.items()}
    thin = min(rows, key=lambda c: rows[c]["real_margin_pct"])
    return {"revenue_usd": round(rev, 2), "cost_usd": round(cost, 2), "gross_margin_pct": round((rev - cost) / rev * 100, 1),
            "rows": rows, "thinnest": thin, "thinnest_pct": rows[thin]["real_margin_pct"]}

TRAIN_COST_M = 1200.0       # synthetic training cost of one model version, USD millions
WEEKLY_REV_M = 90.0         # synthetic weekly revenue of that version at its peak, USD millions

def payback(weeks_to_successor, margin_pct, horizon=52):
    """Weekly gross profit at the peak until the successor ships; then 60% of users move within two weeks,
    and the rest leave at 10% a week. Returns weeks to pay back (or None) and the share recovered."""
    gp = WEEKLY_REV_M * margin_pct / 100; got = 0.0; share = 1.0; back = None
    for w in range(1, horizon + 1):
        if w > weeks_to_successor: share *= 0.55 if w - weeks_to_successor <= 2 else 0.90
        got += gp * share
        if back is None and got >= TRAIN_COST_M: back = w
    return back, round(min(got, 10 * TRAIN_COST_M) / TRAIN_COST_M * 100, 1)

def lab_payback():
    m = lab_margin()["gross_margin_pct"]
    rows = {str(w): dict(zip(("payback_week", "recovered_pct"), payback(w, m))) for w in (8, 16, 26)}
    need = math.ceil(TRAIN_COST_M / (WEEKLY_REV_M * m / 100))
    return {"margin_pct": m, "train_cost_m": TRAIN_COST_M, "weekly_rev_m": WEEKLY_REV_M, "weeks_needed_at_peak": need, "rows": rows}

K = 2   # with only 5 synthetic customers; a real deployment would use K >= 5
def lab_privacy():
    seg = {"chat": "consumer", "search": "consumer", "docs": "enterprise", "coder": "developer", "agent": "developer"}
    by = lab_attribute()["_by"]; out = {}
    for c, v in by.items():
        s = out.setdefault(seg[c], {"customers": 0, "rev": 0.0, "cost": 0.0}); s["customers"] += 1; s["rev"] += v["rev"]; s["cost"] += v["cost"]
    pub, sup = {}, []
    for s, v in out.items():
        if v["customers"] >= K: pub[s] = {"customers": v["customers"], "margin_pct": round((v["rev"] - v["cost"]) / v["rev"] * 100)}
        else: sup.append(s)
    ids_leaked = sum(1 for s in pub for c in seg if c in json.dumps(pub[s]))
    return {"k": K, "segments": len(out), "published": pub, "suppressed": sup, "customer_ids_in_export": ids_leaked}

def run_all():
    a = lab_attribute(); a.pop("_by")
    return {"attribute": a, "margin": lab_margin(), "payback": lab_payback(), "privacy": lab_privacy()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: attribute | margin | payback | privacy."""
    ev, ck = [], []
    if sc == "attribute":
        r = lab_attribute(); rows = r["rows"]
        lo = min(rows, key=lambda c: rows[c]["naive_error_pct"]); hi = max(rows, key=lambda c: rows[c]["naive_error_pct"])
        ev += [_ev("Q", "S", "serve", f"{r['requests']} requests from 5 customers in one hour, continuous batching on {GPUS} GPUs", f"{r['requests']} שאילתות"),
               _ev("S", "M", "measure", f"every decode step timed and shared by the KV-cache tokens each request holds: {r['gpu_hours']} GPU-hours", f"{r['gpu_hours']} שעות שבב", ok=True),
               _ev("M", "L", "cost", f"total cost ${r['total_cost_usd']} (synthetic ${GPU_HOUR_USD}/GPU-hour)", f"${r['total_cost_usd']}"),
               _ev("M", "L", "naive", f"average cost per token vs. the meter: '{lo}' {rows[lo]['naive_error_pct']:+}% (under-costed), '{hi}' {rows[hi]['naive_error_pct']:+}% (over-costed)", f"{rows[lo]['naive_error_pct']:+}% / {rows[hi]['naive_error_pct']:+}%", bad=True)]
        ck += [["every_request_costed", True], ["naive_differs", abs(r["worst_error_pct"]) > 25]]
    elif sc == "margin":
        r = lab_margin(); t = r["thinnest"]
        ev += [_ev("L", "D", "total", f"revenue ${r['revenue_usd']}, cost ${r['cost_usd']}: gross margin {r['gross_margin_pct']}%", f"{r['gross_margin_pct']}%", ok=True)]
        for c, v in r["rows"].items():
            ev.append(_ev("L", "D", c, f"{c}: real {v['real_margin_pct']}% (naive {v['naive_margin_pct']}%)", f"{v['real_margin_pct']}%", bad=v["real_margin_pct"] < 50))
        ev.append(_ev("D", "D", "hidden", f"the thinnest use is '{t}' at {r['thinnest_pct']}%, invisible in the average", f"{r['thinnest_pct']}%", bad=True))
        ck += [["margin_per_customer", True], ["average_hides_thin", r["thinnest_pct"] < r["gross_margin_pct"] - 20]]
    elif sc == "payback":
        r = lab_payback()
        ev += [_ev("D", "P", "inputs", f"one model version: training ${r['train_cost_m']:.0f}M, ${r['weekly_rev_m']:.0f}M a week at its peak, margin {r['margin_pct']}%", f"{r['weeks_needed_at_peak']} שבועות בשיא")]
        for w, v in r["rows"].items():
            pb = v["payback_week"]
            ev.append(_ev("P", "P", f"w{w}", f"successor after {w} weeks: " + (f"paid back in week {pb}" if pb else "never paid back within a year") + f", {v['recovered_pct']}% recovered", f"{v['recovered_pct']}%", ok=bool(pb), bad=not pb))
        ck += [["clock_computed", True], ["window_matters", r["rows"]["8"]["recovered_pct"] < r["rows"]["26"]["recovered_pct"]]]
    elif sc == "privacy":
        r = lab_privacy()
        ev += [_ev("D", "X", "aggregate", f"{r['segments']} segments built from 5 customers", f"{r['segments']} פלחים"),
               _ev("X", "X", "publish", "published: " + ", ".join(f"{s} ({v['customers']} customers, margin {v['margin_pct']}%)" for s, v in r["published"].items()), f"{len(r['published'])} פורסמו", ok=True),
               _ev("X", "X", "suppress", "suppressed (too few customers to hide one): " + (", ".join(r["suppressed"]) or "none"), f"{len(r['suppressed'])} הוסתרו"),
               _ev("X", "X", "leak", f"customer names or per-customer numbers in the export: {r['customer_ids_in_export']}", f"{r['customer_ids_in_export']} דליפות", ok=r["customer_ids_in_export"] == 0)]
        ck += [["no_customer_leak", r["customer_ids_in_export"] == 0], ["small_segments_suppressed", len(r["suppressed"]) >= 1]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), indent=1, ensure_ascii=False))

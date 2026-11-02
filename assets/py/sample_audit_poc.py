"""
Removal Sample Audit - proof of concept (pure Python, standard library only).

Question: can a random sample of a few hundred deletions per district tell us,
with a known margin of error, what share of ALL deletions in that district were
wrong (the person was still an eligible resident)?

Four labs:
  1. precision  - sample size vs margin of error (Wilson 95% interval)
  2. coverage   - repeat the audit 2,000 times: how often does the interval contain the truth?
  3. stratify   - one "absent / shifted / other" bucket hides very different error rates
  4. ground     - who verifies each sampled case? if the field check is done by the
                  same machinery that deleted, a share of wrong deletions is "confirmed".

HONESTY: the districts, the deletions and the true error rates are SYNTHETIC
(seeded, deterministic). No real voter data is used. The statistics are real.
The same file runs natively and inside the browser (Pyodide).
"""
import random, math, json

Z = 1.959964
REASONS = [("dead", 0.03), ("duplicate", 0.08), ("absent_shifted_other", 0.19)]

def wilson(k, n, z=Z):
    if n == 0: return (0.0, 0.0, 1.0)
    p = k / n; d = 1 + z * z / n
    c = (p + z * z / (2 * n)) / d
    h = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d
    return (p, max(0.0, c - h), min(1.0, c + h))

def make_district(seed, size=120_000, mix=(0.18, 0.12, 0.70), rates=None):
    """A district's deletion list. Each deletion has a reason code and a hidden truth: wrong (1) or right (0)."""
    rng = random.Random(seed)
    rates = rates or {r: e for r, e in REASONS}
    out = []
    for i in range(size):
        u = rng.random()
        reason = REASONS[0][0] if u < mix[0] else REASONS[1][0] if u < mix[0] + mix[1] else REASONS[2][0]
        wrong = 1 if rng.random() < rates[reason] else 0
        out.append((reason, wrong))
    return out

def true_rate(d, reason=None):
    xs = [w for r, w in d if reason is None or r == reason]
    return sum(xs) / len(xs)

def audit(d, n, rng, confirm_bias=0.0):
    """Sample n deletions, verify each. confirm_bias = probability that a WRONG deletion is
    wrongly 'confirmed' by a field check run by the same machinery that deleted."""
    s = rng.sample(d, n); k = 0
    for reason, wrong in s:
        if wrong and rng.random() >= confirm_bias: k += 1
    return wilson(k, n)

def lab_precision(seed=7):
    d = make_district(seed); t = true_rate(d); rng = random.Random(seed + 1)
    rows = []
    for n in (100, 300, 600, 1000, 1500, 3000):
        p, lo, hi = audit(d, n, rng)
        rows.append({"n": n, "est": round(p * 100, 2), "lo": round(lo * 100, 2), "hi": round(hi * 100, 2), "moe": round((hi - lo) * 50, 2)})
    return {"truth": round(t * 100, 2), "size": len(d), "rows": rows}

def lab_coverage(seed=11, n=1500, reps=2000):
    d = make_district(seed); t = true_rate(d); rng = random.Random(seed + 2); hit = 0; widths = []
    for _ in range(reps):
        p, lo, hi = audit(d, n, rng)
        hit += lo <= t <= hi; widths.append(hi - lo)
    return {"truth": round(t * 100, 2), "n": n, "reps": reps, "coverage": round(hit / reps * 100, 1), "avg_moe": round(sum(widths) / reps * 50, 2)}

def lab_stratify(seed=19, n_per=500):
    d = make_district(seed); rng = random.Random(seed + 3); out = []
    for reason, _ in REASONS:
        sub = [x for x in d if x[0] == reason]
        p, lo, hi = audit(sub, n_per, rng)
        out.append({"reason": reason, "count": len(sub), "truth": round(true_rate(sub) * 100, 2), "est": round(p * 100, 2), "lo": round(lo * 100, 2), "hi": round(hi * 100, 2)})
    p, lo, hi = audit(d, 1500, rng)
    return {"overall": {"truth": round(true_rate(d) * 100, 2), "est": round(p * 100, 2), "lo": round(lo * 100, 2), "hi": round(hi * 100, 2)}, "by_reason": out}

def lab_ground(seed=23, n=1500, reps=400):
    d = make_district(seed); t = true_rate(d); out = []
    for bias in (0.0, 0.1, 0.25, 0.4, 0.6):
        rng = random.Random(seed + int(bias * 100)); ests = []; cover = 0
        for _ in range(reps):
            p, lo, hi = audit(d, n, rng, confirm_bias=bias); ests.append(p); cover += lo <= t <= hi
        out.append({"bias": bias, "est": round(sum(ests) / reps * 100, 2), "coverage": round(cover / reps * 100, 1)})
    return {"truth": round(t * 100, 2), "rows": out}

def run_all():
    return {"precision": lab_precision(), "coverage": lab_coverage(), "stratify": lab_stratify(), "ground": lab_ground()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: precision | coverage | stratify | ground. Browser-sized repetitions; the full runs are in run_all()."""
    ev, ck = [], []
    if sc == "precision":
        r = lab_precision()
        ev.append(_ev("L", "S", "district", f"synthetic district: {r['size']:,} deletions, hidden truth {r['truth']}% wrong", "120,000 מחיקות"))
        for row in r["rows"]:
            ev.append(_ev("S", "E", f"n={row['n']}", f"sample {row['n']:>5}: estimate {row['est']}%  [{row['lo']}, {row['hi']}]  margin ±{row['moe']}", f"±{row['moe']}", ok=row["n"] == 1500))
        m1500 = [x for x in r["rows"] if x["n"] == 1500][0]["moe"]
        ck.append(["precise", m1500 < 2.5])
    elif sc == "coverage":
        r = lab_coverage(reps=300)
        ev += [_ev("L", "S", "repeat", f"300 independent audits of 1,500 cases each (full run: 2,000 audits, 94.8%)", "300 ביקורות"),
               _ev("S", "F", "check", "each case checked in the field by an honest checker", "בודק הוגן"),
               _ev("F", "E", "interval", f"95% interval contained the truth {r['coverage']}% of the time; mean margin ±{r['avg_moe']}", f"{r['coverage']}%", ok=r["coverage"] >= 92)]
        ck.append(["honest", r["coverage"] >= 92])
    elif sc == "stratify":
        r = lab_stratify()
        ev.append(_ev("L", "S", "strata", "three strata: dead, duplicate, the opaque 'absent, shifted or other' bucket", "שלוש שכבות"))
        for b in r["by_reason"]:
            ev.append(_ev("S", "E", b["reason"][:9], f"{b['reason']:>22}: estimate {b['est']}% (truth {b['truth']}%) of {b['count']:,}", f"{b['est']}%", ok=b["lo"] <= b["truth"] <= b["hi"]))
        big = max(r["by_reason"], key=lambda b: b["est"])
        ev.append(_ev("E", "R", "where", f"most wrong deletions sit in: {big['reason']}", "הסל המעורבב", ok=True))
        ck.append(["bucket", big["reason"] == "absent_shifted_other"])
    elif sc == "ground":
        r = lab_ground(reps=120)
        ev.append(_ev("L", "F", "checkers", f"same district, truth {r['truth']}%; now the field checker belongs to the machinery that deleted", "בודק מהמנגנון"))
        for row in r["rows"]:
            ev.append(_ev("F", "E", f"{int(row['bias']*100)}%", f"checker 'confirms' {int(row['bias']*100):>2}% of wrong deletions -> estimate {row['est']}%, interval covers truth {row['coverage']}%", f"{row['est']}%", bad=row["coverage"] < 50))
        ev.append(_ev("E", "R", "warning", "the interval stays narrow and convincing; nothing in the number shows the bias", "רצועה צרה, במקום הלא נכון", bad=True))
        ck.append(["ground", r["rows"][2]["coverage"] < 20])
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1))

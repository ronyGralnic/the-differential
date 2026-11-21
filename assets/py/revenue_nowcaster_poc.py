"""
Revenue Nowcaster - proof of concept (pure Python, standard library only).

Claim A (signals): single alternative-data proxies disagree about growth, so none of them can be read alone.
Claim B (fuse): a small state-space model (a Kalman filter on the log of revenue, with a level and a growth
  rate) can fuse the proxies into one monthly estimate with an honest uncertainty band.
Claim C (turn): the fused estimate notices a slowdown months before a quarterly report would.
Open question D (truth): the proxies must be calibrated against the true revenue. How good is the
  nowcast when the true number is known only from a few scattered "run-rate" announcements?

Four labs (run(scenario) for the website):
  1. signals  - three proxies, three different growth stories
  2. fuse     - the filter, calibrated on monthly truth: error and band coverage
  3. turn     - when does the nowcast flag the slowdown, versus a report three months later
  4. truth    - the same filter, calibrated only on sparse announcements (the real-world situation)

HONESTY: the "true" revenue path, the proxies, their biases and noise are SYNTHETIC (fixed seed 5).
The true path is shaped to echo the reported story (about 80-90% growth per three months in the spring,
about 12% in October), but every number here is invented. The method is the point.
"""
import random, math, json

SEED = 5
MONTHS = 22                       # Jan 2025 .. Oct 2026

def truth_path():
    """Monthly revenue (USD bn per month), growth slowing from ~25% to ~3.7% a month during 2026."""
    g = [0.24 + 0.02 * (t % 2) if t < 13 else max(0.037, 0.26 - (t - 13) * 0.038) for t in range(MONTHS)]
    rev = [0.85]
    for t in range(1, MONTHS): rev.append(rev[-1] * (1 + g[t]))
    return rev, g

def proxies(rev, seed=SEED):
    """Three proxies in log space, each with its own bias, drift and noise.
    card  : company card spend, small firms only, their share falls 2.5%/month -> under-reads growth
    router: tokens routed via an API gateway, prices fall 4%/month -> over-reads growth
    panel : social posts and panels, noisy and one month late"""
    rng = random.Random(seed); P = {"card": [], "router": [], "panel": []}
    for t, r in enumerate(rev):
        lr = math.log(r)
        P["card"].append(lr - 1.9 - 0.025 * t + rng.gauss(0, 0.03))
        P["router"].append(lr + 2.3 + 0.04 * t + rng.gauss(0, 0.03))
        P["panel"].append((math.log(rev[t - 1]) if t else lr) + 0.4 + rng.gauss(0, 0.08))
    return P

def growth3(series):  # three-month growth from a log series, in %
    return [round((math.exp(series[t] - series[t - 3]) - 1) * 100, 1) if t >= 3 else None for t in range(len(series))]

def calibrate(P, rev, idx, defn_noise=0.0, defn_bias=0.0, seed=SEED):
    """Least squares per proxy: proxy - log(truth) = a + b*t, using only the months in idx.
    defn_noise: announced numbers are run-rates with mixed definitions; we add that noise to the truth."""
    rng = random.Random(seed + 1); cal = {}
    obs = {t: math.log(rev[t]) + math.log(1 + defn_bias) + rng.gauss(0, defn_noise) for t in idx}
    for k, ys in P.items():
        xs = [t for t in idx]; d = [ys[t] - obs[t] for t in idx]
        n = len(xs); mx = sum(xs) / n; md = sum(d) / n
        sxx = sum((x - mx) ** 2 for x in xs) or 1e-9
        b = sum((x - mx) * (y - md) for x, y in zip(xs, d)) / sxx; a = md - b * mx
        res = [y - (a + b * x) for x, y in zip(xs, d)]
        sd = math.sqrt(sum(e * e for e in res) / max(1, n - 2)) if n > 2 else 0.05
        cal[k] = (a, b, max(sd, 0.03))
    return cal

def kalman(P, cal):
    """Local linear trend on log revenue. State [level, slope]. Returns mean and sd of the level per month."""
    x = [P["card"][0] - cal["card"][0], 0.2]; Pm = [[1.0, 0.0], [0.0, 0.05]]
    q_l, q_s = 0.0004, 0.0009; out = []
    for t in range(MONTHS):
        if t:  # predict
            x = [x[0] + x[1], x[1]]
            Pm = [[Pm[0][0] + 2 * Pm[0][1] + Pm[1][1] + q_l, Pm[0][1] + Pm[1][1]], [Pm[0][1] + Pm[1][1], Pm[1][1] + q_s]]
        for k, ys in P.items():  # update with each calibrated proxy
            a, b, sd = cal[k]; shift = -1 if k == "panel" else 0
            z = ys[t] - (a + b * t); R = sd * sd
            if k == "panel":
                if t == 0: continue
                z -= x[1]                       # panel reads last month's level
            S = Pm[0][0] + R; K0, K1 = Pm[0][0] / S, Pm[1][0] / S; y = z - x[0]
            x = [x[0] + K0 * y, x[1] + K1 * y]
            Pm = [[(1 - K0) * Pm[0][0], (1 - K0) * Pm[0][1]], [Pm[1][0] - K1 * Pm[0][0], Pm[1][1] - K1 * Pm[0][1]]]
        out.append((x[0], math.sqrt(max(Pm[0][0], 1e-9)), x[1]))
    return out

def score(est, rev, start=6):
    err = [abs(math.exp(m) - r) / r * 100 for (m, s, g), r in zip(est, rev)][start:]
    cov = [abs(m - math.log(r)) <= 1.645 * s for (m, s, g), r in zip(est, rev)][start:]
    wid = [(math.exp(1.645 * s) - math.exp(-1.645 * s)) * 100 for (m, s, g) in est][start:]
    return round(sum(err) / len(err), 1), round(sum(cov) / len(cov) * 100), round(sum(wid) / len(wid), 1)

def lab_signals():
    rev, g = truth_path(); P = proxies(rev); t = MONTHS - 1
    tr = growth3([math.log(r) for r in rev])
    return {"month": "Oct 2026", "truth_3m_pct": tr[t], "card_3m_pct": growth3(P["card"])[t], "router_3m_pct": growth3(P["router"])[t], "panel_3m_pct": growth3(P["panel"])[t]}

def lab_fuse():
    rev, g = truth_path(); P = proxies(rev); cal = calibrate(P, rev, list(range(MONTHS)))
    est = kalman(P, cal); mape, cov, wid = score(est, rev)
    m, s, gr = est[-1]
    return {"mape_pct": mape, "coverage_pct": cov, "band_width_pct": wid, "oct_est_bn_month": round(math.exp(m), 1), "oct_true_bn_month": round(rev[-1], 1),
            "oct_band": [round(math.exp(m - 1.645 * s), 1), round(math.exp(m + 1.645 * s), 1)]}

def lab_turn():
    rev, g = truth_path(); P = proxies(rev); cal = calibrate(P, rev, list(range(MONTHS)))
    est = kalman(P, cal)
    true_turn = next(t for t in range(13, MONTHS) if g[t] < 0.15)           # true monthly growth below 15%
    flag = next((t for t in range(13, MONTHS) if est[t][2] < 0.15), None)   # nowcast slope below 15%
    report = ((true_turn // 3) + 1) * 3 + 1                                   # the quarter's report, a month after it ends
    names = ["ינו 25", "פבר 25", "מרץ 25", "אפר 25", "מאי 25", "יוני 25", "יולי 25", "אוג 25", "ספט 25", "אוק 25", "נוב 25", "דצמ 25",
             "ינו 26", "פבר 26", "מרץ 26", "אפר 26", "מאי 26", "יוני 26", "יולי 26", "אוג 26", "ספט 26", "אוק 26", "נוב 26", "דצמ 26", "ינו 27"]
    return {"true_turn": names[true_turn], "nowcast_flag": names[flag] if flag is not None else None, "report": names[min(report, len(names) - 1)],
            "lead_months": (report - flag) if flag is not None else None, "lag_vs_truth": (flag - true_turn) if flag is not None else None}

def lab_truth():
    rev, g = truth_path(); P = proxies(rev)
    ann = [2, 7, 11, 14, 17, 20]                                             # six scattered run-rate announcements
    cal = calibrate(P, rev, ann, defn_noise=0.06, defn_bias=0.06)          # run-rate is not recognised revenue
    est = kalman(P, cal); mape, cov, wid = score(est, rev)
    full = lab_fuse()
    return {"announcements": len(ann), "definition_bias_pct": 6, "definition_noise_pct": 6, "mape_pct": mape, "coverage_pct": cov, "band_width_pct": wid,
            "mape_monthly_truth": full["mape_pct"], "coverage_monthly_truth": full["coverage_pct"], "band_monthly_truth": full["band_width_pct"]}

def lab_truth_table(repeats=30):
    """Error and band coverage by the number of run-rate announcements (random months, averaged), next to exact monthly truth.
    Used by the spec's live knob. The driver turns out to be the definition gap, not only the count."""
    rev, g = truth_path(); P = proxies(rev); rng = random.Random(9); rows = []
    e, c, w = score(kalman(P, calibrate(P, rev, list(range(MONTHS)))), rev); rows.append([MONTHS, "exact", e, c])
    for n in (16, 12, 8, 6, 4):
        E = C = 0
        for r in range(repeats):
            idx = sorted(rng.sample(range(MONTHS), n))
            e, c, w = score(kalman(P, calibrate(P, rev, idx, defn_noise=0.06, defn_bias=0.06, seed=100 + r)), rev); E += e; C += c
        rows.append([n, "run-rate", round(E / repeats, 1), round(C / repeats)])
    return rows

def run_all():
    return {"signals": lab_signals(), "fuse": lab_fuse(), "turn": lab_turn(), "truth": lab_truth(), "truth_table": lab_truth_table()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: signals | fuse | turn | truth."""
    ev, ck = [], []
    if sc == "signals":
        r = lab_signals()
        ev += [_ev("C", "F", "card", f"card spend says three-month growth in {r['month']}: {r['card_3m_pct']}%", f"{r['card_3m_pct']}%"),
               _ev("R", "F", "router", f"API router traffic says: {r['router_3m_pct']}%", f"{r['router_3m_pct']}%"),
               _ev("N", "F", "panel", f"panels and posts say: {r['panel_3m_pct']}%", f"{r['panel_3m_pct']}%"),
               _ev("T", "T", "truth", f"the synthetic truth: {r['truth_3m_pct']}%", f"{r['truth_3m_pct']}%", bad=True)]
        spread = max(r["card_3m_pct"], r["router_3m_pct"], r["panel_3m_pct"]) - min(r["card_3m_pct"], r["router_3m_pct"], r["panel_3m_pct"])
        ck += [["proxies_disagree", spread > 8]]
    elif sc == "fuse":
        r = lab_fuse()
        ev += [_ev("F", "F", "calib", "each proxy calibrated against monthly truth: bias and drift removed", "כיול חודשי"),
               _ev("F", "O", "estimate", f"Oct 2026: estimate {r['oct_est_bn_month']}bn/month, 90% band {r['oct_band'][0]}-{r['oct_band'][1]}, truth {r['oct_true_bn_month']}", f"{r['oct_est_bn_month']}", ok=True),
               _ev("O", "T", "score", f"mean error {r['mape_pct']}%, the band holds the truth {r['coverage_pct']}% of months", f"{r['mape_pct']}% · {r['coverage_pct']}%", ok=r["coverage_pct"] >= 80)]
        ck += [["filter_runs", True], ["error_small", r["mape_pct"] < 8], ["band_honest", r["coverage_pct"] >= 80]]
    elif sc == "turn":
        r = lab_turn()
        ev += [_ev("T", "T", "turn", f"the true slowdown starts: {r['true_turn']}", r["true_turn"], bad=True),
               _ev("F", "O", "flag", f"the nowcast flags it: {r['nowcast_flag']} ({r['lag_vs_truth']} months after it starts)", r["nowcast_flag"] or "-", ok=True),
               _ev("O", "O", "report", f"a quarterly report would show it: {r['report']}, {r['lead_months']} months later", f"+{r['lead_months']} חודשים")]
        ck += [["slowdown_flagged", r["nowcast_flag"] is not None], ["earlier_than_report", (r["lead_months"] or 0) > 0]]
    elif sc == "truth":
        r = lab_truth()
        ev += [_ev("T", "F", "sparse", f"only {r['announcements']} run-rate announcements in 22 months; a run-rate reads ~{r['definition_bias_pct']}% above booked revenue, give or take {r['definition_noise_pct']}%", f"{r['announcements']} נקודות", bad=True),
               _ev("F", "O", "estimate", f"mean error {r['mape_pct']}% (was {r['mape_monthly_truth']}% with monthly truth)", f"{r['mape_pct']}%", bad=r["mape_pct"] > r["mape_monthly_truth"] * 1.5),
               _ev("O", "T", "score", f"the band holds the truth {r['coverage_pct']}% of months (was {r['coverage_monthly_truth']}%), band width {r['band_width_pct']}% (was {r['band_monthly_truth']}%)", f"{r['coverage_pct']}%", bad=r["coverage_pct"] < 80)]
        ck += [["sparse_measured", True], ["truth_gap_found", r["coverage_pct"] < r["coverage_monthly_truth"] or r["mape_pct"] > 2 * r["mape_monthly_truth"]]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), indent=1, ensure_ascii=False))

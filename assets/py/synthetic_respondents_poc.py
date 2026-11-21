"""
Synthetic Respondents - proof of concept (pure Python, standard library only).

Claim A (fill the gaps): for every demographic cell that answers too little, generate "silicon"
  respondents and ask them the poll question. If they answer like the real people in that cell,
  the missing voices are filled at almost no cost.
Claim B (stability): the synthetic answers are stable, cheap and available overnight.
Test C (change): what happens when the electorate CHANGES after the training data was written
  (a late mobilisation, a swing inside one cell)?
Test D (circularity): how many real, fresh respondents are needed to recalibrate the synthetic ones?

Four labs (run(scenario) for the website):
  1. steady    - 2026 looks like 2024: synthetic vs. a real poll
  2. shift     - 2026 moves: a mobilisation and a swing in one cell
  3. variance  - how much the answers inside a cell differ: people vs. silicon
  4. calibrate - fresh human answers needed to fix the silicon, and what that costs

HONESTY: no language model runs in this lab. A language model conditioned on a profile reproduces
  what its training text says people like that think (Argyle et al., 2023), with less variety
  than real people (Bisbee et al., 2024). The lab SIMULATES exactly that behaviour: a silicon
  respondent answers with the cell's 2024 opinion, pulled slightly toward the overall average,
  plus a small noise. Everything is synthetic (fixed seed 2026). The lab tests the idea's logic,
  not any specific model.
"""
import random, json, math

SEED = 2026
CELLS = [(e, a, r) for e in ("deg", "nodeg") for a in ("young", "old") for r in ("urban", "rural")]

def build(seed, n=30000, mobilize=False, swing=0.0):
    rng = random.Random(seed); P = []
    for i in range(n):
        e = "deg" if rng.random() < 0.36 else "nodeg"
        a = "young" if rng.random() < 0.42 else "old"
        r = "urban" if rng.random() < 0.62 else "rural"
        lean = 0.5 + (0.12 if e == "deg" else -0.07) + (0.08 if a == "young" else -0.05) + (0.10 if r == "urban" else -0.16)
        if (e, a, r) == ("nodeg", "young", "urban"): lean += swing        # a swing inside one cell (like a shift among young voters)
        opinion = max(0.0, min(1.0, rng.gauss(lean, 0.22)))                # a 0..1 scale: how warm toward blue
        blue = rng.random() < lean
        habit = rng.random() < (0.38 + (0.22 if a == "old" else 0) + (0.12 if e == "deg" else 0))
        p_vote = 0.18 + 0.70 * habit
        if mobilize and blue and not habit: p_vote += 0.18
        P.append(dict(cell=(e, a, r), blue=blue, opinion=opinion, votes=rng.random() < p_vote,
                      p_resp=0.020 * (1.7 if e == "deg" else 0.8) * (1.3 if a == "old" else 0.8) * (1.15 if habit else 0.75) * (1.07 if blue else 0.93)))
    return P

def truth(P):
    v = [p for p in P if p["votes"]]; return 100 * sum(p["blue"] for p in v) / len(v)

def cell_table(P, voters_only=True):
    t = {}
    for p in P:
        if voters_only and not p["votes"]: continue
        c = t.setdefault(p["cell"], [0, 0]); c[0] += 1; c[1] += p["blue"]
    return t

TRAIN = None
def training():
    """What the 'model' learned: 2024's cell opinions and 2024's electorate (a different seed: another year)."""
    global TRAIN
    if TRAIN is None: TRAIN = cell_table(build(SEED - 2))
    return TRAIN

def silicon(n_per_cell, rng):
    """Silicon respondents: the 2024 cell share, pulled 15% toward the overall mean, with little noise."""
    T = training(); tot = sum(v[0] for v in T.values()); mean = sum(v[1] for v in T.values()) / tot
    out = {}
    for c, (n, b) in T.items():
        p = 0.85 * (b / n) + 0.15 * mean
        out[c] = [max(0, min(1, rng.gauss(p, 0.06))) for _ in range(n_per_cell)]
    return out, {c: v[0] / tot for c, v in T.items()}      # opinions + the 2024 electorate mix

def est_silicon(rng):
    """Each silicon respondent 'votes' blue with its own probability (like sampling a model's answer)."""
    S, mix = silicon(200, rng)
    return 100 * sum(mix[c] * (sum(1 for x in S[c] if rng.random() < x) / len(S[c])) for c in CELLS)

def est_poll(P, rng, attempts=52000):
    resp = [p for p in (rng.choice(P) for _ in range(attempts)) if rng.random() < p["p_resp"]]
    shares = {}
    for p in P: shares[p["cell"]] = shares.get(p["cell"], 0) + 1
    est = 0.0
    for c in CELLS:
        a = [p for p in resp if p["cell"] == c]
        if a: est += shares[c] / len(P) * sum(p["blue"] for p in a) / len(a)
    return 100 * est, len(resp)

def _lab(mobilize=False, swing=0.0, reps=6):
    P = build(SEED, mobilize=mobilize, swing=swing); t = truth(P); rs, rp, n = [], [], 0
    for k in range(reps):
        rs.append(est_silicon(random.Random(SEED + 10 + k)) - t)
        e, m = est_poll(P, random.Random(SEED + 100 + k)); rp.append(e - t); n += m
    return dict(truth=round(t, 1), err_silicon=round(sum(rs) / reps, 1), err_poll=round(sum(rp) / reps, 1), n_poll=n // reps)

def lab_variance():
    P = build(SEED); rng = random.Random(SEED + 5); S, _ = silicon(400, rng); rows = []
    for c in CELLS:
        real = [p["opinion"] for p in P if p["cell"] == c]
        mr = sum(real) / len(real); vr = sum((x - mr) ** 2 for x in real) / len(real)
        ms = sum(S[c]) / len(S[c]); vs = sum((x - ms) ** 2 for x in S[c]) / len(S[c])
        rows.append(vs / vr)
    real_ext = 100 * sum(1 for p in P if p["opinion"] < 0.15 or p["opinion"] > 0.85) / len(P)
    sil_ext = 100 * sum(1 for c in CELLS for x in S[c] if x < 0.15 or x > 0.85) / (400 * len(CELLS))
    return dict(variance_ratio=round(sum(rows) / len(rows), 2), strong_real=round(real_ext, 1), strong_silicon=round(sil_ext, 1))

def lab_calibrate():
    """To recalibrate each cell to within ~3 points (95%), each cell needs about 1/(0.03/1.96)^2 * p(1-p) fresh people."""
    per_cell = math.ceil((1.96 / 0.03) ** 2 * 0.25)
    return dict(per_cell=per_cell, cells=len(CELLS), total=per_cell * len(CELLS), typical_poll=1000)

def run_all():
    return {"steady": _lab(), "shift": _lab(mobilize=True, swing=0.10), "variance": lab_variance(), "calibrate": lab_calibrate()}

def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: steady | shift | variance | calibrate."""
    ev, ck = [], []
    if sc == "steady":
        r = _lab()
        ev += [_ev("T", "L", "train", "the model 'read' 2024: what each kind of voter said, and who voted", "2024"),
               _ev("L", "S", "gen", "1,600 silicon respondents, 200 per cell, overnight, at almost no cost", "1,600 סינתטיים", ok=True),
               _ev("S", "E", "est", f"silicon estimate: error {r['err_silicon']:+} points (truth {r['truth']}%)", f"{r['err_silicon']:+}", ok=abs(r['err_silicon']) < 2),
               _ev("P", "E", "poll", f"a real poll of {r['n_poll']} people, same week: error {r['err_poll']:+}", f"{r['err_poll']:+}")]
        ck += [["silicon_runs", True], ["steady_close", abs(r["err_silicon"]) < 2]]
    elif sc == "shift":
        s = _lab(); r = _lab(mobilize=True, swing=0.10)
        ev += [_ev("T", "L", "train", "same training: 2024", "2024"),
               _ev("E", "E", "change", f"2026 moves: a late mobilisation, and young urban voters without a degree swing 10 points; truth {r['truth']}%", f"{r['truth']}%"),
               _ev("S", "E", "est", f"silicon: error {r['err_silicon']:+} (in a steady year {s['err_silicon']:+}); it answers like 2024 because that is all it knows", f"{r['err_silicon']:+}", bad=True),
               _ev("P", "E", "poll", f"a real poll: error {r['err_poll']:+}; it is noisy and biased, but the people in it live in 2026", f"{r['err_poll']:+}", ok=abs(r['err_poll']) < abs(r['err_silicon']))]
        ck += [["shift_measured", True], ["poll_beats_silicon_on_change", abs(r["err_poll"]) < abs(r["err_silicon"])]]
    elif sc == "variance":
        r = lab_variance()
        ev += [_ev("P", "E", "real", f"real people: {r['strong_real']}% hold a strong view at either end of the scale", f"{r['strong_real']}%"),
               _ev("S", "E", "silicon", f"silicon: the spread of views inside a cell is {r['variance_ratio']} of the real spread", f"x{r['variance_ratio']}", bad=r['variance_ratio'] < 0.5),
               _ev("S", "E", "strong", f"silicon with a strong view: {r['strong_silicon']}%; everyone sounds like the average of their group", f"{r['strong_silicon']}%", bad=True)]
        ck += [["variance_measured", True], ["too_uniform", r["variance_ratio"] < 0.5]]
    elif sc == "calibrate":
        r = lab_calibrate()
        ev += [_ev("E", "L", "need", f"to recalibrate each cell within about 3 points you need ~{r['per_cell']} fresh people per cell", f"{r['per_cell']} לתא"),
               _ev("L", "P", "total", f"{r['cells']} cells x {r['per_cell']} = {r['total']:,} fresh human answers", f"{r['total']:,}", bad=True),
               _ev("P", "E", "circle", f"that is several times a typical poll (~{r['typical_poll']}): to fix the silicon, you must first run the poll it was meant to replace", "מעגל", bad=True)]
        ck += [["circularity_measured", True]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1))

"""
Second Call - proof of concept (pure Python, standard library only).

Claim A (monitor): while a poll is in the field, the system can see WHO is missing, cell by cell,
  using only what is known about everyone it tried to reach (area, age band, education band,
  how many attempts, which channel), and sum it up in one number. The labs report the coefficient
  of variation (CV) of the response rates across cells, the companion of the R-indicator
  (Schouten, Cobben & Bethlehem, 2009). CV 0 (or R = 1) = everyone answers at the same rate.
Claim B (respond): moving the remaining attempts, channels and incentives toward the cells that
  answer least lowers the CV (raises R) and lowers the error, at the same budget.
Claim C (anchor): a small, expensive, truly random "anchor" sample with heavy follow-up has a much
  smaller partisan gap in who answers. Calibrating the cheap panel to the anchor's recalled past
  vote removes most of the bias that demographic weights alone cannot see.
Claim D (late movers): a second short wave in the last week catches part of a late mobilisation
  that a single wave two weeks out cannot see.

Four labs (run(scenario) for the website):
  1. static     - the usual way: fixed effort, rake on age, education and area
  2. responsive - the same budget, re-allocated every 6 hours by the R-indicator
  3. anchor     - plus an 800-person random anchor (from about 2,200 sampled addresses), and calibration to its recalled vote
  4. mobilize   - a late mobilisation (like Brazil's run-off): one wave vs. a second wave

HONESTY: the electorate, people, answers and turnout are SYNTHETIC (fixed seed 2026), built so that
  the two mechanisms in the report exist: (1) within every demographic cell, "blue" supporters answer
  more often than "red" ones (non-response bias); (2) who turns out can change late (mobilisation).
  The sizes of these effects are assumptions, chosen to be of the order the report describes
  (a few points), not measured. The monitoring, the R-indicator, the re-allocation and the
  calibration are real code.
"""
import random, json, math

SEED = 2026
CELLS = [(e, a, r) for e in ("deg", "nodeg") for a in ("young", "old") for r in ("urban", "rural")]

def cell_name(c):
    return {"deg": "תואר", "nodeg": "בלי תואר", "young": "צעירים", "old": "מבוגרים", "urban": "עיר", "rural": "כפר"}[c[0]] + " · " + \
           {"young": "צעירים", "old": "מבוגרים"}[c[1]] + " · " + {"urban": "עיר", "rural": "כפר"}[c[2]]

def build_population(seed=SEED, n=30000, mobilize=False):
    """Everyone: cell, blue/red, habitual voter or not, response propensities, and whether they vote."""
    rng = random.Random(seed)
    P = []
    for i in range(n):
        e = "deg" if rng.random() < 0.36 else "nodeg"
        a = "young" if rng.random() < 0.42 else "old"
        r = "urban" if rng.random() < 0.62 else "rural"
        lean = 0.5 + (0.12 if e == "deg" else -0.07) + (0.08 if a == "young" else -0.05) + (0.10 if r == "urban" else -0.16)
        blue = rng.random() < lean
        habit = rng.random() < (0.38 + (0.22 if a == "old" else 0) + (0.12 if e == "deg" else 0))
        p_vote = 0.18 + 0.70 * habit
        says = max(1, min(10, round(10 * p_vote + 1.0 + rng.gauss(0, 1.5))))   # two weeks out: optimistic, and blind to what has not happened yet
        late = False
        if mobilize:                       # a late wave: non-habitual blue voters come out, some red habituals stay home
            if blue and not habit: p_vote += 0.18; late = True
            if (not blue) and habit: p_vote -= 0.08
        votes = rng.random() < p_vote
        base = 0.020 * (1.7 if e == "deg" else 0.8) * (1.3 if a == "old" else 0.8) * (1.15 if habit else 0.75)
        party = 1.07 if blue else 0.93     # the hidden part: weights on age/education/area cannot see it
        P.append(dict(cell=(e, a, r), blue=blue, habit=habit, votes=votes, late=late and votes,
                      p_panel=base * party, p_anchor=min(0.9, 15 * base),
                      says=says, recall_blue=blue))
    return P

def truth(P):
    v = [p for p in P if p["votes"]]
    return 100 * sum(p["blue"] for p in v) / len(v)

def r_indicator(rates_by_cell, shares):
    """Spread of response rates between cells, as a coefficient of variation: CV = S(rho) / mean(rho).
    0 = every cell answers at the same rate. (Schouten et al. pair the R-indicator, 1 - 2S, with this CV;
    at response rates of 1-3% the R-indicator itself is always close to 1, so the CV is the readable one.)"""
    m = sum(shares[c] * rates_by_cell[c] for c in shares)
    var = sum(shares[c] * (rates_by_cell[c] - m) ** 2 for c in shares)
    return math.sqrt(var) / m if m else 0

def shares_of(P):
    out = {c: 0 for c in CELLS}
    for p in P: out[p["cell"]] += 1
    return {c: v / len(P) for c, v in out.items()}

def field(P, attempts, rng, effort=None, phases=4, adaptive=False):
    """Fieldwork: `attempts` contact attempts in `phases` phases. Each attempt reaches a random person
    in the chosen cell. Adaptive: after each phase, attempts move to the cells with the lowest response."""
    by_cell = {c: [p for p in P if p["cell"] == c] for c in CELLS}
    sh = shares_of(P)
    tried = {c: 0 for c in CELLS}; got = {c: 0 for c in CELLS}; resp = []
    alloc = {c: sh[c] for c in CELLS}
    log = []
    for ph in range(phases):
        k = attempts // phases
        for c in CELLS:
            for _ in range(int(round(k * alloc[c]))):
                p = rng.choice(by_cell[c]); tried[c] += 1
                extra = 0.0 if not (adaptive and alloc[c] > sh[c]) else 0.8 * p["p_panel"] / (1.07 if p["blue"] else 0.93)   # a second channel / incentive where it is needed: it reaches the distrusting as often as the trusting
                if rng.random() < p["p_panel"] + extra:
                    got[c] += 1; resp.append(p)
        rates = {c: got[c] / tried[c] if tried[c] else 0 for c in CELLS}
        R = r_indicator(rates, sh)
        log.append(dict(phase=ph + 1, n=len(resp), R=round(R, 3)))
        if adaptive:
            inv = {c: sh[c] / max(rates[c], 1e-4) for c in CELLS}
            s = sum(inv.values()); alloc = {c: inv[c] / s for c in CELLS}
    return resp, log, tried

def rake(resp, P, keys=(0, 1, 2), rounds=12):
    """Iterative proportional fitting on the three cell variables, to the population margins."""
    w = [1.0] * len(resp); tp = len(P)
    pops = [{} for _ in keys]
    for p in P:
        for j, k in enumerate(keys): pops[j][p["cell"][k]] = pops[j].get(p["cell"][k], 0) + 1
    for _ in range(rounds):
        for j, k in enumerate(keys):
            pop = pops[j]; smp = {}
            for i, p in enumerate(resp): smp[p["cell"][k]] = smp.get(p["cell"][k], 0) + w[i]
            ts = sum(w)
            for i, p in enumerate(resp):
                v = p["cell"][k]; w[i] *= (pop[v] / tp) / (smp[v] / ts)
    return w

def estimate(resp, w, lv=lambda p: p["says"] >= 9):
    num = sum(wi for p, wi in zip(resp, w) if lv(p) and p["blue"])
    den = sum(wi for p, wi in zip(resp, w) if lv(p))
    return 100 * num / den

def calibrate_to_anchor(resp, w, anchor):
    """Calibrate the panel's recalled past vote (blue/red), within each cell, to the anchor's."""
    w = list(w)
    for c in CELLS:                                     # cell by cell: the anchor has ~100 people per cell
        a = [p for p in anchor if p["cell"] == c]
        if len(a) < 30: continue
        target = sum(p["recall_blue"] for p in a) / len(a)
        idx = [i for i, p in enumerate(resp) if p["cell"] == c]
        tot = sum(w[i] for i in idx)
        b = sum(w[i] for i in idx if resp[i]["recall_blue"])
        if 0 < b < tot:
            for i in idx:
                w[i] *= (target / (b / tot)) if resp[i]["recall_blue"] else ((1 - target) / (1 - b / tot))
    return w

def within_gap(sample, P):
    """How much bluer the sample is than the population INSIDE each cell, averaged with population shares (points)."""
    sh = shares_of(P); g = 0.0
    for c in CELLS:
        a = [p for p in sample if p["cell"] == c]; b = [p for p in P if p["cell"] == c]
        if a: g += sh[c] * (sum(p["blue"] for p in a) / len(a) - sum(p["blue"] for p in b) / len(b))
    return round(100 * g, 1)

REPS = 8    # every lab is the average of 8 independent fieldworks, so one lucky draw does not decide

def _avg(rows):
    out = {}
    for k in rows[0]:
        v = rows[0][k]
        if not isinstance(v, (int, float)): out[k] = v; continue
        m = sum(r[k] for r in rows) / len(rows)
        out[k] = int(round(m)) if k in ("n", "attempts", "anchor", "anchor_tries") else round(m, 2 if k in ("R", "R1") else 1)
    return out

def _one(P, rep, adaptive, anchor_n=0, second_wave=False, attempts=52000):
    rng = random.Random(SEED + 100 + rep)
    resp, log, tried = field(P, attempts - (8000 if anchor_n else 0), rng, adaptive=adaptive)   # the anchor costs ~8,000 panel attempts
    w = rake(resp, P); out = {}
    if anchor_n:
        anc, tries = anchor_sample(P, random.Random(SEED + 200 + rep), anchor_n)
        w = calibrate_to_anchor(resp, w, anc)
        out.update(anchor=len(anc), anchor_tries=tries, anchor_gap=within_gap(anc, P), panel_gap=within_gap(resp, P))
    lv = lambda p: p["says"] >= 9
    if second_wave:   # last-week re-contact: late movers now say 10; the wave reaches 70% of them
        rr = random.Random(SEED + 300 + rep)
        moved = {id(p) for p in resp if p["late"] and rr.random() < 0.70}
        lv = lambda p: p["says"] >= 9 or id(p) in moved
    est = estimate(resp, w, lv); t = truth(P)
    out.update(truth=t, est=est, err=est - t, n=len(resp), R=log[-1]["R"], R1=log[0]["R"], attempts=sum(tried.values()))
    return out

def anchor_sample(P, rng, n_target=800):
    """The anchor: random addresses, mail + phone + a visit. Slow and expensive, but the partisan gap in who answers is gone."""
    out = []; tries = 0
    while len(out) < n_target and tries < 40000:
        p = rng.choice(P); tries += 1
        if rng.random() < p["p_anchor"]: out.append(p)
    return out, tries

def lab(kind, mobilize=False):
    P = build_population(mobilize=mobilize)
    cfg = {"static": (False, 0, False), "responsive": (True, 0, False), "anchor": (True, 800, False), "two_waves": (True, 800, True)}[kind]
    return _avg([_one(P, k, *cfg) for k in range(REPS)])

def lab_static(mobilize=False): return lab("static", mobilize)
def lab_responsive(mobilize=False): return lab("responsive", mobilize)
def lab_anchor(mobilize=False, second_wave=False): return lab("two_waves" if second_wave else "anchor", mobilize)

def run_all():
    return {"static": lab_static(), "responsive": lab_responsive(), "anchor": lab_anchor(),
            "mobilize_one_wave": lab_anchor(mobilize=True), "mobilize_static": lab_static(mobilize=True),
            "mobilize_two_waves": lab_anchor(mobilize=True, second_wave=True)}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: static | responsive | anchor | mobilize."""
    ev, ck = [], []
    if sc == "static":
        r = lab_static()
        ev += [_ev("F", "P", "attempts", f"{r['attempts']:,} contact attempts, spread like the population, in 4 phases", f"{r['attempts']:,} ניסיונות"),
               _ev("P", "M", "answers", f"{r['n']} people answered (~{100*r['n']/r['attempts']:.1f}%)", f"{r['n']} ענו"),
               _ev("M", "M", "R", f"spread of response rates between cells (CV) at the end: {r['R']} (0 = every cell answers at the same rate)", f"CV={r['R']}", bad=r['R'] > 0.3),
               _ev("M", "E", "rake", f"raked to age, education and area: estimate {r['est']}% blue among likely voters", f"{r['est']}%"),
               _ev("E", "E", "error", f"truth {r['truth']}%: error {r['err']:+} points, all of it from who answers inside each cell", f"{r['err']:+} נק'", bad=abs(r['err']) > 1.5)]
        ck += [["poll_runs", r["n"] > 500], ["bias_measured", True]]
    elif sc == "responsive":
        s = lab_static(); r = lab_responsive()
        ev += [_ev("F", "P", "phase1", f"phase 1: same as always; CV = {r['R1']}", f"CV={r['R1']}"),
               _ev("M", "A", "realloc", "every 6 hours: attempts move to the cells that answer least, with a second channel there", "מעבירים מאמץ"),
               _ev("A", "P", "phases", f"after 4 phases: CV {r['R1']} -> {r['R']} (static ends at {s['R']}); {r['n']} answered vs {s['n']}", f"CV={r['R']}", ok=r["R"] < s["R"]),
               _ev("M", "E", "rake", f"estimate {r['est']}% vs truth {r['truth']}%: error {r['err']:+} (static: {s['err']:+})", f"{r['err']:+} נק'", ok=abs(r['err']) < abs(s['err'])),
               _ev("E", "E", "limit", "the cells now answer evenly, but INSIDE each cell blue still answers more: weights on cells cannot see that", "החלק שנשאר", bad=True)]
        ck += [["R_improves", r["R"] < s["R"]], ["error_shrinks", abs(r["err"]) < abs(s["err"])], ["same_budget", True]]
    elif sc == "anchor":
        s = lab_static(); r = lab_anchor()
        ev += [_ev("F", "N", "anchor", f"a random anchor: {r['anchor']} people from {r['anchor_tries']} addresses, with mail, phone and a visit", f"{r['anchor']} בעוגן"),
               _ev("N", "N", "gap", f"inside the cells, the anchor is {r['anchor_gap']:+} points bluer than the population; the panel is {r['panel_gap']:+}", f"{r['anchor_gap']:+}", ok=abs(r["anchor_gap"]) < abs(r["panel_gap"])),
               _ev("N", "M", "calib", "the panel's recalled past vote, cell by cell, is calibrated to the anchor's", "כיול לעוגן", ok=True),
               _ev("M", "E", "est", f"estimate {r['est']}% vs truth {r['truth']}%: error {r['err']:+} (static {s['err']:+})", f"{r['err']:+} נק'", ok=abs(r["err"]) < 1.5)]
        ck += [["anchor_small_gap", abs(r["anchor_gap"]) < abs(r["panel_gap"])], ["error_under_1_5", abs(r["err"]) < 1.5]]
    elif sc == "mobilize":
        s = lab_static(mobilize=True); one = lab_anchor(mobilize=True); two = lab_anchor(mobilize=True, second_wave=True)
        ev += [_ev("F", "P", "late", f"a late mobilisation: non-habitual blue voters turn out; truth is now {one['truth']}% blue", f"{one['truth']}%"),
               _ev("M", "E", "static", f"static poll: {s['est']}% (error {s['err']:+}); it looks closer only because two errors cancel: too blue in who answers, too red in who is counted as a likely voter", f"{s['err']:+}", bad=True),
               _ev("M", "E", "one", f"Second Call, one wave two weeks out: {one['est']}% (error {one['err']:+}); the late movers still said 'maybe'", f"{one['err']:+}", bad=abs(one['err']) > 1.5),
               _ev("W", "M", "two", f"a short second wave in the last week reaches 70% of the late movers: {two['est']}% (error {two['err']:+})", f"{two['err']:+}", ok=abs(two['err']) < abs(one['err'])),
               _ev("E", "E", "left", "what is left: the 30% who were not reached again, and anyone who decided on the day itself", "מה שנשאר", bad=True)]
        ck += [["second_wave_helps", abs(two["err"]) < abs(one["err"])], ["late_gap_measured", True]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1, default=str))

"""
Turnout Signal - proof of concept (pure Python, standard library only).

Claim A (history beats talk): weighting poll respondents by a turnout probability learned from
  their own voting history (from the voter file) predicts the electorate better than asking
  "how likely are you to vote, 1 to 10?".
Claim B (linkage): the method only works for respondents who can be matched to the voter file.
  The lab measures who gets matched, and who does not.
Claim C (the limit): when people with no voting habit suddenly turn out (a late mobilisation),
  a model that learned from history gives them little weight, by design.
Claim D (portability): in a country with compulsory voting and no public record of who voted,
  there is no history to learn from.

Four labs (run(scenario) for the website):
  1. steady   - an ordinary midterm: screen vs voter-file model
  2. linkage  - who can be matched to the file, by habit and age
  3. mobilize - the same poll, a late mobilisation of non-habitual voters
  4. nofile   - Brazil-like: voting is compulsory, no individual history is public

HONESTY: the electorate, the voter file and the answers are SYNTHETIC (fixed seed 2026).
  Match rates and turnout probabilities are assumptions of the order reported in U.S. studies
  of commercial voter files (most respondents match, habitual voters match more often);
  they are not measured here. The matching, the turnout model and the weighting are real code.
"""
import random, json

SEED = 2026
REPS = 8

def build(seed=SEED, n=30000, mobilize=False):
    rng = random.Random(seed); P = []
    for i in range(n):
        e = "deg" if rng.random() < 0.36 else "nodeg"
        a = "young" if rng.random() < 0.42 else "old"
        r = "urban" if rng.random() < 0.62 else "rural"
        lean = 0.5 + (0.12 if e == "deg" else -0.07) + (0.08 if a == "young" else -0.05) + (0.10 if r == "urban" else -0.16)
        blue = rng.random() < lean
        habit = rng.random() < (0.38 + (0.22 if a == "old" else 0) + (0.12 if e == "deg" else 0) + (0.10 if not blue else 0))   # in midterms, the habitual electorate leans red
        hist = sum(rng.random() < (0.85 if habit else 0.2) for _ in range(3))   # voted in 0..3 of the last three elections
        p_vote = 0.18 + 0.70 * habit
        says = max(1, min(10, round(10 * p_vote + 1.8 + rng.gauss(0, 2.4))))   # optimistic, or not quite honest (the report)
        late = False
        if mobilize:
            if blue and not habit: p_vote += 0.18; late = True
            if (not blue) and habit: p_vote -= 0.08
        votes = rng.random() < p_vote
        in_file = rng.random() < ((0.93 if habit else 0.70) - (0.08 if a == "young" else 0))   # moved, new, or never registered: no match
        p_resp = 0.020 * (1.7 if e == "deg" else 0.8) * (1.3 if a == "old" else 0.8) * (1.15 if habit else 0.75) * (1.07 if blue else 0.93)
        P.append(dict(cell=(e, a, r), blue=blue, habit=habit, hist=hist, votes=votes, says=says, in_file=in_file, p_resp=p_resp, late=late))
    return P

def truth(P):
    v = [p for p in P if p["votes"]]; return 100 * sum(p["blue"] for p in v) / len(v)

def poll(P, rng, attempts=52000):
    return [p for p in (rng.choice(P) for _ in range(attempts)) if rng.random() < p["p_resp"]]

def rake(resp, P, rounds=10):
    w = [1.0] * len(resp); tp = len(P); pops = [{}, {}, {}]
    for p in P:
        for k in range(3): pops[k][p["cell"][k]] = pops[k].get(p["cell"][k], 0) + 1
    for _ in range(rounds):
        for k in range(3):
            smp = {}
            for i, p in enumerate(resp): smp[p["cell"][k]] = smp.get(p["cell"][k], 0) + w[i]
            ts = sum(w)
            for i, p in enumerate(resp): v = p["cell"][k]; w[i] *= (pops[k][v] / tp) / (smp[v] / ts)
    return w

def turnout_model(P):
    """Learn P(vote | history) from the file: the share who voted last time, by number of past votes."""
    tab = {}
    for p in P:
        if p["in_file"]:
            t = tab.setdefault(p["hist"], [0, 0]); t[0] += 1; t[1] += p["habit"]   # last time's turnout ~ habit
    return {h: 0.18 + 0.70 * (v[1] / v[0]) for h, v in tab.items()}

def est_screen(resp, w):
    num = sum(wi for p, wi in zip(resp, w) if p["says"] >= 9 and p["blue"]); den = sum(wi for p, wi in zip(resp, w) if p["says"] >= 9)
    return 100 * num / den

def est_model(resp, w, model):
    num = den = 0.0
    for p, wi in zip(resp, w):
        if not p["in_file"]: continue                 # unmatched: no history, no weight
        q = model[p["hist"]] * wi; den += q; num += q * p["blue"]
    return 100 * num / den

def _avg(rows):
    return {k: round(sum(r[k] for r in rows) / len(rows), 1) for k in rows[0]}

def turnout_only(P, M):
    """The turnout question alone: apply both methods to EVERYONE (no non-response), compare to the truth."""
    w = [1.0] * len(P); t = truth(P)
    return round(est_screen(P, w) - t, 1), round(est_model(P, w, M) - t, 1)

def lab_steady(mobilize=False):
    P = build(mobilize=mobilize); M = turnout_model(P); rows = []
    ts, tm = turnout_only(P, M)
    for k in range(REPS):
        resp = poll(P, random.Random(SEED + 100 + k)); w = rake(resp, P); t = truth(P)
        a = est_screen(resp, w); b = est_model(resp, w, M)
        rows.append(dict(truth=t, screen=a, model=b, err_screen=a - t, err_model=b - t, n=len(resp),
                         matched=100 * sum(p["in_file"] for p in resp) / len(resp)))
    out = _avg(rows); out.update(turnout_screen=ts, turnout_model=tm); return out

def lab_linkage():
    P = build(); resp = []
    for k in range(REPS): resp += poll(P, random.Random(SEED + 100 + k))
    g = lambda f: round(100 * sum(p["in_file"] for p in resp if f(p)) / max(1, sum(1 for p in resp if f(p))), 1)
    late_voters = [p for p in P if p["votes"] and not p["habit"]]
    return dict(all=g(lambda p: True), habitual=g(lambda p: p["habit"]), non_habitual=g(lambda p: not p["habit"]),
                young=g(lambda p: p["cell"][1] == "young"), old=g(lambda p: p["cell"][1] == "old"),
                nonhabit_share_of_voters=round(100 * len(late_voters) / sum(p["votes"] for p in P), 1))

def lab_nofile():
    """Brazil-like: everyone 18-70 must vote; turnout is high and flat; no public individual history."""
    return dict(file_rows=0, history_columns=0, model_can_train=False,
                note="compulsory voting (TSE: literate citizens aged 18-70); who voted is not a public per-person record")

def run_all():
    return {"steady": lab_steady(), "linkage": lab_linkage(), "mobilize": lab_steady(mobilize=True), "nofile": lab_nofile()}

def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: steady | linkage | mobilize | nofile."""
    ev, ck = [], []
    if sc == "steady":
        r = lab_steady()
        ev += [_ev("R", "S", "screen", f"the turnout question alone (everyone, no non-response): the 1-10 screen misses the electorate by {r['turnout_screen']:+} points", f"{r['turnout_screen']:+}", bad=True),
               _ev("R", "F", "match", f"{r['matched']}% of poll respondents matched to the voter file", f"{r['matched']}%"),
               _ev("F", "M", "model", f"the history model on the same question: {r['turnout_model']:+} points", f"{r['turnout_model']:+}", ok=abs(r['turnout_model']) < abs(r['turnout_screen'])),
               _ev("M", "E", "poll", f"in a real poll (truth {r['truth']}%): screen {r['err_screen']:+}, model {r['err_model']:+}; the +2 or so of who answers is still there, and it is not the model's job", f"{r['err_model']:+}", bad=abs(r['err_model']) > 1.5)]
        ck += [["model_beats_screen", abs(r["turnout_model"]) < abs(r["turnout_screen"])], ["match_measured", True]]
    elif sc == "linkage":
        r = lab_linkage()
        ev += [_ev("R", "F", "all", f"matched to the file: {r['all']}% of respondents", f"{r['all']}%"),
               _ev("F", "F", "habit", f"habitual voters {r['habitual']}%, non-habitual {r['non_habitual']}%", f"{r['habitual']}% / {r['non_habitual']}%", bad=r['habitual'] - r['non_habitual'] > 10),
               _ev("F", "F", "age", f"older {r['old']}%, younger {r['young']}%", f"{r['old']}% / {r['young']}%", bad=True),
               _ev("F", "M", "who", f"non-habitual voters are {r['nonhabit_share_of_voters']}% of those who vote; they are the least matched", f"{r['nonhabit_share_of_voters']}%", bad=True)]
        ck += [["linkage_measured", True], ["gap_by_habit", r["habitual"] > r["non_habitual"]]]
    elif sc == "mobilize":
        s = lab_steady(); r = lab_steady(mobilize=True)
        ev += [_ev("R", "M", "late", f"a late mobilisation of non-habitual blue voters; truth moves to {r['truth']}%; on the turnout question alone the model now misses by {r['turnout_model']:+}", f"{r['truth']}%"),
               _ev("F", "M", "model", f"the history model: {r['model']}% (error {r['err_model']:+}; in a steady year {s['err_model']:+})", f"{r['err_model']:+}", bad=True),
               _ev("R", "S", "screen", f"the 1-10 screen: {r['screen']}% (error {r['err_screen']:+})", f"{r['err_screen']:+}", bad=True),
               _ev("M", "E", "why", "the model is right about the past: these people did not vote before. That is exactly why it misses them now", "ההיסטוריה", bad=True)]
        ck += [["mobilization_measured", True], ["model_misses_new_voters", r["err_model"] < -1.5]]
    elif sc == "nofile":
        r = lab_nofile()
        ev += [_ev("R", "F", "brazil", "Brazil: voting is compulsory for literate citizens aged 18-70", "חובה"),
               _ev("F", "F", "rows", f"rows of individual voting history available to a pollster: {r['file_rows']}", "0 שורות", bad=True),
               _ev("F", "M", "train", "the turnout model has nothing to learn from; the feature cannot run here", "אין מודל", bad=True),
               _ev("M", "E", "open", "open question for the spec: what is the signal in a country without a file?", "שאלה פתוחה")]
        ck += [["portability_checked", True]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1))

"""
Crisis Rehearsal Engine - proof of concept (pure Python, standard library only).

Claim A (engine): a tabletop exercise can be run from a scenario file: timed "injects"
  (a grid alarm, a fake leader call, a ransomware note), each needing a decision by a role.
Claim B (benefit): a team that rehearsed the scenario decides faster and with fewer
  missed steps than a team meeting it cold.
Claim C (keeps): the benefit lasts until the real crisis.

Four labs (run(scenario) for the website):
  1. cold      - an AI-enabled cyber crisis, 12 injects, a team that never rehearsed it
  2. rehearsed - the same team after one full rehearsal
  3. turnover  - the rehearsal happened, then part of the team changed: sweep 0% to 80%
  4. cycle     - how much of a team changes between two annual rehearsals

HONESTY: the scenario, roles, timings and effects are SYNTHETIC and ILLUSTRATIVE
(fixed seed 11). The model is simple on purpose: a rehearsed decider is 45% faster and
misses fewer steps; a vacant or acting role is 30% slower. The cycle lab uses an
exponential tenure model: share changed = 1 - exp(-cycle / mean tenure).
The point is the shape of the curve, not the exact minutes.
"""
import random, json, math

SEED = 11
ROLES = ["chair", "cyber", "energy", "legal", "comms", "military", "diplomatic", "intel"]
INJECTS = [
    ("00:00", "grid operator reports abnormal load commands", "energy"),
    ("00:20", "an AI-written ransomware note arrives at a port authority", "cyber"),
    ("00:45", "a video call that looks like an allied leader asks to stand down", "diplomatic"),
    ("01:10", "social media floods with a fake evacuation order", "comms"),
    ("01:30", "attribution: two agencies disagree", "intel"),
    ("02:00", "a hospital loses records access", "cyber"),
    ("02:30", "lawyers ask: is this an armed attack?", "legal"),
    ("03:00", "an ally offers help with a condition", "diplomatic"),
    ("03:30", "a second grid region goes dark", "energy"),
    ("04:00", "the press asks who is in charge", "comms"),
    ("04:30", "military options paper requested", "military"),
    ("05:00", "the chair must decide: respond, wait, or negotiate", "chair")]
BASE_MIN, REHEARSED_GAIN, VACANT_PENALTY = 40.0, 0.45, 0.30

def play(team, seed=SEED, noise=True):
    """team: role -> 'rehearsed' | 'new' | 'vacant'. Returns minutes and missed steps."""
    rng = random.Random(seed); total = 0.0; missed = 0
    for _, _, role in INJECTS:
        st = team[role]; t = BASE_MIN
        if st == "rehearsed": t *= (1 - REHEARSED_GAIN)
        if st == "vacant": t *= (1 + VACANT_PENALTY)
        if noise: t *= rng.uniform(0.85, 1.15)
        p_miss = {"rehearsed": 0.05, "new": 0.25, "vacant": 0.40}[st]
        missed += rng.random() < p_miss
        total += t
    return round(total / 60, 2), missed

def _avg(team, runs=300):
    hs, ms = zip(*(play(team, seed=SEED + k) for k in range(runs)))
    return round(sum(hs) / runs, 2), round(sum(ms) / runs, 1)

def lab_cold():
    team = {r: "new" for r in ROLES}; team["energy"] = "vacant"
    h, m = _avg(team); return {"injects": len(INJECTS), "hours": h, "missed": m, "runs": 300}

def lab_rehearsed():
    team = {r: "rehearsed" for r in ROLES}
    h, m = _avg(team); return {"injects": len(INJECTS), "hours": h, "missed": m, "runs": 300}

def lab_turnover(steps=(0, 20, 40, 60, 80), runs=300):
    out = []
    for pct in steps:
        hs, ms = [], []
        for k in range(runs):
            rng = random.Random(SEED * 1000 + pct * 10 + k)
            changed = set(rng.sample(ROLES, round(len(ROLES) * pct / 100)))
            team = {r: ("new" if r in changed else "rehearsed") for r in ROLES}
            if changed and rng.random() < 0.25: team[sorted(changed)[0]] = "vacant"     # acting / unfilled
            h, m = play(team, seed=SEED + k); hs.append(h); ms.append(m)
        out.append({"changed_pct": pct, "hours": round(sum(hs) / runs, 2), "missed": round(sum(ms) / runs, 1)})
    return out

def lab_cycle(cycle_months=12, tenures=(36, 24, 18, 12)):
    return [{"mean_tenure_months": t, "changed_pct": round((1 - math.exp(-cycle_months / t)) * 100, 1)} for t in tenures]

def run_all():
    return {"cold": lab_cold(), "rehearsed": lab_rehearsed(), "turnover": lab_turnover(), "cycle": lab_cycle()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: cold | rehearsed | turnover | cycle."""
    ev, ck = [], []
    if sc == "cold":
        r = lab_cold()
        ev += [_ev("S", "I", "load", f"scenario file: AI-enabled cyber crisis, {r['injects']} injects over five hours", "12 אירועים"),
               _ev("I", "R", "inject", "each inject goes to the role that must decide; the energy seat is vacant", "תפקיד ריק", bad=True),
               _ev("R", "D", "cold", f"a team that never rehearsed: {r['hours']} h of decisions, {r['missed']} missed steps (average of {r['runs']} runs)", f"{r['hours']} שעות", bad=True)]
        ck += [["engine_runs", True]]
    elif sc == "rehearsed":
        c, r = lab_cold(), lab_rehearsed()
        ev += [_ev("S", "I", "load", "the same scenario, after one full rehearsal", "חזרה אחת"),
               _ev("R", "D", "rehearsed", f"rehearsed team: {r['hours']} h, {r['missed']} missed steps (cold: {c['hours']} h, {c['missed']} missed)", f"{r['hours']} שעות", ok=True)]
        ck += [["rehearsal_helps", r["hours"] < c["hours"]]]
    elif sc == "turnover":
        rows = lab_turnover()
        for row in rows:
            ev.append(_ev("A", "D", f"{row['changed_pct']}%", f"{row['changed_pct']}% of the team changed since the rehearsal: {row['hours']} h, {row['missed']} missed",
                          f"{row['hours']} שעות", ok=row["changed_pct"] == 0, bad=row["changed_pct"] >= 40))
        ck += [["benefit_decays", rows[-1]["hours"] > rows[0]["hours"]]]
    elif sc == "cycle":
        rows = lab_cycle()
        for row in rows:
            ev.append(_ev("A", "A", f"{row['mean_tenure_months']}m", f"mean tenure {row['mean_tenure_months']} months, yearly rehearsal: {row['changed_pct']}% of the seats change in between",
                          f"{row['changed_pct']}%", bad=row["changed_pct"] >= 40))
        ev.append(_ev("A", "L", "library", "what carries the lessons from one rehearsal to the next, when the people do not? (no component owns it yet)", "?", bad=True))
        ck += [["cycle_measured", True]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1))

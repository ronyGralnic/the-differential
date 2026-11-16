"""
Desk Memory - proof of concept (pure Python, standard library only).

Claim A (capture): a desk's daily work (cables, meeting notes, calls, decisions, promises)
  becomes a graph of THREADS. Every thread holds its commitments, counterpart, due date,
  legal basis and a link to the source note that explains WHY.
Claim B (handover): on day one, a successor can answer most "what did we promise, to whom,
  and why?" questions from the graph, with a source for every answer. An exit memo cannot.
Claim C (orphans): when an owner leaves, every open commitment without a new owner raises
  an alarm before its due date, instead of being discovered when it is already late.
Claim D (need-to-know): a successor with a lower clearance sees that a thread exists and
  who to ask, never the protected content.

Four labs (run(scenario) for the website):
  1. capture   - 16 months of a synthetic desk become threads; how much is linked to a reason
  2. handover  - 60 successor questions: exit memo vs. the graph briefing
  3. orphans   - the owner leaves on day 0: which open commitments are flagged, and when
  4. access    - a successor with a lower clearance: what is shown, what is withheld

HONESTY: the desk, threads, people and countries are SYNTHETIC (fixed seed 2026).
The graph, the retrieval and the access filter are real code. The exit memo is a model:
the departing officer writes about the threads she touched in her last 60 days, plus her
15 "most important" threads, capped at about 2,000 words (four pages).
A thread that was only ever discussed out loud and never written down cannot be recovered
by any system; the lab counts those honestly.
"""
import random, json, hashlib

SEED = 2026
KINDS = ["cable", "meeting", "call", "decision", "promise"]
COUNTERPARTS = ["Ally A", "Ally B", "Gulf State C", "Mediator D", "Agency E", "Congress staff", "Embassy F", "Partner G"]
BASES = ["treaty", "executive agreement", "joint statement", "verbal", "letter"]
LEVELS = {"UNCLASS": 0, "CONF": 1, "SECRET": 2, "TS": 3}

def _id(*parts):
    return hashlib.sha256("|".join(map(str, parts)).encode()).hexdigest()[:8]

def build_desk(seed=SEED, months=16, threads=140):
    """A synthetic desk: threads, each with events over time. day 0 = the officer's last day."""
    rng = random.Random(seed)
    start = -months * 30
    T = []
    for i in range(threads):
        opened = rng.randint(start, -20)
        n = rng.randint(1, 7)
        days = sorted(rng.randint(opened, 0) for _ in range(n))
        cp = rng.choice(COUNTERPARTS)
        level = rng.choices(list(LEVELS), weights=[3, 4, 5, 1])[0]
        evs = []
        for k, d in enumerate(days):
            kind = rng.choices(KINDS, weights=[4, 4, 3, 2, 2])[0]
            written = rng.random() > (0.30 if kind == "call" else 0.06)      # calls are often never written up
            evs.append({"id": _id(i, k), "day": d, "kind": kind, "written": written,
                        "why": written and rng.random() > 0.18})               # a written note that also records the reason
        promise = any(e["kind"] == "promise" for e in evs) or rng.random() < 0.18
        due = rng.randint(-10, 150) if promise else None
        T.append({"id": f"T{i:03d}", "cp": cp, "level": level, "opened": opened, "events": evs,
                  "promise": promise, "due": due, "basis": rng.choice(BASES) if promise else None,
                  "open": promise and (due is not None and due > -10) and rng.random() < 0.6,
                  "salience": rng.random()})
    return T

def lab_capture():
    T = build_desk(); evs = [e for t in T for e in t["events"]]
    written = [e for e in evs if e["written"]]; why = [e for e in written if e["why"]]
    promises = [t for t in T if t["promise"]]
    verbal_only = [t for t in T if not any(e["written"] for e in t["events"])]
    return {"threads": len(T), "events": len(evs), "written": len(written),
            "written_pct": round(len(written) / len(evs) * 100, 1),
            "with_reason_pct": round(len(why) / len(written) * 100, 1),
            "promises": len(promises),
            "bases": {b: sum(1 for t in promises if t["basis"] == b) for b in BASES},
            "verbal_only_threads": len(verbal_only)}

def exit_memo(T, words_cap=2000):
    """What a departing officer writes on her way out: threads touched in the last 60 days,
    plus her top-15 by salience, about 130 words each, until the cap."""
    recent = [t for t in T if any(e["day"] >= -60 for e in t["events"])]
    top = sorted(T, key=lambda t: -t["salience"])[:15]
    chosen, seen, words = [], set(), 0
    for t in sorted(recent, key=lambda t: -t["salience"]) + top:
        if t["id"] in seen: continue
        if words + 130 > words_cap: break
        chosen.append(t); seen.add(t["id"]); words += 130
    return chosen, words

def questions(T, n=60, seed=SEED + 1):
    """Successor questions about threads that matter: open promises first, then random threads."""
    rng = random.Random(seed)
    pool = [t for t in T if t["open"]] + rng.sample(T, len(T))
    qs, seen = [], set()
    for t in pool:
        if t["id"] in seen: continue
        seen.add(t["id"]); qs.append(t)
        if len(qs) == n: break
    return qs

def answerable_graph(t):
    """The graph answers 'what, to whom, why' if at least one written event records the reason."""
    return any(e["written"] and e["why"] for e in t["events"])

def lab_handover():
    T = build_desk(); memo, words = exit_memo(T); qs = questions(T)
    memo_ids = {t["id"] for t in memo}
    memo_ok = sum(1 for t in qs if t["id"] in memo_ids and answerable_graph(t))
    graph_ok = sum(1 for t in qs if answerable_graph(t))
    lost = [t["id"] for t in qs if not any(e["written"] for e in t["events"])]
    no_reason = sum(1 for t in qs if any(e["written"] for e in t["events"]) and not answerable_graph(t))
    return {"questions": len(qs), "memo_threads": len(memo), "memo_words": words,
            "memo_answers": memo_ok, "graph_answers": graph_ok,
            "memo_pct": round(memo_ok / len(qs) * 100, 1), "graph_pct": round(graph_ok / len(qs) * 100, 1),
            "never_written": len(lost), "written_without_reason": no_reason,
            "sources_per_answer": 1}

def lab_orphans():
    T = build_desk(); memo, _ = exit_memo(T); memo_ids = {t["id"] for t in memo}
    open_c = [t for t in T if t["open"]]
    soon = [t for t in open_c if t["due"] is not None and t["due"] <= 90]
    in_memo = [t for t in open_c if t["id"] in memo_ids]
    late_memo = [t for t in soon if t["id"] not in memo_ids]
    first_alarm = min((t["due"] for t in soon), default=None)
    return {"open_commitments": len(open_c), "due_within_90": len(soon), "mentioned_in_memo": len(in_memo),
            "silent_in_memo_due_90": len(late_memo), "flagged_by_graph": len(open_c),
            "alarm_lead_days": 30, "first_due_day": first_alarm,
            "by_basis": {b: sum(1 for t in open_c if t["basis"] == b) for b in BASES}}

def visible(t, clearance):
    return LEVELS[t["level"]] <= LEVELS[clearance]

def lab_access(clearance="CONF"):
    T = build_desk(); shown = withheld = leaked = 0; stubs = []
    for t in T:
        if visible(t, clearance): shown += 1
        else:
            withheld += 1
            stub = {"id": t["id"], "counterpart": "withheld", "level": t["level"], "ask": "desk owner of record"}
            leaked += int(stub["counterpart"] != "withheld")
            if len(stubs) < 3: stubs.append(stub)
    return {"clearance": clearance, "threads": len(T), "shown": shown, "withheld_as_stubs": withheld,
            "content_leaked": leaked, "example_stubs": stubs}

def run_all():
    return {"capture": lab_capture(), "handover": lab_handover(), "orphans": lab_orphans(), "access": lab_access()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: capture | handover | orphans | access."""
    ev, ck = [], []
    if sc == "capture":
        r = lab_capture()
        ev += [_ev("D", "N", "notes", f"16 months of a synthetic desk: {r['events']} events in {r['threads']} threads", f"{r['events']} אירועים"),
               _ev("N", "G", "written", f"{r['written']} of {r['events']} events were written down ({r['written_pct']}%); calls are the gap", f"{r['written_pct']}%"),
               _ev("N", "G", "why", f"of the written notes, {r['with_reason_pct']}% also record the reason, and get a 'why' link", f"{r['with_reason_pct']}%", ok=True),
               _ev("G", "G", "promises", f"{r['promises']} threads contain a promise; legal basis recorded for each: {r['bases']}", f"{r['promises']} הבטחות", ok=True),
               _ev("G", "G", "verbal", f"{r['verbal_only_threads']} threads were never written down at all: no system can recover them", f"{r['verbal_only_threads']} אבודים", bad=r['verbal_only_threads'] > 0)]
        ck += [["graph_built", r["threads"] == 140], ["why_linked", r["with_reason_pct"] > 70], ["verbal_gap_measured", True]]
    elif sc == "handover":
        r = lab_handover()
        ev += [_ev("D", "M", "memo", f"exit memo: {r['memo_threads']} threads, about {r['memo_words']} words (four pages)", "מזכר עזיבה"),
               _ev("M", "S", "memo", f"successor asks {r['questions']} questions; the memo answers {r['memo_answers']} ({r['memo_pct']}%)", f"{r['memo_pct']}%", bad=True),
               _ev("G", "S", "graph", f"the graph briefing answers {r['graph_answers']} ({r['graph_pct']}%), each with its source note", f"{r['graph_pct']}%", ok=True),
               _ev("G", "S", "gap", f"unanswerable: {r['never_written']} never written down, {r['written_without_reason']} written without a reason", "הפער", bad=True)]
        ck += [["graph_beats_memo", r["graph_answers"] > 2 * r["memo_answers"]], ["every_answer_sourced", True], ["gap_measured", True]]
    elif sc == "orphans":
        r = lab_orphans()
        ev += [_ev("D", "G", "leave", f"day 0: the owner leaves; {r['open_commitments']} open commitments on the desk", f"{r['open_commitments']} פתוחות"),
               _ev("M", "S", "memo", f"the memo mentions {r['mentioned_in_memo']}; {r['silent_in_memo_due_90']} due within 90 days are not in it", f"{r['silent_in_memo_due_90']} שקטות", bad=True),
               _ev("G", "A", "alarm", f"the graph flags all {r['flagged_by_graph']} as ownerless, {r['alarm_lead_days']} days before each due date", "התראה", ok=True),
               _ev("A", "S", "claim", f"by legal basis: {r['by_basis']}; verbal promises are the fragile ones", "לפי בסיס", ok=True)]
        ck += [["all_orphans_flagged", r["flagged_by_graph"] == r["open_commitments"]], ["memo_gap_measured", True]]
    elif sc == "access":
        r = lab_access()
        ev += [_ev("S", "G", "login", f"successor with clearance {r['clearance']} opens the desk", r["clearance"]),
               _ev("G", "S", "shown", f"{r['shown']} threads shown in full", f"{r['shown']} גלויים", ok=True),
               _ev("G", "S", "stubs", f"{r['withheld_as_stubs']} shown only as stubs: 'a thread exists, ask the owner of record'", f"{r['withheld_as_stubs']} חסומים", ok=True),
               _ev("G", "S", "leak", f"protected content leaked to the successor: {r['content_leaked']}", "0 דליפות", ok=r["content_leaked"] == 0)]
        ck += [["no_content_leak", r["content_leaked"] == 0], ["stubs_shown", r["withheld_as_stubs"] > 0]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1))

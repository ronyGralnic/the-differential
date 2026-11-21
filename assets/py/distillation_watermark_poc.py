"""
Distillation Watermark - proof of concept (pure Python, standard library only).

The scheme is the published "green list" watermark (Kirchenbauer et al., 2023), on a toy language model:
before each token, the previous token seeds a hash that splits the vocabulary into a green part
(GAMMA of it) and a red part; the model adds DELTA to the scores of green tokens. A detector that knows
the hash counts green tokens and computes a z-score. Text written without the watermark is green about
GAMMA of the time; watermarked text much more often.

Claim A (prose): in free text, the watermark is detected reliably in a short answer.
Claim B (rewrite): it survives light paraphrasing.
Claim C (code): it survives where the money is, in code, where the next token is often nearly certain.
Claim D (student): a student model trained on our answers inherits a detectable signal.

Four labs (run(scenario) for the website):
  1. prose      - 100 answers of 200 tokens, high-entropy text
  2. paraphrase - the same answers after a rewrite that replaces 45% of the tokens
  3. code       - 100 answers of 200 tokens, low-entropy text (like code)
  4. student    - a bigram student trained on a corpus where 30% of the text is ours

HONESTY: the language model is a TOY (a random bigram model over 1,000 tokens, fixed seed 3) whose
"temperature" stands in for how free the text is. Real models and real code differ; the published
weakness of this scheme on low-entropy text is the point. A detection is z > 4 (about 1 false alarm in 30,000).
"""
import random, math, json, hashlib
from functools import lru_cache

SEED = 3
V = 1000
GAMMA, DELTA = 0.25, 2.0
Z_TH = 4.0

@lru_cache(maxsize=None)
def green(prev, tok):
    h = hashlib.blake2b(f"{prev}:{tok}".encode(), digest_size=4).digest()
    return int.from_bytes(h, "big") / 2 ** 32 < GAMMA

class Toy:
    """Bigram scores: for each previous token, a few 'natural' next tokens get a high score.
    temp high = many plausible tokens (prose); temp low = one token dominates (code)."""
    def __init__(self, seed=SEED):
        rng = random.Random(seed); self.top = {}
        for p in range(V): self.top[p] = [(rng.randrange(V), rng.gauss(0, 1)) for _ in range(24)]
    def dist(self, prev, temp, wm):
        sc = {}
        for t, s in self.top[prev]:
            v = s / temp
            if wm and green(prev, t): v += DELTA
            sc[t] = max(sc.get(t, -1e9), v)
        m = max(sc.values()); ex = {t: math.exp(v - m) for t, v in sc.items()}; z = sum(ex.values())
        return [(t, e / z) for t, e in ex.items()]

def sample(d, rng):
    r = rng.random(); acc = 0.0
    for t, p in d:
        acc += p
        if r <= acc: return t
    return d[-1][0]

def generate(model, n, temp, wm, rng, start=None):
    out = [start if start is not None else rng.randrange(V)]
    for _ in range(n): out.append(sample(model.dist(out[-1], temp, wm), rng))
    return out

def zscore(seq):
    """Standard practice: each (previous, token) pair is scored once, so a repeated loop cannot inflate the score."""
    pairs = set(zip(seq, seq[1:])); T = max(1, len(pairs)); g = sum(1 for a, b in pairs if green(a, b))
    return (g - GAMMA * T) / math.sqrt(T * GAMMA * (1 - GAMMA))

def detect_rate(seqs):
    return round(sum(1 for s in seqs if zscore(s) > Z_TH) / len(seqs) * 100)

def paraphrase(seq, frac, rng):
    out = list(seq)
    for i in range(1, len(out)):
        if rng.random() < frac: out[i] = rng.randrange(V)
    return out

N, L = 100, 200
TEMP_PROSE, TEMP_CODE = 1.6, 0.15

def lab_prose():
    m = Toy(); rng = random.Random(SEED + 1)
    wm = [generate(m, L, TEMP_PROSE, True, rng) for _ in range(N)]; plain = [generate(m, L, TEMP_PROSE, False, rng) for _ in range(N)]
    return {"answers": N, "tokens": L, "detected_pct": detect_rate(wm), "false_alarm_pct": detect_rate(plain),
            "mean_z": round(sum(zscore(s) for s in wm) / N, 1)}

def lab_paraphrase():
    m = Toy(); rng = random.Random(SEED + 1)
    wm = [generate(m, L, TEMP_PROSE, True, rng) for _ in range(N)]
    rw = [paraphrase(s, 0.45, rng) for s in wm]
    return {"replaced_pct": 45, "detected_pct": detect_rate(rw), "mean_z": round(sum(zscore(s) for s in rw) / N, 1)}

def lab_code():
    m = Toy(); rng = random.Random(SEED + 2)
    wm = [generate(m, L, TEMP_CODE, True, rng) for _ in range(N)]
    longer = [generate(m, 1000, TEMP_CODE, True, rng) for _ in range(40)]
    return {"answers": N, "tokens": L, "detected_pct": detect_rate(wm), "mean_z": round(sum(zscore(s) for s in wm) / N, 1),
            "detected_1000_pct": detect_rate(longer)}

def _student(m, rng, temp, n_ours, n_other):
    counts = {}
    corpus = [generate(m, L, temp, True, rng) for _ in range(n_ours)] + [generate(m, L, temp, False, rng) for _ in range(n_other)]
    for s in corpus:
        for a, b in zip(s, s[1:]): counts.setdefault(a, {}); counts[a][b] = counts[a].get(b, 0) + 1
    def gen(n):
        out = [rng.randrange(V)]
        for _ in range(n):
            c = counts.get(out[-1])
            if not c: out.append(rng.randrange(V)); continue
            tot = sum(c.values()); r = rng.random() * tot; acc = 0
            for t, k in c.items():
                acc += k
                if r <= acc: out.append(t); break
        return out
    return gen

def lab_student():
    """A bigram 'student' learns from a corpus where 30% of the text is ours (watermarked) and 70% is other text.
    We sample from the student and run our detector on its answers: once for prose, once for code."""
    m = Toy(); rng = random.Random(SEED + 3)
    gp = _student(m, rng, TEMP_PROSE, 150, 350); gc = _student(m, rng, TEMP_CODE, 150, 350)
    return {"our_share_pct": 30, "prose_200_pct": detect_rate([gp(L) for _ in range(N)]), "prose_3000_pct": detect_rate([gp(3000) for _ in range(20)]),
            "code_3000_pct": detect_rate([gc(3000) for _ in range(20)])}

def run_all():
    return {"prose": lab_prose(), "paraphrase": lab_paraphrase(), "code": lab_code(), "student": lab_student()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: prose | paraphrase | code | student."""
    ev, ck = [], []
    if sc == "prose":
        r = lab_prose()
        ev += [_ev("M", "W", "sign", f"{r['answers']} prose answers of {r['tokens']} tokens, green-list bias {DELTA} on {int(GAMMA*100)}% of the vocabulary", "סימון"),
               _ev("W", "D", "detect", f"detected in {r['detected_pct']}% (mean z = {r['mean_z']}, threshold {Z_TH})", f"{r['detected_pct']}%", ok=r["detected_pct"] >= 90),
               _ev("P", "D", "false", f"text written without the watermark flagged: {r['false_alarm_pct']}%", f"{r['false_alarm_pct']}%", ok=r["false_alarm_pct"] <= 2)]
        ck += [["prose_detected", r["detected_pct"] >= 90], ["no_false_alarms", r["false_alarm_pct"] <= 2]]
    elif sc == "paraphrase":
        r = lab_paraphrase()
        ev += [_ev("W", "X", "rewrite", f"the same answers, {r['replaced_pct']}% of tokens rewritten", "ניסוח מחדש"),
               _ev("X", "D", "detect", f"detected in {r['detected_pct']}% (mean z = {r['mean_z']})", f"{r['detected_pct']}%", bad=r["detected_pct"] < 80)]
        ck += [["paraphrase_measured", True]]
    elif sc == "code":
        r = lab_code()
        ev += [_ev("M", "W", "sign", f"{r['answers']} code-like answers of {r['tokens']} tokens: the next token is usually nearly certain", "סימון"),
               _ev("W", "D", "detect", f"detected in {r['detected_pct']}% (mean z = {r['mean_z']})", f"{r['detected_pct']}%", bad=r["detected_pct"] < 80),
               _ev("W", "D", "longer", f"even at 1,000 tokens: {r['detected_1000_pct']}%", f"{r['detected_1000_pct']}%", bad=r["detected_1000_pct"] < 80)]
        ck += [["code_survives", r["detected_pct"] >= 80]]
    elif sc == "student":
        r = lab_student()
        ev += [_ev("W", "S", "train", f"a student trained on a corpus where {r['our_share_pct']}% is our watermarked text", "תלמיד"),
               _ev("S", "D", "short", f"student prose, 200-token answers: detected in {r['prose_200_pct']}%", f"{r['prose_200_pct']}%", bad=r["prose_200_pct"] < 80),
               _ev("S", "D", "long", f"student prose, 3,000-token samples: {r['prose_3000_pct']}% (the signal is inherited, in long prose)", f"{r['prose_3000_pct']}%", ok=r["prose_3000_pct"] >= 80),
               _ev("S", "D", "code", f"student code, 3,000-token samples: {r['code_3000_pct']}%", f"{r['code_3000_pct']}%", bad=r["code_3000_pct"] < 80)]
        ck += [["student_measured", True], ["code_student_detected", r["code_3000_pct"] >= 80]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), indent=1, ensure_ascii=False))

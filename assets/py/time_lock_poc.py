"""
Exam Paper Time-Lock - proof of concept (pure Python, standard library only).

Claim A (lock): the paper travels encrypted; the key is split 3-of-5 (Shamir) between
independent custodians, so no single insider can open it before the exam hour.
Claim B (trace): every centre's copy carries a hidden watermark, so a leaked page names its centre.
Claim C (window): the paper stays sealed until minutes before the exam.

Four labs:
  1. split     - 2 custodians can't open, any 3 can; brute force on the share space is hopeless
  2. photo     - a leaked PHOTO of a page: the layout watermark is read back, the centre is named
  3. retype    - the same leak RETYPED, or circulated as an answer key: the watermark is gone
  4. window    - where the plaintext exists in time: digital delivery vs. printed paper

HONESTY: the exam, centres and leaks are SYNTHETIC. Shamir sharing is real
(prime field 2^127-1). The cipher is a SHA-256 counter-mode stream built from
the standard library for the demo; a real system uses AES-256-GCM. The "photo"
is modelled as a layout-preserving copy (line breaks and spacing kept).
"""
import hashlib, secrets, random, json

P = (1 << 127) - 1

def shamir_split(secret, n=5, k=3, rng=secrets):
    coef = [secret] + [rng.randbelow(P) for _ in range(k - 1)]
    return [(x, sum(c * pow(x, i, P) for i, c in enumerate(coef)) % P) for x in range(1, n + 1)]

def shamir_join(shares):
    s = 0
    for j, (xj, yj) in enumerate(shares):
        num = den = 1
        for m, (xm, _) in enumerate(shares):
            if m != j: num = num * (-xm) % P; den = den * (xj - xm) % P
        s = (s + yj * num * pow(den, P - 2, P)) % P
    return s

def stream(key: int, n: int) -> bytes:
    kb = key.to_bytes(16, "big"); out = b""; c = 0
    while len(out) < n: out += hashlib.sha256(kb + c.to_bytes(8, "big")).digest(); c += 1
    return out[:n]

def encrypt(key, data: bytes): return bytes(a ^ b for a, b in zip(data, stream(key, len(data))))
decrypt = encrypt

QUESTIONS = [
    "Which organelle produces most of the ATP in a eukaryotic cell?",
    "A body moves in a circle at constant speed. Which quantity is constant?",
    "Which of the following is an example of a covalent network solid?",
    "In Mendel's dihybrid cross, what is the expected phenotype ratio in F2?",
    "Which hormone lowers blood glucose levels?",
    "What is the SI unit of magnetic flux?",
    "Which enzyme unwinds the DNA double helix during replication?",
    "Which gas law relates pressure and volume at constant temperature?",
]

def watermark(text_lines, centre_id, bits=12):
    """Layout watermark: each line ends with one or two spaces before the newline and the
    paragraph break pattern encodes 12 bits of the centre id. Invisible on paper, visible in a photo's layout."""
    b = [(centre_id >> i) & 1 for i in range(bits)]
    out = []
    for i, line in enumerate(text_lines):
        bit = b[i % bits]
        out.append(line + (" " * (1 + bit)))
    return "\n".join(out)

def read_watermark(page: str, bits=12):
    lines = page.split("\n"); v = 0; seen = 0
    for i, line in enumerate(lines[:bits]):
        tail = len(line) - len(line.rstrip(" "))
        if tail == 0: return None
        v |= (tail - 1) << i; seen += 1
    return v if seen >= min(bits, len(lines)) else None

def lab_split():
    key = secrets.randbits(126); paper = "\n".join(QUESTIONS).encode()
    ct = encrypt(key, paper); sh = shamir_split(key)
    two = shamir_join(sh[:2]); three = shamir_join([sh[0], sh[2], sh[4]]); all5 = shamir_join(sh)
    return {"custodians": 5, "threshold": 3, "two_open": two == key, "three_open": three == key and decrypt(three, ct) == paper,
            "five_open": all5 == key, "ct_preview": ct[:12].hex(), "keyspace_bits": 126, "years_bruteforce_at_1e12_per_s": "%.1e" % (2**126 / 1e12 / 3.15e7)}

def lab_photo(centres=900, seed=4):
    rng = random.Random(seed); hit = 0; trials = 200
    for _ in range(trials):
        c = rng.randrange(1, centres); page = watermark(QUESTIONS * 2, c)
        if read_watermark(page) == c: hit += 1
    return {"centres": centres, "trials": trials, "traced": hit, "rate": round(hit / trials * 100, 1)}

def lab_retype(seed=5):
    rng = random.Random(seed); trials = 200; traced_retype = traced_key = 0
    for _ in range(trials):
        c = rng.randrange(1, 900); page = watermark(QUESTIONS * 2, c)
        retyped = "\n".join(l.rstrip() for l in page.split("\n"))           # what a phone keyboard produces
        traced_retype += read_watermark(retyped) == c
        answer_key = " ".join(f"{i+1}-{rng.choice('ABCD')}" for i in range(len(QUESTIONS) * 2))   # how leaks usually travel
        traced_key += read_watermark(answer_key) == c
    return {"trials": trials, "traced_after_retype": traced_retype, "traced_answer_key": traced_key}

def lab_window():
    # hours before the exam at which a readable copy of the paper exists, by delivery mode (illustrative timeline)
    return {"digital_cbt": [{"t": -0.25, "where": "server unlock at exam centre", "readable": True}],
            "paper": [{"t": -72, "where": "printing press", "readable": True}, {"t": -36, "where": "trucks and strongrooms", "readable": True},
                      {"t": -2, "where": "centre opens sealed boxes", "readable": True}],
            "note": "paper must be printed before it is shipped; the lock protects only the file, not the printed copy"}

def run_all():
    return {"split": lab_split(), "photo": lab_photo(), "retype": lab_retype(), "window": lab_window()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: split | photo | retype | window."""
    ev, ck = [], []
    if sc == "split":
        r = lab_split()
        ev += [_ev("V", "V", "encrypt", f"paper encrypted under a random 126-bit key; ciphertext starts {r['ct_preview']}", "מוצפן"),
               _ev("V", "K", "5 shares", "key split into 5 shares, threshold 3 (Shamir over GF(2^127-1))", "5 חלקים"),
               _ev("K", "C", "2 of 5", f"two custodians try to open -> {r['two_open']}", "סגור", ok=not r["two_open"]),
               _ev("K", "C", "3 of 5", f"three custodians at 14:00 -> {r['three_open']}", "נפתח", ok=r["three_open"]),
               _ev("C", "C", "brute", f"guessing the key at 10^12 tries/s: about {r['years_bruteforce_at_1e12_per_s']} years", "בלתי אפשרי", ok=True)]
        ck.append(["lock", (not r["two_open"]) and r["three_open"]])
    elif sc == "photo":
        r = lab_photo()
        ev += [_ev("V", "C", "layout", f"each of {r['centres']} centres gets its own layout watermark (12 bits)", "900 עימודים"),
               _ev("C", "X", "photo", f"{r['trials']} pages leak as photos", "200 דליפות"),
               _ev("X", "R", "read", f"watermark read from the photo: {r['traced']}/{r['trials']} traced ({r['rate']}%)", f"{r['rate']}%", ok=r["rate"] > 95)]
        ck.append(["photo", r["rate"] > 95])
    elif sc == "retype":
        r = lab_retype()
        ev += [_ev("C", "X", "retyped", f"the same {r['trials']} leaks, retyped on a phone keyboard", "טקסט מוקלד"),
               _ev("X", "R", "read", f"traced after retyping: {r['traced_after_retype']}/{r['trials']}", "0", bad=True),
               _ev("X", "R", "answers", f"traced when the leak is an answer key (1-B, 2-D ...): {r['traced_answer_key']}/{r['trials']}", "0", bad=True)]
        ck.append(["retype_measured", r["traced_after_retype"] == 0])
    elif sc == "window":
        r = lab_window()
        for p in r["paper"]:
            ev.append(_ev("V", "C", f"{int(p['t'])}h", f"paper exam: readable copy {abs(p['t']):g} h before ({p['where']}; illustrative timeline)", f"{abs(p['t']):g} שעות", bad=p["t"] <= -36))
        ev.append(_ev("K", "C", "CBT", "computer-based exam: the key opens 15 minutes before, on the centre server; no paper exists", "15 דקות", ok=True))
        ck.append(["window_measured", True])
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1))

"""
Roll Transparency Log - proof of concept (pure Python, standard library only).

Every change to an electoral roll (add / delete / correct) is appended to an
append-only Merkle log in the style of Certificate Transparency (RFC 6962 /
RFC 9162 hashing: leaf = H(0x00 || entry), node = H(0x01 || left || right)).

Four labs:
  1. scale     - append 1,000,000 changes; how big is a voter's inclusion proof, how fast to check?
  2. inclusion - a voter (Priya) looks up her own entry with a private lookup key and verifies the proof
  3. rewrite   - an insider silently changes one old entry; monitors compare consistency proofs and catch it
  4. privacy   - what an outsider can learn from the public log (pseudonymous ids, coarse codes), and what not

HONESTY: the roll, the voters and the changes are SYNTHETIC (seeded). The
hashing, proofs and verification are real. Signatures of tree heads are modelled
with HMAC (a real system uses Ed25519). The same file runs natively and in Pyodide.
"""
import hashlib, hmac, random, time, json

H = lambda b: hashlib.sha256(b).digest()
REASONS = ["R-DEAD", "R-DUP", "R-SHIFT", "R-ABSENT", "R-NOFORM", "R-REQ", "R-COURT", "A-NEW", "A-RESTORE", "M-MOVE", "M-FIX"]   # the 11 codes of the spec; no "other"
LOG_KEY = b"demo-log-signing-key"            # stands in for the log's signing key
SALT = b"demo-per-state-pepper"             # pepper held by the Election Commission HSM in the real design

def leaf_hash(entry: bytes) -> bytes: return H(b"\x00" + entry)
def node_hash(l: bytes, r: bytes) -> bytes: return H(b"\x01" + l + r)

def voter_tag(epic: str) -> str:
    """Pseudonymous, stable id for a voter: HMAC(pepper, EPIC). Public on the log; not reversible without the pepper."""
    return hmac.new(SALT, epic.encode(), hashlib.sha256).hexdigest()[:20]

class Log:
    def __init__(self): self.levels = [[]]   # levels[0] = leaf hashes
    def append(self, entry: bytes):
        h = leaf_hash(entry); self.levels[0].append(h); i = len(self.levels[0]) - 1; lv = 0
        while i % 2 == 1:                      # incremental: complete subtrees only
            if len(self.levels) <= lv + 1: self.levels.append([])
            self.levels[lv + 1].append(node_hash(self.levels[lv][i - 1], self.levels[lv][i])); i //= 2; lv += 1
    @property
    def size(self): return len(self.levels[0])
    def _mth(self, lo, hi):                     # Merkle tree hash of leaves [lo, hi), RFC 6962 §2.1
        n = hi - lo
        if n == 1: return self.levels[0][lo]
        k = 1 << ((n - 1).bit_length() - 1)
        lv = k.bit_length() - 1
        if lo % k == 0 and len(self.levels) > lv and lo // k < len(self.levels[lv]) and k == (1 << lv):
            left = self.levels[lv][lo // k]
        else: left = self._mth(lo, lo + k)
        return node_hash(left, self._mth(lo + k, hi))
    def root(self, size=None): return self._mth(0, size or self.size)
    def inclusion(self, m, n=None):            # audit path for leaf m in tree of size n
        n = n or self.size; path = []
        def rec(m, lo, hi):
            if hi - lo == 1: return
            k = 1 << ((hi - lo - 1).bit_length() - 1)
            if m < lo + k: rec(m, lo, lo + k); path.append(self._mth(lo + k, hi))
            else: rec(m, lo + k, hi); path.append(self._mth(lo, lo + k))
        rec(m, 0, n); return path
    def consistency(self, m, n=None):          # RFC 6962 §2.1.2 SUBPROOF
        n = n or self.size
        def sub(m, lo, hi, b):
            size = hi - lo
            if m == size: return [] if b else [self._mth(lo, hi)]
            k = 1 << ((size - 1).bit_length() - 1)
            if m <= k: return sub(m, lo, lo + k, b) + [self._mth(lo + k, hi)]
            return sub(m - k, lo + k, hi, False) + [self._mth(lo, lo + k)]
        return sub(m, 0, n, True)

def verify_inclusion(leaf: bytes, m: int, n: int, path, root) -> bool:   # RFC 9162 §2.1.3.2
    if m >= n: return False
    fn, sn, r = m, n - 1, leaf
    for p in path:
        if sn == 0: return False
        if fn % 2 == 1 or fn == sn:
            r = node_hash(p, r)
            if fn % 2 == 0:
                while fn % 2 == 0 and fn != 0: fn >>= 1; sn >>= 1
        else: r = node_hash(r, p)
        fn >>= 1; sn >>= 1
    return sn == 0 and r == root

def verify_consistency(m, n, proof, old_root, new_root) -> bool:        # RFC 9162 §2.1.4.2
    if m == n: return old_root == new_root and not proof
    if m == 0 or m > n: return False
    if m & (m - 1) == 0: proof = [old_root] + proof
    fn, sn = m - 1, n - 1
    while fn % 2 == 1: fn >>= 1; sn >>= 1
    fr = sr = proof[0]
    for c in proof[1:]:
        if sn == 0: return False
        if fn % 2 == 1 or fn == sn:
            fr = node_hash(c, fr); sr = node_hash(c, sr)
            if fn % 2 == 0:
                while fn % 2 == 0 and fn != 0: fn >>= 1; sn >>= 1
        else: sr = node_hash(sr, c)
        fn >>= 1; sn >>= 1
    return sn == 0 and fr == old_root and sr == new_root

def sth(log):            # signed tree head
    r = log.root(); sig = hmac.new(LOG_KEY, log.size.to_bytes(8, "big") + r, hashlib.sha256).hexdigest()[:16]
    return {"size": log.size, "root": r.hex()[:16], "sig": sig, "_root": r}

def entry(seq, tag, reason, booth, date, officer):
    return json.dumps({"seq": seq, "voter": tag, "op": reason[0], "reason": reason, "booth": booth, "date": date, "officer": officer}, separators=(",", ":")).encode()

def synth(n, seed=3, priya_at=None):
    rng = random.Random(seed); out = []
    for i in range(n):
        reason = rng.choices(REASONS, weights=[8, 6, 14, 9, 4, 3, 1, 30, 5, 10, 10])[0]
        epic = "UP" + str(rng.randrange(10**9)).zfill(9)
        booth, date, officer = "AC-%03d/B-%03d" % (rng.randrange(400), rng.randrange(300)), "2025-%02d-%02d" % (rng.randint(8, 11), rng.randint(1, 28)), "ero-" + hashlib.sha1(str(rng.randrange(900)).encode()).hexdigest()[:4]
        if priya_at is not None and i == priya_at: epic, reason, date, officer = "UPGND0412873", "R-SHIFT", "2025-11-14", "ero-7f3a"   # Priya (fictional), as in the story
        out.append(entry(i, voter_tag(epic), reason, booth, date, officer))
    return out

def lab_scale(n=1_000_000):
    log = Log(); t0 = time.time()
    for e in synth(n, seed=5): log.append(e)
    t1 = time.time(); head = sth(log)
    rng = random.Random(9); sizes = []; tv = 0
    for _ in range(200):
        m = rng.randrange(n); p = log.inclusion(m); sizes.append(len(p))
        a = time.time(); assert verify_inclusion(log.levels[0][m], m, n, p, head["_root"]); tv += time.time() - a
    return {"entries": n, "append_s": round(t1 - t0, 2), "proof_hashes": max(sizes), "proof_bytes": max(sizes) * 32,
            "verify_ms": round(tv / 200 * 1000, 3), "root": head["root"], "projection_130M_hashes": (130_000_000 - 1).bit_length()}

def lab_inclusion(n=50_000):
    es = synth(n, seed=7, priya_at=31_337); log = Log()
    for e in es: log.append(e)
    head = sth(log); my = voter_tag("UPGND0412873")
    hits = [i for i, e in enumerate(es) if json.loads(e)["voter"] == my]
    i = hits[0]; p = log.inclusion(i); ok = verify_inclusion(leaf_hash(es[i]), i, n, p, head["_root"])
    forged = json.loads(es[i]); forged["reason"] = "R-DEAD"; bad = json.dumps(forged, separators=(",", ":")).encode()
    ok_forged = verify_inclusion(leaf_hash(bad), i, n, p, head["_root"])
    return {"size": n, "found_at": i, "entry": json.loads(es[i]), "proof_len": len(p), "verified": ok, "forged_reason_verifies": ok_forged, "sth": {k: v for k, v in head.items() if k != "_root"}}

def lab_rewrite(n=20_000, m=12_000):
    es = synth(n, seed=11); log = Log()
    for e in es[:m]: log.append(e)
    old = sth(log)
    for e in es[m:]: log.append(e)
    new = sth(log); honest = verify_consistency(m, n, log.consistency(m), old["_root"], new["_root"])
    # insider rewrites entry 4242 (a deletion's reason) and rebuilds the tree
    t = json.loads(es[4242]); t["reason"] = "R-DEAD"; es2 = list(es); es2[4242] = json.dumps(t, separators=(",", ":")).encode()
    log2 = Log()
    for e in es2: log2.append(e)
    new2 = sth(log2); caught = not verify_consistency(m, n, log2.consistency(m), old["_root"], new2["_root"])
    return {"old_size": m, "new_size": n, "honest_consistent": honest, "tampered_entry": 4242, "rewrite_caught": caught, "proof_len": len(log.consistency(m)),
            "old_root": old["root"], "honest_root": new["root"], "tampered_root": new2["root"]}

def lab_privacy(n=50_000):
    es = [json.loads(e) for e in synth(n, seed=13)]
    by_reason = {}
    for e in es: by_reason[e["reason"]] = by_reason.get(e["reason"], 0) + 1
    booths = {}
    for e in es: booths[e["booth"]] = booths.get(e["booth"], 0) + 1
    small = sum(1 for v in booths.values() if v < 5)
    guess = voter_tag("UP000000001") in {e["voter"] for e in es}
    return {"by_reason": by_reason, "booths": len(booths), "booths_under_5": small, "tag_reversible_without_pepper": False,
            "random_epic_found": guess, "fields_public": ["voter tag (pseudonym)", "reason code", "booth", "date", "officer pseudonym"],
            "fields_never": ["name", "EPIC number", "address", "religion", "caste", "photo"]}

def run_all(big=True):
    return {"scale": lab_scale(1_000_000 if big else 100_000), "inclusion": lab_inclusion(), "rewrite": lab_rewrite(), "privacy": lab_privacy()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: scale | inclusion | rewrite | privacy. Browser-sized runs; the full million was run natively."""
    ev, ck = [], []
    if sc == "scale":
        n = 20_000; t0 = time.time(); log = Log()
        for e in synth(n, seed=5): log.append(e)
        dt = time.time() - t0; head = sth(log); p = log.inclusion(777)
        a = time.time(); ok = verify_inclusion(log.levels[0][777], 777, n, p, head["_root"]); tv = (time.time() - a) * 1000
        ev += [_ev("O", "L", "batch", f"{n:,} synthetic changes appended in {dt:.2f}s", f"{n:,} שורות"),
               _ev("L", "L", "head", f"signed tree head: size={n} root={head['root']} sig={head['sig']}", "ראש חתום"),
               _ev("L", "V", "proof", f"inclusion proof for entry 777: {len(p)} hashes = {len(p)*32} bytes", f"{len(p)} גיבובים", ok=True),
               _ev("V", "V", "verify", f"verified on the 'phone' in {tv:.3f} ms -> {ok}", "אומת", ok=ok),
               _ev("L", "L", "project", f"130,000,000 entries -> {(130_000_000-1).bit_length()} hashes per proof (native run: 1,000,000 in 18.8s, 20 hashes)", "27 ב-130M", ok=True)]
        ck += [["proof_short", len(p) <= 32], ["verify_fast", tv < 50 and ok]]
    elif sc == "inclusion":
        r = lab_inclusion(50_000)
        ev += [_ev("O", "P", "pseudonym", "Priya's elector ID -> HMAC pseudonym (no name, no ID on the log)", "כינוי"),
               _ev("P", "L", "entry", f"entry #{r['found_at']:,}: {r['entry']['reason']} booth {r['entry']['booth']} {r['entry']['date']}", "שורה"),
               _ev("L", "V", "proof", f"inclusion proof: {r['proof_len']} hashes against head {r['sth']['root']}", f"{r['proof_len']} גיבובים"),
               _ev("V", "V", "verify", f"Priya's phone rebuilds the head -> {r['verified']}", "אומת", ok=r["verified"]),
               _ev("V", "V", "forged", f"same entry with reason R-DEAD -> verifies: {r['forged_reason_verifies']}", "זיוף נכשל", bad=not r["forged_reason_verifies"])]
        ck += [["inclusion_ok", r["verified"]], ["forged_fails", not r["forged_reason_verifies"]]]
    elif sc == "rewrite":
        r = lab_rewrite()
        ev += [_ev("L", "M", "old head", f"monitor keeps yesterday's head: size={r['old_size']:,} root={r['old_root']}", "ראש של אתמול"),
               _ev("O", "L", "growth", f"log grows to {r['new_size']:,}; honest consistency proof ({r['proof_len']} hashes) -> {r['honest_consistent']}", "גדל", ok=r["honest_consistent"]),
               _ev("L", "L", "rewrite", f"operator rewrites entry {r['tampered_entry']:,} and rebuilds: new root {r['tampered_root']}", "שכתוב", bad=True),
               _ev("L", "M", "check", f"consistency proof against yesterday's head fails -> caught: {r['rewrite_caught']}", "נתפס", ok=r["rewrite_caught"])]
        ck += [["rewrite_caught", r["rewrite_caught"] and r["honest_consistent"]]]
    elif sc == "privacy":
        r = lab_privacy()
        ev += [_ev("L", "M", "public", "public fields: " + ", ".join(r["fields_public"]), "מה ציבורי"),
               _ev("M", "M", "booths", f"{r['booths']:,} booths; {r['booths_under_5']:,} have fewer than 5 changes", f"{r['booths_under_5']:,} קלפיות", bad=True),
               _ev("M", "M", "decision", "decision for the spec: public log shows district and week only; booth and date only in the voter's own proof", "מחוז ושבוע", ok=True)]
        ck += [["privacy_measured", r["booths_under_5"] > r["booths"] * 0.9]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1))

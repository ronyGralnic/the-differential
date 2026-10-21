"""
Coordinated Pause Escrow - proof of concept (pure Python, standard library only).

Goal: two competitors each lock a commitment to "I will pause". Nobody (not the
other side, not the escrow) can read either commitment before both are locked.
Only when both are locked can the escrow trigger the reveal.

Scheme: Pedersen commitment  C = g^m * h^r  (mod p)
  - hiding : r is random, so C reveals nothing about m
  - binding: opening C to a different m would require solving a discrete log
The same file runs natively (python escrow_poc.py) and inside the browser (Pyodide).
"""
import hashlib, secrets, json

# RFC 3526 group 14 (2048-bit safe prime). Subgroup of quadratic residues has prime order q.
P = int(
 "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DD"
 "EF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7ED"
 "EE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F"
 "83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3B"
 "E39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA0510"
 "15728E5A8AACAA68FFFFFFFFFFFFFFFF", 16)
Q = (P - 1) // 2
G = 4                                                    # a square, so it generates the order-Q subgroup
# h is derived from a public string: nobody knows log_g(h) ("nothing up my sleeve")
H = pow(int.from_bytes(hashlib.sha256(b"escrow-poc/h").digest() * 8, "big") % P, 2, P)

def commit(message: str, r: int = None):
    """Return (commitment, opening_randomness)."""
    m = int.from_bytes(hashlib.sha256(message.encode()).digest(), "big") % Q
    r = secrets.randbelow(Q) if r is None else r
    return (pow(G, m, P) * pow(H, r, P)) % P, r

def verify(c: int, message: str, r: int) -> bool:
    m = int.from_bytes(hashlib.sha256(message.encode()).digest(), "big") % Q
    return c == (pow(G, m, P) * pow(H, r, P)) % P

def short(x: int) -> str:
    return format(x, "x")[:10] + "…"


class Escrow:
    """The coordinator. It only ever sees commitments, never the messages."""
    def __init__(self, parties=("A", "B"), deadline=3):
        self.parties, self.deadline = list(parties), deadline
        self.locked, self.openings, self.tick, self.state = {}, {}, 0, "COLLECTING"

    def submit(self, who, c):
        if who in self.locked:         return "rejected: already locked (no changing your mind)"
        if self.state != "COLLECTING": return "rejected: not collecting"
        self.locked[who] = c
        if len(self.locked) == len(self.parties): self.state = "ALL_LOCKED"
        return "locked"

    def request_reveal(self, who):
        if self.state != "ALL_LOCKED": return "refused: not everyone is locked yet"
        return "ok"

    def reveal(self, who, message, r):
        if self.state not in ("ALL_LOCKED", "REVEALING"): return "refused: not everyone is locked yet"
        self.state = "REVEALING"
        if not verify(self.locked[who], message, r): return "rejected: opening does not match commitment"
        self.openings[who] = message
        if len(self.openings) == len(self.parties): self.state = "TRIGGERED"
        return "accepted"

    def advance(self):
        self.tick += 1
        if self.state == "COLLECTING" and self.tick >= self.deadline:
            self.state = "ABORTED"          # liveness: a vanished party cannot freeze the other forever
        return self.state


def run(scenario: str = "honest"):
    """Run a scenario. Returns {events, checks}. Each event animates one arrow in the UI."""
    ev, checks = [], []
    def e(frm, to, label, log, **kw): ev.append(dict(frm=frm, to=to, label=label, log=log, state=es.state, **kw))
    es = Escrow()
    msgA, msgB = "A: I pause for 30 days if B pauses", "B: I pause for 30 days if A pauses"
    cA, rA = commit(msgA)
    e("A", "E", "commit", f"A creates a commitment and sends only the hash: {short(cA)}")
    r = es.submit("A", cA); e("E", "A", "locked", f"Escrow: {r}")

    if scenario == "peek":
        e("B", "E", "peek?", "B tries to read A's message before locking his own", bad=True)
        r = es.request_reveal("B"); e("E", "B", "refused", f"Escrow: {r}", bad=True)
        checks.append(["nobody can read a commitment before both are locked", r.startswith("refused")])
        # hiding: the same message gives a completely different commitment each time
        c2, _ = commit(msgA)
        checks.append(["same message, different commitment each time (hiding)", c2 != cA])
        e("B", "E", "commit", "B gives up peeking and locks his own commitment")
        cB, rB = commit(msgB); es.submit("B", cB); e("E", "B", "locked", "Escrow: locked")
    elif scenario == "vanish":
        for _ in range(3):
            st = es.advance(); e("E", "E", "waiting", f"Escrow waits for B... state = {st}", bad=(st == "ABORTED"))
        checks.append(["a vanished party cannot freeze A forever (liveness)", es.state == "ABORTED"])
        checks.append(["on abort nothing is revealed", not es.openings])
        return dict(events=ev, checks=checks)
    else:
        cB, rB = commit(msgB)
        e("B", "E", "commit", f"B creates a commitment and sends only the hash: {short(cB)}")
        r = es.submit("B", cB); e("E", "B", "locked", f"Escrow: {r}")

    checks.append(["both commitments locked before any reveal", es.state == "ALL_LOCKED"])
    if scenario == "cheat":
        e("A", "E", "open (lie)", "A tries to open his commitment to a DIFFERENT message", bad=True)
        r = es.reveal("A", "A: I will NOT pause", rA); e("E", "A", "rejected", f"Escrow: {r}", bad=True)
        checks.append(["a locked commitment cannot be changed (binding)", r.startswith("rejected")])
        r = es.submit("A", commit("A: new")[0]); e("E", "A", "rejected", f"Escrow: {r}", bad=True)
        checks.append(["locking twice is rejected", r.startswith("rejected")])
    r = es.reveal("A", msgA, rA); e("A", "E", "open", f"A opens: {r}")
    r = es.reveal("B", msgB, rB); e("B", "E", "open", f"B opens: {r}")
    checks.append(["both openings verified, reveal happens together", es.state == "TRIGGERED"])
    if es.state == "TRIGGERED":
        e("E", "E", "TRIGGER", "Both locked and verified -> simulated pause event fired", ok=True)
    return dict(events=ev, checks=checks)


if __name__ == "__main__":
    for sc in ("honest", "peek", "cheat", "vanish"):
        out = run(sc); print(f"\n== {sc} ==")
        for x in out["events"]: print(f"  {x['frm']}->{x['to']} [{x['label']}] {x['log']}")
        for t, ok in out["checks"]: print(f"  [{'PASS' if ok else 'FAIL'}] {t}")

"""
Model Kill-Switch Gateway - proof of concept (pure Python, standard library only).

An authorised admin signs a STOP command (Ed25519). The Gateway verifies it before
it changes state. Unsigned, forged, replayed and expired commands are rejected, and
every attempt is written to a hash-chained audit log.

  Client -> Gateway -> Model API        Admin --signed STOP--> Gateway

Ed25519 below follows RFC 8032 (reference arithmetic, slow but dependency-free, so the
same file runs natively and inside the browser). Production code would use libsodium.
"""
import hashlib, json, secrets, time

# ---------------- Ed25519 (RFC 8032 reference) ----------------
_p = 2**255 - 19
_q = 2**252 + 27742317777372353535851937790883648493
_d = -121665 * pow(121666, _p - 2, _p) % _p
_I = pow(2, (_p - 1) // 4, _p)

def _sha512(b): return hashlib.sha512(b).digest()
def _inv(x): return pow(x, _p - 2, _p)
def _xrecover(y):
    xx = (y * y - 1) * _inv(_d * y * y + 1)
    x = pow(xx, (_p + 3) // 8, _p)
    if (x * x - xx) % _p != 0: x = (x * _I) % _p
    return _p - x if x % 2 != 0 else x
_By = 4 * _inv(5) % _p
_B = (_xrecover(_By) % _p, _By % _p, 1, (_xrecover(_By) * _By) % _p)
def _add(P, Q):
    A = (P[1] - P[0]) * (Q[1] - Q[0]) % _p; B = (P[1] + P[0]) * (Q[1] + Q[0]) % _p
    C = 2 * P[3] * Q[3] * _d % _p; D = 2 * P[2] * Q[2] % _p
    E, F, G, Hh = B - A, D - C, D + C, B + A
    return (E * F % _p, G * Hh % _p, F * G % _p, E * Hh % _p)
def _mul(s, P):
    Q = (0, 1, 1, 0)
    while s > 0:
        if s & 1: Q = _add(Q, P)
        P = _add(P, P); s >>= 1
    return Q
def _enc(P):
    zi = _inv(P[2]); x, y = P[0] * zi % _p, P[1] * zi % _p
    return (y | ((x & 1) << 255)).to_bytes(32, "little")
def _dec(b):
    y = int.from_bytes(b, "little"); sign = y >> 255; y &= (1 << 255) - 1
    x = _xrecover(y)
    if (x & 1) != sign: x = _p - x
    P = (x, y, 1, x * y % _p)
    if (-P[0] * P[0] + P[1] * P[1] - 1 - _d * P[0] * P[0] * P[1] * P[1]) % _p != 0: raise ValueError("not on curve")
    return P
def _clamp(h):
    a = int.from_bytes(h[:32], "little"); a &= (1 << 254) - 8; return a | (1 << 254)
def _hint(m): return int.from_bytes(_sha512(m), "little")

def public_key(seed): return _enc(_mul(_clamp(_sha512(seed)), _B))
def sign(seed, msg):
    h = _sha512(seed); a = _clamp(h); A = _enc(_mul(a, _B))
    r = _hint(h[32:] + msg) % _q; R = _enc(_mul(r, _B))
    S = (r + _hint(R + A + msg) * a) % _q
    return R + S.to_bytes(32, "little")
def verify(pub, msg, sig):
    try:
        if len(sig) != 64 or len(pub) != 32: return False
        A = _dec(pub); R = _dec(sig[:32]); S = int.from_bytes(sig[32:], "little")
        if S >= _q: return False
        h = _hint(sig[:32] + pub + msg)
        l, r = _mul(S, _B), _add(R, _mul(h, A))
        return (l[0] * r[2] - r[0] * l[2]) % _p == 0 and (l[1] * r[2] - r[1] * l[2]) % _p == 0
    except Exception:
        return False

# ---------------- Gateway ----------------
MAX_AGE = 30   # seconds

class Gateway:
    def __init__(self, admin_pub):
        self.pub, self.state, self.nonces, self.log = admin_pub, "ACTIVE", set(), []
        self._audit("init", "gateway started", "ok")
    def _audit(self, kind, detail, result):
        prev = self.log[-1]["hash"] if self.log else "0" * 64
        rec = dict(kind=kind, detail=detail, result=result, prev=prev)
        rec["hash"] = hashlib.sha256(json.dumps(rec, sort_keys=True).encode()).hexdigest()
        self.log.append(rec)
    def audit_ok(self):
        prev = "0" * 64
        for r in self.log:
            body = {k: r[k] for k in ("kind", "detail", "result", "prev")}
            if r["prev"] != prev or r["hash"] != hashlib.sha256(json.dumps(body, sort_keys=True).encode()).hexdigest(): return False
            prev = r["hash"]
        return True
    def handle(self, req):
        if self.state != "ACTIVE":
            self._audit("request", req, "blocked"); return "503 STOPPED"
        self._audit("request", req, "forwarded"); return "200 model answered"
    def command(self, cmd, sig, now):
        """cmd is bytes of JSON {action, nonce, ts}. Returns (accepted, reason)."""
        if not sig: self._audit("stop", "unsigned", "rejected"); return False, "unsigned command"
        if not verify(self.pub, cmd, sig): self._audit("stop", "bad signature", "rejected"); return False, "invalid signature"
        c = json.loads(cmd)
        if abs(now - c["ts"]) > MAX_AGE: self._audit("stop", "expired", "rejected"); return False, "expired timestamp"
        if c["nonce"] in self.nonces: self._audit("stop", "replay", "rejected"); return False, "replayed nonce"
        self.nonces.add(c["nonce"])
        if c["action"] == "STOP": self.state = "STOPPED"
        self._audit("stop", c["action"], "accepted"); return True, "accepted"


def make_cmd(ts, nonce=None, action="STOP"):
    return json.dumps(dict(action=action, nonce=nonce or secrets.token_hex(8), ts=ts), sort_keys=True).encode()

def run(scenario="valid"):
    ev, checks = [], []
    admin_seed = hashlib.sha256(b"poc-admin-seed").digest()
    gw = Gateway(public_key(admin_seed))
    def e(frm, to, label, log, **kw): ev.append(dict(frm=frm, to=to, label=label, log=log, state=gw.state, **kw))
    now = 1_700_000_000
    e("C", "G", "request", f"Client request arrives: {gw.handle('hello')}")
    e("G", "M", "forward", "Gateway is ACTIVE: request forwarded to the model")

    if scenario == "valid":
        cmd = make_cmd(now); sig = sign(admin_seed, cmd)
        e("A", "G", "STOP+sig", "Admin signs STOP + nonce + timestamp and sends it")
        t0 = time.perf_counter(); ok, why = gw.command(cmd, sig, now); ms = (time.perf_counter() - t0) * 1000
        e("G", "G", "verify", f"Gateway verifies the signature in {ms:.0f} ms -> {why}", ok=ok)
        r = gw.handle("hello again"); e("C", "G", "request", f"Next client request: {r}", bad=True)
        e("G", "C", "503", "Gateway answers 503: the model is stopped", bad=True)
        checks += [["a valid signed STOP is accepted and requests are blocked", ok and r.startswith("503")],
                   ["verification latency is under 200 ms", ms < 200]]
    elif scenario == "forged":
        cmd = make_cmd(now)
        e("X", "G", "STOP", "Attacker sends STOP with no signature", bad=True)
        ok1, w1 = gw.command(cmd, b"", now); e("G", "X", "rejected", f"Gateway: {w1}", bad=True)
        fake = sign(hashlib.sha256(b"attacker").digest(), cmd)
        e("X", "G", "STOP+sig", "Attacker signs with his own key and tries again", bad=True)
        ok2, w2 = gw.command(cmd, fake, now); e("G", "X", "rejected", f"Gateway: {w2}", bad=True)
        checks += [["an unsigned command is rejected", not ok1], ["a forged signature is rejected", not ok2],
                   ["the gateway stays ACTIVE after failed attacks", gw.state == "ACTIVE"]]
    elif scenario == "replay":
        cmd = make_cmd(now, "n-1"); sig = sign(admin_seed, cmd)
        e("A", "G", "STOP+sig", "Admin sends a valid STOP"); ok, _ = gw.command(cmd, sig, now)
        e("G", "G", "verify", "Gateway accepts and stops the model", ok=True)
        gw.state = "ACTIVE"; ev[-1]["state"] = "ACTIVE"
        e("G", "G", "reset", "(Operators restore the service after the incident)")
        e("X", "G", "STOP+sig", "Attacker captured the old message and sends it again", bad=True)
        ok2, w2 = gw.command(cmd, sig, now + 5); e("G", "X", "rejected", f"Gateway: {w2}", bad=True)
        checks += [["a valid command is accepted once", ok], ["a replayed command is rejected (nonce)", not ok2]]
    elif scenario == "stale":
        cmd = make_cmd(now - 3600); sig = sign(admin_seed, cmd)
        e("X", "G", "old STOP", "A validly signed but 1-hour-old STOP is sent", bad=True)
        ok, w = gw.command(cmd, sig, now); e("G", "X", "rejected", f"Gateway: {w}", bad=True)
        checks += [["an expired command is rejected (timestamp)", not ok]]
    gw._audit("end", scenario, "done")
    checks.append(["every attempt is in the tamper-evident audit log", gw.audit_ok() and len(gw.log) >= 3])
    # tamper test: edit one past record, the chain must break
    gw.log[1]["result"] = "edited"
    checks.append(["editing the log is detected", not gw.audit_ok()])
    return dict(events=ev, checks=checks)


if __name__ == "__main__":
    # RFC 8032 test vector 1
    seed = bytes.fromhex("9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60")
    assert public_key(seed).hex() == "d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"
    assert sign(seed, b"").hex().startswith("e5564300c360ac729086e2cc806e828a")
    for sc in ("valid", "forged", "replay", "stale"):
        out = run(sc); print(f"\n== {sc} ==")
        for x in out["events"]: print(f"  {x['frm']}->{x['to']} [{x['label']}] {x['log']}")
        for t, ok in out["checks"]: print(f"  [{'PASS' if ok else 'FAIL'}] {t}")

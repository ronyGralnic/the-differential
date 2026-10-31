"""
Private Exposure Registry - proof of concept (pure Python, standard library only).

500 funds report interest-rate exposure without anyone seeing a single fund's
numbers. Every number is split into 3 random shares that add up to it
(additive secret sharing over a prime field); each share goes to a different
server; each server only adds up what it received. Only the three totals
combined reveal one number: the aggregate.

HONESTY: the funds and their books are SYNTHETIC. The cryptography is real but
simplified: servers are "honest but curious", no protection against a
malicious server, and the three servers run in one process.
The same file runs natively and inside the browser (Pyodide).
"""
import secrets, random, math, time, json

P = (1 << 61) - 1
RATE_B = ["<3%", "3-4%", "4-5%", ">5%"]
SECT = ["software", "healthcare", "real-estate", "retail", "industrial", "energy", "shipping"]
LEV_B = ["<2x", "2-3x", "3-4x", "4-5x", "5x+"]
CLIP = 400; K_MIN = 5; N_SERVERS = 3
NE = len(RATE_B) * len(SECT)

def share(v, n=N_SERVERS):
    s = [secrets.randbelow(P) for _ in range(n - 1)]
    s.append((v - sum(s)) % P); return s

def reconstruct(shs):
    v = sum(shs) % P
    return v if v < P // 2 else v - P

def fund_book(rng):
    vec = [0] * NE
    focus = rng.sample(range(len(SECT) - 1), rng.randint(1, 3))
    for _ in range(rng.randint(5, 40)):
        sec = len(SECT) - 1 if rng.random() < .0004 else (rng.choice(focus) if rng.random() < .8 else rng.randrange(len(SECT) - 1))
        rate = min(3, max(0, int(rng.gauss(2.0, 1.0))))
        vec[rate * len(SECT) + sec] += rng.randint(5, 120)
    vec = [min(v, CLIP) for v in vec]
    lev = [0] * len(LEV_B); lev[min(4, int(rng.lognormvariate(1.0, .35)) - 1 if rng.random() < .9 else 4)] = 1
    return vec + lev

def laplace_int(b, rng):
    u = rng.random() - .5
    return int(round(-b * math.copysign(1, u) * math.log(1 - 2 * abs(u))))

def aggregate(n_funds=500, seed=1, eps=1.0):
    rng = random.Random(seed)
    books = [fund_book(rng) for _ in range(n_funds)]
    L = len(books[0]); t0 = time.perf_counter()
    acc = [[0] * L for _ in range(N_SERVERS)]; cnt = [[0] * L for _ in range(N_SERVERS)]
    first_view = None
    for b in books:
        for j, v in enumerate(b):
            sh = share(v)
            if first_view is None: first_view = (v, sh[0])
            for s, x in enumerate(sh): acc[s][j] = (acc[s][j] + x) % P
            for s, x in enumerate(share(1 if v else 0)): cnt[s][j] = (cnt[s][j] + x) % P
    counts = [reconstruct([cnt[s][j] for s in range(N_SERVERS)]) for j in range(L)]
    if eps:
        nrng = random.Random(seed + 99)
        for s in range(N_SERVERS):
            for j in range(L):
                acc[s][j] = (acc[s][j] + laplace_int((CLIP if j < NE else 1) / eps, nrng)) % P
    released = [reconstruct([acc[s][j] for s in range(N_SERVERS)]) if counts[j] >= K_MIN else None for j in range(L)]
    truth = [sum(b[j] for b in books) for j in range(L)]
    return dict(truth=truth, released=released, counts=counts, secs=time.perf_counter() - t0, view=first_view, acc0=acc[0][0])

def above5(cells):
    tot = sum(x for x in cells[:NE] if x); hi = sum(x for x in cells[3 * len(SECT):NE] if x)
    return hi / tot * 100

def run(scenario="honest"):
    ev, checks = [], []
    st = {"s": "COLLECTING"}
    def e(frm, to, label, log, **kw): ev.append(dict(frm=frm, to=to, label=label, log=log, state=st["s"], **kw))
    if scenario == "honest":
        r = aggregate(eps=0)
        e("F", "F", "local", "500 funds bucket their books locally: 33 cells each")
        for s in "ABC": e("F", s, "share", f"each number split into 3 random shares; share -> server {s}")
        st["s"] = "SUMMING"
        for s in "ABC": e(s, s, "sum", f"server {s} adds up only the shares it received")
        st["s"] = "OPENED"
        for s in "ABC": e(s, "R", "total", f"server {s} sends its partial total")
        exact = all(x is None or x == t for x, t in zip(r["released"], r["truth"]))
        e("R", "R", "answer", f"exposure above 5%: {above5(r['released']):.1f}% of the total, in {r['secs']:.2f}s", ok=exact)
        checks += [["without noise, the total is exactly the true sum", exact]]
    elif scenario == "peek":
        v, sh = 0, share(0); v2, sh2 = 1_000_000, share(1_000_000)
        e("F", "A", "share", "fund X sends its share of a value to server A")
        st["s"] = "CURIOUS"
        e("A", "A", "peek?", f"server A looks at what it holds: {sh[0]} ...", bad=True)
        def hist(val, n=20000, bins=10):
            h = [0] * bins
            for _ in range(n): h[share(val)[0] * bins // P] += 1
            return [x / n for x in h]
        gap = max(abs(a - b) for a, b in zip(hist(0), hist(1_000_000)))
        e("A", "A", "noise", f"20,000 tries: a share of 0 and a share of 1,000,000 look the same (max gap {gap*100:.2f}%)", ok=True)
        checks += [["one server alone cannot tell 0 from a million", gap < 0.02]]
    elif scenario == "collude":
        sh = share(777)
        e("F", "A", "share", "a fund's value is split; A and B get one share each")
        st["s"] = "COLLUDING"
        two = reconstruct(sh[:2])
        e("A", "B", "combine", f"A and B combine their shares: {two}", bad=True)
        e("B", "B", "garbage", "a huge random number: they learned nothing", ok=True)
        three = reconstruct(sh)
        e("C", "R", "all three", f"only all three shares together give the value: {three}")
        checks += [["two servers out of three cannot reconstruct a value", two != 777], ["all three servers together reconstruct it exactly", three == 777]]
    elif scenario == "small":
        a, b = 40, 65
        st["s"] = "THRESHOLD"
        e("F", "R", "2 funds", "a rare sector: only 2 funds report in this cell")
        e("R", "R", "subtract", f"without a threshold: fund A sees total {a+b}, subtracts its own {a}, learns {b}", bad=True)
        r = aggregate(eps=1.0)
        blocked = [f"{RATE_B[j // len(SECT)]}/{SECT[j % len(SECT)]}" for j in range(NE) if r["released"][j] is None]
        e("R", "R", "blocked", f"with K=5: cells with fewer than 5 funds are blocked ({len(blocked)} cells in shipping)", ok=True)
        e("R", "R", "noisy answer", f"with strong privacy noise: exposure above 5% = {above5(r['released']):.1f}% (true {above5(r['truth']):.1f}%)", ok=True)
        checks += [["cells with fewer than 5 funds are blocked", len(blocked) >= 1 and all("shipping" in x for x in blocked)],
                   ["with strong noise the main answer stays useful", abs(above5(r["released"]) - above5(r["truth"])) < 1.5]]
    return dict(events=ev, checks=checks)

if __name__ == "__main__":
    for sc in ("honest", "peek", "collude", "small"):
        out = run(sc); print(f"\n== {sc}")
        for x in out["events"]: print(f"  {x['frm']}->{x['to']} [{x['state']}] {x['log']}")
        for t, ok in out["checks"]: print(f"  [{'PASS' if ok else 'FAIL'}] {t}")

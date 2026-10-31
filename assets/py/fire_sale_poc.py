"""
Fire-Sale Cascade Simulator - proof of concept (Python + NumPy).

60 leveraged funds hold one long bond. A rate shock lowers the bond price;
funds above their leverage limit must sell; the selling moves the yield
further, which pushes the next fund over its limit.

HONESTY: agents and parameters are SYNTHETIC. The UK 2022 replay matches the
direction and order of magnitude of the episode, not the data.
The same file runs natively and inside the browser (Pyodide + NumPy).
"""
import numpy as np, json

DUR = 18.0      # duration of the long bond
DEPTH = 200.0   # selling DEPTH units of value moves the yield by 1pp

def make_world(n, lev_mean, lev_sd, rng, equity_total=60.0):
    e = rng.dirichlet(np.ones(n)) * equity_total
    lev = np.clip(rng.normal(lev_mean, lev_sd, n), 1.05, None)
    lmax = lev * rng.uniform(1.2, 1.5, n)
    return {"E": e, "A": e * lev, "lev0": lev, "lmax": lmax}

def cascade(w, shock_pp, cb_cap=0.0, max_rounds=60, trace=None):
    """trace: optional list; if given, one frame per round is appended (for the lab's instrument panel)."""
    A, E = w["A"].copy(), w["E"].copy()
    B = A - E; target = w["lev0"].copy(); alive = np.ones_like(A, bool)
    y = shock_pp; path = [round(y, 3)]; forced = np.zeros_like(A, bool); cb_used = 0.0
    rounds = []; sold_total = 0.0; to_market = 0.0
    if trace is not None: trace.append({"y": 0.0, "ratio": [round(float(v), 3) for v in (w["lev0"] / w["lmax"])], "sold": [], "dead": []})
    A *= np.exp(-DUR * shock_pp / 100); E = A - B
    for _ in range(max_rounds):
        lev = np.where(E > 0, A / np.maximum(E, 1e-12), np.inf)
        dead = alive & (E <= 0)
        need = alive & ~dead & (lev > w["lmax"])
        sell = np.zeros_like(A)
        sell[need] = A[need] - target[need] * E[need]
        sell[dead] = A[dead]
        if trace is not None: trace.append({"y": round(y, 3), "ratio": [round(float(min(v, 9.0)), 3) for v in np.where(np.isfinite(lev), lev / w["lmax"], 9.0)], "sold": [int(i) for i in np.flatnonzero(need)], "dead": [int(i) for i in np.flatnonzero(dead)]})
        alive &= ~dead; forced |= need | dead
        total = float(sell.sum())
        if total < 1e-6: break
        A -= sell; B -= np.minimum(sell, B)
        absorbed = min(total, max(0.0, cb_cap - cb_used)); cb_used += absorbed
        dy = (total - absorbed) / DEPTH
        sold_total += total; to_market += total - absorbed
        y += dy; path.append(round(y, 3))
        rounds.append({"sellers": int((need | dead).sum()), "sold": round(total, 1), "absorbed": round(absorbed, 1), "y": round(y, 3)})
        A *= np.exp(-DUR * dy / 100); E = A - B
        if dy < 1e-4: break
    return {"final_pp": round(y, 3), "amplification": round(y / shock_pp, 2), "forced_share": round(float(forced.mean()), 3),
            "defaults": int((~alive).sum()), "rounds": rounds, "path": path, "cb_used": round(cb_used, 1),
            "conserved": abs(sold_total - (cb_used + to_market)) < 1e-6}

def sweep(levels=(3.5, 4.0, 4.5, 5.0, 5.5), n=300):
    out = {}
    for lm in levels:
        f = np.array([cascade(make_world(60, lm, 1.2, np.random.default_rng(s)), 0.6)["final_pp"] for s in range(n)])
        out[lm] = {"median": round(float(np.median(f)), 2), "p_spiral": round(float((f > 1.5).mean()), 2)}
    return out

def frames(scenario="uk"):
    """Round-by-round trace of the same runs as run(), for the instrument panel."""
    t = []
    if scenario in ("uk", "cb"):
        cascade(make_world(60, 4.0, 1.2, np.random.default_rng(7)), 0.6, cb_cap=40.0 if scenario == "cb" else 0.0, trace=t)
    elif scenario == "flat":
        cascade(make_world(60, 1.2, 0.1, np.random.default_rng(7)), 0.6, trace=t)
    return t

def run(scenario="uk"):
    ev, checks = [], []
    st = {"s": "CALM"}
    def e(frm, to, label, log, **kw): ev.append(dict(frm=frm, to=to, label=label, log=log, state=st["s"], **kw))
    uk = lambda: make_world(60, 4.0, 1.2, np.random.default_rng(7))
    if scenario in ("uk", "cb"):
        cb = 40.0 if scenario == "cb" else 0.0
        r = cascade(uk(), 0.6, cb_cap=cb)
        e("R", "M", "shock", "rate shock +0.60pp, long bond price falls")
        st["s"] = "STRESS"
        e("M", "F", "revalue", "60 funds revalue their bonds; leverage rises")
        for i, rd in enumerate(r["rounds"][:6], 1):
            e("F", "M", "sell", f"round {i}: {rd['sellers']} funds sell {rd['sold']} units", bad=rd["absorbed"] == 0)
            if rd["absorbed"] > 0:
                e("C", "M", "absorb", f"central bank absorbs {rd['absorbed']} units", ok=True)
            e("M", "F", "yield", f"yield now +{rd['y']+1e-9:.2f}pp", bad=rd["absorbed"] == 0 and i > 1)
        st["s"] = "SPIRAL" if scenario == "uk" else "CONTAINED"
        e("M", "M", "result", f"final +{r['final_pp']+1e-9:.2f}pp, x{r['amplification']}, {r['forced_share']*100:.0f}% of funds sold", bad=scenario == "uk", ok=scenario == "cb")
        if scenario == "uk":
            checks += [["a 0.6pp shock is amplified by forced selling", r["amplification"] > 1.5]]
        else:
            nocb = cascade(uk(), 0.6)
            checks += [["the central bank breaks the loop", r["final_pp"] < nocb["final_pp"] - 0.2 and r["forced_share"] > 0.5]]
        checks += [["every unit sold is accounted for", r["conserved"]]]
    elif scenario == "flat":
        r = cascade(make_world(60, 1.2, 0.1, np.random.default_rng(7)), 0.6)
        e("R", "M", "shock", "rate shock +0.60pp")
        e("M", "F", "revalue", "60 funds with almost no borrowing revalue")
        e("F", "F", "hold", "nobody crosses a limit: zero forced sales", ok=True)
        e("M", "M", "result", f"final +{r['final_pp']:.2f}pp: 0.6 in, 0.6 out", ok=True)
        checks += [["an unlevered world stays calm", r["final_pp"] == 0.6 and r["forced_share"] == 0]]
    elif scenario == "sweep":
        st["s"] = "UNKNOWN"
        e("S", "S", "unknown", "average leverage of the market: unknown")
        sw = sweep()
        for lm, v in sw.items():
            e("S", "M", f"lev {lm}", f"300 worlds at leverage {lm}: P(spiral > 1.5pp) = {v['p_spiral']*100:.0f}%", bad=v["p_spiral"] >= 0.5)
        st["s"] = "IT DEPENDS"
        e("M", "M", "verdict", "between 4 and 5.5 the answer flips from safe to spiral", bad=True)
        checks += [["the outcome jumps within one point of leverage", sw[4.0]["p_spiral"] <= 0.05 and sw[5.0]["p_spiral"] >= 0.5]]
    return dict(events=ev, checks=checks)

if __name__ == "__main__":
    for sc in ("uk", "cb", "flat", "sweep"):
        out = run(sc); print(f"\n== {sc}")
        for x in out["events"]: print(f"  {x['frm']}->{x['to']} [{x['state']}] {x['log']}")
        for t, ok in out["checks"]: print(f"  [{'PASS' if ok else 'FAIL'}] {t}")

"""
Maturity Wall Simulator - proof of concept (pure Python, standard library only).

Rolls a sovereign's bonds over one by one: every bond that matures is replaced
by a new one at that year's market yield. Compares the result with two common
shortcuts: "frozen" (today's average rate forever) and "jump" (all debt moves
to the market rate at once, the thought experiment in The Economist).

HONESTY: the bond list is SYNTHETIC: 35 years of simulated issuance for a
France-like country (63 bonds, debt 115.5% of GDP). It is not France's real list.
The same file runs natively and inside the browser (Pyodide).
"""
import json

MIX = {1: 0.10, 2: 0.10, 5: 0.27, 10: 0.33, 15: 0.10, 30: 0.10}
Y10 = {**{y: 5.0 for y in range(1991, 1999)}, 1999: 4.6, 2000: 5.4, 2001: 4.9, 2002: 4.9, 2003: 4.1,
       2004: 4.1, 2005: 3.4, 2006: 3.8, 2007: 4.3, 2008: 4.2, 2009: 3.6, 2010: 3.1, 2011: 3.3,
       2012: 2.5, 2013: 2.2, 2014: 1.7, 2015: 0.8, 2016: 0.5, 2017: 0.8, 2018: 0.8, 2019: 0.1,
       2020: -0.1, 2021: 0.1, 2022: 1.7, 2023: 3.0, 2024: 3.0, 2025: 3.4, 2026: 4.3}
SLOPE = {1: -1.1, 2: -0.9, 5: -0.5, 10: 0.0, 15: 0.3, 30: 0.7}
DEF = {y: 3.6 for y in range(1991, 2027)}
DEF.update({2009: 7.2, 2010: 6.9, 2011: 5.2, 2020: 9.0, 2021: 6.5, 2022: 4.8, 2023: 5.5, 2024: 5.8, 2025: 5.4, 2026: 5.4})
G_HIST = 3.0
YRS = list(range(2027, 2037)); G = 2.0; PB = -2.9

def build_portfolio(start=1991, end=2026, d0=40.0):
    gdp = 100.0
    bonds = [{"issued": start - 1 - k % 10, "mat": start + k % 10, "face": d0 / 10, "cpn": 5.5} for k in range(10)]
    for y in range(start, end + 1):
        gdp *= 1 + G_HIST / 100
        maturing = sum(b["face"] for b in bonds if b["mat"] == y)
        bonds = [b for b in bonds if b["mat"] > y]
        gross = maturing + DEF[y] / 100 * gdp
        for m, w in MIX.items():
            bonds.append({"issued": y, "mat": y + m, "face": gross * w, "cpn": max(Y10[y] + SLOPE[m], 0.0)})
    k = 100.0 / gdp
    for b in bonds: b["face"] *= k
    return bonds

def bond_level(bonds, mkt):
    bs = [dict(b) for b in bonds]; gdp = 100.0; out = []; leak = 0.0
    for y in YRS:
        gdp *= 1 + G / 100
        before = sum(b["face"] for b in bs)
        interest = sum(b["face"] * b["cpn"] / 100 for b in bs)
        maturing = [b for b in bs if b["mat"] == y]
        bs = [b for b in bs if b["mat"] > y]
        need = sum(b["face"] for b in maturing) + interest - PB / 100 * gdp
        old_m = {}
        for b in maturing: old_m[b["mat"] - b["issued"]] = old_m.get(b["mat"] - b["issued"], 0) + b["face"]
        new_net = need - sum(old_m.values())
        for m, w in MIX.items():
            bs.append({"issued": y, "mat": y + m, "face": old_m.get(m, 0) + new_net * w, "cpn": max(mkt + SLOPE[m] + 0.5, 0)})
        after = sum(b["face"] for b in bs)
        leak = max(leak, abs(after - (before + interest - PB / 100 * gdp)))
        out.append({"y": y, "int": interest / gdp * 100, "debt": after / gdp * 100})
    return out, leak

def aggregate(d0, eff0, mode, mkt):
    d = d0; gdp = 100.0; out = []
    for y in YRS:
        r = eff0 if mode == "frozen" else sum(w * max(mkt + SLOPE[m] + 0.5, 0) for m, w in MIX.items())
        gdp *= 1 + G / 100
        interest = d * r / 100
        d = d + interest - PB / 100 * gdp
        out.append({"y": y, "int": interest / gdp * 100, "debt": d / gdp * 100})
    return out

def run(scenario="stay"):
    ev, checks = [], []
    st = {"s": "LOADED"}
    def e(frm, to, label, log, **kw): ev.append(dict(frm=frm, to=to, label=label, log=log, state=st["s"], **kw))
    bonds = build_portfolio()
    D = sum(b["face"] for b in bonds); eff0 = sum(b["face"] * b["cpn"] for b in bonds) / D
    e("L", "W", "load", f"{len(bonds)} bonds, debt {D:.1f}% of GDP, average rate {eff0:.2f}%")
    if scenario == "check":
        st["s"] = "CHECK"
        need = (3.5 - G) / (100 + G) * D
        e("W", "E", "all at 3.5%", "if all debt were refinanced at 3.5% with 2% growth")
        e("E", "R", "surplus", f"primary surplus needed to stabilise debt: {need:.1f}% of GDP", ok=True)
        e("R", "R", "vs 1.8%", "The Economist, real France: about 1.8%. Same order of magnitude.", ok=True)
        checks += [["required surplus is close to The Economist's 1.8%", abs(need - 1.8) < 0.3]]
        return dict(events=ev, checks=checks)
    wall = {y: sum(b["face"] for b in bonds if b["mat"] == y) for y in YRS}
    st["s"] = "WALL"
    e("W", "W", "wall", "maturing per year, % of GDP: " + ", ".join(f"{y % 100:02d}:{v:.1f}" for y, v in list(wall.items())[:6]))
    mkt = {"stay": 3.0, "up": 4.0, "down": 2.0}[scenario]
    bl, leak = bond_level(bonds, mkt)
    fr = aggregate(D, eff0, "frozen", mkt); jm = aggregate(D, eff0, "jump", mkt)
    st["s"] = f"10Y = {mkt:.0f}%"
    e("W", "E", "roll", f"roll every bond at a 10-year yield of {mkt:.1f}%")
    e("W", "A", "shortcuts", "same scenario, two shortcuts: frozen and jump")
    i31 = YRS.index(2031)
    e("E", "R", "bond", f"bond by bond: interest {bl[0]['int']:.2f}% (2027) -> {bl[i31]['int']:.2f}% (2031) -> {bl[-1]['int']:.2f}% (2036)")
    e("A", "R", "frozen", f"frozen: {fr[i31]['int']:.2f}% in 2031, debt {fr[-1]['debt']:.0f}% in 2036")
    e("A", "R", "jump", f"jump: {jm[0]['int']:.2f}% in 2027, {jm[i31]['int']:.2f}% in 2031")
    gap = bl[i31]["int"] - fr[i31]["int"]
    st["s"] = "RESULT"
    if scenario == "down":
        e("R", "R", "surprise", f"yields fall, but bond by bond interest still rises: {bl[0]['int']:.2f}% -> {bl[-1]['int']:.2f}%", bad=True)
        checks += [["falling yields: the full count still rises while the jump shortcut falls", bl[-1]["int"] > bl[0]["int"] and jm[0]["int"] < 2.75]]
    else:
        e("R", "R", "gap", f"2031 gap vs frozen: {gap:.2f}pp of GDP; debt 2036: {bl[-1]['debt']:.0f}%", bad=gap > 0.5)
        checks += [["the bond-by-bond count differs from frozen by more than 0.5pp of GDP", gap > 0.5]]
        if scenario == "up":
            stay_fr = aggregate(D, eff0, "frozen", 3.0)
            checks += [["the frozen shortcut does not react to yields at all", abs(stay_fr[-1]["debt"] - fr[-1]["debt"]) < 1e-9]]
    checks += [["no leaks: the debt identity holds every year", leak < 1e-6],
               ["the wall is uneven: 2027-2031 heavier than the years after", min(list(wall.values())[:5]) > max(list(wall.values())[5:])]]
    return dict(events=ev, checks=checks)

if __name__ == "__main__":
    for sc in ("stay", "up", "down", "check"):
        out = run(sc); print(f"\n== {sc}")
        for x in out["events"]: print(f"  {x['frm']}->{x['to']} [{x['state']}] {x['log']}")
        for t, ok in out["checks"]: print(f"  [{'PASS' if ok else 'FAIL'}] {t}")

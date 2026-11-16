"""
Comms Failover Broker - proof of concept (pure Python, standard library only).

Claim A (detect): a broker next to each terminal notices that the primary satellite link
  is gone within seconds (missed heartbeats), not when an operator calls it in.
Claim B (switch): it moves traffic to a second provider and to HF radio, by priority:
  command voice first, telemetry second, drone video last.
Claim C (enough): what survives the switch is enough to keep fighting units connected.

Four labs (run(scenario) for the website):
  1. normal    - one sector on the primary provider: everything fits
  2. cutoff    - the primary goes dark: how fast the broker notices and switches
  3. capacity  - what actually fits on the backup, class by class
  4. front     - 40 sectors cut at the same moment share the same backup

HONESTY: the sector, terminals, traffic and timings are SYNTHETIC (fixed seed 7).
The backup capacity is an APPROXIMATION: we scale the primary capacity by the ratio of
active satellites, 654 (OneWeb) to 10,020 (Starlink), as reported on 17 March 2026.
Satellites differ in throughput, so the real ratio could be better or worse; the order of
magnitude is the point. HF radio is modelled at 2.4 kbit/s per voice channel, 6 channels.
"""
import random, json

SEED = 7
PRIMARY_SATS, BACKUP_SATS = 10020, 654
RATIO = BACKUP_SATS / PRIMARY_SATS                     # about 6.5%
PRIMARY_MBPS = 400.0                                   # synthetic: capacity available to one sector
HB_PERIOD_S, HB_MISSES = 2, 3                          # heartbeat every 2 s, 3 misses = down

def sector(seed=SEED, terminals=120, drones=40):
    rng = random.Random(seed)
    return {"voice": [0.016] * terminals,                                  # Mbit/s per command voice channel
            "telemetry": [round(rng.uniform(0.05, 0.15), 3) for _ in range(terminals)],
            "video": [round(rng.uniform(3.0, 5.0), 2) for _ in range(drones)]}

def demand(s):
    return {k: round(sum(v), 2) for k, v in s.items()}

def allocate(cap, d):
    """Strict priority: voice, then telemetry, then video gets what is left."""
    out, left = {}, cap
    for k in ("voice", "telemetry", "video"):
        give = min(d[k], left); out[k] = round(give, 2); left -= give
    return out, round(left, 2)

def lab_normal():
    s = sector(); d = demand(s); a, left = allocate(PRIMARY_MBPS, d)
    return {"demand": d, "capacity": PRIMARY_MBPS, "alloc": a, "spare": left,
            "kept_pct": {k: 100.0 for k in d}}

def lab_cutoff(seed=SEED):
    rng = random.Random(seed); trials = 200; times = []
    for _ in range(trials):
        phase = rng.uniform(0, HB_PERIOD_S)                                 # when in the heartbeat cycle the link dies
        detect = phase + HB_PERIOD_S * HB_MISSES
        rejoin = rng.uniform(1.5, 4.0)                                      # backup terminal acquires and authenticates
        times.append(detect + rejoin)
    times.sort()
    return {"trials": trials, "median_s": round(times[trials // 2], 1), "p95_s": round(times[int(trials * .95)], 1),
            "operator_call_minutes": "10-30 (illustrative)"}

def lab_capacity():
    s = sector(); d = demand(s); cap = round(PRIMARY_MBPS * RATIO, 1)
    hf = 6 * 0.0024
    a, left = allocate(cap + hf, d)
    kept = {k: round(a[k] / d[k] * 100, 1) for k in d}
    return {"ratio_pct": round(RATIO * 100, 1), "backup_mbps": cap, "hf_mbps": round(hf, 4), "demand": d,
            "alloc": a, "kept_pct": kept, "drones_streaming": int(a["video"] // 4.0), "drones_total": len(s["video"])}

def lab_front(sectors=40):
    s = sector(); d = demand(s); regional = round(PRIMARY_MBPS * RATIO * 8, 1)      # backup beams over a region (synthetic: 8 sectors' worth)
    per = regional / sectors
    a, _ = allocate(per, d)
    kept = {k: round(a[k] / d[k] * 100, 1) for k in d}
    return {"sectors": sectors, "regional_backup_mbps": regional, "per_sector_mbps": round(per, 2), "kept_pct": kept}

def run_all():
    return {"normal": lab_normal(), "cutoff": lab_cutoff(), "capacity": lab_capacity(), "front": lab_front()}

# ---------- live lab for the website (poc-lab.js calls run(scenario)) ----------
def _ev(frm, to, label, log, state="", ok=False, bad=False):
    return {"frm": frm, "to": to, "label": label, "log": log, "state": state, "ok": ok, "bad": bad}

def run(sc):
    """Scenarios: normal | cutoff | capacity | front."""
    ev, ck = [], []
    if sc == "normal":
        r = lab_normal(); d = r["demand"]
        ev += [_ev("T", "B", "demand", f"one sector: voice {d['voice']} + telemetry {d['telemetry']} + video {d['video']} Mbit/s", f"{round(sum(d.values()),1)} Mbit/s"),
               _ev("B", "P", "primary", f"primary link carries it all; {r['spare']} Mbit/s spare of {r['capacity']}", "הכול עובר", ok=True)]
        ck += [["normal_fits", r["spare"] > 0]]
    elif sc == "cutoff":
        r = lab_cutoff()
        ev += [_ev("P", "B", "dark", "the primary link goes dark mid-operation", "נותק", bad=True),
               _ev("B", "B", "heartbeat", f"{HB_MISSES} missed heartbeats ({HB_PERIOD_S} s each) = link down", "זוהה"),
               _ev("B", "K", "switch", f"switched to backup + HF: median {r['median_s']} s, 95% within {r['p95_s']} s ({r['trials']} trials)", f"{r['median_s']} שניות", ok=True),
               _ev("B", "T", "compare", f"without a broker: someone notices and calls it in, {r['operator_call_minutes']} minutes", "ידני")]
        ck += [["switch_under_15s", r["p95_s"] < 15]]
    elif sc == "capacity":
        r = lab_capacity(); k = r["kept_pct"]
        ev += [_ev("K", "K", "ratio", f"backup capacity: {BACKUP_SATS} / {PRIMARY_SATS} satellites = {r['ratio_pct']}% of the primary (approximation)", f"{r['ratio_pct']}%"),
               _ev("K", "T", "voice", f"command voice kept: {k['voice']}%", f"קול {k['voice']}%", ok=k["voice"] == 100),
               _ev("K", "T", "telemetry", f"telemetry kept: {k['telemetry']}%", f"טלמטריה {k['telemetry']}%", ok=k["telemetry"] == 100),
               _ev("K", "T", "video", f"drone video kept: {k['video']}% ({r['drones_streaming']} of {r['drones_total']} drones still streaming)", f"וידאו {k['video']}%", bad=True)]
        ck += [["voice_kept", k["voice"] == 100], ["video_measured", True]]
    elif sc == "front":
        r = lab_front(); k = r["kept_pct"]
        ev += [_ev("P", "B", "dark", f"{r['sectors']} sectors lose the primary at the same moment", f"{r['sectors']} גזרות", bad=True),
               _ev("K", "B", "share", f"they share one regional backup: {r['per_sector_mbps']} Mbit/s each", f"{r['per_sector_mbps']} לכל אחת", bad=True),
               _ev("K", "T", "kept", f"kept per sector: voice {k['voice']}%, telemetry {k['telemetry']}%, video {k['video']}%", "מה נשאר", bad=True)]
        ck += [["front_measured", True]]
    return {"events": ev, "checks": ck}

if __name__ == "__main__":
    print(json.dumps(run_all(), ensure_ascii=False, indent=1))

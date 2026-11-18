"""Rebuild vo_script.txt from the **VO m:ss.s:** cues in 00_master_system.md and the
chapter files, and check that no line overlaps the next or crosses a segment cut.

    python3 tools/build_vo_script.py            # from docs/video/feature-library
"""
import csv, glob, os, re, sys

d = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rows = list(csv.DictReader(open(os.path.join(d, 'cut_sheet.csv'))))
segs = [(r['segment'], float(r['in_s']), float(r['out_s'])) for r in rows]

def secs(tc):
    m, s = tc.split(':')
    return int(m) * 60 + float(s)

cue_re = re.compile(r'\*\*VO (\d+:\d+(?:\.\d+)?):\*\*\s*"([^"]+)"')
cues = []
files = ['00_master_system.md'] + sorted(f for f in os.listdir(d) if f.startswith('ch') and f.endswith('.md'))
for f in files:
    txt = open(os.path.join(d, f)).read()
    for m in cue_re.finditer(txt):
        cues.append((secs(m.group(1)), m.group(2), f))
cues.sort()

problems = []
WPS = 2.4  # max comfortable words per second
for i, (t, line, f) in enumerate(cues):
    words = len(re.findall(r"[\w₹'’-]+", line))
    need = words / WPS
    nxt = cues[i + 1][0] if i + 1 < len(cues) else 1077.5
    if t + need > nxt - 0.15:
        problems.append(f"overlap: {t:.1f} '{line}' needs {need:.1f}s, next at {nxt:.1f}")
    # which window is it in?
    seg = next((s for s, a, b in segs if a <= t < b), None)
    card = seg is None
    if card:
        # cards are the 2.5 s before each chapter's first segment, or opening/end
        ok = t < 5.0 or t >= 1070.0 or any(abs(t - (a - 2.5)) < 2.5 and t < a for s, a, b in segs)
        if not ok:
            problems.append(f"outside any segment/card: {t:.1f} '{line}' ({f})")
    else:
        a, b = next((a, b) for s, a, b in segs if s == seg)
        if t + need > b + 0.01:
            problems.append(f"runs past segment {seg} end ({b}): {t:.1f} '{line}'")

total_words = sum(len(re.findall(r"[\w₹'’-]+", c[1])) for c in cues)

def tc(s):
    m = int(s // 60); r = s - 60 * m
    return f"{m:02d}:{r:05.2f}"

chapter_names = {
 'ch01': 'CH01 FLOW BUILDER', 'ch02': 'CH02 OPT-IN TOOLS', 'ch03': 'CH03 CAMPAIGNS', 'ch04': 'CH04 AUDIENCE CRM',
 'ch05': 'CH05 JOURNEYS', 'ch06': 'CH06 WEBSITE PIXEL', 'ch07': 'CH07 AI BRAIN', 'ch08': 'CH08 META MANAGER',
 'ch09': 'CH09 CHAT RULES', 'ch10': 'CH10 WARRANTY', 'ch11': 'CH11 PROFIT & COSTS', 'ch12': 'CH12 INTENT DETECTION',
}
out = []
out.append('TOPEDGE AI — "EVERY FEATURE, SHOWN" — VOICEOVER SCRIPT (17:57.5, narrated master only)')
out.append('Website cut-downs are silent. Generated from the VO cues in the shot lists: if a line changes, change it there and regenerate.')
out.append('')
out.append('CASTING      Warm, confident, conversational Indian English; founder-to-founder; age 28–38; unhurried. Not trailer, not radio, not ASMR.')
out.append('PRONOUNCE    TopEdge = TOP-edge · COD = see-oh-dee · WhatsApp = WOTS-app · lakh = laakh · Hinglish lines as a native speaker says them')
out.append('             (kab aayega = kub aa-YE-gaa · kidhar = KID-har · karna hai = KUR-naa hai) · ₹ always read as "rupees" after the number.')
out.append('ELEVENLABS   Eleven v3 or Multilingual v2 · Stability 45 · Similarity 78 · Style 20 · Speaker boost ON · Speed 1.00.')
out.append('             Generate EACH LINE SEPARATELY, 3–4 takes, place at the timecode. Keep breaths (−6 to −8 dB).')
out.append('POST         HPF 80 Hz → de-ess 5–7 kHz (≤ −3 dB) → 2:1 comp → +1.5 dB at 2–3 kHz. No reverb. Room tone −62 dBFS under the VO bus.')
out.append('MARKS        / short pause · // long pause · CAPS = stress · … = let it hang')
out.append('')
out.append('TIME (mm:ss.cc)  LINE                                                                                   DIRECTION')
cur = None
for t, line, f in cues:
    key = f[:4]
    head = 'OPENING / END' if f.startswith('00_') else chapter_names.get(key, key)
    if head != cur:
        out.append('')
        out.append(f'— {head} —')
        cur = head
    words = len(re.findall(r"[\w₹'’-]+", line))
    dur = words / 2.2
    direction = 'land it, then a beat of air' if line.endswith('.') else 'carry into the next line, no drop'
    if f.startswith('00_'):
        direction = 'on the downbeat with the sonic logo; warm, slow' if t < 5 or t > 1060 else direction
    if line.lower().startswith(('flow builder', 'opt-in', 'campaigns.', 'audience crm', 'journeys.', 'the website pixel', 'ai brain', 'meta manager', 'chat rules', 'warranty.', 'profit and costs', 'intent detection')):
        direction = 'chapter title: name, short pause, then the promise'
    out.append(f'{tc(t)}–{tc(t + dur)}  {line:<88} {direction}')
out.append('')
out.append(f'Lines: {len(cues)} · Words: {total_words} · Average {total_words / 1077.5:.2f} words/sec over the film (sparse on purpose: the pictures carry the story).')
out.append('Do not add words. If a take runs long, trim the pause after it, never the next line\'s start.')
open(os.path.join(d, 'vo_script.txt'), 'w').write('\n'.join(out) + '\n')

print(f'{len(cues)} cues, {total_words} words')
print('\n'.join(problems) if problems else 'sync check: no problems')

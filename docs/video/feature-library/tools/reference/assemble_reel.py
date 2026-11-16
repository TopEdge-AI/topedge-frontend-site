#!/usr/bin/env python3
"""Assemble the timeline-exact reference reel (1920x1080, 30 fps, silent) from the
recorded scene clips and the rendered cards.

    python3 assemble_reel.py <clips-dir> <cards-dir> <work-dir> [--jobs 4]

  <clips-dir>  output of record_scenes.cjs  (<segment>.mp4)
  <cards-dir>  output of render_cards.cjs   (open.mp4, card01..card12.mp4, end.mp4)
  <work-dir>   pieces + the reel: <work-dir>/topedge-feature-library-reference.mp4

Order and timing come from cut_sheet.csv: opening 0:00-0:05, a 2.5 s chapter card
before each chapter's first segment, every segment at its exact master in/out, a
2.5 s dissolve bridge in every gap, and the end card after the last segment.
Tiles sit in the centred 1:1 window and heroes/showcases in the centred 16:10
window over a blurred wash of the same scene, so cut_segments.sh can cut the
website clips straight out of the reel. No hard cuts: every boundary dissolves.
"""
import argparse, csv, os, subprocess
from concurrent.futures import ThreadPoolExecutor

PKG = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FPS, W, H = 30, 1920, 1080
ENC = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', str(FPS),
       '-video_track_timescale', '15360', '-an']


def run(args):
    subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y'] + args, check=True)


def frames(sec):
    return round(sec * FPS)


def build_timeline():
    segs = list(csv.DictReader(open(os.path.join(PKG, 'cut_sheet.csv'), newline='')))
    items = [(0.0, 5.0, 'open', 'open', None)]
    seen = set()
    for s in segs:
        ch, start = s['segment'][:2], float(s['in_s'])
        if ch not in seen:
            seen.add(ch)
            items.append((start - 2.5, start, 'card', f'card{ch}', None))
        items.append((start, float(s['out_s']), 'seg', s['segment'], s['aspect']))
    last = items[-1][1]
    items.append((last + 2.5, last + 10.0, 'end', 'end', None))
    pieces = []
    for it in items:
        if pieces and pieces[-1][1] < it[0] - 1e-6:
            pieces.append((pieces[-1][1], it[0], 'bridge', f'bridge{len(pieces):03d}', None))
        assert not pieces or abs(pieces[-1][1] - it[0]) < 1e-6, f'overlap at {it}'
        pieces.append(it)
    return pieces


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('clips'); ap.add_argument('cards'); ap.add_argument('work')
    ap.add_argument('--jobs', type=int, default=4)
    a = ap.parse_args()
    out_dir = os.path.join(a.work, 'pieces'); stills = os.path.join(a.work, 'stills')
    os.makedirs(out_dir, exist_ok=True); os.makedirs(stills, exist_ok=True)
    pieces = build_timeline()
    total = pieces[-1][1]
    print(f'{len(pieces)} pieces, {sum(p[2] == "seg" for p in pieces)} segments, total {total} s')

    def seg(p):
        start, end, _, name, aspect = p
        out = os.path.join(out_dir, name + '.mp4')
        fg = f'scale={H}:{H}:flags=lanczos' if aspect == '1:1' else f'scale={H * 16 // 10}:{H}:flags=lanczos'
        vf = (f'[0:v]fps={FPS},tpad=stop_mode=clone:stop_duration=8,trim=end_frame={frames(end - start)},setpts=PTS-STARTPTS,split[a][b];'
              f'[a]scale={W}:-2,crop={W}:{H},boxblur=48:3,eq=brightness=0.025:saturation=1.1[bg];'
              f'[b]{fg}[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p')
        run(['-i', os.path.join(a.clips, name + '.mp4'), '-filter_complex', vf, '-frames:v', str(frames(end - start))] + ENC + [out])
        return name

    with ThreadPoolExecutor(max_workers=a.jobs) as ex:
        for name in ex.map(seg, [p for p in pieces if p[2] == 'seg']):
            print('segment', name, flush=True)

    def src(p):
        return os.path.join(out_dir if p[2] == 'seg' else a.cards, p[3] + '.mp4')

    first = {}
    for p in pieces:
        if p[2] != 'bridge':
            first[p[3]] = os.path.join(stills, p[3] + '-first.png')
            run(['-i', src(p), '-frames:v', '1', first[p[3]]])

    for i, p in enumerate(pieces):
        start, end, kind, name, _ = p
        dur = end - start
        out = os.path.join(out_dir, name + '.mp4')
        nxt = pieces[i + 1] if i + 1 < len(pieces) else None
        if kind in ('open', 'card', 'end'):
            if nxt is None or nxt[2] == 'bridge':
                run(['-i', src(p), '-frames:v', str(frames(dur))] + ENC + [out])
            else:  # dissolve the last 0.5 s into the next piece's first frame
                vf = (f'[0:v]fps={FPS},format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS[a];'
                      f'[1:v]fps={FPS},scale={W}:{H},format=yuv420p,settb=AVTB[b];'
                      f'[a][b]xfade=transition=fade:duration=0.5:offset={dur - 0.5}')
                run(['-i', src(p), '-loop', '1', '-t', '1', '-i', first[nxt[3]], '-filter_complex', vf,
                     '-frames:v', str(frames(dur))] + ENC + [out])
    for i, p in enumerate(pieces):
        start, end, kind, name, _ = p
        if kind != 'bridge':
            continue
        dur, prev, nxt = end - start, pieces[i - 1], pieces[i + 1]
        last = os.path.join(stills, prev[3] + '-last.png')
        run(['-sseof', '-0.3', '-i', os.path.join(out_dir, prev[3] + '.mp4'), '-update', '1', last])
        hold = 0.3
        vf = (f'[0:v]fps={FPS},scale={W}:{H},format=yuv420p,settb=AVTB[a];'
              f'[1:v]fps={FPS},scale={W}:{H},format=yuv420p,settb=AVTB[b];'
              f'[a][b]xfade=transition=fade:duration={dur - 2 * hold:.3f}:offset={hold}')
        run(['-loop', '1', '-t', str(dur), '-i', last, '-loop', '1', '-t', str(dur), '-i', first[nxt[3]],
             '-filter_complex', vf, '-frames:v', str(frames(dur))] + ENC + [os.path.join(out_dir, name + '.mp4')])

    concat = os.path.join(a.work, 'concat.txt')
    with open(concat, 'w') as f:
        for p in pieces:
            f.write(f"file '{os.path.abspath(os.path.join(out_dir, p[3] + '.mp4'))}'\n")
    reel = os.path.join(a.work, 'topedge-feature-library-reference.mp4')
    run(['-f', 'concat', '-safe', '0', '-i', concat, '-c', 'copy', '-movflags', '+faststart', reel])
    n = subprocess.run(['ffprobe', '-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets',
                        '-of', 'csv=p=0', reel], capture_output=True, text=True).stdout.strip()
    print(f'reel {reel}: {n} frames (expected {frames(total)})')


if __name__ == '__main__':
    main()

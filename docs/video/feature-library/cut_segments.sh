#!/usr/bin/env bash
# Cut the 78 website clips out of the rendered master film.
#
#   ./cut_segments.sh <master.mov|mp4> <out-dir> [segment-filter]
#
# Reads cut_sheet.csv (next to this script). For every segment it trims the
# master at the frame-exact in/out points, crops the segment's safe window
# (16:9 full frame, 16:10 centred = 3456x2160 at x=192 on a 4K master,
# 1:1 centred = 2160x2160 at x=840), scales to the website size and writes:
#   <file>.mp4         H.264 High, 30 fps, CRF 21, yuv420p, +faststart, no audio
#   <file>.webm        VP9, CRF 34, no audio
#   <file>-rest.jpg    poster: the opening rest frame
#   <file>-result.jpg  poster for reduced motion: the held result frame
# Optional third argument filters segments by id prefix, e.g. "02-" or "05-S1".
# Crops are relative to the frame height, so the same sheet also cuts the
# 1920x1080 reference reel.
# Needs ffmpeg with libx264 and libvpx-vp9.
set -euo pipefail

MASTER="${1:?usage: cut_segments.sh <master> <out-dir> [filter]}"
OUT="${2:?usage: cut_segments.sh <master> <out-dir> [filter]}"
FILTER="${3:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
SHEET="$HERE/cut_sheet.csv"
mkdir -p "$OUT"

# Columns: segment,chapter,kind,title,master_in,master_out,in_s,out_s,duration_s,aspect,crop_from_4k,export,site_page,site_slot,replaces_key,file
python3 - "$SHEET" "$FILTER" <<'PY' | while IFS='|' read -r seg in_s out_s aspect export file; do
import csv, sys
sheet, flt = sys.argv[1], sys.argv[2]
for r in csv.DictReader(open(sheet, newline='')):
    if flt and not r['segment'].startswith(flt):
        continue
    print('|'.join([r['segment'], r['in_s'], r['out_s'], r['aspect'], r['export'], r['file']]))
PY
  case "$aspect" in
    "16:9")  crop="crop=iw:ih:0:0" ;;
    "16:10") crop="crop=trunc(ih*8/5/2)*2:ih:(iw-ow)/2:0" ;;
    "1:1")   crop="crop=ih:ih:(iw-ow)/2:0" ;;
    *) echo "unknown aspect $aspect for $seg" >&2; exit 1 ;;
  esac
  w="${export%x*}"; h="${export#*x}"
  vf="$crop,scale=${w}:${h}:flags=lanczos,fps=30"
  base="$OUT/${file%.mp4}"
  dur=$(python3 -c "print(round(float('$out_s') - float('$in_s'), 3))")
  rest=$(python3 -c "print(round(float('$in_s') + 0.25, 3))")
  result=$(python3 -c "print(round(float('$out_s') - 0.5, 3))")

  echo "== $seg  $in_s–$out_s s  $aspect → $export  $file"
  ffmpeg -nostdin -v error -y -ss "$in_s" -i "$MASTER" -t "$dur" -vf "$vf" -an \
    -c:v libx264 -profile:v high -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart "$base.mp4"
  ffmpeg -nostdin -v error -y -ss "$in_s" -i "$MASTER" -t "$dur" -vf "$vf" -an \
    -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 "$base.webm"
  ffmpeg -nostdin -v error -y -ss "$rest" -i "$MASTER" -frames:v 1 -vf "$crop,scale=${w}:${h}:flags=lanczos" -q:v 3 "$base-rest.jpg"
  ffmpeg -nostdin -v error -y -ss "$result" -i "$MASTER" -frames:v 1 -vf "$crop,scale=${w}:${h}:flags=lanczos" -q:v 3 "$base-result.jpg"
done

echo "done → $OUT"

#!/usr/bin/env bash
# Home-page feature films (16:9 on every viewport, played by DemoProductVideoFrame).
#   video/scripts/cut_home.sh <render-dir> <out-dir> <id>=<name> ...
# Writes <name>.mp4 (1600x900), <name>-mobile.mp4 (960x540) and <name>-poster.jpg,
# after folding the 0.5 s render tail into the head for a seamless loop.
set -euo pipefail
IN="$1"; OUT="$2"; shift 2
mkdir -p "$OUT"
TAIL=0.5
for pair in "$@"; do
  id="${pair%%=*}"; name="${pair#*=}"
  src="$IN/$id.mp4"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  off=$(python3 -c "print(round($dur - 2*$TAIL, 3))")
  fold="[0:v]split[a][b];[b]trim=0:$TAIL,setpts=PTS-STARTPTS[h];[a]trim=$TAIL,setpts=PTS-STARTPTS[t];[t][h]xfade=transition=fade:duration=$TAIL:offset=$off,fps=30,format=yuv420p"
  ffmpeg -nostdin -v error -y -i "$src" -filter_complex "$fold,scale=1600:900:flags=lanczos" -an -c:v libx264 -profile:v high -preset slow -crf 23 -movflags +faststart "$OUT/$name.mp4"
  ffmpeg -nostdin -v error -y -i "$src" -filter_complex "$fold,scale=960:540:flags=lanczos" -an -c:v libx264 -profile:v high -preset slow -crf 25 -movflags +faststart "$OUT/$name-mobile.mp4"
  ffmpeg -nostdin -v error -y -ss 1.6 -i "$OUT/$name.mp4" -frames:v 1 -vf scale=1280:720 -q:v 4 "$OUT/$name-poster.jpg"
  echo "$name: $(du -h "$OUT/$name.mp4" | cut -f1) / $(du -h "$OUT/$name-mobile.mp4" | cut -f1) mobile"
done

#!/usr/bin/env bash
# Home-page launch films, played by DemoProductVideoFrame.
#   video/scripts/cut_home.sh <render-dir> <out-dir> <id>=<name> ...
# Reads <id>.mp4 (16:9 render) and <id>-m.mp4 (4:5 phone render). Writes
#   <name>.mp4 (1600x900), <name>-poster.jpg (1280x720)
#   <name>-mobile.mp4 (720x900), <name>-mobile-poster.jpg (720x900)
# after folding the 0.5 s render tail into the head for a seamless loop.
# Posters are frame 0, so poster → playback has no jump.
set -euo pipefail
IN="$1"; OUT="$2"; shift 2
mkdir -p "$OUT"
TAIL=0.5
fold() {
  local src="$1"
  local dur off
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  off=$(python3 -c "print(round($dur - 2*$TAIL, 3))")
  echo "[0:v]split[a][b];[b]trim=0:$TAIL,setpts=PTS-STARTPTS[h];[a]trim=$TAIL,setpts=PTS-STARTPTS[t];[t][h]xfade=transition=fade:duration=$TAIL:offset=$off,fps=30,format=yuv420p"
}
for pair in "$@"; do
  id="${pair%%=*}"; name="${pair#*=}"
  ffmpeg -nostdin -v error -y -i "$IN/$id.mp4" -filter_complex "$(fold "$IN/$id.mp4"),scale=1600:900:flags=lanczos" -an -c:v libx264 -profile:v high -preset slow -crf 23 -movflags +faststart "$OUT/$name.mp4"
  ffmpeg -nostdin -v error -y -i "$IN/$id-m.mp4" -filter_complex "$(fold "$IN/$id-m.mp4"),scale=720:900:flags=lanczos" -an -c:v libx264 -profile:v high -preset slow -crf 25 -movflags +faststart "$OUT/$name-mobile.mp4"
  ffmpeg -nostdin -v error -y -i "$OUT/$name.mp4" -frames:v 1 -vf scale=1280:720 -q:v 4 "$OUT/$name-poster.jpg"
  ffmpeg -nostdin -v error -y -i "$OUT/$name-mobile.mp4" -frames:v 1 -q:v 4 "$OUT/$name-mobile-poster.jpg"
  echo "$name: $(du -h "$OUT/$name.mp4" | cut -f1) desktop / $(du -h "$OUT/$name-mobile.mp4" | cut -f1) phone"
done

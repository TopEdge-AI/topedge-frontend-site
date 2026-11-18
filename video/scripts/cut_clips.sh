#!/usr/bin/env bash
# Turn rendered film compositions into website clips.
#
#   video/scripts/cut_clips.sh <render-dir> <out-dir> <id>=<name> [<id>=<name> ...]
#   e.g. video/scripts/cut_clips.sh /tmp/film public/marketing/feature-clips/journeys 05-T1=t1 05-S1=s1
#
# Each render is the segment plus a 0.5 s tail. The tail is cross-faded into the
# head so the clip loops with no visible restart. Then per clip:
#   <name>.mp4 / .webm          1:1 tiles at 800x800; 16:10 showcases at 1280x800;
#                               16:9 heroes / home films at 1600x900
#   <name>-sq.mp4 / -sq.webm    showcases only: centred 1:1 cut at 720x720 for phones
#   <name>-m.mp4 / -m.webm      16:9 films only: centred 4:3 cut at 960x720 for phones
#   <name>-poster.jpg           first frame (shown before playback starts)
#   <name>-result.jpg           the held result (shown for reduced motion)
set -euo pipefail
IN="$1"; OUT="$2"; shift 2
mkdir -p "$OUT"
TAIL=0.5
for pair in "$@"; do
  id="${pair%%=*}"; name="${pair#*=}"
  src="$IN/$id.mp4"
  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$src")
  h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$src")
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  len=$(python3 -c "print(round($dur - $TAIL, 3))")
  off=$(python3 -c "print(round($dur - 2*$TAIL, 3))")
  # loop fold: output = frames [TAIL, dur) with the last TAIL dissolving into frames [0, TAIL)
  fold="[0:v]split[a][b];[b]trim=0:$TAIL,setpts=PTS-STARTPTS[h];[a]trim=$TAIL,setpts=PTS-STARTPTS[t];[t][h]xfade=transition=fade:duration=$TAIL:offset=$off,fps=30,format=yuv420p"
  enc() { # <filter-suffix> <file-base>
    ffmpeg -nostdin -v error -y -i "$src" -filter_complex "$fold,$1" -an -c:v libx264 -profile:v high -preset slow -crf 23 -movflags +faststart "$2.mp4"
    ffmpeg -nostdin -v error -y -i "$src" -filter_complex "$fold,$1" -an -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -deadline good -cpu-used 2 "$2.webm"
    ffmpeg -nostdin -v error -y -i "$2.mp4" -frames:v 1 -q:v 3 "$2-poster.jpg"
    ffmpeg -nostdin -v error -y -sseof -0.9 -i "$2.mp4" -frames:v 1 -q:v 3 "$2-result.jpg"
  }
  shape=$(python3 -c "r=$w/$h; print('tile' if abs(r-1)<0.02 else 'hero' if abs(r-16/9)<0.02 else 'show')")
  if [ "$shape" = "tile" ]; then
    enc "scale=800:800:flags=lanczos" "$OUT/$name"
  elif [ "$shape" = "hero" ]; then
    enc "scale=1600:900:flags=lanczos" "$OUT/$name"
    enc "crop=ih*4/3:ih:(iw-ih*4/3)/2:0,scale=960:720:flags=lanczos" "$OUT/$name-m"
  else
    enc "scale=1280:800:flags=lanczos" "$OUT/$name"
    enc "crop=ih:ih:(iw-ih)/2:0,scale=720:720:flags=lanczos" "$OUT/$name-sq"
  fi
  echo "$name: $(du -h "$OUT/$name.mp4" | cut -f1) mp4, $(du -h "$OUT/$name.webm" | cut -f1) webm, ${len}s"
done

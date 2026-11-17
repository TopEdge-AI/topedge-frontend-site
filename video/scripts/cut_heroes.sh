#!/usr/bin/env bash
# Feature-page heroes from launch films.
#   video/scripts/cut_heroes.sh <render-dir> <clips-dir>
# Every hero gets a 4:3 phone cut, <dir>/h-m.mp4 (960x720), from L-<film>-h43.
# Pages that share a home film play public/.../home/<film>.mp4 on desktop, so
# they keep no desktop copy; the four pages without one get <dir>/h.mp4
# (1600x900) and <dir>/h-poster.jpg. Older hero files (WebM, result stills,
# a separate phone poster) are removed so nothing stale is left behind.
set -euo pipefail
IN="$1"; OUT="$2"
TAIL=0.5
# dir:film:shared
PAGES="flow:flow:1 optin:optin:1 campaigns:campaigns:1 crm:identity:1 journeys:cart:1 pixel:pixel:1 profit:profit:1 intent:intent:1 brain:brain:0 meta:meta:0 rules:rules:0 warranty:warranty:0"
fold() {
  local dur off
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$1")
  off=$(python3 -c "print(round($dur - 2*$TAIL, 3))")
  echo "[0:v]split[a][b];[b]trim=0:$TAIL,setpts=PTS-STARTPTS[h];[a]trim=$TAIL,setpts=PTS-STARTPTS[t];[t][h]xfade=transition=fade:duration=$TAIL:offset=$off,fps=30,format=yuv420p"
}
for p in $PAGES; do
  IFS=: read -r dir film shared <<<"$p"
  d="$OUT/$dir"
  rm -f "$d/h.webm" "$d/h-m.webm" "$d/h-result.jpg" "$d/h-m-result.jpg" "$d/h-m-poster.jpg"
  src="$IN/L-$film-h43.mp4"
  ffmpeg -nostdin -v error -y -i "$src" -filter_complex "$(fold "$src"),scale=960:720:flags=lanczos" -an -c:v libx264 -profile:v high -preset slow -crf 24 -movflags +faststart "$d/h-m.mp4"
  if [ "$shared" = 1 ]; then
    rm -f "$d/h.mp4" "$d/h-poster.jpg"
  else
    src="$IN/L-$film.mp4"
    ffmpeg -nostdin -v error -y -i "$src" -filter_complex "$(fold "$src"),scale=1600:900:flags=lanczos" -an -c:v libx264 -profile:v high -preset slow -crf 23 -movflags +faststart "$d/h.mp4"
    ffmpeg -nostdin -v error -y -i "$d/h.mp4" -frames:v 1 -vf scale=1280:720 -q:v 4 "$d/h-poster.jpg"
  fi
  echo "$dir: $(ls "$d" | grep '^h' | tr '\n' ' ')"
done

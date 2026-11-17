#!/usr/bin/env bash
# Cut every rendered composition in <render-dir> into website clips.
#   video/scripts/cut_all.sh <render-dir>
# Chapter segments NN-H / NN-T1 / NN-S1 go to public/marketing/feature-clips/<page>/{h,t1,s1}.*
# Home films go to public/marketing/feature-clips/home/<story>.*  Skips missing renders.
set -euo pipefail
IN="$1"
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
OUT="$ROOT/public/marketing/feature-clips"
declare -A DIRS=([01]=flow [02]=optin [03]=campaigns [04]=crm [05]=journeys [06]=pixel [07]=brain [08]=meta [09]=rules [10]=warranty [11]=profit [12]=intent)
for f in "$IN"/[0-9][0-9]-*.mp4; do
  [ -e "$f" ] || continue
  id="$(basename "$f" .mp4)"; ch="${id%%-*}"; part="${id#*-}"
  slot="$(echo "$part" | tr 'HTS' 'hts')"
  "$HERE/cut_clips.sh" "$IN" "$OUT/${DIRS[$ch]}" "$id=$slot"
done
declare -A HOME=([home-cart]=cart [home-campaigns]=campaigns [home-optin]=optin [06-H]=pixel [home-cod]=cod [home-flow]=flow [home-intent]=intent [04-H]=identity [home-segments]=segments [11-H]=profit)
for id in "${!HOME[@]}"; do
  [ -e "$IN/$id.mp4" ] || continue
  "$HERE/cut_home.sh" "$IN" "$OUT/home" "$id=${HOME[$id]}"
done

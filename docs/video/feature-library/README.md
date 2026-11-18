# Feature Library Film — production package

One narrated product film, **"Every feature, shown"** (17:57.5, 3840×2160, 60 fps, 12 chapters), built so that **78 silent loops can be cut straight out of it** and placed on the feature pages of topedgeai.com: every hero, bento tile and showcase row.

Written with the `premium-saas-video` skill. Every scene is a short micro‑journey: a real shopper or merchant doing one thing in the product, start to finish. The store UI plays first. When WhatsApp takes over, the iPhone slides in. Then the result lands.

## What's in here

| File | What it is |
|---|---|
| `00_master_system.md` | **The master prompt.** Brief, strategy, non-negotiables (nothing AI-looking), look and card system, motion language, the full **Data Bible** (stores, people, order IDs and every number on screen, all of which add up), music, SFX, mix, match-cut map, opening and end-card shot lists, QA checklist and build notes. Always paste this first. |
| `ch01_flow_builder.md` … `ch12_intent_detection.md` | One file per feature page. Chapter card plus every segment, second by second: picture (**V**), camera (**C**), sound (**S**) and VO cues with master timecodes, plus the slot it replaces on the site, its palette/pattern and its micro-journey. |
| `cut_sheet.csv` | The 78 segments: master in/out (on 2.5 s bar lines), aspect, crop window, export size, page, slot, the image it replaces and the output file name. |
| `vo_script.txt` | Voiceover for the narrated master: 170 lines, 1,098 words, timecoded, with casting, pronunciation and ElevenLabs settings. The website loops are silent. |
| `cut_segments.sh` | Cuts every website clip out of a rendered master: MP4 (H.264) + WebM (VP9) + rest and result posters. |
| `tools/build_vo_script.py` | Rebuilds `vo_script.txt` from the VO cues in the Markdown files and checks that no line overlaps the next or crosses a cut. Run it after editing any VO line. |
| `tools/reference/` | Rebuilds the reference reel from the live coded scenes (see below). |

## Timeline at a glance

| | Master | Segments |
|---|---|---|
| Opening title | 0:00.0–0:05.0 | — |
| 01 Flow Builder | 0:05.0–1:22.5 | 3 tiles, 3 showcases (page hero keeps its demo video) |
| 02 Opt-in tools | 1:22.5–2:57.5 | 3 tiles, 4 showcases (hero keeps its video) |
| 03 Campaigns | 2:57.5–4:32.5 | hero, 3 tiles, 3 showcases |
| 04 Audience CRM | 4:32.5–6:07.5 | hero, 3 tiles, 3 showcases |
| 05 Journeys | 6:07.5–7:30.0 | 3 tiles, 3 showcases (hero keeps its video) |
| 06 Website pixel | 7:30.0–9:05.0 | hero, 3 tiles, 3 showcases |
| 07 AI Brain | 9:05.0–10:40.0 | hero, 3 tiles, 3 showcases |
| 08 Meta manager | 10:40.0–12:15.0 | hero, 3 tiles, 3 showcases |
| 09 Chat rules | 12:15.0–13:50.0 | hero, 3 tiles, 3 showcases |
| 10 Warranty | 13:50.0–14:55.0 | hero, 3 showcases |
| 11 Profit & costs | 14:55.0–16:30.0 | hero, 3 tiles, 3 showcases |
| 12 Intent detection | 16:30.0–17:50.0 | 3 tiles, 3 showcases (hero keeps its video) |
| End card | 17:50.0–17:57.5 | — |

Tiles run 7.5 s, showcases 12.5 s (four run 15 s), heroes 15 s. A 2.5 s match-cut bridge sits between segments and a 2.5 s card opens each chapter.

## Reference reel (watch this first)

`topedge-feature-library-reference.mp4` is the whole timeline (17:57.5, 1920×1080, 30 fps, silent) assembled from **the current coded scenes on the website**. It has the opening title, all 12 chapter cards, every segment at its exact master in/out, dissolve bridges and the end card. Use it as the animatic. It shows each segment's beats, layout and timing.

- The binaries are not committed to git. Rebuild them with the tools below.
- It is a reference, not the final film. Wherever the reel and the Markdown differ (for example an order ID or a number), **the Markdown wins**. The Data Bible fixes the coded scenes' inconsistencies and raises the craft.
- Because tiles sit in the centred 1:1 window and showcases/heroes in the centred 16:10 window, `cut_segments.sh` can already cut working site clips out of it.

Rebuild it from the repo root. First serve the production build on :4173:

```bash
npm run build && npx vite preview --port 4173 --open false
```

Then, in a second shell, render the scenes, render the cards, and assemble the reel:

```bash
node docs/video/feature-library/tools/reference/record_scenes.cjs /tmp/ref/clips --workers 4 --wide 1728x1080
```

```bash
node docs/video/feature-library/tools/reference/render_cards.cjs /tmp/ref/cards
```

```bash
python3 docs/video/feature-library/tools/reference/assemble_reel.py /tmp/ref/clips /tmp/ref/cards /tmp/ref/reel
```

- `record_scenes.cjs` renders every scene **frame by frame at exactly 30 fps**. The page runs on a paused virtual clock and every CSS animation is scrubbed to the same instant before each screenshot, so nothing drops or stutters even on a machine without a GPU. Real-time screen recording only reaches about 5 fps there. Each scene plays one cycle, is caught on its clean restart, and then holds its final state for the segment's full length. On 4 CPU cores the 78 scenes take about 2 hours. Use `--only 05-S1,09-H` to re-render a few. Use `--wide 1920x1200` for full website size.
- `render_cards.cjs` renders the opening title, the 12 chapter cards and the end card the same way, from `cards.html`.
- If Playwright says its browser is missing, set `CHROMIUM_PATH=/path/to/chromium`.

## How to produce the film

**Route A: Remotion (recommended).** The film is product UI with exact copy, numbers and brand marks. Code renders that perfectly at 4K/60. Pixel video generators (Sora, Veo, Kling, Runway) invent text and wobble UI. The project structure is in `00_master_system.md` §12. Build each segment as its own composition at its native aspect, plus `Master.tsx` that sequences everything at the cut-sheet timecodes. The website's `src/marketing/components/visuals/kit.tsx` and the `feature-*.css` files are the visual source. Reuse their tokens, radii and shadows.

**Route B: a motion designer** (After Effects, Rive, Jitter, Framer). Hand over this folder plus the reference reel. Every shot is specified to the frame.

**Route C: AI chat that writes Remotion code.** Paste `00_master_system.md` first, then one chapter file. Attach the logo SVG, `cut_sheet.csv` and that chapter's reference clips. Ask for one segment at a time and check each against its shot list.

Pixel generators are only for the optional ambient plates in §12: aurora light loops, the Diwali night sky, and studio product shots if real ones are missing. They never generate text, UI or people.

**Voice:** generate each line of `vo_script.txt` separately in ElevenLabs (settings in the file). Place each one at its timecode and run the post chain listed there. **Music and SFX:** brief in §6–7, mix and loudness in §8.

## Cutting the website clips

```bash
docs/video/feature-library/cut_segments.sh master.mov out/
```

```bash
docs/video/feature-library/cut_segments.sh master.mov out/ 05-
```

The first command cuts all 78. The second cuts only chapter 5 (the third argument filters by segment-ID prefix, e.g. `05-S1`). For each segment it writes `<file>.mp4` (H.264, 30 fps, CRF 21, faststart, no audio), `<file>.webm` (VP9), `<file>-rest.jpg` and `<file>-result.jpg`. Crops are relative to frame height, so the same command works on the 4K master and on the 1080p reference reel. Tested: chapter 1 cut to 1080×1080 / 1920×1200 at exactly 7.5 / 12.5 s.

If a loop still jumps where it restarts, add a 0.4 s self-crossfade to that clip. The clip gets 0.4 s shorter and its last frame flows into its first:

```bash
ffmpeg -i in.mp4 -filter_complex "[0]split[a][b];[b]trim=0:0.4,setpts=PTS-STARTPTS[h];[a]trim=0.4,setpts=PTS-STARTPTS[t];[t][h]xfade=transition=fade:duration=0.4:offset=$(echo "$(ffprobe -v error -show_entries format=duration -of csv=p=0 in.mp4) - 0.8" | bc)" -an -c:v libx264 -crf 21 -pix_fmt yuv420p -movflags +faststart out.mp4
```

## Putting clips on the site

Each row of `cut_sheet.csv` names the page (`site_page`), the slot (`site_slot`) and the image key it replaces (`replaces_key`, the `img` value in `src/marketing/data/productPages.ts`). Those keys are what the coded scenes are mounted on today. To swap a scene for its clip, add the files under `public/marketing/feature-clips/` and render, for that key:

```html
<video autoplay muted loop playsinline preload="none" poster="/marketing/feature-clips/<file>-rest.jpg">
  <source src="/marketing/feature-clips/<file>.webm" type="video/webm">
  <source src="/marketing/feature-clips/<file>.mp4" type="video/mp4">
</video>
```

Start playback when the card scrolls into view. Show `-result.jpg` under `prefers-reduced-motion`. Keep tiles ≤ 1.5 MB and showcases/heroes ≤ 3 MB.

Trade-off: the coded scenes are sharper at any size, weigh far less, and their text is real (selectable, translatable, indexable). Swap one only where the rendered film is clearly better, e.g. the night-sky Diwali hero or anything with real product photography.

## Confirm before production

1. **Logo:** attach the official SVG (mark + wordmark). The reference reel uses `public/logo.png`.
2. **Sample data:** every store, person, order and phone number is illustrative. Phone numbers use the dummy range +91 90000 1xxxx. Swap in real merchant names or product photos only with their permission.
3. **Fonts:** the spec uses Inter / Inter Display (free). SF Pro may only be used in Apple-platform contexts under Apple's licence, so it is not used here.
4. **Music:** license a track or commission one per §6. Nothing in this package is licensed audio.
5. **Page heroes:** Flow Builder, Opt-in tools, Journeys and Intent detection keep their existing demo videos. The film adds no hero segment for them.
6. **Prices and Meta rates** on the end card and in ch03/ch11 were checked on 16 Nov 2026. Re-check them before rendering.

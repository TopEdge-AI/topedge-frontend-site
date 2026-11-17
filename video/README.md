# TopEdge film renderer

Builds the feature-library film segments (spec: `docs/video/feature-library/`) as code-rendered video, then cuts them into website clips. It is a separate Vite app. It reuses the site's icon libraries and `/public` assets, and none of it ships in the website bundle.

Why code, not a video generator: every frame shows exact product UI, copy and rupee amounts. Generators invent text. Here every frame is a pure function of time (`src/lib/time.ts`), so renders are frame-exact and repeatable. That allows a real camera (perspective, push-ins, depth-of-field blur), physical springs, and the phone framed big and cropped by the bottom edge so chat text stays legible at slot size.

## Layout

- `src/lib/time.ts`: easing curves, springs, keyframes, paths, typing.
- `src/lib/ui.tsx`: cards, journey steps, chips, pills, cursor, fingertip, iPhone, WhatsApp, banner, browser, toasts, backdrop palettes.
- `src/lib/rig.tsx`: dashboard-to-phone depth swap, lock screen, in-app checkout, success page.
- `src/lib/products.tsx`: product imagery.
- `src/comps/<chapter>.tsx`: one component per segment; register it in `src/comps/index.ts`.

## Workflow

Run these from the repo root. First, start the film app:

```bash
npx vite --config video/vite.config.ts --open false
```

To review a composition, open `http://localhost:5190/?comp=05-S1&t=6.5`, or write review stills with:

```bash
node video/scripts/render.cjs /tmp/film 05-S1 --stills 1,4.5,8
```

Render the compositions (segment length + 0.5 s loop tail, 30 fps):

```bash
node video/scripts/render.cjs /tmp/film 05-T1,05-T2,05-T3,05-S1,05-S2,05-S3 --workers 3
```

Cut the website clips (loop fold, 800² tiles, 1280×800 showcases plus a 720² phone cut, MP4 + WebM + posters):

```bash
video/scripts/cut_clips.sh /tmp/film public/marketing/feature-clips/journeys 05-T1=t1 05-T2=t2 05-T3=t3 05-S1=s1 05-S2=s2 05-S3=s3
```

Then map each slot's image key to its clip in `src/marketing/components/visuals/clips.tsx`. The page plays the clip in that slot, lazy-loaded and only while visible. It shows the result poster for reduced motion and falls back to the coded scene if the video fails. Bump `V` there when you replace clips.

If Playwright has no browser of its own, set `CHROMIUM_PATH`.

## Cinematic mode

Every composition can run on a lit studio stage with a real camera (`src/lib/cine.tsx`). `src/comps/cine.ts` lists, per composition, the stage tone, the close-up it opens on, and the action beats the camera pushes in on. The harness draws the stage and runs the lens, so composition code stays a flat layout. `11-H` is written natively in this style (camera tracking along cost bars, a kinetic number reveal) as the reference for future heroes.

Render at output size with `--scale 0.8334`: 1920-wide compositions render at 1600 px, which is about 3× faster.

## Built

- All 12 chapters: heroes (where the page hero is an image), tiles and showcases.
- Home films: the ten launch films `L-cart`, `L-campaigns`, `L-optin`, `L-pixel`, `L-cod`, `L-flow`, `L-intent`, `L-identity`, `L-segments`, `L-profit` (`src/comps/launch.tsx`, `launch2.tsx`), built on the launch kit (`src/lib/launch.tsx`).

### Launch kit (home films)

The motion language of SaaS launch films, in TopEdge violet:

- **Two stages.** Air (lavender white, soft horizon glow) and Deep (indigo night, radial bloom). Scenes alternate between them; Deep opens as an iris bloom from the centre rather than a crossfade.
- **Very little text.** At most one short kinetic line per film (word-by-word blur-in), plus figures and real product UI.
- **3D space.** `Space` + `Obj` give every element x/y/z and rotations; far objects defocus and fast ones get motion blur. Phones, panels and the parcel are real 3D objects.
- **Glass objects.** `GlassIcon`, `GlassPill`, `Panel`, `Tag`.
- **Payoff per film.** A counting figure with a ribbon bar, a Done tick with confetti, a stamp, or fan-in lines into one card.
- **Loops.** Each film starts and ends on an empty stage of the same kind, so the 0.5 s tail fold is invisible.

`video/scripts/cut_all.sh <render-dir>` cuts everything rendered into `public/marketing/feature-clips/`.

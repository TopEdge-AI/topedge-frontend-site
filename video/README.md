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

## Done

- Chapter 05 Journeys: 05-T1, 05-T2, 05-T3, 05-S1, 05-S2, 05-S3.

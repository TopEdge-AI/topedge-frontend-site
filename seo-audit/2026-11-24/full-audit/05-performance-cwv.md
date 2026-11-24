# 05 Performance and Core Web Vitals, topedgeai.com, 24 Nov 2026

Read-only audit. Every number below is from a run I did today unless labelled Estimate or Hypothesis.

## Method and limits
- Field data (CrUX/PSI): `claude-seo run pagespeed_check.py https://topedgeai.com --json` returned "PSI rate limit exceeded, no API key", `crux: null`. **No field data available.** Nothing below is a field result, so this is not a pass/fail on the 75th-percentile CWV assessment. INP cannot be measured in the lab; TBT is the proxy.
- Lab: Lighthouse **12.8.2** (local npx cache; not 13.x), system Google Chrome, headless, `--no-sandbox` (sandbox disabled on this host; the plugin Chromium/render_page.py was not used). Default mobile = Moto G emulation with simulated slow-4G throttling; desktop = `--preset=desktop`.
  Command: `node ~/.npm/_npx/.../lighthouse/cli/index.js https://topedgeai.com<path> --only-categories=performance [--preset=desktop] --chrome-flags="--headless=new --no-sandbox" --output=json`
- Run 1 covers all 11 pages mobile plus / and /pricing desktop. Run 2 repeated 9 of them. **Run-to-run noise is very large** (home mobile LCP 4.75s then 8.47s; partners 15.5s then 3.73s; cod TBT 3957 then 2962 ms, CLS 0.012 then 0.141). Treat single values as +/- 50%. Findings that repeated in both runs are marked (x2).
- Not run: lcp_subparts.py (CrUX only), preload_check.py, render_page.py, crux_history.py (needs the same key). `curl -sI` was used for headers. Sub-part values come from Lighthouse `lcp-breakdown-insight`.
- Live site was tested; `dist/` was only read for filenames.

## Summary table (mobile, Lighthouse 12.8.2, run1 / run2)
| Page | Perf | LCP s | CLS | TBT ms | LCP element (subparts ms run1: TTFB / delay / duration / render) |
|---|---|---|---|---|---|
| / | 37 / 40 | 4.75 / 8.47 | 0.013 / 0.125 | 2422 / 472 | `img.home-hero__mesh-img` /hero-aurora-preview.jpg, fetchpriority=low (x2). 527 / 1215 / n/a / 5119 |
| /pricing | 57 / 44 | 4.84 / 6.92 | 0.089 / 0.090 (x2) | 343 / 490 | `h1.mkt-psec__title--hero`. 535 / n/a / n/a / 4593 |
| /features | 61 / 53 | 4.00 / 4.80 | 0.187 / 0.190 (x2) | 226 / 356 | element not captured. 1631 / - / - / 2372 |
| /features/journeys | 22 / not rerun | 7.26 / - | 0.144 / - | 2838 / - | `video.fclip__media` autoplay preload=auto. 887 / - / 3358 / 22 |
| /features/cod-confirmation | 44 / 24 | 4.27 / 6.12 | 0.012 / 0.141 | 3957 / 2962 | `img.demo-video-glow__poster` cod-poster.jpg. 481 / - / 1496 / 1070 |
| /customers | 69 / - | 3.48 / - | 0.071 / - | 430 / - | `h1.mkt-customers__title`. 2521 / - / - / 591 |
| /compare/interakt | 54 / 45 | 7.28 / 8.30 | 0.026 / 0.026 | 161 / 413 | not captured. 2205 / - / - / 8656 |
| /blog/best-whatsapp-apps-for-shopify | 48 / 57 | 5.89 / 5.64 | 0.013 / 0.013 | 481 / 362 | not captured, an image (resource load duration 6500 / 4354 ms). 493 / 166 / 6500 / 21 |
| /partners | 51 / 60 | 15.51 / 3.73 | 0.013 / 0.013 | 244 / 706 | run2 `h1.pk-hero__title`. run1 render delay 17637 (outlier, likely network stall) |
| /whatsapp-app-for-shopify | 74 / - | 2.02 / - | 0.015 / - | 1268 / - | `video#lv` poster topedge-launch-poster-v2.webp. 464 / 395 / n/a / 309 |
| /docs | 50 / - | 4.76 / - | 0.013 / - | 719 / - | `p.docs-answer__body`. 1032 / - / - / 3845 |

Desktop (run1 / run2): `/` perf 66 / 81, LCP 2.09 / 1.56 s, CLS 0.076 / 0.075, TBT 234 / 104; LCP is `video.home-hero__film-el` (poster), render delay 3095 / 515 ms. `/pricing` perf 58 / 74, LCP 4.62 / 1.51 s, CLS 0.003 / 0.078, TBT 24 / 182.
Real server response: `curl -w time_starttransfer https://topedgeai.com/` x3 = 0.22 / 0.54 / 0.94 s (varies; home HTML is 102,831 bytes uncompressed). Lighthouse "root document took 300 ms".

## Per-page weight and resources (mobile run1)
| Page | Requests | Transfer | JS (1p / 3p) | CSS | Img | Font | Media |
|---|---|---|---|---|---|---|---|
| / | 80 | 1.84 MB | 824 KB (218 / 606) | 41 KB | 399 KB | 16 KB | 526 KB |
| /pricing | 74 | 1.13 MB | 738 KB (223 / 516) | 46 KB | 158 KB | **150 KB** | 0 |
| /features | 59 | 1.10 MB | 823 KB (217 / 606) | 40 KB | 194 KB | 16 KB | 0 |
| /features/journeys | 67 | 2.04 MB | 874 KB (268 / 606) | 55 KB | 244 KB | 16 KB | 826 KB |
| /features/cod-confirmation | 60 | 1.17 MB | 730 KB (263 / 466) | 56 KB | 127 KB | 16 KB | 230 KB |
| /customers | 65 | 1.09 MB | 821 KB (215 / 606) | 41 KB | 185 KB | 15 KB | 0 |
| /compare/interakt | 49 | 0.80 MB | 583 KB (234 / 349) | 44 KB | 120 KB | 16 KB | 0 |
| blog post | 58 | 1.38 MB | 1098 KB (492 / 606) | 47 KB | 181 KB | 16 KB | 0 |
| /partners | 58 | 0.78 MB | 567 KB (218 / 349) | 48 KB | 114 KB | 16 KB | 0 |
| /whatsapp-app-for-shopify | 48 | 4.75 MB | 603 KB (0 / 603) | 0 (inline) | 213 KB | 16 KB | **3.89 MB** |
| /docs | 51 | 1.15 MB | 889 KB (283 / 606) | 42 KB | 177 KB | 15 KB | 0 |

(Transfer sizes are wire bytes. Uncompressed JS is ~3x: e.g. blog 3.5 MB.)

## Largest images and videos
Source: Lighthouse `network-requests`, run1. Dimensions/lazy/poster from page HTML and `HomeHero.tsx`.
- Home mobile: `topedge-launch-v2-mobile.mp4` **525,659 B transferred (file is 7,617,368 B on the CDN, so a range request)**; poster `topedge-launch-poster-v2.webp` 28,742 B, preloaded with fetchpriority high (live HTML `<link rel=preload as=image ... fetchpriority>`). Hero mesh `/hero-aurora-preview.jpg` 24,570 B JPEG 1024x576, eager, `fetchpriority="low"`, and it is the **LCP element** (`src/marketing/components/home/HomeHero.tsx` line ~23-28). Other images: `1.webp` 46 KB, `2.webp` 39 KB, a blog thumbnail 40 KB (appears on every page, `best-shopify-app-for-abandoned-cart-recovery-india.webp`).
- Home desktop: `topedge-launch-v2.mp4` 448,919 B transferred (13.4 MB file), image total 534 KB.
- /features: `cart-recovery-poster.jpg` 101,330 B JPEG (hub page).
- /features/journeys: `h-m.mp4` 639 KB, `t1.webm` 101 KB, `t2.webm` 85 KB, posters JPEG 33-57 KB. LCP is the autoplay video with `preload="auto"`.
- /features/cod-confirmation: `cod.mp4` 230 KB, `cod-poster.jpg` 13 KB, 1280x720, loading attr visible in snippet.
- /whatsapp-app-for-shopify: `<video id="lv" preload="none">` with poster webp 28.9 KB, but **3,885,542 B of `topedge-launch-v2-mobile.mp4` was transferred** in the load (Hypothesis: a below-fold film or the autoplay logic requests it eagerly; I did not trace which element). LCP is still good (2.02 s).
- /docs: `home-overview.webp` 86 KB. /blog: `best-whatsapp-apps-for-shopify.webp` 59.8 KB, which is the LCP image with 6500 ms (run1) and 4354 ms (run2) load duration.
- Blog/other posters are JPEG not WebP: cart-recovery-poster.jpg 101 KB, cod-prepaid-poster.jpg 57 KB, journeys posters. Format changes are optional and must be visually lossless (owner rule).

## Fonts
- Self-hosted Plus Jakarta Sans: `/fonts/pjs-latin.woff2` (14.5 KB) and `pjs-latin-ext.woff2` (1.3 KB), `font-display:swap` in `src/marketing/styles/marketing.css` lines 9-10. No `<link rel=preload>` for them in live head (checked `curl https://topedgeai.com/`).
- Cache header on `/fonts/pjs-latin.woff2`: **`public,max-age=0,must-revalidate`** (curl -sI). `netlify.toml` has no `/fonts/*` rule, so repeat visits revalidate.
- Google Fonts CSS (`Inter` 400/500/600 + `Inter Tight` 500/600, display=swap) loaded non-blocking via `media=print onload` from `index.html` lines 27-33. On most pages the CSS is 1.3 KB and no Inter file is fetched. **/pricing fetches two Inter woff2 files from fonts.gstatic.com, 48,464 B + 85,311 B** (font total 150 KB vs 16 KB elsewhere), and pricing LCP render delay is 4.6-6.2 s mobile. Hypothesis: the pricing page uses Inter in a visible element; a fix is subsetting/self-hosting or switching to the already-loaded PJS.

## Render-blocking, unused code
- Render-blocking on every React page: `/assets/index-01fa0f0b.css`, 199,979 B uncompressed / ~35 KB wire, est. savings 183-457 ms. Blog also blocks on `blog-2aef49cb.css`. (Lighthouse `render-blocking-resources`.)
- Unused CSS in `index-*.css`: 26.6-31.6 KB of 35 KB wasted on most pages (75-90%), e.g. `/` 26,611 / 35,282 B. Journeys/cod: 44.9 / 52 KB, 45.5 / 52 KB.
- Unused JS: ~375 KB of 723 KB on home, features, customers, docs, blog; 224 KB of 485 KB on interakt and partners. Largest sources on blog: PostHog `array.js` 75 KB, GA4 gtag 74 KB, Ads gtag 63 KB, `animations-5c5bd3ab.js` 58 KB of 81 KB, PostHog recorder 40 KB, surveys.js 39 KB, `index-96292b31.js` 30 KB of 62 KB.
- Blog pages ship a **272 KB (wire) / ~1 MB raw first-party `blog-*.js`** chunk; `dist/assets/blog-*.js` are 0.82-1.01 MB each across dozens of posts (`ls -la dist/assets | sort`), so the article body is bundled as JS rather than prerendered as light HTML.
- DOM size: 582-1,162 elements (pricing 1,162, blog 1,113; under the 1,500 guide).

## Third parties (Lighthouse `third-party-summary`, mobile run1)
| Page | GTM/GA4+Ads | PostHog | Notes |
|---|---|---|---|
| / | 343 KB, 441 ms main, 284 blocking | 257 KB, **1,319 ms main, 1,116 blocking** | PostHog `array.js` single long task 1,125 ms |
| /pricing | 343 KB, 445 / 286 | 166 KB, 100 / 26 | |
| /features | 343 KB, 345 / 189 | 257 KB, 281 / 125 | |
| /journeys | 343 KB, 659 / 499 | 257 KB, 464 / 280 | |
| /customers | 343 KB, 403 / 247 | 257 KB, 452 / 247 | |
| /docs | 343 KB, 562 / 404 | 257 KB, 449 / 292 | |
| blog | 343 KB, 393 / 237 | 257 KB, 374 / 221 | |
| /compare/interakt, /partners | 343 KB, 340-409 / 184-253 | not loaded in window | |
GA4 = `gtag/js?id=G-Y8Z47DNJ6V` (183 KB wire), Google Ads = `gtag/js?id=AW-18505393304` (159 KB wire), PostHog = `us.i.posthog.com/static/array.js` (116 KB) + `posthog-recorder.js` (74 KB) + `surveys.js`. All are already deferred via `afterLoadIdle` (`src/marketing/lib/afterLoadIdle.ts`, `analytics.ts`, `posthog.ts`, 4 s cap), yet Lighthouse still attributes 340-660 ms of GTM blocking time and up to 1.1 s of PostHog to the load window because idle fires inside the trace. Third-party hosts also include doubleclick (6-10 KB).
PostHog config.js: cache 300,000 ms (5 min), 1 KB.

## Cache headers (curl -sI, 24 Nov)
- `/assets/*` hashed JS/CSS: `public,max-age=31536000,immutable`. Good.
- Webp/png/jpg/mp4: `max-age=2592000,stale-while-revalidate=86400` (30 days), fine, not immutable.
- HTML: `public,max-age=0,must-revalidate`, `cache-status: Netlify Edge; fwd=miss` on first request. The edge cache rule in `netlify.toml` exists, but my first request showed `fwd=miss` and `age: 0`.
- `/fonts/*.woff2`: max-age=0 (see above). Lighthouse flags only the PostHog config.js for cache.

## Layout shift (CLS) findings
- **/features: 0.187 / 0.190 (x2). The shifting element is `section.mkt-fx__section` (score 0.174)** in `src/marketing/pages/FeaturesPage.tsx` lines ~220-256, styled in `src/marketing/styles/features-hub.css` line 133. Fails the 0.1 threshold in lab.
- **/features/journeys: 0.144**, element not retained by Lighthouse (autoplay `fclip` video block). Run1 only.
- **/pricing: 0.089 / 0.090 (x2), `div#plans` 0.073**. Near the 0.1 limit.
- /cod-confirmation: 0.012 then 0.141, unattributed element (0.125) in run2 (the video-glow poster area is the LCP element; Hypothesis).
- / mobile: 0.013 then 0.125 (`div.home-hero__copy` 0.122 in run2 only; Hypothesis: font swap or hero reflow). Desktop 0.075-0.076 from `body > div#root > div.min-h-screen`.
- A constant 0.012-0.013 shift on `body > div#root > div.min-h-screen` appears on every page (x2), plus tiny shifts on `home-trust-logos__item` and `mkt-nav__brand-text`.

## Bottlenecks (ranked by measured evidence)
1. **LCP render delay dominates**, not network: 4.6-5.1 s (home, pricing run1), 12.2 s on interakt run2, 17.6 s on partners run1. The LCP element exists in prerendered HTML but paints late, consistent with the render-blocking 200 KB CSS plus a heavy main thread (mainthread work 9.5 s on home run1, 2.1-4.3 s elsewhere) and React hydration.
2. **Home LCP element is a decorative mesh image marked `fetchpriority="low"`** (both runs), with resource-load 18 s in run2. The poster is preloaded at high priority instead, so the browser deprioritises the thing it ends up measuring.
3. **TBT and long tasks**: PostHog `array.js` 1,125 ms task on home; `vendor-01e7466e.js` 3,534 ms task on cod page run1; "Unattributable" 2,388 ms on journeys. TBT >600 ms on 5 of 11 pages in at least one run.
4. **CLS over 0.1 on /features and /journeys** (lab).
5. **/pricing font weight (150 KB) and 1,162-element DOM**.
6. **Blog first-party JS 0.5-1 MB per article** (492 KB wire).
7. Unused CSS (75-90% of 35 KB global stylesheet) and unused JS (~375 KB), both render-blocking or parse cost.

## Fixes (none touch image/video quality; product films stay)
1. **HomeHero.tsx**: remove `fetchPriority="low"` from the hero mesh `<img>` or make it a CSS background rendered after the poster; the measured LCP element is that image. Expected: removes several seconds of render delay on mobile `/` (Estimate; confirm with 3 reruns).
2. **index.html + build-static.js (prerender)**: inline critical CSS for the first viewport and load `/assets/index-*.css` non-blocking (`media=print` pattern already used for demo-video.css and ProofWall.css), or split route CSS from the 200 KB global sheet in `src/marketing/styles/*.css`. Measured blocking cost 183-457 ms and 75-90% unused. Keep print-onload fallback `<noscript>`.
3. **src/marketing/lib/posthog.ts and afterLoadIdle.ts**: load PostHog after first user interaction or `maxWaitMs` 8-10 s, and disable recorder/surveys on marketing pages unless needed (73 KB + 49 KB wire, 1.1 s block on home). Do not drop GA4/Ads conversion tracking; keep gtag stub queue. Re-measure TBT.
4. **FeaturesPage.tsx / features-hub.css line 133 (`.mkt-fx__section`) and the journeys `fclip` video block**: reserve height (`aspect-ratio` or `min-height`/`contain-intrinsic-size`) for sections that mount after hydration; give the journeys video wrapper explicit aspect-ratio. Also `pricing.css` for `div#plans`. Target CLS < 0.1.
5. **Blog route**: render article body as prerendered HTML and import only a small component chunk instead of a ~1 MB `blog-*.js` per article (src blog data/pages and `vite.config.ts` `manualChunks`; add a `blog-data` chunk if posts are bundled together). Add `fetchpriority="high"` and `<link rel=preload as=image>` for the blog hero webp (LCP image took 4.4-6.5 s to load).
6. **netlify.toml**: add `[[headers]] for="/fonts/*"` with `Cache-Control = "public, max-age=31536000, immutable"` and add `<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/pjs-latin.woff2">` in `index.html`. Fix /pricing's Inter files (150 KB) by self-hosting a subset or reusing PJS.
7. **/whatsapp-app-for-shopify** (static HTML, not React): find why `topedge-launch-v2-mobile.mp4` transfers 3.9 MB despite `preload="none"` (Hypothesis: a second video element or the IntersectionObserver loader); set `preload="none"` on off-screen films only. Keep the film.
8. `manualChunks` in `vite.config.ts`: `animations` chunk (framer-motion, gsap, lenis) is 81 KB wire with 58 KB unused on the blog and is modulepreloaded on the homepage; lazy-load gsap/lenis only on routes that use them.
9. Add a PSI/CrUX API key (`/seo google setup`) so field INP/LCP/CLS can be assessed; lab numbers above are noisy and cannot establish a pass/fail.

## Raw run data
Lighthouse JSON for all 22 runs: `/private/tmp/claude-501/-Users-patelmoksh-Downloads-topedge-netlify-final/98da7c3a-b9ab-4911-9a50-92b01350bbc4/scratchpad/lh/` and `.../lh2/`.

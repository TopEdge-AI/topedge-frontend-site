# 12 - Image SEO and social previews (2026-11-24)

Source: Image Audit (static analysis) of dist/, 175 HTML files (5 noindex). Read-only. Image generation not performed.
Labels: Verified = measured in dist/ or public/; Estimate; Hypothesis.

## Not measured
- Live fetch of 10 OG images (200 + content-type): NOT MEASURED (stopped on coordinator instruction).
- Image dimensions for non-OG images (CLS vs rendered size), real LCP timing, per-page traffic: not measured.
- Whether the empty-alt images are visually decorative: judged by file name only (Estimate).

## Summary
| Metric | Value | Status |
|---|---|---|
| Pages with og:image + twitter:image | 172/175 (missing: dev, login, signup, all noindex) | Pass (Verified) |
| og:image correct size 1200x630 | 0/172. Default og-share.jpg is 1280x720 (129 pages); blog 1200x675 (43) and 1600x900 (1: aisensy-pricing-india-v2.jpg) | Fail, 16:9 not 1.91:1 (Verified) |
| og:image:width/height present | 124/172; 48 blog posts with custom image omit them | Fail (Verified) |
| OG images over 300 KB | 0 (max 96 KB) | Pass (Verified) |
| twitter:card summary_large_image | 172/172 | Pass (Verified) |
| Pages on shared default og-share.jpg | 129/172 (75%) | Fail (Verified) |
| Unique <img> files | 197 (png 15, webp 77, jpg 66, svg 39); avg 41 KB, max 99.6 KB | Pass (Verified) |
| <img> tags in dist | 2922; WebP 1079, PNG 1098, JPG 282, SVG 463 | Estimate for adoption: ~37% WebP tags |
| srcset/sizes on <img> | 0/2922 | Fail (Verified) |
| Missing width or height | 421 no width, 362 no height (51 unique files) | Fail (Verified) |

## 1. <img>
- alt attribute present on all 2922 (Verified). Empty alt: 1458 tags. Mostly logos (/logo.png 327, /brand-mark-56.png 169, compare logos, AI-model icons, trust logos) which is acceptable if adjacent text names them (Estimate).
- Empty alt on probably non-decorative images: 376 tags (Verified count). Home feature-clip posters (10 jpg, index.html, features/cod-confirmation.html), hero-aurora-preview.jpg, festival SVGs (/marketing/festivals/*.svg, ~12-21 uses each across whatsapp-festival-templates/*), journey images (/marketing/journeys/product-linen-shirt.webp 20, jx-*.webp). Hypothesis: festival and journey images show content worth alt text.
- Alt over 125 chars: 108 tags, almost all blog hero images (138-157 chars). Fix to under 125.
- Same alt on different files: "TopEdge AI", "Meta Business Partner", "Available on the Shopify App Store", "WhatsApp Business Platform", "Delitech Smart Home", "Apex Light" (8 groups, mild).
- Very short alt: WATI, AiSensy, Zoko, Gupshup, ajeeb, Ecom, Shopify (logo names, fine).
- Keyword stuffing: not found by count; not measured by NLP.
- Loading: lazy 2056, eager 52, no attribute 814 (logos in header/footer, compare-logo-*.png on compare tables). First <img> on every page with images is never lazy (172/172 pass). fetchpriority=high on 0 <img>; the home hero LCP poster is preloaded in <head> with fetchpriority=high instead (Verified). decoding missing on 397.
- Blog hero images eager (44) correct. Compare pages ship up to 62 non-lazy logo tags (compare/topedge-vs-wati-vs-interakt-vs-aisensy.html) - add loading=lazy and dimensions.
- No width/height: /badges/*.webp, /trust/*.png (14 uses of ajeeb/ecom/oleez), /aiii/ai-brain-hero.webp, /website-pixel.webp, /audience-crm-hero.webp, /campaignn.webp, /marketing/solutions/sol-fashion-inbox.webp, demos posters.
- Raster PNG still served: 15 unique (logo.png, brand-mark*.png, compare-logo-aisensy/wati/interakt/bitespeed.png, trust/*.png, customers-outcome-template.png 91 KB). Convert to WebP/SVG.
- File names: 1 non-descriptive (/pnl/39.webp). Blog cover names are good. Several use -v2 suffix (aisensy-pricing-india-v2.jpg).
- 100 KB budget: 0 files over (Verified); closest 99.6 KB docs/img/settings-connections.webp.

## 2. Video (95 <video> tags, 17 pages, 21 unique sources)
- Poster missing on 80/95: features/*.html (6-7 per page, 12 pages) have no poster and no src in SSR (src set by JS). Home 10 of 11 clips have no poster in HTML.
- preload: none 94, auto 1 (home hero, justified: poster is preloaded high, src attached after window load + idle, per HomeHeroVideo.tsx).
- Hero LCP: home hero poster is WebP 28.7 KB, preloaded fetchpriority=high; film (13.4 MB desktop, 7.6 MB mobile) deferred until after load. Does not delay LCP (Verified from markup; Lighthouse not run).
- muted attribute appears on 13/95 in SSR; React sets muted as a property, so SSR count is not a real defect (Hypothesis). playsinline 95/95, loop 95/95.
- Captions <track>: 0/95. No transcript/captions for any product film (accessibility gap, Verified).
- Sizes: demos mp4 up to 13.5 MB (flowwww1.mp4), cart-recovery.mp4 9.3 MB, opt-in.mp4 11.7 MB, topedge-launch.mp4 22.5 MB (old, check if still referenced). Home clips 0.35-1.4 MB. Non-descriptive names: flowwww1.mp4, intentt.mp4, cod-prepaid11.mp4.
- OWNER RULE: all product films stay; plan below never replaces film.

## 3. OG / Twitter
- Default image /og-share.jpg: 1280x720, 65 KB, shared by 129 pages: pricing, partners, tools (4), compare (13 incl. all vs pages), features (13), docs (37), whatsapp-festival-templates (25), whatsapp-journey-examples (4), 2 landing pages (whatsapp-app-for-shopify, whatsapp-abandoned-cart-recovery-app), customers, integrations, about, contact, services, shopify-whatsapp-integration, whatsapp-templates, blog index, 6 blog category pages, 3 blog pagination pages.
- Blog posts: 43 have own 1200x675 JPG (61-96 KB). 
- og:image:alt: same default text on all 129 default pages; 16 alt strings over 125 chars (blog).
- og:image:width/height missing on 48 pages (code in MarketingSEO.tsx lines ~160-165 only emits them when image === DEFAULT_OG_IMAGE).
- Declared dims match actual where declared (0 mismatches).
- og-image.png (1024x1024, 303 KB) is the schema logo/image; it is over 300 KB and square.
- Live 200/content-type check of 10 OG URLs: NOT MEASURED. Files exist in dist (0 unresolved).

## 4. Icons and logo
- <head>: icon png 96x96 (/favicon.png), apple-touch-icon.png 180x180 (ok), manifest /site.webmanifest. No <link rel=icon> for .ico or SVG; favicon.ico holds 16 and 24 px only (no 32/48).
- /site.webmanifest icons: /icons/icon-192x192.png is really 96x96 (1.7 KB), and /icons/icon-512x512.png does NOT exist in dist or public -> 404 (Verified). Installability icon requirement fails.
- /manifest.json (separate, unlinked) lists web-app-manifest-192/512 which exist (192, 512 verified). Duplicate manifests.
- Organization schema logo: ImageObject https://topedgeai.com/og-image.png 1024x1024, file exists, >=112x112 (pass). Brand-mark/logo.png 128x128 is used in header.
- Founder schema images exist.

## 5. Image plan (art direction: white canvas, lilac #e4d4ff highlight, purple pill CTA, real product UI crops, no stock people, no generated screenshots; export 1200x630 JPG/WebP under 100 KB)
| Priority | Page | Dedicated OG | Art direction |
|---|---|---|---|
| Critical | / (home) and og-share.jpg default | Re-crop to 1200x630 | Real inbox + cart-recovery UI crop, lilac highlight on headline words, purple pill |
| Critical | /pricing | new | Real plan cards screenshot, lilac highlight on price |
| High | features/cod-confirmation, cart recovery (whatsapp-abandoned-cart-recovery-app), flow-builder, campaigns, audience-crm, intent-detection, opt-in-tools, journeys, analytics, ai-brain, chat-rules, meta-manager, profit-loss, warranty (13) | new each | One frame from the real feature film/poster per page (use existing *-poster.jpg), cropped 1.91:1, lilac title chip |
| High | whatsapp-app-for-shopify (landing) | new | Shopify + WhatsApp badges with real inbox thread UI |
| High | /customers | new | Real outcome numbers card (customers-outcome-template), no stock faces |
| High | compare/* (13, start with wati, aisensy, interakt, alternatives, 2 multi-vs pages) | new | Two real UI crops side by side, competitor wordmark neutral grey vs TopEdge purple pill |
| Medium | tools/* (4) | new | The real calculator UI, result number in lilac |
| Medium | /partners, /integrations, /shopify-whatsapp-integration | new | Real partner program page or integration screen crop |
| Medium | whatsapp-journey-examples (4) and festival-templates hub | new | Real template message previews (use /marketing/journeys/hero-*.webp, crop to 1.91:1) |
| Low | docs (37), festival detail (25), blog categories/pagination (9) | keep shared default | Shared default acceptable; optionally one per docs hub |
Film rule: where a product film exists (home hero, 10 home clips, feature clips), keep it; OG image is a still crop of the real film only.

## Prioritized fixes
1. Re-export og-share.jpg to 1200x630 and update OG_IMAGE_WIDTH/HEIGHT (src/marketing/data constants referenced from MarketingSEO.tsx). Critical.
2. Emit og:image:width/height for every image in MarketingSEO.tsx (currently only default); fix 48 blog pages. High.
3. Add public/icons/icon-512x512.png, replace icons/icon-192x192.png with a true 192 px; delete duplicate public/manifest.json or point to one. High.
4. Dedicated OG for pricing, 13 feature pages, customers, 13 compare pages, tools (pageSeo.ts). High.
5. Alt text: shorten 108 alts over 125 chars (blog); add alt to 376 non-decorative empty-alt tags (festival SVGs, journeys, home posters). Medium.
6. Add width/height and loading=lazy to logos/badges/trust/compare logos; give feature-page videos posters. Medium.
7. Add <track> captions or transcripts for product films; rename flowwww1.mp4, intentt.mp4, cod-prepaid11.mp4; confirm topedge-launch.mp4 (22.5 MB) unreferenced. Medium.
8. Convert PNG logos to WebP/SVG; slim og-image.png (303 KB, square) used as schema logo; add srcset to hero images; run live OG fetch (not measured). Low.
Estimated generation cost: not computed (no generation; mostly crops of real UI, so cost is design time, not credits).

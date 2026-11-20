---
name: topedge-landing-page
description: Build or upgrade a TopEdge AI keyword landing page (SEO, AEO and ad-ready) in the static /lp design with product videos, the exact keyword in URL, title and H1, both pricing doors and Google-policy checks. Use for any page in PLAN-AND-LOG section 3b or any request for a "landing page" for a keyword.
---

# TopEdge AI keyword landing page

Landing pages own commercial product keywords ("whatsapp abandoned cart recovery app", "whatsapp app for shopify", "shopify cod app"). Blog posts keep "best X" and "how to" queries. One keyword, one owner page: check `seo-audit/2026-11-10/01-page-by-page-audit.csv` and PLAN-AND-LOG section 3b first. If a page already serves the intent, upgrade it instead of making a second one.

## The design the owner chose (20 Nov 2026)

Every landing page uses the static design that was the Google Ads page (`/lp/shopify-whatsapp`, now `/whatsapp-app-for-shopify`). The owner rejected the React topic-page layout for landing pages. The design is plain HTML with inline CSS (no React), so it paints instantly for ad traffic and stays under 100 KB.

**Order of sections (copy it):**
1. **Floating nav capsule**: brand, in-page anchors (Why TopEdge AI, Platform, Pricing, FAQ), Log in, Start free.
2. **Hero, one screen**: H1 = the exact keyword, with the core phrase in the violet chip with the brand mark (`hero.lead` + `hero.mark`, optional visible tail such as "for Shopify"). One-sentence sub that restates the keyword with the outcome. One primary button (Start free trial) with the hand-drawn "Free for 14 days" arrow. Proof row: customer logos, Trustpilot and Product Hunt ratings.
3. **Hero film**: the matching home product film (`homeFilm('<name>')`), 16:9, poster first, plays muted when visible, with controls. Phones get the same 16:9 cut in the hero.
4. **Three pillars**: three short, true claims for this keyword.
5. **Trusted-by logo ribbon.**
6. **How it works**: numbered steps, taken from the product docs (`src/marketing/docs/content/docs.json`), never invented.
7. **"See each part working"**: the bento of 5 panels (2 wide, 3 narrow). **Each panel plays a real product film, never a drawing or a mock-up.** Use the home films: cart, cod, campaigns, optin, pixel, flow, intent, identity, segments, profit (`public/marketing/feature-clips/home/<name>.mp4`, `-mobile.mp4` portrait for phones, `-poster.jpg`). Clips are `class="clip"`, muted, loop, playsinline, `preload="none"`, no src in markup; `scripts/lp/page.js` loads one source on screen and pauses off screen.
8. **Dark comparison**: "TopEdge AI vs <the real alternative>" in two columns, with every fact about the alternative read from its own page and dated in a note under the table. Then a "when the alternative is enough" box in plain words.
9. **One sourced figure** (the proof block): a rupee number with its source line.
10. **Trustpilot quotes**, verbatim.
11. **Pricing**: plan cards with the monthly and yearly toggle from the billing catalog, plus the App Store door in USD and the 0% Meta markup line. A second CTA pair (Start free trial, Install on Shopify).
12. **FAQ**: 5 to 7 questions from real queries, 2 or 3 sentences each, as native `<details>`; it also emits FAQPage schema.
13. **Footer**, sticky mobile CTA bar and desktop top bar.

**UI/UX rules:** one primary action everywhere (Start free trial), App Store as the secondary. Short headings with one highlighted phrase. No long paragraphs anywhere above the FAQ. Real product on screen, never illustrations. Nothing above the fold that is not H1, sub, CTA, proof and the film. Test at 375 px and desktop: no sideways scroll, film visible in the first screen, all clips playing.

## How to build one

1. Add the page to `PAGES` in `scripts/generate-landing-pages.mjs`: `slug`, `attr` (the lp= value), `template`, `out` (the keyword URL), `index: true`, `title` (≤60), `description` (110 to 160), `name`, `hero`, `variants` (`{}` unless it is an ad page with utm variants), `film`, `pillars`, `bento`, `steps`, `faqs`. Page-specific blocks (comparison rows, cost figure) follow the `CART` object pattern.
2. Write `scripts/lp/<template>.body.html` from `whatsapp-abandoned-cart-recovery-app.body.html` (same section classes; change headings and placeholders).
3. Add the path to `STATIC_LANDING_PATHS` in `scripts/marketing-urls.mjs` (sitemap) and to the CORE list in `scripts/generate-llms.mjs`; add a footer link in `src/marketing/components/MarketingFooter.tsx`. Never add a React route or `TOPIC_SLUGS` entry for the same URL (prerender would write a second copy).
4. Add at least three body links to it from related blog posts.
5. `node scripts/generate-landing-pages.mjs` (guardrails: 100 KB budget, canonical, one H1, no external scripts, videos preload none). The generator drops CSS rules the page does not use.
6. `node scripts/check-landing-pages.mjs` (contract for the platform page) and `npm run build:netlify`.
7. Preview with `preview_start` name `topedge-dist` at `http://localhost:4190/<out>/` on desktop and 375 px.

## Facts you may state (re-check before each page)
- Canonical sentence: "TopEdge AI is a Shopify app for Indian D2C brands that automates abandoned cart recovery, COD confirmation and order updates over WhatsApp and email."
- Plans: Launch ₹1,999, Growth ₹3,999, Scale ₹6,499 a month plus GST on the website; $19, $39, $65 on the App Store. Orders: 100, 800, 1,500. Trial 14 days, 20 orders, 200 sends.
- COD confirmation on every plan; COD to prepaid and Journey Branch on Growth and up. No NDR handling, no partial COD, no Meta WhatsApp Flows.
- Meta India: ₹0.8631 marketing, ₹0.1150 utility, billed per message (sources.ts `metaPricing`). Never "per conversation".
- Shopify Messaging WhatsApp (read 20 Nov 2026): marketing only, abandoned browse, cart and checkout templates, marketing subscribers only, India $0.024 per message.

## Google policy checks (must pass)
- **Doorway abuse:** the page answers its own query fully and differs in substance from every other landing page (steps, comparison, figure and FAQ are its own). No city, industry or near-duplicate variants. If two keywords share a SERP, they share one page.
- **Hidden text:** nothing visually hidden that carries the keyword (the H1 tail is visible text).
- **People-first gate:** `node seo-audit/tools/people-first-audit.mjs dist <out> --only /<out>` adds no flags beyond the verbatim quotes.
- **Misleading functionality:** every claim matches the dashboard and the docs.
- No Product schema, no self-written ratings, no keyword lists.

## Ads
The same URL serves Meta and Google ads with UTM tags. The platform page swaps its hero by `utm_content` prefix (`HERO_VARIANTS`), which is the same for every visitor with that URL, not cloaking. Old ad URLs `/lp/shopify-whatsapp` and `/lp/cod-confirmation` 301 to `/whatsapp-app-for-shopify` with the query string kept.

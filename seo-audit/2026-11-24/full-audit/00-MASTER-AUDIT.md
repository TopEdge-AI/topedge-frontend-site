# TopEdge AI full site audit, 24 Nov 2026

One page that joins the twelve specialist reports in this folder. Every row says where it was measured. Labels: **Verified** (measured today, by the method named), **Estimate** (a judgement from measured facts), **Hypothesis** (not measured).

Run with the `claude-seo` plugin (v2.6.2): orchestrator skill `seo`, sub-agents `seo-technical`, `seo-content`, `seo-schema`, `seo-sitemap`, `seo-performance`, `seo-geo`, `seo-agentic`, `seo-sxo`, `seo-cluster`, `seo-backlinks`, `seo-image-gen`, plus a competitor analyst, and the drift baseline script on 43 pages before any change.

## What was not run, and why

| Skill or source | Status | Reason |
|---|---|---|
| `seo-google` (Search Console, CrUX, GA4, Indexing API) | Not run | No Google API key or OAuth token on this machine (`google_auth.py --check`, 24 Nov). No field Core Web Vitals exist in this audit. |
| OpenSEO (Search Console, SERPs, keyword volumes, rank tracker) | Not run | The OpenSEO connector was not connected in this session. Volumes below are the ones already recorded in `PLAN-AND-LOG.md` and are dated there. |
| `seo-dataforseo`, `seo-posthog`, `seo-bing` | Not run | No connector or key in this session. |
| Moz, Bing Webmaster, Keywords Everywhere (backlinks) | Not run | No keys (`backlinks_auth.py --check`). Backlinks used Common Crawl and a live verification crawl only. |
| Lighthouse Agentic Browsing score | Not measured | PageSpeed Insights returned HTTP 429 without a key. |
| People Also Ask and AI Overview blocks | Not measured | The search tools available could not read India SERP features. Questions come from the Search Console exports already in the repo. |
| `seo-local`, `seo-maps` | Skipped | Not a local business. |
| `seo-ecommerce`, `seo-shopify` | Skipped | The site is a SaaS marketing site, not a store. |
| `seo-hreflang` | Skipped | One language, one country. |
| `seo-programmatic` | Skipped | No pages at scale are planned; the 25 festival pages were reviewed on 20 Nov. |
| Ahrefs site audit | Not read today | Read on 24 Nov earlier (Day 7 log): health 100, 0 errors. |

**No overall SEO health score is given.** The plugin's weighted score needs field performance data and a scored technical run, and neither exists. The one scored category is AI search readiness, 68 out of 100 (Estimate, GEO report).

## 1. What is already right (Verified)

- Sitemap: 170 URLs, all return 200, none redirect, none are noindex, canonical equals the sitemap URL on all 170, and it matches the routes and the 43 blog slugs exactly. (`04-sitemap-internal-links.md`)
- No orphan pages and no broken internal links on the live site. (`04`)
- Title, canonical, JSON-LD and the main content are in the raw HTML of every sampled page; the 404 returns a real 404; IndexNow keys resolve. (`01-technical.md`)
- All 175 built pages parse as valid JSON-LD. (`03-schema.md`)
- Every AI crawler tested gets HTTP 200 and full HTML; `llms.txt` and `llms-full.txt` are valid and match the sitemap. (`06-geo-aeo.md`, `07-agentic.md`)
- The primary action and the plan prices work without JavaScript; the agent-UX check found no unnamed interactive element on 10 pages. (`07`)
- 0 AI-phrasing hits, consistent review counts and reminder timings, and every price calculation is correct. (`02-content-eeat.md`)
- No image is over the 100 KB budget; every indexable page has an OG and Twitter image. (`12-images-og.md`)
- Against nine rivals, TopEdge AI is ahead on dated and sourced claims, INR prices visible in static HTML, and template cards with phone previews. (`11-competitors.md`)

## 2. Findings, ranked

Status: **Fixed** = changed in the repo today, live after the next deploy. **Owner** = needs a decision, a fact only the owner has, or an action outside the repo. **Planned** = scheduled in `PLAN-AND-LOG.md` section 8.

### High

| # | Issue | Evidence and where measured | Fix | Status |
|---|---|---|---|---|
| H1 | Shopify App Store listing has 0 reviews | Checked live 24 Nov (`06`). The App Store was the most cited domain in the 2 Nov AI-answer run (31 of 80). 8 of 10 results for cart-recovery app searches are App Store listings with 300 to 1,141 reviews (`08-sxo.md`). | Ask real merchants through Shopify's own review request, no incentive. Drafts: `seo-audit/2026-11-19/01-day-4-review-asks.md`. | Owner |
| H2 | The RTO statistic was quoted three ways | `/whatsapp-app-for-shopify` said "Unicommerce/Shipway, 21% by February 2026" and "verify and run half the RTO"; 12 other pages cite the Unicommerce India D2C Report, March 2026 (`02`, `06`). | Landing page now follows the registered source (`src/data/sources.ts`, `unicommerceRto`) word for word and no longer credits the fall to verification alone. | Fixed (`scripts/generate-landing-pages.mjs`) |
| H3 | "Hidden 20% to 30% markup" had no source | Two places on `/whatsapp-app-for-shopify`; our own dated vendor reads start at 0% (`02`, `06`). | Percentage removed; the claim is now "a per-message fee added on top of the official Meta rate". | Fixed |
| H4 | The "Meta Business Partner" badge is unverified | Shown on `/customers`, the footer and the proof wall (`02`, `06`, `08`). | Confirm the listing in Meta's partner directory. Keep the badge only if it is there. Files: `ProofWall.tsx:95`, `MarketingFooter.tsx:292`, `CustomersPage.tsx:31`. | Owner. 26 Nov 2026: the same "Meta Business Partner" mark is also printed inside blog cover images (seen on the RTO post cover); the partner-directory check could not be made from the built-in browser (it opened a personal Facebook session). If unverified, the badge and the covers carrying it must change: an unverified partnership claim is the "scam and fraud / misleading" risk in the 26 Nov penalty-safety gate. |
| H5 | Entry price reads ₹1,599 in some places and ₹1,999 in others | `/pricing` opens on Yearly, so the first number is ₹1,599; titles, FAQs, schema and Google's snippet say ₹1,999; the App Store shows $19 (`02`, `06`, `08`). | Decision needed. The Yearly default was chosen in October to protect annual plans. Options: keep Yearly but print "₹1,999 billed monthly" beside it, or open on Monthly. `llms.txt` now states both figures and the App Store prices. | Owner (llms part Fixed) |
| H6 | Security headers missing | Live responses carried HSTS only (`01`, curl 24 Nov). | Added `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `frame-ancestors` in `netlify.toml`. A full Content-Security-Policy is not added: it must ship Report-Only first because GA4, Google Ads, the Meta pixel and PostHog inject scripts. | Fixed (CSP Planned) |
| H7 | Blog posts ship 0.5 to 1.0 MB of first-party JavaScript | `/blog/best-whatsapp-apps-for-shopify` loads 1.69 MB of JS, 489 KB compressed; one `blog-*.js` chunk is 1.0 MB (`01`, `05-performance-cwv.md`). Likely every post body in one chunk (Hypothesis). | Load only the current post's body (split the blog data per post), and preload the post's cover image. | Fixed 26 Nov 2026 (Day 9): a `blog-split` Vite plugin serves a card-only index (`virtual:blog-index`, 46 KB) and one body chunk per post (about 32 KB); the 812 KB `blog-*.js` chunk is gone from the build; the cover is preloaded with fetchpriority high. Measured in the built preview (decoded JS on /blog/best-whatsapp-apps-for-shopify): 754 KB, down from the 1.69 MB in `01`. Prerender 168 of 168 ok. Remaining JS is the shared entry, vendor and animations chunks (M13, Day 10). |
| H8 | The two static landing pages linked to nothing | `/whatsapp-app-for-shopify` and `/whatsapp-abandoned-cart-recovery-app` linked only to home, login, privacy and terms; the first had 1 inbound body link (`04`). | Footer now carries 14 site links (Product, Resources, Company; no blog and no compare links, by the page's own contract). Inbound links from home, `/features`, `/pricing` and three posts are Planned. | Fixed (outbound), Planned (inbound) |
| H9 | Proof is thin against rivals | `/customers` has two stories with no numbers; Zoko shows 13 metric cards, QuickReply 40+, AiSensy 56 (`11`, `08`). | Get permissioned numbers from Delitech and Apex Light; one detail page per story. Never invent a figure. | Owner, then Planned |
| H10 | `/whatsapp-app-for-shopify` is the wrong page type for its query | The query is held by listicles and App Store listings; home, this page and the best-apps post all use the phrase in their titles and share 6 of 10 results (`08`, `09-keyword-clusters.md`). | Add a short "your options" table (Meta's free app, Shopify Messaging, a broadcast-first app, TopEdge AI) and an App Store button in the hero. Decide whether the home title keeps the phrase (open item since 22 Nov). | Planned, Owner for the home title |
| H11 | `/features/cod-confirmation` does not answer its SERP | The search shows IVR, OTP and WhatsApp apps and "best COD apps" lists; the page never mentions IVR or OTP (`08`). | Add a WhatsApp vs IVR vs OTP table; publish `/blog/best-cod-confirmation-apps-shopify-india`. | Planned |

### Medium

| # | Issue | Evidence | Fix | Status |
|---|---|---|---|---|
| M1 | Trustpilot count was stale | Site said 4.0 from 5; Trustpilot showed 4.2 from 6 (read in the browser 24 Nov). | `socialProof.json` updated with the reading date. | Fixed |
| M2 | Landing page trial and setup wording differed from the rest of the site | "20 free order confirmations" (no sends), "fifteen minutes" against 30 everywhere else, "nothing is metered", "Immediate RTO reduction" (`02`). | All four corrected to the site-wide facts. | Fixed |
| M3 | 13 feature pages redeclared the product with 13 different descriptions under one `@id` | `03-schema.md`. | One shared description; the page's subject stays in its WebPage node and `featureList`. | Fixed (`pageSeo.ts`) |
| M4 | Plan offers did not say prices exclude GST | `03`. | `valueAddedTaxIncluded: false` on every plan offer. | Fixed (`billingCatalog.ts`) |
| M5 | Organization `sameAs` lacked Product Hunt | `03`. | Added. Founders' `sameAs` still empty: needs their LinkedIn URLs. | Fixed, Owner for founders |
| M6 | No visible breadcrumb on features, compare, tools, festival and journey pages though BreadcrumbList is emitted on 165 pages | `03`. | Feature pages now show one. The other templates get theirs in the redesign. | Fixed on features, in progress elsewhere |
| M7 | `llms.txt`: one link 404 (trailing full stop), App Store prices missing, yearly vs monthly not explained | `06`. | All three fixed in `scripts/generate-llms.mjs`; `check-llms` passes. | Fixed |
| M8 | AI Brain providers disagree | Feature page and llms say "OpenAI, Claude or Gemini"; the docs reference and the App Store listing say Gemini and OpenAI (`06`). The feature page also carries "roughly ₹0.10 to ₹0.30 per AI reply", which was removed from the blog as unsourced. | Say which providers the product accepts; then one wording everywhere. | Owner |
| M9 | App icons wrong | `icon-192x192.png` was 96px, `icon-512x512.png` was a 404, and there were two manifests (`12`). | Real 192px icon, manifest points at the existing 512px file, duplicate `manifest.json` removed. | Fixed |
| M10 | Fonts and SVGs had no cache rule | `01`, `05`. | One year for `/fonts/*`, 30 days for SVG, in `netlify.toml`. | Fixed |
| M11 | 200 KB render-blocking stylesheet, 75 to 90% unused per page | `01`, `05` (Lighthouse 12.8.2, mobile, slow 4G). | Inline critical CSS or split the global sheet per route. | Planned |
| M12 | PostHog costs a 1.1 s long task on home | `05`. | Load it after idle. The session recorder stays unless the owner says replays are no longer watched (they were the main read on ad traffic in October); the survey bundle can go. | Planned, Owner for the recorder |
| M13 | `animations-*.js` (238 KB) is preloaded on every page | `01`. | Lazy-load it. | Planned |
| M14 | Layout shift above 0.1 on `/features`, `/features/journeys`, `/features/cod-confirmation` | Lab CLS 0.14 to 0.19 (`05`). | Reserve the film's box and the hub sections' height. The feature template's film now sits in a fixed-ratio stage; re-measure after deploy. | In progress, re-measure |
| M15 | Home LCP element is fetched at low priority | `HomeHero.tsx` (`05`). | Remove `fetchPriority="low"` from the LCP image. | Planned for the home pass |
| M16 | Money pages are thin | 11 of 13 feature pages under 800 words on one template; 10 have no dated or sourced fact; home 389 words with no FAQ; `/about` 299 words (`02`). | Per page: one sourced figure, a comparison table, a FAQ. Home FAQ is a frozen-page decision. | Planned, Owner for home |
| M17 | Every blog post ends with the same cart-recovery banner | COD, RTO, pricing and alternative posts all close on "Run cart recovery on your Shopify store" (`08`). | Match the closing banner to the post's topic. | Planned |
| M18 | Main navigation omits `/integrations`, `/compare`, `/tools`, `/services` | They are linked from the footer only (`04`). | A "More" column in the Products menu. The menu was last set by the owner on 23 Nov, so this is a decision. | Owner |
| M19 | Anchor text is weak | 85% of links to `/pricing` say "Pricing" or "See pricing"; some card links concatenate the whole card (`04`). | Use the link matrix in `04`, section 3. | Planned |
| M20 | Blog `isPartOf` points at an `@id` that does not exist | 43 posts point at `/blog`; the Blog node is `/blog#blog` (`03`). | One-line fix in `BlogPost.tsx`. | Fixed (24 Nov; verified in source and live 25 Nov: `isPartOf` is `/blog#blog`) |
| M21 | `/about` nests a second, anonymous Organization and founders | `03`. | Reference the existing `@id`s. | Fixed (24 Nov; verified live 25 Nov: AboutPage `mainEntity` is `/#organization`, one Organization node) |
| M22 | No OG image is 1200 by 630; 129 pages share the default | Default is 1280 by 720 (`12`). | Dedicated OG images for pricing, features, compare, customers and tools, made from real product UI. | Planned |
| M23 | 80 of 95 videos have no poster; none has captions | `12`. | Posters for feature films; a transcript or captions for the home film. | Planned |
| M24 | `/services` H1 is cut off on phones and the page has no agency path | `08`. | Wrap the H1; add a partner-program block. | In redesign today |
| M25 | HSTS has no `includeSubDomains` or `preload` | `01`. | Add once every subdomain (dash, api) is confirmed HTTPS-only. | Owner |

### Low and information

| # | Issue | Evidence | Fix | Status |
|---|---|---|---|---|
| L1 | HowTo schema on 41 pages (16 docs, 25 festival) | `01`, `03`. Google retired the HowTo result in 2023; the markup is valid and harmless. | Left in place. Remove only if the owner wants zero deprecated types. | Decision recorded |
| L2 | FAQPage schema | No Google rich result since May 2026. | Keep; do not add more for Google's sake. | No action |
| L3 | 10 titles say "(2027)" | Flagged by the GEO report. | This is the owner's rule of 17 Nov. | No action |
| L4 | `lastmod` is stamped per group (14 compare, 14 features, 26 festival) | `04`. | Per-page dates. Track C already gives each compare board its own date. | Planned |
| L5 | 34 pages are 4 clicks deep when nav and footer are ignored | `04`. | Hub and sibling body links. | Planned |
| L6 | `http://www` takes 2 hops | `01` (curl). | Check the Netlify rule order after the next deploy. | Planned |
| L7 | No Markdown delivery, `ai-catalog.json`, Content-Signal or WebMCP | `07`. All draft or optional standards. | Optional; no measured benefit. | Not planned |
| L8 | No skip link; pricing tabs lack `aria-controls` | `07`. | Add both. | Planned |
| L9 | 421 images lack `width`, 108 alts exceed 125 characters, 376 look non-decorative with empty alt | `12`. | Sweep by template. | Planned |
| L10 | Demo numbers in product films carry no "demo store" label | `08`. | A caption under the film ("Sample store data"). | Planned |
| L11 | Shopify Messaging WhatsApp launch date | The cluster agent read 29 Jul 2026 in Shopify's changelog; the repo says 28 Oct 2026 (`09`). | Re-read the changelog before touching either page. | Settled 25 Nov: both dates are real. 29 Jul = WhatsApp marketing campaigns in Shopify Messaging; 28 Oct = WhatsApp marketing automations (abandoned cart and checkout). The repo's 28 Oct line is right for reminders |

## 3. Keyword clusters (`09-keyword-clusters.md`)

Limits: SERP overlap was read on the US index (India SERPs were blocked), so overlaps are Estimates. Volumes are the dated ones from `PLAN-AND-LOG.md`; terms without a number are "no data".

| Cluster | Hub (existing) | New spokes worth building |
|---|---|---|
| WhatsApp for Shopify | `/shopify-whatsapp-integration` | `/blog/whatsapp-marketing-for-shopify`, `/compare/shopify-messaging` |
| Cart recovery | `/blog/whatsapp-abandoned-cart-recovery-shopify` | `/whatsapp-templates/abandoned-cart` |
| COD | `/features/cod-confirmation` | `/blog/best-cod-confirmation-apps-shopify-india`, `/blog/fake-cod-orders-shopify-india`, `/whatsapp-templates/cod-confirmation`, `/blog/how-to-enable-cod-shopify-india` |
| RTO | `/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation` | An NDR explainer, only if the product handles NDR |
| Order messages and templates | `/whatsapp-templates` | Order confirmation and shipping update template pages |
| WhatsApp cost and rival pricing | `/blog/whatsapp-business-api-pricing-india` | Bitespeed pricing |
| Alternatives | `/compare` | Shiprocket Engage, LimeChat, DelightChat |
| Shopify in India | none | A best-Shopify-apps-India hub; Shopify pricing India |
| Profit and retention | `/features/profit-loss`, `/features/campaigns` | Unit economics, broadcast, repeat purchase |

Cannibalisation to fix: (1) the landing page and the best-apps post share 6 of 10 results for "whatsapp app for shopify"; (2) move "abandoned cart recovery shopify" (50) and "shopify abandoned cart app" (40) to the best-app post, because the generic search shares no results with the WhatsApp version; (3) the planned `/rto-reduction-shopify` should target the app search, since "rto reduction" alone is held by logistics blogs.

## 4. Competitors (`11-competitors.md`)

Fifteen ranked changes are in the report. The first five: case studies with real numbers; a fixed detail-page anatomy per case study; lead with the App Store rating once it exists; rebuild feature pages around product UI with a quote and a problem section; integration detail pages for integrations that are live. Not recommended: industry pages without a named customer, webinars, app directories.

## 5. Backlinks (`10-backlinks.md`)

Sources used: the Common Crawl web graph (release cc-main-2026-aug-sep-oct, read 24 Nov), the verification crawler and direct page fetches. Moz, Bing Webmaster and Keywords Everywhere were not available, so there is no DA, DR or referring-domain count from today, and no backlink health score. The 2 Nov figures (82 backlinks, 47 referring domains, 8 after spam filtering) were not re-pulled.

Common Crawl ranks, lower is better (Verified):

| Domain | PageRank rank | Harmonic centrality rank |
|---|---|---|
| wati.io | 61,883 | 20,788 |
| aisensy.com | 67,421 | 432,961 |
| interakt.shop | 78,607 | 22,765 |
| delightchat.io | 106,196 | 2,183,425 |
| zoko.io | 146,610 | 1,884,031 |
| bitespeed.co | 646,463 | 5,858,839 |
| updatrr.com | 1,886,277 | 5,911,620 |
| topedgeai.com | 1,896,532 | 5,887,441 |

TopEdge AI sits level with Updatrr and close to Bitespeed, the two nearest Shopify-app peers, and far behind the broad WhatsApp platforms.

Live links checked 24 Nov (Verified): the Shopify App Store listing links to topedgeai.com (dofollow) and its docs link now points at topedgeai.com/docs; its privacy link still goes to dash.topedgeai.com (owner, Partner dashboard). Store Leads: dofollow. SaaSHub: a listing exists and is dofollow (the 2 Nov notes said there was none). ClickPost's RTO list names TopEdge AI with a nofollow link. PickYourApp has a TopEdge AI page with no link to the site: the easiest unlinked-mention ask. The wrong-topic Wanderlog salon listing is still live. Product Hunt, Trustpilot and G2 blocked the crawler and are unverified.

Disavow: hold. No manual action (checked 6 Nov) and nothing suggests the links were bought, which is the case Google's guidance reserves the tool for.

First ten prospects, in order (30 in the report): meetanshi.com best Shopify apps for WhatsApp; blog.campaignhq.co Interakt alternatives; watsberry.com Interakt alternatives India; storecensus.com best COD verification apps; huratips.com COD verification apps; magecomp.com best WhatsApp Shopify apps; softwares.com Interakt alternatives; saashub.com Interakt and WATI alternatives; peerpush.net; getkanal.com best WhatsApp apps for Shopify. Drafts only; the owner sends, at most 20 a week.

## 6. Fixed today, in one list

1. Landing page facts: RTO source wording, unsourced markup percentage, trial terms, setup time, "nothing is metered", "Immediate RTO reduction".
2. Landing page footers: 14 internal links each; the leakage check now covers the page body only.
3. Trustpilot reading: 4.2 from 6, read 24 Nov.
4. Schema: one product description across feature pages, ex-GST offers, Product Hunt in `sameAs`.
5. `llms.txt`: broken link, App Store prices, yearly against monthly.
6. `netlify.toml`: four security headers, font and SVG caching.
7. Icons and manifest.
8. FAQ questions are now `<h3>` inside the shared accordion (correct accordion semantics, question headings on every page that uses it).
9. Visible breadcrumbs on all 13 feature pages.
10. The site-wide redesign (see `docs/DESIGN-SYSTEM.md` and the log row in `PLAN-AND-LOG.md`).

## 7. The reports

| File | Covers |
|---|---|
| `01-technical.md` | Crawl, index, headers, rendering, weight |
| `02-content-eeat.md` | 28 commercial pages and 5 posts: depth, E-E-A-T, consistency |
| `03-schema.md` | All JSON-LD on 175 pages, with ready blocks |
| `04-sitemap-internal-links.md`, `04-internal-links.csv` | Sitemap, link graph, link matrix |
| `05-performance-cwv.md` | Lighthouse lab runs on 11 pages (no field data) |
| `06-geo-aeo.md` | AI crawler access, llms, passage scores, 15 buyer prompts |
| `07-agentic.md` | Agent readiness |
| `08-sxo.md` | SERP page types, personas, UX gaps |
| `09-keyword-clusters.md` | Clusters, cannibalisation, 20 new page ideas |
| `10-backlinks.md` | Common Crawl metrics, live link checks, prospects |
| `11-competitors.md` | Nine rivals and two design references |
| `12-images-og.md` | Images, video, OG, icons |
| `drift/` | Baseline of 43 pages before the redesign, and the comparison after |

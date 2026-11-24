# 06: GEO / AEO audit of topedgeai.com (AI Overviews, AI Mode, ChatGPT, Perplexity, Copilot)

Date: 24 November 2026. Mode: read-only. Labels: **Verified** (I fetched it today), **Estimate** (my scoring judgement), **Hypothesis** (plausible, not tested).

Method: raw HTML fetched with curl (no JavaScript) for 13 pages, `llms.txt`, `llms-full.txt`, `robots.txt` and `sitemap.xml`. I extracted text, headings, tables and JSON-LD with a stdlib Python parser. Profiles were checked with curl and WebFetch. Note: the bundled `render_page.py` was not needed because every page returns full prerendered HTML without JS (see section 1). No DataForSEO or Search Console data was used, so no live citation counts below are new. The only citation data is the 2 November OpenSEO run quoted in the brief.

---

## GEO Readiness Score: 68 / 100 (Estimate)

| Dimension | Weight | Score | Why |
|---|---|---|---|
| Citability | 25% | 74 | Compare pages and pillar blogs have strong dated answer blocks. Home, /customers and /about are weak. |
| Structural readability | 20% | 70 | Question headings exist on most pages. Several "tables" are div grids, and some FAQ questions are `<p>`/`<summary>`, not headings. |
| Multi-modal | 15% | 55 | Product screenshots and video exist. YouTube channel is close to empty (about 1 video). No transcripts. |
| Authority and brand | 20% | 45 | Shopify App Store has 0 reviews, there is no Wikidata/Wikipedia, review counts on the site are stale, and some claims are unsupported. |
| Technical accessibility | 20% | 97 | Every AI crawler gets 200 and full SSR HTML. llms.txt is valid and complete. One small llms.txt link defect. |

Weighted: 0.25×74 + 0.20×70 + 0.15×55 + 0.20×45 + 0.20×97 = **68.65**

### Platform scores (Estimate)

| Platform | Score | Main limiter |
|---|---|---|
| Google AI Overviews / AI Mode | 62 | Third-party corroboration is thin. AIO leans on apps.shopify.com, where TopEdge has 0 reviews. |
| ChatGPT Search | 66 | Content is well formed for retrieval. A self-ranked "#1" with no independent reviews is likely cited as a source but not recommended (matches 12 cited vs 7 recommended). |
| Perplexity | 72 | Rewards dated, sourced tables, which compare pages have. Reddit and YouTube presence is near zero. |
| Bing Copilot | 64 | Same as ChatGPT. IndexNow / Bing Webmaster status not checked in this pass. |

---

## 1. AI crawler access (Verified)

`public/robots.txt` is byte-identical to the live https://topedgeai.com/robots.txt. A single group names `*` plus 19 bots with `Allow: /`. It disallows only `/admin/`, `/private/`, `/api/` and `/dev/`. Bots not named (Bytespider) fall under `*`, which is the same group, so they are allowed.

| Crawler | Governs | robots.txt | Live test (15 URLs) |
|---|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed (named) | 200 on all, full HTML |
| ChatGPT-User | User-triggered fetches in ChatGPT | Allowed (named) | 200 on all |
| GPTBot | OpenAI training only | Allowed (named) | 200 on all |
| Claude-SearchBot | Claude search citations | Allowed (named) | 200 on all |
| ClaudeBot | Anthropic training only | Allowed (named) | 200 on all |
| PerplexityBot | Perplexity index | Allowed (named) | 200 on all |
| Bingbot | Bing index and Copilot grounding | Allowed (named) | 200 on all |
| Google-Extended | Gemini/Vertex training and grounding. Not AIO/AI Mode inclusion, which follows Googlebot. | Allowed (named) | Robots token only, no separate fetcher. A request with that UA returned 200 anyway. |
| Applebot-Extended | Apple Intelligence training only. Not Siri/Spotlight, which follow Applebot. | Allowed (named) | Robots token only. Applebot UA returned 200. |
| CCBot | Common Crawl (training corpora) | Allowed (named) | 200 on all |
| Bytespider | ByteDance training | Allowed (via `*`) | 200 on all |
| meta-externalagent | Meta AI training/grounding | Allowed (named `Meta-ExternalAgent`) | 200 on all |

Response sizes were identical for every UA on every URL (for example /pricing 120,223 bytes, /compare/interakt 102,862 bytes). That means no UA-based cloaking or blocking. Caveat: I tested spoofed UAs from one IP. That rules out UA blocking but not IP-reputation rules at Netlify's edge. Netlify adds no bot blocking by default.

SSR: all 13 audited pages return full body copy, FAQs and JSON-LD in the raw HTML (Verified, parsed without JS). `/whatsapp-app-for-shopify` and `/whatsapp-abandoned-cart-recovery-app` are static HTML in `public/` (Verified: `public/whatsapp-app-for-shopify/index.html`), so they do not pick up React-side fixes.

Owner decision, not a defect: training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, Bytespider) are allowed. That suits a brand that wants to be known to models. Blocking them would not affect search citation.

## 2. llms.txt and llms-full.txt (Verified)

- Status: **present and well formed**. Both are `text/plain; charset=utf-8`, 200, `cache-control max-age=3600`. llms.txt is 40 KB and 355 lines, with an H1, a blockquote summary, Entity, Pricing table, Product, Documentation, Partner, Compare and Playbooks sections, a 170-URL canonical directory and a link to the full file. llms-full.txt is 194 KB and 1,264 lines.
- Coverage: the canonical directory matches `sitemap.xml` exactly. There are 170 URLs in each, with 0 in the sitemap but missing from llms and 0 the other way.
- Link check: 171 of 172 extracted URLs return 200. **One 404:** in the "Notes" bullet, a bare URL is followed by a full stop (`.../blog/whatsapp-business-api-pricing-india.`). Parsers that autolink grab the period. Fix in `scripts/generate-llms.mjs` line 178: make it a markdown link.
- Price accuracy against live pages: Launch ₹1,999 / ₹1,599 yearly / ₹19,188, Growth ₹3,999 / ₹3,199 / ₹38,388, Scale ₹6,499 / ₹5,199 / ₹62,388, order caps 100/800/1,500, sends 3,000/15,000/30,000, and the trial of 14 days / 20 orders / 200 sends / no card. **All match** /pricing and the landing pages.
- **Gap 1: App Store USD prices are missing from llms.txt.** The $19/$39/$65 Shopify App Store prices appear 16 times in llms-full.txt but 0 times in llms.txt. The Notes also say "Platform billing is INR", which is only true off the App Store. The App Store listing itself shows "From ₹1,765.34 INR/month" (Shopify's FX estimate, Verified). That gives AI three different "from" prices: ₹1,999, ₹1,599 (yearly, which is what the landing pages' sticky bar and Organization `minPrice` show) and ₹1,765. Fix: add an App Store row and a sentence naming which figure is the monthly list price.
- **Gap 2: AI Brain providers contradict.** llms.txt and llms-full say "your own OpenAI, Claude or Gemini key". The docs reference (/docs/reference/ai-brain) says "Gemini or OpenAI key", and the Shopify listing's "Works with" shows Google Gemini and OpenAI only (Verified). Confirm whether Claude keys work, then align the feature-page description that feeds the generator.
- **Gap 3: the money pages are not annotated in llms.txt.** /whatsapp-app-for-shopify, /whatsapp-abandoned-cart-recovery-app, /shopify-whatsapp-integration, /pricing, /customers and /about appear only as bare URLs in the directory. Compare pages and features get one-line descriptions. Add a "Start here" section with descriptions.
- Stale entries: none found. Dates are current (24 Nov compare reads). The "(2027)" year in 10 titles is carried into llms.txt (see section 3).

## 3. Passage-level citability (Verified content, Estimate scores)

Key: Ans = 40 to 60 word self-contained answer near top; QH = question-form headings; Tbl = semantic `<table>`; Stat = dated, sourced statistics; Ent = "TopEdge AI is ..." sentence; A/D = visible author and date.

| Page | Ans | QH | Tbl | Stat | Ent | A/D | Score |
|---|---|---|---|---|---|---|---|
| / | Partial (26 words) | No | No | No (₹180 to ₹240 unsourced here) | Yes | No | 48 |
| /pricing | Yes (FAQ "How much does TopEdge AI cost?", about 50 words) | FAQ as `<p>` | No (plan grid is divs) | Yes (Meta, Dondy, AiSensy, ECB FX dated) | No on page | Schema dateModified only | 70 |
| /features/cod-confirmation | No (22-word hero) | Yes (FAQ H3) | **Yes** (dated, sourced cost table) | Yes | No | Schema only | 74 |
| /features/journeys | No | Yes (H2 and H3 questions) | No | Meta rates only, undated here | No | Schema only | 60 |
| /whatsapp-app-for-shopify | Partial (FAQ #1, about 55 words, but below the fold) | `<summary>` questions | No (comparison is divs) | Mixed: sourced, but inconsistent and one unsourced | No | No | 55 |
| /whatsapp-abandoned-cart-recovery-app | Partial (FAQ #1) | `<summary>` | No (vs Shopify grid is divs) | Yes (₹258.93 maths, Shopify and ECB dated) | No | No | 68 |
| /shopify-whatsapp-integration | **Yes** ("The short answer", 56 words) | FAQ as `<p>` | No (sync and glue-code grids are divs) | Yes (Baymard, Unicommerce, Amazon, Meta, dated) | No | No | 78 |
| /compare/interakt | **Yes** (60 words, dated) | Yes | **Yes** (2) | Yes, dated per row | Implicit | Author + dates in schema and visible "read" dates | 88 |
| /compare/wati | **Yes** (58 words) | Yes | **Yes** (2) | Yes | Implicit | Same | 87 |
| /customers | No | No | No | No outcome numbers | No | No | 35 |
| /about | Yes (entity paragraph) | No | No | No | **Yes** | No | 50 |
| /blog/best-whatsapp-apps-for-shopify | **Yes** ("Direct answer", 68 words) | Yes | **Yes** (2) | Yes (all read 24 Nov) | **Yes** | **Yes** (Smit Tilva, 22 Sept, updated 24 Nov) | 86 |
| /blog/whatsapp-automation-for-shopify | **Yes** | Yes | **Yes** (4) | Yes | Yes | **Yes** (Moksh Patel, updated 20 Nov) | 85 |

### Best and weakest passage per page (quoted from live HTML)

- **/**. Best: "TopEdge AI is all-in-one D2C software for Shopify stores, built as one suite. Flat INR plans start at ₹1,999/mo with a 14-day free trial." Weakest: "Confirm every COD order before it ships, because a returned parcel costs ₹180 to ₹240." (no source on this page; the source exists on /features/cod-confirmation).
- **/pricing**. Best: FAQ "₹1,999, ₹3,999 or ₹6,499 a month plus GST, sized by orders: 100, 800 or 1,500 a month. Meta bills your WhatsApp messages directly, at 0% markup from us..." Weakest: the default plan cards show only "₹1,599 per month, billed yearly". A model lifting the card reads ₹1,599 as the monthly price.
- **/features/cod-confirmation**. Best: "a confirmation is a utility template at ₹0.1150 per delivered message in India, so confirming 500 COD orders costs ₹57.50." Weakest: hero "Every cash on delivery buyer confirms on WhatsApp before you ship, so RTO falls and COD can turn into prepaid." (no entity, no number)
- **/features/journeys**. Best: "Each reminder is a marketing template at ₹0.8631 per delivered message in India, so all three steps cost ₹2.59 in Meta fees." Weakest: "Cart, COD and shipping journeys on one canvas, measured in recovered rupees."
- **/whatsapp-app-for-shopify**. Best: FAQ 1 "A WhatsApp app for Shopify connects your store's carts and orders to WhatsApp... TopEdge AI runs on Meta's official Cloud API with 0% markup on Meta's rates, from ₹1,999 a month or $19 on the Shopify App Store." Weakest: "Stop paying a hidden 20% to 30% markup on every customer message." This is unsourced, and the site's own blog shows Getgabs and Meta's own app at 0% and Interakt at 11% on marketing.
- **/whatsapp-abandoned-cart-recovery-app**. Best: "Each reminder is a Meta marketing template at ₹0.8631 in India. If all three reach 100 shoppers who opted in, Meta bills ₹258.93. That is the ceiling..." Weakest: FAQ 5 "Most recovered carts come back without a discount" (no source).
- **/shopify-whatsapp-integration**. Best: "The short answer" block (56 words, defines the category, names TopEdge AI, 30 minutes, ₹0.115). Weakest: "Two problems drive almost every integration we see" (an internal anecdote framed as data).
- **/compare/interakt**. Best: "For a Shopify store in India that ships COD, TopEdge AI is the closer fit... Interakt suits brands that want Instagram DMs and WhatsApp in one inbox, and it has 236 App Store reviews to our none. Prices read 24 November 2026." Weakest: capability rows such as "Interakt: Standard analytics" and "Standard contact list management and basic tagging". These are unsourced characterisations sitting beside dated, sourced rows, and there is a typo ("visitor activiy").
- **/compare/wati**. Best: "WATI's Growth rate card charges ₹1.0357 per India marketing message, 20% over Meta's ₹0.8631. On a 50,000-message festive week that is ₹8,630 more." Weakest: "WATI: Manual contact management" (unsourced).
- **/customers**. Best: Delitech quote "Moksh got our Shopify WhatsApp live the same week we asked..." Weakest: "Rated 4.0 out of 5 from 5 Trustpilot reviews". This is stale: Trustpilot shows 4.2 from 6 today (Verified). There are no before/after numbers for either customer.
- **/about**. Best: "We started it in 2024 because Indian brands were stitching five apps together to recover carts, confirm COD orders and answer 'where is my order?' on WhatsApp." Weakest: "If something could be better, tell us. It shapes what we build next."
- **/blog/best-whatsapp-apps-for-shopify**. Best: the FAQ "Do WhatsApp apps for Shopify mark up Meta's message rates?" answer (dated, names four vendors with rupee figures). Weakest: the TopEdge AI entry (#1) lists Best for, Price and Trial but **no App Store rating line**. Every rival entry carries one (for example "4.3 from 236 reviews"). Add "No Shopify App Store reviews yet (24 Nov 2026)" for symmetry. The compare pages already do this honestly.
- **/blog/whatsapp-automation-for-shopify**. Best: the Shopify Messaging vs app table (dated, sourced, concedes where Shopify is enough). Weakest: the title "India Guide (2027)" on a page updated 20 Nov 2026.

### Cross-page consistency defects (Verified). These hurt AI trust more than any single page.

| Claim | Page A | Page B |
|---|---|---|
| RTO stat | /whatsapp-app-for-shopify: "Unicommerce/Shipway ... 21% by February 2026 among brands that verify orders and optimise courier selection". H2: "The brands that verify COD orders run half the RTO". | /shopify-whatsapp-integration: "Unicommerce India D2C Report 2026 ... 21.0% by March 2026 among brands running prepaid incentives and pre-dispatch address verification" |
| Setup time | Landing pages: "Live in about fifteen minutes" | Home, integration page and docs quickstart: "about 30 minutes" |
| Feature count | /whatsapp-app-for-shopify hero: "20 more features" | Same page, pricing: "30+ features" |
| Trustpilot | Site-wide: "4.0 from 5 reviews, read 10 October 2026". Landing pages give no date. | Trustpilot today: 4.2 from 6 reviews, claimed Sep 2026 (Verified via WebFetch) |
| Entry price | Sticky bar on the landing pages and Organization `minPrice`: ₹1,599 | Meta description, FAQ, llms.txt: ₹1,999/mo |
| Year in title | 10 titles say "(2027)" (compare/wati, /aisensy, /interakt; blog automation, Interakt alternative, AiSensy alternative, upsell apps, SEO experts, shipping aggregators, dev companies) | Today is 24 Nov 2026. The compare H2 says "Prices read 24 November 2026". |
| Meta Business Partner | /customers, footer, ProofWall: "Approved Meta Business Partner" | I could not verify this (not checked against Meta's partner directory). If TopEdge is not a listed partner, remove it. A false badge is the kind of claim AI fact-checks against third-party sources. |

## 4. Entity and brand signals

| Signal | Status | Evidence |
|---|---|---|
| Organization schema | **Good**. `@id`, legalName, taxID, foundingDate 2024, founders as Person, `disambiguatingDescription` ("not related to edge-AI hardware"), alternateName [TopEdge, TopEdge Ai] | Verified on / |
| sameAs | LinkedIn, Instagram, YouTube, Shopify App Store, Trustpilot. **Product Hunt is missing** even though the site quotes the PH rating. Founder Person nodes have no sameAs (LinkedIn profiles). | Verified |
| Shopify App Store | Live, "TopEdge AI: WA COD & Cart", launched 30 Sept 2026, **Rating 0.0 (0 reviews)**, developer shown as "TopEdge Ai", "Works with Gemini, OpenAI" | Verified |
| Trustpilot | 4.2, 6 reviews, all 5-star (per its distribution), claimed Sep 2026. "No recent history of asking customers for reviews." Name shown as "Topedge Ai". | Verified (WebFetch) |
| Product Hunt | TopEdge AI, 5.0 from 8 reviews, launched about 2 months ago, 9 followers | Verified (WebFetch) |
| YouTube @topedge_ai | Exists (200). The page payload suggests about 1 video. | Verified exists; video count is an Estimate from the payload |
| Instagram @topedgeai_com | Exists (200) | Verified |
| LinkedIn /company/topedgeai | Returned 403 to both fetchers, so existence was **not verified** | Blocked |
| Wikidata | **No entity** (wbsearchentities "TopEdge AI" = 0 results) | Verified |
| Wikipedia | No article (404, 0 search hits). Not notable yet, so do not create one. | Verified |
| Crunchbase, G2 | 403 to fetchers, **not verified** | Blocked |
| Reddit | Search API 403, **not verified**. Hypothesis: near-zero mentions. | Blocked |
| "edge AI" name clash | Web search scraping (Bing, DuckDuckGo) returned bot-wall or irrelevant pages, so the SERP was **not verified**. Mitigations already on site: disambiguation line in llms.txt and Organization schema. | Not verified |

Interpretation (Hypothesis): the 2 Nov pattern, 12 citations vs 7 recommendations with apps.shopify.com the top cited domain (31/80), is consistent with models using topedgeai.com as a *data source* for rival prices while preferring a *third-party-validated* app to recommend. The site's own content quality is already high. The missing input is independent evidence: App Store reviews, Reddit/YouTube mentions, and a Wikidata item that ties the entity together.

## 5. Ranked actions (fix, file, effort, label)

No single tactic guarantees an AI citation. These raise the odds and remove contradictions.

1. **Get the first Shopify App Store reviews** from live merchants (Delitech, Apex Light, Trustpilot and PH reviewers) through Shopify's own review request. Do not incentivise them. Effort: owner, 1 to 2 weeks. This is the single largest gap because apps.shopify.com is the most cited domain. (Verified gap)
2. **Reconcile the RTO stat** across `public/whatsapp-app-for-shopify/index.html` and the integration page source. Use one source name, one month and the exact cohort wording. Soften the H2 "run half the RTO" to what the source says (correlation, not causation). Effort: 30 min. (Verified)
3. **Remove or source "hidden 20% to 30% markup"** in `public/whatsapp-app-for-shopify/index.html` (and the matching line on the cart page if it is there). Replace it with the dated per-vendor figures already on the compare pages. Effort: 20 min. (Verified)
4. **Refresh review counts** (Trustpilot 4.2 / 6) in the shared review-platform data used by ProofWall/ReviewPlatforms, and in the two static landing pages. Add the read date to the landing pages. Effort: 15 min. (Verified)
5. **Fix llms.txt** in `scripts/generate-llms.mjs`. (a) Add the App Store $19/$39/$65 row and state "₹1,999/mo is the monthly list price; ₹1,599 is the yearly-billed equivalent". (b) Change line 178 to a markdown link so the trailing period stops causing a 404. (c) Add a described "Start here" block for the six money pages. (d) Align the AI Brain providers with the docs. Effort: 1 hour. (Verified)
6. **Drop "(2027)" from titles** until 1 January 2027 (`src/marketing/data/compareCompetitors.ts` lines 116/152/188, and `src/data/blogPosts*.ts`). Use 2026 or no year. Effort: 20 min. (Verified)
7. **Verify the "Approved Meta Business Partner" badge** (`ProofWall.tsx:95`, `ReviewPlatforms.tsx:91`, `MarketingFooter.tsx:292`, `CustomersPage.tsx:31`). Remove it if TopEdge is not in Meta's partner directory. Effort: 10 min. (Hypothesis until checked)
8. **Add symmetric honesty to the best-apps listicle**: give the TopEdge AI entry an App Store rating line ("no reviews yet, 24 Nov 2026"). Self-ranked #1 lists without disclosed weaknesses are a plausible reason for "cited, not recommended". Effort: 10 min. (Hypothesis on the effect)
9. **Convert div grids to semantic `<table>`** on /pricing (Compare all plans), /shopify-whatsapp-integration (sync table and glue-code table) and the landing-page comparisons. Make FAQ questions H3, not `<p>`, on /pricing and /shopify-whatsapp-integration. No visual change is needed. Effort: 2 hours. (Verified structure)
10. **/customers: add measured outcomes** (RTO before/after, recovered ₹ over a stated period) only where the merchant gives numbers and permission. Also fix the second `<h1>` (CTA row). Effort: owner interviews plus 1 hour. (Verified gap)
11. **Entity graph**: create a Wikidata item (instance of: software company; country: India; founded 2024; official website; Shopify app ID; founders) once two independent sources exist. Add Product Hunt to `sameAs` (`src/marketing/data/pageSeo.ts` around line 447) and founder LinkedIn URLs to the Person nodes. Effort: 1 hour. (Verified absence)
12. **YouTube**: publish 3 to 5 short screen recordings (COD confirmation setup, cart recovery cost walk-through, Shopify Messaging vs app) with transcripts, and embed them on the matching pages. YouTube mentions are among the strongest third-party correlates of AI citation. Effort: 1 to 2 days. (Estimate)
13. **Home and feature heroes**: keep one short line (house rule). Add an FAQ section on / with "What is TopEdge AI?" (a 40 to 60 word answer that includes the entity sentence, price and trial), and add a sourced line under the ₹180 to ₹240 claim. Effort: 1 hour. (Verified gap)
14. **Comparison capability boards**: either source each rival row ("per wati.io/pricing, read 24 Nov") or delete the rows you cannot source (analytics, CRM dedup, warranty). Fix the "activiy" typo. Effort: 1 to 2 hours. (Verified)

## 6. Fifteen buyer prompts and the page that should be cited

| # | Prompt (Indian Shopify founder) | Should be cited | Status |
|---|---|---|---|
| 1 | Best WhatsApp app for Shopify in India for COD orders | /blog/best-whatsapp-apps-for-shopify | Strong page; App Store reviews are the limiter |
| 2 | How do I confirm COD orders on WhatsApp in Shopify? | /features/cod-confirmation (+ /docs/guides/cod-confirmation) | Strong |
| 3 | How to reduce RTO for a Shopify store in India | /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation | Exists (not audited in depth here) |
| 4 | Interakt vs WATI vs AiSensy for Shopify, which is cheaper? | /compare/topedge-vs-wati-vs-interakt-vs-aisensy | Exists |
| 5 | Interakt alternative for Shopify India | /compare/interakt (+ /blog/interakt-alternative-shopify-india) | Strong. Fix "(2027)". |
| 6 | Does WATI charge markup on WhatsApp messages? | /compare/wati (+ /blog/wati-pricing-india) | Strong |
| 7 | WhatsApp Business API price per message in India 2026 | /blog/whatsapp-business-api-pricing-india, /pricing/meta-rates | Exists |
| 8 | Best WhatsApp abandoned cart recovery app for Shopify | /whatsapp-abandoned-cart-recovery-app, /blog/best-shopify-app-for-abandoned-cart-recovery-india | Exists |
| 9 | Can Shopify send WhatsApp abandoned cart messages without an app? | /blog/whatsapp-automation-for-shopify | Strong, timely (Shopify Messaging, 28 Oct 2026) |
| 10 | How to convert COD orders to prepaid on WhatsApp | /blog/cod-to-prepaid-whatsapp-shopify-india | Exists |
| 11 | Is TopEdge AI legit? TopEdge AI reviews | /customers | **Weak**: stale counts, no outcomes, 0 App Store reviews |
| 12 | TopEdge AI pricing / how much is TopEdge AI | /pricing | Good. Fix the ₹1,599 vs ₹1,999 ambiguity. |
| 13 | Bitespeed vs Zoko for a small Shopify brand | /compare/bitespeed, /compare/zoko | Partial. **No Bitespeed vs Zoko head-to-head page yet.** |
| 14 | Best COD confirmation app for Shopify India (roundup) | **No page yet.** Closest is /features/cod-confirmation. A dated roundup of COD/RTO apps (incl. GoKwik, Shiprocket checkout and others) is missing. | Gap |
| 15 | WhatsApp NDR / failed delivery automation for Shopify | **No page yet**, and TopEdge does not do NDR (stated on the blog). Better to cite the honest "not a fit" line than to build a page. | Not a fit |

Also uncovered: "Hinglish WhatsApp chatbot for Shopify" (/features/intent-detection exists but is thin on India specifics; not audited) and "Shopify order tracking on WhatsApp" (docs guide only, no marketing page).

## 7. What was not run

- No live AI-answer sampling (DataForSEO / OpenSEO) in this pass, so citation counts are the 2 Nov figures only.
- LinkedIn, Crunchbase, G2 and Reddit returned 403. Their presence is unverified.
- The SERP name clash with "edge AI" was not verifiable (search engines bot-walled the scraper).
- Netlify IP-level bot handling was not tested beyond UA spoofing.
- Meta's 1,000 free service messages from 1 Oct 2026 claim: **Verified** on developers.facebook.com/docs/whatsapp/pricing. The INR per-message rates were not re-verified (Meta's page links out to the rate card).

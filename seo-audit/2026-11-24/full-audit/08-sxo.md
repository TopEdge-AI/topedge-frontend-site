# 08 SXO audit: SERP backwards analysis, page-type mismatch, personas (24 Nov 2026)

Skill: `claude-seo:seo-sxo` (v2.6.2). Read-only run; this file is the only write.
Scores here are the **SXO Gap Score**, separate from any SEO Health Score.

**Labels.** **Verified** = I ran the query or fetched/rendered the page on 24 Nov 2026 and say what I saw. **Estimate** = my judgement from verified inputs. **Hypothesis** = plausible, not tested.

## 0. Method and evidence

- **Our pages (Verified).** I rendered all 21 URLs with `render_page.py --mode auto --json`. Every one returned HTTP 200, none was an SPA shell, and the renderer reported no sandbox warning. I extracted headings, schema types, CTAs and word counts from the rendered DOM.
- **Screenshots (Verified).** I took mobile first-screen screenshots with `capture_screenshot.py -v mobile` for 12 pages.
  - `/` and `/whatsapp-app-for-shopify` **timed out at 30 s and again at 90 s** (`Page load timed out`, sandbox true). Those two pages were scored from rendered HTML only.
  - **Hypothesis:** the autoplaying product films (11 `<video>` on `/`, 6 on the landing page) keep the network busy, so the page never settles. This is not a Core Web Vitals finding. Run `seo-technical`/PageSpeed before saying anything about speed.
- **SERPs (Verified, with limits).** I ran WebSearch on 24 Nov 2026 with India modifiers.
  - The tool is US-biased and returns an unranked list, so read it as "who and what type wins", not exact positions.
  - **It does not expose People Also Ask, AI Overview, video or shopping blocks.** Where this report lists questions, they come from:
    - the OpenSEO India data in `2026-11-24/page-audits/best-whatsapp-apps-blog/analysis-report.html` (Verified, 24 Nov)
    - the 15 Nov SERP teardown, `2026-11-15/01-serp-teardown.md` (Verified 15 Nov)
    - our own page FAQs, marked as such
  - I did not invent any SERP feature.
- **App Store listing (Verified, WebFetch apps.shopify.com/topedge-ai, 24 Nov).**
  - "0.0 (0 Reviews)", launched 30 Sep 2026, no Built for Shopify badge.
  - Shown to an Indian visitor in INR: Launch ₹1,765.34, Growth ₹3,623.59, Scale ₹6,039.32 a month.
  - The App Store search page did not load ("trouble loading your results").
- **Taxonomy:** `skills/seo-sxo/references/page-type-taxonomy.md` (8 types).

---

## 1. The headline finding

**Google's India SERPs for our product keywords are held by Shopify App Store listings and third-party listicles, not vendor landing pages.** Our pages are well built for a landing-page type, but on 4 of the 10 pairs they are a different type from what ranks. On all 10, we lack the one proof the winning type carries: **App Store reviews** (we have 0; Interakt has 236 by our own board's reading). (Estimate, from the verified SERPs below.)

The fix is mostly not more copy. It has three parts:
- Make the landing pages **hybrid**: a compact "options compared" block and an App Store door in the hero.
- Add the **one missing listicle** (COD apps).
- Close the **review gap** on the App Store listing, which itself ranks for these queries.

---

## 2. Keyword to page pairs

Page types use the taxonomy names: Landing, Blog, Product, Hybrid, Service, Comparison, Local, Tool. "AS" means a Shopify App Store listing, which counts as a Product page in the taxonomy.

### 2.1 "whatsapp app for shopify" → /whatsapp-app-for-shopify

**SERP (Verified, "whatsapp app for shopify india", 24 Nov).** 9 results:
- **Listicles (6):** fast2sms help listicle, digismoothie top 11, m.aisensy top 11, nvecta 12 best, innovaira, chatmitra "5 ways compared"
- **Vendor homepage (1):** zoko.io
- **Widget product page (1):** meetanshi
- **App Store listing (1)**

Today's OpenSEO India mobile reading in the Day 7 report (Verified, repo) adds:
- apps.shopify.com/whatsapp (Meta's app)
- getkanal's listicle
- AiSensy's integration guide
- slashdot directory
- ampmails listicle

The 15 Nov teardown found the same "listicles only" pattern for "shopify whatsapp app".

**Consensus:** listicle/comparison at about 65%, App Store about 20%, vendor home about 15% (Estimate).

**Questions with demand (OpenSEO India, 24 Nov, about 10 a month each; Verified in the repo):**
- how to add or connect whatsapp to shopify
- shopify whatsapp integration free
- shopify inbox whatsapp
- shopify whatsapp order confirmation
- shopify whatsapp plugin

**What the searcher wants on the first screen:** "which apps exist, which is right for me, what does each cost, is there a free one."

**Our page (Verified).**
- Landing page, 1,414 words.
- H1 "WhatsApp App for Shopify TopEdge AI".
- One hero button, "Start free trial →". The "Install on Shopify" button comes much later in the DOM.
- Schema: SoftwareApplication, FAQPage, WebPage, BreadcrumbList, Organization.
- It does have an honest 3-column "typical WhatsApp tool vs TopEdge AI" table.

**Mismatch: HIGH.** The page is a Landing page where the SERP rewards a Comparison page.

**Cannibalisation (Verified from titles).** Three URLs carry the exact phrase:
- the home title "WhatsApp App for Shopify India: Cart, COD & RTO"
- this landing page
- /blog/best-whatsapp-apps-for-shopify

**Gaps:**
1. There is no "your options" block naming Meta's free app, Shopify Messaging and app types, with a "best for" line each. The listicles win on exactly this.
2. The hero has no App Store door, although the plan standard in section 3b asks for two buttons.
3. The phrase appears only 2 times and is not in the first 100 words (on-page tool, Verified in `whatsapp-app-for-shopify-lp/after`).

**Fixes:**
- Add a 4-row "WhatsApp app for Shopify: your options" table under the answer panel: Meta's WhatsApp app (free, order updates), Shopify Messaging (cart reminders to opted-in subscribers), a broadcast-first BSP app, TopEdge AI. Give each a best-for line and a price. Link to the best-apps post for the full 11.
- Add "Install on Shopify" as the second hero button.
- **Owner decision:** take "WhatsApp App for Shopify" out of the home `<title>`. The home page is frozen, so this needs the owner's yes.

### 2.2 "whatsapp abandoned cart recovery app" / "shopify abandoned cart app" → /whatsapp-abandoned-cart-recovery-app

**SERP (Verified, two queries, 24 Nov).**
- "whatsapp abandoned cart recovery app shopify india": **8 of 10 are apps.shopify.com listings** (Getgabs, Alintro, Bitespeed, KwikEngage, Meta's WhatsApp, CK Carthike, SH SweetHelp, plus the category page), then fast2sms help and a wisepops listicle.
- "shopify abandoned cart app india": App Store category and app pages make up about 9 of 16; the rest are listicles (clickpost, shipway, zoko, raftlabs, wisepops) and fast2sms.

The App Store snippets quote ratings: Bitespeed 4.6 from 407, Carthike 5.0 from 304, Getgabs 4.7 from 1,141.

**Consensus:** App Store listing about 70%, listicle about 25% (Estimate). Shopping/PAA could not be observed.

**What the searcher wants on the first screen:** rating and review count, a free plan or price, "works with WhatsApp API", install.

**Our page (Verified).**
- Static /lp design, 1,136 words.
- H1 is the exact keyword.
- Hero: one button "Start free trial →", logos, Trustpilot 4.0 / Product Hunt 5.0.
- Good "TopEdge AI vs Shopify's own reminders" section and a cost per 100 abandoned checkouts.

**Mismatch: MEDIUM.** The page is a Landing page where the SERP rewards App Store listings. A landing page can rank here, but the App Store listing is the type Google is rewarding, and ours has 0 reviews.

**Gaps:**
1. No App Store button in the hero.
2. No "rating, price, setup time" spec strip of the kind every App Store snippet shows.
3. **CTA mismatch (Verified):** on this cart-recovery page, the "Message us on WhatsApp" link pre-fills "I have a question about WhatsApp COD confirmation".
4. The hero film shows "₹3,105 Recovered on WhatsApp" without a "demo store" caption. Hypothesis: visitors may read it as a customer result.

**Fixes:**
- Add a hero spec strip: "From ₹1,999/mo or $19 on the Shopify App Store · 3 reminders · live in about 15 min".
- Add an "Install on Shopify" button.
- Correct the WhatsApp pre-fill to cart recovery.
- Caption the film "Demo store".
- Off-page: get real App Store reviews. This is the biggest lever for this SERP.

### 2.3 "shopify cod app" / "cod confirmation shopify" → /features/cod-confirmation

**SERP (Verified, "shopify cod app cod confirmation india", 24 Nov).** 10 results:
- **App Store listings (4):** Hillteck "Verify COD Orders", CODBot "Advanced Cash on Delivery" (OTP), Cashify (IVR), the App Store COD collection
- **Vendor-written "best COD verification apps" listicles (5):** zoko, hillteck blog, saufter, easysell, libautech
- **App directory page (1):** delightchat's Softpulse page

The method mix is IVR, OTP and WhatsApp.

**Consensus:** listicle 50%, App Store 40% (Estimate).

**What the searcher wants on the first screen:** "which COD app, IVR or OTP or WhatsApp, what does it cost, how many reviews."

**Our page (Verified).**
- Hybrid feature page, only 470 words.
- H1 "Shopify COD app that confirms orders on WhatsApp".
- Hero buttons: "Start free trial" and "See pricing". No App Store button.
- A strong cost table (₹0.1150 per confirm, ₹57.50 per 500 confirmations, ₹180 to ₹240 per RTO), 3 steps, 5 FAQs.
- It never mentions IVR or OTP, the two methods every ranking listicle compares against.

**Mismatch: HIGH.** The page is a Hybrid page where the SERP rewards listicles and App Store pages.

**Gaps:**
1. No "WhatsApp vs IVR call vs OTP" comparison, although that is the buyer's real decision.
2. No App Store door.
3. Thin against listicles of 1,500 words or more.
4. There is **no TopEdge "best COD confirmation app for Shopify India" post**. Grep of `src/data` shows only the RTO, benchmark and COD-to-prepaid posts, so nobody on the site owns the listicle half of this SERP.

**Fixes:**
- On the feature page (allowed under the "owner of a landing-page keyword" exception): add a short "WhatsApp, IVR or OTP: which COD check fits?" 3-row table covering cost per check, buyer effort, writes back to the Shopify order, and when IVR is better. Add an "Install on Shopify" button.
- New Track A blog post "Best COD confirmation apps for Shopify India", using real App Store reads with dates and an honest "where IVR wins" line. Under the plan's rule this is a blog-owned "best X" query, not a BSP or bulk keyword.

### 2.4 "shopify whatsapp integration" → /shopify-whatsapp-integration

**SERP (Verified, "shopify whatsapp integration india", 24 Nov).** 9 results:
- **How-to guides (7, vendor or agency blogs):** customfit, whatsboost (two URLs), greenadsglobal step-by-step, chatmitra "5 ways compared", chatondesk (two), sparktg
- **Integration page (1):** watease

The synthesis also raises Shopify Messaging as a native route.

**Consensus:** how-to blog or hybrid guide about 85% (Estimate).

**What the searcher wants on the first screen:** "how do I connect it, do I need an app, is there a free or native way, what does it cost."

**Our page (Verified).**
- Hybrid, 1,726 words.
- H2 "How to connect WhatsApp to Shopify" with 5 H3 steps.
- Meta rates, a "native vs glue code" section, 6 FAQs.

**Verdict: ALIGNED** on page type.

**Gap (Verified by text search):**
- The page **never mentions Shopify Messaging or Meta's own WhatsApp app**, the free and native routes the SERP synthesis surfaces. The cart landing page does mention Shopify Messaging, with a 28 Oct 2026 date.
- On mobile the first screen is H1, a 4-line sub, buttons and badges. The steps start below the inbox image.

**Fixes:**
- Add an H3 "Can you connect WhatsApp to Shopify without an app?" that answers Shopify Messaging and Meta's app honestly and says when you need more.
- Add a jump link "5 steps to connect ↓" under the sub-line.
- This is the Day 10 Track B page.

### 2.5 "best whatsapp app for shopify" → /blog/best-whatsapp-apps-for-shopify

**SERP (Verified, "best whatsapp app for shopify india 2026", 24 Nov).** 10 listicles: aisensy, zoko, digismoothie, gokwik, getkanal, easysell, nvecta, libautech, innovaira, chatix. **Consensus: Comparison/listicle 100%.**

**Our page (Verified).**
- Blog listicle, 4,237 words, 2 tables, 11 apps, "best by job" H3s, cost at 100, 500 and 1,500 orders, 8 FAQs.
- Schema: BlogPosting, FAQPage, BreadcrumbList.
- Updated 24 Nov.

**Verdict: ALIGNED.**

**Gaps:**
- No ItemList schema, although the Interakt post has it.
- No visible scoring method (the 15 Nov teardown recommended a Sumtracker-style score table).
- The remaining gap is authority and links (Estimate, consistent with 15 Nov).

**Fixes:** add ItemList for the 11 apps and a one-table "how we ranked" method. No body rewrite is needed.

### 2.6 "interakt alternative" → /blog/interakt-alternative-shopify-india; "topedge ai vs interakt" → /compare/interakt

**SERP, "interakt alternative india shopify" (Verified, 24 Nov).** 10 vendor listicles: zoko top 10, whatsappx, xobito 10, replykaro 7, turbodev, ominiflow, chatix, kraya, cxwizard 12, happilee top 8. **Consensus: Comparison listicle 100%**, mostly 7 to 12 options.

**Our post (Verified).**
- 2,077 words, 4 named options, a "when to stay on Interakt" section, a migration checklist, an AI-cost table.
- Schema includes ItemList.

**Verdict: ALIGNED** on type. **MEDIUM depth gap:** we list 4 options where the SERP norm is 7 to 12. Searchers comparing alternatives expect Zoko, Gallabox, DoubleTick and DelightChat to at least be named; the SERP synthesis named all four.

**Fix:** add a compact "Other Interakt alternatives in one line each" table (Zoko, Gallabox, DoubleTick, DelightChat, Wati, AiSensy), with prices read on a date. Keep the depth on the 4.

**SERP, "topedge ai vs interakt" (Verified, 24 Nov).** Zero relevant results. The engine returned unrelated "Interact/Interacty" pages and no TopEdge page. Estimate: the brand query has negligible demand and our entity is not yet known to this index.

The board (Verified) is strong and honest:
- dated "Updated 24 Nov 2026" kicker
- answer box stating "it has 236 App Store reviews to our none"
- prices, a 4-step switch, 5 FAQs
- Article, FAQPage and WebPage schema

**Verdict: ALIGNED.** Its traffic will come from internal links and ads, not from this query. No change needed.

### 2.7 "whatsapp api pricing india" → /pricing, /pricing/meta-rates, /blog/whatsapp-business-api-pricing-india

**SERP (Verified, 24 Nov).** 10 results, all rate-card guides: greenadsglobal (with calculator), chatmaxima, whautomate "₹ Rate Card", messagebot, whatsinfinity "Oct 2026 changes", flowcall "Nov 2026", duedoor, kraya, theautomate, weddingkart. Titles carry the month or year, and several carry a calculator. **Consensus: Blog guide 90%, Tool about 10%.**

**Which page fits:**
- **/blog/whatsapp-business-api-pricing-india** (3,769 words, 5 tables, 10 FAQs, the Oct 2026 change, the INR deadline): **ALIGNED.**
- **/pricing/meta-rates** (840 words, Tool + Article): a valid secondary match, because it has the calculator the SERP rewards.
- **/pricing:** **MISMATCH (CRITICAL if targeted).** It is a Product/plans page and should not target this query, and it does not: its title is brand pricing. Keep it off this keyword.

**Gap:** the calculator lives on /pricing/meta-rates and is linked from the blog's lower sections, not from its first screen. The 15 Nov teardown made the same point. The blog title has no month, while flowcall and whatsinfinity show "Nov 2026" and "Oct 2026" in their titles.

**Fix:** add a first-screen line "Work out your bill: calculator →" on the blog. Consider "(Nov 2026)" in the title once the owner agrees it will be maintained.

### 2.8 "whatsapp link generator" → /tools/whatsapp-link-generator

**SERP (Verified, 24 Nov).** About 25 results, almost all Tool pages: apex.oracle, elementor, respond.io, meetanshi, linkly, timelines, sinch, chatfuel, msg91, sleekflow, konvoai, activecampaign, kommo, bolddesk, plus App Store / Chrome store apps. **Consensus: Tool about 90%.**

**Our page (Verified).**
- Tool above the fold on mobile: country select defaulting to India +91, number, pre-filled message chips.
- Link, QR (PNG/SVG) and a Shopify button snippet.
- 6 FAQs, SoftwareApplication schema.

**Verdict: ALIGNED.**

**Gaps:**
- A Trustpilot/Product Hunt badge block sits between H1 and tool and pushes the form down about 150 px on mobile. That is marketing chrome on a utility SERP.
- The QR only appears after a number is typed. Rivals (chatling) show a sample QR at once.
- The ranking decider is links (Estimate).

**Fix:** move the ratings strip below the tool result and show a sample QR placeholder at load.

### 2.9 "how to reduce rto" → /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation

**SERP (Verified, "how to reduce rto india ecommerce", 24 Nov).** 9 results, all multi-lever guides from logistics and agency sites: shipmozo, base.com, cybiqon, shipybox, trackvid (2), shipsagar "10 strategies", growwwtech "15 plays", mmbit "10 strategies". The synthesis lists the levers: COD confirm, address validation, prepaid push, NDR in 24 h, pincode/courier analysis, delivery-day reminder, repeat-refuser blocking. **Consensus: Blog listicle-guide 100%.**

**Our post (Verified).**
- 3,521 words, framed as one lever: "Reduce RTO with WhatsApp COD Confirmation (SOP)".
- It does touch the intent/courier split (GoKwik 60 to 70% intent), NDR 36 h and Hinglish templates.

**Mismatch: MEDIUM.** The format is right but the scope is too narrow. The searcher asks "how" and wants the full lever list first. Our title and first screen promise a single SOP.

**Fix:** add a first H2, "How do you reduce RTO? The 7 levers, in order of cost", one line each. COD confirmation is lever 1, linked down the page. Link the RTO cost calculator. Keep the SOP as the body. The planned /rto-reduction-shopify landing page (Day 9) then owns "rto reduction", and the blog keeps "how to".

### 2.10 "cod to prepaid" → /blog/cod-to-prepaid-whatsapp-shopify-india

**SERP (Verified, "cod to prepaid conversion shopify india", 24 Nov).** 10 results:
- **Product pages or App Store listings (6):** thegrowthagency CODFLIP (2), COD King documentation, chatondesk, Verify COD listings (2)
- **Listicle (1):** libautech
- **Strategy blogs (3):** oneflowai, oneonic, aimnlaunch

On 15 Nov the top result was a ~170-word help doc (docs.quickreply.ai).

**Consensus:** product/docs about 60%, blog about 30% (Estimate). The SERP synthesis surfaced "average COD to prepaid conversion rate in India is 3–4%" from COD King docs.

**Our post (Verified).**
- Blog, 2,192 words, 4 tables, "The flow, step by step", a "What we could not verify" section, 5 FAQs.
- The only CTA to the product is "See pricing" and the end banner. The banner H2 reads "**Run cart recovery on your Shopify store**", the generic site-wide end block, on a COD-to-prepaid post.

**Mismatch: MEDIUM.** The page is a Blog where the SERP leans to Product/docs.

**Gaps:**
- There is no "set it up in TopEdge AI" panel (plan: Growth and up; the 3 steps; the install button), which is what the product and docs winners give.
- The end CTA is the wrong job.

**Fixes:**
- Add a boxed "Set up COD to prepaid in TopEdge AI (Growth plan)": 3 numbered steps, both buttons, and a link to the docs page.
- Make the end banner match the topic: "Move COD orders to prepaid on WhatsApp".
- Optional: quote the 3–4% conversion figure with its source and date if it re-reads true.

### 2.11 Systemic: the end-of-post CTA

**Verified.** Every blog post rendered (best-apps, cod-to-prepaid, RTO, Interakt alternative, API pricing) ends with the same H2, "Run cart recovery on your Shopify store". On the RTO, COD-to-prepaid, API pricing and Interakt posts this is a CTA mismatch.

**Fix:** set the banner heading per post category: COD/RTO → "Confirm COD orders on WhatsApp"; pricing → "See what your month costs"; alternatives → "Try TopEdge AI next to <rival>".

### 2.12 SXO Gap Score per pair (100 = no gap)

Dimensions follow the skill: Page type /15, Content depth /15, UX /15, Schema /15, Media /15, Authority /15, Freshness /10. All scores are **Estimates**. Authority is low everywhere: 0 App Store reviews, 5 Trustpilot reviews, and single-digit real referring domains per the 15 Nov teardown.

| # | Page | Type | Depth | UX | Schema | Media | Auth | Fresh | **SXO Gap Score** | Mismatch |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | /whatsapp-app-for-shopify | 6 | 11 | 10 | 13 | 13 | 3 | 8 | **64** | HIGH |
| 2 | /whatsapp-abandoned-cart-recovery-app | 8 | 11 | 11 | 13 | 13 | 3 | 8 | **67** | MEDIUM |
| 3 | /features/cod-confirmation | 6 | 6 | 11 | 13 | 10 | 3 | 9 | **58** | HIGH |
| 4 | /shopify-whatsapp-integration | 13 | 12 | 10 | 13 | 9 | 3 | 8 | **68** | ALIGNED |
| 5 | /blog/best-whatsapp-apps-for-shopify | 15 | 14 | 11 | 11 | 11 | 3 | 10 | **75** | ALIGNED |
| 6a | /blog/interakt-alternative-shopify-india | 13 | 10 | 11 | 14 | 10 | 3 | 9 | **70** | ALIGNED (depth) |
| 6b | /compare/interakt | 14 | 12 | 12 | 13 | 11 | 3 | 10 | **75** | ALIGNED |
| 7 | /blog/whatsapp-business-api-pricing-india | 14 | 14 | 10 | 12 | 10 | 3 | 9 | **72** | ALIGNED |
| 8 | /tools/whatsapp-link-generator | 15 | 11 | 11 | 13 | 8 | 3 | 7 | **68** | ALIGNED |
| 9 | /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation | 10 | 12 | 10 | 12 | 10 | 3 | 9 | **66** | MEDIUM |
| 10 | /blog/cod-to-prepaid-whatsapp-shopify-india | 9 | 11 | 10 | 12 | 10 | 3 | 8 | **63** | MEDIUM |

---

## 3. User stories (derived from the SERP signals above)

1. **Founder comparing apps (Consideration).** As a bootstrapped Shopify founder, I want to see every WhatsApp app option with a price on one screen, because I don't want to install five apps. I'm blocked by **comparison fatigue**.
   *Signal:* the 100% listicle SERP for "best whatsapp app for shopify"; 6 of 9 listicles for "whatsapp app for shopify india"; demand for "shopify whatsapp integration free".
2. **Founder at the install step (Decision).** As a founder ready to install, I want to see reviews and a price on the App Store, because that is where Shopify apps are judged. I'm blocked by a **trust gap**: our listing shows 0 reviews next to rivals with 300 to 1,141.
   *Signal:* 8 of 10 App Store results for the cart-recovery query, with rating counts in the snippets.
3. **COD operator choosing a method (Consideration).** As an ops lead drowning in RTO, I want to know whether WhatsApp, IVR or OTP confirmation works best, because my COD share is high. I'm blocked by an **information gap**: our COD page never names IVR or OTP.
   *Signal:* the "shopify cod app" SERP is mostly IVR/OTP apps and "best COD verification apps" lists.
4. **Founder learning about RTO (Awareness).** As a founder searching "how to reduce RTO", I want all the levers ranked, because I don't yet know that confirmation is the cheapest. I'm blocked by **technical confusion**: our post opens on one SOP.
   *Signal:* 9 of 9 multi-lever guides ("10 strategies", "15 plays").
5. **Founder checking real costs (Consideration).** As a price-sensitive founder, I want this month's per-message rate and a calculator, because Meta changed prices on 1 Oct 2026. I'm blocked by **price sensitivity** and conflicting numbers.
   *Signal:* the API-pricing SERP titles carry "Nov 2026" and "Oct 2026" plus calculators.

---

## 4. Persona scoring: core pages (mobile, rendered 24 Nov)

**The three personas:**
- **P1, bootstrapped D2C founder on a phone comparing price.** Traces to stories 1, 2 and 5.
- **P2, growth or retention manager comparing features against Interakt and WATI.** Traces to the "interakt alternative" and "best app" listicles.
- **P3, Shopify agency evaluating for a client.** Traces to the digismoothie/nvecta agency-style roundups and the "5 ways compared" integration guides.

**How to read the tables.** Each persona gets 4 dimensions of 25 points (Relevance, Clarity, Trust, Action). The columns map onto the brief's labels:
- **Clarity** = first-screen clarity
- **Trust** = trust proof
- **Action** = next-step clarity, with friction taken off it

I convert the 100-point total to a **score out of 10**. All scores are Estimates built on Verified observations.

### Site-wide observations, applying to every page below

- **Promo bar (Verified, all screenshots).** A purple bar ("~~Multiple Apps~~ Complete D2C Suite → Signup 14-days trial to access everything") takes about 60 of the 812 CSS px of the first mobile screen.
  - Its link text says "Signup" but it goes to **/pricing** (Verified from the href). That is a CTA label mismatch.
  - Fix: make the bar link go to /signup, or reword it to "See plans". Consider letting it disappear after scroll.
- **Proof is the same thin set everywhere (Verified).** Trustpilot 4.0 from 5 reviews, Product Hunt 5.0 from 8, the same 5 logos (Delitech, Apex Light, Ajeeb, Ecom, Oleez). There are **0 App Store reviews** (Verified) and no quantified customer result anywhere. Never invent one. The honest fix is collecting reviews.
- **"Meta Business Partner" badge (Verified on /customers and in the code).** It also appears in the static landing pages and the footer. **Hypothesis:** if TopEdge AI is not listed in Meta's partner directory, this is an unbacked claim. The owner should confirm the listing exists or remove the badge (same rule as "never invent proof").
- **No mobile sticky CTA was found** in the page markup (Hypothesis-level check by class names). The header "Start free" button is visible on the first screen. I did not verify whether it stays on scroll.
- **Partner program** is linked only from nav and footer. The link count is the same on every page (3), so there are no in-body links. P3 never meets it in context.

### 4.1 Score table (out of 10)

| Page | P1 founder (phone, price) | P2 growth mgr (vs Interakt/WATI) | P3 agency |
|---|---|---|---|
| / | **8** | **6** | **5** |
| /pricing | **6** | **7** | **5** |
| /features | **6** | **6** | **6** |
| /features/journeys | **6** | **7** | **6** |
| /customers | **5** | **4** | **5** |
| /about | **5** | **4** | **6** |
| /services | **4** | **5** | **4** |
| /compare | **5** | **7** | **6** |
| /contact | **8** | **6** | **6** |

**Weakest persona overall: P3 agency (average about 5.4), then P2 on /customers and /about.** Systemic weak dimension: **Trust**, at 9 to 13 of 25 on every page.

### 4.2 Per page detail

**/ (home)**
- Verified: H1 "Recover carts. Confirm COD orders. The WhatsApp app for Shopify India." Sub-line gives ₹1,999/mo and the 14-day trial. Two buttons: Start free trial and Install on Shopify. Ratings with read dates. Then 10 feature film panels, each with a "See X" link.
- P1, 8/10. First screen: clear, price is visible. Trust: thin, with 5 Trustpilot reviews. Next step: two clear doors. Friction: heavy film page; the screenshot timed out at 90 s (Hypothesis that it is slow on 4G). **Top fix:** run PageSpeed/CrUX before changing anything, and lazy-load films below the first panel if it confirms.
- P2, 6/10. No rival is named on the first screen and there is no "vs Interakt/WATI" path until the footer. **Top fix (home is frozen, so for the owner):** one small text link under the badges, "Comparing Interakt or WATI? See the boards →".
- P3, 5/10. Nothing for agencies: no multi-store or partner line. **Top fix:** a footer-adjacent "Agencies: partner program" link in the closing CTA block.

**/pricing**
- Verified: H1 "TopEdge AI pricing, by the orders you ship, with 0% Meta markup." **The billing toggle defaults to Yearly**, so the cards read ₹1,599 / ₹3,199 / ₹5,199 "per month, billed yearly". The title, meta description, the FAQ on the same page and every other page say ₹1,999 / ₹3,999 / ₹6,499. The App Store shows ₹1,765 / ₹3,624 / ₹6,039 to an Indian visitor (Verified). The first mobile screen shows the ₹0 trial card, not a plan price. The "Compare all plans" grid is not a `<table>` (0 tables in the DOM). The USD App Store prices appear only in the FAQ.
- P1, 6/10. First screen: no plan price above the fold, and three different rupee numbers for the same plan across SERP, page and App Store. Trust: fair. Next step: clear. Friction: the price confusion. **Top fix:** default the toggle to **Monthly** so the cards match the snippet (₹1,999), and keep "Save with yearly" as the badge. Put a one-line "Also on the Shopify App Store from $19/mo (billed by Shopify)" under the toggle.
- P2, 7/10. Plan differences are clear (orders, sends, Journey Branch, COD to prepaid) and the Meta ₹0 block is strong. There is no rival price reference on the page. **Top fix:** one line under "Meta bills you directly", "How this compares with Interakt, WATI and AiSensy →", linking to /compare. No new table, which avoids clutter.
- P3, 5/10. No multi-store or agency billing information. **Top fix:** add an FAQ "I run several client stores, how is that billed?" with the true answer (per store, or partner program), linked to the partner page.

**/features**
- Verified: H1 "TopEdge AI features for Shopify brands on WhatsApp, by job". The sub-paragraph is 4 lines. The mobile screenshot shows a **blank band of about 130 CSS px under the buttons** before the first card (Hypothesis: a film or poster that has not loaded). 480 words; 4 job groups with 16 cards.
- P1, 6/10. **Top fix:** remove or fill the empty band, and cut the sub-line to one line, since heroes stay short.
- P2, 6/10. The by-job grouping is good, but there is no "which of these Interakt/WATI lack" cue. **Top fix:** a single "Compare against Interakt / WATI / AiSensy" chip row under the H1.
- P3, 6/10. **Top fix:** add a link to the docs on each card for implementers. Agencies want setup depth.

**/features/journeys**
- Verified: H1 "Shopify WhatsApp journey builder for carts and COD", one-line sub, two buttons, logos. Then a hero film showing "₹1,24,600 recovered from carts · 312 COD orders confirmed · 1,289 shoppers welcomed" with **no "demo data" label**. 368 words.
- P1, 6/10. **Top fix:** caption the film "Demo store, illustrative numbers". Hypothesis: without it, the figures can read as a customer claim, which the owner rule forbids.
- P2, 7/10. The branching and Meta-gating explanations suit this persona. **Top fix:** a 4-row "journey templates included" list with trigger and timing.
- P3, 6/10. **Top fix:** link to /whatsapp-journey-examples near the top, not only in "Related".

**/customers**
- Verified: H1 "How Indian Shopify brands recover carts and confirm COD on WhatsApp". **Two** testimonials (Ved Patel, Delitech; Shubham, Apex Light), both qualitative, with no numbers and no dates of use. The rest is a 3-step rollout. 257 words. The title promises "Reviews & Case Studies".
- P1, 5/10; P2, 4/10; P3, 5/10. **The page does not meet its title's promise** of case studies with results.
- **Top fix for all three:** ask the two brands for one real, permissioned before/after number each (for example the COD confirm rate or the recovered carts in a month) with a date. Until they exist, retitle to "TopEdge AI customer reviews" so the promise matches. Link the Trustpilot and Product Hunt review pages directly. Never estimate a result for them.

**/about**
- Verified: H1 "Built in Ahmedabad, for Shopify brands."; 2024 founding story; founders named; office address in the footer. The first mobile screen is all lined-paper prose with **no CTA**. 96 words extracted by trafilatura.
- P1, 5/10; P2, 4/10; P3, 6/10. P3 values the named founders and the address.
- **Top fix:** add founder photos, LinkedIn links and a one-line "why trust us" (launched on the Shopify App Store on 30 Sep 2026; Meta Cloud API) near the top. Add a small "Start free" link after paragraph 1. This page is also the E-E-A-T anchor: run `/seo content`.

**/services**
- Verified: **the H1 overflows on mobile.** "WhatsApp automation servic…" is clipped off the right edge in the 375 px screenshot. The sub-line says "Seven things we take responsibility for", but paragraph 2 says "TopEdge AI is software you run yourself… not an agency retainer". The 7 outcome blocks repeat the /features modules. 1,227 words.
- **Page-type mismatch (Estimate):** "services" queries expect a Service page (done-for-you, process, case studies). This page is a Hybrid features page with a services title. Memory confirms /services is not done-for-you.
- P1, 4/10; P2, 5/10; P3, 4/10. P3 is exactly the visitor who reads "services" as "will you implement it for my client".
- **Top fixes:**
  1. Fix the H1 wrap with CSS (allow the line break or reduce the font size on narrow screens).
  2. Make the first screen state plainly "Guided onboarding included, not an agency service" and say what onboarding covers: template approval, migration, first journey.
  3. Add a "For agencies: partner program →" block.
  4. Cut the 7 blocks that duplicate /features down to one-line links, which removes a repeated wall.

**/compare**
- Verified: the mobile first screen opens with **about 100 CSS px of empty space** above the "Comparison" pill. H1 "TopEdge AI vs WhatsApp tools for Shopify India", a 5-line sub, 3 chips, then badges. The first board card is below the fold. 373 words, 30 images.
- P1, 5/10. A price comparer gets no prices on the first screen. **Top fix:** remove the top gap, cut the sub to one line, and add a small 4-row "Starting price, Meta markup" summary (TopEdge AI, Interakt, WATI, AiSensy, with dated prices taken from the boards) above the cards. The data already exists in `compareRefresh.ts`.
- P2, 7/10. Head-to-head boards are what P2 wants. **Top fix:** put "Pick your current tool:" chips (Interakt, WATI, AiSensy, Bitespeed, Zoko) in the first screen.
- P3, 6/10. **Top fix:** the same chip row. The hub refresh is already planned for Day 11 (section 3c, row 13).

**/contact**
- Verified: H1 "Message us where you already message everyone"; "No form, no callback queue"; WhatsApp card with number and hours (Mon to Sat, 10am to 7pm IST, same-day). Instagram is next; email only under "Not a sales question?".
- P1, 8/10. Ideal for a founder on a phone.
- P2, 6/10. **Top fix:** add a line "Switching from Interakt or WATI? Say which, and we will send the 4-step switch plan" in the WhatsApp card pre-fill.
- P3, 6/10. Agencies prefer email or a booked call. **Top fix:** show team@topedgeai.com as a third first-screen card ("Agencies and partners"), linked to the partner program.

---

## 5. UX review as a visitor

**Verified from mobile screenshots and DOM; fixes are Estimates.**

| Pattern | Where | What I saw | Fix |
|---|---|---|---|
| Clipped H1 | /services | H1 cut off on the right at 375 px | CSS wrap or clamp() font size |
| Empty bands | /features (under buttons), /compare (above the pill) | About 100 to 130 px of blank space in the first screen | Remove the spacer, or reserve space only once the media loads |
| Promo bar eats the fold | Every React page | About 60 px; label "Signup" → /pricing | Link to /signup or relabel; dismiss on scroll |
| Repeated blocks | /services 7 outcomes ≈ /features 16 cards ≈ /about "What we build" ≈ home 10 panels | The same modules described 4 ways | Keep the full description on /features only; elsewhere use one-line links |
| Wall of prose | /about first screen; /features sub (4 lines); /compare sub (5 lines) | Long centred paragraphs on mobile | One-line subs (the owner rule); move detail into FAQ accordions |
| Weak hierarchy | /pricing | Trial card above the plans; plan price not in the first screen | Monthly default; plans first, trial as a strip |
| Unlabelled demo numbers | /features/journeys film, cart landing page film (₹3,105) | Figures look like results | "Demo store" caption |
| Missing App Store door | /whatsapp-app-for-shopify, /whatsapp-abandoned-cart-recovery-app, /features/cod-confirmation heroes | One button only (or Start + Pricing) | Second hero button "Install on Shopify" (this is the plan's own standard) |
| Where a comparison table would help | /whatsapp-app-for-shopify (options), /features/cod-confirmation (WhatsApp vs IVR vs OTP), /compare (4-row price summary) | Absent | Short tables, 3 to 4 rows each |
| Where a proof strip would help | /customers, /about | 2 qualitative quotes, no numbers | Real permissioned numbers only; until then, link the review platforms |
| Where a sticky CTA would help | Long pages: /blog posts (2,000 to 4,200 words), /shopify-whatsapp-integration, /pricing | No sticky mobile CTA found in markup (Hypothesis) | A slim bottom bar on mobile after 50% scroll: "Start free, 14 days · Install on Shopify" |
| Tool-first page with chrome above | /tools/whatsapp-link-generator | Ratings block between H1 and tool | Move it below the result |

---

## 6. Prioritised list: issue → severity → fix → where measured

1. **Three URLs compete for "whatsapp app for shopify" on a listicle/App Store SERP.**
   - Severity: **HIGH**.
   - Fix: add a 4-row options table plus an App Store hero button to the landing page; owner decision on taking the phrase out of the home title.
   - Measured: WebSearch 24 Nov; titles from rendered HTML; OpenSEO SERP in the Day 7 report.
2. **The COD page never names IVR or OTP, and no site page owns "best COD app" listicle intent.**
   - Severity: **HIGH**.
   - Fix: a WhatsApp/IVR/OTP table and an App Store button on /features/cod-confirmation; a new "Best COD confirmation apps for Shopify India" post.
   - Measured: WebSearch 24 Nov; page text search; repo grep.
3. **0 App Store reviews where the App Store type dominates the SERP** (cart recovery: 8 of 10).
   - Severity: **HIGH** (off-page).
   - Fix: a real review programme, no incentives.
   - Measured: WebFetch of apps.shopify.com/topedge-ai, 24 Nov.
4. **/pricing defaults to Yearly (₹1,599) while the snippet and everything else say ₹1,999; the App Store shows ₹1,765.**
   - Severity: **HIGH** (conversion and trust).
   - Fix: Monthly default; an App Store line under the toggle.
   - Measured: rendered DOM and mobile screenshot, 24 Nov.
5. **RTO post scope is too narrow for a multi-lever SERP.**
   - Severity: **MEDIUM**.
   - Fix: first H2 "the 7 levers", plus the calculator link.
   - Measured: WebSearch 24 Nov.
6. **Generic "Run cart recovery" end banner on the COD, RTO, pricing and alternative posts.**
   - Severity: **MEDIUM**.
   - Fix: a banner heading per topic.
   - Measured: rendered H2s on 5 posts.
7. **/services: H1 clipped on mobile, page-type confusion, no agency path.**
   - Severity: **MEDIUM**.
   - Fix: CSS wrap; an "onboarding included, not an agency" line; a partner block; collapse the duplicate blocks.
   - Measured: mobile screenshot and DOM.
8. **/customers promises case studies but has 2 quotes and no results.**
   - Severity: **MEDIUM**.
   - Fix: real permissioned numbers, or retitle to reviews.
   - Measured: rendered DOM.
9. **The cart landing page's WhatsApp pre-fill mentions COD confirmation.**
   - Severity: **LOW**.
   - Fix: correct the pre-fill text.
   - Measured: href in rendered DOM.
10. **Unlabelled demo figures in films** (/features/journeys, cart landing page).
    - Severity: **LOW to MEDIUM** (proof rule).
    - Fix: "Demo store" caption.
    - Measured: screenshot; the figures are not in the text DOM, so they are in the media.
11. **"Meta Business Partner" badge is unverified.**
    - Severity: **MEDIUM if false**.
    - Fix: the owner confirms the listing or removes the badge.
    - Measured: DOM and repo grep. Hypothesis.
12. **Integration page silent on Shopify Messaging and Meta's free app.**
    - Severity: **LOW to MEDIUM**.
    - Fix: one honest H3.
    - Measured: text search.
13. **Interakt alternative lists 4 where the SERP norm is 7 to 12.**
    - Severity: **LOW**.
    - Fix: a one-line table of 6 more.
    - Measured: WebSearch 24 Nov.
14. **Link generator: ratings above the tool.**
    - Severity: **LOW**.
    - Fix: move them below the result.
    - Measured: mobile screenshot.

**Cross-skill follow-ups:**
- `/seo content`: E-E-A-T on /about and /customers.
- `/seo schema`: ItemList on the best-apps post.
- `/seo technical` or `seo-google` PageSpeed/CrUX: why `/` and `/whatsapp-app-for-shopify` never settled in headless Chromium.
- `/seo local`: not needed. No local pack signal was seen.

---

## 7. Limitations

- **No PAA, AI Overview, video or shopping data was observable.** WebSearch returns links and a synthesis only. The questions listed come from OpenSEO/Search Console data already in the repo (Verified there) or from our own FAQs. **Re-read the live India mobile SERP with OpenSEO `get_serp_results` (gl=in, mobile) for these 10 keywords to fill the feature columns.**
- The SERP order is not a guaranteed Google India rank. The tool is US-biased even with "india" in the query.
- No Search Console or field data was pulled in this run, so no ranking, CTR or Core Web Vitals claim is made.
- Screenshots of `/` and `/whatsapp-app-for-shopify` failed (timeouts). Their first-screen scoring uses rendered HTML only. Below-the-fold UX was judged from the DOM, not from full-page captures.
- The App Store search page failed to load, so our in-store rank for "whatsapp cod" is unknown.
- Persona and SXO Gap scores are Estimates against the skill's rubric. They are not measured user behaviour.
- The rendered pages ran with the Chromium sandbox on (`sandbox: true`). No sandbox warning.

Generate a PDF report? Use `/seo google report`.

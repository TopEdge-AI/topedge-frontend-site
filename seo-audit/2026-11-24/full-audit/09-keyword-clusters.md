# 09. Keyword clusters and hub-and-spoke architecture (24 Nov 2026)

Scope: topedgeai.com, Indian Shopify D2C brands (100 to 1,500 orders a month, heavy COD). Read-only run. Skill: `claude-seo:seo-cluster` (SERP-overlap method, `references/serp-overlap-methodology.md`).

Inputs read first: `seo-audit/PLAN-AND-LOG.md` (sections 1, 3, 3b, 3c and the log), `seo-audit/MASTER-PLAN-30-DAY.md` (parts 3 and 4), `seo-audit/CONTENT_ROADMAP.csv`, `scripts/marketing-urls.mjs` (BLOG_SLUGS 43 posts, FEATURE_SLUGS 13, COMPARE_SLUGS 11, multi-way boards 2, TOPIC_SLUGS, STATIC_LANDING_PATHS 2, tools 4, templates, 25 festival pages, 4 journey examples, docs from `docs.json`). Earlier research reused rather than repeated: `2026-11-05/22-keyword-and-competitor-analysis.md`, `2026-11-05/21-keyword-clusters.csv`, `2026-11-05/data/openseo-keyword-ideas-india.csv`, `2026-11-05/data/gsc-*.json`, `2026-11-15/01-serp-teardown.md`.

## 0. How to read this, and the limits

**Evidence labels.** Every number carries one of these:
- **Verified (owner brief, OpenSEO/DataForSEO, Nov 2026)**: the volumes in the task brief.
- **Verified (OpenSEO India, 5 Nov 2026, repo CSV)**: `2026-11-05/data/openseo-keyword-ideas-india.csv` or `21-keyword-clusters.csv` (location 2356).
- **Verified (OpenSEO India, 20 Nov 2026, PLAN 3b)**: section 3b of the plan.
- **Verified (GSC, date)**: Search Console figures already logged in the plan or the 5 Nov exports.
- **Verified (WebSearch, 24 Nov 2026)**: a page or URL I saw in a result today.
- **Estimate**: my arithmetic or judgement on stated inputs.
- **Hypothesis**: a reasoned guess that needs checking.
- **no data**: no volume number exists in any source I have. I did not invent one.

**Limits (read these before acting on the overlap scores):**
1. **The SERP overlap scores come from the US index, not India.** The WebSearch tool is US-only. I tried two ways to read an India SERP. A Bing fetch with `cc=IN` rewrote "cod" to Call of Duty and returned games. DuckDuckGo with `kl=in-en` showed a bot challenge. Google itself returns the CAPTCHA already logged in CONTENT_ROADMAP row 13. So every overlap score below is **Hypothesis-grade for India**. It is good enough to separate intents (app listings vs guides vs listicles vs logistics blogs), which is what clustering needs. It is not good enough for rank. Re-check the pairs marked "re-check" with OpenSEO `get_serp_results` (India 2356, mobile), as in PLAN step 5.
2. **I could not read People Also Ask.** The WebSearch tool returns no PAA boxes, and the routes to Google are blocked (above). Section 5 therefore does **not** contain PAA. It contains verbatim question-form queries from our own Search Console exports and verbatim question titles that ranked in today's results, each labelled. The PAA pull should be run with OpenSEO `get_serp_results` during each day's step 5 and pasted into section 5.
3. WebSearch returned 3 to 20 URLs per query (some are locale copies of one App Store listing, such as `?locale=th`). I collapsed locale copies to one URL before counting overlap. Counts are on the first 10 unique URLs where 10 existed.
4. No OpenSEO, DataForSEO, GSC or Semrush call was made in this run. No credentials for them are wired into this session. Every volume therefore comes from the repo files or the brief.
5. The skill's `cluster-plan.json` is not written as a separate file because the brief allows only this report. The JSON block in section 8 holds the same data.

---

## 1. SERP overlap matrix (US WebSearch, 24 Nov 2026; Hypothesis-grade for India)

Thresholds from the skill: 7 to 10 shared = same page; 4 to 6 = same cluster; 2 to 3 = interlink; 0 to 1 = separate.

| # | Keyword A | Keyword B | Shared URLs | Relationship | What it means for us |
|---|---|---|---|---|---|
| 1 | whatsapp app for shopify | best whatsapp app for shopify | **6** (growave, meetanshi, magecomp, zoko top-10, aisensy, logbase) | Same cluster, near-same post | Google treats our **product** keyword as **listicle** intent. /whatsapp-app-for-shopify (landing) and /blog/best-whatsapp-apps-for-shopify compete. See cannibalisation C-1 |
| 2 | shopify whatsapp integration | shopify whatsapp automation | 3 (Meta dev blog, Zapier whatsapp-business, Zapier whatsapp-notifications) | Interlink | Keep separate owners (/shopify-whatsapp-integration and the pillar). Link both ways |
| 3 | shopify whatsapp integration | whatsapp app for shopify | 1 (apps.shopify.com/whatsapp) | Separate | The integration SERP is how-to guides (Trengo, SleekFlow, WATI guide, Meta dev blog), not app lists. Our integration landing must keep its setup-guide depth |
| 4 | whatsapp marketing for shopify | shopify whatsapp automation | **0** | Separate | Supports a **new** page for "whatsapp marketing for shopify". Today the pillar takes it at position 30.8 (GSC, PLAN Day 5) |
| 5 | whatsapp marketing for shopify | best whatsapp app for shopify | 0 | Separate | Same as above |
| 6 | whatsapp abandoned cart recovery shopify | "shopify messaging whatsapp abandoned cart" | **9** | Same page | One page. Shopify Messaging does not yet rank for its own feature query |
| 7 | abandoned cart recovery shopify (50) | whatsapp abandoned cart recovery shopify | **0** | Separate | The generic term is Shopify Help Center plus email apps. It is **not** a WhatsApp query |
| 8 | shopify abandoned cart app india | abandoned cart recovery shopify | **4** (4 App Store category pages) | Same cluster | Both belong with the "best app" shortlist, not the WhatsApp product landing page. See C-5 |
| 9 | abandoned cart whatsapp message template | whatsapp abandoned cart recovery shopify | 0 | Separate | Supports a template page separate from the recovery guide |
| 10 | shopify cod app (India, confirm on WhatsApp) | best cod confirmation app shopify india | 2 (DelightChat COD list, HillTeck listing) | Interlink, same intent family | The product page and a listicle can co-exist if one owns "app", the other "best apps" |
| 11 | how to stop fake cod orders shopify india | how to reduce rto in shopify | 3 (TrueCOD, RTO Shield, Shopify Community thread 580137) | Interlink | Separate page for fake COD, linked to the RTO pages |
| 12 | how to stop fake cod orders | best cod confirmation app | 1 (COD Guard) | Separate | |
| 13 | cod to prepaid conversion shopify | best cod confirmation app / shopify cod app | 1 each | Separate | Confirms the existing split (/blog/cod-to-prepaid-whatsapp-shopify-india stays its own page) |
| 14 | rto reduction ecommerce india | how to reduce rto in shopify | **0** | Separate | The head term is logistics blogs (Amazon Shipping, Shiprocket, Razorpay, ClickPost, Eshopbox, Base). The Shopify form is App Store listings. See C-6 |
| 15 | shopify whatsapp order notifications | shopify order confirmation whatsapp | **4** (WhatsSync, Order Notifier Plus, Order Notifier Pro, Watix) | Same cluster, same page | One page: the planned /shopify-whatsapp-order-notifications |
| 16 | shopify order confirmation whatsapp | whatsapp order confirmation message template | 2 (Zapier template, Make template 18241) | Interlink | Template page separate from the notifications landing |
| 17 | whatsapp order confirmation template | whatsapp shipping update template | 0 to 1 | Separate | One template URL per message job |
| 18 | whatsapp business api pricing india | whatsapp marketing message cost india rate card | **4** (MyOperator, Monty Mobile, QuickReply, TeleCRM) | Same cluster, same page | /blog/whatsapp-business-api-pricing-india owns both |
| 19 | whatsapp business api pricing india | whatsapp api pricing (5,400) | 2 (Meta pricing doc, SleekFlow) | Interlink | The head is global (Twilio, Vonage, Brevo, Sinch). We should rank the India form, not chase the head |
| 20 | aisensy pricing | aisensy review | 1 (Capterra) | Separate | The review SERP is G2, Trustpilot, Capterra, TrustRadius, Product Hunt. A vendor page will struggle there |
| 21 | limechat pricing | limechat alternative | 2 | Interlink | One alternative page can carry the pricing answer |
| 22 | limechat / delightchat / gallabox alternative | each other | 0 | Separate | One page per rival if built |
| 23 | whatsapp marketing for d2c brands india | how to increase repeat purchase d2c india whatsapp | **7** (Inc42 x3, Zoko, Outlook Business, NewsBytes, Entrepreneur) | Same page | One retention page serves both |
| 24 | whatsapp broadcast shopify | whatsapp marketing for shopify | 0 | Separate | |
| 25 | best shopify apps for indian stores | shopify pricing india | 0 | Separate | Two TOFU pages if built |
| 26 | shopify profit calculator india cod rto | d2c unit economics contribution margin | 0 | Separate | Tool and article are different jobs |

Skipped by rule (different intent, assumed 0 to 2): the template queries vs the app queries, and the competitor queries vs the product queries. Spot-check: pairs 9, 16 and 20 confirm the rule held.

---

## 2. (a) Cluster table

Hubs and spokes use **existing URLs first**. "PLANNED" means it is already scheduled in PLAN 3b and is not proposed again here. "NEW" items are ranked in section 3.

Intent key: I = informational, C = commercial investigation, T = transactional, N = navigational (removed from clustering). Funnel: TOFU / MOFU / BOFU.

### Cluster 1. WhatsApp for Shopify (category)

| Field | Value |
|---|---|
| Hub | **/shopify-whatsapp-integration** (existing, topic landing; Day 10 upgrade planned) |
| Spokes (existing) | /whatsapp-app-for-shopify (static landing) · /blog/best-whatsapp-apps-for-shopify · /blog/whatsapp-automation-for-shopify (automation pillar) · /blog/how-to-choose-whatsapp-app-shopify-app-store · /blog/best-whatsapp-automation-tools-shopify-india · /blog/add-whatsapp-chat-button-shopify · /tools/best-whatsapp-tool-for-shopify · /integrations · /docs/connect-shopify, /docs/connect-whatsapp |
| Spokes (NEW) | /blog/whatsapp-marketing-for-shopify (N5) · /compare/shopify-messaging (N6) |
| Primary keyword | shopify whatsapp integration: 170 (Verified, owner brief) |
| Secondary | whatsapp shopify integration 50 (Verified, owner brief); shopify whatsapp app 30 (Verified, owner brief); whatsapp app for shopify 10, whatsapp shopify app 30 (Verified, OpenSEO India 20 Nov, PLAN 3b); best whatsapp app for shopify: no data (GSC 41 impr, 7 clicks, pos 21.5, 28 d, PLAN log 24 Nov); shopify whatsapp automation: no data (GSC 19 impr @ 10.7, PLAN Day 5); whatsapp marketing for shopify: no data (GSC 12 impr @ 30.8, PLAN Day 5) |
| Intent / funnel | Integration: I/C, MOFU (the SERP is setup guides). App and best-app: C, MOFU to BOFU (listicles). Automation: I/C, MOFU |
| Who ranks now | Integration: Meta dev blog, SleekFlow, Trengo, WATI guide, Zapier, Integrately, Gupshup, Webkul (guides and connectors). App for Shopify: Meta's official app listing, App Store listings, magecomp, meetanshi, Zoko, AiSensy, growave, logbase (listicles and listings). Marketing for Shopify: Shopify Changelog (29 Jul 2026), App Store listings (WhatPro, Pushouse, Wapshark, Convobox, Wappify, Zaplet, Dondy, Zoko), Retainful, joy.so, upsell.com (Verified, WebSearch 24 Nov) |
| Difficulty | **Medium.** Every SERP is vendor-written, and most listicles are dated 2024 to 2025, so freshness and dated prices win (Estimate). The App Store listing with reviews is the ceiling we cannot match yet: TopEdge AI has 0 App Store reviews (Verified, PLAN log 24 Nov). The integration head needs links more than words |

### Cluster 2. Abandoned cart recovery

| Field | Value |
|---|---|
| Hub | **/blog/whatsapp-abandoned-cart-recovery-shopify** (existing guide) |
| Spokes (existing) | /whatsapp-abandoned-cart-recovery-app (static landing) · /blog/best-shopify-app-for-abandoned-cart-recovery-india · /blog/shopify-automation-checklist-whatsapp-cart-recovery · /tools/cart-recovery-calculator · /whatsapp-journey-examples/abandoned-cart-recovery · /features/journeys · /docs/guides/abandoned-cart-recovery |
| Spokes (NEW) | /whatsapp-templates/abandoned-cart (N8) |
| Primary keyword | whatsapp abandoned cart recovery shopify: no data for the exact form; whatsapp abandoned cart recovery 10, shopify abandoned cart whatsapp 10 (Verified, OpenSEO India 20 Nov, PLAN 3b) |
| Secondary | abandoned cart recovery shopify 50, shopify abandoned cart app 40 (Verified, owner brief); abandoned cart whatsapp message 20, abandoned cart message 30, abandoned cart whatsapp message template 10, abandoned cart message template 10 (Verified, OpenSEO India 5 Nov, repo CSV); whatsapp cart recovery 10 (Verified, OpenSEO India, 2 Nov keyword map) |
| Intent / funnel | WhatsApp form: C/T, BOFU (App Store listings). Generic "abandoned cart recovery shopify": I, MOFU (Shopify Help). Templates: I, MOFU |
| Who ranks now | WhatsApp form: App Store listings (Coco, Wava, CK, Botsonic, Getgabs), Shopify Community thread 582453, Zapier, n8n, WATI glossary. Generic: help.shopify.com, apps.shopify.com built-in feature page, Omnisend, OptiMonk, Octane AI. Templates: Interakt (4 URLs), WATI, AiSensy, DelightChat, Klaviyo help, Braze docs, LimeChat, Kanal (Verified, WebSearch 24 Nov) |
| Difficulty | **WhatsApp form: medium** (App Store listings with hundreds of reviews hold it, and we have 0). **Generic form: hard and off-intent** (Shopify owns it). **Templates: low to medium** (vendor blog posts; Interakt's are WooCommerce-flavoured) |

### Cluster 3. COD confirmation and COD to prepaid

| Field | Value |
|---|---|
| Hub | **/features/cod-confirmation** (existing; owns "shopify cod app" since Day 6) |
| Spokes (existing) | /blog/cod-to-prepaid-whatsapp-shopify-india · /whatsapp-journey-examples/cod-confirmation · /whatsapp-journey-examples/cod-to-prepaid · /docs/guides/cod-confirmation |
| Spokes (NEW) | /blog/best-cod-confirmation-apps-shopify-india (N1) · /blog/fake-cod-orders-shopify-india (N2) · /whatsapp-templates/cod-confirmation (N3) · /blog/how-to-enable-cod-shopify-india (N4) |
| Primary keyword | cod app shopify 40, shopify cod app 20 (Verified, owner brief and PLAN 3b) |
| Secondary | cod shopify 260 KD 25; how to enable cod in shopify 50; how to add cod charges in shopify 30; how to add cod option in shopify 20; cod verification shopify 10; cod order confirmation shopify 10; shopify cod setup 10; how to setup cod on shopify 10; how to remove cod from shopify 10 (all Verified, OpenSEO India 5 Nov, repo CSV); cod to prepaid: no data (GSC 36 impr @ 11.1, PLAN Day 10); fake cod orders: no data |
| Intent / funnel | App: T, BOFU. Best apps: C, BOFU. Fake COD: I/C, MOFU. Enable COD: I, TOFU to MOFU (only Shopify owners type it). COD to prepaid: C, MOFU |
| Who ranks now | App queries: App Store listings almost entirely (Confirmify, OrderPing, HillTeck, COD Confirm, CODFIRM by Cashfree, COD Guard, Softpulse, Verify COD), plus thin listicles (DelightChat /best-shopify-apps, AiTrillion, Zoko). Fake COD: App Store (COD Guard, TrueCOD, RTO Shield, OrderGuard, Risksumo), HillTeck blog (2 posts), Releasit, EasySell, echai.ventures, shipprime, Hashnode posts. COD to prepaid: App Store (CashFlip, CODFlip, CODFIRM), DelightChat help, Shopflo help, MSG91, bot.space, AiSensy blog, Spur help (Verified, WebSearch 24 Nov) |
| Difficulty | **App head: hard** (listings with reviews). **Best COD apps listicle: low to medium** (the listicles that rank are thin vendor pages). **Fake COD: medium** (5 to 6 real articles, all selling one tool). **Enable COD: low** (no slug targets it among mapped peers, per the 5 Nov analysis; Hypothesis until the India SERP is read) |

### Cluster 4. RTO reduction

| Field | Value |
|---|---|
| Hub | **/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation** (existing) |
| Spokes (existing) | /blog/rto-meaning-ecommerce · /blog/cod-rto-benchmark-india-2026 · /tools/rto-cost-calculator · /blog/best-shipping-aggregators-logistics-tools-india · /rto-reduction-shopify (PLANNED, Day 9) |
| Spokes (NEW) | /blog/ndr-meaning-ecommerce (N19, capability check first) |
| Primary keyword | how to reduce rto in ecommerce 90 KD 42 (Verified, OpenSEO India 5 Nov, repo CSV); how to reduce rto: no data (GSC 16 impr @ 11.3, PLAN Day 9) |
| Secondary | rto reduction 30 (Verified, owner brief); rto in ecommerce 390 KD 0, rto full form in ecommerce 210, what is rto in ecommerce 170, rto meaning ecommerce 10 (Verified, OpenSEO India 5 Nov, repo CSV; owner: /blog/rto-meaning-ecommerce); rto rate india by category: no data (GSC 178 impr in 90 d @ 5.9, PLAN Day 12) |
| Intent / funnel | Head and how-to: I, TOFU to MOFU. "reduce rto shopify": T (App Store). Meaning: I, TOFU |
| Who ranks now | Head: Amazon Shipping India, Shadowfax, Eshopbox (2), Shiprocket (several language copies), Razorpay (3 URLs), Base.com, ClickPost (2), ITLN. Shopify form: App Store (Reduce RTO, TrueCOD, RTO Shield, Reliable COD, Shiprocket Smart COD, COD Shield, OrderzUp, HillTeck), Shopify Community thread 643846, Cashfree, Shiprocket Engage blog, Shopflo help, Razorpay docs (Verified, WebSearch 24 Nov) |
| Difficulty | **Head: hard** (logistics and payments brands with high authority, and they sell the fix). **Shopify form: medium.** **Meaning and benchmark: medium**, and we already sit near page 1 for the benchmark (GSC @ 5.9) |

### Cluster 5. Order messages and WhatsApp templates

| Field | Value |
|---|---|
| Hub | **/whatsapp-templates** (existing library) |
| Spokes (existing) | /shopify-whatsapp-order-notifications (PLANNED, Day 8) · /whatsapp-festival-templates (+25 festival pages) · /whatsapp-journey-examples and /whatsapp-journey-examples/order-status-updates · /blog/meta-whatsapp-cloud-api-shopify-templates · /blog/whatsapp-template-rejected-meta-shopify-fix · /docs/platform/message-templates · /docs/guides/create-whatsapp-template · /docs/guides/order-status-updates |
| Spokes (NEW) | /whatsapp-templates/order-confirmation (N9) · /whatsapp-templates/shipping-delivery-updates (N11). Also N3 and N8 from clusters 2 and 3, which sit under this library hub as well |
| Primary keyword | shopify whatsapp order notifications (planned page); whatsapp order notification shopify 10, shopify order confirmation whatsapp 10, whatsapp order confirmation shopify 10 (Verified, OpenSEO India 20 Nov, PLAN 3b); shopify whatsapp notifications 10 (Verified, OpenSEO India 5 Nov) |
| Secondary | whatsapp order confirmation message template: no data; whatsapp shipping update template: no data; diwali whatsapp message for customers: no data (festival pages own it) |
| Intent / funnel | Notifications: T, BOFU (App Store). Templates: I, MOFU |
| Who ranks now | Notifications: App Store (WhatsNotify, H3, WhatsSync, SMSIdea, Order Notifier Plus/Pro, Whatssy, Watix, Whatomation, Kaify), Zapier (6 URLs), Meta dev blog. Order confirmation template: Spur (3 locale copies), Zoko, TimelinesAI, D7, Meta developer docs (order details and order status templates), Zapier, Make, DelightChat help. Shipping template: Zoko (2), Make, Fast2SMS (India), MyOperator, Ominiflow, ClickPost, WATI, AiSensy, whautomate, Chatfuel (Verified, WebSearch 24 Nov) |
| Difficulty | **Notifications: medium** (listings, but none Indian and COD-aware except Fast2SMS and MyOperator). **Templates: low to medium** (vendor posts; Meta's own docs rank, so cite them) |

### Cluster 6. WhatsApp cost and competitor pricing

| Field | Value |
|---|---|
| Hub | **/blog/whatsapp-business-api-pricing-india** (existing) |
| Spokes (existing) | /pricing/meta-rates · /pricing · /blog/wati-pricing-india · /blog/interakt-pricing-india · /blog/aisensy-pricing-india · /docs/platform/conversation-pricing |
| Spokes (NEW) | /blog/bitespeed-pricing-india (N10) |
| Primary keyword | whatsapp api pricing 5,400 (Verified, owner brief; the head is global intent, see pair 19). India form "whatsapp api pricing india" 320 (Verified, 15 Nov SERP teardown) |
| Secondary | wati pricing 2,400; interakt pricing 1,900; aisensy pricing 1,600 (Verified, owner brief); bitespeed pricing 90 (Verified, OpenSEO India 5 Nov, `21-keyword-clusters.csv`); limechat pricing, zoko pricing, quickreply pricing: no data |
| Intent / funnel | C, MOFU (buyer research). Rate-card queries: I |
| Who ranks now | India form: MyOperator, Monty Mobile, QuickReply, TeleCRM, AiSensy (3 URLs), SleekFlow, Meta pricing docs, DEV posts, ecorpit, lilachbullock. Head: Meta docs, Twilio, Vonage, Brevo, Sinch, Telnyx, Zoho calculator, respond.io calculator, WATI guide. Bitespeed pricing: TrustRadius, Bitespeed help centre (2), Heltar 2025 breakdown, App Store review pages (Verified, WebSearch 24 Nov) |
| Difficulty | **India API pricing: medium** (fresh vendor posts, dates decide it). **Head: hard** (global CPaaS brands). **Bitespeed pricing: low** (Bitespeed's /pricing 301s to a demo form per PLAN Day 11, so third parties answer it with 2025 data) |

### Cluster 7. Rival alternatives and comparison boards

| Field | Value |
|---|---|
| Hub | **/compare** (existing hub; /compare/alternatives is the decision board) |
| Spokes (existing) | Boards: /compare/wati, aisensy, interakt, bitespeed, zoko, getgabs, kanal, dondy, updatrr, gupshup, alternatives, topedge-vs-wati-vs-aisensy, topedge-vs-wati-vs-interakt-vs-aisensy. Posts: /blog/{wati,aisensy,interakt,bitespeed,zoko,updatrr,dondy}-alternative-shopify-india, /blog/getgabs-alternative-shopify-whatsapp, /blog/kanal-whatsapp-alternative-shopify |
| Spokes (NEW) | /blog/shiprocket-engage-alternative-shopify (N7) · /blog/limechat-alternative-shopify-india (N14) · /blog/delightchat-alternative-shopify-india (N18). N6 (/compare/shopify-messaging) also sits here as a board |
| Primary keyword | interakt alternative 90; aisensy alternative 170; wati alternative india 40; zoko alternative 20 (Verified, OpenSEO India 5 Nov, `21-keyword-clusters.csv`); bitespeed alternative: no data (GSC 58 impr @ 17.6, PLAN Day 11) |
| Secondary | aisensy review 480; interakt review 170 (Verified, owner brief). Board FAQs answer these (PLAN 3c), no new page. limechat, delightchat, gallabox, quickreply, shiprocket engage, gokwik alternative: no data |
| Intent / funnel | C, BOFU |
| Who ranks now | Rival vendors' own roundups (Bitespeed, Spur, Zoko, QuickReply, WATI, AiSensy, DelightChat), directories (G2, Capterra, TrustRadius, CB Insights), and listicle blogs (Ringly, Robylon, TimelinesAI, Zixflow, ChatMaxima). "shiprocket engage alternative": **no direct alternatives page in the results**; Shiprocket courier alternatives fill it (Verified, WebSearch 24 Nov) |
| Difficulty | **Low to medium** for India-modified forms. Our posts already rank 8 to 25 (GSC). **Review queries: hard** (G2 and Trustpilot) |

### Cluster 8. Shopify in India (pre-ICP, top of funnel)

| Field | Value |
|---|---|
| Hub | **NEW /blog/best-shopify-apps-india** (N16) |
| Spokes (existing) | /blog/best-shopify-development-companies-india · /blog/best-shipping-aggregators-logistics-tools-india · /blog/profitable-ecommerce-business-india · /blog/how-to-automate-ecommerce-store-india · /blog/trending-products-to-sell-online-india-2026 · /integrations |
| Spokes (NEW) | /blog/shopify-pricing-india (N12) |
| Primary keyword | shopify apps 5,400 KD 22 (Verified, owner brief; the head is mostly navigational to the App Store, so the page targets "best shopify apps india": no data) |
| Secondary | shopify pricing india 720 KD 8; shopify plans india 590 KD 8 (Verified, OpenSEO, 2 Nov keyword map); shopify pricing plans 880 KD 13; shopify plans 4,400 KD 22 (Verified, OpenSEO India 5 Nov, repo CSV); shopify development company india 480 (Verified, owner brief; owned by the dev-companies post) |
| Intent / funnel | C, TOFU. Pricing is C, pre-purchase of Shopify itself |
| Who ranks now | Best apps India: shopify.in blog (2), Razorpay, Shiprocket Checkout, App Store "Useful apps for India" collection, letsmetrix, StoreCensus, Raftlabs (2024), Socio Labs. Pricing: ecommerce-platforms.com (many language copies), Zoko (2 posts), echai.ventures, PayGlocal, Shopify Community threads (Verified, WebSearch 24 Nov) |
| Difficulty | **Pricing: low** (KD 8; we already hold Shopify India prices read on both views on 22 Nov in the dev-companies post). **Best apps India: medium** (Shopify's own India blog ranks) |

### Cluster 9. Profit and retention (product differentiators)

| Field | Value |
|---|---|
| Hub | **/features/profit-loss** (profit) and **/features/campaigns** (retention). The feature pages are frozen except for factual fixes (PLAN 1), so the new spokes carry the ranking work |
| Spokes (existing) | /blog/profitable-ecommerce-business-india · /tools/rto-cost-calculator · /features/opt-in-tools · /blog/whatsapp-opt-in-shopify-india · /features/warranty · /docs/guides/warranty-registration · /docs/guides/whatsapp-broadcast · /docs/guides/segment-your-customers · /blog/ecommerce-automation-whatsapp-vs-email-india |
| Spokes (NEW) | /tools/cod-profit-calculator (N13, **owner decision**) · /blog/true-profit-per-cod-order-india (N17) · /blog/whatsapp-broadcast-shopify (N15) · /blog/d2c-repeat-purchase-whatsapp-india (N20) |
| Primary keyword | no data for any profit or retention term in India |
| Secondary | shopify profit calculator, cod profit calculator, d2c unit economics, contribution margin d2c, whatsapp broadcast shopify, repeat purchase rate d2c india, shopify warranty registration app: all no data |
| Intent / funnel | Profit tool: T/C, MOFU. Unit economics: I, TOFU. Broadcast: I/C, MOFU. Retention: I, TOFU. Warranty: T (App Store only) |
| Who ranks now | Profit: App Store (UpProfio, Munafa, Kaarobar and True COD Profit, both Pakistan-built), Commmerce calculator, EasySell (several locale copies), Edesy. Unit economics: Base.com (5+ URLs), echai.ventures (5 URLs), Treelife, Entrepreneur. Broadcast: Zoko (5 URLs), HillTeck, WATI support, Go4WhatsUp, Kanal, Shopify India blog. Retention: Inc42 (4), Zoko, HillTeck, Razorpay Learn, echai benchmark, DEV posts. Warranty: App Store listings only (Dyrect, ProfitFire, WarrantyKit, Warranty Pilot, Propel, Varify, Samy, Warrantix, Tasdeek) (Verified, WebSearch 24 Nov) |
| Difficulty | **Profit: low to medium.** No WhatsApp peer has a profit page (Verified, 5 Nov analysis), but UpProfio and Munafa are India-built apps. **Retention: medium to hard** (Inc42 and Base hold it). **Warranty: do not build a blog page**: the SERP is 100% App Store listings, so only a listing ranks there (Estimate) |

Navigational queries removed from clustering: "gokwik", "shiprocket", "bitespeed logo", "shopify app store" 14,800, "shopify india login" and similar (owner rules plus the 5 Nov "what not to target" table).

Owner-rule exclusions applied: no chatbot terms ("whatsapp chatbot" 4,400), no bulk-sender terms ("whatsapp bulk message sender" 12,100), no BSP-shopping terms ("best whatsapp api provider india"), no Meta Flows ("whatsapp flows shopify"), no salon or spa queries, no rival-vs-rival pairs ("wati vs aisensy", "aisensy vs gallabox"), no partial COD (we do not ship it, PLAN 3b).

---

## 3. (b) Cannibalisation risks between existing pages

Severity: High = two of our URLs demonstrably split one query, or the SERP says they are one intent. Medium = a likely split, not yet shown in GSC. Low = watch.

| ID | Pages | Query | Evidence | Severity | Fix |
|---|---|---|---|---|---|
| C-1 | /whatsapp-app-for-shopify (landing) · /blog/best-whatsapp-apps-for-shopify · home page (title leads "WhatsApp app for Shopify India") | whatsapp app for shopify, shopify whatsapp app, best whatsapp app for shopify | US SERP overlap 6/10 between the product and "best" forms (Hypothesis for India). The landing is not in the India top 11 (PLAN log 24 Nov). The blog post holds the clicks (7 at 21.5) | **High** | Keep the owners as set in PLAN 3b, but give the landing a different proof job: the product, setup in 3 steps, the rupee bill. Never a ranked list of rivals. Anchor every "best WhatsApp app" link to the blog. Re-check India overlap on Day 11 (landing review). The home title decision stays with the owner |
| C-2 | /blog/best-whatsapp-apps-for-shopify · /blog/best-whatsapp-automation-tools-shopify-india · /blog/how-to-choose-whatsapp-app-shopify-app-store · /tools/best-whatsapp-tool-for-shopify | best whatsapp app/tool for shopify (india) | Two ranked listicles plus a chooser plus a quiz-style tool on one intent (Hypothesis; pull GSC query+page for "best whatsapp") | **High** | Make /blog/best-whatsapp-automation-tools-shopify-india a by-job companion that links up (or 301 it into the best-apps post if GSC shows a split). Make the "how to choose" post criteria-only, with no ranked list |
| C-3 | /blog/whatsapp-automation-for-shopify · /blog/shopify-whatsapp-automation-what-to-automate-first · /blog/what-is-ecommerce-automation-shopify-whatsapp · /blog/shopify-automation-checklist-whatsapp-cart-recovery · /blog/how-to-automate-ecommerce-store-india | shopify whatsapp automation, ecommerce whatsapp automation | Verified GSC: "shopify whatsapp automation" 10 @ 39.2 on the wrong page (PLAN Day 16); 3 ecommerce-automation queries split (5 Nov section 4) | **High** | Already scheduled for Day 16. Add /blog/how-to-automate-ecommerce-store-india to that check |
| C-4 | /blog/whatsapp-automation-for-shopify (pillar) · NEW /blog/whatsapp-marketing-for-shopify | whatsapp marketing for shopify / shopify | Pillar ranks @ 30.8 on 12 impressions (GSC). US overlap automation vs marketing = 0 | Medium (created by N5) | When N5 ships, remove "marketing" from the pillar's title and H2s, and link the pillar to N5 with that anchor |
| C-5 | /whatsapp-abandoned-cart-recovery-app (landing) · /blog/best-shopify-app-for-abandoned-cart-recovery-india · /blog/whatsapp-abandoned-cart-recovery-shopify | abandoned cart recovery shopify 50, shopify abandoned cart app 40 | PLAN 3b assigns both to the landing. US overlap: generic vs WhatsApp form = 0; generic vs "app india" = 4 (App Store category pages and listicles) | **Medium** | Move "abandoned cart recovery shopify" and "shopify abandoned cart app (india)" to the best-app shortlist post as secondary keywords. The landing keeps "whatsapp abandoned cart recovery app" plus the WhatsApp forms. The guide keeps "how to" and template questions |
| C-6 | PLANNED /rto-reduction-shopify · /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation · /features/cod-confirmation | rto reduction 30, how to reduce rto, reduce rto shopify | US overlap: "rto reduction ecommerce india" vs "how to reduce rto in shopify" = 0. The head is logistics how-to (I); the Shopify form is App Store (T) | **Medium** (before build) | Keep the URL, but make the planned landing's primary "reduce RTO on Shopify" (app intent), with "rto reduction" in the H1 only if the India SERP on Day 9 shows apps. The blog keeps "how to reduce rto (in ecommerce)" 90. Read the India SERP on Day 9 before the H1 is fixed |
| C-7 | /features/cod-confirmation · /whatsapp-journey-examples/cod-confirmation · /docs/guides/cod-confirmation · /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation | cod confirmation shopify / whatsapp cod confirmation | Four URLs carry "COD confirmation" in the title (Hypothesis; verify in GSC) | Medium | Journey example = "worked example" wording; docs = "set up" wording; blog = RTO outcome. Only the feature page says "app" |
| C-8 | /blog/cod-to-prepaid-whatsapp-shopify-india · /whatsapp-journey-examples/cod-to-prepaid | cod to prepaid | Existing decision: linked, not merged (5 Nov P17). GSC 36 @ 11.1 | Low | Keep; check GSC that the journey page does not take the query |
| C-9 | /pricing · /pricing/meta-rates · /blog/whatsapp-business-api-pricing-india | whatsapp api pricing 5,400, whatsapp business api pricing india | Known conflict (5 Nov section 4); blog @ 36.5 and @ 52 (PLAN Day 13) | Medium | The blog owns "whatsapp (business) api pricing (india)". /pricing/meta-rates owns "whatsapp rate card india" and per-message rates. /pricing drops the phrase from title and H1 |
| C-10 | /compare/X · /blog/X-alternative-shopify-india · /blog/X-pricing-india (WATI, AiSensy, Interakt) | X alternative, X pricing, X review | Rules in PLAN 3c already split them (boards never use "alternative" or "pricing" in title or H1) | Low | Keep. Apply the same rule to the Bitespeed trio when N10 ships |
| C-11 | /compare/alternatives · /compare · /blog/best-whatsapp-apps-for-shopify | whatsapp app alternative, best alternatives | GSC "whatsapp app alternative" lands on the Getgabs post (5 Nov CSV) | Low | /compare/alternatives = "alternatives to X" board; the blog = "best apps". No change beyond anchors |
| C-12 | /compare/topedge-vs-wati-vs-aisensy · /compare/topedge-vs-wati-vs-interakt-vs-aisensy · two-way boards | wati vs aisensy (48 impr @ 33.7) | Rival-vs-rival, owner says accuracy only | Low | No keyword work (owner rule) |
| C-13 | /whatsapp-templates · /blog/meta-whatsapp-cloud-api-shopify-templates · /docs/platform/message-templates · /docs/guides/create-whatsapp-template · /blog/whatsapp-template-rejected-meta-shopify-fix | whatsapp templates shopify, create whatsapp template | Five template URLs (Hypothesis; check GSC) | Medium | Library = copyable messages; blog = Cloud API setup; docs = in-app steps; rejected = troubleshooting. New template children (N3, N8, N9, N11) must each go deeper than the hub section they replace, and the hub keeps a 2-line teaser plus a link |
| C-14 | PLANNED /shopify-whatsapp-order-notifications · /whatsapp-journey-examples/order-status-updates · /docs/guides/order-status-updates | order notification / order status whatsapp shopify | Hypothesis | Low (before build) | The landing owns the product query; the journey page is the worked example; docs is setup |
| C-15 | /blog/rto-meaning-ecommerce · /blog/cod-rto-benchmark-india-2026 | rto rate india, rto meaning | Benchmark at 5.9 (GSC). The meaning post went live 15 Nov | Low | Meaning owns definitions (390 / 210 / 170 terms); benchmark owns rates by category. Cross-link only |
| C-16 | /blog/whatsapp-opt-in-shopify-india · /features/opt-in-tools · /docs/guides/website-opt-in | whatsapp opt in shopify | Hypothesis | Low | Blog = why and the rules; feature = product; docs = steps |
| C-17 | /blog/ai-whatsapp-chatbot-for-shopify-india | whatsapp chatbot shopify | Owner rule: no chatbot keywords | Low | Do not expand it. Leave it as is; point its CTAs at /features/ai-brain |

---

## 4. (c) The 20 best NEW page opportunities

Ranked by ICP value (how close the searcher is to a 100 to 1,500-order COD Shopify store choosing a tool) times winnability (who ranks now). None of these URLs exists in `marketing-urls.mjs` today. Planned pages (/shopify-whatsapp-order-notifications, /rto-reduction-shopify) and the QR-generator work (Day 15, on the existing tool) are excluded on purpose.

Build order: never more than one or two of these a day. Six templated pages in one day is the doorway pattern PLAN 5b warns about. Each page must pass the people-first gate.

| Rank | URL (NEW) | Working title (2027) | Target keyword (volume, label) | Page type | ICP / Win (1 to 5, Estimate) |
|---|---|---|---|---|---|
| 1 | /blog/best-cod-confirmation-apps-shopify-india | Best COD Confirmation Apps for Shopify India (2027) | best cod confirmation app shopify india (no data); cod verification shopify 10 (Verified, OpenSEO India 5 Nov) | Blog listicle (dated table) | 5 / 4 |
| 2 | /blog/fake-cod-orders-shopify-india | How to Stop Fake COD Orders on Shopify in India (2027) | how to stop fake cod orders shopify (no data) | Blog guide | 5 / 3 |
| 3 | /whatsapp-templates/cod-confirmation | COD Confirmation WhatsApp Templates for Shopify (2027) | cod confirmation whatsapp message template (no data) | Template library page | 5 / 4 |
| 4 | /blog/how-to-enable-cod-shopify-india | How to Enable COD on Shopify in India (2027 Guide) | how to enable cod in shopify 50; how to add cod charges in shopify 30; how to add cod option in shopify 20 (Verified, OpenSEO India 5 Nov) | Blog how-to | 4 / 4 |
| 5 | /blog/whatsapp-marketing-for-shopify | WhatsApp Marketing for Shopify: India Playbook (2027) | whatsapp marketing for shopify (no data; GSC 12 impr @ 30.8 on the pillar) | Blog guide | 4 / 3 |
| 6 | /compare/shopify-messaging | TopEdge AI vs Shopify Messaging (2027): WhatsApp, COD, Cost | shopify messaging whatsapp (no data) | Compare board | 5 / 3 |
| 7 | /blog/shiprocket-engage-alternative-shopify | Shiprocket Engage Alternative for Shopify COD Brands (2027) | shiprocket engage alternative (no data); kwikengage alternative (no data) | Blog alternative | 5 / 4 |
| 8 | /whatsapp-templates/abandoned-cart | Abandoned Cart WhatsApp Message Templates (2027) | abandoned cart message 30; abandoned cart whatsapp message 20; abandoned cart whatsapp message template 10 (Verified, OpenSEO India 5 Nov) | Template library page | 4 / 4 |
| 9 | /whatsapp-templates/order-confirmation | WhatsApp Order Confirmation Message Templates (2027) | whatsapp order confirmation message template (no data) | Template library page | 4 / 3 |
| 10 | /blog/bitespeed-pricing-india | Bitespeed Pricing in India (2027): Plans, Fees, Real Bill | bitespeed pricing 90 (Verified, OpenSEO India 5 Nov) | Blog pricing | 4 / 4 |
| 11 | /whatsapp-templates/shipping-delivery-updates | WhatsApp Shipping and Delivery Update Templates (2027) | whatsapp shipping update template (no data) | Template library page | 4 / 3 |
| 12 | /blog/shopify-pricing-india | Shopify Pricing in India (2027): Plans in ₹, GST, Real Cost | shopify pricing india 720 KD 8; shopify plans india 590 KD 8 (Verified, OpenSEO, 2 Nov keyword map) | Blog guide | 2 / 5 |
| 13 | /tools/cod-profit-calculator | COD Profit Calculator for Shopify India (2027) | cod profit calculator (no data) | Tool. **Owner decision required** (5 Nov section 7, decision 3: a "never build a calculator" directive exists from the Ads work, yet /tools/rto-cost-calculator is live) | 5 / 3 |
| 14 | /blog/limechat-alternative-shopify-india | LimeChat Alternative for Shopify India (2027) | limechat alternative (no data) | Blog alternative | 4 / 3 |
| 15 | /blog/whatsapp-broadcast-shopify | WhatsApp Broadcasts for Shopify: Opt-in Campaigns (2027) | whatsapp broadcast shopify (no data) | Blog guide | 4 / 3 |
| 16 | /blog/best-shopify-apps-india | Best Shopify Apps for Indian Stores (2027) | best shopify apps india (no data); shopify apps 5,400 head (Verified, owner brief; mostly navigational) | Blog listicle | 3 / 3 |
| 17 | /blog/true-profit-per-cod-order-india | True Profit per COD Order: D2C Unit Economics India (2027) | d2c unit economics, contribution margin d2c india (no data) | Blog guide | 4 / 2 |
| 18 | /blog/delightchat-alternative-shopify-india | DelightChat Alternative for Shopify India (2027) | delightchat alternative (no data) | Blog alternative | 4 / 3 |
| 19 | /blog/ndr-meaning-ecommerce | NDR Meaning in Ecommerce: What to Do in 36 Hours (2027) | ndr meaning, ndr full form in courier (no data in repo volumes) | Blog definition. **Capability check first** (5 Nov P12: repo copy describes an NDR webhook, not a native feature) | 4 / 4 |
| 20 | /blog/d2c-repeat-purchase-whatsapp-india | How Indian D2C Brands Win Repeat Orders on WhatsApp (2027) | repeat purchase d2c india, whatsapp marketing for d2c brands (no data); pair overlap 7 = one page | Blog guide | 4 / 2 |

Considered and rejected: "aisensy review" 480 and "interakt review" 170 (Verified, owner brief). The SERP is G2, Trustpilot, Capterra and TrustRadius, so the board FAQs answer these instead (PLAN 3c). "shopify warranty registration app" is App Store listings only, so a blog page cannot rank; improve the App Store listing copy instead. "gallabox alternative" is already answered inside /blog/aisensy-alternative-shopify-india ("AiSensy vs Gallabox"), and Gallabox is not Shopify-first. "gokwik alternative" is a checkout SERP (Shopflo, Razorpay Magic, Simpl), and we do not sell checkout; Kwik Engage goes inside N7. "partial cod shopify" 50: we do not ship it. QR generator: Day 15 handles it on the existing tool.

### The 5 questions each new page must answer

**N1 Best COD confirmation apps (Shopify India)**
1. Which Shopify apps confirm COD orders on WhatsApp, and what does each cost per order in ₹ (read on a stated date)?
2. WhatsApp button confirmation vs OTP vs IVR call: which catches which kind of bad COD order?
3. Which apps also convert COD to prepaid, and on which plan?
4. Do I need my own WhatsApp Business API number, and who pays Meta's ₹0.1150 utility fee (or the current rate on the day you publish)?
5. Where is a single-purpose COD app (CODFIRM, COD Guard, HillTeck) the better pick than an all-in-one suite?

**N2 Fake COD orders**
1. What counts as a fake COD order, and how is it different from an honest RTO?
2. Which layers stop it: WhatsApp confirmation, OTP, pincode rules, risk scoring, partial prepay? What does each miss?
3. What does one fake order cost a ₹799 order in shipping both ways (use the sourced ₹180 to ₹240 RTO line)?
4. What should happen to an order that never replies to the confirmation (hold, call, cancel), and after how long?
5. Since Shopify retired its Advanced COD app (search claim, verify before stating), what are the options on Basic and Grow plans?

**N3 COD confirmation templates**
1. What is a COD confirmation message that Meta approves as Utility, not Marketing?
2. What are 6 to 8 copyable templates (confirm/cancel buttons, address check, Hindi/Hinglish version, a reminder after X hours)?
3. What does each message cost under India's current per-message rates?
4. What should the store do with each reply (tag, hold, cancel, call)?
5. When does adding an offer (prepaid discount) turn the template into Marketing, and what does that do to cost?

**N4 How to enable COD on Shopify (India)**
1. How do I turn on Cash on Delivery in Shopify settings today (tested steps, dated screenshots)?
2. How do I add a COD fee or charge, and what are the workarounds Shopify allows?
3. How do I limit COD by pincode, order value or customer?
4. Why is COD not showing at checkout (the common causes)?
5. What should I set up right after COD goes live (confirmation, RTO tracking)? Link to N1 and /features/cod-confirmation.

**N5 WhatsApp marketing for Shopify**
1. What can Shopify Messaging send on WhatsApp now? Campaigns since its 29 Jul 2026 changelog (Verified today); automations per the repo's 28 Oct reading (re-check). What can it not send (utility, COD)?
2. Which campaigns earn their cost for a 100 to 1,500-order store (back in stock, festival, winback, COD-to-prepaid nudges)?
3. What does a campaign to 1,000 opted-in customers cost at ₹0.8631 a marketing message plus GST (verify the rate on the day)?
4. How do I collect opt-in on Shopify without breaking Meta's rules?
5. Where is email or Shopify's own tool the better choice?

**N6 TopEdge AI vs Shopify Messaging (board)**
1. What does Shopify Messaging do on WhatsApp, and what does it cost per message in India (re-read)?
2. Which jobs need an app: COD confirmation, order updates (utility), flows, shared inbox, AI replies?
3. What is the monthly bill at 100, 500 and 1,500 orders on each?
4. Where is Shopify Messaging the better pick (honest lines)?
5. Can I run both, and how do I avoid double-messaging a customer?

**N7 Shiprocket Engage alternative**
1. What does Shiprocket Engage (and GoKwik's Kwik Engage) do on WhatsApp for COD orders, and how is it billed (re-read)?
2. Do I have to ship with Shiprocket, or buy GoKwik checkout, to use them?
3. Which alternatives confirm COD and convert to prepaid without changing courier or checkout?
4. What carries over when you switch (templates, number, opt-ins)?
5. Where is staying on Engage the better choice?

**N8 Abandoned cart WhatsApp templates**
1. What should the first, second and third cart reminder say, and when (timings from our docs)?
2. What are 8 to 10 copyable templates (with an image, with a discount, for COD-heavy stores, in Hinglish)?
3. Why is a cart reminder Marketing category, and what does each send cost?
4. Which templates get rejected by Meta, and why (link to the rejected-template post)?
5. How do I stop the reminder once the shopper buys?

**N9 Order confirmation templates**
1. What goes in a WhatsApp order confirmation (fields, buttons), and why is it Utility?
2. What are copyable versions for prepaid, COD and partial-stock orders?
3. Meta's "order details" and "order status" template types: do Shopify stores need them?
4. What does each confirmation cost in India?
5. How do I trigger it from Shopify automatically (link to the planned notifications landing)?

**N10 Bitespeed pricing India**
1. What does Bitespeed cost today, given that /pricing redirects to a demo form (re-read; record the date)?
2. What is included per plan, and what are the AI add-ons and Meta fees on top?
3. What is the real monthly bill at 100, 500 and 1,500 orders?
4. Is there a free plan or a trial, and how does Shopify App Store billing differ?
5. Which cheaper options cover cart recovery and COD for small Indian stores?

**N11 Shipping and delivery update templates**
1. Which shipping stages need their own template (shipped, out for delivery, delivered, delivery failed or NDR)?
2. What are copyable templates for each, with tracking-link placement?
3. Why are they Utility, and what do they cost?
4. How does a delivery-failed message cut RTO on COD orders?
5. How do they connect to Shopify fulfilment and courier status?

**N12 Shopify pricing India**
1. What are Shopify's plans in ₹, monthly vs yearly (read on both views, dated)?
2. How much GST is added, and why do some cards get charged in USD?
3. What transaction fees apply without Shopify Payments in India?
4. What are the real first-year costs (theme, apps, gateway, COD, RTO)?
5. Which plan suits a store doing 100, 500 or 1,500 orders a month?

**N13 COD profit calculator (tool, owner decision)**
1. What is my profit per delivered COD order after RTO, COD fee, shipping both ways and ads?
2. What RTO rate makes COD lose money for my AOV?
3. How much does COD confirmation have to cut RTO to pay for itself?
4. Prepaid vs COD margin, side by side?
5. Which inputs are estimates (labelled as a model, like the RTO calculator)?

**N14 LimeChat alternative**
1. What does LimeChat cost (quote-based site vs App Store tiers; re-read)?
2. Which alternatives suit a store under 1,500 orders a month?
3. Which alternatives cover COD confirmation and COD to prepaid?
4. What carries over when you switch?
5. Where is LimeChat the better pick (AI support at scale)?

**N15 WhatsApp broadcast for Shopify**
1. How do I send a WhatsApp broadcast to a Shopify customer segment (tag, repeat buyers, COD buyers)?
2. Business app 256-contact lists vs API broadcasts: which applies to a store?
3. What does a broadcast to 1,000 contacts cost, and what are the messaging limits?
4. How do I get opt-in, and how do I avoid quality-rating drops and blocks?
5. Which 10 campaigns work for Indian D2C stores (festival calendar link)?

**N16 Best Shopify apps India**
1. Which apps does an Indian store need by job (payments, COD, shipping, GST invoices, reviews, WhatsApp)?
2. Which are India-built or India-priced (₹ billing)?
3. What does the starter stack cost per month?
4. Which apps overlap, and which can you skip under 500 orders?
5. Which apps help with COD and RTO specifically?

**N17 True profit per COD order**
1. What are CM1, CM2 and CM3 for an Indian D2C order?
2. How do RTO, COD fees, return shipping and gateway fees change the margin (worked ₹799 example)?
3. What is break-even ROAS with and without RTO?
4. Category benchmarks: which are sourced and which are vendor claims?
5. Which levers move CM2 fastest (prepaid share, confirmation, pincode rules)?

**N18 DelightChat alternative**
1. What does DelightChat cost and bill (tickets only when a human replies; re-read)?
2. Which alternatives are WhatsApp-first for Shopify, not generic helpdesks?
3. Which cover cart recovery and COD flows on every plan?
4. What carries over when you switch?
5. Where is DelightChat the better pick?

**N19 NDR meaning**
1. What does NDR mean in courier and ecommerce?
2. What are the NDR reason codes, and which are really the customer's fault?
3. What is the reattempt window, and what must the seller do in it?
4. How does a WhatsApp message on NDR cut RTO (only if we support it; otherwise say what does)?
5. NDR vs RTO vs DTO: the difference?

**N20 Repeat purchase on WhatsApp**
1. What is a good repeat purchase rate for Indian D2C, and why is it lower with COD?
2. Which post-purchase messages drive the second order (timing by category)?
3. Broadcast vs triggered journeys: which works better, and what does each cost?
4. How do you measure repeat revenue from WhatsApp honestly?
5. What should a 100 to 1,500-order store set up first?

---

## 5. (d) Internal link matrix (hub ↔ spokes)

Rules applied: every spoke links to its hub with the hub's primary keyword as anchor (mandatory); every hub links to every spoke (mandatory); spokes link to 1 or 2 siblings (recommended); cross-cluster links only where the reader's next step lives there (optional). Every NEW page below has at least 3 planned inbound links.

### Cluster 1 hub: /shopify-whatsapp-integration
| From → To | Type | Anchor |
|---|---|---|
| hub ↔ /whatsapp-app-for-shopify | Mandatory | "WhatsApp app for Shopify" / "Shopify WhatsApp integration" |
| hub ↔ /blog/best-whatsapp-apps-for-shopify | Mandatory | "best WhatsApp apps for Shopify" |
| hub ↔ /blog/whatsapp-automation-for-shopify | Mandatory | "Shopify WhatsApp automation" |
| hub ↔ /blog/how-to-choose-whatsapp-app-shopify-app-store | Mandatory | "how to choose a WhatsApp app" |
| hub ↔ /blog/best-whatsapp-automation-tools-shopify-india | Mandatory | by-job wording, never "best WhatsApp app" (C-2) |
| hub ↔ /blog/add-whatsapp-chat-button-shopify | Mandatory | "add a WhatsApp chat button" |
| hub ↔ /tools/best-whatsapp-tool-for-shopify | Mandatory | "find the right WhatsApp tool" |
| hub ↔ NEW N5 /blog/whatsapp-marketing-for-shopify | Mandatory | "WhatsApp marketing for Shopify" |
| hub ↔ NEW N6 /compare/shopify-messaging | Mandatory | "TopEdge AI vs Shopify Messaging" |
| N5 → /blog/whatsapp-automation-for-shopify, N6, /blog/whatsapp-opt-in-shopify-india | Recommended | |
| /blog/whatsapp-automation-for-shopify → N5 | Recommended (fixes C-4) | "WhatsApp marketing for Shopify" |
| /blog/best-whatsapp-apps-for-shopify → N6 | Recommended | "Shopify Messaging compared" |
| N6 → /compare (hub of cluster 7) | Cross-cluster | |

### Cluster 2 hub: /blog/whatsapp-abandoned-cart-recovery-shopify
| From → To | Type | Anchor |
|---|---|---|
| hub ↔ /whatsapp-abandoned-cart-recovery-app | Mandatory | "WhatsApp abandoned cart recovery app" |
| hub ↔ /blog/best-shopify-app-for-abandoned-cart-recovery-india | Mandatory | "best Shopify abandoned cart app" (carries C-5 keywords) |
| hub ↔ /blog/shopify-automation-checklist-whatsapp-cart-recovery | Mandatory | "cart recovery checklist" |
| hub ↔ /tools/cart-recovery-calculator | Mandatory | "cart recovery calculator" |
| hub ↔ /whatsapp-journey-examples/abandoned-cart-recovery | Mandatory | "worked cart recovery journey" |
| hub ↔ NEW N8 /whatsapp-templates/abandoned-cart | Mandatory | "abandoned cart WhatsApp templates" |
| N8 ← /whatsapp-templates, /blog/whatsapp-template-rejected-meta-shopify-fix | Recommended (N8 inbound total 4) | |
| N8 → /whatsapp-abandoned-cart-recovery-app | Recommended | |

### Cluster 3 hub: /features/cod-confirmation (frozen; links in the existing FAQ and related block only, as allowed)
| From → To | Type | Anchor |
|---|---|---|
| hub ↔ /blog/cod-to-prepaid-whatsapp-shopify-india | Mandatory | "COD to prepaid on WhatsApp" |
| hub ↔ /whatsapp-journey-examples/cod-confirmation, /cod-to-prepaid | Mandatory | "worked example" |
| hub ↔ NEW N1 /blog/best-cod-confirmation-apps-shopify-india | Mandatory | "best COD confirmation apps for Shopify" |
| hub ↔ NEW N2 /blog/fake-cod-orders-shopify-india | Mandatory | "stop fake COD orders" |
| hub ↔ NEW N3 /whatsapp-templates/cod-confirmation | Mandatory | "COD confirmation templates" |
| hub ↔ NEW N4 /blog/how-to-enable-cod-shopify-india | Mandatory | "enable COD on Shopify" |
| N1 ↔ N2, N2 ↔ N4, N3 → N1 | Recommended | |
| N2 → /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation, /rto-reduction-shopify (when live) | Cross-cluster | |
| N4 → N12 /blog/shopify-pricing-india | Cross-cluster | |
| N1, N2, N3, N4 inbound: hub + 2 siblings + 1 cross-cluster each = at least 4 | Check | |

### Cluster 4 hub: /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation
| From → To | Type | Anchor |
|---|---|---|
| hub ↔ /blog/rto-meaning-ecommerce | Mandatory | "RTO meaning in ecommerce" |
| hub ↔ /blog/cod-rto-benchmark-india-2026 | Mandatory | "RTO rate by category in India" |
| hub ↔ /tools/rto-cost-calculator | Mandatory | "RTO cost calculator" |
| hub ↔ /rto-reduction-shopify (PLANNED) | Mandatory | "reduce RTO on Shopify" |
| hub ↔ /blog/best-shipping-aggregators-logistics-tools-india | Mandatory | "shipping aggregators" |
| hub ↔ NEW N19 /blog/ndr-meaning-ecommerce | Mandatory | "NDR meaning" |
| N19 ← /blog/rto-meaning-ecommerce, /blog/best-shipping-aggregators-logistics-tools-india, N11 | Recommended (N19 inbound 4) | |
| hub → /features/cod-confirmation | Cross-cluster | "Shopify COD app" |

### Cluster 5 hub: /whatsapp-templates
| From → To | Type | Anchor |
|---|---|---|
| hub ↔ /shopify-whatsapp-order-notifications (PLANNED) | Mandatory | "Shopify WhatsApp order notifications" |
| hub ↔ /whatsapp-festival-templates | Mandatory | "festival templates" |
| hub ↔ /whatsapp-journey-examples | Mandatory | |
| hub ↔ /blog/meta-whatsapp-cloud-api-shopify-templates, /blog/whatsapp-template-rejected-meta-shopify-fix | Mandatory | |
| hub ↔ NEW N3, N8, N9, N11 | Mandatory | "COD confirmation / abandoned cart / order confirmation / shipping update templates" |
| N9 ↔ N11 ↔ N3 (one row of sibling links) | Recommended | |
| N9, N11 → /shopify-whatsapp-order-notifications | Recommended | |
| /whatsapp-journey-examples/order-status-updates → N9, N11 | Recommended (N9 and N11 inbound at least 4) | |

### Cluster 6 hub: /blog/whatsapp-business-api-pricing-india
| From → To | Type | Anchor |
|---|---|---|
| hub ↔ /pricing/meta-rates | Mandatory | "WhatsApp rate card for India" |
| hub ↔ /pricing | Mandatory | "TopEdge AI pricing" (never "WhatsApp API pricing", C-9) |
| hub ↔ /blog/wati-pricing-india, /blog/interakt-pricing-india, /blog/aisensy-pricing-india | Mandatory | "WATI / Interakt / AiSensy pricing" |
| hub ↔ NEW N10 /blog/bitespeed-pricing-india | Mandatory | "Bitespeed pricing" |
| N10 ↔ /blog/bitespeed-alternative-shopify-india ↔ /compare/bitespeed | Recommended (N10 inbound 3+) | |

### Cluster 7 hub: /compare
| From → To | Type | Anchor |
|---|---|---|
| hub ↔ every /compare/* board and /compare/alternatives | Mandatory | "TopEdge AI vs X" |
| hub ↔ every alternative post | Mandatory | "X alternative" |
| hub ↔ NEW N6, N7, N14, N18 | Mandatory | |
| /compare/alternatives → N7, N14, N18 | Recommended | |
| /blog/bitespeed-alternative-shopify-india → N14 (Bitespeed's own LimeChat roundup ranks for it) | Recommended | |
| /blog/best-shipping-aggregators-logistics-tools-india → N7 | Cross-cluster (N7 inbound 3+) | |
| /blog/zoko-alternative-shopify-india → N18 | Recommended (N18 inbound 3) | |

### Cluster 8 hub: NEW N16 /blog/best-shopify-apps-india
| From → To | Type | Anchor |
|---|---|---|
| N16 ↔ N12 /blog/shopify-pricing-india | Mandatory | |
| N16 ↔ /blog/best-shopify-development-companies-india, /blog/best-shipping-aggregators-logistics-tools-india, /blog/profitable-ecommerce-business-india, /blog/how-to-automate-ecommerce-store-india, /integrations | Mandatory | |
| N16 → /blog/best-whatsapp-apps-for-shopify, N1 | Cross-cluster (the conversion path) | |
| N12 ← /blog/best-shopify-development-companies-india (already prices Shopify India), N4, N16 | Recommended (N12 inbound 3) | |

### Cluster 9 hubs: /features/profit-loss and /features/campaigns (frozen; related-links block only)
| From → To | Type | Anchor |
|---|---|---|
| /features/profit-loss ↔ N13 /tools/cod-profit-calculator (if approved), N17 | Mandatory | |
| /features/campaigns ↔ N15, N20 | Mandatory | |
| N17 ↔ N13 ↔ /tools/rto-cost-calculator | Recommended | |
| N15 ↔ /blog/whatsapp-opt-in-shopify-india, /whatsapp-festival-templates, N5 | Recommended (N15 inbound 3+) | |
| N20 ← /blog/ecommerce-automation-whatsapp-vs-email-india, N15, N5 | Recommended (N20 inbound 3) | |
| N17 ← /blog/profitable-ecommerce-business-india, /blog/cod-rto-benchmark-india-2026, N13 | Recommended (N17 inbound 3) | |

Orphan check: no NEW page has fewer than 3 planned inbound links. PLANNED pages get their 3 inbound links from the rows above, as PLAN step 6b already requires.

---

## 6. (e) Question research per cluster (verbatim; this is NOT People Also Ask)

**Read first:** the PAA boxes could not be retrieved in this run (section 0, limit 2). The questions below are verbatim, with their source. "GSC" = a real query that reached topedgeai.com (`2026-11-05/data/gsc-query-d90.json` or `gsc-india-query-d90.json`, Verified). "SERP title" = the exact question title of a page that ranked today (Verified, WebSearch 24 Nov, US index). Paste the real India PAA from OpenSEO `get_serp_results` into this section when each page is worked.

**Cluster 1, WhatsApp for Shopify**
- "what kinds of platforms let ecommerce stores automate whatsapp cart recovery, order updates, and two-way messaging?" (GSC)
- "which whatsapp business api provider works best with shopify order notifications for indian stores" (GSC)
- "which whatsapp automation platform handles high message volume for growing businesses" (GSC)
- "What is WhatsApp Marketing Automation for Shopify?" (SERP title, aitrillion, from the 15 Nov teardown)
- "What is a WhatsApp integration for Shopify" (SERP title, Chatfuel)

**Cluster 2, Abandoned cart**
- "how to automate whatsapp abandoned cart reminders on shopify without getting banned." (GSC)
- "how to recover abandoned carts on whatsapp d2c" (GSC)
- "what is the best app for abandoned cart flow marketing automation?" (GSC)
- "which checkout app can help reduce abandoned carts for indian customers?" (GSC)
- "which companies help reduce cart abandonment for shopify stores in india?" (GSC)

**Cluster 3, COD**
- "How to Stop Fake COD Orders on Shopify" (SERP title, Releasit)
- "How to Reduce Fake Orders and COD Fraud in Indian E-commerce" (SERP title, shipprime)
- "How to convert COD orders to prepaid on Shopify" (SERP title, bot.space)
- "COD Profitability Calculator: Is Your Store Making Money?" (SERP title, EasySell)
- Question-form India keywords: "how to enable cod in shopify", "how to add cod charges in shopify", "how to add cod option in shopify", "how to setup cod on shopify", "how to remove cod from shopify" (Verified, OpenSEO India 5 Nov, repo CSV)

**Cluster 4, RTO**
- "How do I reduce RTO on COD orders for my Shopify store" (SERP title, Shopify Community thread 643846, from its URL slug)
- "What Is RTO and How Can Indian SMBs Reduce Return-to-Origin Rates?" (SERP title, Amazon Shipping India)
- "How much is RTO costing you this season?" (SERP title, ClickPost)
- Question-form India keywords: "what is rto in ecommerce" 170, "how to reduce rto in ecommerce" 90 (Verified, OpenSEO India 5 Nov)

**Cluster 5, Order messages and templates**
- "How can I send automated order-lifecycle WhatsApp notifications from my Shopify store using MyOperator?" (SERP title, MyOperator KB)
- "which whatsapp business api provider works best with shopify order notifications for indian stores" (GSC)
- "how to get order updates on whatsapp for ecommerce businesses" (SERP title, ClickPost, from the URL slug)

**Cluster 6, Cost and rival pricing**
- "How Much Does India Have To Pay For WhatsApp Messages From October 1?" (SERP title, Free Press Journal)
- "How much does WhatsApp marketing cost in India?" (SERP title, Ominiflow)
- "Is LimeChat's WhatsApp API overpriced" (SERP title, Heltar, from the URL slug)
- "Bitespeed pricing explained: is it worth it" (SERP title, Heltar 2025, from the URL slug)

**Cluster 7, Alternatives**
- "AISensy Pricing Plans in 2026 | Are these plans good for you?" (SERP title, QuickReply)
- No question-form titles in the LimeChat, DelightChat, Gallabox or Shiprocket Engage results. They are list titles ("Top 10 ... Alternatives").

**Cluster 8, Shopify in India**
- "Why wont shopify let me pay for a plan in Indian rupees instead of USD? How do i make the shift" (SERP title, Shopify Community)
- "Why is my UPI showing 5000 instead of the 20 shopify plan in India" (SERP title, Shopify Community, from the URL slug)
- "is ecommerce business profitable in india", "is e commerce business profitable in india" (GSC; owned by /blog/profitable-ecommerce-business-india)

**Cluster 9, Profit and retention**
- "COD Profit Per Order: The P&L Template That Shows Your Real Margins" (SERP title, EasySell; not a question)
- "Why Many ₹50Cr D2C Brands Are Unprofitable" (SERP title, Base.com)
- "Why Most Indian D2C Brands Fail to Cross INR 100 Crore Mark" (SERP title, Entrepreneur India)
- "good repeat purchase rate benchmark india vs global" (SERP title, echai.ventures, from the URL slug)

---

## 7. Fact flags found during this run (fix before reuse)

| Flag | Evidence | Severity | Action |
|---|---|---|---|
| Shopify Messaging date | The Shopify Changelog post "Shopify Messaging now supports WhatsApp marketing" is dated **29 Jul 2026** and covers marketing campaigns (Verified, fetched 24 Nov 2026). The repo states "Shopify Messaging sends WhatsApp since 28 Oct 2026" (PLAN log Day 6, cart post) | Medium | Re-read both posts. If 28 Oct is the abandoned-cart automation post and 29 Jul is campaigns, state both dates. If not, correct the cart post and the pillar |
| "Shopify deprecated the Advanced COD app in 2025" | Claim in a search summary drawn from vendor pages (Verified as a claim only, WebSearch 24 Nov) | Low | Verify on Shopify's site before any page states it (N2, N4) |
| Meta India rates | Search results agree on ₹0.8631 marketing and about ₹0.115 utility/authentication. AiSensy reports that from 1 Oct 2026 service replies are free up to 1,000 per number a month and utility templates are charged inside the 24-hour window (vendor claim) | Medium | Re-read Meta's rate card and the 1 Oct changes before N3, N5, N8, N9, N11 or N15 quote a cost. /pricing/meta-rates should be checked against them too |
| US-index overlap | All of section 1 | n/a | Re-check pairs 1, 7, 8, 14 and 15 on the India SERP before acting on C-1, C-5 and C-6 |

---

## 8. Cluster plan (JSON, cluster-plan.json schema shape)

```json
{
  "site": "https://topedgeai.com",
  "generated": "2026-11-24",
  "serp_source": "WebSearch (US index), 24 Nov 2026 - Hypothesis-grade for India",
  "serp_pairs": [
    {"a": "whatsapp app for shopify", "b": "best whatsapp app for shopify", "shared": 6},
    {"a": "shopify whatsapp integration", "b": "shopify whatsapp automation", "shared": 3},
    {"a": "shopify whatsapp integration", "b": "whatsapp app for shopify", "shared": 1},
    {"a": "whatsapp marketing for shopify", "b": "shopify whatsapp automation", "shared": 0},
    {"a": "whatsapp abandoned cart recovery shopify", "b": "shopify messaging whatsapp abandoned cart", "shared": 9},
    {"a": "abandoned cart recovery shopify", "b": "whatsapp abandoned cart recovery shopify", "shared": 0},
    {"a": "shopify abandoned cart app india", "b": "abandoned cart recovery shopify", "shared": 4},
    {"a": "abandoned cart whatsapp message template", "b": "whatsapp abandoned cart recovery shopify", "shared": 0},
    {"a": "shopify cod app", "b": "best cod confirmation app shopify india", "shared": 2},
    {"a": "fake cod orders shopify", "b": "how to reduce rto in shopify", "shared": 3},
    {"a": "cod to prepaid shopify", "b": "best cod confirmation app shopify india", "shared": 1},
    {"a": "rto reduction ecommerce india", "b": "how to reduce rto in shopify", "shared": 0},
    {"a": "shopify whatsapp order notifications", "b": "shopify order confirmation whatsapp", "shared": 4},
    {"a": "shopify order confirmation whatsapp", "b": "whatsapp order confirmation message template", "shared": 2},
    {"a": "whatsapp business api pricing india", "b": "whatsapp marketing message cost india rate card", "shared": 4},
    {"a": "whatsapp business api pricing india", "b": "whatsapp api pricing", "shared": 2},
    {"a": "aisensy pricing", "b": "aisensy review", "shared": 1},
    {"a": "limechat pricing", "b": "limechat alternative", "shared": 2},
    {"a": "whatsapp marketing for d2c brands india", "b": "repeat purchase d2c india whatsapp", "shared": 7},
    {"a": "whatsapp broadcast shopify", "b": "whatsapp marketing for shopify", "shared": 0},
    {"a": "best shopify apps india", "b": "shopify pricing india", "shared": 0},
    {"a": "shopify profit calculator india", "b": "d2c unit economics", "shared": 0}
  ],
  "clusters": [
    {"id": 1, "name": "WhatsApp for Shopify", "hub": "/shopify-whatsapp-integration", "primary": "shopify whatsapp integration",
     "spokes_existing": ["/whatsapp-app-for-shopify", "/blog/best-whatsapp-apps-for-shopify", "/blog/whatsapp-automation-for-shopify", "/blog/how-to-choose-whatsapp-app-shopify-app-store", "/blog/best-whatsapp-automation-tools-shopify-india", "/blog/add-whatsapp-chat-button-shopify", "/tools/best-whatsapp-tool-for-shopify"],
     "spokes_new": ["/blog/whatsapp-marketing-for-shopify", "/compare/shopify-messaging"]},
    {"id": 2, "name": "Abandoned cart recovery", "hub": "/blog/whatsapp-abandoned-cart-recovery-shopify", "primary": "whatsapp abandoned cart recovery shopify",
     "spokes_existing": ["/whatsapp-abandoned-cart-recovery-app", "/blog/best-shopify-app-for-abandoned-cart-recovery-india", "/blog/shopify-automation-checklist-whatsapp-cart-recovery", "/tools/cart-recovery-calculator", "/whatsapp-journey-examples/abandoned-cart-recovery"],
     "spokes_new": ["/whatsapp-templates/abandoned-cart"]},
    {"id": 3, "name": "COD confirmation and COD to prepaid", "hub": "/features/cod-confirmation", "primary": "shopify cod app",
     "spokes_existing": ["/blog/cod-to-prepaid-whatsapp-shopify-india", "/whatsapp-journey-examples/cod-confirmation", "/whatsapp-journey-examples/cod-to-prepaid"],
     "spokes_new": ["/blog/best-cod-confirmation-apps-shopify-india", "/blog/fake-cod-orders-shopify-india", "/whatsapp-templates/cod-confirmation", "/blog/how-to-enable-cod-shopify-india"]},
    {"id": 4, "name": "RTO reduction", "hub": "/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation", "primary": "how to reduce rto in ecommerce",
     "spokes_existing": ["/blog/rto-meaning-ecommerce", "/blog/cod-rto-benchmark-india-2026", "/tools/rto-cost-calculator", "/blog/best-shipping-aggregators-logistics-tools-india"],
     "spokes_planned": ["/rto-reduction-shopify"],
     "spokes_new": ["/blog/ndr-meaning-ecommerce"]},
    {"id": 5, "name": "Order messages and templates", "hub": "/whatsapp-templates", "primary": "whatsapp templates for shopify",
     "spokes_existing": ["/whatsapp-festival-templates", "/whatsapp-journey-examples", "/blog/meta-whatsapp-cloud-api-shopify-templates", "/blog/whatsapp-template-rejected-meta-shopify-fix"],
     "spokes_planned": ["/shopify-whatsapp-order-notifications"],
     "spokes_new": ["/whatsapp-templates/order-confirmation", "/whatsapp-templates/shipping-delivery-updates"]},
    {"id": 6, "name": "WhatsApp cost and rival pricing", "hub": "/blog/whatsapp-business-api-pricing-india", "primary": "whatsapp business api pricing india",
     "spokes_existing": ["/pricing/meta-rates", "/pricing", "/blog/wati-pricing-india", "/blog/interakt-pricing-india", "/blog/aisensy-pricing-india"],
     "spokes_new": ["/blog/bitespeed-pricing-india"]},
    {"id": 7, "name": "Alternatives and boards", "hub": "/compare", "primary": "whatsapp app for shopify alternatives",
     "spokes_existing": ["/compare/alternatives", "/compare/*", "/blog/*-alternative-*"],
     "spokes_new": ["/blog/shiprocket-engage-alternative-shopify", "/blog/limechat-alternative-shopify-india", "/blog/delightchat-alternative-shopify-india"]},
    {"id": 8, "name": "Shopify in India (TOFU)", "hub": "/blog/best-shopify-apps-india (NEW)", "primary": "best shopify apps india",
     "spokes_existing": ["/blog/best-shopify-development-companies-india", "/blog/best-shipping-aggregators-logistics-tools-india", "/blog/profitable-ecommerce-business-india", "/integrations"],
     "spokes_new": ["/blog/shopify-pricing-india"]},
    {"id": 9, "name": "Profit and retention", "hub": "/features/profit-loss + /features/campaigns", "primary": "no data",
     "spokes_existing": ["/tools/rto-cost-calculator", "/blog/whatsapp-opt-in-shopify-india", "/features/opt-in-tools", "/features/warranty"],
     "spokes_new": ["/tools/cod-profit-calculator (owner decision)", "/blog/true-profit-per-cod-order-india", "/blog/whatsapp-broadcast-shopify", "/blog/d2c-repeat-purchase-whatsapp-india"]}
  ]
}
```

## 9. Pre-delivery checklist (skill)

| Check | Result |
|---|---|
| No two posts share a primary keyword | Pass for NEW pages. Existing conflicts are listed in section 3 (C-1, C-2, C-3, C-5, C-9) |
| Every spoke has at least 3 incoming links planned | Pass for all 20 NEW pages (section 5) |
| Every spoke links to its hub, and every hub links to every spoke | Planned in section 5. Frozen feature-page hubs (clusters 3 and 9) can only take links in their existing related and FAQ blocks |
| No orphan pages | Pass |
| Template matches intent | Pass. App-store-intent queries go to landing pages or listicles; how-to queries go to blog guides; template queries go to the library |
| Word counts (pillar 2,500 to 4,000; spoke 1,200 to 1,800) | Guidance only. Existing pages follow PLAN rules; the template pages should reach 1,200+ only with real, distinct templates (CONTENT_ROADMAP P2) |
| 2 to 5 clusters, 2 to 4 posts each | **Deviation, by design.** The site has 9 independent pillars, not one seed topic. The limit is applied per pillar to NEW pages: no cluster gets more than 4 new spokes |
| SERP overlap supports groupings | Partly. Groupings follow overlap scores of 4 or more where measured. Clusters 8 and 9 group by job, not overlap (pairs 25 and 26 = 0), so they are labelled Hypothesis |

# TopEdge AI: keyword demand and competitor content analysis

**Written 2026-11-05.** Companion file: `21-keyword-clusters.csv` (1,462 rows). Raw autosuggest: `data/autosuggest-india.json`.

Labels: **Verified** means read directly from a saved export, a live fetch or a repo file today. **Estimate** means my judgement scored from that evidence. **Hypothesis** means untested.

Volumes are deliberately incomplete. Only figures already saved in this repo are used, with their source and date in the CSV. Everything else reads "volume unknown, needs OpenSEO". Rows marked `needs_volume_check=yes` (71) are the batch for the main session's volume pull. **The page order below should be re-checked once those volumes are merged.**

---

## 1. The root reading

**1. Almost nothing commercial reaches us from India yet.** After removing local junk, brand, operator queries and the SEO-experts post, GSC shows 121 queries, 1,426 impressions and 10 clicks in 90 days. **Only 340 of those impressions are from India.** (Verified, GSC export.)

**2. Our largest "commercial" pools are mostly not Indian.** This corrects how the master plan reads Track B. (Verified.)

| Query | Impressions | India | Position, all countries |
|---|---|---|---|
| zoko alternative | 463 | 44 | 10.0 (28d 15.3, 7d 15.2, slipping) |
| getkanal alternatives | 260 | 2 | 2.0 (230 of these in the last 7 days) |
| whatsapp flow template | 106 | 0 | 10.9, and we do not support Meta Flows |
| best zoko alternative for shopify | 42 | 1 | 9.1 |
| best whatsapp commerce tools for shopify stores | 42 | 3 | 39.0 |

**3. The Indian commercial signal is small and sits lower.** `interakt alternative` 34 impressions all India at 25.1, `bitespeed alternative` 32 of 43 India at 16.4 in India, `best whatsapp app for shopify` 30 of 38 India at 19.1 in India with all 7 of its clicks from India. That last query is the only non-brand money query producing clicks. (Verified.)

**4. Autosuggest shows Indian operators describe logistics problems, not messaging products.** The strings that recur are `how to reduce rto in shopify`, `ndr raised meaning in delivery`, `rto charges shiprocket`, `how to enable cod in shopify`, `how to add cod charges in shopify`, `partial cod shopify india`, `fake cod orders`, `cod to prepaid conversion`. These exist; autosuggest says nothing about how many people type them. (Verified that they exist. Volume unknown.) Earlier saved readings put the exact product strings at about 10 a month (`cod order confirmation shopify`, `whatsapp cart recovery`), so this problem wording is the better test. (Hypothesis until volumes arrive.)

**5. Our P&L is the one thing peers do not write about.** Slug counts for profit content are 0 at Updatrr, GetGabs, ChatMitra and AiSensy. The real competitors there are App Store apps (Munafa, Kaarobar, UpProfio) and free calculators (Edesy, EasySell, Commmerce), seen in a US-biased search. (Verified for sitemaps. Search result is US-biased, not India.)

**6. Two pages the plan depends on are not in Google's index.** GSC URL Inspection on the 5 Nov export reports **Soft 404** for `/tools/whatsapp-link-generator` (crawled 28 Oct) and `/features/cod-confirmation` (crawled 29 Oct). The master plan calls the first "live, indexed". Both return 200 and rendered correctly in a real browser today: H1 present, 830 and 1,205 words, no "not found" text. (Verified.) The cause is unknown; a stale reading from an earlier deploy is one possibility. (Hypothesis.) Track A cannot be measured until the link tool is indexed. The live title also still says "for Shopify", so the Week 1 retitle has not shipped. (Verified.)

**Also not indexed:** `/tools/rto-cost-calculator` and `/whatsapp-journey-examples/cod-to-prepaid` (Crawled, not indexed), `/whatsapp-journey-examples` (Soft 404), `/whatsapp-journey-examples/order-status-updates` (Discovered, not indexed). (Verified.) Festival pages are excluded from this reading until 16 Nov, per plan.

### How the data was filtered (Verified)

- **Junk filter.** A query was kept only if it matched a business allowlist (whatsapp, shopify, cod, rto, ecommerce, competitor names and so on) and did not match a local blocklist (ahmedabad, chilis, nikol, spa, salon, hair, restaurant, burger, near me and so on). Rows matching both went to junk. I read the 322 rows matching neither (550 impressions) and moved 12 by hand into the CSV as Noise, Brand or pricing.
- **Result.** 3,894 rows removed (35,954 impressions, 226 clicks). 169 rows kept (1,744 impressions, 38 clicks). Of the kept rows: Brand 214 impressions and 28 clicks, Noise 82, SEO-experts post 22.
- **The junk is draining.** Using a slightly narrower pattern on the exported rows, junk is 93.8% of impressions at 90 days, 67.3% at 28 days and 17.4% at 7 days.
- **Limits.** The query export covers 37,698 impressions against 55,266 in the daily series for about the same window, so about a third is anonymised and invisible here. Positions are averages.
- **Autosuggest.** 54 seeds (34 from the brief, 20 plain-word ICP problems), bare plus a to z, 1,458 requests, 7,339 unique strings, `gl=in`. Results are visibly influenced by the requester's location (`rto ahmedabad`). A to z also generates filler such as `aisensy alternative java`, and `rto`, `cod` and `ndr` collide with vehicles, Call of Duty and other meanings. About 1,300 strings survive a rule-based filter into the CSV; some filler will remain. Use the raw file for anything not listed.

---

## 2. Clusters ranked by business value and winnability

Scores are my judgement, 1 to 5 (Estimate). GSC columns are Verified. "Not a target" clusters are in section 6.

| # | Pillar (`parent_topic`) | Value | Win | GSC impr / India / clicks | Coverage | Read |
|---|---|---|---|---|---|---|
| 1 | Competitor alternatives (India) | 5 | 4 | 923 / 134 / 2 | Exists, ranks | Highest intent. Bitespeed and Interakt are the Indian pools. Zoko and Kanal are done and mostly foreign, so hold |
| 2 | Best Shopify WhatsApp apps | 5 | 3 | 105 / 33 / 7 | Exists, ranks page 2 | Only non-brand query with clicks. Needs rank, not copy |
| 3 | COD and RTO operations | 5 | 3 | 19 / 13 / 0 | Part exists, core pages unindexed or absent | Fits ICP exactly. Logistics vendors hold the SERPs, but several of their pages are thin and old |
| 4 | Shopify profit | 4 | 4 | 9 / 6 / 0 | Feature page exists, no guide or calculator | Only pillar where we hold something peers lack |
| 5 | WhatsApp cost in India | 3 | 3 | 6 / 1 / 0 | Exists, weak | `whatsapp api pricing` 5,400, KD 32 (saved). BSP shoppers are mixed in. The 31 Dec INR deadline gives a dated reason to publish |
| 6 | Cart recovery | 4 | 2 | 81 / 50 / 0 | Exists, position 38 | Head terms saved at 10 a month. Wati, GoKwik, Zoko publish here. Refresh only |
| 7 | Shopify in India | 2 | 4 | 0 / 0 / 0 | No page | `shopify pricing india` 720 and `shopify plans india` 590, both KD 8 (saved). Pre-ICP audience, but winnable |
| 8 | Free WhatsApp tools (Track A) | 2 | 2 | 0 | Soft 404 | `whatsapp link generator` 8,100, KD 33 (saved). 6 mapped competitors have a link generator (Wati, Interakt, DelightChat, Zoko, Gallabox, GetGabs). Volume, not buyers |
| 9 | Shopify plus WhatsApp automation | 4 | 2 | 112 / 94 / 1 | Exists, position 32 | Order updates sit here. Needs de-cannibalising, no new pages |
| 10 | Conversational prompts | 4 | 4 | 25 / 5 / 0 | Protect | Few impressions, but prompts reach us at positions 1 to 15 |

### Striking distance (position 4 to 25): 67 queries, 945 impressions (Verified)

All are in the CSV. The ones worth action, India impressions in brackets:

| Query | Impr (India) | Pos | Page |
|---|---|---|---|
| bitespeed alternative | 43 (32) | 17.9 | /blog/bitespeed-alternative-shopify-india |
| best whatsapp app for shopify | 38 (30) | 18.4 | /blog/best-whatsapp-apps-for-shopify |
| shopify whatsapp automation | 22 (15) | 23.3 | /blog/whatsapp-automation-for-shopify |
| whatsapp automation for shopify | 11 (8) | 16.5 | /blog/whatsapp-automation-for-shopify |
| whatsapp abandoned cart recovery shopify india | 10 (10) | 14.1 | /blog/whatsapp-abandoned-cart-recovery-shopify |
| cod return rates by category in india 2026 | 7 (7) | 10.7 | /blog/cod-rto-benchmark-india-2026 |
| rto rate by product category india d2c 2026 | 9 (4) | 6.7 | /blog/cod-rto-benchmark-india-2026 |
| whatsapp abandoned cart shopify | 6 (6) | 19.5 | /blog/whatsapp-abandoned-cart-recovery-shopify |
| ecommerce whatsapp automation | 6 (6) | 22.2 | /blog/what-is-ecommerce-automation-shopify-whatsapp |
| whatsapp marketing for shopify | 5 (5) | 18.6 | /blog/whatsapp-automation-for-shopify |

`interakt alternative` sits just outside at 25.1 with 34 India impressions.

### Long conversational prompts reaching us (Verified, 11 rows)

Examples: "which companies help reduce cart abandonment for shopify stores in india?" (position 1), "which checkout app can help reduce abandoned carts for indian customers?" (1), "we want ai to filter spam, answer simple whatsapp questions..." (1, on a docs page), "recommend a whatsapp messaging platform that integrates with shopify" (4.7), "which whatsapp business api provider works best with shopify order notifications for indian stores" (6). Volumes are 1 to 12 impressions each. They show the surface is reachable, not that it is large. Wati has 611 URLs under `/geo` written for exactly this kind of prompt. (Verified.)

---

## 3. The 25 highest-priority pages

New URLs are proposals. Each owns a keyword set through the CSV `page_owner` column, so one page targets the whole set. All "why we can win" lines are Hypothesis unless marked. "Unique fact" items are Verified from our live pages or repo unless marked.

**No page on this list may claim TopEdge merchant RTO outcomes.** Our benchmark says "None of it is TopEdge merchant data". Where a page needs one, write `[NEEDS REAL DATA]`.

| # | Page | Type | Target query | Why we can win | Unique TopEdge fact it must contain | Merge or link |
|---|---|---|---|---|---|---|
| P01 | /features/cod-confirmation | Reindex, refresh | shopify cod confirmation, cod verification shopify | Page already has 33 rupee figures but has 0 impressions because GSC reports Soft 404 | 600 confirmations at ₹0.1150 cost ₹69 with 0% markup, against 156 RTO parcels at ₹180 to ₹240 each. Basic COD confirmation is on every plan, COD to prepaid is Growth and up | Owner for app-intent COD. Link from P07, P08, P14 |
| P02 | /tools/whatsapp-link-generator | Reindex, retitle, expand | whatsapp link generator (8,100, KD 33, saved) | Winnable only after indexing. Rivals such as Wati's tool page run about 686 words (Verified) | Free, no sign-up. Tracked Shopify path below the tool. Answer on what a plain wa.me link cannot measure | Owner for Track A. QR tool waits until this indexes |
| P03 | /blog/best-whatsapp-apps-for-shopify | Links, depth | best whatsapp app for shopify | Snippet already earns clicks from page 2 (Verified: 7 of 38) | Dated price readings per vendor. Say where each competitor is better | Point internal links here. Stop /blog/whatsapp-automation-for-shopify competing |
| P04 | /blog/bitespeed-alternative-shopify-india | Deepen | bitespeed alternative | India pool at 16.4. Interakt's rival page is dated 2025, Updatrr's is 526 words (Verified) | ₹1,999, ₹3,999 and ₹6,499 ex GST against Bitespeed's dated price reading. Answer the India-first framing in the AI Overview | Link /compare/bitespeed, do not merge |
| P05 | /blog/interakt-alternative-shopify-india | Deepen | interakt alternative | All 34 impressions are Indian, at 25.1 (Verified) | Cost table at 100, 500 and 1,500 orders a month, using read rates and our 0% Meta markup | Link /compare/interakt |
| P06 | /blog/cod-rto-benchmark-india-2026 | Refresh | rto rate by category india, cod return rates india | Already 5.9 on 178 impressions, 3 clicks (Verified) | Category bands, 26% against under 2%, ₹180 to ₹240, each sourced. **Fix: 21% is dated March in the body and February in one FAQ** (Verified). First-party numbers `[NEEDS REAL DATA]` | Owner for rate and benchmark queries. Links P07, P09 |
| P07 | /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation | Refresh, broaden | how to reduce rto, how to reduce rto in shopify | At 11.3 today. GoKwik's guide assumes 500 RTO events a month and gives no low-volume breakeven (Verified) | ₹0.1150 against a ₹180 to ₹240 loss, worked at 100, 500 and 1,500 orders. Diagnose by cause, then say which lever WhatsApp does not fix | Owner for the RTO reduction set |
| P08 | /blog/fake-cod-orders-shopify-india (new) | New | fake cod orders, how to stop fake orders | HillTeck, eGrow and EasySell hold it in a US-biased check, all selling one tool. Room for a layered answer | What confirmation catches and what it does not. Our COD reply handling by warehouse action. OTP on COD is not claimed: repo shows OTP only for warranty | Link P01, P14 |
| P09 | /blog/rto-meaning-ecommerce (new) | New | rto meaning in ecommerce, rto full form in e commerce, rto charges | Shiprocket's RTO and NDR explainers run 297 to 996 words and date from 2024 to 2025. **ChatMitra's 5,301-word post (Oct 2026) is the real rival** (Verified) | ₹450 to ₹900 loaded cost, the ₹38 amortised RTO line from the ₹799 kurta worked example | Link P06, P07. Keep benchmarks on P06 |
| P10 | /features/profit-loss | Refresh | shopify profit tracker india, net profit after rto | At 11 on 5 impressions. Peers have no equivalent page (Verified) | ₹799 kurta waterfall: ₹85 visible freight becomes ₹179 true cost. Name what it does not do | Owner for app-intent profit. Compare Munafa, Kaarobar, UpProfio honestly after reading them |
| P11 | /tools/cod-profit-calculator (new) | New, **owner decision** | cod profit calculator, shopify profit calculator india | No WhatsApp peer has one (Verified). Calculators by Edesy and others exist | Same cost lines as the product. Label outputs as a model, as the RTO calculator does | See decision 3 in section 7 |
| P12 | /blog/ndr-meaning-ecommerce (new) | New | ndr meaning, ndr full form in courier, ndr raised meaning in delivery | Plain-language gap: Shiprocket's definition page is 411 words (Verified) | 36-hour NDR window sourced from Amazon Shipping. **Confirm capability first:** repo copy describes wiring an NDR webhook, not a native feature | Link P09, P07 |
| P13 | /blog/shopify-cod-setup-india (new) | New | how to enable cod in shopify, how to add cod charges in shopify, shopify cod not showing | No slug targets this among mapped peers (Verified by URL scan). Typed only by Shopify owners | Tested steps and screenshots from a real store with the date tested. No claims from memory | Link P14, P01 |
| P14 | /blog/best-cod-confirmation-apps-shopify-india (new) | New | best shopify cod app, shopify cod app | Updatrr's version is 647 words (Verified). Depth standard applies | Real listing reads, dated: CODFIRM, HillTeck, Softpulse and others, with where each beats us. Our 1 review stated plainly | Link P01. Do not merge with P03 |
| P15 | /blog/whatsapp-business-api-pricing-india | Refresh | whatsapp api pricing (5,400, KD 32, saved), whatsapp business api cost india | 3,456 words already but at 32.2 and last crawled 6 Oct. Rate card is at 5.4 (Verified) | ₹0.8631 and ₹0.1150 read off Meta. Dondy 60% and AiSensy 26.1% markup worked examples. Ten-minute invoice test | Owner for pricing guide. `/pricing/meta-rates` owns rate queries. **Move `whatsapp api pricing` off `/pricing`** |
| P16 | /blog/whatsapp-inr-billing-india-0-markup (new) | New | whatsapp inr billing india, plus the plan's India-first page | Dated event: move to INR billing by 31 Dec 2026, delivery stops 1 Jan 2027 per our rate page. Re-verify against Meta before publishing | What the deadline means by account type, what 0% markup means, and the AI Overview framing currently given to WatEase and Chat Mitra | Plan Track C item 2. Link P15. Evidence is the deadline, not search demand |
| P17 | /blog/cod-to-prepaid-whatsapp-shopify-india | Refresh | cod to prepaid, cod vs prepaid | At 11.1. ChatMitra's 5,962-word post has 41 rupee figures, so depth alone will not win (Verified) | A prepaid order worth about ₹68. Second-message logic. Growth and up only, stated clearly | Journey example stays linked, not merged |
| P18 | /blog/net-profit-cod-orders-shopify-india (new) | New | break even roas, ecommerce profit margin india | Generic ROAS pages ignore RTO. COD-adjusted version is rare in what I sampled | Break-even ROAS with and without the RTO line, on the ₹799 kurta. Connections needed: Shopify, Meta Ads | Link P10, P11, and /blog/profitable-ecommerce-business-india |
| P19 | /blog/wati-alternative-shopify-india | Deepen | wati alternative, wati alternative india | 19 impressions at 8.5 (Verified). Only commercial value if India share holds | Cost at volume, "when to stay on WATI", what carries over | Link /compare/wati |
| P20 | /blog/aisensy-alternative-shopify-india | Deepen | aisensy alternative, aisensy alternative for shopify | 10 impressions at 7.4 (Verified). AiSensy's Shopify content is 4 URLs (Verified) | AiSensy's ₹0.1450 service reply against Meta's ₹0.1150, dated | Link /compare/aisensy |
| P21 | /blog/shopify-pricing-india (new) | New | shopify pricing india (720, KD 8), shopify plans india (590, KD 8, saved) | Lowest saved KD in the set. Pre-ICP, so judge on signups | Rupee plan read with date, then the costs after Shopify: gateway, COD, RTO, linking to P10. Plan prices `[NEEDS REAL DATA]` until read | Top of funnel. Links P13, P22 |
| P22 | /blog/best-shopify-apps-india (new) | New | shopify apps india, best shopify apps in india, shopify apps (5,400, KD 22, saved) | Saved SERP is listicles, so `/integrations` cannot match the intent. Updatrr's version is 656 words (Verified) | A stack by job for a COD store at 100 to 1,500 orders, with honest overlap | **Replaces** the keyword map's `/integrations` REBUILD for this term |
| P23 | /blog/whatsapp-abandoned-cart-recovery-shopify | Refresh | shopify abandoned cart recovery, abandoned cart message | 175 impressions at 24.4. Only 20 rupee figures, against 72 on the sibling post (Verified) | Message cost at ₹0.8631 per marketing send and cost per recovered cart, worked. Ban-safety answer, since a real prompt asks it | Sibling post keeps "best app" intent |
| P24 | /blog/partial-cod-shopify-india (new) | New | partial cod shopify, partial cod shopify india | Listings dominate; explanation pages are thin, GoKwik's is 978 words (Verified) | **We do not appear to ship partial COD** (no mention in repo marketing copy; confirm). Say so, name Partialy and ByteInfy, show where our confirmation fits | Link P17 |
| P25 | /blog/gallabox-alternative-shopify-india (new) | New | gallabox alternative | No page today. Evidence is autosuggest only, so last in the list | Gallabox reading, dated, with cost at volume and when to stay | Add to /compare/alternatives |

**Held back, not in the 25:** `/tools/whatsapp-qr-code-generator` until P02 indexes, because a second tool on an unindexed cluster teaches nothing. DelightChat alternative, order confirmation message templates and case studies are the next three.

---

## 4. Cannibalisation (Verified from query-page data)

| Pages competing | Queries | Fix |
|---|---|---|
| /blog/best-whatsapp-apps-for-shopify and /blog/whatsapp-automation-for-shopify | best whatsapp app for shopify (34 vs 9), best whatsapp commerce tools (38 vs 6), whatsapp shopify, shopify whatsapp | **Most important.** Listicle intent goes to the first page. Check anchors from the automation post |
| /blog/whatsapp-automation-for-shopify and /blog/what-is-ecommerce-automation-shopify-whatsapp | 3 ecommerce automation queries | First owns "shopify". Second stays definitional |
| /blog/whatsapp-automation-for-shopify and /blog/shopify-automation-checklist-whatsapp-cart-recovery | shopify whatsapp automation (19 vs 6) | First owns it. Checklist links up |
| /blog/whatsapp-abandoned-cart-recovery-shopify and its trailing-slash URL | whatsapp abandoned cart shopify (3 at 28.3 vs 3 at 10.7) | Open owner decision in `17-gsc-indexing-findings.md`. Pairs recur on several pages, and the slash form is often better placed |
| /blog/kanal-whatsapp-alternative-shopify and /compare/kanal | getkanal alternatives (258 vs 10) | Intended split, per earlier decision. Leave |
| Old `dash.topedgeai.com/docs/*` hosts | abandoned cart queries at position 90+ | Low impact, belongs to the dashboard repo |

**Keyword map conflicts to close:** `/pricing` and the pricing blog share `whatsapp api pricing`; `/integrations` and the proposed P22 share `shopify apps`. The `page_owner` column assigns one owner to each. New-page risk: P09 against P06, and P07 against P01. The CSV separates them by intent.

---

## 5. Competitor content map

**Method (Verified).** Sitemaps fetched today, locale folders excluded, first matching slug rule wins. Counts are slug-based and approximate.

| Theme | TopEdge | Updatrr | GetGabs | ChatMitra | Interakt | Wati | AiSensy | DelightChat | Zoko | Gallabox | GoKwik | Shiprocket |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Non-locale URLs | 157 | 78 | 160 | 440 | 1,051 | 1,456 | 508 | 7,176 | 1,503 | 631 | 362 | 3,533 |
| Compare or alternative | 25 | 26 | 1 | 36 | 40 | 38 | 8 | 100 | 43 | 36 | 13 | 78 |
| Best-of listicles | 5 | 12 | 3 | 16 | 61 | 225 | 1 | 633 | 237 | 6 | 12 | 113 |
| RTO or NDR | 4 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | 0 | 0 | 15 | 19 |
| COD or prepaid | 5 | 3 | 1 | 1 | 3 | 0 | 0 | 15 | 8 | 1 | 18 | 12 |
| Cart or checkout | 5 | 4 | 2 | 1 | 24 | 6 | 2 | 164 | 21 | 1 | 36 | 10 |
| Order tracking or notifications | 0 | 1 | 1 | 2 | 5 | 5 | 4 | 33 | 10 | 2 | 0 | 27 |
| Profit or margin | 2 | 0 | 0 | 0 | 1 | 1 | 0 | 30 | 2 | 1 | 8 | 11 |
| WhatsApp pricing | 2 | 0 | 3 | 12 | 26 | 36 | 3 | 30 | 52 | 7 | 2 | 1 |
| Link or QR tools | 1 | 0 | 2 | 4 | 6 | 5 | 3 | 6 | 10 | 5 | 0 | 0 |
| Templates | 29 | 0 | 8 | 33 | 35 | 41 | 181 | 957 | 24 | 173 | 1 | 2 |
| Case studies | **0** | 0 | 7 | 6 | 106 | 48 | 72 | 5 | 19 | 62 | 32 | 10 |
| Glossary or learn | **0** | 0 | 0 | 76 | 92 | 19 | 1 | 37 | 245 | 0 | 9 | 99 |
| Integrations | 1 | 9 | 7 | 11 | 53 | 30 | 23 | 52 | 37 | 20 | 2 | 33 |

**Bitespeed has no sitemap.** `robots.txt` is empty and `/sitemap.xml` returns 404, so no count is possible. Search found `bitespeed.co/compare/delightchat-alternative`, so unlisted pages exist. (Verified.) GetGabs blocked my script for blog pages (403), so its pages were not sampled; its sitemap came through curl.

**DelightChat's profit count is inflated** by its `/apps` directory. Its 7,176 URLs include 4,951 `/apps` pages and 993 templates. (Verified.)

### What makes their best pages rank (32 live pages read, 10 shown; word counts strip nav and footer)

| Page | Words | ₹ | Tables | Last dated | Read |
|---|---|---|---|---|---|
| chatmitra.com/blog/rto-in-ecommerce | 5,301 | 14 | 6 | Oct 2026 | Definition first, terminology table, dated sources, labelled assumptions. No first-party outcomes |
| chatmitra.com/blog/convert-cod-to-prepaid-orders | 5,962 | 41 | 9 | Oct 2026 | Our closest structural copy, "Short on time?" block included |
| chatmitra.com/chatmitra-vs-bitespeed | 2,769 | 26 | 1 | Aug 2026 | Title leads "Bitespeed Pricing & Alternatives", takes the price query too |
| gokwik.co/blog/how-to-reduce-rto-in-e-commerce | 2,867 | 6 | 1 | May 2026 | Diagnosis steps, status bands, formula. Enterprise-sized examples |
| hillteck.com/blog/reduce-rto-ecommerce.html | 2,591 | 25 | 0 | Jan 2026 | Root causes plus itemised cost |
| wati.io/en/blog/shopify-abandoned-cart | 3,476 | 0 | 3 | Oct 2026 | Task answers ("how to check abandoned carts"), freshly updated |
| aisensy.com/whatsapp-business-pricing-calculator-free | 1,335 | 26 | 1 | none | Calculator plus plain cost explanation |
| updatrr.com/guides/reduce-rto-ecommerce-india | 841 | 4 | 0 | none | Thin. Same content also at `/reduce-rto-ecommerce-india` |
| updatrr.com/best/shopify-apps-india | 656 | 1 | 0 | none | Thin listicle, also duplicated at a second URL |
| shiprocket.in/encyclopedia/ndr | 411 | 2 | 0 | Apr 2024 | Thin and old, ranks on domain strength (Hypothesis) |

**Pattern (Estimate):** winners answer in the first lines, separate terms in a table, date their sources and show worked rupee arithmetic. Our benchmark and RTO posts already match this structure, so structure is not the differentiator. **ChatMitra is the peer to watch:** it is 4th most cited in our AI baseline, and it is publishing long, dated COD and RTO posts in our exact wording.

### Content gaps, in order

1. **Case studies.** 0 URLs against Interakt 106, AiSensy 72, Gallabox 62, Wati 48, GoKwik 32. Three named merchants exist. Needs their sign-off and real numbers. (Verified count. Value is Estimate.)
2. **Failed-delivery language.** We lack a plain RTO meaning page, NDR page, and COD setup page (P09, P12, P13). Only GoKwik and Shiprocket have real depth, and their advice sells their own stack.
3. **Standalone price calculator.** AiSensy, ChatMitra, Gallabox and Zoko each have a URL. Ours is embedded on `/pricing/meta-rates`. Consider after P15. (Verified.)
4. **Checkout and logistics partner pages.** Updatrr has `/integrations/gokwik`, `/shiprocket-fastrr`, `/razorpay-magic-checkout`, `/shopflo`. Our `/integrations` names none of them. **Build only for what actually connects;** ask the owner. (Verified for pages. Capability unknown.)
5. **Our real lead: profit.** No mapped WhatsApp peer owns it (P10, P11, P18).

**Do not copy:** Wati's 611 `/geo` prompt pages, DelightChat's 4,951 `/apps` pages or Zoko's 1,118 `/post` pages. These are the scaled pattern the master plan warns against, and DelightChat's traffic was already shown to be unqualified.

---

## 6. What NOT to target, and why

| Keywords | Why |
|---|---|
| whatsapp bulk message sender 12,100, bulk whatsapp sender 3,600 (saved) | Wrong category, grey-market intent. Owner has ruled these out |
| whatsapp chatbot 4,400, whatsapp marketing 4,400 (saved) | Pulls BSP shoppers. Clinics and coaching centres cannot use a Shopify-only product |
| whatsapp business web 135,000, whatsapp qr code png 22,200, how to schedule messages on whatsapp 6,600 (saved) | DelightChat's traffic shows this is reachable and worthless |
| whatsapp flow template, whatsapp flows shopify | **We do not support Meta Flows** (repo memory). 0 of 106 impressions are Indian. `/features/meta-manager` should not chase it |
| shopify order tracking, shopify track order india, my shopify order tracking | Autosuggest wording is shoppers tracking parcels, not merchants (Hypothesis, supported by `myshopify com track order india`). Only merchant-worded variants are in the CSV |
| rto charges by state, rto bike, rto challan and similar | Vehicle registration, not ecommerce. Filtered out |
| shopify cod black ops, cod warzone, cod liver oil, cod to prepaid airtel or jio | Other meanings of the word. Filtered out |
| gokwik, shiprocket, razorpay magic checkout head terms | Navigational brand searches. Comparison mentions only |
| shopify india contact number, login, careers, customer care | No fit |
| shopify meesho, meesho rto | Marketplace sellers. Meesho sets its own logistics, so our product does not apply (Estimate) |
| d2c india, ecommerce india | Students and researchers more than operators (Estimate). Only worth it with a data asset |
| Zoko and Kanal more depth | Done on 2 Nov, and foreign-weighted. Only revisit if India share rises |
| shopify seo experts | Link-exchange post, position 85. Not a demand target |

---

## 7. Decisions and open items

1. **Owner: request reindex** in GSC for `/tools/whatsapp-link-generator`, `/features/cod-confirmation`, `/whatsapp-journey-examples`, `/tools/rto-cost-calculator`, `/whatsapp-journey-examples/cod-to-prepaid`. Re-inspect in a week. If Soft 404 persists on a healthy page, debug before any Track A work.
2. **Owner: confirm capability** for NDR handling, partial COD, and any Shiprocket or GoKwik connection. P12, P24 and gap 4 depend on it.
3. **Owner: calculators.** Project memory records a directive "never build an ROI/RTO calculator", from the Google Ads work. A live `/tools/rto-cost-calculator` exists and the master plan schedules upgrades. P11 needs a clear yes or no. If no, P18 carries the profit worked example alone.
4. **Main session: merge volumes** for the 71 flagged rows. Saved Track A volumes other than `whatsapp link generator` do not state a market in the plan, and memory warns OpenSEO defaults to US, so they are flagged for checking. If they prove US, Track A shrinks.
5. **Measurement:** report India impressions separately from now on. Sitewide commercial impressions overstate the Indian ICP by about 4 times on today's figures (1,426 against 340). (Verified arithmetic.)

### Limits

- WebSearch results are US-biased, not India. I used them only to name who appears and never for rank.
- The saved India SERPs from 2 Nov mask about 60% of domains as `google.com/goto`, so titles are readable and many domains are not.
- The CSV `status` of "page exists, not ranking" means no impressions, or position worse than 25, in the 90-day export. It does not mean absent from all results.
- Ranks are GSC averages on very low impressions. Single-digit rows are noise.
- Value and winnability scores are my judgement.

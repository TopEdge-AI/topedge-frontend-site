# Day 2 (Mon 16 Nov 2026): scorecard and festival verdict

Labels: Verified = read today from Search Console (OpenSEO), URL Inspection, OpenSEO India volumes or a live page. Estimate = judgement.

## 1. Scorecard against 15 Nov

Method: Search Console, query rows with 2 or more impressions, country India. Brand, spa/massage and "shopify seo expert" queries are excluded. Single-impression rows are left out, so this undercounts both weeks by the same rule.

| Measure | 2 to 8 Nov | 9 to 15 Nov | Change | Label |
|---|---|---|---|---|
| India commercial impressions (rows of 2+) | 200 (28.6 a day) | 177 (25.3 a day) | -12% | Verified |
| India impressions, all queries | 636 | 1,156 | +82% (mostly spa queries on the home page) | Verified |
| All countries, all queries | 1,723 | 3,013 | +75% | Verified |
| All countries, clicks | 10 | 18 | +8 (11 of the 14-day clicks were "topedge ai") | Verified |
| App Store reviews | 0 | 0 | none | Verified 16 Nov |
| App Store listing name | "TopEdge WhatsApp Cart Recovery" | same | not renamed yet | Verified 16 Nov |

Where the all-country rise came from (9 to 15 Nov, Verified):
- /blog/shopify-seo-experts: 634 impressions at position 52, 0 clicks. Off-ICP.
- "getkanal alternatives": 680 impressions at 2.1 over 14 days, 0 clicks, only 4 of them from India. Hypothesis: automated or rank-tracker impressions, not buyers. Do not chase.
- Home page: 452 impressions, mostly local spa queries.

Pricing pages (9 to 15 Nov, all countries, Verified): /blog/interakt-pricing-india 68 impressions at 8.4 (1 click), /blog/wati-pricing-india 39 at 14.2, /blog/aisensy-pricing-india 37 at 10.6. The 29 Nov target ("below 30") is already met on all three.

Non-brand page-1 queries (2 to 15 Nov, all countries, 5+ impressions, ICP-relevant): 12, including getkanal alternatives, best zoko alternative for shopify (80 at 6.0), getgabs alternatives, two long COD-to-prepaid prompts (2.3 and 3.9) and top shopify support apps with whatsapp. The 15 Nov baseline of 6 used an unstated method, so this is not a like-for-like rise.

**Stop rule:** India commercial impressions were flat to down this week (first flat week). If 16 to 22 Nov is flat again, the stop rule fires on Day 9 (23 Nov): no new pages, days go to reviews, list inclusion and tools.

Index check on 15 Nov pages (URL Inspection, Verified): /blog/rto-meaning-ecommerce and /blog/add-whatsapp-chat-button-shopify indexed, crawled 16 Nov 01:17 UTC. /whatsapp-journey-examples/order-status-updates is now indexed (was Discovered on 12 Nov). Home crawled 16 Nov, /pricing 15 Nov.

## 2. Festival verdict

Facts (Verified 16 Nov):
- Published 1 Nov. Hub indexed. Children: 2 indexed (new-year, makar-sankranti-pongal), 18 Discovered not indexed, 6 unknown to Google (eid-ul-fitr, rama-navami, akshaya-tritiya, milad-un-nabi, ganesh-chaturthi, christmas).
- Search Console: 0 impressions on any festival URL, 30 Oct to 15 Nov.
- Child pages are about 2,100 words each and share about 50% of their 6-word phrases with each other (holi, easter, diwali, christmas, good-friday compared).
- India volumes, OpenSEO 16 Nov: diwali offer message 260, christmas wishes for customers 210, new year wishes for customers 110, diwali wishes for customers 20. Holi, Raksha Bandhan, Eid, Navratri, Dhanteras, Onam, Karwa Chauth, Ganesh Chaturthi and Akshaya Tritiya "offer message" forms returned no volume.

| Tier | Pages | Verdict | Why |
|---|---|---|---|
| Keep and push | Hub, christmas, new-year | Keep indexed. Request indexing for christmas now | Only measured demand; Christmas is 39 days away and Google has never seen the URL |
| Keep, no action | diwali, makar-sankranti-pongal, holi, raksha-bandhan, navratri-durga-puja, dussehra, dhanteras, eid-ul-fitr | Keep | Large D2C sale moments; Diwali has measured demand for next October |
| Noindex candidates (keep live for users, out of the sitemap) | good-friday, easter, milad-un-nabi, eid-ul-adha, vasant-panchami, maha-shivaratri, rama-navami, akshaya-tritiya, ugadi-gudi-padwa, chhath-puja, karwa-chauth, bhai-dooj, onam, ganesh-chaturthi, krishna-janmashtami | Decide on Day 14 (29 Nov) after one more URL Inspection | No measured demand, not crawled after 15 days, half-shared text. Estimate: they cost little today, so the honest case for noindex is a cleaner site-quality signal, not a proven penalty |

No merge: the hub already lists every festival, so a 301 into it would lose pages merchants use and gain nothing measurable. Today's only festival edit is house style: 17 em dashes and 5 bare "TopEdge" mentions fixed in the shared components.

## 3. What shipped in the build (not yet deployed)

- /blog/whatsapp-business-api-pricing-india refreshed: updated 16 Nov, answer-first opening with the date, new "Cost per 1,000 messages by provider" table (Meta and TopEdge AI, Interakt Growth, WATI Business and Growth, AiSensy, Dondy), two new FAQs (is it free, cost of 1,000 messages), App Store door in the TopEdge AI price section. **Correction:** the worked month said Dondy adds ₹5,179; the real figure is ₹9,102 (60% was applied to Meta's INR card). AiSensy's marketing and utility markups were missing; now included.
- Re-read 16 Nov: Meta INR rate sheet (₹0.8631 / ₹0.115 / ₹0.115 / ₹2.4971, page "Updated: Sep 30, 2026"), AiSensy, Interakt rate table, Dondy, WATI rate-card headers, ECB (13 Nov: ₹94.24 per dollar; site keeps ₹93.92 for consistency). sources.ts updated.
- Four body-only fixes from 01 `auto_flags`: (1) the 4-way board /compare/topedge-vs-wati-vs-interakt-vs-aisensy had no blog inlinks, now linked from the WATI, Interakt and AiSensy pricing posts; (2) /docs/guides/shared-inbox-handover now names "WhatsApp team inbox" in its summary; (3) /tools/cart-recovery-calculator opening line now says "abandoned cart recovery calculator"; (4) /docs/reference/opt-in-tools (2 inlinks) now linked from /blog/whatsapp-opt-in-shopify-india.

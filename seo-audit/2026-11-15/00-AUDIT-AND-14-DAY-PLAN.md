# SEO, AEO and GEO audit and revised 14-day plan (15 Nov 2026)

Inputs: the four Search Console exports from 15 Nov (28 days, regex-filtered), the Ahrefs "article missing" CSV, the 10 Nov audit, and the research in this folder:

| File | Contents |
|---|---|
| 01 | SERP teardown: what ranks for 10 money queries, and why |
| 02 | Ideal customer and how they buy |
| 03 | 38 content gaps |
| 04 | 42 new backlink prospects |
| 05 | AI-answer visibility |
| 06 | Forecast |

Forecasts are Estimates. No ranking is promised.

## 1. Where we stand (Verified, Search Console 28 days to 13 Nov)

| Cluster (regex) | Clicks | Impressions | Note |
|---|---|---|---|
| Shopify + WhatsApp / automation | 7 | 349 | All 7 clicks are "best whatsapp app for shopify" (CTR 12%, pos 17.5) |
| Commercial modifiers (best, vs, pricing, alternative) | 9 | 566 | "best zoko alternative for shopify" 57 impr at 6.1 but 0 clicks |
| Questions (how/what/which) | 0 | 42 | Long AI-style prompts land at positions 1 to 10 |
| Cart / COD / RTO | 10 | ~460 | "cod to prepaid" prompts at 2 to 4 |

- **Volume:** about 25 commercial impressions a day. India 224, US 126.
- **Homepage:** 1 impression in 28 days. Its title was not working.
- **Off-topic pages:** /blog/shopify-seo-experts and /blog/best-shopify-upsell-apps pull non-ICP impressions ("beste seo bureau shopify", position 64 to 97). They cost nothing, but they say nothing about who we serve. Decide on Day 14 (Section 5).

## 2. What was fixed today (on branch `update-pricing`)

### Titles and positioning
- **Title cap.** Every page now renders a title of 60 characters or fewer. `MarketingSEO` only adds " | TopEdge AI" when the result still fits in 60.
  - Before, the suffix was added up to 65, which pushed most titles past 60.
  - About 60 page titles were rewritten, keyword first.
  - Descriptions are 120 to 155 characters.
- **Category line**, now used on the home page, /features, /about, the Organization and SoftwareApplication schema, and llms: "TopEdge AI is the WhatsApp marketing and automation app for Shopify brands in India: it recovers abandoned carts, confirms COD orders, moves COD to prepaid, and shows net profit after RTO, with 0% markup on Meta rates."
  - The site now leads with a category plus outcomes, not a feature list.
  - "Growth suite" is still the idea, made concrete as four jobs: Recover revenue, Protect COD orders, Support customers, Know your profit.
- **Home page.**
  - Title: "WhatsApp App for Shopify India: Cart, COD & RTO | TopEdge AI".
  - H1: "Recover carts. Confirm COD orders. The WhatsApp app for Shopify India."
  - Every section is cut to short headings and one-sentence bodies.

### Feature pages
- All 12 have an H1 carrying the keyword, a 50-word direct answer, answer-first FAQs and trimmed bodies.
- The dashboard screenshots are replaced by coded, animated product scenes:
  - Built from crisp HTML, CSS and SVG on premium gradient backgrounds.
  - A few KB each, loaded lazily per page.
  - A screenshot only shows where no scene exists.

### Blog
- **Comparison tables.** TopEdge AI is the first row or column in every table that includes it, with an honest "our own app, listed first" line.
- **Openings and FAQs.** All 39 posts have a direct-answer opening of about 50 to 60 words. FAQs are rephrased in the words people search with.
- **Keyword clash.** Two posts that fought the automation pillar were retitled onto their own keywords.

### Other
- 73 em dashes were removed from festival copy.

## 3. Audit findings still open

### Technical
- **Bing.** Bing Webmaster Tools is not set up. Copilot and ChatGPT search lean on Bing's index. Owner, 5 minutes: import the site from Search Console.
- **Video watch-page warning.** Leave it. It only clears by putting the demos on YouTube.
- **Structured-data warnings.** Merchant listings and Product snippets should empty out by about 24 Nov after the 10 Nov schema fix. Check on Day 14.
- **llms files.** `public/llms.txt` regenerates on the next build with the new category line.

### On-page, from 03
- **Pricing posts.** The three competitor pricing posts lacked FAQ blocks. Fixing today.
- **WhatsApp API pricing post** (5,400 searches a month): still dated 21 Oct.
- **No RTO/NDR explainer.** RTO terms are about 860 searches a month. Writing it today.
- **Link generator.** 5 FAQs against 16 at the leader.
- **/whatsapp-templates.** 14 templates against 50 at competitors.

### Entity and brand consistency (the main AI-visibility problem, see 05)

| Surface | What it says now |
|---|---|
| Our site | "TopEdge AI", from ₹1,999 |
| Shopify App Store | "TopEdge Ai: WA Cart Recovery", $19, 0 reviews |
| Two app directories | "TopEdge WhatsApp Cart Recovery" |

- Assistants answering "which app confirms COD orders on WhatsApp" return App Store listings with COD in the name. Our listing does not say COD, so we are invisible there.
- Owner action: rename the listing to "TopEdge AI: WhatsApp COD & Cart" (or similar) and use "TopEdge AI" everywhere. This is the single biggest AEO lever we control.

### Off-page
- About 42 of 52 referring domains are spam. Real authority is low.
- 04 lists 42 vetted, free, legitimate targets. Start with these:
  - **pickyourapp.com:** an unclaimed TopEdge page already exists.
  - **List articles:** Meetanshi, MageComp and Growave WhatsApp-app lists.
  - **India D2C:** thed2cpulse.com stack, martech.zone, the D2C Ignite newsletter.
  - **Directories:** SourceForge, productgrowth.in, costbench.com.
- Also pitch the codingclave.com and echai.ventures comparison pages: assistants cite them for "WATI vs Interakt vs AiSensy".
- **No paid links, link exchanges or directory blasts.** The free endpoint showed DR 42, but that is inflated by spam. DR is an output of real links, not a target to buy.

## 4. Honest forecast (from 06)

**10,000 to 20,000 impressions a day is not reachable for this business in a month.** Every buyer keyword we could target adds up to about 1,240 India searches a day. Reaching 10k+ would mean targeting consumer terms ("whatsapp web", "bulk sender") that bring no Shopify merchants.

| Horizon | Impressions a day | Page 1 realistic for |
|---|---|---|
| 14 days (29 Nov) | 30 to 60 | cod to prepaid shopify, whatsapp abandoned cart recovery shopify india, aisensy alternative (India form), getkanal alternatives, long AI prompts |
| 30 days (15 Dec) | 60 to 150 | + whatsapp automation for shopify; interakt pricing at the bottom of page 1 |
| 90 days (Feb) | 250 to 600 | The three pricing posts, best whatsapp app for shopify, whatsapp api pricing. Needs 10+ real links and 10 to 15 App Store reviews |

The fastest real lever is not more pages. It is App Store reviews, a listing name with COD in it, and inclusion in the lists that already rank.

## 5. Revised 14 days (Sun 15 Nov to Sun 29 Nov)

This replaces Days 10 to 14 of `2026-11-10/03`. Done today: feature pages batches 1 to 3 (copy and visuals), the title cap, positioning and the blog comparison order.

**Every day:**
1. Search Console check on yesterday's URLs.
2. One page from the day's list.
3. Build, preview, deploy.
4. IndexNow, then Request indexing.

At most 5 outreach emails a day.

| Day | Date | Claude | You |
|---|---|---|---|
| 1 | Sun 15 | Done above. Plus: pricing-post FAQs, /blog/rto-meaning-ecommerce, WhatsApp chat button post, link generator FAQs | Deploy. Request indexing: home, /pricing, 12 feature pages. Bing Webmaster import |
| 2 | Mon 16 | Scorecard against today. Festival verdict (keep, merge or noindex per page). /blog/whatsapp-business-api-pricing-india refresh with the date and a cost per 1,000 messages table | Rename the App Store listing to include COD. Ask 3 merchants for reviews. Claim pickyourapp.com |
| 3 | Tue 17 | /whatsapp-templates: 3 copyable examples above the fold, utility vs marketing table, order-confirmation template section. Abandoned-cart message templates block in the cart post | 5 emails: Meetanshi, MageComp, Growave, martech.zone, thed2cpulse |
| 4 | Wed 18 | /tools/whatsapp-qr-code-generator as its own URL (1,300 a month), sharing the link generator code | Submit to SourceForge, productgrowth.in, costbench |
| 5 | Thu 19 | /blog/whatsapp-business-app-vs-api (AI-prompt question, no owner yet). "Is WhatsApp Business API free in India" passage in the pricing post | Record YouTube demo 1: COD confirmation, 2 to 3 min |
| 6 | Fri 20 | /blog/fake-cod-orders-shopify-india (problem query, strong ICP fit) | 5 emails: codingclave, echai.ventures, D2C Ignite plus 2 from 04 |
| 7 | Sat 21 | Mid-point scorecard. Interakt and WATI alternative posts reworked from the 9 Nov readings | Follow up on Day 3 emails |
| 8 | Sun 22 | /blog/shopify-cod-setup-india (needs your test store screenshots) | Test store screenshots. YouTube demo 2: cart recovery |
| 9 | Mon 23 | /tools/ecommerce-profit-calculator (390 + break-even ROAS 140), only if you approve. Otherwise /blog/net-profit-cod-orders-shopify-india | Decide on the calculator. 5 emails |
| 10 | Tue 24 | /blog/gallabox-pricing-india only if the three pricing posts show impressions. Otherwise /blog/partial-cod-meaning (explainer, says plainly that we do not offer it) | Re-check the structured-data reports |
| 11 | Wed 25 | /blog/shopify-pricing-india (720 a month, top of funnel for new D2C founders) | YouTube demo 3: COD to prepaid |
| 12 | Thu 26 | Internal-link sweep: every new page gets 3 links in from older posts. Off-topic posts decision | 5 emails. Review requests round 2 |
| 13 | Fri 27 | AI-prompt check: 3 prompts in 4 assistants, logged against 05 | Manual Actions check |
| 14 | Sun 29 | Final scorecard against the targets below. Write the next 14 days from what moved | Decide: more pricing pages, festival pages, off-topic posts |

### Targets for 29 Nov

| Measure | 15 Nov | Target |
|---|---|---|
| Non-brand queries on page 1 | 6 | 10 |
| Commercial impressions a day | ~25 | 40 |
| App Store reviews | 0 | 3 |
| Real referring domains gained | 0 | 4 |
| Titles over 60 characters | many | 0 |
| AI prompts naming TopEdge AI (of 12) | 1 | 2 |

**Stop rule:** if India impressions are flat for two weeks running, stop new pages. Put the days into reviews, list inclusion and the free tools.

## Progress log

- **Day 2, 16 Nov 2026.** Done (built, awaiting deploy): scorecard, festival verdict (see `../2026-11-16/01-day-2-scorecard-and-festival-verdict.md`), /blog/whatsapp-business-api-pricing-india refresh with the cost-per-1,000 table, festival em dashes and brand. Body fixes: 4-way compare board inlinks, shared-inbox docs, cart recovery calculator, opt-in tools docs. Not done: plan doc in claude.ai could not be read from this session, so this log is the record; Rich Results Test waits for the deploy. Owner items (listing rename, review asks, pickyourapp claim) not confirmed.
- **Day 7 (10 Nov plan's "RTO hub"), 17 Nov 2026.** Built, `build:netlify` exit 0, pushed to `update-pricing` with the owner's go-ahead:
  - [x] New: /blog/best-shipping-aggregators-logistics-tools-india, the ClickPost exchange post. ClickPost at #2 with its blurb and the Snitch link; 9 other vendors read live on 17 Nov; worked RTO bill at 100, 500 and 1,500 orders; disclosure of the exchange.
    - Keyword: "shipping aggregator india" family (India: 480 + 480 + 140 + 140 + 110). Live results show only small shipping vendors in the top 10, each ranking itself.
  - [x] "ndr full form" read (2,900, logistics meaning; about 5,000 a month across NDR variants). NDR section and an "NDR raised" FAQ added to /blog/rto-meaning-ecommerce. **Later page:** a standalone NDR meaning page.
  - [x] /blog/bitespeed-alternative-shopify-india: leads with "Bitespeed publishes no price" (bitespeed.co/pricing redirects to a demo form, 17 Nov). New "Bitespeed pricing in 2026" H2; third-party figures labelled.
  - [x] /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation: description and opening carry "how to reduce RTO" and link to the RTO page.
  - [x] RTO hub cross-links complete: the calculator now links the benchmark and the SOP.
  - Body fixes (01 `auto_flags`, "only 2 body links in"): /docs/go-live-checklist, /docs/reference/chat-rules, /docs/guides/train-your-ai-brain and /docs/reference/commerce each get one contextual blog link. Three were unknown to Google and one was Discovered on 17 Nov.
  - **Not done:**
    - Hero image for the new post. Placeholder in use; the owner supplies the image.
    - ClickPost's reciprocal listing (it follows our deploy).
    - Plan doc in claude.ai, unreachable from the cloud session, so this log is the record.
    - Saved memory, which is not available in the cloud session.
  - **Blog UI, owner request the same day.**
    - List entries now render as cards: a spec sheet (Best for, Pricing, AI, Rating), pros and cons in two columns under green and red bars (the Digismoothie pattern), a verdict line and link buttons.
    - Hairline section breaks before every H2, on all posts.
    - The upgrade runs in `src/marketing/lib/blogHtml.ts`, so the best-apps and abandoned-cart lists upgraded too. Authoring rules: `docs/seo/blog-list-post-format.md`.
    - ClickPost's G2 4.8/5 (148) confirmed by the owner in a browser and linked.
  - **Year framing, owner rule 17 Nov:**
    - 2027, not 2026, in titles, descriptions and headings of new and list posts. Applied to the shipping post (title now "10 Best Shipping Aggregators & Logistics Tools in India 2027") and to the Bitespeed pricing H2.
    - Reading dates and dated source names stay as they are.
    - 22 older posts still carry 2026 titles; switching them is an owner decision, because rule 10 protects comparison-page titles.
  - **Hero images:** the owner's images went live on the shipping, RTO meaning and WhatsApp chat button posts.
  - **Mistake fixed, 17 Nov.** The line "ClickPost and TopEdge AI have agreed to list each other" showed as Google's snippet. It is removed from the intro and the limits list. New permanent rule: no business arrangements in published copy.
  - **Day-number note:** the user calls today Day 7 (the 10 Nov plan's RTO hub). Under this 15 Nov plan it would be Day 3 (/whatsapp-templates), which moves to the next session.

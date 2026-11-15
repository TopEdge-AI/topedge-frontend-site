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

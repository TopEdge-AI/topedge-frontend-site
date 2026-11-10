# Full audit and plan revision, 10 Nov 2026

Every number here was read on 10 Nov 2026 from Search Console (through OpenSEO), Google's Rich Results Test, OpenSEO, the Ahrefs free endpoint or the built site, unless it is marked Estimate or Hypothesis. The page-by-page table is `01-page-by-page-audit.csv` in this folder (160 rows, one per sitemap URL).

## 1. What Search Console actually says

### Indexing, all 160 sitemap URLs inspected

| State | URLs | What they are |
|---|---|---|
| Submitted and indexed | 117 | Everything that matters commercially |
| Discovered, currently not indexed | 27 | 16 festival pages, 9 docs pages, 1 journey example, 1 off-topic blog post |
| URL is unknown to Google | 14 | 8 festival pages, 5 docs pages, the new WATI page (not deployed yet) |
| Crawled, currently not indexed | 2 | /whatsapp-festival-templates, /whatsapp-journey-examples/cod-to-prepaid |

No URL has a Google-chosen canonical that differs from ours. No Soft 404. No fetch errors.

Why the 43 are not indexed (Verified from the built site, cause is a Hypothesis until Google recrawls):

- **Docs, 14 pages.** 31 of 36 docs pages had no link from any page outside /docs. Google had only the docs sidebar to find them. Fixed today: 24 links from the 12 feature pages to their guide and reference pages.
- **Journey examples, 2 pages.** Each had 4 links in, all from sibling pages. Fixed today: one blog link each, plus a link from /features/journeys to the hub.
- **Festival pages, 24.** Published 1 Nov. Not judged before 16 Nov, as agreed. 8 are still unknown to Google, which points at the sitemap not being re-read. Owner action: resubmit the sitemap.
- **/blog/organic-ecommerce-leads-short-form-video.** Off topic for a Shopify app. Leave it. Decide on Day 14 whether to keep it.

Old URLs that still show impressions (/roi, /security, /booking, /solutions/beauty, /testimonials, six 2024 and 2025 blog posts, /features/live-chat) all return a 301 to a live page. In Search Console these sit under "Page with redirect". That is the correct end state, not an error. A validation started on that bucket will always end as failed, because the pages are still redirects.

### Structured data warnings (this is the "many errors")

Zero errors. All are warnings, and all come from two causes.

| Report in Search Console | Warning | Pages | Cause | Status |
|---|---|---|---|---|
| Merchant listings | Missing field "shippingDestination" (7 per page), "shippingDetails", "hasMerchantReturnPolicy", "validFrom", invalid "audience" | Every page carrying the app schema: 52 pages | The app was typed as SoftwareApplication AND Product. The Product type files a SaaS subscription as a shop product | Fixed today |
| Product snippets | Missing "aggregateRating", missing "review" | Same pages | Same | Fixed today |
| Videos | Invalid datetime value for "uploadDate", missing a timezone | Flagged on /features/journeys, /flow-builder and /opt-in-tools; fixed on all 4 pages with a video | Date written without a time or timezone | Fixed today |

Proof for the first fix: Google's Rich Results Test on 10 Nov. The live /pricing page is detected as Product snippets, Merchant listings and Software Apps. A plain SoftwareApplication with a priced offer is detected as Software Apps only. So the earlier code comment that Google "coerces" any app with a price into a merchant listing was wrong, and three rounds of adding shipping and return fields were chasing a problem the extra type created.

After deploy, the Merchant listings and Product snippets reports will empty out over one to three weeks. One warning stays under Software Apps: no rating or review. That needs real App Store reviews. Do not add review markup for your own testimonials: Google's policy excludes self-serving reviews.

**What I could not see:** which validation shows "Failed" in your account. The API does not expose validation status and the browser pane is not signed in to Search Console.

## 2. Rankings and demand

Non-brand queries on page 1 in the 30 days to 8 Nov (10 or more impressions): getkanal alternatives (2.0, 485 impressions), research shopify flow templates for cod to prepaid india (4.1), getgabs alternatives (5.1), best zoko alternative for shopify (6.5), whatsapp automation for shopify (9.0), top shopify support apps with whatsapp (9.2). That is the honest baseline: six queries.

Slipping: zoko alternative, position 26 on 236 impressions (was about 10 in October). Interakt alternative 25.1. Bitespeed alternative 18.8.

Local salon and spa queries: 0 impressions every day from 28 Oct to 8 Nov. That clean-up held.

India search volume (OpenSEO, 10 Nov) against the page that should own it:

| Keyword | Volume | KD | Owner page | Where we are |
|---|---|---|---|---|
| whatsapp link generator | 8,100 | 33 | /tools/whatsapp-link-generator | Position 15, 1 impression. Indexed since 8 Nov |
| whatsapp api pricing | 5,400 | 32 | /blog/whatsapp-business-api-pricing-india | Position 32, 10 impressions |
| wati pricing | 2,400 | 5 | /blog/wati-pricing-india | Built today |
| interakt pricing | 1,900 | 9 | /blog/interakt-pricing-india | Live 9 Nov |
| aisensy pricing | 1,600 | 12 | Day 6 | No page |
| gallabox pricing, gupshup pricing | 390 each | 0 to 1 | None | Gated: three pricing pages until signups show |
| rto in ecommerce | 390 | 0 | Day 7 | No page |
| whatsapp business api pricing india | 320 | 0 | Same post as above | Position 68 |
| shopify cod | 260 | 0 | Day 8 | No page |
| wati alternative | 260 | 0 | /blog/wati-alternative-shopify-india | Position 45 |
| whatsapp opt in | 260 | 0 | /blog/whatsapp-opt-in-shopify-india | Position 52 |
| aisensy alternative | 170 | none | /blog/aisensy-alternative-shopify-india | About 9 |
| shopify whatsapp integration | 170 | none | /shopify-whatsapp-integration | Position 12 |
| whatsapp team inbox | 140 | none | /blog/whatsapp-shared-inbox-shopify-order-context | A docs page ranks at 71 instead |

Traps confirmed or still open: "rto calculator" (390) is the transport office meaning. "ndr full form" (2,900) is unchecked: read the SERP on Day 7 before any page.

## 3. One keyword, one page

The 5 Nov refine list gave the same target to two or three pages in these places. Search Console shows the result: Google swaps URLs and none settles.

| Query | Pages competing (30 days to 8 Nov) | Owner from now | What the others do |
|---|---|---|---|
| shopify whatsapp automation | automation pillar (12.4), what-to-automate-first (33.8), checklist (67) | /blog/whatsapp-automation-for-shopify | The other two retarget to "what to automate first" and "automation checklist", and link to the pillar with the exact phrase |
| best whatsapp app for shopify | best-apps (14), automation pillar (24) | /blog/best-whatsapp-apps-for-shopify | Pillar links to it in the first 200 words |
| getkanal alternatives | Kanal post (2.0), /compare/kanal (3.8), /about, best-apps, /compare/alternatives | /blog/kanal-whatsapp-alternative-shopify | /compare/kanal owns "TopEdge AI vs Kanal" |
| zoko alternative | Zoko post (26), /, /compare, /compare/alternatives | /blog/zoko-alternative-shopify-india | Day 6 rework |
| wati vs aisensy | 3-way board (29.4), 4-way board (37.1) | 4-way board | 3-way board 301s to it on Day 14 |
| bitespeed pricing | Bitespeed post (23.3), /compare/bitespeed (27.7) | /blog/bitespeed-alternative-shopify-india | Board owns "TopEdge AI vs Bitespeed" |
| X alternative, all 10 competitors | blog post and compare board | Blog post | Board owns "TopEdge AI vs X" and X pricing where no pricing page exists |

The full map is the `primary_keyword` column of the CSV. It has no duplicate.

/features/meta-manager draws 106 impressions for "whatsapp flow template" at position 10.9. That query means Meta Flows, which TopEdge AI does not build. Do not chase it. The page's keyword is "whatsapp template approval shopify".

## 4. On-page, every page

Automatic checks on the built site, all 160 pages: title, description, canonical, single H1, JSON-LD, image alt, duplicates. Zero failures.

What the per-page table flags:

- **Feature pages are the weak spot.** 12 of 13 are under 600 words in the main content. /features/flow-builder, /chat-rules and /intent-detection carry no rupee figure. On most, the page's keyword is missing from the H1 and the opening. /features/cod-confirmation and /features/profit-loss (1,000 words, 33 and 41 rupee figures) are the pattern to copy.
- **Hubs are thin:** / (466 words), /features (520), /integrations (368), /compare (397), /customers (447), /tools (341). /integrations still has no rupee figure.
- **Blog:** every post has FAQ schema, a summary and 3 or more links each way. The gap is not on-page. It is which post owns which query, and authority.
- **Zero body links in:** /services, /about, /tools (they only have menu links).
- **No FAQ schema:** /compare/alternatives.

Rule for all of it: body and opening only. Titles stay as they are on comparison pages and on /blog/best-whatsapp-apps-for-shopify.

## 5. Off-page

- Ahrefs Domain Rating, free endpoint, 10 Nov: topedgeai.com 42, Updatrr 42, ChatMitra 44, Bitespeed 58, GoKwik 64, DelightChat 69. Caveat: DR counts links without judging them, and 43 of our 52 referring domains are spam, so our 42 is flattered.
- OpenSEO: 90 links, 54 domains, spam score 41. New and real: shopify.com (9 Nov), dev.to, heyapps.dev, Digismoothie's list (links the App Store listing).
- No disavow. Manual Actions was clean on 6 Nov. Spam links cannot be removed by us.
- The lever is unchanged: App Store reviews (0 showing), then inclusion in the lists that already rank, 5 honest emails at a time.
- Ahrefs API on the free plan still returns "Insufficient plan" for everything except Domain Rating.

Free tools worth turning on (owner signs in, I cannot create accounts): Bing Webmaster Tools (import from Search Console in two minutes: Bing and Copilot index data, backlinks, keyword research), Ahrefs Webmaster Tools (already set up: site audit and backlinks), Semrush free account (10 lookups a day, 100-page audit), Google Rich Results Test and PageSpeed Insights (no account).

## 6. AEO and GEO

- The OpenSEO AI tracker returned no scheduled run on 10 Nov. The 9 Nov weekly run did not happen or is not readable. Check the schedule on Day 6 (it costs about $23 a month, so owner approval before any change).
- What already works and must be kept: long prompts land on the COD to prepaid post (positions 2.2 and 4.1), the best-apps post (4.7) and the 4-way board (9).
- What to do: answer-first openings, dated tables, the canonical sentence everywhere, inclusion in third-party lists, App Store reviews. Not tactics: llms.txt, schema for AI, more self-ranked listicles.

## 7. Is the 14-day plan right? Changes

The order (stop damage, measure, build, earn) is right. Seven changes:

1. **Technical block added.** The plan called site health finished. It missed the schema type, video dates, docs with no inbound links and the sitemap re-read. Done today except the owner steps.
2. **One-owner keyword map replaces the refine list's targets.** Section 3.
3. **Link generator moves from Day 9 to Day 8.** It was waiting on indexing, which cleared on 8 Nov. It is the largest pool on the site (8,100 a month). Read the SERP first: if positions 3 to 10 are all large tool sites, set the target at page 2 and say so.
4. **WhatsApp API pricing refresh added on Day 9.** 5,400 a month, our post is at position 32, and the plan never scheduled it.
5. **Feature pages get three days, not one.** Days 10 to 12, four pages a day, body only.
6. **Retarget the two posts that fight the automation pillar** on Day 9, instead of deleting 80% of the pillar blind.
7. **Daily fixed routine** so nothing depends on memory: check yesterday's URLs in Search Console, one new or refreshed page with a SERP read, four body-only fixes from the CSV, at most five emails, IndexNow.

Not changed: three pricing pages only until signups show, no festival edits before 16 Nov, no new link exchanges, no disavow, one deploy a day.

### Revised days

| Day | Date | Claude | You |
|---|---|---|---|
| 6 | Wed 11 Nov | Zoko post and board rework (read zoko.io and the SERP first). /blog/aisensy-pricing-india. Check AI tracker schedule | Deploy Day 5. Resubmit sitemap. Validate fix on Videos. Request indexing: 2 pricing pages, 2 journey examples |
| 7 | Thu 12 Nov | /blog/rto-meaning-ecommerce. Bitespeed post rework (owns bitespeed pricing). SERP check on "ndr full form" | 5 emails. Request indexing: 6 docs pages |
| 8 | Fri 13 Nov | Link generator: SERP read, retitle, static worked example, about 2,000 words. /blog/best-whatsapp-apps-for-shopify body only | Test store for the COD setup post. Bing Webmaster Tools import |
| 9 | Sat 14 Nov | WhatsApp API pricing post refresh. Retarget what-to-automate-first and checklist. Automation pillar: Flows answer | Request indexing: remaining docs pages |
| 10 | Sun 15 Nov | Feature pages 1 to 4: journeys, flow-builder, ai-brain, campaigns. /compare/bitespeed and /compare/updatrr verdicts | 5 emails |
| 11 | Mon 16 Nov | Scorecard. Festival index check. Feature pages 5 to 8: analytics, meta-manager, audience-crm, chat-rules | Review requests to merchants |
| 12 | Tue 17 Nov | Feature pages 9 to 12: warranty, opt-in-tools, intent-detection, plus /integrations and /features hubs. /blog/net-profit-cod-orders-shopify-india | 5 emails |
| 13 | Wed 18 Nov | /blog/shopify-cod-setup-india (needs the test store). Interakt alternative rework. /blog/whatsapp-inr-billing only if Meta's page confirms the deadline | Follow-ups on Day 5 emails (7 to 10 day rule) |
| 14 | Thu 19 Nov | Final scorecard. Merge 3-way board into 4-way. Decide: off-topic posts, gallabox and gupshup pricing pages, festival pages | Manual Actions re-check |

### What each feature page gets (Days 10 to 12)

1. H1 and first two sentences carry the page's one keyword and answer "what is it and which plan has it".
2. One worked rupee example at 100, 500 or 1,500 orders, with the Meta rate dated.
3. An "Honest limits" block: what it does not do.
4. Two docs links (done today), one blog spoke link, one link to /pricing.
5. Title left alone unless Search Console shows the page has no impressions at all.

### Targets, stated honestly

No ranking is promised. By Day 14 the checkable goals are: 0 warnings left in Merchant listings and Product snippets, docs pages indexed 30 of 36 or more (22 today), 10 or more non-brand queries on page 1 (6 today), India category impressions above 30 a day (23 today). If India impressions are flat or down on 16 Nov, the stop rule in the plan applies.

## 8. Search Console read in the browser, 10 Nov 2026 (reports last updated 6 Nov)

Indexed 145, not indexed 75. Every "Failed" validation, and what it really is:

| Reason | Pages | Validation | URLs | Verdict |
|---|---|---|---|---|
| Page with redirect | 9 | Failed 7 Nov | www and http home, /agency, /testimonials, /security, /privacy-policy, /features/live-chat, /booking | Correct 301s. Will always fail validation. Leave |
| Alternative page with proper canonical | 7 | Failed 7 Nov | 3 trailing-slash copies, 4 dash.topedgeai.com app pages | Canonical is doing its job. Leave |
| Soft 404 | 2 | Failed 7 Nov | /features/campaigns/ (crawled 29 Oct, before the render fix; the no-slash URL is indexed), /solutions/beauty (now a 301) | Clears on recrawl |
| Excluded by noindex | 2 | Failed 7 Nov | /signup, dash.topedgeai.com/ | Intended |
| Crawled, currently not indexed | 13 | Failed 7 Nov | 5 were indexed by 8 to 10 Nov per URL Inspection (warranty, conversation-pricing, RTO calculator, whatsapp-broadcast, journey examples hub); 3 are old URLs that now 301; /pricing?utm_source=F6S; festival hub; cod-to-prepaid journey | Report lags. 2 real pages left, both linked today |
| Duplicate, Google chose different canonical | 1 | Not started | dash.topedgeai.com/docs/ | Old docs host, 301s to the new docs. Leave |
| Blocked, 403 | 1 | Started | api.topedgeai.com/ | An API, not a page. Leave |
| Discovered, currently not indexed | 40 | Started 9 Oct | Docs, festival pages, 1 off-topic post | Docs linked today; festival judged 16 Nov |

Enhancements: Merchant listings 9 valid, 0 invalid, 5 warning types. Product snippets 9 valid, 2 warning types. Videos 3 valid, 2 warning types. Breadcrumbs 76 valid, no issues. Review snippets 0 items. All warnings are the ones fixed in today's build.

Video indexing: 0 of 7 indexed, "Video isn't on a watch page", validation Failed. Google only indexes a video when the video is the main content of its page. A feature page is not a watch page, so this will keep failing and should not be validated again. The real route is YouTube demos.

Sitemap: read 10 Nov, Success, 159 pages. No resubmit needed. Manual actions: none. Security issues: none. HTTPS: 82 URLs, no issues. Core Web Vitals: not enough field data.

Conclusion: no validation failed because of a live defect. Stop pressing Validate fix on redirect, canonical, noindex and watch-page buckets.

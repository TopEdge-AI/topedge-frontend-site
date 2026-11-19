# TopEdge AI SEO: 15-day plan and daily log (18 Nov to 2 Dec 2026)

**This file is the one plan and the one log.** It lives in the repo so every Claude account and session can read it. Every session reads it first and writes its day's log row at the end. It replaces the claude.ai docs (NNh35xPQKRDFbPQFoPyrEz and Rapg6dht2P14bug5nC7xH4) and `2026-11-15/00-AUDIT-AND-14-DAY-PLAN.md` from Day 1 below. Research from 15 Nov in `2026-11-15/` still stands.

## 1. Goal

Move our ICP pages that already rank on Google pages 2 to 5 (average position 11 to 50) up to page 1. No new pages for impressions' sake.

- **ICP only:** Indian Shopify D2C brands, 100 to 1,500 orders a month, heavy COD. Queries about WhatsApp for Shopify, cart recovery, COD, RTO, and named rivals (Interakt, WATI, AiSensy, Bitespeed, Zoko, Updatrr).
- **Ignore:** spa and salon queries (other businesses' listings), /blog/shopify-seo-experts and /blog/best-shopify-upsell-apps traffic, "getkanal alternatives" (non-India noise), consumer queries (whatsapp web, qr code download), Meta Flows ("whatsapp flows shopify"), and the traps in DAILY-PROMPT section 4.
- **No ranking is promised.** Pages that reach page 1 usually need links and reviews as well as on-page work.

## 2. Every day, in this order

1. **Read** this file (plan, last log row, open items), memory, then `git fetch`, `git status` and `git log` (other sessions push to the same branch).
2. **Search Console (OpenSEO, free):** index state of yesterday's page (`inspect_urls`); its queries since the change; refresh the striking-distance list: `get_search_console_performance`, dimensions query + page, country = ind, last 28 days, minPosition 8, minImpressions 3, excluding "spa". Re-rank the remaining days if a page moved.
3. **OpenSEO:** `whoami` credits. Mondays: rank tracker 6a2f82e0 results and `get_backlinks_overview` for topedgeai.com.
4. **Ahrefs site audit** (built-in browser, app.ahrefs.com, project 10574646): health score, errors and warnings. Fix real errors on topedgeai.com; ignore dash.topedgeai.com rows. If it shows the login page, tell the owner and move on.
5. **Keyword cluster check** for the day's page: one `get_keyword_metrics` call (India, 2356, en) for its query family; read the live India SERP (`get_serp_results`, mobile, `finalUrls: true`, collect after 2 to 3 minutes).
6. **Day's page, the full audit:**
   1. Save its Search Console export: `seo-audit/<date>/page-audits/<page>/gsc-export-*.csv` (query, clicks, impressions, CTR, position; India 28 days and all countries 3 months).
   2. Run the on-page audit tool against the top 3 India results that rank above us:
      `node seo-audit/tools/onpage-audit.mjs <our-url> "<keyword>" seo-audit/<date>/page-audits/<page>/before <comp1> <comp2> <comp3>`
      (It drives https://exploremayank.in/tools/free-on-page-seo-audit-tool/ and saves `onpage-audit.pdf` and `.txt`.)
   3. Run `seo-audit/PAGE-ANALYSIS-PROMPT.md` on that export and the tool output. Write the report as HTML and render it: `node seo-audit/tools/html-to-pdf.mjs <in.html> <out.pdf>` → `analysis-report.pdf`.
   4. Re-read every competitor price the page states, then implement the report's changes (DAILY-PROMPT sections 3 and 5 apply).
   5. After deploy, re-run the tool into `.../after/`. Add `?v=<date>` to our URL: the tool caches pages by URL and otherwise audits the old copy.
7. **Two body-only fixes** on other ICP blog posts from the striking-distance list or the `auto_flags` column of `2026-11-10/01-page-by-page-audit.csv`.
8. **Off-page:** the day's off-page item from the table below. Drafts only; the owner sends. At most 20 sends a week.
9. **Build and ship:** `npm run build:netlify` (exit 0), dist audit of changed pages, preview check, commit, push to `update-pricing` (one deploy a day), live check.
10. **Index:** `npm run indexnow -- <urls>`, OpenSEO `submit_indexnow_urls` (Bing, Yandex and others), and the owner's Search Console Request indexing list (full URLs).
11. **Log:** add the day's row to section 5 and tick its status in section 3. Update memory only with new facts.

## 3. The 15 days

**Day numbers are the owner's count: Day 1 = 15 Nov, Day 2 = 16 Nov, Day 3 = 18 Nov, one number per working session.** When the owner says "Day N", run the row labelled Day N. If that row is already Done, run the first row below it that is not Done and say so in one line. Days 1 and 2 ran the 15 Nov plan (section 7). Scorecards: every Monday, Day 10 (25 Nov) and Day 17 (2 Dec).

Baselines are India, Search Console, 21 Oct to 17 Nov 2026 (Verified 18 Nov). Re-rank each morning from step 2; skip a page that has already reached page 1.

| Day | Date | Page | Main queries (India impr. @ avg position) | Off-page item | Status |
|---|---|---|---|---|---|
| 3 | Wed 18 Nov | /blog/interakt-alternative-shopify-india | interakt alternative 62 @ 22.3; best interakt alternative 15 @ 25.5 | 3 list emails ready (martech.zone, thed2cpulse, lilachbullock) | Done |
| 4 | Thu 19 Nov | /blog/aisensy-alternative-shopify-india | aisensy vs gallabox 19 @ 17.6; best aisensy alternative 11 @ 17.4 | Review asks follow-up (owner) | Done 19 Nov |
| 5 | Fri 20 Nov | /blog/whatsapp-automation-for-shopify (pillar) | shopify whatsapp automation 19 @ 10.7; whatsapp automation for shopify 13 @ 10.2; whatsapp marketing shopify 12 @ 30.8; whatsapp for shopify 9 @ 20.8. Do not chase "whatsapp flows shopify" | Bing Webmaster import (owner, 5 min) | Planned |
| 6 | Sat 21 Nov | /blog/bitespeed-alternative-shopify-india | bitespeed alternative 44 @ 18.5; bitespeed pricing 8 @ 23.3. The 17 Nov session already added a "Bitespeed pricing" section and labelled the ₹15,000 figure as third-party; build on it | Submit SourceForge, productgrowth.in, costbench (owner) | Planned. Note 19 Nov: bitespeed.co/pricing now 301s to /request-demo; re-read before stating anything |
| 7 | Sun 22 Nov | /blog/best-whatsapp-apps-for-shopify (body only, title locked) | best whatsapp app for shopify 39 @ 20.9 (7 clicks); shopify whatsapp app 4 @ 58 | YouTube demo 1: COD confirmation (owner) | Planned |
| 8 | Mon 23 Nov | /compare/topedge-vs-wati-vs-interakt-vs-aisensy and /compare/topedge-vs-wati-vs-aisensy (body only) | wati vs aisensy 21 @ 39.8 and 9 @ 29.4 | 3 emails from `2026-11-15/04` (codingclave, echai.ventures, D2C Ignite) | Planned |
| 9 | Tue 24 Nov | /blog/aisensy-pricing-india | aisensy pricing 16 @ 15.5 | G2 claim and Crunchbase check (owner) | Planned |
| 10 | Wed 25 Nov | Mid-point scorecard and stop-rule check, then /blog/interakt-pricing-india | interakt pricing 14 @ 16.1 | Follow up on the Day 3 (18 Nov) emails, 7 days on | Planned |
| 11 | Thu 26 Nov | /blog/whatsapp-abandoned-cart-recovery-shopify | whatsapp cart recovery 17 @ 72.6; whatsapp abandoned cart recovery 6 @ 57.7; whatsapp abandoned checkout recovery 3 @ 12.3 | YouTube demo 2: cart recovery (owner) | Planned |
| 12 | Fri 27 Nov | /blog/wati-alternative-shopify-india and /blog/wati-pricing-india | wati alternative india 10 @ 37.9; wati pricing 4 @ 40.8 | 3 emails to independent lists ranking for "wati alternative" | Planned |
| 13 | Sat 28 Nov | /blog/zoko-alternative-shopify-india only if India position is above 15 again; else /blog/best-shopify-app-for-abandoned-cart-recovery-india | zoko alternative 73 @ 12.6 (recovered to 9.1 on 17 Nov); best shopify abandoned cart app 10 @ 40.1 | App Store listing name and review round 2 (owner) | Planned |
| 14 | Sun 29 Nov | /blog/whatsapp-business-api-pricing-india | whatsapp business api pricing @ 36.5; whatsapp api pricing @ 52 (5,400 a month India volume) | AlternativeTo and SaaSHub listings (owner) | Planned |
| 15 | Mon 30 Nov | /tools/whatsapp-link-generator: win QR searches on the existing page (no new URL) | whatsapp qr code generator 1,300 KD1; create whatsapp qr code 1,300 (volumes, not yet ranking) | 3 emails | Planned |
| 16 | Tue 1 Dec | /blog/shopify-whatsapp-automation-what-to-automate-first (it competes with the pillar for "shopify whatsapp automation", 10 @ 39.2) and /features/cod-confirmation (7 impressions @ 24.1) | Cannibalisation fix | YouTube demo 3: COD to prepaid (owner) | Planned |
| 17 | Wed 2 Dec | Final scorecard against section 4, then write the next plan from what moved | | Off-page review | Planned |

## 4. Targets for 2 Dec (Estimates, not promises)

| Measure | 18 Nov baseline | Target |
|---|---|---|
| Day pages with main query at India position 10 or better | 0 of 13 | 4 |
| India non-brand clicks, 7 days | about 1 | 5 |
| App Store reviews | 0 | 3 |
| Real referring domains gained | 0 | 3 |
| Ahrefs site audit health (topedgeai.com only) | 100 on the 18 Nov crawl (read 19 Nov); AI Discoverability 87 (beta) | 95+ |

Stop rule (kept from 15 Nov): if India commercial impressions are flat two weeks running, stop page rewrites and put the days into reviews, list inclusion and links.

## 5. Daily log (newest first)

| Day | Date | Page and what changed | Audit files | Off-page | Not done | Commit |
|---|---|---|---|---|---|---|
| 4 | Thu 19 Nov | /blog/aisensy-alternative-shopify-india: title and H1 now "AiSensy Alternative (2027): AiSensy vs Gallabox" (60 chars with suffix), new description (149), new summary and verdict with dated numbers, hub link to /blog/best-whatsapp-apps-for-shopify in the first 200 words. New H2 "AiSensy vs Gallabox: price, message rates and Shopify features" (10-row table), worked bill at 100, 500 and 1,500 orders (AiSensy Basic, AiSensy plus Chatbot Flows, Gallabox Basic, TopEdge AI), "where Gallabox is better" and "where AiSensy is better". Corrected: Gallabox Shopify depth (its page names cart reminders, COD order updates and COD to prepaid), AiSensy COD confirmation (named on its listing), AiSensy limits bullets, TopEdge AI vs AiSensy table, two FAQs; new FAQ "AiSensy vs Gallabox: which is cheaper?". Re-read 19 Nov: AiSensy pricing (all 3 views, unchanged), AiSensy listing (4.1 from 57, ₹93.47), Gallabox pricing (quarterly ₹2,999/₹6,999/₹16,999, yearly ₹2,399/₹5,599/₹13,599, no monthly), Gallabox INR rate card (₹0.9926 / ₹0.1323), Gallabox Shopify page, Interakt (unchanged); 3 new sources.ts entries. Tool score before 88 (us), 93 WANotifier, 78 Gallabox, 42 G2 (blocked). Body fixes: /blog/how-to-automate-ecommerce-store-india no longer calls TopEdge AI a Meta BSP; /blog/aisensy-pricing-india reading dates to 19 Nov plus link to the new section. Sitewide from Ahrefs and GSC: 4 moved external links fixed (Eshopbox, NimbusPost, ReConvert, Shopify Community), festival detail pages now link the next 3 festivals in calendar order (10 had only the hub link), ItemList on /compare/alternatives | `2026-11-19/page-audits/aisensy-alternative/` (gsc-export-india-28-days.csv, gsc-export-all-countries-3-months.csv, before/onpage-audit.pdf, analysis-report.pdf) | Review asks: `2026-11-19/01-day-4-review-asks.md`. The 25 Oct asks were never marked sent, so these are first asks plus one follow-up for 7 to 10 days later. App Store verified 19 Nov: "No reviews yet"; name now "TopEdge AI: WA COD & Cart" | Pillar and Bitespeed pages not run; they are now Days 5 and 6. Ahrefs "Article page missing Article schema" (78) left: 45 docs pages already carry TechArticle (Ahrefs beta does not count it), the rest are product and festival pages where Article would be inaccurate. Software App "missing aggregateRating" (52 pages) left: only real App Store reviews fix it. GSC: 38 discovered-not-indexed (23 festival, 13 docs, 1 journey example, 1 off-topic post) need crawl, not code; 6 crawled-not-indexed are already 301s or a UTM canonical; soft 404 and 403 are /features/campaigns/ and api.topedgeai.com, both fine. Live 19 Nov (8ff08c1), 8 changed URLs checked live (HTTP 200, new content present); tool score after: 94 (was 88), 0 fails (was 2), keyword now in title and description, 5,065 words (`after/`); 32 URLs sent to IndexNow (repo script HTTP 200, OpenSEO 32 submitted); Request indexing list given to owner | 8ff08c1 |
| 3 | Wed 18 Nov | /blog/interakt-alternative-shopify-india: title and H1 now "Interakt Alternative for Shopify India (2027)" (owner's 2027 rule), new description, 5-row dated shortlist table, migration checklist (replaces switch test), AI cost table moved to the plan the scenario needs (Growth, 500 orders), side-by-side adds COD confirmation and reviews rows, COD-to-prepaid line corrected, AI FAQ added, every price re-read 18 Nov. Tool score before: 90 (us), 81 WatsBerry, 78 CampaignHQ, 39 softwares.com. Also shipped (old plan Day 3): /whatsapp-templates copy cards, utility vs marketing table, rupee bill, order confirmation table; cart post template table; cart timings fixed on 3 pages; /compare, RTO calculator, tool finder openings | `2026-11-18/page-audits/interakt-alternative/` (before/onpage-audit.pdf, analysis-report.pdf, gsc-export-3-months.csv) | Drafts: `2026-11-18/01-day-3-outreach-drafts.md` (3 ready, Growave and the4.co held: their lists already cover COD) | Ahrefs site audit: built-in browser signed out of Ahrefs. Live 18 Nov (commits 10696b1, a03c484, 498aded); tool score after: 98 (was 90), 0 fails, 2,071 words (`after/`); 7 URLs sent to IndexNow (repo script and OpenSEO, HTTP 200); Request indexing list given to owner | 498aded |

## 6. Open items for the owner

- [x] Sign in to Ahrefs in the built-in browser (done 19 Nov; health 100, AI Discoverability 87).
- [ ] Send the 3 emails from Day 3, 18 Nov (`2026-11-18/01-day-3-outreach-drafts.md`).
- [x] App Store name: verified 19 Nov as "TopEdge AI: WA COD & Cart".
- [ ] Send the 3 App Store review asks in `2026-11-19/01-day-4-review-asks.md` and mark them sent; follow up once after 7 to 10 days.
- [ ] Request indexing (Search Console) for the Day 4 URLs listed in the Day 4 report.
- [ ] Decide: Ahrefs AI Discoverability counts 78 "article" pages without Article schema. Recommendation: leave it (docs already have TechArticle; features are product pages). Say if you want TechArticle also typed as Article for Ahrefs.
- [ ] Bing Webmaster Tools: import the site from Search Console (IndexNow pings already reach Bing).
- [ ] Brand sentence: canonical sentence vs the 15 Nov category line (canonical sentence is in no src file).
- [ ] Profit calculator: build or not (was old Day 9).

## 7. History

- 15 and 16 Nov: the 15 Nov plan's Days 1 and 2 shipped (`2026-11-15/00-AUDIT-AND-14-DAY-PLAN.md`, Progress log).
- 17 Nov: a cloud session ran the 10 Nov plan's Day 7 (RTO hub): shipping aggregators post, NDR section, Bitespeed pricing section, blog list cards, plus many feature-page films. It used the older 10 Nov plan's numbers and has no number in the owner's count.
- Owner rules from 17 Nov that still apply: use 2027 (not 2026) in new or rewritten titles, descriptions and headings, keep reading dates as they are; never mention business arrangements (link exchanges, agreed listings) in published copy.
- **Always `git fetch` before reading the log.** On 18 Nov the local checkout was 30 commits behind GitHub, which hid the 17 Nov work until the push was rejected.
- 18 Nov: owner replaced the remaining days with this page-2-to-page-1 plan.
- 19 Nov: the 18 Nov session gave two different day numbers ("say Day 4", then "say Day 2"), so this file had restarted at Day 1 = 18 Nov while the owner kept counting from 15 Nov. Fixed the same day: the table and log now use the owner's count (18 Nov = Day 3, 19 Nov = Day 4). The AiSensy page ran on 19 Nov as Day 4; the pillar and Bitespeed pages became Days 5 and 6; every later page keeps its date. The owner also asked for a full Ahrefs and Search Console sweep on 19 Nov (results in the Day 4 row).

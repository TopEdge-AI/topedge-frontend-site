# TopEdge AI SEO: 15-day plan and daily log (18 Nov to 2 Dec 2026)

**This file is the one plan and the one log.** It lives in the repo so every Claude account and session can read it. Every session reads it first and writes its day's log row at the end. It replaces the claude.ai docs (NNh35xPQKRDFbPQFoPyrEz and Rapg6dht2P14bug5nC7xH4) and `2026-11-15/00-AUDIT-AND-14-DAY-PLAN.md` from Day 1 below. Research from 15 Nov in `2026-11-15/` still stands.

## 1. Goal

Move our ICP pages that already rank on Google pages 2 to 5 (average position 11 to 50) up to page 1. No new pages for impressions' sake.

- **ICP only:** Indian Shopify D2C brands, 100 to 1,500 orders a month, heavy COD. Queries about WhatsApp for Shopify, cart recovery, COD, RTO, and named rivals (Interakt, WATI, AiSensy, Bitespeed, Zoko, Updatrr).
- **Ignore:** spa and salon queries (other businesses' listings), /blog/shopify-seo-experts and /blog/best-shopify-upsell-apps traffic, "getkanal alternatives" (non-India noise), consumer queries (whatsapp web, qr code download), Meta Flows ("whatsapp flows shopify"), and the traps in DAILY-PROMPT section 4.
- **No ranking is promised.** Pages that reach page 1 usually need links and reviews as well as on-page work.

## 2. Every day, in this order

1. **Read** this file (plan, last log row, open items), memory, `git status` and `git log`.
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
   5. After deploy, re-run the tool into `.../after/`.
7. **Two body-only fixes** on other ICP blog posts from the striking-distance list or the `auto_flags` column of `2026-11-10/01-page-by-page-audit.csv`.
8. **Off-page:** the day's off-page item from the table below. Drafts only; the owner sends. At most 20 sends a week.
9. **Build and ship:** `npm run build:netlify` (exit 0), dist audit of changed pages, preview check, commit, push to `update-pricing` (one deploy a day), live check.
10. **Index:** `npm run indexnow -- <urls>`, OpenSEO `submit_indexnow_urls` (Bing, Yandex and others), and the owner's Search Console Request indexing list (full URLs).
11. **Log:** add the day's row to section 5 and tick its status in section 3. Update memory only with new facts.

## 3. The 15 days

Baselines are India, Search Console, 21 Oct to 17 Nov 2026 (Verified 18 Nov). Re-rank each morning from step 2; skip a page that has already reached page 1.

| Day | Date | Page | Main queries (India impr. @ avg position) | Off-page item | Status |
|---|---|---|---|---|---|
| 1 | Wed 18 Nov | /blog/interakt-alternative-shopify-india | interakt alternative 62 @ 22.3; best interakt alternative 15 @ 25.5 | 3 list emails ready (martech.zone, thed2cpulse, lilachbullock) | Done |
| 2 | Thu 19 Nov | /blog/whatsapp-automation-for-shopify (pillar) | shopify whatsapp automation 19 @ 10.7; whatsapp automation for shopify 13 @ 10.2; whatsapp marketing shopify 12 @ 30.8; whatsapp for shopify 9 @ 20.8. Do not chase "whatsapp flows shopify" | Bing Webmaster import (owner, 5 min) | Planned |
| 3 | Fri 20 Nov | /blog/bitespeed-alternative-shopify-india | bitespeed alternative 44 @ 18.5; bitespeed pricing 8 @ 23.3. Fix the unsourced ₹15,000 FAQ | Submit SourceForge, productgrowth.in, costbench (owner) | Planned |
| 4 | Sat 21 Nov | /blog/aisensy-alternative-shopify-india | aisensy vs gallabox 19 @ 17.6; best aisensy alternative 11 @ 17.4 | Review asks follow-up (owner) | Planned |
| 5 | Sun 22 Nov | /blog/best-whatsapp-apps-for-shopify (body only, title locked) | best whatsapp app for shopify 39 @ 20.9 (7 clicks); shopify whatsapp app 4 @ 58 | YouTube demo 1: COD confirmation (owner) | Planned |
| 6 | Mon 23 Nov | /compare/topedge-vs-wati-vs-interakt-vs-aisensy and /compare/topedge-vs-wati-vs-aisensy (body only) | wati vs aisensy 21 @ 39.8 and 9 @ 29.4 | 3 emails from `2026-11-15/04` (codingclave, echai.ventures, D2C Ignite) | Planned |
| 7 | Tue 24 Nov | /blog/aisensy-pricing-india | aisensy pricing 16 @ 15.5 | G2 claim and Crunchbase check (owner) | Planned |
| 8 | Wed 25 Nov | Mid-point scorecard and stop-rule check, then /blog/interakt-pricing-india | interakt pricing 14 @ 16.1 | Follow up on Day 1 emails (7 days) | Planned |
| 9 | Thu 26 Nov | /blog/whatsapp-abandoned-cart-recovery-shopify | whatsapp cart recovery 17 @ 72.6; whatsapp abandoned cart recovery 6 @ 57.7; whatsapp abandoned checkout recovery 3 @ 12.3 | YouTube demo 2: cart recovery (owner) | Planned |
| 10 | Fri 27 Nov | /blog/wati-alternative-shopify-india and /blog/wati-pricing-india | wati alternative india 10 @ 37.9; wati pricing 4 @ 40.8 | 3 emails to independent lists ranking for "wati alternative" | Planned |
| 11 | Sat 28 Nov | /blog/zoko-alternative-shopify-india only if India position is above 15 again; else /blog/best-shopify-app-for-abandoned-cart-recovery-india | zoko alternative 73 @ 12.6 (recovered to 9.1 on 17 Nov); best shopify abandoned cart app 10 @ 40.1 | App Store listing name and review round 2 (owner) | Planned |
| 12 | Sun 29 Nov | /blog/whatsapp-business-api-pricing-india | whatsapp business api pricing @ 36.5; whatsapp api pricing @ 52 (5,400 a month India volume) | AlternativeTo and SaaSHub listings (owner) | Planned |
| 13 | Mon 30 Nov | /tools/whatsapp-link-generator: win QR searches on the existing page (no new URL) | whatsapp qr code generator 1,300 KD1; create whatsapp qr code 1,300 (volumes, not yet ranking) | 3 emails | Planned |
| 14 | Tue 1 Dec | /blog/shopify-whatsapp-automation-what-to-automate-first (it competes with the pillar for "shopify whatsapp automation", 10 @ 39.2) and /features/cod-confirmation (7 impressions @ 24.1) | Cannibalisation fix | YouTube demo 3: COD to prepaid (owner) | Planned |
| 15 | Wed 2 Dec | Final scorecard against section 4, then write the next plan from what moved | | Off-page review | Planned |

## 4. Targets for 2 Dec (Estimates, not promises)

| Measure | 18 Nov baseline | Target |
|---|---|---|
| Day pages with main query at India position 10 or better | 0 of 13 | 4 |
| India non-brand clicks, 7 days | about 1 | 5 |
| App Store reviews | 0 | 3 |
| Real referring domains gained | 0 | 3 |
| Ahrefs site audit health (topedgeai.com only) | not read 18 Nov (signed out) | 95+ |

Stop rule (kept from 15 Nov): if India commercial impressions are flat two weeks running, stop page rewrites and put the days into reviews, list inclusion and links.

## 5. Daily log (newest first)

| Day | Date | Page and what changed | Audit files | Off-page | Not done | Commit |
|---|---|---|---|---|---|---|
| 1 | Wed 18 Nov | /blog/interakt-alternative-shopify-india: title and H1 now "Interakt Alternative for Shopify India (2026)", new description, 5-row dated shortlist table, migration checklist (replaces switch test), AI cost table moved to the plan the scenario needs (Growth, 500 orders), side-by-side adds COD confirmation and reviews rows, COD-to-prepaid line corrected, AI FAQ added, every price re-read 18 Nov. Tool score before: 90 (us), 81 WatsBerry, 78 CampaignHQ, 39 softwares.com. Also shipped (old plan Day 3): /whatsapp-templates copy cards, utility vs marketing table, rupee bill, order confirmation table; cart post template table; cart timings fixed on 3 pages; /compare, RTO calculator, tool finder openings | `2026-11-18/page-audits/interakt-alternative/` (before/onpage-audit.pdf, analysis-report.pdf, gsc-export-3-months.csv) | Drafts: `2026-11-18/01-day-3-outreach-drafts.md` (3 ready, Growave and the4.co held: their lists already cover COD) | Ahrefs site audit: built-in browser signed out of Ahrefs. "After" tool run waits for the deploy | see git log |

## 6. Open items for the owner

- [ ] Sign in to Ahrefs in the built-in browser so the daily site audit check can run.
- [ ] Send the 3 Day 1 emails (drafts file above).
- [ ] App Store name: now "TopEdgeAI: WA Cart Recovery" (no space, no COD). Suggested: "TopEdge AI: WA COD & Cart" (25 characters).
- [ ] Bing Webmaster Tools: import the site from Search Console (IndexNow pings already reach Bing).
- [ ] Brand sentence: canonical sentence vs the 15 Nov category line (canonical sentence is in no src file).
- [ ] Profit calculator: build or not (was old Day 9).

## 7. History

- 15 to 17 Nov: the 15 Nov plan's Days 1 and 2 shipped (`2026-11-15/00-AUDIT-AND-14-DAY-PLAN.md`, Progress log). Nothing ran on 17 Nov.
- 18 Nov: owner replaced the remaining days with this page-2-to-page-1 plan.

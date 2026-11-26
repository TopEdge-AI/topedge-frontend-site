# Staying safe through Google updates: what we read on 26 Nov 2026 and the gate every page now passes

The owner asked (26 Nov 2026) for a way to make sure TopEdge AI never goes the way of sites that grow and then drop to zero after a Google update. This file is the evidence. The short rules live in `.claude/skills/google-search-policies/SKILL.md` (the penalty-safety gate), and every day-skill now calls it. It extends `2026-11-20/01-google-ai-content-guidance.md`, which still stands.

Everything below was read in the built-in browser on 26 Nov 2026 unless marked.

## 1. Google's ranking incident history (Search Status Dashboard, Ranking)

Source: https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history, read in full, plus each 2026 incident page.

| Update | Started | Ended | What Google said |
|---|---|---|---|
| **December 2026 core update** | Pre-announced 24 Nov 2026 | Ongoing ("scheduled to be released in December 2026") | "focuses on multiple improvements to how our systems understand and rank relevant content (including for longer and more complex questions), as well as improving personalized results for people who have personalization turned on." All locations and languages. |
| November 2026 core update | 10 Nov 2026 | 24 Nov 2026 | Global, all languages. |
| September 2026 spam update | 24 Sep 2026 | 8 Oct 2026 | Global, all languages. |
| August 2026 spam update | 18 Aug 2026 | 21 Aug 2026 | Global. |
| June 2026 spam update | 24 Jun 2026 | 26 Jun 2026 | Global. |
| May 2026 core update | 21 May 2026 | 2 Jun 2026 | |
| March 2026 core update | 27 Mar 2026 | 8 Apr 2026 | |
| March 2026 spam update | 24 Mar 2026 | 25 Mar 2026 | |
| February 2026 Discover update | 5 Feb 2026 | 27 Feb 2026 | US English Discover only. |
| December 2025 core update | 11 Dec 2025 | 29 Dec 2025 | |
| August 2025 spam update | 26 Aug 2025 | 22 Sep 2025 | |
| June 2025 core update | 30 Jun 2025 | 17 Jul 2025 | |
| March 2025 core update | 13 Mar 2025 | 27 Mar 2025 | |

Earlier entries (2021 to 2024) include the helpful content updates (Aug 2022, Dec 2022, Sep 2023), product and reviews updates, link spam (Dec 2022) and the March 2024 core update (45 days), which is when the helpful content system was folded into core ranking.

**What this means for us (Estimate):** in 2026 Google ran 4 core updates and 4 spam updates, roughly one every 5 to 6 weeks. The sites that "go to zero" in these updates are the ones the spam policies and the rater guidelines describe: mass-produced pages, pages for keywords rather than readers, borrowed authority, bought links, and dates moved to look fresh. TopEdge AI is a young site (first property in Search Console 6 May 2026), so most of its risk is in how fast it publishes and how similar its pages are to each other, not in links.

**What this means right now (26 Nov 2026):** the November core update finished on 24 Nov and the December one is coming. Google's guidance is to wait at least a full week after an update completes before judging traffic, and to compare the week after with the week before the update started. So the Day 10 mid-point scorecard reads 3 Nov to 9 Nov against 25 Nov onward, and no page is rewritten because of a move inside a rollout window.

## 2. What Google says to do around core updates

Source: https://developers.google.com/search/docs/appearance/core-updates (last updated 10 Dec 2025).

- Core updates "don't target specific sites or individual web pages"; a page that moves down "isn't necessarily bad".
- Check the Status Dashboard for start and end dates. Wait at least a week after completion, then compare the week before the update with the week after.
- Small drop (position 2 to 4): no drastic action; avoid changing content that already performs well. Large drop (4 to 29): self-assess the site as a whole against the people-first questions, and look at the most affected pages.
- Avoid "quick fix" changes. Deleting content is a last resort.
- Recovery can take months; smaller unannounced core updates also move pages.

## 3. New Google documentation since our 20 Nov reading

Source: https://developers.google.com/search/updates

- **24 Nov 2026, a ranking section.** "Our principles for ranking results": every result type is judged by utility to the query; Google says it makes no manual ranking adjustments except for legal obligations and its content policies; helpfulness is measured against the Search Quality Rater Guidelines.
- **24 Nov 2026, "Attribution and factuality in Search generative AI features".** AI Overviews and AI Mode ground answers in the Search index, run "query fan-out" searches, and link pages that corroborate the claims. To be linked accurately: be indexed and snippet-eligible, stay included in the "Search generative AI" control in Search Console, put important information in text, give clear sourcing and background about the author or site (author pages or an About page), check pages for factual errors, and **"Avoid changing a page's date unless the content has substantially changed."**
- **24 Nov 2026, "Control how your content is used for generative AI at Google".** The Search generative AI control lives in Search Console settings and "isn't used as a ranking or inclusion signal for other parts of Google Search". Google-Extended is not a Search ranking signal.
- **23 Nov 2026, back button hijacking FAQ** (malicious practices): third-party ad code is allowed; action is taken only on pages that interfere with the back button, whichever channel the visitor came from.
- 12 Nov 2026: identifying Google Search traffic by HTTP Referer. 1 Oct 2026: the generative AI content guide took in rater-guideline material (read 20 Nov).

## 4. Checks run on our own site today

| Check | Result | Where |
|---|---|---|
| Search Console Manual actions | No issues detected | Search Console, read only |
| Search Console Security issues | No issues detected | Search Console, read only |
| Search Console AI controls | "Search generative AI: Include" | Settings, read only |
| robots.txt in Search Console | "All files are valid"; 8.67k crawl requests in 90 days | Settings |
| Back button hijacking | No `pushState`, `replaceState`, `popstate` or `beforeunload` handlers in `src/` or `scripts/lp/` | grep, 26 Nov |
| Spam-policy table (section 7 of the 20 Nov file) | Still current: the 26 Nov reading of the spam policies page shows the same policies plus the back-button FAQ | developers.google.com/search/docs/essentials/spam-policies |

## 5. Why sites "suddenly go to zero", and our guard for each

| Cause seen on sites that collapse | What Google's documents call it | Our guard |
|---|---|---|
| Hundreds of near-identical pages (cities, industries, "best X for Y" variants, AI batches) | Scaled content abuse, doorway abuse | At most one blog page and one landing page a day; every page passes the people-first audit; no page shares more than a short CTA with another; festival pages frozen. |
| Pages written for a keyword, with filler at the top and no first-hand value | Low-quality main content (rater guidelines 5.2.1, 5.2.2); core updates | Answer in the first sentence; one dated first-hand element per page; question research decides headings. |
| Facts that are wrong or out of date | Self-assessment: "easily verified factual errors" | Fact-check gate: every number on a changed page is in `sources.ts` with a date, in our billing catalog, or marked as our arithmetic; `seo-audit/tools/fact-check.mjs` lists anything else. |
| Dates bumped to look fresh | Named warning sign in "Creating helpful content" and in the 24 Nov attribution page | The visible Updated date moves only when content substantially changed. |
| Bought links, link exchanges, PBNs, guest-post networks | Link spam | None. Off-page is reviews, list inclusion on merit, real partner pages, tools. |
| Hosting other people's content to rank on our domain | Site reputation abuse | No guest posts, sponsored posts or partner-written pages on topedgeai.com. |
| Fake authors, invented experience, invented reviews | Deceptive creator profiles (rater guidelines 4.5.3); fake reviews guideline (24 Jul 2026) | Bylines are Moksh Patel or Smit Tilva; no invented customers, quotes or numbers; review asks never offer anything. |
| Hidden text, cloaking, sneaky redirects, back-button traps | Spam policies | Prerendered HTML equals what readers see; FAQs visible; redirects only for real merges; no history manipulation. |
| Technical self-harm: stray noindex, wrong canonicals, robots blocks, site down | Not spam, but traffic still drops to zero | `check-dist`, the dist audit and `seo-diff.mjs` before every deploy; never turn on slash 301s; Search Console Page indexing read weekly. |

## 6. The penalty-safety gate (runs before every publish)

The working copy is in `.claude/skills/google-search-policies/SKILL.md`. In short:

1. **Calendar:** read the Status Dashboard. Inside a core or spam rollout, publish normal work but do not rewrite a page because its position moved; judge a week after the rollout ends.
2. **Facts:** run `node seo-audit/tools/fact-check.mjs dist <route>` on every changed page and resolve every line it prints (sourced and dated, our catalog, or our arithmetic shown on the page).
3. **People-first:** `people-first-audit.mjs` before and after; no new flag. claude-seo `content_quality.py` on the built page: AI-pattern score 0 and filler 0.
4. **Spam table:** walk section 7 of the 20 Nov file for the page type (doorway for landing pages, scaled content for any batch, link spam for off-page).
5. **Honesty:** byline real, Updated date moved only for real change, competitor facts read that day and dated, "Honest limits" present.
6. **Technical:** build exit 0, `check-dist`, dist audit (one H1, canonical, JSON-LD parses, no Product type), `seo-diff.mjs` shows only intended title, description or H1 changes.
7. **Monthly:** Search Console Manual actions, Security issues, AI controls, Page indexing.

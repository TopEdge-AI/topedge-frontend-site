---
name: topedge-seo-day
description: Run one TopEdge AI SEO day end to end (Track A blog page audit and fix, Track B landing page, off-page drafts, build, deploy, IndexNow, log). Use when the owner says "Continue TopEdge SEO, Day N" or pastes seo-audit/DAILY-PROMPT.md.
---

# TopEdge AI SEO day

The plan and log live in `seo-audit/PLAN-AND-LOG.md`. The prompt the owner pastes is `seo-audit/DAILY-PROMPT.md`. This skill is the checklist that makes a day repeatable. It never overrides the plan file or the owner's latest message.

## 0. Before anything
1. `git fetch`, `git status -sb`, `git log --oneline -10`. Other sessions push to `update-pricing`; Netlify deploys that branch. If the tree is dirty, tell the owner what is uncommitted first.
2. Read PLAN-AND-LOG in full: sections 1 (goal, two tracks), 2 (routine), 3 (day table), 3b (landing page map), 5 (last log row), 6 (open items). Run the row labelled Day N (owner's count; Day 1 = 15 Nov 2026). If it is Done, run the next row that is not and say so in one line.
3. Read memory `topedge-seo-plan-nov15` and `feedback-ai-content-people-first`. The plan file wins over memory.
4. Give the owner a five-line status (done per log, today's pages, what you need, blockers), then start.

## 0b. House rules that override the account blog SOP skill (owner, 22 Nov 2026)
- Positioning: read `.claude/skills/topedge-positioning/SKILL.md` before writing any copy that names TopEdge AI. All-in-one D2C software for Shopify stores, built as one suite; single jobs are modules. Never write about positioning itself.
- FAQs are always open: visible cards, no accordion (the blog SOP's accordion rule is replaced).
- Direct answer box: solid light yellow, thin border, no gradient, no left bar.
- Prose fills the article column up to the contents rail; no capped measure leaving an empty band (overrides the SOP's 65 to 75ch rule).
- No monospace or `<code>` styling in articles; paths and file names use the body font.
- Question-first structure (owner, 24 Nov 2026): research real questions (GSC queries, People Also Ask, `get_keyword_metrics`); the first H2 above the list or body is the main searched question with a one-line direct answer; list entries are numbered "1. Name: best for Y" with a spec box; a "Which X is best for your Y?" section answers long-tail queries in one line each; FAQ heading is "Frequently asked questions about <topic>" (`faqHeading`), numbered questions, answers start with Yes/No or the answer. Full rule: DAILY-PROMPT 5.16.

## 1. Data (free first, then credits)
- Search Console through OpenSEO (project `852f0ce0-39cf-43e3-9b80-84ff3449a4a8`): `inspect_urls` for yesterday's pages; striking-distance list (query + page, country `ind`, last 28 days, minPosition 8, minImpressions 3, query notContains `spa`). Ignore local junk (restaurants, salons, massage).
- `whoami` for credits. One `get_keyword_metrics` call per day for the day's families (locationCode 2356, languageCode "en"). `get_serp_results` mobile, India, `finalUrls: true`, collect again after 2 to 3 minutes. Large outputs: parse the saved file with python, do not read it whole.
- Ahrefs site audit in the built-in browser: `https://app.ahrefs.com/site-audit/10574646/overview`. If it shows the public site with "Sign in", tell the owner and move on.

## 2. Track A: one blog page, full audit
Folder: `seo-audit/<YYYY-MM-DD>/page-audits/<short-name>/`.
1. Save `gsc-export-india-28-days.csv` and `gsc-export-all-countries-3-months.csv`.
2. `node seo-audit/tools/onpage-audit.mjs <url> "<keyword>" <folder>/before <comp1> <comp2> <comp3>` with the top 3 India results above us (exploremayank.in tool; background it).
3. List the real questions for the topic (GSC queries, People Also Ask from the SERP read, question forms in the day's `get_keyword_metrics` call) with their source; they decide the opening question H2, the "which is best for" H3s and the FAQ (DAILY-PROMPT 5.16).
4. Run `seo-audit/PAGE-ANALYSIS-PROMPT.md`; write `analysis-report.html`, render with `node seo-audit/tools/html-to-pdf.mjs`.
5. Re-read every competitor price or feature the page states, on the live page, every billing toggle; date the reading; register new hosts in `src/data/sources.ts`.
6. Implement. On-page standard is DAILY-PROMPT section 5. People-first gate: `node seo-audit/tools/people-first-audit.mjs dist <folder>/people-first --only <route>` before and after; no new flags.
7. Two body-only fixes on other ICP posts.

## 3. Track B: one landing page (Days 6 to 10)
Use the `topedge-landing-page` skill and the map in PLAN-AND-LOG section 3b.

## 4. Off-page
The day's item from the table. Drafts only; the owner sends, submits and signs in. At most 20 sends a week. Do-not-approach list: `seo-audit/2026-11-05/24-outreach-templates.md`.

## 5. Ship
1. `npm run build:netlify` must exit 0 (run in background; it takes a few minutes).
2. Dist audit of every changed page: title (≤65, ≤60 preferred with suffix), description 110 to 160, one H1, canonical, JSON-LD parses, no Product type, no missing alt, no bare "TopEdge", no em dash.
3. Preview: `preview_start` name `topedge-dist` (port 4190); check each changed page renders, console clean.
4. Commit with the attribution line, push `update-pricing`. One deploy a day unless the owner asks for more. Log-only commits carry `[skip netlify]`.
5. Live check with curl (new text present, HTTP 200), re-run the on-page tool into `after/` with `?v=<date>`.
6. `npm run indexnow -- <urls>` and OpenSEO `submit_indexnow_urls`; give the owner the full URLs for Search Console Request indexing.
7. Log the day in PLAN-AND-LOG section 5, tick section 3, update owner items. Memory: new facts only.

## Never
- Invent a number, a customer result or a competitor fact. Unknown means `[NEEDS REAL DATA]`.
- Write bare "TopEdge", em dashes, or 2026 in new titles (use 2027).
- Touch titles on /compare/* or /blog/best-whatsapp-apps-for-shopify.
- Change the home page or feature pages beyond factual fixes (PLAN-AND-LOG section 1).
- Turn on slash 301s, paste gtag into index.html, add Product schema, or click Validate fix in Search Console.

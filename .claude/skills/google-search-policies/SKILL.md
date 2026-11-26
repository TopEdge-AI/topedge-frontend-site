---
name: google-search-policies
description: Check any TopEdge AI page, plan or tactic against Google's spam policies, its AI-content guidance and the people-first rules before publishing. Use before writing or changing any page, when someone asks how to avoid a Google penalty or "AI detection", or when an SEO, AEO or GEO tactic is proposed.
---

# Google search policies for TopEdge AI

The full reading, with Google's sources and dates, is `seo-audit/2026-11-20/01-google-ai-content-guidance.md` (sections 1 to 7). This skill is the short form.

## What Google acts on
- Not AI use. Google: AI content gets "no special gains", and the rater guidelines say generative AI alone does not set the quality rating.
- Low effort, low originality, no added value, filler at the top, templated near-duplicates, and pages produced at scale ("scaled content abuse"), however they were made.
- False or unverifiable claims, fake authors or credentials, and dates moved to look fresh.

## Before publishing any page, answer yes to all
1. Does it carry something only we can say, dated (a price read that day, our rupee arithmetic, a real screenshot, a founder's judgement)?
2. Is every number in `src/data/sources.ts` or our own catalog, with a date?
3. Does it answer its own query fully, without sending the reader elsewhere for the answer (doorway rule)?
4. Is it different in substance from every other page we have on a close query? Check the keyword map and run `seo-audit/tools/people-first-audit.mjs`.
5. Is the byline a real founder, and is the visible "Updated" date moved only because content really changed?
6. Are titles, descriptions, alt text and schema fact-checked (Google names all four)?

## Never
- "Humaniser", paraphrasing or undetectable-AI tools (Google lists automated synonymising as obfuscation).
- Deliberate typos, invented stories, invented customer results or quotes, fake reviews or incentivised reviews.
- Hidden text for crawlers, keyword lists, doorway variants (city or industry pages), sneaky redirects, bought links or new link exchanges.
- Tactics Google says it ignores: llms.txt for Google, chunking content for AI, rewriting for LLMs, schema added "for AI", seeded mentions.

## The 16 spam policies, one line each
Cloaking, doorway abuse, expired domain abuse, hacked content, hidden text and link abuse, keyword stuffing, link spam, machine-generated traffic, malicious practices (including back-button hijacking), misleading functionality, scaled content abuse, scraping, site reputation abuse, sneaky redirects, thin affiliation, user-generated spam. Plus demotion for many legal or personal-information removals, policy circumvention, and scam or fraud. Our rule for each is in section 7 of the guidance file.

## The penalty-safety gate (owner, 26 Nov 2026): run before every publish, no exceptions
Evidence and Google's sources: `seo-audit/2026-11-26/05-penalty-safety.md`. Sites that grow and then drop to zero almost always did one of: many near-identical pages, pages for keywords not readers, wrong or stale facts, dates bumped to look fresh, bought or traded links, borrowed authority (guest or sponsored content), fake people, hidden text or redirects, or a technical self-harm (stray noindex, wrong canonical). Every step below blocks one of those.

1. **Update calendar.** Read https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history. Inside a core or spam rollout, ship planned work but never rewrite a page because its position moved; judge a full week after the rollout ends, comparing the week before the start with the week after the end. Small drops (2 to 4): change nothing. Large drops: self-assess the whole site against the people-first questions.
2. **Fact-check.** Build, then `node seo-audit/tools/fact-check.mjs dist <route> --out seo-audit/<date>/fact-check/<page>.md`. Every UNTRACED number must be (a) our arithmetic shown on the page, re-done by hand, (b) a count or a date, or (c) given a `sources.ts` entry read that day. Read every SOURCE sentence too: a matched number can still sit in a wrong sentence. Titles, descriptions, alt text and schema are in scope (Google names all four). Images: the alt must describe what is really in the image.
3. **People-first and AI-pattern.** `people-first-audit.mjs` before and after (no new flag), plus claude-seo `content_quality.py` on the built HTML (AI-pattern 0, filler 0). Never use humaniser or paraphrasing tools.
4. **Spam policies for the page type.** Landing page: doorway abuse (answers its own query; body shares at most a CTA with sibling pages). Any batch: scaled content (one blog and one landing page a day at most). Off-page: link spam (no bought, traded or seeded links). Third-party content: site reputation abuse (none on our domain). Scripts: no back-button handlers (`pushState`, `popstate`, `beforeunload` traps).
5. **Honesty.** Real byline (Moksh Patel or Smit Tilva). Visible Updated date moves only for a substantial content change. Competitor facts read that day and dated. An honest-limits section. No partnership, badge or certification on a page or image unless it is verified (the Meta Business Partner badge is unverified until the owner confirms it: finding H4).
6. **Technical.** `npm run build:netlify` exit 0, dist audit (one H1, one canonical, JSON-LD parses, no Product type), `seo-diff.mjs` shows only intended title, description or H1 changes, sitemap and llms list the page.
7. **Monthly (first session of each month).** Search Console Manual actions, Security issues, AI controls ("Search generative AI: Include") and Page indexing, read only. Log the result in PLAN-AND-LOG.

## If asked "how do we stop Google detecting AI?"
Say plainly that Google does not penalise AI use, that evasion tools are themselves a spam signal, and that the method is the checklist above. Point to the guidance file.

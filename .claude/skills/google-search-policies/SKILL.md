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

## If asked "how do we stop Google detecting AI?"
Say plainly that Google does not penalise AI use, that evasion tools are themselves a spam signal, and that the method is the checklist above. Point to the guidance file.

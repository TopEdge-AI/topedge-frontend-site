# Google and AI-written content: what Google actually says, and our rules

Read on 20 Nov 2026 from Google's own pages (Search Central docs, the Search Central blog, and the Search Quality Rater Guidelines PDF dated 11 Sep 2025). The owner asked on Day 5 how to stop Google "detecting" AI-written content and penalising us. This file is the answer and the standing rule for every page from now on.

## 1. The short answer

- **Google does not publish any "AI detector" penalty, and says AI use is not the problem.** Its Feb 2023 guidance says appropriate use of AI or automation is not against its guidelines, and that AI content gets no special gain or loss: "It's just content." Using automation *with the primary purpose of manipulating rankings* is spam.
- **What Google acts on is low-effort, unoriginal, templated or mass-produced content, however it was made.** The spam policy is "scaled content abuse": many pages that add little value, "no matter how it's created". The rater guidelines (sections 4.6.5, 4.6.6, 5.2.1, 5.2.2) rate a page Lowest or Low when its main content is copied, paraphrased or AI-generated "with little to no effort, little to no originality, and little to no added value", and they say generative AI use "alone does not determine the level of effort".
- **So "making AI text undetectable" is the wrong goal, and the usual tricks are on Google's own spam list.** "Humaniser" and paraphrasing tools are what the rater guidelines call "automated transformations like synonymizing, translating, or other obfuscation techniques", listed as an example of scaled content abuse. Random typos, fake author personas and invented "experience" are listed as deceptive (fake creator profiles, AI-generated headshots, false claims of expertise).
- **The goal that works:** every page carries things a model cannot produce from the rest of the web. That means a dated reading of a real page, our own rupee arithmetic, a real product screenshot, a founder's first-hand judgement, and honest limits. It also means fewer, better pages, with no near-copies of each other.

## 2. What Google says, by document (all read 20 Nov 2026)

| Document | What it says that matters to us |
|---|---|
| [Google Search's guidance about AI-generated content](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content) (blog, Feb 2023) | AI or automation is fine if the content is helpful; automation to manipulate rankings is spam; SpamBrain looks for spam patterns "however spam is produced". Bylines "when readers would reasonably expect it". Listing AI as the author is "probably not the best way" to disclose. |
| [Guidance on using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) (docs, updated 1 Oct 2026 with rater-guideline material) | Generating many pages without added value can break the scaled content abuse policy. Fact-check AI output, including titles, meta descriptions, structured data and alt text. Give readers context about how content was made where it makes sense. Ecommerce product images made with AI need IPTC `TrainedAlgorithmicMedia` metadata in Merchant Center. |
| [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Self-assessment questions: original information, research or analysis; more value than other results; clear sourcing; no easily verified errors. Warning signs include extensive automation, writing on many topics hoping some rank, and **changing dates to seem fresh when content has not substantially changed**. Who, How, Why: show who wrote it, consider disclosing how automation was used when readers would expect it, and make the "why" helping people. |
| [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | Scaled content abuse, hidden text (accordions and tabs are allowed), site reputation abuse, thin affiliation, link spam (including excessive link exchanges). |
| [Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) (new 15 May 2026) | "AEO/GEO" is SEO. Non-commodity content and first-hand experience. **Not needed:** llms.txt, chunking content, rewriting for LLMs, special schema. Inauthentic brand mentions do not help. Spam policies also apply to AI Overviews and AI Mode (documentation update 15 May 2026). |
| [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) | No extra requirements for AI Overviews or AI Mode beyond being indexed and snippet-eligible. Traffic shows in Search Console under Web. |
| [Succeeding in AI search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search) (blog, May 2025) | Unique non-commodity content, good page experience, structured data that matches visible text, real images and video, and measuring conversions, not just clicks. |
| [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | No word-count target, no ideal number of headings, E-E-A-T is not a ranking factor, and duplicate content is inefficient rather than a penalty. |
| [Latest documentation updates](https://developers.google.com/search/updates) | FAQ rich result docs deprecated 8 May 2026 and removed 15 Jun 2026. llms.txt is not used by Search (15 Jun 2026). Generative AI performance report in Search Console (Jun 2026). |
| [Search Quality Rater Guidelines](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf), 11 Sep 2025 | 3.2: quality = effort, originality, talent or skill, accuracy. 4.5.3: fake owner or creator profiles and false claims of expertise = Lowest. 4.6.5: scaled content abuse = Lowest "no matter how they are created". 4.6.6: paraphrased content tends to contain only commonly known facts. 5.2.1: "Best" lists built from existing reviews with little original content = Low. 5.2.2: filler near the top = Low. Raters do not set rankings; their ratings train and test the systems. |

## 3. Our rules from today (apply to every new or edited page)

**Do**
1. **Put one thing on every page that only we can say**, and date it. That can be a price read off the vendor's live page that day, our own rupee bill at 100, 500 and 1,500 orders, a real dashboard screenshot, or a founder's judgement from running the product. This was already rule 5.3; it is now a gate.
2. **Fact-check everything a model touched,** including titles, descriptions, alt text and schema (Google's own list). Every number in `src/data/sources.ts` with a `verified` date.
3. **Real bylines only.** Moksh Patel or Smit Tilva, linked to /about with true facts. Never invented experts, credentials or AI headshots.
4. **Edit like a person who uses the product.** Cut filler at the top, vary the H2 skeleton between pages of the same type, keep sentence lengths mixed, and drop stock phrasing (see the checker list).
5. **Fewer, better pages.** Merge near-duplicates (cannibalisation fixes) rather than publishing variants. Never generate a batch of templated pages.
6. **Only change the visible "Updated" date when the content really changed.** Removing arrows or fixing a typo is not an update.
7. **Images:** prefer real screenshots. If an image is AI-generated, say so in its alt text or caption where a reader would care, and add IPTC `DigitalSourceType = trainedAlgorithmicMedia` metadata (required for Merchant Center product images, recommended elsewhere).

**Never**
- Run copy through "humaniser", paraphrasing or "undetectable AI" tools. Google names that as an obfuscation technique.
- Add deliberate typos or slang to look human, invent first-hand stories, customer results or quotes, or fake an author.
- Hide text from readers for crawlers (hidden-text spam). Accordions are fine.
- Chase AEO tricks Google says it ignores: llms.txt for Google, chunking, rewriting for LLMs, schema added "for AI", seeded mentions.

## 4. The checker: `seo-audit/tools/people-first-audit.mjs`

`node seo-audit/tools/people-first-audit.mjs dist <out-dir> [--only /blog/]` scans every indexable built page and flags:
- stock phrasing associated with unedited AI drafts (delve, seamless, unlock, "in today's", "it's important to note" and similar, weighted per 1,000 words),
- contrast frames ("is not X. It is Y") used four or more times,
- pages where 25% or more of paragraphs open with a bold "Label:",
- passages repeated on other pages of our site (8-word shingles), and which page they overlap most with,
- H2 headings identical on five or more pages,
- monotone sentence length,
- blog posts with no dated reading, rupee figure or table, or no outside source,
- em dashes, and arrows in prose (docs UI paths are exempt).

It is not an AI detector and gives no "AI score". It flags the patterns Google's documents describe. Run it on the day's page before and after every change. A changed page should not gain a flag.

## 5. What the first sitewide run found (live build, 20 Nov 2026)

`seo-audit/2026-11-20/people-first-before/` (154 pages, 88 flagged; most flags are arrows in docs-style feature pages).

1. **25 festival template pages (/whatsapp-festival-templates/*) share 64% to 71% of their passages with each other.** Each has the same three H2s. This is the closest thing on our site to the "scaled content" pattern raters are told to rate Lowest. Google already treats most of them that way: 23 were "Discovered, currently not indexed" in Search Console on 19 Nov. **Owner decision:** make each page different in substance (real festival-specific send dates, offers and templates), or fold them into the hub and stop adding more. Recommendation: no new festival pages; rewrite the top 5 by search demand with festival-specific content, and leave the rest as they are until those are indexed.
2. **The 12 two-way /compare/* boards repeat 46% to 70% of their passages** (shared capability board text and identical H2s). They also share one "Updated" date, so editing one competitor moves the visible date on all 12. That is the "changing dates to seem fresh" warning sign. Fix on Day 8, the compare-board day: per-board dates and less shared text.
3. **Blog posts are mostly clean.** No post trips the stock-phrase threshold. Remaining flags are arrows (fixed on the pillar and the COD post today) and 20% to 24% overlap on four posts (cod-to-prepaid, aisensy-pricing, wati-pricing, cod-rto-benchmark), which share passages with their sibling posts.
4. **"Common questions" is the FAQ heading on 87 pages.** Vary it as pages are touched (done on the pillar today).
5. **FAQ rich results no longer exist in Google** (docs removed 15 Jun 2026). Keep FAQs for readers and AI answers only, short and from real queries. No reason to add more.

## 6. Open decisions for the owner

- Festival pages: rewrite the top 5 and freeze the rest (recommended), or consolidate into the hub.
- AI disclosure: Google suggests explaining how content was made where readers would reasonably expect it. Recommendation: one short "How we write these guides" note on /about (prices read from vendor pages on a stated date, founders review every post, AI tools help with drafts). Do not label individual posts. Your call.
- Blog cover images: if any were AI-generated, they should carry IPTC metadata. Tell us which ones.

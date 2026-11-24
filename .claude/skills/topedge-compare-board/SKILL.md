---
name: topedge-compare-board
description: Refresh a TopEdge AI two-way comparison board (/compare/<competitor>) to the 24 Nov 2026 template modelled on WATI's vs pages, with dated competitor facts, keyword-safe titles, a numbered FAQ and the capability board kept as it is. Use for PLAN-AND-LOG section 3c (Track C) or any request to improve a compare page.
---

# TopEdge AI compare board refresh (Track C)

Owner request, 24 Nov 2026: make every comparison page as strong as wati.io/wati-vs-interakt and wati.io/wati-vs-aisensy, three boards a day, keeping our capability board exactly as it is. Read `.claude/skills/topedge-positioning/SKILL.md` before writing copy and `.claude/skills/google-search-policies/SKILL.md` before shipping.

## What WATI's pages do (read 24 Nov 2026), and what we copy
| WATI section | Ours |
|---|---|
| Bold H1 "Why struggle with X?" + 2-line sub + trial button + logos | H1 stays "TopEdge AI vs X" (logos). One-line `heroSub` with the real difference, Start free (14 days) + Chat with us on WhatsApp, App Store line, proof badges |
| "Why customers switch" in 3 bold reasons | "Why Shopify brands switch from X to TopEdge AI": 3 numbered reasons, each with a dated number |
| At-a-glance ✓/✕ table | Our capability board, unchanged (refresh dated cells only) |
| Mid-page CTA band | Inline dither CTA "Run it on your own orders first" |
| G2 verdict + reviewer quotes | Answer box "TopEdge AI vs X: the short answer" (yellow, dated); App Store ratings stated as facts, never quotes we cannot verify |
| "Where X falls short and Wati excels" cards | "Where X falls short and TopEdge AI does better": 3 cards, each a fact read that day |
| (none) | "Where X is the better pick": 2 or 3 honest lines (rule 5.5) |
| (none) | "TopEdge AI vs X pricing, read <date>": dated table, plan the scenario needs |
| (none) | "How to switch from X in four steps": board-specific steps |
| Final CTA: trial + demo | Numbered, always-open FAQ, related links, review platforms, closing dither CTA with WhatsApp |

**Never copy their tone.** No "those who enjoy frustration", no unsourced "stability issues", no competitor reviewer quotes, no G2 numbers we did not read. Every competitor claim was read on that competitor's own page (or its Shopify App Store listing) on the board's `updated` date.

## Steps for each board
1. Search Console (OpenSEO): `/compare/<slug>` queries, 3 months. One `get_keyword_metrics` call per day for the three boards' question families (2356, en): "<x> pricing", "<x> review", "<x> vs <y>", "is <x> free", "<x> free trial", "<x> shopify".
2. Re-read the competitor: pricing page on every billing toggle (monthly, quarterly, yearly), per-message rate card, AI and seat add-ons, its Shopify App Store listing (price, rating, review count, features by plan). Update `src/data/sources.ts` (`verified` = today). If a fact cannot be read today, leave it out. Never print [NEEDS REAL DATA] on a live page; list it for the owner.
3. Write the entry in `src/marketing/data/compareRefresh.ts`: `updated`, `heroSub`, `verdict` (2 or 3 sentences, dated, names where the competitor fits), `switchReasons` (3), `fallsShort` (3), `betterPick` (2 or 3), `priceRows` (5 to 7, our plan the scenario needs vs theirs), `priceNote` (pages and views read), `switchSteps` (4, specific to how that competitor bills), `faqs` (5, from real queries, answers open with the answer and name the product and number).
4. In `compareCompetitors.ts`: title "TopEdge AI vs X (2027): <two or three differences>" at 60 characters or fewer (compare titles use `noSuffix`); description 110 to 160 with "read <date>" and one number; `subtitle` and `matrixNote` re-dated. Never put "X alternative" or "X pricing" in the title, H1 or description: blog posts own those. Link to them from the FAQ.
5. In `compareFeatureMatrix.ts`: keep every row; only update cells whose facts were re-read, and their "Read <date>".
6. Build, then: dist audit (one H1, canonical, FAQPage present, no Product, no em dash, no bare "TopEdge"), people-first gate `node seo-audit/tools/people-first-audit.mjs dist <out> --only /compare/<slug>` (no new flag; shared passages should fall), preview at 375 px and desktop (no sideways scroll, buttons wrap), Rich Results Test on one live board.
7. Log in PLAN-AND-LOG section 5 and tick the board in section 3c.

## Guardrails
- Our facts only from the billing catalog and DAILY-PROMPT section 2: plans ₹1,999 / ₹3,999 / ₹6,499 + GST or $19 / $39 / $65 via Shopify, caps 100 / 800 / 1,500 orders, trial 14 days / 20 orders / 200 sends, COD confirmation on every plan, COD to prepaid and Journey Branch from Growth, 0% markup. Never state seats per plan, AI pricing or NDR / partial COD / Meta Flows support.
- TopEdge AI App Store reviews: state the live count (0 on 24 Nov 2026) when a board mentions the competitor's rating.
- Each board's text must differ in substance: no shared paragraphs across boards beyond the CTA lines (doorway and scaled-content policy).

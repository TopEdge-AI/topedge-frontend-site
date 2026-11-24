# 02 · Content quality and E-E-A-T audit (commercial pages first)

Date: 24 Nov 2026 · Scope: 28 commercial URLs plus 5 blog spot checks · Read-only audit

## How this was measured

| Item | Method | Label |
|---|---|---|
| Source HTML | Local prerendered build `dist/` (index.html built 24 Nov 2026 12:42). The live site was **not** fetched, so any deploy drift is not covered | Verified (file timestamps) |
| Main-content text | BeautifulSoup on `#root` minus `<nav>`, the `mkt-nav` site header, `<footer>`, scripts and SVG. Trafilatura word counts are reported alongside (trafilatura drops pricing cards and accordions, so it undercounts on landing pages) | Verified |
| Quality signals | `content_quality.py --json` on every page (filler, AI-pattern, information density, repetition, overall_quality) | Verified |
| Templated metadata | `metadata_template.py --pairs-file` on the 32 audited URLs and on all 137 non-docs HTML files | Verified |
| Readability | Flesch Reading Ease (FRE) and Flesch-Kincaid grade (FK), own syllable counter. Short UI fragments (buttons, card labels) pull the average sentence length down, so FRE runs high | Estimate |
| Cross-page facts | Regex scan of rendered text of all 136 non-docs pages for prices, trial terms, reminder timings, review counts, brand spelling, setup time, reply time, RTO statistics, em dashes | Verified |
| Boilerplate | Sentences of 7 or more words that appear on 2 or more audited pages | Verified |
| E-E-A-T scores | Rubric judgement per factor. Weighting is this skill's internal model (Experience 20, Expertise 25, Authoritativeness 25, Trust 30), not Google's | Estimate |
| Skipped | `nlp_analyze.py`: no `GOOGLE_API_KEY` configured (script returned "No API key"). `consistency_check.py`: per its `--help` it checks the plugin's own repo (dead references, routing, lock integrity) and takes no site input. It was replaced by the custom fact scan above | Verified |

The thin-content gates come from `skills/seo/references/quality-gates.md`: Homepage 500, Service/Feature 800, Landing 600, About 400, Category/hub 400, FAQ 800, Blog 1,500. Word count is a coverage floor and not a ranking factor. A page under the floor is a gap only when it fails to answer the questions a buyer would ask on that page.

## Headline results

- **AI-pattern and filler hits: 0 on all 32 pages** (content_quality.py `ai_pattern_score` 0, `filler_score` 0 everywhere). Verified. The copy does not show the phrasing markers the QRG flags. The risk is structural (point 3 below), not phrasing.
- **Templated metadata: site_risk low, templated_ratio 0.0, no shared CTA phrases**, across 32 audited URLs and all 137 pages. Verified.
- **Review counts are consistent everywhere** (Trustpilot 4.0 from 5, read 10 Oct 2026; Product Hunt 5.0 from 8, read 26 Oct 2026, on 237+ renders). Verified.
- **Cart reminder timings are consistent** (25 min, +4 h, +36 h) on /whatsapp-abandoned-cart-recovery-app, /whatsapp-templates, the journey example and the cart-recovery blog. Verified. One adjacent best-practice line says something different (see F18).
- **Plan prices are arithmetically correct everywhere.** I checked yearly totals, savings, the 20% annual discount, per-day figures, partner commission maths and every Meta cost multiplication on the audited pages, with no errors. Verified. The problem is which price is shown first (F4).
- **Brand spelling:** "TopEdge AI" appears 2,762 times. "Topedge" appears 31 times, all but one inside verbatim Trustpilot quotes. "TopEdge" without "AI" appears 36 times inside a verbatim Apex Light quote. "TopEdge Ai" is the legal name in the terms and privacy pages only. The one authored misspelling is "Topedge AI tracking pixel" in /blog/organic-vs-paid-ecommerce-marketing-2026. Verified.

Estimated scores (rubric, not a measured metric):
- Commercial-page content quality: **58/100**
- E-E-A-T, commercial pages: **52/100** (Experience 38, Expertise 59, Authoritativeness 39, Trust 72)
- AI citation readiness: **66/100**. Most commercial pages end in a direct-answer FAQ with dated, sourced rupee figures. The homepage, /about and /customers have no FAQ, and five facts conflict between pages (F1, F4 to F7).

## Per-page table

Abbreviations: W = main-content words (BeautifulSoup) / trafilatura words. CQ = content_quality.py overall_quality (higher is better). Dens = information density. E/Ex/A/T = E-E-A-T factor scores (0-100, estimate). EEAT = weighted.

| Page | W | ₹ figures (distinct) | Dated first-hand facts | Named customers / authors | Unique-value element | Gate verdict | CQ / Dens | FRE / FK | E / Ex / A / T = EEAT | Reason |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 389 / 251 | 3 (₹1,999, ₹180 to ₹240) | Review reads only (10 Oct, 26 Oct) | None in text, logos only | 11 product-feature tiles with videos | **Thin** (homepage 500); no FAQ | 93 / 1.00 | 68.9 / 5.7 | 35/45/40/70 = **49** | Clear value line, but no proof beyond review stars, an unsourced ₹180 to ₹240, and no FAQ for answer engines |
| /pricing | 970 / 814 | 19 | Meta rates; 1,000 free service msgs from 1 Oct 2026; INR WABA deadline 31 Dec 2026 / 1 Jan 2027; ECB rate 6 Nov 2026 | 3 Trustpilot reviewers via wall | 0% markup rupee maths vs Dondy and AiSensy | Pass | 97 / 1.00 | 72.6 / 5.3 | 40/75/40/85 = **62** | Strong, dated, sourced. Plan cards render the yearly price by default (F4) |
| /features | 561 / 480 | 2 | None | None | Feature index grouped by job | Pass (hub, 400) | 76 / 0.25 | 70.1 / 6.0 | 30/50/35/65 = **47** | Clean hub with few facts |
| /features/journeys | 485 / 394 | 3 | None | None | 3-step cart cost ₹2.59; Journey Branch gating | **Below** 800 | 77 / 0.34 | 62.9 / 7.4 | 30/60/30/65 = **48** | Specific, but no dated or first-hand evidence |
| /features/flow-builder | 457 / 355 | 0 | None | None | Flow vs AI rule ("use a flow where a wrong answer costs money") | **Below** 800 | 78 / 0.40 | 71.6 / 5.9 | 30/55/30/65 = **47** | Same skeleton as the others; no numbers |
| /features/ai-brain | 445 / 357 | 2 | None | None | BYOK cost "₹0.10 to ₹0.30 per AI reply" (unsourced estimate) | **Below** 800 | 77 / 0.36 | 76.1 / 5.3 | 30/55/30/65 = **47** | Token-cost range has no source or date |
| /features/campaigns | 400 / 315 | 0 | None | None | Send caps by plan (3,000 / 15,000 / 30,000) | **Below** 800 | 76 / 0.31 | 64.3 / 7.0 | 30/55/30/65 = **47** | No rupee example of a campaign's cost |
| /features/analytics | 399 / 314 | 0 | None | None | Anonymous events attach at opt-in | **Below** 800 | 71 / **0.15 (low-density flag)** | 67.6 / 6.4 | 25/45/30/65 = **44** | Lowest information density of all pages |
| /features/meta-manager | 479 / 386 | 2 | None | None | Utility rejected as marketing costs 7.5x; templates belong to your WABA | **Below** 800 | 82 / 0.55 | 56.3 / 7.9 | 30/65/30/65 = **49** | Good expert facts; hardest read (FK 7.9) |
| /features/audience-crm | 378 / 296 | 0 | None | None | Profiles not metered; plan sized by orders | **Below** 800 | 72 / 0.22 | 61.4 / 7.5 | 30/50/30/65 = **46** | Generic CRM language |
| /features/chat-rules | 405 / 324 | 0 | None | None | Rules on every plan | **Below** 800 | 75 / 0.30 | 66.5 / 6.8 | 30/50/30/65 = **46** | Generic |
| /features/warranty | 462 / 361 | 2 | Competitor check "as of 21 October 2026" | None | OTP cost ₹115 per 1,000 registrations; competitor gap | **Below** 800 | 79 / 0.40 | 59.6 / 7.8 | 35/65/30/70 = **52** | Dated competitor claim with a caveat |
| /features/profit-loss | 940 / 851 | 21 | Amazon Shipping India, published 15 Jul 2026, read 21 Oct 2026 | None | ₹799 kurta cost waterfall (₹85 to ₹179) | Pass | 91 / 0.73 | 67.1 / 7.0 | 45/80/45/80 = **64** | Best feature page: worked example plus sources |
| /features/intent-detection | 400 / 321 | 0 | None | None | Hinglish phrase training; no-match fallback | **Below** 800 | 77 / 0.38 | 73.6 / 5.8 | 30/55/30/65 = **47** | Generic |
| /features/cod-confirmation | 486 / 470 | 5 | Meta rate re-read 16 Nov 2026; parcel costs read 21 Oct 2026 | None | Cost table (₹57.50 per 500 confirmations) and an honest limits answer | **Below** 800 but complete for its intent | 86 / 0.73 | 64.6 / 6.9 | 40/75/40/85 = **62** | Model page for the other features |
| /customers | 455 / 257 | 0 | None (review reads only) | **Delitech Smart Home, Apex Light** (quotes not tied to a named person) | Rollout in 3 steps | Pass (400) | 85 / 0.71 | 66.0 / 6.3 | 55/40/45/55 = **49** | Real brands, but no dated outcome, unattributed quotes, and a "Meta Business Partner" badge (F3) |
| /about | 299 / 96 | 1 | "started it in 2024" | Founders **Moksh Patel, Smit Tilva**; Delitech, Apex Light | Built in Ahmedabad | **Thin** (about 400); flagged `thin-content` | 80 / 0.54 | 71.1 / 5.3 | 40/30/35/65 = **44** | Founders named but one-line roles, no bios, no personal profiles |
| /services | 1,296 / 1,227 | 2 | None | None | Explicit "software you run yourself, no retainer" | Pass | 83 / 0.40 | 63.4 / 7.0 | 35/60/35/75 = **53** | Honest positioning; 11% boilerplate (testimonials, proof strip) |
| /compare | 488 / 373 | 1 | "Checked Nov 2026" | Reviewers Tirth P., Shubham P., Robin | 10 dated head-to-head boards | Pass (hub) | 93 / 0.98 | 65.8 / 6.2 | 40/55/45/75 = **56** | Dated method; 21% boilerplate |
| /contact | 180 / 108 | 0 | None | None | Phone, hours, registered office, email | Pass for intent (no gate) | 90 / 1.00 (`thin-content` flag) | 71.2 / 5.3 | 30/30/40/90 = **51** | Trust page does its job. Instagram handle mismatch (F17) |
| /integrations | 387 / 304 | 0 | None | None | Instagram plus pixel listed | **Below** 800; overlaps /shopify-whatsapp-integration | 82 / 0.61 | 53.3 / 7.9 | 25/50/30/65 = **45** | Thin hub; hardest read on the site (FRE 53.3) |
| /shopify-whatsapp-integration | 2,218 / 1,726 | 6 | Meta rates read 2026-11-16; Baymard, Unicommerce, Amazon read 2026-10-21 | Delitech, Apex quotes | What-syncs table, step timings, glue-code comparison | Pass | 85 / 0.51 | 60.5 / 7.7 | 45/80/50/80 = **66** | Best commercial page for citations |
| /partners | 992 / 781 | 10 | Example payout timeline | None | Tiered commission, TDS, PAN, 90-day cookie | Pass | 95 / 0.92 | 82.8 / 3.6 | 30/60/35/85 = **55** | Clear, verifiable terms |
| /tools | 353 / 269 | 0 | None | Delitech, Apex quotes | 5 free tools, no sign-up | **Below** hub 400; **33% boilerplate** | 83 / 0.65 | 67.9 / 5.9 | 30/45/35/65 = **46** | Highest shared-text share |
| /whatsapp-app-for-shopify | 1,816 / 1,524 | 17 | App Store launch 30 Sep 2026; Trustpilot read 6 Oct 2026; Baymard Sep 2025; Unicommerce Nov 2025 / Feb 2026 | 3 Trustpilot reviewers; logo strip incl. "Ved Patel" | 0% markup plus ownership section; plan table | Pass | 90 / 0.70 | 71.7 / 5.6 | 40/60/45/50 = **49** | Most unsupported or conflicting claims on the site (F2, F5 to F8) |
| /whatsapp-abandoned-cart-recovery-app | 1,391 / 1,208 | 17 | Shopify Messaging since 28 Oct 2026, read 20 Nov 2026; Meta re-read 16 Nov 2026; ECB 6 Nov 2026 | 3 Trustpilot reviewers | Shopify-native vs app comparison; ₹258.93 ceiling per 100 carts | Pass | 98 / 1.00 | 70.5 / 5.7 | 45/75/45/75 = **62** | Strong and current; shares the pricing block and the trial wording issue |
| /blog/best-whatsapp-apps-for-shopify | 4,328 | 56 | All prices read 24 Nov 2026; Getgabs delisting noted | Author **Smit Tilva**; "our own app" disclosure | Ranked by job, with markup % | Pass | 94 / 0.88 | 69.3 / 6.5 | 55/80/55/85 = **70** | Strong. No on-page author bio |
| /blog/whatsapp-automation-for-shopify | 4,435 | 24 | Meta re-read 16 Nov 2026; Shopify Messaging 28 Oct 2026; updated 20 Nov 2026 | Author **Moksh Patel** | ₹287.50 per 500 orders example | Pass | 87 / 0.57 | 61.8 / 7.4 | 50/80/55/80 = **68** | Title says "(2027)" (owner rule, not flagged) |
| /blog/cod-to-prepaid-whatsapp-shopify-india | 2,382 | 23 | Reads 21 Oct and 15 Nov 2026; "What we could not verify" | Author **Moksh Patel** | ₹68 saved per converted order | Pass | 94 / 0.84 | 70.1 / 6.1 | 50/80/55/85 = **69** | No visible "Updated" date although it cites a 15 Nov read |
| /blog/how-to-reduce-rto-with-whatsapp-cod-confirmation | 3,721 | 19 | Reads 15 to 17 Nov 2026 | Author **Moksh Patel** | SOP with a Hinglish template | Pass | 88 / 0.64 | 63.9 / 7.0 | 55/80/55/80 = **69** | Practical SOP |
| /blog/cod-rto-benchmark-india-2026 | 2,832 | 21 | Unicommerce Mar 2026; read 21 Oct 2026 | Author **Moksh Patel** | Benchmark table, explains Nov vs Mar figures | Pass | 97 / 1.00 | 64.9 / 6.7 | 45/85/60/85 = **71** | Most authoritative page; the commercial pages should copy its RTO wording |

Readability (Estimate): every page falls between FRE 53 and 83 and FK grades 3.6 to 7.9, which is suitable for founders and operators. The hardest reads are /integrations (FRE 53.3), /features/meta-manager (56.3) and /features/warranty (59.6), because they pack in jargon such as WABA, utility, OAuth and webhook.

### Duplicate and boilerplate passages (Verified, sentence-level match)

| Passage | Pages | Note |
|---|---|---|
| Delitech quote ("Moksh got our Shopify WhatsApp live the same week we asked... —...") and Apex quote | /customers, /services, /shopify-whatsapp-integration, /tools (plus 30+ other pages; the em dash renders 36 times site-wide) | Same two quotes everywhere; contains the only em dash on commercial pages |
| Trustpilot trio (Tirth P., Shubham P. "Topedge helped me...", Robin "₹1,999 base plan") | /compare, both landing pages, 3 blog posts | Verbatim reviews; fine to reuse, but it is the same evidence everywhere |
| Full plan table, plan taglines ("Perfect for brands just going live", "Designed for growing D2C brands...", "For high-volume stores needing max send priority") | /pricing, /whatsapp-app-for-shopify, /whatsapp-abandoned-cart-recovery-app | About 190 shared words on each landing page |
| "TopEdge AI is all-in-one D2C software for Shopify stores, built as one suite." | /, /about, /features, 2 blogs | Intentional entity sentence; keep |
| "About 30 minutes of setup. Meta verification and template review are the wait." / "Many templates clear in minutes and most within a day. Meta guarantees no time." | /features, /integrations, /services, /customers | Consistent; acceptable |
| RTO calculator block (₹28,080 to ₹37,440 etc.) | 3 COD/RTO blog posts | Embedded tool; acceptable |
| Shared-text share per page | /tools 33%, /compare 21%, /home 16%, /customers 15%, cart app 14%, /services 11%, /whatsapp-app 10%; all 13 feature pages 0% | |

**Structural template (Verified by reading all 13):** every feature page except /profit-loss and /cod-confirmation follows the same pattern: a hero, then 3 cards, then 3 more cards, then "How X goes live" in 4 steps, then 4 FAQs, then a "Related in this cluster" list, then a CTA. Ten of them carry no dated fact and no third-party source. This is the "repetitive structure across pages" marker in the QRG's scaled-content guidance. The sentences themselves are unique, so the risk is low and stays low while each page answers distinct buyer questions. It is a Hypothesis that this suppresses rankings. It is Verified that these pages give answer engines little to cite.

## Cross-page fact consistency (Verified unless labelled)

| Fact | Canonical | Conflicts found |
|---|---|---|
| Plan prices | ₹1,999 / ₹3,999 / ₹6,499 a month ex-GST; yearly ₹1,599 / ₹3,199 / ₹5,199 | /pricing plan cards render **Yearly by default** (`aria-pressed` on Yearly; `billingCatalog.ts:443 defaultCycle 'yearly'`), so the first visible price is ₹1,599. The title, meta, FAQ and schema say ₹1,999. Both landing pages close with "**From ₹1,599/month**"; every other page says "from ₹1,999" |
| Trial | 14 days, 20 orders, 200 campaign + email sends, no card | Both landing pages: "**20 free order confirmations**, no credit card" and no 200-send mention (`generate-landing-pages.mjs:118`). /features/cod-confirmation: "14 days, 20 orders, no card" (omits sends; acceptable) |
| Nav banner | | "Signup **14-days** trial to access everything" on 130 pages (`MarketingAnnouncement.tsx:71`) |
| Setup time | about 30 minutes (11+ pages) | /whatsapp-app-for-shopify: "Live in about **fifteen minutes**" and FAQ 5 (`generate-landing-pages.mjs:822`) |
| Reply time | | Contact: "Usually answered the same day"; Partners: "we reply the same day"; both landing pages: "usually **within the hour** on a working day" |
| Feature count | | /whatsapp-app-for-shopify says both "with **20 more features**" (hero, line 143) and "**30+ features** included" |
| Metering | Orders and sends are capped per plan | /whatsapp-app-for-shopify: "nothing is metered by us" (line 247) and "unlimited usage", next to a table of order and send caps |
| Unicommerce RTO stat | 39.2% Nov 2025, 21.0% by **March** 2026 (Unicommerce India D2C Report 2026), as used by 12 pages including the benchmark post | /whatsapp-app-for-shopify: "21% by **February** 2026 ... **Unicommerce/Shipway** ... brands that verify orders and optimise courier selection" plus the headline "**verify COD orders run half the RTO**" (lines 203 to 226). /shopify-whatsapp-integration attributes the drop to "prepaid incentives and pre-dispatch address verification" (same source, different mechanism) |
| Cart reminder timing | 25 min / +4 h / +36 h | /shopify-whatsapp-integration "Do this": "Send the cart reminder inside **30 to 60 minutes**". This is a best-practice line, not the default, but it reads as a contradiction (source in `seoTopics.ts`/`journeyExamples.ts`) |
| Meta markup elsewhere | Site's own blogs: AiSensy about 26%, Interakt 10% to 39%, Getgabs 0% | /whatsapp-app-for-shopify: "a **hidden 20% to 30%** markup on every customer message" / "A typical WhatsApp tool" (lines 213, 267), with no source or date |
| Review counts | Trustpilot 4.0 / 5; Product Hunt 5.0 / 8 | None |
| Brand | TopEdge AI | One authored "Topedge AI" (blog/organic-vs-paid-ecommerce-marketing-2026). The others are verbatim quotes or the legal name |
| Instagram | | Contact shows "@topedge_ai" but links to instagram.com/topedgeai_com; Organization sameAs uses topedgeai_com (Verified mismatch; which handle is real is unverified) |

## E-E-A-T findings by factor

- **Experience (38, Estimate).** Only two named customers (Delitech Smart Home, Apex Light), and neither quote names the person who said it. On the landing pages a logo strip shows "Ved Patel" as if it were a brand (`generate-landing-pages.mjs:483`, `socialProof.json:73`). No commercial page carries a dated outcome from the product itself, such as carts recovered or the share of COD orders confirmed. The blogs carry the experience signal. The money pages do not.
- **Expertise (59).** Meta rate maths, the INR WABA deadline, the kurta waterfall and the Shopify Messaging comparison are expert and correct (Verified arithmetic). Ten of the thirteen feature pages carry almost none of that.
- **Authoritativeness (39).** There are 5 Trustpilot and 8 Product Hunt reviews, and the App Store listing went live on 30 Sep 2026. Founders get one-line roles on /about. Person schema has no personal `sameAs` (Verified: Person nodes carry only name, jobTitle, url and image). Blog posts show a byline but no bio block (Verified: no "about the author" text on any of the 5).
- **Trust (72).** Registered office, phone, hours, email, GST/SAC 998314, the legal entity, dated sources, an "our own app" disclosure and "What we could not verify" sections are all present (Verified). The score is held down by unsourced or conflicting claims on /whatsapp-app-for-shopify and the unverified "Meta Business Partner" badge.

## Prioritised fix list

| # | Issue | Severity | Fix (respecting house rules) | File | Label |
|---|---|---|---|---|---|
| F1 | One Unicommerce RTO statistic quoted three ways (February vs March 2026; "Unicommerce/Shipway" vs "India D2C Report 2026"; verification vs prepaid incentives). The headline "brands that verify COD orders run half the RTO" claims a cause the source does not isolate | High | Use the benchmark post's wording: "39.2% at the November 2025 peak, 21.0% by March 2026 among brands that verify orders before dispatch (Unicommerce India D2C Report 2026, read 21 Oct 2026)". Change the heading to "Brands that verify before dispatch ran 21% RTO, not 39%" | `scripts/generate-landing-pages.mjs` lines 203 to 226 | Verified |
| F2 | "Hidden 20% to 30% markup" / "typical WhatsApp tool" has no source or date, and the site's own blogs show 0% (Getgabs, Meta's app) to 39% (Interakt) | High | Replace with a dated, named fact already verified on the blog, e.g. "AiSensy adds about 26% to India marketing messages (read 24 Nov 2026)". Rename the column from "A typical WhatsApp tool" to the named vendors or "Tools that mark up Meta rates" | `scripts/generate-landing-pages.mjs` lines 213, 267 | Verified (claim unsourced); accuracy of 20 to 30% is a Hypothesis |
| F3 | "Meta Business Partner" / "Approved Meta Business Partner" badge on /customers, the footer and the proof wall. The site also says merchants bring their own Cloud API credentials "direct from Meta", which suggests TopEdge may not be a listed partner | High if not listed | Check that TopEdge AI appears in Meta's Business Partner directory. If it does not, relabel the badge "Built on Meta's WhatsApp Cloud API" and drop "Approved". Never show an unverifiable badge | `src/marketing/pages/CustomersPage.tsx:31-32`, `src/marketing/components/ReviewPlatforms.tsx:91`, `MarketingFooter.tsx:292-296`, `ProofWall.tsx:95` | Hypothesis (owner must verify) |
| F4 | Plan cards prerender the yearly price, so crawlers and LLMs read ₹1,599 / ₹3,199 / ₹5,199 as the price, against ₹1,999 in the title, meta, FAQ and schema. Landing pages close with "From ₹1,599/month" | High | Default the toggle to Monthly in the prerender, or show "₹1,999/mo, or ₹1,599/mo billed yearly" on each card. Change the landing footer line to "From ₹1,999/mo, ₹1,599 billed yearly" | `src/marketing/lib/billingCatalog.ts:443`, `scripts/generate-landing-pages.mjs` (footer line and `TRIAL_SHORT`) | Verified |
| F5 | Trial described as "20 free order confirmations, no credit card" on both landing pages | Medium | "14-day free trial: 20 orders and 200 campaign + email sends, no card" | `scripts/generate-landing-pages.mjs:118` | Verified |
| F6 | Setup "about fifteen minutes" vs "about 30 minutes" on 11+ pages | Medium | Use one figure everywhere (30 minutes, per the integration page's step timings of 2 + 10 + 15) | `scripts/generate-landing-pages.mjs:822` and the "Live in about fifteen minutes" block | Verified |
| F7 | "Nothing is metered by us" and "unlimited usage" sit beside order and send caps; "20 more features" vs "30+ features" on the same page | Medium | "Journey and flow runs are not metered; plans differ by orders and campaign sends." Pick one feature count that can be checked against the pricing list | `scripts/generate-landing-pages.mjs:143, 247` | Verified |
| F8 | "Immediate RTO reduction" contradicts the COD page's own advice ("measure your own RTO before and after rather than trusting a headline number") | Medium | "Confirm COD orders before dispatch and offer prepaid" (no outcome promise) | `scripts/generate-landing-pages.mjs:1032` | Verified |
| F9 | 11 of 13 feature pages are under the 800-word feature gate on the same skeleton. Ten have no dated or sourced fact; /features/analytics is flagged low-density (0.152) | Medium | Do not pad. Add 2 or 3 FAQ items per page (accordion, so the hero stays one line) that answer real buyer questions with numbers already verified elsewhere: a cost line at Meta's dated rate, plan availability, a limit. Model on /features/cod-confirmation's dated cost table. Priority: analytics, audience-crm, opt-in-tools, campaigns (campaign cost per 1,000 sends at ₹0.8631 = ₹863.10) | `src/marketing/data/productPages.ts` | Verified (counts); ranking impact is a Hypothesis |
| F10 | Homepage: 389 words, no FAQ; "a returned parcel costs ₹180 to ₹240" has no source on the page | Medium | Keep the hero. Add a 5 or 6 question FAQ accordion below the fold (price, trial, Meta fees, COD confirmation vs prepaid by plan, setup time, App Store vs website billing), with answers taken from /pricing. Add "(Amazon Shipping India, read 21 Oct 2026)" to the ₹180 to ₹240 line | `src/pages/Home.tsx`, `src/marketing/data/home.ts`, `src/marketing/components/home/HomeStickyStories.tsx:112` | Verified |
| F11 | /about: 299 words (gate 400, `thin-content` flag); founders have one-line roles; Person schema has no personal profiles | Medium | Add a 2 or 3 sentence factual bio per founder written by them (what each built and ran before TopEdge AI, only true facts), and link personal LinkedIn profiles via `sameAs`. Add a "how we verify numbers" note linking to the dated-source practice | `src/pages/About.tsx`; Person nodes in the shared schema | Verified |
| F12 | /customers: quotes not attributed to a person; no dated outcome; "Ved Patel" displayed as a logo name | Medium | With written permission, name the person and role behind each quote, and add one dated metric the customer approves from their own dashboard. Never estimate one. Render "Ved Patel, Delitech" only next to his own quote | `src/marketing/pages/CustomersPage.tsx`, `src/marketing/data/socialProof.json`, `generate-landing-pages.mjs:483` | Verified (gap); content must come from customers |
| F13 | Reply-time promise differs ("within the hour" vs "same day") | Low | Use the one support can meet on every page | `src/pages/Contact.tsx:62`, `generate-landing-pages.mjs` | Verified |
| F14 | "Signup 14-days trial" grammar in the site-wide banner (130 pages) | Low | "Start a 14-day free trial" | `src/marketing/components/MarketingAnnouncement.tsx:71` | Verified |
| F15 | Em dash rendered 36 times, all inside the Delitech quote | Low | If the quote is a published review, keep it verbatim. If TopEdge wrote it from a conversation, confirm the wording with Delitech and use a full stop in place of the dash | `src/marketing/data/socialProof.json` / `home.ts` | Verified |
| F16 | Authored misspelling "Topedge AI tracking pixel" | Low | "TopEdge AI tracking pixel" | `src/data/blogPosts.ts` (post organic-vs-paid-ecommerce-marketing-2026) | Verified |
| F17 | Instagram handle shown as @topedge_ai, linked as topedgeai_com | Low | Show the handle the link points to, after confirming which account is live | `src/pages/Contact.tsx:69` | Verified mismatch |
| F18 | "Send the cart reminder inside 30 to 60 minutes" next to a 25-minute product default | Low | "about 25 minutes (TopEdge AI's default), and within the hour at most" | `src/marketing/data/seoTopics.ts` / `journeyExamples.ts` | Verified |
| F19 | Possible cannibalisation: the homepage title and H1 "WhatsApp App for Shopify India" vs /whatsapp-app-for-shopify; /integrations vs /shopify-whatsapp-integration | Low until data says otherwise | Pull GSC queries per URL before changing anything. If both URLs rank for the same query, shift the homepage title to the suite ("All-in-one D2C software for Shopify India") and make /integrations a short hub that links to the guide | `src/marketing/data/pageSeo.ts` | Hypothesis |
| F20 | /blog/cod-to-prepaid shows no "Updated" date although it cites reads from 15 Nov 2026 | Low | Add the visible Updated date and `dateModified` | `src/data/blog*.ts` entry | Verified |
| F21 | Video fallback text "Your browser cannot play this video. Download it instead." is indexable on both landing pages | Low | Keep the fallback link, shorten it to a descriptive label of the video | `scripts/generate-landing-pages.mjs:1113` | Verified |
| F22 | /ai-brain "₹0.10 to ₹0.30 per AI reply" has no source | Low | Show the arithmetic (model price per token × typical reply length, with date) or label it as an estimate | `src/marketing/data/productPages.ts` | Verified (unsourced) |

Not flagged by design: "(2027)" in blog and board titles is an owner rule (PLAN-AND-LOG, 17 Nov). The Hinglish blog section and verbatim Trustpilot spellings are kept as written. No Product or HowTo schema, no "humanising", and no chatbot, bulk-sender or BSP keyword targets are recommended.

## AI citation readiness (Estimate: 66/100)

- Strong: /pricing, /features/cod-confirmation, /whatsapp-abandoned-cart-recovery-app, /shopify-whatsapp-integration and /features/profit-loss. Each opens its FAQ answers with the answer, carries dated rupee figures, and names a source next to each statistic.
- Weak: the homepage, /about and /customers have no FAQ. Ten feature pages have FAQs, but the answers hold no citable number.
- Blocking: the conflicting facts in F1 and F4 to F7. An answer engine that meets two prices, two trial descriptions or two RTO months may cite neither, or cite the wrong one.

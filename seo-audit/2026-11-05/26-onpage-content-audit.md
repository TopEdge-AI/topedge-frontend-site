# TopEdge AI: page-by-page content and on-page audit
**Date: 5 Nov 2026. Data: GSC 90 and 28 days to 4 Nov, live prerendered HTML of all 157 sitemap URLs fetched today, repo source.**
Action list: `25-page-refine-list.csv`. Day 1 of that list is 6 Nov.

Labels: **Verified** = read in live HTML, GSC data or repo today. **Estimate** = my judgement or arithmetic on stated inputs. **Hypothesis** = plausible, untested.

## What this audit did and did not read

| Coverage | Pages |
|---|---|
| Full text read | 9 alternative posts; best-whatsapp-apps; best-whatsapp-automation-tools; automation pillar; cart recovery; 3 COD/RTO posts; API pricing; Meta templates; template rejected; opt-in; 14 compare pages (the 10 pairwise pages with lines shared by 5+ pages collapsed after reading one in full); 14 features; 5 tools; home, pricing, meta-rates, about, customers, integrations, shopify-whatsapp-integration, whatsapp-templates, docs index, journey index |
| Digest only: opening, every H2/H3, up to 14 to 22 claim sentences, plus a pattern scan of all text | best-shopify-app-for-abandoned-cart, ai-chatbot, shared-inbox, what-to-automate-first, checklist, what-is, vs-email, how-to-automate, how-to-choose, shopify-seo-experts, trending, organic-vs-paid, organic-leads, profitable, funnel, upsell (16 posts) |
| Structure and metrics only | 9 blog hub, category and pagination pages (only `/blog` opening seen); 35 other docs; 25 festival pages; 4 journey sub-pages |

**So the brief's "read every page" was not fully met: 16 posts were read by digest.** A false claim in an unread paragraph of those 16 could remain. Competitor prices were not re-fetched from vendor sites; conflicts were judged against the site's own text and `src/data/sources.ts`. Meta rates and third-party statistics were not independently re-verified.

---

## 1. Findings ranked by impact

| # | Finding | Evidence | Label |
|---|---|---|---|
| 1 | **Named competitors are accused of a markup our own source register contradicts.** | WATI rows on 4 pages against `watiPricing` read 2 Nov 2026 ("Standard rates"). See 2.1. | Verified |
| 2 | **TopEdge is implied to be a BSP; a Meta Business Partner mark has no evidence behind it.** | AiSensy post; `/customers`, `/about`, footer, Verified-by block. See 2.2, 2.3. | Verified text; status unknown |
| 3 | **`zoko alternative`, the largest non-brand query, is sliding.** 455 impressions, 0 clicks. | Weekly position: 7.2 (wk 40), 7.2 (wk 41), 14.9 (wk 44), 16.8 (wk 45). Slide predates the 2 Nov update. Cause unknown. | Verified; cause Hypothesis |
| 4 | **Price comparisons flatter TopEdge by using a plan the scenario cannot use.** | Interakt and Updatrr tables use Launch (100 orders). See 2.5. | Verified arithmetic |
| 5 | **No TopEdge first-party result exists anywhere.** Not one merchant RTO, reply rate, recovery rate or approval time. The benchmark says so: "None of it is TopEdge merchant data." | Whole-site read and scan. `/customers` is titled "Case Studies" with no figure. This is the largest gap against Part 6 rule 1 and would settle conflicts 2.8 and 2.9. | Verified |
| 6 | **Pairwise compare boards are the clearest scaled-content risk that is live and indexed.** | 3 identical H2s on 10 of 10; 56% boilerplate sentences; no opening prose; no "where they are better". Section 6. | Verified |
| 7 | **Invented or unsourced numbers remain,** one with a live footnote admitting "the source brief". | Section 2.6. | Verified absent a source |
| 8 | **`/pricing` shows locked features as plain text on Launch.** Lock is an `aria-hidden` icon, so "Journey Branch" and "COD → prepaid" read as Launch features to text readers. | HTML `li.is-locked` with no text marker. AI misreading is Hypothesis. | Verified |
| 9 | **Highest-value utility pages have zero contextual links.** Section 5. | RTO calculator, link generator, meta-rates, whatsapp-templates, all journey examples, warranty, Bitespeed post. | Verified by heuristic count |
| 10 | **Internal note published on the Kanal post** ("Do not reuse angles that fail a sanity check."). | Live, on a page with 322 impressions. | Verified |
| 11 | **Two "demand signals" are not sustained demand.** | `whatsapp flow template`: all 106 impressions on 7 and 8 Oct. `getkanal alternatives`: all 260 between 28 Oct and 4 Nov at position 2 with 1 click. Do not plan around either. Whether Kanal is human traffic is Hypothesis. | Verified dates |
| 12 | **Rollout advice conflicts across posts.** | Section 2.10. | Verified |
| 13 | **Off-ICP posts carry the weakest claims and little traffic.** | Section 7. | Verified |

**What passed.** Launch ₹1,999, Growth ₹3,999, Scale ₹6,499, yearly ₹1,599, ₹3,199, ₹5,199, 14 days, 20 orders, 200 sends, 100, 800 and 1,500 orders: no wrong figure found in text read or scanned. Trustpilot 4.0 from 5 and Product Hunt 5.0 from 8 are consistent (36 blog widgets omit the read date). Basic COD on every plan and Growth+ gating are stated correctly wherever the plan is discussed explicitly; the gaps are pages that do not discuss the plan. All posts carry a real byline. No page states that TopEdge offers Meta WhatsApp Flows. **Verified.**

---

## 2. Contradictions and risky claims, with exact text

### 2.1 Markup accusations (fix first)
| Vendor | Claim | Conflicts with |
|---|---|---|
| WATI | `/compare/wati`: "Platform usage charges applied above Meta base rates". `/compare/alternatives`: "Usage charges above Meta base rates". 4-way FAQ: "All three apply platform charges on top of Meta conversation rates" | `/blog/wati-alternative-shopify-india`: "On the markup question, which is the one that compounds, WATI is clean." `best-whatsapp-apps`: "Meta's own pricing passed through rather than resold." `sources.ts`: "Standard rates", read 2026-11-02 |
| WATI, same post | Summary: "WATI applies platform usage charges above Meta's base rates and publishes no single all-in India entry price." | Same post: "WATI's India pricing runs Growth at ₹2,699, Pro at ₹5,799 and Business at ₹16,799" |
| Interakt | `/compare/interakt`: "Platform usage charges applied on top of base Meta conversation rates" | AiSensy post: "No published per-message markup". Interakt post: "Meta's own fees are identical on both sides". The 4-way FAQ cites an AI add-on as evidence of a Meta markup, which it is not |
| AiSensy | Boards say usage charges on top, unscoped | Footnotes limit it to the service line |
| Bitespeed | "Platform usage charges and conversation markup fees applied" | Source is "public listings / third-party summaries"; `sources.ts` says BiteSpeed "publishes no prices" |

Boards also state their basis as "TopEdge product positioning", which undercuts them as evidence.

### 2.2 BSP implication
`/blog/aisensy-alternative-shopify-india`: "Every platform below is an official WhatsApp Business Solution Provider, so the Meta message rate is identical on all six." The six include TopEdge. Same post: "Confirm the vendor is a Meta Business Solution Provider". Part 1 says TopEdge is not one. **Verified false as to positioning.**

### 2.3 Partner marks
"Meta Business Partner", with "WhatsApp Cloud API, direct from Meta" on `/customers`, plus alt text "WhatsApp Business Partner". Nothing in the repo or memory evidences partner status. **Owner must confirm. Unknown, not proven false.**

### 2.4 False statements about our own sourcing
- `best-whatsapp-automation-tools`: "Every price in this article is on a vendor's own published page and linked where we state it. Where a vendor publishes nothing, we say so rather than estimating." Same post: Bitespeed "About ₹15,000 baseline", "From about ₹24,000", "USD floor (~$250+)", and "BiteSpeed publishes no prices at all". **Verified.**
- `/tools/best-whatsapp-tool-for-shopify`: "every competitor detail is taken from that vendor's own published pages". Bitespeed figures are third-party. **Verified.**
- `/compare`: "Every board shows when it was checked. Current boards: Sep 2026." `/compare/wati` footnote has no date; others read 21 Oct or 2 Nov. **Verified.**

### 2.5 Arithmetic and framing
| Page | Text | Problem |
|---|---|---|
| Interakt post | "a store doing a few hundred orders a week" priced at "₹1,999 (Launch)"; total ₹2,499 to ₹3,499 vs ₹8,249 | Launch caps at 100 orders a month. Scale gives ₹6,999 to ₹7,999, a gap of ₹250 to ₹1,250. **Verified arithmetic** |
| Updatrr post | "Both give you AI. One is about ₹1,02,000 a year, the other ₹19,188" | Excludes tokens; 100-order plan |
| WATI post | "Order updates and COD confirmations together cost ₹402.50" | Includes ₹230 service replies; utility is ₹172.50 |
| Reduce-RTO post | "pay for itself several hundred times over" on one parcel | Same post: "roughly three times over" |
| Best-apps | "One prevented return pays for the year." | ₹57.50 x 12 = ₹690 vs ₹180 to ₹240 |
| Best-apps, Meta templates post | "a 26% spread is over ₹11,000" on marketing sends | AiSensy's 26% is service-line only |
| `/compare/alternatives` | "Four of the ten platforms above bill in USD or EUR" | Table shows five |
| Dondy, `/pricing`, meta-rates | "about ₹1.38", ₹13,810 | Implies about ₹73 per dollar; other posts use ₹88, giving ₹1.66. Method unstated |
| Getgabs | Gap computed vs Launch while arguing for COD to prepaid | Needs Growth: ₹3,031, not ₹1,031 |

### 2.6 Invented or unsupported numbers
| Page | Exact text | Label |
|---|---|---|
| organic-vs-paid | "roughly 27.6% of clicks", "a mere 2.1%", "lifting AOV by 15% to 35%", "convert 28% higher", "over 93% of shoppers" | Footnote: "cited as research snapshots from the source brief". No source |
| how-to-automate | "typically 60 to 75 percent of incoming queries"; "the return turns positive within the first 45 to 60 days"; "₹80 to ₹300" per failed delivery | No source; last conflicts with ₹180 to ₹240 |
| Automation pillar | "80% of support intents" | No source |
| Getgabs | "somewhere between 10,000 and 50,000 messages a month" | No source; Getgabs claims 0% markup |
| Best-apps | "converts several times better" | No source |
| Cart post | "Recovery rates here routinely run several times those of cart-only abandoners." | No source |
| Intent detection | "On a typical Indian store those three categories are most of the inbound volume." | No source |
| RTO calculator | "Indian D2C typically sits between 50% and 70%" | No source |
| trending | All margin bands; "₹50,000 to ₹80,000 starting capital" | No source |
| profitable | "15 to 25 percent net margin is healthy" | No source |
| AI chatbot | "usually the most frequent inbound message" | No source |
| `/about` | "2K+ customers", "50K+ customers" | Client brand figures, unsourced |
| `/compare/updatrr` | "est. ~₹4.50 per AI conversation" | No source |

The ₹0.10 to ₹0.30 BYOK range is labelled an estimate on some pages, unlabelled on others. Label it everywhere.

### 2.7 Causal overclaim on RTO
Reduce-RTO post, Hinglish: "Yeh paanch steps hi Unicommerce ke 39.2% se 21.0% wale gap ke peeche hain." FAQ: "Isi tarah Unicommerce ke data mein RTO 39.2% se 21.0% tak aaya." Benchmark footnote: "different months and different cohorts, so read the gap as directional". Benchmark itself: "fell to 21.0% by mid-2026" (summary), "by March 2026" (verdict), "February 2026" and "Unicommerce/Shipway" (FAQ). Also "58% of COD orders come back" drops "festive-quarter". **Verified.** Use March 2026 and one source name.

### 2.8 Setup time (conflict; approve one line)
"Typically live in about fifteen minutes" (home). "About fifteen minutes from install to your first approved journey" (integrations). "roughly half an hour of actual work" (integration guide). "about 30 minutes" (docs). The checklist post says both. **Recommended line: "About 30 minutes of setup. Meta business verification and template review are the wait."** Replace with a measured median when available.

### 2.9 Template approval time (conflict; approve one line)
"Most brands clear review in 24 to 48 hours" (customers). "usually hours" (integration). "usually minutes, up to 24 hours" (docs). "minutes to a couple of days" (what-to-automate). **Recommended, matches the most careful existing wording: "Many templates clear in minutes and most within a day. Meta guarantees no time, so submit days ahead."**

### 2.10 Other product and competitor conflicts
| Topic | A | B |
|---|---|---|
| Templates on switching | Bitespeed: "Templates, segments and automations do not port." | 10 compare FAQs: "Your approved templates belong to your WhatsApp Business Account". Nuance missing everywhere: a USD WABA needing INR migration means a new WABA and re-approval, per the pricing guide |
| Risk scoring | Best-apps: "RTO risk filtering" | `/features/cod-confirmation`: "It does not predict which buyers are risky." |
| Email | Bitespeed post: "WhatsApp and Instagram first", "Email, SMS and web chat leave the contract" | Canonical sentence, plan limits and `/docs/reference/email` |
| Warranty | Boards: "Built-in automated warranty batch creation" | `/features/warranty`: "you pick, not the bot" |
| Non-Shopify | `/tools/best-whatsapp-tool`: "only work with Shopify" | `/docs`: inbox and flows "work without Shopify"; `/compare/updatrr`: "Web-based Software" |
| Zoko COD | `/compare/zoko`: "convert COD → prepaid(zoko.io)" | Zoko post: "Not a named native workflow" |
| Zoko identity | Kanal post and `/compare/alternatives`: "India-native" | Zoko post: "There is no rupee plan" |
| Dondy | "a global app, not an India-first one" | Same post: "any comparison framing it that way is wrong"; 821 vs 835 reviews |
| Bitespeed AI | `/compare/bitespeed`: "No official information found." | Post: "roughly $100 a month each" |
| Updatrr price | `/compare/updatrr`, alternatives, best-apps: about $19.99 | Own footnote and post: $29.99 |
| WATI price | Zoko post: "We have not verified its current plan limits" | `sources.ts` reading dated 2 Nov |
| Rollout order | what-to-automate: cart, COD, updates | how-to-automate: COD, updates, cart. **Use the journey-examples rule: COD first if RTO hurts, cart first if mostly prepaid** |
| Plan-free feature talk | `/features/journeys` conditional routes, meta-manager COD to prepaid blueprint, home hero, `/whatsapp-templates` sample | Docs: "On Launch, skip the branch". No gate shown |
| Testimonial | "mostly every feature is unlocked on every plan" on 32 pages, beside gate text on 10 boards | Real quote, but rotate it off pricing and compare pages |
| "No card" | "14 days, no card" | `/pricing`: "No card on this site", "Pay later in dashboard". Owner to confirm no card is ever taken in trial |
| Category | Compare FAQ: "get one utility template approved and watch a real cart recovery" | Cart reminders are marketing everywhere else |
| Stale billing words | "conversation fees/rates" on 22 URLs (`/blog/updatrr` uses partly as a quote) | Meta bills per delivered message; best-apps says both within one section |

### 2.11 Meta WhatsApp Flows
No explicit claim (**Verified**). Risky implications: `/features` "generates a WhatsApp flow", `/features/flow-builder` "Shopify-aware WhatsApp flow", meta-manager "open a flow or catalog". The site appears for `whatsapp flow template` and `whatsapp flows shopify` (19 at 21.4). **Do not target these as a capability.** Add one honest disambiguation line on meta-manager, flow-builder and the pillar.

---

## 3. Query-to-page match: near wins

| Query | Page | Impr, pos | Exact answer present? | Action |
|---|---|---|---|---|
| zoko alternative | Zoko post | 455, 9.7 (now about 16.8) | Partly; opening defers | New opening, links, resolve COD fact |
| best whatsapp app for shopify | best-apps | 34, 15.7, 7 clicks in one week | Ranks TopEdge first without reasoning | Ranking criteria, links |
| bitespeed alternative | Bitespeed post | 42, 18.3 | Good "who" answer; sourcing weak | Lead with "no published price" |
| interakt alternative | Interakt post | 34, 25.1 | Thin | Deepen, correct table |
| how to automate... without getting banned | Cart post | 12, 15 | **Missing** | New H2 |
| whatsapp flows shopify | Pillar | 19, 21.4 | **Missing** | Honest H2, not a capability |
| rto rate by product category | Benchmark | 9, 6.7 | Yes, below fold | Move into opening |
| cod return rates by category | Benchmark | 7, 10.7 | **No dataset exists** | Say so plainly |
| top shopify support apps with whatsapp | best-apps | 10, 9.1 | Partial | Support section already answers; link anchor |
| dondy pricing, getgabs pricing | Compare boards | 3, about 6.5 each | Yes, buried | Lead with price |
| is ecommerce business profitable in india | Profitable | 3, 6.7 | Yes | Refresh only |

Note: GSC per-query rows cover a fraction of page impressions; many pages (automation-tools 60 impressions, position 6.8) show almost no named query. **Verified.**

## 4. Cannibalisation map

| Query | URLs and evidence (impr, pos) | Decision |
|---|---|---|
| zoko alternative | Zoko post 455, 9.7; home 8, 13.1; `/compare` 3, 76 | Keep post primary. `/compare/zoko` links to it. No merge |
| getkanal alternatives | Kanal post 258, 2.0; `/compare/kanal` 10, 3.4 | Keep both. Healthy double listing |
| best whatsapp app for shopify | best-apps 34, 15.7; pillar 9, 34.8 | Keep best-apps. Pillar anchors point to it |
| best whatsapp commerce tools | best-apps 38, 41.8; pillar 6, 26.3 | Keep best-apps; monitor |
| shopify whatsapp automation | Pillar 17, 15.4; checklist 6, 57.2 | Keep pillar. Checklist stays go-live only |
| ecommerce whatsapp automation | what-is 5, 30.4; pillar 3, 17.3 | **Merge what-is into pillar, 301** |
| whatsapp automation for ecommerce | what-is 3, 72.7; pillar 3, 38.0 | Same |
| (no named query) | what-to-automate 3, 23.3 | **Merge into checklist, 301** |
| wati vs aisensy | 3-way 2, 40.5; 4-way 5, 26.0 | **Merge 3-way into 4-way, 301** |
| best-apps vs automation-tools | 246 vs 60 impressions; little named overlap | Keep both for now with roles: job-based global vs India cost table. Reassess 5 Dec: Hypothesis that one may need to go |
| abandoned cart recovery | Cart post vs best-shopify-app 1, 11 | Keep. Workflow vs shortlist |
| Docs duplicates | `dash.topedgeai.com/docs/...` appears in GSC (audience crm 5, 55.4; abandoned cart 3, about 90) | Canonical or noindex the dash copies. Verified present; separate fix |

No deletions recommended anywhere. Trap: `BLOG_SLUGS` drives both the sitemap and prerender, and `check-blog-sources` requires 3 inbound and 3 outbound links, so merges must update `scripts/marketing-urls.mjs`, redirects and link counts. Noindex must not be done by removing a slug.

## 5. Internal-link plan (contextual body links only)

Counted from live HTML, excluding nav, footer, related cards, "Also compare" and "Related:" lines, link-dominated blocks and `/signup`. Sentence-context detection is a heuristic, so ±1 or 2 is possible. **Estimate on Verified HTML.**

| Target | Contextual sources today | Add from | Anchor |
|---|---|---|---|
| `/tools/rto-cost-calculator` | 0 | benchmark, reduce-RTO, cod-to-prepaid, cod-confirmation feature, profit-loss | RTO cost calculator |
| `/blog/bitespeed-alternative-shopify-india` | 0 | best-apps, automation-tools, alternatives, Updatrr post | Bitespeed alternative under ₹5 lakh a month |
| `/pricing/meta-rates` | 0 | API pricing guide, cod-confirmation feature, template-rejected | Meta India rate card and cost calculator |
| `/whatsapp-templates` | 0 | Meta templates post, template-rejected, checklist, meta-manager, reduce-RTO | copyable WhatsApp order and COD templates |
| `/whatsapp-journey-examples` + 4 children | 0 | pillar, journeys, checklist; each child from its matching post | WhatsApp journey examples with costs |
| `/tools/whatsapp-link-generator` | 0 | `/whatsapp-templates`, opt-in tools, `/tools`, connect-whatsapp | free WhatsApp link generator |
| `/tools/best-whatsapp-tool-for-shopify` | 0 | how-to-choose, `/compare` | 6-question WhatsApp tool finder |
| `/features/warranty` | 0 | Updatrr board and post, Interakt board, Getgabs post | WhatsApp warranty registration on Shopify |
| `/blog/zoko-alternative-shopify-india` | 2 | how-to-choose, best-apps, API pricing, alternatives, `/compare/zoko`, cod-to-prepaid | Zoko alternative for Shopify India |
| `/blog/best-whatsapp-apps-for-shopify` | 3 | integration guide, alternatives, how-to-choose, Kanal post, Zoko post | best WhatsApp apps for Shopify, ranked by job |
| `/features/cod-confirmation` | 5 | best-apps, pillar, integration guide, RTO calculator, `/compare/wati` | WhatsApp COD confirmation for Shopify |
| `/features/profit-loss` | 6 | `/compare/bitespeed`, `/compare/updatrr`, `/pricing` | India P&L after COD, RTO and ads |
| `/compare/*` pairwise | 0 to 4 | Each blog alternative, in its first section | row-by-row comparison, varied |

The opposite problem: Journeys anchors read "Journeys" 15 times, Pricing "pricing" 10 times. Vary only when editing a sentence anyway. Add links after the substance, per the depth rule; do not add "Detail: link" endings.

## 6. Scaled-content assessment

Masked comparison: vendor names, festival names and numbers replaced, then compared. "Boilerplate" = share of a page's sentences found on at least 30% of cluster pages. **Verified measurements.**

| Cluster | Pages | H2 skeleton Jaccard, median | Sentence Jaccard, median | 8-word shingle, median | Boilerplate, median (max) | Risk |
|---|---|---|---|---|---|---|
| Festival | 25 | 1.00 | 0.54 | 0.51 | 70% (74%) | **High** |
| Compare pairwise | 10 | 1.00 | 0.33 | 0.32 | 56% (63%) | **High** |
| Journey examples | 4 | 0.35 | 0.13 | 0.11 | 27% (27%) | Medium |
| Alternative posts | 9 | 0.20 | 0.04 | 0.03 | 13% (16%) | Low; title pattern repeats |
| Docs reference | 16 | 0.20 | 0.04 | 0.03 | 8% (10%) | Low |
| Docs guides | 10 | 0.20 | 0.02 | 0.02 | 4% (5%) | Low |
| 11 feature pages | 11 | 0.07 | 0.02 | 0.01 | 4% (5%) | Low on duplication; thin on facts |
| All blog posts | 36 | 0.19 | 0.02 | 0.01 | 5% (14%) | Low |

Whether Google treats any of this as scaled abuse is **Hypothesis**; the numbers show structure, not a penalty.

**Compare boards.** Fix is not more words. Each needs its own 3-sentence verdict, one fact found nowhere else, a "where they are better" line and only rows with specific content. Delete cells reading "Standard." and resolve "verify live". Cut the repeated review and FAQ blocks or vary them. Do Bitespeed, Updatrr, WATI, Interakt first.

**Alternative posts.** Interakt, WATI, Bitespeed and AiSensy each follow a similar "why, table, TopEdge fit, FAQ" but are genuinely different in content. Do not impose one new skeleton while deepening; Part 4's list (cost table, shortlist, when to stay, what carries over) applied uniformly would create the pattern Part 6 rule 7 warns of. Vary order and headings. Identical CTA "Run cart recovery on your Shopify store" appears on 36 posts, including SEO experts.

**Festival.** 20 of 25 Discovered, 4 unknown, 1 indexed. Published 1 Nov, so coverage means little yet. **Do not touch before 16 Nov.** On 16 Nov, per Part 5: if most are indexed, leave them. If most remain Discovered, consolidate the weakest into the pillar, keep the commercially largest festivals, and rewrite the 70% shared copy on those kept. The 25x testimonial block and identical H2s are the things to vary. `/whatsapp-festival-templates` being Crawled, not indexed is the signal to watch.

**Docs.** Not scaled. 13 Discovered is a crawl-priority matter.

## 7. Off-ICP and low-value pages

| Page | Data (90 days) | Publish date | Decision |
|---|---|---|---|
| organic-ecommerce-leads | 0 impressions, Discovered | 4 Oct | **Noindex**, keep live |
| trending-products | 9 impressions, 6.8, 0 clicks | 4 Oct | **Noindex**, keep live |
| organic-vs-paid | 45 impressions (4 in 28 days), 2 clicks | 23 Sep | Strip invented numbers now; noindex 5 Dec if under 5 in 28 days |
| what-is | 23, 28.8, 0 clicks | 10 Sep | **Merge** |
| what-to-automate-first | 3, 23.3 | 2 Sep | **Merge** |
| 3-way compare | 2, 40.5 | n/a | **Merge** |
| shopify-seo-experts | 24, 79.9, 0 clicks | **3 Nov, 2 days old** | Too young (Part 10 lesson). Link-exchange post, owner decision. Review 5 Dec |
| best-shopify-upsell-apps | 0 | **3 Nov** | Too young. Keep; COD section on-topic. Review 5 Dec |
| funnel benchmarks | 12, 9.4 | 1 Nov | Keep |
| profitable-ecommerce | 114, 6.4, 3 clicks, all recent | 4 Oct | **Keep and refresh**; supports P&L |
| how-to-automate | 59, 12.2, 1 click | 4 Oct | **Keep**, remove invented numbers |

Flag for the owner: Part 7 says do not use link exchanges, yet two posts exist for reciprocal deals. Disclosure is present. Decide explicitly. The SEO experts post lists someone at #2 under an "SEO Experts" title, and the working notes say never to describe him as one; the entry text scopes him to measurement, but the title and FAQ "Who are the best Shopify SEO experts" still imply it.

## 8. AI-citation readiness

**Ready now (Verified):** API pricing guide (rate table, dates, what changed), `/pricing/meta-rates`, benchmark (tables, method, what could not be verified), cod-to-prepaid (₹68, "What we could not verify"), `/features/cod-confirmation`, `/features/profit-loss`, `/shopify-whatsapp-integration`, `/compare/alternatives` once corrected.

**Weak:** pairwise boards have no definition or verdict to extract. Raw HTML concatenates values: "TopEdge AI0% WhatsApp", "BitespeedPlatform usage charges", "Trustpilot4.05 reviews", "10 October 20265.0 on Product Hunt". **HTML Verified; misreading by AI engines is Hypothesis.** Add whitespace or visually hidden separators, because "4.05 reviews" is the kind of thing an engine could misquote. No opening answer: compare boards, Meta templates post, 11 thin feature pages, `/about` (noun reversed), home.

**Generic-AI test (Estimate):** could be written without product access: organic-leads, trending, organic-vs-paid, how-to-automate, what-is, vs-email, what-to-automate, checklist, and the tile copy on thin feature pages. Pages only TopEdge could write: API pricing guide, Zoko, Kanal, Updatrr, cod-to-prepaid, reduce-RTO Hinglish templates, COD and P&L features.

## 9. [NEEDS REAL DATA] list for the owner

1. Is TopEdge a Meta Business Partner? Show the record.
2. Median time to first approved template and first live journey, from dashboard logs.
3. From Delitech and Apex, with permission: COD confirmation reply rate, RTO before and after, recovered orders, warranty registrations.
4. Confirmed against unconfirmed RTO in one period.
5. Share of inbound chats resolved by intent routing; top inbound questions.
6. Is a card ever taken during trial?
7. Is warranty batch creation automated or manual? Does TopEdge work without Shopify, and how far?
8. Delitech 2K+ and Apex 50K+ customer figures: source.
9. A CA's view on "you cannot claim input credit" for foreign SaaS invoices.
10. Today's reading of zoko.io on COD to prepaid, and wati.io and interakt.shop on markup, before Day 2.

## 10. Suggested 14 days (Day 1 = 6 Nov)

| Day | Date | Work |
|---|---|---|
| 1 | 6 Nov | False or leaked text: AiSensy, automation-tools, Kanal, `/compare/updatrr`; owner confirms Partner mark |
| 2 | 7 Nov | Markup alignment: WATI, Interakt, 4-way, alternatives, WATI post |
| 3 | 8 Nov | Arithmetic: Updatrr, Dondy, Getgabs |
| 4 | 9 Nov | Unsupported numbers: reduce-RTO, benchmark, how-to-automate, organic-vs-paid |
| 5 | 10 Nov | Gating and standard lines: pricing, home, journeys, meta-manager, features, integrations, finder |
| 6 | 11 Nov | Zoko post and board; SERP check first |
| 7 | 12 Nov | Bitespeed post |
| 8 | 13 Nov | best-apps |
| 9 | 14 Nov | Pillar, cart post, link generator |
| 10 | 15 Nov | `/compare/bitespeed` |
| 11 | 16 Nov | **Festival inspection only** |
| 12 | 17 Nov | RTO calculator, warranty |
| 13 | 18 Nov | Interakt post deepening |
| 14 | 19 Nov | Merges, noindex, re-measure; recheck getkanal |

Run `npm run build:netlify` before any push. Part 7 still applies: no title rewrites on zero-CTR comparison pages. The new opening sentences here change body text only. CSV note: `current_pos` and `impr_90` are for the target query on that URL; rows marked `[page-level figures]` use page totals because GSC has no row for that query.

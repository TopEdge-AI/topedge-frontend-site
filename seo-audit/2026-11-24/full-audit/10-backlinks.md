# 10. Backlink profile and link prospects, topedgeai.com

**Run date: 24 Nov 2026.** Read-only audit. Nothing was sent, submitted, edited or uploaded.

Labels used throughout: **Verified** (source + date), **Estimate**, **Hypothesis**.

---

## 0. Sources used and sources missing

| Source | Status | Confidence |
|---|---|---|
| Common Crawl Web Graph, release `cc-main-2026-aug-sep-oct`, `commoncrawl_graph.py`, 24 Nov 2026 | **Used.** Domain-level only | 0.50 |
| Verification crawler `verify_backlinks.py`, 24 Nov 2026 | **Used** | 0.95 |
| Direct page fetches (curl) of 45 candidate and listing pages, 24 Nov 2026 | **Used** | high for what the HTML says |
| `parasite_risk.py`, `domain_history.py` | **Used** (prospect screening, domain age) | n/a |
| OpenSEO/DataForSEO pull of 2 Nov 2026 (from repo, not re-run) | **Reused, 22 days old** | 1.00 at pull date |
| Moz API | **Missing** (no key, `backlinks_auth.py --check`, Tier 0) | n/a |
| Bing Webmaster | **Missing** | n/a |
| Keywords Everywhere | **Missing** | n/a |
| Web search for "topedgeai.com" mentions | **Mostly failed.** DuckDuckGo served a bot challenge; Brave returned only topedgeai.com's own pages for the brand queries, then rate-limited. I did not work around the challenge. | see section 3 |

**No DA, DR or Spam Score is quoted from any new source, and none is estimated.** The 47 / 8 / 37 numbers below are the 2 Nov OpenSEO figures. Common Crawl does not return in-degree or referring-domain counts in this script's output, so **in-degree is not available for any domain.**

**Backlink Health Score: INSUFFICIENT DATA.** At Tier 0 fewer than 4 scoring factors have a data source, so no numeric score is given. `validate_backlink_report.py` returned FAIL on my first payload for a bad test input (see 5.3); the only remaining flag is an artefact of my trimming the payload, not a finding about the site.

---

## 1. Common Crawl domain metrics (Verified, CC release cc-main-2026-aug-sep-oct, run 24 Nov 2026, confidence 0.50)

Lower rank number = more central. PageRank is the raw CC value.

| Domain | PageRank rank | Harmonic centrality rank | Harmonic centrality | PageRank (raw) | Hosts in graph |
|---|---|---|---|---|---|
| wati.io | 61,883 | 20,788 | 17,475,174 | 4.45e-07 | 38 |
| aisensy.com | 67,421 | 432,961 | 14,779,552 | 4.05e-07 | 26 |
| interakt.shop | 78,607 | 22,765 | 17,447,718 | 3.47e-07 | 4 |
| zoko.io | 146,610 | 1,884,031 | 14,299,739 | 1.78e-07 | 11 |
| delightchat.io | 106,196 | 2,183,425 | 14,171,338 | 2.52e-07 | 4 |
| bitespeed.co | 646,463 | 5,858,839 | 14,046,828 | 4.60e-08 | 8 |
| **topedgeai.com** | **1,896,532** | **5,887,441** | **14,036,900** | **2.02e-08** | 3 |
| updatrr.com | 1,886,277 | 5,911,620 | 14,035,207 | 2.02e-08 | 2 |

All eight are in both the crawl and the rankings (`in_crawl` and `in_rankings` true).

Reading it (my interpretation, labelled as such):
- **Hypothesis-grade, but consistent:** TopEdge AI and Updatrr are statistically indistinguishable in the graph (PageRank rank 1.897M vs 1.886M). Both sit at the floor. Bitespeed is about 3x higher on PageRank rank. The incumbents (wati, interakt, aisensy) are 25 to 30x higher.
- The Common Crawl window is Aug to Oct 2026, so links created after about October are not reflected. The domain was registered 25 Feb 2025 (Verified, `domain_history.py` WHOIS, 24 Nov), so it is under 2 years old. `domain_history.py` reported risk "unknown" because I supplied no baseline topic; no expired-domain heritage concern was evidenced.
- The 2 Nov OpenSEO comparison (Verified, 2 Nov): DelightChat 388 referring domains vs TopEdge 47. CC rank order (DelightChat 106k vs TopEdge 1.9M PageRank rank) agrees in direction.
- CC is a crawl sample, not a complete link index. A high or low rank is not a ranking factor measurement.

---

## 2. Which known backlinks are live (Verified, verify_backlinks.py + direct HTML, 24 Nov 2026)

Target `https://topedgeai.com`. Verification confidence 0.95.

| Linking page | Status | rel | Anchor | Notes |
|---|---|---|---|---|
| apps.shopify.com/topedge-ai | verified, 200 | Website link: `noopener noreferrer` (dofollow); Pricing link: `nofollow noopener` | "Website" | **Docs link now points to `https://topedgeai.com/docs`** (the 2 Nov playbook said it pointed to `dash.topedgeai.com/docs`, so that fix has been made). **Privacy link still points to `https://dash.topedgeai.com/privacy`.** |
| storeleads.app/reports/shopify/app/topedge-ai | verified, 200 | `follow` | "TopEdge Ai" | Machine-generated profile. |
| saashub.com/topedge-ai | verified, 200 | `follow` (hero "Visit website"); pricing and blog links `nofollow` | "Visit website" | **New against the repo.** The 2 Nov doc said TopEdge was not on SaaSHub. A listing now exists. Whether it is claimed is not confirmed. |
| clickpost.ai/blog/rto-reduction-tools | verified, 200 | **`nofollow noopener`** on both `topedgeai.com/` and `/pricing` | "TopEdge AI" | **New finding.** TopEdge is named in the "10 tools" list: "TopEdge AI (WhatsApp COD confirmation + cart recovery)", with the 0% markup claim. Editorial mention, nofollow. |
| wanderlog.com/it/list/geoCategory/171069/best-spas-in-ahmedabad | verified, 200 | `noopener` (dofollow) | the bare URL | Still live. This is the wrong-topic salon listing. Correction request is drafted but unsent (`2026-11-02/outreach/directory-listing-corrections.md`). |
| pickyourapp.com/products/topedge-ai | page 200, **no link to topedgeai.com** | n/a | n/a | Page names TopEdge AI 72 times but links only to `apps.shopify.com/topedge-ai`, with a "claim profile" link at `/tools/profile/claim/topedge-ai`. This is an unlinked mention (section 3). |
| producthunt.com/products/topedge-ai | **error: HTTP 403** | n/a | n/a | Bot-blocked. Not verified either way. |
| trustpilot.com/review/topedgeai.com | **error: HTTP 403** | n/a | n/a | Bot-blocked. Not verified. (PLAN-AND-LOG says Trustpilot 403 is a bot block.) |
| G2, Capterra, AlternativeTo, Crunchbase, LinkedIn | **HTTP 403** | n/a | n/a | Bot-blocked. Not verified. |
| shoplist.co, letsmetrix.com, heyapps.dev | **not verified** | n/a | n/a | The 2 Nov doc says these link to us. I only knew their homepages, not the listing URLs, so the crawl of the homepages (no mention) proves nothing. Ask OpenSEO for the exact source URLs. |
| magicpin.in, bestsalons.com, khojosale.com | **not re-checked** | n/a | n/a | Exact source URLs not in hand. 2 Nov OpenSEO says they exist. |

**Net: five links I could confirm are live today (Shopify App Store, Store Leads, SaaSHub, ClickPost, Wanderlog). Of the five, three are dofollow and relevant (Shopify listing website field, Store Leads, SaaSHub); one is a relevant editorial mention that is nofollow (ClickPost); one is irrelevant (Wanderlog).**

2 Nov baseline (Verified, OpenSEO/DataForSEO, 2 Nov 2026): 82 backlinks, 47 referring domains, 8 non-spam, 37 spam (spam score 45 to 80). Not re-pulled today because no key is available to me. Referring domains are an estimate for today.

---

## 3. Unlinked or weakly linked brand mentions (easy asks)

Honest limit: I could not run a general web search for "topedgeai.com" or "TopEdge AI" Shopify. The list below is what I found in the pages I could crawl. **It is not exhaustive. Treat the absence of other entries as unknown, not as proof there are none.** Of 45 pages crawled (competitor listicles, directories), only ClickPost and the directory pages above mention TopEdge.

| # | Page | Mention | Problem | Ask | Label |
|---|---|---|---|---|---|
| 1 | pickyourapp.com/products/topedge-ai | Dedicated product page naming TopEdge AI | Links only to the Shopify listing, not topedgeai.com | Use the on-page "claim profile" flow at `/tools/profile/claim/topedge-ai` and add the website URL | Verified 24 Nov |
| 2 | clickpost.ai/blog/rto-reduction-tools | Named in list, links to `/` and `/pricing` | `rel="nofollow"` | Do not ask to change rel. Instead propose a data-backed addition (see prospect 27). Low priority. | Verified 24 Nov |
| 3 | saashub.com/topedge-ai | Listing exists | Absent from `saashub.com/interakt-alternatives` and `/wati-alternatives` (those pages name only other tools; "topedge" count 0) | Claim the listing, then add TopEdge as an alternative via SaaSHub's own tools | Verified 24 Nov |
| 4 | Shopify App Store listing, privacy URL | n/a | Points at `dash.topedgeai.com/privacy` | Owner edit in Partner dashboard if a marketing-domain privacy page exists | Verified 24 Nov |
| 5 | Product Hunt, Trustpilot, G2 (repo says badges/profiles exist) | unknown | 403 to my crawler | Owner to open them in a browser, confirm the website field is the root domain | Not verified |

---

## 4. 30 link prospects

Rival column: **"name appears N times in the page HTML" from my 24 Nov fetch**. It shows rivals are discussed, not that each is formally listed. TopEdge appeared in none of these pages except where stated. `parasite_risk.py` flags are noted where run. Every ask is an inclusion or listing request grounded in facts; no payment, no exchange.

Ask template (use for editorial pages): a dated correction or addition. Facts: WhatsApp cart recovery + COD confirmation for Indian Shopify stores, 0% markup on Meta conversation fees, App Store URL, price read on the date. Disclose you build it. Do not ask for a link.

### A. Shopify WhatsApp app roundups (target "best whatsapp apps for shopify")

| # | URL | Why it fits | Type | Rivals on page (24 Nov) | Ask |
|---|---|---|---|---|---|
| 1 | https://getkanal.com/best-shopify-apps/best-whatsapp-apps-for-shopify | "10 Compared (2026)", Indian-market comparison of the exact category | Shopify app roundup | interakt 49, wati 61, zoko 62 | Include TopEdge with India COD and RTO facts. Hypothesis: Kanal is itself a vendor, so lower odds. |
| 2 | https://www.orangemantra.com/blog/top-shopify-apps-for-whatsapp-marketing/ | "Top 12+ for 2026" | Shopify app roundup (agency blog) | interakt 10, wati 16, zoko 8, delightchat 9 | Inclusion request with dated facts |
| 3 | https://magecomp.com/blog/best-whatsapp-shopify-apps/ | Already in your repo's SERP list as ranking | Shopify app roundup | zoko 14 only | Inclusion; they list few India-specific tools |
| 4 | https://meetanshi.com/blog/best-shopify-apps-for-whatsapp/ | "5+ Best", Indian Shopify dev agency | Shopify app roundup | none of the 8 rivals | Easiest gap: no Interakt, Wati, AiSensy there |
| 5 | https://the4.co/blogs/shopify-apps/best-shopify-whatsapp-apps | Title says 2025, so stale | Shopify app roundup | wati 2, zoko 8 | "Update" angle: refreshed 2026 pricing |
| 6 | https://www.growave.io/best-shopify-apps/whatsapp-apps | 2026 list | Shopify app roundup | delightchat 8 | Inclusion; Growave is a vendor so hypothesis only |
| 7 | https://www.retainful.com/blog/shopify-whatsapp-apps | Title says 2025 | Shopify app roundup | none | Add TopEdge to a list with no BSP rivals |
| 8 | https://www.aitrillion.com/?p=52646 | "10+ Best Shopify WhatsApp Marketing Apps 2026" | Shopify app roundup | interakt 17, wati 2, bitespeed 3, zoko 1 | Inclusion request |
| 9 | https://thed2cpulse.com/d2c-tech-stack/best-shopify-apps-indian-d2c-brands-2026/ | Indian D2C audience | Indian D2C publication | interakt 5 | Pitch with the COD angle. **Caution: `parasite_risk.py` rated this section high (affiliate density, commercial skew).** Hypothesis: may expect payment, which we decline. |

### B. COD, RTO and cart-recovery lists (targets "shopify cod apps")

| # | URL | Why it fits | Type | Rivals on page | Ask |
|---|---|---|---|---|---|
| 10 | https://www.storecensus.com/shopify-apps/best-cod-verification-apps | "5 Best COD verification Apps" | Shopify app roundup | none | Submit TopEdge as a COD verification app (page risk: low) |
| 11 | https://www.huratips.com/?p=14782 | "Best COD Order Verification Apps For Shopify" | Roundup | none | Inclusion (risk low) |
| 12 | https://wisepops.com/blog/shopify-cart-abandonment-app | "7 Best Shopify Abandoned Cart Apps [2026]" | Roundup | bitespeed 9 | Inclusion with WhatsApp-first cart recovery fact |
| 13 | https://cartylabs.com/blog/best-shopify-abandoned-cart-recovery-apps/ | 2026 cart list | Roundup | none | Inclusion |

### C. "X alternatives" pages (targets "interakt alternatives", "wati alternatives")

| # | URL | Why it fits | Type | Rivals on page | Ask |
|---|---|---|---|---|---|
| 14 | https://blog.campaignhq.co/interakt-alternatives/ | "Interakt Alternatives in India: 7 Platforms" | Alternatives roundup | interakt 97, wati 10, aisensy 10, zoko 5, gallabox 7, doubletick 5 | Add TopEdge as the Shopify-specific option |
| 15 | https://www.watsberry.com/resources/interakt-alternatives-india | "Official Tool Shortlist" | Alternatives roundup | interakt 85, wati 28, aisensy 28, gallabox 5, doubletick 5 | Same |
| 16 | https://www.softwares.com/alternatives/interakt (and submit form https://www.softwares.com/submit, 200) | Directory with a self-serve submit | SaaS directory | interakt 119, wati 15, aisensy 19 | List the product via the form, then request alternative association |
| 17 | https://wappbiz.com/blogs/doubletick-alternatives | Already in your 2 Nov list; rivals heavy | Alternatives roundup | interakt 24, aisensy 22, bitespeed 12, zoko 20, delightchat 9, gallabox 7 | Inclusion. `parasite_risk.py`: medium (commercial skew). |
| 18 | https://wiserreview.com/blog/quickreply-alternatives/ | "9 Best QuickReply.ai Alternatives" | Alternatives roundup | all of interakt, wati, aisensy, bitespeed, zoko, delightchat, gallabox (20 to 35 each) | Inclusion; shows rivals do get added |
| 19 | https://martech.zone/best-whatsapp-marketing-software/ | "for D2C and online stores" | Roundup | interakt 17, wati 19, zoko 17, gallabox 17 | Editorial pitch |
| 20 | https://www.getvero.com/resources/best-whatsapp-marketing-tools-in-2026/ | 2026 tools list | Roundup | interakt 19, gallabox 20 | Editorial pitch; global audience so low fit, hypothesis |
| 21 | https://www.saashub.com/interakt-alternatives and https://www.saashub.com/wati-alternatives | You are already on SaaSHub; these pages rank for the target queries | SaaS directory | interakt 125 / wati 131 | Claim listing, then request alternative association |

### D. Self-serve directories, partners and community

| # | URL | Why it fits | Type | Rivals | Ask |
|---|---|---|---|---|---|
| 22 | https://peerpush.net/ | Per 2 Nov repo, Updatrr has an entry in your exact category | SaaS directory | Updatrr (repo, not re-fetched) | Self-submit with the standard sentence |
| 23 | https://fazier.com/submit | Launch directory, 200 | SaaS directory | not checked | Submit |
| 24 | https://saastrac.com/add-your-product/ | Software registry, 200 | SaaS directory | not checked | Register |
| 25 | https://partners.shopify.com/ | Partner directory; highest relevance of anything here | Partner page | not checked | Confirm eligibility; Hypothesis, eligibility unverified |
| 26 | https://www.shiprocket.in/partners/ (403 to my crawler) | COD/RTO integration partner page. Only valid if a real integration exists | Integration partner page | not checked | Owner to check the page; list only a genuine integration |
| 27 | https://www.clickpost.ai/blog/rto-reduction-tools | TopEdge already named here with nofollow | Indian D2C/logistics publication | TopEdge listed | Offer an update with your own measured COD-confirmation numbers (only if the data exists); no rel change request |
| 28 | https://community.shopify.com/ (200) and r/shopify (403, not crawled) | Real Q&A on WhatsApp, COD | Community | not checked | Answer questions, disclose affiliation, link only when it answers the question |
| 29 | Featured.com / Qwoted style expert-quote platforms (not fetched) | HARO-style answers on Indian D2C and COD | HARO-style | not checked | Hypothesis: respond to relevant queries as a founder with a real number |
| 30 | YourStory, Inc42, Entrackr, India D2C newsletters and podcasts (not fetched; yourstory.com/brands gave 403) | Needs an original asset (the India COD/RTO benchmark, section 4 of `2026-11-02/11-backlink-playbook.md`) | Indian startup publication / podcast | not checked | Pitch the benchmark when the data exists. Hypothesis |

Not fetched or only partly verified: rows 20, 23 to 26, 28 to 30 (page content for rivals not checked). Rows 1 to 19 and 21 were fetched on 24 Nov.

**Top 10 order of attack (my judgement, Hypothesis on conversion):** 4 Meetanshi, 14 CampaignHQ, 15 Watsberry, 10 StoreCensus, 11 HuraTips, 3 MageComp, 16 Softwares.com, 21 SaaSHub alternatives, 22 PeerPush, 1 Kanal.

Realistic conversion is the playbook's 2 to 4 inclusions from about 12 pitches (Estimate, unchanged from 2 Nov).

Excluded on purpose: `productgrowth.in/partners/get-listed` (offers sponsored articles; a paid placement would need `rel="sponsored"` and is not a link-building tactic here), `m.aisensy.com` and `delightchat.io` roundups (owned by rivals), `sourceforge.net` (403, unverified), `lilachbullock.com` (403).

---

## 5. Toxic link risk and disavow

### 5.1 What is known
- Verified (OpenSEO/DataForSEO, 2 Nov 2026, from repo, not re-run): 45 referring domains in the unfiltered pull, 37 with spam score 45 to 80 (paid-link sellers, casino, fake news syndication, URL shorteners, scrapers); site-wide backlink spam score 39. A +196 referring-domain spike in September collapsed to 47. `growyoursitetraffic.shop` first seen 2 Nov.
- Verified (repo, `2026-11-20/01-google-ai-content-guidance.md`): Search Console Manual actions was clean on 6 Nov 2026. **I could not re-check Search Console today.**
- No evidence in the repo that TopEdge bought any of the links. They look unsolicited.
- Two files exist: `disavow-UPLOAD-THIS.txt` (37 domains) and `disavow-topedgeai.com-2026-11-02.txt` (a different header; I did not diff the domain lists line by line). Pick one as the single source before any upload, because a disavow upload replaces the previous file.

### 5.2 Is a disavow warranted? My assessment (Hypothesis)
**Not on the evidence available. Hold the file; do not upload now.**
- Google's guidance is to disavow only when you have a manual action or are likely to get one because of links you built or paid for. Neither condition is evidenced: manual actions clean on 6 Nov, and the spam pattern looks like third-party junk, not a purchase. Google states it generally ignores such links.
- This is a more conservative reading than the 2 Nov findings doc, which said the pattern "clears the bar." I could not re-pull the data to check it, and the owner may reasonably prefer to upload it as low-cost insurance. That is the owner's decision; the file is domain-level and the 37 domains were verified individually on 2 Nov.
- **Triggers to upload:** a manual action for unnatural links appears, someone tells you they placed the links, or a fresh pull shows the spam share growing and rankings dropping with a timing match.
- **Do not disavow** wanderlog.com, magicpin.in, bestsalons.com, khojosale.com, shoplist.co: legitimate sites. Fix at source with the drafted, unsent correction requests.
- Re-pull the backlink data (OpenSEO) before any upload; today's picture is 22 days newer than the file's evidence.

### 5.3 Notes on the validator
First payload used `letsmetrix.com` homepage as a source and the validator flagged a social-media-style false negative. I removed the three homepage-only checks (letsmetrix, heyapps, shoplist) from the payload because they were not valid verifications; the remaining FAIL is the summary count mismatch my removal created. Data in section 2 is as the crawler returned it.

---

## 6. Prioritised actions

| Priority | Issue | Fix | Measured |
|---|---|---|---|
| High | No relevant earned dofollow links beyond App Store, Store Leads, SaaSHub | Prospects 4, 14, 15, 10, 11, 3, 16, 21, 22, 1 | sections 2 and 4, 24 Nov |
| High | Backlink data stale (22 days) and no Moz/Bing/Ahrefs access for me | Owner: Ahrefs Webmaster Tools export (PLAN-AND-LOG says Ahrefs is signed in, 23 Nov crawl) or a fresh OpenSEO pull, then re-run this audit | section 0 |
| Medium | pickyourapp page mentions TopEdge with no site link | Claim profile, add website | section 3 |
| Medium | Shopify listing privacy link on `dash.topedgeai.com` | Partner dashboard edit if a marketing privacy page exists | section 2 |
| Medium | SaaSHub listing exists but may be unclaimed; not in Interakt/Wati alternatives | Claim, then associate | section 3 |
| Medium | Wanderlog wrong-topic listing still live | Send the drafted correction (unsent) | section 2 |
| Low | Disavow | Hold; triggers in 5.2 | section 5 |
| Low | Product Hunt, Trustpilot, G2, Capterra unverified (403) | Owner opens in browser | section 2 |

For E-E-A-T and crawlability, run `/seo content` and `/seo technical`; not duplicated here.

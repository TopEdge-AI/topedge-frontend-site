# Research digest: evidence base for TopEdge AI SEO, AEO and GEO plan

Compiled 2026-11-05. Scope: topedgeai.com, a Shopify app for Indian D2C brands (abandoned cart recovery, COD confirmation, order updates over WhatsApp and email). Low authority: about 8 non-spam referring domains, about 150 pages, roughly 3 real clicks a day. Peers: Updatrr, Bitespeed.

## How to read this

- Confidence labels: **Verified official** (Google or Shopify first-party, including statements by named Google staff reported by trade press, marked "via SER" or "via SEJ"). **Original data study** (someone measured something; most are run by vendors who sell related tools, marked "vendor"). **Practitioner opinion** (experience, anecdote, or secondary summary).
- Every page was read through a fetch tool that extracts against a focused question. Quotes passed through that extraction step. Before quoting anything publicly, open the page and check the wording.
- Almost all CTR and AI citation data is US and English. No India-specific CTR study was found. Treat magnitudes as directional for India.
- Google doc pages rarely show a date. "Undated" means no date was visible on the page when read on 2026-11-05.
- Conflicts are flagged inline as **CONFLICT** and collected at the end of the first section. Evidence gaps are flagged as **GAP**.

---

# What the evidence says

## Q1. Indexing: soft 404, not indexed statuses, crawl budget, canonicals, trailing slash

**1.1 Soft 404 definition: a 2xx page whose content suggests an error, such as a blank page or an error message.**
Source: https://developers.google.com/search/docs/crawling-indexing/http-network-errors and https://support.google.com/webmasters/answer/7440203. Date: undated. Confidence: Verified official.
What this means for TopEdge: any route whose first useful content depends on JS, or which renders an empty state, is the prime suspect. Check rendered HTML in URL Inspection for each flagged URL before anything else.

**1.2 JS and SPAs: client-side error handling often returns a false 200. Google's two fixes are a JS redirect to a URL that returns a real 404, or adding a noindex meta tag on error views. Pages with non-200 codes might not be sent to rendering (doc change dated 18 Dec 2025). Google recommends server-side rendering or pre-rendering because not all bots run JS.**
Source: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics, https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript, https://developers.google.com/search/updates. Date: docs undated, log entry 18 Dec 2025. Confidence: Verified official.
What this means for TopEdge: a React route with no prerender is exposed twice, for Googlebot and for AI crawlers. Prerender every indexable page and serve real 404s server side.

**1.3 Do not use JS to flip text from "not available" to "available". Mueller: load the whole content block with JS instead, so a client that does not run JS does not get misleading information.**
Source: https://www.seroundtable.com/google-javascript-not-available-40931.html. Date: 16 Feb 2026. Confidence: Verified official, via SER.
What this means for TopEdge: any calculator or tool page with default "no result" or "not found" text in the initial HTML can look like an error page. Default state text must read as a working tool.

**1.4 Soft 404 detection reads page text and banners. Mueller (2019): the algorithms may see a "no longer available" banner and apply it to the page.**
Source: https://www.searchenginejournal.com/googles-john-mueller-explains-why-expired-product-pages-may-become-soft-404s/293959/. Date: 16 Feb 2019. Confidence: Verified official, via SEJ, but old.
What this means for TopEdge: audit tool and blog templates for phrases like "no results", "not found", "error", "unavailable" in default render.

**1.5 GAP: no Google doc read says thin or low-text tool pages trigger soft 404. Google's wording is about error-like or blank content. "Thin content causes soft 404" is practitioner inference.**
Source: absence across items 1.1 to 1.4. Confidence: Practitioner opinion for the claim.
What this means for TopEdge: for a flagged tool page, test rendering and error-text first, then add real explanatory content. Do not assume word count alone is the cause.

**1.6 Empty pages: Mueller saw no noticeable difference between noindex and soft 404. Bing's Fabrice Canel called noindex the stronger signal.**
Source: https://www.seroundtable.com/google-soft-404s-or-noindex-empty-pages-31263.html. Date: 16 Apr 2021. Confidence: Verified official, via SER.
What this means for TopEdge: use noindex for pages that have nothing yet.

**1.7 Discovered, currently not indexed. Help text: "Typically, Google wanted to crawl the URL but this was expected to overload the site." Martin Splitt: quality is also a cause, "If you care about these pages you might want to rework the content", plus stronger internal links. Mueller: the status "can be forever".**
Source: https://support.google.com/webmasters/answer/7440203, https://www.seroundtable.com/google-on-discovered-currently-not-indexed-37931.html (21 Aug 2024), https://www.searchenginejournal.com/google-says-discovered-currently-not-indexed-status-can-last-forever/439104/ (21 Feb 2022). Confidence: Verified official.
**CONFLICT:** the help page leads with server overload. Splitt leads with quality. For a 150-page site on a CDN, overload is unlikely, so quality and internal links are the working hypothesis.
What this means for TopEdge: do not request-indexing your way out. Improve or remove the pages and link to the keepers from pages Google already values.

**1.8 Crawled, currently not indexed. Help text: "this is a common message for many sites". Gary Illyes: causes include a near-duplicate with better signals, and "If the number of these URLs is very high that could hint at general quality issues". Also a changed perception of the site, and technical errors returning the same page for every URL.**
Source: https://www.searchenginejournal.com/google-explains-crawled-not-indexed/521311/. Date: 3 Jul 2024, remarks May 2024. Confidence: Verified official, via SEJ.
What this means for TopEdge: a high share of the 150 pages in this bucket is a site-level warning. Consolidate near-duplicates before publishing more.

**1.9 Crawl budget guide audience: 1M+ pages changing weekly, 10K+ pages changing daily, or sites where many URLs sit in Discovered. Google calls the numbers a rough estimate. Soft 404 pages "will continue to be crawled, and waste your budget".**
Source: https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget. Date: undated. Confidence: Verified official.
What this means for TopEdge: at 150 pages, crawl budget is not the constraint. Fix soft 404s for their own sake, not for budget.

**1.10 Canonical signals: redirects and rel=canonical are strong, sitemaps weak. Signals stack. Pick one of HTML or header. Use absolute URLs and a self-referencing canonical. Google may keep pages in a duplicate cluster "up to two weeks" after content fixes (doc clarification 10 Jul 2026). Soft 404 pages that look identical across servers can cause wrong canonical selection. JS should set the same canonical as the HTML (doc addition 17 Dec 2025).**
Source: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls, https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting, https://developers.google.com/search/updates. Confidence: Verified official.
What this means for TopEdge: known traps are static HTML duplicates of React routes. One URL, one canonical in the initial HTML, no JS rewrite, and allow two weeks before re-checking.

**1.11 Trailing slash: Google treats each URL "separately (and equally)". Pick one, use it in internal links and sitemap, 301 the other, rel=canonical if a redirect is impossible. The bare domain root is exempt.**
Source: https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash. Date: Apr 2010, still the only Google post on this that was found. Confidence: Verified official.
What this means for TopEdge: this is a consistency fix, not a ranking lever. Make sitemap, canonical, internal links and redirect all agree.

## Q2. Link spam, disavow, negative SEO

**2.1 Google's disavow rule is conditional. Use it only if you have a considerable number of spammy links AND they caused or likely will cause a manual action. "Google can assess which links to trust without additional guidance." Most sites do not need it.**
Source: https://support.google.com/webmasters/answer/2648487. Date: undated, read 2026-11-05. Confidence: Verified official.
What this means for TopEdge: unsolicited spam links with no manual action do not meet Google's stated condition. Do not file a disavow. Check the Manual Actions report once, and stop.

**2.2 "The disavow links tool does not support Domain properties." A list applies to the specific property it was uploaded to plus child properties.**
Source: https://support.google.com/webmasters/answer/2648487. Date: undated, verified on two fetches. Confidence: Verified official.
What this means for TopEdge: if the site is a Domain property, the tool does not apply. A URL-prefix property would be needed only if a manual action ever appears.

**2.3 Mueller on unsolicited links: without a manual action or likely one, disavowing is "a time-sink with no directly connected value", and "it's in a spammer's best interest to encourage others to spend time on it". He estimated "90%+ (probably 99%+)" of the web has never used the tool.**
Source: https://www.seroundtable.com/google-spammers-encourage-waste-time-disavowing-links-38797.html. Date: 24 Jan 2025. Confidence: Verified official, via SER.

**2.4 Mueller: disavow is "not a part of normal site maintenance"; reserve it for manual spam actions, typically from buying links.**
Source: https://www.searchenginejournal.com/google-says-disavow-tool-not-part-of-normal-site-maintenance/543861. Date: 8 Apr 2025. Confidence: Verified official, via SEJ.

**2.5 Mueller: "The concept of toxic links is made up by SEO tools so that you pay them regularly."**
Source: https://www.seroundtable.com/google-again-blasts-the-concept-of-toxic-links-37453.html. Date: 27 May 2024. Confidence: Verified official, via SER.
What this means for TopEdge (2.3 to 2.5): ignore any toxic score from OpenSEO, Semrush or others. Spend the time on earning links.

**2.6 Current state of the tool, latest statement: "it has its place & time, it does have effects", and "disavowing a handful of links is not going to make your site drop out of search". Said to a site that had bought guest posts. He advised trimming the file, possibly to empty, and checking for other causes such as a spam update.**
Source: https://seroundtable.com/google-disavow-tool-effects-42004.html. Date: 2 Sep 2026. Confidence: Verified official, via SER.
**CONFLICT, mild:** the "waste of time" messaging and "it does have effects" both hold. It is a real instruction to Google, which is the reason not to use it casually.
What this means for TopEdge: a broad disavow can drop links you want. With about 8 good domains, the downside outweighs any upside. The tool still exists. A claim that Google is removing it (userp.io) could not be opened and was not confirmed by any page read.

**2.7 Negative SEO: Illyes at PubCon Florida 2019 said none of the hundreds of reports he examined were real, and Google catches and ignores spam and adult links. Mueller in 2023 called negative SEO and disavow-selling agency claims "all made up & irrelevant".**
Source: https://www.searchenginejournal.com/google-link-spam/308283/ (16 May 2019), https://www.searchenginejournal.com/googles-mueller-slams-negative-seo-link-disavow-companies/478348/ (2 Feb 2023). Confidence: Verified official, via SEJ, but old. **GAP:** no 2025-2026 quantified Google statement found.
What this means for TopEdge: a spam-link spike is not a credible explanation for low traffic. Look elsewhere.

**2.8 Removing links any other way: Google's documented path is to contact linking site owners and ask them to remove the links or stop them passing PageRank, then disavow what is left, and only in a manual action context. Google offers no other removal mechanism in the pages read. Reports go to engineers to improve algorithms; Illyes: "we don't take individual actions on them, on each one of their reports".**
Source: https://support.google.com/webmasters/answer/9044175 and https://www.seroundtable.com/google-paid-or-spam-backlink-reports-no-action-36578.html (19 Dec 2023). Confidence: Verified official. Note: the Apr 2026 log says Google may now use spam reports for manual action (https://developers.google.com/search/updates), which updates the 2023 quote.
What this means for TopEdge: do not chase webmasters of spam sites.

**2.9 Link spam updates: "Any potential ranking benefits generated by those links cannot be regained."**
Source: https://developers.google.com/search/docs/appearance/spam-updates. Date: last updated 10 Dec 2025 per triaza.com. Confidence: Verified official.
What this means for TopEdge: paying for links risks spending money on benefits that vanish permanently.

## Q3. Spam policies

**3.1 Link spam definition: links made "primarily for the purpose of manipulating search rankings". Named violations: buying or selling links or posts containing links, sending free products for a write-up with a link, and "excessive link exchanges" such as "Link to me and I'll link to you" or partner pages only to cross-link.**
Source: https://developers.google.com/search/docs/essentials/spam-policies. Date: last updated 15 May 2026 per https://ppc.land/google-spam-policies-now-officially-cover-ai-overviews-and-ai-mode-in-search. Confidence: Verified official.
**GAP:** Google publishes no threshold for "excessive". A few relevant, real partner mentions are not named as violations. A reciprocal exchange done for ranking purpose fits the definition regardless of size.
What this means for TopEdge: a genuine integration or co-marketing link is defensible. A partner-page swap arranged for SEO is not. Do not write "let's exchange links" in outreach, and do not build a partners page only for this.

**3.2 Paid listicle: paying for a post containing a followed link is a violation. Paid links are acceptable only with rel=sponsored or rel=nofollow.**
Source: https://developers.google.com/search/docs/essentials/spam-policies, https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links. Date: undated. Confidence: Verified official.
What this means for TopEdge: buy placement only if labelled sponsored, for referral and visibility, not for link equity. **GAP:** whether a sponsored mention inside a paid list helps AI citation is unmeasured, and see 3.5.

**3.3 Scaled content abuse: many pages generated primarily to manipulate rankings, however made. Google guide: creating many pages for query variations to manipulate rankings or AI responses can violate this policy.**
Source: https://developers.google.com/search/docs/essentials/spam-policies, https://developers.google.com/search/docs/fundamentals/ai-optimization-guide, https://developers.google.com/search/blog/2024/03/core-update-spam-policies (5 Mar 2024). Confidence: Verified official.
What this means for TopEdge: no city, industry or competitor template pages at scale. Any programmatic set must carry unique data for each page.

**3.4 Site reputation abuse: third-party content published on a host mainly because of the host's ranking signals. "No amount of first-party involvement alters the fundamental third-party nature of the content." Applies to hosts, not to wire services, syndicated news, UGC or real editorial.**
Source: https://developers.google.com/search/blog/2024/11/site-reputation-abuse (19 Nov 2024). Confidence: Verified official.
What this means for TopEdge: low-value advertorial placements on high-DR sites are a depreciating asset. Guest content on relevant sites is fine if it is real editorial.

**3.5 May 2026: spam policies now explicitly apply to generative AI responses. Definition gained "attempting to manipulate generative AI responses in Google Search". Guide: seeking inauthentic mentions "isn't as helpful as it might seem". Ignore chunking, unnecessary llms.txt and inauthentic mentions. "No third-party tool has access to our internal ranking or AI systems."**
Source: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide, https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing, https://seosherpa.com/google-just-closed-the-ai-search-loophole-that-gurus-have-been-selling-for-two-years/ for the definition clause. Date: 15 May 2026. Confidence: Verified official.
What this means for TopEdge: no seeded Reddit posts, fake reviews or paid mentions. Real customer and founder voices only.

**3.6 Expired domains: buying one and repurposing it primarily to manipulate rankings is a named violation.**
Source: https://developers.google.com/search/docs/essentials/spam-policies. Confidence: Verified official.
What this means for TopEdge: rule out. No domain redirects or purchases for links.

## Q4. Helpful content, E-E-A-T, 2026 updates

**4.1 E-E-A-T is not a direct ranking factor; trust matters most; raters' feedback does not directly set rankings. Warning signs: mass automation, summarising others with no added value, changing dates to seem fresh. Who, How, Why: visible authorship, how it was made, and a purpose of helping people. Fabricated author profiles are deceptive.**
Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content. Date: undated. Confidence: Verified official.
What this means for TopEdge: named founder bylines and real results from real merchants. No invented authors. Note that WhatsApp COD and revenue claims edge toward finance-adjacent claims, so show the working.

**4.2 Dates of 2026 updates: Feb Discover (from 5 Feb), Mar spam (24 Mar, about 19.5 hours), Mar core (27 Mar, about 12 days), May core (21 May, about 12 days), Jun spam (24 Jun, 2 days), Aug spam (18 Aug, about 3 days), Sep spam (24 Sep, about 14 days). Preceded by Dec 2025 core (11 Dec, 18 days).**
Source: https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history. Date: read 2026-11-05. Confidence: Verified official.
What this means for TopEdge: read any traffic change against these dates. Next, wait a full week after completion before comparing, per https://developers.google.com/search/docs/appearance/core-updates.

**4.3 Google did not publish what any 2026 update targeted. June was "a normal spam update". September: no named policy, and Barry Schwartz reports it "does not target link spam".**
Source: https://ppc.land/googles-june-2026-spam-update-is-live-what-it-hits-and-why-it-matters/, https://triaza.com/blog/seo/google-september-2026-spam-update/. Confidence: Verified official for "no target named", via trade press.
What this means for TopEdge: treat all "what was penalised" claims below as inference from third-party visibility data.

**4.4 March 2026 pattern, third-party: first-party and official sources gained; aggregators and intermediaries lost (JustWatch -24%, Indeed -18%, ZipRecruiter -21.6%). SISTRIX German market: 134 clear losers and 32 winners out of 1,371 domains with changes. Beus's summary: "Authority trumps interchangeability". Losers included language and education tools (verbformen.de -30%, bab.la about -22%).**
Source: https://digitalapplied.com/blog/may-vs-march-2026-core-updates-pattern-comparison, https://xpert.digital/en/google-core-update-march-2026/. Date: May 2026. Confidence: Original data study, reported secondhand.
What this means for TopEdge: interchangeable utility pages and "middleman" comparison content are exposed. A generic calculator anyone can clone is a weak bet. A tool using TopEdge's own data, or specific to Indian COD, is not interchangeable.

**4.5 Reporting quality warning. digitalapplied.com's March article says Google confirmed the update on March 6 with a 14-day rollout, which contradicts Google's dashboard (27 March). Its category figures have no sample sizes. The "302,000 domains" figure on xpert.digital is not attributed. SE Ranking figures (79.5% of top-3 URLs moved) were seen only secondhand.**
Source: https://www.digitalapplied.com/blog/march-2026-core-update-content-quality-winners-losers. Confidence: Practitioner opinion.
What this means for TopEdge: do not repeat "-45% AI farms" style numbers in internal plans.

**4.6 **CONFLICT** on Reddit in March 2026: SISTRIX UK +2.39%, Amsive global -64.2 points. Different geography, units and keyword sets.**
Source: https://digitalapplied.com/blog/may-vs-march-2026-core-updates-pattern-comparison. Confidence: Original data study, reported secondhand.
What this means for TopEdge: any winner or loser claim needs a named dataset and market. None of them cover India.

**4.7 Recovery: Google says improvement can take "several months", the next core update may be the next opportunity, and deletion is a last resort. Spam recovery is over "a period of months".**
Source: https://developers.google.com/search/docs/appearance/core-updates, https://developers.google.com/search/docs/appearance/spam-updates. Confidence: Verified official.
What this means for TopEdge: a 30-day plan should promise indexing and technical results, not ranking recovery.

## Q5. AI Overviews and AI Mode

**5.1 Google guidance: "no additional requirements" for AI Overviews or AI Mode, "no special schema.org structured data", no new machine-readable files. Must be indexed and eligible for a snippet. Query fan-out is "issuing multiple related searches across subtopics and data sources".**
Source: https://developers.google.com/search/docs/appearance/ai-features. Date: undated. Confidence: Verified official.
What this means for TopEdge: indexing fixes are also the AI fixes. Unindexed pages cannot be cited in Google AI features.

**5.2 Do: non-commodity content, first-hand point of view, clear headings, images and video, crawlable pages. Do not: chunk, write in a special AI style, or chase every long-tail variation. "There's no ideal page length."**
Source: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide. Date: 15 May 2026. Confidence: Verified official.
What this means for TopEdge: write one strong page per topic, using real merchant data from Indian D2C.

**5.3 Search Console now has a Search Generative AI performance report, for all sites since 31 Aug 2026. Impressions, pages, countries, devices, dates. No clicks. There is also a site-wide Search generative AI inclusion control.**
Source: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports (3 Jun 2026), https://developers.google.com/search/docs/crawling-indexing/control-what-you-share. Confidence: Verified official.
What this means for TopEdge: replaces guesswork. Add it to the weekly baseline with the India filter, and confirm the control is on.

**5.4 Ahrefs: position 1 CTR about 58% lower with an AI Overview than forecast, position 5 -32.6%, position 10 -19.4%. 300,000 keywords, Dec 2025 vs Dec 2023, desktop.**
Source: https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/. Date: 4 Feb 2026. Confidence: Original data study, vendor. Correlational with a forecast model.

**5.5 Seer v3: organic CTR with AIO fell to 1.31% in Dec 2025, then 2.33% in Jan and 2.36% in Feb 2026. No AIO: 3.82% in Feb 2026. Informational per million impressions: no AIO about 33,500 clicks, cited about 20,743, not cited about 9,445. AIO prevalence: informational 36%, commercial 8%, transactional 5%. 53 brands, 5.47M queries.**
Source: https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update. Date: 24 Apr 2026. Confidence: Original data study, agency. One account is 47% of one segment. Cited vs not cited is not causal.
**CONFLICT:** Ahrefs shows steep and continuing loss, Seer a partial rebound. Different data: all-keyword GSC aggregates versus client brands, with static AIO labels at Seer.
What this means for TopEdge (5.4, 5.5): commercial and transactional queries carry far less AIO exposure. Prioritise those over how-to blog posts for clicks. Treat top-of-funnel content as a citation play, not a clicks play.

**5.6 Pew: 900 US adults, 68,879 searches, March 2025. Clicked a result on 8% of visits with an AI summary vs 15% without. About 1% clicked a link inside the summary. Sessions ended on 26% vs 16%. 18% of searches had a summary; 53% for 10+ word queries vs 8% for 1-2 words.**
Source: https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/. Date: 22 Jul 2025. Confidence: Original data study, independent.
**CONFLICT:** Google called it a "flawed methodology and skewed queryset" (https://ppc.land/google-disputes-pew-study-showing-ai-overviews-reduce-clicks-by-half/). Google's position: click volume "relatively stable year-over-year", quality clicks slightly up, but no totals published (https://blog.google/products/search/ai-search-driving-more-queries-higher-quality-clicks/, 6 Aug 2025).
What this means for TopEdge: long-tail conversational queries are where summaries appear most. A long-tail-only strategy needs a conversion goal beyond clicks.

**5.7 Semrush: AIO prevalence 6.49% Jan 2025, 24.61% Jul 2025, 15.69% Nov 2025. Informational share of AIO queries fell from 91.3% to 57.1%, while commercial rose to 18.57% and transactional to 13.94%. Same keywords before and after AIO: zero-click 33.75% to 31.53%, so AIO "don't automatically increase zero-click behavior".**
Source: https://www.semrush.com/blog/semrush-ai-overviews-study/. Date: 15 Dec 2025. Confidence: Original data study, vendor.
**CONFLICT:** with Ahrefs and Pew on click loss. Semrush is measuring zero-click session behaviour, not position CTR.
What this means for TopEdge: commercial queries are getting more AIO exposure over time. The 5.5 advice has a shelf life. Re-check each quarter in the GSC report.

**5.8 AI Mode fan-out: Google says it breaks a question into subtopics and runs many searches, and Deep Search "can issue hundreds of searches". Reported averages: 9 to 11 fan-out queries per prompt, up to 28; over 95% of fan-outs have no measurable search volume (Seer and Nectiv via Ahrefs).**
Source: https://blog.google/products/search/google-search-ai-mode-update/ (20 May 2025), https://blog.google/products/search/ai-mode-search/ (5 Mar 2025), https://ahrefs.com/blog/google-ai-mode/ (updated 28 Oct 2026). Confidence: Verified official for mechanism, Original data study via secondary for numbers.
What this means for TopEdge: keyword volume tools cannot see these. Cover the subtopics a buyer would ask in the same page or cluster.

**5.9 AI Overview citations and rank: Ahrefs Mar 2026: 37.9% of citations from top 10 URLs for the same query, 31.2% from 11-100, 31.0% beyond 100. 863K SERPs. Down from about 76% (Jul 2025), partly from better parsing. Reasoned cause: fan-out sub-query SERPs.**
Source: https://ahrefs.com/blog/ai-overview-citations-top-10/. Date: 2 Mar 2026. Confidence: Original data study, vendor.
**CONFLICT:** Semrush Jul 2025: AIO 67% URL overlap, AI Mode sidebar 32% URL and 51% domain (https://www.semrush.com/blog/ai-mode-comparison-study/). Moz via Ahrefs: about 1 in 10 AI Mode citations match top 10 URLs. Studies differ in date and parsing.
What this means for TopEdge: the head term rank is not the only route. Ranking for narrow sub-questions can earn a citation, which suits a low-DR site.

**5.10 AI Mode and AIO cite differently: only 13.7% of URLs overlap despite 86% semantic similarity (730,000 responses). Similarweb via Ahrefs: AI Mode sends visits on 1.6-2.5% of queries vs 17-19% for traditional search. AI Mode passed 1 billion monthly users in May 2026.**
Source: https://ahrefs.com/blog/google-ai-mode/. Date: updated 28 Oct 2026. Confidence: Original data study via secondary. **GAP:** the 1 billion figure was not read at a Google primary source. PR Daily says AI Mode became the default search experience at I/O on 19 May 2026; search results suggest the verified change was the default model inside AI Mode. Unverified, do not repeat.
What this means for TopEdge: AI Mode visibility is brand exposure, not a traffic source. Measure with impressions.

**5.11 AI referral traffic averaged 0.25% of a site's traffic, ChatGPT over 80% of it (81,947 sites). Note AIO and AI Mode traffic counts as Search.**
Source: https://ahrefs.com/blog/ai-traffic-increase/. Date: 26 Jun 2025, dated. Confidence: Original data study, vendor.
What this means for TopEdge: do not allocate most effort to AI referral. At 3 clicks a day, indexing and commercial pages matter more.

## Q6. GEO

**6.1 Aggarwal et al. (KDD 2024). Over baseline on PAWC: Quotation Addition +39.5%, Statistics Addition +29.2%, Fluency +26.7%, Cite Sources +26.2%, Authoritative +9.2%, Keyword Stuffing -9.2% (percentages derived from Table 1 scores). Rank 5 sources: Cite Sources +115.1%, Quotation +99.7%, Statistics +97.9%. Rank 1 sources: -30.3%, -22.9%, -20.6%. Perplexity test, 200 queries: Quotation +20.7% to 22%, Statistics +8.7%.**
Source: https://arxiv.org/abs/2311.09735, https://ar5iv.labs.arxiv.org/html/2311.09735. Date: Nov 2023, revised Jun 2024. Confidence: Original data study, peer reviewed, lab conditions.
What this means for TopEdge: add attributed quotes, sourced stats and citations. It costs little and favours lower-ranked sources. Limits: self-built GPT-3.5 pipeline, one small live test, 2024 engines.

**6.2 Chen et al.: AI search shows a "systematic and overwhelming bias towards Earned media", while Google shows a more balanced mix. Engines differ a lot. Big brands have an advantage niche players must work to overcome.**
Source: https://arxiv.org/abs/2509.08919. Date: 10 Sep 2025. Confidence: Original data study, academic preprint.
What this means for TopEdge: third-party mentions are the main GEO lever, not on-page edits.

**6.3 Ahrefs 75K brands, AIO visibility: web mentions 0.664, branded anchors 0.527, branded search 0.392, DR 0.326, referring domains 0.295, backlinks 0.218, site pages 0.17. Sample excludes DR under 40.**
Source: https://ahrefs.com/blog/ai-overview-brand-correlation/. Date: 26 May 2025. Confidence: Original data study, vendor, correlation only.
What this means for TopEdge: TopEdge is below that sample's DR floor, so apply with care. More pages will not raise visibility.

**6.4 ChatGPT: strongest correlates are YouTube mentions and mention impressions, then branded web mentions. Page count extremely low. Web mention correlation is weak for ChatGPT (0.15) vs AIO (0.65), but on top-50 domains only.**
Source: https://ahrefs.com/blog/how-to-rank-on-chatgpt/ (13 Mar 2026), https://ahrefs.com/blog/branded-web-mentions-visibility-ai-search/. Confidence: Original data study, vendor.
**CONFLICT:** the two Ahrefs pieces rank web mentions differently for ChatGPT, on different samples.
What this means for TopEdge: a few demo and how-to YouTube videos are worth testing. Being mentioned on other channels counts, even when the mention is not a link.

**6.5 Why ChatGPT cites a page: search channel results cited 88.46% of the time, vs Reddit 1.93%, YouTube 0.51%. Reddit is 67.8% of the non-cited pool. Title match to fan-out queries 0.656, title vs prompt 0.602 vs 0.484 for non-cited. Natural slugs 89.78% vs 81.11%.**
Source: https://ahrefs.com/blog/why-chatgpt-cites-pages/. Date: 15 Apr 2026, data Feb 2025. Confidence: Original data study, vendor.
What this means for TopEdge: clear, literal titles and readable slugs. Ranking in search engines feeds ChatGPT.

**6.6 What gets cited, by engine. Ahrefs Brand Radar mention share July 2026: Reddit ChatGPT 16.7%, AI Mode 19.9%, AIO 18.5%, Perplexity 13.9%. YouTube ChatGPT 1.8%, AI Mode 17.0%, AIO 21.1%, Perplexity 31.2%. SurfacedBy: Claude sends 0.02% to YouTube, 0.01% to Reddit, favouring docs, vendor pages, prestige editorial. 69.6% of cited domains appeared on one engine only.**
Source: https://obsurfable.com/resources/reports/top-domains-cited-by-llms-august-2026. Date: Aug 2026. Confidence: Original data study, reported secondhand.
Also LLM Pulse, 7 days to 4 Nov 2026: YouTube 9.83%, Reddit 6.87%, Trustpilot 2.43% of answers (https://llmpulse.ai/data-studies/top-cited-domains). Confidence: Original data study, vendor, sample undisclosed.

**6.7 Reddit is volatile. Semrush 230K prompts: ChatGPT cited Reddit in close to 60% of responses early Aug 2025, about 10% by mid-Sep. Promptwatch: 3.8% to 0.5% in Aug 2026, unexplained; AIO -11%, AI Mode -31%. OpenAI says it sets no fixed level.**
Source: https://www.semrush.com/blog/most-cited-domains-ai/ (10 Nov 2025), https://www.semrush.com/blog/reddits-citations-in-chatgpt-fall/ (26 Aug 2026). Confidence: Original data study, vendor; Promptwatch calls its figure provisional.
**CONFLICT:** Ahrefs July 2026 has Reddit at 16.7% for ChatGPT, Promptwatch at 3.8% in the same weeks. The denominators differ (top sources vs all citations).
What this means for TopEdge: Reddit can be useful for real founder participation. It is not a dependable citation pillar.

**6.8 Listicles and review sites. 3,118 answers, Sept 2026, share of answers citing at least one: listicles ChatGPT 36.7%, Perplexity 48.3%, Gemini 55.4%; directories and review sites 55.3%, 73.0%, 59.9%; Reddit 22.3%, 13.4%, 10.0%. Queries were not random, skewing local services and travel. API models, not consumer apps.**
Source: https://uxcontinuum.com/research/ai-answer-sources-2026. Date: Sep 2026. Confidence: Original data study, small operator.
Also 1,200 prompts, Apr-May 2026: editorial reviews 22.3% of slots, vendor sites 14.7%, Reddit 11.4%. SaaS has the highest citation density. Vendor site tops branded answers in 41%. Run-to-run overlap only 49-67% (https://attrifast.com/blog/ai-search-citations-by-vertical-2026). Confidence: Original data study, vendor.
What this means for TopEdge: get into independent "best WhatsApp app for Shopify" lists and review directories. Make the site the clear answer for branded queries. Do not judge from one test prompt.

**6.9 Self-promotional listicles. Lily Ray, 100 B2B queries: cited 323 times, brand left out of the recommendation 69%. Recommendations went to stronger brands. Seven SaaS sites lost 29-49% Sistrix visibility from about Jan 2026.**
Source: https://lilyraynyc.substack.com/p/why-calling-yourself-the-best-could (17 Jun 2026), https://lilyraynyc.substack.com/p/is-google-finally-cracking-down-on (3 Feb 2026). Confidence: Original data study, independent, hand-selected, cause not proven. Google spokesperson: "aware of the low-quality listicle content" (https://www.seroundtable.com/google-warns-against-trying-to-manipulate-llms-41156.html, 14 Apr 2026). Mueller: listicles are not inherently spam, relying on thousands is risky (https://seroundtable.com/john-mueller-google-systems-ai-spam-42420.html, 29 Oct 2026).
**CONFLICT:** Scrunch found a small author recommendation lift, about 4% to 7% (https://ppc.land/self-ranked-brands-gain-ai-recommendations-from-4-to-7-scrunch-finds/, Sept 2026). Indig: vendor-authored listicles did not fall as a group, 62% gained traffic since January; at the same time, listicle share at position 1 fell from about 19-20% to about 15% (https://www.relevantaudience.com/content-marketing/google-listicle-study-query-phrasing-august-2026/, Aug 2026). Elmo reconciles Ray and Scrunch as different definitions (https://www.elmohq.com/blog/self-promotional-listicles-ai-visibility).
What this means for TopEdge: one or two honest "best apps" pages that fairly assess rivals are defensible. A list where TopEdge wins every time is a low-return bet, and a large-scale run is a whole-site risk.

**6.10 llms.txt. Google, Jun 2026 doc change: Search does not use it and it does not affect visibility or rankings. Mueller: systems "can't trust what is here as a way of differentiating between different websites", though it may help an agent already on a site. SE Ranking, about 300K domains, 10.13% adoption: no correlation, and removing the feature improved the model. OtterlyAI logs via a secondary page: 84 of 62,100+ AI bot requests hit llms.txt.**
Source: https://developers.google.com/search/updates, https://www.searchenginejournal.com/googles-mueller-says-llms-txt-cant-help-llms-differentiate-sites/566027/ (15 Jun 2026), https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/ (20 Nov 2025), https://blckalpaca.at/en/knowledge-base/seo-geo/geo-generative-engine-optimization/llmstxt-844000-implementations-zero-confirmed-ai-usage. Confidence: Verified official plus Original data study.
**Evidence for:** only speculative niche use in agent and docs workflows.
What this means for TopEdge: keep it only if free to maintain. Remove it from any list of GEO priorities.

**6.11 Schema and AI citation. Ahrefs matched study, 1,885 pages vs 4,000 controls: AI Mode +2.4%, ChatGPT +2.2%, neither distinguishable from zero; AIO -4.6%, unexplained. All pages had 100+ citations already; 30-day window. Correlation: AI-cited pages almost 3x more likely to have JSON-LD, attributed to site quality.**
Source: https://ahrefs.com/blog/schema-ai-citations/. Date: 11 May 2026. Confidence: Original data study, vendor, best design found.
**CONFLICT:** AirOps 38.5% vs 32.0%; Digital Applied 2.3x; GEO-16 +39%; OtterlyAI AIO +1,500% on one site rollout; all observational or single-site (https://analyzify.com/hub/schema-markup-ai-citations-research, secondary). searchVIU via Ahrefs: chatbots ignored JSON-LD during direct retrieval.
What this means for TopEdge: keep correct schema for rich results and entity clarity. Do not expect citations from it, or sell it internally as GEO. Whether it helps pages with no AI visibility is untested.

**6.12 AI-assisted content: 87.8% of cited pages mix AI and human, correlation of AI share with citation order 0.017. Google permits AI, but "It is critical to manually factcheck and review all AI-generated content".**
Source: https://ahrefs.com/blog/ai-overviews-cite-ai-generated-content-more-than-human-writing/ (14 Jul 2025), https://developers.google.com/search/docs/fundamentals/using-gen-ai-content. Confidence: Original data study, vendor, detector-based; Verified official.
What this means for TopEdge: AI drafting is fine. Originality and review matter, not the tool.

**6.13 Earned media figures need care. Muck Rack's 84% counts academic, government, Wikipedia and social as earned, and covers ChatGPT, Claude and Gemini only. Journalism is about a quarter.**
Source: https://www.prdaily.com/the-84-myth-why-the-pr-industrys-ai-numbers-are-wrong/. Date: 17 Aug 2026. Confidence: Practitioner opinion with partial data. Muck Rack's own report was not read.
What this means for TopEdge: PR does not equal AI visibility on its own. Mix communities, reviews, docs and editorial.

## Q7. Backlinks for low-DR SaaS

**7.1 Links still separate pages: 96.55% of pages get zero Google traffic. Of about 20M pages with no referring domains, only 2,997 get over 1K visits a month, and those mostly target low-competition topics.**
Source: https://ahrefs.com/blog/search-traffic-study/. Date: 1 Dec 2023. Confidence: Original data study, vendor.
What this means for TopEdge: with about 8 domains, target low-competition pages now and build links in parallel.

**7.2 Practitioners struggle. BuzzStream and Citation Labs, 300+ respondents: 29% consider their efforts successful, 40% say reports prove ROI, 11% have a repeatable process for AI citations.**
Source: https://citationlabs.com/2025-link-building-survey. Date: 2025. Confidence: Original data study, survey by vendors.
What this means for TopEdge: expect low hit rates. Use free, founder-led tactics that are hard to copy.

**7.3 Journalist platforms. HARO became Connectively in 2024 and shut in December 2024 (9 Dec per one source). Help a B2B Writer 301-redirects to mentionmatch.com, whose homepage says "launching soon" (observed). Qwoted free: 2 pitches a month with a 2-hour delay; Pro $149.99 a month (official). SourceBottle: free, global, outlets shown mostly Australian.**
Source: https://everything-pr.com/haro-business-media, https://geoseotoday.com/en/blog/haro-alternatives-2026/, https://www.qwoted.com/pricing/, https://www.sourcebottle.com/, https://mentionmatch.com/. Date: 2026. Confidence: Verified official for pricing and redirects, Practitioner opinion for history.
**CONFLICT:** geoseotoday lists Qwoted at 3 free pitches and about $150; everything-pr at about $99. Trust the pricing page. Claims that Featured revived HARO or Connectively were not confirmed.

**7.4 Yield is low. BuzzStream (May-Jun 2025): only 21.9% of requests explicitly offer follow links; Qwoted has the most volume and 70.3% high-DR; HARO just over 38% from DR 0-9. Visibility Stack 12-month test via a secondary page: over 1,000 pitches across seven platforms gave 143 brand mentions; Featured 18-20% approval (573 pitches), Qwoted about 6%.**
Source: https://buzzstream.com/blog/journalist-request-platform-study/ (25 Jul 2025), https://blckalpaca.at/en/knowledge-base/seo-geo/off-page-seo-link-building/haro-alternatives-2026-featured-qwoted-and-source-of-sources. Confidence: Original data study, vendor; second source secondhand.
**CONFLICT:** geoseotoday claims Qwoted reply rates of 12-18% with no method. Prefer the measured figures.
What this means for TopEdge: budget this as a mention channel at about 2 to 4 hours a week. Do not count on it for followed links. Pitch only with original data on Indian WhatsApp or COD.

**7.5 Original data: Clearscope's most-linked non-utility pages are opinions and research. Aira's report built over 200 linking root domains. Stratabeat: original research sites 18.7% traffic growth (via theStacc). One job-market study covered by a few outlets was soon mentioned consistently in ChatGPT.**
Source: https://ahrefs.com/blog/bootstrapped-backlink-builders/ (14 Oct 2024), https://www.buzzstream.com/blog/saas-link-building/ (14 Jan 2025), https://thestacc.com/blog/free-tools-traffic-case-study/, https://ahrefs.com/blog/llm-search/ (2 Sep 2025). Confidence: Original data study, weak, plus Practitioner opinion.
What this means for TopEdge: this is the strongest fit. TopEdge can own data others lack: anonymised Indian D2C abandoned cart and COD confirmation rates. Check merchant agreements first.

**7.6 Third-party listicles: see 6.8 for citation share. BuzzStream's competitor link gap tactic targets roundups and resource pages. No study found on hit rate for cold outreach to get listed.**
Source: https://www.buzzstream.com/blog/saas-link-building/. Confidence: Practitioner opinion. **GAP.**
What this means for TopEdge: start with lists already naming Updatrr and Bitespeed. Offer facts and a merchant quote, never payment for a followed link.

**7.7 Founder communities: no independent data found on Reddit or Indie Hackers driving SEO or links. Search-level material was mostly vendor blogs and was not read in full. Reddit is a volatile AI source (6.7).**
Confidence: **GAP.**
What this means for TopEdge: treat as direct conversation and customer research, with honest disclosure. Count it as low certainty for SEO.

**7.8 Shopify ecosystem links: no authoritative source was read on whether Partner Directory or app listing links are followed, and no study on partner link value.**
Confidence: **GAP.**
What this means for TopEdge: check the actual HTML rel attribute of any listing before valuing it. Real integrations and co-authored case studies with agencies or apps are fine. Link swaps for ranking are not (3.1).

## Q8. Keyword research without paid tools, topical authority

**8.1 Autocomplete draws on real searches, but it is not simply the most common queries, and Google says not to compare it with Trends. It varies by language, location and trends.**
Source: https://support.google.com/websearch/answer/7368877. Date: undated. Confidence: Verified official.
What this means for TopEdge: use it to find phrasing, not volume. Collect from India (location settings or VPN) and in English and Hinglish.

**8.2 GSC regex: RE2. Google's own examples: `what|how|when|why` for question queries, `buy|purchase|order` for transactional, brand misspellings for brand. Also negative match. The API caps at 50K rows per day per type per property.**
Source: https://developers.google.com/search/blog/2021/06/regex-negative-match (Jun 2021), https://support.google.com/webmasters/answer/12919192. Confidence: Verified official.
What this means for TopEdge: run regexes for `whatsapp|cod|rto|abandon|shopify|india`, and `kya|kaise|karna|hai` for Hinglish. At 3 clicks a day GSC data is thin, so widen to 16 months. Filter to India.

**8.3 Zero-volume keywords. Ahrefs: most get about their estimated volume. Average 11.3 impressions; fewer than 1% drove over 100 impressions. Single keywords rarely drive traffic. "Zero-volume" wins usually hide a page ranking for hundreds of variants, with difficulty sometimes equal to the head term. Small experiment.**
Source: https://ahrefs.com/blog/zero-volume-keywords/. Date: 21 Oct 2022. Confidence: Original data study, vendor, very small.
What this means for TopEdge: choose by buyer intent and business value. Do not expect traffic from a "0 KD, 0 volume" page alone. One page per topic, covering variants.

**8.4 Long-tail scale: almost 93% of Ahrefs' US database has under 10 monthly searches. Google says about 15% of daily searches are new. Over 95% of conversational long-tail has no measurable volume.**
Source: https://ahrefs.com/blog/long-tail-keywords/. Date: undated in read. Confidence: Original data study, vendor. Share of total demand is not stated. The widely repeated "94.74%" figure was not traced to a primary source.
What this means for TopEdge: volume tools cannot size this market. Use sales calls, support tickets and merchant language.

**8.5 PAA: **GAP**. No Google doc or independent study was read on People Also Ask as a research method. Practitioner practice only.**
What this means for TopEdge: use it as free idea capture. Do not read volume into it.

**8.6 Topical authority: no controlled, independent test found. Surfer's 1M SERPs calls topical coverage the most important on-page factor but publishes no coefficient, and the 74% vs 50% figure comes from its own blog. Indig cites Graphite: high-authority pages gain traffic 57% faster, but that figure was not found in the readable Graphite text (see 13.8). Number of pages correlates weakly with AI visibility.**
Source: https://surfer.ai/blog/ranking-factors-study (updated 9 Sep 2026), https://www.growth-memo.com/p/how-to-measure-topical-authority (20 May 2025), https://ahrefs.com/blog/ai-overview-brand-correlation/. Confidence: Practitioner opinion and vendor data.
What this means for TopEdge: focus on depth across a narrow topic set (WhatsApp cart recovery, COD and RTO, order updates for Shopify India). Do not publish 50 thin posts to "build authority". Google also warns against chasing variants.

**8.7 Clustering: Ahrefs' Parent Topic groups keywords by shared top-ranking results, and Ahrefs warns to verify against the actual SERP. No study was found proving one clustering method better.**
Source: https://ahrefs.com/blog/long-tail-keywords/, https://ahrefs.com/blog/zero-volume-keywords/. Confidence: Practitioner opinion.
What this means for TopEdge: manually: same top results means one page. Different results means different pages. Free and fits this size.

## Q9. Free-tool SEO

**9.1 Stratabeat 2025, 300 B2B SaaS sites: with free tools 20.7% organic traffic growth vs 11.5% without. 93.9% of tool sites increased referring domains. Top-10 keywords improved 24.7% vs 2.0% (via theStacc).**
Source: https://stratabeat.com/b2b-saas-seo-performance-report-released (17 Mar 2025), https://thestacc.com/blog/free-tools-traffic-case-study/. Confidence: Original data study, agency, gated. Correlational. Full PDF could not be read. theStacc's "3.5x" rests on an estimate. The 88% vs about 25% referring domain figure is theirs; the 2024 Stratabeat edition is reported differently.
What this means for TopEdge: promising but unproven: tool builders may simply invest more in SEO.

**9.2 Link examples: Shopify's Business Name Generator over 2.8K backlinks with 71K monthly searches; Talkwalker's free tool over 1.7K linking domains; Elfsight 7,657 to 33,610 domains in a year, over 60% with "widget" in the anchor text, since its free widgets link back.**
Source: https://www.buzzstream.com/blog/saas-link-building/, https://ahrefs.com/blog/bootstrapped-backlink-builders/. Confidence: Original data study, weak; survivors only.
What this means for TopEdge: the real mechanism is demand plus embedding. An embeddable badge or a benchmark merchants quote fits better than a general calculator. Note: badge links in embeds can look like link schemes if used to manipulate; keep them nofollow or brand anchors.

**9.3 Conversion of tool pages: **GAP**. No study with methods was read. Numbers seen (Betterpic, Tally, Docupilot) were vendor anecdotes and only in snippets, and are not used here.**
What this means for TopEdge: define the conversion and measure it from day one. Do not assume it.

**9.4 What makes a tool page rank, supported by evidence: it must be indexable and rendered (1.2, 1.3), non-commodity (5.2, 4.4), and useful in its own right. Mass variants risk scaled abuse (3.3). Language and education utilities lost in March 2026 (4.4).**
Confidence: Inference from Verified official docs and Original data studies. No direct study.
What this means for TopEdge: server-render the tool, plus methodology, worked example, FAQ and India-specific inputs. Build one or two good tools that use TopEdge data, not 20 calculators.

**9.5 Risks summary: soft 404 from JS or default empty state; false 200s; interchangeability; scaled abuse; AI answers replacing simple calculators. Evidence for the last is inference only.**
Confidence: mixed, as above.

## Q10. Shopify App Store

**10.1 Ranking factors, officially listed but unweighted: description, installs, uninstalls, Billing API, search terms, quality criteria, reviews and more. Shopify's 2023 post adds behavioural data on how merchants interact with results, smaller trending apps can rise faster, day-to-day variability up, keyword stuffing has less impact.**
Source: https://www.shopify.com/ca/partners/blog/search-improvements (27 Feb 2023). The factor list came through a search result from Shopify's own community. Confidence: Verified official, old; organic search is not explained on current docs (https://shopify.dev/docs/apps/launch/app-store-review).
What this means for TopEdge: clicks and installs from search matter. Listing conversion and retention are SEO for this surface.

**10.2 Built for Shopify gets a stated boost: "Built for Shopify apps appear higher in Shopify App Store search rankings." It can also be earned via the Increased visibility achievement. There is a BFS search filter. Requirements include 50 net installs from active paid-plan shops and 5 reviews, plus a recent rating threshold with no number stated.**
Source: https://shopify.dev/docs/apps/launch/built-for-shopify, https://shopify.dev/docs/apps/launch/built-for-shopify/requirements, https://www.shopify.com/partners/blog/built-for-shopify-updates (30 Oct 2025). Confidence: Verified official.
What this means for TopEdge: this is the only officially stated ranking lever. Check the Distribution page against requirements and treat BFS as a priority.

**10.3 Listing rules: app name max 30 characters, must lead with your distinctive brand. Subtitle: benefits; do not add keywords to improve search; no data or statistics. Up to 5 search terms, one idea each, complete words. App details 500 characters. Introduction 100 characters. Features 80 characters each. No "first, best, only", no statistics in listing content, no reviews in images.**
Source: https://shopify.dev/docs/apps/launch/shopify-app-store/best-practices, https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements. Date: undated. Confidence: Verified official.
What this means for TopEdge: audit the listing line by line. Stats like uplift percentages in the listing are a rejection risk, and belong on the site.

**10.4 Community reading: search behaves closer to string matching. Apps with 9-17 reviews ranked above apps with 140 to 1,186 when the title held the exact phrase. In about six categories, including abandoned cart recovery, Shopify's built-in feature appears above organic results.**
Source: https://community.shopify.dev/t/reading-page-one-of-50-app-store-searches-the-ranking-pattern-title-carries-it-not-reviews/37411. Date: 3 Sep 2026. Confidence: Practitioner opinion, about 50 searches, one week, no dataset.
**CONFLICT:** (a) Exact phrase in title vs 4.1.2's lead-with-brand and 30-character cap. Reconcile as "TopEdge: <phrase>", if it fits and passes review. (b) Title first vs community members who say reviews, install velocity and retention dominate (https://community.shopify.com/t/what-factors-affect-ranking-in-the-shopify-app-store/563020, Sep 2025). Unresolved, and Shopify publishes no weights.
What this means for TopEdge: test one exact-match change at a time and log rank daily. For "abandoned cart" expect a native feature above you, so favour WhatsApp, COD and RTO phrases too.

**10.5 Rating display: **GAP**. No minimum review count to display a rating appears in any Shopify doc read. Documented: the rating is weighted to recent, useful, trustworthy reviews, not a simple average. Unpublished reviews do not count. AI review summaries need 100 reviews with text and a 4.0 rating.**
Source: https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews, https://help.shopify.com/en/manual/apps/finding-choosing-apps. Confidence: Verified official.
What this means for TopEdge: do not quote a display threshold. Check the live listing. The real thresholds to aim for are 5 for BFS and 100 for summaries.

**10.6 Reviews policy. "It is forbidden to offer incentives or withhold features in exchange for reviews." Requests must be neutral, not during onboarding or installation, not in admin, Sidekick or checkout extensions. Email only those who opted in. Penalties: review removal, demotion, delisting, account termination. July 2026: incentivising apps lose a "significant portion" of reviews, and untrusted reviews are being backfilled out, including genuine apps whose reviewers reviewed many listings.**
Source: https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements, https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews, https://shopify.dev/changelog/strengthening-trust-in-app-store-reviews (6 Jul 2026). Confidence: Verified official.
What this means for TopEdge: no free months or discounts for reviews, no gating, no friend-store reviews. A review count that drops may be from the purge.

**10.7 Legitimate review tactics: use the Reviews API to ask merchants who use the app, after value, after a support resolution, with neutral wording. Offer opt-out after one ask. Reply to reviews. After fixing a bug, you may politely ask them to consider updating. Merchants can review within 45 days of uninstalling.**
Source: https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews, https://www.shopify.com/partners/blog/get-reviews-for-your-shopify-apps (12 Aug 2021). Confidence: Verified official.
What this means for TopEdge: trigger an in-app ask after a measurable result, such as the first recovered order, using neutral text. Have the founder personally follow up with active merchants after support.

## Q11. Content refresh and comparison pages

**11.1 Refresh evidence is old and self-reported. HubSpot: updated posts +106% average monthly organic views, leads tripled, 76% of views and 92% of leads from old posts (six-post chart, 30-day windows). Ahrefs: republish, check 1-3 weeks later, start with top 20% of pages; one keyword example 21 to 4.**
Source: https://blog.hubspot.com/marketing/historical-blog-seo-conversion-optimization (updated 13 Jun 2025, data older), https://ahrefs.com/blog/fresh-content/. Confidence: Original data study, weak; Practitioner opinion. **GAP:** no independent 2025-2026 controlled refresh study was read. Figures like "20-30% gain" (theStacc) or "Animalz 42%" were only in snippets and are not used.
What this means for TopEdge: with little traffic, refresh only pages already getting impressions. New commercial pages come first.

**11.2 Freshness and AI: cited URLs 25.7% fresher than organic across assistants, ChatGPT 393-458 days newer, but AIO cites slightly older pages, and within a search result set, older pages tend to be cited more. Median cited search page about 500 days old.**
Source: https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/ (28 Jul 2025), https://ahrefs.com/blog/why-chatgpt-cites-pages/ (15 Apr 2026). Confidence: Original data study, vendor.
**CONFLICT:** "fresher" vs "older in the same set". Comparison pool differs.
What this means for TopEdge: freshness helps with ChatGPT-style retrieval but is not a Google AIO lever. Date-only edits are not worth doing.

**11.3 Date faking is a named warning sign. Google lists changing dates to seem fresh as a warning sign. Ray found "artificial date refreshing" and "2026" in titles at the sites that lost visibility. Ahrefs: never change the date without substantial content changes.**
Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content, https://lilyraynyc.substack.com/p/is-google-finally-cracking-down-on, https://ahrefs.com/blog/fresh-content/. Confidence: Verified official plus Practitioner.
What this means for TopEdge: only change dates with real updates. Audit site templates for auto-updated dates and year-in-title automation.

**11.4 Comparison conversion. Grow and Convert, 95 client articles over six months, 123,000 pageviews, 4,687 conversions: alternatives 8.43%, vs 5.45%, main category 4.85%, category plus specificity 2.77% (2.96% stated elsewhere), JTBD 2.44%, side category 1.94%. Most alternatives posts convert below 4%, so the mean is outlier-driven; only 23 alternatives posts.**
Source: https://www.growandconvert.com/conversion-rate-optimization/average-seo-conversion-rate/. Date: updated 26 Jan 2026, data about 2023. Confidence: Original data study, agency's own clients.
What this means for TopEdge: alternatives and vs pages are the best clicks-to-installs bet at this traffic level. Plan on about 2-4%, not 8%.

**11.5 What comparison pages should do, Google: evidence of experience, quantitative measures, pros and cons, what sets options apart, which is best for which use, explain "best overall" with first-hand evidence, cover comparable options, ranked lists must stand on their own.**
Source: https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews. Date: undated. Confidence: Verified official.
What this means for TopEdge: Updatrr and Bitespeed pages need real screenshots, dated pricing, who should pick them over TopEdge, and tested flows. No fabricated claims.

**11.6 Listicle ranking depends on query wording. Indig: 5.32M rows, 60K US queries. Listicle in top three on 54.5% of queries asking for options, 12.1% on comparison or category queries, 10.2% implicit. B2B software top-10 listicle rate 62.5%. Only 52.5% kept the same position 1 URL.**
Source: https://www.relevantaudience.com/content-marketing/google-listicle-study-query-phrasing-august-2026/ (reports Growth Memo, Aug 2026). Confidence: Original data study, reported secondhand, final validation pending, US desktop.
What this means for TopEdge: a list format only for "best X" queries. Use a direct comparison for "X vs Y" and "X alternative", and check the live India SERP before choosing.

**11.7 Intermediaries lost in March 2026 (4.4). GAP: no study isolates SaaS alternatives pages through a core update. Ray notes comparison pages were among the tactics of affected sites but does not isolate them.**
What this means for TopEdge: a small number of honest pages, not a template rolled out over every competitor.

## Q12. Google in India

**12.1 Mobile 84.21%, desktop 15.17%, Oct 2026. Google 98.06% of search, Bing 1.11%, Oct 2026.**
Source: https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/india, https://gs.statcounter.com/search-engine-market-share/all/india. Confidence: Original data study, page-view based. It is all-India consumer traffic, not Shopify merchants, and merchants may skew desktop for admin tasks. Check GSC device split.
What this means for TopEdge: test on mobile first, for tools especially. Bing-focused work has low return in India, though Bing also feeds some AI engines.

**12.2 AI rollout. AIO in India from Aug 2024 in English and Hindi, with toggle and Listen. AI Mode launched Jun 2025 English (via shreyasbagal.in), Hindi 8 Sep 2025, seven more languages 8 Oct 2025. Search Live: India first outside US, English and Hindi. Google says India has the largest user base for voice and visual search. Queries about 3x longer globally. India named as a big market with over 10% usage increase for AIO queries.**
Source: https://blog.google/intl/en-in/products/explore-communicate/expanding-the-helpfulness-of-ai-overviews/ (15 Aug 2024), https://blog.google/intl/en-in/products/google-search-ai-mode-now-available-in-hindi/ (8 Sep 2025), https://blog.google/intl/en-in/products/supercharging-search-for-india-new-languages-in-ai-mode-search-live-debuts/ (8 Oct 2025), https://blog.google/products/search/google-search-ai-mode-update/ (20 May 2025). Confidence: Verified official. No India user counts given.
What this means for TopEdge: India's AI search exposure is real and early. Assume similar or higher AI answer exposure, but no figure supports a specific CTR.

**12.3 Hinglish: Google's posts make no claim AI Mode understands mixed Hindi-English typing. Flipkart found around 21% of non-English-only queries were code-mixed Hinglish (detector 84% precision, 72% recall, 2022 preprint). E-commerce only.**
Source: https://shreyasbagal.in/google-ai-mode-india-guide (Practitioner), https://ar5iv.labs.arxiv.org/html/2208.03713 (Original data study, about Aug 2022). **GAP:** no study of Hinglish share on Google. Search-level hits were not primary.
What this means for TopEdge: merchants searching for B2B tools may use English more, but this is untested. Use GSC to measure it. Do not create parallel Hinglish pages without proof of demand.

**12.4 No India-specific AIO CTR, prevalence, or B2B search study was found. Stratabeat's 17.1% AIO in B2B SaaS SERPs is not India data.**
Confidence: **GAP.**
What this means for TopEdge: run a small manual sample: 50 target queries from an Indian IP, logging AIO presence and citations, monthly. Combine with the GSC generative AI report.

## Q13. How topical authority clusters work: pillar and spoke, one page for many queries, site focus

Bottom line first: the mechanics of one page ranking for many queries are well measured. A site-level focus signal has weak official support. No controlled test of pillar and spoke was found.

**13.1 Google names no web "topical authority" system. Its ranking systems guide lists no system by that name, but says "Site-wide signals and classifiers are also used". The specific signals are not disclosed.**
Source: https://developers.google.com/search/docs/appearance/ranking-systems-guide. Date: undated. Confidence: Verified official.
What this means for TopEdge: site-level quality can affect every page, so plan for it. Do not describe "topical authority" internally as a confirmed Google score.

**13.2 The one official "topic authority" system is for news. It helps surface expert sources for news queries, using notability for a topic or location, how other publishers cite original reporting, and source reputation.**
Source: https://developers.google.com/search/blog/2023/05/understanding-news-topic-authority. Date: 23 May 2023. Confidence: Verified official, news only.
What this means for TopEdge: it does not apply directly to a SaaS blog, and extending it to one is inference. Its signals do suggest a useful habit: publish original data that others cite.

**13.3 Leaked attributes exist. siteFocusScore: "Number denoting how much a site is focused on one topic". siteRadius: "The measure of how far page_embeddings deviate from the site_embedding". Mike King: "We do not know how features are weighted". Documents date from about March 2024.**
Source: https://ipullrank.com/google-algo-leak. Date: May 2024. Confidence: Practitioner opinion on a leaked primary document. The leak itself was not read directly.
**CONFLICT:** Google confirmed the leak but cautioned against "inaccurate assumptions about Search based on out-of-context, outdated, or incomplete information", and would not discuss specific signals (https://www.seroundtable.com/google-confirmed-search-leak-37476.html, 30 May 2024; Verified official, via SER). Ahrefs and others present dilution as a risk, with hedging (https://ahrefs.com/blog/topical-authority/, 1 Jun 2026).
What this means for TopEdge: stay on Shopify, WhatsApp, COD and retention topics because it serves buyers and matches the possible signal. Off-topic pages should not be deleted on this evidence alone. Use traffic, conversions and the indexing status as the test (1.8, 4.7).

**13.4 One page does rank for many queries. Ahrefs, 3M queries: the average #1 page also ranks in the top 10 for nearly 1,000 other keywords, median about 400. Ranking #1 for more than one 10K+ keyword with one page is very rare. The #1 page got the most total traffic only 49% of the time (about 100K queries).**
Source: https://ahrefs.com/blog/also-rank-for-study/ (8 May 2017), https://ahrefs.com/blog/ranking-number-one-is-overrated/ (28 Mar 2019). Confidence: Original data study, vendor, old, English, high-volume sample in the second study. Sites with few links will likely see far smaller numbers.
What this means for TopEdge: judge a page by total clicks across its queries in GSC, not by one target keyword. Do not make a new page for each variant.

**13.5 Google's own systems support this. Passage ranking can "identify individual sections or "passages" of a web page". Site diversity: "we generally won't show more than two web page listings from the same site in our top results". The AI guide says Google can handle multiple topics on one page and synonyms are understood.**
Source: https://developers.google.com/search/docs/appearance/ranking-systems-guide, https://developers.google.com/search/docs/fundamentals/ai-optimization-guide. Confidence: Verified official.
What this means for TopEdge: several near-identical pages will not take several top spots. Clear H2 sections on one page can match sub-queries.

**13.6 When to split or merge. Ahrefs recommends one primary keyword plus secondaries that cover the topic, and gives no numeric threshold. Its SEO basics example ranks for 463 keywords, 156 in the top 10. HubSpot merged duplicates into the highest-ranking URL and redirected the rest.**
Source: https://ahrefs.com/blog/how-many-seo-keywords/ (11 Jan 2023), https://blog.hubspot.com/marketing/pillar-cluster-model-transform-blog (updated 26 Aug 2025, body refers to 2018). Confidence: Practitioner opinion.
**CONFLICT:** Ahrefs says Google tends to favour the page with the most specific focus and each page needs one clear topic. Google's guide says one page can handle multiple topics. These fit together if "topic" means search intent, but that is interpretation.
**GAP:** no study establishes a split rule. The SERP comparison in 8.7 is the best available method.
What this means for TopEdge: if two queries share most top results and the same intent, use one page. If results differ, use two. Run this first on overlapping pages among the 150 before adding anything.

**13.7 Pillar and spoke has no controlled evidence. HubSpot's founding write-up reports first-page tracked keywords growing month over month, but gives no counts or traffic figures, and notes declines in organic traffic that it partly attributes to seasonality and Featured Snippets. Ahrefs' 2026 guide has no experiments or sample sizes. A review of a 2026 methodology article found single-site observations and correlations only. The 15-20 article, 3-5 link and 6-12 month figures are rules of thumb.**
Source: https://blog.hubspot.com/marketing/pillar-cluster-model-transform-blog, https://ahrefs.com/blog/topical-authority/, https://www.digitalapplied.com/blog/topic-cluster-content-architecture-2026-seo-methodology. Confidence: Practitioner opinion.
What this means for TopEdge: use clusters as an information architecture that helps users and crawlers, since Google says every page you care about needs an internal link and contextual links help understanding (https://developers.google.com/search/docs/crawling-indexing/links-crawlable). Do not promise an uplift, a timeline or a required article count.

**13.8 Best available data on topical similarity and speed. Graphite: pages on topics more similar to those a domain already ranks for reached visibility faster. 332 URLs, 12 client domains, published Jun-Jul 2023. The score is proprietary. No averages or p-values were readable in the text. Traffic was not measured.**
Source: https://graphite.io/five-percent/topical-authority-white-paper. Date: 24 Jan 2024. Confidence: Original data study, vendor's own clients, proprietary metric.
**CONFLICT:** the "57% faster" and "about 20 days faster" figures were not found in the readable Graphite text. Secondary pages attribute versions of them to Graphite, and one snippet to Keyword Insights. Do not quote them.
What this means for TopEdge: publish next to topics where GSC already shows impressions, as the lowest-risk way to expand. This is directional, not proof of a causal effect.

**13.9 Weak numbers to avoid. A secondary audit found most theStacc topical authority figures (25-30 articles for a 40-70% lift, 3.7x faster) trace to unnamed campaigns, and its own vendor data. Surfer's 253,800 SERP claim was seen only secondhand here. fahlout.com lists further studies (Surfer, Keyword Insights) that were not opened.**
Source: https://thestacc.com/blog/topical-authority-impact-study/, https://fahlout.com/research/topical-authority. Confidence: Practitioner opinion.
What this means for TopEdge: leave these out of forecasts.

**13.10 Mueller's position is unverified here. A secondary page says he agreed on Reddit that the concept is relevance under a different name, with no link or date. No primary quote from Google staff on topical authority or pillar pages was read.**
Source: https://www.socialaibusinesssolutions.com/blog/topical-authority-what-it-actually-is. Confidence: Practitioner opinion. **GAP.**
What this means for TopEdge: do not attribute "topical authority isn't real" to Google in any document.

**Suggested working model, labelled as inference from the above:** three topic hubs (WhatsApp cart recovery, COD and RTO, order updates on Shopify in India). One hub page per topic, spokes only where the SERP and intent differ, contextual links both ways, duplicates merged by 301, and success measured by total queries and clicks per cluster in GSC, plus the generative AI impressions report.

## Source conflicts in one place

1. Discovered, not indexed: overload (help page) vs quality (Splitt). See 1.7.
2. Disavow: "waste of time" vs "does have effects". See 2.6.
3. AIO click loss: Ahrefs -58% vs Seer rebound vs Semrush small zero-click shift vs Google "stable". See 5.4 to 5.7.
4. AI citation overlap with top 10: 38% vs 67% vs about 10%, differing by engine, date and parsing. See 5.9.
5. Reddit share in ChatGPT: 16.7% vs 3.8% vs 0.5%, by denominator and window. See 6.7.
6. Web mentions and ChatGPT: strong vs very weak, by sample. See 6.4.
7. Self-promotional listicles: Ray vs Scrunch vs Indig. See 6.9.
8. Schema: Ahrefs null vs observational positives. See 6.11.
9. Freshness: fresher overall vs older within a set. See 11.2.
10. Shopify: title vs reviews vs install velocity, and exact-match title vs brand-first naming rule. See 10.4.
11. Qwoted free tier and pricing. Official page wins. See 7.3.
12. Reddit March 2026 direction. See 4.6.
13. AI Mode "default experience": PR Daily claim vs reports of a model change only. See 5.10.
14. Site focus: leaked attributes and practitioner dilution claims vs Google's caution on the leak. See 13.3.
15. One topic per page (Ahrefs) vs multiple topics on a page (Google guide). See 13.6.
16. The "57% faster" topical authority figure: not found in Graphite's readable text, and attributed inconsistently. See 13.8.

---

# Myths to drop

1. **"Disavow your toxic links."** Google limits it to spammy links plus a manual action or likely one. Mueller says toxic links are made up by SEO tools. (2.1, 2.3 to 2.5)
2. **"Toxic scores from tools indicate risk."** No Google support found. (2.5)
3. **"Negative SEO explains your low rankings."** Google has repeatedly said it does not, though the strongest statements are old. (2.7)
4. **"Use disavow from your Domain property in Search Console."** The tool does not support Domain properties. (2.2)
5. **"Crawl budget is holding back a 150-page site."** Google's guide targets sites orders of magnitude bigger. (1.9)
6. **"Thin content is a documented soft 404 trigger, so tool pages are soft 404 by nature."** Docs describe error-like or empty content. (1.1, 1.5)
7. **"Trailing slash is a ranking factor."** It is only a duplicate and consistency matter. (1.11)
8. **"llms.txt gets you cited."** Google says Search does not use it. The largest study found no relationship. (6.10)
9. **"Schema gets you AI citations."** Best available matched test shows no measurable lift for already-visible pages. Keep it for other reasons. (6.11)
10. **"Chunk your content and write for LLMs."** Google says to ignore this. (5.2, 3.5)
11. **"Princeton says GEO gives 40% more visibility."** It was mostly a GPT-3.5 lab pipeline, with one small live test, and rank 1 pages lost. (6.1)
12. **"Third-party GEO tools see into Google."** "No third-party tool has access to our internal ranking or AI systems." (3.5)
13. **"E-E-A-T is a direct ranking factor."** Google says it is not. (4.1) Likewise "information gain is a confirmed primary signal" and a "Gemini 4.0 semantic filter" have no support in pages read. (4.5)
14. **"Publish a self-ranked listicle and AI will recommend you."** Often cited, rarely recommended. A scaled version correlated with whole-site losses. (6.9)
15. **"More pages equal more AI visibility."** Page count correlates weakly at best. (6.3, 6.4)
16. **"Reddit is the permanent number one AI source."** Share swings by 80%+ within weeks, and it varies widely by engine. Claude barely cites it in one dataset. (6.6, 6.7)
17. **"84% of AI citations are earned, so buy PR."** The definition is broad, Google is excluded, and journalism is about a quarter. (6.13)
18. **"AI Overviews have killed clicks, full stop."** Exposure on commercial and transactional queries is lower, and Seer shows partial recovery. Conversely, **"AI clicks are confirmed higher quality"** rests on Google's statement without published data. (5.5, 5.6)
19. **"AI Mode is a big traffic source."** Reported visit rates are low. (5.10)
20. **"Zero-volume keywords secretly bring lots of traffic."** Most get about their estimate. It is the variant cluster that brings traffic. (8.3)
21. **"94.74% of keywords get 10 or fewer searches" and "64% more likely with topical authority".** Neither could be traced to a primary source. Do not cite. (8.4, 8.6)
22. **"Topical authority is a proven ranking factor with known numbers."** Evidence is vendor-run or indirect. (8.6)
23. **"Long content ranks."** Surfer says weak correlation. Google: no ideal page length. (5.2, 8.6)
24. **"Refresh the date for a freshness boost."** Google names this a warning sign. (11.3)
25. **"Refreshing lifts traffic by 106%."** That is one company's self-reported figure, from a tiny sample. (11.1)
26. **"Alternatives pages convert at 8.43%."** Mean inflated by outliers. Most convert below 4%. (11.4)
27. **"HARO still works" or "Help a B2B Writer is open as before."** Connectively shut in Dec 2024. Help a B2B Writer redirects to a site saying launching soon. (7.3)
28. **"Journalist platforms are a quick source of followed links."** Only 21.9% of requests explicitly offer them. (7.4)
29. **"Reciprocal links are fine if small" and "paid listicles are safe".** Google names excessive exchanges and paying for posts with links. No threshold is published, and purpose decides. (3.1, 3.2)
30. **"Ranking in the App Store is mostly reviews."** Contested. Shopify lists many factors, and community reads favour title matching. (10.1, 10.4)
31. **"You can offer a discount for an honest review on Shopify."** Forbidden. (10.6)
32. **"Hinglish pages are needed to reach Indian merchants."** No evidence for B2B Shopify queries. (12.3)
33. **"Google has confirmed a topical authority score" or "the leak proves off-topic content dilutes rankings".** The official system is news only. The leak shows that attributes exist, not their weight. (13.1 to 13.3)
34. **"Pillar and spoke is proven, and needs 25 articles or 6 to 12 months."** No controlled test was found. Those numbers are rules of thumb or unnamed data. (13.7, 13.9)
35. **"Each keyword needs its own page."** Pages commonly rank for many queries, and site diversity limits duplicates in top results. (13.4, 13.5)

---

# Sources read

Honest count: **155 URLs opened with content returned**, above the 60 to 100 target because the questions spanned thirteen areas. 52 of these are Google or Shopify first-party pages. Roughly 35 are vendor, agency or low-authority pages kept mainly to trace a claim or flag it as weak, and a few turned out to add nothing to the digest (numbers 17, 38, 50). So the useful quality-weighted set is smaller than the raw number suggests.

Limits on "read": each page was read through a fetch tool that extracts against a focused prompt, not reviewed line by line. Very long pages may be partly read (for example number 33, first 100,000 of about 195,000 characters, which covers Jan 2025 to Oct 2026). Pages seen only as search result snippets are not listed here.

Opened but failed, not counted, and not used: searchengineland.com (three articles, 403), gsqi.com disavow case study (403), aira.net State of Link Building (403), indiehackers.com topical authority post (403), poweredbysearch.com comparison pages (403), userp.io disavow removal claim (403), aimagazine.com Muck Rack release (403), Stratabeat full PDF (too large), arXiv PDF of the GEO paper (binary; the ar5iv HTML version was read instead), searchenginejournal.com domain-level disavow article (two addresses, 404), shopify.dev app-listing path (404), support.google.com/webmasters/answer/2701842 (404), and three guessed Google topic authority addresses on blog.google and developers.google.com (404).

## Google, first-party

1. https://developers.google.com/search/docs/crawling-indexing/http-network-errors
2. https://support.google.com/webmasters/answer/7440203
3. https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget
4. https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
5. https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
6. https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash
7. https://support.google.com/webmasters/answer/2648487
8. https://developers.google.com/search/docs/essentials/spam-policies
9. https://developers.google.com/search/docs/fundamentals/creating-helpful-content
10. https://developers.google.com/search/docs/appearance/ai-features
11. https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history
12. https://developers.google.com/search/blog/2024/03/core-update-spam-policies
13. https://developers.google.com/search/docs/appearance/core-updates
14. https://blog.google/products/search/ai-mode-search/
15. https://blog.google/products/search/google-search-ai-mode-update/
16. https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
17. https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site
18. https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
19. https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
20. https://blog.google/intl/en-in/products/supercharging-search-for-india-new-languages-in-ai-mode-search-live-debuts/
21. https://blog.google/intl/en-in/products/google-search-ai-mode-now-available-in-hindi/
22. https://blog.google/intl/en-in/products/explore-communicate/expanding-the-helpfulness-of-ai-overviews/
23. https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews
24. https://support.google.com/websearch/answer/7368877
25. https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript
26. https://developers.google.com/search/docs/crawling-indexing/links-crawlable
27. https://blog.google/products/search/ai-search-driving-more-queries-higher-quality-clicks/
28. https://developers.google.com/search/blog/2024/11/site-reputation-abuse
29. https://developers.google.com/search/blog/2021/06/regex-negative-match
30. https://developers.google.com/search/docs/appearance/spam-updates
31. https://support.google.com/webmasters/answer/9044175
32. https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
33. https://developers.google.com/search/updates
34. https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
35. https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing
36. https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
37. https://developers.google.com/search/docs/crawling-indexing/control-what-you-share
38. https://support.google.com/webmasters/answer/12919192

## Shopify, first-party

39. https://shopify.dev/docs/apps/launch/app-store-review
40. https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements
41. https://shopify.dev/docs/apps/launch/shopify-app-store/best-practices
42. https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews
43. https://shopify.dev/changelog/strengthening-trust-in-app-store-reviews
44. https://shopify.dev/docs/apps/launch/built-for-shopify
45. https://shopify.dev/docs/apps/launch/built-for-shopify/requirements
46. https://www.shopify.com/ca/partners/blog/search-improvements
47. https://www.shopify.com/partners/blog/built-for-shopify-updates
48. https://www.shopify.com/partners/blog/get-reviews-for-your-shopify-apps
49. https://help.shopify.com/en/manual/apps/finding-choosing-apps
50. https://www.shopify.com/blog/app-store-optimization

## Shopify community

51. https://community.shopify.dev/t/reading-page-one-of-50-app-store-searches-the-ranking-pattern-title-carries-it-not-reviews/37411
52. https://community.shopify.com/t/what-factors-affect-ranking-in-the-shopify-app-store/563020

## Google statements reported by trade press

53. https://seroundtable.com/google-disavow-tool-effects-42004.html
54. https://www.seroundtable.com/google-again-blasts-the-concept-of-toxic-links-37453.html
55. https://www.seroundtable.com/google-spammers-encourage-waste-time-disavowing-links-38797.html
56. https://www.searchenginejournal.com/google-says-disavow-tool-not-part-of-normal-site-maintenance/543861
57. https://www.searchenginejournal.com/googles-mueller-slams-negative-seo-link-disavow-companies/478348/
58. https://www.searchenginejournal.com/google-link-spam/308283/
59. https://www.searchenginejournal.com/google-disavow-tool/388775/
60. https://www.seroundtable.com/google-paid-or-spam-backlink-reports-no-action-36578.html
61. https://www.seroundtable.com/google-javascript-not-available-40931.html
62. https://www.seroundtable.com/google-soft-404s-or-noindex-empty-pages-31263.html
63. https://www.searchenginejournal.com/googles-john-mueller-explains-why-expired-product-pages-may-become-soft-404s/293959/
64. https://www.searchenginejournal.com/google-explains-crawled-not-indexed/521311/
65. https://www.seroundtable.com/google-on-discovered-currently-not-indexed-37931.html
66. https://www.searchenginejournal.com/google-says-discovered-currently-not-indexed-status-can-last-forever/439104/
67. https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/
68. https://www.searchenginejournal.com/googles-mueller-says-llms-txt-cant-help-llms-differentiate-sites/566027/
69. https://seroundtable.com/john-mueller-google-systems-ai-spam-42420.html
70. https://www.seroundtable.com/is-google-algorithm-the-hitting-llm-tactic-of-self-promotional-listicles-41071.html
71. https://www.seroundtable.com/google-warns-against-trying-to-manipulate-llms-41156.html
72. https://ppc.land/google-disputes-pew-study-showing-ai-overviews-reduce-clicks-by-half/
73. https://ppc.land/googles-june-2026-spam-update-is-live-what-it-hits-and-why-it-matters/
74. https://ppc.land/google-spam-policies-now-officially-cover-ai-overviews-and-ai-mode-in-search
75. https://triaza.com/blog/seo/google-september-2026-spam-update/
76. https://seosherpa.com/google-just-closed-the-ai-search-loophole-that-gurus-have-been-selling-for-two-years/

## Academic and independent data

77. https://arxiv.org/abs/2311.09735
78. https://ar5iv.labs.arxiv.org/html/2311.09735
79. https://arxiv.org/abs/2509.08919
80. https://ar5iv.labs.arxiv.org/html/2208.03713
81. https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/
82. https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/india
83. https://gs.statcounter.com/search-engine-market-share/all/india
84. https://lilyraynyc.substack.com/p/why-calling-yourself-the-best-could
85. https://lilyraynyc.substack.com/p/is-google-finally-cracking-down-on

## Ahrefs

86. https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/
87. https://ahrefs.com/blog/schema-ai-citations/
88. https://ahrefs.com/blog/ai-overview-citations-top-10/
89. https://ahrefs.com/blog/ai-overview-brand-correlation/
90. https://ahrefs.com/blog/how-to-rank-on-chatgpt/
91. https://ahrefs.com/blog/llm-search/
92. https://ahrefs.com/blog/branded-web-mentions-visibility-ai-search/
93. https://ahrefs.com/blog/ai-traffic-increase/
94. https://ahrefs.com/blog/ai-overviews-cite-ai-generated-content-more-than-human-writing/
95. https://ahrefs.com/blog/google-ai-mode/
96. https://ahrefs.com/blog/zero-volume-keywords/
97. https://ahrefs.com/blog/long-tail-keywords/
98. https://ahrefs.com/blog/search-traffic-study/
99. https://ahrefs.com/blog/bootstrapped-backlink-builders/
100. https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/
101. https://ahrefs.com/blog/why-chatgpt-cites-pages/
102. https://ahrefs.com/blog/fresh-content/

## Semrush, Seer, other data vendors and agencies

103. https://www.semrush.com/blog/semrush-ai-overviews-study/
104. https://www.semrush.com/blog/ai-mode-comparison-study/
105. https://www.semrush.com/blog/reddits-citations-in-chatgpt-fall/
106. https://www.semrush.com/blog/most-cited-domains-ai/
107. https://www.seerinteractive.com/insights/ctr-aio
108. https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update
109. https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update
110. https://llmpulse.ai/data-studies/top-cited-domains
111. https://uxcontinuum.com/research/ai-answer-sources-2026
112. https://attrifast.com/blog/ai-search-citations-by-vertical-2026
113. https://obsurfable.com/resources/reports/top-domains-cited-by-llms-august-2026
114. https://ppc.land/self-ranked-brands-gain-ai-recommendations-from-4-to-7-scrunch-finds/
115. https://www.relevantaudience.com/content-marketing/google-listicle-study-query-phrasing-august-2026/
116. https://citationlabs.com/2025-link-building-survey
117. https://buzzstream.com/blog/journalist-request-platform-study/
118. https://www.buzzstream.com/blog/saas-link-building/
119. https://www.growandconvert.com/conversion-rate-optimization/average-seo-conversion-rate/
120. https://stratabeat.com/b2b-saas-seo-performance-report-released
121. https://surfer.ai/blog/ranking-factors-study
122. https://www.growth-memo.com/p/how-to-measure-topical-authority
123. https://blog.hubspot.com/marketing/historical-blog-seo-conversion-optimization

## Secondary summaries and practitioner pages, opened to trace or flag claims

124. https://www.digitalapplied.com/blog/march-2026-core-update-content-quality-winners-losers
125. https://digitalapplied.com/blog/may-vs-march-2026-core-updates-pattern-comparison
126. https://xpert.digital/en/google-core-update-march-2026/
127. https://blckalpaca.at/en/knowledge-base/seo-geo/geo-generative-engine-optimization/llmstxt-844000-implementations-zero-confirmed-ai-usage
128. https://blckalpaca.at/en/knowledge-base/seo-geo/off-page-seo-link-building/haro-alternatives-2026-featured-qwoted-and-source-of-sources
129. https://www.techwyse.com/news/ai-search/schema-markup-ai-citations-ahrefs-study
130. https://analyzify.com/hub/schema-markup-ai-citations-research
131. https://almcorp.com/news/self-promotional-listicles-ai-overviews-help-competitors-lily-ray-study/
132. https://www.elmohq.com/blog/self-promotional-listicles-ai-visibility
133. https://www.gogochimp.com/blog/what-chatgpt-actually-cites-2026
134. https://everything-pr.com/haro-business-media
135. https://geoseotoday.com/en/blog/haro-alternatives-2026/
136. https://www.qwoted.com/pricing/
137. https://www.sourcebottle.com/
138. https://mentionmatch.com/
139. https://thestacc.com/blog/free-tools-traffic-case-study/
140. https://www.prdaily.com/the-84-myth-why-the-pr-industrys-ai-numbers-are-wrong/
141. https://shreyasbagal.in/google-ai-mode-india-guide

## Added for Q13

142. https://developers.google.com/search/docs/appearance/ranking-systems-guide (Google, first-party)
143. https://developers.google.com/search/blog/2023/05/understanding-news-topic-authority (Google, first-party)
144. https://www.seroundtable.com/google-confirmed-search-leak-37476.html
145. https://ipullrank.com/google-algo-leak
146. https://graphite.io/five-percent/topical-authority-white-paper
147. https://ahrefs.com/blog/topical-authority/
148. https://ahrefs.com/blog/also-rank-for-study/
149. https://ahrefs.com/blog/ranking-number-one-is-overrated/
150. https://ahrefs.com/blog/how-many-seo-keywords/
151. https://blog.hubspot.com/marketing/pillar-cluster-model-transform-blog
152. https://www.digitalapplied.com/blog/topic-cluster-content-architecture-2026-seo-methodology
153. https://thestacc.com/blog/topical-authority-impact-study/
154. https://fahlout.com/research/topical-authority
155. https://www.socialaibusinesssolutions.com/blog/topical-authority-what-it-actually-is

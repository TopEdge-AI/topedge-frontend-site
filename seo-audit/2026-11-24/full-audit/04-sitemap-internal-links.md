# 04 Sitemap and internal link graph, topedgeai.com, 24 Nov 2026

Method: live fetch of sitemap.xml and all 170 URLs (browser UA, redirects not followed, curl), `sitemap_discovery.py --expand`, plus a link graph parsed from dist/ (175 HTML files; 170 indexable). Read-only. Labels: Verified = measured this run; Estimate = derived; Hypothesis = unconfirmed.

Caveat (Verified): dist/ is not byte-identical to the live deploy. 168 of 170 pages differ by a few bytes (live uses asset `index-96292b31.js`, dist uses `index-5fdbb1ce.js`; dist adds a `lenis` html class). To compensate I re-extracted every internal href from the 170 live pages: 175 unique targets, 0 missing, 0 hitting a redirect. The graph below is dist/, and the live hrefs agree on broken and redirected links.

## 1. Sitemap validation

| Check | Result | Label |
|---|---|---|
| Well-formed XML, single urlset, 27,671 bytes, 170 URLs, 0 duplicates, 0 invalid loc, no cross-host | PASS | Verified |
| Under 50,000 URLs / 50 MB | PASS | Verified |
| Every URL returns 200, no redirect hops (170/170) | PASS | Verified |
| noindex (meta or X-Robots-Tag) on any sitemap URL | 0 | Verified |
| `<link rel=canonical>` equals sitemap URL | 170/170 match | Verified |
| lastmod present and valid W3C dates | 170/170, 0 invalid, 17 distinct values, newest 2026-11-24, oldest 2026-10-21, most common 2026-11-22 (34.7 percent) | Verified |
| Sitemap vs dist/ routes | 1:1. In dist, not in sitemap: /404, /dev, /login, /signup, /partners/terms (all intentionally noindex or error). In sitemap, not in dist: none | Verified |
| Sitemap vs blog data (src/data/blogPosts.ts, Q4, Roundups) | 43 slugs in data, 43 in BLOG_SLUGS, 43 `/blog/<slug>` in sitemap, 0 drift | Verified |
| Orphan sitemap entries (sitemap URL with no inbound link) | 0 | Verified |
| Missing indexable routes (App.tsx) | None. Dynamic routes (festival, journey examples, compare, features, docs) are all enumerated. Redirect-only aliases (/privacy-policy, /terms-of-service, /blogs) correctly excluded | Verified |
| `changefreq` and `priority` on all 170 entries | Ignored by Google, harmless noise. Optional removal in generate-sitemap.mjs | Verified, Info |

### lastmod quality (Low)
lastmod is group-stamped rather than per page (Verified from sitemap): all 14 `/compare/*` = 2026-11-24, all 14 `/features*` = 2026-11-22, all 26 festival pages = 2026-11-22, 5 tools = 2026-11-22, 5 journey examples = 2026-11-22, 38 docs = 2026-11-11 (docs use per-article `updated`, which is fine). Blog posts use per-post dates (17 distinct), which is good. Hypothesis: a shared component edit bumps a whole group, so lastmod on those groups overstates change. The generator falls back to file mtime when git history is missing or shallow (generate-content-dates.mjs lines 29 to 51); this workspace is not a git repo, so a local build would stamp mtime. Confirm CI has full history. Not "all identical", so the Low rule is not triggered.

## 2. Internal link graph (dist/, indexable sources only, self-links excluded)

Region split: nav = `header.mkt-nav` (includes the announcement bar), footer = `footer`, body = everything else. Full per-URL counts are in 04-internal-links.csv (columns: body_inbound_unique, body_links_total, nav_inbound, footer_inbound, depth_all_links, depth_body_and_nav, depth_body_only).

- Orphans (zero inbound from anywhere): 0. Verified.
- Zero body inbound: 0. Pages with fewer than 3 unique body sources: 5. Verified.
  - /whatsapp-app-for-shopify: 1 (only /blog/best-whatsapp-apps-for-shopify), footer 166, nav 0
  - /partners: 1 body, 165 nav, 165 footer
  - /privacy: 1, /terms: 1 (legal, fine)
  - /services: 2 body, nav 0, footer 165
  - Next lowest: /blog/page/2-4 (3 each, pagination), /compare/gupshup (3), /tools (4), 26 festival pages (4 each).
- Broken internal links: 0. Links that hit a 301 in _redirects: 0. Verified (dist and live).
- Depth from home, all links: 1 page at 0, 50 at 1, 112 at 2, 7 at 3, none deeper. The 7 at depth 3 are blog posts only reachable through /blog/page/N: whatsapp-shared-inbox-shopify-order-context, what-is-ecommerce-automation-shopify-whatsapp, organic-vs-paid-ecommerce-marketing-2026, profitable-ecommerce-business-india, how-to-automate-ecommerce-store-india, organic-ecommerce-leads-short-form-video, trending-products-to-sell-online-india-2026. Verified.
- Depth with nav and footer ignored (body links only): 34 pages are 4 clicks away: 26 of 27 festival pages (hub /whatsapp-festival-templates plus children), /compare/bitespeed, zoko, getgabs, kanal, dondy, updatrr, /tools/best-whatsapp-tool-for-shopify, /services and /whatsapp-app-for-shopify. They are all within 2 clicks via the footer, so this is a body-link-weakness, not a crawl-depth fail. /privacy and /terms are unreachable from body-only links. Estimate on impact.

### Structural problems found
1. The two static landing pages are link dead ends (Verified). /whatsapp-app-for-shopify has 6 outbound links total: home (logo), /login, /privacy, /terms, an mp4 and the dash signup. /whatsapp-abandoned-cart-recovery-app has the same plus 2 blog links. Neither links to /pricing, /features, /integrations, /compare or /customers, because the static template uses a mini nav and footer. They receive footer links from 166 pages but pass nothing back.
2. /whatsapp-app-for-shopify, the page you want ranking for the head term, has 1 body link, no nav link, and is not linked from /, /features, /pricing, /integrations, /customers, /compare or /services.
3. Main nav links only Pricing, Features dropdown (journeys, cod-confirmation and so on), Customers and docs. /integrations, /compare, /shopify-whatsapp-integration, /tools/* and /services are footer only (nav 0).
4. Nav inbound is 165 or 0, so counts on /pricing (408 body links) are padded by repeated CTAs; unique body sources are 165 of 170.

### Anchor texts to money pages (body, with count; nav and footer shown separately)

| Money page | Body inbound (links / unique sources) | Body anchors | Nav / footer |
|---|---|---|---|
| /pricing | 408 / 165 | "Pricing" 181, "See pricing" 164, "TopEdge AI pricing" 25, "pricing" 18, "pricing page" 11, "the pricing page" 2, "every plan" 2, "See what each plan includes" 1, "TopEdge AI Growth" 1, raw "/pricing" 1 | nav "Pricing" 165 + "Signup 14-days trial" 165; footer "Pricing" 165 + "compare plans" 38 |
| /features/cod-confirmation | 19 / 18 | "COD confirmation" 4, "COD confirmation on WhatsApp" 3, "See COD confirmation" 2, "WhatsApp COD confirmation for Shopify" 2, "TopEdge AI's COD confirmation" 2, plus 6 singles (feature, journeys, card text) | nav "COD to Prepaid..." 165; footer "COD confirmation" 165 |
| /features/journeys | 53 / 39 | "Journeys" 25, "Journey builder" 4, "See the journey builder" 3, "Cart recovery" 3, "WhatsApp journeys" 3, "cart recovery and order lifecycle journeys" 2, others singles | nav 4 variants x165 (Journey, Abandoned Cart, Conditional routes, Return and retarget); footer "Journey" 165 |
| /whatsapp-app-for-shopify | 1 / 1 | "TopEdge AI WhatsApp app for Shopify" 1 | nav 0; footer "WhatsApp app for Shopify" 166 |
| /whatsapp-abandoned-cart-recovery-app | 5 / 5 | "WhatsApp abandoned cart recovery app" 3, "cart recovery" 1, "WhatsApp abandoned cart recovery app for Shopify" 1 | nav 0; footer "WhatsApp cart recovery app" 166 |
| /shopify-whatsapp-integration | 19 / 15 | "Shopify WhatsApp integration" 12, "Shopify integration guide" 1, "Shopify integration" 1, "How the integration works" 1, "Shopify WhatsApp integration guide" 1, "See the Shopify WhatsApp integration" 1, 2 card texts | nav 0; footer "Shopify WhatsApp integration" 165 |
| /integrations | 9 / 8 | "integrations" 6, "Integrations" 1, "Integrations overview" 1, one irrelevant "Comment, story or mention interest" 1 | nav 0; footer "Integrations" 165 |
| /compare | 19 / 18 | "All comparisons" 9, "compare" 7, "compare hub" 3 | nav 0; footer "Compare" 165 |
| /customers | 42 / 42 | "Read the customer stories" 35, "customers" 3, "Customer stories" 1, "customer stories" 1, "Customers" 1, "customer outcomes" 1 | nav "Customers" 165; footer 165 |
| /tools/whatsapp-link-generator | 9 / 6 | card text "Free Generator WhatsApp link generator with free QR codeCreate a click-to-chat link..." 4, "WhatsApp link generator" 2, "free WhatsApp link generator" 1, "free link generator" 1, "link generator" 1 | nav 0; footer "WhatsApp link generator" 165 |

Reading the table (Verified counts, Estimate on impact): /pricing anchors are 85 percent "Pricing"/"See pricing", fine for navigation but low in descriptive signal. /integrations and /compare have bare one-word anchors ("compare", "integrations") that carry little topical context. /whatsapp-app-for-shopify has the weakest profile of all ten. Card-style anchors (title plus paragraph concatenated, for example the link generator and COD confirmation cards) produce long noisy anchor strings; wrap only the title in the `<a>` or add aria-label.

Minor: announcement bar anchor "Signup 14-days trial" points to /pricing on all 165 pages; the grammar should be "14-day". It is also a site-wide sitewide link to /pricing under a signup label, a mild mismatch.

## 3. Proposed internal link matrix (all sources verified as NOT currently linking to the target in body copy)

Anchors vary in form; none repeats the exact head term more than once across a target's set.

**/whatsapp-app-for-shopify** (priority 1, currently 1 body link)
1. / (homepage hero secondary CTA or "Why TopEdge" section): "the WhatsApp app built for Shopify stores"
2. /features (hub intro): "see the full WhatsApp suite for Shopify"
3. /pricing (below plan cards): "what the app does before you pick a plan"
4. /customers (intro): "how Shopify brands run WhatsApp with TopEdge AI"
5. /blog/how-to-choose-whatsapp-app-shopify-app-store (conclusion): "our own WhatsApp app for Shopify, evaluated against that checklist"
Also: add a related-links block to the static template (see Fix 1), and a /compare, /integrations, /services link.

**/whatsapp-abandoned-cart-recovery-app** (5 body links, all blog)
1. /features/journeys (cart recovery section): "the dedicated cart recovery app page"
2. /tools/cart-recovery-calculator (results panel): "recover this revenue with the cart recovery app"
3. /whatsapp-journey-examples (abandoned cart example row): "install the cart recovery flow"
4. /blog/shopify-automation-checklist-whatsapp-cart-recovery: "an app that runs these reminders for you"
5. /pricing (cart recovery FAQ or plan footnote): "how much WhatsApp cart recovery costs per month"

**/features/journeys** (39 body sources)
1. /tools/cart-recovery-calculator: "build the reminder sequence in Journeys"
2. /whatsapp-templates (intro): "wire these templates into a journey"
3. /compare/wati (automation row): "TopEdge AI's visual journey builder"
4. /compare/interakt (same row): "branching journeys for order events"
5. /whatsapp-abandoned-cart-recovery-app (after hero, once the template is fixed): "the journey engine behind this app"

**/features/cod-confirmation** (18)
1. /tools/rto-cost-calculator (result): "cut that RTO cost with automatic COD confirmation"
2. /pricing (FAQ on message cost): "how COD confirmation is billed"
3. /compare/interakt (COD row): "COD confirmation without extra add-ons"
4. /features/profit-loss: "see COD-to-prepaid conversion in P&L"
5. /whatsapp-journey-examples hub: "the COD confirm and prepaid nudge flow"

**/shopify-whatsapp-integration** (15)
1. /features (integrations strip): "how the Shopify connection works"
2. /pricing (setup FAQ): "what syncs from your Shopify store"
3. /docs/connect-whatsapp: "the product-level view of the Shopify integration"
4. /blog/whatsapp-opt-in-shopify-india: "connect Shopify so opt-ins sync to the CRM"
5. /whatsapp-app-for-shopify (static template): "Shopify and Meta Cloud API setup explained"

**/integrations** (8)
1. /features/meta-manager: "every connection TopEdge AI supports"
2. /whatsapp-templates: "channels and tools you can connect"
3. /blog/add-whatsapp-chat-button-shopify: "other channels beyond the chat button"
4. /features/chat-rules: "integrations that feed these rules"
5. / (homepage footer strip or "works with" block): "browse all integrations"

**/compare** (18)
1. /pricing (below plan table): "see how these plans compare with other WhatsApp tools"
2. /customers (intro): "why teams switched, and from which tool"
3. /tools/best-whatsapp-tool-for-shopify (result): "side-by-side tool comparisons"
4. /blog/whatsapp-business-api-pricing-india: "price and feature comparisons by vendor"
5. /whatsapp-app-for-shopify (static, comparison anchor beside the in-page #compare): "full vendor comparison pages"

**/customers** (42)
1. /features (hub): "results from live Shopify stores"
2. /features/cod-confirmation (proof strip): "RTO results from brands using this"
3. /compare (hub intro): "customer stories from teams on TopEdge AI"
4. /integrations: "stores already connected"
5. /blog/profitable-ecommerce-business-india: "operators who put this into practice"

**/tools/whatsapp-link-generator** (6)
1. /integrations: "make a click-to-chat link and QR code"
2. /features/chat-rules: "free click-to-chat links for entry points"
3. /features/opt-in-tools: "generate the link opt-in widgets point to"
4. /shopify-whatsapp-integration: "add a chat button without code"
5. /docs/reference/opt-in-tools: "the free link and QR generator"

**/pricing** (165 body sources, saturated; only the 2 static pages and itself do not link)
Do not add more links; diversify existing anchors.
1. /whatsapp-app-for-shopify (static): "plans from Rs 1,999 with Meta rates at cost" (this page currently links to dash signup only)
2. /whatsapp-abandoned-cart-recovery-app (static): "what the app costs and what each plan includes"
3. /blog/interakt-pricing-india: re-anchor "pricing" to "TopEdge AI's flat-fee alternative"
4. /blog/wati-pricing-india: re-anchor to "a flat plan with 0 percent Meta markup"
5. /pricing/meta-rates: re-anchor generic text to "TopEdge AI plans"

## 4. robots.txt, image and video sitemap

- robots.txt (Verified, live): `Sitemap: https://topedgeai.com/sitemap.xml` present; /sitemap_index.xml, /sitemap-index.xml, /wp-sitemap.xml 404 (correct, not declared). llms.txt and llms-full.txt are referenced in comments. /login and /signup deliberately crawlable (settled). Pass.
- Image sitemap: none (0 `image:` tags). Site has 2,922 `<img>` in dist and og:image on 172 of 175 files. Image extension is optional; Google images are discovered from page HTML. Low priority; not recommended unless images need a dedicated discovery path. Verified/Estimate.
- Video sitemap: none. 17 pages embed `<video>` (home, features hub and 12 feature pages, both static landings) but dist contains 0 VideoObject, so no watch-page schema backs them. Prior GSC history in check-video-markup.mjs shows the "video isn't on a watch page" problem; demos are decorative loops, not watch pages. A video sitemap is not warranted. Verified (counts), Hypothesis (that VideoObject was removed deliberately, which matches the script's header).

## Prioritised fix list

| # | Severity | Issue | Fix | Where measured |
|---|---|---|---|---|
| 1 | High | Static landing pages link nowhere useful and /whatsapp-app-for-shopify has 1 body inbound | Add a 6 to 8 link "Related" block and a real header/footer to generate-landing-pages.mjs output (pricing, features, journeys, integrations, compare, customers, cart recovery page); add body links from the 5 sources in matrix | dist/whatsapp-app-for-shopify/index.html; csv |
| 2 | Medium | Nav omits /integrations, /compare, /shopify-whatsapp-integration, /tools, /services | Add to the Features/Resources dropdown, or add a homepage "explore" section | csv nav_inbound 0 |
| 3 | Medium | /integrations (8), /tools/whatsapp-link-generator (6), /services (2) thin body links | Apply matrix; minimum target 10 body sources each | csv |
| 4 | Medium | Anchor text bare or noisy: "compare", "integrations", concatenated card text; /pricing 85 percent "Pricing/See pricing" | Descriptive anchors per matrix; wrap card title only in `<a>` | anchor table |
| 5 | Low | lastmod group-stamped (compare 14, features 14, festival 26, tools 5) | Use per-page dates where available; confirm CI git history is not shallow | sitemap.xml |
| 6 | Low | 34 pages 4 clicks away via body links only (festival, 6 compare pages) | Link festival pages from the hub and from /whatsapp-templates; link the 6 compare pages from /compare/alternatives and relevant blog posts | csv depth_body_only |
| 7 | Info | dist/ differs from the live deploy (asset hash) | Rebuild or confirm which build is live before relying on dist for pre-deploy checks | byte compare |
| 8 | Info | priority/changefreq on all entries; no image or video sitemap | Optional removal; no image or video sitemap needed | sitemap.xml |

Passed with no action: XML validity, 170/170 HTTP 200, no redirects, no noindex, canonical equals loc, sitemap equals dist routes, 43/43 blog slugs, 0 orphans, 0 broken or redirected internal links, robots Sitemap line.

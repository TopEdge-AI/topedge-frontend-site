# 03 - Structured data audit, topedgeai.com (24 Nov 2026)

Scope: 175 HTML files in dist/ (build stamped 24 Nov 12:43), parsed with a custom Python extractor over every `application/ld+json` block. Live check of 6 URLs (/, /pricing, /features/journeys, /blog/aisensy-pricing-india, /compare/wati, /whatsapp-app-for-shopify): the @type set per page is identical to dist/, so dist/ is representative (Verified). No JSON-LD parse errors on any page (Verified). Not run: Google Rich Results Test (no API), so Google-eligibility statements are from Google's docs, labelled accordingly. Read-only; nothing in the repo was changed.

Labels: Verified = read from dist/ or source. Estimate = derived number. Hypothesis = needs a test.

## 1. Inventory per template (Verified)

| Template | n | @types emitted (besides the Organization node every page carries) |
|---|---|---|
| Home / | 1 | Organization, SoftwareApplication (7 INR offers), WebSite+SearchAction. No WebPage, no VideoObject |
| Pricing | 1 | FAQPage, SoftwareApplication (7 offers), WebPage (dateModified), BreadcrumbList |
| /pricing/meta-rates | 1 | Article, WebPage, BreadcrumbList |
| Features hub | 1 | WebPage, BreadcrumbList (no ItemList) |
| Feature detail | 13 | WebPage, BreadcrumbList, FAQPage, SoftwareApplication (@id #software, no offers) |
| /shopify-whatsapp-integration | 1 | WebPage, BreadcrumbList, FAQPage, SoftwareApplication |
| Customers | 1 | WebPage, BreadcrumbList (no Review, correctly) |
| About | 1 | AboutPage, BreadcrumbList |
| Services | 1 | WebPage, BreadcrumbList, FAQPage, ItemList |
| Contact | 1 | WebPage, BreadcrumbList |
| Compare hub | 1 | WebPage, BreadcrumbList (no ItemList) |
| Compare two-way | 12 | WebPage, BreadcrumbList, Article (Person author), FAQPage |
| Compare alternatives | 1 | WebPage, BreadcrumbList, ItemList (10) |
| Blog index + /page/2-4 + 6 categories | 10 | WebPage, BreadcrumbList, [Blog, CollectionPage] with blogPost[] |
| Blog post | 43 | BlogPosting (Person author), BreadcrumbList, FAQPage, ItemList on 14 |
| Docs | 38 | TechArticle (author = Organization), BreadcrumbList, FAQPage, HowTo on 16, CollectionPage on /docs |
| Integrations, Partners | 2 | WebPage, BreadcrumbList, FAQPage (no ItemList) |
| Tools hub / 4 tools | 5 | hub: WebPage, BreadcrumbList, ItemList(5); tools: + SoftwareApplication, FAQPage |
| Festival hub / 25 festivals | 26 | WebPage, BreadcrumbList, ItemList, SoftwareApplication, FAQPage, HowTo on all 25 festivals |
| Journey examples | 5 | WebPage, BreadcrumbList, FAQPage, SoftwareApplication, ItemList on hub |
| /whatsapp-templates | 1 | same set as journey examples |
| Static LPs (/whatsapp-app-for-shopify, /whatsapp-abandoned-cart-recovery-app) | 2 | one block: Organization, SoftwareApplication, WebPage, BreadcrumbList, FAQPage |
| privacy, terms | 2 | Organization (thin), WebPage, BreadcrumbList |
| noindex shells (404, login, signup, dev, partners/terms) | 5 | none (intended) |

What is healthy (Verified): one Organization @id (https://topedgeai.com/#organization) on all 170 indexable pages, referenced by @id from WebPage.about/publisher, articles, SoftwareApplication; one WebSite @id; all URLs absolute; @context https; ISO 8601 dates; blog hero images 1200x675 (43) and 1600x900 (1), all exist; 43/43 BlogPosting and 13/13 compare Article carry a Person author with @id and worksFor; INR currency everywhere; no Product, no AggregateRating, no fabricated Review; sameAs uses real profiles. Live and dist match.

## 2. Findings, ranked

### S1. Blog posts point isPartOf at an @id no node defines (Medium, Verified)
All 43 BlogPosting nodes set `isPartOf: {"@type":"Blog","@id":"https://topedgeai.com/blog"}`. The only Blog node is `https://topedgeai.com/blog#blog` (index) and `/blog/page/N#blog`, `/blog/category/x#blog` on the others. The graph edge dangles and the inline node restates a type with a different @id.
Fix: src/marketing/pages (blog post schema builder, search `isPartOf` with `'Blog'`) so the @id is `${SITE_URL}/blog#blog` and drop the inline `@type/name/url`:
```json
"isPartOf": {"@id": "https://topedgeai.com/blog#blog"}
```

### S2. About page duplicates Organization and both founders as anonymous nodes (Medium, Verified)
dist/about.html AboutPage.mainEntity is a full inline Organization with no @id, with founders as Person without @id and jobTitle "Co-founder · Product / Growth". The global node already has these people at `/about#moksh-patel` and `/about#smit-tilva` with jobTitle "Co-founder". Result: two Organization and two Person entities per founder on one URL, conflicting jobTitles, and a street address with a trailing comma ("Prahladnagar Trade Center Ahmedabad,"), differing from the canonical PostalAddress. Also AboutPage and its isPartOf WebSite carry no @id.
Fix: About page JSON-LD (src/marketing/pages, AboutPage component) to reference by @id:
```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://topedgeai.com/about#webpage",
  "name": "About TopEdge AI",
  "url": "https://topedgeai.com/about",
  "inLanguage": "en-IN",
  "isPartOf": {"@id": "https://topedgeai.com/#website"},
  "mainEntity": {"@id": "https://topedgeai.com/#organization"},
  "about": {"@id": "https://topedgeai.com/#organization"}
}
```
Optional (Hypothesis, low): a ProfilePage per founder. Google documents ProfilePage for author pages, but both founders share one URL (/about), so it only makes sense with dedicated /about/moksh-patel pages.

### S3. HowTo still emitted on 41 pages (Low, Verified; policy item)
16 docs pages (src/marketing/docs/schema.ts:93) and all 25 festival pages (src/marketing/pages/FestivalTemplatePage.tsx:156). Google removed HowTo rich results in Sept 2023. It does no harm and passes schema.org validation, but it is dead weight, adds roughly 1-2 KB per page, and the festival version is not a how-to (its "steps" are send windows, duplicating the ItemList beside it). Recommend deleting the `howTo()` call and the festival block. No replacement needed; docs keep TechArticle, festivals keep ItemList.

### S4. VideoObject: none on any page in dist/, including the home film (Medium, Verified for absence; Hypothesis for benefit)
videoObjectJsonLd exists (pageSeo.ts:~560) but zero pages emit it; ProductFeaturePage skips it by design because feature heroes now play launch films, and FeatureDetailPage uses it only where a demo asset is the hero. The home hero film (`/marketing/demos/topedge-launch-v2.mp4`, 1920x1080, 75.0 s measured with ffprobe, poster topedge-launch-poster-v2.webp 1280x720) is the film the brief says home owns, and carries no markup. Two blockers to resolve first, both visible in source: (a) the prerendered `<video class="home-hero__film-el">` has no src (HomeHeroVideo.tsx sets src after window load), which is exactly the "sourceless player" failure scripts/check-video-markup.mjs documents from the earlier GSC rejection; (b) the loop is muted autoplay, which Google may treat as decorative. Add markup only if the prerender ships a real `<source>` and the film is a user-facing watch element (expand and sound buttons suggest it is).
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": "https://topedgeai.com/#launch-film",
  "name": "TopEdge AI launch film: Shopify visitors to WhatsApp contacts, COD confirmed before dispatch",
  "description": "Product film showing how TopEdge AI turns Shopify visitors into WhatsApp contacts and confirms COD orders before dispatch.",
  "uploadDate": "2026-11-12T00:00:00+05:30",
  "duration": "PT1M15S",
  "thumbnailUrl": ["https://topedgeai.com/marketing/demos/topedge-launch-poster-v2.webp"],
  "contentUrl": "https://topedgeai.com/marketing/demos/topedge-launch-v2.mp4",
  "inLanguage": "en-IN",
  "publisher": {"@id": "https://topedgeai.com/#organization"},
  "isFamilyFriendly": true
}
```
uploadDate taken from file mtime (12 Nov 2026), confirm with the real encode date. Add via `videoObjectJsonLd()` in src/pages/Home.tsx; check-video-markup.mjs will then police it. Landing pages stay clear, per your rule.

### S5. Static landing pages carry a second, thinner SoftwareApplication and Organization (Medium, Verified)
/whatsapp-app-for-shopify and /whatsapp-abandoned-cart-recovery-app (static HTML, one block each): SoftwareApplication has no @id (every other page uses https://topedgeai.com/#software), `operatingSystem: "Web, Shopify"` (site uses "Web"), offers are bare numbers (`price: 1999`) with no billing period, no priceValidUntil, no tax flag. The Organization node reuses the right @id but is a 5-property stub (no sameAs, address, taxID), so a crawler merging by @id sees two contradictory descriptions. The WebPage has `@id` without `isPartOf`/`about`/`publisher`.
Fix: wherever the static LP block is generated (grep the two LP sources in public/ or the prerender script) either reference the entities by @id only, or emit the full nodes. Minimal safe version:
```json
{"@type":"SoftwareApplication","@id":"https://topedgeai.com/#software","name":"TopEdge AI","applicationCategory":"BusinessApplication","operatingSystem":"Web","url":"https://topedgeai.com","publisher":{"@id":"https://topedgeai.com/#organization"}}
```
and replace the Organization stub with `{"@id":"https://topedgeai.com/#organization"}` plus the `isPartOf`/`about`/`publisher` links on WebPage. Offers live on / and /pricing and need not repeat.

### S6. Pricing Offers: correct currency, but ex-GST is not machine-stated (Low-Medium, Verified)
7 Offers on home and pricing (Launch 1999/mo, 19188/yr; Growth 3999/38388; Scale 6499/62388; trial 0), all INR, UnitPriceSpecification with P1M/P1Y, matching visible pricing and the FAQ ("plus GST"). Gaps: the Organization.makesOffer PriceSpecification declares `valueAddedTaxIncluded:false` but none of the per-plan UnitPriceSpecification nodes do; so the ex-GST fact is only in prose. Also `validFrom` and `priceValidUntil` are stamped as the build date and build date + 1 year (2026-11-24 to 2027-11-24), so they move every deploy: Estimate low risk, but validFrom of "today" misstates when the price began. Yearly offers use unitCode ANN with price 12 x monthly-equivalent: matches the "billed yearly" label. Fix in src/marketing/lib/billingCatalog.ts (catalogDefaultCycleOffersJsonLd): add `"valueAddedTaxIncluded": false` inside each priceSpecification, and pin validFrom to the real plan-effective date.

### S7. BreadcrumbList describes breadcrumbs the page does not show (Medium, Verified by regex; confirm by eye)
BreadcrumbList is emitted on 165 pages. A visible breadcrumb nav (aria-label or class containing "crumb") exists only on docs (38/38), blog (43/53, absent on the 10 index/category pages), and one pricing page. Absent on all 14 compare, 14 features, 26 festival, 5 journey-example, 5 tools, about, contact, customers, services, integrations, partners, LPs. Google's breadcrumb guidance asks markup to match the page's real hierarchy; markup with no on-page counterpart is the pattern a manual reviewer reads as "markup for content users cannot see". Fix, pick one: add a small visible breadcrumb component to those templates (best, also helps internal linking), or drop the node on them. Two secondary mismatches: (a) blog post trail ends at the category ("Home > Blog > Comparisons") and omits the post itself, which Google's examples include as the last item (the visible trail matches the schema, so this is consistent, just incomplete); (b) Home item is `https://topedgeai.com` in most templates but `https://topedgeai.com/` on docs and the LPs; canonical home is with trailing slash, normalise to `/`.

### S8. Hub pages missing ItemList (Low-Medium, Verified)
Features hub (14 features) and compare hub (10 competitors) have WebPage + BreadcrumbList only; /compare/alternatives, services, tools, festival hub, journey hub and docs already have ItemList. Integrations and partners are not catalogues; skip. Google has no ItemList rich result outside carousels, so the value is entity clarity for AI engines (Hypothesis). Paste for the compare hub (src/marketing/pages compare hub component):
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "TopEdge AI compared with WhatsApp tools for Shopify in India",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"TopEdge AI vs WATI","url":"https://topedgeai.com/compare/wati"},
    {"@type":"ListItem","position":2,"name":"TopEdge AI vs AiSensy","url":"https://topedgeai.com/compare/aisensy"},
    {"@type":"ListItem","position":3,"name":"TopEdge AI vs Interakt","url":"https://topedgeai.com/compare/interakt"},
    {"@type":"ListItem","position":4,"name":"TopEdge AI vs Bitespeed","url":"https://topedgeai.com/compare/bitespeed"},
    {"@type":"ListItem","position":5,"name":"TopEdge AI vs Zoko","url":"https://topedgeai.com/compare/zoko"},
    {"@type":"ListItem","position":6,"name":"TopEdge AI vs Gupshup","url":"https://topedgeai.com/compare/gupshup"},
    {"@type":"ListItem","position":7,"name":"TopEdge AI vs Getgabs","url":"https://topedgeai.com/compare/getgabs"},
    {"@type":"ListItem","position":8,"name":"TopEdge AI vs Kanal","url":"https://topedgeai.com/compare/kanal"},
    {"@type":"ListItem","position":9,"name":"TopEdge AI vs Dondy","url":"https://topedgeai.com/compare/dondy"},
    {"@type":"ListItem","position":10,"name":"TopEdge AI vs Updatrr","url":"https://topedgeai.com/compare/updatrr"}
  ]
}
```
Features hub: same shape over the 13 feature slugs in dist/features/ (ai-brain, analytics, audience-crm, campaigns, chat-rules, cod-confirmation, flow-builder, intent-detection, journeys, meta-manager, opt-in-tools, profit-loss, warranty), names from productPages.ts. Prefer reading them from the same array that renders the hub so they cannot drift.

### S9. Feature detail pages re-declare @id #software with different content and no offers (Low-Medium, Verified)
13 feature pages emit SoftwareApplication `@id: .../#software` with a per-feature `description`, `applicationSubCategory`, `featureList:[one item]`, `operatingSystem: "Web, Shopify, Meta WhatsApp Cloud API"`, while home, pricing and 39 other pages emit the same @id with `operatingSystem: "Web"` and 7 offers. One @id, three conflicting descriptions across the site. `subjectOf` is a bare WebPage pointing at /pricing, which is not what subjectOf means. Fix (pageSeo.ts featureSoftwareJsonLd): emit `{"@id": SOFTWARE_ID}` reference only, and describe the feature on the WebPage via `about`/`mainEntity` instead; or give each feature a distinct @id `#software-<slug>` with `isPartOf {"@id":"https://topedgeai.com/#software"}` (the second option keeps the feature description). Standardise operatingSystem to one string. applicationCategory "BusinessApplication" is valid and not an error (Google's list also allows it); operatingSystem is present everywhere.

### S10. Compare Article uses the 1024x1024 round logo as the article image, and datePublished equals dateModified (Low, Verified)
13 Article nodes (12 compare + meta-rates) use `og-image.png` (purple circle logo, 1024x1024). Google's Article guidance wants a representative image of the content, ideally multiple ratios at 50k+ pixels; a logo is allowed but wasteful. The pageSeo.ts comment explains datePublished = dateModified is deliberate (continuously maintained boards). That is honest, but 12 pages show datePublished 24 Nov 2026, i.e. today, so Google reads them as brand-new each refresh. Estimate: harmless. Fix: pass `image: ${SITE_URL}/og-share.jpg` (1280x720, exists) in the compare articleJsonLd call; consider a stable first-published date once known.

### S11. Organization sameAs and founder Person coverage (Low-Medium, Verified)
sameAs has 5: LinkedIn company, Instagram, YouTube, Shopify App Store listing, Trustpilot. Missing a profile that the repo already treats as real: Product Hunt (`https://www.producthunt.com/products/topedge-ai`, in socialProof.json, 8 reviews, 5.0). No X/Facebook/Crunchbase/G2 URLs exist in the repo, so none are recommended; do not invent them. Founder Person nodes have `sameAs: []` (pageSeo.ts TEAM), so authors have no LinkedIn or other identity link: the weakest E-E-A-T link in the graph. Add the founders' real profile URLs when you confirm them (not guessed here).
```json
"sameAs": [
  "https://www.linkedin.com/company/topedgeai",
  "https://www.instagram.com/topedgeai_com/",
  "https://www.youtube.com/@topedge_ai",
  "https://apps.shopify.com/topedge-ai",
  "https://www.trustpilot.com/review/topedgeai.com",
  "https://www.producthunt.com/products/topedge-ai"
]
```
Fix: organizationJsonLd() in src/marketing/data/pageSeo.ts, using PRODUCT_HUNT.productUrl from socialProof.ts. Note: Trustpilot shows 5 reviews at 4.0 (retrieved 6 Oct 2026, now 7 weeks old); the node correctly carries no rating.

### S12. Reviews and ratings: nothing to add (Info, Verified)
/customers quotes Trustpilot and Product Hunt text and named stores (Delitech, Apex Light) with zero Review nodes. Correct: Google's review snippet policy excludes self-serving reviews about the site's own Organization/LocalBusiness, and third-party review excerpts on a vendor's own page are not eligible for stars either. Do not add Review or AggregateRating. Consistent with the settled no-rating rule.

### S13. Minor, verified
- WebPage nodes have no @id on 160+ pages (only the 2 LPs and the Blog/Article nodes do). Blog and compare articles reference `mainEntityOfPage {"@type":"WebPage","@id": url}` with no matching WebPage node on blog posts at all (blog posts have no WebPage node). Low: add `@id: <url>#webpage` in webPageJsonLd() and have Article.mainEntityOfPage point to it.
- Home has no WebPage node. Add `{"@type":"WebPage","@id":"https://topedgeai.com/#webpage","url":"https://topedgeai.com/","name":"...","isPartOf":{"@id":"https://topedgeai.com/#website"},"about":{"@id":"https://topedgeai.com/#organization"},"inLanguage":"en-IN"}`.
- privacy.html and terms.html carry a third Organization variant (4 properties, logo as plain string). Same @id, thinner body. Unify via organizationJsonLd().
- Docs TechArticle: datePublished = dateModified = 2026-11-11 for all 38 (13 days old, ok). Author is the Organization, fine for docs.
- dateModified freshness (Verified): pricing 23 Nov, compare boards 24 Nov, feature pages 22 Nov, newest blog edits 24 Nov, oldest blog dateModified 1 Nov. Nothing older than 24 days. No future dates. Matches the "read on" dates quoted in the FAQs I sampled.
- FAQPage on 120+ pages: Info only, per your rule. No action.
- Blog ItemList on 14 posts is a table-of-listings (e.g. 2 items on aisensy-alternative): valid.
- Organization.makesOffer uses PriceSpecification minPrice/maxPrice, valid; includes the ex-GST flag.
- Visible-vs-schema: pricing FAQ text matches visible copy; no schema node describes content absent from a page that I could find, apart from S7.

## 3. What was NOT checked
Google Rich Results Test / Search Console enhancement reports (no credentials used); visible breadcrumb detection is regex-based, so a breadcrumb rendered without "crumb" in its class or aria-label would be a false negative; per-page full-text comparison of FAQ answers vs visible text was sampled (pricing, one blog, one docs), not run on all 120 FAQ pages; schema_generate.py and parse_html.py from claude-seo were not run because the custom extractor covered all pages directly. Sandbox note: no browser rendering was used.

## 4. Priority list (issue -> severity -> file)
1. Landing-page SoftwareApplication/Organization stubs contradict site entities -> Medium -> static LP sources / prerender script
2. About page duplicate Organization and Person nodes -> Medium -> About page component
3. BreadcrumbList without visible breadcrumbs on ~120 pages -> Medium -> templates for compare, features, festival, tools, journeys
4. Blog isPartOf dangling @id (43 posts) -> Medium -> blog post schema builder
5. Home VideoObject absent, hero video sourceless in prerender -> Medium -> src/pages/Home.tsx, HomeHeroVideo.tsx
6. Feature pages conflicting #software node -> Low-Medium -> pageSeo.ts featureSoftwareJsonLd
7. Offers lack valueAddedTaxIncluded; validFrom = build date -> Low-Medium -> src/marketing/lib/billingCatalog.ts
8. sameAs missing Product Hunt; founders have no sameAs -> Low-Medium -> pageSeo.ts
9. HowTo on 41 pages -> Low -> docs/schema.ts, FestivalTemplatePage.tsx
10. ItemList on compare and features hubs -> Low -> hub page components
11. Compare Article image is a logo; no home WebPage; WebPage @id -> Low -> pageSeo.ts

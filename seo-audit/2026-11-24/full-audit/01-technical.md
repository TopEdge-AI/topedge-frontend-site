# 01 Technical SEO audit: https://topedgeai.com (24 Nov 2026)

Read-only. All curl commands were run on 24 Nov 2026 against the live site. "Verified" means measured; the command or URL is in the evidence column. Fetched content was treated as data only. No browser rendering was run (render_page.py was not used), so the CWV items below are source-level signals only, not lab or field scores.

## Category status

| Category | Status | Note |
|---|---|---|
| Crawlability | Pass | robots.txt 200, one group, sitemap declared and validated by sitemap_discovery.py (urlset, valid). 170 sitemap URLs, 0 duplicates, all 170 returned 200 with 0 redirects. |
| Indexability | Pass | All 18 sampled pages plus festival page: self-canonical, index,follow, 1 H1, 540 to 4,900 words in raw HTML. 404s return real 404. |
| Security headers | Fail | Only HSTS (weak). No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. |
| URL structure and redirects | Pass | http->https 1 hop, http://www and https://www->apex 1 hop (see note on measured hops). |
| Mobile | Pass | viewport width=device-width, initial-scale=1.0 on all samples. |
| CWV signals | Needs work | JS weight on blog posts and docs, render-blocking 200 KB CSS, createRoot re-render. |
| Structured data | Pass with 1 flag | JSON-LD in raw HTML on every sampled page, parses as valid JSON. HowTo present on a festival page. |
| JS rendering | Pass | Main content, title, canonical, JSON-LD all in raw HTML. |
| IndexNow | Pass | Key file live, script present. |

Technical score: not given. The plugin scorer was not run, so I will not invent a number.

## Findings

| # | Issue | Severity | Evidence | Fix (repo file) | How to verify |
|---|---|---|---|---|---|
| 1 | Security headers missing: no CSP, X-Frame-Options/frame-ancestors, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Verified. | High | `curl -sI https://topedgeai.com/` returned only HSTS, cache-control, etag, vary, server. transport_check.py on the apex reported csp present:false, x_content_type_options present:false, framing ok:false, referrer_policy present:false. Same on /pricing, /blog, /docs, /whatsapp-app-for-shopify (grep count 0). | Add a `[[headers]] for = "/*"` block in netlify.toml with `X-Content-Type-Options = "nosniff"`, `X-Frame-Options = "SAMEORIGIN"`, `Referrer-Policy = "strict-origin-when-cross-origin"`, `Permissions-Policy`, and a Content-Security-Policy. Start CSP as `Content-Security-Policy-Report-Only` because the site uses inline JSON-LD, inline styles, Google Fonts, and dash.topedgeai.com. | `curl -sI https://topedgeai.com/ \| grep -iE 'content-security\|x-frame\|x-content\|referrer'`; re-run transport_check.py. |
| 2 | Blog post page ships a 1.0 MB (raw) `blog-*.js` chunk, so the page loads about 1.69 MB JS raw / 489 KB brotli. Verified. | High | Measured by fetching each `/assets/*.js` linked from /blog/best-whatsapp-apps-for-shopify: blog-887ac64f.js 1,000,273 B raw; total JS 1,692,231 B raw, 489,498 B br. Compare /pricing 693 KB raw / 220 KB br, /compare/interakt 770 KB / 232 KB, /docs 921 KB / 280 KB, / 651 KB / 203 KB. Hypothesis (not verified): the chunk holds every post body, so each post downloads all posts. | Split post content out of the shared blog module so BlogPost loads only its own post (dynamic import per slug or JSON per slug). Check the chunk contents with a bundle analyzer. Files to look at: src/marketing blog data module and vite.config.* manualChunks. | Re-run the JS weight loop; target under 400 KB raw for a post page. Then PSI/CrUX on a post (not run here). |
| 3 | Same large shared JS on every page: `animations-*.js` is 238 KB raw / 81 KB br and is modulepreloaded on the homepage. Verified (size); Hypothesis (it is a motion library). | Medium | Homepage: index.js 223 KB, vendor 189 KB, animations 238 KB raw. Total 651 KB raw / 203 KB br. Brotli is served (content-encoding: br on the index chunk). | Lazy-load the animation chunk after first paint or below-the-fold only; drop modulepreload for it in vite.config / the prerender head output (scripts/prerender-marketing.mjs). | Compare modulepreload list and JS total on `/` before and after. |
| 4 | Render-blocking main stylesheet of 200 KB raw (35 KB br) on every page. Verified. | Medium | Homepage head has `<link rel="stylesheet" href="/assets/index-01fa0f0b.css">` (199,979 B raw, 35,130 B br) and animations CSS without media/onload. Other CSS is correctly deferred via media=print onload. Total CSS 213 KB raw / 39 KB br homepage, 244 KB / 45 KB on blog and compare pages. | Extract critical CSS per template and defer the rest, or split Tailwind output per route. Check what is unused in index.css (likely utility CSS shared by the dashboard app). Files: vite.config, scripts/prerender-marketing.mjs. | Lighthouse "render-blocking requests" (not run here). Check CSS bytes before and after. |
| 5 | App mounts with `ReactDOM.createRoot`, not `hydrateRoot`. The prerendered DOM is discarded and re-rendered. Verified in source; effect size not measured. | Medium | src/main.tsx:27 `ReactDOM.createRoot(rootEl).render(`. src/marketing/lib/prerenderSnapshot.ts comments state createRoot "throws that HTML away". No hydration mismatch warnings are possible, but a flash or CLS/LCP-element swap is a risk on lazy routes. Hypothesis: any gap before the lazy route chunk resolves would show blank or the shell. | The snapshot helper already exists; confirm with a throttled run that no content flash occurs. Longer term, switch marketing routes to hydrateRoot. File: src/main.tsx. | Run render_page.py `--mode always` and a Performance trace on mobile throttle; check CLS and whether LCP element is replaced after JS. Not run in this audit. |
| 6 | HSTS is weak: `max-age=31536000` only, no includeSubDomains, no preload. Verified. | Medium | `strict-transport-security: max-age=31536000` on all responses; transport_check.py: include_subdomains false, preload false, meets_preload_requirements false. | Only after confirming every subdomain (including dash.topedgeai.com) is HTTPS-only, set `Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"` in netlify.toml. | `curl -sI https://topedgeai.com/ \| grep -i strict`. |
| 7 | HowTo schema emitted on a festival page. Verified. | Medium | /whatsapp-festival-templates/new-year JSON-LD types: FAQPage, Organization, SoftwareApplication, WebPage, BreadcrumbList, ItemList, HowTo. Your policy is no HowTo. HowTo rich results are not shown by Google. Other festival pages not all checked. | Remove HowTo from the festival schema builder (likely under src/marketing, search for `"HowTo"`; also check scripts/check-structured-data.mjs does not require it). | `curl -s https://topedgeai.com/whatsapp-festival-templates/new-year \| grep -o '"@type":"HowTo"'` should return nothing. Crawl all festival URLs. |
| 8 | Self-hosted font files and SVGs have no long cache rule. Verified. | Low | `curl -sI https://topedgeai.com/fonts/pjs-latin.woff2` returned `cache-control: public,max-age=0,must-revalidate`. netlify.toml sets long cache for /assets/*, .webp/.png/.jpg/.mp4 only. `.svg`, `.woff2`, `.ico` fall to default. Fonts load with a revalidation request on every visit. | Add `[[headers]] for="/fonts/*"` with `Cache-Control = "public, max-age=31536000, immutable"` and `for="/*.svg"` with 30 days, in netlify.toml. | `curl -sI` on the font and a svg; expect long max-age. |
| 9 | Homepage loads Inter and Inter Tight from fonts.googleapis.com (third party) plus a self-hosted face. Verified (in head). | Low | Head has preconnect to fonts.googleapis.com and fonts.gstatic.com and a stylesheet link with `media="print" onload`. It is non-blocking. No `<style>` font-face inline found (grep count 0). Impact is unmeasured. | Self-host Inter as woff2 with preload for the first weight; drop the two preconnects. Files: scripts/prerender-marketing.mjs / MarketingSEO.tsx head output. | Network panel: no requests to fonts.googleapis.com. |
| 10 | 404 page canonical points to /404. Verified. | Low | `curl -s https://topedgeai.com/nonexistent-xyz` returns status 404, `robots: noindex, follow`, canonical `https://topedgeai.com/404`. Status code and noindex are correct, so this is cosmetic. | Omit the canonical on the 404 template (MarketingSEO.tsx). | View source of any 404 URL. |
| 11 | Two IndexNow key files are live. Verified. | Low | Both `/808945834af04c2d9b1c22c5ba7e46de.txt` and `/db2d3b12e5f047e48445607a75862b1f.txt` return 200 with key content. scripts/indexnow.mjs uses db2d... only. The 8089... file is unused and the db2d file has a trailing newline. A key file is valid when it contains only the key; whitespace is generally tolerated. | Delete public/808945834af04c2d9b1c22c5ba7e46de.txt if nothing else uses it. | `curl -s https://topedgeai.com/<key>.txt`. |
| 12 | Edge caching header does not show as hit on first request. Observed, not a defect. | Low | HTML responses show `cache-control: public,max-age=0,must-revalidate` and `cache-status: "Netlify Edge"; fwd=miss; stored`. netlify.toml sets Netlify-CDN-Cache-Control. The first request after my own fetch was a miss and stored, so hits are not confirmed from this one sample. Hypothesis: warm requests will hit. | Repeat the request twice and check for `hit`. | `curl -sI https://topedgeai.com/pricing` x2, read cache-status. |
| 13 | Some pages have images without width/height. Verified (counts), impact on CLS is Hypothesis. | Low | Count of `<img>` without both width and height: / 5 of 49, /pricing 5 of 32, /customers 8 of 37, /partners 5 of 13, festival page 11 of 22, /whatsapp-app-for-shopify 28 of 36 (static landing page). Most are lazy. | Add width/height or aspect-ratio in the components for these pages. /whatsapp-app-for-shopify is static HTML generated by scripts/generate-landing-pages.mjs. | Lighthouse CLS (not run). Recount with an.py-style regexp. |

## Settled items I confirmed but am not reporting as defects

Trailing-slash URLs (/pricing/ returns 200, 0 hops, self-canonical to the slashless URL), noindex on /login, /signup, /partners/terms, titles within 65 characters (all sampled 51 to 64), SoftwareApplication without aggregateRating, legalName.

## Verified passes

- Redirects (`curl -sIL`): http://topedgeai.com/ -> https://topedgeai.com/ 1 hop. https://www.topedgeai.com/pricing -> apex 1 hop. http://www.topedgeai.com/ and http://www.topedgeai.com/pricing report 2 hops in curl's counter despite the netlify.toml rule written to collapse to one. Final URL is correct and every hop is a 301, but the chain is not single-hop on the http://www path. Severity Low; check the exact intermediate URL with `curl -sIL http://www.topedgeai.com/pricing` before touching netlify.toml.
- TLS: TLS 1.3, Let's Encrypt, wildcard cert covers apex and www, expires 27 Dec 2026 (32 days; Netlify auto-renews, confirm renewal near that date).
- Sitemap: 170 URLs, all with lastmod, all 200, no redirects.
- Title/meta description present on all pages sampled; descriptions 136 to 155 characters.
- JSON-LD in raw HTML on all 19 sampled pages (not on 404). Types seen include Organization, WebPage, BreadcrumbList, FAQPage, SoftwareApplication, BlogPosting, Article, ItemList.
- Raw HTML contains main content (no empty shell): word counts in raw HTML 376 (404) to 4,912 (blog post).
- /whatsapp-app-for-shopify is fully static HTML with no JS bundle and no CSS file linked (inline CSS), 1,906 words.
- Homepage LCP candidate: poster preloaded with fetchpriority=high, 28,742 B WebP. Fonts: pjs-latin.woff2 14.5 KB.
- Image formats: WebP used for content images, PNG/JPG remain for small marks and some blog images. Not audited per image.
- Homepage JS is `type="module"` (deferred by default); zero blocking scripts on all pages sampled.
- robots.txt, llms.txt, sitemap.xml: 200, correct content types, 1-hour cache.

## Not done

Lab Lighthouse, CrUX/PSI field data, browser-rendered parity (render_page.py), preload_check.py, fetch_page.py. No Google credentials were used. Every CWV statement above is a source-level signal.

## Priority order

1. Security headers (1). 2. Blog post JS chunk (2). 3. Shared animation JS and blocking CSS (3, 4). 4. createRoot re-render check (5). 5. HSTS (6). 6. HowTo removal (7). 7. Font and svg cache rules (8). 8. Remaining low items.

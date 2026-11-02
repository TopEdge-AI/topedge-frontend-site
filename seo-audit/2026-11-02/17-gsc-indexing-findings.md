# GSC indexing review, 2026-11-02

Every page Search Console has data for, checked against what the site
actually serves. Property `sc-domain:topedgeai.com`, 122 page rows over
30 Jul to 30 Oct 2026, plus URL Inspection API calls on the doubtful ones.

The headline: **almost everything is already handled correctly in code.**
Two real defects, one of them fixed here and one deliberately left for a
decision. The rest of this file is the evidence, so nobody has to re-derive
it next month.

---

## 1. Fixed: a retired post that 404s while its four siblings 301

`/blog/ai-business-automation-trends-2025` is indexed, carries impressions,
and returns 404. The four other retired 2024/2025 AI posts all have 301s,
added 2026-08-14; this one was missed.

Now mapped to `/blog/how-to-automate-ecommerce-store-india`, the same target
as the sibling automation post it duplicated.

Checked the whole retired set while I was there, and the others are fine:

| URL | Serves |
|---|---|
| `/blog/ai-automation-revolutionizing-business-operations-2025` | 301 to how-to-automate-ecommerce-store-india |
| `/blog/ai-chatbot-for-shopify` | 301 to ai-whatsapp-chatbot-for-shopify-india |
| `/blog/ai-voice-agents-vs-human-receptionists-medical-roi-2025` | 301 to /features/ai-brain |
| `/blog/evolution-of-ai-business-communication` | 301 to ai-whatsapp-chatbot-for-shopify-india |
| `/blog/topedge-ai-voice-agents-vs-human-agents-2024` | 301 to ai-whatsapp-chatbot-for-shopify-india |
| `/blog/cod-confirmation-whatsapp-reduce-rto-shopify` | 301 to how-to-reduce-rto-with-whatsapp-cod-confirmation |
| `/privacy-policy`, `/booking`, `/roi`, `/security`, `/solutions/beauty` | all 301 to live pages |

---

## 2. Open decision: trailing-slash duplicates

**This is the one real indexing defect left, and the fix is the change that
took the site down on 2026-10-08.**

Google indexes both forms of a good share of the site, and in at least one
case it has picked the slash form over our stated canonical. URL Inspection
on `/blog/whatsapp-abandoned-cart-recovery-shopify/`:

```
coverageState:   Submitted and indexed
googleCanonical: https://topedgeai.com/blog/whatsapp-abandoned-cart-recovery-shopify/
```

The trailing-slash URL. Our canonical tag and our sitemap both name the
slashless one. The canonical tag is losing.

Pairs currently splitting impressions, from the Search Console page report:

| Page | slashless | with slash |
|---|---|---|
| `/blog/best-whatsapp-automation-tools-shopify-india` | 13 impr, pos 15.7 | 40 impr, **pos 3.5** |
| `/blog/whatsapp-abandoned-cart-recovery-shopify` | 155 impr, pos 21.2 | 24 impr, pos 11.1 |
| `/blog/ai-whatsapp-chatbot-for-shopify-india` | 1 impr, pos 51 | 11 impr, pos 5.7 |
| `/compare/aisensy` | 13 impr, pos 4.3 | 9 impr, pos 1.8 |
| `/compare/interakt` | 6 impr, pos 7.7 | 13 impr, pos 4.5 |
| `/compare/wati` | 12 impr, pos 5.4 | 5 impr, pos 8.4 |
| `/features/ai-brain` | 30 impr, pos 5.3 | 3 impr, pos 1 |
| `/security`, `/solutions/beauty`, `/blog` | both forms present | |

Note how often the slash form holds the better position. The two are
competing, and we are not choosing which one wins.

### Why it is not simply switched on

`scripts/generate-redirects.mjs` refuses to emit `/<path>/ -> /<path> 301!`
because that exact shape caused ERR_TOO_MANY_REDIRECTS across `/compare`,
`/blog/*`, `/pricing` and `/docs/*`. The loop partner was Netlify's Pretty
URLs, which 301s a slashless path to its trailing-slash form.

That guard was written after an outage, by someone whose first attempt had
already passed review. It is not something to quietly delete.

### What has changed

The precondition the guard itself names is now met on production. Added
`scripts/check-trailing-slash.mjs`, which probes every serving shape the site
has rather than the single `/compare` curl the comment suggests:

```
✓ /compare                                200   prerendered flat html
✓ /pricing                                200   prerendered flat html
✓ /blog/whatsapp-abandoned-cart-recovery  200   prerendered nested, blog
✓ /compare/wati                           200   prerendered nested, compare
✓ /docs/troubleshooting                   200   prerendered nested, docs
✓ /features/ai-brain                      200   prerendered nested, features
✓ /whatsapp-festival-templates/diwali     200   prerendered nested, festival
✓ /privacy                                200   static html via 200! rewrite
✓ /login                                  200   SPA shell via 200 rewrite
✓ /this-path-does-not-exist-9f3a          404   no file, 404 catch-all
```

No path redirects to its own slash form, including the no-file case. Pretty
URLs is off.

### How to turn it on

The generator can now emit 154 explicit per-path 301s, gated behind a flag
that is **off by default**:

```bash
node scripts/check-trailing-slash.mjs      # must exit 0
ENABLE_SLASH_301=1 npm run build:netlify
# deploy, then immediately:
node scripts/check-trailing-slash.mjs
```

If anything loops, unset the flag and rebuild. The rules are generated, not
hand-written, so there is nothing to clean up.

I have left it off. The evidence says it is safe, but a redirect change that
previously took the whole site down is the owner's call, not mine.

---

## 3. Not a defect: 25 festival pages unknown to Google

URL Inspection on `/whatsapp-festival-templates/diwali` returns `URL is
unknown to Google`. Checked the usual causes and all are clean:

- In the sitemap: all 25 present.
- Crawlable: robots.txt allows, pages serve 200, no noindex.
- Internally linked: the hub is in the site footer, so it is linked from
  every page; the hub links all 25 children.

So nothing is broken. They are new pages that Google has not reached yet,
and the only lever is requesting indexing by hand. They are Priority B in
`16-reindex-list.md`.

---

## 4. Outside this repo: the dashboard is being indexed

Search Console shows app URLs on the dashboard subdomain collecting
impressions:

```
dash.topedgeai.com/                          42 impr
dash.topedgeai.com/privacy                    7
dash.topedgeai.com/settings?tab=billing       7
dash.topedgeai.com/opt-in-tools               2
dash.topedgeai.com/audience-hub/customers     1
dash.topedgeai.com/marketing-hub/email        1
```

A logged-in application shell has nothing to rank for and should not be in
the index. These pages are served by the dashboard codebase, not this repo,
so the fix belongs there: `noindex` on the app shell, keeping any genuinely
public page (the privacy policy) indexable.

Worth noting `dash.topedgeai.com/docs` also shows up as a referring URL to
this site's blog, which is the old docs location. The docs moved back to
`topedgeai.com/docs` on 31 Oct 2026 and the 301 exists, so that will settle.

---

## 5. Checked and healthy

- **http to https**: `http://topedgeai.com/` 301s to https in one hop. The
  9,943 http impressions in the report are historical aggregation on a
  `sc-domain:` property, not a live duplicate.
- **www to apex**: one 301, both schemes, no chain. The `http://www` rule is
  listed separately on purpose so it does not take two hops.
- **Soft-404**: unknown paths return a real 404 with the noindex document,
  not the homepage.
- **Canonicals, titles, descriptions, H1s, OG tags, alt text**: clean on all
  160 rendered pages.
- **Heading order**: 0 skips across all 160 pages.
- **`/blog/category/*`**: 200, indexable, low volume. Fine as is.
- **Anchor URLs** such as `#what-can-shopify-stores-automate-with-whatsapp`
  picking up impressions are Google surfacing jump links, which is a good
  sign rather than a duplicate.

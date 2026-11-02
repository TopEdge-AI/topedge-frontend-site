# GSC connected — what the first-party data actually says

**2026-11-02.** Search Console is now bound to the OpenSEO project
(`sc-domain:topedgeai.com`, siteOwner). This is the first first-party search
data this project has ever had, and it overturns part of what I told you
earlier today. All of it is free of credits.

---

## 0. The one-paragraph version

The domain is not being held back mainly by thin pages. **Google substantially
believes topedgeai.com is an Ahmedabad salon and spa business**, because real
local-directory sites link to it as one — and Google says so directly, naming
`wanderlog.com/.../best-spas-in-ahmedabad` and a `magicpin.in` beauty-parlour
page as referring URLs for the homepage. On top of that, roughly 37 spam
domains have been pointing at the site since August, with one arriving today.
The September traffic "collapse" is Google starting to correct the first
problem, so it is good news wearing bad clothes.

---

## 1. Corrections to what I said earlier today

I have to walk two things back, because GSC contradicts them.

**1a. "TopEdge AI is absent from the top 20 for its own brand name."**
Too strong. GSC says `topedge ai` averages **position 1.8** with 26
impressions and a 26.9% CTR over 28 days, and `topedge` averages 1.8–4.0.
The site *does* rank for its own name when Google shows it.

Both measurements were real; they measure different things. My earlier claim
came from a cold, non-personalised DataForSEO desktop crawl, which returned
edge-AI content and no topedgeai.com in the top 20. GSC counts impressions
actually served to real users. The honest synthesis is narrower and more
useful: **brand search demand is tiny (26 impressions in 28 days, about one a
day), and the cold SERP for the bare brand string is dominated by the edge-AI
category.** So the entity problem is real for *new* searchers who have no
history with the brand, but people who already know TopEdge do find it. That is
a much smaller problem than I implied, and it is not the top priority.

**1b. "Monitor the backlinks, do not disavow."**
I no longer think that holds. I had only the spam-filtered view (8 domains)
when I wrote it. The unfiltered pull shows **37 of 45 referring domains at a
spam score of 45–80**, and the pattern is unambiguous. See §3.

---

## 2. The real headline: topical contamination

### What the data shows
Over the last 3 months, of the 22 queries where the site ranks in positions
4–20 with 40+ impressions, **21 are local Ahmedabad business queries.** Not
adjacent — completely unrelated:

| Query | Impressions | Avg position |
|---|---|---|
| spa near me | 999 | 15.9 |
| health mantra spa | 578 | 4.0 |
| hair salon near me | 317 | 6.6 |
| spa in nikol | 218 | 9.0 |
| best burger in ahmedabad | 177 | 10.0 |
| best shepherds pie near me | 156 | 12.7 |
| best restaurants near me | 108 | 6.3 |
| best ensalada cesar argentina near me | 76 | 12.4 |
| **best zoko alternative for shopify** | **42** | **9.1** |

That last row is the only commercial query in the list.

In the last 28 days the query→page join is unambiguous — these resolve to the
**homepage**, on both protocols:

| Query | Page | Impressions | Position |
|---|---|---|---|
| adorn hair & beauty nikol | `http://topedgeai.com/` | 295 | **1.4** |
| spa near me | `https://topedgeai.com/` | 167 | 12.4 |
| salon near me | `http://topedgeai.com/` | 112 | 7.8 |
| the thai spa nikol | `https://topedgeai.com/` | 25 | **1.3** |
| cafes in ahmedabad | `https://topedgeai.com/` | 28 | 79.6 |

### Why it is happening — Google told us
I checked the live site first: `https://topedgeai.com/` and `/services` contain
**zero** occurrences of salon, spa, nikol or beauty parlour, and
`http://topedgeai.com/` correctly 301s to HTTPS. So this is not leftover
content and not a redirect bug.

The URL Inspection API gives the cause outright. For `https://topedgeai.com/`:

```
referringUrls: [
  "https://dash.topedgeai.com/docs",
  "https://topedgeai.com/services",
  "https://wanderlog.com/it/list/geoCategory/171069/best-spas-in-ahmedabad",
  "http://topedgeai.com/"
]
```

and for `http://topedgeai.com/`:

```
referringUrls: [
  "https://topedgeai.com/",
  "https://magicpin.in/Ahmedabad/Nava-Naroda/Beauty/Aryan-Hair-Art-and-Beauty-Parlour/store/65c5c2/photos?..."
]
```

**Google is discovering and classifying the homepage partly through a
"best spas in Ahmedabad" list and a beauty-parlour listing.** wanderlog.com
alone sends 26 of the site's 82 backlinks. Somewhere, topedgeai.com has been
entered as the website for one or more Ahmedabad salons.

This also explains two earlier puzzles: why the backlink profile looked like a
local-business site, and why the cold SERP for the brand name is contaminated.

### The September "collapse" is Google fixing this
| Window | Impressions/day | CTR | Avg position |
|---|---|---|---|
| Aug 2026 | ~900 | ~0.7% | ~7.8 |
| 28 Sep (break) | 1,091 → 343 | — | 7.9 → 14.0 |
| Late Oct 2026 | ~160 | **2.2–3.8%** | ~7–9 |

Impressions fell about 82%, but clicks only fell from roughly 6/day to 4/day,
and **CTR rose five-fold.** Losing 800 daily impressions for "spa near me" costs
nothing — those users were never going to buy WhatsApp automation. Do not read
the graph in Search Console as a penalty. It is the junk draining out.

---

## 3. The second problem: an active spam-link campaign

Unfiltered backlink pull, 2026-11-02: **45 referring domains, 37 of them at
spam score 45–80.** Categories: paid-link sellers (`seonix.agency`,
`rank-seo-now.shop`, `growyoursitetraffic.shop`, `leonlinks.agency`),
casino/betting, fake-news syndication (`forbesstories.com`,
`theforbestimes.com`), URL shorteners, and scraper domains.

Dates cluster August–November 2026, matching the +196 referring-domain spike in
September that collapsed back to 47. **`growyoursitetraffic.shop` was first
seen 2026-11-02 00:13 UTC — hours before this audit.** It is ongoing.

Site-wide `backlinksSpamScore` is **39**.

This now clears the bar the brief set for disavowing ("a manual action or a
clear, large-scale toxic pattern"). A ready-to-upload file is at
`disavow-topedgeai.com-2026-11-02.txt` — 37 domains, every one verified at
spam score ≥45.

**It is deliberately not uploaded.** Disavow is yours to submit, it replaces
any previous file wholesale, and it is the one action here that is awkward to
reverse. Read §4 before uploading, because the local-directory links are a
different problem needing a different fix.

---

## 4. Why wanderlog / magicpin are NOT in the disavow file

`wanderlog.com` (spam 0), `magicpin.in` (0), `bestsalons.com` (0),
`khojosale.com` (0) and `shoplist.co` (0) are real directories, not spam. They
are *topically wrong*, which is a different disease.

The right fix is at source: ask them to correct or remove the listing, because
the data is factually wrong — topedgeai.com is not the website of an Ahmedabad
salon. That removes the bad signal permanently instead of merely asking Google
to ignore it, and it does not spend disavow credibility on legitimate sites.

Drafts are in `outreach/` — **unsent**, as always. If a request is refused or
ignored after a reminder, revisit disavowing those specific domains then.

---

## 5. The commercial opportunities now visible

First time these have been measurable.

| Query | Impr. | Position | CTR | Page | Read |
|---|---|---|---|---|---|
| best whatsapp app for shopify | 23 | 14.7 | **30.4%** | `/blog/best-whatsapp-apps-for-shopify` | Outstanding CTR from page 2. Push rank, do not touch the title. |
| zoko alternative | 170 | 9.0 | **0%** | `/blog/zoko-alternative-shopify-india` | Biggest impression pool with no clicks |
| getkanal alternatives | 118 | **2.0** | 0.85% | `/blog/kanal-whatsapp-alternative-shopify` | Position 2 and almost no clicks |
| whatsapp flow template | 106 | 10.9 | 0% | `/features/meta-manager` | Intent mismatch: they want templates, page is about approvals |
| bitespeed alternative | 29 | 15.5 | 0% | `/blog/bitespeed-alternative-shopify-india` | |

**I checked the titles and meta descriptions on all of these before concluding
anything, and they are good** — correct length, keyword-led, specific. So this
is *not* a metadata problem and rewriting them would be wasted work.

The likelier cause is the AI Overview. I verified earlier today that an AI
Overview appears on **16 of 16** commercial India queries. At position 9–15,
below an AI Overview plus People Also Ask, an organic result is effectively
off-screen on mobile. `getkanal alternatives` at position 2.0 with 0.85% CTR is
the strongest evidence: position 2 normally earns ~15%.

This is a hypothesis, not proof — I cannot see the AI Overview's own citations
through this API. But it changes the plan: for these queries the work is
**rank promotion and AI Overview citation**, not snippet tuning.

---

## 6. Also found, lower priority

**Invalid structured data on `/` and `/pricing`**, reported by Google's own
rich-results check: `Invalid object type for field "audience"`, plus
`Missing field "shippingDestination"` ×7 and missing `review`/`aggregateRating`.
All WARNINGs, verdict still PASS. Cause: a `SoftwareApplication` + `Product` +
`offers` node gets coerced into Google's "Merchant listings" type, which then
demands retail fields that make no sense for B2B SaaS. Fixed the `audience`
one (see CHANGES); the shipping fields are inherent to the coercion and are not
worth contorting the schema for.

**`/customers` and `/testimonials` carry real Trustpilot proof but the Product
schema has no `aggregateRating`** — deliberate, per an existing code comment
about Google's review-snippet policy. Left alone.

---

## 7. What to do, in order

| # | Action | Owner | Why |
|---|---|---|---|
| 1 | Send the wanderlog / magicpin / bestsalons correction requests | You | §4 — removes the cause, not the symptom |
| 2 | Upload `disavow-topedgeai.com-2026-11-02.txt` | You | §3 — 37 spam domains, still arriving |
| 3 | Request re-indexing of `/` in GSC after #1 lands | You | Forces re-evaluation once the bad links are gone |
| 4 | Shopify App Store reviews (still 0) | You | Unchanged from this morning |
| 5 | Push `best whatsapp app for shopify` from 14.7 → page 1 | Me | 30.4% CTR already proven |
| 6 | Rebuild `/integrations` for `shopify apps` (5,400/KD22) | Me | Unchanged |
| 7 | Re-pull backlinks monthly; watch spam score 39 | Me | Confirms whether #2 worked |

**Do not** rewrite the titles on the zero-CTR pages (§5), and **do not** read
the September impression drop as damage (§2).

---

## 8. Honest limits

- The AI Overview explanation in §5 is a **hypothesis**. I can prove AI
  Overviews are present on these SERPs; I cannot see their citations.
- GSC `referringUrls` is a sample of what Google used to discover the page, not
  the complete link graph. It is strong evidence for *why* wanderlog matters,
  not a full accounting.
- Disavow effects are slow and never directly observable. If you upload it,
  judge it by the spam score and referring-domain mix over months.
- Last ~3 days of GSC data are incomplete by design.
- Whether the salon links came from a prior owner, a directory-submission
  mistake, or someone else's error, **I could not determine** and did not guess.

# TopEdge AI — SEO / GEO audit, 2026-11-02

Run with the OpenSEO MCP connected (hosted, project `852f0ce0-39cf-43e3-9b80-84ff3449a4a8`).
Branch: `seo/audit-2026-11`, cut from `update-pricing`. Nothing deployed.

**This audit exists to close the four access gaps that `BASELINE-2026-10-25.md`
could not close**: no rank data (Google CAPTCHA), no keyword volumes, no
backlink profile, no GSC. OpenSEO closed three of the four. GSC is still not
connected and remains the one real blocker (§6).

Every number below is labelled **Verified** (I pulled it today),
**Estimate** or **Hypothesis**. Raw exports are in `data/`.

---

## 1. The single most important finding

**TopEdge AI is invisible for its own brand name, and that is an entity
problem, not an authority or indexation problem.** (Verified, India, 2026-11-02.)

| Query | topedgeai.com in top 20? | What ranks instead |
|---|---|---|
| `topedge ai` | **No** | DeepEdge (LinkedIn), "Top 23 Edge AI platforms based in India", HackerNoon, Topview AI Video Studio |
| `topedgeai` | **No** | "Embedded World Trends in the Edge AI Industry", Core Bolt edge computers, NVIDIA Jetson listicles |
| `topedge ai shopify whatsapp` | **Yes — #3, #5, #14** | `/tools` #3, `/docs` #5, `/testimonials` #14 |

Read those three rows together, because the combination is the diagnosis.
The site is indexed, prerendered and perfectly capable of ranking — as soon as
the query carries category context it takes three of the top fourteen slots.
What is missing is the link between the *string* "topedge ai" and this company.
Google currently resolves that string to the edge-AI / semiconductor category,
which is enormous and old.

Why this is the top finding and not a vanity issue:

- Every channel that works by name — the Shopify App Store listing, word of
  mouth, a founder's LinkedIn post, a podcast mention, any future PR — sends
  people to a search box. Today that search does not find the company. It is a
  leak on **all** brand demand, including demand the paid account is already
  buying.
- It also caps the off-site plan. Being included in a "best WhatsApp tools"
  listicle is worth much less if the reader then cannot find you by name.

**The on-site half of this is already done, and done well.** I checked before
recommending anything: `pageSeo.ts` already ships a
`disambiguatingDescription` that explicitly separates the company from edge-AI
hardware, plus `taxID` (GSTIN 24ABAFT1041M1ZD), `foundingDate`, named founders
with `@id`s, and `alternateName`. I found nothing on-site to fix here.

So the remaining work is **third-party corroboration**, and that is §3.

### A correction to my own first pass
I initially flagged `legalName: "TopEdge Ai"` in the Organization schema as an
inconsistency against `name: "TopEdge AI"`. **That was wrong.**
`COMPANY_LEGAL_NAME` in `src/marketing/legal/companyIdentity.ts:6` is the real
registered partnership name used on invoices and the Shopify listing. The
schema is correct as written. Recorded here because the wrong finding was in my
first draft and should not be re-raised.

---

## 2. Google AI Overview is now the SERP — on 16 of 16 commercial queries

**Verified**, India, 2026-11-02. An `ai_overview` block was present on every
single commercial query I pulled:

> whatsapp cart recovery shopify · abandoned cart recovery whatsapp · best
> whatsapp marketing tool for shopify india · cod confirmation whatsapp shopify
> · reduce rto shopify · wati alternative · interakt alternative · whatsapp api
> pricing · whatsapp marketing · shopify apps · whatsapp business api pricing
> india · shopify whatsapp integration · whatsapp marketing shopify · best
> whatsapp api provider india · whatsapp chatbot · topedge ai

16/16. This retires any argument about whether GEO/AEO work is speculative for
this category. In India, for these queries, the answer box is the result.

**Limitation, stated plainly:** `get_serp_results` returns the `ai_overview`
element as a flat row with `description: null` and no reference list. So I can
prove the AI Overview is *present* on all 16; I **cannot** tell you from this
data which domains it cites. That needs either the paid AI-visibility tooling
(you chose to skip it) or the manual panel in §5.

---

## 3. Authority: the first verified backlink numbers this project has ever had

`BASELINE-2026-10-25.md` §3.4 said: *"I have no verified data on TopEdge's
referring domains. Any backlink audit table I produced today would be
fiction."* That gap is now closed. **Verified**, 2026-11-02:

| | topedgeai.com | delightchat.io (organic #1 for our core term) |
|---|---|---|
| Backlinks | 82 | 733 |
| Referring domains | **47** | **388** |
| Referring domains surviving spam filter | **8** | 94 |
| OpenSEO rank proxy | 14 | 31 |
| Backlink spam score | **39** | 27 |

Two things matter more than the gap itself.

**3a. All eight of our surviving referring domains are irrelevant.** The full
list: `wanderlog.com` (travel itineraries, 26 of our 82 links),
`khojosale.com`, `kwickstudio.com`, `letsmetrix.com`, `magicpin.in`,
`heyapps.dev`, `shoplist.co`, `bestsalons.com`. Not one is a Shopify, D2C,
ecommerce or SaaS publication. There is no topical authority here at all — the
profile is directory and aggregator noise.

**3b. The September 2026 spike was not earned links.** The trend shows
referring domains going 32 → **227** in September, then the current reading is
**47**. A +196 one-month gain that mostly disappears is the signature of a
scrape/aggregator wave, not outreach. Combined with a spam score of 39, this is
worth watching but **not** worth disavowing — per the brief's own rule,
disavow only on a manual action or a clear large-scale toxic pattern, and this
is neither yet.

**3c. The most valuable link in the category is attainable.** delightchat.io
has **56 backlinks from `shopify.com` itself** (first seen March 2023).
TopEdge has a live Shopify App Store listing and zero shopify.com links. That
is the single highest-value, most legitimate gap on the list.

---

## 4. The keyword thesis is wrong, and a second independent source now says so

This is the finding most likely to change what gets built next, so here is the
raw data rather than a summary. **Verified** (OpenSEO/DataForSEO, India, en):

| Keyword | Volume/mo | KD |
|---|---|---|
| whatsapp cart recovery | **10** | — |
| whatsapp cart recovery shopify | **10** | — |
| whatsapp abandoned cart recovery | **10** | — |
| cod order confirmation shopify | **10** | — |
| wati io alternative | **10** | — |

The `wati alternative` seed is worse than low — it returned an *unusable*
related set (`isha ambani linkedin`, `next month amavasya`, `ibomma free`).
DataForSEO could not build a coherent cluster, which is what happens when the
seed has almost no volume to work from.

**This independently confirms the 25 Oct finding from Google Keyword Planner**
(which returned "no data" for `cod confirmation app shopify india`, `confirm
cod orders on whatsapp`, `reduce rto shopify`, `whatsapp cart recovery app`).
Two different data sources, two different methods, same answer: **the exact
category strings TopEdge has built its commercial pages around have
approximately no search demand in India.**

Those pages should still exist — they are what you send paid traffic and
App Store traffic to, and they are what an AI engine reads to describe you. But
they will not produce organic volume, and no amount of rewriting changes that.

**Where India demand actually is** (Verified, same pull):

| Keyword | Volume/mo | KD | CPC | Nearest existing asset |
|---|---|---|---|---|
| whatsapp bulk message sender | 12,100 | 30 | $0.85 | none |
| whatsapp api pricing | **5,400** | **32** | $0.93 | **`/pricing`** |
| shopify apps | 5,400 | 22 | $0.37 | `/integrations` (thin) |
| whatsapp marketing | 4,400 | 27 | $1.87 | none |
| whatsapp chatbot | 4,400 | 34 | $1.81 | AI reply assistant (no page) |
| bulk whatsapp sender | 3,600 | 29 | $1.04 | none |
| shopify india | 2,900 | 21 | $0.37 | none |
| shopify pricing india | 720 | 8 | $0.10 | none |
| shopify plans india | 590 | 8 | $0.38 | none |

Two observations worth acting on:

- **`/pricing` is the best-aligned asset on the site and nobody planned it that
  way.** It is already 2,000 prerendered words, its title already leads with
  "Shopify WhatsApp Pricing India: ₹1,999/mo, 0% Markup", and
  `whatsapp api pricing` is 5,400/mo at KD 32 with real commercial intent. This
  is the one page where existing substance meets real demand.
- **`shopify apps` at 5,400/mo and KD 22 is the organic echo of the paid
  account's best ad group.** Project memory has AG13 "Shopify apps" at the
  account's best CTR (14.29%). The 25 Oct note called this a hypothesis because
  it had no volume data. It now has volume data, and `/integrations` — the page
  that should serve it — is 541 words with 13 inbound internal links, the
  weakest link profile on the site.

---

## 5. What page 1 is actually made of

Across all 16 commercial SERPs, two formats own the results, and TopEdge
publishes neither in a place that ranks.

**Third-party listicles.** Verbatim titles from today's pull: "Best WhatsApp
API Providers in India (2026)", "10+ Best WhatsApp Apps for Shopify (2026
Comparison)", "12 WhatsApp Marketing Tools That Actually Fit Indian …",
"Top 5 WhatsApp Marketing Platforms India (2026)", "10 Best RTO Prevention
Tools for Shopify Stores in India", "Best Wati Alternatives (2026)",
"Top 25 Wati Alternatives". These are the pages Google ranks *and* the kind of
page an AI Overview synthesises from. **Getting factually included in them is
the highest-leverage off-site action available**, and it costs nothing but
outreach.

**Shopify App Store listings**, which confirms the 19 Oct finding. Note the
measurement caveat: many results come back as `google.com/goto?url=…`
redirect wrappers, so for roughly 60% of rows **I can read the title but not
the destination domain.** I am therefore not giving you a precise
"App Store owns N% of page 1" number — the titles make the pattern obvious,
but the wrapper makes the exact count unverifiable from this data.

The real SERP competitors are also **not** the assumed list. WATI, Bitespeed,
Interakt and AiSensy are mostly the *objects* of "[X] alternative" queries;
the domains actually holding page 1 are `delightchat.io`, `updatrr.com`,
`pickyassist.com`, `botsailor.com`, `kwiqreply.io`, `ominiflow.com`,
`sabnode.com`, `magecomp.com`, `softpulseinfotech.com`, `theindustryoutlook.com`,
`hillteck.com`, `getgabs.com`, `chatondesk.com` — small vendors and Indian
ecommerce agencies. That is a weaker field than assumed, which is good news.
`reddit.com` r/shopify also holds #8 for `whatsapp cart recovery shopify`.

---

## 6. What I fixed, and what is still open

**Fixed on `seo/audit-2026-11` (Class A, one commit):**

- `/compare` H1 extracted as `TopEdge AIvsWhatsApp tools for Shopify India` —
  no spaces around "vs", because the `<span>`s are flex children. Crawlers and
  answer engines read extracted text, so they read a mangled brand token. Fixed
  by moving the spaces *inside* the `vs` span, where CSS trims them visually, so
  there is no layout change (a bare `{' '}` between flex items would have
  become an anonymous flex item and picked up the row `gap`).

**Verified clean, so nobody re-audits it:** prerendering genuinely works. `/`,
`/pricing`, `/compare`, `/integrations`, `/shopify-whatsapp-integration` all
return 200 to a Googlebot UA with no JS and carry a real title, a single
correct H1, a self-referencing canonical, JSON-LD, and 984–2,000 words of body
text in raw HTML. **There is no P0 rendering issue** — the premise in the brief
that this might be an empty SPA shell is not true of this site.

I also retract an H1 finding from my own first pass: my initial grep reported
empty H1s on `/` and `/compare`. That was my regex failing on nested `<span>`s,
not a site defect. All five pages have exactly one correct H1.

**Still open and genuinely blocking:**

1. **GSC is not connected to the OpenSEO project** (`list_search_console_sites`
   returns an empty account list). This is the fourth access gap and the only
   one still open. It is free, costs no credits, and without it there is still
   no impressions, clicks, CTR, average-position or coverage data — so
   "striking-distance" work (positions 8–20) remains impossible to target.
   **This is the highest-value thing you can do, and it takes minutes.**
2. **Shopify App Store reviews: still 0.** Unchanged since 7 Oct. Five
   merchants already reviewed TopEdge on Trustpilot (4.0/5) and three are named
   on-site with live stores. The goodwill exists and is pointed at the wrong
   platform.
3. **Nested `<a>` inside `<a>` on `/compare`** (new finding, P2, not fixed).
   React logs `validateDOMNesting: <a> cannot appear as a descendant of <a>`
   from `TrustpilotProof.tsx:57` inside `ReviewPlatforms.tsx:23`. Browsers
   re-parent invalid nested anchors, so the inner Trustpilot link may not be
   followed as authored — on a money page, in the review-proof block, which is
   exactly the third-party corroboration §1 depends on. I did **not** fix it:
   it is a shared component used beyond this page and the correct fix is a
   markup restructure with design implications, so it is yours to approve.
4. **G2 and Crunchbase could not be verified** — both returned HTTP 403 to my
   requests. I deliberately did **not** add them to schema `sameAs`; adding a
   profile URL I cannot confirm would be exactly the kind of invented fact this
   audit is supposed to avoid. Confirm them and they should go in `sameAs`,
   since third-party profiles are the corroboration §1 needs.

---

## 7. The 90-day plan, ordered by evidence

Ranked by impact × confidence ÷ effort. "Why" cites the section above.

| # | Action | Owner | Why |
|---|---|---|---|
| 1 | Connect GSC to the OpenSEO project | You | §6.1 — unblocks all position/CTR work, free, minutes |
| 2 | Ask the 5 Trustpilot reviewers + 3 named merchants for a Shopify App Store review | You | §6.2 — App Store ranks for our money terms; 0 reviews is disqualifying |
| 3 | Pitch factual inclusion in the ~12 listicles named in §5 | You (I draft) | §5 — owns page 1 *and* feeds AI Overviews |
| 4 | Claim/correct G2, Crunchbase; then add to `sameAs` | You → me | §1, §6.3 — third-party entity corroboration |
| 5 | Rebuild `/integrations` + `/shopify-whatsapp-integration` against `shopify apps` (5,400/KD22) | Me | §4 — real demand, proven in paid, currently thinnest pages |
| 6 | Deepen `/pricing` for `whatsapp api pricing` (5,400/KD32) | Me | §4 — best existing asset-to-demand match on the site |
| 7 | Pursue a `shopify.com` link via App Store / Partner ecosystem | You | §3c — the category's single most valuable link, and legitimate |
| 8 | Three real case-study URLs from the three named merchants | You + me | §3a, competitors run 34–71; we have 0 and the quotes already exist |
| 9 | Run the 60-prompt AI panel manually, monthly | You | §2 — 16/16 AI Overviews; baseline needed before changes ship |
| 10 | Stop investing in "cart recovery"/"COD/RTO" head terms as *organic* targets | — | §4 — two independent sources say ~10/mo |

**Deliberately not recommended:** mass programmatic pages (DelightChat's 4,936
`/apps/*` pages at ~525 words are what the brief forbids), any `llms.txt` work
(already shipped, and Google says it confers no advantage), and further
technical auditing — §6 shows that programme is finished.

---

## 8. Risks and unknowns

1. **The brand-entity fix may be slow or partial.** "topedge ai" collides with
   a large, established technical category. Third-party corroboration is the
   right lever but entity resolution can take months, and I cannot promise it
   resolves. **Hypothesis, not a forecast.**
2. **No AI Overview citation data.** §2 proves presence, not sources.
3. **~60% of SERP rows are behind Google redirect wrappers**, so competitor
   share-of-page-1 is directional only.
4. **No GSC** means no position baseline, so the §7 items cannot yet be
   measured against a starting point. Fix #1 first for this reason.
5. **Keyword volumes are provider estimates**, and very low volumes (10/mo) are
   near the floor of what any tool measures reliably. The *direction* is
   corroborated by two sources; the exact figures are not precise.

---

## Credits

Started 500, ended ~100. Spent: 18 India SERP queries (~90), 3 keyword seeds
(~162), 2 backlink profiles (~100), plus project setup. Two queries
(`whatsapp business api shopify india`, `abandoned cart app shopify india`)
failed with a provider-side error and returned no data; they were not retried.

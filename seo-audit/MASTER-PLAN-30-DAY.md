# TopEdge AI: SEO / AEO master plan
**Written 2026-11-02. Self-contained: everything needed to continue is in this
file. Hand it to any person or any chat and they can pick up from here.**

---

# PART 0: HOW TO USE THIS

Read Part 1 and Part 3 before doing anything. Part 3 contains the honest maths
on the traffic goal and will stop you wasting a month on the wrong work.

Supporting detail, all in `seo-audit/2026-11-02/`:

| File | What it holds |
|---|---|
| `12-MASTER-FINDINGS.md` | The full audit and the two things I got wrong |
| `13-ai-visibility-baseline.md` | AI engine citation baseline, 100 observations |
| `09-gsc-findings.md` | Search Console diagnosis |
| `10-positioning-and-onpage-audit.md` | 155-page crawl, category analysis |
| `11-backlink-playbook.md` | Link strategy, Shopify link teardown |
| `disavow-UPLOAD-THIS.txt` | 37 spam domains, ready to upload |

Tools in use: **OpenSEO** (project `852f0ce0-39cf-43e3-9b80-84ff3449a4a8`
premium), **Google Search Console** (`sc-domain:topedgeai.com`), **GA4**
(`G-Y8Z47DNJ6V`, live and collecting), **Google Ads** (`AW-18505393304`).

---

# PART 1: WHAT WE ARE

**TopEdge AI is an India-specific Shopify ecommerce operations and retention
app. WhatsApp is the delivery channel, not the category.**

Evidence this is right, not a slogan: the product ships a P&L view computing
net profit after COGS, COD fees, RTO, gateway charges and ad spend. No
WhatsApp API vendor ships that. Peer set is **Updatrr and Bitespeed**, not
WATI, AiSensy or Gupshup, which are BSPs.

**ICP:** Indian Shopify D2C brands, roughly 100 to 1,500 orders a month, where
cash on delivery is a large share of the order book and return-to-origin is a
real cost line. Buyer is the founder or the growth/ops lead.

**We are NOT:** a chatbot vendor, a WhatsApp Business API reseller, a bulk
sender. Targeting those keywords brings the wrong ICP and wastes effort.

**Canonical sentence, use verbatim everywhere** (site, G2, Crunchbase, App
Store subtitle, directories):

> TopEdge AI is a Shopify app for Indian D2C brands that automates abandoned
> cart recovery, COD confirmation and order updates over WhatsApp and email.

Shopify app is the noun. WhatsApp is the channel at the end. Never reverse it.

---

# PART 2: WHERE WE ARE (verified 2026-11-02)

| Metric | Value | Source |
|---|---|---|
| Clicks/day | **~4** (range 1–10) | GSC, 20 Oct–1 Nov |
| Impressions/day | **~185** (range 133–295) | GSC |
| CTR | **~2.2%** | GSC |
| Avg position | 5.2–12 | GSC |
| Referring domains | 47, of which **8** non-spam, **0 relevant** | OpenSEO |
| India organic traffic | **2/mo** | DataForSEO |
| Shopify App Store reviews | **1** (needs 3–5 to display a rating) | owner |
| AI engines: cited as source | **12 of 80 answers** (most of any brand) | OpenSEO AI run |
| AI engines: recommended | **7 of 80** (Interakt 36, WATI 30, AiSensy 29) | same |

**Site health: finished. Do not re-audit it.** Three independent crawls agree:
155 pages, zero missing/duplicate/over-length titles or descriptions, one H1
each, JSON-LD everywhere, canonicals correct, zero broken links, zero redirect
chains. OpenSEO's full audit returned **zero critical and zero warning** issues.

**Competitor reality check:**

| Domain | India organic/mo | Ranked keywords |
|---|---|---|
| wati.io | 16,260 | 1,123 |
| delightchat.io | 7,320 | 555 |
| bitespeed.co | **359** | **4** |
| topedgeai.com | 2 | 3 |

But DelightChat's 7,320 comes from `whatsapp business web` (135k
navigational), `whatsapp qr code png`, `how to schedule messages on whatsapp`
and two other companies' brand names. **That traffic does not buy anything.**
And Bitespeed's four keywords are `bitespeed photos`, `bitespeed bangalore`
(their office address), `bitespeed login` and a rival's brand name. **There is
no competitor keyword strategy worth copying.**

---

# PART 3: THE HONEST MATHS ON 50–100 CLICKS A DAY

Read this before committing to anything.

**Today:** ~185 impressions/day × 2.2% CTR = ~4 clicks/day.

**To reach 50–100 clicks/day:**

| If CTR is | Impressions/day needed |
|---|---|
| 2.2% (today) | 2,270 – 4,545 |
| 5% (page-1 average) | 1,000 – 2,000 |
| 8% (top-3 positions) | 625 – 1,250 |

So the realistic requirement is **roughly 1,000–2,000 impressions a day, a 5×
to 10× increase**, together with better positions.

**Where that cannot come from:** the commercial keywords. Verified India
volumes: `whatsapp cart recovery` 10/mo, `whatsapp cart recovery shopify`
10/mo, `cod order confirmation shopify` 10/mo, `wati alternative` no usable
cluster. Every one of our money terms is at or near zero. **If we only target
money keywords we will never exceed about 10–15 clicks a day, because the
demand does not exist.** That is a fact about the market, not a content
problem, and no amount of writing changes it.

**Two uncomfortable truths, stated plainly:**

1. **50–100 clicks/day is reachable only by taking some top-of-funnel
   traffic** that will convert worse than our comparison pages. That is the
   trade. If the real goal is trials rather than clicks, the comparison
   cluster matters more than the click count.
2. **"Rank #1 on page 1" in 30 days is not realistic as a general claim.** We
   have 8 non-spam referring domains, none relevant. Page 1 for *specific
   low-difficulty long-tail queries* inside 30 days is realistic. Page 1 for
   `whatsapp marketing` is not.

**What I commit to as achievable in 30 days:** 400–700 impressions/day and
15–30 clicks/day, with 2–4 target queries on page 1. The 50–100 range is a
60–90 day target, and only if Track A below works.

---

# PART 4: THE STRATEGY, THREE TRACKS

## TRACK A: The free-tool cluster (this is the volume engine)

**The single biggest finding in this plan.** There is a large, low-difficulty
ICP-adjacent keyword cluster where **we already own the asset**:

| Keyword | Volume/mo | KD |
|---|---|---|
| **whatsapp link generator** | **8,100** | **33** |
| whatsapp url | 6,600 | 55 |
| whatsapp click to chat url | 4,400 | 24 |
| whatsapp url link | 2,900 | 28 |
| whatsapp number link | 2,900 | 20 |
| whatsapp link | 33,100 | 30 |
| **Cluster total** | **~58,000** | mostly KD 20–35 |

We already have `/tools/whatsapp-link-generator` (1,041 words, live, indexed).

**The problem, and it is a one-line fix:** the page is titled *"Free WhatsApp
Link & QR Code Generator **for Shopify**"*. Scoping it to Shopify scopes it
**out** of the 8,100/mo query, which is not Shopify-specific.

**Note the deliberate inversion:** money pages lead with Shopify (Part 1).
Free tools lead with the category, because a free tool is top-of-funnel and
its job is reach. Shopify becomes the conversion path inside the page, not the
qualifier in the title.

**Actions:**
1. Retitle to lead with the query: `WhatsApp Link Generator: Free wa.me Link &
   QR Code` (≤65 chars).
2. Expand to ~2,000 words: what a wa.me link is, pre-filled message syntax
   QR use, link-in-bio, ads, how to track clicks, common mistakes.
3. Keep the Shopify CTA, demote it below the tool.
4. Add FAQ schema for "how do I create a WhatsApp link", "what is wa.me"
   "can I pre-fill a message".
5. Build two sibling tools: **WhatsApp QR code generator** and **click-to-chat
   button generator**, interlinked.

**Why this is the right call and not the DelightChat junk-traffic trap:**
someone generating a WhatsApp business link is running a business and may need
automation later. Someone searching `whatsapp qr code png` wants an image.
Adjacent is fine; irrelevant is not. **If this cluster starts pulling traffic
that never signs up, stop and say so**, measure it in Part 8.

**Expected:** this is the only realistic route to 1,000+ impressions/day.

## TRACK B: The comparison cluster (this is the revenue engine)

Low volume, high intent, already working. Current GSC positions:

| Query | Impr (3mo) | Position |
|---|---|---|
| zoko alternative | 349 | 8.6 |
| getkanal alternatives | 119 | 2.0 |
| best whatsapp app for shopify | 27 | 14.7 (**25.9% CTR**) |
| bitespeed alternative | 30 | 15.5 |
| best zoko alternative for shopify | 42 | 9.1 |

Zoko (2,779 words) and Kanal (2,037 words) are already deepened. Remaining:

1. Apply the same treatment to **Bitespeed, Interakt, AiSensy, WATI**
   alternative posts: a cost-at-volume table, a genuine multi-vendor shortlist
   a "when to stay with them" section, "what carries over when you switch".
2. `best whatsapp app for shopify` has **25.9% CTR from position 14.7**, the
   snippet is already winning. It needs rank, not copy. Internal links from
   high-authority pages, and depth.
3. Every comparison page must say where the competitor is **better**. That is
   what earns AI citation.

## TRACK C: AEO / AI answer engines

Our measured position: **cited 12 times, recommended 7**. We are read and not
chosen. See `13-ai-visibility-baseline.md`.

**The mechanism:** `apps.shopify.com` is cited in **31 of 80** AI answers, #1
by a wide margin, across all five engines. Our listing has 1 review and needs
3–5 to display a rating. **Since we cannot control that right now, Track C
must work around it, not wait for it.**

Work-arounds that do not depend on reviews:

1. **Be in the third-party listicles the engines actually read.** From our
   run: `blog.getmanifest.ai` (8 answers), `ominiflow.com` (8)
   `eesel.ai` (7), `conecxt.com` (5), `pingcart.in` (5), `hillteck.com` (5)
   `chatmitra.com` (9). Plus `com.bot` and `techmonk.io`, which rank for
   `bitespeed alternative`. **Pitch a factual correction/addition to each.**
   This is the highest-value Track C action and costs only outreach.
2. **Contest the India-first slot.** Google's AI Overview for
   `best alternative bitespeed` says: *"For India-First / Rupee Pricing &
   Native Payments: WatEase offers... INR pricing, and 0% markup on WhatsApp
   messages... without heavy USD tier lock-ins."* That is our positioning
   awarded to someone else. Publish a page that answers that exact framing
   better, with real numbers: **"India-first WhatsApp automation: what INR
   pricing and 0% Meta markup actually mean"**.
3. **Answer-first structure on every page.** Two to three sentences that
   directly answer the title question, before any marketing. Engines lift
   these.
4. **Keep facts extractable:** tables, numbered steps, short definitions, real
   ₹ figures, a date on every claim. Never put a fact only in an image.
5. **`/whatsapp-templates` is a strong AEO asset** (2,043 words, 50 template
   mentions). Keep it current.

---

# PART 5: THE 30-DAY PLAN

Dates assume a 3 Nov start.

## WEEK 1 (3–9 Nov): unblock and fix the tool

**Owner (you):**
- [ ] Add a **URL-prefix property** `https://topedgeai.com/` in Search Console
      (Domain properties cannot use the disavow tool). Auto-verifies off
      existing DNS.
- [ ] Upload `disavow-UPLOAD-THIS.txt` against that new property.
- [ ] Fix the Shopify App Store listing: change the docs link from
      `dash.topedgeai.com/docs` to `topedgeai.com/docs`.
- [ ] Correct the G2 description to the Part 1 sentence.

**Build (me):**
- [ ] Retitle and expand `/tools/whatsapp-link-generator` to ~2,000 words
      (Track A).
- [ ] Ship `/tools/whatsapp-qr-code-generator`.
- [ ] Internal links from `/tools`, `/whatsapp-templates`, `/blog` hub.
- [ ] Submit all changed URLs to IndexNow.

**Success check (10 Nov):** tool page indexed under the new title, impressions
for `whatsapp link generator` appearing in GSC at any position.

## WEEK 2 (10–16 Nov): comparison depth + festival check

- [ ] Deepen **Bitespeed** and **Interakt** alternative posts (Track B).
- [ ] Ship `/tools/whatsapp-click-to-chat-button`.
- [ ] **Re-inspect the 25 festival pages** (published 1 Nov). Check coverage
      state, not impressions. If most are indexed, leave them. If most are
      still "Discovered, not indexed" after two weeks, consolidate the weakest
      into the `/whatsapp-templates` pillar.
- [ ] Draft the listicle outreach for the 9 domains in Track C item 1.

**Success check (17 Nov):** 300+ impressions/day, link-generator page in the
top 30 for its head term.

## WEEK 3 (17–23 Nov): AEO offensive

- [ ] Publish the **India-first positioning page** (Track C item 2).
- [ ] Deepen **AiSensy** and **WATI** alternative posts.
- [ ] Owner sends the listicle pitches (max 20/week, one follow-up).
- [ ] Add answer-first opening blocks to the 10 highest-impression pages.
- [ ] Re-run the AI visibility check and compare to the 2 Nov baseline.

**Success check (24 Nov):** 450+ impressions/day, 1–2 listicle inclusions
agreed, AI mention rate above 7/80.

## WEEK 4 (24–30 Nov): push the near-wins

- [ ] Internal-link push to `best whatsapp app for shopify` and
      `zoko alternative` (both within striking distance).
- [ ] Ship the **RTO cost calculator** and **cart recovery calculator**
      upgrades as linkable assets.
- [ ] Tier-1 directory listings with the Part 1 sentence: AlternativeTo
      Crunchbase, Product Hunt, Capterra/GetApp, SaaSworthy.
- [ ] Full measurement review against Part 8.

**30-day target:** 400–700 impressions/day, 15–30 clicks/day, 2–4 queries on
page 1.

---

# PART 6: CONTENT RULES (the "don't look AI-generated" problem)

**The actual rule, stated correctly:** Google does not penalise AI-assisted
content. Its spam policy targets **"scaled content abuse"**, producing many
pages primarily to manipulate rankings rather than to help people. The test is
**helpfulness and originality**, not authorship. A human-written thin page is
penalised; an AI-assisted page with real first-party substance is not.

So the goal is not to evade detection. It is to write pages that would survive
a human reviewer asking "did this help anyone?"

**Non-negotiable rules for every page:**

1. **Include something only TopEdge can say.** A real ₹ figure, a real
   screenshot, a dated reading of a competitor's pricing page, a named
   merchant. If a generic model could have written the page without access to
   our product, it fails. Rewrite it.
2. **Date and source every claim.** "Read off interakt.shop/pricing on 21 Oct
   2026", not "Interakt is expensive". Every external link must be in
   `src/data/sources.ts`, the build enforces this.
3. **Say where the competitor is better.** Every comparison page. This is both
   honest and the single strongest citation signal.
4. **No em dashes.** Owner's rule, build-enforced on blog posts by
   `scripts/check-blog-sources.mjs`. Use commas, colons, brackets, full stops.
   Note the checker only scans `blogPosts.ts`, so watch page components too.
5. **No invented numbers, ever.** If we lack data, write `[NEEDS REAL DATA]`
   and list it for the owner. One fabricated statistic undoes everything else
   on this list.
6. **Real author bylines.** Posts carry a real `Person` with an `@id`.
7. **Vary structure.** Not every page gets the same H2 skeleton. Templated
   structure across many pages is what "scaled content" actually looks like.
8. **Answer-first.** Two to three sentences answering the title question
   before anything else.
9. **Write for a busy founder.** Short paragraphs, specific nouns, no
   throat-clearing, no "in today's fast-paced world", no "unlock the power of".
10. **Publish fewer, deeper pages.** Our two best feature pages
    (`cod-confirmation` 1,288 words / 33 ₹ figures, `profit-loss` 1,321 / 41)
    outperform the eleven thin ones. That ratio is the standard.

**The honest risk on Track A:** three near-identical tool pages is exactly the
pattern that looks scaled. Mitigation: each tool must genuinely do a different
job, with its own copy, its own FAQ, and its own examples. If we cannot write
2,000 distinct words for the third one, **do not ship it.**

---

# PART 7: WHAT NOT TO DO

- **Do not chase WhatsApp utility volume** (`whatsapp web`, `whatsapp dp`
  `whatsapp qr code png`). DelightChat's 7,320/mo proves it is reachable and
  worthless. Same trap as the salon traffic.
- **Do not re-audit on-page SEO.** Three crawls agree it is clean.
- **Do not copy Bitespeed's keywords.** They have four and none are commercial.
- **Do not touch the 25 festival pages before 16 Nov.** Published 1 Nov;
  index coverage on a page under two weeks old means nothing.
- **Do not rewrite titles/metas on the zero-CTR comparison pages.** They are
  good. The problem is rank, under an AI Overview.
- **Do not buy links, or use PBNs, link exchanges or "DR boost" packages.** We
  already have 37 spam domains pointing at us without buying any.
- **Do not paste the gtag.js snippet into `index.html`.**
  `src/marketing/lib/analytics.ts` already loads it after window load with
  consent defaults. A second copy double-counts and bypasses consent.
- **Do not disavow** wanderlog.com, magicpin.in, bestsalons.com
  khojosale.com, shoplist.co. Real directories, already fading.

---

# PART 8: MEASUREMENT

**Weekly, every Monday:**

| Metric | Where | Today (2 Nov) | 30-day target |
|---|---|---|---|
| Impressions/day | GSC | 185 | 400–700 |
| Clicks/day | GSC | 4 | 15–30 |
| CTR | GSC | 2.2% | 3.5–5% |
| Queries on page 1 | GSC, position ≤10 | few | 2–4 commercial |
| `whatsapp link generator` position | GSC | not ranking | top 30 |
| Referring domains (relevant) | OpenSEO | 0 | 5–8 |
| AI mention rate | OpenSEO AI run | 7/80 | 12/80 |
| Trial signups from organic | GA4 | baseline now | track |

**The honesty check, monthly:** if Track A impressions rise but GA4 shows no
signup lift, say so and reweight toward Track B. Clicks are the proxy;
activated stores are the point. **Do not keep reporting a rising click count
if it is not producing trials.**

**Tracking is live:** GA4 `G-Y8Z47DNJ6V` confirmed firing with consent
defaults. Google Ads `AW-18505393304` live. OpenSEO AI tracker runs weekly
(~$23/month, pausable). Set a GA4 exploration to isolate AI referrals
(chatgpt.com, perplexity.ai, gemini.google.com, claude.ai).

---

# PART 9: KNOWN TRAPS IN THIS CODEBASE

Things that will waste an hour if you do not know them.

1. **`/features/*` titles do NOT come from `pageSeo.ts`.** They read
   `seoTitle`/`seoDescription` from `src/marketing/data/productPages.ts`. The
   per-feature keys in `pageSeo.ts` are dead config. `PAGE_SEO.home` IS live
   (`src/pages/Home.tsx:31`).
2. **Title budget is 65 chars, description 110–160**, enforced by
   `seoContracts.ts`. OpenSEO's audit uses 60 and will flag passing titles.
3. **Trailing-slash duplicates are not a bug.** Canonicals are correct and
   `public/_redirects` documents why a force-301 self-loops on Netlify.
4. **The build regenerates tracked files** (`sitemap.xml`, `llms.txt`
   `contentDates`). Commit them; check the date bumps are real first.
5. **`.env` is gitignored.** `VITE_GA_MEASUREMENT_ID` must live in Netlify env
   vars or GA4 goes inert at build time.
6. **Netlify deploys `update-pricing`**, not `main`.
7. **Run before every push:** `npm run build:netlify`, it runs check:pricing
   check:blog, check:festivals, check:links and the structured-data checks.
8. **Two IndexNow keys are live** (`db2d3b12...` hardcoded in
   `scripts/indexnow.mjs`, and OpenSEO's `808945...`). Both valid.

---

# PART 10: THINGS I GOT WRONG (so they are not repeated)

Recorded because a plan that hides its errors cannot be trusted.

1. **Festival pages.** I read "Discovered, currently not indexed" as Google
   rejecting them and recommended deleting 25 pages. They were one day old.
   **Always check publish date before reading index coverage.**
2. **The Shopify backlink gap.** I called DelightChat's 56 shopify.com links
   the most valuable gap in the category. They are one blog post republished
   in ~30 locales, every one nofollow.
3. **Feature-page titles.** I edited `pageSeo.ts` and it did nothing. See
   Part 9 item 1.
4. **The disavow file.** First version had an em dash and I pointed it at a
   Domain property. Both wrong.
5. **The 11 thin feature pages.** I carried "rebuild them" forward after my own
   research showed category demand is tiny. Deprioritised; Track A is the
   better use of the same hours.

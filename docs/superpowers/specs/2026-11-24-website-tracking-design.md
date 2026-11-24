# Website tracking: design

Date: 24 Nov 2026. Status: awaiting owner approval. Nothing is built yet.

Labels used below: **Verified** (checked on the live site or in code today),
**Sourced** (from a dated public source, link in section 12), **Our call**
(a decision made here that the owner can overrule).

## 1. Intent

The owner wants to see, every day and in one place, how people reach
topedgeai.com, what they read, which buttons they press, where they get stuck,
and which visitors look ready to buy, so that pages and sections can be
improved on evidence. Organic search is the only acquisition channel right now
and traffic is a few thousand visits a month, so each visit is worth reading
closely and no measurement can be allowed to slow the pages down.

## 2. What exists today

Verified on the live site, 24 Nov 2026:

- GA4 `G-Y8Z47DNJ6V`, Google Ads `AW-18505393304` and PostHog (project 657165,
  US cloud) all load on React pages and on the two static keyword landing
  pages. PostHog is recording sessions and capturing dead clicks and web vitals.
- PostHog sends straight to `us.i.posthog.com`. Ad blockers drop it.
  PostHog's own docs put the loss at 10 to 30% (Sourced).
- No cookie banner. `updateConsent()` exists in `analytics.ts` and is never
  called, so visitors in the EEA, UK and Switzerland are denied in GA4 for ever
  while PostHog records them, replay included, with no consent.
- Direct loads of `/privacy` and `/terms` (static files) send nothing.
- No Meta pixel is loaded. `src/components/MetaPixel.tsx` only prints a
  console warning on every route change.

Verified in code:

- Three named events only: `signup_click`, `app_store_click`,
  `whatsapp_sales_click`, matched by link address in one global click listener
  (`src/marketing/lib/analytics.ts:162`). No button carries an id or a location.
- `/tools/whatsapp-link-generator` renders `wa.me` links to the visitor's own
  number, and every test click is counted as a sales click.
- A signup click is counted, then the `/signup` redirect route is counted again
  as a page view.
- Not tracked at all: pricing monthly/yearly toggle, plan choice, FAQ opens,
  calculators, the tool finder quiz, videos, nav menu, docs search, blog and
  docs contents clicks, copy and download buttons, the convert prompt, the
  announcement bar, partner signup, login, email and phone links, 404s.
- Almost no page section has a stable id, so scroll and section tracking has
  nothing to key on. The static landing pages do have section ids.
- The static landing pages and the React app configure PostHog differently and
  the landing pages' WhatsApp button sends no event.
- The site has no forms. Every conversion is a click that leaves the site.
- The dashboard (`dash.topedgeai.com`) already sends `signup_complete`,
  `shopify_connected`, `whatsapp_connected` and `paid_subscription` to PostHog,
  consent-gated, and shares the visitor identity through the
  `.topedgeai.com` cookie. The product database stores each signup's source in
  `Client.attribution`, shown per merchant in the admin panel's Client 360.
- TopEdge Ops (`admin.topedgeai.com`, the daily-use software) has a
  Growth > SEO tab, a daily job queue, encrypted Google OAuth storage and
  outbound internet. It has no traffic data of any kind.
- There is no tracking plan or event list anywhere in the repo, and no tests.

## 3. Goals, non-goals, anti-goals

Goals

1. Every commercially meaningful interaction has one named event with a fixed
   set of properties, identical on React pages and static pages.
2. Every button and link that matters can be reported by page, section and
   label.
3. One screen in TopEdge Ops answers: sources, pages, buttons, funnel,
   friction, hot visitors, search queries. History is kept in our own database.
4. Consent is handled correctly for the regions that require it today and can
   be switched on for India with one setting before 12 May 2027.
5. No measurable Core Web Vitals regression. No new third-party script on the
   critical path.

Non-goals (this round)

- No Microsoft Clarity, Hotjar or Google Tag Manager.
- No changes to the dashboard app or to GA4's role as the Google Ads feed.
- No A/B testing framework, no surveys.
- No pulling of GA4 report data into Ops. PostHog is the reporting source.

Anti-goals

- A number on the Ops screen that cannot be traced to a query. Every tile says
  where it came from and what it leaves out.
- Tracking that changes what Google or AI crawlers see, or that is hidden from
  visitors. The privacy policy must name every tool that runs.
- Counting our own visits as visitors.

## 4. Approaches considered

A. **Keep the tools, add a tracking layer, report in Ops.** Keep PostHog as the
   source of truth and GA4 for Google's ecosystem. Add one tracking module and
   one event catalogue on the site, proxy PostHog through our own domain, add a
   small consent banner of our own, and build a Website tab in TopEdge Ops fed
   by a daily pull from PostHog and Search Console.
   Trade-off: the most build work (two repos), but no new vendors, no new page
   weight, and the history is ours.

B. **Use PostHog's own screens only.** Do the site work in A, then build saved
   dashboards inside PostHog and open PostHog daily.
   Trade-off: about a third less work. But scores are hard to express there,
   Search Console and signup data live elsewhere, free-plan retention is one
   year, and it is one more place to log in to. It does not meet "show it in
   the admin".

C. **Build first-party collection.** Send events to our own API and database.
   Trade-off: full ownership, but it means rebuilding replay, heatmaps, bot
   filtering and identity stitching that PostHog gives free at this volume.

D. **Add Clarity for friction.** Clarity gives quick-backs, excessive
   scrolling and unlimited heatmaps free.
   Trade-off: a second recorder script (about 27 KB), a second data processor
   and a second consent integration. The same friction signals can be computed
   from PostHog events we already collect.

**Chosen: A.** (Our call; the owner asked for the best method to be chosen.)
B is A without the last third and leaves the stated wish unmet. C spends weeks
rebuilding what is free. D adds page weight on a site whose only channel is
organic search.

Where the reporting lives: **TopEdge Ops, Growth > Website** (Our call).
The dashboard admin panel is a multi-tenant merchant app whose first rule is
that every query is scoped to a merchant; site-wide visitor data does not
belong there and its two repos are mid-change. Ops is founders-only, already
holds SEO work, and already has the job queue and Google plumbing. The admin
panel keeps what it has: each merchant's source in Client 360.

## 5. Part one: the tracking layer (site repo)

### 5.1 One module, one catalogue

- `src/marketing/lib/tracking/` holds: `events.ts` (the catalogue: every event
  name and its allowed properties, typed), `track.ts` (one `track(name, props)`
  that sends to PostHog and GA4 and never throws), `context.ts` (properties
  added to every event), and one file per automatic collector (clicks,
  sections, scroll, video, errors).
- Static pages get the same behaviour from one small plain-JS file built from
  the same catalogue and inlined by `scripts/generate-landing-pages.mjs`, and
  added to `public/privacy.html` and `public/terms.html`. A build check fails
  if a static page uses an event name that is not in the catalogue.
- A human-readable `docs/tracking-plan.md` is generated from `events.ts` at
  build time so the list cannot drift from the code.
- Naming: lowercase snake_case, object then action (`cta_click`,
  `faq_open`). One event with properties, never one event per variant.

### 5.2 Properties on every event

`page_path`, `page_type` (home, pricing, feature, compare, blog_post,
blog_index, docs, tool, template_library, landing_page, partners, legal,
company, not_found), `page_slug`, `surface` (react or static), `viewport`
(mobile, tablet, desktop), `first_touch` and `last_touch` source summary read
from the existing `te_attr` data plus referrer classification (below),
`is_internal`, `consent_state`, `site_release` (git short hash).

### 5.3 The events

| Event | When | Key properties |
|---|---|---|
| `page_view` | Each real page, once. Not for `/signup`, `/login` redirect routes. | `referrer_host`, `is_entry`, `is_404` |
| `section_view` | A marked section is at least half visible for 1 second, once per page view | `section_id`, `section_index` |
| `scroll_depth` | First time past 25, 50, 75, 100% | `percent` |
| `cta_click` | Any marked button or link, and any link the fallback classifier recognises | `cta_id`, `cta_label`, `section_id`, `destination` (signup, app_store, whatsapp_sales, partner_signup, login, email, phone, internal, outbound), `plan`, `cycle` |
| `signup_click` | Kept as is for the existing funnel and Google Ads conversion. Fired alongside `cta_click` when `destination` is signup. | as today, plus `cta_id`, `section_id`, `cycle` |
| `nav_menu_open` | Products menu or mobile menu opened | `menu` |
| `pricing_cycle_change` | Monthly/yearly toggle | `cycle` |
| `faq_open` | An FAQ or details block opened | `question`, `section_id` |
| `tab_change` | Template and festival filters | `tab_group`, `tab` |
| `calculator_use` | First input, and each result shown | `calculator`, `step` (start, result) |
| `tool_finder_step` | Each quiz step, and finish | `step`, `answer`, `result` |
| `copy_click`, `download_click` | Copy and download buttons | `item`, `format` |
| `video_play`, `video_progress`, `video_unmute`, `video_fullscreen` | Self-hosted videos; progress at 25/50/75/100% | `video_id` |
| `docs_search` | Docs search settles for 1 second | `query`, `results_count` |
| `toc_click` | Blog or docs contents link | `target` |
| `convert_prompt_show`, `convert_prompt_dismiss` | The scroll/dwell prompt | `trigger` |
| `announcement_click`, `announcement_dismiss` | Top bar | `announcement_id` |
| `outbound_click` | Any other external link | `host` |
| `not_found` | 404 page rendered | `path`, `referrer_host` |

Automatic from PostHog, kept on: rage clicks, dead clicks, web vitals,
JavaScript exceptions (turn on exception capture), session replay, heatmaps,
page-leave with scroll depth.

### 5.4 How buttons and sections get identified

- `PrimaryButton` and `GhostButton` take optional `trackId`; they render
  `data-cta-id`. Hand-written links get the attribute added directly.
- The shared `Section` component renders `data-section` from its `id`. Every
  section on home, pricing, feature, compare and landing pages gets a stable
  id (about 60 additions). FAQ accordions get an id that is unique per page.
- One click listener reads `data-cta-id` and the nearest `data-section`. If a
  link has no id (for example links inside blog post HTML), it still classifies
  by destination and builds an id from page type, section and label, so
  nothing is lost.
- The same attributes are mirrored as PostHog capture attributes so heatmaps
  and autocapture carry them too.

### 5.5 Fixes folded in

1. `wa.me` links only count as sales clicks when the number is ours.
2. `/signup` and `/login` redirect routes stop sending page views.
3. Landing page WhatsApp button sends `cta_click`.
4. PostHog configuration is defined once and used by both React and static
   pages, with a dated `defaults` snapshot.
5. `MetaPixel.tsx` is replaced by a real, inert-until-configured loader behind
   `VITE_META_PIXEL_ID`, consent-aware, sending `PageView` and a `Lead` on
   `signup_click`. It stays off until the owner supplies a pixel id.
6. Referrer classification adds: organic search engines, AI assistants
   (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com,
   claude.ai, plus `utm_source` values they append), social, partner links.
   First touch is stored once for 90 days in a new `te_ft` record (local
   storage plus a `.topedgeai.com` cookie, same shape rules as `te_attr`:
   channel, source, landing page, time); last touch is updated per visit.
   `te_attr` and `te_ref` keep their keys and behaviour. The cookie is on the
   parent domain so that, from the day phase 1 ships, every visitor carries a
   first-touch record the backend can start reading in phase 4. Nothing has to
   be backfilled. (Our call.)
   **Which touch gets the credit:** Sources and Funnel credit **first touch**.
   Last touch is shown as a second column, never summed with it. (Our call.)
7. Own visits: opening any page with `?te_internal=1` marks the browser as
   internal for a year (`?te_internal=0` clears it). Internal events carry
   `is_internal: true`, are excluded in Ops and PostHog filters, and skip
   Google Ads conversions.

### 5.6 First-party delivery

Netlify rewrites proxy PostHog through `topedgeai.com/t/*` (three rules, as
PostHog documents for Netlify), with `api_host` pointing at the path and
`ui_host` at `https://us.posthog.com`. The path name is neutral on purpose.
gtag is not proxied.

### 5.7 Performance rules

All new code loads in the existing `afterLoadIdle` window, is skipped during
prerender, and adds no network request before first paint. Listeners are
passive. Budget: at most 6 KB gzipped of our own code; Lighthouse mobile
before and after must be within noise on LCP, INP, CLS and total blocking time.

## 6. Part two: consent

Facts (Sourced): India's DPDP consent and notice duties start 12 May 2027 and
do not apply today. The EU requires consent for analytics cookies and for
session replay. The UK allows aggregate analytics without consent since
5 Feb 2026 but still requires it for recordings of individuals and ad
measurement. Google requires valid consent from EEA, UK and Swiss users for ad
cookies. At this traffic GA4 cannot model denied users back in. This is not
legal advice.

Design (Our call):

- **A small banner of our own**, shown only to visitors in consent regions:
  EEA, UK, Switzerland today. Two equal buttons, "Accept" and "Reject", one
  line of text, a link to the privacy policy. No third-party consent platform.
- Region is decided in the browser from the device time zone (European zones
  count as consent regions). This over-includes a few non-EEA European
  countries, which is the safe direction, and needs no network call.
- In a consent region, before a choice: GA4 and Google Ads stay denied (as
  today), PostHog counts the visit without cookies or stored ids, no replay,
  no Meta pixel. After **Accept**: everything on. After **Reject**: stays
  cookieless. The choice is stored for 6 months and drives
  `updateConsent()`, PostHog opt-in and the Meta pixel together.
- **Our own storage follows the same rule** in consent regions. Before a
  choice and after Reject, `te_attr`, `te_ft` and `te_ref` are held in memory
  for the page session only and are still passed to signup in the link's query
  string (a URL is not device storage). They are written to cookies and local
  storage only after Accept. Cost: a partner referral from an EU, UK or Swiss
  visitor who rejects and comes back another day is not credited. The consent
  choice itself and the `te_internal` flag are always stored (the first is
  strictly necessary, the second is set by our own staff on purpose).
- The choice is stored as a `te_consent` cookie on `.topedgeai.com` (value and
  timestamp) so the dashboard can honour it in a later change. The dashboard is
  not changed now and keeps its own banner, which is one reason the later
  funnel steps in PostHog under-count and phase 4 reads the product database.
- Outside consent regions (India and the rest): tracking runs as it does
  today, no banner.
- Every page footer gets a "Cookie settings" link that reopens the choice, in
  every region.
- The list of consent regions is one constant. Adding `IN` to it before
  12 May 2027 turns the banner on for India with no other change. A dated
  reminder goes into `seo-audit/PLAN-AND-LOG.md`.
- The privacy policy (both the static file and the React copy, which currently
  disagree) gets one cookies section naming GA4, Google Ads remarketing,
  PostHog including session recording, the Meta pixel if enabled, what each
  stores and for how long, and how to change the choice.
- Session replay keeps input masking on. The site has no forms.
- The banner is rendered after load, reserves no layout space (fixed to the
  bottom), and is absent from prerendered HTML, so crawlers see no change.

## 7. Part three: the Website tab in TopEdge Ops

Growth > **Website**, with a 7 / 28 / 90 day switch and these views. Following
Ops conventions, every chart has a legend and a table, and each heading has an
(i) explaining the source and what is excluded.

```
Website                                   [7d] [28d] [90d]      Last pull 06:10
[Overview] [Sources] [Pages] [Buttons] [Funnel] [Friction] [Visitors] [Search]

Overview
 Visitors 1,204   Sessions 1,611   Signup clicks 38   Signups 6   Paying 1
 (each with change vs previous period)
 Line: visitors per day by channel
 Three lists: top entry pages, top buttons, pages with highest friction
```

- **Sources**: channel (organic search, AI assistants, direct, referral,
  social, paid, partner), then source, campaign and entry page; for each,
  visitors, signup clicks, signups, paying.
- **Pages**: per page, views, entries, median time, scroll reach, exits,
  signup-click rate, friction score; open a page to see its sections in order
  with the share of visitors who reached each one, and its buttons.
- **Buttons**: every `cta_id` with clicks, unique clickers, click rate against
  views of its section, by page.
- **Funnel**: entry > viewed pricing or a plan > signup click > signup
  complete > Shopify connected > WhatsApp connected > paying, by channel.
- **Friction**: pages ranked by friction score with the signals behind it and
  a link to matching recordings in PostHog.
- **Visitors**: recent visitors ranked by intent score, with source, pages
  seen, key actions, and a link to the person and replay in PostHog.
- **Search**: Search Console queries and pages (clicks, impressions, position),
  joined to on-site behaviour by landing page.

### 7.1 Data flow

- A daily job (`website_snapshot`, same pattern as `plans_sync`) queries the
  PostHog Query API with a read-only personal key and stores per-day rows in
  Mongo: by page, by source, by button, by section, by friction signal, and a
  per-visitor summary for the last 90 days. A manual "Pull now" button exists.
  Internal and bot traffic are excluded in the queries.
- A second daily job pulls Search Console (query by page by day) through
  `googleapis`, using a separate read-only Google connection stored like the
  existing Gmail one. Gmail's token is not touched.
- Signups and paying customers by source: first version reads PostHog's
  milestone events, labelled as "tracked, consented". The authoritative count
  from the product database arrives in a later phase over the existing signed
  bridge between Ops and the backend, as one additive read-only endpoint.
- Ops stores no IP addresses and no personal data beyond PostHog's anonymous
  visitor id.

### 7.2 Scores (Our call; no published standard exists for the weights)

**Page friction score, 0 to 100.** Per page over the chosen period, per 100
page views: rage clicks x4, dead clicks x1, quick-backs x2, quick exits x1
(contribution capped at 20 points so bounces cannot dominate), JavaScript
errors x3, plus 10 points if
p75 LCP is over 2.5 s, 10 if INP is over 200 ms, 5 if CLS is over 0.1, capped
at 100. Pages under 30 views show "not enough data" instead of a score.
A **quick-back** is an on-site move: the visitor went from page A to this page
and returned to A within 5 seconds. A **quick exit** is the entry-page case,
where the previous page is a search engine we cannot see: the session's only
page view, under 5 seconds, with no click or scroll. The two are stored and
shown separately.

**Visitor intent score, 0 to 100.** Capped per group so reading cannot
outweigh buying signals: pricing or plan interest up to 30 (pricing view 10,
cycle change 5, plan CTA 15), conversion actions up to 35 (signup click 25,
app store or WhatsApp sales click 15), depth up to 20 (3+ pages 5, 2+ feature
or compare pages 5, calculator or tool finder finished 10), return visits up
to 15 (second day 8, third day 7). 60 and above is "hot".

Both formulas live in one file on the Ops server, with unit tests, and are
shown behind the (i) so nobody has to guess what a number means.

## 8. Phases

1. **Tracking layer and fixes** (site): 5.1 to 5.7. Ships alone and is useful
   in PostHog immediately.
2. **Consent** (site): section 6.
3. **Ops Website tab** (Ops): section 7 with PostHog and Search Console pulls.
4. **Authoritative signup and paying numbers** over the bridge (Ops and
   backend), plus GA4 housekeeping: key events, custom dimensions for
   `cta_id`, `section_id`, `page_type`, 14-month retention, internal-traffic
   filter, and confirming Enhanced Measurement is not double-counting page
   views.

Each phase is deployed and checked before the next starts.

**Where the site work lands** (Our call). On 24 Nov the `update-pricing`
checkout holds 65 uncommitted files from other sessions, several of which this
design also edits (`netlify.toml`, `scripts/generate-landing-pages.mjs`,
`PricingPage.tsx`, `PlanGrid.tsx`, `FaqAccordion.tsx`). The tracking work is
therefore built in its own git worktree on a `tracking` branch cut from
`origin/update-pricing`, rebased before each merge, and merged only with the
owner's yes, so a tracking deploy never ships someone else's unfinished work.
It shares the one-deploy-a-day rule in `seo-audit/PLAN-AND-LOG.md`. Home and
feature pages are frozen for copy only (PLAN-AND-LOG line 274 allows layout
work); this design adds ids and data attributes there and changes no visible
text. Note for the plan: the shared `Section` component is used in only 7
files, so most section ids are direct attribute additions.

**Signup source in phase 4.** The backend change is additive: store the
PostHog visitor id and the `te_ft` first-touch record for every signup, not
only for ones with a click id or UTM, and expose signups and paying customers
by first-touch channel to Ops over the signed bridge. Until then the channel
split of signups comes from PostHog's person join and is labelled as such.

## 9. What the owner has to supply

- A PostHog personal API key with read access to queries, placed in the Ops
  server environment (never in the site).
- In PostHog project settings: turn on cookieless tracking, heatmaps and
  exception capture.
- One click in Ops Settings to connect Google with Search Console read access.
- A Meta pixel id, only when Meta ads start.
- A yes before each production deploy (Netlify for the site, `deploy/push.sh`
  for Ops).

## 10. Verification

- Site: a small test runner is added for the tracking module (event names,
  property shapes, click classification, the `wa.me` fix, consent state
  machine). In the browser: each event in 5.3 is triggered once and seen in
  PostHog's live events and GA4 DebugView; network panel shows PostHog going
  through `/t/`; consent tested with the time zone overridden.
- Site SEO checks, because served pages change: `seo-drift` baseline before and
  compare after, `seo-technical` and a performance run before and after.
  Planning, content, schema and sitemap phases of the SEO workflow do not
  apply: no page content, structured data or URL changes.
- Ops: unit tests for both scores and for the snapshot queries against
  recorded PostHog responses; API tests in the existing vitest suite.
- After a week of data: compare PostHog visitors with GA4 users and Search
  Console clicks for the same days and record the gaps in the plan log.

## 11. Left to the builder

File names inside `tracking/`, the exact section ids, banner styling within
the site theme, Mongo schema shapes, HogQL query text, chart choices within
Ops conventions, and the test runner.

## 12. Sources

- DPDP phasing: azbpartners.com, 14 Nov 2025 (law-firm summary; gazette text
  not read).
- EU: EDPB guidelines 2/2023 v2, 7 Oct 2024. UK: ICO storage and access
  guidance, 29 Apr 2026. Google EU user consent policy and Consent Mode docs.
  GA4 modelling thresholds: support.google.com/analytics/answer/11161109.
- PostHog: pricing, config, proxy (Netlify), cookieless, Query API limits,
  channel types, autocapture docs on posthog.com, read 24 Nov 2026.
- Friction definitions: PostHog autocapture, Datadog frustration signals,
  Microsoft Clarity semantic metrics. Lead scoring caps: HubSpot scoring docs.
- Not confirmed: whether cookieless analytics is consent-exempt in the EU (no
  regulator statement found); PostHog free-plan heatmap page limit; exact DPDP
  commencement day (12, 13 or 14 May 2027 across sources).

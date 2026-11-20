---
name: topedge-landing-page
description: Build or upgrade a TopEdge AI keyword landing page (SEO, AEO and ad-ready) on the SeoTopicPage system, with the exact keyword in URL, title and H1, the home feature film, both pricing doors and Google-policy checks. Use for any page in PLAN-AND-LOG section 3b or any request for a "landing page" for a keyword.
---

# TopEdge AI keyword landing page

Landing pages own commercial product keywords ("whatsapp abandoned cart recovery app", "shopify cod app"). Blog posts keep "best X" and "how to" queries. One keyword, one owner page: check `seo-audit/2026-11-10/01-page-by-page-audit.csv` (`primary_keyword`) and PLAN-AND-LOG section 3b first. If a page already serves the intent (for COD it is `/features/cod-confirmation`), upgrade it instead of making a second one.

## The system
- Data: `src/marketing/data/seoTopics.ts` (`SEO_TOPICS[slug]`). Landing fields: `h1Accent`, `kicker`, `film`, `filmLabel`, `appStoreCta`, `plans`, `answerLabel`, `trustTitle`, `faqTitle`, `faqSub`, `cta`. Content goes in `blocks` (`steps`, `specTable`, `prose`, `checklist`, `callout`, `figures`). Prose supports `**bold**` and `[label](/internal-path)` only.
- Page: `src/marketing/pages/SeoTopicPage.tsx`. Film: `src/marketing/components/landing/LandingFilm.tsx` (home films from `HOME_FILMS` in `src/marketing/data/homeFeatureMedia.ts`: cart, cod, campaigns, optin, pixel, flow, intent, identity, segments, profit). Plans: `src/marketing/components/landing/LandingPlans.tsx` (reads the billing catalog and App Store USD table; never hardcode prices).
- Register a new slug in four places: route in `src/App.tsx`, `TOPIC_SLUGS` in `scripts/marketing-urls.mjs` (sitemap and prerender), the CORE list in `scripts/generate-llms.mjs`, and a footer link in `src/marketing/components/MarketingFooter.tsx`.
- Add at least three body links to it from related blog posts (pillar, playbook, shortlist). Footer and menu links do not count.

## Page standard (in order on the page)
1. **URL** = the keyword, hyphenated. **Title** = keyword first, 60 characters or fewer (the topic page uses no suffix). **H1** = the keyword in plain words; `h1Accent` highlights the core phrase. **Description** 110 to 160 characters, keyword plus a number.
2. **Hero:** one-line subtitle that restates the keyword with the outcome; Start free plus "Install on Shopify" (`appStoreCta`); proof badges already on the site. No invented results or review counts.
3. **Film:** the matching home film. No VideoObject schema (the home page owns those files).
4. **Answer panel** (`answerFirst`): 2 to 3 sentences with the canonical facts, a rupee figure and a dated reading. Chips (`bullets`): four short facts.
5. **Blocks:** how it works (steps, using product docs as the source of truth: `src/marketing/docs/content/docs.json`); one table a reader or an AI can lift, comparing real alternatives as each publishes them; a worked rupee cost; a do/avoid checklist; "when you do not need this" in plain words; one callout to the next product step.
6. **Plans** (`plans`): both doors, INR on the website and USD on the App Store.
7. **FAQ:** 5 or 6 questions from real queries (Search Console, People also ask), 2 or 3 sentences each.
8. **Related:** three related pages plus /pricing. **CTA band** with keyword-specific copy.

## Facts you may state (re-check before each page)
- Canonical sentence: "TopEdge AI is a Shopify app for Indian D2C brands that automates abandoned cart recovery, COD confirmation and order updates over WhatsApp and email."
- Plans: Launch ₹1,999, Growth ₹3,999, Scale ₹6,499 a month plus GST on the website; $19, $39, $65 on the App Store. Orders: 100, 800, 1,500. Trial 14 days, 20 orders, 200 sends.
- COD confirmation on every plan; COD to prepaid and Journey Branch on Growth and up. No NDR handling, no partial COD, no Meta WhatsApp Flows.
- Meta India: ₹0.8631 marketing, ₹0.1150 utility (sources.ts `metaPricing`; re-read before quoting if older than 14 days).
- Shopify Messaging WhatsApp (read 20 Nov 2026): marketing only, abandoned browse, cart and checkout templates, marketing subscribers only, India $0.024 per message.

## Google policy checks (must pass)
- **Doorway abuse:** the page answers its own query fully and differs in substance from every other landing page. No city, industry or near-duplicate variants. If two keywords share a SERP (check with live results), they share one page.
- **People-first gate:** `node seo-audit/tools/people-first-audit.mjs dist <out> --only /<slug>` shows no flags; shared text with other landing pages is limited to the plan strip and CTA.
- **Misleading functionality:** every claim matches the dashboard. When unsure, read the docs entry or ask the owner.
- No hidden text, no keyword lists, no Product schema, no self-written review markup.

## Ads
The same URL serves Meta and Google ads with UTM tags. The ad headline repeats the H1 (message match). Never make a noindex twin for ads; `/lp/*` static pages are the old Google Ads pages and stay as they are.

## Ship
Build (`npm run build:netlify`), dist audit, preview at `/` + slug on port 4190 (desktop and 375px), check the film plays and the plan strip shows both doors, then deploy and add the URL to the IndexNow and Request indexing lists.

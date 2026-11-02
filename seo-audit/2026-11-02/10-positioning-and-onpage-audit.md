# Full on-page audit, re-framed on the correct category

**2026-11-02.** Crawled all **155 sitemap URLs** as Googlebot with no JavaScript,
and cross-read against Search Console. Written after the owner corrected the
category: TopEdge is **not** a chatbot vendor and **not** a WhatsApp API /
BSP provider. It is a **Shopify ecommerce automation app**, peer set Updatrr
and Bitespeed. That correction changes the conclusions, and the data supports
it.

---

## 1. Classic on-page SEO: nothing to fix

Across all 155 pages: **0** missing titles, **0** titles over 65 chars, **0**
missing descriptions, **0** descriptions over budget, **0** pages without
exactly one H1, **0** pages without JSON-LD, **0** canonical mismatches, **0**
duplicate titles.

I ran the full crawl specifically to find on-page defects and there are none.
Anyone who audits this site again on titles, metas, headings, canonicals or
schema will burn the time and find nothing. **The problem is not on-page
hygiene.** It is category, depth and indexation, in that order.

---

## 2. The category problem, measured

### 2.1 The site tells Google it is a WhatsApp tool

Counting the rendered text of all 155 pages:

| Term | Mentions sitewide |
|---|---|
| WhatsApp | **3,272** |
| Shopify | **2,415** |

A 1.35 : 1 ratio in favour of the channel over the category. On 11 of the 13
feature pages, WhatsApp outnumbers Shopify, often two to one (opt-in-tools
19 : 9, journeys 17 : 10, audience-crm 15 : 8).

Eleven of twenty key page titles led with the word "WhatsApp", the homepage
included. A title of the form *"WhatsApp Cart Recovery for Shopify"* makes
WhatsApp the noun and Shopify the modifier. Read literally, that is "a
WhatsApp tool that happens to work with Shopify", which is the BSP category
the owner says we are not in.

### 2.2 Google agrees, and it shows in the rankings

This is the part that settles it. From GSC, 3 months:

| Query shape | Example | Position |
|---|---|---|
| **"shopify … app"** | abandoned cart recovery shopify app | **64.8** |
| | best shopify abandoned cart app | **62** |
| | shopify whatsapp app | **70** |
| | shopify whatsapp | **56** |
| | shopify whatsapp integration | **53** |
| **"whatsapp …"** | best shopify whatsapp app | **7** |
| | whatsapp cod | **7** |
| | whatsapp automation shopify | **9.3** |
| | whatsapp abandoned cart shopify | **17** |
| | best whatsapp app for shopify | **18.7** |

The split is clean. Lead the query with the Shopify app category and we are on
page 5 to 7. Lead it with WhatsApp and we are on page 1 or 2. Google's
understanding of the domain matches the 1.35 : 1 language ratio exactly.

**This is the single most important finding in this audit.** It is also the
cheapest to act on, because it is mostly wording.

### 2.3 The URL structure says the same thing

Of the non-blog URLs, almost every one begins with the channel:
`/whatsapp-templates`, `/whatsapp-festival-templates/*` (25 pages),
`/whatsapp-journey-examples/*`, `/shopify-whatsapp-integration`,
`/tools/best-whatsapp-tool-for-shopify`, `/tools/whatsapp-link-generator`.

There is **no** URL of the shape `/shopify-abandoned-cart-app`,
`/shopify-cod-verification`, or `/shopify-automation`. The information
architecture encodes the wrong category, and URLs are read by both Google and
the human scanning a result.

---

## 3. The 25 festival pages are not indexed, and Google has already decided

`/whatsapp-festival-templates/*` is the largest single family on the site:
25 pages, every one between 2,044 and 2,218 words. Roughly **53,000 words**.

Search Console, checked today:

| URL | Coverage state |
|---|---|
| `/whatsapp-festival-templates` (hub) | **Crawled, currently not indexed** (crawled 1 Nov) |
| `/whatsapp-festival-templates/diwali` | **Discovered, currently not indexed** |
| `/whatsapp-festival-templates/christmas` | **Discovered, currently not indexed** |

**Impressions from the whole family over 3 months: zero.** Not low. Zero rows
returned.

Google crawled the hub, declined to index it, and has not spent crawl budget
on the children at all. Comparing two children, the rendered text is 65 to 67%
identical with 69% shared vocabulary (that figure includes shared nav and
footer, so the unique portion is larger than the number suggests, but the
pattern is a template with the festival name swapped).

This is the "thin programmatic page" trap, and not because the pages are
short. They are long. They are thin on **information gain**, which is the
thing Google actually measures here, and it has ruled.

**Recommended, and it is a Class B call for the owner:** consolidate the 25
into the existing `/whatsapp-templates` pillar, which *is* indexed and is a
strong 2,043-word page, then 301 the children to it and drop them from the
sitemap. Keep at most two or three festivals that have genuine distinct search
demand (Diwali almost certainly does) as real pages with their own data and
examples. Nothing is lost: the family earns nothing today, and 25 unindexed
URLs in the sitemap dilute the crawl budget that the money pages need.

---

## 4. Depth: the money pages are the thinnest pages on the site

Median words of main content by group:

| Group | Pages | Median words | Median ₹ figures |
|---|---|---|---|
| blog | 42 | 1,638 | 7 |
| compare | 13 | 1,344 | 12 |
| other (guides, topics, tools) | 78 | 1,477 | 1 |
| **features** | **13** | **720** | **1** |
| **homepage** | 1 | **775** | **0** |
| **/integrations** | 1 | **606** | **0** |

The inversion from the October baseline is unchanged: the pages that must
convert are the shortest and carry no numbers, while the blog, which closes
nobody, is twice their length.

### 4.1 Two feature pages are already right, and they are the template

| Page | Words | ₹ | COD | RTO |
|---|---|---|---|---|
| **/features/cod-confirmation** | **1,288** | **33** | 34 | 14 |
| **/features/profit-loss** | **1,321** | **41** | 24 | 22 |
| the other 11 | 658 to 762 | 0 to 5 | 3 to 17 | 1 to 2 |

Those two are roughly double the length of the rest and carry almost every
rupee figure on the feature pages. They are also the two framed as **ecommerce
operations** (cash on delivery, returns, net profit) rather than as messaging.
They are what the corrected positioning looks like when it is already built.

**The other 11 are the biggest content gap on the site.** Rebuild them against
cod-confirmation and profit-loss as the pattern, using the `TopicBlocks`
component set (specTable, steps, figures, checklist) that already exists for
this, rather than writing more paragraphs.

---

## 5. What I changed today

Titles re-led on the Shopify job rather than the channel, all inside the 65
character contract:

| Page | Before | After |
|---|---|---|
| `/` | WhatsApp Automation for Shopify India \| COD & Carts \| TopEdge AI | **Shopify Cart Recovery & COD App for India \| TopEdge AI** |
| `/features/live-chat` | WhatsApp Live Chat for Shopify \| Shared Inbox & Orders | **Shopify Shared Inbox on WhatsApp \| Live Chat & Orders** |
| `/features/flow-builder` | WhatsApp Flow Builder for Shopify \| AI Chatbot Drafts | **Shopify Automation Flow Builder on WhatsApp \| TopEdge AI** |
| `/features/chat-rules` | WhatsApp Chat Rules for Shopify \| Route, Tag & Assign | **Shopify Chat Routing on WhatsApp \| Route, Tag & Assign** |
| `/features/opt-in-tools` | WhatsApp Opt-in Tools for Shopify \| Popup & Spin Wheel | **Shopify Opt-in Tools for WhatsApp \| Popup & Spin Wheel** |

WhatsApp stays in four of the five, because it is the channel and a real
qualifier a buyer searches on. It is simply no longer the noun.

**The homepage title is the one to review first.** It is the strongest single
signal on the site and it is a one-line revert if the owner disagrees.

I deliberately stopped there rather than rewriting all eleven. The titles in
`pageSeo.ts` already differ from what is live, which means a revision is in
flight, and a sweeping rewrite would collide with it.

---

## 6. Ranked backlog

| # | Action | Owner | Evidence |
|---|---|---|---|
| 1 | Decide the festival-page consolidation (§3) | You | 25 pages, 53k words, 0 impressions, Google declined |
| 2 | Rebuild the 11 thin feature pages on the cod-confirmation pattern (§4.1) | Me | 720 median words, 1 ₹ figure |
| 3 | Finish the title re-framing on the remaining WhatsApp-led pages (§5) | Me, after you see #5 | position 50-70 on app-shaped queries |
| 4 | Create `/shopify-abandoned-cart-app` style URLs for the app-shaped queries (§2.3) | Me | no such URL exists today |
| 5 | Deepen `/integrations` (606 words) and the homepage (775) | Me | thinnest commercial pages |
| 6 | Shopify App Store reviews, still 0 | You | unchanged |

**Not recommended:** another technical or on-page audit (§1), chasing
`whatsapp chatbot` / `whatsapp bulk message sender` (wrong ICP, and the owner
is right that they pull BSP shoppers), and any further COD/RTO keyword
investment as an *organic* target, since GSC shows almost no COD query demand
either, matching both keyword tools.

---

## 7. Limits

- Live titles differ from `pageSeo.ts`, so the deployed site is behind the
  repo. The §2.1 counts are from the **live** crawl and describe what Google
  sees now.
- The 65 to 67% similarity in §3 includes shared nav and footer and overstates
  duplication. The indexation verdicts do not depend on it.
- Position figures are GSC averages over 3 months, which blend devices and
  locations.
- "Discovered, currently not indexed" can resolve on its own over time. It has
  not here, and the hub was crawled and refused, which is the stronger signal.

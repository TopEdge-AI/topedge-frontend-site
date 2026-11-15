# Why AI answers rarely name TopEdge AI, and what changes that (15 Nov 2026)

**Labels.** Verified = I ran the search or opened the page on 15 Nov 2026. Estimate = my judgement.

**Method and its limit.** I cannot query ChatGPT, Gemini, Perplexity or Copilot from here. AI assistants with browsing answer from a small set of retrieved web pages, so I used web search as a proxy: which pages come back for each prompt. Those pages are the likely sources. This shows *who gets retrieved*. It does not show what any one assistant says on a given day. The search tool is US-biased.

---

## 1. Short answer

| Reason | Evidence | Status |
|---|---|---|
| Assistants mostly quote third-party lists, App Store listings and comparison pages. TopEdge AI is in almost none of them | Prompt 1 sources below: 1 of 15 retrieved pages names us (Digismoothie) | Verified |
| The App Store listing, the most-retrieved page type for COD prompts, has 0 reviews and 0.0 stars | Prompt 2 returned only App Store listings. Ours: launched 30 Sep 2026, 0 reviews (search snippet and digismoothie.com/app/topedge-ai) | Verified |
| The entity has three names and two prices across the web | Site: "TopEdge AI", ₹1,999/mo. App Store: "TopEdge Ai: WA Cart Recovery" (search title), $19/$39/$65. PickYourApp and Digismoothie: "TopEdge WhatsApp Cart Recovery", developer "TopEdge Ai" | Verified |
| A 46-day-old app on a domain with single-digit real referring domains | 01-serp-teardown, 10 Nov audit (43 of 52 referring domains are spam) | Verified from earlier files |
| When an assistant does find us, it says "new, no reviews" | The brand search summary says exactly that: "recent... no reviews... established apps have more reviews" | Verified |

---

## 2. Which pages feed each prompt (these are the outreach targets)

### Prompt 1: "best WhatsApp app for Shopify India"

| Retrieved page | Type | Names TopEdge? | Action |
|---|---|---|---|
| digismoothie.com/best-shopify-apps/whatsapp-marketing | Listicle | **Yes** (5th) | Keep, ask for a review update once the App Store has reviews (already in 23 CSV) |
| community.shopify.com/t/best-and-budget-friendly-whatsapp-api-for-shopify/321979 | Forum thread | No | A helpful, disclosed reply by the founder (community domain already in 23 CSV) |
| apps.shopify.com/reviews/1417474 (256 reviews), /reviews/1947871 (210 reviews) | App Store review pages | No | Only our own reviews fix this |
| zoko.io/post/top-10-best-whatsapp-shopify-apps | Vendor listicle | No | Not a target |
| quickreply.ai (2 listicles) | Vendor listicle | No | Not a target |
| saufter.io/best-whatsapp-apps-for-shopify | Listicle | No | 403 to my tool, so not added to 04 |
| mailmodo.com/ecommerce/apps/shopify-whatsapp | Listicle | No | Returned 404 on fetch |
| meetanshi.com/blog/best-shopify-apps-for-whatsapp | Listicle (2023) | No | **04, priority 1** |
| go4whatsup.com/compare/best-shopify-whatsapp-apps-2026 ("listings checked November 2026") | Vendor listicle | No | Not a target; note it is the freshest and assistants quote it |
| logbase.io, sumtracker.com | Listicles | No | Already in 23 CSV: chase replies |
| easysellapp.com best WhatsApp marketing apps 2026 | Vendor listicle | No | Already in 23 CSV |
| blog.shipway.com (?p=62334) | Listicle | No | Shipway domain is in 23 CSV |

### Prompt 2: "which app confirms COD orders on WhatsApp for Shopify"

| Retrieved page | Type | Names TopEdge? |
|---|---|---|
| apps.shopify.com/confirmify | App Store listing | No |
| apps.shopify.com/codsaver-1 | App Store listing | No |
| apps.shopify.com/akeed | App Store listing | No |
| apps.shopify.com/cod-confirm-3 | App Store listing | No |
| apps.shopify.com/wasp-order-confirmation, /codverify-1, /smart-cod-order-confirmation, /taakid | App Store listings | No |

Every result is an App Store listing whose **title says "COD confirmation" or "COD verify"**. Ours is titled for cart recovery and listed under "Abandoned cart". The India-worded variant ("...India reduce RTO") added delightchat.io's COD list, apps.shopify.com/shiprocket-engage, HillTeck and Verify COD listings, bot.space and ominiflow.com guides. (Verified)

**Implication:** for this prompt no amount of on-site content helps. The listing title, subtitle, category and reviews decide it.

### Prompt 3: "WATI vs Interakt vs AiSensy for Shopify"

| Retrieved page | Type | Target? |
|---|---|---|
| aisensy.com/aisensy-vs-interakt-vs-wati | Vendor | No |
| ominiflow.com/wati-vs-interakt-vs-aisensy | Vendor (rival) | No |
| codingclave.com/blog/wati-vs-interakt-vs-aisensy-2026 | Agency blog | **Yes**, codingclave.com already in 23 CSV (different URL): pitch this page |
| echai.ventures/d2c/d2c-whatsapp-sms/wati-interakt-aisensy-gupshup-which-to-use | Indian D2C resource hub | **Yes**, echai.ventures in 23 CSV: pitch this page |
| theantmethod.pages.dev/blog/wati-vs-aisensy-vs-interakt-comparison | Small blog | Possible, no contact found |
| bot.space, zoko.io x3, spurnow.com x2, chakrahq.com, go4whatsup.com, wanotifier.com, getkanal.com | Rival vendors | No |

**Our own board** (/compare/topedge-vs-wati-vs-interakt-vs-aisensy) did not appear. Assistants lean to the page whose opening answers the question in two lines; ours should state the verdict first (see 03, row "wati vs interakt vs aisensy").

### Priority outreach list that comes out of this (in addition to 04)

1. codingclave.com/blog/wati-vs-interakt-vs-aisensy-2026 (domain in 23 CSV, new URL)
2. echai.ventures/d2c/d2c-whatsapp-sms/wati-interakt-aisensy-gupshup-which-to-use (domain in 23 CSV, new URL)
3. meetanshi.com, magecomp.com, growave.io, the4.co listicles (04)
4. thed2cpulse.com Indian stack list (04)
5. community.shopify.com thread 321979: one disclosed, useful founder reply

---

## 3. Checklist

| # | Action | Who | Effort | Controllable? | Status today |
|---|---|---|---|---|---|
| 1 | **One name everywhere**: "TopEdge AI". Rename App Store developer from "TopEdge Ai" and title from "TopEdge Ai: WA Cart Recovery" to something like "TopEdge AI: COD Confirm & Cart" | Owner (Partner dashboard) | S | Yes | Verified mismatch |
| 2 | **App Store title/subtitle mention COD confirmation**; add the COD/order-management category if allowed | Owner | S | Yes | Title is cart-recovery only |
| 3 | **10 to 15 honest reviews in 60 days** from live merchants (Updatrr reached 37 in 23 months) | Owner | M | Partly | 0 reviews |
| 4 | **One price story**: site ₹1,999 vs listing $19. Add "₹1,999/mo billed in INR on our site; $19 on the App Store" in both places | Owner + site | S | Yes | Mismatch (Verified) |
| 5 | **Claim third-party profiles that already exist**: pickyourapp.com/products/topedge-ai (unclaimed, no website link), Digismoothie app page, webcatalog.io/en/apps/topedge | Owner | S | Yes | Unclaimed (Verified for PickYourApp) |
| 6 | **sameAs**: Organization sameAs has LinkedIn, Instagram, YouTube, App Store, Trustpilot. Add Crunchbase and Product Hunt (edited 8 Nov). Founder `sameAs` arrays are empty: add their LinkedIn URLs | Site | S | Yes | Verified in src/marketing/data/pageSeo.ts |
| 7 | **Bing Webmaster Tools** (Copilot and ChatGPT search use Bing's index). Import from Search Console | Owner | S | Yes | Recommended 10 Nov; not confirmed done |
| 8 | **IndexNow** after each deploy | Site | S | Yes | Key files and scripts/indexnow.mjs exist (Verified); keep running it |
| 9 | **Answer-first passages**: first 40 to 60 words of each money page answer the prompt with a number and a date (e.g. "Interakt costs ₹X a month plus Meta's ₹0.8631 per marketing message, checked 9 Nov 2026") | Site | S per page | Yes | Partly done |
| 10 | **Third-party mentions**: work 04 at 5 emails a day; expect about 1 in 4 to convert | Owner | M | Partly | Named on 1 list |
| 11 | **YouTube demos**, one per job (COD confirmation, COD to prepaid, cart recovery, P&L), 2 to 4 minutes, title = the prompt. Video on our pages cannot be indexed (no watch page, 10 Nov finding), YouTube can | Owner | M | Yes | 0 demos |
| 12 | **One public case study** with merchant name and numbers | Owner | M | Needs merchant sign-off | 0 |
| 13 | Do **not** add more self-ranked "best apps" posts, llms.txt tweaks or AI-schema tricks: llms.txt and llms-full.txt already exist (Verified) and do not get a page retrieved | n/a | n/a | n/a | n/a |

---

## 4. What we cannot control

| Item | Why |
|---|---|
| Which pages an assistant retrieves | Retrieval is the assistant's own search; results vary by day, phrasing and model. Estimate |
| Vendor listicles (Zoko, QuickReply, AiSensy, go4whatsup, Spur, Kanal) | They rank and are retrieved, and will not add a rival |
| App Store review velocity | Depends on merchant volume and goodwill; reviews cannot be bought or incentivised under Shopify rules |
| Training-data snapshots | Models without browsing reflect the web as of their cutoff; a 46-day-old brand is simply not in them. Estimate |
| Forum and Reddit threads | Reddit is blocked to my tools; I could not read what Indian founders say there |

**Measure it** (weekly, by hand, 10 minutes): ask the three prompts above in ChatGPT, Perplexity, Gemini and Copilot; log named / not named / described how. The OpenSEO AI tracker did not run on 9 Nov (10 Nov audit); owner to decide whether to keep paying for it (about $23 a month).

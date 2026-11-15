# Who buys, and how they actually find a tool like ours (15 Nov 2026)

Verified = fetched or searched on 15 Nov 2026. Estimate = judgement. Search results are US-biased. Reddit is blocked to my tools, so nothing here is a Reddit reading.

## The buyer

Founder or growth lead at an Indian Shopify D2C brand, 100 to 1,500 orders a month, 50% or more COD. No engineer, one or two people on ops. Feels the problem as RTO cost and unanswered WhatsApp chats, not as "I need WhatsApp automation". Price-sensitive in rupees; compares by monthly bill, not by feature list. (Estimate, consistent with the 5 Nov autosuggest work.)

## The journey, with evidence

| Step | What they do | Evidence (15 Nov 2026) |
|---|---|---|
| 1. Trigger | An RTO bill, a courier remittance statement, or a peer saying "we confirm COD on WhatsApp" | Autosuggest (5 Nov): "how to reduce rto in shopify", "fake cod orders", "cod to prepaid conversion". Estimate for the peer part |
| 2. App Store search | Types "whatsapp", "cod", "abandoned cart" inside the Shopify App Store and sorts by reviews | Verified: listings themselves rank on Google for "shopify whatsapp automation" and "cod to prepaid shopify". The App Store search page would not load for my tool (429), so order inside the store is **not verified** |
| 3. Shortlist by reviews | Opens 3 to 5 listings, reads the newest and the 1-star reviews | Verified review counts below. Negative reviews are read: an Interakt reviewer writes that cart messages "never work" and that they moved to AiSensy (search snippet) |
| 4. Compare on Google | "X pricing", "X alternative", "X vs Y" | Verified: wati pricing 2,400, interakt pricing 1,900, aisensy pricing 1,600 a month. SERPs are vendor posts and directories (G2, Capterra, TrustRadius, SoftwareSuggest, SaaSworthy) |
| 5. Ask an AI assistant or a peer | "best WhatsApp app for Shopify India", asked in a founder WhatsApp group or to an assistant | Verified proxy: for that prompt the cited pages are digismoothie.com (list and our own app page), go4whatsup.com, bot.space, egrow.com, easysellapp.com and App Store listings. Communities run on WhatsApp, not Slack or Discord: D2C Insider, Razorpay Rize D2C (search result) |
| 6. Trial | Installs from the App Store, 14-day trial, connects the number | Our listing: from $19 a month, 14-day trial (Verified) |

## What the App Store shows (Verified by fetching each listing unless marked)

| App | Rating | Reviews | From | Launched |
|---|---|---|---|---|
| Dondy | 4.9 | 833 | Free, then $6.99 | Mar 2023, **Built for Shopify** |
| Bitespeed | 4.6 | 408 | Free to install | Oct 2019 |
| Interakt (Sell on WhatsApp) | about 4.0 | 271 | n/a | search snippet, not fetched |
| CK Carthike | 4.9 | 262 | Free plan | search snippet |
| Ctx (Softpulse) | 4.9 | 246 | Free trial | search snippet |
| QuickReply.ai | 4.9 | 218 | $59 | Mar 2021 |
| Whapi | 5.0 | 39 | $18.99 | May 2025 |
| Updatrr (closest peer) | 5.0 | 37 | $29.99 | Dec 2024 |
| GetGabs | 4.4 | 15 | Free, then $11 | Apr 2025 |
| **TopEdge AI** | **0.0** | **0** | $19 | **30 Sep 2026** |

Shopify's "Useful apps for India" collection (Verified): 17 apps, including CW WhatsApp (4.6, 247), SuperLemon (3.5, 343), Cashfree CODFIRM (4.7, 50), Shiprocket (3.9, 649). We are not in it. Several India staples sit at 3.5 to 3.9 stars, so a 5.0 with even 10 honest reviews would stand out.

Two things this table says. A 23-month-old peer (Updatrr) reached 37 reviews, so **10 to 15 reviews in 60 days is a realistic target, not 100**. And an app with 39 reviews holds a top Google result for "shopify whatsapp automation": review count on the listing is an SEO asset, not only a conversion one.

## Community threads (Verified)

One Shopify Community thread ranks on Google for "whatsapp abandoned cart recovery shopify": community.shopify.com/t/whatsapp-abandoned-cart/582453 (Jan to Aug 2026). The asker wants an app with Cloud API support, templates and analytics. Replies: Updatrr (written as a user), Efsun and WhatWali (vendors naming their own app). No India-specific recommendation thread surfaced in my searches; that is a limit of the tool, not proof none exist. The owner should search community.shopify.com and r/shopify, r/IndianStartups, r/ecommerce by hand once.

## The 5 surfaces that decide the purchase, and where we stand

| # | Surface | What decides it | Our status, 15 Nov 2026 | Controllable? |
|---|---|---|---|---|
| 1 | **Shopify App Store listing** | Review count, rating, recency, "Built for Shopify" badge | 0 reviews, 46 days old, listed under "Abandoned cart" only. Privacy link still points at dash.topedgeai.com | Yes. Biggest single gap |
| 2 | **Third-party "best apps" lists** | Being named, with a link | Named on 1 (Digismoothie, 5th). Absent from 15+ lists read today: Sumtracker, Logbase, MageComp, the4, Growave, Meetanshi, Retainful, bot.space, AiTrillion, The D2C Pulse | Partly: outreach, about 1 in 4 converts |
| 3 | **Google comparison queries** (pricing, alternative, vs) | A dated, rupee-priced page that answers in two lines | 3 pricing pages (5 to 6 days old), 10 alternative posts, 6 on page 1 | Yes, but page age cannot be rushed |
| 4 | **AI assistants** | Which third-party pages they retrieve; entity consistency | Appear when Digismoothie is retrieved; described as "newer app, less track record". See `05-ai-visibility.md` | Indirectly, through surfaces 1 and 2 |
| 5 | **Peer word of mouth** (founder WhatsApp groups, D2C Insider, Rize, YouTube demos) | A known merchant saying "we use it" | 3 named merchants, 0 public case studies, 0 YouTube demos | Slowly. Needs merchant sign-off |

**One line:** the buyer decides on surfaces we do not own. Four of the five are off-site, and the first one (reviews) gates the other three.

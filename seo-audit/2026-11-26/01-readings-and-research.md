# Day 9 readings and research, Thu 26 Nov 2026

The owner's prompt said 25/11/26; the machine clock and the log say Thu 26 Nov 2026 (Day 8 ran on 25 Nov). Every reading below is dated 26 Nov 2026. All labels: **Verified** = read today from the named tool or page.

## Search Console (OpenSEO, project 852f0ce0)

- `inspect_urls` (Verified): all 9 pages indexed, "Submitted and indexed": the Day 8 pages (order notifications LP, cart-app post, Bitespeed, Zoko, Dondy boards, last crawled 25 Nov) and today's pages (RTO post, last crawl 20 Nov; Updatrr board 20 Nov; Getgabs board 25 Nov; Kanal board 13 Nov).
- India striking distance, 27 Oct to 23 Nov, position 8+, 3+ impressions, spa excluded: 112 rows, saved in `02-gsc-striking-distance-india.md`.
- **RTO post** (`/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation`): 119 impressions, 1 click, average position 8.9 over 3 months (all countries), but only 5 named queries with 1 impression each. India, 28 days: 3 impressions at 8.7. **The plan row's "how to reduce rto 16 @ 11.3" is the 10 Nov CSV's 90-day page total, not a query.** The page does not rank for "how to reduce rto" today (not in the India top 10, see SERP below).
- RTO cluster pages, 3 months: /blog/rto-meaning-ecommerce 459 impr @ 8.7 (definitions, trap queries), /blog/cod-rto-benchmark-india-2026 372 @ 5.1, RTO post 119 @ 8.9, /tools/rto-cost-calculator 46 @ 5.7, /blog/cod-confirmation-whatsapp-reduce-rto-shopify 20 @ 12.5.
- **Compare boards, 3 months:** /compare/updatrr 9 impressions, all noise ("crm cleaning", "gupshup" operator queries). /compare/getgabs: getgabs alternatives 11 @ 7.4, getgabs pricing 4 @ 7.5 (the blog post holds getgabs alternatives 27 @ 4.7). /compare/kanal: getkanal alternatives 37 @ 5.1, kanal-ai 5 @ 12.6, getkanal 1 @ 8 (the blog post holds getkanal alternatives 923 @ 2.0, non-India noise per PLAN section 1).

## Keyword metrics (OpenSEO `get_keyword_metrics`, India 2356, en; 60 keywords in one call)

| Keyword | India volume / month | KD | Owner page |
|---|---|---|---|
| how to reduce rto in ecommerce | 90 | 42 | RTO post (Track A) |
| reduce rto | 40 | - | RTO post |
| how to reduce rto | 30 | - | RTO post |
| rto reduction | 30 | - | /rto-reduction-shopify (Track B) |
| cod rto | 30 | - | RTO post (secondary) |
| rto cost | 50 | - | /tools/rto-cost-calculator |
| ndr management | 70 | - | not ours (we do not handle NDR) |
| rto management | 20 | - | /rto-reduction-shopify (secondary) |
| cod order confirmation / cod verification | 20 / 20 | - | /features/cod-confirmation |
| gokwik rto, rto prediction, cod to prepaid | 10 each | - | mentions only |
| kanal | 4,400 | 22 | navigational for the brand; not a board query |
| getgabs | 1,600 | 23 | navigational |
| kanal review, kanal whatsapp | 10 each | - | /compare/kanal FAQ |

No volume returned for: reduce rto shopify, rto reduction shopify/app/tool/software, how to reduce cod rto, updatrr (all forms), getgabs pricing/review, kanal pricing, getkanal pricing. Search Console beats volume tools on these small queries.

## Live India SERPs (OpenSEO `get_serp_results`, mobile, finalUrls; and Google in the built-in browser for People Also Ask)

**how to reduce rto** (mobile): 1 base.com tag page, 2 chirai.dev guide, 3 Instagram reel, 4 productgrowth.in checklist, 5 getstoredecoded (broken page), 6 aasaan.app "11 easy steps", 7 businessupturn.com, 8 LinkedIn post, 9 manorinfinity.com, 10 ecomcoach.in. AI Overview, People Also Ask, videos and short videos shown. **Go**: small sites and social posts; TopEdge AI not in the top 10.
People Also Ask (Google, gl=in, read in the built-in browser): "How to reduce rto in ecommerce?", "How to avoid rto in dropshipping?", "How to reduce RTO in Flipkart?" (marketplace, not ours), "How to refund money from rto?" (consumer, not ours).

**rto reduction** (mobile): 1 Facebook video, 2 manorinfinity.com, 3 getstoredecoded, 4 businessupturn, 5 ecombeyonddropship.com, 6 Instagram, 7 YouTube short. **Go.**

**reduce rto shopify** (mobile): 1 riseupecom.in, 2 businessupturn, 3 indiacrm.in, 4 Reddit r/shopify_geeks, 5 eshopbox.com/rto-reduction (vendor), 6 theshopmate.com, 8 zoomwey.in, 9 suryawave.com, 11 shift.in. **Go.**
Google desktop "rto reduction shopify" (built-in browser): Shopify App Store "reduce-rto" app, **updatrr.com/features/reduce-rto** (Updatrr has its own RTO landing page), theindustryoutlook.com list, hillteck.com checklist, reducerto.com, cashfree.com, indisell.io, Shiprocket Engage listing. AI Overview names checkout filtering, pre-dispatch confirmation, prepaid incentives and NDR management. People Also Ask: "How to avoid rto in dropshipping?", "How to reduce rto in eCommerce?".

## RTO sources re-read 26 Nov 2026 (built-in browser)

- **Unicommerce India D2C Report 2026** (unicommerce.com/india-d2c-report-2026-april/): 6,000+ brands, 410M+ shipments, FY2026. RTO 39.2% at the November 2025 festive peak, 25.6% January 2026, 21.0% March 2026 for brands running three changes at once (prepaid incentive at checkout, pin-code-level courier routing, address verification before dispatch). "During the festive quarter, COD orders returned at 58%. Prepaid orders? Under 15%." "66% of your next wave of customers lives outside a metro" (the Tier 2 and 3 finding itself is behind the download). A prepaid incentive "converts 20 to 30% of COD intenders". **Verified, unchanged.**
- **Amazon Shipping India, RTO guide**: ₹180 to ₹240 logistics-only cost per RTO (forward, reverse, handling), labelled an illustrative industry estimate (bepragma.ai 2025); ₹450 to ₹680 acquisition cost for a buyer who refuses at the door; Shipway ShipNotes FY25: about 26% RTO on COD against under 2% prepaid; orders attempted within 1 to 2 days 22% RTO, 35% after 5+ days. The Vadodara 18% line in sources.ts is **no longer on the page** (not used on the post).
- **Amazon Shipping India, NDR guide**: the 36-hour rule (now attributed to ClickPost's NDR and RTO guide), contact the buyer within 2 to 4 hours, couriers make two to three attempts, 24 to 48 hours between attempts. **Verified.**
- **First Resort** (2026 fashion returns research): ClickPost ₹150 to ₹300 direct and ₹450 to ₹900 fully loaded per RTO parcel; GoKwik: 60% to 70% of RTOs from low buying intent, 20% to 25% from genuine logistics issues, India average RTO 23.18% (180M+ shoppers), COD RTO near 26% against prepaid under 2%. **Verified.**
- **Meta pricing documentation** (now served at developers.facebook.com/documentation/business-messaging/whatsapp/pricing): "Updated: Nov 18, 2026"; free tier of 1,000 service messages a month per business phone number since 1 October 2026, charged from the 1,001st; eligible Indian businesses must migrate to INR by 31 December 2026, after which Meta stops delivering non-INR accounts' messages. The INR list-rate file is an .xlsx download, not opened today; the India card (₹0.8631 marketing, ₹0.115 utility) stays as read on 16 November 2026 (sources.ts `metaPricing`).

## Competitor readings for Track C, 26 Nov 2026

**Updatrr**, updatrr.com/pricing (one view; no billing toggle, annual "contact the team"): Growth $29.99, Pro $49.99, Pro AI $99.99 a month; 7-day free trial, no card; country-wise pricing inside the dashboard. Growth: abandoned cart reminders, COD confirmation reminders, order, shipment and payment updates, broadcasts, brand number on the API, assisted onboarding. Pro adds browse reminders, no-code chatbot, WhatsApp catalog commerce, review and repeat-purchase reminders, carousel templates, conversion tracking and smart retry. Pro AI adds AI chatbot with human handover, AI voice calling, unified WA/IG/FB inbox, mobile app, 10 members. Team members 1 / 3 / 10. Pricing FAQ (and its FAQPage JSON-LD): "Updatrr does not add a markup on Meta’s conversation fees." **The sources.ts line "The page no longer carries a no-markup line" is wrong and is corrected today.**
Updatrr Shopify listing, apps.shopify.com/prizma-updatrr (Prizma Commerce, Gurgaon, launched 10 Dec 2024): **5.0 from 45 reviews** (44 five-star, 1 three-star); Growth $29.99, Pro $49.99, ProAI $99.99, "All charges are billed in USD"; 7-day trial on Growth and Pro, **15-day trial on ProAI** on the listing; the listing puts the unified inbox on Pro as well as ProAI (the website puts it on Pro AI only); names COD confirmation on WhatsApp or by AI voice call; works with GoKwik, Shiprocket, Razorpay, Shopflo, Breeze and Flexype checkouts. Updatrr also runs updatrr.com/features/reduce-rto (seen in Google, not opened).

**Getgabs**, getgabs.com/pricing/, monthly view: Basic ₹699 (admin only, 30,000 broadcasts), Plus ₹1,499 (10 users, 5,00,000 broadcasts), Business ₹2,999 (20 users, 15,00,000 broadcasts), Enterprise custom; every plan "0% Markup", free onboarding. Annual view: ₹6,990, ₹14,990 and ₹29,990 a year ("2 months free"). Meta cost listed as marketing ₹0.8631, utility ₹0.115, service ₹0.115 after 1,000 a month. Plan table: Shopify App is an add-on on Basic and included on Plus and Business; order update notifications and abandoned checkout reminders are ticked on Plus, Business and Enterprise only. No COD confirmation or COD to prepaid row. The page still says "Meta charges additional fees on a per-conversation basis" (Meta bills per message since 1 July 2025).
Getgabs Shopify listing apps.shopify.com/getgabs-whatsapp-chatbot-api: **"This app is not currently available on the Shopify App Store."** (unchanged from 24 Nov).

**Kanal**, getkanal.com/pricing (one view, "no commitment"; no yearly toggle): Pro 89€ (1 user, widget and inbox, cart recovery, campaigns), Scale 149€ (5 users, segments, unlimited and advanced automations, Klaviyo, Kanal MCP, AI agent, integrations), Business 350€ (done for you: flow setup by Kanal's experts, account manager, unlimited users), Agency 1,900€. Channels WhatsApp, RCS, iMessage, SMS. EU hosting, GDPR, "Official Meta Business Partner", founded 2023 (Organization schema). No published per-message rate or markup statement on the page.
Kanal Shopify listing apps.shopify.com/kanal-marketing-ai (KANAL SAS): **5.0 from 153 reviews** (all five-star); Demo free, Pro $89, Scale $149 ("Everything in Pro, unlimited users" on the listing vs 5 users on the website), "Multi-market: +$50/month per market", "All charges are billed in USD"; languages French, English, Spanish, Italian, German, Portuguese; lists order confirmation on WhatsApp and COD verification among features.

**TopEdge AI** listing apps.shopify.com/topedge-ai: 0.0 (0 reviews), from $19 a month. **Verified.**

## Ahrefs

`app.ahrefs.com/site-audit/10574646/overview` redirected to the sign-in page: "You’ve been signed out because this account is being used on another device." Not read today. Owner to sign in.

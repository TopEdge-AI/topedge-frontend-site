# Master findings, 2026-11-02 (OpenSEO premium run)

Everything below is verified today. Where I previously said something
different, the correction is marked.

---

## A. Corrections to my own earlier work

**A1. The 25 festival pages. I was wrong.** I said Google had "crawled and
declined" them and recommended consolidation. They were published **1 November,
the day before**. "Discovered, currently not indexed" is the normal state for a
day-old URL, and "zero impressions in 3 months" is meaningless for a page that
existed for one day. **Change nothing. Re-inspect 16 November.** Full retraction
in `10-positioning-and-onpage-audit.md` §3.

**A2. The "56 shopify.com backlinks" to DelightChat.** I called this the most
valuable gap in the category. I pulled all 56: **53 are one blog post
(`/blog/average-order-value`) republished in ~30 country locales, every one
`nofollow`.** One mention from 2023, counted 53 times. Corrected in
`11-backlink-playbook.md` §3.

---

## B. What the business actually is

Read from the product, not from the marketing. The 13 feature pages cover cart
and COD journeys, campaigns, customer CRM, a Shopify pixel, opt-in capture, AI
replies, template compliance, warranty claims, and **net profit after COGS, COD
fees, RTO, gateway charges and ad spend**.

That last one settles it. No WhatsApp API vendor ships a unit-economics P&L.

**TopEdge is an India-specific Shopify ecommerce operations and retention app.
WhatsApp is the delivery channel, not the category.** Peer set: Updatrr,
Bitespeed. Not WATI, AiSensy or Gupshup, which are BSPs.

---

## C. The category traffic reality (this is the big one)

India organic traffic, verified today:

| Domain | Organic traffic/mo | Ranked keywords |
|---|---|---|
| wati.io | **16,260** | 1,123 |
| delightchat.io | **7,320** | 555 |
| **bitespeed.co** | **359** | **4** |
| **topedgeai.com** | **2** | **3** |

At first glance this says "be like WATI". **It does not.** I pulled
DelightChat's actual ranked keywords. Their 7,320 visits come from:

| Keyword | Volume | Their position | Intent |
|---|---|---|---|
| whatsapp business web | 135,000 | 6 | navigational |
| glowroad | 14,800 | 2 | navigational (someone else's brand) |
| whatsapp qr code png | 22,200 | 20 | informational |
| how to schedule messages on whatsapp | 6,600 | 3 | informational |
| whatsapp link generator | 8,100 | 16 | navigational |
| tawk to | 8,100 | 20 | someone else's brand |

Almost none of it is commercial. **That traffic is people looking for WhatsApp
Web, QR code images and how to schedule a message.** It is the same shape of
worthless volume as the salon queries: big numbers, no buyers.

And Bitespeed, a genuine well-funded Shopify app, ranks for **4 keywords**.

**Conclusion: qualified organic demand for this category in India is small, and
the large numbers in the category are unqualified.** The people who buy Shopify
apps mostly do not use Google for it. They browse the **Shopify App Store**,
they ask an **AI assistant**, and they read **"best tools" listicles**.

This is the single most important strategic fact in this audit, and it means
"get more organic traffic" is the wrong goal. The right goal is to be present
and credible on the three surfaces where buyers actually decide.

---

## D. Google's own view confirms the positioning problem

From Search Console, 3 months:

| Query shape | Example | Position |
|---|---|---|
| "**shopify** … app" | abandoned cart recovery shopify app | **64.8** |
| | best shopify abandoned cart app | **62** |
| "**whatsapp** …" | best shopify whatsapp app | **7** |
| | whatsapp cod | **7** |

Sitewide the copy says WhatsApp **3,272** times against Shopify **2,415**, and
11 of 13 feature pages led with WhatsApp. Google has classified accordingly.

**Fixed today:** homepage plus nine feature titles re-led on the Shopify job,
with WhatsApp kept as the channel. Not removed, re-ordered.

---

## E. Site audit: 160 pages, zero critical, zero warnings

OpenSEO full crawl with Lighthouse on 20 pages. Everything it found is
**info** severity:

| Issue | Count | Verdict |
|---|---|---|
| heading-order-skip | 30 | Real but minor. h1 → h3 on template/journey cards. **Not fixed**: it touches the new festival pages and needs a careful component change, not a blind edit. |
| title-too-long | 29 | **Not a defect.** OpenSEO uses a 60-char rule; this repo's own contract is 65 and every title passes it. Ignore. |
| noindex-page | 5 | `/login`, `/signup*`. Intentional and correct. |

No broken links, no redirect chains, no duplicate titles or descriptions, no
canonical conflicts, no thin-content flags, no orphan pages, no server errors.
**The technical programme is finished.** Three independent crawls now agree.

---

## F. Shopify links, answered properly

**Do reviews act as links? No.** Reviews sit on your listing page. They create
no link to topedgeai.com. They matter for conversion and for App Store search
ranking, which is a different and probably more valuable thing.

**Your listing already carries dofollow links.** From its markup today:

| Slot | Target | Attribute |
|---|---|---|
| Pricing | topedgeai.com/pricing | nofollow |
| Website | topedgeai.com | **dofollow** |
| Docs | dash.topedgeai.com/docs | **dofollow** |
| Privacy | dash.topedgeai.com/privacy | **dofollow** |

**Free win: two of your three dofollow slots point at the wrong host.** Docs
moved back to `topedgeai.com/docs` and that page is live and indexed, but the
listing still points at `dash.topedgeai.com/docs`. Change it in the Partner
dashboard and a DR-96 dofollow link moves onto the domain you want to rank.

---

## G. AI visibility (in progress)

Tracker created: 20 prompts across 6 topics, 5 engines (ChatGPT, Gemini, Google
AI Overviews, Claude, Perplexity), India, with your competitor set.
One-off run started at a cost of $6.02.

**At the time of writing the run is 12/100 complete, so there is no baseline
yet and I am not going to characterise it from a partial sample.** Early brand
prompts show TopEdge mentioned and cited by ChatGPT, Gemini and Google AI
Overviews. The neutral (non-brand) prompts are where the real answer lies and
too few have returned.

The tracker is on a **weekly** schedule, next check 9 Nov, which costs about
**$23/month**. Pause it with `set_ai_visibility_schedule` if that is not wanted.

---

## H. What to do, in order

**This week, you:**
1. Fix the App Store docs link → `topedgeai.com/docs` (§F). Five minutes.
2. Upload the disavow file. 37 verified spam domains.
3. Ask the 5 Trustpilot reviewers + 3 named merchants for App Store reviews.
   This is now the highest-leverage item you own, because §C says the App Store
   is the real discovery surface, not Google.
4. Correct the G2 profile description (you have the profile already).

**This month, me:**
5. Rebuild the 11 thin feature pages on the `cod-confirmation` / `profit-loss`
   pattern (720 median words today, those two run 1,288 and 1,321 with 33 and
   41 rupee figures).
6. Finish the title re-framing beyond the 10 done today.
7. Re-inspect the festival family on 16 Nov and decide then.
8. Read the finished AI visibility baseline and act on the source gap.

**Deliberately not doing:**
- Chasing WhatsApp utility volume (§C). It is the salon traffic again.
- Any further technical or on-page audit (§E).
- Touching the festival pages before 16 Nov (§A1).

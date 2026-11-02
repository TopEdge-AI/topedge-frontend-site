# Can we copy a competitor's backlinks automatically?

**2026-11-02.** Answers one question: we can see every domain linking to
Bitespeed and Updatrr — can we just point those at us too, or is it outreach
only? Built from live OpenSEO/DataForSEO pulls plus direct fetches of the
pages themselves, not from estimates.

---

## 0. The short answer

**No. There is no mechanism that makes a third-party site give you a dofollow
link automatically.** The link lives in someone else's HTML. Only three things
put it there:

1. **You put it there** — you fill in a profile, listing or submission form on
   a site that invites it. No permission needed, no email sent.
2. **A machine puts it there** — the site crawls the Shopify App Store or a
   tech-detection index and generates a page about you with no human involved.
3. **A person chooses to put it there** — editorial, roundups, comparison
   pages, PR. This is the only one that needs outreach.

Anything advertised as "automatic dofollow backlinks" is category 4: paid link
networks. That is exactly what the 37 domains in `disavow-UPLOAD-THIS.txt`
are. Do not buy more of the problem we are currently cleaning up.

**The useful finding is that categories 1 and 2 are most of what our closest
peers actually have.** So "copy the competitor" is largely achievable without
sending a single email — just not by any automatic mechanism.

---

## 1. What the closest peer's link profile is actually made of

**Updatrr — the nearest peer we have — has 8 dofollow referring domains in
total.** Six are self-serve or machine-generated:

| Domain | DR | How it got there |
|---|---|---|
| apps.shopify.com | 96 | The website field on their App Store listing |
| storeleads.app | 88 | Machine. Indexes every Shopify app |
| saashub.com | 79 | Self-submit |
| peerpush.net | 65 | Self-submit |
| shopdigest.com | 16 | Machine. Shopify app directory |
| launchintel.pro | — | Machine |

The other two are junk (`seozens.info`, `robuta.com`, spam 25–35).

**That is the whole thing.** The peer we are closest to in product and market
has no earned links at all. Their profile is a Shopify App Store listing plus
two submissions.

Bitespeed is bigger, and the shape of their 145 dofollow domains splits like
this:

| Category | Share | Needs outreach? |
|---|---|---|
| One press release, syndicated | ~35 domains | No — it is one purchase |
| Self-serve directories and profiles | ~30 domains | No |
| Competitor comparison / "alternatives" pages | ~10 domains | Yes |
| Genuine editorial | ~9 domains | Yes |
| Spam | ~7 domains | Avoid |

So roughly **two thirds of Bitespeed's dofollow profile needed no outreach
either.** Their editorial links are the minority, and most of those followed
funding and ARR announcements we have no equivalent of.

---

## 2. Two links we already have and have not been credited for

Checked by fetching the pages directly today:

**`apps.shopify.com/topedge-ai` already links to us dofollow.**

```
https://topedgeai.com            rel="noopener noreferrer"   → dofollow
https://dash.topedgeai.com/docs  rel="noopener noreferrer"   → dofollow
https://dash.topedgeai.com/privacy                           → dofollow
https://topedgeai.com/pricing    rel="nofollow noopener"     → nofollow
```

This is a DR 96 dofollow link. It is the single highest-authority link either
competitor has, and we have it already. It is simply not in the backlink index
yet — Bitespeed's equivalent was first seen in April 2025, so these take time
to surface.

**`storeleads.app/reports/shopify/app/topedge-ai` also already links to us
dofollow**, same situation.

**Action: none.** Do not go looking for these. They exist. They will appear in
OpenSEO when DataForSEO next crawls those pages. The only thing worth doing is
not breaking them — the App Store listing's website field is the live source
of the DR 96 link, so it must keep pointing at `https://topedgeai.com`.

This also means the three Shopify-app-directory links we already have
(`letsmetrix.com`, `heyapps.dev`, `shoplist.co`) arrived by category 2 — a
machine found the App Store listing. More of those will keep arriving on their
own as long as the listing is live.

---

## 3. The self-serve gap list — no outreach, do these yourself

Every one of these links to a competitor and does not link to us. All are
category 1: fill in a form, get a link. Verified against the competitor pulls.

| Target | DR | Links to | Note |
|---|---|---|---|
| **saashub.com** | 79 | Updatrr, others | Confirmed we are **not** listed. Closest peer has it. Start here. |
| **peerpush.net** | 65 | Updatrr | Self-submit. Updatrr's entry is literally `/p/shopify-whatsapp-automation` — our exact category. |
| **wappalyzer.com** | 65 | Bitespeed | Confirmed absent from their cart-abandonment list. Tech-detection; submit the app. |
| **crunchbase / dealroom.co** | 70 | Bitespeed | Entity corroboration more than link value. |
| **cbinsights.com** | 66 | Bitespeed | Company profile. |
| **reviewbolt.com** | 59 | Bitespeed | Auto-generates from domain; claimable. |
| **growjo.com** | 50 | Bitespeed | Company profile. |
| **stackfox.co / ful.io / brands.dataease.ai** | 36–52 | Bitespeed | Tech-stack directories, machine-generated, submittable. |
| **aeroleads.com / salesfueldata.com** | 52–66 | Bitespeed | B2B data directories. |
| **yourstory.com/brands** | 72 | Bitespeed | India startup profile, self-serve brand page. |
| **beststartup.in / startupintros.com / founderlodge.com** | 30–35 | Bitespeed | India startup listings. |

Plus one category worth noting separately: **job boards**. Bitespeed has
dofollow links from `jobs.weekday.works`, `app.qureos.com`,
`jobs.partnershipleaders.com` and `airtribe.live` purely because they posted
roles. If TopEdge is hiring anyway, post the roles on India startup job boards
rather than only on LinkedIn.

**Rule for all of them**, carried over from `11-backlink-playbook.md` and
still the most important line in it: identical name, identical category, and
this sentence verbatim —

> TopEdge AI is a Shopify app for Indian D2C brands that automates abandoned
> cart recovery, COD confirmation and order updates over WhatsApp and email.

---

## 4. The outreach-only set, and why it is the one worth doing

These are the links that genuinely cannot be self-placed — and they are also
the only ones in either profile with real topical relevance:

| Page | What it is |
|---|---|
| `whatflow.tech/compare/whatflow-vs-bitespeed` | Competitor's own comparison page |
| `spurnow.com/compare/bitespeed-alternative` | Same |
| `chatmitra.com/chatmitra-vs-bitespeed` | Same |
| `quickreply.ai/others/bitespeed-pricing` | Same |
| `deepsolv.ai/blog/bitespeed-vs-deepsolv...` | Same |
| `wappbiz.com/blogs/doubletick-alternatives` | Roundup |
| `interakt.shop/blog/best-whatsapp-software-for-marketing` | Roundup |
| `wati.io/es/blog/omnichannel-marketing-platforms` | Roundup |

Note what this is: **Bitespeed's competitors link to Bitespeed dofollow**,
because a credible "X vs Y" page has to link to Y. We already publish the
mirror image of these pages (`/compare/*`, `/blog/*-alternative-*`). We are
giving those links out and receiving none back.

The realistic ask is the roundup, not the comparison page. Nobody adds a rival
to their own vs-page on request. But `wappbiz.com/blogs/doubletick-alternatives`
is a list, lists get updated, and the pitch for inclusion is a fact none of
the incumbents can state: **0% markup on Meta conversation rates, and a P&L
view that computes net profit after COGS, COD fees, RTO and gateway charges.**
That is the one line in `12-MASTER-FINDINGS.md` that no BSP can copy.

Draft templates already exist in `seo-audit/2026-11-02/outreach/`.

---

## 5. What NOT to copy

**Bitespeed's press-release syndication.** About 35 of their 145 dofollow
domains are a single article — "BiteSpeed crosses $8M ARR, grows 3x YoY, turns
profitable" — reprinted verbatim across `haryananewstime.in`,
`keralanewsjournal.in`, `tripuranewspoint.in`, `mizoramnewsvoice.in` and
thirty more. Every one DR 39–46, first seen within weeks of each other, many
carrying `?utm_source=chatgpt.com` on the target URL.

That is one paid wire distribution. It inflates the referring-domain count and
is the easiest footprint in the world for Google to cluster and discount. It
is also, structurally, the same thing as the 37 domains we are about to
disavow — bought placement, no editorial decision, no reader.

More to the point: **we have no $8M ARR announcement to syndicate.** The
tactic is cheap to buy and worth roughly nothing without the news. Skip it.

---

## 6. Order of work

1. **Nothing** on `apps.shopify.com` and `storeleads.app`. Already done, just
   uncredited. Keep the App Store website field pointing at the root domain.
2. **Upload the disavow file.** Still the highest-value single action and it
   needs no one's permission. `disavow-UPLOAD-THIS.txt`, 37 domains.
3. **saashub.com and peerpush.net.** Our closest peer's only two earned-by-form
   links, and we are absent from both. An hour, total.
4. The rest of the self-serve table in section 3, in DR order.
5. Roundup outreach from section 4 — slowest, but the only links on this page
   that are topically about what we sell.

Sections 1 to 4 require no reply from anyone. That is the honest version of
"can we do it automatically": not automatic, but unilateral, which is nearly
as good and is most of what the competition has.

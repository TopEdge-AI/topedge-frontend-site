# Phase 0 — setup, tool discovery, baseline

**What I found:** OpenSEO connected (hosted, 500 credits) but with **no project** —
created `TopEdge AI` / topedgeai.com (id `852f0ce0-39cf-43e3-9b80-84ff3449a4a8`).
**What I fixed:** one Class A text-extraction defect on `/compare`.
**What is blocked:** Google Search Console is **not** connected to the OpenSEO
project — the one access gap this session could not close.
**What I need from you:** connect GSC (free, minutes); it unblocks all
position/CTR/coverage work. Then App Store reviews, then listicle outreach.

---

## Tool discovery
OpenSEO MCP exposed ~90 tools. Groups confirmed present and used today:
`research_keywords`, `get_serp_results`, `get_backlinks_overview`,
`get_domain_overview`, `find_serp_competitors`, `get_ranked_keywords`,
`list_projects` / `create_project`, `update_project_context`,
`list_search_console_sites`, `get_search_console_performance`, `inspect_urls`.

**Also available but not used, and why:**
- **AI visibility** (`run_ai_visibility_check`, `explore_prompt`,
  `get_ai_visibility_sources`, `save_ai_visibility_tracker`) — billed in USD
  separately from credits. You chose the manual route; see
  `05-geo-manual-protocol.md`.
- **Site audit** (`run_site_audit`) — skipped deliberately. `BASELINE-2026-10-25.md`
  verified all 71 URLs clean (0 metadata breaches, 0 missing alt, 0 pages
  without JSON-LD, all canonicals self-referencing) and I re-verified rendering
  on 5 key pages today. Spending credits to re-find nothing was not justified.
- **Rank tracker** — needs ongoing credit commitment; the one-off SERP pulls
  answered the same questions for ~5 credits each.

Other tools in session: web fetch via `curl`, built-in browser, repo access.

## Connection state
| Item | State |
|---|---|
| OpenSEO account | Connected, hosted, `moksh2031@gmail.com` |
| Project | Created today (none existed) |
| Credits | 500 → ~100 |
| **Google Search Console** | **NOT connected** (`list_search_console_sites` → empty) |
| GA4 | Not checked via OpenSEO |
| Project market | Created as 2840 (US); **all calls overrode to 2356 (India), en** |

## Repo / rendering baseline (Verified 2026-11-02)
- Site source: `topedge-frontend-site-update-pricing`, React 18 + Vite,
  Netlify, build `npm run build:netlify`.
- The workspace **root** is not a git repo; the site folder is. Branch
  `seo/audit-2026-11` cut from `update-pricing` as confirmed.
- Prerendering **works**: `/`, `/pricing`, `/compare`, `/integrations`,
  `/shopify-whatsapp-integration` all return 200 to a Googlebot UA with no JS,
  carrying title, exactly one H1, self-referencing canonical, JSON-LD, and
  984–2,000 words of body text. **No P0.**
- Build pipeline already includes sitemap, llms.txt, redirects, structured-data
  checks, image-weight checks, internal-link checks and IndexNow.

## Assumptions logged
1. Netlify deploys `update-pricing` — inherited from `BASELINE-2026-10-25.md`,
   which verified it by content-diffing live `robots.txt` against the repo. Not
   re-verified from the Netlify dashboard today.
2. India/English is the primary market; used `locationCode 2356` throughout.
3. Training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended)
   stay **allowed** — the brief's default, and no change was made to
   `robots.txt`.
4. Very low volumes (10/mo) are at the floor of provider reliability; treated as
   "effectively no demand" rather than as precise figures.

## Credit ledger
| Call | Credits (approx) |
|---|---|
| SERP batch 1 — 10 India queries (2 failed provider-side) | ~40 |
| Backlinks — topedgeai.com | ~50 |
| Keyword research — 3 India seeds @150 | ~162 |
| SERP batch 2 — 8 India queries | ~40 |
| Backlinks — delightchat.io | ~50 |
| SERP batch 3 — 2 brand queries | ~10 |
| Project create / context / whoami | 0 |
| **Total** | **~400 of 500** |

**Failed, not retried:** `whatsapp business api shopify india` and
`abandoned cart app shopify india` both returned
*"Internal SE Server Error. The data provider is temporarily unavailable"*.

## Deliverables in this folder
`EXEC-SUMMARY.md` · `00-setup.md` · `02-keyword-map.csv` ·
`05-ai-prompt-panel.csv` · `05-geo-manual-protocol.md` ·
`06-backlinks-plan.md` · `data/serp-batch1-india-2026-11-02.json` ·
`data/serp-batch2-india-2026-11-02.json`

Earlier dated audits in `seo-audit/` are **not** overwritten; this is a new
layer on top of them.

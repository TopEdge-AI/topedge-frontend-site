# Manual AI-visibility panel — protocol

You chose to skip the paid AI-visibility tracking, so this is the manual
equivalent. It produces the same baseline, costs nothing, and takes about
90 minutes for the 15 priority-1 prompts.

## Why this matters more than usual here
Verified 2026-11-02: an AI Overview appeared on **16 of 16** commercial India
queries pulled. The answer box is the result for this category. See
`EXEC-SUMMARY.md` §2.

## Method (keep it clean or the baseline is worthless)
1. **Logged out, or a fresh browser profile.** No personalisation, no history.
2. **Run each prompt 3 times.** Answers vary between runs; one run is an
   anecdote. The 2026-09-30 panel in `geo/rows.json` was 1 run per query, which
   is why it stayed directional.
3. **Record the date and the engine/model version.** Model updates invalidate
   comparisons.
4. Engines: **ChatGPT (search on), Google AI Mode / AI Overviews, Perplexity,
   Gemini, Claude (search on).**
5. Start with the 15 rows marked `priority,1` in `05-ai-prompt-panel.csv`.
   Prompts 6–10 are the brand prompts and are the most important given §1.

## Record per prompt/engine/run
| Field | Values |
|---|---|
| mentioned | Y / N |
| position_in_answer | 1st vendor named, 2nd, 3rd, listed-only, not-mentioned |
| url_cited | the topedgeai.com URL cited, or blank |
| accuracy | accurate / partly wrong / wrong — and what was wrong |
| competitors_named | all vendor names in the answer, in order |
| source_domains | every domain the answer cites |

## The column that matters most
`source_domains`. Aggregate it across all runs and you get the list of sites
the engines actually trust for this category. That list **is** the off-site
target list for §7 item 3 — it tells you which listicles to pitch, rather than
guessing. Expect overlap with the domains already found holding page 1:
`delightchat.io`, `updatrr.com`, `sabnode.com`, `magecomp.com`,
`softpulseinfotech.com`, `theindustryoutlook.com`, `hillteck.com`,
`pickyassist.com`, `botsailor.com`, `kwiqreply.io`, `ominiflow.com`,
plus `reddit.com` (r/shopify holds #8 for `whatsapp cart recovery shopify`).

## Cadence
Re-run monthly. Track three numbers per engine: **mention rate**,
**citation rate**, **share of voice vs named competitors**. Re-run before and
after any §7 change ships, and expect weeks of lag, not days.

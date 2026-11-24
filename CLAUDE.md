# TopEdge AI website — Claude rules

## Every change goes through claude-seo (no exceptions)

Any change, addition or edit to this site — a page, blog post, landing or compare page,
copy, meta tags, schema, images, sitemap, robots.txt, llms.txt, routes, redirects or
layout — must use the **claude-seo** plugin (`claude-seo@agricidaniel-claude-seo`, enabled
for this repo in `.claude/settings.json`). Do not do SEO, AEO or GEO from memory.

It provides 29 skills (`claude-seo:seo-*`), 20 sub-agents (`claude-seo:seo-*` agent types)
and a PostToolUse hook that validates JSON-LD on every Edit/Write. Bundled Python checks run
through `${CLAUDE_PLUGIN_ROOT}/scripts/claude-seo run <script>`.

Run the phases in order. Skip a phase only when it cannot apply, and say which and why.

1. **Plan** — `seo-plan`, `seo-cluster`, `seo-content-brief`, `seo-flow`, and `seo-drift`
   to capture a baseline before touching the page.
2. **Build** — `seo-page` (one page), `seo-competitor-pages` (vs / alternatives),
   `seo-programmatic` (pages at scale); `seo-schema`; `seo-images` + `seo-image-gen`;
   `seo-sitemap`; `seo-hreflang` only if multi-language.
3. **Verify** — `seo-audit`, `seo-technical`, `seo-content`, `seo-geo` (the AEO pass),
   `seo-agentic`, `seo-sxo`, then `seo-drift` against the phase-1 baseline.
4. **Conditional** — `seo-local` / `seo-maps`, `seo-ecommerce` / `seo-shopify`,
   `seo-backlinks` only when relevant.
5. **Live data** — `seo-google`, `seo-dataforseo`, `seo-bing` (+ IndexNow), `seo-posthog`
   when credentials exist; if a key is missing, say so instead of estimating.

Use the project skills alongside it: `topedge-positioning` (how TopEdge AI describes
itself), `google-search-policies` (before publishing), `topedge-landing-page`,
`topedge-compare-board`, `topedge-seo-day`, and the TopEdge blog SOP skill for blog posts.
The SOP and project skills govern look and copy; claude-seo governs ranking and citation.

Finish with a prioritized list: issue → severity → fix → where it was measured. Never
report a Core Web Vitals, E-E-A-T or schema result that was not actually run.

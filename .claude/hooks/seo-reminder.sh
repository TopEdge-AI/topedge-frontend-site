#!/usr/bin/env bash
# UserPromptSubmit hook: reminds Claude, on every prompt in this repo, to run the
# claude-seo skill set for any change to the TopEdge AI website. Plain stdout is
# added to Claude's context. Always exits 0 so it can never block a prompt.
cat <<'EOF'
[TopEdge site rule] If this request changes, adds or edits ANYTHING on the TopEdge AI website (page, blog post, landing/compare page, copy, schema, meta, images, sitemap, robots, llms.txt, routes, layout), use the claude-seo plugin skills end to end, not memory:
1 Plan: claude-seo:seo-plan, seo-cluster, seo-content-brief, seo-flow, seo-drift (capture baseline first)
2 Build: seo-page / seo-competitor-pages / seo-programmatic, seo-schema, seo-images, seo-image-gen, seo-sitemap (seo-hreflang only if multi-language)
3 Verify: seo-audit, seo-technical, seo-content, seo-geo (AEO), seo-agentic, seo-sxo, seo-drift compare
4 Live data when keys exist: seo-google, seo-dataforseo, seo-bing, seo-posthog
Also load the matching project skills (topedge-positioning, google-search-policies, topedge-landing-page, topedge-compare-board, topedge-seo-day, TopEdge blog SOP). Say which phase was skipped and why. Report only checks that were actually run.
EOF
exit 0

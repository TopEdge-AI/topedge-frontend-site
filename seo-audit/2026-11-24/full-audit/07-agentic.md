# 07 Agent-readiness audit: https://topedgeai.com (2026-11-24)

Read-only. Browser sandbox: no `sandbox: false` warning appeared in any run.
Standards facts checked 2026-09-23 per vendor-matrix.md (the plugin's own date; not re-verified today).

## 1. Lighthouse Agentic Browsing
Not available. Command: `claude-seo run lighthouse_agentic.py https://topedgeai.com --strategy both --json`
Result: both mobile and desktop returned PSI HTTP 429 (daily quota on the shared project; no API key configured). Fraction: unavailable, N unknown. Re-run after `/seo google setup` adds a key. Do not infer a score from the checks below.

## 2. Agent-UX heuristic (separate from Lighthouse)
Command: `claude-seo run agent_ux_check.py <url> --json` per page. Status: complete on all 10, score 100, 0 unnamed interactive nodes, 0 div-onclick widgets.
Pages: / (1274 a11y nodes), /pricing, /features, /features/journeys, /customers, /contact, /compare, /docs, /blog, /whatsapp-app-for-shopify.
Caveat: the heuristic only counts unnamed interactive nodes and unlabelled inputs. It does not test h1, heading order or focus order. Rows below marked "curl" come from my own parse of server HTML (script `an.py`, scratchpad), not from the plugin. The accessibility checks and visual behaviour were not tested in a real screen reader or keyboard run (Hypothesis where stated).

| Check | Result | Source |
|---|---|---|
| Landmarks | header, nav, footer, role=main present on all 5 sampled pages; /docs adds aside and role=search | curl |
| One h1 | Yes on /, /pricing, /contact, /docs, /features/journeys | curl |
| Heading order | No skipped levels on sampled pages (h1,h2,h3 only) | curl |
| Button names | 0 unnamed buttons; Products (aria-expanded=false, aria-haspopup), Open menu (aria-expanded, aria-controls=mkt-nav-mobile), Dismiss announcement all named | curl |
| Pricing toggle | role=tablist "Billing cycle", buttons Monthly/Quarterly/Yearly with aria-selected. No aria-controls/tabpanel link (minor) | curl |
| FAQ accordions | /pricing: 11 buttons with aria-expanded and aria-controls=mkt-faq-panel-N, first open | curl |
| Video | Hero video has aria-label, autoplay muted, with "Play full screen" and "Turn on sound" buttons. Feature clip videos are aria-hidden decorative (no controls) | curl |
| Contact form | /contact has no form: 0 inputs, 0 labels. Contact is via messaging links, so there is nothing to label and nothing for an agent to submit | curl |
| Docs search | input type=search has a label (1 label) but plugin flagged 1 input without aria (likely relies on the label) | ux_check, curl |
| Unnamed links | 5 per page, all in the home-trust-logos strip: the duplicated marquee copies are aria-hidden and tabindex=-1 (correct), 3 are href-less anchors. Real logo links have img alt. Not a defect | curl |
| Skip link | None found (`href="#main"` or `#content` absent) | curl |
| Reduced motion | `prefers-reduced-motion` string not found in the home HTML (may live in external CSS; not checked) | curl |
| Focus order | Hypothesis: DOM order follows visual order since no positive tabindex was seen; not tested in a browser | Hypothesis |

## 3. Primary action and prices without JS
- server-rendered check: pass, 745 words without JS, no SPA shell marker (agentic_check.py).
- "Start free" is a plain `<a href="/signup">` on /, /pricing, /features/journeys, /contact, /docs. /pricing also has `Choose Launch|Growth|Scale` to `/signup?plan=<plan>&cycle=yearly`. Agent can find and follow it without JS. Signup itself is on dash.topedgeai.com (out of scope).
- Prices present in static HTML. /pricing: ₹1,999, ₹3,999, ₹6,499 and USD $19, $39, $65. Home shows ₹1,599, ₹3,199, ₹5,199 (looks like yearly per-month; Hypothesis) plus "from ₹1,999". Two price sets on different pages without a visible cycle label in the text I extracted could confuse an agent; confirm the home labels say "per month, billed yearly".

## 4. Access policy (robots.txt)
Command: `claude-seo run agentic_check.py https://topedgeai.com --json`. robots: 200, 1 group, all listed agents share it with `Allow: /`; Disallow only /admin/, /private/, /api/, /dev/.
- Training (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, anthropic-ai): allowed.
- Search (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot, DuckAssistBot): allowed.
- User-triggered (ChatGPT-User, Claude-User, Perplexity-User): allowed. Documented behaviour: Claude-User honours robots; ChatGPT-User may not apply; Perplexity-User generally ignores.
- No search crawler blocked at root; no nonstandard lines.
- Content-Signal: not declared (info). It is an IETF draft/Cloudflare proposal; Google says it does not act on it (checked 2026-09-23). Optional.
Note: the choice to allow training is deliberate and consistent with an acquisition-driven product, but it is a business decision. Owner should confirm.
Observation: one shared group is valid per RFC 9309; the file comment explains why.

## 5. llms.txt
- /llms.txt 200 text/plain, 39,870 bytes; /llms-full.txt 200. Lighthouse-rule check: pass, no errors.
- Format notes (info only): the "## Entity" H2 holds plain list items without links; llmstxt.org expects links in H2 sections and general text before the first H2.
- 39 KB is large for a "short" index; llms.txt is a community convention, Google Search ignores it. No traffic effect promised.
- It publishes GSTIN, address, phone and founders. Intentional for entity disambiguation; owner to confirm that is wanted in a file agents ingest.

## 6. Markdown delivery
- `Accept: text/markdown` on /, /pricing, /blog: returns 200 text/html, no Vary: Accept. `/index.md`, `/pricing.md`: 404. No rel=alternate markdown link.
- Opportunity, not a defect. No consumer agent is confirmed to request it (checked 2026-09-23). Netlify would need an Edge Function for content negotiation; low priority, since HTML is already server rendered.

## 7. ai-catalog.json and /.well-known
`/.well-known/ai-catalog.json`, `mcp.json`, `api-catalog`, `oauth-*`, `agent-card.json`, `ucp`: all 404 (not applicable; the site operates none of those services). security.txt also 404 (RFC 9116 is a real standard; optional hardening). ai-catalog is a draft; publish only if you have an MCP server/agent resource to list.

## 8. WebMCP
0 registerTool call sites, no navigator.modelContext, 0 forms. Draft proposal (W3C community, Chrome origin trial era; checked 2026-09-23). Opportunity only. With no forms on the marketing site (signup is on dash), the honest expected benefit is near zero; a tool like `get_pricing` would just duplicate static HTML. Skip until the dashboard signup is in scope.

## 9. Other
- Non-existent URL returns a true 404 (no soft-404): pass.
- Repo: public/_headers absent (headers live in netlify.toml); public/.well-known absent; no UA branching in repo (per netlify.toml comment).
- Not reviewed in detail: MarketingFooter.tsx, scripts/generate-llms.mjs (only the generated output was audited).

## Fix table
| Issue | Severity | Fix | Repo file |
|---|---|---|---|
| Lighthouse Agentic fraction not measured (PSI 429) | P1 (measurement gap) | Configure PSI/Google API key, re-run lighthouse_agentic.py both strategies | n/a (env) |
| Home vs /pricing price sets differ; cycle labelling unverified | P2 | Confirm home plan cards say "per month, billed yearly"; keep text identical to billing catalog | src/marketing pages (home pricing), billing catalog |
| No skip-to-content link | P2 | Add visually-hidden-until-focus link to `#main` as first focusable element | src/marketing/components/MarketingNavbar.tsx |
| Pricing tablist lacks aria-controls/tabpanel | P3 | Wire tabs to the price panel or switch to a pressed-button group | pricing page component |
| Home/trust logo strip has href-less anchors | P3 | Render `<div>` rather than `<a>` for duplicated marquee items | home trust-logos component |
| Content-Signal not declared | P3 optional | Add `Content-Signal: search=yes, ai-input=yes, ai-train=<your choice>` to the group; draft, no ranking effect | public/robots.txt |
| llms.txt Entity section format notes; 39 KB size | P3 optional | Move entity lines above first H2 or give them links; consider a short llms.txt plus llms-full | scripts/generate-llms.mjs |
| Markdown delivery absent | P3 optional | Netlify Edge Function for Accept: text/markdown with Vary: Accept; no confirmed consumer | netlify.toml, netlify/edge-functions (new) |
| security.txt absent | P3 optional | Add RFC 9116 file | public/.well-known/security.txt (new) |
| ai-catalog.json, WebMCP absent | Opportunity | Skip until an agent-facing service exists | n/a |

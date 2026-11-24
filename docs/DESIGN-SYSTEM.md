# TopEdge AI website design system: the framed layout

Set 24 Nov 2026. This is the one layout language for every marketing page. It is lifted from `/partners` (the page the owner chose as the reference) and from two reference sites read the same day: kachingappz.com (framed column, hairline rails, cell grids, stat strips) and instantly.ai (one consistent stage behind every product visual).

Read this before building or restyling any page. The primitives live in `src/marketing/styles/frame.css` (loaded globally from `src/main.tsx`). The worked example is the feature page template: `src/marketing/pages/ProductFeaturePage.tsx` plus the "Framed layout" layer at the end of `src/marketing/styles/product-feature.css`.

## 1. What "premium" means here

1. **One frame.** Every page is one centred column, 1240px wide, with a 1px hairline rail down each side. Sections are rows separated by 1px hairlines. Content never floats in open white space without a row it belongs to.
2. **Cells, not card stacks.** Groups of items (features, steps, stats, links, plans) are grids whose cells share their dividers. No drop-shadow card stacks, no cards inside cards.
3. **One colour family.** Violet `#7c3aed`, deep violet `#5b21b6`, lilac highlight `#e4d4ff`, tint `#faf9fd`, ink `#0c1222`, greys. No yellow, peach, pink, green or blue card backgrounds, borders or gradients. Green and red are allowed only for meaning (a tick, a cross, a status). Colour inside product films and screenshots is never changed.
4. **One stage.** A product film or product card sits on the violet dither stage (`.fx-stage`) or on a flat tint (`--fx-tint`). No per-page aurora or mesh gradients.
5. **Flat surfaces.** Hairline borders, 14 to 20px radius, at most one soft violet shadow on the single hero product window. Nothing else has a shadow.
6. **Type does the hierarchy.** Plus Jakarta Sans. Headings are weight 400 with tight tracking; card and cell titles are weight 600. Section titles are centred with one lilac highlight on the closing phrase.
7. **Restraint.** No hover lifts, no bouncing, no gradient text, no emoji, no decorative icons in coloured circles above every heading, no three-identical-cards rows with an icon on top. These are the patterns that make a page look machine-made.

## 2. Tokens (frame.css `:root`)

| Token | Value | Use |
|---|---|---|
| `--fx-line` | `#ececf2` | every hairline: rails, rows, cell dividers, card borders |
| `--fx-max` | `1240px` | the framed column |
| `--fx-gut` | `clamp(1.25rem, 3vw, 2.5rem)` | horizontal padding inside the column and inside cells |
| `--fx-tint` | `#faf9fd` | flat tinted surface (table heads, media halves, hover) |
| `--fx-tint-2` | `#f4f1fb` | slightly stronger tint |
| `--fx-body` | `#4b5363` | body copy |
| `--fx-muted` | `#6b7280` | supporting copy |
| `--fx-deep` | `#5b21b6` | link hover, deep violet text |
| `--fx-radius` | `20px` | cards and framed blocks |
| `--fx-cell-lines` | box-shadow triple | the divider a cell draws on its right and bottom |

Existing global tokens still apply: `--mkt-violet`, `--mkt-ink`, `--mkt-muted`, `--mkt-font`, `--mkt-nav-h` (fixed nav height; the first block on a page pads its top by it).

## 3. Primitives (frame.css)

| Class | What it is |
|---|---|
| `.fx` | page root; add next to the page's own root class (`<MarketingPage className="mkt-pf fx">`) |
| `.fx-shell` | the framed column with rails (rails drop under 1240px) |
| `.fx-sec` | a section row: standard padding, bottom hairline. Modifiers `--tight`, `--flush` (no padding), `--tint`, `--last` |
| `.fx-row` | any band that only needs the bottom hairline |
| `.fx-head`, `.fx-head__title`, `.fx-head__sub`, `.fx-eyebrow` | centred section head; a `<span>` or `.mkt-hl` inside the title gets the lilac highlight. `--left` for a left-aligned head |
| `.fx-cells` | cell grid, 3 columns by default; `--2`, `--4`, `--5`; `--bleed` runs it to the rails inside a padded section; collapses to 2 then 1 column on small screens (`--keep2` keeps 2 on phones) |
| `.fx-cell` | default cell padding |
| `.fx-stat`, `.fx-stat__fig`, `.fx-stat__label` | figure strip cell |
| `.fx-step`, `.fx-step__num`, `.fx-step__title`, `.fx-step__copy` | numbered step cell |
| `.fx-stage` | violet dither backdrop (pattern at both edges, lilac centre); `--soft` is a plain lilac wash |
| `.fx-window` | a product window on a stage (the one allowed shadow) |
| `.fx-card` | flat bordered card |
| `.fx-pill`, `.fx-pill__dot` | kicker pill |
| `.fx-crumbs` | visible breadcrumb; must match the page's BreadcrumbList schema |
| `.fx-links`, `.fx-link` | related-page link cells with a chevron |
| `.fx-checks` | tick list |

Inside `.fx`, the shared FAQ accordion (`FaqAccordion`) renders as one bordered block with hairline rows, and the closing CTA (`MarketingCtaBand`) sits inside the frame. Do not build a bespoke FAQ or closing block.

## 4. Page anatomy

Top to bottom, inside `.fx > .fx-shell`:

1. **Hero row** (existing heroes are left as they are; this describes a new page only): breadcrumb (inner pages), H1 with one lilac highlight, one short sub-line, primary pill + ghost pill, proof (logos or review badges). Centred, or split (copy left, product right on a stage) as on /partners.
2. **Stage row**: the page's film or product visual on `.fx-stage`, hairline above and below. Skip when the hero is split.
3. **Stat strip** (optional, only with real numbers): `.fx-cells--4` of `.fx-stat`.
4. **Content rows**: each a `.fx-sec` with a `.fx-head`, then cells, a split row, a table or a list.
5. **FAQ row**: `FaqAccordion` under a centred head.
6. **Related links row**: `.fx-cells.fx-links`.
7. **Closing CTA**: `MarketingCtaBand`.

## 5. Rules that do not bend

- **Never touch a hero section.** On 24 Nov 2026 the owner had the home hero (aurora image, cursor ripple effect, film board) and every feature page hero (aurora stage) put back exactly as they were after a redesign changed them. The frame starts below the hero on those pages. Do not add, remove or restyle anything in a hero without the owner asking for that hero by name.
- **Never change a film, a video, a screenshot or its colours.** Reframe it; do not replace it, crop it differently or recolour it.
- **Redesign is layout and style only.** Titles, H1, headings, body copy, links, meta tags and JSON-LD stay as they are unless the task says otherwise. A visible breadcrumb that mirrors the existing BreadcrumbList is allowed and wanted.
- Primary action is `.mkt-btn-primary` (`PrimaryButton`), second action is `.mkt-btn-ghost` (`GhostButton`). No black buttons, no square corners, no arrows inside buttons.
- Section titles centred, weight 400, one lilac highlight (`highlightTitle()` in `src/marketing/lib/highlight.tsx`). Deliberate exceptions stay left-aligned: the About letter, /docs reading layout, blog article bodies, legal pages, split heroes, card and cell titles.
- Heroes carry one short line under the H1. Longer answers go in the FAQ.
- One contact email: team@topedgeai.com.
- No em dashes in visible copy.
- Never hide text from users that crawlers can read. Accordions that keep the answer in the HTML are fine.
- Every interactive element keeps a visible focus style and an accessible name. Respect `prefers-reduced-motion`.
- Phones first: check 375px and 768px. Tables restack or scroll inside their own block; nothing causes sideways page scroll.

## 6. How to restyle an existing page

1. Add `fx` to the page root and wrap the page content in `<div className="fx-shell">`.
2. Pad the first row's top by `var(--mkt-nav-h)` plus air (the nav is fixed).
3. Turn each section into a `.fx-sec` row; give it a `.fx-head`.
4. Replace card stacks with `.fx-cells`; replace per-card colours and shadows with hairlines.
5. Put the page's main visual on `.fx-stage`; put secondary visuals on `--fx-tint`.
6. Scope every new rule as `.<page-root>.fx …` and append it as a "Framed layout" layer at the end of the page's own stylesheet, so it wins over older layers without editing them. Do not edit `frame.css`, `marketing.css`, the navbar, the footer, `MarketingCtaBand` or `FaqAccordion` for a single page.
7. Capture before and after at 1440, 768 and 375 and compare: same text, same headings, no overflow.
8. Run the SEO drift check against the stored baseline (`claude-seo` drift scripts) so title, description, canonical, H1 and schema are proven unchanged.

## 7. Status (24 Nov 2026)

See `seo-audit/PLAN-AND-LOG.md` for which pages are on the framed layout.

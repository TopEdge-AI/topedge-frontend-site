# Chapter 12 — Intent detection · 16:30.0–17:50.0 · /features/intent-detection
Store: **Mira Ethnic**. Cast: Rahul Mehta (#2204, the callback that started in ch01). Page hero stays the existing demo video; 3 tiles + 3 showcases. Hinglish appears exactly as shoppers type it (lower case, no punctuation polish).

**Phrase chip (reused):** sky tint pill, 1 px sky 22 % ring, 14 px semibold #0369A1.

### Chapter card (16:30.0–16:32.5) · Bar 397
| **+0.0–2.5** | **V:** the lifted product name becomes a phrase chip "order kidhar hai"; label `12 INTENT DETECTION`; title "Understands **how India types**." **VO 16:30.2:** "Intent detection. It understands how India types." |
|---|---|

---

### SEG 12-T1 · "Phrase matching" · Tile 1:1 · 16:32.5–16:40.0
**Slot:** bento 1 (`/intent-sub-feature/23.webp`). **Palette/pattern:** orchid + rings. **Micro-journey:** two different ways of asking the same thing both land on Shipping.
| t | Shot |
|---|---|
| **+0.0–0.5** | **V:** panel "Intent · Shipping" (truck) + chip "8 phrases"; wallpaper strip (empty); match row area. |
| **+0.3–1.4** | **V:** white bubble types "parcel kab aayega?". **S:** key. **VO 16:33.3:** "Parcel kab aayega…" |
| **+1.4–2.0** | **V:** match row: target (emerald) · "Matched: Shipping" · "“kab aayega” ≈ “when will it arrive”" · chip "96%". **S:** pluck. |
| **+2.6–3.6** | **V:** bubble and row swap (`ui`): "order kidhar hai bhai" types → match row "“kidhar hai” ≈ “where is”" · "93%". **S:** key, pluck. **VO 16:35.8:** "…or order kidhar hai. Same intent." |
| **+4.1–7.5** | **V:** hold; loop ease. |

### SEG 12-T2 · "Route without AI spend" · Tile 1:1 · 16:42.5–16:50.0
**Slot:** bento 2 (`/intent-sub-feature/route-without-ai-spend.webp`). **Palette/pattern:** ocean + lines. **Micro-journey:** a matched intent starts a flow directly; no model call.
| t | Shot |
|---|---|
| **+0.0–0.5** | **V:** panel "Routing" (branch icon); wallpaper strip. |
| **+0.3–1.2** | **V:** white bubble types "return karna hai". **S:** key. **VO 16:43.2:** "A matched intent starts the right flow…" |
| **+1.3–1.9** | **V:** row inserts: return-arrow · "Intent: Returns" · "Matched by phrase" · chip "94%". **S:** tick. |
| **+2.0–2.6** | **V:** row inserts: flow · "Returns flow started" · "Asks for order and reason" · chip "✓ Sent". **S:** tick. |
| **+2.7–3.4** | **V:** total row with rule above: "AI tokens used" **₹0**. **S:** pluck. **VO 16:46.3:** "…without spending a single AI token." |
| **+3.4–7.5** | **V:** hold; loop ease. |

### SEG 12-T3 · "Test confidence" · Tile 1:1 · 16:52.5–17:00.0
**Slot:** bento 3 (`/intent-sub-feature/24.webp`). **Palette/pattern:** dawn + mesh. **Micro-journey:** test a phrase and see the confidence before it goes live.
| t | Shot |
|---|---|
| **+0.0–0.5** | **V:** panel "Test an intent" (flask icon); field "Shopper says" + primary pill "Test". |
| **+0.5–1.4** | **V:** "kab tak aayega?" types into the field. **S:** key. **VO 16:53.2:** "Test a phrase before it goes live…" |
| **+1.4–1.9** | **V:** cursor presses Test (+1.7). **S:** click. |
| **+2.0–3.2** | **V:** `--sunk` result block inserts with three meters filling: Shipping **94%** (emerald) · COD confirm 4% · Returns 2%. **S:** tick → pluck. **VO 16:56.3:** "…and see how sure it is." |
| **+3.2–7.5** | **V:** hold; loop ease. |

### SEG 12-S1 · "Intent list" · Showcase 16:10 · 17:02.5–17:15.0
**Slot:** showcase 1 (`/intent-sub-feature/34.webp`). **Palette/pattern:** sunrise + dots. **Micro-journey:** a new intent is added in place and switched on.
| t | Shot |
|---|---|
| **+0.0–0.5** | **V:** panel 2 100 px "Intents" (target) + primary pill "+ New intent"; rows with toggles on: truck · Shipping · 8 phrases · Start flow: Track order; rupee · COD confirm · 5 phrases · Send reply; return · Returns · 6 phrases · Start flow: Returns. |
| **+0.4–1.4** | **V:** cursor presses New intent (+1.2). **S:** click. **VO 17:03.2:** "Add an intent in seconds…" |
| **+1.5–4.0** | **V:** "New intent" card pops on the panel's top-right edge: fields type "Name: Talk to human" (+1.9) and "Phrase: agent se baat karni hai" (+2.6). **S:** key. |
| **+4.0–4.8** | **V:** card closes; row inserts (active): headset · Talk to human · 4 phrases · Assign to Support; its toggle slides on at +4.8. **S:** toggle, pluck. **VO 17:07.4:** "…and switch it on." |
| **+4.8–12.5** | **V:** cursor leaves; hold; loop ease. |

### SEG 12-S2 · "Editor & actions" · Showcase 16:10 · 17:17.5–17:30.0
**Slot:** showcase 2 (`/intent-sub-feature/35.webp`). **Palette/pattern:** iris + beams. **Micro-journey:** phrases in English and Hinglish, the action it takes, saved.
| t | Shot |
|---|---|
| **+0.0–0.5** | **V:** panel 2 100 px "Edit intent · Shipping" + chip "● Live"; label "SHOPPER PHRASES" with chips: where is my order · parcel kab aayega · tracking link; label "THEN": flow · Start flow: Track order · Reads the order from Shopify; headset · If no order found · Assign to Support; footer pill "Save intent". |
| **+1.0–1.9** | **V:** chips pop in: "order kidhar hai" (+1.0), "delivery kab hogi" (+1.7). **S:** tick ×2. **VO 17:18.2:** "Teach it the way your customers write…" |
| **+3.0–3.9** | **V:** cursor presses Save intent (+3.3); swaps to chip "✓ Saved · 10 phrases". **S:** click, pluck. **VO 17:21.6:** "…and decide what happens next." |
| **+3.9–12.5** | **V:** hold; loop ease. |

### SEG 12-S3 · "Live routing" · Showcase 16:10 · 17:32.5–17:47.5 (15 s) — the closing callback
**Slot:** showcase 3 (`/intent-sub-feature/live-routing.webp` on this page). **Palette/pattern:** mint + grid. **Micro-journey:** Rahul asks in Hinglish; intent matches in 40 ms with no AI call; the Track order flow answers with his real order.
**Composition:** one iPhone centred (status 16:40; Mira Ethnic); satellites on its left and right edges.
| t | Shot |
|---|---|
| **+0.0–0.5** | **V:** chat rest frame (date chip, Meta note). |
| **+0.4–1.9** | **V:** Rahul's green bubble types "order kidhar hai bhai?" (16:40 ✓✓). **S:** key. **VO 17:33.2:** "Rahul asks the way he talks…" |
| **+2.0–2.7** | **V:** satellite on the phone's left edge: target (emerald) · "Intent: Shipping · 93%" · "Matched in 40 ms · no AI call". **S:** pluck. |
| **+2.4–3.2** | **V:** typing dots (white). |
| **+3.3–4.8** | **V:** reply (white): "Hi Rahul! Order #2204 is out for delivery and will reach you by 6 pm today." + "↗ Track order". Satellite on the right edge at +3.4: flow · "Track order flow" · "Read #2204 live from Shopify". **S:** msg-in. **VO 17:36.4:** "…and gets his real order status in a second." |
| **+5.3–5.9** | **V:** fingertip presses "Track order" (+5.6); row tint. **S:** tap. |
| **+5.9–15.0** | **V:** hold; the last beat lands on the bar line 17:45.0. **VO 17:41.2:** "Every feature, doing its one job." **Match cut (bridge 17:47.5):** the Track order button grows into the end-card CTA pill. |

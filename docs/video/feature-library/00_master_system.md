# TopEdge AI — "Every Feature, Shown" — Feature Library Film — Master Production Prompt

> **How to use.** This package is one film and 78 cut-downs. Paste **this file first**, then the chapter file(s) you are producing (`ch01_…` to `ch12_…`), into the generating chat. Attach:
> 1. the official **TopEdge AI logo SVG** (mark + wordmark) — never redraw it;
> 2. `vo_script.txt` (narrated master only);
> 3. the **reference animatic**: the reel `topedge-feature-library-reference.mp4` and/or the per-segment clips `<segment>.mp4` (e.g. `05-S1.mp4`), recorded from the current coded scenes on topedgeai.com (see README, "Reference reel"). They show the *story beats, layout and timing* of each segment. This document is the spec: wherever the animatic and this document differ, **follow this document** (it fixes the animatic's data inconsistencies and raises the craft).
> 4. `cut_sheet.csv` (where every segment is cut from and where it goes on the site).
>
> **Production route (recommended): Remotion (React) or HTML + GSAP, rendered at 60 fps.** The film is product UI with exact copy and numbers; pixel video generators (Sora, Veo, Kling, Runway) invent text, so use them only for the optional ambient plates named in §12. Every segment section is self-contained, so a single segment can also be produced on its own.

---

## 0. THE BRIEF IN ONE PARAGRAPH

A **17 min 57.5 s, 3840×2160, 60 fps** product **feature library film** for **TopEdge AI**: 12 chapters (one per feature page on topedgeai.com), each a run of short, self-contained **micro-journeys** — a real shopper or a real merchant doing one real thing in the product, start to finish. The master plays as a narrated, scored product tour; every segment is also **cut out** (frame-exact in/out points on bar lines, crop windows for 16:9, 16:10 and 1:1) and placed silently on the matching card of the website, replacing the coded animations there. The look is the website's: warm white canvas, a soft aurora light that changes palette per card, rounded white product cards with real structure, a real iPhone with a real WhatsApp Business chat, Apple-grade motion (physical easing, one focal point per second, store-then-phone scene switches). **Nothing may look or sound AI-generated.**

---

## 1. STRATEGY

**Two audiences, one build.**
- *Website visitors* (Indian Shopify D2C founders and growth leads, ₹5L–₹1Cr/month, Meta-ads-driven, COD-heavy) see one 7.5–15 s silent loop per card. Each loop must be understood **without sound and without the card copy**: what happened, to whom, and what the merchant got.
- *Sales and onboarding* watch the narrated master as an end-to-end product tour.

**Angle (one sentence, said once in the opening title):** *Every feature, shown doing its one job — on a real shopper's phone, in real rupees.* No feature is described with abstract shapes; each is a tiny story with a person, a store, a phone, an order and a result.

**Story device — one small universe.** Five sample stores and a recurring cast (Data Bible §5). People and order IDs come back across chapters as deliberate callbacks (Rahul's order **#2204** is fetched by a flow in ch01, branched by a journey in ch05, routed by a rule in ch09 and answered by intent detection in ch12). Viewers who watch the whole tour feel one connected product; viewers who see one loop still get a complete micro-story.

**Structure of every segment (the "micro-journey" grammar):**
1. **Rest frame (0.0–0.5 s):** the opening state, fully composed, already populated. Never empty.
2. **Action:** the store / dashboard UI plays alone, centred. One focal point per second.
3. **Hand-off (only when WhatsApp enters):** the store slides out left, the iPhone slides in from the right (§4 "Act switch"). Only one main object on screen at a time.
4. **Result:** the outcome lands (order placed, rule live, recovered ₹) — optionally the dashboard returns to show it.
5. **Settle frame (last 0.8 s):** result state held still, then an imperceptible 0.4 s ease back toward the rest frame so the loop restarts invisibly (§8 Loops).

**Chapter labels** (mono, small, top-left of each chapter card): `01 FLOW BUILDER` … `12 INTENT DETECTION`. They appear only on chapter cards, never inside segments (segments get cut).

**What makes it different from Film 1 (launch) and Film 2 ("A Way Back"):** it is not an argument; it is a catalogue of proof-by-demonstration, built for re-use across 12 pages. It reuses Film 2's warm white + aurora look (the website's), not Film 1's lavender.

---

## 2. NON-NEGOTIABLES — NOTHING THAT LOOKS OR SOUNDS AI-MADE

**Never on screen:** sparkle icons, robot or brain icons, glowing orbs, holograms, neon grids, lens flares, floating 3D blobs, particle dust, confetti showers, coins or money rain, glossy fake-3D renders, generated faces or hands, gibberish or placeholder text, lorem ipsum, mixed icon styles, emoji as graphics (emoji only inside chat bubbles, max one per message), linear easing, everything animating at once, pure #000/#FFF flats without grain, gradient banding, click ripples, step-caption bars or subtitles burnt into segments.

**Always:**
- One icon set: **Hugeicons, Stroke Rounded (free set), 1.5 px stroke**, 20 px in rows, 24 px in headers. Bare glyphs: **no square tile behind icons**. Colour `--ink-2` at rest; a status colour only when the icon carries meaning.
- Real brand marks (Shopify bag, WhatsApp glyph, Meta infinity, Razorpay, OpenAI, Anthropic, Gemini) **only as official artwork, only where that brand is meant**, in their own colours.
- Every string real, spelled right, consistent with the Data Bible (§5). Indian number grouping everywhere (₹1,84,200).
- **Human cursor:** macOS arrow (black fill, 1.5 px white outline, soft 2-layer shadow), curved Bézier paths with slight acceleration, 3–6 px overshoot and settle before every click, click = cursor scale 0.92 for 80 ms, the pressed control scales 0.97. **No ripples.** On phone screens use a **36 px translucent fingertip dot** (white 55 %, 1.5 px ink-28 % ring, 2 px backdrop blur) instead of an arrow.
- **Human typing:** 70–140 ms per key, randomised, one micro-pause per field; caret blinks between bursts.
- One focal point per second. Readable UI: anything the VO or the story is about is **≥ 16 px on screen at 1080p**; push the camera in rather than shrink text.
- 2 % animated film grain + dithering on the canvas (not on UI text). Motion blur only on camera moves and fast slides (180° shutter); text at rest razor sharp.
- **Cut safety (website loops):** during a segment nothing important crosses the segment's crop window (§3 Safe areas); no element relies on sound; first and last frames are clean (§1, §8).

**Audio never:** whoosh, swish, riser packs, trailer booms, cha-ching, stock pops, the real WhatsApp or iOS sounds, a sound on every animation.

**Fix from the current coded scenes (the animatic) — do not reproduce:**
- Data conflicts (fixed in §5): order **#1042** used for three different stores; a shopper named after a TopEdge co-founder (use **Dev Malhotra**); two "Vikram"s; a warranty "24 months" ending in 2027 for a Sept 2026 purchase; Diwali campaign numbers that differ between hero, tile and card; `diwali_offer` both approved and rejected.
- The fire­works in Diwali scenes are tasteful **gold and rose streaks only** (no confetti, no coins), and only behind the night-stage campaign segments.
- No caption bars, no step labels inside segments.

---

## 3. LOOK & BRAND SYSTEM

### Palette tokens
```
--canvas       #FBFBFD   main canvas (never pure #FFF)
--surface      #FFFFFF   cards
--sunk         #F7F8FA   inset areas, KV blocks, active rows
--ink          #0B1220   headlines, UI titles
--ink-2        #344054   body, icons at rest
--muted        #667085   secondary text
--faint        #98A2B3   meta, timestamps, labels
--line         rgba(16,24,40,.08)   1 px card borders
--violet-600   #7C3AED   TopEdge brand, primary buttons
--violet-500   #8B5CF6   brand gradient top
--violet-50    #F6F3FF   brand tints
--emerald      #10B981 / text #047857 / tint #ECFDF5   success, live, recovered, approved
--amber        #F59E0B / text #B45309 / tint #FFFBEB    pending, waiting, abandoned
--rose         #E11D48 / text #BE123C / tint #FFF1F2    loss, rejected, RTO
--sky          #0EA5E9 / text #0369A1 / tint #F0F9FF    variables, keywords, carts
--wa-wall      #EFEAE2   WhatsApp chat wallpaper (with a 4 % dot pattern)
--wa-out       #D9FDD3   outgoing (customer) bubble
--wa-in        #FFFFFF   incoming (business) bubble
--wa-green     #25D366   WhatsApp glyph and verified tick ONLY
--night        #0D0A26 → #0A0820   Diwali night stage (campaign segments only)
```

### Aurora light (the signature; matches the website's `styles/aurora.css`)
A soft three-colour light, blurred 3 % of frame width, saturation 1.2, with a white band across the middle (42 % → 30 % white). Colour A sits in one corner, B in the opposite corner, C in the third. It drifts ±1.5 % over 26 s.
**Each segment has its own palette and pattern** so neighbouring cards on the website never look alike. Palettes:
```
iris    #8B5CF6 · #5EEAD4 · #93C5FD      bloom   #F0ABFC · #A78BFA · #FDBA74
dawn    #FDBA74 · #8B5CF6 · #FDA4AF      lagoon  #67E8F9 · #818CF8 · #6EE7B7
orchid  #C084FC · #7DD3FC · #A78BFA      mint    #6EE7B7 · #7DD3FC · #C4B5FD
dusk    #818CF8 · #F9A8D4 · #C4B5FD      sunrise #FCD34D · #F472B6 · #A78BFA
coral   #FB923C · #F472B6 · #FDE68A      ocean   #38BDF8 · #818CF8 · #5EEAD4
lime    #A3E635 · #5EEAD4 · #93C5FD      rose    #FDA4AF · #C4B5FD · #FDBA74
```
**Pattern** (one per segment, ink at 6–9 % or white at 50 % for beams, fading out from one corner over ~80 % of the frame): `dots` 1 px on a 14 px grid · `grid` 1 px lines every 28 px · `lines` 135° 1 px every 11 px · `rings` concentric 1 px every 26 px from the light's corner · `mesh` ±45° cross-hatch every 16 px · `beams` soft white 28 px shafts at 105°, blurred 8 px, drifting ±3 %. Palette and pattern per segment are listed in each chapter file.
**Square (1:1) tile segments** fade the aurora to white over the bottom 55 % (the website tile continues into its white text body below the clip).

### Typography (product UI type, deliberately not the website's body font)
- **UI:** Inter (Display for ≥ 24 px), tabular numerals everywhere, tracking −1.1 %. (SF Pro reads as "Apple" but its licence limits use outside Apple-platform mock-ups; Inter is the safe equivalent. If you hold an SF Pro licence that covers this use, swap it in.)
- Sizes at 1080p reference (×2 at 4K): panel title 15 px semibold · row title 15 px medium · row sub 13 px · chips 12 px semibold · KPI 32–40 px semibold, tracking −3.5 % · chat 15 px.
- **Chapter cards and opening title:** Inter Display Semibold, hero 104 px, chapter 64 px, tracking −2.5 %, line-height 1.05; chapter label Geist Mono Medium 14 px, +8 % tracking.
- Codes, IDs, API keys: Geist Mono.

### Logo
Official SVG only (violet circle mark with a white waveform + "TopEdge AI" wordmark). Reveal at 0:01.5 and at the end card: aurora blooms (400 ms) → mark scales 0.2 → 1 (`snap`) → waveform strokes draw left → right (520 ms, expo-out) → wordmark wipes out from behind the mark (450 ms). The logo **never appears inside segments**.

### CARD SYSTEM (every card follows this)
- **Radius:** rows 14 px · small cards/toasts 18 px · standard panels 22 px · browser windows 20 px · phone 50 px · pills/buttons 999 px. **Nested radius rule:** inner = outer − padding.
- **Border:** 1 px `--line`; top inner highlight `inset 0 1px 0 rgba(255,255,255,.7)`.
- **Shadow (3 layers):** `0 1px 2px rgba(16,24,40,.04), 0 8px 18px -8px rgba(16,24,40,.10), 0 26px 52px -30px rgba(40,24,96,.22)`. On the night stage add `0 0 0 1px rgba(255,255,255,.14)`.
- **Padding** 16 / 20 / 24 px; 8 px grid inside.
- **Structure:** header row (bare 20 px icon + 15 px semibold title + right-aligned status chip, 1 px divider below) → content → optional footer. Active row = `--sunk` fill, **no left accent line**.
- **Chips:** 24 px tall, pill, 12 px semibold, 6 px status dot or 12 px icon, tinted background (status tint) with status text colour. Neutral chips: `#F2F4F7` / `--ink-2`.
- **Buttons:** pill. Primary = violet gradient (#8B5CF6 → #7C3AED), white 14 px semibold, 1 px #6D28D9 ring, inset top highlight, soft violet shadow. Secondary = white, 1 px ink-12 % ring. Checkout CTA = #111 pill. WhatsApp CTA = green gradient #2FDC6E → #1FAA54.
- **Toggles:** 38×22, knob 17 px, `ui` spring.
- **Fields:** 14 px radius, white, 1 px ink-10 % inset ring, 13 px label above.
- **Toast / satellite:** the only secondary element allowed beside a card or phone; pinned to the card's edge (half overlapping), 18 px radius, bare 20 px icon, 14 px semibold title + 12.5 px sub; dark variant `#1D2433 → #0B1220` with white text for warnings and "blocked" moments. Satellites **pop** (`ui` spring) from their anchor.

### Persistent elements
None inside segments (they are cut). The chapter label and a thin progress hairline exist only on chapter cards in the master.

### Safe areas (master 3840×2160)
- **16:9 hero segments:** full frame; keep text ≥ 160 px from every edge.
- **16:10 showcase segments:** crop window 3456×2160 centred (x 192–3648). Everything that matters stays ≥ 120 px inside it.
- **1:1 tile segments:** crop window 2160×2160 centred (x 840–3000). Everything that matters stays ≥ 140 px inside it and ≥ 420 px above the bottom edge (the bottom of the tile fades into the website card body).
- The camera may reframe between segments, never during one (except the gentle +1.5 % push).

---

## 4. MOTION & CAMERA LANGUAGE

- **World:** one infinite warm-white canvas. Chapters are zones laid left → right; each segment has its own "stage" (its aurora + pattern). The camera travels between stages during the 2.5 s **bridges** (never used in cuts): pull back 8 %, pan with `camera` easing 1.2 s, push in 8 % and settle 0.4 s before the next segment's rest frame. Bridges carry the only "air" sound (max one per chapter).
- **Inside a segment the camera is locked** apart from a continuous +1.5 % push over the segment (gives life, keeps cut loops seamless when the settle eases back).
- **2.5D:** perspective 1800 px; satellites sit 1.08× forward (8 px parallax on bridges). No rotation in segments.
- **Easing library:** `enter` cubic-bezier(0.22,1,0.36,1) 800–950 ms · `camera` cubic-bezier(0.65,0,0.35,1) 1000–1400 ms · `exit` cubic-bezier(0.4,0,0.6,1) 380–600 ms · `ui` spring 170/26/1 · `snap` spring 400/28/1 · reel decel cubic-bezier(0.15,0.7,0.12,1) 2.6 s.
- **Card entrance ("unfold"):** card rises 18 px, scale 0.975 → 1, opacity 0 → 1 (first 45 %), while a soft top-to-bottom mask reveals it (gradient edge 16 % of card height) over 1.05 s. Children stagger after it (rows 70 ms, chips 50 ms).
- **Exit ("dissolve"):** card dissolves from the bottom up through the same soft mask while drifting up 8 px, 600 ms.
- **Act switch (store → phone → store):** outgoing act slides **left 96 px**, scales to 0.95, fades out over 700 ms (`cubic-bezier(0.65,0,0.35,1)`); the incoming act starts 200 ms later from **right 96 px**, scale 0.95 → 1, opacity reaches 1 at 45 %, 950 ms `enter`. Only one act on stage at a time.
- **Row insert:** height 0 → auto + opacity + 10 px rise, 750 ms cubic-bezier(0.32,0.72,0,1); the new row gets a `--sunk` wash that fades over 2.2 s. Lists reorder with FLIP (450 ms `ui`).
- **State swap** (button → chip, Pending → Approved): old leaves up 4 px + scale .97 in 350 ms; new arrives from 5 px below + scale .96 with `ui` spring, 100 ms later.
- **Counters:** odometer, each digit in its own clipped column, easeOutQuart 1.3 s, tabular, Indian grouping at every frame, 1-frame micro-overshoot on the last digit. **Never ghosted digits.**
- **Charts:** sparklines draw left → right 1.5 s with gradient fill and an end dot; waterfall bars grow from their base 700 ms, staggered 0.6 s; donuts sweep 1.4 s; meters fill 1.2 s.
- **Phone specifics:** notification banners drop from the top with `ui` spring (600 ms) and leave up after ~1.2 s; chat bubbles land from their tail corner (scale .9 → 1, `ui`); chat is bottom-anchored (older messages scroll up and dissolve at the top 40 px); sheets slide up 700 ms `enter`; the success check is drawn as a stroke + scales from 0.3 with `snap`.
- **Music sync:** **96 BPM** (beat 0.625 s, bar 2.5 s). Every segment, bridge and chapter boundary is on a bar line; payoffs (order placed, approved, recovered) land on a downbeat.

---

## 5. DATA BIBLE (single source of truth — every name and number on screen)

All stores, people, numbers and phone numbers are **illustrative samples** (no real customers, no permissions needed). Phone numbers use the dummy range **+91 90000 1xxxx**. Meta rates are real and current: **Marketing ₹0.8631, Utility ₹0.115 per delivered message** (checked 16 Nov 2026; Meta bills the merchant directly, TopEdge adds 0 % markup). TopEdge pricing (end card): **14-day free trial, no card · from ₹1,999/month (₹1,599 billed yearly) · +18 % GST**.

### 5.1 Sample stores
| Store | Category | Brand colour | Mark | Used in |
|---|---|---|---|---|
| **Nova Home** | Smart home | #059669 green | house glyph + "NOVA / HOME" | ch02 |
| **Mira Ethnic** | Ethnic wear | #BE185D rose | serif "M" | ch01, 03, 04, 05, 09, 12 |
| **Glow Co** | Skincare | #C8603F terracotta | "G" | ch06, 07, 08 |
| **Stride Shoes** | Footwear | #4F46E5 indigo | "S" | ch05 |
| **Aura Home** | Appliances | #0F766E teal | lowercase "aura" | ch10 |
| **Mira Ethnic** finance | — | — | — | ch11 (Profit & costs) |

### 5.2 Products (studio photography, light seamless backdrop, soft floor shadow — or the merchant's real shots if supplied)
| Product | Store | Price | Offer | Paid |
|---|---|---|---|---|
| Smart Doorbell Ultra | Nova Home | ₹4,499 | WELCOME10 (10 %) | **₹4,049** |
| Rani pink silk kurta (size M) | Mira Ethnic | ₹3,124 | DIWALI20 (20 %) | **₹2,499** |
| Linen shirt (sage, size M) | Mira Ethnic | ₹1,899 | — | **₹1,899** |
| Block print kurta set | Mira Ethnic | ₹1,849 | — | ₹1,849 (COD) |
| Cotton kurta | Mira Ethnic | ₹799 | — | — |
| Hydrating gel serum 30 ml | Glow Co | ₹729 | free shipping | **₹729** |
| Vitamin C serum 30 ml | Glow Co | ₹849 | — | — |
| Cloudrun 2 running shoe (UK 6) | Stride Shoes | ₹3,450 | COMEBACK10 (10 %) | **₹3,105** |
| Air purifier X2 | Aura Home | — | 24-month warranty | — |
| Air fryer 4L | Aura Home | — | 12-month warranty | — |

### 5.3 Cast
| Person | Role | Store | Details |
|---|---|---|---|
| **Riya Sharma** | VIP shopper, Mumbai | Mira Ethnic | +91 90000 12345 · 7 orders · lifetime ₹18,420 · lead score 88 · Diwali order **#2211** ₹2,499 (prepaid) · linen shirt **#2219** ₹1,899 · earlier order **#2160** ₹2,340 delivered · second number +91 90000 12399 (merged) |
| **Rahul Mehta** | Shopper, Pune | Mira Ethnic | +91 90000 12346 · order **#2204** Block print kurta set ₹1,849 **COD**, confirmed, out for delivery, arrives today by 6 pm |
| **Farhan Ali** | Shopper, Lucknow | Mira Ethnic | order **#2207** ₹1,299 COD — cancelled before dispatch (ch09) |
| **Ananya Rao** | Subscriber + shopper | Nova Home / Mira | Nova: opted in via Spin to win "just now"; Mira: order **#2198** ₹1,890 UPI (ch04 timeline) |
| Kabir Shah · Meera Pillai · Rohan Das | Subscribers | Nova Home | Welcome popup 9 m · Chat widget 21 m · Pulse Drop 1 h |
| **Aditi Rao** | Shopper | Nova Home | +91 90000 12347 · Welcome popup → **#1042** Smart Doorbell Ultra ₹4,049 COD |
| **Naina Kapoor** | Shopper, Bengaluru | Stride Shoes | +91 90000 12348 · cart ₹3,450 abandoned 4:12 pm reminder → paid ₹3,105 UPI **#3381** |
| **Aarav Shah** | Shopper | Glow Co | +91 90000 12349 · viewed gel serum 12:20 → cart 12:21 → left → recovered **#2090** ₹729 at 12:34 |
| **Tanvi Desai** | Shopper | Glow Co | order **#2087** · asks about returning an opened serum → exchange pickup booked |
| **Dev Malhotra** | Visitor → shopper | Glow Co | anonymous "Visitor 8f2a" → checkout reveals +91 90000 12350 → matched |
| **Ishaan Gupta** | High-intent shopper | Mira Ethnic | lead score **86** = cart ₹3,450 (+30) + viewed 6 items (+24) + 3 past orders (+32) |
| **Sneha Kulkarni** · **Varun Joshi** | Shoppers | Mira Ethnic | scores 81 and 64 |
| **Arjun Nair** | Shopper, Bengaluru | Mira Ethnic | +91 90000 12351 · 5 orders · ₹12,960 · score 84 · last order **#2185** ₹2,190 · wants a size exchange |
| **Vikram Nair** | Buyer | Aura Home | Air purifier X2 · order **#1144** · serial **AP2-48213** · delivered 12 Sep 2026 · 24 months → **valid till 12 Sep 2028** |
| Kavya Iyer · Nikhil Bansal · Arjun Kapoor · Pooja Menon | Warranty holders | Aura Home | Air fryer 4L #1150 Active · Mixer grinder #1098 Claim open · Smart TV 43" #1120 Active · Air purifier X2 #1131 Expires in 30 days |
| Harsh Vora · Ritu Saxena · Manish Gupta | Unassigned registrations | Aura Home | #1141 Water purifier 13 Sep · #1140 Air fryer 11 Sep · #1139 Smart bulbs 11 Sep |
| **Aman Verma** | Claimant | Aura Home | Air fryer 4L · order **#1066** · 9 months left · claim **#W-208** "stopped heating" |
| **Priya** (Priya Sharma) | Support lead | Mira Ethnic | agent |
| **Arjun Rao** | Ops | Mira Ethnic | agent (COD and cancellations) |
| **Sana Qureshi** · **Karan Joshi** | Support · Ops | Aura Home | warranty agents |
| **Maya** | Bot persona | Glow Co | "warm, brief" |

### 5.4 Numbers by chapter (all arithmetic closes)
**ch01 Flow Builder (Mira Ethnic).** Webhooks: `fulfillments/create` #2204 Delhivery just now · `orders/create` #2205 ₹1,890 4 s ago · `checkouts/update` cart ₹3,450 9 s ago — each `200`. Flows in folder Support: Welcome menu (on) · Order status bot (on) · Returns and FAQ (new, 6 steps). Folders: Support 4 flows · Sales 3 · COD 2. Simulator answer in 1.2 s.

**ch02 Opt-in tools (Nova Home).** Subscribers +38 today, all with consent. Codes: Pulse Drop **FREESHIP** · Spin **OFF5** (5 % off) · Scratch **OFF5** · Welcome **WELCOME10**. Reel prizes (in order): Free SD card · 10 % off · Free shipping · 5 % off · Free bracket (lands on 5 % off). Widget number +91 90000 11223. Spin and Scratch shopper number +91 90000 12352 (new Nova Home subscriber, consent via the popup). Triggers: Exit intent · After 8 seconds · Scrolled 50 % → "Live on 3 pages".

**ch03 Campaigns (Mira Ethnic).** Diwali sale: template `diwali_offer` (Marketing, Approved) → Repeat buyers **2,418** (score 60+). Delivered 2,418 · Read 2,071 · Orders 212 · Attributed revenue ₹1,86,287 − Meta fees ₹2,087 (2,418 × ₹0.8631) = **₹1,84,200 net**. Festive restock (Performance card): Sent 4,000 · Read 3,412 · Orders 318 · revenue ₹3,95,852 − Meta fees ₹3,452 (4,000 × ₹0.8631) = **₹3,92,400 net** · **113× return on Meta fees**. Audience builder: Browsed, no order 5,906 (40+) · Repeat buyers 2,418 (60+) · **Cart abandoners 1,240 (70+)** → delivered 1,240/1,240. Templates: `diwali_offer` Marketing ₹0.8631 Approved · `order_update` Utility ₹0.115 Approved · `flash_sale_draft` Marketing, not reviewed → blocked. Lead scores: Ishaan 86 · Sneha 81 · Varun 64.

**ch04 Audience CRM (Mira Ethnic).** Riya: 7 orders, ₹18,420, score 88; activity: Diwali sale (clicked, ordered #2211) 2 d · WhatsApp chat (sizing, answered by AI) 3 d · #2160 ₹2,340 delivered 12 d; numbers merged (+91 90000 12399); segments: Repeat buyers · VIP · Ethnic wear. Ananya timeline: viewed Linen kurta 3× 2 h · replied "Is the blue one in M?" 1 h · #2198 ₹1,890 UPI now. High-intent carts **1,240** used in Diwali sale (campaign) and Cart recovery (journey). Segment builder count as rules stack: Orders ≥ 2 → 8,904 · AND last order ≤ 60 days → 4,812 · AND opted in → **3,126** shoppers.

**ch05 Journeys.** Cart recovery (Stride): Naina delivers to Indiranagar, Bengaluru 560038; abandoned → wait 30 min → reminder (10 % off for an hour) → Naina pays **₹3,105** (3,450 − 345) → "Recovered ₹3,105". Routes (Mira): #2204 ₹1,849 COD → COD: confirm request → "Confirmed · Shopper tapped Yes"; Prepaid: thank-you; No reply: nudge in 4 h. Retarget (Mira): Riya, 3rd view, size M sold out → leaves → wait 20 min → "Your size M is back" → #2219 ₹1,899. Library: Cart recovery 3 steps (18 % recover) · COD confirmation 2 · Order confirmed 1 · Shipping updates 3. Gating: `cart_reminder_v2` Pending → Approved → Live, 3 shoppers in journey.

**ch06 Website pixel (Glow Co).** Aarav trail as in 5.3. Live intent feed numbers: +91 90000 12360 (viewed gel 3×) · +91 90000 12361 (cart Vitamin C ₹849). Dev's cart: Vitamin C serum ₹849. Live events: Mumbai checkout ₹1,458 · Delhi add to cart Vitamin C serum · Pune view Hydrating gel · Jaipur collection click Sunscreen. Funnel (7 days): views 3,120 → carts 640 (**−79 %**) → checkouts 286. Health: 1,284 events today, last 2 min ago; checks: theme embed on, cart events, checkout events, numbers matched. Audience "Viewed 3×, no buy" **412**.

**ch07 AI Brain (Glow Co, persona Maya).** Tanvi: "Can I return an opened serum?" → "Opened items can't be returned, but you can exchange them within 7 days of delivery. Want me to book a free pickup?" → "Yes please, tomorrow works" → "Done! Pickup booked for tomorrow, 10 am to 1 pm. 📦" → toast "Pickup booked · Order #2087 · via Shopify". Knowledge: Return policy (7-day exchange) · Shipping policy (2 to 5 days, COD available) · Ingredients FAQ (18 answers) · 12 pages. Keys: OpenAI · **Claude (selected)** · Gemini; key `sk-••••••••••••••4f2a`. This week: 1,612 AI replies · 48,210 tokens · ₹0.10 to ₹0.30 per reply (provider cost, illustrative). Max reply length 300 tokens. Routing: "Where is my order?" → Intent Detect · Order status 96 %, no model call, ₹0 → Track order flow, replies in 1.2 s; "Can I talk to a person?" → Human request → Live Chat takeover, AI paused.

**ch08 Meta Manager (Glow Co).** `cart_recovery_1` (Marketing): Draft → In review → **Approved**; body "Hi {{first_name}}, your {{product}} is still in your cart." Delivered to Aarav, read, reply "Ordering now, thanks!". Library: `order_confirm` Utility Approved · `cart_recovery_1` Marketing In review → Approved · `festive_promo_v1` **Rejected: promotional content in a Utility template**. Sync: 3 templates synced from Meta. Studio: `order_shipped` (Utility) "Hi {{1}}, your order {{2}} has shipped and arrives by {{3}}." → preview "Hi Rahul, your order #2204 has shipped and arrives by Friday." → In review. Catalog: 142 products synced from Shopify (Rani pink silk kurta ₹2,499 · 24 · Hydrating gel serum ₹729 · 112 · Cloudrun 2 ₹3,450 · 3 low stock); QR `wa.me/919000012345` → `store-qr.png`.

**ch09 Chat rules (Mira Ethnic).** Farhan "Can I cancel my COD order?" → rule `COD, cancel` → Arjun (Ops) → "Hi Farhan, Arjun here. I've cancelled #2207 for you." Keyword tile: "COD cancel karna hai" → 2 keywords → Ops. Intent handoff: "Can I talk to a person please?" → Priya "I can see order #2211". Filters: Assigned to me 4 · Open 12 · Needs help 2 · VIP 3. Takeover: Rahul "The courier never called me." → AI apology → Priya takes control (AI and flows paused) → "I've called the courier, they'll reach you by 4 pm." Queues: Ops (Rahul #2204 → Arjun) · VIP (Riya exchange → Priya) · Support (damaged item → Needs help); "Average pickup 42 s". Rule builder: refund · return · paisa wapas → Assign to Support (round robin, 3 agents) + pause bot → "Rule live".

**ch10 Warranty (Aura Home).** As in 5.3. Hub record added: Kavya Iyer · Air fryer 4L · #1150 · 12 months. Unassigned 3 → 2 after Sana takes #1140. Claim #W-208 → assigned to Sana → "Aman notified".

**ch11 Profit & costs (Mira Ethnic).** Cotton kurta, order **#2236**, ₹799, COD, Surat — true cost: packing ₹13 + freight ₹85 + COD fee ₹30 + RTO share ₹38 + support ₹13 = **₹179** (2.1× the ₹85 freight). Cotton kurta: COGS ₹310 + packaging ₹13 = **₹323**. Fees: Razorpay 2 % · Shopify Basic ₹0 platform fee · Meta ads ₹62 per order. COD & returns: RTO rate 30 % · forward ₹85 + return ₹40 = **₹125 lost per RTO**. Last 30 days: revenue **₹16,349** − COGS ₹6,540 − shipping ₹2,410 − COD/RTO ₹1,980 − ads ₹1,857 = **₹3,562 net** · 48 orders · AOV ₹341 · margin 21.8 % · +8.7 % vs prior (7 days: ₹812). Products (last 90 days): Cotton kurta 24 sold, ₹6,520 profit, 34 % · Block print juttis 18 sold, ₹2,372, 22 % · Silk saree 6 sold, −₹1,349, **−9 %** (−₹225 per order; RTO on COD 42 %) · Block print top: no COGS yet.

**ch12 Intent detection (Mira Ethnic).** Shipping (8 phrases): "parcel kab aayega?" 96 % · "order kidhar hai bhai" 93 %. Returns: "return karna hai" 94 % → Returns flow, AI tokens ₹0. Test "kab tak aayega?" → Shipping 94 % · COD confirm 4 % · Returns 2 %. Intents: Shipping 8 · COD confirm 5 · Returns 6 · + Talk to human 4 ("agent se baat karni hai"). Editor phrases: where is my order · parcel kab aayega · tracking link · order kidhar hai · delivery kab hogi → Saved · 10 phrases. Live: Rahul "order kidhar hai bhai?" → Shipping 93 %, 40 ms, no AI call → "Hi Rahul! Order #2204 is out for delivery and will reach you by 6 pm today." [Track order].

### 5.5 Status-bar times on phones
ch02 9:41 · ch03 7:30 pm (night) · ch05 4:12 pm / 6:40 pm · ch06 12:31 · ch07 14:02 · ch08 18:20 · ch10 18:04 · ch12 16:40.

---

## 6. MUSIC BRIEF (+ sonic logo)
- Original or premium library (Musicbed/Artlist). **96 BPM, D major / B minor.** Felt piano motif, warm analog pad, soft sub, sidechained pulse, brushed organic percussion; a sparing **santoor** colour in the Diwali chapter and on payoffs.
- The library is long, so it is built from **12 chapter cues** of 77.5–95 s on the same grid, each with its own small arc: intimate start (−24 LUFS-S) → groove under the segments (−20) → lift on the chapter's biggest payoff (−18) → 1-bar soft tail into the next chapter card. Chapter cards get a two-chord turnaround.
- **Sonic logo:** three felt-piano notes **D–A–F#** (+ santoor doubling) at the opening logo (0:01.5) and the end card (17:50.0).
- Website cut-downs are **silent**; the music exists for the narrated master only.

## 7. SOUND DESIGN PALETTE (foley-grade, in key, sparse; master only)
| Name | Sound | Level vs VO | Used for |
|---|---|---|---|
| tick | 8 ms dry ceramic tick, HPF 900 Hz | −24 dB | row inserts, odometer digits, reel |
| tap | fingertip on glass | −22 dB | phone taps |
| click | real trackpad click | −24 dB | cursor clicks |
| key | soft low-profile keys | −22 dB | typing |
| toggle | small real switch | −20 dB | toggles |
| msg-in | custom 2-note marimba (A–D), 120 ms | −18 dB | message / banner received |
| pluck | felt piano note in key, ascending through a segment | −18 dB | approvals, matches, "live" |
| minor-pluck | two notes descending a minor 2nd | −18 dB | blocked, rejected, abandoned, RTO |
| success | warm bell, major third, long tail | −14 dB | payment success, order placed, recovered |
| foil | real scratch-card scratching | −16 dB | scratch card |
| reel | soft ratchet slowing | −20 dB | spin reel |
| crackle | distant soft firework crackle, LP 4 kHz | −28 dB | Diwali night only, max 3 |
| air | LP-filtered pressure swell ≤ 700 ms | −30 dB | max one bridge per chapter |
| sub | 42 Hz sine bump | felt | logo reveals, chapter payoffs |
| room | neutral room tone | −62 dBFS | under everything |

## 8. MIX & DELIVERY
- **Master:** 3840×2160, 60 fps, ProRes 422 HQ + H.264 High 4K 45 Mbps, BT.709. Audio −14 LUFS integrated, ≤ −1.0 dBTP, VO ≈ −16 LUFS-S, music sidechain-ducked 8–10 dB under VO (150/450 ms).
- **Website cut-downs** (per `cut_sheet.csv`): crop window → scale to export size → **30 fps, H.264 High, CRF 21, yuv420p, `+faststart`, no audio**, plus **WebM VP9 CRF 34** and a **poster JPG** of the rest frame. Budget ≤ 1.5 MB (tiles) / ≤ 3 MB (showcases, heroes). Use `<video autoplay muted loop playsinline preload="metadata" poster=…>`.
- **Loops:** every segment's last 0.4 s eases back to its rest frame (§1). If a residual jump remains, close it in the cut with a 0.4 s self-crossfade (`ffmpeg … xfade=fade:duration=0.4`, see README).
- Reduced motion: the website shows the poster JPG (the *result* frame is better for that; export both `-rest.jpg` and `-result.jpg`).

## 9. MATCH-CUT MAP (bridges and chapter cards; never inside segments)
| At | From | Becomes |
|---|---|---|
| 0:05.0 | opening logo's waveform | the flow-canvas connector line of the ch01 card |
| each chapter card | the chapter label | slides up and out as the first segment's rest frame unfolds |
| 1:20.0 → 1:22.5 | Simulator "Publish flow" pill | ch02 card's chapter pill |
| 2:55.0 → 2:57.5 | OFF5 gold ticket | Diwali ch03 card's gold rule (night stage fades in) |
| 4:30.0 → 4:32.5 | the Performance card's ₹ KPI | ch04 card's lifetime-spend figure on Riya's profile |
| 6:05.0 → 6:07.5 | segment rule rows | ch05 journey rail |
| 7:27.5 → 7:30.0 | Riya's "Ordering it now!" bubble | ch06 card's first pixel event dot |
| 9:02.5 → 9:05.0 | "Numbers matched" check | ch07 card |
| 10:37.5 → 10:40.0 | Live Chat takeover chip | ch08 card's Meta lifecycle pill |
| 12:12.5 → 12:15.0 | QR code | ch09 card's inbox glyph |
| 13:47.5 → 13:50.0 | "Chat rules still on" toast | ch10 card's warranty shield |
| 14:52.5 → 14:55.0 | "Aman notified" toast | ch11 card's ₹ figure |
| 16:27.5 → 16:30.0 | product table row | ch12 card's phrase chip |
| 17:47.5 → 17:50.0 | Rahul's Track order button | end-card CTA pill |

## 10. SECOND-BY-SECOND SHOT LISTS
In the chapter files. Each chapter file lists, per segment: master in/out, site slot, palette + pattern, the micro-journey in one line, and rows **V** (visual/motion), **C** (camera), **T** (on-screen text when not obvious from V), **S** (sound), **VO** (master only, timecode in master time). Row times are **segment-relative** (`+0.0`).

### Opening title (0:00.0–0:05.0) · Bars 1–2 · centred
| t | Shot |
|---|---|
| **0.0–1.5** | **V:** warm canvas, grain; iris aurora breathes in from the top-left (opacity 0 → 45 %, 1.2 s). **C:** static, 1.5 % push begins. **S:** room tone; soft pad swells. **M:** pad, no rhythm. |
| **1.5–3.0** | **V:** official logo reveal (§3 Logo). **S:** sonic logo D–A–F# + sub. **VO 1.6:** "Every feature in TopEdge AI…" |
| **3.0–5.0** | **V:** headline per-word reveal under the logo: "Every feature, **shown**." (64 px, "shown" turns violet 180 ms after landing); sub 22 px `--muted`: "On a real shopper's phone. In real rupees." **VO 3.2:** "…shown doing its one job." **C:** pull back 8 %, pan right toward ch01 (bridge begins 4.4). |

### End card (17:50.0–17:57.5) · Bars 429–431
| t | Shot |
|---|---|
| **0.0–2.5** | **V:** aurora (iris) blooms; logo reveal; under it 56 px "Turn every visitor into revenue." **S:** sonic logo. **VO 0.3:** "TopEdge AI. Every feature, one app." |
| **2.5–7.5** | **V:** CTA pill "Start free" (violet) + secondary "See pricing"; meta line 15 px: "14-day free trial, no card · from ₹1,999/month · 0% markup on Meta fees · topedgeai.com". Held, readable ≥ 4 s; waveform idles ±2 px. **M:** final chord rings out to silence at 7.3. |

## 11. QA CHECKLIST
- [ ] 1077.5 s, 3840×2160, 60 fps; every boundary on a 2.5 s bar line; no hard cuts.
- [ ] Every number on screen exists in §5; all arithmetic in §5.4 re-checked; IDs never shared between people or stores.
- [ ] Each segment opens on a fully populated rest frame and closes on a held result frame; loops cleanly.
- [ ] Nothing important crosses a segment's crop window; tiles keep content ≥ 420 px above the bottom.
- [ ] One main object per act; store → phone hand-offs use the act switch, never side-by-side.
- [ ] No caption bars, no logo, no chapter labels inside segments.
- [ ] Icons: Hugeicons stroke, bare, one weight; brand marks official only.
- [ ] Readable UI ≥ 16 px at 1080p for anything the story is about; no glyph clipping; no ghosted digits; no empty phones.
- [ ] Nothing from the §2 "never" lists, visual or audio.
- [ ] Dummy phone numbers only; no real customers; Meta rates and pricing match §5.
- [ ] VO timecodes match `vo_script.txt` and the visuals; −14 LUFS master.
- [ ] Cut-downs exported per `cut_sheet.csv` with posters; files ≤ budget.

## 12. BUILD NOTES
- **Remotion** project: `src/world/` (canvas, aurora palettes, patterns, camera), `src/ui/` (Panel, Row, Chip, Toast, Button, Toggle, Field, Browser, IPhone + WhatsApp chat + banner + sheet, Cursor, TouchDot, Odometer, Spark, Donut, Meter, Waterfall, QR, SpinReel, ScratchCard, PulseOrb, GoldTicket, Fireworks), `src/segments/<id>.tsx` (78 segments, one component each, props = Data Bible slice), `src/Master.tsx` (sequences the opening, chapter cards, segments and bridges at the cut-sheet timecodes).
- Build every segment at its **native aspect as its own composition too** (1920×1080, 1920×1200 or 1080×1080 at 2× device scale). Exporting those directly is cleaner than cropping the master; the master crop windows in `cut_sheet.csv` are equivalent.
- Fonts local (Inter, Inter Display, Geist Mono); icons `@hugeicons/react` + `@hugeicons/core-free-icons`; brand marks from official SVGs (Simple Icons is acceptable for Shopify/WhatsApp/Meta/Razorpay/OpenAI/Anthropic/Gemini); logo from the attached SVG.
- The website's own components are the visual reference: `src/marketing/components/visuals/kit.tsx`, `styles/feature-visuals.css`, `styles/feature-scenes.css`, `styles/optin-scenes.css`, `styles/aurora.css` in the topedge-frontend-site repo. Reuse their tokens and proportions.
- Optional pixel-generator plates (Sora / Veo / Kling / Runway) — **no text, no UI, no people**: (a) 8 s seamless loops of soft aurora light on warm paper for each palette; (b) a 10 s night-sky plate with distant gold/rose fireworks for ch03; (c) studio product photography if the merchants' real shots are unavailable (one product, seamless light backdrop, soft floor shadow, 3/4 angle). Composite them under the coded UI.
- VO from ElevenLabs per `vo_script.txt`, one line per file, placed at timecodes; music and SFX assembled in a DAW against the picture; mux last.

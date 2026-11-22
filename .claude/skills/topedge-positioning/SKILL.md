---
name: topedge-positioning
description: How TopEdge AI describes itself on every page, post, schema field, listing and llms file. Use before writing any copy that names TopEdge AI, any "where TopEdge AI fits" section, any meta description, Organization or SoftwareApplication schema, directory listing or About text.
---

# TopEdge AI positioning (owner, 22 Nov 2026)

## The category
TopEdge AI is **all-in-one D2C software for Shopify stores, built as one suite**. It is not a single-feature app. It is not "the WhatsApp app", not "a cart recovery app", not "a COD app". Cart recovery, COD confirmation and COD to prepaid are modules of the suite, never the whole product.

## The sentences (use word for word)
- **Canonical sentence:** "TopEdge AI is all-in-one D2C software for Shopify stores, built as one suite."
- **Second sentence, when there is room:** "It brings cart recovery, COD confirmation and COD to prepaid, WhatsApp and email journeys, campaigns, a shopper CRM, live chat, opt-in tools, a tracking pixel and profit reporting into one platform."
- **Price line:** "Flat INR plans start at ₹1,999/mo with a 14-day free trial." Add the App Store door ($19, $39, $65 billed by Shopify in USD) wherever prices are compared.
- **Owner's long form (About, listings, llms):** "TopEdge AI packs the entire D2C software stack for Shopify into one platform. Built for brands at every stage: early-stage stores setting up their first foundation, and established enterprise teams running high-volume storefronts. Everything required to run and grow an e-commerce brand lives inside one software suite, giving founders and operators one home for their entire brand. Flat INR plans start at ₹1,999/mo with a 14-day free trial."

## The modules (name them from this list, link the feature page)
Journeys (/features/journeys), abandoned cart recovery (/whatsapp-abandoned-cart-recovery-app), COD confirmation and COD to prepaid (/features/cod-confirmation), flow builder and Shopify tools (/features/flow-builder), opt-in tools (/features/opt-in-tools), audience campaigns (/features/campaigns), audience CRM (/features/audience-crm), warranty (/features/warranty), tracking pixel (/features/analytics), intent detection (/features/intent-detection), AI Brain (/features/ai-brain), profit and costs (/features/profit-loss), live chat.

## How to write it
1. On a page about one job (cart recovery, COD, RTO), name that job as **one module of the suite**: "Cart recovery is one module of TopEdge AI, all-in-one D2C software for Shopify stores." Then one line on what else runs on the same customer record.
2. **Never write about positioning itself.** No "we position ourselves as", "TopEdge AI is positioned as", "our positioning", "we are not just a cart recovery app". State what the product is and does, the way a reader would describe it.
3. Keyword ownership does not change: a landing page can still own "shopify cod app" or "whatsapp abandoned cart recovery app". The H1 names the job; the body names the suite.
4. Same facts everywhere: schema `description`, About, llms.txt, listings and blog "Who wrote this" lines all carry the canonical sentence first.
5. Still true and still required: we are not a chatbot vendor, BSP, API reseller or bulk sender; no voice calling; 0% markup on Meta rates; founders Moksh Patel and Smit Tilva; always "TopEdge AI", never bare "TopEdge".

## Where it lives in code
- Schema: `src/marketing/data/pageSeo.ts` (Organization `description`, `disambiguatingDescription`, SoftwareApplication `description`, WebSite `description`).
- Home sub-line: `src/marketing/components/home/HomeHero.tsx`. About: `src/pages/About.tsx`. Features hub: `src/marketing/pages/FeaturesPage.tsx`.
- llms: `scripts/generate-llms.mjs` (`ENTITY` block).
- Listings copy: `seo-audit/2026-11-22/01-day-6-owner-actions.md`.

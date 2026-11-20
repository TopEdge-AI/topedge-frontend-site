# Day 5 (20 Nov 2026): owner actions

## 1. Bing Webmaster Tools: import from Search Console (5 minutes)

Our IndexNow pings already reach Bing, but without a verified Bing site we cannot see Bing's index state, queries or crawl errors. Bing's own copilot and ChatGPT search both draw on Bing's index.

1. Open https://www.bing.com/webmasters and sign in with any Microsoft account (personal is fine).
2. On "Add your site", choose **Import your sites from Google Search Console** (not "Add site manually").
3. Sign in with the Google account that owns the `topedgeai.com` Search Console property and allow read access.
4. Tick `topedgeai.com` (the domain property) and click **Import**. Bing verifies it through Google, with no DNS change.
5. Open Sitemaps and check that `https://topedgeai.com/sitemap.xml` was imported; if not, submit it.
6. Tell me "Bing done" and I will read it in the built-in browser next session, without changing any setting.

Status: not started (owner).

## 2. Ahrefs: sign in again in the built-in browser

Done by the owner on 20 Nov. Read the same afternoon: health 100, AI Discoverability 98 (was 87), crawl of 19 Nov; top issues are the known dash.topedgeai.com rows, Article-schema notices and the aggregateRating warnings only real reviews fix.

## 3. Decisions from the AI-content review

See `01-google-ai-content-guidance.md`, section 6: festival pages, an optional "How we write these guides" note on /about, and which blog cover images (if any) were AI-generated.

## 4. Festival template copy (decision, afternoon 20 Nov)

The website side of the 25 festival pages was cleaned on 20 Nov: shared stage notes, the long personalise block, generic FAQ answers and generic subtitles were cut, so each page now leads with its own festival facts.

What is left is the template copy itself. The 100 messages are the same four texts with only the festival name swapped ("Our Diwali collection is live at [Store Name], and you're seeing it first."). The website copies them word for word from the dashboard catalog (`chatbot-dashboard-frontend-main/src/config/festivalMarketingCatalog.js`), and `festivalTemplateCatalog.ts` says never to change them on the website alone, or the page starts describing templates the dashboard does not have.

Recommendation: rewrite the catalog in the dashboard with festival-specific copy (what people actually buy and say at each festival, e.g. rakhi hampers and sibling gifting for Raksha Bandhan, the Onam sadya and kasavu wear for Onam), starting with the next five festivals in the calendar (Christmas, New Year and Makar Sankranti are the first three). Then re-vendor to the website in the same deploy. Say yes and a session will draft the new copy in the dashboard repo for your review; nothing ships to the dashboard without you.

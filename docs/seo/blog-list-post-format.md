# List posts: entry format (from 17 Nov 2026)

Every "best X" or "top 10" post uses this format for each ranked tool. `upgradeListEntries` in `src/marketing/lib/blogHtml.ts` turns it into a card at render time, and the prerender keeps the result in the served HTML. Write plain HTML with these labels and the layout comes free.

```html
<h2>2. ClickPost: Best for multi-carrier shipping and RTO reduction</h2>
<p>What it is, in two or three sentences, with the name linked to its own site.</p>
<p>One verified proof point, linked to the source.</p>
<p><strong>Best for:</strong> who should pick it.</p>
<p><strong>Pricing:</strong> the published price and the date it was read.</p>
<p><strong>AI:</strong> what is actually shipped, or "Not a selling point".</p>
<p><strong>Rating:</strong> score, review count and where it was read.</p>
<p><strong>Pros:</strong></p>
<ul><li>…</li><li>…</li></ul>
<p><strong>Cons:</strong></p>
<ul><li>…</li><li>…</li></ul>
<p><strong>Verdict:</strong> one line.</p>
<p class="mkt-blog-pick-cta"><a href="…">Visit ClickPost</a><a href="…">See on App Store</a></p>
```

What each part becomes:

| Pattern | Rendered as |
|---|---|
| Numbered H2 or H3 ("2. Name: …") whose section uses any label below | One card, with a `#2` pill |
| Two or more labelled facts in a row (Best for, Pricing, Price, AI, Rating, Trial, Type) | A spec sheet of label and value rows |
| One labelled fact on its own | A line with a small label chip |
| `Pros:` then a list, then `Cons:` then a list | Two columns under a green and a red bar |
| `Best for:` straight before `Watch-outs:` | The same two columns, with amber for watch-outs |
| `Verdict:` | A tinted closing line |
| `<p class="mkt-blog-pick-cta">` | Pill buttons |

Rules:
- Two to four pros and two to four cons, one line each.
- No em dashes.
- Every price and rating needs a date, and its host must be in `src/data/sources.ts`.
- Rank our own app only where the post is about our category, and say so in the post. Never self-rank in a list of tools we do not compete with.
- Keep the H2 text as the ranking ("2. Name: Best for …"): the contents rail and the ItemList schema read it.

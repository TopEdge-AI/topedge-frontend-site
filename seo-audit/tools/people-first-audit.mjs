#!/usr/bin/env node
/**
 * People-first content audit over the built site (dist/).
 *
 * This is NOT an "AI detector". Google says it does not rank content lower
 * for being AI-assisted; it acts on low-effort, unoriginal, templated or
 * scaled content however it was made (Search Central "Using generative AI
 * content", spam policy "Scaled content abuse", rater guidelines 4.6.5,
 * 4.6.6, 5.2.1, 5.2.2; read 20 Nov 2026, see
 * seo-audit/2026-11-20/01-google-ai-content-guidance.md).
 *
 * So this flags what those documents describe, per page:
 *   - stock phrasing readers and raters associate with unedited AI drafts
 *   - templated scaffolding: bold "Label:" lead-ins, identical H2s across pages
 *   - near-duplicate passages shared with other pages on our own site
 *   - monotone sentence length (every sentence the same size)
 *   - missing evidence a competitor cannot copy: dated readings, rupee
 *     figures, sources, tables, real images
 *   - em dashes and arrows (house rule)
 *
 * Usage:
 *   node seo-audit/tools/people-first-audit.mjs [distDir] [outDir] [--only /blog/]
 * Output: <outDir>/people-first-audit.csv and people-first-audit.md
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;
const positional = args.filter((a, i) => !a.startsWith('--') && (onlyIdx < 0 || i !== onlyIdx + 1));
const distDir = path.resolve(positional[0] || 'dist');
const outDir = path.resolve(positional[1] || '.');

/** Listing and account pages: repeated card text there is navigation, not content. */
const SKIP = [/^\/login/, /^\/signup/, /^\/lp\//, /^\/404/, /^\/privacy/, /^\/terms/, /^\/index$/, /^\/blog\/category\//, /^\/blog\/page\//, /^\/blog$/];

/** Phrases that read as an unedited AI draft. Weight 2 = strong tell, 1 = weak (fine once, a smell in bulk). */
const STOCK = [
  ['delve', 2], ['seamless', 2], ['seamlessly', 2], ['robust', 1], ['leverage', 1], ['elevate', 2],
  ['unlock', 2], ['empower', 2], ['game-changer', 2], ['game changer', 2], ["in today's", 2],
  ['in today’s', 2], ['fast-paced', 2], ['ever-evolving', 2], ['landscape', 1], ['realm', 2],
  ['tapestry', 2], ['embark', 2], ['navigate the', 1], ["it's important to note", 2],
  ['it is important to note', 2], ["it's worth noting", 2], ['it is worth noting', 2],
  ['in conclusion', 2], ['furthermore', 1], ['moreover', 1], ['additionally', 1],
  ['comprehensive guide', 1], ['ultimate guide', 2], ['complete guide', 1], ['look no further', 2],
  ["whether you're", 1], ['whether you’re', 1], ['dive into', 2], ['deep dive', 1], ['harness', 1],
  ['supercharge', 2], ['streamline', 1], ['cutting-edge', 2], ['state-of-the-art', 2],
  ['revolutionize', 2], ['revolutionise', 2], ['transformative', 2], ['holistic', 1], ['synergy', 2],
  ['paramount', 2], ['pivotal', 2], ['plethora', 2], ['myriad', 2], ['a testament to', 2],
  ['at the end of the day', 1], ['the power of', 1], ['operating system', 1], ['peace of mind', 1],
  ['take it to the next level', 2], ['stands out', 1], ['when it comes to', 1], ['in the world of', 2],
];

/** "X is not Y. It is Z" style contrast frames: fine once, a tell when every section opens with one. */
const CONTRAST = [
  /\bis not (?:just |only |simply )?[^.]{2,60}\. (?:It|This|That) is\b/gi,
  /\bisn['’]t (?:just|only|simply)\b/gi,
  /\bnot (?:just|only) [^.,]{2,40}, but\b/gi,
  /\bmore than just\b/gi,
];

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function routeOf(file) {
  let r = '/' + path.relative(distDir, file).replace(/\\/g, '/');
  r = r.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  return r || '/';
}

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));

const strip = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Main content: the blog prose wrapper when present, else body minus chrome. */
function mainContent(html) {
  let h = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const prose = h.indexOf('class="mkt-blog-prose"');
  if (prose >= 0) {
    h = h.slice(prose);
    const end = h.search(/class="mkt-blog-(?:related|author-card|cta-band)|<footer|class="mkt-foot|class="mkt-ph/);
    if (end > 0) h = h.slice(0, end);
    return h;
  }
  const b = h.search(/<body/i);
  if (b >= 0) h = h.slice(b);
  return h
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<aside[\s\S]*?<\/aside>/gi, ' ');
}

function sentences(text) {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z₹0-9"“])/)
    .map((s) => s.trim())
    .filter((s) => s.split(' ').length >= 3);
}

function shingles(text, n = 8) {
  const w = text.toLowerCase().replace(/[^a-z0-9₹ ]+/g, ' ').split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(' '));
  return set;
}

const pages = [];
for (const file of walk(distDir)) {
  const route = routeOf(file);
  if (SKIP.some((re) => re.test(route))) continue;
  if (only && !route.startsWith(only)) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;
  const mc = mainContent(html);
  const text = strip(mc);
  const words = text ? text.split(' ').length : 0;
  if (words < 80) continue;
  const lower = ' ' + text.toLowerCase() + ' ';

  const stockHits = [];
  let stockScore = 0;
  for (const [p, wgt] of STOCK) {
    const re = new RegExp(`(?<![a-z])${p.replace(/[-’']/g, (c) => (c === '-' ? '-' : "['’]"))}(?![a-z])`, 'gi');
    const n = (lower.match(re) || []).length;
    if (n) {
      stockHits.push(`${p}×${n}`);
      stockScore += n * wgt;
    }
  }
  const contrast = CONTRAST.reduce((n, re) => n + (text.match(re) || []).length, 0);
  const paras = (mc.match(/<p[\s>]/gi) || []).length;
  const labelParas = (mc.match(/<p>\s*<strong>[^<]{2,60}:?\s*<\/strong>\s*:?/gi) || []).length;
  const h2s = [...mc.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => strip(m[1]));
  const sents = sentences(text);
  const lens = sents.map((s) => s.split(' ').length);
  const mean = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
  const sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / (lens.length || 1));
  const emDash = (text.match(/—/g) || []).length;
  const arrows = (text.match(/[→⇒➜]/g) || []).length;
  const rupee = (text.match(/₹\s?\d/g) || []).length;
  const dated = (text.match(/\b(?:read|re-read|checked|verified|as of|updated)\s+(?:on\s+)?\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+20\d\d/gi) || []).length;
  const extLinks = (mc.match(/<a[^>]+href="https?:\/\/(?!(?:www\.)?topedgeai\.com)[^"]+"/gi) || []).length;
  const tables = (mc.match(/<table/gi) || []).length;
  const imgs = (mc.match(/<img/gi) || []).length + (mc.match(/<video/gi) || []).length;
  const byline = /"author":\{"@type":"Person"/.test(html);

  pages.push({
    route, words, text, h2s, stockHits, stockScore, contrast, paras, labelParas, mean, sd,
    emDash, arrows, rupee, dated, extLinks, tables, imgs, byline, sh: shingles(text),
  });
}

// Cross-page duplication: share of a page's 8-word shingles that also appear on another page.
const owners = new Map();
for (const p of pages) for (const s of p.sh) owners.set(s, (owners.get(s) || 0) + 1);
for (const p of pages) {
  let shared = 0;
  for (const s of p.sh) if (owners.get(s) > 1) shared++;
  p.dupPct = p.sh.size ? (100 * shared) / p.sh.size : 0;
  let best = null;
  let bestN = 0;
  for (const q of pages) {
    if (q === p) continue;
    let n = 0;
    for (const s of p.sh) if (q.sh.has(s)) n++;
    if (n > bestN) {
      bestN = n;
      best = q.route;
    }
  }
  p.dupWith = best && bestN >= 20 ? `${best} (${bestN})` : '';
}

// Identical H2 text across pages = templated skeleton.
const h2Count = new Map();
for (const p of pages) for (const h of new Set(p.h2s.map((x) => x.toLowerCase()))) h2Count.set(h, (h2Count.get(h) || 0) + 1);
for (const p of pages) p.sharedH2 = p.h2s.filter((h) => h2Count.get(h.toLowerCase()) >= 5);

for (const p of pages) {
  const f = [];
  const per1k = (n) => (1000 * n) / Math.max(p.words, 1);
  if (per1k(p.stockScore) >= 3) f.push(`stock phrasing (${p.stockHits.join(', ')})`);
  if (p.contrast >= 4) f.push(`contrast frames x${p.contrast}`);
  if (p.paras >= 10 && p.labelParas / p.paras >= 0.25) f.push(`bold-label paragraphs ${p.labelParas}/${p.paras}`);
  if (p.dupPct >= 15) f.push(`${p.dupPct.toFixed(0)}% of passages repeat on other pages`);
  if (p.sharedH2.length >= 3) f.push(`${p.sharedH2.length} H2s identical on 5+ pages`);
  if (p.sd < 5 && p.words > 400) f.push(`monotone sentences (sd ${p.sd.toFixed(1)})`);
  if (p.emDash) f.push(`em dash x${p.emDash}`);
  // Docs use arrows for UI paths (Settings → Billing); in prose they read as machine shorthand.
  if (p.arrows && !p.route.startsWith("/docs/")) f.push(`arrows x${p.arrows}`);
  if (p.route.startsWith('/blog/') && p.dated === 0 && p.rupee === 0 && p.tables === 0) f.push('no dated reading, rupee figure or table');
  if (p.route.startsWith('/blog/') && p.extLinks === 0) f.push('no outside source linked');
  p.flags = f;
}

pages.sort((a, b) => b.flags.length - a.flags.length || b.dupPct - a.dupPct);
fs.mkdirSync(outDir, { recursive: true });
const csvEsc = (v) => `"${String(v).replace(/"/g, '""')}"`;
const header = ['route', 'words', 'flags', 'stock_hits', 'contrast_frames', 'label_paras', 'paras', 'dup_pct', 'most_overlap_with', 'shared_h2', 'sentence_mean', 'sentence_sd', 'dated_readings', 'rupee_figures', 'outside_links', 'tables', 'images_or_video', 'byline', 'em_dash', 'arrows'];
const rows = pages.map((p) => [
  p.route, p.words, p.flags.join(' | '), p.stockHits.join(' '), p.contrast, p.labelParas, p.paras,
  p.dupPct.toFixed(1), p.dupWith, p.sharedH2.join(' / '), p.mean.toFixed(1), p.sd.toFixed(1), p.dated,
  p.rupee, p.extLinks, p.tables, p.imgs, p.byline ? 'y' : 'n', p.emDash, p.arrows,
]);
fs.writeFileSync(path.join(outDir, 'people-first-audit.csv'), [header, ...rows].map((r) => r.map(csvEsc).join(',')).join('\n') + '\n');

const flagged = pages.filter((p) => p.flags.length);
const topH2 = [...h2Count.entries()].filter(([, n]) => n >= 5).sort((a, b) => b[1] - a[1]).slice(0, 15);
const md = [
  `# People-first content audit (${new Date().toISOString().slice(0, 10)})`,
  '',
  `${pages.length} indexable pages with 80+ words of main content scanned from \`${path.relative(process.cwd(), distDir) || '.'}\`${only ? ` (only ${only})` : ''}. ${flagged.length} carry at least one flag.`,
  '',
  'Not an AI detector. Flags follow what Google says it acts on: low effort, low originality, templated or scaled content, filler, and passages repeated across pages. See `seo-audit/2026-11-20/01-google-ai-content-guidance.md`.',
  '',
  '## H2 headings repeated on 5 or more pages',
  '',
  ...topH2.map(([h, n]) => `- "${h}" on ${n} pages`),
  '',
  '## Pages with flags (most first)',
  '',
  '| Page | Words | Flags |',
  '|---|---|---|',
  ...flagged.map((p) => `| ${p.route} | ${p.words} | ${p.flags.join('; ')} |`),
  '',
];
fs.writeFileSync(path.join(outDir, 'people-first-audit.md'), md.join('\n'));
console.log(`Scanned ${pages.length} pages, ${flagged.length} flagged. Wrote ${path.join(outDir, 'people-first-audit.csv')} and .md`);

#!/usr/bin/env node
/**
 * SEO diff: the built site (dist/) against the live site, page by page.
 *
 * Written for the 24 Nov 2026 redesign, where the rule was "layout and style
 * only": every title, description, canonical, robots value, heading, schema
 * type and internal link had to survive. Run it before any deploy that is not
 * meant to change those things, and read the report.
 *
 *   node seo-audit/tools/seo-diff.mjs [distDir=dist] [outDir=seo-audit/<today>/seo-diff] [--base https://topedgeai.com] [--only /pricing,/about]
 *
 * It reads the sitemap in dist/ for the URL list, fetches each URL from the
 * live site, reads the matching dist/<route>.html (or dist/<route>/index.html),
 * and compares:
 *   title, meta description, canonical, robots, og:title, og:image,
 *   every h1 / h2 / h3 (text, in order), JSON-LD @type counts,
 *   the set of internal link targets, and the visible word count.
 *
 * Output: <outDir>/seo-diff.md (human) and <outDir>/seo-diff.json (machine).
 * Exit code 1 when a page changed its title, description, canonical, robots
 * or h1, or lost a schema type; anything else is reported and exits 0.
 *
 * It is a text comparison, not a rendering test. It does not judge whether a
 * change is good, and it says nothing about performance.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const base = flag('--base', 'https://topedgeai.com').replace(/\/$/, '');
const only = (flag('--only', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
const distDir = args[0] || 'dist';
const today = new Date().toISOString().slice(0, 10);
const outDir = args[1] || path.join('seo-audit', today, 'seo-diff');

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
// Block-level tags and <br> become a space; inline tags vanish. Replacing every
// tag with a space turned "WhatsApp</span>," into "WhatsApp ," and reported a
// heading as changed when only its inline markup had moved.
const text = (html) =>
  decode(
    html
      .replace(/<(br|hr|\/?(p|div|li|ul|ol|tr|td|th|table|section|article|header|footer|nav|main|figure|figcaption|blockquote|details|summary|h[1-6]))\b[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/\s+/g, ' ')
    .trim();

function meta(html, attr, name) {
  const re = new RegExp(`<meta[^>]*${attr}=["']${name}["'][^>]*>`, 'i');
  const tag = (html.match(re) || [])[0];
  if (!tag) return null;
  const c = tag.match(/content=["']([^"']*)["']/i);
  return c ? decode(c[1]) : null;
}

function extract(html) {
  const body = html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  const heads = (tag) => [...body.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi'))].map((m) => text(m[1]));
  const types = {};
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      types.__invalid = (types.__invalid || 0) + 1;
      continue;
    }
    const walk = (node) => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (!node || typeof node !== 'object') return;
      const t = node['@type'];
      // Count top-level and @graph nodes only: nested Offer or Person nodes
      // move with the content, and counting them makes every price edit a diff.
      for (const one of [].concat(t || [])) types[one] = (types[one] || 0) + 1;
      if (node['@graph']) walk(node['@graph']);
    };
    walk(data);
  }
  const links = new Set();
  for (const m of body.matchAll(/<a\b[^>]*href=["']([^"'#?]+)[^"']*["']/gi)) {
    let h = m[1];
    if (h.startsWith(base)) h = h.slice(base.length) || '/';
    if (!h.startsWith('/') || h.startsWith('//')) continue;
    links.add(h.length > 1 ? h.replace(/\/$/, '') : h);
  }
  const main = (body.match(/<main\b[\s\S]*<\/main>/i) || [body.replace(/<(header|footer|nav)\b[\s\S]*?<\/\1>/gi, ' ')])[0];
  return {
    title: text((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]),
    description: meta(html, 'name', 'description'),
    canonical: (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1] || null,
    robots: meta(html, 'name', 'robots'),
    ogTitle: meta(html, 'property', 'og:title'),
    ogImage: meta(html, 'property', 'og:image'),
    h1: heads('h1'),
    h2: heads('h2'),
    h3: heads('h3'),
    types,
    links: [...links].sort(),
    words: text(main).split(' ').filter(Boolean).length,
  };
}

const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
let routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/');
if (only.length) routes = routes.filter((r) => only.includes(r));

const listDiff = (a, b) => ({ removed: a.filter((x) => !b.includes(x)), added: b.filter((x) => !a.includes(x)) });
const results = [];
let hard = 0;

const queue = [...routes];
async function worker() {
  for (;;) {
    const route = queue.shift();
    if (!route) return;
    // Prerendered React routes are dist/<route>.html; static pages (the landing
    // pages, legal) are dist/<route>/index.html.
    const candidates = route === '/'
      ? [path.join(distDir, 'index.html')]
      : [path.join(distDir, `${route}.html`), path.join(distDir, route, 'index.html')];
    const file = candidates.find((f) => fs.existsSync(f)) || candidates[0];
    const row = { route, hard: [], soft: [] };
    results.push(row);
    if (!fs.existsSync(file)) {
      row.hard.push('no built page in dist');
      continue;
    }
    let live;
    try {
      const res = await fetch(base + route, { headers: { 'user-agent': 'Mozilla/5.0 (seo-diff; site owner check)' } });
      if (!res.ok) {
        row.soft.push(`live returned HTTP ${res.status} (new page, or not deployed yet)`);
        continue;
      }
      live = extract(await res.text());
    } catch (e) {
      row.soft.push(`live fetch failed: ${e.message}`);
      continue;
    }
    const built = extract(fs.readFileSync(file, 'utf8'));
    for (const key of ['title', 'description', 'canonical', 'robots']) {
      if (live[key] !== built[key]) row.hard.push(`${key}: "${live[key]}" → "${built[key]}"`);
    }
    if (live.h1.join(' | ') !== built.h1.join(' | ')) row.hard.push(`h1: "${live.h1.join(' | ')}" → "${built.h1.join(' | ')}"`);
    for (const key of ['ogTitle', 'ogImage']) {
      if (live[key] !== built[key]) row.soft.push(`${key}: "${live[key]}" → "${built[key]}"`);
    }
    for (const tag of ['h2', 'h3']) {
      const d = listDiff(live[tag], built[tag]);
      if (d.removed.length) row.soft.push(`${tag} removed (${d.removed.length}): ${d.removed.slice(0, 6).join(' · ')}${d.removed.length > 6 ? ' …' : ''}`);
      if (d.added.length) row.soft.push(`${tag} added (${d.added.length}): ${d.added.slice(0, 6).join(' · ')}${d.added.length > 6 ? ' …' : ''}`);
    }
    const allTypes = new Set([...Object.keys(live.types), ...Object.keys(built.types)]);
    for (const t of allTypes) {
      const a = live.types[t] || 0;
      const b = built.types[t] || 0;
      if (a === b) continue;
      (b < a && b === 0 ? row.hard : row.soft).push(`schema ${t}: ${a} → ${b}`);
    }
    const ld = listDiff(live.links, built.links);
    if (ld.removed.length) row.soft.push(`internal links removed (${ld.removed.length}): ${ld.removed.slice(0, 8).join(', ')}${ld.removed.length > 8 ? ' …' : ''}`);
    if (ld.added.length) row.soft.push(`internal links added (${ld.added.length}): ${ld.added.slice(0, 8).join(', ')}${ld.added.length > 8 ? ' …' : ''}`);
    const delta = built.words - live.words;
    if (Math.abs(delta) > Math.max(25, live.words * 0.05)) row.soft.push(`words: ${live.words} → ${built.words} (${delta > 0 ? '+' : ''}${delta})`);
    row.words = [live.words, built.words];
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
results.sort((a, b) => routes.indexOf(a.route) - routes.indexOf(b.route));
hard = results.filter((r) => r.hard.length).length;
const soft = results.filter((r) => r.soft.length && !r.hard.length).length;
const clean = results.filter((r) => !r.hard.length && !r.soft.length).length;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'seo-diff.json'), JSON.stringify({ base, date: today, results }, null, 1));
const md = [
  `# SEO diff: dist against ${base}, ${today}`,
  '',
  `${results.length} pages compared. **${hard}** changed a title, description, canonical, robots value or H1, or lost a schema type. **${soft}** changed only headings below H1, schema counts, internal links or word count. **${clean}** are identical on every field checked.`,
  '',
  'Fields: title, meta description, canonical, robots, og:title, og:image, h1, h2, h3 (text), JSON-LD @type counts, internal link targets, visible word count (reported when it moves more than 5% or 25 words).',
  '',
  '## Pages with a hard change',
  '',
  ...(hard ? results.filter((r) => r.hard.length).flatMap((r) => [`### ${r.route}`, ...r.hard.map((x) => `- **${x}**`), ...r.soft.map((x) => `- ${x}`), '']) : ['None.', '']),
  '## Pages with other changes',
  '',
  ...(soft ? results.filter((r) => r.soft.length && !r.hard.length).flatMap((r) => [`### ${r.route}`, ...r.soft.map((x) => `- ${x}`), '']) : ['None.', '']),
].join('\n');
fs.writeFileSync(path.join(outDir, 'seo-diff.md'), md);
console.log(`${results.length} pages: ${hard} hard, ${soft} other, ${clean} identical → ${path.join(outDir, 'seo-diff.md')}`);
process.exit(hard ? 1 : 0);

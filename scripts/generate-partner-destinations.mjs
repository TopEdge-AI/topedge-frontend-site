/**
 * Write public/partner-destinations.json: the pages a partner link may point at.
 *
 * Contract: topedge-partners/docs/integration-contracts.md section 5. The partner
 * service copies this file (npm run destinations:sync -w api) and builds each
 * link as base + path + "?via=" + code + "&vl=" + slug.
 *
 * Paths are concrete pages from scripts/marketing-urls.mjs (the same list the
 * prerender and the sitemap use), never patterns. Groups: main (home, pricing,
 * sign-up), features, tools, blog. Never /partners*, /admin*, or a noindex page
 * other than /signup. The build fails here if one slips in.
 *
 * Usage: node scripts/generate-partner-destinations.mjs
 */
import { build as esbuild } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  BLOG_SLUGS,
  FEATURE_SLUGS,
  NOINDEX_PRERENDER_PATHS,
  getSitemapPaths,
} from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const OUT = path.join(root, 'public', 'partner-destinations.json');
const BASE = 'https://topedgeai.com';

async function loadTs(rel) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-dest-'));
  const outfile = path.join(dir, 'mod.mjs');
  try {
    await esbuild({
      entryPoints: [path.join(root, rel)],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
      define: { 'import.meta.env': '{}' },
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const { PRODUCT_PAGES } = await loadTs('src/marketing/data/productPages.ts');
const { MARKETING_FEATURES } = await loadTs('src/marketing/data/features.ts');
const { FREE_TOOLS, TOOLS_PATH } = await loadTs('src/marketing/data/freeTools.ts');
const { blogPosts } = await loadTs('src/data/blogPosts.ts');

const productByPath = new Map(Object.values(PRODUCT_PAGES).map((p) => [p.path, p.eyebrow]));
const featureBySlug = new Map(MARKETING_FEATURES.map((f) => [f.slug, f.title]));
const postBySlug = new Map(blogPosts.map((p) => [p.slug, p.title]));

const featureLabel = (slug) =>
  productByPath.get(`/features/${slug}`) ||
  featureBySlug.get(slug) ||
  (slug === 'cod-confirmation' ? 'COD confirmation' : slug.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()));

const destinations = [
  { path: '/', label: 'Home', group: 'main' },
  { path: '/pricing', label: 'Pricing', group: 'main' },
  { path: '/signup', label: 'Sign up (free trial)', group: 'main' },
  { path: '/features', label: 'All features', group: 'features' },
  ...FEATURE_SLUGS.map((s) => ({ path: `/features/${s}`, label: featureLabel(s), group: 'features' })),
  { path: TOOLS_PATH, label: 'All free tools', group: 'tools' },
  ...FREE_TOOLS.map((t) => ({ path: t.href, label: t.title, group: 'tools' })),
  { path: '/blog', label: 'Blog', group: 'blog' },
  ...BLOG_SLUGS.map((s) => ({ path: `/blog/${s}`, label: postBySlug.get(s) || s, group: 'blog' })),
];

// --- Guard rails ---------------------------------------------------------------
const indexable = new Set(getSitemapPaths());
const problems = [];
const seen = new Set();
for (const d of destinations) {
  if (seen.has(d.path)) problems.push(`${d.path} listed twice`);
  seen.add(d.path);
  if (/[*:]/.test(d.path)) problems.push(`${d.path} is a pattern, not a page`);
  if (/^\/(partners|admin)(\/|$)/.test(d.path)) problems.push(`${d.path} may never be a partner destination`);
  if (NOINDEX_PRERENDER_PATHS.includes(d.path)) problems.push(`${d.path} is noindex`);
  if (d.path !== '/signup' && !indexable.has(d.path)) problems.push(`${d.path} is not an indexable page in marketing-urls.mjs`);
  if (!d.label) problems.push(`${d.path} has no label`);
}
if (problems.length) {
  console.error(`\n✖ partner destinations: ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const doc = { version: 1, generatedAt: new Date().toISOString(), base: BASE, destinations };
fs.writeFileSync(OUT, `${JSON.stringify(doc, null, 2)}\n`, 'utf8');
const counts = destinations.reduce((acc, d) => ({ ...acc, [d.group]: (acc[d.group] || 0) + 1 }), {});
console.log(
  `✅ public/partner-destinations.json (${destinations.length} destinations: ${Object.entries(counts)
    .map(([g, n]) => `${g} ${n}`)
    .join(', ')})`,
);

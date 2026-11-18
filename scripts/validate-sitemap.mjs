/**
 * Validate that every sitemap URL is a clean canonical:
 * - HTTP 200 (no redirect hop)
 * - Canonical href matches the requested loc (slashless)
 *
 * Usage (against production after deploy):
 *   SITEMAP_URL=https://topedgeai.com/sitemap.xml node scripts/validate-sitemap.mjs
 *
 * Usage (against local preview):
 *   SITEMAP_FILE=public/sitemap.xml BASE_URL=http://127.0.0.1:4173 node scripts/validate-sitemap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = 'https://topedgeai.com';

async function loadSitemapXml() {
  if (process.env.SITEMAP_FILE) {
    const file = path.resolve(process.cwd(), process.env.SITEMAP_FILE);
    return fs.readFileSync(file, 'utf8');
  }
  const url = process.env.SITEMAP_URL || `${SITE}/sitemap.xml`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status} ${url}`);
  return res.text();
}

function locsFromXml(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function rewriteBase(loc, base) {
  if (!base) return loc;
  return loc.replace(SITE, base.replace(/\/$/, ''));
}

/**
 * `loc` is fetched; `canonicalLoc` is the production URL the sitemap lists.
 * In local mode (BASE_URL) the two differ, and the page's canonical must
 * still point at production, so the comparison always uses the sitemap URL.
 */
async function checkUrl(loc, canonicalLoc = loc) {
  const res = await fetch(loc, { redirect: 'manual' });
  const status = res.status;
  const location = res.headers.get('location') || '';
  let canonical = '';
  let title = '';

  if (status === 200) {
    const html = await res.text();
    const c = html.match(/rel="canonical"\s+href="([^"]+)"/i);
    canonical = c?.[1] || '';
    const t = html.match(/<title>([^<]*)<\/title>/i);
    title = t?.[1] || '';
  }

  const expectedCanonical =
    canonicalLoc.endsWith('/') && canonicalLoc !== `${SITE}/` ? canonicalLoc.slice(0, -1) : canonicalLoc;
  const ok =
    status === 200 &&
    (!canonical || canonical === expectedCanonical || canonical === `${expectedCanonical}/`);

  return { loc, status, location, canonical, title: title.slice(0, 80), ok };
}

async function main() {
  const base = process.env.BASE_URL || '';
  const xml = await loadSitemapXml();
  const prodLocs = locsFromXml(xml);
  console.log(`Checking ${prodLocs.length} sitemap URLs…\n`);

  let failed = 0;
  for (const prodLoc of prodLocs) {
    const loc = rewriteBase(prodLoc, base);
    try {
      const r = await checkUrl(loc, prodLoc);
      const mark = r.ok ? '✓' : '✗';
      if (!r.ok) failed += 1;
      console.log(
        `${mark} ${r.status} ${r.loc}${r.location ? ` → ${r.location}` : ''}${
          r.canonical && r.canonical !== prodLoc ? `  canon=${r.canonical}` : ''
        }`
      );
    } catch (err) {
      failed += 1;
      console.log(`✗ ERR ${loc}: ${err.message}`);
    }
  }

  console.log(`\n${failed === 0 ? '✅ All clear' : `❌ ${failed} problem(s)`}`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

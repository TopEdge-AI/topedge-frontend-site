/**
 * Carry the previous deploys' JS and CSS chunks into this deploy's dist/assets.
 *
 * Why this exists. Every deploy renames every changed chunk (content hashes), and
 * Netlify serves only the files in the current deploy. Any HTML fetched before the
 * deploy (an open tab, a CDN copy, Google's renderer replaying a page it crawled
 * days earlier) then asks for chunks that now 404. Before the prerender-snapshot
 * fix that turned a full page into nine words of error, which is the leading
 * suspect for the Soft 404 reports in Search Console (5 Nov 2026).
 *
 * How it works, with no state outside the site itself:
 *   1. Read the live site's /asset-history.json (written by this script on the
 *      previous deploy). On the first run it does not exist, so fall back to
 *      crawling the live chunk graph from the homepage's entry script.
 *   2. Also crawl the live graph every time, so the deploy being replaced is
 *      always covered even if its history file was missing.
 *   3. Download each file that is not in this build from the live site, keeping
 *      anything last served within RETAIN_DAYS.
 *   4. Write the merged history into dist/asset-history.json for next time.
 *
 * Old chunks are only ever added, never overwritten (hashed names cannot clash
 * with different content). A network failure warns and continues: losing this
 * step costs old tabs, not the deploy.
 *
 * Runs in build:netlify after the prerender. RETAIN_ASSETS=0 skips it.
 * Usage: node scripts/retain-old-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const assetsDir = path.join(dist, 'assets');

const LIVE = (process.env.RETAIN_ASSETS_ORIGIN || 'https://topedgeai.com').replace(/\/+$/, '');
const HISTORY = 'asset-history.json';
// Google's renderer caches subresources for weeks and ignores cache headers, so
// keep chunks well past a typical recrawl gap.
const RETAIN_DAYS = 45;
const MAX_FILE_BYTES = 3 * 1024 * 1024;
const CONCURRENCY = 8;

const isChunk = (f) => /^assets\/[\w.-]+\.(?:js|css)$/.test(f);
const now = new Date().toISOString();

async function get(url, as = 'text') {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: 'follow' });
    if (!res.ok) return { status: res.status, body: null };
    const body = as === 'buffer' ? Buffer.from(await res.arrayBuffer()) : await res.text();
    return { status: res.status, body };
  } finally {
    clearTimeout(timer);
  }
}

/** Every assets/*.js|css reachable from the live homepage, by reading the chunks. */
async function crawlLiveGraph() {
  const found = new Set();
  const home = await get(`${LIVE}/`);
  if (!home.body) throw new Error(`live homepage returned ${home.status}`);
  for (const m of home.body.matchAll(/\/(assets\/[\w.-]+\.(?:js|css))/g)) found.add(m[1]);

  const queue = [...found].filter((f) => f.endsWith('.js'));
  const seen = new Set(queue);
  while (queue.length) {
    const batch = queue.splice(0, CONCURRENCY);
    const texts = await Promise.all(batch.map((f) => get(`${LIVE}/${f}`).catch(() => ({ body: null }))));
    for (const { body } of texts) {
      if (!body) continue;
      // Absolute refs from Vite's preload lists, and relative dynamic imports.
      const refs = [
        ...[...body.matchAll(/assets\/[\w.-]+\.(?:js|css)/g)].map((m) => m[0]),
        ...[...body.matchAll(/["'`]\.\/([\w.-]+\.(?:js|css))["'`]/g)].map((m) => `assets/${m[1]}`),
      ];
      for (const ref of refs) {
        found.add(ref);
        if (ref.endsWith('.js') && !seen.has(ref)) {
          seen.add(ref);
          queue.push(ref);
        }
      }
    }
  }
  return found;
}

async function main() {
  if (process.env.RETAIN_ASSETS === '0') {
    console.log('↷ retain-old-assets: skipped (RETAIN_ASSETS=0)');
    return;
  }
  if (!fs.existsSync(assetsDir)) throw new Error('dist/assets missing — run vite build first');

  const current = new Set(
    fs.readdirSync(assetsDir).map((f) => `assets/${f}`).filter(isChunk),
  );

  /** file -> ISO date it was last part of a live deploy */
  const history = {};

  try {
    const prev = await get(`${LIVE}/${HISTORY}`);
    if (prev.body) {
      const files = JSON.parse(prev.body)?.files || {};
      for (const [f, seen] of Object.entries(files)) if (isChunk(f)) history[f] = seen;
    } else {
      console.log(`   ↳ no ${HISTORY} on ${LIVE} yet (first run), crawling the live chunk graph`);
    }
  } catch (err) {
    console.warn(`⚠️  retain-old-assets: could not read live ${HISTORY}: ${err.message}`);
  }

  try {
    for (const f of await crawlLiveGraph()) history[f] = now;
  } catch (err) {
    console.warn(`⚠️  retain-old-assets: could not crawl ${LIVE}: ${err.message}`);
  }

  const cutoff = Date.now() - RETAIN_DAYS * 86400000;
  const wanted = Object.entries(history)
    .filter(([f, seen]) => !current.has(f) && Date.parse(seen) >= cutoff)
    .map(([f]) => f);

  let copied = 0;
  let gone = 0;
  let bytes = 0;
  const kept = {};
  for (let i = 0; i < wanted.length; i += CONCURRENCY) {
    const batch = wanted.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map((f) => get(`${LIVE}/${f}`, 'buffer').catch(() => ({ body: null, status: 0 }))),
    );
    batch.forEach((f, j) => {
      const { body } = results[j];
      if (!body || body.length > MAX_FILE_BYTES) {
        gone += 1;
        return;
      }
      fs.writeFileSync(path.join(dist, f), body);
      kept[f] = history[f];
      copied += 1;
      bytes += body.length;
    });
  }

  const files = { ...kept };
  for (const f of current) files[f] = now;
  fs.writeFileSync(
    path.join(dist, HISTORY),
    `${JSON.stringify({ updated: now, retainDays: RETAIN_DAYS, files }, null, 0)}\n`,
  );

  console.log(
    `✅ retain-old-assets: ${current.size} new chunks, ${copied} older chunks carried over (${(bytes / 1024).toFixed(0)} KB), ${gone} no longer fetchable`,
  );
}

main().catch((err) => {
  // Never block a deploy on this: the cost of skipping it is stale tabs, not the site.
  console.warn(`⚠️  retain-old-assets failed, continuing without old chunks: ${err.message}`);
});

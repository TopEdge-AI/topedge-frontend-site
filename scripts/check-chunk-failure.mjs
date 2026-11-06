/**
 * Fail the build if a missing JS chunk can wipe a prerendered page.
 *
 * Why this exists. On 5 Nov 2026 a blocked lazy chunk turned
 * /tools/whatsapp-link-generator from a full page into nine words ("Something
 * went wrong. The page failed to load."), because createRoot discards the
 * prerendered HTML and AppErrorBoundary had nothing to show but an error. Four
 * URLs were Soft 404 in Search Console at the time.
 *
 * For each route below this loads the built page in Chromium with that route's
 * own lazy chunk blocked (exactly what an old HTML file sees after a deploy), and
 * compares the visible text against the same page with JavaScript off. The page
 * must keep at least MIN_RATIO of its words and must not show the error text.
 *
 * Runs in build:netlify after the prerender. Usage: node scripts/check-chunk-failure.mjs
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const PORT = Number(process.env.CHUNK_CHECK_PORT || 4181);
const BASE = `http://127.0.0.1:${PORT}`;
const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');

/** Route -> the React.lazy chunk that renders it (file name prefix in dist/assets). */
const CASES = [
  ['/tools/whatsapp-link-generator', 'WhatsAppLinkGeneratorPage'],
  ['/features/cod-confirmation', 'CodConfirmationPage'],
  ['/pricing', 'PricingPage'],
  ['/blog/whatsapp-abandoned-cart-recovery-shopify', 'BlogPost'],
];
const MIN_RATIO = 0.8;
const ERROR_TEXT = 'The page failed to load';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      /* retry */
    }
    await sleep(250);
  }
  throw new Error(`Preview server did not start at ${url}`);
}

const words = (text) => (text.match(/\S+/g) || []).length;

async function visibleWords(page) {
  return page.evaluate(() => document.body.innerText || '');
}

async function main() {
  const assets = fs.readdirSync(path.join(dist, 'assets'));
  const failures = [];

  const preview = spawn(
    process.execPath,
    [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    { cwd: root, stdio: 'ignore', env: { ...process.env, BROWSER: 'none' }, detached: process.platform !== 'win32' },
  );

  let browser;
  try {
    await waitForServer(BASE);
    // The prerender step has already installed Chromium (or been pointed at one).
    const executablePath = process.env.PRERENDER_CHROMIUM_PATH || undefined;
    browser = await chromium.launch({ headless: true, executablePath });
    const noJs = await browser.newContext({ javaScriptEnabled: false });

    for (const [route, chunk] of CASES) {
      const pattern = new RegExp(`^${chunk}-[\\w]+\\.js$`);
      if (!assets.some((f) => pattern.test(f))) {
        failures.push(`${route}: no ${chunk}-*.js in dist/assets, so this check is stale; update CASES`);
        continue;
      }

      const plain = await noJs.newPage();
      await plain.goto(`${BASE}${route}`, { waitUntil: 'load' });
      const baseline = words(await visibleWords(plain));
      await plain.close();

      const ctx = await browser.newContext();
      // Make sure analytics and the like never leave the machine during the check.
      await ctx.route((url) => !url.href.startsWith(BASE), (r) => r.abort());
      let blocked = 0;
      await ctx.route(
        (url) => url.href.startsWith(`${BASE}/assets/`) && pattern.test(url.pathname.split('/').pop()),
        (r) => {
          blocked += 1;
          return r.fulfill({ status: 404, body: 'gone' });
        },
      );
      const page = await ctx.newPage();
      await page.goto(`${BASE}${route}`, { waitUntil: 'load' });
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      await sleep(1500);
      const text = await visibleWords(page);
      const after = words(text);
      const hasH1 = await page.locator('h1').count();
      await ctx.close();

      const ratio = baseline ? after / baseline : 0;
      const line = `${route}: ${after} of ${baseline} words with ${chunk} blocked (${Math.round(ratio * 100)}%)`;
      if (!blocked) failures.push(`${route}: the ${chunk} chunk was never requested, so nothing was tested`);
      else if (text.includes(ERROR_TEXT)) failures.push(`${line}, and the error screen replaced the page`);
      else if (ratio < MIN_RATIO || !hasH1) failures.push(`${line}, below ${MIN_RATIO * 100}% or no <h1>`);
      else console.log(`  ✓ ${line}`);
    }
  } finally {
    await browser?.close().catch(() => {});
    try {
      if (process.platform === 'win32') preview.kill('SIGKILL');
      else process.kill(-preview.pid, 'SIGKILL');
    } catch {
      /* already gone */
    }
  }

  if (failures.length) {
    console.error('\n✖ check-chunk-failure: a missing chunk can still wipe a page');
    for (const f of failures) console.error(`  ✗ ${f}`);
    process.exit(1);
  }
  console.log('✅ check-chunk-failure: pages keep their content when a route chunk 404s');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

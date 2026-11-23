/**
 * Fail the build when the partner offer on the site is wrong.
 *
 * src/marketing/data/partners.ts is the one place the site keeps the partner
 * commission tiers. This checks, in the style of check-catalog-drift.mjs:
 *
 *   1. The tiers are the founder's: 20% from 1 client, 30% from 5, 40% from 10,
 *      with a 7-day check period and payouts on the 1st.
 *   2. When the partner service is reachable, partners.ts matches its
 *      GET /v1/public/policy (tiers, holdDays, payoutDayOfMonth). An unreachable
 *      service is a pass with a warning, never a failure: the service may not be
 *      deployed yet, and an outage is not drift. Set STRICT_PARTNER_POLICY=1 to fail.
 *   3. No refund wording and no emoji in the partner page sources (TopEdge AI
 *      gives no money back on payments, founder 2026-11-21). With --dist it also
 *      reads the prerendered dist/partners.html and dist/partners/terms.html.
 *
 * Usage: node scripts/check-partner-offer.mjs [--dist]
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolveViteEnv } from './load-billing-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const withDist = process.argv.includes('--dist');

const EXPECTED = {
  tiers: [
    { minClients: 1, rateBp: 2000 },
    { minClients: 5, rateBp: 3000 },
    { minClients: 10, rateBp: 4000 },
  ],
  holdDays: 7,
  payoutDayOfMonth: 1,
};

async function loadPartners() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-partners-'));
  const outfile = path.join(dir, 'partners.mjs');
  try {
    await build({
      entryPoints: [path.join(root, 'src/marketing/data/partners.ts')],
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

const tiersKey = (tiers) =>
  JSON.stringify((tiers || []).map((t) => ({ minClients: Number(t.minClients), rateBp: Number(t.rateBp) })));

const failures = [];
const P = await loadPartners();
const local = {
  tiers: P.PARTNER_TIERS,
  holdDays: P.PARTNER_HOLD_DAYS,
  payoutDayOfMonth: P.PARTNER_PAYOUT_DAY,
};

// --- 1. The founder's offer ------------------------------------------------------
if (tiersKey(local.tiers) !== tiersKey(EXPECTED.tiers)) {
  failures.push(`partners.ts tiers are ${tiersKey(local.tiers)}, expected ${tiersKey(EXPECTED.tiers)}`);
}
if (local.holdDays !== EXPECTED.holdDays) failures.push(`PARTNER_HOLD_DAYS is ${local.holdDays}, expected ${EXPECTED.holdDays}`);
if (local.payoutDayOfMonth !== EXPECTED.payoutDayOfMonth) {
  failures.push(`PARTNER_PAYOUT_DAY is ${local.payoutDayOfMonth}, expected ${EXPECTED.payoutDayOfMonth}`);
}

// --- 2. Against the live policy, when reachable -----------------------------------
const env = resolveViteEnv();
const api = String(env.VITE_PARTNERS_API_URL || 'https://partners-api.topedgeai.com').replace(/\/+$/, '');
const policyUrl = `${api}/v1/public/policy`;
let policyNote = '';
try {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  let res;
  try {
    res = await fetch(policyUrl, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const live = await res.json();
  if (!Array.isArray(live?.tiers) || !live.tiers.length) throw new Error('response has no tiers');
  if (tiersKey(live.tiers) !== tiersKey(local.tiers)) {
    failures.push(`live policy v${live.version} tiers ${tiersKey(live.tiers)} differ from partners.ts ${tiersKey(local.tiers)}`);
  }
  if (Number(live.holdDays) !== local.holdDays) {
    failures.push(`live policy holdDays ${live.holdDays} differs from PARTNER_HOLD_DAYS ${local.holdDays}`);
  }
  if (Number(live.payoutDayOfMonth) !== local.payoutDayOfMonth) {
    failures.push(`live policy payoutDayOfMonth ${live.payoutDayOfMonth} differs from PARTNER_PAYOUT_DAY ${local.payoutDayOfMonth}`);
  }
  policyNote = `matches live policy v${live.version}`;
} catch (err) {
  const msg = `could not read ${policyUrl}: ${err.name === 'AbortError' ? 'timed out' : err.message}`;
  if (process.env.STRICT_PARTNER_POLICY === '1') failures.push(`${msg} (STRICT_PARTNER_POLICY=1)`);
  else {
    console.warn(`⚠️  partner policy check skipped — ${msg}`);
    console.warn('   Not failing the build: the partner service being unreachable is not drift.');
    policyNote = 'live policy unreachable, skipped';
  }
}

// --- 3. Copy rules on the partner pages -------------------------------------------
const SOURCES = [
  'src/marketing/data/partners.ts',
  'src/marketing/pages/PartnersPage.tsx',
  'src/marketing/pages/PartnersTermsPage.tsx',
  'src/marketing/styles/partners.css',
  ...fs
    .readdirSync(path.join(root, 'src/marketing/components/partners'))
    .map((f) => `src/marketing/components/partners/${f}`),
];
const DIST = ['dist/partners.html', 'dist/partners/terms.html'];
const REFUND = /\brefund|money[- ]back guarantee|clawback|claw back/i;
// Emoji only: pictographs shown as emoji, or text symbols forced to emoji with VS16.
// (Plain © or ™ in a footer are not emoji.)
const EMOJI = /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/u;

const files = [...SOURCES, ...(withDist ? DIST : [])];
for (const rel of files) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    if (rel.startsWith('dist/')) failures.push(`${rel} missing: the prerender did not write the partner page`);
    continue;
  }
  const lines = fs.readFileSync(abs, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const r = line.match(REFUND);
    if (r) failures.push(`${rel}:${i + 1} has refund wording ("${r[0]}"). TopEdge AI offers no refunds.`);
    const e = line.match(EMOJI);
    if (e) failures.push(`${rel}:${i + 1} has an emoji (${e[0]})`);
  });
}

if (failures.length) {
  console.error(`\n✖ partner offer check failed (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('\nFix src/marketing/data/partners.ts or the partner page copy.\n');
  process.exit(1);
}
const rates = local.tiers.map((t) => `${t.rateBp / 100}% from ${t.minClients}`).join(', ');
console.log(
  `✅ partner offer check passed — ${rates}; ${local.holdDays}-day check period; paid on day ${local.payoutDayOfMonth}; ` +
    `${policyNote}; ${files.length} file(s) free of refund wording and emoji`,
);

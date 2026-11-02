#!/usr/bin/env node
/**
 * Decide, from production rather than from memory, whether the trailing-slash
 * 301s can safely come back.
 *
 * Background. Google indexes both `/path` and `/path/` for a good share of this
 * site. Confirmed on 2026-11-02 with the Search Console URL Inspection API:
 * `/blog/whatsapp-abandoned-cart-recovery-shopify/` reports "Submitted and
 * indexed" with googleCanonical set to the TRAILING-SLASH form, even though the
 * page's own canonical tag and the sitemap both name the slashless one. So the
 * canonical tag is not winning, and the duplicate is real.
 *
 * The fix is one explicit `/<path>/  /<path>  301!` per sitemap URL. It shipped
 * once, on 2026-10-08, and took the site down with ERR_TOO_MANY_REDIRECTS,
 * because Netlify's Pretty URLs setting 301s a slashless path to its
 * trailing-slash form: `/compare` -> `/compare/` -> (our rule) -> `/compare`,
 * forever. scripts/generate-redirects.mjs has refused to emit that rule shape
 * ever since, and should keep refusing until this script says otherwise.
 *
 * The precondition, quoted from that file: "It needs Pretty URLs off on the
 * Netlify site first; verify with `curl -sI https://topedgeai.com/compare`
 * showing 200 and not a 301 to /compare/."
 *
 * One curl is not enough to bet the site on, because Pretty URLs can behave
 * differently depending on whether a file backs the path. This checks every
 * distinct shape the site serves: prerendered flat HTML, nested prerendered
 * pages, hand-written static HTML, SPA shells, and a path with no file at all.
 * A single slashless URL answering 301 is a NO-GO for the whole change.
 *
 * Usage:
 *   node scripts/check-trailing-slash.mjs            # production
 *   node scripts/check-trailing-slash.mjs --base https://deploy-preview--x.netlify.app
 *
 * Exit code 0 means GO. Non-zero means leave the guard in place.
 */
const args = process.argv.slice(2);
const baseIdx = args.indexOf('--base');
const BASE = baseIdx !== -1 ? args[baseIdx + 1].replace(/\/$/, '') : 'https://topedgeai.com';

/** One per serving shape, because that is what Pretty URLs keys off. */
const SAMPLES = [
  { path: '/compare', shape: 'prerendered flat html (the documented canary)' },
  { path: '/pricing', shape: 'prerendered flat html' },
  { path: '/blog/whatsapp-abandoned-cart-recovery-shopify', shape: 'prerendered nested, blog' },
  { path: '/compare/wati', shape: 'prerendered nested, compare' },
  { path: '/docs/troubleshooting', shape: 'prerendered nested, docs' },
  { path: '/features/ai-brain', shape: 'prerendered nested, features' },
  { path: '/whatsapp-festival-templates/diwali', shape: 'prerendered nested, festival' },
  { path: '/privacy', shape: 'hand-written static html via 200! rewrite' },
  { path: '/login', shape: 'SPA shell via 200 rewrite' },
  { path: '/this-path-does-not-exist-9f3a', shape: 'no file, hits the 404 catch-all' },
];

const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

async function head(url) {
  const res = await fetch(url, { method: 'GET', redirect: 'manual', headers: { 'User-Agent': UA } });
  return { status: res.status, location: res.headers.get('location') || '' };
}

function redirectsToOwnSlash(path, status, location) {
  if (status !== 301 && status !== 308) return false;
  try {
    const to = new URL(location, BASE);
    return to.pathname === `${path}/`;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`Trailing-slash precondition check against ${BASE}\n`);
  const blockers = [];
  const notes = [];

  for (const { path, shape } of SAMPLES) {
    let r;
    try {
      r = await head(`${BASE}${path}`);
    } catch (err) {
      blockers.push(`${path} — request failed: ${err.message}`);
      console.log(`  ✗ ${path.padEnd(48)} request failed`);
      continue;
    }
    if (redirectsToOwnSlash(path, r.status, r.location)) {
      blockers.push(`${path} — ${r.status} to its own trailing-slash form. Pretty URLs is ON.`);
      console.log(`  ✗ ${path.padEnd(48)} ${r.status} -> ${r.location}   PRETTY URLS ON`);
      continue;
    }
    // A 301 somewhere else is a deliberate rule (e.g. /security -> /features)
    // and says nothing about Pretty URLs, so it is reported but not a blocker.
    if (r.status === 301 || r.status === 308) {
      notes.push(`${path} — ${r.status} to ${r.location} (deliberate rule, not a slash loop)`);
      console.log(`  • ${path.padEnd(48)} ${r.status} -> ${r.location}`);
      continue;
    }
    console.log(`  ✓ ${path.padEnd(48)} ${r.status}   (${shape})`);
  }

  if (notes.length) {
    console.log('\nDeliberate redirects seen (not blockers):');
    for (const n of notes) console.log(`  ${n}`);
  }

  if (blockers.length) {
    console.log(`\n❌ NO-GO. ${blockers.length} path(s) 301 to their own slash form:`);
    for (const b of blockers) console.log(`  ${b}`);
    console.log('\nLeave the guard in scripts/generate-redirects.mjs exactly as it is.');
    process.exit(1);
  }

  console.log(
    '\n✅ GO. No sampled path redirects to its own trailing-slash form, across every\n' +
      '   serving shape on the site, so the Pretty URLs loop partner is absent.\n' +
      '   The slash-strip 301s can be re-enabled. Re-run this against the deploy\n' +
      '   preview before promoting, and against production immediately after.',
  );
}

main();

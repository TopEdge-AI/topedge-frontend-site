/**
 * Keep public/_redirects SPA/404 footer in sync with marketing-urls.
 *
 * Soft-404: unknown URLs must NOT fall through to homepage index.html.
 * SPA client routes (login/signup/admin/dev) get their own noindex shells
 * written by build-static.js, never the homepage prerender.
 *
 * NEVER emit trailing-slash force redirects (Netlify Pretty URLs + flat .html).
 * Patterns like "star-slash → :splat 301!" match slashless paths too and
 * 301-loop every marketing URL onto itself (ERR_TOO_MANY_REDIRECTS).
 * Slashless canonicals + sitemap locs are the SEO signal.
 *
 * After deploy smoke (see docs/seo/measurement.md § redirect/soft-404):
 *   curl -sI https://topedgeai.com/this-is-not-a-real-page-xyz → HTTP 404
 *   curl -sI https://topedgeai.com/pricing → HTTP 200 (not a 301 loop)
 *
 * Markers: BEGIN GENERATED … END GENERATED
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSitemapPaths } from './marketing-urls.mjs';

/**
 * Opt-in, off by default. See the long note above buildGeneratedBlock().
 * Set ENABLE_SLASH_301=1 only after `node scripts/check-trailing-slash.mjs`
 * exits 0 against the environment you are about to deploy to.
 */
const SLASH_301 = process.env.ENABLE_SLASH_301 === '1';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const redirectsPath = path.resolve(__dirname, '../public/_redirects');

const BEGIN = '# BEGIN GENERATED — do not edit (scripts/generate-redirects.mjs)';
const END = '# END GENERATED';

/**
 * Trailing-slash duplicates are NOT solved here. Reverted 2026-10-08.
 *
 * The previous version emitted one explicit `/<path>/  /<path>  301!` per sitemap
 * URL to collapse the GSC "Duplicate without user-selected canonical" pair, on the
 * reasoning that an explicit rule cannot loop because its source always has the
 * slash and its target never does, and no other generated rule matches the target.
 *
 * That holds inside this file, which is why it passed review. The loop partner is
 * not in this file: it is Netlify's Pretty URLs, which 301s a path to its
 * trailing-slash form. So `/compare` → `/compare/` → (our rule) → `/compare` →
 * forever, and the browser gives up with ERR_TOO_MANY_REDIRECTS. That is what the
 * header above has always meant by "they self-loop with Pretty URLs"; the hazard is
 * the slash-stripping 301 itself, not the wildcard spelling of it.
 *
 * Observed: /compare, /blog/*, /pricing and /docs/* all broke, while
 * /lp/cod-confirmation kept serving — it is noindex, so it is not in
 * getSitemapPaths() and never got a rule. /privacy and /terms were skipped and
 * also stayed up. The Oct 7 crawl in seo-audit/evidence has all 101 URLs at 200,
 * before these rules existed.
 *
 * The duplicate is real and still worth fixing. It needs Pretty URLs off on the
 * Netlify site first; verify with `curl -sI https://topedgeai.com/compare` showing
 * 200 and not a 301 to /compare/, then these rules can come back. Until then the
 * canonical tag is the signal.
 */

/**
 * One explicit `/<path>/  /<path>  301!` per sitemap URL, or nothing.
 *
 * Confirmed duplicate, 2026-11-02, Search Console URL Inspection API:
 * /blog/whatsapp-abandoned-cart-recovery-shopify/ is "Submitted and indexed"
 * with googleCanonical pointing at the TRAILING-SLASH form, against a page
 * whose canonical tag and sitemap entry both name the slashless one. The
 * canonical tag is losing, so the duplicate needs a redirect to settle it.
 *
 * Gated because this exact rule shape caused the 2026-10-08 outage, when
 * Netlify's Pretty URLs 301'd the slashless form back and every marketing URL
 * self-looped. scripts/check-trailing-slash.mjs probes production for that
 * loop partner across all ten serving shapes on this site and exits non-zero
 * if any of them still redirects to its own slash form. Run it first.
 */
function slashStripBlock() {
  if (!SLASH_301) {
    return (
      '# Trailing-slash 301s are OFF (ENABLE_SLASH_301 unset). Google indexes both\n' +
      '# forms and picked the slash one as canonical for at least one blog post.\n' +
      '# To turn them on: run `node scripts/check-trailing-slash.mjs`, and only if\n' +
      '# it exits 0, rebuild with ENABLE_SLASH_301=1. Re-run it after deploying.\n\n'
    );
  }
  const paths = getSitemapPaths()
    .map((p) => (typeof p === 'string' ? p : p.path || p.loc || ''))
    .map((p) => p.replace(/^https?:\/\/[^/]+/, ''))
    .filter((p) => p && p !== '/' && !p.endsWith('/'));
  const uniq = [...new Set(paths)].sort();
  const rules = uniq.map((p) => `${p}/  ${p}  301!`).join('\n');
  return (
    `# Trailing-slash duplicates: ${uniq.length} explicit 301s (ENABLE_SLASH_301=1).\n` +
    `# Safe only while no slashless path 301s to its own slash form; verified by\n` +
    `# scripts/check-trailing-slash.mjs. If the site ever loops, unset the flag.\n` +
    `${rules}\n\n`
  );
}

function buildGeneratedBlock() {
  return `${BEGIN}
# Client-only SPA shells (must stay above the 404 catch-all)
# login/signup: noindex shells from build-static.js (never the homepage prerender)
# /docs is not here: every doc page is prerendered (scripts/marketing-urls.mjs).
/login  /login.html  200
/login/  /login.html  200
/signup  /signup.html  200
/signup/  /signup.html  200
/dev/*  /dev.html  200

# Retired builder-community and admin areas: tell crawlers they are gone for good.
/community  /404.html  410!
/community/*  /404.html  410!
/admin  /404.html  410!
/admin/*  /404.html  410!

${slashStripBlock()}# Soft-404: unknown paths get noindex 404.html — never homepage SEO
# (Do not add trailing-slash force 301s — they self-loop with Pretty URLs.)
/*  /404.html  404
${END}
`;
}

function main() {
  if (!fs.existsSync(redirectsPath)) {
    throw new Error(`Missing ${redirectsPath}`);
  }
  const raw = fs.readFileSync(redirectsPath, 'utf8');
  const beginIdx = raw.indexOf(BEGIN);
  const endIdx = raw.indexOf(END);

  let head;
  if (beginIdx !== -1 && endIdx !== -1 && endIdx > beginIdx) {
    head = raw.slice(0, beginIdx).replace(/\s+$/, '');
  } else {
    head = raw
      .replace(/\n# SPA fallback[\s\S]*$/m, '')
      .replace(/\n\/\*  \/index\.html  200\s*$/m, '')
      .replace(/\s+$/, '');
  }

  const next = `${head}\n\n${buildGeneratedBlock()}\n`;
  // Fail closed: never write path catch-all slash-strip force 301s (line-anchored;
  // ignore comments that document the ban).
  if (/^\/\*\/\s+\/:splat\s+301!/m.test(next) || /^\/\*\s+\/:splat\s+301!/m.test(next)) {
    throw new Error(
      'Refusing to write a wildcard trailing-slash force 301 into _redirects (Netlify self-loop risk).',
    );
  }
  // Any forced 301 from a path to that same path without its trailing slash loops
  // against Netlify's Pretty URLs, however it is spelled. The wildcard check above
  // did not catch the explicit per-URL form, which is how the 2026-10-08 outage
  // shipped, so the shape is banned rather than one way of writing it.
  const selfSlashStrip = next
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .filter((l) => {
      const m = l.match(/^(\/\S*?)\/\s+(\/\S*)\s+30[18]!/);
      return m && m[1] === m[2];
    });
  if (selfSlashStrip.length && !SLASH_301) {
    throw new Error(
      `Refusing to write ${selfSlashStrip.length} slash-stripping force 301s into _redirects ` +
        `(Netlify Pretty URLs 301s the slashless form back, so each one is a loop). ` +
        `First: ${selfSlashStrip[0]}`,
    );
  }
  fs.writeFileSync(redirectsPath, next, 'utf8');
  console.log(
    `✅ Updated ${redirectsPath} (SPA shells + soft-404; ` +
      `${SLASH_301 ? `${selfSlashStrip.length} slash 301s` : 'no slash 301s'})`,
  );
}

main();

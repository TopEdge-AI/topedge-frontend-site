/**
 * Fail the build when the festive template library cannot serve its pages.
 *
 * Twenty-five pages are generated from one data file, which is exactly the
 * shape of content that rots quietly: a festival renamed in the dashboard
 * catalog leaves a page with four missing templates, a description edited past
 * 160 characters gets truncated in the snippet on a page nobody opens, and a
 * slug added to the data file without the route registry gives you a sitemap
 * entry that 404s. None of those surface in a browser check of one page.
 *
 * What this asserts:
 *   1. Every festival joins to exactly four catalog rows, one per stage.
 *   2. Every catalog row is claimed by a festival (nothing orphaned).
 *   3. Slugs and catalog names are unique, and slugs are URL-safe.
 *   4. Titles and descriptions sit inside the snippet budgets in
 *      scripts/seo-contracts.mjs, the same limits the blog check enforces.
 *   5. The slug list matches FESTIVAL_SLUGS in scripts/marketing-urls.mjs, so
 *      prerender, sitemap and llms.txt cover every page.
 *   6. Every festival date string parses to at least one real date, since the
 *      countdown and the "upcoming" rail are built from it.
 *   7. Every festival carries the copy the page renders — no empty sections.
 *
 * Usage: node scripts/check-festival-templates.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertSnippetBudgets } from './seo-contracts.mjs';
import { FESTIVAL_SLUGS as REGISTERED_SLUGS } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const errors = [];
const fail = (msg) => errors.push(msg);

/**
 * The two data files are TypeScript, and this script runs in plain node during
 * the build, so they are read as text and the literals pulled out rather than
 * imported. Narrow but stable: both files are generated-or-curated data, not
 * logic, and a shape change loud enough to break these regexes should break the
 * build rather than pass silently.
 */
function readSource(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    fail(`${rel} is missing`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

const catalogSrc = readSource('src/marketing/data/festivalTemplateCatalog.ts');
const festivalsSrc = readSource('src/marketing/data/festivalTemplates.ts');
if (errors.length) {
  console.error(`\n✖ festival template check failed:\n  - ${errors.join('\n  - ')}\n`);
  process.exit(1);
}

/**
 * One quoted field off a data block.
 *
 * Values are written as single- or double-quoted literals — a name containing
 * an apostrophe, like "New Year's Day", uses double quotes — and either sit on
 * the key's own line or wrap onto the next. All four shapes are read, because
 * the first version of this reader only handled single quotes on one line and
 * silently dropped New Year's Day from a 25-item list.
 */
function stringField(block, field) {
  for (const q of ["'", '"']) {
    const body = '((?:[^' + q + '\\\\]|\\\\.)*)';
    const inline = block.match(new RegExp(field + ': ' + q + body + q));
    const wrapped = block.match(new RegExp(field + ':\\n\\s+' + q + body + q));
    const raw = inline?.[1] ?? wrapped?.[1];
    if (raw != null) {
      return raw.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\u2019/g, '’');
    }
  }
  return undefined;
}

/** Catalog rows: festivalName + stage + date, which is all this check needs. */
const catalogRows = [];
for (const block of catalogSrc.split(/\n  \{\n/).slice(1)) {
  const festivalName = stringField(block, 'festivalName');
  const stage = stringField(block, 'stage');
  const festivalDate = stringField(block, 'festivalDate');
  const id = stringField(block, 'id');
  if (!festivalName || !stage || !festivalDate || !id) continue;
  catalogRows.push({ id, festivalName, stage, festivalDate });
}

if (catalogRows.length !== 100) {
  fail(`expected 100 catalog rows, parsed ${catalogRows.length} — has the catalog shape changed?`);
}

/** Festival entries: everything the page templates read. */
const STRING_FIELDS = [
  'slug', 'catalogName', 'name', 'shortName', 'cluster', 'tradition', 'regions',
  'title', 'description', 'keywords', 'eyebrow', 'h1', 'h1Accent', 'subtitle',
  'answerFirst', 'peak', 'buyerIntent', 'targeting', 'watchOut',
];

const festivalsBlock = festivalsSrc.match(
  /export const FESTIVALS: Festival\[\] = \[\n([\s\S]*?)\n\];\n/,
);
if (!festivalsBlock) {
  console.error('\n✖ could not locate the FESTIVALS array in festivalTemplates.ts\n');
  process.exit(1);
}

const festivals = [];
// A leading newline so the first entry meets the same `\n  {\n` boundary as the
// rest of them, rather than being treated as the pre-array preamble and dropped.
for (const block of `\n${festivalsBlock[1]}`.split(/\n  \{\n/).slice(1)) {
  const entry = {};
  for (const field of STRING_FIELDS) {
    const raw = stringField(block, field);
    if (raw != null) entry[field] = raw;
  }
  entry.sellsCount = (block.match(/sells: \[([\s\S]*?)\n    \]/)?.[1] || '')
    .split('\n')
    .filter((l) => l.trim().startsWith("'")).length;
  entry.faqCount = (block.match(/question:/g) || []).length;
  if (entry.slug) festivals.push(entry);
}

if (festivals.length !== 25) {
  fail(`expected 25 festivals, parsed ${festivals.length}`);
}

/* 1 + 2 — the join between copy and catalog */
const STAGES = ['early-access', 'gift-guide', 'flash-sale', 'greeting'];
const claimed = new Set();
for (const f of festivals) {
  const rows = catalogRows.filter((r) => r.festivalName === f.catalogName);
  if (rows.length !== 4) {
    fail(`${f.slug}: catalogName "${f.catalogName}" matches ${rows.length} catalog rows, expected 4`);
    continue;
  }
  const stages = rows.map((r) => r.stage).sort();
  if (STAGES.slice().sort().join(',') !== stages.join(',')) {
    fail(`${f.slug}: stages are [${stages.join(', ')}], expected one of each`);
  }
  rows.forEach((r) => claimed.add(r.id));
}
for (const r of catalogRows) {
  if (!claimed.has(r.id)) fail(`catalog row "${r.id}" (${r.festivalName}) has no festival page`);
}

/* 3 — identity */
const seenSlug = new Map();
const seenCatalog = new Map();
for (const f of festivals) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.slug)) fail(`slug "${f.slug}" is not URL-safe`);
  if (seenSlug.has(f.slug)) fail(`duplicate slug "${f.slug}"`);
  seenSlug.set(f.slug, true);
  if (seenCatalog.has(f.catalogName)) fail(`two festivals claim catalogName "${f.catalogName}"`);
  seenCatalog.set(f.catalogName, true);
}

/* 4 — snippet budgets, the same ones the blog and prerender audits use */
for (const f of festivals) {
  const budgets = assertSnippetBudgets(f.title, f.description);
  if (!budgets.ok) for (const e of budgets.errors) fail(`${f.slug}: ${e}`);
  // The h1 accent has to appear in the h1, or the highlight span half-matches
  // and the heading renders with no emphasis at all.
  if (f.h1Accent && !f.h1.includes(f.h1Accent)) {
    fail(`${f.slug}: h1Accent "${f.h1Accent}" does not appear in h1 "${f.h1}"`);
  }
}

/* 5 — route registry */
const dataSlugs = festivals.map((f) => f.slug);
const missing = dataSlugs.filter((s) => !REGISTERED_SLUGS.includes(s));
const extra = REGISTERED_SLUGS.filter((s) => !dataSlugs.includes(s));
if (missing.length) {
  fail(`FESTIVAL_SLUGS in scripts/marketing-urls.mjs is missing: ${missing.join(', ')}`);
}
if (extra.length) {
  fail(`FESTIVAL_SLUGS lists slugs with no festival data: ${extra.join(', ')}`);
}
if (REGISTERED_SLUGS.join(',') !== dataSlugs.join(',')) {
  fail('FESTIVAL_SLUGS is not in the same order as FESTIVALS — keep both in calendar order');
}

/* 6 — dates parse */
const MONTHS = /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;
for (const f of festivals) {
  const row = catalogRows.find((r) => r.festivalName === f.catalogName);
  if (!row) continue;
  const parts = row.festivalDate.split('|').map((p) => p.trim()).filter(Boolean);
  const parsed = parts.filter((p) =>
    MONTHS.test(p) &&
    /^[A-Za-z]{3,}\s+\d{1,2}(\s*[-–]\s*([A-Za-z]{3,}\s+)?\d{1,2})?,\s*\d{4}$/.test(p),
  );
  if (!parsed.length) {
    fail(`${f.slug}: festivalDate "${row.festivalDate}" parses to no usable date`);
  }
}

/* 7 — the page has something to render in every section */
for (const f of festivals) {
  for (const field of STRING_FIELDS) {
    if (!f[field]) fail(`${f.slug}: missing ${field}`);
  }
  if (f.sellsCount < 3) fail(`${f.slug}: sells has ${f.sellsCount} entries, expected at least 3`);
  if (f.faqCount < 3) fail(`${f.slug}: has ${f.faqCount} FAQs, expected at least 3`);
  // The opening line is the one thing on the page a visitor is guaranteed to
  // read, so it has to say something — and has to stay short enough that they
  // actually do. The first draft ran to five sentences and read as a wall.
  if (f.answerFirst && f.answerFirst.length < 90) {
    fail(`${f.slug}: answerFirst is ${f.answerFirst.length} chars — too thin to say anything`);
  }
  if (f.answerFirst && f.answerFirst.length > 230) {
    fail(`${f.slug}: answerFirst is ${f.answerFirst.length} chars — cut it to two sentences`);
  }
}

if (errors.length) {
  console.error(`\n✖ festival template check failed — ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}

console.log(
  `✓ festival templates check passed — ${festivals.length} festivals, ${catalogRows.length} templates, budgets and routes clean`,
);

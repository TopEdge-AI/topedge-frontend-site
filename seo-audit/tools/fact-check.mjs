#!/usr/bin/env node
/**
 * Fact-check gate for a built page (owner request, 26 Nov 2026).
 *
 * Lists every number a reader sees in the main content of a built page and says
 * where it comes from:
 *   - SOURCE   the number appears in a `claim` in src/data/sources.ts (the id is shown)
 *   - CATALOG  the number is one of our own plan facts (billing catalog, trial, caps)
 *   - UNTRACED the number is in neither. Each one must be our arithmetic shown on the
 *              page (check the sum), a date, or a fact that needs a source entry.
 *
 * It is not a truth machine: a SOURCE match only means the number exists in a dated
 * claim, so read the sentence. Its job is to make sure nothing on the page is a number
 * nobody can trace. Google's guidance on generative AI content asks for exactly this:
 * fact-check everything, including titles, descriptions, alt text and structured data.
 *
 * Usage:
 *   node seo-audit/tools/fact-check.mjs dist /blog/<slug> [/compare/<slug> ...] [--out file.md]
 * Exit code 1 when any UNTRACED number is found (so it can gate a script), 0 otherwise.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outFile = outIdx >= 0 ? args.splice(outIdx, 2)[1] : null;
const [distDir, ...routes] = args;
if (!distDir || !routes.length) {
  console.error('Usage: node seo-audit/tools/fact-check.mjs <dist> <route> [route...] [--out report.md]');
  process.exit(2);
}

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&rsquo;|&lsquo;/g, '’')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

/** Numbers as they are written: ₹1,999 / $0.0118 / 39.2% / 1.6x / 1,500 / 0.1150 */
const NUM_RE = /(?:₹|\$|€|Rs\.?\s?)?\d[\d,]*(?:\.\d+)?(?:\s?%|x\b)?/g;

function norm(token) {
  const t = token.replace(/^(?:₹|\$|€|Rs\.?\s?)/, '').replace(/[%x\s]/g, '').replace(/,/g, '');
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function numbersIn(text) {
  const out = [];
  for (const m of text.matchAll(NUM_RE)) {
    const n = norm(m[0]);
    if (n !== null) out.push({ raw: m[0].trim(), n });
  }
  return out;
}

// ---- reference numbers -------------------------------------------------------------
const sourcesSrc = fs.readFileSync(path.join(root, 'src/data/sources.ts'), 'utf8');
const sourceIndex = new Map(); // number -> Set(ids)
for (const m of sourcesSrc.matchAll(/id: '([A-Za-z0-9]+)'[\s\S]*?claim:\s*\n?\s*(['"`])([\s\S]*?)\2,\s*\n\s*verified/g)) {
  const [, id, , claim] = m;
  for (const { n } of numbersIn(claim)) {
    if (!sourceIndex.has(n)) sourceIndex.set(n, new Set());
    sourceIndex.get(n).add(id);
  }
}

const catalogSrc = fs.readFileSync(path.join(root, 'src/marketing/lib/billingCatalog.ts'), 'utf8');
const catalog = new Set(numbersIn(catalogSrc).map((x) => x.n));
// House facts stated in DAILY-PROMPT section 2 and the positioning skill.
for (const n of [19, 39, 65, 100, 800, 1500, 14, 20, 200, 0, 18, 1999, 3999, 6499, 1599, 3199, 5199]) catalog.add(n);

// Numbers that are not claims: years, list numbering, template placeholders.
const isYear = (n) => Number.isInteger(n) && n >= 2015 && n <= 2030;
const MONTHS = /(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)/;

function mainText(html) {
  let s = html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  s = s.replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ').replace(/<footer\b[\s\S]*?<\/footer>/gi, ' ');
  const article = s.match(/<article\b[\s\S]*<\/article>/i) || s.match(/<main\b[\s\S]*<\/main>/i);
  if (article) s = article[0];
  // Block-level tags become sentence breaks so table cells and list items stay separate.
  s = s.replace(/<\/(p|li|td|th|h[1-6]|div|tr|summary|figcaption)>/gi, '. ');
  s = s.replace(/<br\s*\/?>/gi, '. ');
  return decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
}

function headText(html) {
  const bits = [];
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (t) bits.push(`[title] ${decode(t[1])}`);
  const d = html.match(/<meta name="description" content="([^"]*)"/i);
  if (d) bits.push(`[description] ${decode(d[1])}`);
  for (const m of html.matchAll(/alt="([^"]+)"/g)) bits.push(`[alt] ${decode(m[1])}`);
  return bits.join('. ');
}

function fileFor(route) {
  const r = route.replace(/^\/+|\/+$/g, '');
  for (const c of [path.join(distDir, `${r}.html`), path.join(distDir, r, 'index.html')]) if (fs.existsSync(c)) return c;
  return null;
}

let untracedTotal = 0;
const report = [`# Fact-check, ${new Date().toISOString().slice(0, 10)}`, ''];

for (const route of routes) {
  const file = fileFor(route);
  if (!file) {
    report.push(`## ${route}`, '', 'Built file not found.', '');
    untracedTotal += 1;
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const text = `${headText(html)}. ${mainText(html)}`;
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z₹$\[(0-9])/).map((x) => x.trim()).filter(Boolean);
  const rows = { SOURCE: 0, CATALOG: 0, UNTRACED: 0 };
  const untraced = [];
  const seen = new Set();
  for (const sentence of sentences) {
    for (const { raw, n } of numbersIn(sentence)) {
      if (isYear(n)) continue;
      if (Number.isInteger(n) && n < 10 && !/[₹$€%x]/.test(raw)) continue; // counts and list numbers
      if (MONTHS.test(sentence) && Number.isInteger(n) && n <= 31 && new RegExp(`\\b${n}\\s+${MONTHS.source}|${MONTHS.source}\\s+${n}\\b`).test(sentence)) continue; // dates
      const key = `${n}|${sentence}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (sourceIndex.has(n)) rows.SOURCE += 1;
      else if (catalog.has(n)) rows.CATALOG += 1;
      else {
        rows.UNTRACED += 1;
        untraced.push(`- **${raw}**: ${sentence.length > 220 ? `${sentence.slice(0, 217)}...` : sentence}`);
      }
    }
  }
  untracedTotal += rows.UNTRACED;
  report.push(`## ${route}`, '', `Numbers found: ${rows.SOURCE} traced to sources.ts, ${rows.CATALOG} to our catalog, **${rows.UNTRACED} untraced**.`, '');
  if (untraced.length) {
    report.push('Untraced numbers. Each must be our arithmetic shown on the page (check the sum), a count, or a fact that needs a `sources.ts` entry:', '', ...untraced, '');
  }
}

const out = report.join('\n');
if (outFile) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, out);
}
console.log(out);
process.exit(untracedTotal ? 1 : 0);

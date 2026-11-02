#!/usr/bin/env node
/**
 * Render a report HTML file to a paginated PDF.
 *
 * The reports in `reports/` are written as plain HTML with a print stylesheet,
 * not as a PDF, so they stay diffable and can be regenerated after the next
 * audit instead of rebuilt by hand. This turns one into the artefact you send.
 *
 * The footer carries the page number, which `@page` cannot do on its own in
 * Chromium, so it is supplied through `footerTemplate` here rather than CSS.
 *
 * Usage: node scripts/render-report.mjs reports/<name>.html [reports/<name>.pdf]
 */
import path from 'node:path';
import fs from 'node:fs';
import { chromium } from 'playwright';

const [srcArg, outArg] = process.argv.slice(2);
if (!srcArg) {
  console.error('usage: node scripts/render-report.mjs <input.html> [output.pdf]');
  process.exit(1);
}

const src = path.resolve(srcArg);
if (!fs.existsSync(src)) {
  console.error(`not found: ${src}`);
  process.exit(1);
}
const out = path.resolve(outArg || src.replace(/\.html?$/i, '.pdf'));

const title = (fs.readFileSync(src, 'utf8').match(/<title>([^<]*)<\/title>/i)?.[1] ?? 'Report').trim();

/*
 * The repo pins its own Playwright, which may not match the browser revision
 * installed in this environment. Fall back to the system Chromium rather than
 * asking every caller to run `playwright install` for one PDF.
 */
const SYSTEM_CHROMIUM = '/opt/pw-browsers/chromium';
async function launch() {
  try {
    return await chromium.launch();
  } catch (err) {
    if (!fs.existsSync(SYSTEM_CHROMIUM)) throw err;
    return chromium.launch({ executablePath: SYSTEM_CHROMIUM, args: ['--no-sandbox'] });
  }
}

const browser = await launch();
try {
  const page = await browser.newPage();
  await page.goto(`file://${src}`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate:
      '<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7.5pt;color:#98a2b3;' +
      'padding:0 15mm;display:flex;justify-content:space-between;">' +
      `<span>${title.replace(/[<>&]/g, '')}</span>` +
      '<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
    margin: { top: '14mm', bottom: '16mm', left: '15mm', right: '15mm' },
  });
} finally {
  await browser.close();
}

const kb = Math.round(fs.statSync(out).size / 1024);
console.log(`✓ ${path.relative(process.cwd(), out)} (${kb} KB)`);

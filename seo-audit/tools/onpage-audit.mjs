#!/usr/bin/env node
/**
 * Runs the free on-page audit at exploremayank.in for one of our pages
 * against up to 3 competitor pages, and saves the result as a PDF plus the
 * raw text of every tab.
 *
 * Usage:
 *   node seo-audit/tools/onpage-audit.mjs <our-url> "<keyword>" <out-dir> [comp1] [comp2] [comp3]
 *
 * Output in <out-dir>: onpage-audit.pdf, onpage-audit.txt
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const [ourUrl, keyword, outDir, ...comps] = process.argv.slice(2);
if (!ourUrl || !keyword || !outDir) {
  console.error('Usage: node seo-audit/tools/onpage-audit.mjs <our-url> "<keyword>" <out-dir> [comp1] [comp2] [comp3]');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const TOOL = 'https://exploremayank.in/tools/free-on-page-seo-audit-tool/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(TOOL, { waitUntil: 'domcontentloaded', timeout: 60000 });

await page.fill('input[placeholder="e.g. yourbrand.com/service-page/"]', ourUrl);
await page.fill('input[placeholder="e.g. seo expert in raipur"]', keyword);
for (let i = 0; i < Math.min(3, comps.length); i++) {
  await page.fill(`input[placeholder="Competitor ${i + 1} URL"]`, comps[i]);
}
await page.click('button[type="submit"]');

// Wait for the score panel, then a little longer for the link checks.
await page.waitForFunction(() => /On-page score/.test(document.body.innerText), null, { timeout: 120000 });
await page.waitForTimeout(8000);

// Collect every result tab's text.
const tabNames = ['Overview', 'Keyword', 'Competitors', 'Full audit', 'Links & images', 'Structure', 'Previews', 'AI & tech'];
let text = `On-page audit: ${ourUrl}\nKeyword: ${keyword}\nCompetitors: ${comps.join(', ') || 'none'}\nRun: ${new Date().toISOString()}\n\n`;
for (const name of tabNames) {
  const tab = page.locator('button, [role=tab]').filter({ hasText: new RegExp(`^${name.replace(/[&]/g, '\\&')}`) }).first();
  if (await tab.count()) {
    await tab.click();
    await page.waitForTimeout(500);
    const main = await page.locator('main').innerText();
    const start = main.indexOf('Download CSV');
    text += `\n===== ${name} =====\n${start >= 0 ? main.slice(start) : main}\n`;
  }
}
fs.writeFileSync(path.join(outDir, 'onpage-audit.txt'), text);

// PDF of the Full audit view plus the competitor table (print every tab's text into one page).
const html = `<!doctype html><meta charset="utf-8"><title>On-page audit</title>
<style>body{font:12px/1.5 -apple-system,Segoe UI,Arial,sans-serif;margin:28px;color:#111}pre{white-space:pre-wrap;font:inherit}h1{font-size:18px}</style>
<h1>On-page SEO audit (exploremayank.in tool)</h1><pre>${text.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])}</pre>`;
const pdfPage = await browser.newPage();
await pdfPage.setContent(html);
await pdfPage.pdf({ path: path.join(outDir, 'onpage-audit.pdf'), format: 'A4', printBackground: true });

await browser.close();
console.log(`Saved ${path.join(outDir, 'onpage-audit.pdf')} and onpage-audit.txt`);

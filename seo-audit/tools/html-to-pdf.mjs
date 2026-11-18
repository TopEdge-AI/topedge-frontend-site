#!/usr/bin/env node
/** Renders a local HTML file to an A4 PDF. Usage: node seo-audit/tools/html-to-pdf.mjs <in.html> <out.pdf> */
import path from 'node:path';
import { chromium } from 'playwright';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node seo-audit/tools/html-to-pdf.mjs <in.html> <out.pdf>');
  process.exit(1);
}
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${path.resolve(input)}`, { waitUntil: 'load' });
await page.pdf({ path: output, format: 'A4', printBackground: true, margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' } });
await browser.close();
console.log(`Saved ${output}`);

// Render film compositions frame by frame.
//
//   npx vite --config video/vite.config.ts              (serves the film app on :5190)
//   node video/scripts/render.cjs <out-dir> 05-S1,05-T1 [--workers 3] [--tail 0.5]
//   node video/scripts/render.cjs <out-dir> 05-S1 --stills 1,4.5,8      (review frames as JPG)
//
// Each frame calls window.__render(frame) (React flushSync of a pure function of
// time), then takes a CDP screenshot. Output: <out-dir>/<id>.mp4 (H.264 CRF 14,
// 30 fps), duration = composition duration + --tail seconds (the tail is folded
// into the head by cut_clips.sh for a seamless loop).
// Set CHROMIUM_PATH if the installed Playwright has no browser of its own.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const OUT = path.resolve(args[0]);
const IDS = args[1].split(',');
const BASE = opt('--base', 'http://127.0.0.1:5190');
const WORKERS = Number(opt('--workers', '3'));
const TAIL = Number(opt('--tail', '0.5'));
const STILLS = opt('--stills');
const FPS = 30;
fs.mkdirSync(OUT, { recursive: true });

async function open(browser, id) {
  const meta = await (async () => {
    const p = await browser.newPage();
    await p.goto(`${BASE}/?comp=${id}`, { waitUntil: 'load' });
    const m = await p.evaluate(() => window.__comp);
    await p.close();
    return m;
  })();
  const ctx = await browser.newContext({ viewport: { width: meta.w, height: meta.h } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/?comp=${id}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const cdp = await ctx.newCDPSession(page);
  return { meta, ctx, page, cdp };
}

async function shot(page, cdp, frame) {
  await page.evaluate((f) => window.__render(f), frame);
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 96 });
  return Buffer.from(data, 'base64');
}

async function renderOne(browser, id) {
  const t0 = Date.now();
  const { meta, ctx, page, cdp } = await open(browser, id);
  if (STILLS) {
    for (const s of STILLS.split(',')) {
      fs.writeFileSync(path.join(OUT, `${id}@${s}.jpg`), await shot(page, cdp, Math.round(Number(s) * FPS)));
    }
    await ctx.close();
    console.log('stills', id);
    return;
  }
  const dir = path.join(OUT, 'frames', id);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const n = Math.round((meta.duration + TAIL) * FPS);
  for (let f = 0; f < n; f++) {
    fs.writeFileSync(path.join(dir, String(f).padStart(4, '0') + '.jpg'), await shot(page, cdp, f));
  }
  await ctx.close();
  execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(dir, '%04d.jpg'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-an', path.join(OUT, `${id}.mp4`)]);
  fs.rmSync(dir, { recursive: true, force: true });
  console.log('ok', id, `${n} frames`, `${((Date.now() - t0) / 1000).toFixed(0)}s`);
}

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const queue = [...IDS];
  await Promise.all(Array.from({ length: Math.min(WORKERS, queue.length) }, async () => {
    while (queue.length) {
      const id = queue.shift();
      try { await renderOne(browser, id); } catch (e) { console.log('FAIL', id, e.message.slice(0, 200)); }
    }
  }));
  await browser.close();
})();

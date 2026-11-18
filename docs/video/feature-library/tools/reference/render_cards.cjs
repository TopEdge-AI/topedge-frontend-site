// Render the opening title, the 12 chapter cards and the end card of the reference reel.
//
//   node docs/video/feature-library/tools/reference/render_cards.cjs <out-dir> [open,card01,...,end]
//
// Each card in cards.html is rendered frame by frame at 30 fps by pausing and scrubbing
// its CSS animations (deterministic, no dropped frames), then encoded to <out-dir>/<name>.mp4.
// Uses the Inter / Inter Display fonts installed on the machine. Needs Playwright + ffmpeg;
// set CHROMIUM_PATH if the installed Playwright has no browser of its own.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const HERE = __dirname;
const OUT = path.resolve(process.argv[2] || 'reference-cards');
fs.mkdirSync(OUT, { recursive: true });
const FPS = 30;
const jobs = [{ name: 'open', q: 'kind=open', secs: 5 }];
for (let n = 1; n <= 12; n++) jobs.push({ name: `card${String(n).padStart(2, '0')}`, q: `kind=card&n=${n}`, secs: 2.5 });
jobs.push({ name: 'end', q: 'kind=end', secs: 7.5 });
const only = process.argv[3] ? new Set(process.argv[3].split(',')) : null;
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const j of jobs) {
    if (only && !only.has(j.name)) continue;
    const dir = path.join(OUT, 'frames', j.name);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    await page.goto('file://' + path.join(HERE, 'cards.html') + '?' + j.q);
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
    await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
    const frames = Math.round(j.secs * FPS);
    for (let f = 0; f < frames; f++) {
      const t = (f * 1000) / FPS;
      await page.evaluate((t) => document.getAnimations().forEach((a) => { a.currentTime = t; }), t);
      await page.screenshot({ path: path.join(dir, String(f).padStart(4, '0') + '.png') });
    }
    execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(dir, '%04d.png'),
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', path.join(OUT, j.name + '.mp4')]);
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('ok', j.name, frames);
  }
  await b.close();
})();

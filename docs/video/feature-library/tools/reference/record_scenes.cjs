// Render the website's coded scenes as reference clips, one per cut-sheet segment,
// frame by frame (deterministic, exact 30 fps, nothing dropped).
//
//   npm run build && npx vite preview --port 4173        (in the repo, separate shell)
//   node docs/video/feature-library/tools/reference/record_scenes.cjs <out-dir> \
//        [--base http://127.0.0.1:4173] [--workers 4] [--wide 1728x1080] [--only 01-T1,05-S1]
//
// How it works: the page runs on Playwright's paused virtual clock (timers, rAF,
// performance.now), so the scene's JavaScript only moves when we step it. The card's
// scene is brought full-screen (tiles 1080x1080, heroes/showcases --wide, default
// 1920x1200), plays one cycle in virtual time and is caught on its clean restart;
// a synthetic hover then holds the loop (hover pauses it) so the segment can run its
// full length from cut_sheet.csv. Each frame advances the clock by 1/30 s, scrubs every
// CSS animation to the same virtual time and takes a screenshot over CDP.
// Real-time screen recording is not used on purpose: without a GPU the compositor
// manages ~5 fps on these scenes.
// Output: <out-dir>/<segment>.mp4 (H.264, 30 fps, CRF 16, silent). Needs Playwright
// and ffmpeg; set CHROMIUM_PATH if the installed Playwright has no browser of its own.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : dflt;
};
const OUT = path.resolve(args[0] && !args[0].startsWith('--') ? args[0] : 'reference-clips');
const BASE = opt('--base', 'http://127.0.0.1:4173');
const WORKERS = Number(opt('--workers', '4'));
const [WW, WH] = opt('--wide', '1920x1200').split('x').map(Number);
const only = opt('--only') ? new Set(opt('--only').split(',')) : null;
const FPS = 30;
fs.mkdirSync(OUT, { recursive: true });

// Minimal RFC 4180 row parser (titles can contain quoted commas).
const parseRow = (line) => {
  const out = [];
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
};
const SHEET = path.join(__dirname, '..', '..', 'cut_sheet.csv');
const lines = fs.readFileSync(SHEET, 'utf8').trim().split(/\r?\n/);
const head = parseRow(lines[0]);
const col = (name) => head.indexOf(name);
const jobs = lines.slice(1).map((line) => {
  const c = parseRow(line);
  const seg = c[col('segment')];
  const part = seg.split('-')[1];
  const kind = part === 'H' ? 'hero' : part[0] === 'T' ? 'tile' : 'show';
  return {
    seg,
    route: c[col('site_page')],
    sel: kind === 'hero' ? '.mkt-pf__media' : kind === 'tile' ? '.mkt-pf__tile' : '.mkt-pf__showcase',
    idx: kind === 'hero' ? 0 : Number(part.slice(1)) - 1,
    square: kind === 'tile',
    secs: Number(c[col('duration_s')]),
  };
});

async function record(browser, j) {
  const size = j.square ? { width: 1080, height: 1080 } : { width: WW, height: WH };
  const ctx = await browser.newContext({ viewport: size });
  const page = await ctx.newPage();
  const dir = path.join(OUT, 'frames', j.seg);
  const t0 = Date.now();
  try {
    await page.clock.install({ time: new Date('2026-11-16T10:00:00') });
    await page.clock.pauseAt(new Date('2026-11-16T10:00:01'));
    const cdp = await ctx.newCDPSession(page);
    await page.goto(BASE + j.route, { waitUntil: 'load', timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    for (let i = 0; i < 15; i++) { await page.clock.runFor(100); await page.waitForTimeout(40); }
    await page.evaluate(({ sel, idx }) => {
      const slot = document.querySelectorAll(sel)[idx];
      const fv = slot && slot.querySelector('.fv');
      if (!fv) throw new Error('no scene in this slot');
      const st = document.createElement('style');
      st.textContent = `html,body{overflow:hidden!important}
        .rec-fs{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;aspect-ratio:auto!important;z-index:2147483646!important;border-radius:0!important;margin:0!important;pointer-events:none!important}
        .mkt-convert,[class*="convert-prompt"],.mkt-nav{display:none!important}`;
      document.head.appendChild(st);
      fv.classList.add('rec-fs');
      window.__rec = { starts: new WeakMap(), restartAt: 0 };
      let sawOut = false;
      const mo = new MutationObserver(() => {
        if (fv.classList.contains('is-out')) sawOut = true;
        else if (sawOut && fv.classList.contains('is-in')) {
          mo.disconnect();
          window.__rec.restartAt = performance.now();
          fv.dispatchEvent(new PointerEvent('pointerenter')); // hold the loop after this cycle
        }
      });
      mo.observe(fv, { attributes: true, attributeFilter: ['class'] });
    }, { sel: j.sel, idx: j.idx });
    // One full cycle in virtual time (fine steps so the restart is caught within 20 ms).
    let restarted = false;
    for (let i = 0; i < 2500 && !restarted; i++) {
      await page.clock.runFor(20);
      if (i % 25 === 0) await page.waitForTimeout(15); // let IntersectionObserver / resize work run
      restarted = await page.evaluate(() => window.__rec.restartAt > 0);
    }
    if (!restarted) throw new Error('scene did not restart within 50 s of virtual time');
    await page.waitForTimeout(60);

    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const n = Math.round(j.secs * FPS);
    let prevMs = 0;
    for (let f = 0; f < n; f++) {
      const ms = Math.round((f * 1000) / FPS);
      if (ms > prevMs) await page.clock.runFor(ms - prevMs);
      prevMs = ms;
      await page.evaluate((first) => {
        const now = performance.now();
        for (const a of document.getAnimations()) {
          // Animations alive at frame 0 were (re)created by the restart itself.
          if (!window.__rec.starts.has(a)) window.__rec.starts.set(a, first ? window.__rec.restartAt : now);
          a.pause();
          a.currentTime = Math.max(0, now - window.__rec.starts.get(a));
        }
      }, f === 0);
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 95 });
      fs.writeFileSync(path.join(dir, String(f).padStart(4, '0') + '.jpg'), Buffer.from(data, 'base64'));
    }
    await ctx.close();
    execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(dir, '%04d.jpg'),
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-an', path.join(OUT, `${j.seg}.mp4`)]);
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('ok', j.seg, j.route, `${j.secs}s`, `${n} frames`, `${((Date.now() - t0) / 1000).toFixed(0)}s`);
  } catch (e) {
    console.log('FAIL', j.seg, e.message.slice(0, 160));
    await ctx.close().catch(() => {});
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  // Longest first, so the parallel workers finish together.
  const queue = jobs.filter((j) => !only || only.has(j.seg)).sort((a, b) => b.secs * (b.square ? 1 : 2) - a.secs * (a.square ? 1 : 2));
  await Promise.all(Array.from({ length: WORKERS }, async () => {
    while (queue.length) await record(browser, queue.shift());
  }));
  await browser.close();
  console.log('done');
})();

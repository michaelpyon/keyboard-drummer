#!/usr/bin/env node
// render-og.mjs: generate og.png (1200x630) from the REAL rendered game.
//
// Pattern follows chroma-twist-mobile/scripts/render-og.mjs: load the game in
// headless Chrome via playwright-core, stage the DESIGN.md money moment (a
// mid-run ON FIRE streak with notes falling and the keycap reference strip in
// frame), capture genuine gameplay pixels, then composite the Bungee wordmark
// lockup in the BRAND.md palette. Honest capture only: the play-area pixels
// are an actual auto-played run of Basic Rock, never a mockup.
//
// Run (static server must be up first, repo root):
//   python3 -m http.server 4117   (or any static server on PORT)
//   node scripts/render-og.mjs
//
// Optional env:
//   CHROME_PATH     path to a Chrome binary (defaults to macOS Google Chrome)
//   PAGE_URL        override the capture URL (defaults to 127.0.0.1:4117)
//   PLAYWRIGHT_DIR  a project dir whose node_modules has playwright-core
//   SHOT_DIR        also write staging screenshots (raw frame, results modal)

import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = join(HERE, '..');
const OUT = join(PROJECT, 'og.png');
const OG_W = 1200;
const OG_H = 630;

const localRequire = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = localRequire('playwright-core'));
} catch {
  const dir = process.env.PLAYWRIGHT_DIR ||
    '/Users/michaelpyon/Documents/projects/web3-game-lab-protos/tideglass-demo';
  ({ chromium } = createRequire(join(dir, 'package.json'))('playwright-core'));
}

const CHROME = process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAGE_URL = process.env.PAGE_URL || 'http://127.0.0.1:4117/index.html';
const SHOT_DIR = process.env.SHOT_DIR || '';

// canonical palette, BRAND.md / styles.css :root (do not reinvent)
const BG0 = '#09131c';
const TEXT = '#f3f8fb';
const CYAN = '#72d8ff';

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars',
    '--autoplay-policy=no-user-gesture-required'],
});

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });
  page.on('pageerror', (e) => console.error('[pageerror]', e.message));
  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') consoleErrors.push(`${m.type()}: ${m.text()}`);
  });

  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);

  // arm audio + enter the game on the easiest pattern
  await page.click('#audioStartBtn');
  await page.evaluate(() => selectSongFromLibrary('basic-rock'));

  // auto-hit driver: press the mapped key when a falling note reaches the hit
  // line, exactly like a (very locked-in) player would
  await page.evaluate(() => {
    const KEYS = { hihat: 'k', snare: 'h', bass: ' ', lowtom: 'i', hightom: 'y', ride: '9', crash: '7' };
    const tick = () => {
      const ga = document.getElementById('gameArea');
      if (ga) {
        const hitY = ga.clientHeight - 86 - 18;
        for (const laneEl of document.querySelectorAll('.lane')) {
          const lane = laneEl.dataset.lane;
          for (const n of laneEl.querySelectorAll('.note')) {
            if (n._sent) continue;
            const m = /translateY\(([-\d.]+)px\)/.exec(n.style.transform || '');
            if (!m) continue;
            if (Math.abs(parseFloat(m[1]) - hitY) < 9) {
              n._sent = true;
              const key = KEYS[lane];
              window.dispatchEvent(key === ' '
                ? new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true })
                : new KeyboardEvent('keydown', { key, bubbles: true }));
            }
          }
        }
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  // wait for the 24+ ON FIRE state, then let it cook a little for effect
  await page.waitForFunction(
    () => document.getElementById('streakReadout')?.classList.contains('fire'),
    null, { timeout: 60000 },
  );
  await page.waitForTimeout(1400);

  const state = await page.evaluate(() => ({
    combo: document.getElementById('comboValue').textContent,
    acc: document.getElementById('accuracyValue').textContent,
    streak: document.getElementById('streakReadout').textContent,
    notes: document.querySelectorAll('.note').length,
  }));
  console.log('staged:', JSON.stringify(state));

  // frame the shot: keyref strip + lanes + stats row (ON FIRE readout)
  const box = await page.evaluate(() => {
    const strip = document.getElementById('keyrefStrip').getBoundingClientRect();
    const stats = document.querySelector('.stats').getBoundingClientRect();
    return { x: strip.left, y: strip.top, w: stats.right - strip.left, h: stats.bottom - strip.top };
  });

  const shot = await page.screenshot({
    type: 'png',
    clip: { x: box.x - 8, y: box.y - 8, width: box.w + 16, height: box.h + 16 },
  });
  if (SHOT_DIR) writeFileSync(join(SHOT_DIR, 'og-raw.png'), shot);
  const shotUrl = `data:image/png;base64,${shot.toString('base64')}`;

  // composite the Bungee lockup on a clean page (Bungee via Google Fonts,
  // same source the game itself loads from)
  const comp = await browser.newPage({
    viewport: { width: OG_W, height: OG_H },
    deviceScaleFactor: 1,
  });
  await comp.setContent(`<!doctype html><html><head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bungee&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    </head><body></body></html>`, { waitUntil: 'networkidle' });
  await comp.evaluate(async () => {
    await document.fonts.load('100px Bungee');
    await document.fonts.load('700 30px "JetBrains Mono"');
    await document.fonts.ready;
  });

  const dataUrl = await comp.evaluate(
    async ({ src, W, H, bg0, text, cyan }) => {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src; });

      const out = document.createElement('canvas');
      out.width = W; out.height = H;
      const ctx = out.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // dark stage base, then the real frame scaled to fill the width;
      // top-anchored so the keycap row and lanes carry the frame
      ctx.fillStyle = bg0;
      ctx.fillRect(0, 0, W, H);
      const scale = W / img.width;
      const dh = img.height * scale;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, W, dh);

      // bottom scrim for lockup legibility
      const scrim = ctx.createLinearGradient(0, H * 0.4, 0, H);
      scrim.addColorStop(0, 'rgba(9,19,28,0)');
      scrim.addColorStop(0.55, 'rgba(9,19,28,0.72)');
      scrim.addColorStop(1, 'rgba(9,19,28,0.96)');
      ctx.fillStyle = scrim;
      ctx.fillRect(0, H * 0.4, W, H * 0.6);

      const pad = 64;

      // wordmark: Bungee, KEYBOARD in paper white, DRUMMER in hot cyan
      ctx.font = '86px Bungee';
      ctx.fillStyle = text;
      ctx.fillText('KEYBOARD', pad, H - 118);
      const kw = ctx.measureText('KEYBOARD ').width;
      ctx.fillStyle = cyan;
      ctx.fillText('DRUMMER', pad + kw, H - 118);

      // subtitle: BRAND.md short cut, mono readout voice
      ctx.font = '500 27px "JetBrains Mono"';
      ctx.fillStyle = 'rgba(196,218,232,0.95)';
      ctx.fillText('Play drums with your keyboard. 20 patterns, 7 genres, instant sound.', pad, H - 52);

      return out.toDataURL('image/png');
    },
    { src: shotUrl, W: OG_W, H: OG_H, bg0: BG0, text: TEXT, cyan: CYAN },
  );

  writeFileSync(OUT, Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log(`wrote ${OUT} (${OG_W}x${OG_H})`);

  // bonus staging shots for QA when SHOT_DIR is set: ride to song end and
  // capture the S-rank / ON FIRE results card
  if (SHOT_DIR) {
    await page.waitForFunction(
      () => document.getElementById('resultsModal')?.classList.contains('visible'),
      null, { timeout: 90000 },
    );
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(SHOT_DIR, 'results-modal.png') });
    const results = await page.evaluate(() => ({
      grade: document.querySelector('.results-grade')?.textContent,
      onFire: !!document.querySelector('.results-grade.on-fire'),
      tag: document.querySelector('.results-onfire-tag')?.textContent || null,
      acc: document.getElementById('accuracyValue').textContent,
    }));
    console.log('results:', JSON.stringify(results));
  }
  if (consoleErrors.length) console.log('console issues:', JSON.stringify(consoleErrors, null, 1));
  else console.log('console clean');
} finally {
  await browser.close();
}

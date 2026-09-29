const { chromium } = require('playwright');
const fs = require('fs');

const zoomConfigs = [
  // 1920x1080 base
  { base: '1920x1080', zoom: 0.8,  width: Math.round(1920 / 0.8),  height: Math.round(1080 / 0.8),  dpr: 0.8 },
  { base: '1920x1080', zoom: 0.9,  width: Math.round(1920 / 0.9),  height: Math.round(1080 / 0.9),  dpr: 0.9 },
  { base: '1920x1080', zoom: 1.0,  width: 1920,                    height: 1080,                    dpr: 1.0 },
  { base: '1920x1080', zoom: 1.1,  width: Math.round(1920 / 1.1),  height: Math.round(1080 / 1.1),  dpr: 1.1 },
  { base: '1920x1080', zoom: 1.25, width: Math.round(1920 / 1.25), height: Math.round(1080 / 1.25), dpr: 1.25 },
  { base: '1920x1080', zoom: 1.5,  width: Math.round(1920 / 1.5),  height: Math.round(1080 / 1.5),  dpr: 1.5 },
  { base: '1920x1080', zoom: 1.75, width: Math.round(1920 / 1.75), height: Math.round(1080 / 1.75), dpr: 1.75 },
  { base: '1920x1080', zoom: 2.0,  width: Math.round(1920 / 2.0),  height: Math.round(1080 / 2.0),  dpr: 2.0 },
  // 1366x768 base
  { base: '1366x768',  zoom: 1.25, width: Math.round(1366 / 1.25), height: Math.round(768 / 1.25),  dpr: 1.25 },
  { base: '1366x768',  zoom: 1.5,  width: Math.round(1366 / 1.5),  height: Math.round(768 / 1.5),   dpr: 1.5 },
  { base: '1366x768',  zoom: 1.75, width: Math.round(1366 / 1.75), height: Math.round(768 / 1.75),  dpr: 1.75 },
  { base: '1366x768',  zoom: 2.0,  width: Math.round(1366 / 2.0),  height: Math.round(768 / 2.0),   dpr: 2.0 },
];

const routes = [
  '/',
  '/company',
  '/company/global-subsidiaries',
  '/company/leadership',
  '/business/generics',
  '/business/rd',
  '/business/facilities',
  '/sustainability',
  '/investors',
  '/careers',
  '/contact'
];

async function runZoomTest() {
  const browser = await chromium.launch();
  const overflowIssues = [];
  const chatbotMetrics = [];

  for (const cfg of zoomConfigs) {
    const context = await browser.newContext({
      viewport: { width: cfg.width, height: cfg.height },
      deviceScaleFactor: cfg.dpr
    });
    await context.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    const page = await context.newPage();

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:4173${route}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(50);

        const res = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const sWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const wWidth = window.innerWidth;
          const hasHScroll = sWidth > wWidth + 1.5;

          const overflowing = [];
          if (hasHScroll) {
            for (const el of document.querySelectorAll('body *')) {
              if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'TITLE'].includes(el.tagName)) continue;
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.height > 0 && (r.right > wWidth + 1.5 || r.left < -1.5)) {
                const tag = el.tagName.toLowerCase();
                const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '';
                overflowing.push({ selector: `${tag}${cls}`, right: Math.round(r.right), overflow: Math.round(r.right - wWidth) });
              }
            }
          }
          return { hasHScroll, sWidth, wWidth, overflowing: overflowing.slice(0, 5) };
        });

        if (res.hasHScroll) {
          overflowIssues.push({
            route,
            base: cfg.base,
            zoom: `${cfg.zoom * 100}%`,
            viewport: `${cfg.width}x${cfg.height}`,
            diff: res.sWidth - res.wWidth,
            elements: res.overflowing
          });
        }
      } catch (e) {
        // ignore
      }
    }

    // Chatbot check
    try {
      await page.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(50);
      const cb = await page.evaluate(() => {
        const toggle = document.querySelector('.chatbot-toggle');
        if (toggle) toggle.click();
        const panel = document.querySelector('.chatbot-panel');
        if (!panel) return null;
        const r = panel.getBoundingClientRect();
        return {
          width: Math.round(r.width),
          height: Math.round(r.height),
          left: Math.round(r.left),
          right: Math.round(r.right),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          overflowX: r.right > window.innerWidth || r.left < 0,
          overflowY: r.bottom > window.innerHeight || r.top < 0
        };
      });
      if (cb) {
        chatbotMetrics.push({
          base: cfg.base,
          zoom: `${cfg.zoom * 100}%`,
          viewport: `${cfg.width}x${cfg.height}`,
          ...cb
        });
      }
    } catch (e) {}

    await context.close();
  }

  await browser.close();

  fs.writeFileSync('scratch/zoom_test_results.json', JSON.stringify({ overflowIssues, chatbotMetrics }, null, 2));
  console.log(`Zoom testing complete. Overflows: ${overflowIssues.length}. Chatbot measurements: ${chatbotMetrics.length}`);
}

runZoomTest().catch(console.error);

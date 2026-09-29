const { chromium } = require('playwright');
const fs = require('fs');

const testCases = [
  { name: 'desktop-1920x1080-zoom100', w: 1920, h: 1080, zoom: 1.0 },
  { name: 'laptop-1440x900-zoom100',   w: 1440, h: 900,  zoom: 1.0 },
  { name: 'laptop-1366x768-zoom100',   w: 1366, h: 768,  zoom: 1.0 },
  { name: 'laptop-1366x768-zoom125',   w: Math.round(1366 / 1.25), h: Math.round(768 / 1.25), zoom: 1.25 },
  { name: 'laptop-1366x768-zoom150',   w: Math.round(1366 / 1.5),  h: Math.round(768 / 1.5),  zoom: 1.5 },
  { name: 'desktop-1920x1080-zoom125', w: Math.round(1920 / 1.25), h: Math.round(1080 / 1.25), zoom: 1.25 },
  { name: 'desktop-1920x1080-zoom150', w: Math.round(1920 / 1.5),  h: Math.round(1080 / 1.5),  zoom: 1.5 },
  { name: 'tablet-768x1024',           w: 768,  h: 1024, zoom: 1.0 },
  { name: 'mobile-375x667',            w: 375,  h: 667,  zoom: 1.0 },
  { name: 'mobile-360x800',            w: 360,  h: 800,  zoom: 1.0 }
];

async function verify() {
  const browser = await chromium.launch();
  const results = [];

  for (const tc of testCases) {
    const context = await browser.newContext({
      viewport: { width: tc.w, height: tc.h },
      deviceScaleFactor: tc.zoom
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(300);
    await page.click('.chatbot-toggle');
    await page.waitForSelector('.chatbot-panel');

    const metrics = await page.evaluate(() => {
      const panel = document.querySelector('.chatbot-panel');
      const toggle = document.querySelector('.chatbot-toggle');
      const header = document.querySelector('.chatbot-header');
      const composer = document.querySelector('.chatbot-composer');
      const pr = panel.getBoundingClientRect();
      const tr = toggle.getBoundingClientRect();
      const hr = header.getBoundingClientRect();
      const cr = composer.getBoundingClientRect();

      return {
        panelWidth: Math.round(pr.width),
        panelHeight: Math.round(pr.height),
        panelTop: Math.round(pr.top),
        panelBottom: Math.round(pr.bottom),
        panelLeft: Math.round(pr.left),
        panelRight: Math.round(pr.right),
        headerVisible: hr.top >= 0 && hr.bottom <= window.innerHeight,
        composerVisible: cr.top >= 0 && cr.bottom <= window.innerHeight,
        fullyOnScreen: pr.top >= 0 && pr.bottom <= window.innerHeight && pr.left >= 0 && pr.right <= window.innerWidth,
        viewportW: window.innerWidth,
        viewportH: window.innerHeight
      };
    });

    results.push({ name: tc.name, zoom: tc.zoom, ...metrics });
    await context.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

verify().catch(console.error);

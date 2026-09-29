const { chromium } = require('playwright');

const widths = [1920, 1440, 1366, 1280, 1024, 768, 430, 414, 390, 375, 360];

(async () => {
  const browser = await chromium.launch();
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 800 } });
    await page.goto('http://localhost:4173/');
    await page.waitForTimeout(200);
    await page.click('.chatbot-toggle');
    await page.waitForSelector('.chatbot-panel');
    const r = await page.evaluate(() => {
      const el = document.querySelector('.chatbot-panel');
      const b = el.getBoundingClientRect();
      return {
        panelWidth: Math.round(b.width),
        panelHeight: Math.round(b.height),
        panelLeft: Math.round(b.left),
        panelRight: Math.round(b.right),
        winWidth: window.innerWidth,
        overflowsLeft: b.left < 0,
        overflowsRight: b.right > window.innerWidth
      };
    });
    console.log(`Width ${w}px:`, r);
    await page.close();
  }
  await browser.close();
})();

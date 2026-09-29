const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const zooms = [0.67, 0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0];
  const results = [];

  for (const zoom of zooms) {
    const context = await browser.newContext({
      viewport: { width: Math.round(1536 / zoom), height: Math.round(864 / zoom) },
      deviceScaleFactor: zoom
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(300);
    await page.click('.chatbot-toggle');
    await page.waitForSelector('.chatbot-panel');

    const data = await page.evaluate((z) => {
      const root = document.querySelector('.chatbot-root');
      const panel = document.querySelector('.chatbot-panel');
      const r = panel.getBoundingClientRect();
      const scaleStr = root.style.getPropertyValue('--chatbot-zoom-scale');
      const scaleVal = parseFloat(scaleStr) || 1;

      return {
        zoom: z,
        cssScale: scaleVal,
        panelWidth: Math.round(r.width),
        panelHeight: Math.round(r.height),
        panelTop: Math.round(r.top),
        panelBottom: Math.round(r.bottom),
        winHeight: window.innerHeight,
        isPositiveTop: r.top >= 0,
        doesNotGoUp: r.top >= 0 && r.bottom <= window.innerHeight + 5
      };
    }, zoom);

    results.push(data);
    await context.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();

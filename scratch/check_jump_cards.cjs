const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/investors', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const cards = await page.$$('.inv-jump-card');
  console.log(`Found ${cards.length} cards`);
  for (let i = 0; i < cards.length; i++) {
    const box = await cards[i].boundingBox();
    const text = await cards[i].innerText();
    console.log(`Card ${i + 1} (${text.replace(/\n/g, ' ')}): width=${box.width.toFixed(1)}, height=${box.height.toFixed(1)}, y=${box.y.toFixed(1)}`);
  }

  await browser.close();
})();

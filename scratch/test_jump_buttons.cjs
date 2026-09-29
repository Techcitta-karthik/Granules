const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch', { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/investors', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  try {
    const acceptBtn = await page.$('button:has-text("ACCEPT")');
    if (acceptBtn) {
      await acceptBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}

  await page.evaluate(() => {
    document.querySelectorAll('.cookie-banner, [class*="cookie"]').forEach(b => b.remove());
    document.body.style.filter = 'none';
    const main = document.querySelector('#root, main, .cp');
    if (main) main.style.filter = 'none';
  });
  await page.waitForTimeout(500);

  const jumpNav = await page.$('.inv-jump-nav-wrap');
  if (jumpNav) {
    await jumpNav.screenshot({ path: 'scratch/jump_nav_desktop.png' });
    console.log('Captured jump_nav_desktop.png');
  }

  await page.setViewportSize({ width: 850, height: 900 });
  await page.waitForTimeout(500);
  if (jumpNav) {
    await jumpNav.screenshot({ path: 'scratch/jump_nav_tablet.png' });
    console.log('Captured jump_nav_tablet.png');
  }

  const cards = await page.$$('.inv-jump-card');
  for (let i = 0; i < cards.length; i++) {
    const box = await cards[i].boundingBox();
    const text = await cards[i].innerText();
    console.log(`Card ${i + 1} (${text.replace(/\n/g, ' ')}): w=${box.width.toFixed(1)}, h=${box.height.toFixed(1)}`);
  }

  await browser.close();
})();

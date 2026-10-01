import { chromium } from 'playwright';

async function testChannel(channel) {
  try {
    const browser = await chromium.launch({ channel, headless: true });
    console.log(`Success with channel: ${channel}`);
    const page = await browser.newPage();
    await page.goto('http://localhost:5174/', { timeout: 10000 });
    const title = await page.title();
    console.log(`Loaded page title: "${title}"`);
    await browser.close();
    return true;
  } catch (e) {
    console.log(`Failed channel ${channel}: ${e.message}`);
    return false;
  }
}

const okEdge = await testChannel('msedge');
if (!okEdge) {
  const okChrome = await testChannel('chrome');
  if (!okChrome) {
    console.log("Need to run npx playwright install chromium");
  }
}

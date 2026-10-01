import { chromium } from 'playwright';

try {
  const browser = await chromium.launch({ headless: true });
  console.log("Playwright Chromium launched successfully!");
  await browser.close();
} catch (e) {
  console.error("Chromium launch failed:", e.message);
  process.exit(1);
}

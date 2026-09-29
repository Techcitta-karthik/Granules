const { chromium } = require('playwright');
const fs = require('fs');

const laptopResolutions = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1440x900',  width: 1440, height: 900 },
  { name: '1366x768',  width: 1366, height: 768 },
  { name: '1280x720',  width: 1280, height: 720 },
  { name: '1024x768',  width: 1024, height: 768 },
  { name: '768x1024',  width: 768,  height: 1024 },
  { name: '375x667',   width: 375,  height: 667 }
];

const samplePages = [
  '/',
  '/company',
  '/company/global-subsidiaries',
  '/company/milestone',
  '/company/leadership',
  '/business/generics',
  '/business/rd',
  '/business/facilities',
  '/sustainability',
  '/community',
  '/investors',
  '/careers',
  '/contact'
];

async function inspect() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addInitScript(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });
  const page = await context.newPage();

  const report = [];

  for (const res of laptopResolutions) {
    await page.setViewportSize({ width: res.width, height: res.height });

    for (const route of samplePages) {
      await page.goto(`http://localhost:4173${route}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(60);

      const pageStats = await page.evaluate((resInfo) => {
        const issues = [];
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        // 1. Check fixed height containers where scrollHeight > clientHeight (clipped text)
        const allElements = document.querySelectorAll('section, div, article, header, footer');
        for (const el of allElements) {
          const style = window.getComputedStyle(el);
          if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
            if (el.scrollHeight > el.clientHeight + 10 && el.clientHeight > 50) {
              const tag = el.tagName.toLowerCase();
              const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '';
              issues.push({
                type: 'clipping-hidden-overflow',
                selector: `${tag}${cls}`,
                scrollHeight: el.scrollHeight,
                clientHeight: el.clientHeight
              });
            }
          }
        }

        // 2. Check images that are distorted (rendered aspect ratio differs from natural aspect ratio by > 15%)
        const images = document.querySelectorAll('img');
        for (const img of images) {
          if (img.naturalWidth > 0 && img.naturalHeight > 0 && img.clientWidth > 20 && img.clientHeight > 20) {
            const naturalRatio = img.naturalWidth / img.naturalHeight;
            const renderedRatio = img.clientWidth / img.clientHeight;
            const style = window.getComputedStyle(img);
            if (style.objectFit !== 'cover' && style.objectFit !== 'contain') {
              const ratioDiff = Math.abs(naturalRatio - renderedRatio) / naturalRatio;
              if (ratioDiff > 0.25) {
                issues.push({
                  type: 'image-distortion',
                  src: img.src.split('/').pop(),
                  naturalRatio: naturalRatio.toFixed(2),
                  renderedRatio: renderedRatio.toFixed(2),
                  objectFit: style.objectFit
                });
              }
            }
          }
        }

        // 3. Check elements exceeding container width
        const containers = document.querySelectorAll('.shell, .cp-shell, main, section');
        for (const c of containers) {
          const cRect = c.getBoundingClientRect();
          const children = c.querySelectorAll(':scope > *');
          for (const ch of children) {
            const chRect = ch.getBoundingClientRect();
            if (chRect.right > cRect.right + 5) {
              const tag = ch.tagName.toLowerCase();
              const cls = ch.className && typeof ch.className === 'string' ? '.' + ch.className.trim().split(/\s+/)[0] : '';
              issues.push({
                type: 'child-exceeds-container',
                selector: `${tag}${cls}`,
                exceedsBy: Math.round(chRect.right - cRect.right)
              });
            }
          }
        }

        // 4. Check hero section sizing
        const hero = document.querySelector('.hero, .cp-hero, .sub-hero, .gls-hero');
        let heroInfo = null;
        if (hero) {
          const hRect = hero.getBoundingClientRect();
          heroInfo = {
            height: Math.round(hRect.height),
            width: Math.round(hRect.width),
            vhPercent: Math.round((hRect.height / winH) * 100)
          };
        }

        return { issues: issues.slice(0, 5), heroInfo };
      }, res);

      if (pageStats.issues.length > 0) {
        report.push({
          resolution: res.name,
          route,
          issues: pageStats.issues
        });
      }
    }
  }

  await browser.close();
  fs.writeFileSync('scratch/inspection_report.json', JSON.stringify(report, null, 2));
  console.log(`Inspection complete. Recorded ${report.length} findings.`);
}

inspect().catch(console.error);

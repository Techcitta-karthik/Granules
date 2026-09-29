const { chromium } = require('playwright');
const fs = require('fs');

const resolutions = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1600x900',  width: 1600, height: 900 },
  { name: '1440x900',  width: 1440, height: 900 },
  { name: '1366x768',  width: 1366, height: 768 },
  { name: '1280x720',  width: 1280, height: 720 },
  { name: '1024x768',  width: 1024, height: 768 },
  { name: '834x1194',  width: 834,  height: 1194 },
  { name: '768x1024',  width: 768,  height: 1024 },
  { name: '430x932',   width: 430,  height: 932 },
  { name: '414x896',   width: 414,  height: 896 },
  { name: '390x844',   width: 390,  height: 844 },
  { name: '375x667',   width: 375,  height: 667 },
  { name: '360x800',   width: 360,  height: 800 },
];

const routes = [
  '/',
  '/company',
  '/company/global-subsidiaries',
  '/company/milestone',
  '/company/awards',
  '/company/leadership',
  '/company/granules-czro',
  '/company/senn-tides',
  '/company/ascelis-peptides',
  '/company/granules-life-sciences',
  '/company/operational-excellence',
  '/business',
  '/business/generics',
  '/business/api',
  '/business/pfi',
  '/business/fd',
  '/business/product-portfolio',
  '/business/rd',
  '/business/quality-compliance',
  '/business/facilities',
  '/business/peptides',
  '/sustainability',
  '/sustainability/strategy',
  '/sustainability/esg-in-action',
  '/sustainability/esg-profile',
  '/sustainability/ehs',
  '/community',
  '/investors',
  '/investors/annual-reports',
  '/media',
  '/careers',
  '/careers/life-at-granules',
  '/contact'
];

async function testAll() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addInitScript(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  const page = await context.newPage();
  const findings = [];

  for (const res of resolutions) {
    await page.setViewportSize({ width: res.width, height: res.height });

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:4173${route}`, { waitUntil: 'domcontentloaded', timeout: 8000 });
        await page.waitForTimeout(50);

        const check = await page.evaluate(() => {
          const doc = document.documentElement;
          const b = document.body;
          const sW = Math.max(doc.scrollWidth, b.scrollWidth);
          const wW = window.innerWidth;
          const hScroll = sW > wW + 1;

          let offender = null;
          if (hScroll) {
            let maxRight = wW;
            const els = document.querySelectorAll('body *');
            for (const el of els) {
              if (['SCRIPT', 'STYLE', 'HEAD', 'META'].includes(el.tagName)) continue;
              const r = el.getBoundingClientRect();
              if (r.right > maxRight + 1) {
                maxRight = r.right;
                offender = {
                  tag: el.tagName.toLowerCase(),
                  cls: el.className || '',
                  width: Math.round(r.width),
                  right: Math.round(r.right),
                  overflow: Math.round(r.right - wW)
                };
              }
            }
          }

          return { hScroll, sW, wW, offender };
        });

        if (check.hScroll) {
          findings.push({
            route,
            res: res.name,
            diff: check.sW - check.wW,
            offender: check.offender
          });
        }
      } catch (e) {}
    }
  }

  await browser.close();
  console.log(`Scan finished. Overflows detected: ${findings.length}`);
  fs.writeFileSync('scratch/full_overflow_scan.json', JSON.stringify(findings, null, 2));
}

testAll().catch(console.error);

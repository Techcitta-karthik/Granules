const { chromium } = require('playwright');
const fs = require('fs');

const resolutions = [
  // Desktop / Laptop
  { name: '1920x1080', width: 1920, height: 1080, type: 'desktop' },
  { name: '1600x900',  width: 1600, height: 900,  type: 'laptop' },
  { name: '1440x900',  width: 1440, height: 900,  type: 'laptop' },
  { name: '1366x768',  width: 1366, height: 768,  type: 'laptop' },
  { name: '1280x720',  width: 1280, height: 720,  type: 'laptop' },
  { name: '1024x768',  width: 1024, height: 768,  type: 'desktop-small' },
  // Tablet
  { name: '834x1194',  width: 834,  height: 1194, type: 'tablet' },
  { name: '768x1024',  width: 768,  height: 1024, type: 'tablet' },
  // Mobile
  { name: '430x932',   width: 430,  height: 932,  type: 'mobile' },
  { name: '414x896',   width: 414,  height: 896,  type: 'mobile' },
  { name: '390x844',   width: 390,  height: 844,  type: 'mobile' },
  { name: '375x667',   width: 375,  height: 667,  type: 'mobile' },
  { name: '360x800',   width: 360,  height: 800,  type: 'mobile' },
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

async function runAudit() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Dismiss cookie consent by default
  await context.addInitScript(() => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify({ analytics: true, functional: true }));
  });

  const page = await context.newPage();
  const issues = [];

  console.log('Auditing horizontal overflow across routes and resolutions...');

  for (const res of resolutions) {
    await page.setViewportSize({ width: res.width, height: res.height });

    for (const route of routes) {
      const url = `http://localhost:4173${route}`;
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.waitForTimeout(60);

        const checkResult = await page.evaluate((resInfo) => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const winWidth = window.innerWidth;

          // Check if there is actual horizontal scroll
          const hasHScroll = scrollWidth > winWidth + 1.5;

          const overflowingElements = [];
          if (hasHScroll) {
            const all = document.querySelectorAll('body *');
            for (const el of all) {
              if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'TITLE', 'NOSCRIPT', 'SVG', 'PATH'].includes(el.tagName)) continue;
              const rect = el.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                if (rect.right > winWidth + 1.5 || rect.left < -1.5) {
                  const tag = el.tagName.toLowerCase();
                  const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '';
                  const id = el.id ? '#' + el.id : '';
                  overflowingElements.push({
                    selector: `${tag}${id}${cls}`,
                    left: Math.round(rect.left),
                    right: Math.round(rect.right),
                    width: Math.round(rect.width),
                    overflowBy: Math.round(rect.right - winWidth)
                  });
                }
              }
            }
          }

          return {
            hasHScroll,
            scrollWidth,
            winWidth,
            diff: scrollWidth - winWidth,
            overflowingElements: overflowingElements.slice(0, 8)
          };
        }, res);

        if (checkResult.hasHScroll) {
          issues.push({
            route,
            resolution: res.name,
            resType: res.type,
            scrollWidth: checkResult.scrollWidth,
            winWidth: checkResult.winWidth,
            diff: checkResult.diff,
            elements: checkResult.overflowingElements
          });
        }
      } catch (err) {
        // ignore page timeout
      }
    }
  }

  console.log(`Overflow audit done. Now checking chatbot sizing...`);

  const chatbotIssues = [];
  for (const res of resolutions) {
    await page.setViewportSize({ width: res.width, height: res.height });
    await page.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(100);

    const panelBox = await page.evaluate(() => {
      // simulate opening chatbot via DOM
      const root = document.querySelector('.chatbot-root');
      const toggle = document.querySelector('.chatbot-toggle');
      if (toggle) toggle.click();

      const panel = document.querySelector('.chatbot-panel');
      if (!panel) return null;
      const rect = panel.getBoundingClientRect();
      const style = window.getComputedStyle(panel);
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        cssWidth: style.width,
        cssMaxWidth: style.maxWidth,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        overflowsX: rect.right > window.innerWidth + 1 || rect.left < -1,
        overflowsY: rect.bottom > window.innerHeight + 1 || rect.top < -1
      };
    });

    if (panelBox && (panelBox.overflowsX || panelBox.overflowsY || panelBox.width > res.width - 20)) {
      chatbotIssues.push({
        resolution: res.name,
        resType: res.type,
        ...panelBox
      });
    }
  }

  await browser.close();

  const results = {
    totalOverflows: issues.length,
    issues,
    chatbotIssues
  };

  fs.writeFileSync('scratch/audit_results.json', JSON.stringify(results, null, 2));
  console.log(`Results saved to scratch/audit_results.json. Overflows found: ${issues.length}, Chatbot issues: ${chatbotIssues.length}`);
}

runAudit().catch(console.error);

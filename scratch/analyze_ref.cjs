const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const rawPath = 'C:/Users/ADMIN/.gemini/antigravity-ide/brain/9240a4a4-3b47-4d64-8a1e-8b3751408890/.user_uploaded/media_1790667428965.png';
  const imgBase64 = fs.readFileSync(rawPath).toString('base64');
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:black;">
        <canvas id="cv"></canvas>
        <script>
          const img = new Image();
          img.src = 'data:image/png;base64,${imgBase64}';
          img.onload = () => {
            const cv = document.getElementById('cv');
            cv.width = img.width;
            cv.height = img.height;
            const ctx = cv.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const imgData = ctx.getImageData(0, 0, cv.width, cv.height);
            const { data, width, height } = imgData;
            
            let minX = width, maxX = 0, minY = height, maxY = 0;
            // The blue header is in top-right of panel, y roughly between 50 and 200, x > 600
            for (let y = 50; y < 200; y++) {
              for (let x = 600; x < width; x++) {
                const idx = (y * width + x) * 4;
                const r = data[idx];
                const g = data[idx+1];
                const b = data[idx+2];
                if (r < 50 && g > 75 && g < 135 && b > 210) {
                  if (x < minX) minX = x;
                  if (x > maxX) maxX = x;
                  if (y < minY) minY = y;
                  if (y > maxY) maxY = y;
                }
              }
            }
            window._headerBox = { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY, width, height };
          };
        </script>
      </body>
    </html>
  `);
  
  await page.waitForFunction(() => window._headerBox !== undefined);
  const headerBox = await page.evaluate(() => window._headerBox);
  console.log('Chatbot Header Box in reference image:', headerBox);

  const details = await page.evaluate(() => {
    const cv = document.getElementById('cv');
    const ctx = cv.getContext('2d');
    const { data, width, height } = ctx.getImageData(0, 0, cv.width, cv.height);
    
    // Find toggle button near bottom right
    let tMinX = width, tMaxX = 0, tMinY = height, tMaxY = 0;
    for (let y = height - 100; y < height; y++) {
      for (let x = width - 100; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r < 50 && g > 75 && g < 135 && b > 210) {
          if (x < tMinX) tMinX = x;
          if (x > tMaxX) tMaxX = x;
          if (y < tMinY) tMinY = y;
          if (y > tMaxY) tMaxY = y;
        }
      }
    }

    // Panel bottom: scan down from headerBox.minX + 20 to headerBox.maxX - 20
    let panelBottomY = 0;
    const midX = Math.round((window._headerBox.minX + window._headerBox.maxX) / 2);
    for (let y = window._headerBox.minY; y < height; y++) {
      const idx = (y * width + midX) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Inside composer or panel border or white body
      if ((r > 190 && g > 190 && b > 190) || (r < 50 && g > 75 && b > 210)) {
        panelBottomY = y;
      }
    }

    return {
      toggleBox: { tMinX, tMaxX, tMinY, tMaxY, w: tMaxX - tMinX, h: tMaxY - tMinY },
      panelBottomY,
      panelTotalHeight: panelBottomY - window._headerBox.minY,
      distPanelBottomToScreenBottom: height - panelBottomY,
      distToggleToScreenBottom: height - tMaxY,
      distToggleToScreenRight: width - tMaxX,
      distPanelRightToScreenRight: width - window._headerBox.maxX
    };
  });
  console.log('Chatbot Details in reference image:', details);
  await browser.close();
})();

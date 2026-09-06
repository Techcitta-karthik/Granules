const { chromium } = require('c:/Users/ADMIN/Desktop/granules-india-website-main/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.abort();
      reject(new Error('Timeout'));
    });
  });
}

async function fetchGoogleImages() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const queries = [
    {
      id: 'gpi_chantilly',
      query: 'Granules Pharmaceuticals Inc 3701 Concorde Pkwy Chantilly VA',
      filename: 'gpi-chantilly.jpg'
    },
    {
      id: 'granules_manassas',
      query: 'Granules Consumer Health 7413 Cushing Rd Manassas VA',
      filename: 'granules-manassas.jpg'
    },
    {
      id: 'granules_parsippany',
      query: '35 Waterview Blvd Parsippany NJ building exterior',
      filename: 'granules-parsippany.jpg'
    },
    {
      id: 'senn_chemicals',
      query: 'Senn Chemicals AG Guido Senn-Strasse Dielsdorf Switzerland',
      filename: 'senn-chemicals-dielsdorf.jpg'
    }
  ];

  const outDir = path.join('c:/Users/ADMIN/Desktop/granules-india-website-main/public/assets/facilities');

  for (const item of queries) {
    try {
      console.log(`Searching for: ${item.query}`);
      const googleImgUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(item.query)}`;
      await page.goto(googleImgUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(2000);

      // Extract image URLs
      const imgUrls = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const results = [];
        for (const img of imgs) {
          const src = img.src || img.getAttribute('data-src') || img.getAttribute('src');
          if (src && (src.startsWith('http') || src.startsWith('data:image/jpeg') || src.startsWith('data:image/png'))) {
            // Check size
            const rect = img.getBoundingClientRect();
            if (rect.width > 100 && rect.height > 60) {
              results.push(src);
            }
          }
        }
        return results;
      });

      console.log(`Found ${imgUrls.length} images for ${item.id}`);

      let saved = false;
      for (const url of imgUrls) {
        if (url.startsWith('data:image')) {
          const base64Data = url.replace(/^data:image\/\w+;base64,/, '');
          const destPath = path.join(outDir, item.filename);
          fs.writeFileSync(destPath, Buffer.from(base64Data, 'base64'));
          console.log(`Saved base64 image to ${destPath}`);
          saved = true;
          break;
        } else if (url.startsWith('http')) {
          try {
            const destPath = path.join(outDir, item.filename);
            await downloadFile(url, destPath);
            console.log(`Downloaded image to ${destPath}`);
            saved = true;
            break;
          } catch (e) {
            console.log(`Download failed for ${url}: ${e.message}`);
          }
        }
      }

      if (!saved) {
        console.warn(`Could not save image for ${item.id}`);
      }
    } catch (err) {
      console.error(`Error processing ${item.id}:`, err.message);
    }
  }

  await browser.close();
}

fetchGoogleImages().catch(console.error);

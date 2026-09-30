// extract_dates.cjs - Extract dates from press release PDFs
const fs = require('fs');
const https = require('https');
const { PDFParse } = require('pdf-parse');

const data = JSON.parse(fs.readFileSync('src/data/mediaData.json', 'utf8'));

// Test with first 3 from 2026
const testPdfs = data.pressReleases['2026'].slice(0, 3);

function fetchPdf(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPdf(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function extractTextFromPdf(buffer) {
  const parser = new PDFParse(new Uint8Array(buffer), { verbosity: 0 });
  const result = await parser.getText();
  return result;
}

async function main() {
  for (const pr of testPdfs) {
    try {
      console.log(`\n--- ${pr.id} ---`);
      const buf = await fetchPdf(pr.pdf);
      const text = await extractTextFromPdf(buf);
      console.log('First 500 chars:', text.substring(0, 500));
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

main();

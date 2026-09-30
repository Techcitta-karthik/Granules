// extract_all_dates.cjs - Extract exact dates from all press release PDFs
const fs = require('fs');
const https = require('https');
const http = require('http');
const { PDFParse } = require('pdf-parse');

const data = JSON.parse(fs.readFileSync('src/data/mediaData.json', 'utf8'));

const MONTHS_MAP = {
  'january': '01', 'february': '02', 'march': '03', 'april': '04',
  'may': '05', 'june': '06', 'july': '07', 'august': '08',
  'september': '09', 'october': '10', 'november': '11', 'december': '12'
};

const URL_MONTHS = {
  '01': 'January', '02': 'February', '03': 'March', '04': 'April',
  '05': 'May', '06': 'June', '07': 'July', '08': 'August',
  '09': 'September', '10': 'October', '11': 'November', '12': 'December'
};

function fetchPdf(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPdf(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        res.resume();
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function extractDateFromText(text) {
  // Pattern: "Month Day, Year" e.g. "July 6, 2026"
  const patterns = [
    /[-–—]\s*(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4})/i,
    /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4})/i,
    /(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December),?\s*\d{4})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      let dateStr = m[1].trim();
      // Normalize: "July 6, 2026" -> "July 6, 2026"
      return dateStr;
    }
  }
  return null;
}

function getDateFromUrl(url) {
  const match = url.match(/\/pdfs\/(\d{4})\/(\d{2})\//);
  if (match) return `${URL_MONTHS[match[2]]} ${match[1]}`;
  return null;
}

async function extractDateFromPdf(url) {
  try {
    const buf = await fetchPdf(url);
    // Check if it's actually a PDF
    if (buf.slice(0, 5).toString() !== '%PDF-') {
      return null;
    }
    const p = new PDFParse(new Uint8Array(buf), { verbosity: 0 });
    const result = await p.getText();
    if (result && result.pages && result.pages[0]) {
      return extractDateFromText(result.pages[0].text);
    }
    if (result && result.text) {
      return extractDateFromText(typeof result.text === 'string' ? result.text : JSON.stringify(result.text));
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Process in batches of 5 to avoid overwhelming the server
async function processBatch(items, batchSize = 5) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (pr) => {
        const pdfDate = await extractDateFromPdf(pr.pdf);
        return { id: pr.id, pdfDate, urlDate: getDateFromUrl(pr.pdf) };
      })
    );
    results.push(...batchResults);
    if (i + batchSize < items.length) {
      process.stdout.write(`  Processed ${Math.min(i + batchSize, items.length)}/${items.length}...\r`);
    }
  }
  return results;
}

async function main() {
  // Collect all press releases
  const allPrs = [];
  for (const [year, releases] of Object.entries(data.pressReleases)) {
    for (const pr of releases) {
      allPrs.push(pr);
    }
  }
  console.log(`Total press releases: ${allPrs.length}`);

  // Process all
  console.log('Extracting dates from PDFs...');
  const results = await processBatch(allPrs, 5);

  let pdfDates = 0;
  let urlDates = 0;
  let noDate = 0;

  // Create a map of results
  const dateMap = {};
  for (const r of results) {
    if (r.pdfDate) {
      dateMap[r.id] = r.pdfDate;
      pdfDates++;
    } else if (r.urlDate) {
      dateMap[r.id] = r.urlDate;
      urlDates++;
    } else {
      noDate++;
    }
  }

  console.log(`\nResults: ${pdfDates} from PDF, ${urlDates} from URL, ${noDate} no date`);

  // Update the data
  for (const [year, releases] of Object.entries(data.pressReleases)) {
    for (const pr of releases) {
      if (dateMap[pr.id]) {
        pr.year = dateMap[pr.id];
      }
    }
  }

  // Show samples
  console.log('\nSamples:');
  for (const year of ['2026', '2025', '2024']) {
    if (data.pressReleases[year]) {
      console.log(`\n${year}:`);
      data.pressReleases[year].slice(0, 5).forEach(pr => {
        console.log(`  ${pr.id}: "${pr.year}"`);
      });
    }
  }

  // Save
  fs.writeFileSync('src/data/mediaData.json', JSON.stringify(data, null, 2) + '\n');
  console.log('\nSaved updated mediaData.json');
}

main().catch(e => console.error('Fatal:', e));

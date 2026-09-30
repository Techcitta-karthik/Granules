import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParseModule = require('pdf-parse/lib/pdf-parse.js');
import https from 'https';
import http from 'http';

// Read mediaData
const data = JSON.parse(fs.readFileSync('src/data/mediaData.json', 'utf8'));

// Test with first 3 PDFs from 2026
const testPdfs = data.pressReleases['2026'].slice(0, 3);

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function fetchPdf(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, (res) => {
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

function extractDate(text) {
  // Common date patterns in press releases
  const patterns = [
    // "July 24, 2026" or "July 24th, 2026"
    /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?,?\s*\d{4})/i,
    // "24 July 2026" or "24th July 2026"
    /(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December),?\s*\d{4})/i,
    // "24/07/2026" or "24-07-2026"
    /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/,
  ];

  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1].trim();
  }
  return null;
}

async function main() {
  for (const pr of testPdfs) {
    try {
      console.log(`\n--- ${pr.id} ---`);
      console.log(`Title: ${pr.title.substring(0, 80)}...`);
      console.log(`PDF: ${pr.pdf}`);
      
      const buf = await fetchPdf(pr.pdf);
      const parsed = await pdfParseModule(buf);
      const text = parsed.text;
      
      // Show first 500 chars to find date format
      console.log(`First 500 chars:\n${text.substring(0, 500)}`);
      
      const date = extractDate(text);
      console.log(`Extracted date: ${date}`);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

main();

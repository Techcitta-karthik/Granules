import fs from 'fs';
import path from 'path';

const SRC = path.resolve('src');
const CDN = 'https://d16d47oyl512wy.cloudfront.net/pdfs';
const WP = /https?:\/\/(?:www\.)?granulesindia\.com\/wp-content\/uploads/gi;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) files.push(p);
  }
  return files;
}

function stripHash(name) {
  return name.replace(/-[a-f0-9]{8,12}(?=\.pdf$)/i, '');
}

function normalize(name) {
  return stripHash(name)
    .toLowerCase()
    .replace(/\.pdf$/i, '')
    .replace(/[^a-z0-9]+/g, '');
}

const files = walk(SRC);
const documents = new Set();
const wpUrls = new Set();

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\/documents\/[^"'\\\s]+\.pdf/g)) {
    documents.add(m[0]);
  }
  for (const m of text.matchAll(/https?:\/\/(?:www\.)?granulesindia\.com\/wp-content\/uploads\/[^"'\\\s]+/g)) {
    wpUrls.add(m[0].replace(/\\u0026/g, '&'));
  }
}

const wpByNorm = new Map();
for (const url of wpUrls) {
  const filename = decodeURIComponent(url.split('/').pop().split('?')[0]).replace(/&#039;/g, "'");
  const key = normalize(filename);
  if (!wpByNorm.has(key)) wpByNorm.set(key, []);
  wpByNorm.get(key).push({ url, filename, cdn: url.replace(WP, CDN) });
}

const matched = [];
const unmatched = [];

for (const doc of [...documents].sort()) {
  const filename = doc.split('/').pop();
  const key = normalize(filename);
  const hits = wpByNorm.get(key) || [];
  if (hits.length) {
    matched.push({ doc, cdn: hits[0].cdn, filename: hits[0].filename, alts: hits.length });
  } else {
    unmatched.push({ doc, stripped: stripHash(filename) });
  }
}

console.log(`documents: ${documents.size}`);
console.log(`wp urls: ${wpUrls.size}`);
console.log(`matched: ${matched.length}`);
console.log(`unmatched: ${unmatched.length}`);
console.log('\n=== MATCHED ===');
for (const row of matched) {
  console.log(`${row.doc}\n  -> ${row.cdn}${row.alts > 1 ? ` (${row.alts} alts)` : ''}`);
}
console.log('\n=== UNMATCHED ===');
for (const row of unmatched) {
  console.log(`${row.doc}\n  stripped: ${row.stripped}`);
}

fs.writeFileSync(
  'scripts/pdf-map.json',
  JSON.stringify({ matched, unmatched }, null, 2)
);

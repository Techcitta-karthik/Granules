import fs from 'fs';
import path from 'path';

const SRC = path.resolve('src');
const CDN = 'https://d16d47oyl512wy.cloudfront.net/pdfs';
const WP_RE = /https?:\/\/(?:www\.)?granulesindia\.com\/+wp-content\/uploads/gi;

const extras = {
  '/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf': `${CDN}/2026/07/Granules_Annual-Report-FY26.pdf`,
  '/documents/Press-Release-Q2-FY26-07edcf6db296.pdf': `${CDN}/2025/11/Press-Release-Q2-FY26.pdf`,
  '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf': `${CDN}/pdf/other-information/ISO-14001&45001-Certificate.pdf`,
  '/documents/ISO-14001-45001-ceritificate-933b65fc494c.pdf': `${CDN}/pdf/other-information/ISO-14001&45001-ceritificate.pdf`,
  '/documents/COBC-9b98735608b9.pdf': `${CDN}/2022/03/COBC.pdf`,
  '/documents/Granules_Product_Brochure_API-2e0d50e7805c.pdf': `${CDN}/2025/05/Granules_Product_Brochure_API.pdf`,
  '/documents/GIL_Product_Brochure_May_20_2025_Master_PFI-7abcdf7c89b2.pdf': `${CDN}/2025/06/GIL_Product_Brochure_May_20_2025_Master_PFI.pdf`,
  '/documents/GIL_Product_Brochure_May_20_2025_Master_FD-9f15994d9ad2.pdf': `${CDN}/2025/06/GIL_Product_Brochure_May_20_2025_Master_FD.pdf`,
  '/documents/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental--7c3fd95ad004.pdf': `${CDN}/2026/05/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental-Statement-Form-V.pdf`,
  '/documents/Supplier-Code-of-Conduct-Sustainability-Program-2024-1-a6c058f75a2f.pdf': `${CDN}/2025/05/Supplier-Code-of-Conduct.pdf`,
  '/documents/8328CSR-Policy-30ada84aca1b.pdf': `${CDN}/2025/12/CSR-Policy.pdf`,
  '/documents/Granules-Code-of-Business-Conduct-for-Suppliers-b394765c24cf.pdf': `${CDN}/2025/05/Supplier-Code-of-Conduct.pdf`,
  '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf': `${CDN}/2025/07/Granules_Integrated-Report-2024-25.pdf`,
  '/documents/Granules-India-Limited-Honored-with-Golden-Peacock-Award-for-Sustainability-e36c3f2a8a41.pdf': `${CDN}/2024/11/Granules-India-Limited-Honored-with-Golden-Peacock-Award-for-Sustainability.pdf`,
  '/documents/Granules-India-Transforms-BC-Government-Boys-Hostel-in-Parawada-ac5a57c033b8.pdf': `${CDN}/2025/08/Granules-India-Transforms-BC-Government-Boys-Hostel-in-Parawada.pdf`,
  '/documents/Press-Release-Granules-India-Limited-Inaugurated-an-Overhead-Water-Tank-at-Bonthapally-0cc922afda83.pdf': `${CDN}/2022/10/Press-Release-Granules-India-Limited-Inaugurated-an-Overhead-Water-Tank-at-Bonthapally.pdf`,
  '/documents/Press-Release-Granules-India-Limited-Inaugurated-a-Overhead-Water-Tank-at-Bonthapally-1-254a750cb84c.pdf': `${CDN}/2022/10/Press-Release-Granules-India-Limited-Inaugurated-an-Overhead-Water-Tank-at-Bonthapally.pdf`,
  '/documents/CSR-Annual-Report-2023-24-5d55fa4f91e9.pdf': `${CDN}/2024/07/GranulesIndia-limited-AR-2023-24.pdf`,
};

const mapJson = JSON.parse(fs.readFileSync('scripts/pdf-map.json', 'utf8'));
const docMap = {};
for (const row of mapJson.matched) docMap[row.doc] = row.cdn;
Object.assign(docMap, extras);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (/\.(ts|tsx|js|jsx|json)$/.test(entry.name)) files.push(p);
  }
  return files;
}

function rewrite(text) {
  let out = text.replace(WP_RE, CDN);
  out = out.replace(/ISO-14001&amp;45001/g, 'ISO-14001&45001');
  const keys = Object.keys(docMap).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (out.includes(key)) out = out.split(key).join(docMap[key]);
  }
  return out;
}

const mapEntries = Object.entries(docMap)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([from, to]) => `  ${JSON.stringify(from)}: ${JSON.stringify(to)},`)
  .join('\n');

const helper = `export const PDF_CDN_BASE = ${JSON.stringify(CDN)};

const WP_UPLOADS = /^https?:\\/\\/(?:www\\.)?granulesindia\\.com\\/+wp-content\\/uploads/i;

const DOCUMENT_PDF_MAP: Record<string, string> = {
${mapEntries}
};

/** Rewrite a WordPress or local /documents PDF path to the CloudFront CDN. */
export function toCdnPdf(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith(PDF_CDN_BASE) || url.includes('d16d47oyl512wy.cloudfront.net')) {
    return url.replace(/ISO-14001&amp;45001/g, 'ISO-14001&45001');
  }
  if (WP_UPLOADS.test(url)) {
    return url
      .replace(WP_UPLOADS, PDF_CDN_BASE)
      .replace(/ISO-14001&amp;45001/g, 'ISO-14001&45001');
  }
  const pathOnly = url.split('?')[0];
  return DOCUMENT_PDF_MAP[pathOnly] || url;
}
`;

let changed = 0;
for (const file of walk(SRC)) {
  if (file.endsWith(`${path.sep}lib${path.sep}pdf.ts`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = rewrite(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
    console.log('updated', path.relative(process.cwd(), file));
  }
}

fs.mkdirSync('src/lib', { recursive: true });
fs.writeFileSync('src/lib/pdf.ts', helper);
console.log('wrote src/lib/pdf.ts');

const leftoverDocs = new Set();
const leftoverWp = new Set();
for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\/documents\/[^"'\\\s]+\.pdf/g)) leftoverDocs.add(`${path.relative(process.cwd(), file)}: ${m[0]}`);
  for (const m of text.matchAll(/granulesindia\.com\/+wp-content\/uploads/g)) leftoverWp.add(path.relative(process.cwd(), file));
}

console.log(`\nfiles changed: ${changed}`);
console.log(`mapped documents: ${Object.keys(docMap).length}`);
console.log(`leftover /documents/: ${leftoverDocs.size}`);
for (const row of leftoverDocs) console.log('  ', row);
console.log(`leftover wordpress uploads: ${leftoverWp.size}`);
for (const row of leftoverWp) console.log('  ', row);

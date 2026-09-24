import fs from 'fs';
import path from 'path';

const UPLOADS = 'C:\\Users\\ADMIN\\Downloads\\uploads\\uploads';
const SRC = path.resolve('src');
const CATALOG_OUT = path.resolve('src/lib/pdf-catalog.json');
const CDN_HOST = 'https://d16d47oyl512wy.cloudfront.net/pdfs';

function decodeSegment(segment) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function collapseKey(value) {
  return decodeSegment(String(value))
    .replace(/\.pdf$/i, '')
    .replace(/[^a-z0-9]+/gi, '')
    .toLowerCase();
}

function walkPdfs(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkPdfs(full, files);
    else if (/\.pdf$/i.test(entry.name)) files.push(full);
  }
  return files;
}

const pdfFiles = walkPdfs(UPLOADS);
const paths = pdfFiles
  .map((full) => path.relative(UPLOADS, full).split(path.sep).join('/'))
  .sort((a, b) => a.localeCompare(b));

const pathByLower = new Map(paths.map((rel) => [rel.toLowerCase(), rel]));
const pathsByCollapsed = new Map();
for (const rel of paths) {
  const name = rel.split('/').pop();
  const key = collapseKey(name);
  const list = pathsByCollapsed.get(key) || [];
  list.push(rel);
  pathsByCollapsed.set(key, list);
}

function extractRel(url) {
  const raw = String(url).replace(/&amp;/g, '&').replace(/&#039;/g, "'").trim();
  let rest = raw.split('?')[0];
  if (/d16d47oyl512wy\.cloudfront\.net\/pdfs/i.test(rest)) {
    rest = rest.replace(/^https?:\/\/[^/]+\/pdfs\/?/i, '');
  } else if (/wp-content\/uploads/i.test(rest)) {
    rest = rest.replace(/^(?:https?:\/\/(?:www\.)?granulesindia\.com)?(?:\[home_url\])?\/+wp-content\/uploads\/?/i, '');
  } else if (/^\/?pdfs\//i.test(rest)) {
    rest = rest.replace(/^\/?pdfs\//i, '');
  } else {
    return null;
  }
  return rest.replace(/^\/+/, '').split('/').map(decodeSegment).join('/');
}

function resolveRel(rel) {
  if (!rel) return rel;
  const exact = pathByLower.get(rel.toLowerCase());
  if (exact) return exact;
  const parts = rel.split('/');
  const filename = parts.pop() || '';
  const dir = parts.join('/');
  const hits = pathsByCollapsed.get(collapseKey(filename)) || [];
  const sameDir = hits.filter((h) => h.split('/').slice(0, -1).join('/').toLowerCase() === dir.toLowerCase());
  if (sameDir.length) return sameDir[0];
  if (hits.length) return hits[0];
  return rel;
}

function toCdn(rel) {
  return `${CDN_HOST}/${rel}`;
}

fs.writeFileSync(
  CATALOG_OUT,
  JSON.stringify(
    {
      generatedFrom: 'C:/Users/ADMIN/Downloads/uploads/uploads',
      count: paths.length,
      paths,
    },
    null,
    2
  )
);

const CDN_RE = /https:\/\/d16d47oyl512wy\.cloudfront\.net\/pdfs\/[^"']+/g;
const SRC_EXTS = /\.(ts|tsx|js|jsx|json)$/;

function walkSrc(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkSrc(full, files);
    else if (SRC_EXTS.test(entry.name)) files.push(full);
  }
  return files;
}

const rewritten = [];
const unresolved = [];
const alreadyCorrect = [];

for (const file of walkSrc(SRC)) {
  let text = fs.readFileSync(file, 'utf8');
  let changed = false;
  text = text.replace(CDN_RE, (match) => {
    const rel = extractRel(match);
    const resolved = resolveRel(rel);
    const next = toCdn(resolved);
    if (resolved !== rel) {
      rewritten.push({ file: path.relative(SRC, file), from: rel, to: resolved });
      changed = true;
      return next;
    }
    if (!pathByLower.has(rel.toLowerCase())) {
      unresolved.push({ file: path.relative(SRC, file), rel });
    } else {
      alreadyCorrect.push(rel);
    }
    return match;
  });
  if (changed) fs.writeFileSync(file, text);
}

const sample = resolveRel('pdf/3127AnnualReport-FY18-19.pdf');
console.log(`cataloged ${paths.length} PDFs -> ${path.relative(process.cwd(), CATALOG_OUT)}`);
console.log(`rewrote ${rewritten.length} CloudFront URLs`);
console.log(`unresolved ${new Set(unresolved.map((r) => r.rel)).size} unique paths`);
console.log('sample 3127:', sample);
console.log('encoded:', sample.split('/').map(encodeURIComponent).join('/'));

const uniqueUnresolved = [...new Set(unresolved.map((r) => r.rel))].sort();
if (uniqueUnresolved.length) {
  console.log('\n=== UNRESOLVED ===');
  for (const rel of uniqueUnresolved.slice(0, 40)) console.log(rel);
  if (uniqueUnresolved.length > 40) console.log(`... ${uniqueUnresolved.length - 40} more`);
}

fs.writeFileSync(
  path.resolve('scripts/pdf-rewrite-report.json'),
  JSON.stringify({ rewritten, unresolved: uniqueUnresolved }, null, 2)
);

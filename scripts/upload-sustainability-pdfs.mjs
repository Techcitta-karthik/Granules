import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const UPLOADS = 'C:/Users/ADMIN/Downloads/uploads/uploads';
const BUCKET = 'granuless';
const PREFIX = 'pdfs';

const src = fs.readFileSync(path.join(ROOT, 'src/pages/SustainabilityOverviewPage.tsx'), 'utf8');
const rels = [...src.matchAll(/susPdf\('([^']+)'\)/g)].map((m) => m[1]);
const unique = [...new Set(rels)];

const uploaded = [];
const missing = [];
const failed = [];

for (const rel of unique) {
  const local = path.join(UPLOADS, ...rel.split('/'));
  const key = `${PREFIX}/${rel.replace(/\\/g, '/')}`;

  if (!fs.existsSync(local)) {
    missing.push(rel);
    console.log('MISS', rel);
    continue;
  }

  const result = spawnSync(
    'aws',
    ['s3', 'cp', local, `s3://${BUCKET}/${key}`, '--content-type', rel.endsWith('.zip') ? 'application/zip' : 'application/pdf'],
    { encoding: 'utf8' }
  );

  if (result.status !== 0) {
    failed.push({ rel, error: result.stderr || result.stdout });
    console.log('FAIL', rel, result.stderr?.trim() || result.stdout?.trim());
  } else {
    uploaded.push(rel);
    console.log('OK  ', rel);
  }
}

console.log(
  JSON.stringify(
    {
      total: unique.length,
      uploaded: uploaded.length,
      missing: missing.length,
      failed: failed.length,
      missingFiles: missing,
      failures: failed,
    },
    null,
    2
  )
);

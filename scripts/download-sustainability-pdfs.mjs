import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const UPLOADS = 'C:/Users/ADMIN/Downloads/uploads/uploads';
const BASE = 'https://granulesindia.com/sustainability/wp-content/uploads';
const src = fs.readFileSync(path.join(ROOT, 'src/pages/SustainabilityOverviewPage.tsx'), 'utf8');
const rels = [...src.matchAll(/\$\{SUS_UPLOADS\}\/([^'"`]+)/g)].map((m) => m[1]);
const unique = [...new Set(rels)];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      resolve('skip');
      return;
    }

    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve('ok')));
      })
      .on('error', reject);
  });
}

const results = { ok: [], skip: [], fail: [] };

for (const rel of unique) {
  const url = `${BASE}/${rel}`;
  const dest = path.join(UPLOADS, ...rel.split('/'));
  try {
    const status = await download(url, dest);
    results[status === 'skip' ? 'skip' : 'ok'].push(rel);
    console.log(status === 'skip' ? 'SKIP' : 'OK  ', rel);
  } catch (error) {
    results.fail.push({ rel, error: error.message });
    console.log('FAIL', rel, error.message);
  }
}

console.log(
  JSON.stringify(
    { total: unique.length, ok: results.ok.length, skip: results.skip.length, fail: results.fail.length, failures: results.fail },
    null,
    2
  )
);

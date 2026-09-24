import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const isDelete = args.includes('--delete');
const isBackup = args.includes('--backup');
const targetArg = args.find(a => a.startsWith('--target='))?.split('=')[1] || (args.includes('--all') ? 'all' : 'assets');

console.log('=====================================================');
console.log('   GRANULES INDIA - UNUSED IMAGE CLEANUP UTILITY    ');
console.log('=====================================================');
console.log(`Mode:    ${isDelete ? (isBackup ? 'BACKUP & REMOVE' : 'PERMANENT DELETE') : 'DRY RUN (preview only, no files modified)'}`);
console.log(`Target:  ${targetArg === 'all' ? 'public/assets AND public/uploads' : targetArg === 'uploads' ? 'public/uploads only' : 'public/assets only'}`);
if (!isDelete) {
  console.log('Tip:     Run with "--delete" to remove files, or "--backup" to move them to _backup_unused_imgs/');
}
console.log('-----------------------------------------------------\n');

// 1. Gather all source code content
const srcDirs = ['src'];
const configFiles = ['index.html', 'vite.config.ts', 'netlify.toml', 'vercel.json', 'public/_redirects'];
const srcFiles = [];

function collectSourceFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        collectSourceFiles(full);
      }
    } else if (/\.(jsx?|tsx?|css|scss|html|json|md)$/i.test(entry.name)) {
      srcFiles.push(full);
    }
  }
}

srcDirs.forEach(d => collectSourceFiles(path.join(rootDir, d)));
configFiles.forEach(f => {
  const full = path.join(rootDir, f);
  if (fs.existsSync(full)) srcFiles.push(full);
});

console.log(`Scanned ${srcFiles.length} source and configuration files.`);
const allSourceText = srcFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

// 2. Identify target image folders
const targetFolders = [];
if (targetArg === 'assets' || targetArg === 'all') targetFolders.push(path.join(rootDir, 'public', 'assets'));
if (targetArg === 'uploads' || targetArg === 'all') targetFolders.push(path.join(rootDir, 'public', 'uploads'));

const imgExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.bmp', '.tiff', '.ico']);
const allImages = [];

function collectImages(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectImages(full);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (imgExtensions.has(ext)) {
        allImages.push(full);
      }
    }
  }
}

targetFolders.forEach(folder => collectImages(folder));
console.log(`Found ${allImages.length} image files across targeted public directories.\n`);

// 3. Classify used vs unused
const usedImages = [];
const unusedImages = [];
const dirBreakdown = {};

for (const imgPath of allImages) {
  const relToRoot = path.relative(rootDir, imgPath).replace(/\\/g, '/');
  const webPath = relToRoot.replace(/^public\//, '/'); // e.g. /assets/hero.webp
  const webPathNoSlash = webPath.slice(1);              // e.g. assets/hero.webp
  const filename = path.basename(imgPath);
  const filenameEncoded = encodeURIComponent(filename);
  const filenameNoExt = path.basename(imgPath, path.extname(imgPath));

  // A file is used if its path or filename appears in any source file
  const isUsed = allSourceText.includes(webPath) ||
                 allSourceText.includes(webPathNoSlash) ||
                 allSourceText.includes(filename) ||
                 allSourceText.includes(filenameEncoded) ||
                 (filenameNoExt.length > 5 && allSourceText.includes(filenameNoExt));

  const stats = fs.statSync(imgPath);
  const fileInfo = {
    fullPath: imgPath,
    relPath: relToRoot,
    filename,
    size: stats.size,
  };

  const folderName = path.dirname(relToRoot);
  if (!dirBreakdown[folderName]) {
    dirBreakdown[folderName] = { total: 0, used: 0, unused: 0, unusedBytes: 0 };
  }
  dirBreakdown[folderName].total++;

  if (isUsed) {
    usedImages.push(fileInfo);
    dirBreakdown[folderName].used++;
  } else {
    unusedImages.push(fileInfo);
    dirBreakdown[folderName].unused++;
    dirBreakdown[folderName].unusedBytes += stats.size;
  }
}

const totalUsedBytes = usedImages.reduce((sum, f) => sum + f.size, 0);
const totalUnusedBytes = unusedImages.reduce((sum, f) => sum + f.size, 0);

console.log('=====================================================');
console.log('                 ANALYSIS SUMMARY                    ');
console.log('=====================================================');
console.log(`Total Images Scanned:     ${allImages.length}`);
console.log(`In-Use Images:            ${usedImages.length} (${(totalUsedBytes / (1024 * 1024)).toFixed(2)} MB)`);
console.log(`Unused ("Dump") Images:   ${unusedImages.length} (${(totalUnusedBytes / (1024 * 1024)).toFixed(2)} MB)`);
console.log('-----------------------------------------------------\n');

console.log('Directory Breakdown (folders with unused files):');
Object.entries(dirBreakdown)
  .filter(([_, d]) => d.unused > 0)
  .sort((a, b) => b[1].unusedBytes - a[1].unusedBytes)
  .forEach(([dir, d]) => {
    const sizeMB = (d.unusedBytes / (1024 * 1024)).toFixed(2);
    console.log(` - ${dir}: ${d.unused} unused of ${d.total} (${sizeMB} MB)`);
  });

console.log('\nTop 20 Largest Dump Images:');
unusedImages
  .sort((a, b) => b.size - a.size)
  .slice(0, 20)
  .forEach((f, idx) => {
    const sizeMB = (f.size / (1024 * 1024)).toFixed(2);
    console.log(`  ${String(idx + 1).padStart(2)}. ${f.relPath} (${sizeMB} MB)`);
  });

// 4. Execution: Backup or Delete
if (isDelete) {
  console.log('\n=====================================================');
  console.log(isBackup ? '               PERFORMING BACKUP & DELETE            ' : '               PERFORMING DELETION                   ');
  console.log('=====================================================');

  const backupDir = path.join(rootDir, '_backup_unused_imgs');
  if (isBackup && !fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  let deletedCount = 0;
  let deletedBytes = 0;

  for (const file of unusedImages) {
    try {
      if (isBackup) {
        const dest = path.join(backupDir, file.relPath);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(file.fullPath, dest);
      }
      fs.unlinkSync(file.fullPath);
      deletedCount++;
      deletedBytes += file.size;
    } catch (err) {
      console.error(`Failed to remove ${file.relPath}:`, err.message);
    }
  }

  // 5. Clean up any empty subdirectories in targeted folders
  function removeEmptyDirs(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const sub = path.join(dir, entry.name);
        removeEmptyDirs(sub);
        try {
          if (fs.readdirSync(sub).length === 0) {
            fs.rmdirSync(sub);
            console.log(`Removed empty directory: ${path.relative(rootDir, sub)}`);
          }
        } catch {
          // ignore if locked
        }
      }
    }
  }

  targetFolders.forEach(f => removeEmptyDirs(f));

  console.log(`\nSuccessfully removed ${deletedCount} unused images.`);
  console.log(`Reclaimed disk space: ${(deletedBytes / (1024 * 1024)).toFixed(2)} MB`);
  if (isBackup) {
    console.log(`Backup saved to: ${path.relative(rootDir, backupDir)}`);
  }
} else {
  console.log('\n=====================================================');
  console.log('To remove these unused images, run:');
  console.log('  node scripts/clean_unused_images.mjs --delete');
  console.log('\nTo safely back them up first before deletion, run:');
  console.log('  node scripts/clean_unused_images.mjs --delete --backup');
  console.log('=====================================================');
}

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/sustainability_live.html', 'utf8');

// 1. Extract Carousels
const carousels = [];
const carouselMatches = html.split('elementor-widget-image-carousel');

for (let i = 1; i < carouselMatches.length; i++) {
  const block = carouselMatches[i];
  const settingsMatch = block.match(/data-settings="([^"]+)"/);
  let settings = {};
  if (settingsMatch) {
    try {
      settings = JSON.parse(settingsMatch[1].replace(/&quot;/g, '"'));
    } catch(e) {}
  }

  // Find images
  const imgs = [];
  const imgTagRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  let m;
  const chunk = block.slice(0, 15000); // carousel content chunk
  while ((m = imgTagRegex.exec(chunk)) !== null) {
    const src = m[1];
    const altMatch = m[0].match(/alt=["']([^"']*)["']/);
    const alt = altMatch ? altMatch[1] : '';
    if (!imgs.some(x => x.src === src)) {
      imgs.push({ src, alt });
    }
  }
  carousels.push({ settings, imgs });
}

console.log('Total carousels found:', carousels.length);
carousels.forEach((c, idx) => {
  console.log(`\n=== CAROUSEL ${idx + 1} (Images: ${c.imgs.length}) ===`);
  console.log('Settings:', c.settings);
  c.imgs.forEach((img, i) => console.log(`  ${i + 1}. [${img.alt}] ${img.src}`));
});

// 2. Extract Sustainability Goals and Targets section styling and icons
const goalsIdx = html.indexOf('Sustainability Goals and Targets');
if (goalsIdx !== -1) {
  const goalsHtml = html.slice(goalsIdx, goalsIdx + 12000);
  fs.writeFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/goals_section.html', goalsHtml);
  console.log('\nWrote goals_section.html');
}

// 3. Extract Progressing with Purpose section
const kpiIdx = html.indexOf('Progressing with Purpose');
if (kpiIdx !== -1) {
  const kpiHtml = html.slice(kpiIdx, kpiIdx + 15000);
  fs.writeFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/kpi_section.html', kpiHtml);
  console.log('Wrote kpi_section.html');
}

const fs = require('fs');

const section = fs.readFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/kpi_full_section.html', 'utf8');

const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
const counterRegex = /<div class="elementor-counter">([\s\S]*?)<\/div>\s*<\/div>/g;

const imgs = [];
let im;
while ((im = imgRegex.exec(section)) !== null) {
  imgs.push(im[1]);
}

const counters = [];
let cm;
while ((cm = counterRegex.exec(section)) !== null) {
  const cHtml = cm[1];
  const titleMatch = cHtml.match(/<div class="elementor-counter-title">([\s\S]*?)<\/div>/);
  const numMatch = cHtml.match(/data-to-value="([^"]*)"/) || cHtml.match(/<span class="elementor-counter-number"[^>]*>([\s\S]*?)<\/span>/);
  const prefixMatch = cHtml.match(/<span class="elementor-counter-number-prefix">([\s\S]*?)<\/span>/);
  const suffixMatch = cHtml.match(/<span class="elementor-counter-number-suffix">([\s\S]*?)<\/span>/);
  
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const num = numMatch ? numMatch[1].trim() : '';
  const prefix = prefixMatch ? prefixMatch[1].trim() : '';
  const suffix = suffixMatch ? suffixMatch[1].trim() : '';

  counters.push({
    title,
    number: `${prefix}${num}${suffix}`
  });
}

const paired = counters.map((c, i) => ({
  iconUrl: imgs[i] || '',
  number: c.number,
  title: c.title
}));

console.log(JSON.stringify(paired, null, 2));
fs.writeFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/extracted_kpis.json', JSON.stringify(paired, null, 2));

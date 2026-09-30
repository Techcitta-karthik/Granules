// normalize_dates.cjs - Normalize all date formats in mediaData.json
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/mediaData.json', 'utf8'));

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const URL_MONTHS = {
  '01': 'January', '02': 'February', '03': 'March', '04': 'April',
  '05': 'May', '06': 'June', '07': 'July', '08': 'August',
  '09': 'September', '10': 'October', '11': 'November', '12': 'December'
};

function normalizeDate(dateStr) {
  if (!dateStr) return null;
  
  // Already just a year like "2026" - fallback to URL
  if (/^\d{4}$/.test(dateStr.trim())) return null;
  
  // "July 21, 2026" format - already good
  const m1 = dateStr.match(/^(\w+)\s+(\d{1,2}),?\s*(\d{4})$/);
  if (m1) {
    return `${m1[1]} ${parseInt(m1[2])}, ${m1[3]}`;
  }
  
  // "4 December 2024" format - convert to "December 4, 2024"
  const m2 = dateStr.match(/^(\d{1,2})\s+(\w+),?\s*(\d{4})$/);
  if (m2) {
    return `${m2[2]} ${parseInt(m2[1])}, ${m2[3]}`;
  }
  
  // "January 2026" format (month + year only) - keep as is
  const m3 = dateStr.match(/^(\w+)\s+(\d{4})$/);
  if (m3) {
    return dateStr;
  }
  
  return dateStr;
}

let normalized = 0;
let remaining = 0;
const noDateEntries = [];

for (const [year, releases] of Object.entries(data.pressReleases)) {
  for (const pr of releases) {
    const norm = normalizeDate(pr.year);
    if (norm) {
      pr.year = norm;
      normalized++;
    } else {
      // Fallback: extract from URL
      const match = pr.pdf ? pr.pdf.match(/\/pdfs\/(\d{4})\/(\d{2})\//) : null;
      if (match) {
        pr.year = `${URL_MONTHS[match[2]]} ${match[1]}`;
        remaining++;
      } else {
        noDateEntries.push(pr.id);
      }
    }
  }
}

console.log(`Normalized: ${normalized}`);
console.log(`Fallback to URL month: ${remaining}`);
console.log(`Still no date: ${noDateEntries.length}`);
if (noDateEntries.length > 0) {
  console.log('No date entries:', noDateEntries);
}

// Show some examples
console.log('\nSamples:');
for (const year of ['2026', '2025', '2024', '2023', '2020', '2015', '2010']) {
  if (data.pressReleases[year]) {
    console.log(`\n${year}:`);
    data.pressReleases[year].slice(0, 3).forEach(pr => {
      console.log(`  ${pr.id}: "${pr.year}"`);
    });
  }
}

fs.writeFileSync('src/data/mediaData.json', JSON.stringify(data, null, 2) + '\n');
console.log('\nSaved normalized mediaData.json');

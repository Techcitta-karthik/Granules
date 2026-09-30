// update_dates.cjs - Extract month/year from PDF URL paths and update mediaData.json
const fs = require('fs');

const MONTHS = {
  '01': 'January', '02': 'February', '03': 'March', '04': 'April',
  '05': 'May', '06': 'June', '07': 'July', '08': 'August',
  '09': 'September', '10': 'October', '11': 'November', '12': 'December'
};

const data = JSON.parse(fs.readFileSync('src/data/mediaData.json', 'utf8'));

let updated = 0;
let noDate = 0;

for (const [year, releases] of Object.entries(data.pressReleases)) {
  for (const pr of releases) {
    if (pr.pdf) {
      // Extract month from URL path: /pdfs/YYYY/MM/
      const match = pr.pdf.match(/\/pdfs\/(\d{4})\/(\d{2})\//);
      if (match) {
        const urlYear = match[1];
        const urlMonth = match[2];
        const monthName = MONTHS[urlMonth];
        if (monthName) {
          // Replace year with "Month YYYY" format, e.g. "July 2026"
          pr.year = `${monthName} ${urlYear}`;
          updated++;
        } else {
          noDate++;
        }
      } else {
        noDate++;
        console.log(`No date in URL: ${pr.id} - ${pr.pdf}`);
      }
    } else {
      noDate++;
      console.log(`No PDF: ${pr.id}`);
    }
  }
}

console.log(`\nUpdated ${updated} entries`);
console.log(`Could not extract date from ${noDate} entries`);

// Show some samples
console.log('\nSamples:');
for (const year of ['2026', '2025', '2024']) {
  if (data.pressReleases[year]) {
    console.log(`\n${year}:`);
    data.pressReleases[year].slice(0, 3).forEach(pr => {
      console.log(`  ${pr.id}: year="${pr.year}"`);
    });
  }
}

// Write updated data
fs.writeFileSync('src/data/mediaData.json', JSON.stringify(data, null, 2) + '\n');
console.log('\nSaved updated mediaData.json');

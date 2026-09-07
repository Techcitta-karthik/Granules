const fs = require('fs');

const html = fs.readFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/sustainability_live.html', 'utf8');

const start = html.indexOf('Progressing with Purpose');
console.log('Progressing with Purpose at:', start);

// Let's find where the next heading or section is
const nextIdx = html.indexOf('elementor-widget-heading', start + 200);
const end = html.indexOf('Commitments', start);
console.log('End at Commitments:', end);

const section = html.slice(start - 500, end !== -1 ? end : start + 30000);
fs.writeFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/kpi_full_section.html', section);
console.log('Saved kpi_full_section.html, length:', section.length);

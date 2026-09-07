const fs = require('fs');

const css = fs.readFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/post-9.css', 'utf8');

// Find all linear-gradients in post-9.css
const gradients = css.match(/background(?:-image)?:\s*linear-gradient\([^;]+\)/g) || [];
console.log('--- Unique linear-gradients in post-9.css ---');
Array.from(new Set(gradients)).forEach(g => console.log(g));

// Search for fcabea6 or 8904d3a (the container for Sustainability Goals)
const goalsRules = css.match(/\.elementor-element-(?:fcabea6|8904d3a)[^{]*\{[^}]+\}/g) || [];
console.log('\n--- Goals container rules ---');
goalsRules.forEach(r => console.log(r));

// Search for Progressing with purpose rules
const kpiRules = css.match(/\.elementor-element-001f62a[^{]*\{[^}]+\}/g) || [];
console.log('\n--- KPI container rules ---');
kpiRules.forEach(r => console.log(r));

// Look for hatched divider lines (the diagonal stripes for Commitments, Ratings & Certifications)
const dividerRules = css.match(/\.elementor-divider[^{]*\{[^}]+\}/g) || [];
console.log('\n--- Divider rules ---');
dividerRules.slice(0, 5).forEach(r => console.log(r));

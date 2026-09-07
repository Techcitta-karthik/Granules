const fs = require('fs');
const html = fs.readFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/sustainability_live.html', 'utf8');
const links = html.match(/https:\/\/[^"'\s>]+\.css/g) || [];
const unique = Array.from(new Set(links)).filter(l => l.includes('elementor') || l.includes('post-') || l.includes('upload'));
console.log('Post CSS files:');
unique.forEach(l => console.log(l));

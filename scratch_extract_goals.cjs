const fs = require('fs');

const section = fs.readFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/goals_full_section.html', 'utf8');

const cardBlocks = section.split('elementor-widget-icon-box');

console.log('Total card blocks:', cardBlocks.length - 1);

const fullCards = [];

for (let i = 1; i < cardBlocks.length; i++) {
  const block = cardBlocks[i];
  
  const titleMatch = block.match(/<h[2-6][^>]*class="[^"]*elementor-icon-box-title[^"]*"[^>]*>([\s\S]*?)<\/h[2-6]>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  
  const descMatch = block.match(/<p[^>]*class="[^"]*elementor-icon-box-description[^"]*"[^>]*>([\s\S]*?)<\/p>/);
  const desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim() : '';
  
  const svgMatch = block.match(/<svg[\s\S]*?<\/svg>/);
  const svg = svgMatch ? svgMatch[0] : '';
  
  fullCards.push({ title, desc, svg });
}

console.log('Extracted cards:');
fullCards.forEach((c, idx) => {
  console.log(`${idx + 1}. [${c.title}] => ${c.desc.slice(0, 60)}... (SVG length: ${c.svg.length})`);
});

fs.writeFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/extracted_goals_cards.json', JSON.stringify(fullCards, null, 2));
console.log('Saved extracted_goals_cards.json successfully.');

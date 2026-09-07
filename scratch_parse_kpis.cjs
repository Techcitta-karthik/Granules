const fs = require('fs');

const section = fs.readFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/kpi_full_section.html', 'utf8');

// Look for counter widgets or icon boxes
const widgets = section.split('elementor-widget-');

console.log('Widgets count:', widgets.length);

const kpis = [];

// Let's inspect each widget
for (let i = 1; i < widgets.length; i++) {
  const w = widgets[i];
  const type = w.split(' ')[0].split('"')[0];
  
  // Look for number and title
  const numberMatch = w.match(/<span[^>]*class="[^"]*elementor-counter-number[^"]*"[^>]*data-to-value="([^"]*)"[^>]*>([\s\S]*?)<\/span>/) ||
                      w.match(/<div[^>]*class="[^"]*elementor-counter-number[^"]*"[^>]*>([\s\S]*?)<\/div>/) ||
                      w.match(/class="[^"]*number[^"]*"[^>]*>([\s\S]*?)<\//);
  
  const titleMatch = w.match(/<div[^>]*class="[^"]*elementor-counter-title[^"]*"[^>]*>([\s\S]*?)<\/div>/) ||
                     w.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/);

  const imgMatch = w.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/);
  const svgMatch = w.match(/<svg[\s\S]*?<\/svg>/);

  kpis.push({
    type,
    snippet: w.slice(0, 300).replace(/\n/g, ' ')
  });
}

// Let's write a cleaner extractor by analyzing the exact containers in kpi_full_section.html
fs.writeFileSync('C:/Users/ADMIN/.gemini/antigravity-ide/brain/1c0b60c1-25f0-4f9d-87e9-3c8df21ac538/scratch/kpi_widgets.json', JSON.stringify(kpis.slice(0, 30), null, 2));
console.log('Wrote kpi_widgets.json');

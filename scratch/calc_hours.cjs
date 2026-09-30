const { execSync } = require('child_process');

const log = execSync('git log --pretty=format:"%h|%an|%ad|%s" --date=iso').toString().trim().split('\n');

const days = {};
log.forEach(line => {
  const parts = line.split('|');
  if (parts.length < 3) return;
  const [hash, author, dateStr, ...rest] = parts;
  const d = new Date(dateStr);
  const day = dateStr.slice(0, 10);
  if (!days[day]) days[day] = [];
  days[day].push({ hash, author, date: d, time: dateStr.slice(11, 19) });
});

console.log('Total commits:', log.length);
console.log('');

let totalSessionHours = 0;
let totalEffectiveHours = 0;

for (const day of Object.keys(days).sort()) {
  const commits = days[day].sort((a,b) => a.date - b.date);
  const start = commits[0].date;
  const end = commits[commits.length - 1].date;
  const spanMs = end - start;
  const spanHrs = spanMs / (1000 * 60 * 60);

  // Calculate clustered active working hours (if gap > 2 hours, consider it a break)
  let activeHours = 0;
  let clusterStart = commits[0].date;
  let lastCommit = commits[0].date;

  for (let i = 1; i < commits.length; i++) {
    const cur = commits[i].date;
    const gapHrs = (cur - lastCommit) / (1000 * 60 * 60);
    if (gapHrs > 2) {
      // End previous cluster (give 30 min buffer after last commit)
      activeHours += ((lastCommit - clusterStart) / (1000 * 60 * 60)) + 0.5;
      clusterStart = cur;
    }
    lastCommit = cur;
  }
  // Add last cluster
  activeHours += ((lastCommit - clusterStart) / (1000 * 60 * 60)) + 0.5;
  activeHours = Math.max(1, Math.round(activeHours * 10) / 10);

  const spanHrsRounded = Math.round(spanHrs * 10) / 10;
  totalSessionHours += spanHrsRounded;
  totalEffectiveHours += activeHours;

  const authors = [...new Set(commits.map(c => c.author))].join(', ');
  console.log(`${day}: ${commits.length} commits | ${commits[0].time} to ${commits[commits.length - 1].time} | Span: ${spanHrsRounded}h | Est. Active: ${activeHours}h | Authors: ${authors}`);
}

console.log('');
console.log('Total Days with Commits:', Object.keys(days).length);
console.log('Total Span Hours (Start to End each day):', Math.round(totalSessionHours * 10) / 10, 'hours');
console.log('Total Estimated Active Coding Hours:', Math.round(totalEffectiveHours * 10) / 10, 'hours');

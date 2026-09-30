const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Get all unique commits across ALL branches with branch decorations
const rawLog = execSync('git log --all --pretty=format:"%H|%h|%an|%ae|%ad|%D|%s" --date=iso-strict').toString().trim().split('\n');

const commitsMap = new Map();

rawLog.forEach(line => {
  const parts = line.split('|');
  if (parts.length < 7) return;
  const [hash, shortHash, author, email, dateStr, refNames, ...msgParts] = parts;
  const message = msgParts.join('|');
  
  if (!commitsMap.has(hash)) {
    commitsMap.set(hash, {
      hash,
      shortHash,
      author: author.trim(),
      email: email.trim(),
      dateStr,
      date: new Date(dateStr),
      day: dateStr.slice(0, 10),
      time: dateStr.slice(11, 19),
      refNames: refNames.trim(),
      message: message.trim()
    });
  }
});

// Chronological sort: earliest commit first
const allCommits = Array.from(commitsMap.values()).sort((a, b) => a.date - b.date);

const repoInceptionCommit = allCommits[0];
const latestCommit = allCommits[allCommits.length - 1];

// Stats by author
const authorStats = {};
const dayAuthorMap = {};

allCommits.forEach(c => {
  const author = c.author;
  if (!authorStats[author]) {
    authorStats[author] = {
      name: author,
      email: c.email,
      totalCommits: 0,
      daysWorked: new Set(),
      firstCommit: c.date,
      lastCommit: c.date,
      totalSpanHours: 0,
      totalActiveHours: 0
    };
  }
  authorStats[author].totalCommits++;
  authorStats[author].daysWorked.add(c.day);
  if (c.date < authorStats[author].firstCommit) authorStats[author].firstCommit = c.date;
  if (c.date > authorStats[author].lastCommit) authorStats[author].lastCommit = c.date;

  const key = `${c.day}___${author}`;
  if (!dayAuthorMap[key]) {
    dayAuthorMap[key] = {
      day: c.day,
      author,
      email: c.email,
      commits: []
    };
  }
  dayAuthorMap[key].commits.push(c);
});

// Process chronological daily logs
const dailyBreakdown = [];

// Sort dayAuthorMap by date first, then by author name
const sortedDayKeys = Object.keys(dayAuthorMap).sort((a, b) => {
  const dayA = a.split('___')[0];
  const dayB = b.split('___')[0];
  if (dayA !== dayB) return dayA.localeCompare(dayB);
  return a.localeCompare(b);
});

sortedDayKeys.forEach(key => {
  const item = dayAuthorMap[key];
  const sortedCommits = item.commits.sort((a, b) => a.date - b.date);
  const first = sortedCommits[0];
  const last = sortedCommits[sortedCommits.length - 1];

  const firstTime = first.time;
  const lastTime = last.time;

  const spanMs = last.date - first.date;
  const spanHours = Math.round((spanMs / (1000 * 60 * 60)) * 10) / 10;

  let activeMs = 0;
  let clusterStart = sortedCommits[0].date;
  let lastCommitDate = sortedCommits[0].date;

  for (let i = 1; i < sortedCommits.length; i++) {
    const cur = sortedCommits[i].date;
    const diffHours = (cur - lastCommitDate) / (1000 * 60 * 60);
    if (diffHours > 2.0) {
      activeMs += (lastCommitDate - clusterStart) + (45 * 60 * 1000);
      clusterStart = cur;
    }
    lastCommitDate = cur;
  }
  activeMs += (lastCommitDate - clusterStart) + (45 * 60 * 1000);
  let activeHours = Math.round((activeMs / (1000 * 60 * 60)) * 10) / 10;
  if (activeHours < 1.0) activeHours = 1.0;

  authorStats[item.author].totalSpanHours += Math.max(spanHours, 0.5);
  authorStats[item.author].totalActiveHours += activeHours;

  const branches = [...new Set(sortedCommits.map(c => c.refNames).filter(Boolean))].join('; ');
  const commitHashes = sortedCommits.map(c => c.shortHash).join(' ');

  dailyBreakdown.push({
    date: item.day,
    author: item.author,
    email: item.email,
    commitsCount: sortedCommits.length,
    firstCommitTime: firstTime,
    lastCommitTime: lastTime,
    spanHours: spanHours.toFixed(1),
    activeHours: activeHours.toFixed(1),
    branchesWorked: branches || 'chatbot / feature branch',
    commitHashes,
    sampleMessages: sortedCommits.map(c => c.message.replace(/[\r\n",]/g, ' ')).slice(0, 3).join(' | ')
  });
});

// CSV Generation
let csvContent = '\uFEFF'; // UTF-8 BOM for Excel

csvContent += '=========================================================================================================\n';
csvContent += 'GRANULES INDIA WEBSITE - COMPLETE PROJECT WORK & HOURS AUDIT REPORT (FROM INCEPTION TO DATE)\n';
csvContent += '=========================================================================================================\n';
csvContent += `PROJECT REPO CREATION DATE : ${repoInceptionCommit.day} at ${repoInceptionCommit.time} IST\n`;
csvContent += `INITIAL ROOT COMMIT        : ${repoInceptionCommit.shortHash} by "${repoInceptionCommit.author}" ("${repoInceptionCommit.message}")\n`;
csvContent += `LATEST COMMIT              : ${latestCommit.shortHash} on ${latestCommit.day} at ${latestCommit.time} IST\n`;
csvContent += `TOTAL CALENDAR DURATION    : 36 Days (${repoInceptionCommit.day} to ${latestCommit.day})\n`;
csvContent += `TOTAL COMMITS ANALYZED     : ${allCommits.length} commits across all branches\n`;
csvContent += '=========================================================================================================\n\n';

// 1. Team Summary
csvContent += '--- 1. TEAM SUMMARY: TOTAL HOURS & COMMITS BY PERSON ---\n';
csvContent += 'Person,Email,Total Commits,Active Days Worked,First Commit Date,Last Commit Date,Estimated Active Hours,Total Daily Span (Hrs)\n';

Object.values(authorStats).forEach(s => {
  csvContent += `"${s.name}","${s.email}",${s.totalCommits},${s.daysWorked.size},"${s.firstCommit.toISOString().slice(0, 10)}","${s.lastCommit.toISOString().slice(0, 10)}",${s.totalActiveHours.toFixed(1)},${s.totalSpanHours.toFixed(1)}\n`;
});

const grandTotalCommits = allCommits.length;
const grandActiveHours = Object.values(authorStats).reduce((acc, s) => acc + s.totalActiveHours, 0);
const grandSpanHours = Object.values(authorStats).reduce((acc, s) => acc + s.totalSpanHours, 0);

csvContent += `"PROJECT GRAND TOTAL","",${grandTotalCommits},36 Cumulative Days,"${repoInceptionCommit.day}","${latestCommit.day}",${grandActiveHours.toFixed(1)},${grandSpanHours.toFixed(1)}\n\n`;

// 2. Chronological Daily Breakdown (Day 1 Aug 26 -> Day 36 Sep 30)
csvContent += '--- 2. CHRONOLOGICAL DAILY TIMINGS LOG (STARTING FROM REPO CREATION: AUG 26, 2026) ---\n';
csvContent += 'Date,Person,Email,Commits Count,First Commit Time (IST),Last Commit Time (IST),Active Work Hours,Daily Span (Hrs),Branches / References,Commit Hashes,Sample Tasks / Commit Messages\n';

dailyBreakdown.forEach(row => {
  csvContent += `"${row.date}","${row.author}","${row.email}",${row.commitsCount},"${row.firstCommitTime}","${row.lastCommitTime}",${row.activeHours},${row.spanHours},"${row.branchesWorked}","${row.commitHashes}","${row.sampleMessages}"\n`;
});

// 3. Chronological Commit Log (1 to 244)
csvContent += '\n--- 3. COMPLETE COMMIT-BY-COMMIT AUDIT LOG (CHRONOLOGICAL: 1 TO 244) ---\n';
csvContent += 'Commit #,Commit Hash,Date,Time (IST),Author,Email,Branch / Tags,Commit Message\n';

allCommits.forEach((c, idx) => {
  const cleanMsg = c.message.replace(/[\r\n",]/g, ' ');
  csvContent += `${idx + 1},"${c.shortHash}","${c.day}","${c.time}","${c.author}","${c.email}","${c.refNames.replace(/"/g, '""')}","${cleanMsg}"\n`;
});

const primaryCsvPath = path.resolve('c:/Users/ADMIN/Desktop/granules-india-website/granules_project_work_hours.csv');
const timelineCsvPath = path.resolve('c:/Users/ADMIN/Desktop/granules-india-website/granules_project_work_hours_full_timeline.csv');

fs.writeFileSync(timelineCsvPath, csvContent, 'utf8');
console.log(`\nGenerated primary timeline CSV report at: ${timelineCsvPath}`);

try {
  fs.writeFileSync(primaryCsvPath, csvContent, 'utf8');
  console.log(`Also updated original CSV at: ${primaryCsvPath}`);
} catch (e) {
  console.log(`Note: Original CSV was locked by another process (e.g. Excel). Saved to ${timelineCsvPath}`);
}
console.log(`First commit: ${repoInceptionCommit.day} ${repoInceptionCommit.time} by ${repoInceptionCommit.author}`);
console.log(`Total rows in daily log: ${dailyBreakdown.length}`);

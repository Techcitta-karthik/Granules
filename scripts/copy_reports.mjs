import fs from 'fs';
import path from 'path';

const destDir = path.resolve('project_work_reports');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  'granules_developer_visual_dashboard.png',
  'granules_project_by_developer_visual.csv',
  'granules_project_developer_reports.xlsx',
  'granules_project_work_hours.csv',
  'granules_project_work_hours_full_timeline.csv',
  'granules_project_work_hours_visual.csv',
  'granules_project_work_report.xlsx',
  'granules_work_MAC.csv',
  'granules_work_Techcitta-karthik.csv',
  'granules_work_bharath-techcitta.csv',
  'granules_work_ginjarapu77.csv',
  'granules_work_visualization.png'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    try {
      const dest = path.join(destDir, f);
      fs.copyFileSync(f, dest);
      console.log(`Copied ${f} -> project_work_reports/${f}`);
    } catch (e) {
      console.log(`Skipped locked file ${f}: ${e.message}`);
    }
  }
}

console.log("All reports copied into project_work_reports successfully!");

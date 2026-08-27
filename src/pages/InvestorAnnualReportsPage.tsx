import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './investor.css';

const A = '/assets/investor/';

const REPORTS = [
  { year: 'FY24-25', visit: false },
  { year: 'FY23-24', visit: true },
  { year: 'FY22-23', visit: true },
  { year: 'FY21-22', visit: false },
  { year: 'FY20-21', visit: false },
  { year: 'FY19-20', visit: false },
  { year: 'FY18-19', visit: false },
  { year: 'FY17-18', visit: false },
  { year: 'FY16-17', visit: false },
  { year: 'FY15-16', visit: false },
  { year: 'FY14-15', visit: false },
  { year: 'FY13-14', visit: false },
  { year: 'FY12-13', visit: false },
  { year: 'FY11-12', visit: false },
  { year: 'FY10-11', visit: false },
  { year: 'FY09-10', visit: false },
  { year: 'FY08-09', visit: false },
  { year: 'FY07-08', visit: false },
  { year: 'FY06-07', visit: false },
];

export default function InvestorAnnualReportsPage() {
  useEffect(() => {
    document.title = 'Annual Reports — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <Link to="/investor">Investor</Link>
        <span className="sep">{'>'}</span>
        <span>Financial Reports &amp; Performance</span>
        <span className="sep">{'>'}</span>
        <span className="current">Annual Reports</span>
      </p>

      <div className="inv-detail-head">
        <h1>Annual Reports</h1>
        <a className="inv-detail-download" href="/#footer">Download</a>
      </div>

      <div className="inv-detail-list">
        {REPORTS.map((report) => (
          <div className="inv-detail-row" key={report.year}>
            <p>Annual Report - {report.year}</p>
            <div className="inv-detail-actions">
              <a className="inv-detail-pill" href="/#footer">
                PDF
                <img src={`${A}pdf-icon.svg`} alt="" />
              </a>
              {report.visit && (
                <a className="inv-detail-pill" href="/#footer">
                  VISIT
                  <img src={`${A}arrow-diag.svg`} alt="" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="inv-detail-back-wrap">
        <Link className="inv-detail-back" to="/investor">Back</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

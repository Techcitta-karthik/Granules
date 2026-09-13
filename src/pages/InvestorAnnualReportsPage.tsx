import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter, CareerSection } from '../components/company';
import '../components/company/company.css';
import './investor.css';

const REPORTS = [
  { year: 'FY25-26', pdf: '/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf', visit: false },
  { year: 'FY24-25', pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf', visit: false },
  { year: 'FY23-24', pdf: '/documents/GranulesIndia-limited-AR-2023-24-18f7c7ff8700.pdf', visit: true },
  { year: 'FY22-23', pdf: '/documents/Granules-AR-2022-23-532f737451a2.pdf', visit: true },
  { year: 'FY21-22', pdf: '/documents/Annual-Report-2021-22-ce6deff6f867.pdf', visit: false },
  { year: 'FY20-21', pdf: '/documents/Annual-Report-2020-21-7948a9c23581.pdf', visit: false },
  { year: 'FY19-20', pdf: '/documents/Annual-Report-2019-20-2e269e7676d8.pdf', visit: false },
  { year: 'FY18-19', pdf: '/documents/3127Annual-Report---FY18-19-c9cc39471683.pdf', visit: false },
  { year: 'FY17-18', pdf: '/documents/8058Annual-Report---FY17-18-0e6badda55f0.pdf', visit: false },
  { year: 'FY16-17', pdf: '/documents/2198AR2016-17-1ab38b383c01.pdf', visit: false },
  { year: 'FY15-16', pdf: '/documents/2668Annual-Report-2015-2016-053d09b9dde9.pdf', visit: false },
  { year: 'FY14-15', pdf: '/documents/2427Annual-Report---FY14-15-9d8526bf403c.pdf', visit: false },
  { year: 'FY13-14', pdf: '/documents/2027Annual-Report---FY13-14-6e22e01460e9.pdf', visit: false },
  { year: 'FY12-13', pdf: '/documents/8742Annual-Report---FY12-13-5012f3f34ee5.pdf', visit: false },
  { year: 'FY11-12', pdf: '/documents/6127Annual-Report---FY11-12-b035b60a4347.pdf', visit: false },
  { year: 'FY10-11', pdf: '/documents/3268Annual-Report---FY10-11-0dd6a2bd1a12.pdf', visit: false },
  { year: 'FY09-10', pdf: '/documents/6181Annual-Report---FY09-10-7d097d5806ea.pdf', visit: false },
  { year: 'FY08-09', pdf: '/documents/6994Annual-Report---FY08-09-188f254a3537.pdf', visit: false },
  { year: 'FY07-08', pdf: '/documents/2157Annual-Report---FY07-08-b0699957797f.pdf', visit: false },
  { year: 'FY06-07', pdf: '/documents/6249Annual-Report---FY06-07-480c9456423e.pdf', visit: false },
];

export default function InvestorAnnualReportsPage() {
  useEffect(() => {
    document.title = 'Annual Reports — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', maxWidth: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <a href="/">HOME</a>
        <span className="sep">›</span>
        <a href="/investors">INVESTOR</a>
        <span className="sep">›</span>
        <a href="/investors">FINANCIAL REPORTS &amp; PERFORMANCE</a>
        <span className="sep">›</span>
        <span className="current">ANNUAL REPORTS</span>
      </p>

      <div className="inv-detail-head">
        <h1>Annual Reports</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            className="inv-action-link"
            href="/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="View Latest Annual Report in new tab"
          >
            VIEW LATEST
          </a>
          <span className="inv-action-slash">/</span>
          <a
            className="inv-action-link"
            href="/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf"
            download="Granules_Annual-Report-FY26.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Latest Annual Report"
          >
            DOWNLOAD LATEST
          </a>
        </div>
      </div>

      <div className="inv-detail-list">
        {REPORTS.map((report) => (
          <div className="inv-detail-row" key={report.year}>
            <p>Annual Report - {report.year}</p>
            <div className="inv-detail-actions" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <a
                className="inv-action-link"
                href={report.pdf}
                target="_blank"
                rel="noopener noreferrer"
                title={`View Annual Report ${report.year} in new tab`}
              >
                VIEW
              </a>
              <span className="inv-action-slash">/</span>
              <a
                className="inv-action-link"
                href={report.pdf}
                download={`Annual-Report-${report.year}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Download Annual Report ${report.year}`}
              >
                DOWNLOAD
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="inv-detail-back-wrap">
        <Link className="inv-detail-back" to="/investor">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>BACK TO INVESTOR</span>
        </Link>
      </div>

      <CareerSection />

      <CompanyFooter />
    </div>
  );
}

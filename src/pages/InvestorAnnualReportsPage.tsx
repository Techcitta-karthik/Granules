import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter, CareerSection } from '../components/company';
import { getAssetUrl } from '../lib/pdf';
import '../components/company/company.css';
import './investor.css';

const REPORTS = [
  { year: 'FY25-26', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2026/07/Granules_Annual-Report-FY26.pdf', visit: false },
  { year: 'FY24-25', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/07/Granules_Integrated-Report-2024-25.pdf', visit: false },
  { year: 'FY23-24', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2024/07/GranulesIndia-limited-AR-2023-24.pdf', visit: true },
  { year: 'FY22-23', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/Granules-AR-2022-23.pdf', visit: true },
  { year: 'FY21-22', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2022/09/Annual-Report-2021-22.pdf', visit: false },
  { year: 'FY20-21', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2022/09/Annual-Report-2020-21.pdf', visit: false },
  { year: 'FY19-20', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2022/09/Annual-Report-2019-20.pdf', visit: false },
  { year: 'FY18-19', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/3127Annual Report - FY18-19.pdf', visit: false },
  { year: 'FY17-18', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/8058Annual Report - FY17-18.pdf', visit: false },
  { year: 'FY16-17', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2198AR2016-17.pdf', visit: false },
  { year: 'FY15-16', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2668Annual Report 2015-2016.pdf', visit: false },
  { year: 'FY14-15', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2427Annual Report - FY14-15.pdf', visit: false },
  { year: 'FY13-14', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2027Annual Report - FY13-14.pdf', visit: false },
  { year: 'FY12-13', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/8742Annual Report - FY12-13.pdf', visit: false },
  { year: 'FY11-12', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/6127Annual Report - FY11-12.pdf', visit: false },
  { year: 'FY10-11', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/3268Annual Report - FY10-11.pdf', visit: false },
  { year: 'FY09-10', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/6181Annual Report - FY09-10.pdf', visit: false },
  { year: 'FY08-09', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/6994Annual Report - FY08-09.pdf', visit: false },
  { year: 'FY07-08', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2157Annual Report - FY07-08.pdf', visit: false },
  { year: 'FY06-07', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/6249Annual Report - FY06-07.pdf', visit: false },
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
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/investor">INVESTOR</Link>
        <span className="sep">›</span>
        <Link to="/investor">FINANCIAL REPORTS &amp; PERFORMANCE</Link>
        <span className="sep">›</span>
        <span className="current">ANNUAL REPORTS</span>
      </p>

      <div className="inv-detail-head">
        <h1>Annual Reports</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            className="inv-action-link"
            href={getAssetUrl('pdfs/2026/07/Granules_Annual-Report-FY26.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            title="View Latest Annual Report in new tab"
          >
            VIEW LATEST
          </a>
          <span className="inv-action-slash">/</span>
          <a
            className="inv-action-link"
            href={getAssetUrl('pdfs/2026/07/Granules_Annual-Report-FY26.pdf')}
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
                href={getAssetUrl(report.pdf)}
                target="_blank"
                rel="noopener noreferrer"
                title={`View Annual Report ${report.year} in new tab`}
              >
                VIEW
              </a>
              <span className="inv-action-slash">/</span>
              <a
                className="inv-action-link"
                href={getAssetUrl(report.pdf)}
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

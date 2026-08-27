import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './investor.css';

const A = '/assets/investor/';

const DATA_TABS = ['Financial Reports', 'Investor resources', 'Financial highlights', 'Notices & Disclosures', 'other info'];

const DATA_ROWS = [
  { label: 'Annual Reports', href: '/investor/annual-reports' },
  { label: 'Sustainability Reports' },
  { label: 'Quarterly Results' },
  { label: 'Annual Accounts of Subsidiaries & JVs' },
  { label: 'Corporate Presentation' },
];

export default function InvestorOverviewV2Page() {
  useEffect(() => {
    document.title = 'Investor Overview — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Investor</span>
      </p>
      <h1 className="cp-page-title">Investor overview</h1>

      <div className="inv-hero">
        <span className="inv-hero-badge">STOCK IMAGE</span>
      </div>

      <div className="inv-data" style={{ marginTop: 'clamp(100px, 14vw, 160px)' }}>
        <div className="inv-data-tabs">
          {DATA_TABS.map((tab, index) => (
            <span key={tab} className={`inv-data-tab${index === 0 ? ' active' : ''}`}>
              {tab}
            </span>
          ))}
        </div>
        <div className="inv-data-list">
          {DATA_ROWS.map((row) =>
            row.href ? (
              <Link className="inv-data-row" to={row.href} key={row.label}>
                <p>{row.label}</p>
                <img src={`${A}plus.svg`} alt="" />
              </Link>
            ) : (
              <div className="inv-data-row" key={row.label}>
                <p>{row.label}</p>
                <img src={`${A}plus.svg`} alt="" />
              </div>
            )
          )}
        </div>
      </div>

      <div className="inv-contact-cta">
        <div className="inv-contact-copy">
          <h2>Investor relations contacts</h2>
          <p>
            For investor-related queries, please reach out to our Investor Relations team. We are
            committed to transparent communication and timely responses.
          </p>
        </div>
        <a className="inv-contact-btn" href="/#footer">Contact</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

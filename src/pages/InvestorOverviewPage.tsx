import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import InvestorFilteredSection from '../components/investor/InvestorFilteredSection';
import { INVESTOR_SECTIONS_DATA } from '../data/investorData';
import '../components/company/company.css';
import './investor.css';

interface TableRowItem {
  title: string;
  detail: string;
  period: string;
  href?: string;
  pdf?: string;
  download?: string;
}

const JUMP_SECTIONS = [
  { id: 'sec-financial-reports', label: 'Financial Reports' },
  { id: 'sec-investor-resources', label: 'Investor Resources' },
  { id: 'sec-corporate-centre', label: 'Corporate Centre' },
  { id: 'sec-financial-highlights', label: 'Financial Highlights & Revenue Break Up' },
  { id: 'sec-notices-disclosures', label: 'Notice & Disclosures' },
  { id: 'sec-other-info', label: 'Other Information' },
  { id: 'sec-investor-contact', label: 'Investor Relations Contact' },
];

const CORPORATE_CENTRE: TableRowItem[] = [
  { title: 'Company Overview & Vision', detail: 'Four decades of pharmaceutical manufacturing scale', period: 'Corporate Hub', href: '/company' },
  { title: 'Board of Directors & Leadership', detail: 'Executive and Non-Executive Leadership Profiles', period: 'Governance', href: '/company/leadership' },
  { title: 'Growth Journey & Milestones', detail: 'Strategic scale, expansions & global footprints', period: 'Since 1984', href: '/company/milestone' },
  { title: 'Global Subsidiaries Network', detail: 'GPI (USA), GLS, Senn Tides & Granules CZRO', period: 'Worldwide Units', href: '/company/global-subsidiaries' },
  { title: 'Awards & Accolades', detail: 'Industry recognitions in quality, CSR and ESG', period: 'Annual Honors', href: '/company/awards' },
  { title: 'Operational Excellence', detail: 'Manufacturing automation, quality & safety systems', period: 'Operations', href: '/company/operational-excellence' },
];

const FINANCIAL_HIGHLIGHTS: TableRowItem[] = [
  { title: 'Annual Financial Highlights', detail: 'Revenue, EBITDA & PAT Multi-Year Growth Metrics', period: 'FY 2022-25', pdf: '/documents/Financial-Result-18.05.2022-0e55e6fbe630.pdf' },
  { title: 'Revenue Breakup Analysis', detail: 'API, PFI & Finished Dosages Segment Revenue', period: 'Annual Breakup', pdf: '/documents/3975Granules-India-s-Revenue-increases-c3fcfefdab37.pdf' },
  { title: 'Quarterly Earnings Presentation', detail: 'Operational Review & Management Commentary', period: 'Q2 FY26', pdf: '/documents/Earnings-Presentation-Q2FY26-Circulation-fb2ccd8cf24d.pdf' },
  { title: 'Quarterly Press Release', detail: 'Financial Performance Release & Results Summary', period: 'Q2 FY26', pdf: '/documents/Press-Release-Q2-FY26-07edcf6db296.pdf' },
];

export default function InvestorOverviewPage() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Investor Overview — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // Offset for fixed top navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Deep-link support for direct URLs:
  // e.g., /investors/financial-reports/annual-reports/
  //       /investors/investor-resources/investor-presentation/
  //       /investors/notice-disclosures/notice-of-board-meetings/
  //       /investors/investor-relation-contact/
  //       /investors/other-information/
  const deepParams = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('annual-reports') || path.includes('financial-reports')) {
      return { sectionId: 'sec-financial-reports', subcatId: 'annual-reports' };
    }
    if (path.includes('investor-presentation') || path.includes('investor-resources')) {
      return { sectionId: 'sec-investor-resources', subcatId: 'investor-presentation', year: '2027' };
    }
    if (path.includes('notice-of-board-meetings') || path.includes('notice-disclosures')) {
      return { sectionId: 'sec-notices-disclosures', subcatId: 'notice-board-meetings' };
    }
    if (path.includes('investor-relation-contact') || path.includes('investor-contact')) {
      return { sectionId: 'sec-investor-contact', subcatId: 'contact-desk' };
    }
    if (path.includes('other-information')) {
      return { sectionId: 'sec-other-info', subcatId: 'other-information' };
    }
    return null;
  }, [location.pathname]);

  useEffect(() => {
    if (deepParams?.sectionId) {
      const timer = setTimeout(() => {
        scrollToSection(deepParams.sectionId);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [deepParams]);

  const financialReportsCat = INVESTOR_SECTIONS_DATA.find((c) => c.id === 'sec-financial-reports')!;
  const investorResourcesCat = INVESTOR_SECTIONS_DATA.find((c) => c.id === 'sec-investor-resources')!;
  const noticesDisclosuresCat = INVESTOR_SECTIONS_DATA.find((c) => c.id === 'sec-notices-disclosures')!;
  const investorContactCat = INVESTOR_SECTIONS_DATA.find((c) => c.id === 'sec-investor-contact')!;
  const otherInfoCat = INVESTOR_SECTIONS_DATA.find((c) => c.id === 'sec-other-info')!;

  const renderTable = (items: TableRowItem[], col1 = 'Document / Report', col2 = 'Details / Unit', col3 = 'Period / Status') => (
    <div className="inv-table-wrap">
      <table className="inv-data-table">
        <thead>
          <tr>
            <th>{col1}</th>
            <th>{col2}</th>
            <th>{col3}</th>
            <th style={{ textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={idx}>
              <td className="inv-table-title-cell">{row.title}</td>
              <td className="inv-table-detail-cell">{row.detail}</td>
              <td className="inv-table-period-cell">{row.period}</td>
              <td className="inv-table-action-cell">
                {row.href ? (
                  <Link className="inv-action-link" to={row.href} title={`View ${row.title}`}>
                    VIEW
                  </Link>
                ) : row.pdf ? (
                  <div className="inv-table-actions">
                    <a
                      className="inv-action-link"
                      href={row.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`View ${row.title} in a new tab`}
                    >
                      VIEW
                    </a>
                    <span className="inv-action-slash">/</span>
                    <a
                      className="inv-action-link"
                      href={row.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={row.download || `${row.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`}
                      title={`Download ${row.title}`}
                    >
                      DOWNLOAD
                    </a>
                  </div>
                ) : (
                  <span className="inv-table-btn inv-table-btn--disabled">Available Soon</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="cp">
      <NavBar />

      <div className="cp-hero-inner" style={{ paddingTop: 'clamp(18px, 2.2vw, 30px)' }}>
        <p className="cp-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <span className="current">INVESTOR</span>
        </p>
        <h1 className="cp-page-title">Investor</h1>
      </div>

      {/* 7 Navigation Jump Boxes at Top of Banner */}
      <section className="inv-jump-nav-wrap" aria-label="Jump to investor sections">
        <div className="inv-jump-nav-grid">
          {JUMP_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className="inv-jump-card"
              onClick={() => scrollToSection(sec.id)}
            >
              <span className="inv-jump-label">{sec.label}</span>
              <span className="inv-jump-icon" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Hero Video Banner with Title & Read Article CTA */}
      <div className="inv-hero">
        <video
          className="inv-hero-video"
          autoPlay
          loop
          muted
          playsInline
          src="/Video/cover-video.mp4"
        />
        <div className="inv-hero-overlay">
          <div className="inv-hero-content">
            <h2 className="inv-hero-title">Where strategy meets<br />Evolving Healthcare,<br />Needs, Science & Sustainability</h2>
            <a
              href="https://granules-26.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inv-hero-cta"
            >
              READ MORE
            </a>
          </div>
        </div>
      </div>

      {/* Section 1: Financial Reports (Screenshot 1) */}
      <section id="sec-financial-reports" className="inv-doc-section">
        <InvestorFilteredSection
          category={financialReportsCat}
          defaultSubcatId={deepParams?.sectionId === 'sec-financial-reports' ? deepParams.subcatId : undefined}
        />
      </section>

      {/* Section 2: Investor Resources (Screenshot 2) */}
      <section id="sec-investor-resources" className="inv-doc-section">
        <InvestorFilteredSection
          category={investorResourcesCat}
          defaultSubcatId={deepParams?.sectionId === 'sec-investor-resources' ? deepParams.subcatId : 'investor-presentation'}
          defaultYear={deepParams?.sectionId === 'sec-investor-resources' ? deepParams.year : '2027'}
        />
      </section>

      {/* Section 3: Corporate Centre */}
      <section id="sec-corporate-centre" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <div className="inv-doc-head-left">
            <span className="inv-section-badge">Corporate Centre</span>
            <h2>CORPORATE CENTRE</h2>
            <p>
              Explore Granules India’s vision, leadership governance, multi-decade growth journey, global subsidiaries network, and operational excellence.
            </p>
          </div>
        </div>
        {renderTable(CORPORATE_CENTRE, 'Corporate Hub Section', 'Strategic Focus Area', 'Classification')}
      </section>

      {/* Section 4: Financial Highlights & Revenue Break Up */}
      <section id="sec-financial-highlights" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <div className="inv-doc-head-left">
            <span className="inv-section-badge">Financial Performance</span>
            <h2>FINANCIAL HIGHLIGHTS &amp; REVENUE BREAK UP</h2>
            <p>
              Detailed multi-year financial performance, segment revenue breakdowns, quarterly earnings presentations, and media releases.
            </p>
          </div>
        </div>
        {renderTable(FINANCIAL_HIGHLIGHTS, 'Statement / Presentation Title', 'Metric / Segment Scope', 'Timeline')}
      </section>

      {/* Section 5: Notice & Disclosures (Screenshot 3) */}
      <section id="sec-notices-disclosures" className="inv-doc-section">
        <InvestorFilteredSection
          category={noticesDisclosuresCat}
          defaultSubcatId={deepParams?.sectionId === 'sec-notices-disclosures' ? deepParams.subcatId : undefined}
        />
      </section>

      {/* Section 6: Other Information (Screenshot 5) */}
      <section id="sec-other-info" className="inv-doc-section">
        <InvestorFilteredSection
          category={otherInfoCat}
          defaultSubcatId={deepParams?.sectionId === 'sec-other-info' ? deepParams.subcatId : undefined}
        />
      </section>

      {/* Section 7: Investor Relations Contact (Screenshot 4) - Sent to Bottom */}
      <section id="sec-investor-contact" className="inv-doc-section">
        <InvestorFilteredSection category={investorContactCat} />
      </section>

      <CompanyFooter />
    </div>
  );
}

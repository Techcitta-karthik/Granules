import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
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
  { id: 'sec-investor-contact', label: 'Investor Relations Contact' },
  { id: 'sec-other-info', label: 'Other Information' },
];

const FINANCIAL_REPORTS: TableRowItem[] = [
  { title: 'Integrated Annual Reports', detail: 'Granules India Limited (Group)', period: 'FY 2024-25', href: '/investor/annual-reports' },
  { title: 'Sustainability Reports', detail: 'Group ESG & Environment', period: 'FY 2024-25', pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf' },
  { title: 'Quarterly Financial Results', detail: 'Audited Consolidated & Standalone', period: 'Q2 FY26', pdf: '/documents/Press-Release-Q2-FY26-07edcf6db296.pdf' },
  { title: 'Annual Accounts of Subsidiaries & JVs', detail: 'GOPL & Subsidiary Financial Accounts', period: 'FY 2024-25', pdf: '/documents/9853GOPL-Financials-17-18-min-c7cdaee4f683.pdf' },
  { title: 'Corporate Presentation', detail: 'Global Business Overview & Strategy', period: 'Current Edition', pdf: '/documents/Earnings-Presentation-Q2FY26-Circulation-fb2ccd8cf24d.pdf' },
];

const INVESTOR_RESOURCES: TableRowItem[] = [
  { title: 'Investor Presentation', detail: 'Quarterly Performance Review', period: 'Q2 FY26', pdf: '/documents/Earnings-Presentation-Q2FY26-Circulation-fb2ccd8cf24d.pdf' },
  { title: 'Earnings Call Transcripts', detail: 'Analyst Q&A Discussion', period: 'Q2 FY26', pdf: '/documents/GranulesIndia-Q2-FY26-Transcript-Clean-Version-faeecef8a9cb.pdf' },
  { title: 'Earnings Call Audio Recording', detail: 'Investor Conference Call Webcast', period: 'Q4 FY23', pdf: '/documents/Schedule-of-Analyst-and-Investor-Earnings-Conference-Call-Q4-2022-23-46bcf59128ca.pdf' },
  { title: 'Shareholding Structure', detail: 'Quarterly Distribution Schedule', period: 'Q3 FY25', pdf: '/documents/Third-Quarter-SHP-2025-b306d92c9c75.pdf' },
  { title: 'Top 200 Shareholders', detail: 'Statutory Shareholder Distribution', period: 'As on Mar 2026', pdf: '/documents/GRAN_TOP-200-AS-ON-31.03.2026-fbd278e76278.pdf' },
  { title: 'Corporate Social Responsibility Policy', detail: 'Approved CSR Policy Framework', period: 'Active Policy', pdf: '/documents/CSR-Policy-7f3b00771044.pdf' },
  { title: 'Stock Exchange Intimations (BSE & NSE)', detail: 'Regulatory Filings & Notifications', period: 'Ongoing', pdf: '/documents/03-01-2022-NSEBSE-5f23fc10d148.pdf' },
  { title: 'Analyst Coverage & Research Reports', detail: 'Institutional Conference Interactions', period: 'Edelweiss Securities', pdf: '/documents/2960Granules-India-Conference-Call-Hosted-by-Edelweiss-Securities---June-02-1cd554a67bf9.pdf' },
  { title: 'Share Buyback Public Announcement 2022', detail: 'Open Market Buyback Outcome', period: 'Dec 2022', pdf: '/documents/Post-Buyback-Public-Announcement-3046b59d85af.pdf' },
  { title: 'Share Buyback Public Announcement 2020', detail: 'Tender Offer Buyback Outcome', period: 'Oct 2020', pdf: '/documents/4531Buyback---Granules-f663d4a3d5eb.pdf' },
  { title: 'Investor Service Requests (Form ISR-1)', detail: 'KYC & Signature Updation Forms', period: 'RTA Standard', pdf: '/documents/Form-ISR-1-For-Updating-KYC-1dce8e0ec06b.pdf' },
  { title: 'Unclaimed Dividend & Shares to IEPF', detail: 'Shares Transferred to IEPF Authority', period: 'Current Schedule', pdf: '/documents/Details-Of-Share-Transferred-To-The-Iepf-Authority-5f861d461def.pdf' },
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

const NOTICES_DISCLOSURES: TableRowItem[] = [
  { title: 'Notice of Board Meetings', detail: 'Financial Results & Interim Dividend Considerations', period: 'May 2023', pdf: '/documents/Notice-of-Board-Meeting-Scheduled-on-May-16-2023-97d1e47a1aee.pdf' },
  { title: 'Schedule of Investor Meet', detail: 'Non-Deal Roadshow & Analyst Interactions', period: 'Statutory Notice', pdf: '/documents/8938Intimation-of-Schedule-of-the-Non-Deal-Road-Show-bca671f2cc3d.pdf' },
  { title: 'Newspaper Publications', detail: 'AGM Notice Dispatch & Financial Advertisements', period: 'Press Publications', pdf: '/documents/2342Granules-India-Limited---Dispatch-Advertisement-e2e7cd7fceb8.pdf' },
  { title: 'Annual Secretarial Compliance Report', detail: 'Regulation 24A SEBI (LODR) Regulations', period: 'FY 2023-24', pdf: '/documents/annualsecretarial-complaince-report-23-31ac1ac51554.pdf' },
  { title: 'Annual Return (Form MGT-7)', detail: 'Statutory Filing with Registrar of Companies', period: 'FY 2024-25', pdf: '/documents/Annual-return-website-24-25-80a7926488aa.pdf' },
  { title: 'Stock Exchange Disclosures', detail: 'Continuous SEBI Compliances (NSE & BSE)', period: 'Current Filings', pdf: '/documents/BSENSEINTIMATION-f14353e32d64.pdf' },
];

const OTHER_INFO: TableRowItem[] = [
  { title: 'ESOP Schemes 2017 & 2009', detail: 'Employee Stock Option Plan Regulations & Grants', period: 'Statutory Scheme', pdf: '/documents/ESOP-Schemes-c6f2c928720f.pdf' },
  { title: 'Memorandum & Articles of Association', detail: 'Constitutional Charter Documents of Company', period: 'Updated MOA/AOA', pdf: '/documents/COBC-9b98735608b9.pdf' },
  { title: 'Granules E-voting & AGM Instructions', detail: 'Remote E-voting User Guide for Shareholders', period: 'General Meetings', pdf: '/documents/Granules-Evoting-and-AGM-Instructions-8d59d6fa9667.pdf' },
  { title: 'Tax Deducted at Source (TDS) on Dividend', detail: 'Statutory Communication on Dividend Withholding', period: 'FY 2024-25', pdf: '/documents/Unpaid-Final-Dividend-FY-2024-2025-07965a1cbed6.pdf' },
  { title: 'Committees of the Board', detail: 'Audit, Nomination & CSR Committee Compositions', period: 'As on Aug 2025', pdf: '/documents/Committees-of-the-Board-as-on-01.08.2025-ceb2be8520eb.pdf' },
  { title: 'Familiarization Program for Independent Directors', detail: 'Director Orientation & Training Modules', period: 'FY 2025-26', pdf: '/documents/Familarisation-Programme-for-Independent-Directors-2025-26-5d9c26495637.pdf' },
  { title: 'Appointment of Independent Directors', detail: 'Formal Terms & Conditions of Directorship', period: 'Governance', pdf: '/documents/Appointment-of-Independent-Directors-9c78611c8cf7.pdf' },
  { title: 'Transfer of Physical Shares in Demat Mode', detail: 'Mandatory Dematerialization Advisory (SEBI)', period: 'Shareholder Notice', pdf: '/documents/1121Transfer-of-Physical-Shares-in-Demat-Mode-only-5dacd41e988f.pdf' },
  { title: 'Special Purpose Consolidated Financials', detail: 'Granules CZRO Statutory Audit Statements', period: 'FY 2023-24', pdf: '/documents/Financials-CZRO-2023-425ee535e48e.pdf' },
  { title: '24th AGM Scrutinizer Report & Results', detail: 'E-voting & Poll Outcomes at Annual Meeting', period: 'Sep 2024', pdf: '/documents/185924th-AGM-Voting-Results-93df2c5c6b2c.pdf' },
  { title: 'EGM Notice & Explanatory Statement', detail: 'Notice of Extraordinary General Meeting', period: 'Dec 2025', pdf: '/documents/Granules-India-Limited_EGM-Notice_30.12.2025-V1-ec9fea7c51e6.pdf' },
  { title: 'BSE Scheme of Amalgamation Approval', detail: 'Part-B In-principle Amalgamation Sanctions', period: 'Regulatory Order', pdf: '/documents/5329BSE-Approval-Part-B-reg-Scheme-of-Amalgamation-d2a343ccd484.pdf' },
  { title: 'High Court Order on Scheme of Amalgamation', detail: 'Certified Court Sanction Orders', period: 'Court Orders', pdf: '/documents/3913High-Court-Order-of-Amalgamation-2eda882af1c6.pdf' },
  { title: 'NSE Observation Letter on Scheme', detail: 'Stock Exchange Amalgamation Clearance', period: 'NSE Filing', pdf: '/documents/4679NSE-Observation-Letter-ded00e005836.pdf' },
  { title: 'BSE Observation Letter on Scheme', detail: 'Stock Exchange Amalgamation Clearance', period: 'BSE Filing', pdf: '/documents/3280BSE-Observation-Letter-d63a8e7e0e09.pdf' },
  { title: 'SEBI Clause 24(F) Complaint Report', detail: 'No Complaints Certificate on Amalgamation', period: 'SEBI Filing', pdf: '/documents/3616Clause-24F-documents-Complaint-Report-d7ff29ce5373.pdf' },
];

const INVESTOR_CONTACT_DATA: TableRowItem[] = [
  { title: 'Company Secretary & Compliance Officer', detail: 'investorrelations@granulesindia.com', period: 'Corporate Secretarial', href: 'mailto:investorrelations@granulesindia.com' },
  { title: 'Registered & Corporate Office', detail: '2nd Floor, Block-III, My Home Hub, Madhapur, Hyderabad - 500081', period: 'Headquarters', href: '/contact' },
  { title: 'Registrar & Share Transfer Agent (KFintech)', detail: 'Selenium Tower B, Plot 31-32, Gachibowli, Hyderabad - 500032', period: 'RTA Services', href: 'https://www.kfintech.com/' },
  { title: 'Investor Relations & Institutional Analyst Desk', detail: 'Institutional Equity & Financial Queries', period: 'Active Contact', href: 'mailto:investorrelations@granulesindia.com' },
  { title: 'Nodal Officer for IEPF Claims', detail: 'Shares and Unclaimed Dividend IEPF Authority', period: 'Statutory Desk', pdf: '/documents/Details-Of-Share-Transferred-To-The-Iepf-Authority-5f861d461def.pdf' },
];

export default function InvestorOverviewPage() {
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
                  <Link className="inv-table-btn" to={row.href}>
                    <span>View</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </Link>
                ) : row.pdf ? (
                  <a
                    className="inv-table-btn"
                    href={row.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={row.download || `${row.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`}
                  >
                    <span>Download</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
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
          <Link to="/">HOMEPAGE</Link>
          <span className="sep">›</span>
          <span className="current">INVESTOR OVERVIEW</span>
        </p>
        <h1 className="cp-page-title">Investor overview</h1>
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
            <h2 className="inv-hero-title">Annual Report FY25-26</h2>
            <a
              href="https://granules-26.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inv-hero-cta"
            >
              READ ARTICLE
            </a>
          </div>
        </div>
      </div>

      {/* Section 1: Financial Reports */}
      <section id="sec-financial-reports" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <span className="inv-section-badge">Financial Reports</span>
          <h2>Financial Reports</h2>
          <p>
            Access our integrated annual reports, quarterly audited statements, sustainability disclosures, and subsidiary accounts.
          </p>
        </div>
        {renderTable(FINANCIAL_REPORTS, 'Report / Document Name', 'Entity / Reporting Scope', 'Reporting Period')}
      </section>

      {/* Section 2: Investor Resources */}
      <section id="sec-investor-resources" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <span className="inv-section-badge">Resources &amp; Filings</span>
          <h2>Investor Resources</h2>
          <p>
            Key presentations, earnings call transcripts, shareholding patterns, CSR policies, buyback circulars, and shareholder service request forms.
          </p>
        </div>
        {renderTable(INVESTOR_RESOURCES, 'Resource / Publication Title', 'Details / Category', 'Timeline / Status')}
      </section>

      {/* Section 3: Corporate Centre */}
      <section id="sec-corporate-centre" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <span className="inv-section-badge">Corporate Centre</span>
          <h2>Corporate Centre</h2>
          <p>
            Explore Granules India’s vision, leadership governance, multi-decade growth journey, global subsidiaries network, and operational excellence.
          </p>
        </div>
        {renderTable(CORPORATE_CENTRE, 'Corporate Hub Section', 'Strategic Focus Area', 'Classification')}
      </section>

      {/* Section 4: Financial Highlights & Revenue Break Up */}
      <section id="sec-financial-highlights" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <span className="inv-section-badge">Financial Performance</span>
          <h2>Financial Highlights &amp; Revenue Break Up</h2>
          <p>
            Detailed multi-year financial performance, segment revenue breakdowns, quarterly earnings presentations, and media releases.
          </p>
        </div>
        {renderTable(FINANCIAL_HIGHLIGHTS, 'Statement / Presentation Title', 'Metric / Segment Scope', 'Timeline')}
      </section>

      {/* Section 5: Notice & Disclosures */}
      <section id="sec-notices-disclosures" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <span className="inv-section-badge">Notices &amp; Disclosures</span>
          <h2>Notice &amp; Disclosures</h2>
          <p>
            Statutory board meeting notifications, analyst meet roadshows, secretarial compliance filings, newspaper releases, and stock exchange intimations.
          </p>
        </div>
        {renderTable(NOTICES_DISCLOSURES, 'Notice / Regulatory Disclosure', 'Compliance Authority / Scope', 'Filing Date')}
      </section>

      {/* Section 6: Investor Relations Contact */}
      <section id="sec-investor-contact" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <span className="inv-section-badge">Investor Relations Contact</span>
          <h2>Investor Relations Contact</h2>
          <p>
            For queries related to equity shares, financial results, annual reports, or shareholder services, please reach out to our dedicated teams:
          </p>
        </div>
        {renderTable(INVESTOR_CONTACT_DATA, 'Authority / Department', 'Contact Details / Email / Address', 'Scope / Department')}
      </section>

      {/* Section 7: Other Information */}
      <section id="sec-other-info" className="inv-doc-section">
        <div className="inv-doc-section-head">
          <span className="inv-section-badge">Other Information</span>
          <h2>Other Information</h2>
          <p>
            ESOP documentation, Memorandum &amp; Articles of Association, AGM voting outcomes, court amalgamation orders, and regulatory approvals.
          </p>
        </div>
        {renderTable(OTHER_INFO, 'Statutory Record / Scheme', 'Governance Scope', 'Period / Reference')}
      </section>

      <CompanyFooter />
    </div>
  );
}

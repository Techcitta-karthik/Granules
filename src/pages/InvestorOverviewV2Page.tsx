import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { getAssetUrl } from '../lib/pdf';
import '../components/company/company.css';
import './investor.css';

const TAB_DATA: Record<number, { label: string; href?: string; pdf?: string }[]> = {
  0: [
    { label: 'Annual Reports', href: '/investor/annual-reports' },
    { label: 'Sustainability Reports', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/07/Granules_Integrated-Report-2024-25.pdf' },
    { label: 'Quarterly Results', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Press-Release-Q2-FY26.pdf' },
    { label: 'Annual Accounts of Subsidiaries & JVs', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/Annual-Accounts-of-Subsidiaries/9853GOPL Financials 17-18-min.pdf' },
    { label: 'Corporate Presentation', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Earnings-Presentation-Q2FY26-Circulation.pdf' },
  ],
  1: [
    { label: 'Investor Presentation', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Earnings-Presentation-Q2FY26-Circulation.pdf' },
    { label: 'Earnings Call Transcripts', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/GranulesIndia-Q2-FY26-Transcript-Clean-Version.pdf' },
    { label: 'Earnings Call Recording', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2023/04/Schedule-of-Analyst-and-Investor-Earnings-Conference-Call-Q4-2022-23.pdf' },
    { label: 'Shareholding Structure', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/01/Third-Quarter-SHP-2025.pdf' },
    { label: 'Top 200 Shareholders', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2026/07/GRAN_TOP-200-AS-ON-31.03.2026.pdf' },
    { label: 'Policies', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/12/CSR-Policy.pdf' },
    { label: 'Analyst Coverage', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/notice/2960Granules India Conference Call, Hosted by Edelweiss Securities - June 02....pdf' },
    { label: 'Buyback 2022', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2022/10/Post-Buyback-Public-Announcement.pdf' },
    { label: 'Forms', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2022/09/Form-SH-4.pdf' },
    { label: 'Unclaimed–Dividend & Shares Transferred to IEPF', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Details-Of-Share-Transferred-To-The-Iepf-Authority.pdf' },
  ],
  2: [
    { label: 'Financial Highlights', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2022/05/Financial Result 18.05.2022.pdf' },
    { label: 'Revenue Breakup', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2026/07/Granules_Annual-Report-FY26-1.pdf' },
  ],
  3: [
    { label: 'Notice of Board Meetings', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2023/04/Notice-of-Board-Meeting-Scheduled-on-May-16-2023.pdf' },
    { label: 'Schedule Of Investor Meet', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/notice/8938Intimation of Schedule of the Non Deal Road Show.pdf' },
    { label: 'Newspaper Publications', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2342Granules India Limited - Dispatch Advertisement.pdf' },
    { label: 'Secretarial Compliance Report', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/investors/annualsecretarial-complaince-report-23.pdf' },
    { label: 'Annual Returns', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/07/Annual-return-website-24-25.pdf' },
    { label: 'Other Disclosures', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/05/BSENSEINTIMATION.pdf' },
  ],
  4: [
    { label: 'ESOP Scheme 2017 & 2009', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/04/ESOP-Schemes.pdf' },
    { label: 'Memorandum & Articles of Association of the Company', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2022/03/COBC.pdf' },
    { label: 'Granules Evoting and AGM Instructions', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2023/07/Granules-Evoting-and-AGM-Instructions.pdf' },
    { label: 'Tax on Dividend', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Unpaid-Final-Dividend-FY-2024-2025.pdf' },
    { label: 'Committees of the Board', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/08/Committees-of-the-Board-as-on-01.08.2025.pdf' },
    { label: 'Familiarization Program for Independent Directors', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2026/04/Familarisation-Programme-for-Independent-Directors-2025-26.pdf' },
    { label: 'Appointment of Independent Directors', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2024/04/Appointment-of-Independent-Directors.pdf' },
    { label: 'Transfer of Physical Shares in Demat Mode only', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/1121Transfer of Physical Shares in Demat Mode only.pdf' },
    { label: 'Special Purpose consolidated financials', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/investors/Financials-CZRO-2023.pdf' },
    { label: 'EGM voting results', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/2202EGM voting results.pdf' },
    { label: '24th AGM Voting Results', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/185924th AGM Voting Results.pdf' },
    { label: 'EGM Notice', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/2025/12/Granules-India-Limited_EGM-Notice_30.12.2025-V1.pdf' },
    { label: 'BSE Approval -Part B reg. Scheme of Amalgamation', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/5329BSE Approval-Part B reg Scheme of Amalgamation.pdf' },
    { label: 'High Court Order of Amalgamation', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/3913High Court Order of Amalgamation.pdf' },
    { label: 'Oral order of Amalgamation', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/4106Oral order of Amalgamation.pdf' },
    { label: 'Outcome of 23rd AGM of Granules India Limited', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/5667Outcome of 23rd AGM of Granules India Limited.pdf' },
    { label: 'NSE Observation Letter', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/4679NSE Observation Letter.pdf' },
    { label: 'BSE Observation Letter', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/3280BSE Observation Letter.pdf' },
    { label: 'Reply to Bombay Stock Exchange', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/6708Reply to Bombay Stock Exchange.pdf' },
    { label: 'Clause 24(F) documents Complaint Report', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/3616Clause 24F documents Complaint Report.pdf' },
    { label: 'Scheme of Arrangement & Clause 24(f) documents', pdf: 'https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/Scheme of Arrangement Clause 24f documents.pdf' },
  ],
};

const DATA_TABS = ['Financial Reports', 'Investor resources', 'Financial highlights', 'Notices & Disclosures', 'other info'];

export default function InvestorOverviewV2Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 180 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    document.title = 'Investor Overview V2 — Granules India';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="cp">
      <NavBar />

      <div className="cp-hero-inner" style={{ paddingTop: 'clamp(18px, 2.2vw, 30px)' }}>
        <p className="cp-breadcrumb">
          <a href="/">HOMEPAGE</a>
          <span className="sep">›</span>
          <span className="current">INVESTOR OVERVIEW (V2)</span>
        </p>
        <h1 className="cp-page-title">Investor overview</h1>
      </div>

      <div className="inv-hero">
        <a
          href="https://granules-26.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inv-hero-link"
          aria-label="Visit Granules 26 platform"
        >
          <video
            className="inv-hero-video"
            autoPlay
            loop
            muted
            playsInline
            src="/Video/cover-video.mp4"
          />
        </a>
      </div>

      {/* Interactive Investor Data Tabs and Dynamic List */}
      <div className="inv-data" style={{ marginTop: 'clamp(80px, 10vw, 120px)' }}>
        <div className="inv-data-tabs">
          <div
            className="inv-data-tab-indicator"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
          {DATA_TABS.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              className={`inv-data-tab${index === activeTab ? ' active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="inv-data-list">
          {(TAB_DATA[activeTab] || TAB_DATA[0]).map((row) =>
            row.href ? (
              <Link className="inv-data-row" to={row.href} key={row.label}>
                <p>{row.label}</p>
                <span className="inv-data-row-arrow" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </Link>
            ) : row.pdf ? (
              <a
                className="inv-data-row"
                href={getAssetUrl(row.pdf)}
                target="_blank"
                rel="noopener noreferrer"
                download={`${row.label.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`}
                key={row.label}
              >
                <p>{row.label}</p>
                <span className="inv-data-row-arrow" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </a>
            ) : (
              <button type="button" className="inv-data-row" key={row.label}>
                <p>{row.label}</p>
                <span className="inv-data-row-arrow" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </button>
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
        <Link className="inv-contact-btn" to="/contact">Contact</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

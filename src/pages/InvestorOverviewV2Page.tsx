import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './investor.css';

const TAB_DATA: Record<number, { label: string; href?: string }[]> = {
  0: [
    { label: 'Annual Reports', href: '/investor/annual-reports' },
    { label: 'Sustainability Reports', href: '/sustainability' },
    { label: 'Quarterly Results', href: '/media' },
    { label: 'Annual Accounts of Subsidiaries & JVs' },
    { label: 'Corporate Presentation' },
  ],
  1: [
    { label: 'Investor Presentation' },
    { label: 'Earnings Call Transcripts' },
    { label: 'Earnings Call Recording' },
    { label: 'Shareholding Structure' },
    { label: 'Top 200 Shareholders' },
    { label: 'Policies' },
    { label: 'BSE & NSE' },
    { label: 'Analyst Coverage' },
    { label: 'Buyback 2022' },
    { label: 'Buyback 2020' },
    { label: 'Forms' },
    { label: 'Unclaimed–Dividend & Shares Transferred to IEPF' },
  ],
  2: [
    { label: 'Financial Highlights' },
    { label: 'Revenue Breake Up' },
  ],
  3: [
    { label: 'Notice of Board Meetings' },
    { label: 'Schedule Of Investor Meet' },
    { label: 'Newspaper Publications' },
    { label: 'Secretarial Compliance Report' },
    { label: 'Annual Returns' },
    { label: 'Other Disclosures' },
  ],
  4: [
    { label: 'ESOP Scheme 2017 & 2009' },
    { label: 'Memorandum & Articles of Association of the Company' },
    { label: 'Granules Evoting and AGM Instructions' },
    { label: 'Tax on Dividend' },
    { label: 'Committees of the Board' },
    { label: 'Familiarization Program for Independent Directors' },
    { label: 'Appointment of Independent Directors' },
    { label: 'Transfer of Physical Shares in Demat Mode only' },
    { label: 'Special Purpose consolidated financials' },
    { label: 'EGM voting results' },
    { label: '24th AGM Voting Results' },
    { label: 'EGM Notice' },
    { label: 'BSE Approval -Part B reg. Scheme of Amalgamation' },
    { label: 'High Court Order of Amalgamation' },
    { label: 'Oral order of Amalgamation' },
    { label: 'Outcome of 23rd AGM of Granules India Limited' },
    { label: 'NSE Observation Letter' },
    { label: 'BSE Observation Letter' },
    { label: 'Reply to Bombay Stock Exchange' },
    { label: 'Clause 24(F) documents Complaint Report' },
    { label: 'Scheme of Arrangement & Clause 24(f) documents' },
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
          <span>HOMEPAGE</span>
          <span className="sep">›</span>
          <span className="current">INVESTOR OVERVIEW (V2)</span>
        </p>
        <h1 className="cp-page-title">Investor overview</h1>
      </div>

      <div className="inv-hero">
        <span className="inv-hero-badge">STOCK IMAGE</span>
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

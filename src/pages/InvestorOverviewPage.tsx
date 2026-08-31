import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './investor.css';

const A = '/assets/investor/';

const KEY_REASONS = [
  {
    title: 'Global Leadership in Pharma Manufacturing',
    image: '/assets/oe/card-precision-in-motion.png',
    body: 'Scalable, vertically integrated pharmaceutical manufacturer delivering high-quality, cost-effective APIs, PFIs, and Finished Dosages globally.',
  },
  {
    title: 'Consistent Financial Performance',
    image: '/assets/oe/card-visibility-drives-results.png',
    body: 'Delivering steady revenue growth, robust EBITDA margins, and long-term value creation for global shareholders.',
  },
  {
    title: 'Operational Excellence at Scale',
    image: '/assets/oe/card-engineered-for-safety.png',
    body: 'World-class automated facilities approved by US FDA, EDQM, WHO-GMP, PMDA, and global regulatory bodies.',
  },
  {
    title: 'Innovation-driven Growth',
    image: '/assets/peptides/card-contract-services.png',
    body: 'Pioneering green chemistry at CZRO, custom synthesis, peptide therapeutics, and advanced drug delivery systems.',
  },
  {
    title: 'Sustainability Commitment',
    image: '/assets/strategy/pillar-environment.png',
    body: 'Committed to Net Zero by 2050, 100% renewable electricity transition, and responsible corporate governance.',
  },
];

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

export default function InvestorOverviewPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [thumbWidth, setThumbWidth] = useState(40);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 180 });

  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    document.title = 'Investor Overview — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const updateScrollProgress = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      const maxScroll = scrollWidth - clientWidth;

      const visibleRatio = Math.min(0.75, Math.max(0.28, clientWidth / scrollWidth));
      const widthPct = visibleRatio * 100;
      setThumbWidth(widthPct);

      if (maxScroll > 0) {
        const scrollRatio = Math.min(1, Math.max(0, scrollLeft / maxScroll));
        setThumbLeft(scrollRatio * (100 - widthPct));
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < maxScroll - 10);
      } else {
        setThumbLeft(0);
        setCanScrollLeft(false);
        setCanScrollRight(false);
      }
    }
  };

  useEffect(() => {
    const el = trackRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollProgress, { passive: true });
      updateScrollProgress();
      window.addEventListener('resize', updateScrollProgress);
    }
    return () => {
      el?.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
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

  const scrollReasons = (dir: number) => {
    if (trackRef.current) {
      const { scrollWidth, clientWidth } = trackRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;

      // 1 click scrolls directly to the last card at the end, or back to the start
      const targetScroll = dir > 0 ? maxScroll : 0;
      trackRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));
    if (trackRef.current) {
      const { scrollWidth, clientWidth } = trackRef.current;
      const maxScroll = scrollWidth - clientWidth;
      trackRef.current.scrollTo({ left: ratio * maxScroll, behavior: 'smooth' });
    }
  };

  return (
    <div className="cp">
      <NavBar />

      <div className="cp-hero-inner" style={{ paddingTop: 'clamp(18px, 2.2vw, 30px)' }}>
        <p className="cp-breadcrumb">
          <span>HOMEPAGE</span>
          <span className="sep">›</span>
          <span className="current">INVESTOR OVERVIEW</span>
        </p>
        <h1 className="cp-page-title">Investor overview</h1>
      </div>

      <div className="inv-hero">
        <span className="inv-hero-badge">STOCK IMAGE</span>
      </div>

      <div className="inv-stock-wrap">
        <div className="inv-stock-card">
          <div className="inv-stock-head">
            <div>
              <p className="inv-stock-name">GRANULES INDIA</p>
              <p className="inv-stock-date">June 14,2025 12:29:00</p>
            </div>
            <div className="inv-stock-exchange">
              <span className="nse">NSE</span>
              <span className="bse">BSE</span>
            </div>
          </div>
          <div className="inv-stock-price-row">
            <p className="inv-stock-price">946.00</p>
            <span className="inv-stock-change up">
              <img src={`${A}growth-arrow.svg`} alt="" />
              22.10 (2.20%)
            </span>
          </div>
        </div>
      </div>

      {/* Why Invest in Granules Section */}
      <div className="inv-why">
        <h2>Why Invest in Granules ?</h2>
        <p>
          Granules India is a trusted partner in the global pharmaceutical industry, with a strong
          foundation of scale, quality, and reliability. Investing in Granules means being part of
          a growth story built on innovation, operational efficiency, and global compliance.
        </p>
      </div>

      {/* Reasons Carousel */}
      <div className="inv-reasons">
        <div className="inv-reasons-track" ref={trackRef}>
          {KEY_REASONS.map((item, index) => {
            const isOpen = openCard === index;
            return (
              <article
                className={`inv-reason-card${isOpen ? ' is-open' : ''}`}
                key={item.title}
                onMouseEnter={() => setOpenCard(index)}
                onMouseLeave={() => setOpenCard(null)}
              >
                <button
                  type="button"
                  className="inv-card-btn"
                  onClick={() => setOpenCard(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? 'Close' : 'Explore'} ${item.title}`}
                >
                  {/* Card Background Image */}
                  <div className="inv-card-img-wrap">
                    <img src={item.image} alt={item.title} />
                  </div>

                  {/* Sliding Blue Sheet Drawer */}
                  <div className="inv-card-sheet">
                    <div className="inv-sheet-head">
                      <span className="inv-sheet-title">{item.title}</span>
                      <span className="inv-symbol" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>

                    <div className="inv-sheet-body">
                      <p className="inv-description">{item.body}</p>
                      <span className="inv-learn">LEARN MORE</span>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        {/* Carousel Bottom Sliding Scrollbar & Navigation Arrow Controls */}
        <div className="inv-reasons-controls">
          {/* Horizontal Track Line with Thick Blue Pill Thumb */}
          <div
            className="inv-scrollbar-track"
            onClick={handleTrackClick}
            role="slider"
            aria-label="Carousel scroll position"
            tabIndex={0}
          >
            <div
              className="inv-scrollbar-thumb"
              style={{
                width: `${thumbWidth}%`,
                left: `${thumbLeft}%`,
              }}
            />
          </div>

          {/* Right Navigation Arrow Buttons */}
          <div className="inv-reasons-nav">
            <button
              type="button"
              className={`inv-nav-btn${canScrollLeft ? ' active' : ' disabled'}`}
              onClick={() => scrollReasons(-1)}
              aria-label="Previous reason"
              disabled={!canScrollLeft}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`inv-nav-btn${canScrollRight ? ' active' : ' disabled'}`}
              onClick={() => scrollReasons(1)}
              aria-label="Next reason"
              disabled={!canScrollRight}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Latest Quarterly Results Section */}
      <div className="inv-quarterly-section">
        <div className="inv-quarterly-card">
          <div className="inv-quarterly-copy">
            <h2>Latest Quarterly Results</h2>
            <div className="inv-quarterly-list">
              {[
                { label: '2024 INTEGRATED ANNUAL REPORT', href: '/investor/annual-reports' },
                { label: 'CORPORATE PRESENTATION', href: '#' },
                { label: 'PRESS RELEASE', href: '/media' },
              ].map((item) => (
                <a
                  className="inv-quarterly-item"
                  href={item.href}
                  key={item.label}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <span>{item.label}</span>
                  <span className="inv-quarterly-arrow" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="inv-quarterly-device-wrap">
            <div className="inv-quarterly-device">
              <div className="inv-device-screen">
                <img
                  src="/assets/investor-report-cover.png"
                  alt="Expanding Horizons - 2024 Integrated Annual Report"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="inv-data">
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

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './investor.css';

const A = '/assets/investor/';

const KEY_REASONS = [
  {
    title: 'Global Leadership in Pharma Manufacturing',
    image: '/assets/oe/card-precision-in-motion.webp',
    body: 'Scalable, vertically integrated pharmaceutical manufacturer delivering high-quality, cost-effective APIs, PFIs, and Finished Dosages globally.',
  },
  {
    title: 'Consistent Financial Performance',
    image: '/assets/oe/card-visibility-drives-results.webp',
    body: 'Delivering steady revenue growth, robust EBITDA margins, and long-term value creation for global shareholders.',
  },
  {
    title: 'Operational Excellence at Scale',
    image: '/assets/oe/card-engineered-for-safety.webp',
    body: 'World-class automated facilities approved by US FDA, EDQM, WHO-GMP, PMDA, and global regulatory bodies.',
  },
  {
    title: 'Innovation-driven Growth',
    image: '/assets/peptides/card-contract-services.webp',
    body: 'Pioneering green chemistry at CZRO, custom synthesis, peptide therapeutics, and advanced drug delivery systems.',
  },
  {
    title: 'Sustainability Commitment',
    image: '/assets/strategy/pillar-environment.webp',
    body: 'Committed to Net Zero by 2050, 100% renewable electricity transition, and responsible corporate governance.',
  },
];

const TAB_DATA: Record<number, { label: string; href?: string; pdf?: string }[]> = {
  0: [
    { label: 'Annual Reports', href: '/investor/annual-reports' },
    { label: 'Sustainability Reports', pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf' },
    { label: 'Quarterly Results', pdf: '/documents/Press-Release-Q2-FY26-07edcf6db296.pdf' },
    { label: 'Annual Accounts of Subsidiaries & JVs', pdf: '/documents/9853GOPL-Financials-17-18-min-c7cdaee4f683.pdf' },
    { label: 'Corporate Presentation', pdf: '/documents/Earnings-Presentation-Q2FY26-Circulation-fb2ccd8cf24d.pdf' },
  ],
  1: [
    { label: 'Investor Presentation', pdf: '/documents/Earnings-Presentation-Q2FY26-Circulation-fb2ccd8cf24d.pdf' },
    { label: 'Earnings Call Transcripts', pdf: '/documents/GranulesIndia-Q2-FY26-Transcript-Clean-Version-faeecef8a9cb.pdf' },
    { label: 'Earnings Call Recording', pdf: '/documents/Schedule-of-Analyst-and-Investor-Earnings-Conference-Call-Q4-2022-23-46bcf59128ca.pdf' },
    { label: 'Shareholding Structure', pdf: '/documents/Third-Quarter-SHP-2025-b306d92c9c75.pdf' },
    { label: 'Top 200 Shareholders', pdf: '/documents/GRAN_TOP-200-AS-ON-31.03.2026-fbd278e76278.pdf' },
    { label: 'Policies', pdf: '/documents/CSR-Policy-7f3b00771044.pdf' },
    { label: 'BSE & NSE', pdf: '/documents/03-01-2022-NSEBSE-5f23fc10d148.pdf' },
    { label: 'Analyst Coverage', pdf: '/documents/2960Granules-India-Conference-Call-Hosted-by-Edelweiss-Securities---June-02-1cd554a67bf9.pdf' },
    { label: 'Buyback 2022', pdf: '/documents/Post-Buyback-Public-Announcement-3046b59d85af.pdf' },
    { label: 'Buyback 2020', pdf: '/documents/4531Buyback---Granules-f663d4a3d5eb.pdf' },
    { label: 'Forms', pdf: '/documents/Form-ISR-1-For-Updating-KYC-1dce8e0ec06b.pdf' },
    { label: 'Unclaimed–Dividend & Shares Transferred to IEPF', pdf: '/documents/Details-Of-Share-Transferred-To-The-Iepf-Authority-5f861d461def.pdf' },
  ],
  2: [
    { label: 'Financial Highlights', pdf: '/documents/Financial-Result-18.05.2022-0e55e6fbe630.pdf' },
    { label: 'Revenue Breakup', pdf: '/documents/3975Granules-India-s-Revenue-increases-c3fcfefdab37.pdf' },
  ],
  3: [
    { label: 'Notice of Board Meetings', pdf: '/documents/Notice-of-Board-Meeting-Scheduled-on-May-16-2023-97d1e47a1aee.pdf' },
    { label: 'Schedule Of Investor Meet', pdf: '/documents/8938Intimation-of-Schedule-of-the-Non-Deal-Road-Show-bca671f2cc3d.pdf' },
    { label: 'Newspaper Publications', pdf: '/documents/2342Granules-India-Limited---Dispatch-Advertisement-e2e7cd7fceb8.pdf' },
    { label: 'Secretarial Compliance Report', pdf: '/documents/annualsecretarial-complaince-report-23-31ac1ac51554.pdf' },
    { label: 'Annual Returns', pdf: '/documents/Annual-return-website-24-25-80a7926488aa.pdf' },
    { label: 'Other Disclosures', pdf: '/documents/BSENSEINTIMATION-f14353e32d64.pdf' },
  ],
  4: [
    { label: 'ESOP Scheme 2017 & 2009', pdf: '/documents/ESOP-Schemes-c6f2c928720f.pdf' },
    { label: 'Memorandum & Articles of Association of the Company', pdf: '/documents/COBC-9b98735608b9.pdf' },
    { label: 'Granules Evoting and AGM Instructions', pdf: '/documents/Granules-Evoting-and-AGM-Instructions-8d59d6fa9667.pdf' },
    { label: 'Tax on Dividend', pdf: '/documents/Unpaid-Final-Dividend-FY-2024-2025-07965a1cbed6.pdf' },
    { label: 'Committees of the Board', pdf: '/documents/Committees-of-the-Board-as-on-01.08.2025-ceb2be8520eb.pdf' },
    { label: 'Familiarization Program for Independent Directors', pdf: '/documents/Familarisation-Programme-for-Independent-Directors-2025-26-5d9c26495637.pdf' },
    { label: 'Appointment of Independent Directors', pdf: '/documents/Appointment-of-Independent-Directors-9c78611c8cf7.pdf' },
    { label: 'Transfer of Physical Shares in Demat Mode only', pdf: '/documents/1121Transfer-of-Physical-Shares-in-Demat-Mode-only-5dacd41e988f.pdf' },
    { label: 'Special Purpose consolidated financials', pdf: '/documents/Financials-CZRO-2023-425ee535e48e.pdf' },
    { label: 'EGM voting results', pdf: '/documents/2202EGM-voting-results-00b30443ad19.pdf' },
    { label: '24th AGM Voting Results', pdf: '/documents/185924th-AGM-Voting-Results-93df2c5c6b2c.pdf' },
    { label: 'EGM Notice', pdf: '/documents/Granules-India-Limited_EGM-Notice_30.12.2025-V1-ec9fea7c51e6.pdf' },
    { label: 'BSE Approval -Part B reg. Scheme of Amalgamation', pdf: '/documents/5329BSE-Approval-Part-B-reg-Scheme-of-Amalgamation-d2a343ccd484.pdf' },
    { label: 'High Court Order of Amalgamation', pdf: '/documents/3913High-Court-Order-of-Amalgamation-2eda882af1c6.pdf' },
    { label: 'Oral order of Amalgamation', pdf: '/documents/4106Oral-order-of-Amalgamation-4c3c2b7db5dc.pdf' },
    { label: 'Outcome of 23rd AGM of Granules India Limited', pdf: '/documents/5667Outcome-of-23rd-AGM-of-Granules-India-Limited-a96461187983.pdf' },
    { label: 'NSE Observation Letter', pdf: '/documents/4679NSE-Observation-Letter-ded00e005836.pdf' },
    { label: 'BSE Observation Letter', pdf: '/documents/3280BSE-Observation-Letter-d63a8e7e0e09.pdf' },
    { label: 'Reply to Bombay Stock Exchange', pdf: '/documents/6708Reply-to-Bombay-Stock-Exchange-9f900bae1b3d.pdf' },
    { label: 'Clause 24(F) documents Complaint Report', pdf: '/documents/3616Clause-24F-documents-Complaint-Report-d7ff29ce5373.pdf' },
    { label: 'Scheme of Arrangement & Clause 24(f) documents', pdf: '/documents/Scheme-of-Arrangement-Clause-24f-documents-700b6e8182a6.pdf' },
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
          <a href="/">HOMEPAGE</a>
          <span className="sep">›</span>
          <span className="current">INVESTOR OVERVIEW</span>
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
              <img src={`${A}growth-arrow.svg`} alt="" loading="lazy" decoding="async" />
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
                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
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
                {
                  label: '2024 INTEGRATED ANNUAL REPORT',
                  href: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
                  download: 'Granules_Integrated_Annual_Report_2024-25.pdf',
                },
                {
                  label: 'CORPORATE PRESENTATION',
                  href: '/documents/Earnings-Presentation-Q2FY26-Circulation-fb2ccd8cf24d.pdf',
                  download: 'Granules_Corporate_Presentation.pdf',
                },
                {
                  label: 'PRESS RELEASE',
                  href: '/documents/Press-Release-Q2-FY26-07edcf6db296.pdf',
                  download: 'Granules_Q2_FY26_Press_Release.pdf',
                },
              ].map((item) => (
                <a
                  className="inv-quarterly-item"
                  href={item.href}
                  download={item.download}
                  key={item.label}
                  target="_blank"
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
                  src="/assets/investor-report-cover.webp"
                  alt="Expanding Horizons - 2024 Integrated Annual Report" loading="lazy" decoding="async" />
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
            ) : row.pdf ? (
              <a
                className="inv-data-row"
                href={row.pdf}
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

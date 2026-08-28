import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './gls.css';

const G = '/assets/gls/';

type CapabilityCard = { title: string; image: string; desc: string };

const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title: 'Automated Production',
    image: 'card-automated-production.png',
    desc: 'Advanced robotic formulation and high-speed encapsulation delivering 10 billion oral solid dosages annually.',
  },
  {
    title: 'Lean Process Design',
    image: 'card-lean-process.png',
    desc: 'Optimized material flows, zero-defect quality systems, and shortened supply lead times for regulated global markets.',
  },
  {
    title: 'Digital Oversight',
    image: 'card-digital-oversight.png',
    desc: 'Real-time batch tracking, automated quality control release, and continuous environmental and process monitoring.',
  },
];

export default function GranulesLifeSciencesPage() {
  const {
    swipeProps,
    isDragging,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
  } = useSwipeScroll();
  const [openCard, setOpenCard] = useState(-1);

  useEffect(() => {
    document.title = 'Granules Life Sciences — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Company</span>
        <span className="sep">{'>'}</span>
        <span className="current">Granules life sciences</span>
      </p>
      <h1 className="cp-page-title">Granules Life Sciences</h1>
      <div className="cp-hero-banner">
        <img src={`${G}hero-banner.png`} alt="Granules Life Sciences facility" />
      </div>

      <div className="gls-intro">
        <p>
          <span>Granules Life Sciences (GLS) is a wholly owned subsidiary of Granules India, located in Genome Valley, Hyderabad. GLS is a state-of-the-art vertically integrated manufacturing facility capable of producing 10 billion oral solid dosage (OSD) units annually, </span>
          <span className="muted">approved by the USFDA and with EU GMP certification underway.</span>
        </p>
        <p>
          Strategically designed layout in five acres of land to produce 10 billion oral solid
          dosages/annum with additional 14 acres of land reserved for future expansion—ensuring we
          are equipped to meet growing global demand with speed, flexibility, and compliance. With
          advanced automation, GMP-compliant infrastructure, and green manufacturing systems at
          its core, GLS is built for precision, reliability, and sustained growth.
        </p>
      </div>

      <div className="gls-section">
        <div className="gls-section-head">
          <span className="cp-section-badge">Operational Excellence</span>
          <h2>High-performance formulation manufacturing</h2>
          <p>
            With automated production lines, lean process design, and digital oversight, we
            deliver consistent quality with high throughput and shorter lead time for supplies
            into regulated markets.
          </p>
        </div>
        <div className="biz-carousel" style={{ margin: 0, width: '100%', maxWidth: '100%' }}>
          <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
            {CAPABILITY_CARDS.map((card, idx) => {
              const isOpenCard = openCard === idx;
              return (
                <article
                  className={`biz-card${isOpenCard ? ' is-open' : ''}`}
                  key={card.title}
                  onMouseEnter={() => setOpenCard(idx)}
                  onMouseLeave={() => setOpenCard(-1)}
                  onClick={() => setOpenCard(isOpenCard ? -1 : idx)}
                >
                  <img className="bg" src={`${G}${card.image}`} alt={card.title} />
                  <div className="biz-sheet">
                    <div className="biz-sheet-head">
                      <span className="biz-sheet-title">{card.title}</span>
                      <span className="biz-sheet-symbol" aria-hidden="true">+</span>
                    </div>
                    <div className="biz-sheet-body">
                      <p className="biz-sheet-desc">{card.desc}</p>
                      <span className="biz-sheet-learn">LEARN MORE ↗</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dynamic progress bar and smooth arrow navigation */}
          <div className="biz-carousel-controls" style={{ width: '100%', maxWidth: '100%' }}>
            <div className="biz-progress-track">
              <div
                className="biz-progress-bar"
                style={{
                  width: `${thumbWidth}%`,
                  left: `${scrollProgress * (100 - thumbWidth)}%`,
                }}
              />
            </div>
            <div className="biz-carousel-arrows">
              <button
                type="button"
                className="biz-arrow-btn"
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button
                type="button"
                className="biz-arrow-btn"
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="gls-culture">
        <img className="bg" src={`${G}culture-of-action-bg.png`} alt="" />
        <div className="overlay" />
        <div className="gls-culture-inner">
          <h3>Future-ready and responsible</h3>
          <div className="gls-culture-card">
            <p>
              Built for long-term responsibility, the site integrates sustainable design,
              energy-efficient systems, and advanced safety protocols, ensuring operational
              excellence without compromising environmental or workforce safety standards. GLS
              reflects our commitment to building a future-ready pharmaceutical supply chain.
            </p>
          </div>
        </div>
      </div>

      <div className="gls-cta">
        <img className="bg" src={`${G}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="gls-cta-copy">
          <h2>Advanced technologies for complex formulations</h2>
          <p>
            From immediate to modified release, our advanced technologies drive precision,
            patient compliance, and formulation innovation.
          </p>
        </div>
        <a className="cp-cta-btn" href="/#business">Finished Dosages</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './operational-excellence.css';

const OE = '/assets/oe/';

type CapabilityCard = { title: string; image: string; desc: string };

const KEY_INITIATIVE_CARDS: CapabilityCard[] = [
  {
    title: 'Precision in Motion',
    image: 'card-precision-in-motion.webp',
    desc: 'Automated robotic handling and process intensification reducing manual touchpoints and cycle times.',
  },
  {
    title: 'Engineered for Safety',
    image: 'card-engineered-for-safety.webp',
    desc: 'Zero-harm safety architectures, automated containment, and continuous real-time hazard monitoring.',
  },
  {
    title: 'Visibility Drives Results',
    image: 'card-visibility-drives-results.webp',
    desc: 'Real-time OEE dashboards and digital lean scorecards empowering shop-floor rapid decision-making.',
  },
];

type BeltTier = {
  title: string;
  bullets: string[];
};

const BELT_TIERS: BeltTier[] = [
  {
    title: 'Black Belt : Strategic Change Leader',
    bullets: [
      'Master advanced Lean Six Sigma tools and leadership practices',
      'Drive enterprise-wide transformations with measurable business outcomes',
      'Mentor Green Belts and shape a culture of continuous improvement',
    ],
  },
  {
    title: 'Green Belt : Project Leader',
    bullets: [
      'Dive deeper into the DMAIC methodology',
      'Lead cross-functional projects that improve quality, efficiency, and performance',
      'Use data and statistical analysis to drive meaningful, measurable results',
    ],
  },
  {
    title: 'Yellow Belt : Team Contributor',
    bullets: [
      'Receive hands-on training in practical problem-solving tools',
      'Actively support Green and Black Belt projects',
      'Learn application of Lean Six Sigma in daily operations to make a real impact',
    ],
  },
  {
    title: 'White Belt : Foundation Awareness',
    bullets: [
      'Gain a foundational understanding of Lean Six Sigma principles',
      'Learn to recognize waste elimination opportunities and process improvement',
      'Understand how Lean Six Sigma contributes to customer value and patient safety',
    ],
  },
];

export default function OperationalExcellencePage() {
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
  const [activeBelt, setActiveBelt] = useState<number>(0);

  useEffect(() => {
    document.title = 'Operational Excellence — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/company">ABOUT US</Link>
        <span className="sep">›</span>
        <span className="current">OPERATIONAL EXCELLENCE</span>
      </p>
      <h1 className="cp-page-title">Operational excellence</h1>
      <div className="cp-hero-banner">
        <img src={`${OE}hero-banner.webp`} alt="Granules operational excellence" loading="eager" decoding="async" />
      </div>

      <div className="oe-intro">
        <p>
          Embedding a culture of continuous improvement, Granules redefines operational excellence
          through a people-first, data-driven, and tech-enabled approach. Every enhancement
          <span className="muted">, from the shop floor to enterprise systems, is designed to improve precision, reduce waste, and create sustainable value.</span>
        </p>
        <p>
          Employees are trained and empowered to solve problems, challenge assumptions, and
          deliver measurable results. A tiered, role-based training framework ensures lean
          thinking is applied in real-time through live and function-specific projects, building a
          culture of high performance across the organisation.
        </p>
      </div>

      <div className="oe-section">
        <div className="oe-section-head">
          <span className="cp-section-badge">Key Initiatives</span>
          <h2>Where technology and people drive sustainable performance</h2>
          <p>
            Automation, data analytics, and Lean Six Sigma combine to elevate quality, minimize
            waste, and accelerate decision-making across all manufacturing operations.
          </p>
        </div>
        <div className="biz-carousel" style={{ margin: 0, width: '100%', maxWidth: '100%' }}>
          <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
            {KEY_INITIATIVE_CARDS.map((card, idx) => {
              const isOpenCard = openCard === idx;
              return (
                <article
                  className={`biz-card${isOpenCard ? ' is-open' : ''}`}
                  key={card.title}
                  onMouseEnter={() => setOpenCard(idx)}
                  onMouseLeave={() => setOpenCard(-1)}
                  onClick={() => setOpenCard(isOpenCard ? -1 : idx)}
                >
                  <img className="bg" src={`${OE}${card.image}`} alt={card.title} loading="lazy" decoding="async" />
                  <div className="biz-sheet">
                    <div className="biz-sheet-head">
                      <span className="biz-sheet-title">{card.title}</span>
                      <span className="biz-sheet-symbol" aria-hidden="true">+</span>
                    </div>
                    <div className="biz-sheet-body">
                      <p className="biz-sheet-desc">{card.desc}</p>
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

      <div className="oe-frontline">
        <h3>Lean at the frontline</h3>
        <div className="oe-frontline-card">
          <p>
            Our Lean Daily Management System (LDMS) brings clarity and focus to the frontline
            through visual controls, tiered huddles, and daily Gemba walks, embedding
            accountability and momentum into daily workflows. This system builds momentum and
            makes continuous improvement everyone&rsquo;s responsibility.
          </p>
        </div>
      </div>

      <div className="oe-impact">
        <div className="oe-impact-copy">
          <h2>Driving Measurable Impact</h2>
          <p>
            Teams drive continuous improvement in safety, quality, delivery, and morale. We
            empower employees through Kaizen and Lean Six Sigma certification to cultivate leaders
            who enhance quality, efficiency, and patient safety.
          </p>
          <div className="oe-belts">
            {BELT_TIERS.map((belt, index) => {
              const isOpen = activeBelt === index;
              return (
                <div
                  key={belt.title}
                  className={`oe-belt-item${isOpen ? ' is-active' : ''}`}
                  onClick={() => setActiveBelt(isOpen ? -1 : index)}
                >
                  <div className="oe-belt-head">
                    <span className="oe-belt-title">{belt.title}</span>
                    <span className="oe-belt-toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="oe-belt-content">
                      <ul className="oe-belt-bullets">
                        {belt.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="oe-pyramid-wrap">
          <img src={`${OE}belt-pyramid.svg`} alt="OE belt program pyramid: White, Yellow, Green, Black" loading="lazy" decoding="async" />
          {BELT_TIERS.map((belt, index) => {
            const isOpen = activeBelt === index;
            return (
              <button
                key={belt.title}
                type="button"
                className={`oe-pyramid-btn oe-pyramid-btn--${index}${isOpen ? ' is-active' : ''}`}
                onClick={() => setActiveBelt(isOpen ? -1 : index)}
                aria-label={`Select ${belt.title}`}
              >
                {isOpen ? '−' : '+'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="oe-cta">
        <div className="oe-cta-copy">
          <h2>Celebrating our achievements</h2>
          <p>
            From breakthrough innovations to sustainable practices, these accolades highlight our
            pursuit of progress.
          </p>
        </div>
        <Link className="cp-cta-btn" to="/company/awards">AWARDS</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

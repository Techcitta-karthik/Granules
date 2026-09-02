import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './sustainability.css';
import './overview.css';

const S = '/assets/sustainability/';

const PILLARS = [
  {
    key: 'environment',
    title: 'Environment Stewardship',
    desc: 'Driving clean energy adoption, water conservation, and waste circularity to minimize our footprint.',
    image: 'card-environment.webp',
    color: '#008714',
    bgGradient: 'linear-gradient(180deg, #008714 0%, #00a819 100%)',
    iconColor: '#008714',
  },
  {
    key: 'social',
    title: 'Breaking Barriers',
    desc: 'Empowering our people through safe workplaces, diversity, and community development.',
    image: 'card-breaking-barriers.webp',
    color: '#0061f8',
    bgGradient: 'linear-gradient(180deg, #0061f8 0%, #004ecc 100%)',
    iconColor: '#0061f8',
  },
  {
    key: 'governance',
    title: 'Integrity in Action',
    desc: 'Operate with integrity, transparency, and a policy-backed governance structure.',
    image: 'card-integrity.webp',
    color: '#7248f5',
    bgGradient: 'linear-gradient(180deg, #7248f5 0%, #5f33e6 100%)',
    iconColor: '#7248f5',
  },
];

type GoalPeriod = {
  id: string;
  yearLabel: string;
  peekLabel: string;
  image: string;
  isDynamic: boolean;
  staticTitle?: string;
  stats?: { value: string; label: string }[];
};

const GOAL_PERIODS: GoalPeriod[] = [
  {
    id: '2030',
    yearLabel: 'By 2030',
    peekLabel: '2030',
    image: 'goal-2030-image.webp',
    isDynamic: true,
    stats: [
      { value: '42%', label: 'REDUCTION IN SCOPE 1 AND 2 EMISSIONS' },
      { value: '42%', label: 'CUT IN SCOPE 3 EMISSIONS' },
      { value: '100%', label: 'SOURCING OF RENEWABLE ELECTRICITY' },
      { value: 'Zero', label: 'WASTE TO LANDFILL ACHIEVEMENT' },
      { value: '1million+', label: 'LIVES IMPACTED THROUGH CSR PROGRAMS' },
      { value: 'Gender', label: 'PAY PARITY ATTAINED' },
      { value: '100%', label: "INCREASE IN WOMEN'S EMPLOYMENT ACHIEVED" },
    ],
  },
  {
    id: '2032',
    yearLabel: 'By 2032',
    peekLabel: '2032',
    image: 'goal-2032-image.webp',
    isDynamic: false,
    staticTitle: 'Achieve Water Positivity',
  },
  {
    id: '2050',
    yearLabel: 'By 2050',
    peekLabel: '2050',
    image: 'goal-2050-image.webp',
    isDynamic: false,
    staticTitle: 'Reach Net Zero Emission',
  },
];

type JourneyMilestone = {
  year: string;
  image: string;
  items: string[];
};

const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: '2008',
    image: 'journey-2023.webp',
    items: [
      'Initiated enterprise-wide green pharma manufacturing benchmarks across core production units.',
      'Installed advanced wastewater treatment and Zero Liquid Discharge (ZLD) infrastructure.',
    ],
  },
  {
    year: '2020',
    image: 'journey-2024.webp',
    items: [
      'Formalized Board-level ESG governance charter and dedicated Sustainability Committee.',
      'Established 2030 sustainability roadmap aligned with UN Sustainable Development Goals (SDGs).',
    ],
  },
  {
    year: '2023',
    image: 'journey-2023.webp',
    items: [
      'Conducted comprehensive GHG inventorization across the value chain, including subsidiaries.',
      'Submitted SBTi net-zero commitment and established UNGC partnership.',
      'Completed Product Carbon Footprint (PCF) analysis for 65% of sales.',
      'Advanced the supplier sustainability program.',
    ],
  },
  {
    year: '2024',
    image: 'journey-2024.webp',
    items: [
      'Achieved SBTi validation for near- and long-term goals, aligned with the 1.5°C pathway to reach Net Zero by 2050 or sooner.',
      'Commissioned 1 MW on-site rooftop solar installation at the Gagillapur unit.',
    ],
  },
  {
    year: '2025',
    image: 'journey-2025.webp',
    items: [
      'Received Gold rating from EcoVadis in our first corporate-wide assessment.',
      'Improved CDP Climate score to "B" and earned an "A" on CDP\'s 2024 Supplier Engagement Assessment (SEA).',
      'Joined the Pharmaceutical Supply Chain Initiative (PSCI) to support responsible, sustainable supply chains.',
    ],
  },
];

function SustainabilityJourneyCarousel() {
  const [activeIdx, setActiveIdx] = useState(2); // default to 2023

  const current = JOURNEY_MILESTONES[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + JOURNEY_MILESTONES.length) % JOURNEY_MILESTONES.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % JOURNEY_MILESTONES.length);
  };

  return (
    <div className="ov-journey">
      <h2>Our journey</h2>

      {/* Stage with Left/Right Giant Outline Watermarks & Center Card */}
      <div className="ov-journey-stage">
        <span className="ov-journey-watermark ov-journey-watermark--left" aria-hidden="true">
          {current.year}
        </span>

        <article className="ov-journey-card" key={current.year}>
          <div className="ov-journey-media">
            <img src={`${S}${current.image}`} alt={`Granules sustainability journey ${current.year}`} loading="lazy" decoding="async" />
          </div>

          <ul className="ov-journey-list">
            {current.items.map((item, i) => (
              <li className="ov-journey-item" key={i}>
                <svg className="ov-journey-bullseye" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#197b0c" strokeWidth="2.2" />
                  <circle cx="12" cy="12" r="4.5" fill="#197b0c" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <span className="ov-journey-watermark ov-journey-watermark--right" aria-hidden="true">
          {current.year}
        </span>
      </div>

      {/* Navigation Arrows */}
      <div className="ov-journey-nav">
        <button
          type="button"
          className="ov-journey-nav-btn"
          onClick={handlePrev}
          aria-label="Previous milestone"
        >
          ‹
        </button>
        <button
          type="button"
          className="ov-journey-nav-btn"
          onClick={handleNext}
          aria-label="Next milestone"
        >
          ›
        </button>
      </div>

      {/* Bottom Timeline with filled active progress */}
      <div className="ov-journey-timeline">
        <div className="ov-timeline-line">
          <div
            className="ov-timeline-progress"
            style={{ width: `${(activeIdx / (JOURNEY_MILESTONES.length - 1)) * 100}%` }}
          />
        </div>

        <div className="ov-timeline-nodes">
          {JOURNEY_MILESTONES.map((m, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={m.year}
                type="button"
                className={`ov-timeline-node${isActive ? ' active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Go to year ${m.year}`}
              >
                <span className="ov-node-year">{m.year}</span>
                <span className="ov-node-dot" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SustainabilityGoalsCarousel() {
  const [periodIdx, setPeriodIdx] = useState(0); // 0: 2030, 1: 2032, 2: 2050
  const [statIdx, setStatIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentPeriod = GOAL_PERIODS[periodIdx];
  const stats = currentPeriod.stats || [];
  const numStats = stats.length;

  // Auto-advance metric every 2 seconds only when active card is dynamic (2030)
  useEffect(() => {
    if (isPaused || !currentPeriod.isDynamic || numStats <= 1) return undefined;
    const interval = setInterval(() => {
      setStatIdx((prev) => (prev + 1) % numStats);
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, [isPaused, numStats, periodIdx, currentPeriod.isDynamic]);

  const handlePeriodChange = (newIdx: number) => {
    setPeriodIdx(newIdx);
    setStatIdx(0);
  };

  // Left peek is previous, right peek is next
  const prevPeriodIdx = (periodIdx - 1 + GOAL_PERIODS.length) % GOAL_PERIODS.length;
  const nextPeriodIdx = (periodIdx + 1) % GOAL_PERIODS.length;

  const currentStat = stats[statIdx] || stats[0];

  return (
    <div
      className="ov-goals"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2>Our sustainability goals</h2>

      <div className="ov-goals-slider">
        {/* Left Peek Card */}
        <button
          type="button"
          className="ov-goal-peek ov-goal-peek--left"
          onClick={() => handlePeriodChange(prevPeriodIdx)}
          aria-label={`View ${GOAL_PERIODS[prevPeriodIdx].yearLabel}`}
        >
          <span>{GOAL_PERIODS[prevPeriodIdx].peekLabel}</span>
        </button>

        {/* Center Active Goal Card */}
        <div className="ov-goal-card">
          <div className="ov-goal-copy">
            <h3>{currentPeriod.yearLabel}</h3>

            {currentPeriod.isDynamic && currentStat ? (
              <>
                <div className="ov-goal-stat-wrap" key={`${currentPeriod.id}-${statIdx}`}>
                  <p className="ov-goal-stat-val">{currentStat.value}</p>
                  <p className="ov-goal-stat-lbl">{currentStat.label}</p>
                </div>

                {/* Multi-segment progress bar for all stats */}
                <div className="ov-goal-segments" aria-label={`${currentPeriod.yearLabel} metrics`}>
                  {stats.map((stat, idx) => (
                    <button
                      key={stat.label + idx}
                      type="button"
                      className={`ov-goal-seg${idx === statIdx ? ' active' : ''}`}
                      onClick={() => {
                        setStatIdx(idx);
                        setIsPaused(true);
                      }}
                      title={`${stat.value}: ${stat.label}`}
                      aria-label={`View metric ${idx + 1}: ${stat.label}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <h4 className="ov-goal-static-title" key={currentPeriod.id}>
                {currentPeriod.staticTitle}
              </h4>
            )}
          </div>

          <div className="ov-goal-image">
            <img key={currentPeriod.image} src={`${S}${currentPeriod.image}`} alt={currentPeriod.yearLabel} loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Right Peek Card */}
        <button
          type="button"
          className="ov-goal-peek ov-goal-peek--right"
          onClick={() => handlePeriodChange(nextPeriodIdx)}
          aria-label={`View ${GOAL_PERIODS[nextPeriodIdx].yearLabel}`}
        >
          <span>{GOAL_PERIODS[nextPeriodIdx].peekLabel}</span>
        </button>
      </div>

      {/* Navigation Arrows */}
      <div className="ov-goals-nav">
        <button
          type="button"
          className="ov-goals-nav-btn"
          onClick={() => handlePeriodChange(prevPeriodIdx)}
          aria-label="Previous goal period"
        >
          ‹
        </button>
        <button
          type="button"
          className="ov-goals-nav-btn"
          onClick={() => handlePeriodChange(nextPeriodIdx)}
          aria-label="Next goal period"
        >
          ›
        </button>
      </div>
    </div>
  );
}

const PARTNERSHIP_TABS = [
  {
    label: 'OUR COMMITMENT',
    logos: [
      { img: 'logo-sbt.webp', name: 'Science Based Targets initiative' },
      { img: 'logo-2.webp', name: 'UN Global Compact' },
      { img: 'logo-psci.webp', name: 'PSCI' },
      { img: 'logo-scan.webp', name: 'SCAN' },
    ],
  },
  {
    label: 'RATINGS AND CERTIFICATIONS',
    logos: [
      { img: 'logo-ecovadis.svg', name: 'EcoVadis Gold' },
      { img: 'logo-cdp-discloser.svg', name: 'CDP Discloser 2024' },
      { img: 'logo-cdp-supplier.svg', name: 'CDP Supplier Engagement Leader' },
      { img: 'logo-gptw.svg', name: 'Great Place To Work' },
      { img: 'logo-sp-global.svg', name: 'S&P Global CSA Score' },
      { img: 'logo-msci-esg.svg', name: 'MSCI ESG Ratings BBB' },
    ],
  },
  {
    label: 'MEMBERSHIP AND ASSOCIATIONS',
    logos: [
      { img: 'logo-wef-telangana.svg', name: 'World Economic Forum C4IR Telangana' },
      { img: 'logo-cii.svg', name: 'Confederation of Indian Industry' },
      { img: 'logo-bdmai.svg', name: 'BDMAI' },
      { img: 'logo-british-safety.svg', name: 'British Safety Council' },
      { img: 'logo-esg-world.svg', name: 'ESG World' },
      { img: 'logo-ftapcci.svg', name: 'FTAPCCI' },
      { img: 'logo-green-triangle.svg', name: 'Green Triangle Society' },
    ],
  },
  {
    label: 'COLLABORATION PLATFORMS',
    logos: [
      { img: 'logo-project-gigaton.svg', name: 'Project Gigaton' },
      { img: 'logo-sedex-smeta.svg', name: 'Sedex SMETA' },
      { img: 'logo-manufacture-2030.svg', name: 'Manufacture 2030' },
    ],
  },
];

export default function SustainabilityOverviewPage() {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [partnershipTab, setPartnershipTab] = useState(0);

  useEffect(() => {
    document.title = 'Sustainability Overview — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Sustainability Overview</span>
      </p>
      <h1 className="cp-page-title">One planet. One purpose.</h1>
      <div className="cp-hero-banner">
        <img src={`${S}hero-banner.webp`} alt="Granules solar sustainability" loading="eager" decoding="async" />
      </div>

      <div className="sus-intro">
        <p>
          Guided by our vision of healing lives responsibly through pioneering green science, we
          drive innovation that balances environmental stewardship, social impact,{' '}
          <span className="muted">and business excellence—building a future-ready pharmaceutical industry.</span>
        </p>
      </div>

      <div className="sus-section-head">
        <div className="copy">
          <span className="cp-section-badge">Our ESG Pillars</span>
          <h2>Leading with green science and responsible growth</h2>
        </div>
        <a className="cp-cta-btn" href="/sustainability/strategy">Explore ESG Strategy</a>
      </div>

      {/* Interactive ESG Pillars: Smooth sliding drawer flow matching homepage product cards */}
      <div
        className="sus-pillar-grid"
        onMouseLeave={() => setActivePillar(null)}
      >
        {PILLARS.map((pillar, index) => {
          const isOpen = activePillar === index;
          return (
            <article
              key={pillar.key}
              className={`sus-pillar-card sus-pillar--${pillar.key}${isOpen ? ' is-open' : ''}`}
              onMouseEnter={() => setActivePillar(index)}
              onMouseLeave={() => setActivePillar(null)}
              onClick={() => setActivePillar((prev) => (prev === index ? null : index))}
              onFocus={() => setActivePillar(index)}
              onBlur={() => setActivePillar(null)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePillar((prev) => (prev === index ? null : index));
                }
              }}
              aria-expanded={isOpen}
            >
              {/* Background Photo with smooth scale */}
              <div className="sus-pillar-img-wrap">
                <img className="sus-pillar-bg" src={`${S}${pillar.image}`} alt={pillar.title} loading="lazy" decoding="async" />
              </div>

              {/* Smooth Bottom Sliding Sheet (Matching product card flow) */}
              <div
                className="sus-pillar-sheet"
                style={{ background: pillar.bgGradient }}
              >
                <div className="sus-pillar-sheet-head">
                  <span className="sus-pillar-sheet-title">{pillar.title}</span>
                  <span
                    className="sus-pillar-symbol"
                    style={{ color: pillar.iconColor }}
                    aria-hidden="true"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </div>

                <div className="sus-pillar-sheet-body">
                  <p className="sus-pillar-sheet-desc">{pillar.desc}</p>
                  <a className="sus-pillar-learn" href="/sustainability/strategy">
                    <span>LEARN MORE</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Sustainability Goals Interactive Carousel with 2-second metric auto-rotation */}
      <SustainabilityGoalsCarousel />

      <h2 style={{ margin: 'clamp(60px, 8vw, 90px) auto clamp(24px, 3vw, 40px)', width: '85%', font: "500 clamp(28px, 4vw, 50px)/1.1 'Manrope', sans-serif", color: 'var(--n9)' }}>
        Leadership commitment
      </h2>
      <div className="ov-leadership">
        <img className="ov-leadership-bg" src={`${S}leadership-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="ov-leadership-overlay" />
        <img className="ov-leadership-person" src={`${S}leadership-portrait.webp`} alt="Dr. Krishna Prasad Chigurupati" loading="lazy" decoding="async" />
        <div className="ov-quote-card">
          <div className="ov-quote-mark">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="#0061f8">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="ov-quote-text">
            The pharmaceutical industry has a dual responsibility: to heal lives and the planet.
            At Granules, sustainability is not an add-on. It is the core of our business.
          </p>
          <p className="ov-quote-name">Dr. Krishna Prasad Chigurupati</p>
          <p className="ov-quote-role">CHAIRMAN AND MANAGING DIRECTOR</p>
        </div>
      </div>

      {/* Our Journey Timeline Section with Giant Outline Watermarks */}
      <SustainabilityJourneyCarousel />

      <div className="ov-partnerships">
        <h2>Partnerships, collaborations and ratings</h2>
        <div className="ov-p-tabs">
          {PARTNERSHIP_TABS.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              className={`ov-p-tab${index === partnershipTab ? ' active' : ''}`}
              onClick={() => setPartnershipTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="ov-logo-grid">
          {PARTNERSHIP_TABS[partnershipTab].logos.map((logo) => (
            <div className="ov-logo-tile" key={logo.img}>
              <img src={`${S}${logo.img}`} alt={logo.name} loading="eager" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      <div className="sus-cta">
        <img className="bg" src={`${S}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="sus-cta-copy">
          <h2>Building a sustainable tomorrow</h2>
          <p>
            Sustainability is central to Granules&rsquo; strategy, integrating science, people,
            and planet to drive long-term, responsible growth.
          </p>
        </div>
        <a className="cp-cta-btn" href="/sustainability/strategy">Sustainability Strategy</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

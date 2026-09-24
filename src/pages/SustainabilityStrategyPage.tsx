import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter, StockVideoBanner } from '../components/company';
import '../components/company/company.css';
import '../pages/business.css';
import './sustainability.css';
import './strategy.css';

const S = '/assets/strategy/';

type MetricItem = {
  value: string;
  label: string;
  image?: string;
};

type PillarConfig = {
  key: string;
  badge: string;
  title: string;
  color: string;
  bg: string;
  layout: 'left' | 'right';
  metrics: MetricItem[];
};

const PILLAR_CONFIGS: PillarConfig[] = [
  {
    key: 'environment',
    badge: 'Environment',
    title: 'Environmental Stewardship Beyond Limits',
    color: '#197b0c',
    bg: '#eefff1',
    layout: 'left',
    metrics: [
      {
        value: '32%',
        label: 'Absolute reduction in GHG emissions (Scope 1 & 2) compared to base year FY23',
        image: 'pillar-environment.webp',
      },
      {
        value: '82,735 MWh',
        label: 'Electricity Consumed',
        image: '',
      },
      {
        value: '69%',
        label: 'Electricity from renewable sources (PPA, rooftop solar, I-RECs)',
        image: '',
      },
      {
        value: '1 MW',
        label: 'Installed rooftop solar capacity at Gagillapur',
        image: '',
      },
      {
        value: '881 TJ',
        label: 'Energy Consumed',
        image: '',
      },
      {
        value: '24%',
        label: 'Total energy sourced from renewables',
        image: '',
      },
      {
        value: '2,16,823 KL',
        label: 'Water Consumed',
        image: '',
      },
      {
        value: '44%',
        label: 'Wastewater recycled and reused',
        image: '',
      },
      {
        value: '80%',
        label: 'Hazardous waste safely co-processed',
        image: '',
      },
    ],
  },
  {
    key: 'social',
    badge: 'Social',
    title: 'Breaking Barriers',
    color: '#0061f8',
    bg: '#ebf9ff',
    layout: 'right',
    metrics: [
      {
        value: '6,166',
        label: 'Total Workforce',
        image: 'pillar-social.webp',
      },
      {
        value: '100%',
        label: 'Increase in women’s employment achieved across operational units',
        image: '',
      },
      {
        value: '1 million+',
        label: 'Lives impacted through comprehensive CSR and community health programs',
        image: '',
      },
      {
        value: 'Gender',
        label: 'Pay parity attained across all operational and management levels',
        image: '',
      },
      {
        value: '0',
        label: 'Fatalities and high-consequence work-related injuries',
        image: '',
      },
      {
        value: '100%',
        label: 'Employees and contract workforce trained on safety, health and ESG standards',
        image: '',
      },
    ],
  },
  {
    key: 'governance',
    badge: 'Governance',
    title: 'Integrity in Action',
    color: '#7248f5',
    bg: '#f4f0ff',
    layout: 'left',
    metrics: [
      {
        value: '25%',
        label: 'Representation of women on the Board',
        image: 'pillar-governance.webp',
      },
      {
        value: '100%',
        label: 'Independent Audit and Nomination & Remuneration Committees oversight',
        image: '',
      },
      {
        value: 'Zero',
        label: 'Tolerance for corruption, bribery, fraud or ethics violations',
        image: '',
      },
      {
        value: '100%',
        label: 'Operations assessed for ESG risks, compliance, and material impact',
        image: '',
      },
      {
        value: 'SBTi',
        label: 'Aligned Net Zero roadmap by 2050 validated and underway',
        image: '',
      },
      {
        value: '65%',
        label: 'Of commercialized products have verified Product Carbon Footprint data',
        image: '',
      },
    ],
  },
];

const CARBON_STATS = [
  {
    value: '80%',
    label: 'OF EMISSIONS ARE SCOPE 3 (RAW MATERIALS, LOGISTICS, AND SUPPLY CHAIN) ACTIVELY TRACKED AND MANAGED',
  },
  {
    value: '65%',
    label: 'OF PRODUCTS HAVE VERIFIED CARBON FOOTPRINT DATA',
  },
  {
    value: 'Supplier',
    label: 'CARBON ASSESSMENTS EMBEDDED IN SOURCING',
  },
  {
    value: 'SBTi',
    label: 'ALIGNED NET ZERO ROADMAP BY 2050 UNDERWAY',
  },
];

type GreenItem = { title: string; body?: string; tags?: string[]; icon?: string };

const GREEN_ITEMS: GreenItem[] = [
  {
    title: 'CZRO: India’s Green Pharma Manufacturing Hub',
    body: 'First-of-its-kind green pharmaceutical manufacturing hub powered 100% by renewable energy and green molecules including hydrogen, ammonia, and methanol, built with circularity-first design principles.',
    tags: ['100% Renewable Energy', 'Circularity-first Design', 'Green Molecules: H2, NH3, MeOH'],
    icon: '/assets/strategy/icon-windmill.svg',
  },
  {
    title: 'Green Chemistry Innovation',
    body: 'Pioneering enzymatic catalysis, solvent recovery, and atom-efficient synthesis pathways to minimize chemical waste and eliminate hazardous effluents at the source.',
    tags: ['Enzymatic Catalysis', 'Solvent Recovery & Reduction', 'Atom-Efficient Synthesis'],
    icon: '/assets/fd/icon-test-tube.svg',
  },
  {
    title: 'Sustainable Formulations & Packaging',
    body: 'Designing low-carbon oral solid dosage delivery systems, utilizing bio-based excipients, and transitioning to 100% recyclable blister and secondary packaging materials.',
    tags: ['Low-Carbon Formulations', 'Bio-based Excipients', 'Recyclable Packaging'],
    icon: '/assets/fd/icon-box.svg',
  },
];

function CarbonStatsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CARBON_STATS.length);
    }, 3000); // changes every 3 seconds

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentStat = CARBON_STATS[activeIdx];

  return (
    <div
      className="strat-carbon"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="strat-carbon-copy">
        <h2>From carbon footprint to carbon-free</h2>
      </div>

      <div className="strat-carbon-stats">
        <div className="strat-carbon-stat-content" key={activeIdx}>
          <p className="strat-carbon-value">{currentStat.value}</p>
          <p className="strat-carbon-label">{currentStat.label}</p>
        </div>

        {/* 4 horizontal progress segment bars */}
        <div className="strat-carbon-segments" aria-label="Carbon metrics segments">
          {CARBON_STATS.map((stat, idx) => (
            <button
              key={stat.label}
              type="button"
              className={`strat-carbon-seg${idx === activeIdx ? ' active' : ''}`}
              onClick={() => {
                setActiveIdx(idx);
                setIsPaused(true);
              }}
              title={`${stat.value}: ${stat.label}`}
              aria-label={`View slide ${idx + 1}: ${stat.value}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PillarStackCard({ pillar, index }: { pillar: PillarConfig; index: number }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentMetric = pillar.metrics[activeIdx] || pillar.metrics[0];

  return (
    <article
      className={`sus-stack-card sus-stack-card--${index} sus-stack-card--${pillar.layout}`}
      style={{
        background: pillar.bg,
        color: pillar.color,
      }}
    >
      <div className="sus-card-copy">
        <span className="sus-card-badge" style={{ borderColor: pillar.color, color: pillar.color }}>
          {pillar.badge}
        </span>
        <h3 className="sus-card-title">{pillar.title}</h3>

        <div className="sus-card-stat-wrap" key={`${pillar.key}-${activeIdx}`}>
          <p className="sus-card-stat-val">{currentMetric.value}</p>
          <p className="sus-card-stat-lbl">{currentMetric.label}</p>
        </div>

        {/* Multi-segment pagination bar */}
        <div className="sus-card-segments" aria-label={`${pillar.badge} metric segments`}>
          {pillar.metrics.map((metric, idx) => (
            <button
              key={metric.label + idx}
              type="button"
              className={`sus-card-seg${idx === activeIdx ? ' active' : ''}`}
              style={{ color: pillar.color }}
              onClick={() => setActiveIdx(idx)}
              title={`${metric.value}: ${metric.label}`}
              aria-label={`View metric ${idx + 1}: ${metric.label}`}
            />
          ))}
        </div>
      </div>

      <div className="sus-card-media">
        {currentMetric.image ? (
          <img
            key={currentMetric.image}
            className="sus-card-img"
            src={`${S}${currentMetric.image}`}
            alt={currentMetric.label} loading="lazy" decoding="async" />
        ) : (
          <div className="sus-card-img-blank" style={{ color: pillar.color }}>
            <svg
              className="sus-blank-icon"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="sus-blank-text">Photo Placeholder</span>
            <span className="sus-blank-sub">{currentMetric.label}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default function SustainabilityStrategyPage() {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    document.title = 'Sustainability Strategy — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/sustainability">SUSTAINABILITY</Link>
        <span className="sep">›</span>
        <span className="current">SUSTAINABILITY STRATEGY</span>
      </p>

      <h1 className="cp-page-title">Sustainability strategy</h1>

      {/* 
        STOCK VIDEO PLACEHOLDER SECTION:
        - Rendered with autoplay loop muted video playback & fallback windmill poster.
        - You can replace 'videoSrc' with your custom video file anytime (e.g. /assets/strategy/my-video.mp4).
      */}
      <StockVideoBanner
        videoSrc="/Video/cover-video.mp4"
        posterSrc="/assets/strategy/hero-video-poster.webp"
        alt="Granules Sustainability Strategy - Clean Energy Windmills"
        targetScrollSelector=".sus-intro"
      />

      <div className="sus-intro">
        <p>
          At Granules, sustainability is embedded into every molecule we develop, every factory
          we build, and every partnership we forge. Built for impact and innovation, our strategy
          aligns with global ESG standards, paving the way for a Net Zero pharmaceutical future
          that values people, planet, and progress.
        </p>
        <p className="muted" style={{ marginTop: 16 }}>
          Committed to sustainable pharmaceutical manufacturing, Granules integrates ESG deep into
          the supply chain to reduce carbon footprint, mitigate risks, and support responsible
          sourcing goals. Backed by Board-level oversight and aligned with global standards like
          SBTi, GRI, and UNGC, we collaborate with academia, governments, and grassroots
          organizations to scale sustainable solutions &mdash; from clean energy adoption to
          inclusive employment and transparent governance. Transparent ESG tracking across all
          operations, including subsidiaries, ensures accountability and momentum toward Net Zero.
        </p>
      </div>

      <div className="sus-section-head">
        <div className="copy">
          <h2>Our strategic framework</h2>
        </div>
        <a className="cp-cta-btn" href="/sustainability/esg-in-action">ESG Delivery in Action</a>
      </div>

      {/* Interactive Stacking Pillar Cards matching the design mockup */}
      <div className="sus-stack-wrap">
        {PILLAR_CONFIGS.map((pillar, index) => (
          <PillarStackCard key={pillar.key} pillar={pillar} index={index} />
        ))}
      </div>

      {/* Green science in motion section (moved UP) */}
      <div className="biz-panel" style={{ marginTop: 'clamp(60px, 8vw, 90px)' }}>
        <img className="bg" src={`${S}green-science-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="biz-panel-grid">
          <div className="biz-panel-head">
            <h2>Green science in motion</h2>
            <p>
              Granules is reinventing pharmaceutical manufacturing to be low-emission, low-waste,
              and high-precision, without compromising quality or scalability.
            </p>
          </div>
          <div className="biz-accordion">
            {GREEN_ITEMS.map((item, index) => {
              const isOpen = open === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  className={`biz-accordion-item${isOpen ? '' : ' collapsed'}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <div className="biz-accordion-head">
                    <div className="biz-accordion-icon-row">
                      {item.icon && (
                        <span className="biz-accordion-icon">
                          <img src={item.icon} alt="" loading="lazy" decoding="async" />
                        </span>
                      )}
                      <p className="biz-accordion-title">{item.title}</p>
                    </div>
                    <span className="biz-accordion-toggle">
                      <img src={`${S}${isOpen ? 'icon-minus.svg' : 'icon-plus.svg'}`} alt="" loading="lazy" decoding="async" />
                    </span>
                  </div>
                  {isOpen && item.body && <p className="biz-accordion-body">{item.body}</p>}
                  {isOpen && item.tags && (
                    <div className="strat-tags" style={{ paddingLeft: '58px', marginTop: '6px' }}>
                      {item.tags.map((tag) => (
                        <span className="strat-tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4-page auto-rotating Carbon Stats Carousel (3-second rotation, moved DOWN) */}
      <CarbonStatsCarousel />

      <div className="sus-cta">
        <img className="bg" src={`${S}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="sus-cta-copy">
          <h2>Reimagining pharma for a carbon-free future</h2>
          <p>
            Granules CZRO is driving Net Zero transformation through green molecules, renewable
            energy, and circular pharmaceutical manufacturing.
          </p>
        </div>
        <a className="cp-cta-btn" href="/company/granules-czro">Discover CZRO</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

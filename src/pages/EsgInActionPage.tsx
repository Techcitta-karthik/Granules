import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './sustainability.css';
import './esg.css';

const S = '/assets/esg/';

const PILLAR_NAV = [
  { id: 'environment', label: 'Environment' },
  { id: 'social', label: 'Social' },
  { id: 'governance', label: 'Governance' },
];

type EnvSubTabItem = {
  tabLabel: string;
  title: string;
  desc: string;
  statValue: string;
  statUnit?: string;
  statLabel: string;
  image: string;
};

const ENV_TABS_DATA: EnvSubTabItem[] = [
  {
    tabLabel: 'GHG EMISSIONS',
    title: 'GHG EMISSIONS',
    desc: 'Granules is decoupling emissions from production, building a future-proof, low-carbon pharma platform.',
    statValue: '32.2%',
    statLabel: 'ABSOLUTE REDUCTION IN SCOPE 1 & 2 EMISSIONS SINCE FY23',
    image: 'hero-banner.png',
  },
  {
    tabLabel: 'WATER MANAGEMENT',
    title: 'WATER MANAGEMENT',
    desc: 'We design for water reuse and track every drop across plants, R&D, and offices.',
    statValue: '2,16,823',
    statUnit: 'KL',
    statLabel: 'TOTAL FRESHWATER USE IN FY25',
    image: 'esg-water.png',
  },
  {
    tabLabel: 'WASTE MANAGEMENT',
    title: 'WASTE MANAGEMENT',
    desc: 'Circularity is built into operations, from raw material selection to post-production disposal.',
    statValue: '100%',
    statLabel: 'NON-HAZARDOUS WASTE REUSED OR RECYCLED',
    image: 'esg-waste.png',
  },
  {
    tabLabel: 'BIODIVERSITY MANAGEMENT',
    title: 'BIODIVERSITY MANAGEMENT',
    desc: 'We seek opportunities to collaborate with environmental organizations and community-based programs to increase our positive impact.',
    statValue: '15,000',
    statLabel: 'NATIVE SAPLINGS PLANTED IN TELANGANA',
    image: 'esg-biodiversity.png',
  },
];

const SOCIAL_SUB_TABS = ['Learning and Development', 'Community'];

const GOVERNANCE_STATS = [
  { value: '98.6%', label: 'Board meeting attendance' },
  { value: '06', label: 'Independent directors' },
  { value: '03', label: 'Women on the Board' },
  { value: 'ZERO', label: 'Product recalls' },
  { value: 'ZERO', label: 'Cybersecurity complaints' },
];

export default function EsgInActionPage() {
  const [activePillar, setActivePillar] = useState<'environment' | 'social' | 'governance'>('environment');
  const [envTabIndex, setEnvTabIndex] = useState(3);
  const [govStatIdx, setGovStatIdx] = useState(0);
  const [isGovPaused, setIsGovPaused] = useState(false);

  useEffect(() => {
    document.title = 'ESG in Action — Granules India';
    window.scrollTo(0, 0);
  }, []);

  // Auto-advance governance stats every 2.5s
  useEffect(() => {
    if (isGovPaused) return undefined;
    const timer = setInterval(() => {
      setGovStatIdx((prev) => (prev + 1) % GOVERNANCE_STATS.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isGovPaused]);

  const nextEnvTab = () => {
    setEnvTabIndex((prev) => (prev + 1) % ENV_TABS_DATA.length);
  };

  const currentEnvTab = ENV_TABS_DATA[envTabIndex] || ENV_TABS_DATA[0];
  const currentGovStat = GOVERNANCE_STATS[govStatIdx] || GOVERNANCE_STATS[0];

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Sustainability</span>
        <span className="sep">{'>'}</span>
        <span className="current">ESG in action</span>
      </p>
      <h1 className="cp-page-title">ESG in action</h1>
      <div className="cp-hero-banner">
        <img src={`${S}hero-banner.png`} alt="Granules ESG impact" />
      </div>

      <div className="sus-intro">
        <p>
          At Granules, our responsibility extends beyond products to people and the planet. Every
          action we take reflects our ambition to become a trusted, long-term partner for
          companies seeking a resilient, sustainable, and ethical pharmaceutical supply chain.{' '}
          <span className="muted">Whether it&rsquo;s decarbonizing our value chain, investing in local communities, or reinforcing transparent governance &mdash; we act with clarity, urgency, and accountability.</span>
        </p>
      </div>

      {/* 3 Main Pillar Tabs Bar with Gradient Indicator */}
      <div className="esg-main-tabs-wrap">
        <div className="esg-main-tabs">
          {PILLAR_NAV.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`esg-main-tab-btn${activePillar === tab.id ? ' active' : ''}`}
              onClick={() => {
                setActivePillar(tab.id as 'environment' | 'social' | 'governance');
                document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="esg-main-tabs-track">
          <div
            className="esg-main-tabs-indicator"
            style={{
              transform: `translateX(${
                activePillar === 'environment' ? '0%' : activePillar === 'social' ? '100%' : '200%'
              })`,
            }}
          />
        </div>
      </div>

      <section className="esg-pillar-section" id="environment">
        <div className="esg-pillar-head">
          <h2>Creating a future where earth thrives</h2>
          <p>
            Climate change impacts health, economies, and the very systems that support our
            industry. We are responding with bold, measurable action, minimizing emissions,
            conserving water, and reducing waste across all sites and suppliers.
          </p>
        </div>

        {/* Sub Tabs */}
        <div className="esg-sub-tabs">
          {ENV_TABS_DATA.map((tab, idx) => (
            <button
              key={tab.tabLabel}
              type="button"
              className={`esg-sub-tab${idx === envTabIndex ? ' active' : ''}`}
              onClick={() => setEnvTabIndex(idx)}
            >
              {tab.tabLabel}
            </button>
          ))}
        </div>

        {/* 2-Column Environment Card */}
        <div className="esg-env-card" key={currentEnvTab.tabLabel}>
          <div className="esg-env-copy">
            <div>
              <h3 className="esg-env-title">{currentEnvTab.title}</h3>
              <p className="esg-env-desc">{currentEnvTab.desc}</p>
            </div>

            <div className="esg-env-metric-block">
              <p className="esg-env-stat-val">
                {currentEnvTab.statValue}
                {currentEnvTab.statUnit && (
                  <span className="esg-env-stat-unit">{currentEnvTab.statUnit}</span>
                )}
              </p>
              <p className="esg-env-stat-lbl">{currentEnvTab.statLabel}</p>

              {/* 3 Dash Indicator */}
              <div className="esg-env-dashes">
                <span className="esg-env-dash active" />
                <span className="esg-env-dash" />
                <span className="esg-env-dash" />
              </div>
            </div>
          </div>

          <div className="esg-env-media">
            <img src={`${S}${currentEnvTab.image}`} alt={currentEnvTab.title} />
            <button
              type="button"
              className="esg-env-next-btn"
              onClick={nextEnvTab}
              aria-label="Next environment tab"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="esg-pillar-section" id="social">
        <div className="esg-pillar-head">
          <h2>Our employees, our strength for tomorrow</h2>
          <p>
            We recognise that the skills and dedication of our teams play a vital role in
            achieving operational efficiency, advancing pharmaceutical innovation, and enabling
            sustainable business growth.
          </p>
        </div>
        <div className="sus-pillar-tabs" style={{ marginBottom: 24 }}>
          {SOCIAL_SUB_TABS.map((tab, index) =>
            tab === 'Community' ? (
              <Link
                key={tab}
                to="/sustainability/esg-in-action/community"
                className="sus-pillar-tab"
                style={{ background: '#fff', borderColor: '#0061f8', color: '#0061f8' }}
              >
                {tab}
              </Link>
            ) : (
              <span key={tab} className={`sus-pillar-tab${index === 0 ? ' active' : ''}`} style={{ background: index === 0 ? '#0061f8' : '#fff', borderColor: '#0061f8', color: index === 0 ? '#fff' : '#0061f8', cursor: 'default' }}>
                {tab}
              </span>
            )
          )}
        </div>
        <div className="sus-event" style={{ background: '#ebf9ff', color: '#0061f8' }}>
          <div className="sus-event-copy">
            <span className="sus-event-badge" style={{ borderColor: '#0061f8', color: '#0061f8' }}>01 / 04</span>
            <h3 className="sus-event-title">Learning and Development</h3>
            <p className="sus-event-desc" style={{ color: '#070707' }}>
              We have upskilled employees with practical and industry-relevant knowledge, ensuring
              they remain at the forefront of innovation and excellence.
            </p>
            <div className="sus-event-stats">
              <div className="sus-stat">
                <p className="sus-stat-value">4,01,110</p>
                <p className="sus-stat-label">Training Hours</p>
              </div>
            </div>
          </div>
          <div className="esg-carousel">
            {['social-1.png', 'social-2.png'].map((img) => (
              <img key={img} src={`${S}${img}`} alt="Social impact initiative" />
            ))}
          </div>
        </div>
      </section>

      <section className="esg-pillar-section" id="governance">
        <div className="esg-pillar-head">
          <h2>Setting direction for a stronger tomorrow</h2>
          <p>
            The Board of Directors at Granules India sets the overall vision, strategic direction
            and long-term objectives of the Company. It provides oversight into financial and
            operational matters, while regularly reviewing the performance of senior management.
          </p>
        </div>

        {/* 2-Column Governance Rotating Metric Card */}
        <div
          className="esg-gov-card"
          onMouseEnter={() => setIsGovPaused(true)}
          onMouseLeave={() => setIsGovPaused(false)}
        >
          <div className="esg-gov-copy">
            <div>
              <h3 className="esg-gov-title">Board Composition</h3>
              <p className="esg-gov-desc">
                Our Board comprises industry experts with diverse backgrounds, who offer us valuable
                insights into our diverse business practices.
              </p>
            </div>

            <div className="esg-gov-stat-wrap" key={currentGovStat.label}>
              <p className="esg-gov-stat-val">{currentGovStat.value}</p>
              <p className="esg-gov-stat-lbl">{currentGovStat.label}</p>

              {/* 5 Segment Dash Indicators */}
              <div className="esg-gov-dashes">
                {GOVERNANCE_STATS.map((stat, idx) => (
                  <button
                    key={stat.label}
                    type="button"
                    className={`esg-gov-dash${idx === govStatIdx ? ' active' : ''}`}
                    onClick={() => setGovStatIdx(idx)}
                    aria-label={`Select governance metric ${stat.label}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="esg-gov-media">
            <img src={`${S}governance-1.png`} alt="Board of Directors" />
          </div>
        </div>
      </section>

      <div className="sus-cta" style={{ marginTop: 'clamp(100px, 12vw, 140px)' }}>
        <img className="bg" src={`${S}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="sus-cta-copy">
          <h2>Lorem ipsum convallis consectetur</h2>
          <p>Lorem ipsum dolor sit amet consectetur. Ipsum magna a ac nibh morbi malesuada molestie mauris.</p>
        </div>
        <a className="cp-cta-btn" href="/#investor">Integrated Report</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

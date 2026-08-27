import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './sustainability.css';
import './community.css';

const S = '/assets/esg/';

type CategoryKey = 'health' | 'skilling' | 'environment';

const CATEGORY_TABS: { key: CategoryKey; label: string }[] = [
  { key: 'health', label: 'HEALTH' },
  { key: 'skilling', label: 'SKILLING & EDUCATION' },
  { key: 'environment', label: 'ENVIRONMENT AND BIODIVERSITY' },
];

const COMMUNITY_DATA: Record<
  CategoryKey,
  {
    badge: string;
    title: string;
    desc: string;
    stats: { value: string; label: string }[];
    image: string;
  }[]
> = {
  health: [
    {
      badge: '01 / 03',
      title: 'MOBILE MAMMOGRAPHY SERVICES',
      desc: 'A mobile mammography unit was deployed to provide early detection and raise awareness about breast cancer among underserved women, enabling timely medical intervention.',
      stats: [
        { value: '2,500+', label: 'WOMEN BENEFITTED' },
        { value: '95%', label: 'FROM VULNERABLE AND MARGINALISED GROUPS' },
        { value: '5,000+', label: 'WOMEN REACHED THROUGH AWARENESS PROGRAMS' },
      ],
      image: '',
    },
    {
      badge: '02 / 03',
      title: 'PHARMA PATHASHALA',
      desc: 'A flagship skill development initiative, launched with Swarna Bharat Trust, the program addresses high youth unemployment and the gap in science-based vocational education by training youth in pharmaceutical operations like production, quality control, and R&D.',
      stats: [
        { value: '1,450+', label: 'RURAL YOUTH TRAINED SINCE 2017' },
        { value: '100%', label: 'OF GRADUATES PLACED IN PHARMA JOBS' },
      ],
      image: '',
    },
    {
      badge: '03 / 03',
      title: 'GRANULES GREEN — KANHA RUN',
      desc: 'As the title sponsor, Granules supported a wellness-focused community event organized by the Heartfulness Institute to promote health and fitness.',
      stats: [
        { value: '3,500+', label: 'RUNNERS PARTICIPATED' },
        { value: '15,000+', label: 'NATIVE SAPLINGS PLANTED' },
      ],
      image: '',
    },
  ],
  skilling: [
    {
      badge: '01 / 04',
      title: 'PHARMA PATHASHALA',
      desc: 'A flagship skill development initiative, launched with Swarna Bharat Trust, the program addresses high youth unemployment and the gap in science-based vocational education by training youth in pharmaceutical operations like production, quality control, and R&D.',
      stats: [
        { value: '1,450+', label: 'RURAL YOUTH TRAINED SINCE 2017' },
        { value: '100%', label: 'OF GRADUATES PLACED IN PHARMA JOBS' },
      ],
      image: '',
    },
  ],
  environment: [
    {
      badge: '01 / 03',
      title: 'GRANULES GREEN — KANHA RUN',
      desc: 'As the title sponsor, Granules supported a wellness-focused community event organized by the Heartfulness Institute to promote health, fitness, and environmental biodiversity.',
      stats: [
        { value: '3,500+', label: 'RUNNERS PARTICIPATED' },
        { value: '15,000+', label: 'NATIVE SAPLINGS PLANTED' },
      ],
      image: '',
    },
  ],
};

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('health');
  const [itemIndex, setItemIndex] = useState(0);

  useEffect(() => {
    document.title = 'Community — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const items = COMMUNITY_DATA[activeTab] || COMMUNITY_DATA.health;
  const currentItem = items[itemIndex % items.length] || items[0];

  const handleTabChange = (key: CategoryKey) => {
    setActiveTab(key);
    setItemIndex(0);
  };

  const handleNext = () => {
    setItemIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Sustainability</span>
        <span className="sep">{'>'}</span>
        <span>esg</span>
        <span className="sep">{'>'}</span>
        <span className="current">Community</span>
      </p>
      <h1 className="cp-page-title">Community</h1>

      <div className="sus-intro">
        <p style={{ color: 'var(--n9)', font: "500 clamp(18px, 2vw, 30px)/1.25 'Manrope', sans-serif" }}>
          We believe lasting progress comes from strong, meaningful relationships with our
          communities and stakeholders.{' '}
          <span style={{ color: '#9c9c9c' }}>
            Guided by empathy and responsibility, we support healthcare, education, and social
            development, creating long-term value beyond business.
          </span>
        </p>
      </div>

      {/* 3 Main Tabs Bar with Horizontal Sliding Gradient Track */}
      <div className="comm-tabs-wrap">
        <div className="comm-tabs">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`comm-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="comm-tabs-track">
          <div
            className="comm-tabs-indicator"
            style={{
              transform: `translateX(${
                activeTab === 'health' ? '0%' : activeTab === 'skilling' ? '100%' : '200%'
              })`,
            }}
          />
        </div>
      </div>

      {/* Interactive 2-Column Community Event Card with Blue Border */}
      <div className="com-event-card" key={`${activeTab}-${itemIndex}`}>
        <div className="com-event-copy">
          <div>
            <span className="com-event-badge">{currentItem.badge}</span>
            <h2 className="com-event-title">{currentItem.title}</h2>
            <p className="com-event-desc">{currentItem.desc}</p>
          </div>

          <div className="com-event-stats">
            {currentItem.stats.map((stat) => (
              <div className="com-stat" key={stat.label}>
                <p className="com-stat-value">{stat.value}</p>
                <p className="com-stat-label">{stat.label}</p>
              </div>
            ))}

            {/* Initiative indicators (e.g. 3 initiatives under Health) */}
            {items.length > 1 && (
              <div className="com-event-dashes">
                {items.map((it, idx) => (
                  <button
                    key={it.badge}
                    type="button"
                    className={`com-event-dash${idx === itemIndex ? ' active' : ''}`}
                    onClick={() => setItemIndex(idx)}
                    aria-label={`Go to ${it.title}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="com-event-media">
          {currentItem.image ? (
            <img src={`${S}${currentItem.image}`} alt={currentItem.title} />
          ) : null}
          {items.length > 1 && (
            <button
              type="button"
              className="com-event-next-btn"
              onClick={handleNext}
              aria-label="Next initiative"
            >
              ›
            </button>
          )}
        </div>
      </div>

      <div className="sus-cta" style={{ marginTop: 'clamp(100px, 12vw, 140px)' }}>
        <img className="bg" src={`${S}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="sus-cta-copy">
          <h2>Creating shared value for our communities</h2>
          <p>
            Explore our comprehensive Environmental, Social, and Governance commitments and reports.
          </p>
        </div>
        <a className="cp-cta-btn" href="/sustainability/esg-in-action">
          ESG in Action
        </a>
      </div>

      <CompanyFooter />
    </div>
  );
}

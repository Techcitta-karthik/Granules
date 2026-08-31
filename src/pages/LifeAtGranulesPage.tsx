import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

const STATS = [
  {
    id: 'talent-dev',
    label: 'Structured Talent Development',
    image: 'life-stat-talent.png',
    description: 'Tailored career roadmaps, structured skill matrices, and targeted upskilling pathways designed to empower continuous progression and capability building across all functions.',
    tag: 'Individual Development Plans',
  },
  {
    id: 'training-hours',
    label: '24+ Annual Training Hours',
    image: 'life-stat-training.png',
    description: 'Dedicated learning programs spanning technical compliance, digital pharma tools, operational excellence, and interpersonal mastery for every team member.',
    tag: 'Continuous Learning Culture',
  },
  {
    id: 'leadership-dev',
    label: 'Leadership Development',
    image: 'life-stat-leadership.png',
    description: 'Nurturing future leadership through executive mentorship, cross-geography strategic initiatives, and accelerated management incubation tracks.',
    tag: 'Executive Coaching & Pipelines',
  },
];

const WORKDAY_TABS = [
  {
    id: 'family-fest',
    tabLabel: 'Granules Family Fest',
    title: 'GRANULES FAMILY FEST',
    desc: 'An annual celebration that brings together employees and their families for cultural activities and fun.',
    image: 'beyond-workday-bg.png',
  },
  {
    id: 'sports-fest',
    tabLabel: 'Sports Fest and 5K Run',
    title: 'SPORTS FEST AND 5K RUN',
    desc: 'Promoting wellness, healthy competition, and team spirit through our annual community 5K marathon and sports tournament.',
    image: 'hero-photo.png',
  },
  {
    id: 'womens-day',
    tabLabel: "Women's day Celebrations",
    title: "WOMEN'S DAY CELEBRATIONS",
    desc: 'Honouring and celebrating the passion, leadership, and remarkable accomplishments of women shaping Granules every day.',
    image: 'panel-people-first.png',
  },
];

const TESTIMONIALS = [
  {
    id: 'laxmana',
    name: 'Ch Laxmana Rao',
    role: 'GENERAL MANAGER, QA',
    image: 'testimonial-laxmana.png',
    quote: 'Granules is like a school — I’ve learned across functions and grown fast. The work culture and freedom keep me refreshed every day.',
  },
  {
    id: 'pavani',
    name: 'Pavani Veeramalla',
    role: 'MANAGER, QA',
    image: 'testimonial-pavani.png',
    quote: 'Granules supported my transitions across roles and geographies, always considering my personal situation. If you’re joining, come with an open mind—your efforts will be valued, and there’s real room to grow.',
  },
  {
    id: 'khaleel',
    name: 'Khaleel Shaik',
    role: 'VICE PRESIDENT – MARKETING',
    image: 'testimonial-khaleel.png',
    quote: 'Granules fosters a culture of continuous learning. Every role challenged me, offered cross-geography collaboration, and helped me grow with hands-on experience across the business.',
  },
  {
    id: 'swathi',
    name: 'Swathi Marella',
    role: 'DEPUTY GENERAL MANAGER, REGULATORY AFFAIRS',
    image: 'testimonial-swathi.png',
    quote: 'My 6+ years at Granules have been the most rewarding. It’s the right place to implement ideas and feel truly recognised. Very proud to be part of the Granules family.',
  },
];

// Duplicate items for infinite seamless auto-scrolling marquee
const MARQUEE_TESTIMONIALS = [
  ...TESTIMONIALS.map((t, i) => ({ ...t, key: `set1-${i}` })),
  ...TESTIMONIALS.map((t, i) => ({ ...t, key: `set2-${i}` })),
  ...TESTIMONIALS.map((t, i) => ({ ...t, key: `set3-${i}` })),
];

export default function LifeAtGranulesPage() {
  const [workdayTab, setWorkdayTab] = useState(0);
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Life at Granules — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const toggleCard = (key: string) => {
    setActiveCardKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Life at Granules</span>
      </p>
      <h1 className="cp-page-title">Life at Granules</h1>

      <div className="car-hero">
        <img src={`${A}life-hero.png`} alt="Granules India colleagues in an informal discussion" />
      </div>

      <div className="car-intro-row">
        <div className="car-intro-copy">
          <p className="lede">
            At Granules, we believe in careers that go beyond tasks; where people grow with
            purpose, are empowered to lead, and contribute to something bigger. We have built a
            workplace that supports your <span className="muted">ambitions and celebrates your contributions, professionally and personally.</span>
          </p>
          <p className="sub">
            We recognise that the skills and dedication of our teams play a vital role in
            achieving operational efficiency, advancing pharmaceutical innovation, and enabling
            sustainable business growth. By nurturing talent and caring for people across
            functions and levels, we strengthen our competitiveness, reinforce our role in the
            healthcare value chain, and cultivate a performance-driven culture across Granules.
          </p>
        </div>
      </div>

      {/* Talent Management and Growth matching Image 3 */}
      <div className="car-why-head" style={{ width: 'min(1464px, calc(100% - 3.2rem))', maxWidth: 1464, margin: 'clamp(60px, 8vw, 100px) auto clamp(30px, 4vw, 44px)' }}>
        <div className="car-why-copy">
          <span className="car-why-tag">Empowering Your Growth</span>
          <h2>Talent management and growth</h2>
          <p>We invest in building a capable, resilient, and future-ready workforce through</p>
        </div>
        <Link className="car-cta-btn" to="/careers/opportunities">Explore Current Openings</Link>
      </div>

      <div className="car-stats-grid">
        {STATS.map((stat) => (
          <div className="car-stat-drawer-card" key={stat.id}>
            <div className="car-stat-img-wrap">
              <img src={`${A}${stat.image}`} alt={stat.label} />
            </div>

            {/* Sliding Blue Sheet (Product-Bar Animation) */}
            <div className="car-stat-sheet">
              <div className="car-stat-sheet-head">
                <p className="car-stat-sheet-title">{stat.label}</p>
                <div className="car-stat-sheet-symbol" aria-hidden="true">
                  <span className="symbol-plus">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                  <span className="symbol-minus">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="car-stat-sheet-body">
                <p className="car-stat-sheet-desc">{stat.description}</p>
                <div className="car-stat-sheet-badge">{stat.tag}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Beyond the Workday Banner matching Image 2 */}
      <div className="car-workday-wrap">
        <div className="car-workday-banner">
          {WORKDAY_TABS.map((tab, index) => (
            <div
              key={tab.id}
              className={`car-workday-slide ${index === workdayTab ? 'active' : ''}`}
            >
              <img className="bg" src={`${A}${tab.image}`} alt={tab.title} />
              <div className="overlay" />
            </div>
          ))}

          <h2 className="car-workday-top-title">Beyond the workday</h2>

          <div className="car-workday-story" key={workdayTab}>
            <h3>{WORKDAY_TABS[workdayTab].title}</h3>
            <p>{WORKDAY_TABS[workdayTab].desc}</p>
          </div>

          <button
            type="button"
            className="car-workday-arrow prev"
            onClick={() => setWorkdayTab((prev) => (prev === 0 ? WORKDAY_TABS.length - 1 : prev - 1))}
            aria-label="Previous fest slide"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="car-workday-arrow next"
            onClick={() => setWorkdayTab((prev) => (prev + 1) % WORKDAY_TABS.length)}
            aria-label="Next fest slide"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="car-workday-pill-tabs">
            {WORKDAY_TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={`car-workday-pill-tab ${index === workdayTab ? 'active' : ''}`}
                onClick={() => setWorkdayTab(index)}
              >
                <span>{tab.tabLabel}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Voices from Granules — Auto-Scrolling Track with Flip Quote Card Matching Reference */}
      <div className="car-testimonials-section">
        <div className="car-testimonials-header">
          <h2>Voices from Granules</h2>
        </div>

        <div className="car-testimonial-marquee-wrap">
          <div className="car-testimonial-marquee-track">
            {MARQUEE_TESTIMONIALS.map((t) => {
              const isFlipped = activeCardKey === t.key;
              return (
                <div
                  className={`car-voice-card ${isFlipped ? 'is-active' : ''}`}
                  key={t.key}
                  onClick={() => toggleCard(t.key)}
                >
                  <div className="car-voice-card-top">
                    <div className="car-voice-card-inner">
                      {/* Front: Person Portrait */}
                      <div className="car-voice-face car-voice-front">
                        {t.image && <img src={`${A}${t.image}`} alt={t.name} />}
                      </div>

                      {/* Back: Solid Blue Quote Card (Matching Images 1, 2, 3, 4) */}
                      <div className="car-voice-face car-voice-back">
                        <div className="car-voice-quote-icon">
                          <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="car-voice-quote-text">{t.quote}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Row with Name, Role, and Dynamic Plus/Minus Icon */}
                  <div className="car-voice-foot">
                    <div className="car-voice-info">
                      <p className="name">{t.name}</p>
                      <p className="role">{t.role}</p>
                    </div>
                    <div className="car-voice-toggle-btn" aria-label="Toggle quote">
                      {/* Plus icon on resting, Minus icon on hover/active */}
                      <span className="icon-plus">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                      <span className="icon-minus">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="car-cta-photo">
        <img className="bg" src={`${A}life-cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="car-cta-copy">
          <h2>Let&rsquo;s grow together</h2>
          <p>
            Granules is where your ambition meets opportunity. Join a purpose-led community where
            your growth is the goal.
          </p>
        </div>
        <Link className="car-cta-apply-btn" to="/careers/opportunities">Apply now</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

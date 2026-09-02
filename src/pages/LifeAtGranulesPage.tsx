import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

const STATS = [
<<<<<<< Updated upstream
  { label: 'Structured Talent Development', image: 'life-stat-talent.png' },
  { label: '24+ Annual Training Hours', image: 'life-stat-training.png' },
  { label: 'Leadership Development', image: 'life-stat-leadership.png' },
=======
  {
    id: 'talent-dev',
    label: 'Structured Talent Development',
    image: 'life-stat-talent.png',
    description: 'Learning programs tailored to job roles and behavioral expectations.',
  },
  {
    id: 'training-hours',
    label: '24+ Annual Training Hours',
    image: 'life-stat-training.png',
    description: 'Mandatory for all employees to ensure continuous improvement.',
  },
  {
    id: 'leadership-dev',
    label: 'Leadership Development',
    image: 'life-stat-leadership.png',
    description: 'Targeted programs to build strategic, self-aware, and execution-focused leaders.',
  },
>>>>>>> Stashed changes
];

const WORKDAY_TABS = [
  {
    label: 'Granules Family Fest',
    title: 'Granules Family Fest',
    desc: 'An annual celebration that brings together employees and their families for cultural activities and fun.',
<<<<<<< Updated upstream
=======
    image: 'beyond-workday-bg.png',
  },
  {
    id: 'sports-fest',
    tabLabel: 'Sports Fest and 5K Run',
    title: 'SPORTS FEST AND 5K RUN',
    desc: 'A company-wide tournament that promotes health, energy, and teamwork.',
    image: 'hero-photo.png',
  },
  {
    id: 'womens-day',
    tabLabel: "Women's day Celebrations",
    title: "WOMEN'S DAY CELEBRATIONS",
    desc: 'Acknowledging the achievements of women across the organization through events, awards, and conversations.',
    image: 'panel-people-first.png',
>>>>>>> Stashed changes
  },
  { label: 'Sports Fest and 5K Run' },
  { label: "Women's day Celebrations" },
];

const PEOPLE_SLIDES = [
  {
    id: 'people-collab',
    image: 'panel-grow-purpose.png',
    alt: 'Granules India colleagues in cleanroom gear reviewing a sample and data together',
  },
  {
    id: 'people-microscope',
    image: 'panel-innovation.png',
    alt: 'A Granules India scientist conducting microscope analysis in the lab',
  },
  {
    id: 'people-team',
    image: 'hero-real.png',
    alt: 'Granules India colleagues sharing a laugh in the workplace',
  },
];

const TESTIMONIALS = [
  { name: 'Swathi Marella', role: 'Deputy General Manager, Regulatory Affairs', image: 'testimonial-swathi.png' },
  { name: 'Ch Laxmana Rao', role: 'General Manager, QA', image: null },
  { name: 'Pavani Veeramalla', role: 'Manager, QA', image: 'testimonial-pavani.png' },
  { name: 'Khaleel Shaik', role: 'Vice President – Marketing', image: 'testimonial-khaleel.png' },
];

export default function LifeAtGranulesPage() {
  const [workdayTab, setWorkdayTab] = useState(0);
<<<<<<< Updated upstream
  const active = WORKDAY_TABS[workdayTab].title ? WORKDAY_TABS[workdayTab] : WORKDAY_TABS[0];
=======
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null);
  const [peopleIdx, setPeopleIdx] = useState(0);
>>>>>>> Stashed changes

  useEffect(() => {
    document.title = 'Life at Granules | Culture, Growth & Opportunities in Pharma';

    const descriptionContent =
      'Discover what life is like at Granules — where purpose-driven work, inclusive culture, and continuous learning empower people to thrive and make an impact.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    window.scrollTo(0, 0);
  }, []);

<<<<<<< Updated upstream
=======
  useEffect(() => {
    const timer = setInterval(() => {
      setPeopleIdx((prev) => (prev + 1) % PEOPLE_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleCard = (key: string) => {
    setActiveCardKey((prev) => (prev === key ? null : key));
  };

>>>>>>> Stashed changes
  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Life at Granules</span>
      </p>
      <h1 className="cp-page-title">Explore Life at Granules</h1>

      <div className="car-hero">
        <img src={`${A}life-hero.png`} alt="Granules India colleagues in an informal discussion" />
        <div className="car-hero-scrim" />
        <div className="car-hero-overlay">
          <h2 className="car-hero-heading">Rooted in purpose, driven by people</h2>
        </div>
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

      <div className="car-why-head" style={{ width: 'min(1464px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 100px) auto 0' }}>
        <div className="car-why-copy">
          <span className="car-why-tag">Empowering Your Growth</span>
          <h2>Talent management and growth</h2>
          <p>We invest in building a capable, resilient, and future-ready workforce through</p>
        </div>
        <a className="car-cta-btn" href="/#footer">Explore Current Openings</a>
      </div>

      <div className="car-stats">
        {STATS.map((stat) => (
<<<<<<< Updated upstream
          <div className="car-stat-card" key={stat.label}>
            <img className="photo" src={`${A}${stat.image}`} alt="" />
            <div className="car-stat-bar">
              <p>{stat.label}</p>
              <div className="car-stat-icon">
                <img src={`${A}icon-card-arrow.svg`} alt="" />
=======
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
                <div className="car-stat-sheet-badge">{stat.label}</div>
>>>>>>> Stashed changes
              </div>
            </div>
          </div>
        ))}
      </div>

<<<<<<< Updated upstream
      <div className="car-workday">
        <img className="bg" src={`${A}beyond-workday-bg.png`} alt="Granules Family Fest celebration" />
        <div className="overlay" />
        <div className="car-workday-inner">
          <div className="car-workday-head">
            <h2>Beyond the workday</h2>
            <p>
              Strong teams are built on shared experiences, not just shared tasks. Our flagship
              engagement events across Hyderabad and Vishakhapatnam celebrate connection, energy,
              and belonging.
            </p>
          </div>
          {active.title && (
            <div className="car-workday-active">
              <p className="label">{active.title}</p>
              <p className="desc">{active.desc}</p>
=======
      {/* Beyond the Workday Banner matching Image 2 */}
      <div className="car-workday-lede">
        <p>
          Strong teams are built on shared experiences, not just shared tasks. Our flagship
          engagement events across Hyderabad and Vishakhapatnam celebrate connection, energy, and
          belonging.
        </p>
      </div>

      <div className="car-workday-wrap">
        <div className="car-workday-banner">
          {WORKDAY_TABS.map((tab, index) => (
            <div
              key={tab.id}
              className={`car-workday-slide ${index === workdayTab ? 'active' : ''}`}
            >
              <img className="bg" src={`${A}${tab.image}`} alt={tab.title} />
              <div className="overlay" />
>>>>>>> Stashed changes
            </div>
          )}
        </div>
        <div className="car-workday-tabs">
          {WORKDAY_TABS.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              className={`car-workday-tab${index === workdayTab ? ' active' : ''}`}
              onClick={() => setWorkdayTab(index)}
            >
              {tab.label}
              <img src={`${A}icon-plus-small.svg`} alt="" style={index === workdayTab ? { filter: 'invert(1)' } : undefined} />
            </button>
          ))}
        </div>
      </div>

<<<<<<< Updated upstream
      <div className="car-testimonials">
        <h2>Voices from Granules</h2>
        <div className="car-testimonial-track">
          {TESTIMONIALS.map((t) => (
            <div className="car-testimonial-card" key={t.name}>
              <div className="car-testimonial-photo">
                {t.image && <img src={`${A}${t.image}`} alt={t.name} />}
              </div>
              <div className="car-testimonial-foot">
                <div>
                  <p className="name">{t.name}</p>
                  <p className="role">{t.role}</p>
=======
      <div className="car-workday-cta-row">
        <Link className="car-cta-btn" to="/careers/opportunities">Explore Current Openings &rarr;</Link>
      </div>

      {/* People at Granules — responsive photo slideshow reusing the same
          absolute-layer / opacity-crossfade pattern as the Beyond the Workday banner */}
      <div className="car-people-section">
        <h2 className="car-people-heading">People at Granules</h2>

        <div className="car-people-slideshow">
          {PEOPLE_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`car-people-slide ${index === peopleIdx ? 'active' : ''}`}
            >
              <img src={`${A}${slide.image}`} alt={slide.alt} />
            </div>
          ))}

          <button
            type="button"
            className="car-people-arrow prev"
            onClick={() => setPeopleIdx((prev) => (prev === 0 ? PEOPLE_SLIDES.length - 1 : prev - 1))}
            aria-label="Previous photo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="car-people-arrow next"
            onClick={() => setPeopleIdx((prev) => (prev + 1) % PEOPLE_SLIDES.length)}
            aria-label="Next photo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="car-people-dots">
            {PEOPLE_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`car-people-dot ${index === peopleIdx ? 'active' : ''}`}
                onClick={() => setPeopleIdx(index)}
                aria-label={`Go to photo ${index + 1}`}
              />
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
>>>>>>> Stashed changes
                </div>
                <div className="car-testimonial-add">
                  <img src={`${A}icon-plus-round.svg`} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="car-cta-photo">
        <img className="bg" src={`${A}life-cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="car-cta-copy">
          <h2>Let&rsquo;s Grow Together</h2>
          <p>
            Granules is where your ambition meets opportunity. Join a purpose-led community where
            your growth is the goal.
          </p>
        </div>
<<<<<<< Updated upstream
        <a className="car-cta-btn" href="/#footer">Apply now</a>
=======
        <div className="car-cta-btn-row">
          <Link className="car-cta-apply-btn" to="/careers">Careers Overview &rarr;</Link>
          <Link className="car-cta-apply-btn" to="/careers/opportunities">Discover Roles and Apply &rarr;</Link>
        </div>
>>>>>>> Stashed changes
      </div>

      <CompanyFooter />
    </div>
  );
}

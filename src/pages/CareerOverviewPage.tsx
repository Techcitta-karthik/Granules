import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';


const CAREER_AREAS = [
  {
    id: 'rnd',
    tag: 'R&D',
    title: 'Research & Development',
    desc: 'Turn scientific possibilities into scalable, patient-focused solutions through research, analytical thinking and responsible innovation.',
    cta: 'Explore R&D Roles',
    bg: '/assets/Home/4.jpg',
  },
  {
    id: 'mfg',
    tag: 'OPERATIONS',
    title: 'Manufacturing & Operations',
    desc: 'Make quality medicines reliably and responsibly through shop-floor excellence, process discipline and strong EHS practices.',
    cta: 'Explore Operations Roles',
    bg: '/assets/facilities/gagillapur.png',
  },
  {
    id: 'qa',
    tag: 'COMPLIANCE',
    title: 'Quality & Regulatory',
    desc: 'Protect patients and earn trust through quality systems, regulatory discipline and a strong compliance mindset.',
    cta: 'Explore Quality & Regulatory Roles',
    bg: '/assets/Home/3.jpg',
  },
  {
    id: 'commercial',
    tag: 'COMMERCIAL',
    title: 'Sales, Marketing, & Supply chain',
    desc: 'Understand customer needs, build market connections and strengthen supply networks to take Granules’ solutions reliably across the globe.',
    cta: 'Explore Commercial Roles',
    bg: '/assets/facilities/gpi-chantilly.png',
  },
  {
    id: 'enabling',
    tag: 'CORPORATE',
    title: 'Enabling Functions',
    desc: 'Strengthen Granules through technology, finance, compliance, people practices and the support systems that enable sustainable growth.',
    cta: 'Explore Enabling Functions',
    bg: '/assets/company/empowering-employees.png',
  },
];

const GRANULES_WAY_SLIDES = [
  {
    id: 1,
    title: 'Accountability | Own it end to end',
    body: 'Anticipate challenges, act with initiative, follow through and help the team reach the finish line.',
    image: `${A}granules-way-01.jpg`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Credibility | Make trust visible',
    body: 'Be honest, transparent and reliable. Match words with actions and uphold ethical standards.',
    image: `${A}granules-way-02.jpg`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Teamwork | Share the win',
    body: 'Invite different perspectives, exchange knowledge and succeed together.',
    image: `${A}granules-way-03.jpg`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Humility | Stay curious',
    body: 'Know your strengths, welcome feedback and keep learning without losing sight of collective success.',
    image: `${A}granules-way-04.jpg`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Agility | Keep moving forward',
    body: 'Respond quickly, test better ideas and adapt with changing business needs.',
    image: `${A}granules-way-05.jpg`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 17 18 12 13 7" />
        <polyline points="6 17 11 12 6 7" />
      </svg>
    ),
  },
];

const LIFE_EVENTS = [
  {
    id: 'family-fest',
    title: 'Family Fest',
    desc: 'A vibrant annual event where employees and families come together for culture, connection, and memorable moments beyond work.',
    image: `${A}Granuals Festival-493.JPG`,
  },
  {
    id: 'sports-fest',
    title: 'Sports Fest + 5K Run',
    desc: 'High-energy sports events and a marathon that bring teams together, fuel healthy competition, and celebrate fitness, teamwork, and spirit.',
    image: `${A}5k run.jpeg`,
  },
  {
    id: 'womens-day',
    title: 'Women’s Day',
    desc: 'A celebration of women’s achievements, voices, and impact across Granules through inspiring conversations, recognition, and events.',
    image: `${A}Women'sday.JPG`,
  },
];

const TESTIMONIALS = [
  {
    id: 'swathi',
    name: 'Swathi Marella',
    role: 'Deputy General Manager, Regulatory Affairs',
    image: `${A}testimonial-swathi.webp`,
    quote:
      'My journey at Granules has been incredibly rewarding. It’s a place where ideas are encouraged, contributions are recognised, and every day brings new opportunities to grow. I’m proud to be part of the Granules family.',
  },
  {
    id: 'laxmana',
    name: 'Ch Laxmana Rao',
    role: 'General Manager, QA',
    image: `${A}testimonial-laxmana.webp`,
    quote:
      'Granules is a place where learning never stops. Working across functions has broadened my perspective and accelerated my growth. The empowering work culture and freedom to contribute make every day both rewarding and refreshing.',
  },
  {
    id: 'pavani',
    name: 'Pavani Veeramalla',
    role: 'Manager, QA',
    image: `${A}testimonial-pavani.webp`,
    quote:
      'Granules supported my transitions across roles and geographies, always considering my personal situation. If you’re joining, come with an open mind—your efforts will be valued, and there’s real room to grow.',
  },
  {
    id: 'khaleel',
    name: 'Khaleel Shaik',
    role: 'Vice President, Marketing',
    image: `${A}testimonial-khaleel.webp`,
    quote:
      'Granules fosters a culture of continuous learning. Every role challenged me, broadened my perspective through cross-geography collaboration, and helped me grow with hands-on experience across the business.',
  },
];



const BENEFITS = [
  {
    id: 'health',
    title: 'Health and wellbeing',
    desc: 'We support employees through medical benefits, safe workplaces and wellbeing initiatives that help people stay healthy and perform at their best.',
    image: `${A}benefit-health.jpg`,
  },
  {
    id: 'beyond',
    title: 'Beyond the workday',
    desc: 'We bring people together through sports tournaments, festival celebrations and team events that build connection, wellbeing and a shared sense of belonging.',
    image: `${A}benefit-beyond.jpg`,
  },
  {
    id: 'learning',
    title: 'Learning and recognition',
    desc: 'We encourage continuous growth through learning opportunities, career development support and recognize meaningful contributions.',
    image: `${A}benefit-learning.jpg`,
  },
  {
    id: 'inclusion',
    title: 'Inclusion and support',
    desc: 'We foster an inclusive workplace with equal opportunity, collaboration, and safe channels for employees to raise concerns.',
    image: `${A}benefit-inclusion.jpg`,
  },
];

export default function CareerOverviewPage() {
  const [openPathIdx, setOpenPathIdx] = useState<number>(0);
  const [activeArea, setActiveArea] = useState<number>(0);
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [lifeEventIdx, setLifeEventIdx] = useState(0);
  const [openBenefit, setOpenBenefit] = useState<number>(0);
  const [activeVoiceKey, setActiveVoiceKey] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string>('');
  const [talentSubmitted, setTalentSubmitted] = useState<boolean>(false);

  const currentAreaBg = (activeArea >= 0 && CAREER_AREAS[activeArea]?.bg) ? CAREER_AREAS[activeArea].bg : CAREER_AREAS[0].bg;

  const location = useLocation();

  useEffect(() => {
    document.title = 'Make Better Health. Build a Bolder Career. — Careers at Granules';
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.hash]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPracticeIdx((prev) => (prev + 1) % GRANULES_WAY_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <main>
        {/* Breadcrumb Navigation */}
        <p className="cp-breadcrumb" style={{ width: 'min(85%, 1632px)', maxWidth: '1632px', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <span className="current">CAREERS</span>
        </p>

        {/* Page Main Header */}
        <h1 className="cp-page-title">Careers</h1>

        {/* Hero Visual Banner */}
        <div className="car-hero">
          <img src="/assets/career.webp" alt="Granules India scientist working on high-impact pharmaceutical formulations" />
          <div className="car-hero-scrim" />
          <div className="car-hero-overlay">
            <h2 className="car-hero-heading">Make Better Health.<br />Build a Bolder Career.</h2>
          </div>
        </div>

        {/* Narrative / Intro Section */}
        <div className="cp-about-desc">
          <h4>
            At Granules, your work goes beyond a role. It helps improve health outcomes for people around the globe. Join teams who turn science, scale and responsible innovation into medicines that support healthier lives worldwide.
          </h4>
          <h4>
            Bring your curiosity. Build real expertise. See your impact take shape.
          </h4>
        </div>

        {/* The Granules Way in Practice Banner */}
        <div className="car-practice-wrap">
          <div className="car-practice-banner">
            {GRANULES_WAY_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className={`car-practice-slide-layer ${idx === practiceIdx ? 'active' : ''}`}
              >
                <img src={slide.image} alt={slide.title} className="car-practice-bg" />
                <div className="car-practice-overlay" />
              </div>
            ))}

            <h2 className="car-practice-headline">The Granules Way</h2>

            <div className="car-practice-card" key={practiceIdx}>
              <div className="car-practice-card-icon">
                {GRANULES_WAY_SLIDES[practiceIdx].icon}
              </div>
              <h3>{GRANULES_WAY_SLIDES[practiceIdx].title}</h3>
              <p>{GRANULES_WAY_SLIDES[practiceIdx].body}</p>
            </div>

            <div className="car-practice-nav" aria-label="Slide indicators">
              {GRANULES_WAY_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`car-practice-nav-btn ${idx === practiceIdx ? 'active' : ''}`}
                  onClick={() => setPracticeIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Discover Your Path / Career Areas Interactive Showcase Banner */}
        <section className="car-discover-section" aria-label="Career Areas & Discover Your Path at Granules">
          <div className="car-discover-head">
            <span className="car-why-tag">Discover your path</span>
          </div>
          <div className="car-discover-banner">
            {/* Background Image Layers for Career Areas */}
            {CAREER_AREAS.map((path, idx) => (
              <div
                key={path.id}
                className={`car-discover-bg-layer ${idx === (openPathIdx >= 0 ? openPathIdx : 0) ? 'active' : ''}`}
                style={{ backgroundImage: `url(${path.bg})` }}
                aria-hidden="true"
              />
            ))}
            <div className="car-discover-overlay" aria-hidden="true" />

            {/* Left Copy Column */}
            <div className="car-discover-copy">
              <h2>Where science, scale &amp; purpose meet</h2>
              <p>
                Explore opportunities across our core scientific, manufacturing, and operational disciplines.
              </p>
              <a
                className="car-discover-btn"
                href="https://careers.mygranules.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>DISCOVER ROLES &rarr;</span>
              </a>
            </div>

            {/* Right Accordion Column */}
            <div className="car-discover-accordion">
              {CAREER_AREAS.map((path, idx) => {
                const isOpen = openPathIdx === idx;
                return (
                  <article
                    key={path.id}
                    className={`car-discover-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenPathIdx(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="car-discover-item-title">{path.title}</span>
                      <span className="car-discover-toggle" aria-hidden="true">
                        {isOpen ? (
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="11" fill="#0061f8" />
                            <path d="M7.5 12h9" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
                          </svg>
                        ) : (
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="11" fill="#e2edf9" />
                            <path d="M12 7.5v9M7.5 12h9" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" />
                          </svg>
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="car-discover-body">
                        <p>{path.desc}</p>
                        <a
                          href="https://careers.mygranules.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="car-discover-area-cta"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '12px',
                            color: '#0061f8',
                            fontWeight: 700,
                            fontSize: '14.5px',
                            textDecoration: 'none'
                          }}
                        >
                          {path.cta} &rarr;
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY GRANULES? The Employee Value Proposition (Stacking Panels) */}
        <div className="car-why" id="culture-values" style={{ scrollMarginTop: '100px' }}>
          <div className="car-why-head">
            <div className="car-why-copy">
              <span className="car-why-tag">WHY GRANULES?</span>
              <h2>The Employee Value Proposition</h2>
              <p className="car-why-subtitle">Build depth. Take ownership. Grow with purpose.</p>
            </div>
          </div>

          {/* Panel 0: Your Work Matters */}
          <div className="car-panel car-panel--0" style={{ '--stack-index': 0 } as React.CSSProperties}>
            <div className="car-panel-image">
              <img src={`${A}12.png`} alt="Your work matters" />
            </div>
            <div className="car-panel-copy">
              <h3>Your Work Matters</h3>
              <p>
                Whether you improve a process, protect quality, solve a scientific challenge or support a team, your contribution helps make reliable medicines possible.
              </p>
            </div>
          </div>

          {/* Panel 1: Learn by Doing */}
          <div className="car-panel car-panel--1 reverse" style={{ '--stack-index': 1 } as React.CSSProperties}>
            <div className="car-panel-copy">
              <h3>Learn by Doing</h3>
              <p>
                Grow through meaningful assignments, hands-on problem solving, cross-functional collaboration and exposure across the pharmaceutical value chain.
              </p>
            </div>
            <div className="car-panel-image">
              <img src={`${A}13.png`} alt="Learn by doing" />
            </div>
          </div>

          {/* Panel 2: Own the Outcome */}
          <div className="car-panel car-panel--2" style={{ '--stack-index': 2 } as React.CSSProperties}>
            <div className="car-panel-image">
              <img src={`${A}14.png`} alt="Own the outcome" />
            </div>
            <div className="car-panel-copy">
              <h3>Own the Outcome</h3>
              <p>
                Clear expectations and real responsibility give you room to make decisions, improve how work gets done and follow ideas through to impact.
              </p>
            </div>
          </div>

          {/* Panel 3: Grow in More Than One Direction */}
          <div className="car-panel car-panel--3 reverse" style={{ '--stack-index': 3 } as React.CSSProperties}>
            <div className="car-panel-copy">
              <h3>Grow in More Than One Direction</h3>
              <p>
                Deepen your expertise, broaden your experience or explore a new path as the business evolves. Career stories should show real moves across roles, teams and geographies.
              </p>
            </div>
            <div className="car-panel-image">
              <img src={`${A}15.png`} alt="Grow in more than one direction" />
            </div>
          </div>

          {/* Panel 4: Join Responsible Innovation */}
          <div className="car-panel car-panel--4" style={{ '--stack-index': 4 } as React.CSSProperties}>
            <div className="car-panel-image">
              <img src={`${A}panel-innovation.webp`} alt="Join responsible innovation" />
            </div>
            <div className="car-panel-copy">
              <h3>Join Responsible Innovation</h3>
              <p>
                Help advance green science, biocatalysis and continuous manufacturing while contributing to a more sustainable future for healthcare.
              </p>
            </div>
          </div>

          {/* Panel 5: Belong to a Team That Delivers */}
          <div className="car-panel car-panel--5 reverse" style={{ '--stack-index': 5 } as React.CSSProperties}>
            <div className="car-panel-copy">
              <h3>Belong to a Team That Delivers</h3>
              <p>
                Work with people who share knowledge, challenge respectfully and support one another to achieve stronger outcomes.
              </p>
            </div>
            <div className="car-panel-image">
              <img src={`${A}16.png`} alt="Belong to a team that delivers" />
            </div>
          </div>

          {/* Panel 6: Care Beyond Careers */}
          <div className="car-panel car-panel--6 car-panel--last" style={{ '--stack-index': 6, top: 'auto' } as React.CSSProperties}>
            <div className="car-panel-image">
              <img src={`${A}17.png`} alt="Care beyond careers" />
            </div>
            <div className="car-panel-copy">
              <h3>Care Beyond Careers</h3>
              <p>
                At Granules, we invest not only in your professional growth but also in your wellbeing, health, and future. Because meaningful careers are built by helping people thrive, both at work and in life.
              </p>
            </div>
          </div>
        </div>

        {/* Growth You Can Picture — Learning & Mobility Spotlight Card */}
        <div className="car-why-head" style={{ width: '85%', maxWidth: '85%', margin: '75px auto clamp(24px, 3vw, 36px)', padding: 0 }}>
          <div className="car-why-copy">
            <span className="car-why-tag">GROWTH YOU CAN PICTURE</span>
            <h2>Learning and Mobility</h2>
                <p className="car-why-subtitle">
                  At Granules, learning is built into everyday work through structured training, capability building, cross-functional exposure and opportunities to grow across roles, teams and locations. One example is the Self-Managed Team Trainee Program, a future-ready talent program that gives young trainees early ownership, guided shop-floor exposure and hands-on learning across manufacturing operations, helping them build technical confidence, operational discipline and a strong foundation for long-term careers.
                </p>
              </div>
            </div>

            {/* Life at Granules — Real People. Real Moments. (Header) */}
            <div className="car-why-head" style={{ width: '85%', maxWidth: '85%', margin: '75px auto clamp(24px, 3vw, 36px)', padding: 0 }}>
              <div className="car-why-copy">
                <span className="car-why-tag">LIFE AT GRANULES</span>
                <h2>Real People. Real Moments.</h2>
                <p className="car-why-subtitle">
                  Serious about science does not mean serious all the time. Our teams connect through shared experiences that create energy, wellbeing and belonging.
                </p>
              </div>
            </div>

            {/* Life at Granules (Interactive Banner) */}
            <div className="car-workday-wrap contained" style={{ marginTop: '0' }}>
              <div className="car-workday-banner">
                {LIFE_EVENTS.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`car-workday-slide ${idx === lifeEventIdx ? 'active' : ''}`}
                  >
                    <img className="bg" src={item.image} alt={item.title} />
                    <div className="overlay" />
                  </div>
                ))}

                <div className="car-workday-story" key={lifeEventIdx}>
                  <h3>{LIFE_EVENTS[lifeEventIdx].title}</h3>
                  <p>{LIFE_EVENTS[lifeEventIdx].desc}</p>
                </div>

                <button
                  type="button"
                  className="car-workday-arrow prev"
                  onClick={() => setLifeEventIdx((prev) => (prev === 0 ? LIFE_EVENTS.length - 1 : prev - 1))}
                  aria-label="Previous event"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="car-workday-arrow next"
                  onClick={() => setLifeEventIdx((prev) => (prev + 1) % LIFE_EVENTS.length)}
                  aria-label="Next event"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <div className="car-workday-pill-tabs">
                  {LIFE_EVENTS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`car-workday-pill-tab ${idx === lifeEventIdx ? 'active' : ''}`}
                      onClick={() => setLifeEventIdx(idx)}
                    >
                      <span>{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Meet the People Behind the Progress — Voices from Granules */}
            <div className="car-voices-section">
              <div className="car-why-head" style={{ width: '100%', maxWidth: '100%', margin: '0 0 clamp(24px, 3vw, 36px) 0', padding: 0 }}>
                <div className="car-why-copy">
                  <span className="car-why-tag">VOICES FROM GRANULES</span>
                  <h2>Meet the People Behind the Progress</h2>
                </div>
              </div>

              <div className="car-voices-grid">
                {TESTIMONIALS.map((t) => {
                  const isFlipped = activeVoiceKey === t.id;
                  return (
                    <div
                      className={`car-voice-card ${isFlipped ? 'is-active' : ''}`}
                      key={t.id}
                      onClick={() => setActiveVoiceKey(isFlipped ? null : t.id)}
                    >
                      <div className="car-voice-card-top">
                        <div className="car-voice-card-inner">
                          <div className="car-voice-face car-voice-front">
                            <img src={t.image} alt={t.name} />
                          </div>
                          <div className="car-voice-face car-voice-back">
                            <div className="car-voice-quote-icon">
                              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                              </svg>
                            </div>
                            <p className="car-voice-quote-text">{t.quote}</p>
                          </div>
                        </div>
                      </div>

                      <div className="car-voice-foot">
                        <div className="car-voice-info">
                          <p className="name">{t.name}</p>
                          <p className="role">{t.role}</p>
                        </div>
                        <div className="car-voice-toggle-btn" aria-label="Toggle quote">
                          <span className="icon-plus">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </span>
                          <span className="icon-minus">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
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

            {/* What Helps You Do Your Best — Recognition, Wellbeing & Belonging */}
            <div className="car-why-head" style={{ width: '85%', maxWidth: '85%', margin: '75px auto clamp(24px, 3vw, 36px)', padding: 0 }}>
              <div className="car-why-copy">
                <span className="car-why-tag">RECOGNITION, WELLBEING &amp; BELONGING</span>
                <h2>What Helps You Do Your Best</h2>
                <p className="car-why-subtitle">Candidates expect practical clarity. We provide comprehensive support across every dimension of employee life.</p>
              </div>
            </div>

            <div className="car-benefits-grid">
              {BENEFITS.map((b, idx) => {
                const isOpen = openBenefit === idx;
                return (
                  <article
                    className={`car-benefit-card${isOpen ? ' is-open' : ''}`}
                    key={b.title}
                    onMouseEnter={() => setOpenBenefit(idx)}
                    onMouseLeave={() => setOpenBenefit(-1)}
                    onClick={() => setOpenBenefit(isOpen ? -1 : idx)}
                  >
                    <div className="car-benefit-img-wrap">
                      <img
                        src={b.image}
                        alt={b.title}
                        className={b.id === 'health' ? 'car-benefit-img--health' : undefined}
                      />
                    </div>

                    <div className="car-benefit-sheet">
                      <div className="car-benefit-sheet-head">
                        <span className="car-benefit-sheet-title">{b.title}</span>
                        <span className="car-benefit-symbol" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            {isOpen ? (
                              <line x1="5" y1="12" x2="19" y2="12" />
                            ) : (
                              <>
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </>
                            )}
                          </svg>
                        </span>
                      </div>

                      <div className="car-benefit-sheet-body">
                        <p className="car-benefit-sheet-desc">{b.desc}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>



            {/* Join Our Talent Community (Header) */}
            <div className="car-why-head" style={{ width: '85%', maxWidth: '85%', margin: '75px auto clamp(24px, 3vw, 36px)', padding: 0 }}>
              <div className="car-why-copy">
                <span className="car-why-tag">NOT READY TO APPLY? STAY CURIOUS.</span>
                <h2>Join Our Talent Community</h2>
                <p className="car-why-subtitle">
                  Join the Granules Talent Community to receive relevant opportunities, career stories, and updates tailored to your professional interests.
                </p>
              </div>
            </div>

            {/* Talent Community Form Card */}
            <div className="car-talent-wrap" style={{ marginTop: '0' }}>
              <div className="car-talent-card">
                <form
                  className="car-talent-form-grid"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTalentSubmitted(true);
                  }}
                >
                  {talentSubmitted ? (
                    <div className="car-talent-success">
                      <h4>Thank you for connecting!</h4>
                      <p>You will receive career stories and opportunity alerts from Granules India.</p>
                    </div>
                  ) : (
                    <>
                      <div className="car-talent-field">
                        <label htmlFor="talent-name">Full Name *</label>
                        <input id="talent-name" type="text" placeholder="e.g. Rahul Sharma" required />
                      </div>

                      <div className="car-talent-field">
                        <label htmlFor="talent-email">Email Address *</label>
                        <input id="talent-email" type="email" placeholder="e.g. rahul@example.com" required />
                      </div>

                      <div className="car-talent-field">
                        <label htmlFor="talent-mobile">Mobile No. *</label>
                        <div className="car-talent-phone-group">
                          <select
                            id="talent-dial-code"
                            name="dialCode"
                            defaultValue="+91"
                            className="car-talent-dial-select"
                            aria-label="Country dial code"
                            required
                          >
                            <option value="+91">IN (+91)</option>
                            <option value="+1">US (+1)</option>
                            <option value="+44">UK (+44)</option>
                            <option value="+41">CH (+41)</option>
                            <option value="+49">DE (+49)</option>
                            <option value="+971">AE (+971)</option>
                            <option value="+65">SG (+65)</option>
                            <option value="+81">JP (+81)</option>
                            <option value="+61">AU (+61)</option>
                            <option value="+1-ca">CA (+1)</option>
                            <option value="+33">FR (+33)</option>
                            <option value="+39">IT (+39)</option>
                            <option value="+34">ES (+34)</option>
                            <option value="+86">CN (+86)</option>
                            <option value="+82">KR (+82)</option>
                            <option value="+55">BR (+55)</option>
                            <option value="+27">ZA (+27)</option>
                            <option value="+966">SA (+966)</option>
                            <option value="+other">Other</option>
                          </select>
                          <input
                            id="talent-mobile"
                            type="tel"
                            placeholder="e.g. 98765 43210"
                            className="car-talent-phone-input"
                            required
                          />
                        </div>
                      </div>

                      <div className="car-talent-field">
                        <label htmlFor="talent-location">Location / Preferred Hub *</label>
                        <input id="talent-location" type="text" placeholder="e.g. Hyderabad, India / Virginia, USA" required />
                      </div>

                      <div className="car-talent-field car-talent-field--full">
                        <label htmlFor="talent-interest">Career Interest / Function *</label>
                        <select id="talent-interest" required defaultValue="">
                          <option value="" disabled>Select your primary area of interest</option>
                          <option value="rnd">Research &amp; Development</option>
                          <option value="mfg">Manufacturing &amp; Operations</option>
                          <option value="qa">Quality &amp; Regulatory</option>
                          <option value="commercial">Sales, Marketing &amp; Supply Chain</option>
                          <option value="corporate">Enabling Functions (IT, HR, Finance, Legal)</option>
                        </select>
                      </div>

                      <div className="car-talent-field car-talent-field--full">
                        <label htmlFor="talent-cv">Upload Resume / CV *</label>
                        <div className="car-talent-file-wrap">
                          <input
                            id="talent-cv"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            className="car-talent-file-input"
                            onChange={(e) => setCvFileName(e.target.files?.[0]?.name || '')}
                          />
                          <div className="car-talent-file-custom">
                            <div className="car-talent-file-left">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                              </svg>
                              <span className={`car-talent-file-name ${cvFileName ? 'has-file' : ''}`}>
                                {cvFileName ? cvFileName : 'Upload your Resume or CV (PDF, DOC, DOCX — max 5MB)'}
                              </span>
                            </div>
                            <span className="car-talent-file-btn">
                              {cvFileName ? 'Change File' : 'Browse'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="car-talent-consent">
                        <input id="talent-consent" type="checkbox" required />
                        <label htmlFor="talent-consent">
                          I consent to Granules India collecting and processing my personal data for recruitment communications and career updates in compliance with the Digital Personal Data Protection (DPDP) Act, 2023.
                        </label>
                      </div>

                      <div className="car-talent-btn-row">
                        <button type="submit" className="car-talent-submit-btn">Join Talent Community</button>
                        <a
                          href="https://careers.mygranules.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="car-talent-link"
                        >
                          Or view active job openings &rarr;
                        </a>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>

            {/* Photo CTA Banner */}
            <div className="car-cta-photo">
              <img className="bg" src={`${A}work-matters-bg.webp`} alt="" />
              <div className="overlay" />
              <div className="car-cta-copy">
                <h2>A Place Where Your Work Matters</h2>
                <p>
                  Step into a career with impact. Whether you’re a scientist, operator, or strategist, your journey starts here.
                </p>
              </div>
              <a
                className="car-cta-apply-btn"
                href="https://careers.mygranules.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply for Roles &rarr;
              </a>
            </div>
        </main>

      <CompanyFooter />
    </div>
  );
}

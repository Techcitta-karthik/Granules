import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

const OVERVIEW_STATS = [
  { id: 'employees', value: '5,000+', label: 'Employees globally' },
  { id: 'countries', value: '100+', label: 'Countries reached' },
  { id: 'filings', value: '150+', label: 'Product filings' },
  { id: 'students', value: '1,000+', label: 'Students educated' },
];

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
    image: `${A}work-matters-bg.webp`,
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
    image: `${A}panel-innovation.webp`,
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
    image: `/assets/company/empowering-employees.png`,
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
    image: `/assets/company/career-bg.png`,
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
    image: `/assets/company/values-bg-2.webp`,
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
    image: `/assets/company/career-bg.png`,
  },
  {
    id: 'sports-fest',
    title: 'Sports Fest + 5K Run',
    desc: 'High-energy sports events and a marathon that bring teams together, fuel healthy competition, and celebrate fitness, teamwork, and spirit.',
    image: `/assets/company/empowering-employees.png`,
  },
  {
    id: 'womens-day',
    title: 'Women’s Day',
    desc: 'A celebration of women’s achievements, voices, and impact across Granules through inspiring conversations, recognition, and events.',
    image: `${A}panel-people-first.webp`,
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
    image: '/assets/Home/5.jpg',
  },
  {
    id: 'beyond',
    title: 'Beyond the workday',
    desc: 'We bring people together through sports tournaments, festival celebrations and team events that build connection, wellbeing and a shared sense of belonging.',
    image: '/assets/company/career-bg.png',
  },
  {
    id: 'learning',
    title: 'Learning and recognition',
    desc: 'We encourage continuous growth through learning opportunities, career development support and recognize meaningful contributions.',
    image: `${A}panel-grow-purpose.webp`,
  },
  {
    id: 'inclusion',
    title: 'Inclusion and support',
    desc: 'We foster an inclusive workplace with equal opportunity, collaboration, and safe channels for employees to raise concerns.',
    image: '/assets/company/empowering-employees.png',
  },
];

const CANDIDATE_FAQS = [
  {
    q: 'Can I apply for more than one role?',
    a: 'Yes. Choose roles that closely match your skills and interests, and tailor your application to each opportunity.',
  },
  {
    q: 'How can I check my application status?',
    a: 'You can check your application status at careers.mygranules.com.',
  },
  {
    q: 'Do you hire graduates and interns?',
    a: 'Yes. We hire graduates and interns across relevant functions. We also run a Self-Managed Team Trainee Program for ITI, Diploma and Class 12 pass-outs, where trainees gain hands-on experience while Granules sponsors their graduation from TISS.',
  },
  {
    q: 'How does Granules protect candidate data?',
    a: 'Granules protects candidate and employee data in line with the Digital Personal Data Protection Act, 2023. We collect and use personal data only for legitimate recruitment and employment-related purposes, with appropriate safeguards for access, storage, retention and confidentiality.',
  },
];

export default function CareerOverviewPage() {
  const [openPathIdx, setOpenPathIdx] = useState<number>(2);
  const [activeArea, setActiveArea] = useState<number>(0);
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [lifeEventIdx, setLifeEventIdx] = useState(0);
  const [openBenefit, setOpenBenefit] = useState<number>(0);
  const [activeVoiceKey, setActiveVoiceKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [talentSubmitted, setTalentSubmitted] = useState<boolean>(false);

  const currentAreaBg = (activeArea >= 0 && CAREER_AREAS[activeArea]?.bg) ? CAREER_AREAS[activeArea].bg : CAREER_AREAS[0].bg;

  useEffect(() => {
    document.title = 'Make Better Health. Build a Bolder Career. — Careers at Granules';
    window.scrollTo(0, 0);
  }, []);

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
        <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <span className="current">CAREERS</span>
        </p>

        {/* Page Main Header */}
        <h1 className="cp-page-title">Make Better Health. Build a Bolder Career.</h1>

        {/* Hero Visual Banner */}
        <div className="car-hero">
          <img src="/assets/career.png" alt="Granules India scientist working on high-impact pharmaceutical formulations" />
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

        {/* Impact in Numbers Stats Grid */}
        <div className="car-ov-stats">
          <div className="car-ov-stats-head">
            <span className="car-why-tag">IMPACT IN NUMBERS</span>
          </div>
          <div className="car-ov-stats-grid">
            {OVERVIEW_STATS.map((stat) => (
              <div className="car-ov-stat-card" key={stat.id}>
                <p className="car-ov-stat-value">{stat.value}</p>
                <p className="car-ov-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Discover Your Path / Career Areas Interactive Showcase Banner */}
        <section className="car-discover-section" aria-label="Career Areas & Discover Your Path at Granules">
          <div className="car-discover-head">
            <span className="car-why-tag">CAREER AREAS</span>
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
              <span className="car-discover-tag">DISCOVER YOUR PATH</span>
              <h2>Where science, scale &amp; purpose meet</h2>
              <p>
                Explore opportunities across our core scientific, manufacturing, and operational disciplines.
              </p>
              <Link className="car-discover-btn" to="/careers/opportunities">
                <span>DISCOVER ROLES &rarr;</span>
              </Link>
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
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY GRANULES? The Employee Value Proposition (Stacking Panels) */}
        <div className="car-why">
          <div className="car-why-head">
            <div className="car-why-copy">
              <span className="car-why-tag">WHY GRANULES?</span>
              <h2>The Employee Value Proposition</h2>
              <p className="car-why-subtitle">Build depth. Take ownership. Grow with purpose.</p>
            </div>
          </div>

          {/* Panel 0: Your work matters */}
          <div className="car-panel car-panel--0" style={{ '--stack-index': 0 } as React.CSSProperties}>
            <div className="car-panel-image">
              <img src={`${A}panel-people-first.webp`} alt="Your work matters" />
            </div>
            <div className="car-panel-copy">
              <h3>Your Work Matters</h3>
              <p>
                Whether you improve a process, protect quality, solve a scientific challenge or support a team, your contribution helps make reliable medicines possible.
              </p>
            </div>
          </div>

          {/* Panel 1: Learn by doing & Own the outcome */}
          <div className="car-panel car-panel--1" style={{ '--stack-index': 1 } as React.CSSProperties}>
            <div className="car-panel-image">
              <img src={`${A}panel-grow-purpose.webp`} alt="Learn by doing" />
            </div>
            <div className="car-panel-copy">
              <h3>Learn by Doing</h3>
              <p>Grow through meaningful assignments, hands-on problem solving, cross-functional collaboration and exposure across the pharmaceutical value chain.</p>
              <div className="car-panel-list">
                <div className="car-panel-list-item">
                  <span className="car-panel-bullet">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="4" fill="#0061f8" />
                    </svg>
                  </span>
                  <p><strong>Own the outcome:</strong> Clear expectations and real responsibility give you room to make decisions, improve how work gets done and follow ideas through to impact.</p>
                </div>
                <div className="car-panel-list-item">
                  <span className="car-panel-bullet">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="4" fill="#0061f8" />
                    </svg>
                  </span>
                  <p><strong>Grow in more than one direction:</strong> Deepen your expertise, broaden your experience or explore a new path as the business evolves. Career stories should show real moves across roles, teams and geographies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Join responsible innovation & Belong to a team that delivers */}
          <div className="car-panel car-panel--2 reverse" style={{ '--stack-index': 2 } as React.CSSProperties}>
            <div className="car-panel-copy">
              <h3>Join Responsible<br />Innovation</h3>
              <p>
                Help advance green science, biocatalysis and continuous manufacturing while contributing to a more sustainable future for healthcare.
              </p>
              <div className="car-panel-list">
                <div className="car-panel-list-item">
                  <span className="car-panel-bullet">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="4" fill="#0061f8" />
                    </svg>
                  </span>
                  <p><strong>Belong to a team that delivers:</strong> Work with people who share knowledge, challenge respectfully and support one another to achieve stronger outcomes.</p>
                </div>
              </div>
            </div>
            <div className="car-panel-image">
              <img src={`${A}panel-innovation.webp`} alt="Responsible innovation" />
            </div>
          </div>

          {/* Panel 3: Care Beyond Careers */}
          <div className="car-panel car-panel--3" style={{ '--stack-index': 3 } as React.CSSProperties}>
            <div className="car-panel-image">
              <img src={`${A}panel-science-1.webp`} alt="Care beyond careers" />
            </div>
            <div className="car-panel-copy">
              <h3>Care Beyond Careers</h3>
              <p>
                At Granules, we invest not only in your professional growth but also in your wellbeing, health, and future. Because meaningful careers are built by helping people thrive, both at work and in life.
              </p>
            </div>
          </div>

          {/* Below-Stack Curtain Container */}
          <div className="car-below-stack">
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

            {/* Growth You Can Picture — Learning & Mobility Spotlight Card */}
            <div className="car-why-head" style={{ width: '85%', maxWidth: '85%', margin: '75px auto 0', padding: 0 }}>
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
                      <img src={b.image} alt={b.title} />
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

            {/* Candidate FAQ */}
            <div className="car-why-head" style={{ width: '85%', maxWidth: '85%', margin: '75px auto clamp(20px, 2.5vw, 30px)', padding: 0 }}>
              <div className="car-why-copy">
                <span className="car-why-tag">NEED CLARITY?</span>
                <h2>Candidate FAQ</h2>
              </div>
            </div>

            <div className="car-faq-section">
              <div className="car-faq-wrap">
                {CANDIDATE_FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div className="car-faq-item" key={idx}>
                      <button
                        type="button"
                        className="car-faq-question"
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="car-faq-q-text">{faq.q}</span>
                        <span className="car-faq-toggle">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
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
                      </button>
                      {isOpen && (
                        <div className="car-faq-answer">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
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
                        <label htmlFor="talent-location">Location / Preferred Hub *</label>
                        <input id="talent-location" type="text" placeholder="e.g. Hyderabad, India / Virginia, USA" required />
                      </div>

                      <div className="car-talent-field">
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

                      <div className="car-talent-consent">
                        <input id="talent-consent" type="checkbox" required />
                        <label htmlFor="talent-consent">
                          I consent to Granules India collecting and processing my personal data for recruitment communications and career updates in compliance with the Digital Personal Data Protection (DPDP) Act, 2023.
                        </label>
                      </div>

                      <div className="car-talent-btn-row">
                        <button type="submit" className="car-talent-submit-btn">Join Talent Community</button>
                        <Link to="/careers/opportunities" className="car-talent-link">
                          Or view active job openings &rarr;
                        </Link>
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
              <Link className="car-cta-apply-btn" to="/careers/opportunities">Apply for Roles &rarr;</Link>
            </div>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

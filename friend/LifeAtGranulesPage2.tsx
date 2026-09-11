import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

/* =========================================================================
   1. IMPACT IN NUMBERS STATS
   ========================================================================= */
const OVERVIEW_STATS = [
  { id: 'employees', value: '5,000+', label: 'Employees globally' },
  { id: 'countries', value: '100+', label: 'Countries reached' },
  { id: 'filings', value: '150+', label: 'Product filings' },
  { id: 'students', value: '1,000+', label: 'Students educated' },
];

/* =========================================================================
   2. CAREER AREAS
   ========================================================================= */
const CAREER_AREAS = [
  {
    id: 'rnd',
    tag: 'R&D',
    title: 'Research & Development',
    desc: 'Turn scientific possibilities into scalable, patient-focused solutions through research, analytical thinking and responsible innovation.',
    cta: 'Explore R&D Roles',
    bg: `${A}panel-science-1.webp`,
  },
  {
    id: 'mfg',
    tag: 'OPERATIONS',
    title: 'Manufacturing & Operations',
    desc: 'Make quality medicines reliably and responsibly through shop-floor excellence, process discipline and strong EHS practices.',
    cta: 'Explore Operations Roles',
    bg: `${A}work-matters-bg.webp`,
  },
  {
    id: 'qa',
    tag: 'COMPLIANCE',
    title: 'Quality & Regulatory',
    desc: 'Protect patients and earn trust through quality systems, regulatory discipline and a strong compliance mindset.',
    cta: 'Explore Quality & Regulatory Roles',
    bg: `${A}panel-innovation.webp`,
  },
  {
    id: 'commercial',
    tag: 'COMMERCIAL',
    title: 'Sales, Marketing, & Supply chain',
    desc: 'Understand customer needs, build market connections and strengthen supply networks to take Granules’ solutions reliably across the globe.',
    cta: 'Explore Commercial Roles',
    bg: `${A}hero-real.webp`,
  },
  {
    id: 'enabling',
    tag: 'CORPORATE',
    title: 'Enabling Functions',
    desc: 'Strengthen Granules through technology, finance, compliance, people practices and the support systems that enable sustainable growth.',
    cta: 'Explore Enabling Functions',
    bg: `${A}panel-grow-purpose.webp`,
  },
];

/* =========================================================================
   3. THE GRANULES WAY PRACTICES
   ========================================================================= */
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
    image: `${A}hero-real.webp`,
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
    image: `${A}beyond-workday-bg.webp`,
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

/* =========================================================================
   4. LIFE AT GRANULES (EVENTS)
   ========================================================================= */
const LIFE_EVENTS = [
  {
    id: 'family-fest',
    title: 'Family Fest',
    desc: 'A vibrant annual event where employees and families come together for culture, connection, and memorable moments beyond work.',
    image: `${A}beyond-workday-bg.webp`,
  },
  {
    id: 'sports-fest',
    title: 'Sports Fest + 5K Run',
    desc: 'High-energy sports events and a marathon that bring teams together, fuel healthy competition, and celebrate fitness, teamwork, and spirit.',
    image: `${A}hero-photo.webp`,
  },
  {
    id: 'womens-day',
    title: 'Women’s Day',
    desc: 'A celebration of women’s achievements, voices, and impact across Granules through inspiring conversations, recognition, and events.',
    image: `${A}panel-people-first.webp`,
  },
];

/* =========================================================================
   5. MEET THE PEOPLE BEHIND THE PROGRESS (VOICES FROM GRANULES)
   ========================================================================= */
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



/* =========================================================================
   6. WHAT HELPS YOU DO YOUR BEST (BENEFITS)
   ========================================================================= */
const BENEFITS = [
  {
    id: 'health',
    title: 'Health and wellbeing',
    desc: 'We support employees through medical benefits, safe workplaces and wellbeing initiatives that help people stay healthy and perform at their best.',
    image: `${A}panel-people-first.webp`,
  },
  {
    id: 'beyond',
    title: 'Beyond the workday',
    desc: 'We bring people together through sports tournaments, festival celebrations and team events that build connection, wellbeing and a shared sense of belonging.',
    image: `${A}beyond-workday-bg.webp`,
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
    image: `${A}work-matters-bg.webp`,
  },
];

/* =========================================================================
   7. CANDIDATE FAQS
   ========================================================================= */
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

/* =========================================================================
   MAIN COMPONENT: LIFE AT GRANULES
   ========================================================================= */
export default function LifeAtGranulesPage() {
  const [activeArea, setActiveArea] = useState<number>(0);
  const [practiceIdx, setPracticeIdx] = useState<number>(0);
  const [lifeEventIdx, setLifeEventIdx] = useState<number>(0);
  const [openBenefit, setOpenBenefit] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number>(-1);
  const [activeVoiceKey, setActiveVoiceKey] = useState<string | null>(null);

  const currentAreaBg = (activeArea >= 0 && CAREER_AREAS[activeArea]?.bg) ? CAREER_AREAS[activeArea].bg : CAREER_AREAS[0].bg;

  // Talent Community Form state
  const [talentForm, setTalentForm] = useState({
    name: '',
    email: '',
    location: '',
    interest: 'rnd',
    consent: false,
  });
  const [talentSubmitted, setTalentSubmitted] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Life at Granules | Make Better Health. Build a Bolder Career.';

    const descriptionContent =
      'Discover Life at Granules: join teams who turn science, scale and responsible innovation into medicines that support healthier lives worldwide.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPracticeIdx((prev) => (prev + 1) % GRANULES_WAY_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleTalentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!talentForm.consent) return;
    setTalentSubmitted(true);
    setTimeout(() => {
      setTalentForm({ name: '', email: '', location: '', interest: 'rnd', consent: false });
      setTalentSubmitted(false);
    }, 4000);
  };

  return (
    <div className="cp">
      <NavBar />

      <main>
        {/* Breadcrumb Navigation */}
        <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <Link to="/careers">CAREERS</Link>
          <span className="sep">›</span>
          <span className="current">LIFE AT GRANULES</span>
        </p>

        {/* Page Main Header */}
        <h1 className="cp-page-title">Make better health.<br />Build a bolder career.</h1>

        {/* Hero Visual Banner */}
        <div className="car-hero">
          <img src={`${A}life-hero.webp`} alt="Granules India colleagues in an informal discussion" />
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

        {/* ═════════════════════════════════════════════════════════════════════
            2. CAREER AREAS — Interactive Banner with Function Accordion (Matching Sustainability Card Design)
            ═════════════════════════════════════════════════════════════════════ */}
        <section
          className="car-areas-banner"
          style={{ backgroundImage: `url(${currentAreaBg})` }}
        >
          <div className="car-areas-banner-overlay" />

          <div className="car-areas-banner-copy">
            <span className="cp-section-badge">Discover Your Path</span>
            <h2>Where science, scale &amp; purpose meet</h2>
            <h4>
              Explore opportunities across our core scientific, manufacturing, and operational disciplines.
            </h4>
            <Link to="/careers/opportunities" className="car-areas-banner-cta">
              Discover Roles &rarr;
            </Link>
          </div>

          <div className="car-areas-accordion">
            {CAREER_AREAS.map((item, idx) => {
              const isOpen = activeArea === idx;
              return (
                <article className={`car-areas-acc-item ${isOpen ? 'open' : ''}`} key={item.id}>
                  <button
                    type="button"
                    className="car-areas-acc-btn"
                    onClick={() => setActiveArea(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="car-areas-acc-title">{item.title}</span>
                    <span className="car-areas-acc-toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="car-areas-acc-body">
                      <p>{item.desc}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            3. IMPACT IN NUMBERS STATS GRID
            ═════════════════════════════════════════════════════════════════════ */}
        <div className="car-ov-stats">
          <div className="car-ov-stats-grid">
            {OVERVIEW_STATS.map((stat) => (
              <div className="car-ov-stat-card" key={stat.id}>
                <p className="car-ov-stat-value">{stat.value}</p>
                <p className="car-ov-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            4. WHY GRANULES? The Employee Value Proposition (Stacking Panels)
            ═════════════════════════════════════════════════════════════════════ */}
        <div className="car-why">
          <div className="car-why-head">
            <div className="car-why-copy">
              <span className="cp-section-badge">Why Granules?</span>
              <h2>The Employee Value Proposition</h2>
              <h4>Build depth. Take ownership. Grow with purpose.</h4>
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="4" fill="#0061f8" />
                    </svg>
                  </span>
                  <p><strong>Own the outcome:</strong> Clear expectations and real responsibility give you room to make decisions, improve how work gets done and follow ideas through to impact.</p>
                </div>
                <div className="car-panel-list-item">
                  <span className="car-panel-bullet">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5">
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5">
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
            {/* ═════════════════════════════════════════════════════════════════
                5. THE GRANULES WAY
                ═════════════════════════════════════════════════════════════════ */}
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

            {/* ═════════════════════════════════════════════════════════════════
                6. GROWTH YOU CAN PICTURE (LEARNING & MOBILITY)
                ═════════════════════════════════════════════════════════════════ */}
            <div className="car-why-head">
              <div className="car-why-copy">
                <span className="cp-section-badge">Growth You Can Picture</span>
                <h2>Learning and Mobility</h2>
                <h4>
                  At Granules, learning is built into everyday work through structured training, capability building, cross-functional exposure and opportunities to grow across roles, teams and locations. One example is the Self-Managed Team Trainee Program, a future-ready talent program that gives young trainees early ownership, guided shop-floor exposure and hands-on learning across manufacturing operations, helping them build technical confidence, operational discipline and a strong foundation for long-term careers.
                </h4>
              </div>
            </div>


            {/* ═════════════════════════════════════════════════════════════════
                7. LIFE AT GRANULES (REAL PEOPLE. REAL MOMENTS.)
                ═════════════════════════════════════════════════════════════════ */}
            <div className="car-why-head">
              <div className="car-why-copy">
                <span className="cp-section-badge">Life at Granules</span>
                <h2>Real People. Real Moments.</h2>
                <h4>Serious about science does not mean serious all the time. Our teams connect through shared experiences that create energy, wellbeing and belonging.</h4>
              </div>
            </div>

            <div className="car-workday-wrap contained">
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

                <h2 className="car-workday-top-title">Life at Granules — Real People. Real Moments.</h2>

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

            {/* ═════════════════════════════════════════════════════════════════
                8. MEET THE PEOPLE BEHIND THE PROGRESS (VOICES FROM GRANULES)
                ═════════════════════════════════════════════════════════════════ */}
            <div className="car-testimonials-section">
              <div className="car-testimonials-header">
                <div className="car-why-copy">
                  <span className="cp-section-badge">Voices from Granules</span>
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
                              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
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
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </span>
                          <span className="icon-minus">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

            {/* ═════════════════════════════════════════════════════════════════
                9. WHAT HELPS YOU DO YOUR BEST (RECOGNITION, WELLBEING & BELONGING)
                ═════════════════════════════════════════════════════════════════ */}
            <div className="car-why-head">
              <div className="car-why-copy">
                <span className="cp-section-badge">Recognition, Wellbeing &amp; Belonging</span>
                <h2>What Helps You Do Your Best</h2>
                <h4>Candidates expect practical clarity. We provide comprehensive support across every dimension of employee life.</h4>
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
                  >
                    <button
                      className="car-benefit-toggle"
                      type="button"
                      onClick={() => setOpenBenefit(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${b.title}`}
                    >
                      <div className="car-benefit-img-wrap">
                        <img src={b.image} alt={b.title} loading="lazy" decoding="async" />
                      </div>

                      <div className="car-benefit-sheet">
                        <div className="car-benefit-sheet-head">
                          <span className="car-benefit-sheet-title">{b.title}</span>
                          <span className="car-benefit-symbol" aria-hidden="true">
                            {isOpen ? '−' : '+'}
                          </span>
                        </div>

                        <div className="car-benefit-sheet-body">
                          <p className="car-benefit-sheet-desc">{b.desc}</p>
                        </div>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>

            {/* ═════════════════════════════════════════════════════════════════
                10. CANDIDATE FAQ
                ═════════════════════════════════════════════════════════════════ */}
            <div className="car-why-head">
              <div className="car-why-copy">
                <span className="cp-section-badge">Need Clarity?</span>
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
                        <h4>{faq.q}</h4>
                        <span className="car-faq-toggle">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="car-faq-answer">
                          <h4>{faq.a}</h4>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════════════
                11. TALENT COMMUNITY FORM (NOT READY TO APPLY? STAY CURIOUS.)
                ═════════════════════════════════════════════════════════════════ */}
            <div className="car-talent-wrap">
              <div className="car-talent-card">
                <div className="car-talent-card-copy">
                  <span className="cp-section-badge">NOT READY TO APPLY? STAY CURIOUS.</span>
                  <h2>Join Our Talent Community</h2>
                  <h4>
                    Join the Granules Talent Community to receive relevant opportunities, career stories, and updates tailored to your professional interests.
                  </h4>
                </div>

                <form className="car-talent-form-grid" onSubmit={handleTalentSubmit}>
                  {talentSubmitted ? (
                    <div className="car-talent-success">
                      <h4>Thank you for connecting!</h4>
                      <p>You will receive career stories and opportunity alerts from Granules India.</p>
                    </div>
                  ) : (
                    <>
                      <div className="car-talent-field">
                        <label htmlFor="talent-name">Full Name *</label>
                        <input
                          id="talent-name"
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          required
                          value={talentForm.name}
                          onChange={(e) => setTalentForm({ ...talentForm, name: e.target.value })}
                        />
                      </div>

                      <div className="car-talent-field">
                        <label htmlFor="talent-email">Email Address *</label>
                        <input
                          id="talent-email"
                          type="email"
                          placeholder="e.g. rahul@example.com"
                          required
                          value={talentForm.email}
                          onChange={(e) => setTalentForm({ ...talentForm, email: e.target.value })}
                        />
                      </div>

                      <div className="car-talent-field">
                        <label htmlFor="talent-location">Location / Preferred Hub *</label>
                        <input
                          id="talent-location"
                          type="text"
                          placeholder="e.g. Hyderabad, India / Virginia, USA"
                          required
                          value={talentForm.location}
                          onChange={(e) => setTalentForm({ ...talentForm, location: e.target.value })}
                        />
                      </div>

                      <div className="car-talent-field">
                        <label htmlFor="talent-interest">Career Interest / Function *</label>
                        <select
                          id="talent-interest"
                          required
                          value={talentForm.interest}
                          onChange={(e) => setTalentForm({ ...talentForm, interest: e.target.value })}
                        >
                          <option value="rnd">Research &amp; Development</option>
                          <option value="mfg">Manufacturing &amp; Operations</option>
                          <option value="qa">Quality &amp; Regulatory</option>
                          <option value="commercial">Sales, Marketing &amp; Supply Chain</option>
                          <option value="corporate">Enabling Functions (IT, HR, Finance, Legal)</option>
                        </select>
                      </div>

                      <div className="car-talent-consent">
                        <input
                          id="talent-consent"
                          type="checkbox"
                          required
                          checked={talentForm.consent}
                          onChange={(e) => setTalentForm({ ...talentForm, consent: e.target.checked })}
                        />
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
              <img className="bg" src={`${A}life-cta-bg.webp`} alt="" />
              <div className="overlay" />
              <div className="car-cta-copy">
                <h2>Let&rsquo;s Grow Together</h2>
                <p>
                  Granules is where your ambition meets opportunity. Join a purpose-led community where your growth is the goal.
                </p>
              </div>
              <div className="car-cta-btn-row">
                <Link className="car-cta-apply-btn" to="/careers">Careers Overview &rarr;</Link>
                <Link className="car-cta-apply-btn" to="/careers/opportunities">Discover Roles &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

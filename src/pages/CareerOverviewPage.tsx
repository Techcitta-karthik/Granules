import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

const OVERVIEW_STATS = [
  { id: 'employees', value: '4,000+', label: 'Employees, globally' },
  { id: 'female-employees', value: '9.4%', label: 'Female Employees' },
  { id: 'return-to-work', value: '100%', label: 'Return-to-work rate' },
  { id: 'women-board', value: '25%', label: 'Women on the Board' },
];

const GROW_ITEMS = [
  'Identify: Spotting high-potential talent early and placing them in meaningful roles.',
  'Develop: Offering structured programs, on-the job learning, and hands-on mentorship.',
  'Grow: Empowering role transitions, global mobility, and continuous upskilling.',
];

const PRACTICE_SLIDES = [
  {
    id: 1,
    title: 'Performing',
    body: 'Every role is tied to clear goals aligned with business objectives. Performance is measured fairly and rewarded consistently.',
    image: `${A}work-matters-bg.png`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Challenging and Inspiring',
    body: 'We encourage employees to take risks and drive innovation. Our open-door policy & transparent work style foster creativity and mutual respect across hierarchies.',
    image: `${A}panel-innovation.png`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <rect x="7" y="13" width="3" height="5" rx="1" fill="#0061f8" />
        <rect x="12" y="9" width="3" height="9" rx="1" fill="#0061f8" />
        <rect x="17" y="5" width="3" height="13" rx="1" fill="#0061f8" />
        <path d="M7 11l5-5 5 2" />
        <path d="M15 6h2v2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Rewarding',
    body: 'Individuals and teams are recognized for their contributions through awards, spot recognitions, and growth opportunities—big and small wins matter.',
    image: `${A}hero-real.png`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
        <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
        <path d="M4 3h16v6a8 8 0 0 1-16 0V3z" />
        <path d="M12 17v4" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Learning and Growing',
    body: 'With over 24+ hours of learning per employee annually, and programs like WoW (Women of Wisdom) for leadership mentorship, we help you grow faster, smarter, stronger.',
    image: `${A}beyond-workday-bg.png`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        <path d="M10 2a3 3 0 0 1 4 0" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Caring',
    body: 'Granules invests in you and your family through comprehensive insurance, mental health counselling, and parental support. We are also committed to inclusion, with accessible infrastructure for differently-abled employees.',
    image: `/assets/company/values-bg-2.png`,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

export default function CareerOverviewPage() {
  const [practiceIdx, setPracticeIdx] = useState(0);

  useEffect(() => {
    document.title = 'Careers at Granules — Granules India';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPracticeIdx((prev) => (prev + 1) % PRACTICE_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <a href="/">HOME</a>
        <span className="sep">›</span>
        <span className="current">CAREERS</span>
        <span className="sep">›</span>
        <span className="current">Life at Granules</span>

      </p>
      <h1 className="cp-page-title">Life at Granules</h1>
      <p className="car-hero-tagline">Build Your Future in Science, Innovation, and Impact</p>

      <div className="car-hero">
        <img src={`${A}hero-real.png`} alt="Granules India colleagues collaborating in a lab" />
      </div>

      <div className="car-intro-row">
        <div className="car-intro-copy">
          <p className="lede">
            Every career at Granules contributes to better health outcomes for millions worldwide.
            <span className="muted"> Whether you are formulating life-saving medicines, advancing regulatory frameworks, or scaling sustainable manufacturing, your work creates real impact.</span>
          </p>
          <p className="sub">
            You&rsquo;ll join a team that supports, challenges, and values what you bring. Be part of
            a culture that celebrates curiosity, encourages bold thinking, and puts people at the
            center of everything we do.
          </p>
        </div>
        <Link className="car-cta-btn" to="/careers/opportunities">Explore Career Opportunities</Link>
      </div>

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

      <div className="car-why">
        <div className="car-why-head">
          <div className="car-why-copy">
            <span className="car-why-tag">Your Future at Granules</span>
            <h2>Why build your career at Granules?</h2>
            <p>We invest in building a capable, resilient, and future-ready workforce through</p>
          </div>
        </div>

        <div className="car-panel car-panel--0" style={{ '--stack-index': 0 } as React.CSSProperties}>
          <div className="car-panel-image">
            <img src={`${A}panel-people-first.png`} alt="Granules India scientists reviewing work together" />
          </div>
          <div className="car-panel-copy">
            <h3>People First</h3>
            <p>
              Our teams bring passion, expertise, and integrity to every challenge. We create a
              work environment that is inclusive, secure, and built on mutual trust &mdash;
              because people power our progress.
            </p>
          </div>
        </div>

        <div className="car-panel car-panel--1" style={{ '--stack-index': 1 } as React.CSSProperties}>
          <div className="car-panel-image">
            <img src={`${A}panel-grow-purpose.png`} alt="Granules India cleanroom technicians at work" />
          </div>
          <div className="car-panel-copy">
            <h3>Grow with Purpose</h3>
            <p>We believe in turning potential into progress through:</p>
            <div className="car-panel-list">
              {GROW_ITEMS.map((item) => (
                <div className="car-panel-list-item" key={item}>
                  <span className="car-panel-bullet">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="4" fill="#0061f8" />
                    </svg>
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="car-panel car-panel--2 reverse" style={{ '--stack-index': 2 } as React.CSSProperties}>
          <div className="car-panel-copy">
            <h3>Thrive in a Culture<br />of Innovation</h3>
            <p>
              We keep our doors and minds open. No matter your title or function, your ideas are
              heard, your work is visible, and your creativity is welcome.
            </p>
          </div>
          <div className="car-panel-image">
            <img src={`${A}panel-innovation.png`} alt="Granules India researcher examining a sample" />
          </div>
        </div>

        <div className="car-panel car-panel--3" style={{ '--stack-index': 3 } as React.CSSProperties}>
          <div className="car-panel-image">
            <img
              src={`${A}panel-science-1.png`}
              alt="Granules India green science and sustainable renewable manufacturing"
            />
          </div>
          <div className="car-panel-copy">
            <h3>Driven by Science<br />and Sustainability</h3>
            <p>
              Granules is advancing a future powered by green science, bio catalysts, and
              continuous manufacturing &mdash; all while minimising our carbon footprint.
              You&rsquo;ll be part of something bigger than yourself.
            </p>
          </div>
        </div>

        <div className="car-below-stack">
          <div className="car-practice-wrap">
            <div className="car-practice-banner">
              {PRACTICE_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`car-practice-slide-layer ${idx === practiceIdx ? 'active' : ''}`}
                >
                  <img src={slide.image} alt={slide.title} className="car-practice-bg" />
                  <div className="car-practice-overlay" />
                </div>
              ))}

              <h2 className="car-practice-headline">The Granules way &ndash; in practice</h2>

              <div className="car-practice-card" key={practiceIdx}>
                <div className="car-practice-card-icon">
                  {PRACTICE_SLIDES[practiceIdx].icon}
                </div>
                <h3>{PRACTICE_SLIDES[practiceIdx].title}</h3>
                <p>{PRACTICE_SLIDES[practiceIdx].body}</p>
              </div>

              <div className="car-practice-nav" aria-label="Slide indicators">
                {PRACTICE_SLIDES.map((slide, idx) => (
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

          <div className="car-cta-photo">
            <img className="bg" src={`${A}work-matters-bg.png`} alt="" />
            <div className="overlay" />
            <div className="car-cta-copy">
              <h2>A Place Where Your Work Matters</h2>
              <p>
                Step into a career with impact. Whether you&rsquo;re a scientist, operator, or
                strategist, your journey starts here.
              </p>
            </div>
            <Link className="car-cta-apply-btn" to="/careers/opportunities">Apply Now</Link>
          </div>
        </div>
      </div>

      <CompanyFooter />
    </div>
  );
}

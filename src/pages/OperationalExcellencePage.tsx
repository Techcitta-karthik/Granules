import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './operational-excellence.css';

const OE = '/assets/oe/';

const KEY_INITIATIVE_CARDS = [
  { title: 'Precision in Motion', image: 'card-precision-in-motion.png' },
  { title: 'Engineered for Safety', image: 'card-engineered-for-safety.png' },
  { title: 'Visibility Drives Results', image: 'card-visibility-drives-results.png' },
];

const BELTS = [
  'Black Belt : Strategic Change Leader',
  'Green Belt : Project Leader',
  'Yellow Belt : Team Contributor',
  'White Belt : Foundation Awareness',
];

export default function OperationalExcellencePage() {
  useEffect(() => {
    document.title = 'Operational Excellence — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Company</span>
        <span className="sep">{'>'}</span>
        <span className="current">Operational Excellence</span>
      </p>
      <h1 className="cp-page-title">Operational excellence</h1>
      <div className="cp-hero-banner">
        <img src={`${OE}hero-banner.png`} alt="Granules operational excellence" />
      </div>

      <div className="oe-intro">
        <p>
          Embedding a culture of continuous improvement, Granules redefines operational excellence
          through a people-first, data-driven, and tech-enabled approach. Every enhancement
          <span className="muted">, from the shop floor to enterprise systems, is designed to improve precision, reduce waste, and create sustainable value.</span>
        </p>
        <p>
          Employees are trained and empowered to solve problems, challenge assumptions, and
          deliver measurable results. A tiered, role-based training framework ensures lean
          thinking is applied in real-time through live and function-specific projects, building a
          culture of high performance across the organisation.
        </p>
      </div>

      <div className="oe-section">
        <div className="oe-section-head">
          <span className="cp-section-badge">Key Initiatives</span>
          <h2>Where technology and people drive sustainable performance</h2>
          <p>
            Automation, data analytics, and Lean Six Sigma combine to elevate quality, minimize
            waste, and accelerate decision-making across all manufacturing operations.
          </p>
        </div>
        <div className="oe-cards">
          {KEY_INITIATIVE_CARDS.map((card) => (
            <article className="oe-card" key={card.title}>
              <img className="bg" src={`${OE}${card.image}`} alt="" />
              <div className="oe-card-label">
                <span>{card.title}</span>
                <span className="oe-card-arrow">
                  <img src={`${OE}arrow-plus.svg`} alt="" style={{ width: 20, height: 20 }} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="oe-frontline">
        <h3>Lean at the frontline</h3>
        <div className="oe-frontline-card">
          <p>
            Our Lean Daily Management System (LDMS) brings clarity and focus to the frontline
            through visual controls, tiered huddles, and daily Gemba walks, embedding
            accountability and momentum into daily workflows. This system builds momentum and
            makes continuous improvement everyone&rsquo;s responsibility.
          </p>
        </div>
      </div>

      <div className="oe-impact">
        <div className="oe-impact-copy">
          <h2>Driving Measurable Impact</h2>
          <p>
            Teams drive continuous improvement in safety, quality, delivery, and morale. We
            empower employees through Kaizen and Lean Six Sigma certification to cultivate leaders
            who enhance quality, efficiency, and patient safety.
          </p>
          <div className="oe-belts">
            {BELTS.map((belt) => (
              <div className="oe-belt" key={belt}>
                <span>{belt}</span>
                <img src={`${OE}icon-minus.svg`} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="oe-pyramid">
          <img src={`${OE}belt-pyramid.svg`} alt="OE belt program pyramid: White, Yellow, Green, Black" />
        </div>
      </div>

      <div className="oe-cta">
        <img className="bg" src={`${OE}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="oe-cta-copy">
          <h2>Celebrating our achievements</h2>
          <p>
            From breakthrough innovations to sustainable practices, these accolades highlight our
            pursuit of progress.
          </p>
        </div>
        <a className="cp-cta-btn" href="/company/awards">Awards</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

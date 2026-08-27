import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './gls.css';

const G = '/assets/gls/';

const CAPABILITY_CARDS = [
  { title: 'Automated production', image: 'card-automated-production.png' },
  { title: 'Lean process design', image: 'card-lean-process.png' },
  { title: 'Digital oversight', image: 'card-digital-oversight.png' },
];

export default function GranulesLifeSciencesPage() {
  useEffect(() => {
    document.title = 'Granules Life Sciences — Granules India';
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
        <span className="current">Granules life sciences</span>
      </p>
      <h1 className="cp-page-title">Granules Life Sciences</h1>
      <div className="cp-hero-banner">
        <img src={`${G}hero-banner.png`} alt="Granules Life Sciences facility" />
      </div>

      <div className="gls-intro">
        <p>
          <span>Granules Life Sciences (GLS) is a wholly owned subsidiary of Granules India, located in Genome Valley, Hyderabad. GLS is a state-of-the-art vertically integrated manufacturing facility capable of producing 10 billion oral solid dosage (OSD) units annually, </span>
          <span className="muted">approved by the USFDA and with EU GMP certification underway.</span>
        </p>
        <p>
          Strategically designed layout in five acres of land to produce 10 billion oral solid
          dosages/annum with additional 14 acres of land reserved for future expansion—ensuring we
          are equipped to meet growing global demand with speed, flexibility, and compliance. With
          advanced automation, GMP-compliant infrastructure, and green manufacturing systems at
          its core, GLS is built for precision, reliability, and sustained growth.
        </p>
      </div>

      <div className="gls-section">
        <div className="gls-section-head">
          <span className="cp-section-badge">Operational Excellence</span>
          <h2>High-performance formulation manufacturing</h2>
          <p>
            With automated production lines, lean process design, and digital oversight, we
            deliver consistent quality with high throughput and shorter lead time for supplies
            into regulated markets.
          </p>
        </div>
        <div className="gls-cards">
          {CAPABILITY_CARDS.map((card) => (
            <article className="gls-card" key={card.title}>
              <img className="bg" src={`${G}${card.image}`} alt="" />
              <div className="gls-card-label">
                <span>{card.title}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="gls-culture">
        <img className="bg" src={`${G}culture-of-action-bg.png`} alt="" />
        <div className="overlay" />
        <div className="gls-culture-inner">
          <h3>Future-ready and responsible</h3>
          <div className="gls-culture-card">
            <p>
              Built for long-term responsibility, the site integrates sustainable design,
              energy-efficient systems, and advanced safety protocols, ensuring operational
              excellence without compromising environmental or workforce safety standards. GLS
              reflects our commitment to building a future-ready pharmaceutical supply chain.
            </p>
          </div>
        </div>
      </div>

      <div className="gls-cta">
        <img className="bg" src={`${G}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="gls-cta-copy">
          <h2>Advanced technologies for complex formulations</h2>
          <p>
            From immediate to modified release, our advanced technologies drive precision,
            patient compliance, and formulation innovation.
          </p>
        </div>
        <a className="cp-cta-btn" href="/#business">Finished Dosages</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

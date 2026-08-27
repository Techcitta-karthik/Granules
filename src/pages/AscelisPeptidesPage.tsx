import { useEffect, useRef } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './ascelis.css';

const A = '/assets/ascelis/';

const CORE_FOCUS = [
  { title: 'Peptide-based APIs & Generics', image: 'card-peptide-apis.png' },
  { title: 'Specialized CDMO Services', image: 'card-cdmo-services.png' },
  { title: 'Cosmetic Peptides', image: 'card-cosmetic-peptides.png' },
  { title: 'Theragnostic Peptides', image: 'card-theragnostic-peptides.png' },
];

const FOOTPRINT = ['Senn Chemicals AG (Switzerland)', 'Ascelis India (Upcoming)', 'IIT Hyderabad R&D Lab'];

export default function AscelisPeptidesPage() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Ascelis Peptides Private Limited — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const scroll = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 500, behavior: 'smooth' });
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Company</span>
        <span className="sep">{'>'}</span>
        <span className="current">Ascelis Peptides Private Limited</span>
      </p>
      <h1 className="cp-page-title">Ascelis Peptides Private Limited</h1>
      <div className="cp-hero-banner">
        <img src={`${A}hero-banner.png`} alt="Ascelis Peptides facility" />
      </div>

      <div className="asc-intro">
        <p>
          <span>Granules India&rsquo;s entry into the peptide space marks a transformational milestone, anchored by the acquisition of Senn Chemicals AG — a Swiss CDMO with over 60 years of peptide synthesis expertise. </span>
          <span className="muted">This move strengthens our capabilities across therapeutic, cosmetic, and diagnostic peptides, and enables a globally integrated platform under Ascelis Peptides.</span>
        </p>
        <p>
          Built to serve the fast-evolving $100–150 billion peptide therapeutics market, Ascelis
          combines Swiss precision and Indian scalability to support development across GLP-1
          receptor agonists, oncology peptides, peptide-drug conjugates, and amino acid
          derivatives.
        </p>
      </div>

      <div className="asc-section-head">
        <div className="copy">
          <span className="cp-section-badge">Core focus area</span>
          <h2>An integrated platform for scalable peptide innovation</h2>
          <p>
            With operations spanning Switzerland and India, Ascelis Peptides offers end-to-end
            capabilities from early-stage R&amp;D to commercial manufacturing.
          </p>
        </div>
        <a className="cp-cta-btn" href="/company">Learn more</a>
      </div>

      <div className="asc-carousel">
        <div className="asc-track" ref={trackRef}>
          {CORE_FOCUS.map((card) => (
            <article className="asc-card" key={card.title}>
              <img className="bg" src={`${A}${card.image}`} alt="" />
              <div className="asc-card-label">
                <span>{card.title}</span>
                <span className="asc-card-arrow">
                  <img src={`${A}arrow-plus.svg`} alt="" style={{ width: 20, height: 20 }} />
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="asc-carousel-nav">
          <button type="button" aria-label="Scroll left" onClick={() => scroll(-1)}>
            <img src={`${A}carousel-arrow-left.svg`} alt="" />
          </button>
          <button type="button" aria-label="Scroll right" onClick={() => scroll(1)}>
            <img src={`${A}carousel-arrow-right.svg`} alt="" />
          </button>
        </div>
      </div>

      <div className="asc-motion">
        <div className="asc-motion-copy">
          <h3>Science, speed, and sustainability in motion</h3>
          <p>
            The Company is backed by a clear execution plan to ensure rapid, responsible growth
            across geographies:
          </p>
        </div>
        <div className="asc-progress">
          <span className="active" />
          <span /><span /><span /><span /><span />
        </div>
        <div className="asc-motion-card">
          <img src={`${A}icon-molecule.svg`} alt="" />
          <p>New peptide R&amp;D lab at IIT Hyderabad, aligned with Senn&rsquo;s Swiss R&amp;D</p>
        </div>
      </div>

      <div className="asc-footprint">
        <div>
          <h2>Manufacturing and research footprint</h2>
          <p>
            Two continents, one integrated peptide platform — combining Swiss legacy expertise
            with India&rsquo;s manufacturing scale.
          </p>
        </div>
        <div className="asc-footprint-grid">
          {FOOTPRINT.map((title) => (
            <article className="asc-placeholder-card" key={title}>
              <div className="asc-placeholder-label">{title}</div>
            </article>
          ))}
        </div>
      </div>

      <div className="asc-cta">
        <img className="bg" src={`${A}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="asc-cta-copy">
          <h2>Explore Senn Chemicals</h2>
          <p>Learn more about Senn&rsquo;s six-decade legacy and peptide expertise at www.sennchem.com</p>
        </div>
        <a className="cp-cta-btn" href="https://www.sennchem.com" target="_blank" rel="noreferrer">Visit website</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

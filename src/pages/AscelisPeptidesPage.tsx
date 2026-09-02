import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './ascelis.css';

const A = '/assets/ascelis/';

type CapabilityCard = { title: string; image: string; desc: string };

const CORE_FOCUS: CapabilityCard[] = [
  {
    title: 'Peptide-based APIs & Generics',
    image: 'card-peptide-apis.webp',
    desc: 'Scalable synthesis and high-purity production of therapeutic peptide APIs and complex generic formulations.',
  },
  {
    title: 'Specialized CDMO Services',
    image: 'card-cdmo-services.webp',
    desc: 'Comprehensive contract development and manufacturing from early-phase lead optimization to commercial batches.',
  },
  {
    title: 'Cosmetic Peptides',
    image: 'card-cosmetic-peptides.webp',
    desc: 'High-efficacy bioactive peptides and custom formulations tailored for advanced cosmeceutical applications.',
  },
  {
    title: 'Theragnostic Peptides',
    image: 'card-theragnostic-peptides.webp',
    desc: 'Next-generation peptides combining precision diagnostic molecular imaging with targeted cellular drug delivery.',
  },
];

type FootprintCard = { title: string; desc: string };

const FOOTPRINT: FootprintCard[] = [
  {
    title: 'Senn Chemicals AG (Switzerland)',
    desc: 'Established CDMO hub in Dielsdorf with 60+ years of peptide synthesis expertise, Swissmedic-approved facilities, and cGMP compliance.',
  },
  {
    title: 'Ascelis India (Upcoming)',
    desc: 'Large-scale commercial peptide manufacturing facility in Genome Valley, Hyderabad, driving scalable production and global access.',
  },
  {
    title: 'IIT Hyderabad R&D Lab',
    desc: 'Collaborative research and development center specializing in advanced peptide chemistry, process analytical technologies, and novel synthesis routes.',
  },
];

export default function AscelisPeptidesPage() {
  const {
    swipeProps,
    isDragging,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
  } = useSwipeScroll();
  const [openCard, setOpenCard] = useState(-1);
  const [openFootprintCard, setOpenFootprintCard] = useState(-1);

  useEffect(() => {
    document.title = 'Ascelis Peptides Private Limited — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Company</span>
        <span className="sep">{'>'}</span>
        <span className="current">Ascelis Peptides Private Limited</span>
      </p>
      <h1 className="cp-page-title">Ascelis Peptides Private Limited</h1>
      <div className="cp-hero-banner">
        <img src={`${A}hero-banner.webp`} alt="Ascelis Peptides facility" loading="eager" decoding="async" />
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

      <div className="biz-carousel">
        <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
          {CORE_FOCUS.map((card, idx) => {
            const isOpenCard = openCard === idx;
            return (
              <article
                className={`biz-card${isOpenCard ? ' is-open' : ''}`}
                key={card.title}
                onMouseEnter={() => setOpenCard(idx)}
                onMouseLeave={() => setOpenCard(-1)}
                onClick={() => setOpenCard(isOpenCard ? -1 : idx)}
              >
                <img className="bg" src={`${A}${card.image}`} alt={card.title} loading="lazy" decoding="async" />
                <div className="biz-sheet">
                  <div className="biz-sheet-head">
                    <span className="biz-sheet-title">{card.title}</span>
                    <span className="biz-sheet-symbol" aria-hidden="true">+</span>
                  </div>
                  <div className="biz-sheet-body">
                    <p className="biz-sheet-desc">{card.desc}</p>
                    <span className="biz-sheet-learn">LEARN MORE ↗</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dynamic progress bar and smooth arrow navigation */}
        <div className="biz-carousel-controls">
          <div className="biz-progress-track">
            <div
              className="biz-progress-bar"
              style={{
                width: `${thumbWidth}%`,
                left: `${scrollProgress * (100 - thumbWidth)}%`,
              }}
            />
          </div>
          <div className="biz-carousel-arrows">
            <button
              type="button"
              className="biz-arrow-btn"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              className="biz-arrow-btn"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
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
          <img src={`${A}icon-molecule.svg`} alt="" loading="lazy" decoding="async" />
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
          {FOOTPRINT.map((item, idx) => {
            const isOpen = openFootprintCard === idx;
            return (
              <article
                className={`biz-card biz-card--placeholder${isOpen ? ' is-open' : ''}`}
                key={item.title}
                onMouseEnter={() => setOpenFootprintCard(idx)}
                onMouseLeave={() => setOpenFootprintCard(-1)}
                onClick={() => setOpenFootprintCard(isOpen ? -1 : idx)}
              >
                <div className="biz-sheet">
                  <div className="biz-sheet-head">
                    <span className="biz-sheet-title">{item.title}</span>
                    <span className="biz-sheet-symbol" aria-hidden="true">+</span>
                  </div>
                  <div className="biz-sheet-body">
                    <p className="biz-sheet-desc">{item.desc}</p>
                    <span className="biz-sheet-learn">LEARN MORE ↗</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="asc-cta">
        <img className="bg" src={`${A}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
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

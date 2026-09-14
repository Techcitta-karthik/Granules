import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './senn-tides.css';

const PORTFOLIO_ITEMS = [
  {
    title: 'Peptide APIs',
    image: '/assets/rd/card-synthesis.webp',
    desc: 'Short sequences to chains exceeding 40 amino acid residues, including cyclic, bridged and lipidated structures.',
  },
  {
    title: 'Amino Acid Derivatives',
    image: '/assets/rd/card-catalysis.webp',
    desc: 'More than 190 catalogue SKUs, including Fmoc-, Boc- and Z-protected derivatives, beta-amino acids, N-methylated derivatives and side-chain-modified derivatives.',
  },
  {
    title: 'Peptide Fragments',
    image: '/assets/rd/card-solvents.webp',
    desc: 'Building blocks supplied to innovators and peptide manufacturers.',
  },
  {
    title: 'Theranostic Peptides',
    image: '/assets/rd/priority-future-ready-technologies.webp',
    desc: 'Linker-ready peptides, chelator conjugation, purification and characterisation, supported by experience across more than ten GMP campaigns.',
  },
  {
    title: 'Cosmetic Peptides',
    image: '/assets/rd/card-biocatalysis.webp',
    desc: 'TFA-free peptide ingredients developed for the European cosmetics market.',
  },
  {
    title: 'Expanding Platform',
    image: '/assets/rd/priority-scientific-capabilities.webp',
    desc: 'Alongside its established peptide capabilities, Senn Tides is expanding into oligonucleotides and antibody-drug conjugates.',
  },
];

const SYNTHESIS_ROUTES = [
  {
    route: 'Solid Phase (SPPS)',
    scale: 'mg to a few kg',
    advantage: 'Complex and lower-volume peptides',
  },
  {
    route: 'Liquid Phase (LPPS)',
    scale: '5 kg to tons',
    advantage: 'Large-scale manufacturing',
  },
  {
    route: 'Hybrid',
    scale: 'Project-dependent',
    advantage: 'Combination of SPPS and LPPS',
  },
  {
    route: 'Tag-Assisted (TAPS)',
    scale: 'Project-dependent',
    advantage: 'Reduced purification burden',
  },
];

const PHASES = [
  {
    phase: '1',
    quantity: 'Under 1 g',
    activity: 'Feasibility, analytical sample and route finding',
    image: '/assets/peptides/step-1.webp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.5L4.5 19.5A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-2.5L14 9.5V2" />
        <line x1="8.5" y1="2" x2="15.5" y2="2" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  {
    phase: '2',
    quantity: 'Under 100 g',
    activity: 'Process and purification development',
    image: '/assets/peptides/step-2.webp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="7" r="2.4" />
        <circle cx="18" cy="7" r="2.4" />
        <circle cx="12" cy="17" r="2.4" />
        <line x1="7.8" y1="8.6" x2="10.4" y2="15.2" />
        <line x1="16.2" y1="8.6" x2="13.6" y2="15.2" />
        <line x1="8.4" y1="7" x2="15.6" y2="7" />
      </svg>
    ),
  },
  {
    phase: '3',
    quantity: '1 to 10 kg',
    activity: 'Scale-up, pilot or initial production batch',
    image: '/assets/peptides/step-3.webp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
      </svg>
    ),
  },
  {
    phase: '4',
    quantity: 'Above 10 kg',
    activity: 'Commercial production with capability extending to ton scale',
    image: '/assets/peptides/step-4.webp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

const CAPABILITIES = [
  {
    title: 'GMP Manufacturing',
    desc: 'Glass-lined and hydrogenation reactors up to 2,500 L, with SPPS capacity for up to 12 kg of resin.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    bg: '/assets/facilities/senn-chemicals-dielsdorf.jpg',
  },
  {
    title: 'Purification and Isolation',
    desc: 'Preparative HPLC using DAC columns up to 30 cm internal diameter, filtration, centrifugation, drying and lyophilisation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    ),
    bg: '/assets/peptides/offers-bg.webp',
  },
  {
    title: 'Development Support',
    desc: 'Route scouting, process development, analytical method development and validation, stability studies, DMF preparation and technology-transfer support.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    bg: '/assets/ascelis/card-cdmo-services.webp',
  },
  {
    title: 'Analytical Support',
    desc: 'Physical characterisation, impurity identification, residual-solvent and pharmacopeial testing, chromatographic assays, enantiomeric-purity analysis, spectrometric techniques, HPLC, GC, potentiometric titration and Karl Fischer water determination.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </svg>
    ),
    bg: '/assets/peptides/hero-banner.webp',
  },
];

const FOOTPRINT_ITEMS = [
  {
    country: 'Switzerland',
    title: 'Dielsdorf, Switzerland',
    desc: 'R&D, kilo-scale development, GMP production, QC, QA and warehousing. The site has been operational since 1963 and employs more than 80 people.',
    image: '/assets/facilities/Senn Chem.png',
    flag: (
      <svg width="22" height="22" viewBox="0 0 512 512" style={{ borderRadius: '6px', flexShrink: 0 }}>
        <rect width="512" height="512" fill="#d52b1e" />
        <rect width="115" height="300" x="198.5" y="106" fill="#ffffff" />
        <rect width="300" height="115" x="106" y="198.5" fill="#ffffff" />
      </svg>
    ),
  },
  {
    country: 'India',
    title: 'Hyderabad, India',
    desc: 'Development, process optimisation, structural characterisation, analytical capabilities and access to large-scale manufacturing.',
    image: '/assets/facilities/gagillapur.png',
    flag: (
      <svg width="22" height="22" viewBox="0 0 512 512" style={{ borderRadius: '6px', flexShrink: 0 }}>
        <rect width="512" height="170.7" fill="#ff9933" />
        <rect y="170.7" width="512" height="170.6" fill="#ffffff" />
        <rect y="341.3" width="512" height="170.7" fill="#138808" />
        <circle cx="256" cy="256" r="46" fill="none" stroke="#000080" strokeWidth="8" />
        <circle cx="256" cy="256" r="14" fill="#000080" />
      </svg>
    ),
  },
  {
    country: 'India',
    title: 'Vizag, India',
    desc: 'A large-scale peptide manufacturing facility is being developed on a 283,000 sq. ft. site, with completion expected by December 2027.',
    image: '/assets/facilities/vizag-unit5.png',
    flag: (
      <svg width="22" height="22" viewBox="0 0 512 512" style={{ borderRadius: '6px', flexShrink: 0 }}>
        <rect width="512" height="170.7" fill="#ff9933" />
        <rect y="170.7" width="512" height="170.6" fill="#ffffff" />
        <rect y="341.3" width="512" height="170.7" fill="#138808" />
        <circle cx="256" cy="256" r="46" fill="none" stroke="#000080" strokeWidth="8" />
        <circle cx="256" cy="256" r="14" fill="#000080" />
      </svg>
    ),
  },
];

export default function PeptidesPage() {
  const [openCard, setOpenCard] = useState<number>(-1);
  const [openCapability, setOpenCapability] = useState<number>(0);
  const {
    swipeProps,
    isDragging,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
  } = useSwipeScroll();

  useEffect(() => {
    document.title = 'Peptides | Senn Tides CDMO Platform | Granules India';

    const descriptionContent =
      'Explore Senn Tides’ peptide CDMO capabilities across custom peptide APIs, amino acid derivatives, fragments and theranostic peptides, from feasibility through commercial supply.';

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      'peptide CDMO, custom peptide synthesis, peptide API manufacturer, amino acid derivatives, LPPS peptide manufacturing, cosmetic peptides'
    );

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      {/* Hero Section matching CompanyPage / Overview / Generics standard */}
      <section className="cp-hero">
        <p className="cp-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <Link to="/business">BUSINESS</Link>
          <span className="sep">›</span>
          <span className="current">PEPTIDE CDMO</span>
        </p>

        <h1 className="cp-page-title">Peptide CDMO</h1>

        <div className="cp-hero-panel">
          <video
            className="senn-hero-video"
            src="/assets/peptides/hero-banner.mp4"
            poster="/assets/peptides/hero-banner-poster.webp"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            aria-label="Custom peptide development and manufacturing, from feasibility to commercial supply"
          />
          <div className="senn-hero-scrim" />
          <div className="senn-hero-overlay">
            <h3 className="peptides-hero-heading">
              Custom Peptide Development and Manufacturing, from Feasibility to Commercial Supply
            </h3>
          </div>
        </div>
      </section>

      {/* About Description matching standard business typography */}
      <div className="cp-about-desc senn-intro">
        <h4>
          Senn Tides is a wholly owned subsidiary of Granules India and its integrated CDMO platform, with an established foundation in peptides and expansion into oligonucleotides and antibody-drug conjugates underway. Through Senn Chemicals AG and our India operations, we support peptide programs from route selection and process development through scale-up, validation and commercial supply.
        </h4>
      </div>

      {/* Highlight Statistics */}
      <div className="peptides-stats-grid">
        <div className="peptides-stat-card">
          <strong className="peptides-stat-val">60+</strong>
          <span className="peptides-stat-label">Years of Peptide Synthesis</span>
        </div>
        <div className="peptides-stat-card">
          <strong className="peptides-stat-val">2,500 L</strong>
          <span className="peptides-stat-label">Maximum Reactor Capacity</span>
        </div>
        <div className="peptides-stat-card">
          <strong className="peptides-stat-val">190+</strong>
          <span className="peptides-stat-label">Catalogue Amino Acid Derivatives</span>
        </div>
        <div className="peptides-stat-card">
          <strong className="peptides-stat-val">2</strong>
          <span className="peptides-stat-label">Continents Integrated Swiss &amp; India Network</span>
        </div>
      </div>

      {/* Our Portfolio Section */}
      <section className="senn-section-head" aria-label="Our Portfolio">
        <div className="copy">
          <span className="cp-section-badge">Portfolio</span>
          <h2>Our Portfolio</h2>
          <h4>
            Custom peptide APIs, catalogue building blocks, and emerging modalities supporting development from feasibility to commercial supply.
          </h4>
        </div>
      </section>

      {/* Portfolio Carousel */}
      <div className="biz-carousel senn-portfolio-carousel">
        <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
          {PORTFOLIO_ITEMS.map((card, idx) => {
            const isOpen = openCard === idx;
            return (
              <article
                className={`biz-card senn-cap-article${isOpen ? ' is-open' : ''}`}
                key={card.title}
                onMouseEnter={() => setOpenCard(idx)}
                onMouseLeave={() => setOpenCard(-1)}
                onClick={() => {
                  if (isDragging) return;
                  setOpenCard(isOpen ? -1 : idx);
                }}
              >
                <img className="bg" src={card.image} alt={card.title} loading="lazy" decoding="async" />
                <div className="biz-sheet">
                  <div className="biz-sheet-head">
                    <span className="biz-sheet-title">{card.title}</span>
                    <span className="biz-sheet-symbol" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  <div className="biz-sheet-body">
                    <p className="biz-sheet-desc">{card.desc}</p>
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

      {/* Four Synthesis Routes Section */}
      <section className="senn-routes-section" aria-label="Four Synthesis Routes">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Synthesis Methodologies</span>
            <h2>Four Synthesis Routes</h2>
            <h4>
              Our platform brings together four synthesis approaches, enabling route selection based on the molecule, target scale and purification requirements.
            </h4>
          </div>
        </div>

        {/* Synthesis Table */}
        <div className="senn-routes-table-wrap">
          <table className="senn-routes-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Typical Scale</th>
                <th>Key Application or Advantage</th>
              </tr>
            </thead>
            <tbody>
              {SYNTHESIS_ROUTES.map((row) => (
                <tr key={row.route}>
                  <td className="senn-route-name">{row.route}</td>
                  <td>
                    <span className="senn-route-scale">{row.scale}</span>
                  </td>
                  <td>{row.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Why Liquid Phase Matters Hero Callout */}
        <div className="senn-lpps-callout">
          <h3 className="callout-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Why liquid phase matters
          </h3>
          <h4>
            For suitable molecules, LPPS can offer substantially lower process mass intensity than SPPS and may reduce or eliminate chromatography, supporting the commercial viability of large-scale peptide manufacturing.
          </h4>
        </div>
      </section>

      {/* From Feasibility to Commercial Supply (Ascending Staircase / Step Progression) */}
      <section className="senn-staircase-section peptides-lifecycle" aria-label="From Feasibility to Commercial Supply">
        <div className="senn-staircase-card">
          <div className="senn-staircase-head">
            <span className="cp-section-badge">Lifecycle Progression</span>
            <h2>From Feasibility to Commercial Supply</h2>
            <h4>
              Programs can progress within the same CDMO platform, reducing the need for an external vendor transfer as volumes grow.
            </h4>
          </div>

          <div className="senn-staircase-track-wrap">
            <svg className="cdmo-staircase-svg" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M 82,122 C 210,112 250,92 338,82 S 560,58 688,50 S 840,40 922,36"
                fill="none"
                stroke="#5aa6ff"
                strokeWidth="2.75"
                strokeDasharray="7 10"
                strokeLinecap="round"
              />
            </svg>

            <div className="senn-staircase-grid">
              {PHASES.map((p, idx) => (
                <div className={`cdmo-step-card step-${idx + 1}`} key={p.phase}>
                  <div className="cdmo-step-media">
                    <img src={p.image} alt={`${p.quantity} — ${p.activity}`} />
                    <span className="cdmo-step-node" />
                  </div>
                  <div className="cdmo-step-body">
                    <div className="cdmo-step-icon-wrap">{p.icon}</div>
                    <span className="cdmo-step-phase">Phase {p.phase}</span>
                    <h3 className="cdmo-step-qty">{p.quantity}</h3>
                    <p className="cdmo-step-desc">{p.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing and Development Capabilities (Interactive Hero Accordion Card) */}
      <section
        className="peptides-capabilities-section"
        aria-label="Manufacturing and Development Capabilities"
      >
        <div className="senn-section-head">
          <span className="cp-section-badge">Infrastructure &amp; Capabilities</span>
        </div>

        <div className="peptides-capabilities-hero">
          <div
            className="peptides-cap-bg"
            style={{
              backgroundImage: `url(${CAPABILITIES[openCapability]?.bg || CAPABILITIES[0].bg})`,
            }}
          />
          <div className="peptides-cap-overlay" />
          <div className="peptides-cap-copy">
            <h2>Manufacturing and Development Capabilities</h2>
            <h4>
              Scalable equipment trains engineered for small-scale development, kilo-scale pilot trials, and commercial cGMP campaigns.
            </h4>
          </div>

          <div className="peptides-cap-accordion">
            {CAPABILITIES.map((cap, idx) => (
              <article
                className={openCapability === idx ? 'open' : ''}
                key={cap.title}
              >
                <button
                  type="button"
                  className="peptides-cap-btn-row"
                  onClick={() => setOpenCapability(openCapability === idx ? -1 : idx)}
                >
                  <span className="peptides-cap-accordion-head">
                    <span className="peptides-cap-icon-circle">
                      {cap.icon}
                    </span>
                    <span className="peptides-cap-title">{cap.title}</span>
                  </span>
                  <span className="peptides-cap-toggle">
                    {openCapability === idx ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </span>
                </button>

                {openCapability === idx && (
                  <div className="peptides-cap-body">
                    <p>{cap.desc}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quality and Compliance */}
      <section className="peptides-compliance-section" aria-label="Quality and compliance">
        <div className="peptides-compliance-panel">
          <img src="/assets/peptides/quality-compliance-bg.png" alt="Quality and compliance" loading="lazy" decoding="async" />
          <div className="peptides-compliance-overlay" />
          <div className="peptides-compliance-content">
            <span className="peptides-compliance-badge">QUALITY &amp; COMPLIANCE</span>
            <h3>
              Senn Chemicals is ISO 9001:2015 certified and authorized by Swissmedic for cGMP manufacturing. Quality systems, documentation practices and change-control processes are designed to support customer filings in the United States, Europe and other regulated markets.
            </h3>
          </div>
        </div>
      </section>

      {/* Switzerland and India Footprint */}
      <section className="senn-footprint-section" aria-label="Switzerland and India footprint">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Global Footprint</span>
            <h2>Switzerland and India footprint</h2>
          </div>
        </div>

        <div className="senn-footprint-grid">
          {FOOTPRINT_ITEMS.map((loc) => (
            <article className="senn-footprint-card" key={loc.title}>
              <div className="senn-footprint-card-head">
                <div className="senn-footprint-flag-wrap">{loc.flag}</div>
                <span className="senn-footprint-tag">{loc.country}</span>
              </div>
              <h3 className="senn-footprint-title">{loc.title}</h3>
              <p className="senn-footprint-desc">{loc.desc}</p>
              <div className="senn-footprint-img-wrap">
                <img src={loc.image} alt={loc.title} loading="lazy" decoding="async" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Discuss Your Peptide Program */}
      <section className="senn-cta" aria-label="Discuss Your Peptide Program">
        <div className="senn-cta-copy">
          <h2>Discuss Your Peptide Program</h2>
          <h4>
            Connect with our CDMO team for peptide feasibility, process development, scale-up or commercial supply.
          </h4>
        </div>

        <div className="senn-cta-actions">
          <Link to="https://sennchemicals.com" target="_blank" rel="noopener noreferrer" className="senn-cta-btn senn-cta-btn--primary">
            <span> Visit Senn Chemicals</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <CompanyFooter />
    </div>
  );
}

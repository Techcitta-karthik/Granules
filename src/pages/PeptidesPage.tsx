import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './senn-tides.css';

const PORTFOLIO_ITEMS = [
  {
    title: 'Peptide APIs',
    image: '/assets/ascelis/card-peptide-apis.webp',
    desc: 'Short sequences to chains exceeding 40 amino acid residues, including cyclic, bridged and lipidated structures.',
  },
  {
    title: 'Amino acid derivatives',
    image: '/assets/ascelis/card-cdmo-services.webp',
    desc: 'More than 190 catalogue SKUs, including Fmoc-, Boc- and Z-protected derivatives, beta-amino acids, N-methylated derivatives and side-chain-modified derivatives.',
  },
  {
    title: 'Peptide fragments',
    image: '/assets/peptides/card-generic-apis.webp',
    desc: 'Building blocks supplied to innovators and peptide manufacturers.',
  },
  {
    title: 'Theranostic peptides',
    image: '/assets/ascelis/card-theragnostic-peptides.webp',
    desc: 'Linker-ready peptides, chelator conjugation, purification and characterisation, supported by experience across more than ten GMP campaigns.',
  },
  {
    title: 'Cosmetic peptides',
    image: '/assets/ascelis/card-cosmetic-peptides.webp',
    desc: 'TFA-free peptide ingredients developed for the European cosmetics market.',
  },
  {
    title: 'Expanding platform',
    image: '/assets/peptides/card-contract-services.webp',
    desc: 'Alongside its established peptide capabilities, Senn Tides is expanding into oligonucleotides and antibody-drug conjugates.',
  },
];

const SYNTHESIS_ROUTES = [
  {
    route: 'Solid phase (SPPS)',
    scale: 'mg to a few kg',
    advantage: 'Complex and lower-volume peptides',
  },
  {
    route: 'Liquid phase (LPPS)',
    scale: '5 kg to tons',
    advantage: 'Large-scale manufacturing',
  },
  {
    route: 'Hybrid',
    scale: 'Project-dependent',
    advantage: 'Combination of SPPS and LPPS',
  },
  {
    route: 'Tag-assisted (TAPS)',
    scale: 'Project-dependent',
    advantage: 'Reduced purification burden',
  },
];

const PHASES = [
  {
    phase: '1',
    quantity: 'Under 1 g',
    activity: 'Feasibility, analytical sample and route finding',
  },
  {
    phase: '2',
    quantity: 'Under 100 g',
    activity: 'Process and purification development',
  },
  {
    phase: '3',
    quantity: '1 to 10 kg',
    activity: 'Scale-up, pilot or initial production batch',
  },
  {
    phase: '4',
    quantity: 'Above 10 kg',
    activity: 'Commercial production with capability extending to ton scale',
  },
];

const CAPABILITIES = [
  {
    title: 'GMP manufacturing',
    desc: 'Glass-lined and hydrogenation reactors up to 2,500 L, with SPPS capacity for up to 12 kg of resin.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: 'Purification and isolation',
    desc: 'Preparative HPLC using DAC columns up to 30 cm internal diameter, filtration, centrifugation, drying and lyophilisation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    ),
  },
  {
    title: 'Development support',
    desc: 'Route scouting, process development, analytical method development and validation, stability studies, DMF preparation and technology-transfer support.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Analytical support',
    desc: 'Physical characterisation, impurity identification, residual-solvent and pharmacopeial testing, chromatographic assays, enantiomeric-purity analysis, spectrometric techniques, HPLC, GC, potentiometric titration and Karl Fischer water determination.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </svg>
    ),
  },
];

const FOOTPRINT_ITEMS = [
  {
    country: 'Switzerland',
    title: 'Dielsdorf, Switzerland',
    desc: 'R&D, kilo-scale development, GMP production, QC, QA and warehousing. The site has been operational since 1963 and employs more than 80 people.',
  },
  {
    country: 'India',
    title: 'Hyderabad, India',
    desc: 'Development, process optimisation, structural characterisation, analytical capabilities and access to large-scale manufacturing.',
  },
  {
    country: 'India',
    title: 'Vizag, India',
    desc: 'A large-scale peptide manufacturing facility is being developed on a 283,000 sq. ft. site, with completion expected by December 2027.',
  },
];

export default function PeptidesPage() {
  const [openCard, setOpenCard] = useState<number>(-1);
  const {
    swipeProps,
    isDragging,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
  } = useSwipeScroll();

  const introRef = useRef<HTMLDivElement>(null);
  const [isIntroScrolled, setIsIntroScrolled] = useState<boolean>(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!introRef.current) return;
      const rect = introRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerPoint = viewportHeight * 0.45;
      setIsIntroScrolled(rect.top < triggerPoint);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
          <span className="current">PEPTIDES</span>
        </p>

        <h1 className="cp-page-title">Peptides</h1>

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
          <div className="cp-hero-badge">Senn Tides CDMO</div>
          <div className="cp-scroll-indicator">
            <img src="/assets/oe/scroll-down-icon.webp" alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* About Description with Scroll Highlight - matching About Us / Overview */}
      <div
        ref={introRef}
        className={`cp-about-desc${isIntroScrolled ? ' is-scrolled' : ''}`}
      >
        <p>
          <span className="part-1">
            Senn Tides is Granules India&rsquo;s dedicated peptide CDMO platform, with an established foundation in Swiss peptide chemistry and complementary large-scale manufacturing infrastructure in India.
          </span>{' '}
          <span className="part-2">
            Operating across Zurich, Switzerland, and Hyderabad, India, we support global innovators and pharmaceutical developers from early route scouting and process development through scale-up, validation, and commercial supply.
          </span>
        </p>
        <p className="part-2">
          Combining over 60 years of Swiss peptide synthesis heritage with multi-ton industrial scale, continuous flow technology, and green chemistry, Senn Tides provides an integrated, one-partner lifecycle for complex peptide therapeutics, fragments, amino acid derivatives, and advanced modalities.
        </p>
      </div>

      {/* Highlight Statistics */}
      <div className="peptides-stats-grid">
        <div className="peptides-stat-card">
          <span className="peptides-stat-val">60+</span>
          <span className="peptides-stat-label">Years of Peptide Synthesis</span>
        </div>
        <div className="peptides-stat-card">
          <span className="peptides-stat-val">2,500 L</span>
          <span className="peptides-stat-label">Maximum Reactor Capacity</span>
        </div>
        <div className="peptides-stat-card">
          <span className="peptides-stat-val">190+</span>
          <span className="peptides-stat-label">Catalogue Amino Acid Derivatives</span>
        </div>
        <div className="peptides-stat-card">
          <span className="peptides-stat-val">2 Continents</span>
          <span className="peptides-stat-label">Integrated Swiss &amp; India Network</span>
        </div>
      </div>

      <div className="cp-divider" />

      {/* Our portfolio Section */}
      <section className="senn-section-head" aria-label="Our portfolio">
        <div className="copy">
          <span className="cp-section-badge">Our Portfolio</span>
          <h2>Our portfolio</h2>
          <p>
            Custom peptide APIs, catalogue building blocks, and emerging modalities supporting development from feasibility to commercial supply.
          </p>
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

      {/* Four synthesis routes Section */}
      <section className="senn-routes-section" aria-label="Four synthesis routes">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Synthesis Methodologies</span>
            <h2>Four synthesis routes</h2>
            <p>
              Our platform brings together four synthesis approaches, enabling route selection based on the molecule, target scale and purification requirements.
            </p>
          </div>
        </div>

        {/* Synthesis Table */}
        <div className="senn-routes-table-wrap">
          <table className="senn-routes-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Typical scale</th>
                <th>Key application or advantage</th>
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

        {/* Why liquid phase matters Hero Callout */}
        <div className="senn-lpps-callout">
          <h4>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Why liquid phase matters
          </h4>
          <p>
            For suitable molecules, LPPS can offer substantially lower process mass intensity than SPPS and may reduce or eliminate chromatography, supporting the commercial viability of large-scale peptide manufacturing.
          </p>
        </div>
      </section>

      {/* From feasibility to commercial supply */}
      <section className="senn-phases-section" aria-label="From feasibility to commercial supply">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Lifecycle Progression</span>
            <h2>From feasibility to commercial supply</h2>
            <p>
              Programs can progress within the same CDMO platform, reducing the need for an external vendor transfer as volumes grow.
            </p>
          </div>
        </div>

        <div className="senn-phases-grid">
          {PHASES.map((p) => (
            <div className="senn-phase-card" key={p.phase}>
              <span className="senn-phase-num-badge">Phase {p.phase}</span>
              <span className="senn-phase-qty">{p.quantity}</span>
              <p className="senn-phase-act">{p.activity}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manufacturing and development capabilities */}
      <section className="senn-capacity-section" aria-label="Manufacturing and development capabilities">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Infrastructure &amp; Capabilities</span>
            <h2>Manufacturing and development capabilities</h2>
            <p>
              Scalable equipment trains engineered for small-scale development, kilo-scale pilot trials, and commercial cGMP campaigns.
            </p>
          </div>
        </div>

        <div className="peptides-capacity-grid">
          {CAPABILITIES.map((cap) => (
            <div className="senn-capacity-card" key={cap.title}>
              <h3>
                <span className="senn-capacity-icon-badge">{cap.icon}</span>
                {cap.title}
              </h3>
              <p>{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quality and compliance */}
      <section className="senn-compliance-section" aria-label="Quality and compliance">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Standards &amp; Regulatory</span>
            <h2>Quality and compliance</h2>
            <p>
              Quality systems, documentation practices, and change-control processes designed to support customer filings in the United States, Europe, and other regulated markets.
            </p>
          </div>
        </div>

        <div className="senn-compliance-grid">
          <div className="senn-compliance-card">
            <h4>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              ISO 9001 &amp; Swissmedic cGMP
            </h4>
            <p>
              Senn Chemicals is ISO 9001:2015 certified and authorized by Swissmedic for cGMP manufacturing of peptide APIs and specialized derivatives.
            </p>
          </div>

          <div className="senn-compliance-card">
            <h4>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Switzerland–US GMP MRA
            </h4>
            <p>
              Operations align with the Switzerland–United States GMP Mutual Recognition Agreement, facilitating seamless regulatory recognition for US programs.
            </p>
          </div>

          <div className="senn-compliance-card">
            <h4>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Global Filings &amp; Audits
            </h4>
            <p>
              Comprehensive DMF submission support, full analytical batch data, and a 60-year successful track record of customer and regulatory audits.
            </p>
          </div>
        </div>
      </section>

      {/* Switzerland and India footprint */}
      <section className="senn-footprint-section" aria-label="Switzerland and India footprint">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Global Footprint</span>
            <h2>Switzerland and India footprint</h2>
            <p>
              Combining over 60 years of Swiss peptide synthesis heritage with multi-ton industrial scale and R&amp;D infrastructure in India.
            </p>
          </div>
        </div>

        <div className="senn-footprint-grid">
          {FOOTPRINT_ITEMS.map((loc) => (
            <div className="senn-footprint-card" key={loc.title}>
              <span className="senn-footprint-country">{loc.country}</span>
              <h3>{loc.title}</h3>
              <p>{loc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Discuss your peptide program */}
      <section className="senn-cta" aria-label="Discuss your peptide program">
        <div className="senn-cta-copy">
          <h2>Discuss your peptide program</h2>
          <p>
            Connect with our CDMO team for peptide feasibility, process development, scale-up or commercial supply.
          </p>
        </div>

        <div className="senn-cta-actions">
          <Link to="/contact" className="senn-cta-btn senn-cta-btn--primary">
            <span>Contact Our Team</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="http://www.sennchem.com"
            target="_blank"
            rel="noreferrer"
            className="senn-cta-btn senn-cta-btn--secondary"
          >
            <span>Visit Senn Chemicals</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </section>

      <CompanyFooter />
    </div>
  );
}

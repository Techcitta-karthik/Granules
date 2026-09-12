import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './senn-tides.css';

interface CapabilityCard {
  title: string;
  image: string;
  desc: ReactNode;
}

const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title: 'Peptide APIs',
    image: '/assets/rd/card-synthesis.webp',
    desc: 'Peptides ranging from short sequences to chains exceeding 40 amino acid residues, including cyclic, bridged and lipidated structures.',
  },
  {
    title: 'Amino Acid Derivatives',
    image: '/assets/rd/card-catalysis.webp',
    desc: 'Senn Chemicals pioneered AAD synthesis and it remains a core capability. Our catalogue includes more than 190 SKUs, including Fmoc-, Boc- and Z-protected derivatives, beta-amino acids, N-methylated derivatives and side-chain-modified derivatives. Selected derivatives can be manufactured under the same cGMP quality systems applied to our peptide APIs.',
  },
  {
    title: 'Peptide Fragments',
    image: '/assets/rd/card-solvents.webp',
    desc: 'Building blocks supplied to innovators and to other peptide manufacturers.',
  },
  {
    title: 'Theranostic Peptides',
    image: '/assets/rd/priority-future-ready-technologies.webp',
    desc: 'Linker-ready peptides, chelator conjugation, purification and characterisation. We have delivered more than ten GMP campaigns, including cold-side precursor supply at commercial scale.',
  },
  {
    title: 'Cosmetic Peptides',
    image: '/assets/rd/card-biocatalysis.webp',
    desc: 'TFA-free peptide ingredients developed for the European cosmetics market.',
  },
  {
    title: 'Oligonucleotides and Antibody-Drug Conjugates',
    image: '/assets/rd/priority-scientific-capabilities.webp',
    desc: (
      <>
        <strong>Expansion is underway.</strong>
        <br />
        <br />
        We work with pharmaceutical innovators, cosmetic brand owners and specialty therapeutic developers.
      </>
    ),
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

const PHASES_DATA = [
  {
    phase: '1',
    quantity: 'Under 1 g',
    stage: 'Feasibility & Scouting',
    activity: 'Feasibility, analytical sample, route finding',
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
    stage: 'Process Development',
    activity: 'Process and purification development, representative sample',
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
    stage: 'Scale-Up & Pilot',
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
    stage: 'Commercial Production',
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

const MANUFACTURING_DATA = [
  {
    category: 'GMP Manufacturing, Dielsdorf',
    badge: 'Switzerland Facility',
    description: 'Commercial and pilot cGMP production hub with comprehensive synthesis, purification, and isolation suites.',
    image: '/assets/peptides/footprint-dielsdorf.jpg',
    items: [
      'Stainless steel reactor 2,500 L, operating from -20 °C to 150 °C',
      'Glass-lined reactors range from 100 to 2,500 L, operating from -20 °C to 150 °C',
      'Hydrogenation reactors range from 20 to 2,500 L, operating at pressures up to 6 bar',
      'SPPS synthesizer, with capacity for up to 12 kg of resin',
      'Preparative HPLC chromatography using DAC columns up to 30 cm internal diameter',
      'Filtration using Nutsche and pressurised filters, together with centrifugation under nitrogen',
      'Vacuum tray drying, filter drying and lyophilisation with an ice-condensing capacity of up to 20 kg',
    ],
  },
  {
    category: 'Kilo Laboratory',
    badge: 'Pilot & Scale-Up',
    description: 'Specialized kilo-scale pilot plant for process optimization and mid-scale intermediate development.',
    image: '/assets/peptides/card-contract-services.png',
    items: [
      'Jacketed glass reactors range from 10 to 30 L',
      'Hydrogenation reactors up to 20 L',
      'Purification by ion exchange, reversed phase HPLC and normal phase chromatography',
    ],
  },
  {
    category: 'Small-Scale GMP Laboratory',
    badge: 'Clinical Supply',
    description: 'Controlled cGMP environment designed for early-phase clinical batches and precision aliquoting.',
    image: '/assets/facilities/senn-safety.jpg',
    items: [
      'LPPS from mg to 0.5 kg, SPPS at 0.5, 2 and 5 L',
      'Double-jacketed glass reactors, 0.25 to 5 L, -40 °C to 180 °C',
      'API aliquoting into vials, up to 2,000 vials per batch',
      'Open product handling under laminar airflow within a Grade D equivalent environment',
    ],
  },
];



const FOOTPRINT_LIST = [
  {
    country: 'Switzerland',
    location: 'Senn Chemicals AG, Dielsdorf, Zurich',
    details: 'R&D, kilo-scale development, GMP production, QC, QA and warehousing. The site employs more than 80 people and has been operational since 1963.',
    image: '/assets/peptides/footprint-dielsdorf.jpg',
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
    location: 'Hyderabad',
    details: 'Development, process optimisation, structural characterisation and analytical capabilities.',
    image: '/assets/peptides/footprint-hyderabad.jpg',
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
    location: 'Vizag',
    details: 'Large-scale peptide manufacturing facility under development, with completion expected by December 2027.',
    image: '/assets/peptides/footprint-vizag.jpg',
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

interface LeaderMember {
  name: string;
  title: string;
  image: string;
}

const LEADERSHIP_TEAM: LeaderMember[] = [
  {
    name: 'Sanjay Kumar',
    title: 'Chief Executive Officer',
    image: '/assets/peptides/sanjay-kumar.jpg',
  },
  {
    name: 'Frédéric Besançon',
    title: 'Chief Executive Officer, Senn Chemicals',
    image: '/assets/peptides/frederic-besancon.jpg',
  },
  {
    name: 'Dr Srinivas PV',
    title: 'Chief Scientific Officer',
    image: '/assets/peptides/dr-pv-srinivas.jpg',
  },
  {
    name: 'Markus Löweneck',
    title: 'Head of Corporate R&D',
    image: '/assets/peptides/markus-loweneck.jpg',
  },
];

export default function SennTidesPage() {
  const [openCard, setOpenCard] = useState<number>(-1);
  const [flippedMfgCard, setFlippedMfgCard] = useState<number | null>(null);
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
    document.title = 'Senn Tides | Peptide CDMO in Switzerland and India | Granules India';

    const descriptionContent =
      'Senn Tides is Granules India’s peptide CDMO platform, providing custom peptide APIs, amino acid derivatives, fragments and theranostic peptides from feasibility through commercial supply.';

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      {/* Breadcrumbs */}
      <p className="cp-breadcrumb">
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/company">ABOUT US</Link>
        <span className="sep">›</span>
        <Link to="/company/global-subsidiaries">GLOBAL SUBSIDIARIES</Link>
        <span className="sep">›</span>
        <span className="current">SENN TIDES</span>
      </p>

      {/* Page Title */}
      <h1 className="senn-page-header">Senn Tides Private Limited</h1>

      {/* Hero Banner */}
      <div className="senn-hero-wrap">
        <div className="cp-hero-banner">
          <img
            src="/assets/ascelis/hero-banner.webp"
            alt="Senn Tides Integrated CDMO Facility"
            loading="eager"
            decoding="async"
          />
          <div className="senn-hero-scrim" />
          <div className="senn-hero-overlay">
            <span className="senn-hero-badge">
              <span className="senn-flag-dot" />
              Switzerland &amp; India
            </span>
            <h2 className="senn-hero-heading">
              Integrated CDMO Platform. Switzerland and India.
            </h2>
          </div>
        </div>
      </div>

      {/* Overview Intro */}
      <section className="senn-intro" aria-label="Overview">
        <h2>Overview</h2>
        <h4>
          Senn Tides is a wholly owned subsidiary of Granules India and its integrated CDMO platform, with an established foundation in peptides and expansion into oligonucleotides and antibody-drug conjugates underway. It was incorporated in June 2025 following Granules India&rsquo;s acquisition of Senn Chemicals AG, a Swiss peptide CDMO founded in Dielsdorf, Zurich, in 1963.
        </h4>
        <h4>
          We operate development and manufacturing capabilities across Dielsdorf, Switzerland, and Hyderabad, India. Zurich operations form the core of our CDMO offerings, with a long track record in R&amp;D, process development and small-scale manufacturing of peptide APIs, peptide fragments and protected AADs for pharmaceutical innovators, cosmetic companies and theranostic developers. Building on this Swiss foundation, Senn Tides is developing a two-continent operating model, with complementary large-scale infrastructure, R&amp;D and manufacturing in India.
        </h4>
        <h4>
          Customers are supported by one integrated platform and project team across both geographies.
        </h4>
      </section>

      {/* What We Do Section */}
      <section className="senn-section-head" aria-label="What We Do">
        <div className="copy">
          <h2>What We Do</h2>
          <h4>
            We provide custom development and manufacturing services for peptide ingredients, from route selection and process development through scale-up, validation and commercial supply.
          </h4>
        </div>
        <a className="cp-cta-btn" href="https://www.sennchem.com" target="_blank" rel="noreferrer">
          Visit Senn Chemicals ↗
        </a>
      </section>

      {/* Interactive Capabilities Carousel */}
      <div className="biz-carousel senn-portfolio-carousel">
        <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
          {CAPABILITY_CARDS.map((card, idx) => {
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
                    <span className="biz-sheet-learn">LEARN MORE ↗</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Controls */}
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

      {/* Four Synthesis Routes Table */}
      <section className="senn-routes-section" aria-label="Four Synthesis Routes">
        <div className="senn-section-head">
          <div className="copy">
            <h2>Four Synthesis Routes</h2>
            <h4>
              Most peptide manufacturers run one synthesis platform and fit every molecule to it. Our platform brings together four synthesis approaches, enabling route selection based on the molecule, target scale and purification requirements.
            </h4>
          </div>
        </div>

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

        {/* Why Liquid Phase Matters Callout */}
        <div className="senn-lpps-callout">
          <h3 className="callout-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Why Liquid Phase Matters
          </h3>
          <h4>
            For suitable molecules, LPPS can offer substantially lower process mass intensity than SPPS and may reduce or eliminate chromatography. This can materially improve the commercial viability of large-scale peptide manufacturing. It is where Senn Chemicals built its reputation and it remains our core strength.
          </h4>
        </div>
      </section>

      {/* From Feasibility to Commercial Supply (Ascending Staircase / Step Progression) */}
      <section className="senn-staircase-section peptides-lifecycle" aria-label="From feasibility to commercial supply">
        <div className="senn-staircase-card">
          <div className="senn-staircase-head">
            <span className="cp-section-badge">Lifecycle Progression</span>
            <h2>From feasibility to commercial supply</h2>
            <h4>
              Programs can progress from feasibility to commercial supply within the same CDMO platform, reducing the need for an external vendor transfer.
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
              {PHASES_DATA.map((p, idx) => (
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

      {/* Manufacturing Capacity (Signature Ice-Blue Cards Grid) */}
      <section className="senn-block-section" aria-label="Manufacturing Capacity">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Infrastructure &amp; Scale</span>
            <h2>Manufacturing Capacity</h2>
            <h4>
              Comprehensive pilot, clinical, and commercial equipment trains operating under Swissmedic cGMP standards.
            </h4>
          </div>
        </div>

        <div className="senn-mfg-grid-3">
          {MANUFACTURING_DATA.map((block, idx) => (
            <div
              className={`senn-mfg-flip-card ${flippedMfgCard === idx ? 'flipped' : ''}`}
              key={block.category}
              onClick={() => setFlippedMfgCard((prev) => (prev === idx ? null : idx))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlippedMfgCard((prev) => (prev === idx ? null : idx));
                }
              }}
              tabIndex={0}
              role="region">

              <div className="senn-mfg-flip-inner">
                {/* Front Face with Image and Summary Header */}
                <div className="senn-mfg-card-front">
                  <img src={block.image} alt={block.category} className="senn-mfg-front-img" loading="lazy" decoding="async" />
                  <div className="senn-mfg-front-overlay" />
                  <div className="senn-mfg-front-content">
                    <span className="senn-front-badge">{block.badge}</span>
                    <h3 className="senn-mfg-front-title">{block.category}</h3>
                    <p className="senn-mfg-front-desc">{block.description}</p>
                  </div>
                </div>

                {/* Back Face with Full Technical Specifications */}
                <div className="senn-mfg-card-back">
                  <div className="senn-mfg-box-head">
                    <span className="senn-stat-tag">{block.badge}</span>
                    <h3 className="senn-mfg-box-title">{block.category}</h3>
                    <p className="senn-mfg-box-desc">{block.description}</p>
                  </div>
                  <ul className="senn-mfg-box-list">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <span className="senn-box-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Development & Analytics + Quality & Compliance Sticky Overlapping Stack */}
      <section className="senn-stack-wrap" aria-label="Development, Analytics, Quality & Compliance">

        <div className="senn-stack-panel senn-stack-panel--dev">
          <img src="/assets/company/vision-bg.png" alt="Development and analytical support" loading="lazy" decoding="async" />
          <div className="senn-stack-overlay" />
          <div className="senn-stack-content">
            <span className="senn-stack-badge">DEVELOPMENT &amp; ANALYTICS</span>
            <h3>
              An experienced R&amp;D team, including doctoral-level scientists, provides route scouting, process development, analytical method development and validation, stability studies, DMF preparation and technology-transfer support. Analytical capabilities include physical characterisation, impurity identification, residual-solvent testing, pharmacopeial testing, chromatographic assays, enantiomeric-purity analysis, spectrometric techniques, HPLC, GC, potentiometric titration and Karl Fischer water determination.
            </h3>
          </div>
        </div>

        <div className="senn-stack-panel senn-stack-panel--quality">
          <img src="/assets/peptides/quality-compliance-bg.png" alt="Quality and compliance" loading="lazy" decoding="async" />
          <div className="senn-stack-overlay" />
          <div className="senn-stack-content">
            <span className="senn-stack-badge">QUALITY &amp; COMPLIANCE</span>
            <h3>
              Senn Chemicals is ISO 9001:2015 certified and authorized by Swissmedic for cGMP manufacturing. The site also operates within the regulatory context of the Switzerland–United States GMP Mutual Recognition Agreement. We operate quality systems, documentation practices and change-control processes designed to support customer filings in the United States, Europe and other regulated markets.
            </h3>
          </div>
        </div>
      </section>

      {/* Footprint (Clean & Minimal 3-Card Grid with Facility Images) */}
      <section className="senn-footprint-section" aria-label="Footprint">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Global Footprint</span>
            <h2>Footprint</h2>
          </div>
        </div>

        <div className="senn-footprint-grid">
          {FOOTPRINT_LIST.map((loc) => (
            <article className="senn-footprint-card" key={loc.location}>
              <div className="senn-footprint-card-head">
                <div className="senn-footprint-flag-wrap">{loc.flag}</div>
                <span className="senn-footprint-tag">{loc.country}</span>
              </div>
              <h3 className="senn-footprint-title">{loc.location}</h3>
              <p className="senn-footprint-desc">{loc.details}</p>
              <div className="senn-footprint-img-wrap">
                <img src={loc.image} alt={loc.location} loading="lazy" decoding="async" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Building capacity in India */}
      <section className="senn-block-section senn-capacity-section" aria-label="Building capacity in India">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Infrastructure &amp; Capacity</span>
            <h2>Building capacity in India</h2>
          </div>
        </div>

        <div className="senn-capacity-banner">
          {/* Right-Side Facility Image Container (Nicely Framed & Unzoomed) */}
          <div className="senn-cap-banner-img-wrap">
            <img
              src="/assets/peptides/iit-hyderabad-rd.jpg"
              alt="IIT Hyderabad Technology Research Park Development Centre"
              className="senn-cap-banner-bg"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Angled Brand Blue Left Panel & Depth Scrim Overlay */}
          <div className="senn-cap-banner-angled-panel" />
          <div className="senn-cap-banner-scrim" />

          {/* Banner Content */}
          <div className="senn-cap-banner-content">
            <div className="senn-cap-banner-body">
              <h4 className="senn-cap-banner-text">
                The Senn Tides development centre at the Technology Research Park, IIT Hyderabad, supports peptide development, process optimization and structural characterization across LPPS, SPPS, hybrid and tag-assisted synthesis. Analytical capabilities include LC-MS, circular dichroism, MALS, HPLC and GC.
              </h4>
              <h4 className="senn-cap-banner-text senn-cap-banner-mfg">
                <span className="senn-cap-mfg-label">Manufacturing.</span> A large-scale peptide manufacturing facility is being developed on a 283,000 sq. ft. site in Vizag, with completion expected by December 2027.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership (4-Card Photo Grid matching Leadership Page style) */}
      <section className="senn-block-section senn-leadership-section" aria-label="Leadership">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Leadership</span>
            <h2>Executive Leadership</h2>
            <h4>
              Guided by experienced scientific and commercial leaders driving peptide CDMO innovation worldwide.
            </h4>
          </div>
        </div>

        <div className="senn-lead-grid-4">
          {LEADERSHIP_TEAM.map((leader) => (
            <article className="senn-lead-card" key={leader.name}>
              <div className="senn-lead-photo">
                <img
                  src={leader.image}
                  alt={leader.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="senn-lead-info">
                <h3 className="senn-lead-name">{leader.name}</h3>
                <p className="senn-lead-title">{leader.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact Locations (Ice-Blue 2-Card Grid) */}
      <section className="senn-block-section" aria-label="Contact">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Contact</span>
            <h2>Connect with Our CDMO Team</h2>
            <h4>
              Discuss your development and manufacturing program with Senn Tides across our Swiss and Indian headquarters.
            </h4>
          </div>
        </div>

        <div className="senn-grid-2">
          <article className="senn-feature-card">
            <span className="senn-stat-tag">Switzerland Headquarters</span>
            <h3 className="senn-feature-title">Senn Chemicals AG</h3>
            <address className="senn-address-text">
              Industriestrasse 12<br />
              CH-8157 Dielsdorf, Zurich<br />
              Switzerland
            </address>
            <div className="senn-contact-img-wrap">
              <img
                src="/assets/peptides/card-contract-services.png"
                alt="Senn Chemicals AG - Dielsdorf, Zurich, Switzerland"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>
          <article className="senn-feature-card">
            <span className="senn-stat-tag">India Headquarters</span>
            <h3 className="senn-feature-title">Senn Tides Private Limited</h3>
            <address className="senn-address-text">
              15th Floor, Granules Tower,<br />
              Botanical Garden Road, Kondapur,<br />
              Hyderabad 500084, Telangana<br />
              India
            </address>
            <div className="senn-contact-img-wrap">
              <img
                src="/assets/peptides/images.jpg"
                alt="Senn Tides Private Limited - Hyderabad, India"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="senn-cta" aria-label="Connect with Senn Tides">
        <div className="senn-cta-copy">
          <h2>Discuss Your Development and Manufacturing Program with Senn Tides</h2>
          <h4>
            Connect with our CDMO team for peptide feasibility, process development, scale-up or commercial supply.
          </h4>
          <div className="senn-cta-links">
            <span>Email: <a href="mailto:sales@sennchem.com">sales@sennchem.com</a></span>
            <span>Web: <a href="https://www.sennchem.com" target="_blank" rel="noreferrer">www.sennchem.com</a></span>
          </div>
        </div>

        <div className="senn-cta-actions">
          <a
            href="https://www.sennchem.com"
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

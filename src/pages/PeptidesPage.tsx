import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './senn-tides.css';

interface SolutionStep {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const PEPTIDE_SOLUTIONS_STEPS: SolutionStep[] = [
  {
    id: 'route-selection',
    title: 'Route Selection',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0048bc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <line x1="21" y1="21" x2="15.2" y2="15.2" />
      </svg>
    ),
  },
  {
    id: 'process-development',
    title: 'Process Development',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0048bc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.5L4.5 19.5A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-2.5L14 9.5V2" />
        <line x1="8.5" y1="2" x2="15.5" y2="2" />
        <circle cx="10" cy="16.5" r="1" fill="#0048bc" />
        <circle cx="14" cy="15" r="1" fill="#0048bc" />
      </svg>
    ),
  },
  {
    id: 'gmp-production',
    title: 'GMP Production',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0048bc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1.5" />
        <path d="M9 11h6" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    id: 'commercial-supply',
    title: 'Commercial Supply',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0048bc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="14" height="12" rx="1.5" />
        <polygon points="15 8 19 8 22 11 22 16 15 16 15 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

const PORTFOLIO_ITEMS = [

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
    title: 'Peptide APIs',
    image: '/assets/rd/card-synthesis.webp',
    desc: 'Short sequences to chains exceeding 40 amino acid residues, including cyclic, bridged and lipidated structures.',
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
          <span className="cp-breadcrumb-plain">BUSINESS</span>
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
              Custom Peptide Development Manufacturing Solutions
            </h3>
          </div>
        </div>
      </section>


      {/* End-to-End Peptide CDMO Solutions Process Flow */}
      <section className="peptides-solutions-section" aria-label="End-to-End Peptide CDMO Solutions">
        <div className="peptides-solutions-flow">
          {PEPTIDE_SOLUTIONS_STEPS.map((step, index) => (
            <Fragment key={step.id}>
              <div className="peptides-solution-card">
                <div className="peptides-solution-icon-wrap" aria-hidden="true">
                  {step.icon}
                </div>
                <h3 className="peptides-solution-title">{step.title}</h3>
              </div>
              {index < PEPTIDE_SOLUTIONS_STEPS.length - 1 && (
                <div className="peptides-solution-arrow" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0048bc" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <polyline points="14 6 20 12 14 18" />
                  </svg>
                </div>
              )}
            </Fragment>
          ))}
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
          <strong className="peptides-stat-val">200+</strong>
          <span className="peptides-stat-label">Catalogue Amino Acid Derivatives</span>
        </div>
        <div className="peptides-stat-card">
          <strong className="peptides-stat-val">2</strong>
          <span className="peptides-stat-label">Strategic Locations - Switzerland &amp; India</span>
        </div>
      </div>

      {/* Discuss Your Peptide Program */}
      <section className="senn-cta" aria-label="Discuss Your Peptide Program">
        <div className="senn-cta-copy">
          <h2>Discuss Your Peptide Program</h2>
          <h4>
            Connect with our CDMO team for peptide feasibility, process development, scale-up or commercial supply.
          </h4>
        </div>

        <div className="senn-cta-actions">
          <Link to="https://sennchem.com" target="_blank" rel="noopener noreferrer" className="senn-cta-btn senn-cta-btn--primary">
            <span> Visit Senn Chemicals</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <CompanyFooter />
    </div>
  );
}

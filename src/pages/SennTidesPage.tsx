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
  desc: string;
}

const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title: 'Peptide APIs',
    image: '/assets/ascelis/card-peptide-apis.webp',
    desc: 'Peptides ranging from short sequences to chains exceeding 40 amino acid residues, including cyclic, bridged and lipidated structures.',
  },
  {
    title: 'Amino Acid Derivatives',
    image: '/assets/ascelis/card-cdmo-services.webp',
    desc: 'Senn Chemicals pioneered AAD synthesis and it remains a core capability. Our catalogue includes more than 190 SKUs, including Fmoc-, Boc- and Z-protected derivatives, beta-amino acids, N-methylated derivatives and side-chain-modified derivatives. Selected derivatives can be manufactured under the same cGMP quality systems applied to our peptide APIs.',
  },
  {
    title: 'Peptide Fragments',
    image: '/assets/peptides/card-generic-apis.webp',
    desc: 'Building blocks supplied to innovators and to other peptide manufacturers.',
  },
  {
    title: 'Theranostic Peptides',
    image: '/assets/ascelis/card-theragnostic-peptides.webp',
    desc: 'Linker-ready peptides, chelator conjugation, purification and characterisation. We have delivered more than ten GMP campaigns, including cold-side precursor supply at commercial scale.',
  },
  {
    title: 'Cosmetic Peptides',
    image: '/assets/ascelis/card-cosmetic-peptides.webp',
    desc: 'TFA-free peptide ingredients developed for the European cosmetics market.',
  },
  {
    title: 'Oligonucleotides and Antibody-Drug Conjugates',
    image: '/assets/peptides/card-contract-services.webp',
    desc: 'Expansion is underway.',
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


export default function SennTidesPage() {
  const [openCard, setOpenCard] = useState<number>(-1);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
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

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      'peptide CDMO Switzerland and India, custom peptide synthesis, peptide API manufacturer, amino acid derivatives, LPPS peptide manufacturing, Senn Chemicals'
    );

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 220);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

      {/* Hero Visual Banner */}
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

      {/* Overview Section */}
      <section className={`senn-intro ${isScrolled ? 'is-scrolled' : ''}`} aria-label="Overview">
        <p>
          <span>
            Senn Tides is a wholly owned subsidiary of Granules India and its integrated CDMO platform, with an established foundation in peptides and expansion into oligonucleotides and antibody-drug conjugates underway.{' '}
          </span>
          <span className="muted">
            It was incorporated in June 2025 following Granules India&rsquo;s acquisition of Senn Chemicals AG, a Swiss peptide CDMO founded in Dielsdorf, Zurich, in 1963.
          </span>
        </p>
        <p>
          We operate development and manufacturing capabilities across Dielsdorf, Switzerland, and Hyderabad, India. Zurich operations form the core of our CDMO offerings, with a long track record in R&amp;D, process development and small-scale manufacturing of peptide APIs, peptide fragments and protected AADs for pharmaceutical innovators, cosmetic companies and theranostic developers. Building on this Swiss foundation, Senn Tides is developing a two-continent operating model, with complementary large-scale infrastructure, R&amp;D and manufacturing in India.
        </p>
        <p>
          Customers are supported by one integrated platform and project team across both geographies.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="senn-section-head" aria-label="What We Do">
        <div className="copy">
          <span className="cp-section-badge">What We Do</span>
          <h2>What We Do</h2>
          <p>
            We provide custom development and manufacturing services for peptide ingredients, from route selection and process development through scale-up, validation and commercial supply.
          </p>
        </div>
        <a className="cp-cta-btn" href="http://www.sennchem.com" target="_blank" rel="noreferrer">
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

      <div className="senn-audience-note">
        <div className="senn-audience-note-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <p>
          We work with pharmaceutical innovators, cosmetic brand owners and specialty therapeutic developers.
        </p>
      </div>

      {/* Four Synthesis Routes Section */}
      <section className="senn-routes-section" aria-label="Four Synthesis Routes">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Synthesis Methodologies</span>
            <h2>Four Synthesis Routes</h2>
            <p>
              Most peptide manufacturers run one synthesis platform and fit every molecule to it. Our platform brings together four synthesis approaches, enabling route selection based on the molecule, target scale and purification requirements.
            </p>
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
          <h4>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Why Liquid Phase Matters
          </h4>
          <p>
            For suitable molecules, LPPS can offer substantially lower process mass intensity than SPPS and may reduce or eliminate chromatography. This can materially improve the commercial viability of large-scale peptide manufacturing. It is where Senn Chemicals built its reputation and it remains our core strength.
          </p>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="senn-cta" aria-label="Discuss your development and manufacturing program">
        <div className="senn-cta-copy">
          <h2>Discuss Your Development and Manufacturing Program with Senn Tides</h2>
          <p>
            Connect with our CDMO team for peptide feasibility, process development, scale-up or commercial supply.
          </p>
          <div className="senn-cta-links">
            <span>Email: <a href="mailto:sales@sennchem.com">sales@sennchem.com</a></span>
            <span>Web: <a href="http://www.sennchem.com" target="_blank" rel="noreferrer">www.sennchem.com</a></span>
          </div>
        </div>

        <div className="senn-cta-actions">
          <Link to="/contact" className="senn-cta-btn senn-cta-btn--primary">
            <span>Connect With Us</span>
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

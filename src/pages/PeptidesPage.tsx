import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';

const P = '/assets/peptides/';

type CapabilityCard = {
  title: string;
  image: string;
  desc: string;
};

const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title: 'Generic APIs',
    image: 'card-generic-apis.webp',
    desc: 'High-purity generic peptide APIs synthesized to global pharmacopeial standards.',
  },
  {
    title: 'Contract Services',
    image: 'card-contract-services.webp',
    desc: 'Custom peptide synthesis, process development, and scale-up services for clinical and commercial partners.',
  },
  {
    title: 'Cosmetic Peptides',
    image: 'card-cosmetic-peptides.webp',
    desc: 'Bioactive peptides for advanced dermatological and high-performance cosmetic formulations.',
  },
  {
    title: 'Theragnostic Peptides',
    image: 'card-theragnostic-peptides.webp',
    desc: 'Targeted peptide solutions uniting diagnostic molecular imaging with targeted therapeutic delivery.',
  },
];

type OfferItem = { title: string; body: string; icon: string };

const OFFERS: OfferItem[] = [
  {
    title: 'Globally Endorsed Production Practices',
    body: 'Regulatory-aligned manufacturing meeting Swissmedic and USFDA compliance standards.',
    icon: 'icon-production-belt.svg',
  },
  {
    title: 'End-to-End Global CDMO Support',
    body: 'Complete synthesis, process development, and scale-up lifecycle support for pharmaceutical partners.',
    icon: 'icon-box.svg',
  },
  {
    title: 'Innovating GLP-1 and Growth Therapies',
    body: 'Specialized peptide platforms tailored for obesity, metabolic disorders, and next-generation peptide drugs.',
    icon: 'icon-manufacturing.svg',
  },
  {
    title: 'Sustainable Peptide & Amino Solutions',
    body: 'Green chemistry principles reducing hazardous solvents and waste throughout synthesis cycles.',
    icon: 'icon-circles.svg',
  },
  {
    title: 'Agile, Modular Global Infrastructure',
    body: 'Integrated facilities spanning Switzerland and India offering flexible batch sizes and rapid commercialization.',
    icon: 'icon-globe.svg',
  },
];

export default function PeptidesPage() {
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
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    document.title = 'Peptides — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Business</span>
        <span className="sep">{'>'}</span>
        <span className="current">Peptides</span>
      </p>
      <h1 className="cp-page-title">Peptide</h1>
      <div className="cp-hero-banner">
        <img src={`${P}hero-banner.webp`} alt="Granules peptide science" loading="eager" decoding="async" />
      </div>

      <div className="biz-intro">
        <p>
          Granules India is expanding into high-growth peptide therapeutics with a fully
          integrated platform, built on the acquisition of Senn Chemicals (Switzerland) and the
          launch of Ascelis Peptides (India).
        </p>
        <p>
          With over 170 obesity-related peptides in global pipelines, peptides are revolutionizing
          treatments in diabetes, obesity, oncology, and rare diseases. Global GLP-1 agonist sales
          exceeded USD 50 billion in 2024 and are projected to reach USD 130 billion by 2030.
        </p>
        <p className="muted">
          At Granules, we are combining green science, contract development and manufacturing
          excellence, and a future-ready innovation mindset to lead this transformation.
        </p>
      </div>

      <div className="biz-section-head">
        <div className="copy">
          <span className="cp-section-badge">Key capabilities</span>
          <h2>Ascelis Peptides: science, scale, and speed</h2>
          <p>
            With over six decades of peptide synthesis experience through Senn Chemicals,
            Granules brings unmatched precision to the development of high-purity peptide APIs.
            This legacy is now amplified through Ascelis Peptides, our dedicated Indian platform,
            enabling speed-to-market and cost efficiency at scale.
          </p>
        </div>
        <a className="cp-cta-btn" href="/company/ascelis-peptides">Learn more</a>
      </div>

      <div className="biz-carousel">
        <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
          {CAPABILITY_CARDS.map((card, idx) => {
            const isOpenCard = openCard === idx;
            return (
              <article
                className={`biz-card${isOpenCard ? ' is-open' : ''}`}
                key={card.title}
                onMouseEnter={() => setOpenCard(idx)}
                onMouseLeave={() => setOpenCard(-1)}
                onClick={() => setOpenCard(isOpenCard ? -1 : idx)}
              >
                <img className="bg" src={`${P}${card.image}`} alt={card.title} loading="lazy" decoding="async" />
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

      <div className="biz-panel">
        <img className="bg" src={`${P}offers-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="biz-panel-grid">
          <div className="biz-panel-head">
            <h2>Our integrated modal offers</h2>
          </div>
          <div className="biz-accordion">
            {OFFERS.map((item, index) => {
              const isOpen = open === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  className={`biz-accordion-item${isOpen ? '' : ' collapsed'}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <div className="biz-accordion-head">
                    <div className="biz-accordion-icon-row">
                      <span className="biz-accordion-icon">
                        <img src={`${P}${item.icon}`} alt="" loading="lazy" decoding="async" />
                      </span>
                      <p className="biz-accordion-title">{item.title}</p>
                    </div>
                    <span className="biz-accordion-toggle">
                      <img src={`${P}${isOpen ? 'icon-minus.svg' : 'icon-plus.svg'}`} alt={isOpen ? 'Collapse' : 'Expand'} loading="lazy" decoding="async" />
                    </span>
                  </div>
                  {isOpen && item.body && <p className="biz-accordion-body">{item.body}</p>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="biz-cta">
        <img className="bg" src={`${P}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="biz-cta-copy">
          <h2>Partner with Granules for your Peptide journey</h2>
        </div>
        <a className="cp-cta-btn" href="/business/peptides">Our Capabilities</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

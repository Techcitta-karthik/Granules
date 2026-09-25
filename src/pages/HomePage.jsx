import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import worldMapUrl from '@svg-maps/world/world.svg?url';
import { NavBar, CompanyFooter } from '../components/company';
import { REGULATORY_LOGOS } from '../data/regulatoryLogosData';
import { getAssetUrl } from '../lib/pdf';
import '../components/company/company.css';

const A = '/assets/';

const heroSlides = [
  {
    image: 'Home/generics.jpg',
    title: 'Globally Approved.\nVertically Integrated.\nTrusted Worldwide',
    cta: 'Generics',
    link: '/business/generics',
  },
  {
    image: 'Home/2.jpg',
    title: 'Advancing the Future of TIDES',
    cta: 'Peptide CDMO',
    link: '/business/peptides',
  },
  {
    image: 'Home/3.jpg',
    title: 'Setting Global Standards in Quality, Safety, and Compliance',
    cta: 'Quality & compliance',
    link: '/business/quality-compliance',
  },
  {
    image: 'Home/rd.jpg',
    title: 'Accelerating Innovation Through Integrated R&D Platform',
    cta: 'Research & Development',
    link: '/business/rd',
  },
  {
    image: 'Home/sustainability.jpg',
    title: 'Innovating for Health. \nCommitted to the Planet',
    cta: 'Sustainability',
    link: '/sustainability',
  },
];

const products = [
  {
    image: 'fd/fd-card.jpg',
    title: 'Finished Dosages (FDs)',
    eyebrow: 'FD',
    body: 'Scale and complexity supported by multi-site supply capabilities.',
    href: '/business/fd',
  },
  {
    image: 'pfi.webp',
    title: 'Pharmaceutical Formulations Intermediates (PFIs)',
    eyebrow: 'PFI',
    body: 'Custom pharmaceutical formulation intermediates optimized for efficiency and flexibility.',
    href: '/business/pfi',
  },
  {
    image: 'api.jpg',
    title: 'Active Pharmaceutical Ingredients (APIs)',
    eyebrow: 'API',
    body: 'Large-scale manufacturing capabilities, integrated operations, and strong process optimization.',
    href: '/business/api',
  },
];

const news = [
  {
    image: 'news-1.jpg',
    title: 'Granules India secures sole first-to-file status for generic drug',
    body: 'Granules India has secured sole first-to-file status for a generic drug, strengthening its position in regulated markets.',
    href: 'https://economictimes.indiatimes.com/markets/stocks/news/granules-india-promoter-sells-1-72-crore-shares-worth-rs-1500-crore-goldman-sachs-bnp-paribas-among-investors/articleshow/134077487.cms?from=mdr',
    external: true,
  },
  {
    image: 'news-2.webp',
    title: 'Showcased breakthrough technologies at CPhI Worldwide 2025.',
    body: 'Granules presented integrated capabilities spanning APIs, finished dosages, peptides and next-generation manufacturing.',
    href: 'https://www.bwhealthcareworld.com/article/granules-india-secures-sole-first-to-file-status-for-generic-lumryz-in-us-613380',
  },
  {
    image: 'news-3.webp',
    title: 'Launched a dedicated peptide manufacturing unit.',
    body: 'The new facility expands our ability to support complex molecules with a scalable, quality-led development platform.',
    href: 'https://www.business-standard.com/markets/capital-market-news/granules-india-records-60-yoy-increase-in-q1-pat-126072100899_1.html',
  },
];

const certs = ['cert-1.webp', 'cert-2.webp', 'cert-3.webp', 'cert-4.webp', 'cert-5.webp', 'cert-6.webp', 'cert-7.webp'];

function Arrow({ reverse = false }) {
  return <img className={`arrow-icon ${reverse ? 'reverse' : ''}`} src={`${A}hero-arrow.svg`} alt="" loading="eager" decoding="async" />;
}

function Button({ children, href = '#', className = '', onClick }) {
  const handleClick = (e) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    if (onClick) onClick(e);
  };

  if (href && href.startsWith('/')) {
    return (
      <Link className={`button ${className}`} to={href} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a className={`button ${className}`} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

function Hero() {
  const [slide, setSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(null);
  useEffect(() => {
    const timer = setInterval(() => setSlide((current) => {
      setPreviousSlide(current);
      return (current + 1) % heroSlides.length;
    }), 7000);
    return () => clearInterval(timer);
  }, []);
  const current = heroSlides[slide];
  const goToSlide = (nextSlide) => {
    setPreviousSlide(slide);
    setSlide(nextSlide);
  };
  const change = (step) => goToSlide((slide + step + heroSlides.length) % heroSlides.length);

  return (
    <section className="hero" id="top">
      {previousSlide !== null && (
        <div
          className="hero-image hero-image-previous"
          style={{ backgroundImage: `url(${A}${heroSlides[previousSlide].image})` }}
        />
      )}
      <div
        className={`hero-image hero-image-current${previousSlide !== null ? ' is-transitioning' : ''}`}
        key={slide}
        style={{ backgroundImage: `url(${A}${current.image})` }}
        onAnimationEnd={() => setPreviousSlide(null)}
      />
      <div className="hero-shade" />
      <div className="hero-content shell">
        <h1>{current.title}</h1>
        <Button href={current.link || '#business'}>{current.cta}</Button>
      </div>
      <div className="hero-controls shell">
        <div className="progress" aria-label="Hero slides">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={index === slide ? 'active' : ''}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="arrow-controls">
          <button onClick={() => change(-1)} aria-label="Previous slide"><Arrow reverse /></button>
          <button onClick={() => change(1)} aria-label="Next slide"><Arrow /></button>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }) { return <span className="tag">{children}</span>; }

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const started = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - started) / 1100);
        setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: .6 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [to]);
  return <strong ref={ref}>{value}{suffix}</strong>;
}

function Modal({ item, onClose, label = 'Details' }) {
  useEffect(() => {
    if (!item) return undefined;
    const close = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    document.body.classList.add('modal-open');
    return () => { document.removeEventListener('keydown', close); document.body.classList.remove('modal-open'); };
  }, [item, onClose]);
  if (!item) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="content-modal" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close details">×</button>
        {item.image && <img src={`${A}${item.image}`} alt="" loading="lazy" decoding="async" />}
        <div>
          <Tag>{item.eyebrow || item.category || label}</Tag>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
            <Button href={item.href || '/media'} className="modal-cta">
              Read Full Story in Newsroom &rarr;
            </Button>
            <Button href="/contact" className="modal-cta">
              Contact Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function About() {
  return (
    <section className="section shell about" id="about">
      <div className="about-copy">
        <h2>Global Healthcare through Integrated Excellence</h2>
        <h4>
          With over four decades of industry leadership, Granules India is committed to delivering
          high-quality, affordable medicines globally, through an integrated manufacturing platform.
          We offer end-to-end solutions for global healthcare needs, built on compliance,
          innovation, and operational scale, across Active Pharmaceutical Ingredients (APIs),
          Pharmaceutical Formulation Intermediates (PFIs), Finished Dosage Forms (FDFs), and Peptide CDMO.
        </h4>
        <div className="about-cta-wrap">
          <Button href="/company">ABOUT GRANULES &rarr;</Button>
        </div>
      </div>
      <div className="about-stats-wrap">
        <div className="stats">
          <article className="stat"><CountUp to={100} suffix="+" /><span>COUNTRIES SERVED</span></article>
          <article className="stat"><CountUp to={40} suffix="+" /><span>YEARS OF EXCELLENCE</span></article>
          <article className="stat"><CountUp to={10} /><span>MANUFACTURING FACILITIES<br />ACROSS INDIA, US &amp; EUROPE</span></article>
          <article className="stat"><CountUp to={6} /><span>R&amp;D CENTERS OF EXCELLENCE</span></article>
          <article className="stat"><CountUp to={150} suffix="+" /><span>DOSSIERS</span></article>
          <article className="stat"><CountUp to={100} suffix="+" /><span className="stat-small-s">DMF<span className="lowercase-s">s</span></span></article>
        </div>
      </div>
    </section>
  );
}

function Business() {
  const [openProduct, setOpenProduct] = useState(-1);
  const navigate = useNavigate();

  return (
    <section className="section shell" id="business">
      <Tag>Business Verticals</Tag>
      <div className="section-heading split-heading">
        <div>
          <h2>Delivering Impact Across Pharmaceutical Value Chain</h2>
          <h4>
            We serve patients and our partners across the globe with a vertically integrated model that brings together innovation, manufacturing excellence, and compliance at scale. With established capabilities across APIs, PFIs, Finished Dosages and Peptide CDMO, we are also strengthening our portfolio complexity with high-barrier, early to market opportunities in controlled substances, CNS/ADHD, oncology and advanced dosage forms
          </h4>
        </div>
        <Button href="/business">Generics &rarr;</Button>
      </div>

      <div className="product-grid">
        {products.map((product, index) => {
          const isOpen = openProduct === index;
          return (
            <article
              className={`product-card${isOpen ? ' is-open' : ''}`}
              key={product.title}
              onMouseEnter={() => setOpenProduct(index)}
              onMouseLeave={() => setOpenProduct(-1)}
            >
              <button
                className="product-toggle"
                type="button"
                onClick={() => {
                  if (isOpen) {
                    navigate(product.href);
                  } else {
                    setOpenProduct(index);
                  }
                }}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Close' : 'Explore'} ${product.title}`}
              >
                {/* Background product image */}
                <div className="product-img-wrap">
                  <img src={`${A}${product.image}`} alt={product.title} loading="lazy" decoding="async" />
                </div>

                {/* Sliding blue drawer sheet */}
                <div className="product-sheet">
                  <div className="product-sheet-head">
                    <span className="product-sheet-title">{product.title}</span>
                    <span className="product-symbol" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>

                  <div className="product-sheet-body">
                    <p className="product-description">{product.body}</p>
                    <Link
                      to={product.href}
                      className="product-learn"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span>LEARN MORE</span>
                      <span aria-hidden="true" style={{ marginLeft: '6px' }}>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Presence() {
  const tabs = ['Our Global Subsidiaries', 'Our Manufacturing Facilities', 'Our R&D Facilities'];
  const [active, setActive] = useState(0);

  return (
    <section className={`presence presence-state-${active}`} id="presence">
      <div className="presence-copy">
        <Tag>Our Presence</Tag>
        <h2>Global Footprint Across Three Continents</h2>
      </div>

      <div className="map-wrap">
        <div className="map-stage">
          <div className="map-plane">
            {/* Base World Map Image */}
            <img
              className="map"
              src={worldMapUrl}
              alt="Granules India Global Presence Map"
              loading="lazy"
              decoding="async"
            />

            {/* SVG Vector Pin Layer - shares exact 1010x666 coordinate space with the map */}
            <svg
              className="map-pins-svg"
              viewBox="0 0 1010 666"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Glossy 3D Blue Sphere Pin Gradient */}
                <radialGradient id="map-pin-3d" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="22%" stopColor="#60a5fa" />
                  <stop offset="55%" stopColor="#0061f8" />
                  <stop offset="85%" stopColor="#003db3" />
                  <stop offset="100%" stopColor="#001d66" />
                </radialGradient>

                {/* Pin Drop Shadow */}
                <filter id="map-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#0047cc" floodOpacity="0.4" />
                </filter>

                {/* Pill Badge Shadow */}
                <filter id="map-pill-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#001a4d" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* ============================================================
                TAB 0: OUR GLOBAL SUBSIDIARIES
                - Granules India Limited, India
                - Granules Life Sciences Private Limited, India
                - Granules CZRO Private Limited, India
                - Senn Tides Private Limited, India
                ============================================================ */}
              <g
                className="presence-layer presence-layer-subsidiaries"
                style={{
                  opacity: active === 0 ? 1 : 0,
                  pointerEvents: active === 0 ? 'auto' : 'none',
                  transition: 'opacity 0.35s ease'
                }}
              >
                {/* Leader lines from Hyderabad (698, 413) to stacked pills */}
                <line x1="698" y1="413" x2="725" y2="348" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="698" y1="413" x2="725" y2="382" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="698" y1="413" x2="725" y2="416" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="698" y1="413" x2="725" y2="450" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />

                {/* Stacked Pills */}
                <g className="map-pill-group" filter="url(#map-pill-shadow)">
                  {/* 1. Granules India Limited, India */}
                  <rect x="725" y="336" width="190" height="24" rx="12" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="820" y="348.5" fill="#0061f8" fontSize="9.2" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.2px" textAnchor="middle" dominantBaseline="central">
                    GRANULES INDIA LIMITED, INDIA
                  </text>

                  {/* 2. Granules Life Sciences Private Limited, India */}
                  <rect x="725" y="370" width="264" height="24" rx="12" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="857" y="382.5" fill="#0061f8" fontSize="8.9" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.2px" textAnchor="middle" dominantBaseline="central">
                    GRANULES LIFE SCIENCES PRIVATE LIMITED, INDIA
                  </text>

                  {/* 3. Granules CZRO Private Limited, India */}
                  <rect x="725" y="404" width="224" height="24" rx="12" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="837" y="416.5" fill="#0061f8" fontSize="9.2" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.2px" textAnchor="middle" dominantBaseline="central">
                    GRANULES CZRO PRIVATE LIMITED, INDIA
                  </text>

                  {/* 4. Senn Tides Private Limited, India */}
                  <rect x="725" y="438" width="208" height="24" rx="12" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="829" y="450.5" fill="#0061f8" fontSize="9.2" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.2px" textAnchor="middle" dominantBaseline="central">
                    SENN TIDES PRIVATE LIMITED, INDIA
                  </text>
                </g>

                {/* Dot at Hyderabad */}
                <circle className="map-pin-dot" cx="698" cy="413" r="6.5" fill="url(#map-pin-3d)" filter="url(#map-pin-shadow)" />
              </g>

              {/* ============================================================
                TAB 1: OUR MANUFACTURING FACILITIES
                - Hyderabad, India
                - Andhra Pradesh, India
                - Zurich, Switzerland
                ============================================================ */}
              <g
                className="presence-layer presence-layer-manufacturing"
                style={{
                  opacity: active === 1 ? 1 : 0,
                  pointerEvents: active === 1 ? 'auto' : 'none',
                  transition: 'opacity 0.35s ease'
                }}
              >
                {/* 1. Zurich, Switzerland */}
                <line x1="498" y1="315" x2="498" y2="280" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <g className="map-pill-group" filter="url(#map-pill-shadow)">
                  <rect x="408" y="254" width="180" height="26" rx="13" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="498" y="267.5" fill="#0061f8" fontSize="10" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.3px" textAnchor="middle" dominantBaseline="central">
                    ZURICH, SWITZERLAND
                  </text>
                </g>
                <circle className="map-pin-dot" cx="498" cy="315" r="7" fill="url(#map-pin-3d)" filter="url(#map-pin-shadow)" />

                {/* 2. Hyderabad, India */}
                <line x1="698" y1="413" x2="650" y2="442" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <g className="map-pill-group" filter="url(#map-pill-shadow)">
                  <rect x="580" y="442" width="140" height="26" rx="13" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="650" y="455.5" fill="#0061f8" fontSize="10" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.3px" textAnchor="middle" dominantBaseline="central">
                    HYDERABAD, INDIA
                  </text>
                </g>
                <circle className="map-pin-dot" cx="698" cy="413" r="6.5" fill="url(#map-pin-3d)" filter="url(#map-pin-shadow)" />

                {/* 3. Andhra Pradesh, India */}
                <line x1="717" y1="404" x2="748" y2="375" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <g className="map-pill-group" filter="url(#map-pill-shadow)">
                  <rect x="748" y="362" width="176" height="26" rx="13" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="836" y="375.5" fill="#0061f8" fontSize="10" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.3px" textAnchor="middle" dominantBaseline="central">
                    VISAKHAPATNAM, INDIA
                  </text>
                </g>
                <circle className="map-pin-dot" cx="717" cy="404" r="6.5" fill="url(#map-pin-3d)" filter="url(#map-pin-shadow)" />
              </g>

              {/* ============================================================
                TAB 2: OUR R&D FACILITIES
                - Hyderabad, India
                - Pune, India
                - Virginia, USA
                - Zurich, Switzerland
                ============================================================ */}
              <g
                className="presence-layer presence-layer-rd"
                style={{
                  opacity: active === 2 ? 1 : 0,
                  pointerEvents: active === 2 ? 'auto' : 'none',
                  transition: 'opacity 0.35s ease'
                }}
              >
                {/* 1. Virginia, USA */}
                <line x1="261" y1="327" x2="245" y2="252" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <g className="map-pill-group" filter="url(#map-pill-shadow)">
                  <rect x="175" y="226" width="140" height="26" rx="13" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="245" y="239.5" fill="#0061f8" fontSize="10" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.3px" textAnchor="middle" dominantBaseline="central">
                    VIRGINIA, USA
                  </text>
                </g>
                <circle className="map-pin-dot" cx="261" cy="327" r="7.5" fill="url(#map-pin-3d)" filter="url(#map-pin-shadow)" />

                {/* 2. Zurich, Switzerland */}
                <line x1="498" y1="315" x2="498" y2="280" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <g className="map-pill-group" filter="url(#map-pill-shadow)">
                  <rect x="408" y="254" width="180" height="26" rx="13" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="498" y="267.5" fill="#0061f8" fontSize="10" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.3px" textAnchor="middle" dominantBaseline="central">
                    ZURICH, SWITZERLAND
                  </text>
                </g>
                <circle className="map-pin-dot" cx="498" cy="315" r="7" fill="url(#map-pin-3d)" filter="url(#map-pin-shadow)" />

                {/* 3. Pune, India */}
                <line x1="683.5" y1="412" x2="640" y2="442" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <g className="map-pill-group" filter="url(#map-pill-shadow)">
                  <rect x="580" y="442" width="120" height="26" rx="13" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="640" y="455.5" fill="#0061f8" fontSize="10" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.3px" textAnchor="middle" dominantBaseline="central">
                    PUNE, INDIA
                  </text>
                </g>
                <circle className="map-pin-dot" cx="683.5" cy="412" r="6" fill="url(#map-pin-3d)" filter="url(#map-pin-shadow)" />

                {/* 4. Hyderabad, India */}
                <line x1="698" y1="413" x2="740" y2="375" stroke="rgba(0, 97, 248, 0.45)" strokeWidth="1.2" strokeLinecap="round" />
                <g className="map-pill-group" filter="url(#map-pill-shadow)">
                  <rect x="740" y="362" width="150" height="26" rx="13" fill="#ffffff" stroke="#d0e2ff" strokeWidth="1" />
                  <text x="815" y="375.5" fill="#0061f8" fontSize="10" fontWeight="700" fontFamily="'Manrope', sans-serif" letterSpacing="0.3px" textAnchor="middle" dominantBaseline="central">
                    HYDERABAD, INDIA
                  </text>
                </g>
                <circle className="map-pin-dot" cx="698" cy="413" r="6" fill="url(#map-pin-3d)" filter="url(#map-pin-shadow)" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="presence-tabs shell">
        {tabs.map((tab, index) => (
          <button
            className={active === index ? 'active' : ''}
            onClick={() => setActive(index)}
            key={tab}
          >
            <span>{tab}</span>
            <span className="tab-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  const certsGroup = [...REGULATORY_LOGOS, ...REGULATORY_LOGOS];

  return (
    <section className="credentials shell">
      <h2>
        Our facilities are approved by key global regulatory authorities, reflecting our commitment
        to quality systems, operational transparency, and market readiness.
      </h2>
      <div className="cert-row" aria-label="Regulatory certifications">
        <div className="cert-track">
          <div className="cert-group">
            {certsGroup.map((item, index) => (
              <img
                src={item.image}
                alt={`${item.name} (${item.country})`}
                title={`${item.name} — ${item.fullName}`}
                key={`primary-${item.id}-${index}`}
                loading="eager"
                decoding="async"
              />
            ))}
          </div>

          <div className="cert-group" aria-hidden="true">
            {certsGroup.map((item, index) => (
              <img
                src={item.image}
                alt=""
                title={`${item.name} — ${item.fullName}`}
                key={`clone-${item.id}-${index}`}
                loading="eager"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Sustainability({ open = 0, setOpen }) {
  const [isPaused, setIsPaused] = useState(false);

  const items = [
    {
      title: open === 0 ? 'Target to achieve Net Zero by 2050' : 'Sustainability',
      tag: 'Sustainability',
      heading: 'Where science acts responsibly',
      heroBody: 'We are committed to science-based decarbonization, with SBTi-validated targets guiding our journey toward Net Zero emissions..',
      href: '/sustainability',
      icon: 'icon-recycle-leaf.svg',
      iconType: 'plain',
      linkHref: '/sustainability',
      cta: 'Learn More',
      bg: `${A}sustainability-net-zero.jpg`,
    },
    {
      title: 'Community',
      tag: 'Community',
      heading: 'Purpose Beyond Business',
      heroBody: 'Guided by our responsibility to society, we support initiatives that improve access to healthcare, enable education, enhance employability, and promote environmental awareness, helping create stronger and more resilient communities.',
      goal: 'Our Goal is to positively impact 1 million lives by 2030.',
      href: '/community',
      icon: 'icon-windmill-sustain.svg',
      iconType: 'circle',
      linkHref: '/community',
      cta: 'Learn More',
      bg: `${A}sustainability.webp`,
    },
  ];

  // Auto-shift between Sustainability and Community every 3 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setOpen?.((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, setOpen]);

  const activeIndex = open >= 0 && open < items.length ? open : 0;
  const currentItem = items[activeIndex];
  const currentBg = currentItem.bg;
  const isCommunity = activeIndex === 1;

  return (
    <section
      className={`sustainability ${isCommunity ? 'theme-community' : ''}`}
      id="sustainability"
      style={{ backgroundImage: `url(${currentBg})` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="sustainability-overlay" />
      <div className="sustainability-copy" key={currentItem.tag}>
        <Tag className={isCommunity ? 'tag-teal' : ''}>{currentItem.tag}</Tag>
        <h2>{currentItem.heading}</h2>
        <h4>{currentItem.heroBody}</h4>
        {currentItem.goal && (
          <p className="sustainability-goal">{currentItem.goal}</p>
        )}
        <Button href={currentItem.href} className={isCommunity ? 'teal' : 'green'}>Learn More &rarr;</Button>
      </div>
      {/* Bottom Corner Icon Toggles */}
      <div className="sustainability-toggles" role="tablist" aria-label="Select sustainability topic">
        {items.map((item, index) => {
          const isActive = open === index;
          return (
            <button
              key={item.tag}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Switch to ${item.tag}`}
              title={item.tag}
              className={`sustain-toggle-btn ${isActive ? 'active' : ''} sustain-toggle-${item.tag.toLowerCase()}`}
              onClick={() => setOpen && setOpen(index)}
            >
              <i className={`accordion-icon accordion-icon-${item.iconType}`}>
                <img src={`${A}${item.icon}`} alt="" loading="lazy" decoding="async" />
              </i>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Investor() {
  const docs = [
    {
      title: 'Q1 Results for FY27',
      href: getAssetUrl('pdfs/2026/07/FY-Result-Jun26.pdf'),
      download: 'Granules_Q1_FY27_Results.pdf',
    },
    {
      title: 'Earnings call transcript (Q1 FY27)',
      href: getAssetUrl('pdfs/2026/07/Q1-FY27-Concall-Transcript-Final.pdf'),
      download: 'Granules_Earnings_Call_Transcript_Q1_FY27.pdf',
    },
    {
      title: 'Investor presentation',
      href: getAssetUrl('pdfs/2026/07/Earnings-Presentation-Q1FY27vf.pdf'),
      download: 'Granules_Investor_Presentation_Q1_FY27.pdf',
    },
    {
      title: 'Integrated annual report 2025-26',
      href: getAssetUrl('pdfs/2026/07/Granules_Annual-Report-FY26-1.pdf'),
      download: 'Granules_Annual_Report_FY26.pdf',
    },
  ];
  return (
    <section className="section shell investor" id="investor">
      <div className="investor-copy">
        <Tag>Investor Relations</Tag>
        <h2>Transparent. Trusted. Future focused.</h2>
        <p>
          Driven by operational excellence and responsible growth, we remain focused on creating
          sustainable value for our investors.
        </p>
        <Button href="/investors">INVESTOR &rarr;</Button>
      </div>
      <div className="investor-panel">
        <a
          href={getAssetUrl('pdfs/2026/07/Granules_Annual-Report-FY26-1.pdf')}
          target="_blank"
          rel="noopener noreferrer"
          className="investor-cover"
          aria-label="View Annual Reports"
        >
          <img
            src={`${A}investor-report-cover.webp?v=clean`}
            alt="Granules India Integrated Annual Report FY 2025-26: Where Strategy Meets Evolving Healthcare Needs, Science & Sustainability"
            loading="lazy"
            decoding="async"
          />
        </a>
        <div className="investor-side">
          <div className="investor-docs">
            {docs.map((doc) => (
              <div className="investor-doc" key={doc.title}>
                <a
                  className="investor-doc-title"
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open ${doc.title} in a new tab`}
                >
                  {doc.title}
                </a>
                <div className="investor-doc-actions">
                  <a
                    className="investor-action-link"
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View ${doc.title} in a new tab`}
                  >
                    View
                  </a>
                  <span className="investor-action-slash">/</span>
                  <a
                    className="investor-action-link"
                    href={doc.href}
                    download={doc.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Download ${doc.title}`}
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Media() {
  return (
    <section className="section shell media" id="media">
      <div className="split-heading">
        <div>
          <Tag>Media</Tag>
          <h2>What’s New at Granules</h2>
        </div>
        <Button href="/media">View all &rarr;</Button>
      </div>
      <div className="news-grid">
        {news.map((item) => (
          <article className="news-card" key={item.title}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ${item.title}`}
            >
              <img src={`${A}${item.image}`} alt="" loading="lazy" decoding="async" />
              <h3>{item.title}</h3>
              <span className="read-more">Read More &rarr;</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Careers() {
  return (
    <section className="careers shell" id="careers">
      <div>
        <h2>Shape Healthcare with Granules</h2>
        <p>Every role here strengthens access to affordable healthcare for millions.</p>
        <Button href="/careers">Careers &rarr;</Button>
      </div>
    </section>
  );
}

function Footer() {
  const productLinks = [
    ['Active Pharmaceutical Ingredients', '/business/api'],
    ['Pharmaceutical Formulation Intermediates', '/business/pfi'],
    ['Finished Dosages', '/business/fd'],
    ['Peptides', '/business/peptides'],
  ];
  const companyLinks = [
    ['Company', '/company'],
    ['Sustainability', '/sustainability'],
    ['Investors', '/investor'],
    ['Media', '/media'],
    ['Careers', '/careers'],
    ['Contact Us', '/contact'],
  ];
  const socials = [
    { icon: 'linkedin.svg', name: 'LinkedIn', href: 'https://www.linkedin.com/company/granules-india-limited/' },
    { icon: 'instagram.svg', name: 'Instagram', href: 'https://www.instagram.com/granulesindialimited_official/followers/' },
    { icon: 'x.svg', name: 'X', href: 'https://x.com/GranulesIndia' },
    { icon: 'facebook.svg', name: 'Facebook', href: 'https://www.facebook.com/share/1BSgd7PiTC/?mibextid=wwXIfr' },
    { icon: 'youtube.svg', name: 'YouTube', href: 'https://www.youtube.com/@Granules-IndiaLimited/featured' },
  ];
  return (
    <footer id="footer" style={{ backgroundImage: `url(${A}footer-bg.webp)` }}>
      <div className="footer-main shell">
        <div className="footer-intro">
          <img src={`${A}footer-logo.webp`} alt="Granules" loading="eager" decoding="async" />
          <p>
            Granules India, headquartered in Hyderabad, is a vertically integrated pharma
            manufacturer delivering APIs, PFIs, and FDs globally with regulatory-compliant
            operations in India, US and Europe ensuring quality, scale, and sustainability.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Products</strong>
            {productLinks.map(([label, href]) => (
              <Link to={href} key={label}>{label}</Link>
            ))}
          </div>
          <div className="footer-col-caps">
            {companyLinks.map(([label, href]) => (
              <Link to={href} key={label}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom shell">
        <div>
          <span>Copyright © 2026 Granules. All rights reserved.</span>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/cookie-policy">Cookies Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/data-protection-notice">Data Protection Notice</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
        </div>
        <div className="socials">
          {socials.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.icon} aria-label={item.name}>
              <img src={`${A}${item.icon}`} alt={item.name} loading="lazy" decoding="async" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const results = [
    ['About Granules', '/company', 'Company leadership and integrated capabilities'],
    ['Business Verticals', '/business/generics', 'APIs, PFIs and finished dosages'],
    ['Global Presence', '#presence', 'Locations, subsidiaries and facilities'],
    ['Sustainability', '/sustainability', 'CZRO, Net Zero and Pharma Pathshala'],
    ['Investor Relations', '/investor', 'Stock performance and annual report'],
    ['Newsroom', '/media', 'Achievements and company stories'],
    ['Careers', '/careers', 'Join the Granules team'],
  ].filter((item) => item.join(' ').toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 50);
    const close = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search the homepage">
      <div className="search-panel">
        <div className="search-field">
          <img src={`${A}search.svg`} alt="" loading="lazy" decoding="async" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Granules"
            aria-label="Search Granules"
          />
          <button onClick={onClose} aria-label="Close search">×</button>
        </div>
        <div className="search-results">
          {results.map(([title, href, detail]) => (
            href.startsWith('/') ? (
              <Link to={href} key={title} onClick={onClose}>
                <span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </span>
                <Arrow />
              </Link>
            ) : (
              <a href={href} key={title} onClick={onClose}>
                <span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </span>
                <Arrow />
              </a>
            )
          ))}
          {!results.length && <p>No matching section. Try “sustainability” or “investor”.</p>}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sustainabilityTab, setSustainabilityTab] = useState(0);

  const activeNavSection = sustainabilityTab === 1 ? 'Community' : 'Sustainability';

  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section:not(.hero), footer')];
    sections.forEach((section) => section.classList.add('reveal-ready'));
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('revealed')), { threshold: .08 });
    sections.forEach((section) => reveal.observe(section));

    return () => { reveal.disconnect(); };
  }, []);

  return (
    <>
      <NavBar onSearch={() => setSearchOpen(true)} activeSectionOverride={activeNavSection} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main>
        <Hero />
        <About />
        <Business />
        <Presence />
        <Credentials />
        <Sustainability open={sustainabilityTab} setOpen={setSustainabilityTab} />
        <Investor />
        <Media />
        <Careers />
      </main>
      <div className="cp">
        <CompanyFooter />
      </div>
    </>
  );
}

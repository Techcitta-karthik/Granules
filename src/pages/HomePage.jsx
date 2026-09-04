import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import worldMapUrl from '@svg-maps/world/world.svg?url';
import { CompanyFooter } from '../components/company';
import '../components/company/company.css';

const A = '/assets/';

const heroSlides = [
  {
    image: 'hero-1.webp',
    title: 'Globally approved. Vertically integrated. Trusted worldwide',
    cta: 'Our Products',
    link: '#business',
  },
  {
    image: 'hero-5.webp',
    title: 'Driving innovation in peptides and custom manufacturing solutions',
    cta: 'Peptides & CDMO Business',
    link: '/business/peptides',
  },
  {
    image: 'hero-4.webp',
    title: 'Setting global standards in quality, safety, and compliance',
    cta: 'Quality & compliance',
    link: '/business/quality-compliance',
  },
  {
    image: 'hero-3.webp',
    title: 'Innovating for health. Committed to the planet',
    cta: 'Sustainability',
    link: '/sustainability',
  },
  {
    image: 'hero-2.webp',
    title: 'Accelerating Innovation Through Integration and Digitalization',
    cta: 'R&D',
    link: '/business/rd',
  },
];

const products = [
  {
    image: 'api.webp',
    title: 'Active Pharmaceutical Ingredients (APIs)',
    eyebrow: 'API',
    body: 'Large-scale manufacturing capabilities, integrated operations, and strong process optimization.',
    href: '/business/api',
  },
  {
    image: 'pfi.webp',
    title: 'Pharmaceutical Formulations Intermediates (PFIs)',
    eyebrow: 'PFI',
    body: 'Custom pharmaceutical formulation intermediates optimized for efficiency and flexibility.',
    href: '/business/pfi',
  },
  {
    image: 'finished-dosage.webp',
    title: 'Finished Dosages (FDs)',
    eyebrow: 'FD',
    body: 'Scale and complexity supported by multi-site supply capabilities.',
    href: '/business/fd',
  },
];

const news = [
  {
    image: 'news-1.webp',
    category: 'Stories',
    title: 'Granules India secures sole first-to-file status for generic drug',
    body: 'Granules India has secured sole first-to-file status for a generic drug, strengthening its position in regulated markets.',
    href: 'https://timesofindia.indiatimes.com/city/hyderabad/granules-india-secures-sole-first-to-file-status-for-generic-drug/articleshow/132222024.cms',
    external: true,
  },
  {
    image: 'news-2.webp',
    category: 'News',
    title: 'Showcased breakthrough technologies at CPhI Worldwide 2025.',
    body: 'Granules presented integrated capabilities spanning APIs, finished dosages, peptides and next-generation manufacturing.',
    href: '/media',
  },
  {
    image: 'news-3.webp',
    category: 'Press Release',
    title: 'Launched a dedicated peptide manufacturing unit.',
    body: 'The new facility expands our ability to support complex molecules with a scalable, quality-led development platform.',
    href: '/media',
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

function Header({ open, setOpen, activeSection, onSearch, scrolled }) {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const closeTimer = useRef(null);
  const links = [
    ['About Us', '/company'],
    ['Business', '#business'],
    ['Sustainability', '/sustainability'],
    ['Community', '/community'],
    ['Investor', '#investor'],
    ['Media', '#media'],
    ['Careers', '#careers'],
    ['Contact Us', '#footer'],
  ];
  const submenuData = {
    'About Us': {
      sections: [
        {
          title: 'Overview',
          quickLinks: [
            ['Our Journey', '/company/milestone'],
            ['Leadership', '/company/leadership'],
          ],
        },
        {
          title: 'Global Subsidiaries',
          quickLinks: [
            ['Granules Pharmaceuticals Inc. (GPI)', 'https://www.granulespharma.com/'],
            ['Granules Life Sciences', '/company/granules-life-sciences'],
            ['Senn Tides', '/company/ascelis-peptides'],
            ['Granules CZRO', '/company/granules-czro'],
          ],
        },
      ],
      image: 'company/values-bg-2.webp',
    },
    Business: {
      title: 'GENERICS',
      quickLinks: [
        ['API', '/business/api'],
        ['PFI', '/business/pfi'],
        ['FINISHED DOSAGES', '/business/fd'],
      ],
      links: [
        ['Peptides CDMO', '/business/peptides'],
        ['Research & Development', '/business/rd'],
        ['Quality & Compliance', '/business/quality-compliance'],
        ['Facilities', '/company/facilities'],
      ],
      image: 'company/gpi-facility.webp',
    },
    Careers: {
      title: 'Careers',
      links: [
        ['Overview', '/careers'],
        ['Opportunities', '/careers/opportunities'],
      ],
      image: 'company/career-bg.webp',
    },
  };

  const showMenu = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredMenu(label);
  };

  const hideMenu = () => {
    closeTimer.current = setTimeout(() => setHoveredMenu(null), 200);
  };

  const handleSmoothAnchor = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#top" onClick={(e) => handleSmoothAnchor(e, '#top')} aria-label="Granules home">
        <img src={`${A}logo.webp`} alt="Granules" loading="eager" decoding="async" />
      </a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
      <nav className={open ? 'open' : ''} aria-label="Primary navigation">
        {links.map(([label, href]) => {
          const sub = submenuData[label];
          return (
            <div className="home-nav-item" key={label} onMouseEnter={() => sub && showMenu(label)} onMouseLeave={hideMenu}>
              {href.startsWith('#') ? (
                <a
                  className={activeSection === href.slice(1) ? 'active' : ''}
                  aria-current={activeSection === href.slice(1) ? 'page' : undefined}
                  href={href}
                  onClick={(e) => handleSmoothAnchor(e, href)}
                >
                  {label}
                </a>
              ) : (
                <Link
                  className={activeSection === href.slice(1) ? 'active' : ''}
                  aria-current={activeSection === href.slice(1) ? 'page' : undefined}
                  to={href}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              )}
              {sub && (
                <div className={`home-nav-submenu${hoveredMenu === label ? ' is-open' : ''}`} onMouseEnter={() => showMenu(label)}>
                  <div className="home-nav-submenu-copy">
                    {(sub.sections || (sub.title && sub.quickLinks ? [{ title: sub.title, quickLinks: sub.quickLinks }] : [])).map((section, idx) => (
                      <div className="home-nav-submenu-header-box" key={section.title || idx}>
                        {section.title && <strong>{section.title}</strong>}
                        <div className="home-nav-quick-links">
                          {section.quickLinks.map(([subLabel, subHref]) =>
                            subHref.startsWith('http') ? (
                              <a
                                href={subHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={subLabel}
                                onClick={() => {
                                  setHoveredMenu(null);
                                  setOpen(false);
                                }}
                              >
                                <span>{subLabel}</span>
                                <span aria-hidden="true">↗</span>
                              </a>
                            ) : (
                              <Link
                                to={subHref}
                                key={subLabel}
                                onClick={() => {
                                  setHoveredMenu(null);
                                  setOpen(false);
                                }}
                              >
                                <span>{subLabel}</span>
                                <span aria-hidden="true">↗</span>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    ))}

                    {sub.links && sub.links.length > 0 && (
                      <div className="home-nav-submenu-links">
                        {sub.links.map(([subLabel, subHref]) =>
                          subHref.startsWith('http') ? (
                            <a
                              href={subHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              key={subLabel}
                              onClick={() => {
                                setHoveredMenu(null);
                                setOpen(false);
                              }}
                            >
                              {subLabel}
                            </a>
                          ) : (
                            <Link
                              to={subHref}
                              key={subLabel}
                              onClick={() => {
                                setHoveredMenu(null);
                                setOpen(false);
                              }}
                            >
                              {subLabel}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                  {sub.imageHref ? (
                    <a
                      href={sub.imageHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-nav-submenu-thumb"
                      title="View ESG Profile"
                    >
                      <img src={`${A}${sub.image}`} alt="ESG Profile" loading="lazy" decoding="async" />
                    </a>
                  ) : (
                    <div className="home-nav-submenu-thumb">
                      <img src={`${A}${sub.image}`} alt="" loading="lazy" decoding="async" />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <button className="search-button" aria-label="Search the page" onClick={onSearch}>
          <img src={`${A}search.svg`} alt="" loading="lazy" decoding="async" />
        </button>
        <span className="global">🌍 <span>Global</span></span>
      </nav>
    </header>
  );
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = sessionStorage.getItem('granules_cookie_consent') || localStorage.getItem('granules_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice) => {
    try {
      localStorage.setItem('granules_cookie_consent', choice);
      sessionStorage.setItem('granules_cookie_consent', choice);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="home-cookie-card" role="dialog" aria-label="We Use Cookies">
      <div className="home-cookie-header">
        <div className="home-cookie-icon-wrap" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M21.5 12a9.5 9.5 0 1 1-9.5-9.5c.27 0 .54.01.8.03a1 1 0 0 1 .9.73 2.5 2.5 0 0 0 2.4 1.84h.2a1 1 0 0 1 .98.81 2.5 2.5 0 0 0 2.45 2.09h.1a1 1 0 0 1 .98.8 9.4 9.4 0 0 1 .69 3.2z"
              fill="url(#cookie-radial-grad)"
            />
            <circle cx="8.5" cy="9.5" r="1.25" fill="#ffffff" />
            <circle cx="12" cy="14.5" r="1.4" fill="#ffffff" />
            <circle cx="7.5" cy="15.5" r="1" fill="#ffffff" />
            <circle cx="15.5" cy="11.5" r="1.2" fill="#ffffff" />
            <circle cx="14" cy="17" r="1" fill="#ffffff" />
            <defs>
              <linearGradient id="cookie-radial-grad" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00e676" />
                <stop offset="0.5" stopColor="#00b0ff" />
                <stop offset="1" stopColor="#0061f8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3 className="home-cookie-title">We Use Cookies</h3>
      </div>
      <p className="home-cookie-desc">
        We use cookies to improve your experience and analyze site usage. By clicking &quot;Accept&quot;, you agree to our use of cookies. See our{' '}
        <a href="/legal/cookie-policy" className="home-cookie-link">Cookie Policy</a> to learn more.
      </p>
      <div className="home-cookie-actions">
        <button
          type="button"
          className="home-cookie-btn home-cookie-accept"
          onClick={() => handleConsent('accepted')}
        >
          ACCEPT
        </button>
        <button
          type="button"
          className="home-cookie-btn home-cookie-reject"
          onClick={() => handleConsent('rejected')}
        >
          REJECT
        </button>
      </div>
    </div>
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
      <CookieConsent />
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
        <h2>Driving global healthcare through scalable pharma leadership</h2>
        <p>
          With over four decades of industry leadership, Granules India is committed to delivering
          high-quality, affordable medicines globally, through an integrated manufacturing platform.
          We offer end-to-end solutions for global healthcare needs, built on compliance,
          innovation, and operational scale, across Active Pharmaceutical Ingredients (APIs),
          Pharmaceutical Formulation Intermediates (PFIs), Finished Dosage Forms (FDFs), and Peptide CDMO.
        </p>
        <div className="about-cta-wrap">
          <Button href="/company">ABOUT GRANULES &rarr;</Button>
        </div>
      </div>
      <div className="about-stats-wrap">
        <div className="stats">
          <article className="stat"><CountUp to={80} suffix="+" /><span>Countries served</span></article>
          <article className="stat"><CountUp to={40} suffix="+" /><span>Years of excellence</span></article>
          <article className="stat"><CountUp to={10} /><span>Manufacturing facilities<br />across India, US & Europe</span></article>
          <article className="stat"><CountUp to={6} /><span>R&D centers of excellence</span></article>
          <article className="stat"><CountUp to={150} suffix="+" /><span>Dossiers</span></article>
          <article className="stat"><CountUp to={100} suffix="+" /><span>DMFs</span></article>
        </div>
      </div>
    </section>
  );
}

function Business() {
  const [openProduct, setOpenProduct] = useState(-1);
  const navigate = useNavigate();

  return (
    <section className="section shell ruled" id="business">
      <Tag>Business Verticals</Tag>
      <div className="section-heading split-heading">
        <div>
          <h2>Delivering Impact Across Pharmaceutical Value Chain</h2>
          <p>
            We serve patients and our partners across the globe with a vertically integrated model
            that brings together innovation, manufacturing excellence, and compliance at scale. With
            established capabilities across APIs, PFIs, finished dosages and peptide CDMO, we are
            also strengthening our portfolio complexity across therapies with high-barrier, early to
            market opportunities in Central Nervous System (CNS), oncology and metabolic disorders.
          </p>
        </div>
        <Button href="/business/api">Products &rarr;</Button>
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
  const tabs = ['Our Locations', 'Our Key Subsidiaries', 'Our Facilities'];
  const [active, setActive] = useState(0);
  const points = [
    [
      { x: 30, y: 40, label: 'North America', large: true },
      { x: 49.2, y: 43, label: 'Europe' },
      { x: 65.1, y: 59.6, label: 'Granules India' },
      { x: 66.2, y: 58.9, label: 'Granules CZRO' },
      { x: 67.1, y: 58.1, label: 'Hyderabad' },
    ],
    [{ x: 50.7, y: 55.4, label: 'Granules India', large: true }],
    [
      { x: 48.2, y: 56.4, label: 'Manufacturing facility' },
      { x: 52.1, y: 54.9, label: 'R&D and manufacturing facility', large: true },
    ],
  ];
  return (
    <section className={`presence presence-state-${active}`} id="presence">
      <div className="presence-copy">
        <Tag>Our Presence</Tag>
        <h2>Trusted healthcare partner in 80+ countries</h2>
      </div>
      <div className="map-wrap">
        <div className={`map-plane${active > 0 ? ' focus-india' : ''}`} aria-hidden="true">
          <img className="map" src={worldMapUrl} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="map-points" key={active}>
          {points[active].map((point, index) => (
            <button
              className={`map-dot${point.large ? ' large' : ''}`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              type="button"
              aria-label={point.label}
              key={`${point.label}-${index}`}
            >
              <b aria-hidden="true">+</b>
              <span>{point.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="presence-tabs shell">
        {tabs.map((tab, index) => (
          <button
            className={active === index ? 'active' : ''}
            onClick={() => setActive(index)}
            key={tab}
          >
            {tab}
            <span className="tab-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  const certsGroup = [...certs, ...certs, ...certs];

  return (
    <section className="credentials shell">
      <h2>
        Our facilities are approved by key global regulatory authorities, reflecting our commitment
        to quality systems, operational transparency, and market readiness.
      </h2>
      <div className="cert-row" aria-label="Regulatory certifications">
        <div className="cert-track">
          <div className="cert-group">
            {certsGroup.map((logo, index) => (
              <img
                src={`${A}${logo}`}
                alt="Regulatory certification"
                key={`primary-${logo}-${index}`}
                loading="eager"
                decoding="async"
              />
            ))}
          </div>

          <div className="cert-group" aria-hidden="true">
            {certsGroup.map((logo, index) => (
              <img
                src={`${A}${logo}`}
                alt=""
                key={`clone-${logo}-${index}`}
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

function Sustainability() {
  const items = [
    {
      title: 'Target to achieve Net Zero by 2050',
      body: 'We are committed to science-based decarbonization, with SBTi-validated targets guiding our journey toward Net Zero emissions.',
      icon: 'icon-recycle-leaf.svg',
      iconType: 'plain',
      href: '/sustainability/strategy',
      cta: 'View Decarbonisation Strategy',
      bg: `${A}sustainability-net-zero.jpg`,
    },
    {
      title: 'Granules CZRO',
      body: 'Our greenfield manufacturing unit leads the way in energy-efficient operations and low-emission processes, redefining what large-scale green pharma looks like.',
      icon: 'icon-windmill-sustain.svg',
      iconType: 'circle',
      href: '/company/granules-czro',
      cta: 'Explore Granules CZRO',
      bg: `${A}sustainability.webp`,
    },
    {
      title: 'Pharma Pathshala',
      body: 'Building community resilience through access to skills, knowledge and meaningful opportunity.',
      icon: 'icon-home-sustain.svg',
      iconType: 'circle',
      href: '/sustainability/esg-in-action/community',
      cta: 'Discover Community Programs',
      bg: `${A}sustainability-pathshala.jpg`,
    },
  ];
  const [open, setOpen] = useState(0);
  const currentBg = (open >= 0 && items[open]?.bg) ? items[open].bg : items[0].bg;

  return (
    <section className="sustainability" id="sustainability" style={{ backgroundImage: `url(${currentBg})` }}>
      <div className="sustainability-overlay" />
      <div className="sustainability-copy">
        <Tag>Sustainability</Tag>
        <h2>Where science acts responsibly</h2>
        <p>
          From reducing our carbon footprint and investing in clean energy to building community
          resilience through skill development, we are shaping a healthier, more sustainable world.
        </p>
        <Button href="/sustainability" className="green">Learn More &rarr;</Button>
      </div>
      <div className="accordion">
        {items.map((item, index) => (
          <article className={open === index ? 'open' : ''} key={item.title}>
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              <span className="accordion-head">
                <i className={`accordion-icon accordion-icon-${item.iconType}`}>
                  <img src={`${A}${item.icon}`} alt="" loading="lazy" decoding="async" />
                </i>
                <span>{item.title}</span>
              </span>
              <img
                className="accordion-toggle"
                src={`${A}${open === index ? 'icon-minus-round.svg' : 'icon-plus-round.svg'}`}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </button>
            {open === index && (
              <div style={{ marginTop: '16px' }}>
                <p>{item.body}</p>
                <Link
                  to={item.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '12px',
                    color: 'var(--green)',
                    fontWeight: 700,
                    fontSize: '15px',
                    textDecoration: 'none',
                  }}
                >
                  <span>{item.cta}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Investor() {
  const docs = [
    {
      title: 'Integrated annual report 2024-25',
      href: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
      download: 'Granules_Integrated_Annual_Report_2024-25.pdf',
    },
    {
      title: 'Q2 Results for 2026',
      href: '/documents/Press-Release-Q2-FY26-07edcf6db296.pdf',
      download: 'Granules_Q2_FY26_Results.pdf',
    },
    {
      title: 'Investor presentation',
      href: '/documents/Earnings-Presentation-Q2FY26-Circulation-fb2ccd8cf24d.pdf',
      download: 'Granules_Investor_Presentation.pdf',
    },
  ];
  return (
    <section className="section shell investor" id="investor">
      <div className="investor-copy">
        <Tag>Investor Relations</Tag>
        <h2>Transparent. Trusted. Future-focused.</h2>
        <p>
          Driven by operational excellence and responsible growth, we remain focused on creating
          sustainable value for our investors.
        </p>
        <Button href="/investor">Learn More &rarr;</Button>
      </div>
      <div className="investor-panel">
        <a
          href="/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="investor-cover"
          aria-label="View Annual Reports"
        >
          <img
            src={`${A}investor-report-cover.webp`}
            alt="Granules India Integrated Annual Report"
            loading="lazy"
            decoding="async"
          />
        </a>
        <div className="investor-side">
          <div className="stock-price-card">
            <span>Stock Price</span>
            <div className="exchange-links">
              <Link className="exchange-pill" to="/investor">
                NSE
                <img className="arrow-ne" src={`${A}icon-arrow-diag-investor.svg`} alt="" loading="lazy" decoding="async" />
              </Link>
              <Link className="exchange-pill" to="/investor">
                BSE
                <img className="arrow-ne" src={`${A}icon-arrow-diag-investor.svg`} alt="" loading="lazy" decoding="async" />
              </Link>
            </div>
          </div>
          <div className="investor-docs">
            {docs.map((doc) => (
              <a
                className="investor-doc"
                href={doc.href}
                download={doc.download}
                target="_blank"
                rel="noopener noreferrer"
                key={doc.title}
              >
                <span>{doc.title}</span>
                <i className="download-badge">
                  <img src={`${A}investor/pdf-icon.svg`} alt="" loading="lazy" decoding="async" />
                </i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Media() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <section className="section shell ruled media" id="media">
        <div className="split-heading">
          <div>
            <Tag>Newsroom</Tag>
            <h2>What’s new at Granules</h2>
          </div>
          <Button href="/media">View all &rarr;</Button>
        </div>
        <div className="news-grid">
          {news.map((item) => (
            <article className="news-card" key={item.title}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${item.title}`}
                >
                  <img src={`${A}${item.image}`} alt="" loading="lazy" decoding="async" />
                  <div className="news-meta">
                    <span>{item.category}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <span className="read-more">Read More &rarr;</span>
                </a>
              ) : (
                <button onClick={() => setSelected(item)} aria-label={`Read ${item.title}`}>
                  <img src={`${A}${item.image}`} alt="" loading="lazy" decoding="async" />
                  <div className="news-meta">
                    <span>{item.category}</span>
                    <time>12 June 2024</time>
                  </div>
                  <h3>{item.title}</h3>
                  <span className="read-more">Read More &rarr;</span>
                </button>
              )}
            </article>
          ))}
        </div>
      </section>
      <Modal item={selected} onClose={() => setSelected(null)} label="Newsroom" />
    </>
  );
}

function Careers() {
  return (
    <section className="careers shell" id="careers" style={{ backgroundImage: `url(${A}career.webp)` }}>
      <div>
        <h2>Shape healthcare with Granules</h2>
        <p>Every role here strengthens access to affordable treatment for millions.</p>
      </div>
      <Button href="/careers">Explore Careers &rarr;</Button>
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
          <span>Copyright © 2025 Granules. All rights reserved.</span>
          <Link to="/contact">Privacy Policy</Link>
          <Link to="/contact">Cookies Policy</Link>
          <Link to="/contact">Disclaimer</Link>
          <Link to="/contact">Data Protection Notice</Link>
          <Link to="/contact">Terms & Condition</Link>
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
    ['Business Verticals', '#business', 'APIs, PFIs and finished dosages'],
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [progress, setProgress] = useState(0);
  const [navCompressed, setNavCompressed] = useState(false);
  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section:not(.hero), footer')];
    sections.forEach((section) => section.classList.add('reveal-ready'));
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('revealed')), { threshold: .08 });
    sections.forEach((section) => reveal.observe(section));
    const active = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.id && setActiveSection(entry.target.id)), { rootMargin: '-35% 0px -55%', threshold: 0 });
    [...document.querySelectorAll('[id="about"],[id="business"],[id="presence"],[id="sustainability"],[id="investor"],[id="media"],[id="careers"],[id="footer"]')].forEach((section) => active.observe(section));
    const onScroll = () => {
      const current = Math.max(0, scrollY);
      setProgress(Math.min(100, (current / (document.documentElement.scrollHeight - innerHeight)) * 100));
      setNavCompressed(current > 72);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { reveal.disconnect(); active.disconnect(); removeEventListener('scroll', onScroll); };
  }, []);
  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Header
        open={menuOpen}
        setOpen={setMenuOpen}
        activeSection={activeSection}
        scrolled={navCompressed}
        onSearch={() => { setMenuOpen(false); setSearchOpen(true); }}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main>
        <Hero />
        <About />
        <Business />
        <Presence />
        <Credentials />
        <Sustainability />
        <Investor />
        <Media />
        <Careers />
      </main>
      <div className="cp">
        <CompanyFooter />
      </div>
      <a
        className={progress > 8 ? 'back-to-top visible' : 'back-to-top'}
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        aria-label="Back to top"
      >
        <Arrow reverse />
      </a>
    </>
  );
}

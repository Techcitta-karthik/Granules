import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import worldMapUrl from '@svg-maps/world/world.svg?url';
import { CompanyFooter } from '../components/company';
import '../components/company/company.css';

const A = '/assets/';

const heroSlides = [
  {
    image: 'hero-1.webp',
    title: 'Globally approved. Vertically integrated. Trusted worldwide',
    cta: 'Our Products',
    link: '#business'
  },
  {
    image: 'hero-5.webp',
    title: 'Driving innovation in peptides and custom manufacturing solutions',
    cta: 'Peptides & CDMO Business',
    link: '/business/peptides'
  },
  {
    image: 'hero-4.webp',
    title: 'Setting global standards in quality, safety, and compliance',
    cta: 'Quality & compliance',
    link: '/business/quality-compliance'
  },
  {
    image: 'hero-3.webp',
    title: 'Innovating for health. Committed to the planet',
    cta: 'Sustainability',
    link: '/sustainability'
  },
  {
    image: 'hero-2.webp',
    title: 'Accelerating Innovation Through Integration and Digitalization',
    cta: 'R&D',
    link: '/business/rd'
  },
];


const products = [
  { image: 'api.webp', title: 'Active Pharmaceutical Ingredients', eyebrow: 'API', body: 'High-volume active pharmaceutical ingredients used by top global pharma companies.' },
  { image: 'pfi.webp', title: 'Pharmaceutical Formulations Intermediates', eyebrow: 'PFI', body: 'Custom pharmaceutical formulation intermediates optimized for flexibility and efficiency.' },
  { image: 'finished-dosage.webp', title: 'Finished Dosages', eyebrow: 'FD', body: 'Finished dosages manufactured at scale, backed by stringent quality systems.' },
];

const news = [
  { image: 'news-1.webp', category: 'News', title: 'Recognized among India’s Top 10 Sustainable Pharma Companies.', body: 'The recognition reflects continued progress across renewable energy, responsible operations and measurable climate action.' },
  { image: 'news-2.webp', category: 'News', title: 'Showcased breakthrough technologies at CPhI Worldwide 2025.', body: 'Granules presented integrated capabilities spanning APIs, finished dosages, peptides and next-generation manufacturing.' },
  { image: 'news-3.webp', category: 'Press Release', title: 'Launched a dedicated peptide manufacturing unit.', body: 'The new facility expands our ability to support complex molecules with a scalable, quality-led development platform.' },
];

const certs = ['cert-1.webp', 'cert-2.webp', 'cert-3.webp', 'cert-4.webp', 'cert-5.webp', 'cert-6.webp', 'cert-7.webp'];

function Arrow({ reverse = false }) {
  return <img className={`arrow-icon ${reverse ? 'reverse' : ''}`} src={`${A}hero-arrow.svg`} alt="" loading="eager" decoding="async" />;
}

function Button({ children, href = '#', className = '' }) {
  if (href && href.startsWith('/')) {
    return <Link className={`button ${className}`} to={href}>{children}</Link>;
  }
  return <a className={`button ${className}`} href={href}>{children}</a>;
}

function Header({ open, setOpen, activeSection, onSearch, scrolled }) {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const closeTimer = useRef(null);
  const links = [
    ['About Us', '/company'], ['Business', '#business'], ['Sustainability', '#sustainability'],
    ['Investor', '#investor'], ['Media', '#media'], ['Careers', '#careers'], ['Contact', '#footer']
  ];
  const submenuData = {
    'About Us': {
      title: 'About Us',
      quickLinks: [
        ['ABOUT US', '/company'],
        ['MILESTONE', '/company/milestone'],
        ['AWARDS', '/company/awards'],
      ],
      links: [
        ['Leadership', '/company/leadership'],
        ['Group Companies', '/company#subsidiaries'],
        ['Sub Companies', '/company#subsidiaries'],
        ['Operational Excellence', '/company/operational-excellence'],
      ],
      image: 'company/values-bg-2.webp',
    },
    Company: {
      title: 'About Us',
      quickLinks: [
        ['ABOUT US', '/company'],
        ['MILESTONE', '/company/milestone'],
        ['AWARDS', '/company/awards'],
      ],
      links: [
        ['Leadership', '/company/leadership'],
        ['Group Companies', '/company#subsidiaries'],
        ['Sub Companies', '/company#subsidiaries'],
        ['Operational Excellence', '/company/operational-excellence'],
      ],
      image: 'company/values-bg-2.webp',
    },
    Business: {
      title: 'Business',
      quickLinks: [
        ['API', '/business/api'],
        ['PFI', '/business/pfi'],
        ['FINISHED DOSAGES', '/business/fd'],
        ['PEPTIDES', '/business/peptides'],
      ],
      links: [
        ['Research & Development', '/business/rd'],
        ['Quality & Compliance', '/business/quality-compliance'],
        ['Manufacturing Facilities', '/company/facilities'],
      ],
      image: 'company/gpi-facility.webp',
    },
    Sustainability: {
      title: 'Sustainability',
      quickLinks: [
        ['OVERVIEW', '/sustainability'],
        ['STRATEGY', '/sustainability/strategy'],
        ['ESG IN ACTION', '/sustainability/esg-in-action'],
      ],
      links: [
        ['Policies', '/sustainability#policies'],
        ['Reports & Disclosures', '/sustainability#reports'],
        ['Assurance & Verification Report', '/sustainability#assurance'],
        ['Commitments Memberships & Ratings', '/sustainability#commitments'],
        ['Certifications', '/sustainability#certifications'],
      ],
      image: 'esg-world-profile.webp',
    },
    Investor: {
      title: 'Investor',
      quickLinks: [
        ['OVERVIEW', '/investor'],
        ['ANNUAL REPORTS', '/investor/annual-reports'],
      ],
      links: [
        ['Quarterly Results', '/investor'],
        ['Investor Resources', '/investor'],
        ['Financial Highlights', '/investor'],
      ],
      image: 'investor-report-cover.webp',
    },
    Media: {
      title: 'Media',
      quickLinks: [
        ['NEWS & MEDIA', '/media'],
        ['PRESS RELEASES', '/media'],
      ],
      links: [
        ['Corporate Announcements', '/media'],
        ['Media Kit', '/media'],
      ],
      image: 'company/leadership-photo-main-2.webp',
    },
    Careers: {
      title: 'Careers',
      quickLinks: [
        ['OVERVIEW', '/careers'],
        ['OPPORTUNITIES', '/careers/opportunities'],
      ],
      links: [
        ['Life at Granules', '/careers/life-at-granules'],
        ['Culture & Purpose', '/careers'],
      ],
      image: 'company/career-bg.webp',
    },
    Contact: {
      title: 'Contact',
      quickLinks: [
        ['CONTACT US', '/contact'],
      ],
      links: [
        ['Global Offices', '/contact'],
        ['Investor Inquiries', '/investor'],
      ],
      image: 'company/gpi-facility.webp',
    },
  };

  const showMenu = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredMenu(label);
  };

  const hideMenu = () => {
    closeTimer.current = setTimeout(() => setHoveredMenu(null), 200);
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Granules home"><img src={`${A}logo.webp`} alt="Granules" loading="eager" decoding="async" /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
      <nav className={open ? 'open' : ''} aria-label="Primary navigation">
        {links.map(([label, href]) => {
          const sub = submenuData[label];
          return (
            <div className="home-nav-item" key={label} onMouseEnter={() => sub && showMenu(label)} onMouseLeave={hideMenu}>
              {href.startsWith('#') ? (
                <a className={activeSection === href.slice(1) ? 'active' : ''} aria-current={activeSection === href.slice(1) ? 'page' : undefined} href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ) : (
                <Link className={activeSection === href.slice(1) ? 'active' : ''} aria-current={activeSection === href.slice(1) ? 'page' : undefined} to={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              )}
              {sub && (
                <div className={`home-nav-submenu${hoveredMenu === label ? ' is-open' : ''}`} onMouseEnter={() => showMenu(label)}>
                  <div className="home-nav-submenu-copy">
                    <div className="home-nav-submenu-header-box">
                      <strong>{sub.title}</strong>
                      <div className="home-nav-quick-links">
                        {sub.quickLinks.map(([subLabel, subHref]) => (
                          <Link to={subHref} key={subLabel} onClick={() => { setHoveredMenu(null); setOpen(false); }}>
                            <span>{subLabel}</span>
                            <span aria-hidden="true">↗</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="home-nav-submenu-links">
                      {sub.links.map(([subLabel, subHref]) => (
                        <Link to={subHref} key={subLabel} onClick={() => { setHoveredMenu(null); setOpen(false); }}>
                          {subLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="home-nav-submenu-thumb">
                    <img src={`${A}${sub.image}`} alt="" loading="lazy" decoding="async" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <button className="search-button" aria-label="Search the page" onClick={onSearch}><img src={`${A}search.svg`} alt="" loading="lazy" decoding="async" /></button>
        <span className="global">🌍 <span>Global</span></span>
      </nav>
    </header>
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
      {previousSlide !== null && <div className="hero-image hero-image-previous" style={{ backgroundImage: `url(${A}${heroSlides[previousSlide].image})` }} />}
      <div className={`hero-image hero-image-current${previousSlide !== null ? ' is-transitioning' : ''}`} key={slide} style={{ backgroundImage: `url(${A}${current.image})` }} onAnimationEnd={() => setPreviousSlide(null)} />
      <div className="hero-shade" />
      <div className="hero-content shell">
        <h1>{current.title}</h1>
        <Button href={current.link || '#business'}>{current.cta}</Button>
      </div>
      <div className="hero-controls shell">
        <div className="progress" aria-label="Hero slides">
          {heroSlides.map((_, index) => <button key={index} className={index === slide ? 'active' : ''} onClick={() => goToSlide(index)} aria-label={`Go to slide ${index + 1}`} />)}
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
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="content-modal" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close details">×</button>{item.image && <img src={`${A}${item.image}`} alt="" loading="lazy" decoding="async" />}<div><Tag>{item.eyebrow || item.category || label}</Tag><h2>{item.title}</h2><p>{item.body}</p><Button href="#footer" className="modal-cta">Contact Our Team</Button></div></section></div>;
}

function About() {
  return (
    <section className="section shell about" id="about">
      <div className="about-copy">
        <h2>Driving global healthcare through scalable pharma leadership</h2>
        <p>With over four decades of industry leadership, Granules India is committed to delivering high-quality, affordable medicines globally, through an integrated manufacturing platform. We offer end-to-end solutions for global healthcare needs, built on compliance, innovation, and operational scale, across Active Pharmaceutical Ingredients (APIs), Pharmaceutical Formulation Intermediates (PFIs), Finished Dosage Forms (FDFs), and Peptide CDMO.</p>
        <div className="about-cta-wrap">
          <Button href="/company">ABOUT GRANULES</Button>
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

  return (
    <section className="section shell ruled" id="business">
      <Tag>Business Verticals</Tag>
      <div className="section-heading split-heading">
        <div>
          <h2>Comprehensive capabilities across core and emerging therapies</h2>
          <p>We operate across five strategic verticals, combining scientific depth, regulatory experience, and manufacturing strength.</p>
        </div>
        <Button href="#business">Products</Button>
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
                onClick={() => setOpenProduct(isOpen ? -1 : index)}
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
                    <span className="product-learn">LEARN MORE</span>
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
      <div className="presence-copy"><Tag>Our Presence</Tag><h2>Trusted healthcare partner in 80+ countries</h2></div>
      <div className="map-wrap">
        <div className={`map-plane${active > 0 ? ' focus-india' : ''}`} aria-hidden="true">
          <img className="map" src={worldMapUrl} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="map-points" key={active}>
          {points[active].map((point, index) => (
            <button className={`map-dot${point.large ? ' large' : ''}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} type="button" aria-label={point.label} key={`${point.label}-${index}`}>
              <b aria-hidden="true">+</b><span>{point.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="presence-tabs shell">{tabs.map((tab, index) => <button className={active === index ? 'active' : ''} onClick={() => setActive(index)} key={tab}>{tab}<span className="tab-arrow" aria-hidden="true">↗</span></button>)}</div>
    </section>
  );
}

function Credentials() {
  // Repeat the logos list to ensure each group exceeds the widest viewport
  const certsGroup = [...certs, ...certs, ...certs];

  return (
    <section className="credentials shell">
      <h2>
        Our facilities are approved by key global regulatory authorities, reflecting our commitment
        to quality systems, operational transparency, and market readiness.
      </h2>
      <div className="cert-row" aria-label="Regulatory certifications">
        <div className="cert-track">
          {/* First group of logos */}
          <div className="cert-group">
            {certsGroup.map((logo, index) => (
              <img
                src={`${A}${logo}`}
                alt="Regulatory certification"
                key={`primary-${logo}-${index}`} loading="eager" decoding="async" />
            ))}
          </div>

          {/* Second duplicate group of logos for seamless infinite looping */}
          <div className="cert-group" aria-hidden="true">
            {certsGroup.map((logo, index) => (
              <img
                src={`${A}${logo}`}
                alt=""
                key={`clone-${logo}-${index}`} loading="eager" decoding="async" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Sustainability() {
  const items = [
    { title: 'Granules CZRO', body: 'Our greenfield manufacturing unit leads the way in energy-efficient operations and low-emission processes, redefining what large-scale green pharma looks like.', icon: 'icon-windmill-sustain.svg', iconType: 'circle' },
    { title: 'Target to achieve Net Zero by 2050', body: 'A long-term decarbonisation roadmap built around renewables, efficiency and responsible operations.', icon: 'icon-recycle-leaf.svg', iconType: 'plain' },
    { title: 'Pharma Pathshala', body: 'Building community resilience through access to skills, knowledge and meaningful opportunity.', icon: 'icon-home-sustain.svg', iconType: 'circle' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="sustainability" id="sustainability" style={{ backgroundImage: `url(${A}sustainability.webp)` }}>
      <div className="sustainability-overlay" />
      <div className="sustainability-copy"><Tag>Sustainability</Tag><h2>Where science acts responsibly</h2><p>From reducing our carbon footprint and investing in clean energy to building community resilience through skill development, we are shaping a healthier, more sustainable world.</p><Button href="#sustainability" className="green">Learn More</Button></div>
      <div className="accordion">{items.map((item, index) => <article className={open === index ? 'open' : ''} key={item.title}><button onClick={() => setOpen(open === index ? -1 : index)}><span className="accordion-head"><i className={`accordion-icon accordion-icon-${item.iconType}`}><img src={`${A}${item.icon}`} alt="" loading="lazy" decoding="async" /></i><span>{item.title}</span></span><img className="accordion-toggle" src={`${A}${open === index ? 'icon-minus-round.svg' : 'icon-plus-round.svg'}`} alt="" loading="lazy" decoding="async" /></button>{open === index && <p>{item.body}</p>}</article>)}</div>
    </section>
  );
}

function Investor() {
  const docs = ['Integrated annual report 2024-25', 'Q2 Results for 2026', 'Investor presentation'];
  return (
    <section className="section shell investor" id="investor">
      <div className="investor-copy"><Tag>Investor Relations</Tag><h2>Transparent. Trusted. Future-focused.</h2><p>Stay informed with real-time stock performance (NSE | BSE), key financial metrics, and forward-looking growth strategies backed by innovation and execution strength.</p><Button href="#investor">Learn More</Button></div>
      <div className="investor-panel">
        <div className="investor-cover"><img src={`${A}investor-report-cover.webp`} alt="Granules India Integrated Annual Report" loading="lazy" decoding="async" /></div>
        <div className="investor-side">
          <div className="stock-price-card">
            <span>Stock Price</span>
            <div className="exchange-links">
              <a className="exchange-pill" href="#investor">NSE<img className="arrow-ne" src={`${A}icon-arrow-diag-investor.svg`} alt="" loading="lazy" decoding="async" /></a>
              <a className="exchange-pill" href="#investor">BSE<img className="arrow-ne" src={`${A}icon-arrow-diag-investor.svg`} alt="" loading="lazy" decoding="async" /></a>
            </div>
          </div>
          <div className="investor-docs">
            {docs.map((doc) => <a className="investor-doc" href="#investor" key={doc}><span>{doc}</span><i className="download-badge"><img src={`${A}investor/pdf-icon.svg`} alt="" loading="lazy" decoding="async" /></i></a>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Media() {
  const [selected, setSelected] = useState(null);
  return (
    <><section className="section shell ruled media" id="media">
      <div className="split-heading"><div><Tag>Newsroom</Tag><h2>What’s new at Granules</h2></div><Button href="#media">View All</Button></div>
      <div className="news-grid">{news.map((item) => <article className="news-card" key={item.title}><button onClick={() => setSelected(item)} aria-label={`Read ${item.title}`}><img src={`${A}${item.image}`} alt="" loading="lazy" decoding="async" /><div className="news-meta"><span>{item.category}</span><time>12 June 2024</time></div><h3>{item.title}</h3><span className="read-more">Read More</span></button></article>)}</div>
    </section><Modal item={selected} onClose={() => setSelected(null)} label="Newsroom" /></>
  );
}

function Careers() {
  return (
    <section className="careers shell" id="careers" style={{ backgroundImage: `url(${A}career.webp)` }}>
      <div><h2>Shape healthcare with Granules</h2><p>Every role here strengthens access to affordable treatment for millions.</p></div>
      <Button href="#careers">Careers</Button>
    </section>
  );
}

function Footer() {
  const productLinks = ['Active Pharmaceutical Ingredients', 'Pharmaceutical Formulation Intermediates', 'Finished Dosages', 'Peptides'];
  const companyLinks = [['Company', '/company'], ['Sustainability', '#sustainability'], ['Investors', '#investor'], ['Media', '#media'], ['Careers', '#careers'], ['Contact Us', '#footer']];
  const socials = ['facebook.svg', 'instagram.svg', 'x.svg', 'linkedin.svg', 'youtube.svg'];
  return (
    <footer id="footer" style={{ backgroundImage: `url(${A}footer-bg.webp)` }}>
      <div className="footer-main shell">
        <div className="footer-intro"><img src={`${A}footer-logo.webp`} alt="Granules" loading="eager" decoding="async" /><p>Granules India, headquartered in Hyderabad, is a vertically integrated pharma manufacturer delivering APIs, PFIs, and FDs globally with regulatory-compliant operations in India, US and Europe ensuring quality, scale, and sustainability.</p></div>
        <div className="footer-links">
          <div><strong>Products</strong>{productLinks.map((link) => <a href="#business" key={link}>{link}</a>)}</div>
          <div className="footer-col-caps">{companyLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>
        </div>
      </div>
      <div className="footer-bottom shell"><div><span>Copyright © 2025 Granules. All rights reserved.</span><a href="#footer">Privacy Policy</a><a href="#footer">Cookies Policy</a><a href="#footer">Disclaimer</a><a href="#footer">Data Protection Notice</a><a href="#footer">Terms & Condition</a></div><div className="socials">{socials.map((icon) => <a href="#footer" key={icon}><img src={`${A}${icon}`} alt="" loading="lazy" decoding="async" /></a>)}</div></div>
    </footer>
  );
}

function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const results = [
    ['About Granules', '#about', 'Company leadership and integrated capabilities'],
    ['Business Verticals', '#business', 'APIs, PFIs and finished dosages'],
    ['Global Presence', '#presence', 'Locations, subsidiaries and facilities'],
    ['Sustainability', '#sustainability', 'CZRO, Net Zero and Pharma Pathshala'],
    ['Investor Relations', '#investor', 'Stock performance and annual report'],
    ['Newsroom', '#media', 'Achievements and company stories'],
    ['Careers', '#careers', 'Join the Granules team'],
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
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search the homepage"><div className="search-panel"><div className="search-field"><img src={`${A}search.svg`} alt="" loading="lazy" decoding="async" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Granules" aria-label="Search Granules" /><button onClick={onClose} aria-label="Close search">×</button></div><div className="search-results">{results.map(([title, href, detail]) => <a href={href} key={title} onClick={onClose}><span><strong>{title}</strong><small>{detail}</small></span><Arrow /></a>)}{!results.length && <p>No matching section. Try “sustainability” or “investor”.</p>}</div></div></div>;
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
  return <><div className="scroll-progress" style={{ width: `${progress}%` }} /><Header open={menuOpen} setOpen={setMenuOpen} activeSection={activeSection} scrolled={navCompressed} onSearch={() => { setMenuOpen(false); setSearchOpen(true); }} /><SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} /><main><Hero /><About /><Business /><Presence /><Credentials /><Sustainability /><Investor /><Media /><Careers /></main><CompanyFooter /><a className={progress > 8 ? 'back-to-top visible' : 'back-to-top'} href="#top" aria-label="Back to top"><Arrow reverse /></a></>;
}

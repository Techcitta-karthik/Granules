import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import worldMapUrl from '@svg-maps/world/world.svg?url';
import './styles.css';

const A = '/assets/';

const heroSlides = [
  { image: 'hero-1.png', title: 'Globally approved. Vertically integrated. Trusted worldwide.', cta: 'Our Products' },
  { image: 'hero-2.png', title: 'Advancing pharmaceuticals towards a near net zero carbon footprint', cta: 'Granules CZRO' },
  { image: 'hero-3.png', title: 'Innovating for health. Committed to the planet.', cta: 'Sustainability' },
  { image: 'hero-4.png', title: 'Setting global standards in quality, safety, and compliance', cta: 'Quality & Compliance' },
  { image: 'hero-5.png', title: 'Driving innovation in peptides and custom manufacturing solutions', cta: 'Peptides & CDMO Business' },
];

const products = [
  { image: 'api.png', title: 'Active Pharmaceutical Ingredients', eyebrow: 'API', body: 'High-volume active pharmaceutical ingredients used by top global pharma companies.' },
  { image: 'pfi.png', title: 'Pharmaceutical Formulations Intermediates', eyebrow: 'PFI', body: 'Custom pharmaceutical formulation intermediates optimized for flexibility and efficiency.' },
  { image: 'finished-dosage.png', title: 'Finished Dosages', eyebrow: 'FD', body: 'Finished dosages manufactured at scale, backed by stringent quality systems.' },
];

const news = [
  { image: 'news-1.png', category: 'Achievements', title: 'Recognized among India’s Top 10 Sustainable Pharma Companies.', body: 'The recognition reflects continued progress across renewable energy, responsible operations and measurable climate action.' },
  { image: 'news-2.png', category: 'Stories', title: 'Showcased breakthrough technologies at CPhI Worldwide 2025.', body: 'Granules presented integrated capabilities spanning APIs, finished dosages, peptides and next-generation manufacturing.' },
  { image: 'news-3.png', category: 'Stories', title: 'Launched a dedicated peptide manufacturing unit.', body: 'The new facility expands our ability to support complex molecules with a scalable, quality-led development platform.' },
];

const certs = ['cert-1.png', 'cert-2.png', 'cert-3.png', 'cert-4.png', 'cert-5.png', 'cert-6.png', 'cert-7.png'];

function Arrow({ reverse = false }) {
  return <img className={`arrow-icon ${reverse ? 'reverse' : ''}`} src={`${A}hero-arrow.svg`} alt="" />;
}

function Button({ children, href = '#', className = '' }) {
  return <a className={`button ${className}`} href={href}>{children}</a>;
}

function Header({ open, setOpen, activeSection, onSearch, scrolled }) {
  const links = [
    ['Company', '#about'], ['Business', '#business'], ['Sustainability', '#sustainability'],
    ['Investor', '#investor'], ['Media', '#media'], ['Careers', '#careers'], ['Contact', '#footer']
  ];

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Granules home"><img src={`${A}logo.png`} alt="Granules" /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
      <nav className={open ? 'open' : ''} aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={label} className={activeSection === href.slice(1) ? 'active' : ''} aria-current={activeSection === href.slice(1) ? 'page' : undefined} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <button className="search-button" aria-label="Search the page" onClick={onSearch}><img src={`${A}search.svg`} alt="" /></button>
        <span className="global">🌍 <span>Global</span></span>
      </nav>
    </header>
  );
}

function Hero() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focus, setFocus] = useState({ x: 50, y: 50 });
  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 7000);
    return () => clearInterval(timer);
  }, [paused]);
  const current = heroSlides[slide];
  const change = (step) => setSlide((slide + step + heroSlides.length) % heroSlides.length);

  return (
    <section className="hero" id="top" style={{ backgroundImage: `url(${A}${current.image})`, backgroundPosition: `${focus.x}% ${focus.y}%` }} onPointerMove={(event) => { if (event.pointerType === 'mouse') setFocus({ x: 50 + ((event.clientX / innerWidth) - .5) * 4, y: 50 + ((event.clientY / innerHeight) - .5) * 4 }); }}>
      <div className="hero-shade" />
      <div className="hero-content shell hero-live" key={slide}>
        <span className="slide-count">{String(slide + 1).padStart(2, '0')} / 05</span>
        <h1>{current.title}</h1>
        <Button href="#business">{current.cta}</Button>
      </div>
      <div className="hero-controls shell">
        <div className="progress" aria-label="Hero slides">
          {heroSlides.map((_, index) => <button key={index} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`Go to slide ${index + 1}`} />)}
        </div>
        <div className="arrow-controls">
          <button onClick={() => change(-1)} aria-label="Previous slide"><Arrow reverse /></button>
          <button className="pause-button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>{paused ? '▶' : 'Ⅱ'}</button>
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
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="content-modal" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close details">×</button>{item.image && <img src={`${A}${item.image}`} alt="" />}<div><Tag>{item.eyebrow || item.category || label}</Tag><h2>{item.title}</h2><p>{item.body}</p><Button href="#footer" className="modal-cta">Contact Our Team</Button></div></section></div>;
}

function About() {
  return (
    <section className="section shell about" id="about">
      <Tag>About Granules</Tag>
      <div className="about-copy">
        <h2>Driving Global Healthcare Through Scalable Pharma Leadership</h2>
        <p>With over 40 years of industry leadership, Granules India is a vertically integrated pharmaceutical manufacturer with a track record of delivering high-quality, affordable medicines at global scale. From APIs, PFIs, finished dosages, to peptides, and CDMO services, we offer end-to-end solutions for global healthcare companies, built on compliance, innovation, and operational scale.</p>
      </div>
      <div className="about-bottom">
        <Button href="#business">Learn More</Button>
        <div className="stats">
          <article className="stat stat-yellow"><CountUp to={11} /><span>Manufacturing facilities<br />across India, US and Europe</span></article>
          <article className="stat stat-green"><CountUp to={40} suffix="+" /><span>Years of excellence</span></article>
          <article className="stat stat-blue"><CountUp to={80} suffix="+" /><span>Countries served</span></article>
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
        <div><h2>Comprehensive Capabilities across Core and Emerging Therapies</h2><p>We operate across five strategic verticals, combining scientific depth, regulatory experience, and manufacturing strength.</p></div>
        <Button href="#business">Our Products</Button>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <article className={`product-card${openProduct === index ? ' is-open' : ''}`} key={product.title}>
            <button className="product-toggle" type="button" onClick={() => setOpenProduct(openProduct === index ? -1 : index)} aria-expanded={openProduct === index} aria-label={`${openProduct === index ? 'Close' : 'Explore'} ${product.title}`}>
              <span className="product-visual" aria-hidden={openProduct === index}>
                <img src={`${A}${product.image}`} alt="" />
                <span className="product-bar"><span>{product.title}</span><i className="product-symbol" aria-hidden="true">+</i></span>
              </span>
              <span className="product-detail" aria-hidden={openProduct !== index}>
                <span className="product-detail-head"><strong>{product.title}</strong><i className="product-symbol" aria-hidden="true">−</i></span>
                <span className="product-description">{product.body}</span>
                <span className="product-learn">Learn more</span>
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Presence() {
  const tabs = ['Our Locations', 'Our Key Subsidiaries', 'Our Facilities'];
  const [active, setActive] = useState(0);
  const points = [
    [
      { x: 25.5, y: 37, label: 'North America', large: true },
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
          <img className="map" src={worldMapUrl} alt="" />
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
  return (
    <section className="credentials shell">
      <h2>Our facilities are approved by key global regulatory authorities, reflecting our commitment to quality systems, operational transparency, and market readiness.</h2>
      <div className="cert-row">{certs.map((logo) => <img src={`${A}${logo}`} alt="Regulatory certification" key={logo} />)}</div>
    </section>
  );
}

function Sustainability() {
  const items = [
    ['Granules CZRO', 'Our greenfield manufacturing unit leads the way in energy-efficient operations and low-emission processes, redefining what large-scale green pharma looks like.'],
    ['Target to achieve Net Zero by 2050', 'A long-term decarbonisation roadmap built around renewables, efficiency and responsible operations.'],
    ['Pharma Pathshala', 'Building community resilience through access to skills, knowledge and meaningful opportunity.'],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="sustainability shell" id="sustainability" style={{ backgroundImage: `url(${A}sustainability.png)` }}>
      <div className="sustainability-overlay" />
      <div className="sustainability-copy"><Tag>Sustainability</Tag><h2>Where science acts responsibly</h2><p>From reducing our carbon footprint and investing in clean energy to building community resilience through skill development, we are shaping a healthier, more sustainable world.</p><Button href="#sustainability" className="green">Learn More</Button></div>
      <div className="accordion">{items.map(([title, body], index) => <article className={open === index ? 'open' : ''} key={title}><button onClick={() => setOpen(open === index ? -1 : index)}><span>{title}</span><img src={`${A}${open === index ? 'minus.svg' : 'plus.svg'}`} alt="" /></button>{open === index && <p>{body}</p>}</article>)}</div>
    </section>
  );
}

function Investor() {
  const quotes = { NSE: { price: '946.00', move: '▲ 22.10 (2.20%)' }, BSE: { price: '944.45', move: '▲ 20.60 (2.23%)' } };
  const [exchange, setExchange] = useState('NSE');
  const [range, setRange] = useState('1M');
  return (
    <section className="section shell investor" id="investor">
      <div className="investor-copy"><Tag>Investor Relations Snapshot & Stock Price</Tag><h2>Transparent. Trusted. Future-Focused.</h2><p>Stay informed with real-time stock performance, key financial metrics, and forward-looking growth strategies backed by innovation and execution strength.</p><Button href="#investor">Learn More</Button></div>
      <div className="market-panel">
        <article className="stock-card"><div><small>Granules India</small><span>June 14, 2025&nbsp; 12:29</span></div><div className="exchange">{Object.keys(quotes).map((key) => <button key={key} className={exchange === key ? 'active' : ''} onClick={() => setExchange(key)}>{key}</button>)}</div><strong key={exchange}>{quotes[exchange].price}</strong><em>{quotes[exchange].move}</em><div className={`mini-chart chart-${range.toLowerCase()}`} aria-hidden="true"><i /><i /><i /></div><div className="chart-ranges">{['1D','1W','1M','1Y'].map((key) => <button className={range === key ? 'active' : ''} onClick={() => setRange(key)} key={key}>{key}</button>)}</div></article>
        <article className="report-card"><img src={`${A}report-cover.png`} alt="Integrated Annual Report 2024–25" /><a href="#investor">Integrated Annual Report 2024–25 <span>↓</span></a></article>
      </div>
    </section>
  );
}

function Media() {
  const [selected, setSelected] = useState(null);
  return (
    <><section className="section shell ruled media" id="media">
      <div className="split-heading"><div><Tag>Newsroom</Tag><h2>What’s New at Granules</h2></div><Button href="#media">View All</Button></div>
      <div className="news-grid">{news.map((item) => <article className="news-card" key={item.title}><button onClick={() => setSelected(item)} aria-label={`Read ${item.title}`}><img src={`${A}${item.image}`} alt="" /><div className="news-meta"><span>{item.category}</span><time>12 June 2024</time></div><h3>{item.title}</h3><span className="read-more">Read More</span></button></article>)}</div>
    </section><Modal item={selected} onClose={() => setSelected(null)} label="Newsroom" /></>
  );
}

function Careers() {
  return (
    <section className="careers shell" id="careers" style={{ backgroundImage: `url(${A}career.png)` }}>
      <div><h2>Shape Healthcare with Granules</h2><p>Join a purpose-driven team dedicated to delivering affordable medicines worldwide. Collaborate across continents and disciplines to create impact that matters, every single day.</p><Button href="#careers">Careers</Button></div>
    </section>
  );
}

function Footer() {
  const columns = [
    ['About', 'Company', 'Vision & Mission', 'Leadership', 'Milestone', 'Group Companies'],
    ['Solutions & R&D', 'Products', 'Manufacturing', 'Quality', 'R&D', 'Facilities'],
    ['Impact', 'Investors', 'Newsroom', 'Careers', 'Connect'],
  ];
  const socials = ['facebook.svg', 'instagram.svg', 'x.svg', 'linkedin.svg', 'youtube.svg'];
  return (
    <footer id="footer" style={{ backgroundImage: `url(${A}footer-bg.png)` }}>
      <div className="footer-main shell">
        <div className="footer-intro"><img src={`${A}footer-logo.png`} alt="Granules" /><p>Granules India is a vertically integrated pharmaceutical manufacturer headquartered in Hyderabad, India, delivering APIs, PFIs, FDs, peptides, and CDMO services to global markets.</p></div>
        <div className="footer-links">{columns.map((column) => <div key={column[0]}><strong>{column[0]}</strong>{column.slice(1).map((link) => <a href="#top" key={link}>{link}</a>)}</div>)}</div>
      </div>
      <div className="footer-bottom shell"><div><span>Copyright © 2025 Granules. All rights reserved.</span><a href="#footer">Privacy Policy</a><a href="#footer">Cookies Policy</a><a href="#footer">Disclaimer</a><a href="#footer">Terms & Conditions</a></div><div className="socials">{socials.map((icon) => <a href="#footer" key={icon}><img src={`${A}${icon}`} alt="" /></a>)}</div></div>
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
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search the homepage"><div className="search-panel"><div className="search-field"><img src={`${A}search.svg`} alt="" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Granules" aria-label="Search Granules" /><button onClick={onClose} aria-label="Close search">×</button></div><div className="search-results">{results.map(([title, href, detail]) => <a href={href} key={title} onClick={onClose}><span><strong>{title}</strong><small>{detail}</small></span><Arrow /></a>)}{!results.length && <p>No matching section. Try “sustainability” or “investor”.</p>}</div></div></div>;
}

function App() {
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
  return <><div className="scroll-progress" style={{ width: `${progress}%` }} /><Header open={menuOpen} setOpen={setMenuOpen} activeSection={activeSection} scrolled={navCompressed} onSearch={() => { setMenuOpen(false); setSearchOpen(true); }} /><SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} /><main><Hero /><About /><Business /><Presence /><Credentials /><Sustainability /><Investor /><Media /><Careers /></main><Footer /><a className={progress > 8 ? 'back-to-top visible' : 'back-to-top'} href="#top" aria-label="Back to top"><Arrow reverse /></a></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

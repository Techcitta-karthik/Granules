import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { asset } from '../components/company/constants';
import '../components/company/company.css';
import './business.css';
import './product-portfolio.css';
import portfolioData from '../data/productPortfolio.json';

type Segment = 'All' | 'API' | 'PFI' | 'Finished Dosage';
type Filing = 'GLOBAL' | 'US' | 'EU' | 'CA' | 'KR' | 'JP' | 'BR' | 'MX' | 'CN' | 'UK' | 'ZA' | 'AU';
type Integration = 'forward' | 'backward' | 'both' | 'none';

type PortfolioProduct = {
  section: string;
  segment: string;
  srNo: number;
  name: string;
  concentration: string;
  therapy: string;
  grade: string;
  brand: string;
  manufacturingUnit: string;
  filings: Filing[];
  integration: Integration;
};

const SEGMENTS: Segment[] = ['All', 'API', 'PFI', 'Finished Dosage'];
const PORTFOLIO_PRODUCTS = portfolioData.products as PortfolioProduct[];

const TABLE_TITLES: Record<Segment, string> = {
  All: 'Granules Product Portfolio',
  API: 'Active Pharmaceutical Ingredients',
  PFI: 'Pharmaceutical Formulation Intermediates',
  'Finished Dosage': 'Finished Dosages',
};

const FILING_LABELS: Record<Filing, string> = {
  GLOBAL: 'Planning for Global filing',
  US: 'US',
  EU: 'European Union',
  CA: 'Canada',
  KR: 'Korea',
  JP: 'Japan',
  BR: 'Brazil',
  MX: 'Mexico',
  CN: 'China',
  UK: 'United Kingdom',
  ZA: 'South Africa',
  AU: 'Australia',
};

const LEGEND_FILINGS: Filing[] = ['US', 'EU', 'CA', 'KR', 'JP', 'BR', 'MX', 'CN', 'UK', 'ZA', 'AU', 'GLOBAL'];

function matchesSearchQuery(text: string, rawQuery: string) {
  if (!text || !rawQuery) return false;
  const cleanQ = rawQuery.toLowerCase().replace(/[*+\\?^$\[\]{}()|]+/g, ' ').trim();
  if (!cleanQ) return false;

  const target = text.toLowerCase();
  if (target.includes(cleanQ)) return true;

  const searchWords = cleanQ.split(/\s+/).filter(Boolean);
  if (searchWords.length === 0) return false;

  const targetWords = target.split(/[\s,/\-\(\)\.]+/).filter(Boolean);
  return searchWords.every((sw) =>
    target.includes(sw) || targetWords.some((tw) => tw.startsWith(sw))
  );
}

function matchesProduct(product: PortfolioProduct, rawQuery: string) {
  if (!rawQuery || !rawQuery.trim()) return true;
  const q = rawQuery.trim();
  if (
    matchesSearchQuery(product.name, q) ||
    matchesSearchQuery(product.therapy, q) ||
    matchesSearchQuery(product.brand, q) ||
    matchesSearchQuery(product.grade, q) ||
    matchesSearchQuery(product.segment, q)
  ) {
    return true;
  }
  const combined = [product.name, product.therapy, product.brand, product.grade, product.segment]
    .filter(Boolean)
    .join(' ');
  return matchesSearchQuery(combined, q);
}

function formatConcentration(value: string) {
  if (!value) return '—';
  const n = Number(value);
  if (!Number.isNaN(n) && n > 0 && n <= 1) {
    const pct = n * 100;
    const formatted = pct % 1 === 0 ? String(pct) : pct.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
    return `${formatted}%`;
  }
  return value;
}

function FilingIcon({ code }: { code: Filing }) {
  const title = FILING_LABELS[code];

  return (
    <span className={`pp-flag pp-flag-${code.toLowerCase()}`} title={title} aria-label={title}>
      {code === 'GLOBAL' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#5ec8e8" />
          <path d="M5.2 9.2c1.8-.4 3.4.2 4.6 1.2 1.1.9 2.6 1 3.9.3 1.2-.6 2.7-.4 3.8.6l.7 1.2c-1.6 1.8-3.8 2.2-6 1.4-1.6-.6-3.3-.4-4.7.6-.5.4-1.2.4-1.7 0C4.4 13.3 3.8 11.4 5.2 9.2z" fill="#8fd14f" />
          <path d="M8.2 5.4c1.2-.6 2.6-.4 3.6.4 1 .8 2.4.9 3.5.2.7-.4 1.6-.3 2.1.4.4.6.3 1.4-.2 1.9-1.4 1.3-3.5 1.1-5-.4-.9-.9-2.3-1-3.4-.2-.4.3-.9.3-1.3 0-.6-.4-.8-1.2-.4-1.8.3-.4.7-.6 1.1-.5z" fill="#8fd14f" />
          <path d="M7.4 16.6c1.1.8 2.6.9 3.8.2 1.3-.7 2.9-.6 4.1.2.5.3 1.1.2 1.5-.2.5-.6.4-1.5-.2-2-1.7-1.4-4.1-1.2-5.7.4-.8.8-2 .9-3 .2-.4-.3-1-.2-1.3.2-.4.5-.3 1.2.2 1.6.2.1.4.3.6.4z" fill="#8fd14f" />
        </svg>
      )}
      {code === 'US' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#fff" />
          <path d="M1.8 9h20.4v2H1.8zm0 4h20.4v2H1.8z" fill="#bf0a30" />
          <path d="M1.8 7h20.4v2H1.8zm0 8h20.4v2H1.8z" fill="#bf0a30" />
          <rect x="2" y="4.5" width="10" height="8" fill="#002868" />
        </svg>
      )}
      {code === 'EU' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#003399" />
          <circle cx="12" cy="6.2" r="0.7" fill="#fc0" />
          <circle cx="16.2" cy="7.8" r="0.7" fill="#fc0" />
          <circle cx="17.8" cy="12" r="0.7" fill="#fc0" />
          <circle cx="16.2" cy="16.2" r="0.7" fill="#fc0" />
          <circle cx="12" cy="17.8" r="0.7" fill="#fc0" />
          <circle cx="7.8" cy="16.2" r="0.7" fill="#fc0" />
          <circle cx="6.2" cy="12" r="0.7" fill="#fc0" />
          <circle cx="7.8" cy="7.8" r="0.7" fill="#fc0" />
        </svg>
      )}
      {code === 'CA' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#fff" />
          <rect x="2" y="5" width="4.5" height="14" fill="#ff0000" />
          <rect x="17.5" y="5" width="4.5" height="14" fill="#ff0000" />
          <path d="M12 7.2l.7 2.1h2.2l-1.8 1.3.7 2.2L12 11.6l-1.8 1.2.7-2.2-1.8-1.3h2.2z" fill="#ff0000" />
        </svg>
      )}
      {code === 'KR' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#fff" />
          <path d="M12 7.2a4.8 4.8 0 010 9.6 2.4 2.4 0 000-4.8 2.4 2.4 0 000-4.8z" fill="#cd2e3a" />
          <path d="M12 7.2a2.4 2.4 0 000 4.8 2.4 2.4 0 000 4.8 4.8 4.8 0 010-9.6z" fill="#0047a0" />
        </svg>
      )}
      {code === 'JP' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#fff" />
          <circle cx="12" cy="12" r="4.6" fill="#bc002d" />
        </svg>
      )}
      {code === 'BR' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#009b3a" />
          <polygon points="12,6.5 18.5,12 12,17.5 5.5,12" fill="#fedf00" />
          <circle cx="12" cy="12" r="2.4" fill="#002776" />
        </svg>
      )}
      {code === 'MX' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect width="24" height="24" fill="#fff" />
          <rect x="0" y="0" width="8" height="24" fill="#006847" />
          <rect x="16" y="0" width="8" height="24" fill="#ce1126" />
          <circle cx="12" cy="12" r="1.6" fill="#8b5a2b" />
        </svg>
      )}
      {code === 'CN' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#de2910" />
          <polygon points="7,7.2 8,9.8 5.4,8.4 8.6,8.4 6,9.8" fill="#ffde00" />
        </svg>
      )}
      {code === 'UK' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#012169" />
          <path d="M12 4v16M4 12h16" stroke="#fff" strokeWidth="2.2" />
          <path d="M12 4v16M4 12h16" stroke="#c8102e" strokeWidth="1" />
        </svg>
      )}
      {code === 'ZA' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#007749" />
          <path d="M4 12h16" stroke="#fff" strokeWidth="1.6" />
          <path d="M4 10.5h16M4 13.5h16" stroke="#ffb612" strokeWidth="1.2" />
        </svg>
      )}
      {code === 'AU' && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#012169" />
          <circle cx="16.5" cy="15" r="1.1" fill="#fff" />
          <circle cx="14.8" cy="17.2" r="0.8" fill="#fff" />
          <circle cx="17.8" cy="17" r="0.7" fill="#fff" />
        </svg>
      )}
    </span>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 28 18" aria-hidden="true">
      <path d="M1 7.2h14.2V2.4L27 9 15.2 15.6V10.8H1V7.2z" fill="#34c759" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 28 18" aria-hidden="true">
      <path d="M27 7.2H12.8V2.4L1 9l11.8 6.6V10.8H27V7.2z" fill="#7ec8e3" />
    </svg>
  );
}

function IntegrationMark({ type }: { type: Integration }) {
  if (type === 'none') return null;

  if (type === 'both') {
    return (
      <span className="pp-integ pp-integ-stack" title="Backward and forward integrated" aria-label="Backward and forward integrated">
        <ArrowLeft />
        <ArrowRight />
      </span>
    );
  }

  if (type === 'backward') {
    return (
      <span className="pp-integ" title="Backward integrated" aria-label="Backward integrated">
        <ArrowLeft />
      </span>
    );
  }

  return (
    <span className="pp-integ" title="Forward integrated" aria-label="Forward integrated">
      <ArrowRight />
    </span>
  );
}

const products = [
  {
    image: 'finished-dosage.webp',
    title: 'Finished Dosages (FDs)',
    eyebrow: 'FD',
    body: 'Scale and complexity supported by multi-site supply capabilities, comprehensive oral solid dosage solutions engineered for affordability, patient safety, and global compliance.',
    href: '/business/fd',
    cta: 'Click here to know more',
  },
  {
    image: 'pfi.webp',
    title: 'Pharmaceutical Formulation Intermediates (PFIs)',
    eyebrow: 'PFI',
    body: 'Custom pharmaceutical formulation intermediates optimized for efficiency and flexibility with proprietary "Drum to Hopper" direct compression blends that eliminate manufacturing complexity.',
    href: '/business/pfi',
    cta: 'Click here to know more',
  },
  {
    image: 'api.webp',
    title: 'Active Pharmaceutical Ingredients (APIs)',
    eyebrow: 'API',
    body: 'Large-scale manufacturing capabilities, integrated operations, and deep process chemistry delivering high-volume legacy molecules and complex niche APIs across 80+ countries.',
    href: '/business/api',
    cta: 'Click here to know more',
  },
];

export default function GenericsPage() {
  const [openProduct, setOpenProduct] = useState<number>(-1);
  const [segment, setSegment] = useState<Segment>('All');
  const [therapy, setTherapy] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tableWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [isIntroScrolled, setIsIntroScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Generics — Advancing Healthcare Through Science & Scale | Granules India';

    const descriptionContent =
      'Granules India offers a diverse and continually evolving portfolio spanning APIs, PFIs, Finished Dosages, and Peptides CDMO products with integrated excellence.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const therapies = useMemo(() => {
    const options = new Set<string>();
    PORTFOLIO_PRODUCTS.forEach((product) => {
      if (segment === 'All' || product.segment === segment) {
        if (product.therapy) options.add(product.therapy);
      }
    });
    return ['All', ...Array.from(options).sort((a, b) => a.localeCompare(b))];
  }, [segment]);

  useEffect(() => {
    if (!therapies.includes(therapy)) {
      setTherapy('All');
    }
  }, [therapies, therapy]);

  useEffect(() => {
    setVisibleCount(10);
    if (tableWrapRef.current) {
      tableWrapRef.current.scrollTop = 0;
    }
  }, [segment, therapy, searchQuery]);

  const handleSelectSuggestion = (selectedText: string) => {
    setSearchQuery(selectedText);
    setShowSuggestions(false);

    const matchingProducts = PORTFOLIO_PRODUCTS.filter((p) => matchesProduct(p, selectedText));
    if (matchingProducts.length > 0) {
      const matchesCurrentFilters = matchingProducts.some(
        (p) => (segment === 'All' || p.segment === segment) && (therapy === 'All' || p.therapy === therapy)
      );
      if (!matchesCurrentFilters) {
        setSegment('All');
        setTherapy('All');
      }
    }
  };

  const suggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    const matches: { text: string; category: string }[] = [];
    const seen = new Set<string>();

    PORTFOLIO_PRODUCTS.forEach((p) => {
      if (matchesSearchQuery(p.name, q)) {
        if (!seen.has(p.name.toLowerCase())) {
          seen.add(p.name.toLowerCase());
          matches.push({ text: p.name, category: 'Product' });
        }
      }
    });

    PORTFOLIO_PRODUCTS.forEach((p) => {
      if (p.therapy && matchesSearchQuery(p.therapy, q)) {
        if (!seen.has(p.therapy.toLowerCase())) {
          seen.add(p.therapy.toLowerCase());
          matches.push({ text: p.therapy, category: 'Therapy' });
        }
      }
    });

    PORTFOLIO_PRODUCTS.forEach((p) => {
      if (p.grade && matchesSearchQuery(p.grade, q)) {
        if (!seen.has(p.grade.toLowerCase())) {
          seen.add(p.grade.toLowerCase());
          matches.push({ text: p.grade, category: 'Grade' });
        }
      }
    });

    PORTFOLIO_PRODUCTS.forEach((p) => {
      if (p.brand && matchesSearchQuery(p.brand, q)) {
        if (!seen.has(p.brand.toLowerCase())) {
          seen.add(p.brand.toLowerCase());
          matches.push({ text: p.brand, category: 'Brand' });
        }
      }
    });

    return matches.slice(0, 8);
  }, [searchQuery]);

  const filteredPortfolio = useMemo(() => {
    const q = searchQuery.trim();
    return PORTFOLIO_PRODUCTS.filter((product) => {
      const segmentMatch = segment === 'All' || product.segment === segment;
      const therapyMatch = therapy === 'All' || product.therapy === therapy;
      const queryMatch = !q || matchesProduct(product, q);
      return segmentMatch && therapyMatch && queryMatch;
    });
  }, [segment, therapy, searchQuery]);

  useEffect(() => {
    const tableEl = tableWrapRef.current;
    if (!tableEl) return;

    const handleTableScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = tableEl;
      if (scrollTop + clientHeight >= scrollHeight - 80) {
        setVisibleCount((prev) => (prev < filteredPortfolio.length ? Math.min(prev + 10, filteredPortfolio.length) : prev));
      }
    };

    tableEl.addEventListener('scroll', handleTableScroll, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (sentinelRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) => (prev < filteredPortfolio.length ? Math.min(prev + 10, filteredPortfolio.length) : prev));
          }
        },
        { rootMargin: '300px' }
      );
      observer.observe(sentinelRef.current);
    }

    return () => {
      tableEl.removeEventListener('scroll', handleTableScroll);
      if (observer) observer.disconnect();
    };
  }, [filteredPortfolio.length]);

  const visibleProducts = useMemo(
    () => filteredPortfolio.slice(0, visibleCount),
    [filteredPortfolio, visibleCount],
  );

  const useSectionSrNo = segment !== 'All' && therapy === 'All';
  const showConcentration = segment !== 'API' || filteredPortfolio.some((product) => product.concentration);
  const showBrand = filteredPortfolio.some((product) => product.brand);
  const showGrade = filteredPortfolio.some((product) => product.grade);

  return (
    <div className="cp gen-page pp-page">
      <NavBar />

      <section className="cp-hero">
        <p className="cp-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <Link to="/business/generics">BUSINESS</Link>
          <span className="sep">›</span>
          <span className="current">GENERICS</span>
        </p>

        <h1 className="cp-page-title">
          Generics
        </h1>

        <div className="cp-hero-panel">
          <img
            src="/assets/hero-1.webp"
            alt="Granules Generics Manufacturing"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div className="gen-hero-scrim" />
          <div className="gen-hero-overlay">
            <h2 className="gen-hero-heading">Science, Scale and Integrated Excellence</h2>
          </div>
          <div className="cp-scroll-indicator">
            <img src={asset('scroll-down-icon.webp')} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <div
        ref={introRef}
        className={`cp-about-desc${isIntroScrolled ? ' is-scrolled' : ''}`}
      >
        <p>
          <span className="part-1">
            Granules India offers a diverse and continually evolving portfolio to the global
            pharmaceutical market, spanning Active Pharmaceutical Ingredients (APIs), Pharmaceutical
            Formulation Intermediates (PFIs)and Finished Dosages (FDs).
          </span>{' '}
          <span className="part-2">
            Guided by science and a clear focus on advancing high-value, specialised therapies, our
            teams are committed to delivering safe, effective and affordable medicines that meet the
            expectations of partners and patients across geographies.
          </span>
        </p>
        <p className="part-2">
          Our portfolio strategy encompasses our core strength of scale, while expanding into complex
          generics, controlled substances, oncology therapies, CNS/ADHD treatments, peptides and
          advanced drug delivery systems. Supported by a global manufacturing and R&amp;D network,
          Granules continues to strengthen its position as a trusted partner to customers worldwide.
        </p>
      </div>
      <div className="cp-divider" />

      <section className="gen-verticals-wrap" id="three-verticals" aria-label="Core Generic Verticals">
        <div className="biz-section-head gen-section-head">
          <div className="copy">
            <span className="cp-section-badge">Core Verticals</span>
            <h2>Integrated Across the Value Chain</h2>
            <h4>
              From pure API molecules to ready-to-compress PFIs and finished patient-ready dosages.
            </h4>
          </div>
        </div>

        <div className="product-grid gen-product-grid">
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
                  <div className="product-img-wrap">
                    <img
                      src={`/assets/${product.image}`}
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

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
                        <span>{product.cta}</span>
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

      <section className="gen-portfolio-section" aria-label="Our Portfolio">
        <div className="biz-section-head pp-section-head">
          <div className="copy">
            <span className="cp-section-badge">Our Portfolio</span>
            <h2>{TABLE_TITLES[segment]}</h2>
          </div>
        </div>

        <div className="pp-filters">
          <label className="pp-select" style={{ position: 'relative' }}>
            <span>Search Product</span>
            <div className="pp-search-box" ref={searchRef}>
              <svg className="pp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, therapy, grade..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="pp-search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="pp-suggestions">
                  {suggestions.map((item) => (
                    <li
                      key={`${item.category}-${item.text}`}
                      className="pp-suggestion-item"
                      onMouseDown={() => {
                        handleSelectSuggestion(item.text);
                      }}
                    >
                      <span>{item.text}</span>
                      <span className="pp-suggestion-type">{item.category}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </label>

          <label className="pp-select">
            <span>Segment</span>
            <select value={segment} onChange={(e) => setSegment(e.target.value as Segment)}>
              {SEGMENTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="pp-select">
            <span>Therapeutic category</span>
            <select value={therapy} onChange={(e) => setTherapy(e.target.value)}>
              {therapies.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredPortfolio.length > 0 ? (
          <>
            <div className="pp-table-wrap" ref={tableWrapRef}>
              <table className="pp-table">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Product</th>
                    <th scope="col">Segment</th>
                    {showConcentration && <th scope="col">Concentration / Strength</th>}
                    <th scope="col">Therapeutic Category</th>
                    {showGrade && <th scope="col">Pharmacopeia Grade / Rx-OTC</th>}
                    {showBrand && <th scope="col">Brand / Reference Listed Drug</th>}
                    <th scope="col">Regulatory Filings</th>
                    <th scope="col">Integration</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProducts.map((product, index) => (
                    <tr key={`${product.segment}-${product.name}-${product.srNo}-${index}`}>
                      <td className="pp-sr-no">
                        {useSectionSrNo ? product.srNo : index + 1}
                      </td>
                      <td className="pp-product">{product.name}</td>
                      <td>{product.segment || '—'}</td>
                      {showConcentration && <td>{formatConcentration(product.concentration)}</td>}
                      <td>{product.therapy || '—'}</td>
                      {showGrade && <td>{product.grade || '—'}</td>}
                      {showBrand && <td>{product.brand || '—'}</td>}
                      <td>
                        <div className="pp-filings">
                          {product.filings.map((code) => (
                            <FilingIcon key={code} code={code} />
                          ))}
                        </div>
                      </td>
                      <td>
                        <IntegrationMark type={product.integration} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pp-legend" aria-label="Table legend">
              <div className="pp-legend-group">
                {LEGEND_FILINGS.map((code) => (
                  <span key={code} className="pp-legend-item">
                    <FilingIcon code={code} />
                    <span>{FILING_LABELS[code]}</span>
                  </span>
                ))}
              </div>
              <div className="pp-legend-group">
                <span className="pp-legend-item">
                  <span className="pp-integ" aria-hidden="true"><ArrowLeft /></span>
                  <span>Backward Integration</span>
                </span>
                <span className="pp-legend-item">
                  <span className="pp-integ" aria-hidden="true"><ArrowRight /></span>
                  <span>Forward Integration</span>
                </span>
              </div>
            </div>

            <p className="pp-disclaimer">
              All products available for Global Offering | Products listed herein may not be available
              for commercial use in countries where any relevant third-party intellectual property is in
              force. All third party trade marks belong to the respective owners and have been used here
              for illustrative purposes only.
            </p>

          </>
        ) : (
          <div className="pp-empty-wrap">
            <p className="pp-empty">No products match your search or filter combination.</p>
            <button
              type="button"
              className="pp-clear-btn"
              onClick={() => {
                setSearchQuery('');
                setSegment('All');
                setTherapy('All');
              }}
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}
      </section>

      <div className="biz-cta biz-cta--placeholder gen-cta">
        <div className="biz-cta-copy">
          <h2>Ready to Partner?</h2>
          <p>
            Leverage our end-to-end scale, global regulatory compliance, and formulation science to bring high-quality medicines to market faster.
          </p>
        </div>
        <Link to="/contact" className="cp-cta-btn">Connect With Us</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import CustomSelect from '../components/common/CustomSelect';
import { COMPLEX_MOLECULE_PRODUCTS, matchesSearchQuery } from '../data/complexMoleculesData';
import '../components/company/company.css';
import './business.css';
import './product-portfolio.css';

const A = '/assets/api/';

const THERAPEUTIC_AREAS = [
  { label: 'Anti-diabetics', icon: 'icon-anti-diabetics.svg' },
  { label: 'Anti-inflammatories', icon: 'icon-anti-inflammatories.svg' },
  { label: 'CNS/ADHD', icon: 'icon-cns.svg' },
  { label: 'Oncology', icon: 'icon-oncology.svg' },
  // No dedicated Gastroenterology icon is available. Reusing a freed-up icon from a
  // different therapeutic area (anti-infectives/analgesics/anti-retrovirals) risked
  // implying the wrong therapeutic meaning, so a neutral, non-therapeutic icon is used instead.
  { label: 'Gastroenterology', icon: 'icon-manufacturing.svg' },
  { label: 'Anti-histamines', icon: 'icon-anti-histamines.svg' },
  { label: 'Anti-coagulants', icon: 'icon-anti-coagulants.svg' },
  { label: 'Anti-hypertensives', icon: 'icon-anti-hypertensives.svg' },
];

type ScaleItem = { title: string; body: string; icon: string; image?: string | null };

const SCALE_ITEMS: ScaleItem[] = [
  {
    title: 'Portfolio Breadth Across Wide Therapeutic Segments',
    body: '100+ DMFs spanning anti-diabetics, anti-inflammatories, CNS/ADHD, oncology, gastroenterology, anti-histamines, anti-coagulants, anti-hypertensives and more.',
    icon: 'icon-globe.svg',
    image: '/assets/facilities/bonthapally-2.png',
  },
  {
    title: 'Manufacturing Infrastructure Supporting Global Scale',
    body: '40,000 TPA capacity across four specialised facilities — vertically integrated from key starting materials and intermediates through to PFIs and finished dosages, for secure supply and competitive cost.',
    icon: 'icon-capacity.svg',
    image: '/assets/api/2.jpg',
  },
  {
    title: 'Quality, Compliance & Global Regulatory Reach',
    body: 'Global regulatory approvals enabling supply to 80+ countries — backed by Quality by Design (QbD), closed-loop operations, robust GMP and data integrity systems, and a deeply embedded safety culture.',
    icon: 'icon-globe.svg',
    image: '/assets/api/8.jpg',
  },
  {
    title: 'Innovation-led, Technology-Driven, Sustainability-Focused',
    body: 'Green Chemistry and sustainable innovation embedded into API R&D and manufacturing to improve yields, reduce waste, and enhance operational efficiency.',
    icon: 'icon-manufacturing.svg',
    image: '/assets/api/5.png',
  },
];

export default function ApiPage() {
  const [open, setOpen] = useState(0);
  const [therapy, setTherapy] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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
    COMPLEX_MOLECULE_PRODUCTS.forEach((p) => {
      if (p.therapy) options.add(p.therapy);
    });
    return ['All', ...Array.from(options).sort((a, b) => a.localeCompare(b))];
  }, []);

  const suggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    const matches: { text: string; category: string }[] = [];
    const seen = new Set<string>();

    COMPLEX_MOLECULE_PRODUCTS.forEach((p) => {
      if (matchesSearchQuery(p.product, q)) {
        if (!seen.has(p.product.toLowerCase())) {
          seen.add(p.product.toLowerCase());
          matches.push({ text: p.product, category: 'Product' });
        }
      }
    });

    COMPLEX_MOLECULE_PRODUCTS.forEach((p) => {
      if (p.therapy && matchesSearchQuery(p.therapy, q)) {
        if (!seen.has(p.therapy.toLowerCase())) {
          seen.add(p.therapy.toLowerCase());
          matches.push({ text: p.therapy, category: 'Therapy' });
        }
      }
    });

    return matches.slice(0, 8);
  }, [searchQuery]);

  const handleSelectSuggestion = (selectedText: string) => {
    setSearchQuery(selectedText);
    setShowSuggestions(false);
  };

  const filtered = useMemo(() => {
    const q = searchQuery.trim();
    return COMPLEX_MOLECULE_PRODUCTS.filter((p) => {
      const therapyMatch = therapy === 'All' || p.therapy === therapy;
      const queryMatch =
        !q ||
        matchesSearchQuery(p.product, q) ||
        matchesSearchQuery(p.therapy, q) ||
        matchesSearchQuery(p.status, q);
      return therapyMatch && queryMatch;
    });
  }, [therapy, searchQuery]);

  useEffect(() => {
    document.title = 'High-Volume & Niche API Manufacturer | Sustainable, Scalable APIs | Granules India';

    const descriptionContent =
      'Scalable API manufacturing for Paracetamol, Metformin, Guaifenesin & more. Backward integrated, sustainable, and trusted by global pharma leaders across 80+ countries.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const nav = document.querySelector('.cp-nav-wrap');
          const navHeight = nav ? nav.getBoundingClientRect().height : 80;
          const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 20;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const activeImage = (open >= 0 && SCALE_ITEMS[open]?.image) ? SCALE_ITEMS[open].image : SCALE_ITEMS[0]?.image;

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(85%, 1632px)', maxWidth: '1632px', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <span className="cp-breadcrumb-plain">BUSINESS</span>
        <span className="sep">›</span>
        <Link to="/business/generics">GENERICS</Link>
        <span className="sep">›</span>
        <span className="current">ACTIVE PHARMACEUTICAL INGREDIENTS</span>
      </p>
      <h1 className="api-page-header">Active Pharmaceutical Ingredients</h1>
      <div className="cp-hero-banner">
        <img src={`${A}hero-banner.png`} alt="Granules API manufacturing facility" />
        <div className="api-hero-scrim" />
        <div className="api-hero-overlay">
          <div className="api-hero-overlay-content">
            <h2 className="api-hero-heading api-hero-overlay-title">Engineered for Precision. Committed to Global Compliance.</h2>
          </div>
        </div>
      </div>

      <div className="biz-intro">
        <p>
          For over four decades, Granules has been a trusted global API manufacturer — combining scale with a growing pipeline of complex, high-barrier APIs. Deep process chemistry, modern manufacturing scale, digital quality systems and disciplined regulatory execution power an integrated platform that serves both our own formulations and customers across regulated and semi-regulated markets.
        </p>
      </div>

      <div className="biz-panel">
        {activeImage && <img className="bg" src={activeImage} alt="" />}
        <div className="overlay" />
        <div className="biz-panel-grid">
          <div className="biz-accordion">
            {SCALE_ITEMS.map((item, index) => {
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
                        <img src={`${A}${item.icon}`} alt="" />
                      </span>
                      <p className="biz-accordion-title">{item.title}</p>
                    </div>
                    <span className="biz-accordion-toggle">
                      <img src={`${A}${isOpen ? 'icon-minus.svg' : 'icon-plus.svg'}`} alt={isOpen ? 'Collapse' : 'Expand'} />
                    </span>
                  </div>
                  {isOpen && item.body && <p className="biz-accordion-body">{item.body}</p>}
                </button>
              );
            })}
          </div>
        </div>
      </div>


      <div id="complex-molecules" className="biz-section-head pp-section-head" style={{ marginTop: '75px', scrollMarginTop: '100px' }}>
        <div className="copy" style={{ width: '100%', maxWidth: '100%' }}>
          <h2 id="high-barrier-complex-molecules" className="complex-molecules-header">High-Barrier Complex Molecules Portfolio</h2>
          <span className="complex-molecules-span" style={{ display: 'block', color: 'var(--n7)', fontSize: 'clamp(17px, 1.25vw, 20px)', lineHeight: '1.5', marginTop: '8px', width: '100%', maxWidth: '100%' }}>
            Growing pipeline of high-barrier, complex molecules in oncology, CNS/ADHD, and cardiovascular therapeutics with active USDMF filings.
          </span>
        </div>
      </div>

      <div className="pp-filters" style={{ gridTemplateColumns: '1.3fr 1fr 1fr' }}>
        <label className="pp-select" style={{ position: 'relative' }}>
          <span>Search Product / Molecule</span>
          <div className="pp-search-box" ref={searchRef}>
            <svg
              className="pp-search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by product, therapy..."
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
                    onMouseDown={() => handleSelectSuggestion(item.text)}
                  >
                    <span>{item.text}</span>
                    <span className="pp-suggestion-type">{item.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>

        <div className="pp-select">
          <span className="pp-select-label">Therapeutic category</span>
          <CustomSelect
            value={therapy}
            options={therapies}
            onChange={(val) => setTherapy(val)}
            ariaLabel="Select Therapeutic category"
          />
        </div>

        <div className="pp-select">
          <span className="pp-select-label">Reach Us</span>
          <a
            href="mailto:sales@granulesindia.com"
            className="pp-reach-btn"
            title="Email sales@granulesindia.com"
            aria-label="Reach us via email at sales@granulesindia.com"
          >
            <svg
              className="pp-reach-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="pp-reach-email">sales@granulesindia.com</span>
          </a>
        </div>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="pp-table-wrap" style={{ maxHeight: 'none' }}>
            <table className="pp-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '90px', textAlign: 'center' }}>
                    Sr. No
                  </th>
                  <th scope="col">Product</th>
                  <th scope="col">Therapeutic Category</th>
                  <th scope="col" style={{ width: '220px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={`${item.srNo}-${item.product}`}>
                    <td className="pp-sr-no">{item.srNo}</td>
                    <td className="pp-product" style={{ fontWeight: 600 }}>{item.product}</td>
                    <td>{item.therapy}</td>
                    <td>
                      <span className="pp-status-pill">
                        <span className="pp-status-dot" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              setTherapy('All');
            }}
          >
            Reset Search &amp; Filters
          </button>
        </div>
      )}

      <div className="biz-cta biz-cta--placeholder">
        <div className="biz-cta-copy">
          <h2>Let&rsquo;s Build Long-Term, Scalable API Partnerships</h2>
          <p>
            Explore our full API portfolio and discover how Granules can be your strategic
            manufacturing partner for quality, scale, and sustainability.
          </p>
        </div>
        <Link
          className="cp-cta-btn"
          to="/business/generics?segment=API#our-portfolio"
          state={{ segment: 'API' }}
        >
          VIEW OUR API PORTFOLIO
        </Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

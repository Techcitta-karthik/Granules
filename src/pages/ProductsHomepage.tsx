import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import CustomSelect from '../components/common/CustomSelect';
import '../components/company/company.css';
import './business.css';
import './product-portfolio.css';

interface PipelineProduct {
  srNo: number;
  product: string;
  therapy: string;
  status: string;
}

const PRODUCTS: PipelineProduct[] = [
  { srNo: 1, product: 'Abemaciclib', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 2, product: 'Avatrombopag Maleate', therapy: 'CVS', status: 'USDMF Filed' },
  { srNo: 3, product: 'Calcium Oxybate', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 4, product: 'Magnesium Oxybate', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 5, product: 'Potassium Oxybate', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 6, product: 'Sodium Oxybate', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 7, product: 'Elacestrant Di HCl', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 8, product: 'Fruquintinib', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 9, product: 'Lisdexamfetamine', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 10, product: 'Ruxolitinib HCl', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 11, product: 'Ruxolitinib Phosphate', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 12, product: 'Serdexmethylphenidate', therapy: 'Oncology', status: 'USDMF Filed' },
];

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

export default function ProductsHomepage() {
  const [therapy, setTherapy] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Complex Molecules Pipeline | Granules India';
    window.scrollTo(0, 0);
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
    PRODUCTS.forEach((p) => {
      if (p.therapy) options.add(p.therapy);
    });
    return ['All', ...Array.from(options).sort((a, b) => a.localeCompare(b))];
  }, []);

  const suggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    const matches: { text: string; category: string }[] = [];
    const seen = new Set<string>();

    PRODUCTS.forEach((p) => {
      if (matchesSearchQuery(p.product, q)) {
        if (!seen.has(p.product.toLowerCase())) {
          seen.add(p.product.toLowerCase());
          matches.push({ text: p.product, category: 'Product' });
        }
      }
    });

    PRODUCTS.forEach((p) => {
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
    return PRODUCTS.filter((p) => {
      const therapyMatch = therapy === 'All' || p.therapy === therapy;
      const queryMatch =
        !q ||
        matchesSearchQuery(p.product, q) ||
        matchesSearchQuery(p.therapy, q) ||
        matchesSearchQuery(p.status, q);
      return therapyMatch && queryMatch;
    });
  }, [therapy, searchQuery]);

  return (
    <div className="cp pp-page">
      <NavBar />

      <section className="cp-hero">
        <p className="cp-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <span className="cp-breadcrumb-plain">BUSINESS</span>
          <span className="sep">›</span>
          <Link to="/business/generics">GENERICS</Link>
          <span className="sep">›</span>
          <span className="current">COMPLEX MOLECULES</span>
        </p>
        <h1 className="cp-page-title">Our Products</h1>
      </section>

      <div className="cp-about-desc pp-intro scroll-intro">
        <p className="complex-molecules-span" style={{ width: '100%', maxWidth: '100%' }}>
          Growing Pipeline of High-barrier, Complex Molecules in Oncology, CNS/ADHD, and Cardiovascular Therapeutics with active USDMF filings.
        </p>
        <p className="part-2">
          Filter by therapeutic category or search by product name to explore our pipeline.
        </p>
      </div>
      <div className="cp-divider" />

      <div className="biz-section-head pp-section-head">
        <div className="copy">
          <span className="cp-section-badge">Pipeline &amp; Filings</span>
          <h2>Complex Molecules Portfolio</h2>
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
                    Sr. no
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

      <div className="biz-cta biz-cta--placeholder pp-cta">
        <div className="biz-cta-copy">
          <h2>Looking for a specific molecule?</h2>
          <p>Speak with the commercial team about supply and regulatory filings.</p>
        </div>
        <Link className="cp-cta-btn" to="/contact">
          CONTACT US
        </Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

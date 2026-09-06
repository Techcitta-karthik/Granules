import React, { useEffect, useState, useMemo, Fragment } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './esg-profile.css';
import { COMPLETE_ESG_DATA, ESG_FACTORS_ORDER, EsgSubfactorItem } from '../data/esgData';

const ESG_DASHBOARD_URL =
  'https://esg.churchgatepartners.com/login/companyprofile?id=3100350036003500240024004100530048004F004B0041004E0041004E00590041004100560041004E004900410053004800570049004E00490024002400';

export default function EsgProfilePage() {
  const [selectedFactor, setSelectedFactor] = useState('ALL');
  const [selectedKeyword, setSelectedKeyword] = useState('ALL');
  const [selectedAssetManager, setSelectedAssetManager] = useState('ALL');
  const [selectedFramework, setSelectedFramework] = useState('ALL');
  const [selectedRating, setSelectedRating] = useState('ALL');
  const [selectedBrsr, setSelectedBrsr] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Toggles
  const [showProfile, setShowProfile] = useState(true);
  const [showDocuLink, setShowDocuLink] = useState(false);
  const [showFactsheet, setShowFactsheet] = useState(false);

  const [activeModalItem, setActiveModalItem] = useState<EsgSubfactorItem | null>(null);

  useEffect(() => {
    document.title = 'ESG Profile | Granules India Sustainability';
    window.scrollTo(0, 0);
  }, []);

  // Filter options extraction with ordered factors
  const factorOptions = useMemo(() => {
    const presentFactors = new Set(COMPLETE_ESG_DATA.map((s) => s.factor));
    const ordered = ESG_FACTORS_ORDER.filter((f) => presentFactors.has(f));
    const remaining = Array.from(presentFactors).filter((f) => !ESG_FACTORS_ORDER.includes(f));
    return ['ALL', ...ordered, ...remaining];
  }, []);

  const keywordOptions = useMemo(() => {
    const set = new Set(COMPLETE_ESG_DATA.flatMap((s) => s.keywords).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, []);

  const assetManagerOptions = useMemo(() => {
    const set = new Set(COMPLETE_ESG_DATA.map((s) => s.assetManager).filter(Boolean) as string[]);
    return ['ALL', ...Array.from(set)];
  }, []);

  const frameworkOptions = useMemo(() => {
    const set = new Set(COMPLETE_ESG_DATA.flatMap((s) => s.frameworks || []).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, []);

  const ratingOptions = useMemo(() => {
    const set = new Set(COMPLETE_ESG_DATA.flatMap((s) => s.ratings || []).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, []);

  const brsrOptions = useMemo(() => {
    const set = new Set(
      COMPLETE_ESG_DATA.map((s) => s.brsrPrinciple).filter(Boolean) as string[]
    );
    return ['ALL', ...Array.from(set)];
  }, []);

  const yearOptions = useMemo(() => {
    const set = new Set(COMPLETE_ESG_DATA.map((s) => s.year || '2026'));
    return ['ALL', ...Array.from(set)];
  }, []);

  // Filtered dataset
  const filteredSubfactors = useMemo(() => {
    return COMPLETE_ESG_DATA.filter((item) => {
      const matchesFactor = selectedFactor === 'ALL' || item.factor === selectedFactor;
      const matchesKeyword = selectedKeyword === 'ALL' || item.keywords.includes(selectedKeyword);
      const matchesAssetManager = selectedAssetManager === 'ALL' || item.assetManager === selectedAssetManager;
      const matchesFramework = selectedFramework === 'ALL' || (item.frameworks && item.frameworks.includes(selectedFramework));
      const matchesRating = selectedRating === 'ALL' || (item.ratings && item.ratings.includes(selectedRating));
      const matchesBrsr = selectedBrsr === 'ALL' || item.brsrPrinciple === selectedBrsr;
      const matchesYear = selectedYear === 'ALL' || item.year === selectedYear;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.subfactor.toLowerCase().includes(q) ||
        item.highlights.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q));

      return (
        matchesFactor &&
        matchesKeyword &&
        matchesAssetManager &&
        matchesFramework &&
        matchesRating &&
        matchesBrsr &&
        matchesYear &&
        matchesSearch
      );
    });
  }, [
    selectedFactor,
    selectedKeyword,
    selectedAssetManager,
    selectedFramework,
    selectedRating,
    selectedBrsr,
    selectedYear,
    searchQuery,
  ]);

  // Group filtered results by Factor category preserving reference order
  const groupedSubfactors = useMemo(() => {
    const groups: { [key: string]: EsgSubfactorItem[] } = {};
    for (const factor of ESG_FACTORS_ORDER) {
      const list = filteredSubfactors.filter((item) => item.factor === factor);
      if (list.length > 0) {
        groups[factor] = list;
      }
    }
    // Also include any factors not in the pre-defined order
    for (const item of filteredSubfactors) {
      if (!groups[item.factor]) {
        const list = filteredSubfactors.filter((s) => s.factor === item.factor);
        if (list.length > 0) {
          groups[item.factor] = list;
        }
      }
    }
    return groups;
  }, [filteredSubfactors]);

  return (
    <div className="cp">
      <NavBar />

      {/* Breadcrumb Navigation */}
      <p
        className="cp-breadcrumb"
        style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}
      >
        <a href="/">HOMEPAGE</a>
        <span className="sep">›</span>
        <a href="/sustainability">SUSTAINABILITY</a>
        <span className="sep">›</span>
        <span className="current">ESG PROFILE</span>
      </p>

      {/* Botanical Stock Hero Banner */}
      <div className="esg-hero-photo">
        <img
          className="bg"
          src="/assets/esg/esg-banner.jpg"
          alt="Granules Sustainable Operations and ESG Stewardship"
          loading="eager"
          decoding="async"
        />
        <div className="overlay" />
        <div className="esg-hero-content">
          <span className="esg-hero-tag">SUSTAINABILITY DISCLOSURES</span>
          <h1 className="esg-hero-heading">ESG Profile</h1>
        </div>
      </div>

      <div className="esg-prof-container">
        {/* Two-Tone Intro Narrative */}
        <div className="esg-intro-wrap">
          <p className="esg-intro-text">
            <strong>Healing lives responsibly</strong>{' '}
            <span>
              through verified disclosures, science-based decarbonization pathways,
              and accountable corporate governance metrics.
            </span>
          </p>
        </div>

        {/* =========================================================================
            TOP FILTER OPTIONS (7 Solid Royal Blue Dropdowns)
            ========================================================================= */}
        <div className="esg-top-filter-container">
          <div className="esg-top-filter-grid">
            {/* 1. All Factors */}
            <div className="esg-select-pill-wrap">
              <select
                className="esg-select-pill"
                value={selectedFactor}
                onChange={(e) => setSelectedFactor(e.target.value)}
                aria-label="Filter by Factor"
              >
                <option value="ALL">All Factors</option>
                {factorOptions
                  .filter((f) => f !== 'ALL')
                  .map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
              </select>
              <svg className="esg-select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* 2. All Keywords */}
            <div className="esg-select-pill-wrap">
              <select
                className="esg-select-pill"
                value={selectedKeyword}
                onChange={(e) => setSelectedKeyword(e.target.value)}
                aria-label="Filter by Keyword"
              >
                <option value="ALL">All Keywords</option>
                {keywordOptions
                  .filter((k) => k !== 'ALL')
                  .map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
              </select>
              <svg className="esg-select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* 3. Asset Manager */}
            <div className="esg-select-pill-wrap">
              <select
                className="esg-select-pill"
                value={selectedAssetManager}
                onChange={(e) => setSelectedAssetManager(e.target.value)}
                aria-label="Filter by Asset Manager"
              >
                <option value="ALL">Asset Manager</option>
                {assetManagerOptions
                  .filter((a) => a !== 'ALL')
                  .map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
              </select>
              <svg className="esg-select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* 4. Global Frameworks */}
            <div className="esg-select-pill-wrap">
              <select
                className="esg-select-pill"
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                aria-label="Filter by Global Framework"
              >
                <option value="ALL">Global Frameworks</option>
                {frameworkOptions
                  .filter((f) => f !== 'ALL')
                  .map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
              </select>
              <svg className="esg-select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* 5. ESG Ratings */}
            <div className="esg-select-pill-wrap">
              <select
                className="esg-select-pill"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                aria-label="Filter by ESG Rating"
              >
                <option value="ALL">ESG Ratings</option>
                {ratingOptions
                  .filter((r) => r !== 'ALL')
                  .map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
              <svg className="esg-select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* 6. BRSR */}
            <div className="esg-select-pill-wrap">
              <select
                className="esg-select-pill"
                value={selectedBrsr}
                onChange={(e) => setSelectedBrsr(e.target.value)}
                aria-label="Filter by BRSR Principle"
              >
                <option value="ALL">BRSR</option>
                {brsrOptions
                  .filter((b) => b !== 'ALL')
                  .map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
              </select>
              <svg className="esg-select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* 7. TimeStamp */}
            <div className="esg-select-pill-wrap">
              <select
                className="esg-select-pill"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filter by TimeStamp"
              >
                <option value="ALL">TimeStamp</option>
                {yearOptions
                  .filter((y) => y !== 'ALL')
                  .map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
              </select>
              <svg className="esg-select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Gradient Accent Indicator Line */}
        <div className="esg-gradient-accent" />

        {/* Toolbar & Meta Row: Updated/Views + Toggles + Downloads */}
        <div className="esg-toolbar-row">
          <div className="esg-toolbar-left">
            <span className="esg-toolbar-stat">
              <strong>Updated:</strong> 04 Sep 2026
            </span>
            <span className="esg-toolbar-stat">
              <strong>Views:</strong> 3,374
            </span>
          </div>

          <div className="esg-toolbar-center">
            {/* Last 30 Day's Refresh */}
            <div className="esg-refresh-stat">
              <span className="esg-refresh-indicator" />
              <span className="esg-refresh-text">
                Last 30 Day's Refresh
                <small>603 Subfactor Updates</small>
              </span>
            </div>

            {/* Toggle Switches */}
            <div className="esg-toggle-group">
              <div
                className="esg-toggle-item"
                onClick={() => setShowProfile((prev) => !prev)}
                role="button"
                tabIndex={0}
              >
                <span className={`esg-toggle-switch ${showProfile ? 'active' : ''}`} />
                <span className="esg-toggle-label">Profile</span>
              </div>

              <div
                className="esg-toggle-item"
                onClick={() => setShowDocuLink((prev) => !prev)}
                role="button"
                tabIndex={0}
              >
                <span className={`esg-toggle-switch ${showDocuLink ? 'active' : ''}`} />
                <span className="esg-toggle-label">DocuLink</span>
              </div>

              <div
                className="esg-toggle-item"
                onClick={() => setShowFactsheet((prev) => !prev)}
                role="button"
                tabIndex={0}
              >
                <span className={`esg-toggle-switch ${showFactsheet ? 'active' : ''}`} />
                <span className="esg-toggle-label">Factsheet</span>
              </div>
            </div>
          </div>

          <div className="esg-toolbar-right">
            {/* Excel Download Icon */}
            <a
              href="/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="esg-file-btn excel"
              title="Download Excel / Factsheet Data"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1.5 14h-1.8l-1.7-2.7-1.7 2.7H8.5l2.6-4-2.4-3.6h1.8l1.5 2.4 1.5-2.4h1.8L12.9 12l2.6 4zm-2.5-8V3.5L18.5 8H13z" />
              </svg>
            </a>

            {/* PDF Download Icon */}
            <a
              href="/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="esg-file-btn pdf"
              title="Download PDF ESG Profile Dossier"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-1v-2h1c.55 0 1 .45 1 1s-.45 1-1 1zm4.5 1h-1.5v-4H14c.83 0 1.5.67 1.5 1.5v1c0 .83-.67 1.5-1.5 1.5zm4-2.5h-1.5V11H18v1.5h-1.5V14H15V7.5h3v1.5h-1.5v1H18V10z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Results Counter & Search Bar */}
        <div className="esg-results-meta-row">
          <div className="esg-showing-count">
            Showing <span className="esg-count-num">{filteredSubfactors.length}</span> subfactors
          </div>

          <div className="esg-search-unit">
            <span className="esg-search-prefix">Search :</span>
            <input
              type="text"
              className="esg-search-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter metrics..."
              aria-label="Search ESG subfactors"
            />
          </div>
        </div>

        {/* Structured Data Table with Category Header Rows */}
        <div className="esg-table-container">
          <table className="esg-custom-table" aria-label="Granules ESG Subfactors Table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '18%' }}>Subfactor</th>
                <th scope="col" style={{ width: '16%' }}>Keywords</th>
                <th scope="col" style={{ width: '8%', textAlign: 'center' }}>DocuLinks</th>
                <th scope="col" className="sortable" style={{ width: '10%' }}>
                  <span>Factsheet &#8693;</span>
                </th>
                <th scope="col" style={{ width: '48%' }}>Highlights & Disclosures</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedSubfactors).length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                    No matching ESG subfactors found for the selected filter criteria.
                  </td>
                </tr>
              ) : (
                Object.entries(groupedSubfactors).map(([factorName, items]) => (
                  <Fragment key={factorName}>
                    {/* Category Banner Row */}
                    <tr className="esg-cat-banner-row">
                      <td colSpan={5}>{factorName}</td>
                    </tr>

                    {/* Subfactor Rows under this category */}
                    {items.map((item) => (
                      <tr className="esg-data-row" key={item.id}>
                        {/* Subfactor */}
                        <td
                          className="esg-col-subfactor"
                          onClick={() => setActiveModalItem(item)}
                          title="Click to view details"
                        >
                          {item.subfactor}
                        </td>

                        {/* Keywords (Vertical List) */}
                        <td className="esg-col-keywords">
                          <div className="esg-kw-list">
                            {item.keywords.map((kw) => (
                              <div className="esg-kw-line" key={kw}>
                                {kw}
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* DocuLinks */}
                        <td className="esg-col-doculinks">
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                            {item.docLinks.map((doc, idx) => {
                              if (doc.type === 'web') {
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    className="esg-pdf-trigger"
                                    onClick={() => setActiveModalItem(item)}
                                    title={`Web Link: ${doc.name}`}
                                    aria-label={`Open link: ${doc.name}`}
                                  >
                                    <svg width="20" height="20" viewBox="0 0 48 48">
                                      <circle cx="24" cy="24" r="10" fill="#ffffff" />
                                      <circle cx="24" cy="24" r="8" fill="#1a73e8" />
                                      <path fill="#ea4335" d="M24 4c5.8 0 11 2.5 14.6 6.5l-9.1 15.8C28.2 24.8 26.2 24 24 24H9.4C10.7 12.6 24 4 24 4z" />
                                      <path fill="#34a853" d="M38.6 10.5C41.9 14.3 44 19.4 44 25c0 10.4-8 19-18.2 20l9.1-15.8c1.3-2.3 2.1-4.9 2.1-7.7 0-3.9-1.5-7.5-3.8-10.3l5.4-10.7z" />
                                      <path fill="#fbbc05" d="M25.8 45C14.7 45 5.5 36.6 4.2 25.8l9.1 5.2c1.7 4.1 5.3 7 9.7 7.7L25.8 45z" />
                                      <path fill="#4285f4" d="M9.4 24H4.2C4.1 24.3 4 24.7 4 25c0 5.4 2.1 10.3 5.5 14l9.1-15.8c-.8-1.5-1.2-3.3-1.2-5.2 0-2.8.9-5.4 2.4-7.5L9.4 24z" />
                                    </svg>
                                  </button>
                                );
                              }
                              if (doc.type === 'linkedin') {
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    className="esg-pdf-trigger"
                                    onClick={() => setActiveModalItem(item)}
                                    title={`LinkedIn: ${doc.name}`}
                                    aria-label={`Open LinkedIn: ${doc.name}`}
                                  >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2">
                                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                    </svg>
                                  </button>
                                );
                              }
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  className="esg-pdf-trigger"
                                  onClick={() => setActiveModalItem(item)}
                                  title={`PDF: ${doc.name}`}
                                  aria-label={`Open PDF: ${doc.name}`}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#dc2626">
                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                  </svg>
                                </button>
                              );
                            })}
                          </div>
                        </td>

                        {/* Factsheet */}
                        <td className="esg-col-factsheet">
                          {item.factsheet ? (
                            <span
                              className="esg-factsheet-text"
                              onClick={() => setActiveModalItem(item)}
                              role="button"
                              tabIndex={0}
                            >
                              Factsheet
                            </span>
                          ) : null}
                        </td>

                        {/* Highlights */}
                        <td className="esg-col-highlights">
                          {item.highlights}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ESG Dashboard Direct CTA Banner */}
        <div className="esg-dashboard-cta">
          <div className="esg-dashboard-copy">
            <h2>Explore the Interactive ESG Dashboard</h2>
            <p>
              Access in-depth historical environmental metrics, social impact scores, compliance
              certificates, and live ESG World investor dashboards.
            </p>
          </div>
          <a
            className="esg-dashboard-btn"
            href={ESG_DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Launch ESG Dashboard on ESG World"
          >
            VIEW ESG DASHBOARD ↗
          </a>
        </div>
      </div>

      {/* Interactive Modal for DocuLinks & Factsheet Details */}
      {activeModalItem && (
        <div className="esg-modal-overlay" onClick={() => setActiveModalItem(null)}>
          <div className="esg-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="esg-modal-close"
              onClick={() => setActiveModalItem(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            <span
              style={{
                display: 'inline-block',
                padding: '5px 14px',
                borderRadius: '9999px',
                background: '#0052cc',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '11.5px',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              {activeModalItem.factor}
            </span>

            <h3 style={{ margin: '0 0 14px', font: '700 22px/1.2 Manrope, sans-serif', color: '#0f172a' }}>
              {activeModalItem.subfactor}
            </h3>

            {/* Factsheet Data Points */}
            {activeModalItem.factsheet && (
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#0052cc', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
                  Key Factsheet Data Points
                </strong>
                <p style={{ margin: 0, font: '500 14px/1.5 Manrope, sans-serif', color: '#334155' }}>
                  {activeModalItem.factsheet}
                </p>
              </div>
            )}

            {/* DocuLinks */}
            {activeModalItem.docLinks && activeModalItem.docLinks.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>
                  Available DocuLinks ({activeModalItem.docLinks.length})
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeModalItem.docLinks.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={doc.type === 'pdf'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#0f172a',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '13.5px',
                      }}
                    >
                      <span>{doc.name}</span>
                      <span
                        style={{
                          color: doc.type === 'web' ? '#1a73e8' : doc.type === 'linkedin' ? '#0a66c2' : '#dc2626',
                          fontWeight: 700,
                        }}
                      >
                        {doc.type === 'web' ? '↗ Visit' : doc.type === 'linkedin' ? '↗ LinkedIn' : '[PDF] ↓'}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <a
                href={ESG_DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  background: '#0052cc',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '12.5px',
                }}
              >
                OPEN ON ESG WORLD ↗
              </a>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontWeight: 600,
                  fontSize: '12.5px',
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <CompanyFooter />
    </div>
  );
}

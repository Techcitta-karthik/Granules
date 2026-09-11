import { useEffect, useState, useMemo } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './media.css';
import { MEDIA_DATA, MediaArticle } from '../data/mediaData';

const ITEMS_PER_PAGE = 6;

const SOCIALS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/granules-india-limited/',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: 'Instagram',
    href: 'https://www.instagram.com/granulesindialimited_official/followers/',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: 'X',
    href: 'https://x.com/GranulesIndia',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
      </svg>
    ),
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1BSgd7PiTC/?mibextid=wwXIfr',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C21.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    label: 'YouTube',
    href: 'https://www.youtube.com/@Granules-IndiaLimited/featured',
  },
];

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'press'>('news');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalArticle, setModalArticle] = useState<MediaArticle | null>(null);

  useEffect(() => {
    document.title = 'Granules Newsroom — Granules India';
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll and close on Escape key when modal is open
  useEffect(() => {
    if (!modalArticle) return undefined;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalArticle(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [modalArticle]);

  // Available years based on active tab
  const availableYears = useMemo(() => {
    if (activeTab === 'news') {
      return MEDIA_DATA.newsYears;
    }
    return MEDIA_DATA.pressYears;
  }, [activeTab]);

  // Ensure selectedYear is valid when tab changes
  useEffect(() => {
    if (!availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0] || '2026');
    }
    setCurrentPage(1);
  }, [activeTab, availableYears, selectedYear]);

  // Current list of items for selected tab and year
  const currentItems = useMemo(() => {
    if (activeTab === 'news') {
      return MEDIA_DATA.news[selectedYear] || [];
    }
    return MEDIA_DATA.pressReleases[selectedYear] || [];
  }, [activeTab, selectedYear]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(currentItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return currentItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentItems, currentPage]);

  const handleTabChange = (tab: 'news' | 'press') => {
    setActiveTab(tab);
    setYearDropdownOpen(false);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="cp">
      <NavBar />

      <div className="cp-hero-inner" style={{ paddingTop: 'clamp(18px, 2.2vw, 30px)' }}>
        <p className="cp-breadcrumb">
          <a href="/">HOME</a>
          <span className="sep">›</span>
          <span className="current">MEDIA</span>
        </p>
        <h1 className="cp-page-title">Media</h1>
      </div>

      <div className="med-hero">
        <img
          src="/assets/media/media-hero-banner.jpg"
          alt="Granules Global Media and Communications"
          className="med-hero-img"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Tab Switcher & Year Filter */}
      <div className="med-tabs-container">
        <div className="med-tabs-row">
          <button
            type="button"
            className={`med-tab med-tab-left${activeTab === 'news' ? ' active' : ''}`}
            onClick={() => handleTabChange('news')}
          >
            IN THE NEWS
          </button>

          <button
            type="button"
            className={`med-tab med-tab-center${activeTab === 'press' ? ' active' : ''}`}
            onClick={() => handleTabChange('press')}
          >
            PRESS RELEASE
          </button>

          <div className="med-year-wrap">
            <button
              type="button"
              className="med-year"
              onClick={() => setYearDropdownOpen((prev) => !prev)}
              aria-expanded={yearDropdownOpen}
            >
              <span>{selectedYear}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {yearDropdownOpen && (
              <div className="med-year-dropdown">
                {availableYears.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    className={`med-year-option${selectedYear === yr ? ' active' : ''}`}
                    onClick={() => handleYearChange(yr)}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Tab Gradient Indicator Underline */}
        <div className="med-tabs-track">
          <div className={`med-tabs-indicator${activeTab === 'press' ? ' press' : ''}`} />
        </div>
      </div>

      {/* News & Press Release Content Lists */}
      {activeTab === 'news' ? (
        <div className="med-press-container">
          {paginatedItems.length > 0 ? (
            <div className="med-news-list">
              {paginatedItems.map((item, index) => {
                const fallbackImg =
                  index % 3 === 0
                    ? '/assets/news-1.webp'
                    : index % 3 === 1
                      ? '/assets/news-2.webp'
                      : '/assets/news-3.webp';

                return (
                  <article
                    className="med-news-item with-image"
                    key={item.id || item.title}
                    onClick={() => setModalArticle(item)}
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setModalArticle(item);
                      }
                    }}
                  >
                    <img
                      className="med-news-image"
                      src={item.image || fallbackImg}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImg;
                      }}
                    />

                    <div className="med-news-body">
                      <div className="med-news-content">
                        <div className="med-news-tags">
                          <span className="med-news-tag">NEWS</span>
                          <span className="med-news-tag">{item.date || item.year}</span>
                        </div>
                        <h3 className="med-news-title">{item.title}</h3>
                      </div>

                      <button
                        type="button"
                        className="med-read-more"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalArticle(item);
                        }}
                      >
                        READ MORE
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="med-empty-state">
              <p>No news articles found for {selectedYear}.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="med-pagination">
              <button
                type="button"
                className="med-page-btn nav"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  type="button"
                  key={pageNum}
                  className={`med-page-btn${currentPage === pageNum ? ' active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum < 10 ? `0${pageNum}` : pageNum}
                </button>
              ))}
              <button
                type="button"
                className="med-page-btn nav"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="med-press-container">
          {paginatedItems.length > 0 ? (
            <div className="med-news-list">
              {paginatedItems.map((item) => (
                <article
                  className="med-news-item"
                  key={item.id || item.title}
                  onClick={() => setModalArticle(item)}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setModalArticle(item);
                    }
                  }}
                >
                  <div className="med-news-body">
                    <div className="med-news-content">
                      <div className="med-news-tags">
                        <span className="med-news-tag">PRESS RELEASE</span>
                        <span className="med-news-tag">{item.date || item.year}</span>
                      </div>
                      <h3 className="med-news-title">{item.title}</h3>
                    </div>

                    <button
                      type="button"
                      className="med-read-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalArticle(item);
                      }}
                    >
                      READ MORE
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="med-empty-state">
              <p>No press releases found for {selectedYear}.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="med-pagination">
              <button
                type="button"
                className="med-page-btn nav"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  type="button"
                  key={pageNum}
                  className={`med-page-btn${currentPage === pageNum ? ' active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum < 10 ? `0${pageNum}` : pageNum}
                </button>
              ))}
              <button
                type="button"
                className="med-page-btn nav"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Interactive Read Article Modal */}
      {modalArticle && (
        <div className="med-modal-overlay" role="presentation" onMouseDown={() => setModalArticle(null)}>
          <div
            className={`med-modal-card ${modalArticle.image ? 'med-modal-card--split' : 'med-modal-card--single'}`}
            role="dialog"
            aria-modal="true"
            aria-label={modalArticle.title}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="med-modal-close"
              onClick={() => setModalArticle(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            {modalArticle.image && (
              <div className="med-modal-media-col">
                <img
                  className="med-modal-image"
                  src={modalArticle.image}
                  alt={modalArticle.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/news-1.webp';
                  }}
                />
              </div>
            )}

            <div className="med-modal-content-col">
              <div className="med-news-tags">
                <span className="med-news-tag">{modalArticle.category}</span>
                <span className="med-news-tag">{modalArticle.date || modalArticle.year}</span>
              </div>
              <h2 className="med-modal-title">{modalArticle.title}</h2>
              <p className="med-modal-body">{modalArticle.body}</p>

              <div className="med-modal-actions">
                {modalArticle.pdf && (
                  <a
                    className="inv-detail-pill"
                    href={modalArticle.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      borderRadius: '24px',
                      background: 'linear-gradient(180deg, #0061f8 0%, #0140a2 100%)',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    DOWNLOAD DOCUMENT (PDF)
                  </a>
                )}

                {modalArticle.url && (
                  <a
                    className="inv-detail-pill"
                    href={modalArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      borderRadius: '24px',
                      background: 'linear-gradient(180deg, #0061f8 0%, #0140a2 100%)',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    VIEW FULL NEWS COVERAGE ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Contact Us Section */}
      <section className="med-contact-section" aria-label="Media Contacts">
        <div className="med-contact-head">
          <span className="cp-section-badge">Get in Touch</span>
          <h2>Media Contact</h2>
          <h4>
            For journalist inquiries, interview requests, official statements, and corporate media information, our communications team is here to assist you.
          </h4>
        </div>

        <div className="med-contact-grid">
          {/* Card 1: Corporate Communications */}
          <div className="med-contact-card">
            <div className="med-contact-card-header">
              <div className="med-contact-card-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="med-contact-card-info">
                <h3>Priyanka Chawla</h3>
                <p className="med-contact-role">Corporate Communications &amp; Media Relations</p>
              </div>
            </div>
            <p className="med-contact-card-desc">
              Direct media queries, press releases, leadership interviews, and editorial coordination.
            </p>
            <div className="med-contact-actions">
              <a href="mailto:Priyanka.Chawla@granulesindia.com" className="med-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Priyanka.Chawla@granulesindia.com</span>
              </a>
              <a href="tel:+914069043500" className="med-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 40 69043500</span>
              </a>
            </div>
          </div>

          {/* Card 2: Global Media Desk */}
          <div className="med-contact-card">
            <div className="med-contact-card-header">
              <div className="med-contact-card-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div className="med-contact-card-info">
                <h3>Global Media Desk</h3>
                <p className="med-contact-role">Granules India Corporate Headquarters</p>
              </div>
            </div>
            <p className="med-contact-card-desc">
              15th Floor, Granules Tower, Botanical Garden Road, Kondapur, Hyderabad – 500084, Telangana, India.
            </p>
            <div className="med-contact-actions">
              <a href="mailto:mail@granulesindia.com" className="med-contact-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>mail@granulesindia.com</span>
              </a>
              <a href="/contact" className="med-contact-chip">
                <span>General Enquiries Page &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Integrated Annual Report Banner */}
      <div className="med-report-section">
        <div className="med-report-card">
          <div className="med-report-copy">
            <h2>
              Integrated Annual Report
              <br />
              FY 25-26
            </h2>
            <a
              className="med-report-btn"
              href="/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Granules_Integrated-Report-2024-25.pdf"
            >
              DOWNLOAD REPORT
            </a>
          </div>

          <div className="med-report-device-wrap">
            <div className="med-report-device">
              <div className="med-report-screen">
                <img
                  src="/assets/investor-report-cover.webp"
                  alt="Expanding Horizons - 2024 Integrated Annual Report"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Social Follow Banner */}
      <div className="med-follow">
        <h2>
          Follow us for updates
          <br />
          and company news
        </h2>
        <div className="med-follow-icons">
          {SOCIALS.map((social) => (
            <a
              className="med-follow-icon"
              href={social.href}
              target="_blank"
              rel="noreferrer"
              key={social.label}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <CompanyFooter />
    </div>
  );
}

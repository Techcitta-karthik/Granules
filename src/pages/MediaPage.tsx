import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './media.css';

// Base path for media assets
const A = '/assets/media/';

interface MediaArticle {
  category: 'NEWS' | 'PRESS RELEASE';
  date: string;
  title: string;
  image?: string;
  body: string;
}

const IN_THE_NEWS: MediaArticle[] = [
  {
    category: 'NEWS',
    date: '11 APRIL 2025',
    title: 'Granules India Acquires Swiss CDMO Senn Chemicals to Enter Peptide Therapeutics Space.',
    image: '/assets/news-1.webp',
    body: 'Granules India Limited announced the completion of its strategic acquisition of Swiss CDMO Senn Chemicals AG, significantly bolstering its peptide synthesis capabilities and expanding its global footprint across Europe.',
  },
  {
    category: 'NEWS',
    date: '24 FEBRUARY 2025',
    title: 'Granules India enters CDMO business by acquiring Senn Chemicals AG.',
    image: '/assets/news-2.webp',
    body: 'Entering the specialized CDMO market, Granules India combines its large-scale manufacturing excellence with Swiss precision to cater to high-growth peptide therapeutics and complex active pharmaceutical ingredients.',
  },
  {
    category: 'NEWS',
    date: '16 JANUARY 2025',
    title: 'Granules India AIG Hospitals extend breast cancer screening.',
    image: '/assets/news-3.webp',
    body: 'In partnership with AIG Hospitals, Granules India launched mobile mammography screening units to provide accessible early cancer detection services across underserved rural and semi-urban communities.',
  },
];

const PRESS_RELEASES: MediaArticle[] = [
  {
    category: 'PRESS RELEASE',
    date: '18 MAY 2025',
    title: 'Granules India transforms BC government boys hostel in Parawada.',
    body: 'As part of its CSR initiatives, Granules India upgraded infrastructure, sanitation, and educational facilities at the BC Government Boys Hostel in Parawada, benefiting hundreds of students.',
  },
  {
    category: 'PRESS RELEASE',
    date: '20 APRIL 2025',
    title: 'Q4FY25 Revenue from operations at INR 11,974 Mn up 2% YoY, EBITDA at INR 2,524 Mn down 1% YoY, PAT at INR 1,520 Mn up 17% YoY.',
    body: 'Granules India Limited announced robust financial performance for the fourth quarter ended March 31, 2025, driven by operational efficiencies and sustained demand across core formulation categories.',
  },
  {
    category: 'PRESS RELEASE',
    date: '04 APRIL 2025',
    title: 'Granules India Limited extends support to 1,030 TB patients in Bhadradri Kothagudem District.',
    body: 'Reinforcing its commitment to public health, Granules India partnered with district healthcare authorities to provide nutritional support and treatment monitoring for tuberculosis patients.',
  },
  {
    category: 'PRESS RELEASE',
    date: '04 MAY 2025',
    title: 'Granules India earns gold rating in first-ever corporate-level EcoVadis assessment ranks in the top 5% globally across all industries.',
    body: 'Granules India received a Gold Medal in its inaugural corporate-level EcoVadis sustainability evaluation, positioning the company in the top 5 percentile of assessed enterprises worldwide.',
  },
  {
    category: 'PRESS RELEASE',
    date: '22 MARCH 2025',
    title: 'Granules India announces closing of acquisition of Senn Chemicals, strengthening capabilities in Peptide therapeutics and CDMO Services.',
    body: 'The closing of the Senn Chemicals transaction enhances Granules’ end-to-end peptide offering from pre-clinical development through commercial manufacturing scale.',
  },
];

const MEDIA_KIT = [
  { icon: 'icon-webasset.svg', name: 'Logos' },
  { icon: 'icon-user.svg', name: 'Leadership' },
  { icon: 'icon-building.svg', name: 'Offices Images' },
  { icon: 'icon-video.svg', name: 'Videos' },
];

const SOCIALS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/granules-india-limited/',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    label: 'X',
    href: 'https://x.com/GranulesIndia',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
      </svg>
    ),
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1BSgd7PiTC/?mibextid=wwXIfr',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" />
      </svg>
    ),
    label: 'Instagram',
    href: 'https://instagram.com',
  },
];

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'press'>('news');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('01');
  const [modalArticle, setModalArticle] = useState<MediaArticle | null>(null);

  useEffect(() => {
    document.title = 'Granules Newsroom — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <div className="cp-hero-inner" style={{ paddingTop: 'clamp(18px, 2.2vw, 30px)' }}>
        <p className="cp-breadcrumb">
          <span>HOMEPAGE</span>
          <span className="sep">›</span>
          <span className="current">MEDIA</span>
        </p>
        <h1 className="cp-page-title">Granules newsroom</h1>
      </div>

      <div className="med-hero">
        <span className="med-hero-badge">STOCK IMAGE</span>
      </div>

      {/* Tab Switcher & Year Filter */}
      <div className="med-tabs-container">
        <div className="med-tabs-row">
          <button
            type="button"
            className={`med-tab med-tab-left${activeTab === 'news' ? ' active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            IN THE NEWS
          </button>

          <button
            type="button"
            className={`med-tab med-tab-center${activeTab === 'press' ? ' active' : ''}`}
            onClick={() => setActiveTab('press')}
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {yearDropdownOpen && (
              <div className="med-year-dropdown">
                {['2025', '2024', '2023'].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    className={`med-year-option${selectedYear === yr ? ' active' : ''}`}
                    onClick={() => {
                      setSelectedYear(yr);
                      setYearDropdownOpen(false);
                    }}
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
        <div className="med-news-list">
          {IN_THE_NEWS.map((item) => (
            <article className="med-news-item with-image" key={item.title}>
              <img className="med-news-image" src={item.image} alt={item.title} loading="lazy" decoding="async" />

              <div className="med-news-body">
                <div className="med-news-content">
                  <div className="med-news-tags">
                    <span className="med-news-tag">NEWS</span>
                    <span className="med-news-tag">{item.date}</span>
                  </div>
                  <h3 className="med-news-title">{item.title}</h3>
                </div>

                <button
                  type="button"
                  className="med-read-more"
                  onClick={() => setModalArticle(item)}
                >
                  READ MORE
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="med-press-container">
          <div className="med-news-list">
            {PRESS_RELEASES.map((item) => (
              <article className="med-news-item" key={item.title}>
                <div className="med-news-body">
                  <div className="med-news-content">
                    <div className="med-news-tags">
                      <span className="med-news-tag">PRESS RELEASE</span>
                      <span className="med-news-tag">{item.date}</span>
                    </div>
                    <h3 className="med-news-title">{item.title}</h3>
                  </div>

                  <button
                    type="button"
                    className="med-read-more"
                    onClick={() => setModalArticle(item)}
                  >
                    READ MORE
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="med-pagination">
            <button
              type="button"
              className="med-page-btn nav"
              aria-label="Previous page"
              onClick={() => setCurrentPage('01')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {['01', '02', '....', '08'].map((pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                className={`med-page-btn${currentPage === pageNumber ? ' active' : ''}`}
                onClick={() => {
                  if (pageNumber !== '....') setCurrentPage(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              className="med-page-btn nav"
              aria-label="Next page"
              onClick={() => setCurrentPage('02')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Read Article Modal */}
      {modalArticle && (
        <div className="med-modal-overlay" onClick={() => setModalArticle(null)}>
          <div className="med-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="med-modal-close"
              onClick={() => setModalArticle(null)}
              aria-label="Close modal"
            >
              ×
            </button>
            {modalArticle.image && (
              <img
                className="med-modal-image"
                src={modalArticle.image}
                alt={modalArticle.title} loading="lazy" decoding="async" />
            )}
            <div className="med-news-tags" style={{ marginTop: '16px' }}>
              <span className="med-news-tag">{modalArticle.category}</span>
              <span className="med-news-tag">{modalArticle.date}</span>
            </div>
            <h2 className="med-modal-title">{modalArticle.title}</h2>
            <p className="med-modal-body">{modalArticle.body}</p>
          </div>
        </div>
      )}

      {/* 2024 Integrated Annual Report Banner */}
      <div className="med-report-section">
        <div className="med-report-card">
          <div className="med-report-copy">
            <h2>2024 Integrated<br />Annual Report</h2>
            <a
              className="med-report-btn"
              href="/investor/annual-reports"
            >
              VIEW REPORT
            </a>
          </div>

          <div className="med-report-device-wrap">
            <div className="med-report-device">
              <div className="med-report-screen">
                <img
                  src="/assets/investor-report-cover.webp"
                  alt="Expanding Horizons - 2024 Integrated Annual Report" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Kit Section */}
      <div className="med-kit">
        <h2>Media kit</h2>
        <div className="med-kit-grid">
          <button type="button" className="med-kit-item" onClick={() => alert('Downloading Granules India Brand Logos...')}>
            <div className="med-kit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z"/>
              </svg>
            </div>
            <div className="med-kit-text">
              <p className="name">Logos</p>
              <p className="action">DOWNLOAD ASSET</p>
            </div>
          </button>

          <button type="button" className="med-kit-item" onClick={() => alert('Downloading Leadership High-Res Photos...')}>
            <div className="med-kit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="med-kit-text">
              <p className="name">Leadership</p>
              <p className="action">DOWNLOAD ASSET</p>
            </div>
          </button>

          <button type="button" className="med-kit-item" onClick={() => alert('Downloading Global Facilities & Offices Images...')}>
            <div className="med-kit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
            </div>
            <div className="med-kit-text">
              <p className="name">Offices Images</p>
              <p className="action">DOWNLOAD ASSET</p>
            </div>
          </button>

          <button type="button" className="med-kit-item" onClick={() => alert('Downloading Corporate Videos & B-Roll Assets...')}>
            <div className="med-kit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </div>
            <div className="med-kit-text">
              <p className="name">Videos</p>
              <p className="action">DOWNLOAD ASSET</p>
            </div>
          </button>
        </div>
      </div>

      {/* Social Follow Banner */}
      <div className="med-follow">
        <h2>Follow us for updates<br />and company news</h2>
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

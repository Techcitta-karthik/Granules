import React, { useState, useMemo, useEffect, useRef } from 'react';
import { InvestorCategory, InvestorDocItem } from '../../data/investorData';
import { toCdnPdf } from '../../lib/pdf';

function toTelHref(value: string) {
  return value.replace(/[^0-9+]/g, '');
}

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const FaxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const LinkPillIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  id: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  variant?: 'subcat' | 'year';
  ariaLabel: string;
}

function CustomDropdown({
  id,
  value,
  options,
  onChange,
  variant = 'subcat',
  ariaLabel,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close when pressing Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div
      className={`inv-custom-dropdown-wrap inv-custom-dropdown--${variant}`}
      ref={dropdownRef}
    >
      <button
        id={id}
        type="button"
        className={`inv-custom-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <span className="inv-custom-dropdown-text">
          {selectedOption ? selectedOption.label : value}
        </span>
        <svg
          className={`inv-custom-dropdown-chevron ${isOpen ? 'rotate' : ''}`}
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

      {isOpen && (
        <div className="inv-custom-dropdown-menu" role="listbox" aria-labelledby={id}>
          <div className="inv-custom-dropdown-scroll">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`inv-custom-dropdown-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                >
                  <span className="inv-custom-dropdown-item-label">{opt.label}</span>
                  {isSelected && (
                    <svg
                      className="inv-custom-dropdown-check"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface InvestorFilteredSectionProps {
  category: InvestorCategory;
  defaultSubcatId?: string;
  defaultYear?: string;
  hidePeriod?: boolean;
}

export default function InvestorFilteredSection({
  category,
  defaultSubcatId,
  defaultYear,
  hidePeriod: explicitHidePeriod,
}: InvestorFilteredSectionProps) {
  const hidePeriod = explicitHidePeriod ?? (category.id === 'sec-investor-resources');

  // Can be 'all' or a specific subcategory id
  const [activeSubcatId, setActiveSubcatId] = useState<string>(
    () => defaultSubcatId || 'all'
  );
  const [selectedYear, setSelectedYear] = useState<string>(() => defaultYear || 'all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Sync if defaultSubcatId changes from route/hash
  useEffect(() => {
    if (defaultSubcatId) {
      setActiveSubcatId(defaultSubcatId);
    }
  }, [defaultSubcatId]);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSubcatId, selectedYear]);

  // Total items in category
  const allCategoryItems = useMemo(() => {
    return category.subcategories.flatMap((s) => s.items);
  }, [category.subcategories]);

  // Active subcategory if specific one chosen
  const activeSubcat = useMemo(() => {
    if (activeSubcatId === 'all') return null;
    return category.subcategories.find((s) => s.id === activeSubcatId) || null;
  }, [category.subcategories, activeSubcatId]);

  // Extract unique available years for current view
  const availableYears = useMemo<string[]>(() => {
    const pool = activeSubcat ? activeSubcat.items : allCategoryItems;
    const years = Array.from(
      new Set(pool.map((i) => i.year).filter((y): y is string => Boolean(y)))
    );
    return years.sort((a, b) => b.localeCompare(a));
  }, [activeSubcat, allCategoryItems]);

  // If selected year is not available in new subcategory, reset to 'all'
  useEffect(() => {
    if (selectedYear !== 'all' && !availableYears.includes(selectedYear)) {
      setSelectedYear('all');
    }
  }, [availableYears, selectedYear]);

const MONTH_MAP: Record<string, number> = {
  jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
  apr: 4, april: 4, may: 5, jun: 6, june: 6, jul: 7, july: 7,
  aug: 8, august: 8, sep: 9, sept: 9, september: 9, oct: 10, october: 10,
  nov: 11, november: 11, dec: 12, december: 12,
};

function getDocSortScore(item: InvestorDocItem): number {
  const p = (item.period || '').trim();
  const t = (item.title || '').trim();
  let year = parseInt(item.year || '', 10);

  const m1 = (p + ' ' + t).match(/([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})/);
  if (m1 && MONTH_MAP[m1[1].toLowerCase()]) {
    return parseInt(m1[3], 10) * 10000 + MONTH_MAP[m1[1].toLowerCase()] * 100 + parseInt(m1[2], 10);
  }
  const m2 = (p + ' ' + t).match(/(\d{1,2})\s+([A-Za-z]+),?\s*(\d{4})/);
  if (m2 && MONTH_MAP[m2[2].toLowerCase()]) {
    return parseInt(m2[3], 10) * 10000 + MONTH_MAP[m2[2].toLowerCase()] * 100 + parseInt(m2[1], 10);
  }
  const m3 = (p + ' ' + t).match(/([A-Za-z]+)\s+(\d{4})/);
  if (m3 && MONTH_MAP[m3[1].toLowerCase()]) {
    return parseInt(m3[2], 10) * 10000 + MONTH_MAP[m3[1].toLowerCase()] * 100 + 15;
  }

  let qNum: number | null = null;
  const qMatch = p.match(/Q([1-4])/i) || t.match(/Q([1-4])/i);
  if (qMatch) qNum = parseInt(qMatch[1], 10);
  else if (/first quarter/i.test(p) || /first quarter/i.test(t)) qNum = 1;
  else if (/second quarter/i.test(p) || /second quarter/i.test(t)) qNum = 2;
  else if (/third quarter/i.test(p) || /third quarter/i.test(t)) qNum = 3;
  else if (/fourth quarter|fouth quarter/i.test(p) || /fourth quarter|fouth quarter/i.test(t)) qNum = 4;

  if (isNaN(year) || !year) {
    const ym = (p + ' ' + t + ' ' + (item.pdf || '')).match(/20\d{2}/);
    if (ym) year = parseInt(ym[0], 10);
  }

  if (qNum && year) {
    const calYear = qNum === 4 ? year : year - 1;
    const mo = qNum === 4 ? 3 : qNum === 3 ? 12 : qNum === 2 ? 9 : 6;
    return calYear * 10000 + mo * 100 + 15;
  }

  if (item.pdf) {
    const pdfDateMatch = item.pdf.match(/\/(\d{4})\/(\d{2})\//);
    if (pdfDateMatch) {
      return parseInt(pdfDateMatch[1], 10) * 10000 + parseInt(pdfDateMatch[2], 10) * 100 + 10;
    }
  }

  if (year) {
    return year * 10000 + 600 + 1;
  }

  return 0;
}

  // Filtered documents
  const filteredItems = useMemo<InvestorDocItem[]>(() => {
    let pool = activeSubcat ? activeSubcat.items : allCategoryItems;
    if (selectedYear !== 'all') {
      pool = pool.filter((item) => item.year === selectedYear);
    }
    return [...pool].sort((a, b) => getDocSortScore(b) - getDocSortScore(a));
  }, [activeSubcat, allCategoryItems, selectedYear]);

  // Dropdown options lists
  const categoryOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Categories' },
      ...category.subcategories.map((sub) => ({
        value: sub.id,
        label: sub.label,
      })),
    ];
  }, [category.subcategories]);

  const yearOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Years' },
      ...availableYears.map((yr) => {
        const is4Digit = /^\d{4}$/.test(yr);
        return {
          value: yr,
          label: is4Digit ? `FY${yr.slice(2)} (${yr})` : yr,
        };
      }),
    ];
  }, [availableYears]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  return (
    <div className="inv-section-wrapper">
      {/* SECTION HEADER WITH FILTERS BESIDE IT */}
      <div className="inv-doc-section-head">
        <div className="inv-doc-head-left">
          <span className="inv-section-badge">{category.badge}</span>
          <h2>{category.title.toUpperCase()}</h2>
          <p>{category.description}</p>
        </div>

        {/* 2 Filters Placed Side-by-Side: Categories & Year */}
        {!category.isContact && (
          <div className="inv-doc-head-filters" aria-label={`Filter ${category.title}`}>
            {/* Filter 1: Categories / Subcategories */}
            <div className="inv-header-filter-group">
              <span className="inv-header-filter-label">CATEGORIES</span>
              <CustomDropdown
                id={`subcat-select-${category.id}`}
                variant="subcat"
                value={activeSubcatId}
                onChange={setActiveSubcatId}
                options={categoryOptions}
                ariaLabel={`Select category in ${category.title}`}
              />
            </div>

            {/* Filter 2: Year Filter */}
            {availableYears.length > 0 && (
              <div className="inv-header-filter-group">
                <span className="inv-header-filter-label">YEAR</span>
                <CustomDropdown
                  id={`year-select-head-${category.id}`}
                  variant="year"
                  value={selectedYear}
                  onChange={setSelectedYear}
                  options={yearOptions}
                  ariaLabel={`Select year in ${category.title}`}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION CONTENT: TABLE THEME & UI MATCHING SCREENSHOT */}
      {category.isContact ? (
        /* Investor Relations Contact Desk */
        <div className="inv-contact-grid">
          {/* Card 1: Institutional Investors & Registrar and Transfer Agent */}
          <div className="inv-contact-card">
            <div className="ct-investor-subsection">
              <h4 className="ct-investor-subheading">For Institutional Investors &amp; Financial Analysts</h4>
              <div className="ct-action-pills-row">
                <a href={`tel:${toTelHref('+040-69043500')}`} className="ct-action-pill">
                  <span className="ct-pill-icon"><PhoneIcon /></span>
                  <span>+040-69043500</span>
                </a>
                <a href="mailto:investorrelations@granulesindia.com" className="ct-action-pill">
                  <span className="ct-pill-icon"><MailIcon /></span>
                  <span>investorrelations@granulesindia.com</span>
                </a>
                <a href="mailto:Irfan.raeen@in.mpms.mufg.com" className="ct-action-pill">
                  <span className="ct-pill-icon"><MailIcon /></span>
                  <span>Irfan.raeen@in.mpms.mufg.com</span>
                </a>
              </div>
            </div>

            <hr className="ct-section-divider" />

            <div className="ct-investor-subsection">
              <h4 className="ct-investor-subheading">Registrar and Transfer Agent</h4>
              <div className="ct-address-text-block">
                <p className="ct-address-line"><strong>M/s. KFin Technologies Limited</strong></p>
                <p className="ct-address-line">
                  Selenium Tower B, Plot 31-32, Gachibowli, Financial District, Nanakramguda, Hyderabad – 500 032.
                </p>
              </div>
              <div className="ct-action-pills-row">
                <a href={`tel:${toTelHref('1-800-309-4001')}`} className="ct-action-pill">
                  <span className="ct-pill-icon"><PhoneIcon /></span>
                  <span>1-800-309-4001</span>
                </a>
                <a href="mailto:einward.ris@kfintech.com" className="ct-action-pill">
                  <span className="ct-pill-icon"><MailIcon /></span>
                  <span>einward.ris@kfintech.com</span>
                </a>
                <a href="https://www.kfintech.com/" target="_blank" rel="noopener noreferrer" className="ct-action-pill">
                  <span className="ct-pill-icon"><LinkPillIcon /></span>
                  <span>www.kfintech.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Retail Investors and Grievance */}
          <div className="inv-contact-card">
            <div className="ct-investor-subsection">
              <h4 className="ct-investor-subheading">For Retail Investors and Grievance</h4>
              <div className="ct-address-text-block">
                <p className="ct-address-line">
                  <strong>Ms. Chaitanya Tummala</strong><br />
                  <span style={{ color: '#64748b' }}>Company Secretary, Compliance Officer and Nodal Officer</span><br />
                  <span style={{ color: '#334155', fontWeight: 600 }}>Granules India Limited</span>
                </p>
                <p className="ct-address-line" style={{ marginTop: '6px' }}>
                  15th Floor, Granules Tower, Botanical Garden Road, Kondapur, Hyderabad – 500084, Telangana, India.
                </p>
              </div>
              <div className="ct-action-pills-row">
                <a href={`tel:${toTelHref('+91 40 69043500')}`} className="ct-action-pill">
                  <span className="ct-pill-icon"><PhoneIcon /></span>
                  <span>+91 40 69043500</span>
                </a>
                <a href={`tel:${toTelHref('+91 40 23115145')}`} className="ct-action-pill">
                  <span className="ct-pill-icon"><FaxIcon /></span>
                  <span>+91 40 23115145</span>
                </a>
                <a href="mailto:chaitanya.tummala@granulesindia.com" className="ct-action-pill">
                  <span className="ct-pill-icon"><MailIcon /></span>
                  <span>chaitanya.tummala@granulesindia.com</span>
                </a>
                <a href="mailto:investorrelations@granulesindia.com" className="ct-action-pill">
                  <span className="ct-pill-icon"><MailIcon /></span>
                  <span>investorrelations@granulesindia.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* DATA TABLE WITH REPORT NAME, SCOPE, PERIOD, ACTION */
        <div className="inv-table-wrap">
          <table className="inv-data-table">
            <thead>
              <tr>
                <th>REPORT / DOCUMENT NAME</th>
                <th>ENTITY / REPORTING SCOPE</th>
                {!hidePeriod && <th>REPORTING PERIOD</th>}
                <th style={{ textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {pagedItems.map((doc) => (
                <tr key={doc.id}>
                  <td className="inv-table-title-cell">
                    <span>{doc.title}</span>
                  </td>
                  <td className="inv-table-detail-cell">{doc.scope}</td>
                  {!hidePeriod && <td className="inv-table-period-cell">{doc.period}</td>}
                  <td className="inv-table-action-cell">
                    {doc.webUrl || doc.pdf ? (
                      <div className="inv-table-actions">
                        <a
                          className="inv-action-link"
                          href={doc.webUrl || toCdnPdf(doc.pdf)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${doc.title} in a new tab`}
                        >
                          VIEW
                        </a>
                        {doc.pdf && (
                          <>
                            <span className="inv-action-slash">/</span>
                            <a
                              className="inv-action-link"
                              href={toCdnPdf(doc.pdf)}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={`${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`}
                              title={`Download ${doc.title}`}
                            >
                              DOWNLOAD
                            </a>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="inv-table-btn inv-table-btn--disabled">Available Soon</span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={hidePeriod ? 3 : 4} style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                    <p style={{ margin: '0 0 12px', fontSize: '15px' }}>
                      No documents found for selected category / year.
                    </p>
                    <button
                      type="button"
                      className="inv-doc-reset-btn"
                      onClick={() => {
                        setActiveSubcatId('all');
                        setSelectedYear('all');
                      }}
                    >
                      Reset Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* TABLE FOOTER / PAGINATION BAR */}
          {filteredItems.length > 0 && (
            <div className="inv-table-pagination">
              <span className="inv-pagination-count">
                Showing {Math.min((currentPage - 1) * pageSize + 1, filteredItems.length)}–
                {Math.min(currentPage * pageSize, filteredItems.length)} of {filteredItems.length} documents
                {selectedYear !== 'all' && ` • Year: ${selectedYear}`}
                {activeSubcat && ` • Category: ${activeSubcat.label}`}
              </span>

              {totalPages > 1 && (
                <div className="inv-pagination-actions">
                  <button
                    type="button"
                    className="inv-page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>

                  <span className="inv-page-info">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    className="inv-page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

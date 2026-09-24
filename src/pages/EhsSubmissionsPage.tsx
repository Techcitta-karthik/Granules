import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './ehs.css';
import './investor.css';
import { EHS_DOCUMENTS, EhsDocument } from '../data/ehsData';
import { toCdnPdf } from '../lib/pdf';

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
          {selectedOption ? selectedOption.label : 'Select'}
        </span>
        <svg
          className={`inv-custom-dropdown-chevron ${isOpen ? 'rotate' : ''}`}
          width="16"
          height="16"
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
                <div
                  key={opt.value}
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
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0061f8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function getEntityScope(doc: EhsDocument): string {
  if (doc.facility === 'Corporate') {
    return 'Granules India Limited (Group)';
  }
  if (doc.facility === 'Granules Life Sciences') {
    return 'Granules Life Sciences (GLS)';
  }
  return `Granules India Limited (${doc.facility})`;
}

function getReportingPeriod(doc: EhsDocument): string {
  if (doc.period && doc.period.startsWith('FY')) {
    if (doc.period.includes('2025-26')) return 'FY 25-26';
    if (doc.period.includes('2024-25') || doc.period === 'FY 2025') return 'FY 24-25';
    if (doc.period.includes('2023-24') || doc.period === 'FY 2024') return 'FY 23-24';
    if (doc.period.includes('2022-23') || doc.period === 'FY 2023') return 'FY 22-23';
    return doc.period;
  }
  if (doc.year === '2026') return 'FY 25-26';
  if (doc.year === '2025') return 'FY 24-25';
  if (doc.year === '2024') return 'FY 23-24';
  if (doc.year === '2021') return 'FY 20-21';
  return doc.period || `FY ${doc.year}`;
}

export default function EhsSubmissionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    document.title = 'EHS Submissions | Granules India Sustainability';
    window.scrollTo(0, 0);
  }, []);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedYear]);

  const categoryOptions: DropdownOption[] = useMemo(() => {
    return [
      { value: 'ALL', label: 'All Categories' },
      { value: 'Bio-Medical Waste', label: 'Bio-Medical Waste' },
      { value: 'Hazardous & E-Waste', label: 'Hazardous & E-Waste' },
      { value: 'Consent & Orders', label: 'Consent & Orders (PCB)' },
      { value: 'Certifications', label: 'Certifications (ISO 14001/45001)' },
      { value: 'Audit & Compliance', label: 'Audit & Compliance' },
      { value: 'FAC_Gagillapur', label: 'Facility: Gagillapur' },
      { value: 'FAC_Jeedimetla', label: 'Facility: Jeedimetla' },
      { value: 'FAC_GLS', label: 'Facility: Granules Life Sciences' },
      { value: 'FAC_Unit4', label: 'Facility: Unit IV (Bonthapally)' },
      { value: 'FAC_Unit5', label: 'Facility: Unit V (Vizag)' },
      { value: 'FAC_Corporate', label: 'Facility: Corporate / Group' },
    ];
  }, []);

  const yearOptions: DropdownOption[] = useMemo(() => {
    return [
      { value: 'ALL', label: 'All Years' },
      { value: '2026', label: 'FY 25-26' },
      { value: '2025', label: 'FY 24-25' },
      { value: '2024', label: 'FY 23-24' },
      { value: '2021', label: 'FY 20-21' },
    ];
  }, []);

  const filteredDocs = useMemo(() => {
    return EHS_DOCUMENTS.filter((doc) => {
      let matchCat = true;
      if (selectedCategory !== 'ALL') {
        if (selectedCategory.startsWith('FAC_')) {
          const facKey = selectedCategory.replace('FAC_', '');
          if (facKey === 'Gagillapur') matchCat = doc.facility === 'Gagillapur';
          else if (facKey === 'Jeedimetla') matchCat = doc.facility === 'Jeedimetla';
          else if (facKey === 'GLS') matchCat = doc.facility === 'Granules Life Sciences';
          else if (facKey === 'Unit4') matchCat = doc.facility === 'Unit IV';
          else if (facKey === 'Unit5') matchCat = doc.facility === 'Unit V';
          else if (facKey === 'Corporate') matchCat = doc.facility === 'Corporate';
        } else {
          matchCat = doc.category.toLowerCase() === selectedCategory.toLowerCase();
        }
      }

      let matchYear = true;
      if (selectedYear !== 'ALL') {
        matchYear = doc.year === selectedYear || Boolean(doc.period && doc.period.includes(selectedYear));
      }

      return matchCat && matchYear;
    });
  }, [selectedCategory, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / pageSize));
  const pagedDocs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDocs.slice(start, start + pageSize);
  }, [filteredDocs, currentPage, pageSize]);

  return (
    <div className="ehs-root">
      <NavBar />

      <main className="ehs-main">
        <p className="cp-breadcrumb ehs-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <Link to="/sustainability">SUSTAINABILITY</Link>
          <span className="sep">›</span>
          <span className="current">EHS SUBMISSIONS</span>
        </p>

        <h1 className="cp-page-title ehs-page-title">EHS Submissions</h1>


        <div className="ehs-container">
          {/* Section Filter Toolbar with Balanced Controls & Document Counter */}
          <div className="ehs-filter-bar">
            {/* Side-by-Side Pill Dropdowns: All Categories & All Years */}
            <div className="ehs-filter-controls" aria-label="Filter EHS Documents">
              <div className="inv-header-filter-group">
                <CustomDropdown
                  id="ehs-category-dropdown"
                  variant="subcat"
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={categoryOptions}
                  ariaLabel="Select document category"
                />
              </div>

              <div className="inv-header-filter-group">
                <CustomDropdown
                  id="ehs-year-dropdown"
                  variant="year"
                  value={selectedYear}
                  onChange={setSelectedYear}
                  options={yearOptions}
                  ariaLabel="Select reporting year"
                />
              </div>

              {(selectedCategory !== 'ALL' || selectedYear !== 'ALL') && (
                <button
                  type="button"
                  className="ehs-filter-reset-btn"
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSelectedYear('ALL');
                  }}
                  title="Clear all active filters"
                >
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            <div className="ehs-doc-count-badge">
              {filteredDocs.length} {filteredDocs.length === 1 ? 'Document' : 'Documents'}
            </div>
          </div>

          {/* Document Table (Investor / Sustainability Theme with Balanced Proportions) */}
          <div className="inv-table-wrap">
            <table className="inv-data-table" aria-label="EHS Submissions Document Table">
              <thead>
                <tr>
                  <th style={{ width: '48%' }}>REPORT / DOCUMENT NAME</th>
                  <th style={{ width: '27%' }}>ENTITY / REPORTING SCOPE</th>
                  <th style={{ width: '12%' }}>REPORTING PERIOD</th>
                  <th style={{ width: '13%', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {pagedDocs.map((doc) => (
                  <tr key={doc.id}>
                    <td className="inv-table-title-cell">
                      <span>{doc.title}</span>
                    </td>
                    <td className="inv-table-detail-cell">
                      {getEntityScope(doc)}
                    </td>
                    <td className="inv-table-period-cell">
                      {getReportingPeriod(doc)}
                    </td>
                    <td className="inv-table-action-cell">
                      <div className="inv-table-actions">
                        <a
                          className="inv-action-link"
                          href={toCdnPdf(doc.pdf)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${doc.title} in a new tab`}
                        >
                          VIEW
                        </a>
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
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
                      <p style={{ margin: '0 0 12px', fontSize: '15.5px', fontWeight: 500 }}>
                        No EHS documents match your selected filters.
                      </p>
                      <button
                        type="button"
                        className="inv-doc-reset-btn"
                        onClick={() => {
                          setSelectedCategory('ALL');
                          setSelectedYear('ALL');
                        }}
                      >
                        Reset All Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination & Count Strip */}
            {filteredDocs.length > 0 && (
              <div className="inv-table-pagination">
                <span className="inv-pagination-count">
                  Showing {Math.min((currentPage - 1) * pageSize + 1, filteredDocs.length)}–
                  {Math.min(currentPage * pageSize, filteredDocs.length)} of {filteredDocs.length} documents
                  {selectedCategory !== 'ALL' && ` • Filter: ${categoryOptions.find(o => o.value === selectedCategory)?.label || selectedCategory}`}
                  {selectedYear !== 'ALL' && ` • Year: ${selectedYear}`}
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

          {/* Bottom Gradient Call-to-Action Banner */}
          <div className="ct-cta-box" style={{ marginTop: '64px', marginBottom: '75px' }}>
            <h2 className="ct-cta-title">Committed to Zero-Harm &amp; Sustainable Operations</h2>
            <p className="ct-cta-text">
              Discover how Granules India integrates green chemistry, energy efficiency, and community stewardship into
              every phase of our business.
            </p>
            <div className="ct-cta-actions">
              <Link to="/sustainability" className="ct-cta-btn ct-cta-btn--primary">
                Explore Sustainability Overview
              </Link>
              <Link to="/sustainability/esg-profile" className="ct-cta-btn ct-cta-btn--secondary">
                View ESG World Profile
              </Link>
            </div>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

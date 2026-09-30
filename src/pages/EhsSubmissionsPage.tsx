import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './sustainability.css';
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

const FACILITY_ORDER = [
  'Unit 1 - Bonthapally',
  'Gagillapur',
  'Jeedimetla',
  'Granules Life Sciences',
  'Unit 4 - Vizag',
  'Unit 5 - Vizag',
  'PLI Documents',
];

export default function EhsSubmissionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  useEffect(() => {
    document.title = 'EHS Documents & Submissions | Granules India Sustainability';
    window.scrollTo(0, 0);
  }, []);

  const categoryOptions: DropdownOption[] = useMemo(() => {
    return [
      { value: 'ALL', label: 'All Categories' },
      { value: 'Bio-Medical Waste', label: 'Bio-Medical Waste' },
      { value: 'Hazardous & E-Waste', label: 'Hazardous & E-Waste' },
      { value: 'Consent & Orders', label: 'Consent & Orders (PCB)' },
      { value: 'Certifications', label: 'Certifications (ISO 14001/45001)' },
      { value: 'Audit & Compliance', label: 'Audit & Compliance' },
      { value: 'FAC_Unit1', label: 'Facility: Unit 1 - Bonthapally' },
      { value: 'FAC_Gagillapur', label: 'Facility: Gagillapur' },
      { value: 'FAC_Jeedimetla', label: 'Facility: Jeedimetla' },
      { value: 'FAC_GLS', label: 'Facility: Granules Life Sciences' },
      { value: 'FAC_Unit4', label: 'Facility: Unit 4 - Vizag' },
      { value: 'FAC_Unit5', label: 'Facility: Unit 5 - Vizag' },
      { value: 'FAC_PLI', label: 'PLI Documents' },
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
          if (facKey === 'Unit1') matchCat = doc.facility === 'Unit 1 - Bonthapally';
          else if (facKey === 'Gagillapur') matchCat = doc.facility === 'Gagillapur';
          else if (facKey === 'Jeedimetla') matchCat = doc.facility === 'Jeedimetla';
          else if (facKey === 'GLS') matchCat = doc.facility === 'Granules Life Sciences';
          else if (facKey === 'Unit4') matchCat = doc.facility === 'Unit 4 - Vizag';
          else if (facKey === 'Unit5') matchCat = doc.facility === 'Unit 5 - Vizag';
          else if (facKey === 'PLI') matchCat = doc.facility === 'PLI Documents';
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

  const groupedDocs = useMemo(() => {
    const groups: { facility: string; items: EhsDocument[] }[] = [];

    FACILITY_ORDER.forEach((fac) => {
      const items = filteredDocs.filter((d) => d.facility === fac);
      if (items.length > 0) {
        groups.push({ facility: fac, items });
      }
    });

    // In case any doc has an unlisted facility:
    filteredDocs.forEach((d) => {
      if (!FACILITY_ORDER.includes(d.facility)) {
        let g = groups.find((grp) => grp.facility === d.facility);
        if (!g) {
          g = { facility: d.facility, items: [] };
          groups.push(g);
        }
        if (!g.items.includes(d)) {
          g.items.push(d);
        }
      }
    });

    return groups;
  }, [filteredDocs]);

  return (
    <div className="ehs-root">
      <NavBar />

      <main className="ehs-main">
        <p className="cp-breadcrumb ehs-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <Link to="/sustainability">SUSTAINABILITY</Link>
          <span className="sep">›</span>
          <span className="current">EHS Submissions</span>
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

          {/* Facility Group Cards (Matching Sustainability Certifications Section Layout) */}
          <div className="sus-cert-groups" style={{ marginBottom: '60px' }}>
            {groupedDocs.map((group) => (
              <div key={group.facility} className="sus-cert-card">
                {group.facility !== 'PLI Documents' && (
                  <div className="sus-cert-header">
                    <h3 className="sus-cert-title">{group.facility}</h3>
                  </div>
                )}
                <div className="sus-cert-table-wrap">
                  <table className="sus-cert-table">
                    <tbody>
                      {group.items.map((doc) => (
                        <tr key={doc.id}>
                          <td className="sus-cert-facility">{doc.title}</td>
                          <td className="sus-cert-actions">
                            {doc.pdf ? (
                              <div className="inv-table-actions">
                                <a
                                  className="inv-action-link"
                                  href={toCdnPdf(doc.pdf)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={`View ${doc.title}`}
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
                            ) : (
                              <span className="sus-cert-soon">Download (Available Soon)</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {groupedDocs.length === 0 && (
              <div className="sus-cert-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 12px', fontSize: '15.5px', fontWeight: 500, color: '#64748b' }}>
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
              </div>
            )}
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

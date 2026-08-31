import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

interface Job {
  id: number;
  title: string;
  dept: string;
  exp: string;
  location: string;
}

const ALL_JOBS: Job[] = [
  {
    id: 1,
    title: 'Analyst',
    dept: 'Regulatory affairs',
    exp: '3+ Year',
    location: 'Hyderabad, India',
  },
  {
    id: 2,
    title: 'Analyst',
    dept: 'Formulation Analytical R&D',
    exp: '3+ Year',
    location: 'Hyderabad, India',
  },
  {
    id: 3,
    title: 'Senior Scientist',
    dept: 'API Process R&D',
    exp: '5+ Years',
    location: 'Hyderabad, India',
  },
  {
    id: 4,
    title: 'Executive',
    dept: 'Quality Assurance',
    exp: '2-4 Years',
    location: 'Gagillapur, India',
  },
  {
    id: 5,
    title: 'Manager',
    dept: 'Supply Chain & Logistics',
    exp: '6+ Years',
    location: 'Hyderabad, India',
  },
  {
    id: 6,
    title: 'Lead Engineer',
    dept: 'Automation & Instrumentation',
    exp: '4-7 Years',
    location: 'Visakhapatnam, India',
  },
  {
    id: 7,
    title: 'Research Associate',
    dept: 'Analytical Development Laboratory',
    exp: '2+ Years',
    location: 'Hyderabad, India',
  },
  {
    id: 8,
    title: 'Assistant Manager',
    dept: 'Global Regulatory Affairs',
    exp: '5+ Years',
    location: 'Hyderabad, India',
  },
];

export default function CareerOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [appliedJob, setAppliedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Career Opportunities — Granules India';
    window.scrollTo(0, 0);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const designations = ['All', ...Array.from(new Set(ALL_JOBS.map((j) => j.title)))];
  const departments = ['All', ...Array.from(new Set(ALL_JOBS.map((j) => j.dept)))];
  const levels = ['All', '2-4 Years', '3+ Year', '4-7 Years', '5+ Years', '6+ Years'];
  const locations = ['All', ...Array.from(new Set(ALL_JOBS.map((j) => j.location)))];

  const filteredJobs = ALL_JOBS.filter((job) => {
    const matchesSearch =
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.exp.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDesignation = selectedDesignation === 'All' || job.title === selectedDesignation;
    const matchesDepartment = selectedDepartment === 'All' || job.dept === selectedDepartment;
    const matchesLevel = selectedLevel === 'All' || job.exp === selectedLevel;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;

    return matchesSearch && matchesDesignation && matchesDepartment && matchesLevel && matchesLocation;
  });

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Career Opportunities</span>
      </p>
      <h1 className="cp-page-title">Career Opportunities</h1>

      <div className="car-hero-photo">
        <img src={`${A}hero-photo.png`} alt="Granules India employees in a modern pharmaceutical facility" />
        <div className="overlay" />
      </div>

      <div className="car-opp-container">
        {/* Top Header matching user reference */}
        <div className="car-opp-intro">
          <p className="lede">
            Every role at Granules contributes to improving the quality of lives globally.{' '}
            <span className="muted">
              Whether you&rsquo;re launching your career or looking for your next challenge, you&rsquo;ll
              work with a team driven by innovation, science, and purpose.
            </span>
          </p>
        </div>

        {/* Filter and Search Bar with all 4 dropdown options stretched to the exact same size */}
        <div className="car-opp-filter-bar" ref={filterRef}>
          {/* 1. Search Box */}
          <div className="car-opp-search-box">
            <span className="car-opp-search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className="car-opp-search-input"
              placeholder="SEARCH"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search roles"
            />
            {searchQuery && (
              <button
                type="button"
                className="car-opp-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* 2. Designation Dropdown (Same equal width) */}
          <div className="car-opp-dropdown-wrap">
            <button
              type="button"
              className={`car-opp-filter-btn ${selectedDesignation !== 'All' ? 'is-filtered' : ''} ${openDropdown === 'designation' ? 'active' : ''}`}
              onClick={() => toggleDropdown('designation')}
            >
              <span>{selectedDesignation === 'All' ? 'DESIGNATION' : selectedDesignation}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openDropdown === 'designation' && (
              <div className="car-opp-dropdown-menu">
                {designations.map((d) => (
                  <button
                    type="button"
                    key={d}
                    className={`car-opp-dropdown-item ${selectedDesignation === d ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedDesignation(d);
                      setOpenDropdown(null);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Department Dropdown (Same equal width) */}
          <div className="car-opp-dropdown-wrap">
            <button
              type="button"
              className={`car-opp-filter-btn ${selectedDepartment !== 'All' ? 'is-filtered' : ''} ${openDropdown === 'department' ? 'active' : ''}`}
              onClick={() => toggleDropdown('department')}
            >
              <span>{selectedDepartment === 'All' ? 'DEPARTMENT' : selectedDepartment}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openDropdown === 'department' && (
              <div className="car-opp-dropdown-menu">
                {departments.map((d) => (
                  <button
                    type="button"
                    key={d}
                    className={`car-opp-dropdown-item ${selectedDepartment === d ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedDepartment(d);
                      setOpenDropdown(null);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Level Dropdown (Same equal width) */}
          <div className="car-opp-dropdown-wrap">
            <button
              type="button"
              className={`car-opp-filter-btn ${selectedLevel !== 'All' ? 'is-filtered' : ''} ${openDropdown === 'level' ? 'active' : ''}`}
              onClick={() => toggleDropdown('level')}
            >
              <span>{selectedLevel === 'All' ? 'LEVEL' : selectedLevel}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openDropdown === 'level' && (
              <div className="car-opp-dropdown-menu">
                {levels.map((l) => (
                  <button
                    type="button"
                    key={l}
                    className={`car-opp-dropdown-item ${selectedLevel === l ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedLevel(l);
                      setOpenDropdown(null);
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Location Dropdown (Same equal width) */}
          <div className="car-opp-dropdown-wrap">
            <button
              type="button"
              className={`car-opp-filter-btn ${selectedLocation !== 'All' ? 'is-filtered' : ''} ${openDropdown === 'location' ? 'active' : ''}`}
              onClick={() => toggleDropdown('location')}
            >
              <span>{selectedLocation === 'All' ? 'LOCATION' : selectedLocation}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openDropdown === 'location' && (
              <div className="car-opp-dropdown-menu">
                {locations.map((loc) => (
                  <button
                    type="button"
                    key={loc}
                    className={`car-opp-dropdown-item ${selectedLocation === loc ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setOpenDropdown(null);
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. Reset Filters button */}
          {(selectedDesignation !== 'All' || selectedDepartment !== 'All' || selectedLevel !== 'All' || selectedLocation !== 'All' || searchQuery) && (
            <button
              type="button"
              className="car-opp-reset-btn"
              onClick={() => {
                setSelectedDesignation('All');
                setSelectedDepartment('All');
                setSelectedLevel('All');
                setSelectedLocation('All');
                setSearchQuery('');
              }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Job Listings matching user reference image */}
        <div className="car-opp-job-list">
          {filteredJobs.length === 0 ? (
            <div className="car-opp-empty">
              <p>No open positions found matching your filter criteria.</p>
              <button
                type="button"
                className="car-opp-apply-btn"
                onClick={() => {
                  setSelectedDesignation('All');
                  setSelectedDepartment('All');
                  setSelectedLevel('All');
                  setSelectedLocation('All');
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div className="car-opp-job-row" key={job.id}>
                <div className="car-opp-job-cell designation">{job.title}</div>
                <div className="car-opp-job-cell department">{job.dept}</div>
                <div className="car-opp-job-cell level">{job.exp}</div>
                <div className="car-opp-job-cell location">{job.location}</div>
                <div className="car-opp-job-cell action">
                  <button
                    type="button"
                    className="car-opp-apply-btn"
                    onClick={() => setAppliedJob(job)}
                  >
                    APPLY NOW
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination matching Image 2 reference */}
        <div className="car-opp-pagination-row">
          <button
            type="button"
            className="car-opp-page-btn prev disabled"
            aria-label="Previous page"
            disabled
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className={`car-opp-page-btn num ${currentPage === 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(1)}
          >
            01
          </button>
          <button
            type="button"
            className={`car-opp-page-btn num ${currentPage === 2 ? 'active' : ''}`}
            onClick={() => setCurrentPage(2)}
          >
            02
          </button>
          <button
            type="button"
            className="car-opp-page-btn num dots"
            disabled
          >
            ...
          </button>
          <button
            type="button"
            className={`car-opp-page-btn num ${currentPage === 8 ? 'active' : ''}`}
            onClick={() => setCurrentPage(8)}
          >
            08
          </button>
          <button
            type="button"
            className="car-opp-page-btn next"
            aria-label="Next page"
            onClick={() => setCurrentPage((p) => Math.min(8, p + 1))}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Still exploring CTA */}
      <div className="car-cta-photo">
        <img className="bg" src={`${A}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="car-cta-copy">
          <h2>Still exploring?</h2>
          <p>
            Not sure where to start? Learn what makes Granules a place where people belong,
            contribute and grow.
          </p>
        </div>
        <Link className="car-cta-apply-btn" to="/careers/life-at-granules">Life at Granules</Link>
      </div>

      {/* Application Confirmation Modal */}
      {appliedJob && (
        <div className="car-modal-backdrop" onClick={() => setAppliedJob(null)}>
          <div className="car-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="car-modal-close" onClick={() => setAppliedJob(null)}>
              ✕
            </button>
            <span className="car-modal-tag">Apply for Position</span>
            <h3>{appliedJob.title}</h3>
            <p className="car-modal-sub">
              {appliedJob.dept} &bull; {appliedJob.location} &bull; {appliedJob.exp}
            </p>
            <p className="car-modal-info">
              Ready to take the next step in your career? Send your updated CV and portfolio to our talent acquisition team at <strong>careers@granulesindia.com</strong> with the subject line <em>&ldquo;Application: {appliedJob.title} - {appliedJob.dept}&rdquo;</em>.
            </p>
            <div className="car-modal-actions">
              <a
                className="car-opp-apply-btn"
                href={`mailto:careers@granulesindia.com?subject=Application:%20${encodeURIComponent(appliedJob.title)}%20-%20${encodeURIComponent(appliedJob.dept)}`}
              >
                Send Email Application
              </a>
              <button
                type="button"
                className="car-modal-cancel-btn"
                onClick={() => setAppliedJob(null)}
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

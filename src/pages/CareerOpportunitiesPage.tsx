import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';
import { ALL_JOBS, JobOpening } from '../data/careersData';

const A = '/assets/career/';
const CAREERS_EMAIL = 'careers@granulesindia.com';

export default function CareerOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Current Openings | Granules India Careers';

    const descriptionContent =
      'Explore career opportunities at Granules in pharma manufacturing, R&D, regulatory affairs, quality assurance, and global supply chain.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    window.scrollTo(0, 0);
  }, []);

  // Unique options for each dropdown
  const designationOptions = useMemo(() => {
    const set = new Set(ALL_JOBS.map((j) => j.designation));
    return ['ALL', ...Array.from(set)];
  }, []);

  const departmentOptions = useMemo(() => {
    const set = new Set(ALL_JOBS.map((j) => j.department));
    return ['ALL', ...Array.from(set)];
  }, []);

  const levelOptions = useMemo(() => {
    const set = new Set(ALL_JOBS.map((j) => j.level));
    return ['ALL', ...Array.from(set)];
  }, []);

  const locationOptions = useMemo(() => {
    const set = new Set(ALL_JOBS.map((j) => j.location));
    return ['ALL', ...Array.from(set)];
  }, []);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return ALL_JOBS.filter((job) => {
      const matchesSearch =
        !searchQuery.trim() ||
        job.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDesignation =
        selectedDesignation === 'ALL' || job.designation === selectedDesignation;

      const matchesDepartment =
        selectedDepartment === 'ALL' || job.department === selectedDepartment;

      const matchesLevel = selectedLevel === 'ALL' || job.level === selectedLevel;

      const matchesLocation =
        selectedLocation === 'ALL' || job.location === selectedLocation;

      return (
        matchesSearch &&
        matchesDesignation &&
        matchesDepartment &&
        matchesLevel &&
        matchesLocation
      );
    });
  }, [
    searchQuery,
    selectedDesignation,
    selectedDepartment,
    selectedLevel,
    selectedLocation,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedDesignation !== 'ALL' ||
    selectedDepartment !== 'ALL' ||
    selectedLevel !== 'ALL' ||
    selectedLocation !== 'ALL';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDesignation('ALL');
    setSelectedDepartment('ALL');
    setSelectedLevel('ALL');
    setSelectedLocation('ALL');
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <a href="/">HOME</a>
        <span className="sep">›</span>
        <a href="/careers">CAREERS</a>
        <span className="sep">›</span>
        <span className="current">CAREER OPPORTUNITIES</span>
      </p>
      <h1 className="cp-page-title">Explore Career Opportunities</h1>

      <div className="car-hero-photo">
        <img src={`${A}hero-photo.png`} alt="Granules India employees in a modern pharmaceutical facility" />
        <div className="overlay" />
      </div>

      <div className="car-opp-container">
        {/* Intro sentence matching reference design */}
        <div className="car-opp-headline-wrap">
          <p className="car-opp-headline-text">
            <strong>Every role at Granules contributes to improving the quality of lives globally.</strong>{' '}
            <span>
              Whether you&rsquo;re launching your career or looking for your next challenge,
              you&rsquo;ll work with a team driven by innovation, science, and purpose.
            </span>
          </p>
        </div>

        {/* 5 Filter Controls in One Row matching reference */}
        <div className="car-filter-bar" role="search" aria-label="Filter job openings">
          {/* Search Input */}
          <div className="car-filter-item car-filter-search">
            <svg
              className="car-filter-search-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="car-filter-input"
              placeholder="SEARCH"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search job openings by keyword"
            />
          </div>

          {/* Designation Dropdown */}
          <div className="car-filter-item car-filter-select-wrap">
            <select
              className="car-filter-select"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              aria-label="Filter by Designation"
            >
              <option value="ALL">DESIGNATION</option>
              {designationOptions
                .filter((d) => d !== 'ALL')
                .map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
            <svg
              className="car-filter-chevron"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Department Dropdown */}
          <div className="car-filter-item car-filter-select-wrap">
            <select
              className="car-filter-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              aria-label="Filter by Department"
            >
              <option value="ALL">DEPARTMENT</option>
              {departmentOptions
                .filter((d) => d !== 'ALL')
                .map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
            <svg
              className="car-filter-chevron"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Level Dropdown */}
          <div className="car-filter-item car-filter-select-wrap">
            <select
              className="car-filter-select"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              aria-label="Filter by Level / Experience"
            >
              <option value="ALL">LEVEL</option>
              {levelOptions
                .filter((l) => l !== 'ALL')
                .map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
            </select>
            <svg
              className="car-filter-chevron"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Location Dropdown */}
          <div className="car-filter-item car-filter-select-wrap">
            <select
              className="car-filter-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              aria-label="Filter by Location"
            >
              <option value="ALL">LOCATION</option>
              {locationOptions
                .filter((loc) => loc !== 'ALL')
                .map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
            </select>
            <svg
              className="car-filter-chevron"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Active Filters Reset Pill */}
        {hasActiveFilters && (
          <div className="car-filter-reset-wrap">
            <span>Showing {filteredJobs.length} openings</span>
            <button type="button" className="car-filter-reset-btn" onClick={clearFilters}>
              Reset Filters &#10005;
            </button>
          </div>
        )}

        {/* Current Openings Table / List */}
        <div className="car-openings-list" aria-label="Current Job Openings">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <article className="car-opening-row" key={job.id}>
                <div className="car-col-designation">
                  <span className="car-cell-title">{job.designation}</span>
                </div>
                <div className="car-col-department">
                  <span className="car-cell-text">{job.department}</span>
                </div>
                <div className="car-col-level">
                  <span className="car-cell-text">{job.level}</span>
                </div>
                <div className="car-col-location">
                  <span className="car-cell-text">{job.location}</span>
                </div>
                <div className="car-col-action">
                  <button
                    type="button"
                    className="car-btn-apply-now"
                    onClick={() => setSelectedJob(job)}
                    aria-label={`Apply for ${job.designation} in ${job.department}`}
                  >
                    APPLY NOW
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="car-no-jobs">
              <p>No job openings match your selected filters.</p>
              <button type="button" className="car-btn-apply-now" onClick={clearFilters}>
                View All Openings
              </button>
            </div>
          )}
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
            contribute, and grow.
          </p>
        </div>
        <Link className="car-cta-apply-btn" to="/careers/life-at-granules">
          Learn More About Life at Granules &rarr;
        </Link>
      </div>

      <div className="car-opp-back-row">
        <Link className="car-opp-back-link" to="/careers">
          Back to Careers Overview &rarr;
        </Link>
      </div>

      <div className="car-opp-match">
        <h2>Don&rsquo;t See a Match?</h2>
        <p>
          We are always looking for talented people to make a meaningful impact with their skills.
          If none of our current openings match your interests, you can still share your profile
          with us. We&rsquo;ll get in touch when the right role comes up.
        </p>
        <a
          className="car-opp-apply-btn"
          href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent('Resume Submission - General Application')}`}
        >
          Submit Your Resume
        </a>
      </div>

      {/* Interactive Application Modal */}
      {selectedJob && (
        <div className="car-modal-backdrop" onClick={() => setSelectedJob(null)}>
          <div
            className="car-modal-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="car-modal-job-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="car-modal-close"
              onClick={() => setSelectedJob(null)}
              aria-label="Close"
            >
              &#10005;
            </button>

            <div className="car-modal-badges">
              <span className="car-modal-tag">{selectedJob.department}</span>
              <span className="car-modal-tag location-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {selectedJob.location}
              </span>
              <span className="car-modal-tag exp-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                {selectedJob.level}
              </span>
              <span className="car-modal-tag">{selectedJob.type || 'Full-time'}</span>
            </div>

            <h3 id="car-modal-job-title">{selectedJob.designation}</h3>

            <p className="car-modal-info">{selectedJob.description}</p>

            {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
              <div className="car-modal-section">
                <h4 className="car-modal-section-title">Key Responsibilities</h4>
                <ul className="car-modal-list">
                  {selectedJob.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedJob.qualifications && selectedJob.qualifications.length > 0 && (
              <div className="car-modal-section">
                <h4 className="car-modal-section-title">Qualifications &amp; Requirements</h4>
                <ul className="car-modal-list">
                  {selectedJob.qualifications.map((qual, i) => (
                    <li key={i}>{qual}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="car-modal-apply-card">
              <p style={{ margin: 0, lineHeight: 1.5 }}>
                To apply for this opening, email your resume to <strong>{CAREERS_EMAIL}</strong> with the subject line:{' '}
                <em>&ldquo;Application: {selectedJob.designation} &ndash; {selectedJob.department}&rdquo;</em>.
              </p>
            </div>

            <div className="car-modal-actions">
              <a
                className="car-btn-apply-now"
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${selectedJob.designation} - ${selectedJob.department}`)}&body=${encodeURIComponent(`Dear Granules Talent Acquisition Team,\n\nI would like to apply for the position of ${selectedJob.designation} (${selectedJob.department}) in ${selectedJob.location}.\n\nPlease find attached my resume for your consideration.\n\nBest regards,`)}`}
              >
                APPLY VIA EMAIL &rarr;
              </a>
              <button
                type="button"
                className="car-modal-cancel-btn"
                onClick={() => {
                  navigator.clipboard.writeText(CAREERS_EMAIL);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2500);
                }}
              >
                {copied ? 'EMAIL COPIED! \u2713' : 'COPY HR EMAIL'}
              </button>
              <button type="button" className="car-modal-cancel-btn" onClick={() => setSelectedJob(null)}>
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

<<<<<<< Updated upstream
import { useEffect } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> Stashed changes
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

<<<<<<< Updated upstream
const FILTERS = ['Designation', 'Department', 'Level', 'location'];

const JOBS = [
  { title: 'Analyst', dept: 'Regulatory affairs', exp: '3+ Year', location: 'Hyderabad, India' },
  { title: 'Analyst', dept: 'Formulation Analytical R&D', exp: '3+ Year', location: 'Hyderabad, India' },
];

export default function CareerOpportunitiesPage() {
=======
const CAREERS_EMAIL = 'careers@granulesindia.com';

interface JobRole {
  id: number;
  title: string;
  location: string;
  experience: string;
  description: string;
}

const openRoles: JobRole[] = [
  {
    id: 1,
    title: 'Analyst – Regulatory Affairs',
    location: 'Hyderabad, India',
    experience: '3+ years',
    description:
      'Coordinate and compile regulatory dossiers for global submissions. Requires strong knowledge of international regulations and hands-on documentation experience for APIs and formulations.',
  },
  {
    id: 2,
    title: 'Analyst – Formulation Analytical R&D',
    location: 'Hyderabad, India',
    experience: '3+ years',
    description:
      'Work on analytical method development and validation for formulations. Role involves handling instruments, interpreting data, and meeting regulatory standards.',
  },
];

export default function CareerOpportunitiesPage() {
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);

>>>>>>> Stashed changes
  useEffect(() => {
    document.title = 'Current Openings at Granules | Careers in Pharma & Healthcare Innovation';

    const descriptionContent =
      'Explore jobs at Granules in pharma manufacturing, R&D, regulatory affairs, ESG, and more. Apply today and build a purpose-driven career.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Career Opportunities</span>
      </p>
<<<<<<< Updated upstream
      <h1 className="cp-page-title">Career opportunities</h1>
=======
      <h1 className="cp-page-title">Explore Career Opportunities</h1>
>>>>>>> Stashed changes

      <div className="car-hero-photo">
        <img src={`${A}hero-photo.png`} alt="Granules India employees in a lab setting" />
        <div className="overlay" />
      </div>

<<<<<<< Updated upstream
      <div className="car-intro-row" style={{ justifyContent: 'flex-start' }}>
        <div className="car-intro-copy" style={{ maxWidth: 1184 }}>
          <p className="lede">
            Every role at Granules contributes to improving the quality of lives globally.
            Whether you&rsquo;re launching your career or <span className="muted">looking for your next challenge, you&rsquo;ll work with a team driven by innovation, science, and purpose.</span>
          </p>
        </div>
      </div>

      <div className="car-filters">
        <div className="car-filter-search">
          <img src={`${A}icon-search.svg`} alt="" />
          <span>Search</span>
        </div>
        {FILTERS.map((label) => (
          <div className="car-filter-pill" key={label}>
            <span>{label}</span>
            <img src={`${A}icon-dropdown.svg`} alt="" />
          </div>
        ))}
      </div>

      <div className="car-jobs">
        {JOBS.map((job, i) => (
          <div className="car-job-row" key={i}>
            <div className="car-job-info">
              <span>{job.title}</span>
              <span>{job.dept}</span>
              <span>{job.exp}</span>
              <span>{job.location}</span>
            </div>
            <a className="car-cta-btn" href="/#footer">Apply now</a>
          </div>
        ))}
      </div>

      <div className="car-pagination" style={{ marginTop: 40 }}>
        <button type="button" className="car-page-btn nav" aria-label="Previous page">
          <img src={`${A}pagination-left.svg`} alt="" />
        </button>
        {['01', '02', '....', '08'].map((p, i) => (
          <button type="button" key={p} className={`car-page-btn${i === 0 ? ' active' : ''}`}>{p}</button>
        ))}
        <button type="button" className="car-page-btn nav" aria-label="Next page">
          <img src={`${A}pagination-right.svg`} alt="" />
        </button>
      </div>

=======
      <div className="car-opp-container">
        <div className="car-opp-intro">
          <h2>Careers that make an impact</h2>
          <p className="lede">
            Every role at Granules contributes to improving the quality of lives globally. Whether
            you&rsquo;re launching your career or looking for your next challenge, you&rsquo;ll work
            with a team driven by innovation, science, and purpose.
          </p>
        </div>

        <h2 className="car-opp-section-heading">Open Roles</h2>

        <div className="car-opp-job-grid">
          {openRoles.map((job) => (
            <article className="car-opp-job-card" key={job.id}>
              <h3 className="car-opp-job-title">{job.title}</h3>
              <p className="car-opp-job-meta">
                <span>{job.location}</span>
                <span aria-hidden="true">&bull;</span>
                <span>{job.experience}</span>
              </p>
              <p className="car-opp-job-desc">{job.description}</p>
              <button type="button" className="car-opp-apply-btn" onClick={() => setSelectedJob(job)}>
                Read More
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Still exploring CTA - shared markup/CSS with CareerOverviewPage and LifeAtGranulesPage */}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <Link className="car-cta-btn" to="/careers/life-at-granules">Life at granules</Link>
      </div>

=======
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

      {/* Read More detail / apply dialog, reusing the existing car-modal-* markup */}
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
            <span className="car-modal-tag">Open Role</span>
            <h3 id="car-modal-job-title">{selectedJob.title}</h3>
            <p className="car-modal-sub">
              {selectedJob.location} &bull; {selectedJob.experience}
            </p>
            <p className="car-modal-info">{selectedJob.description}</p>
            <p className="car-modal-info">
              To apply, send your updated CV to <strong>{CAREERS_EMAIL}</strong> with the subject
              line <em>&ldquo;Application: {selectedJob.title}&rdquo;</em>.
            </p>
            <div className="car-modal-actions">
              <a
                className="car-opp-apply-btn"
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${selectedJob.title}`)}`}
              >
                Apply via Email
              </a>
              <button type="button" className="car-modal-cancel-btn" onClick={() => setSelectedJob(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

>>>>>>> Stashed changes
      <CompanyFooter />
    </div>
  );
}

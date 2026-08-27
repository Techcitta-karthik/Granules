import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

const FILTERS = ['Designation', 'Department', 'Level', 'location'];

const JOBS = [
  { title: 'Analyst', dept: 'Regulatory affairs', exp: '3+ Year', location: 'Hyderabad, India' },
  { title: 'Analyst', dept: 'Formulation Analytical R&D', exp: '3+ Year', location: 'Hyderabad, India' },
];

export default function CareerOpportunitiesPage() {
  useEffect(() => {
    document.title = 'Career Opportunities — Granules India';
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
      <h1 className="cp-page-title">Career opportunities</h1>

      <div className="car-hero-photo">
        <img src={`${A}hero-photo.png`} alt="Granules India employees in a lab setting" />
        <div className="overlay" />
      </div>

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
        <Link className="car-cta-btn" to="/careers/life-at-granules">Life at granules</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

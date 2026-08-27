import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

const GROW_ITEMS = [
  'Identify: Spotting high-potential talent early and placing them in meaningful roles.',
  'Develop: Offering structured programs, on-the job learning, and hands-on mentorship.',
  'Grow: Empowering role transitions, global mobility, and continuous upskilling.',
];

export default function CareerOverviewPage() {
  useEffect(() => {
    document.title = 'Careers at Granules — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Careers</span>
      </p>
      <h1 className="cp-page-title">Careers at Granules</h1>

      <div className="car-hero">
        <img src={`${A}hero-real.png`} alt="Granules India colleagues collaborating in a lab" />
      </div>

      <div className="car-intro-row">
        <div className="car-intro-copy">
          <p className="lede">
            Every career at Granules contributes to better health outcomes for millions worldwide.
            <span className="muted"> Whether you are formulating life-saving medicines, advancing regulatory frameworks, or scaling sustainable manufacturing, your work creates real impact.</span>
          </p>
          <p className="sub">
            You&rsquo;ll join a team that supports, challenges, and values what you bring. Be part of
            a culture that celebrates curiosity, encourages bold thinking, and puts people at the
            center of everything we do.
          </p>
        </div>
        <Link className="car-cta-btn" to="/careers/opportunities">Career Opportunities</Link>
      </div>

      <div className="car-why">
        <div className="car-why-head">
          <div className="car-why-copy">
            <span className="car-why-tag">Your Future at Granules</span>
            <h2>Why build your career at Granules?</h2>
            <p>We invest in building a capable, resilient, and future-ready workforce through</p>
          </div>
          <Link className="car-cta-btn" to="/careers/life-at-granules">Life at Granules</Link>
        </div>

        <div className="car-panels">
          <div className="car-panel">
            <div className="car-panel-image">
              <img src={`${A}panel-people-first.png`} alt="Granules India scientists reviewing work together" />
            </div>
            <div className="car-panel-copy">
              <h3>People First</h3>
              <p>
                Our teams bring passion, expertise, and integrity to every challenge. We create a
                work environment that is inclusive, secure, and built on mutual trust &mdash;
                because people power our progress.
              </p>
            </div>
          </div>

          <div className="car-panel reverse">
            <div className="car-panel-image">
              <img src={`${A}panel-grow-purpose.png`} alt="Granules India cleanroom technicians at work" />
            </div>
            <div className="car-panel-copy">
              <h3>Grow with Purpose</h3>
              <p>We believe in turning potential into progress through:</p>
              <div className="car-panel-list">
                {GROW_ITEMS.map((item) => (
                  <div className="car-panel-list-item" key={item}>
                    <img src={`${A}icon-check.svg`} alt="" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="car-panel">
            <div className="car-panel-image">
              <img src={`${A}panel-innovation.png`} alt="Granules India researcher examining a sample" />
            </div>
            <div className="car-panel-copy">
              <h3>Thrive in a Culture of Innovation</h3>
              <p>
                We keep our doors and minds open. No matter your title or function, your ideas are
                heard, your work is visible, and your creativity is welcome.
              </p>
            </div>
          </div>

          <div className="car-panel reverse">
            <div className="car-panel-image split">
              <div className="strip"><img src={`${A}panel-science-1.png`} alt="" /></div>
              <div className="main"><img src={`${A}panel-science-2.png`} alt="Granules India green science and sustainable manufacturing" /></div>
            </div>
            <div className="car-panel-copy">
              <h3>Driven by Science and Sustainability</h3>
              <p>
                Granules is advancing a future powered by green science, bio catalysts, and
                continuous manufacturing &mdash; all while minimising our carbon footprint.
                You&rsquo;ll be part of something bigger than yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="car-great-place">
        <div className="car-great-place-copy">
          <p>Together, we make Granules a great place to work.</p>
        </div>
        <div className="car-great-place-image">
          <img src={`${A}great-place-badge.png`} alt="Great Place To Work Certified" />
        </div>
      </div>

      <div className="car-cta-photo">
        <img className="bg" src={`${A}work-matters-bg.png`} alt="" />
        <div className="overlay" />
        <div className="car-cta-copy">
          <h2>A place where your work Matters</h2>
          <p>
            Step into a career with impact. Whether you&rsquo;re a scientist, operator, or
            strategist, your journey starts here.
          </p>
        </div>
        <a className="car-cta-btn" href="/#footer">Apply now</a>
      </div>

      <div className="car-practice">
        <h2>The Granules way &ndash; in practice</h2>
        <div className="car-practice-card">
          <img className="car-practice-icon" src={`${A}icon-reward.svg`} alt="" />
          <h3>Performing</h3>
          <p>
            Every role is tied to clear goals aligned with business objectives. Performance is
            measured fairly and rewarded consistently.
          </p>
        </div>
        <div className="car-practice-bar">
          <div className="car-practice-seg active" />
          <div className="car-practice-seg" />
          <div className="car-practice-seg" />
          <div className="car-practice-seg" />
          <div className="car-practice-seg" />
        </div>
      </div>

      <CompanyFooter />
    </div>
  );
}

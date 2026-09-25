import { Link } from 'react-router-dom';
import { asset } from './constants';

export default function LeadershipSection() {
  return (
    <section className="cp-leadership" aria-label="Leadership speaks">
      <h2>Leadership speaks</h2>

      <div className="cp-leadership-wrapper">
        <div className="cp-leadership-banner">
          <img
            src={asset('chair-pic.png?v=sharp_v4')}
            alt="Dr. Krishna Prasad Chigurupati"
            className="cp-leadership-banner-img"
            loading="eager"
            decoding="async"
          />
          <div className="cp-leadership-overlay-block">
            <div className="cp-quote-card">
              <div className="cp-quote-icon" aria-hidden="true">
                <svg width="38" height="28" viewBox="0 0 36 28" fill="#0061f8">
                  <path d="M0 16.5C0 7.387 6.188 0 15.188 0v6.188c-4.95 0-7.875 3.375-8.438 7.312h8.438V28H0V16.5zm20.812 0C20.812 7.387 27 0 36 0v6.188c-4.95 0-7.875 3.375-8.438 7.312H36V28H20.812V16.5z" />
                </svg>
              </div>
              <p className="cp-quote-text">
                At Granules, we believe that access to quality medicines is a fundamental right. Our
                commitment to innovation, quality and affordability enables us to serve global
                healthcare needs while staying true to our values.
              </p>
              <div className="cp-quote-author">
                <p className="cp-quote-name">Dr. Krishna Prasad Chigurupati</p>
                <p className="cp-quote-role">FOUNDER, CHAIRMAN &amp; MANAGING DIRECTOR</p>
              </div>
            </div>

            <Link className="cp-cta-btn" to="/company/leadership">
              MEET OUR TEAM
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

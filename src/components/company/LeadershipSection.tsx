import { asset } from './constants';

export default function LeadershipSection() {
  return (
    <section className="cp-leadership" aria-label="Leadership speaks">
      <h2>Leadership speaks</h2>
      <div className="cp-leadership-inner">
        <div className="cp-leadership-photo">
          <img src={asset('leadership-photo-main-2.webp')} alt="Dr. Krishna Prasad Chigurupati" loading="lazy" decoding="async" />
        </div>
        <div className="cp-quote-card">
          <p className="cp-quote-mark">&ldquo;</p>
          <p className="cp-quote-text">
            &ldquo;At Granules, we believe that access to quality medicines is a fundamental right. Our
            commitment to innovation, quality and affordability enables us to serve global
            healthcare needs while staying true to our values.&rdquo;
          </p>
          <div>
            <p className="cp-quote-name">Dr. Krishna Prasad Chigurupati</p>
            <p className="cp-quote-role">Founder, Chairman &amp; Managing Director</p>
          </div>
          <a className="cp-cta-btn" href="/company/leadership">MEET OUR TEAM</a>
        </div>
      </div>
    </section>
  );
}

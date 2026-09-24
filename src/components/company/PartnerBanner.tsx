import { Link } from 'react-router-dom';

export default function PartnerBanner() {
  return (
    <section className="partner-banner shell" aria-label="Ready to Partner">
      <div className="partner-banner-copy">
        <h2>Ready to Partner?</h2>
        <p>
          Leverage our end-to-end scale, global regulatory compliance, and formulation science to bring high-quality medicines to market faster.
        </p>
      </div>
      <Link to="/contact" className="partner-banner-btn">CONNECT WITH US</Link>
    </section>
  );
}

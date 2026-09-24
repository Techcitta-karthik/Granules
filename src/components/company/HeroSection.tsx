import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="cp-hero">
      <p className="cp-breadcrumb">
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/company">ABOUT US</Link>
        <span className="sep">›</span>
        <span className="current">OVERVIEW</span>
      </p>
      <h1 className="cp-page-title">Overview</h1>
      <div className="cp-hero-panel">
        <img
          src="/assets/company/hero-banner.jpg"
          alt="Granules pharmaceutical manufacturing with quality vials on a production line"
          loading="eager"
          decoding="async"
        />
        <div className="cp-hero-scrim" />
        <div className="cp-hero-overlay">
          <h2 className="cp-hero-heading">Built for Scale. Driven by Value.</h2>
        </div>
      </div>
    </section>
  );
}

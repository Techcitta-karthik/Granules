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
      <h1 className="cp-page-title">Built for Scale. Driven by Value.</h1>
      <div className="cp-hero-panel">
        <video
          src="/Video/cover-video.mp4"
          poster="/assets/oe/hero-banner.webp"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </section>
  );
}

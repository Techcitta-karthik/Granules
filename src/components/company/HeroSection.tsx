import { asset } from './constants';

export default function HeroSection() {
  return (
    <section className="cp-hero">
      <p className="cp-breadcrumb">
        <a href="/">HOMEPAGE</a>
        <span className="sep">›</span>
        <a href="/company">ABOUT US</a>
        <span className="sep">›</span>
        <span className="current">OVERVIEW</span>
      </p>
      <h1 className="cp-page-title">Overview</h1>
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
        <div className="cp-scroll-indicator">
          <img src={asset('scroll-down-icon.webp')} alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}

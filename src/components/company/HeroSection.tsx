import { asset } from './constants';

export default function HeroSection() {
  return (
    <section className="cp-hero">
      <p className="cp-breadcrumb">
        <a href="/">HOMEPAGE</a>
        <span className="sep">›</span>
        <a href="/company">ABOUT US</a>
        <span className="sep">›</span>
        <span className="current">ABOUT US (OVERVIEW)</span>
      </p>
      <h1 className="cp-page-title">About us</h1>
      <div className="cp-hero-panel">
        <span className="cp-hero-badge">STOCK VIDEO</span>
        <div className="cp-scroll-indicator">
          <img src={asset('scroll-down-icon.webp')} alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}

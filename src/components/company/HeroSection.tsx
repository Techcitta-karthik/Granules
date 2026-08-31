import { asset } from './constants';

export default function HeroSection() {
  return (
    <section className="cp-hero">
      <div className="cp-hero-inner">
        <p className="cp-breadcrumb">
          <span>HOMEPAGE</span>
          <span className="sep">›</span>
          <span>ABOUT US</span>
          <span className="sep">›</span>
          <span className="current">ABOUT US (OVERVIEW)</span>
        </p>
        <h1 className="cp-page-title">About us</h1>
        <div className="cp-hero-panel">
          <span className="cp-hero-badge">STOCK VIDEO</span>
          <div className="cp-scroll-indicator">
            <img src={asset('scroll-down-icon.png')} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

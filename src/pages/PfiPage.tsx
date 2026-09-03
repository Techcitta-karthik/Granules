import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';

const P = '/assets/pfi/';

type FocusCard = {
  title: string;
  image: string | null;
  desc: string;
};

const FOCUS_AREAS: FocusCard[] = [
  {
    title: 'Scaling Operational Throughput',
    image: null,
    desc: 'High-speed automated direct compression minimizing downtime and accelerating output.',
  },
  {
    title: 'Enhancing Customer Efficiency',
    image: 'card-customer-efficiency.png',
    desc: 'Proprietary Drum-to-Hopper model reduces processing steps and streamlines plant footprint.',
  },
  {
    title: 'Delivering End-To-End Formulation Value',
    image: null,
    desc: 'Customized multi-particulate and fixed-dose combinations engineered for precise release.',
  },
  {
    title: 'Expanding Global Reach and Impact',
    image: 'card-global-reach.png',
    desc: 'Serving pharma partners across 80+ countries with regulatory-aligned, scalable intermediates.',
  },
];

type BenefitItem = { title: string; body: string; icon: string; image?: string };

const BENEFITS: BenefitItem[] = [
  {
    title: 'Unmatched Scale and Reliability',
    body: 'Backward integrated and high-volume manufacturing assures consistent quality, dependable supply, and efficient commercial-scale production.',
    icon: 'icon-manufacturing.svg',
    image: '/assets/pfi/key-benefits-bg.png',
  },
  {
    title: 'Simplifying Supply Chain Complexity',
    body: 'Our proprietary “Drum to Hopper” model enables direct compression with minimal development effort, helping customers streamline supply chain steps and inventory pressure',
    icon: 'icon-box.svg',
    image: '/assets/pfi/cta-bg.png',
  },
  {
    title: 'Supporting Asset-Light Market Entry',
    body: 'PFIs replicate more than 80% of the infrastructure required in a conventional oral solid dosage facility, reducing the need for significant capital investment.',
    icon: 'icon-production-belt.svg',
    image: '/assets/facilities/bonthapally-2.png',
  },
  {
    title: 'Customized Formulation Solutions',
    body: 'Tailor-made PFIs support complex formulations, fixed-dose combinations, and homogeneous blending with other APIs.',
    icon: 'icon-test-tube.svg',
    image: '/assets/qc/hero-banner.png',
  },
  {
    title: 'Global Regulatory Adaptability',
    body: 'With approvals from global regulatory authorities, our PFI platform can be tailored to meet market-specific regulatory requirements across global markets.',
    icon: 'icon-circles.svg',
    image: '/assets/api/scale-bg.png',
  },
];

export default function PfiPage() {
  const {
    swipeProps,
    isDragging,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
  } = useSwipeScroll();
  const [openCard, setOpenCard] = useState(-1);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    document.title = 'Pharmaceutical Formulation Intermediates — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Business</span>
        <span className="sep">{'>'}</span>
        <span className="current">Pharmaceutical Formulation Intermediates</span>
      </p>
      <h1 className="cp-page-title">Pharmaceutical Formulation Intermediates</h1>
      <div className="cp-hero-banner">
        <img src={`${P}key-benefits-bg.png`} alt="Granules PFI manufacturing facility" />
        <div className="pfi-hero-scrim" />
        <div className="pfi-hero-overlay">
          <h2 className="pfi-hero-heading">Simplifying Formulation. Accelerating Access.</h2>
        </div>
      </div>

      <div className="biz-intro">
        <p>
          Granules India is a global pioneer in Pharmaceutical Formulation Intermediates
          (PFIs), delivering scalable, cost-effective solutions that simplify complexity and
          accelerate manufacturing for oral solid dosage forms. Our proprietary &ldquo;Drum to
          Hopper&rdquo; model enables direct compression with minimal development effort,
          allowing customers to accelerate production, reduce manufacturing complexity, and
          avoid infrastructure-intensive setups. Supported by six-tonne batch capacity and a
          presence across more than 80 countries, Granules is the world&rsquo;s largest PFI
          manufacturer by volume.
        </p>
        <p>
          Our PFIs support a broad spectrum of chronic and acute therapies, including
          fixed-dose combinations, and are tailored to meet market-specific regulatory
          requirements.
        </p>
      </div>

      <div className="biz-section-head">
        <div className="copy">
          <span className="cp-section-badge">Focus Areas</span>
          <h2>Our focus areas in PFI excellence</h2>
        </div>
      </div>

      <div className="biz-carousel">
        <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
          {FOCUS_AREAS.map((card, idx) => {
            const isOpenCard = openCard === idx;
            return (
              <article
                className={`biz-card${card.image ? '' : ' biz-card--placeholder'}${isOpenCard ? ' is-open' : ''}`}
                key={card.title}
                onMouseEnter={() => setOpenCard(idx)}
                onMouseLeave={() => setOpenCard(-1)}
                onClick={() => setOpenCard(isOpenCard ? -1 : idx)}
              >
                {card.image && <img className="bg" src={`${P}${card.image}`} alt={card.title} />}
                <div className="biz-sheet">
                  <div className="biz-sheet-head">
                    <span className="biz-sheet-title">{card.title}</span>
                    <span className="biz-sheet-symbol" aria-hidden="true">+</span>
                  </div>
                  <div className="biz-sheet-body">
                    <p className="biz-sheet-desc">{card.desc}</p>
                    <span className="biz-sheet-learn">LEARN MORE ↗</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dynamic progress bar and smooth arrow navigation */}
        <div className="biz-carousel-controls">
          <div className="biz-progress-track">
            <div
              className="biz-progress-bar"
              style={{
                width: `${thumbWidth}%`,
                left: `${scrollProgress * (100 - thumbWidth)}%`,
              }}
            />
          </div>
          <div className="biz-carousel-arrows">
            <button
              type="button"
              className="biz-arrow-btn"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              className="biz-arrow-btn"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="biz-panel">
        <img
          className="bg"
          src={
            open >= 0 && BENEFITS[open]?.image
              ? BENEFITS[open].image
              : BENEFITS[0].image
          }
          alt=""
        />
        <div className="overlay" />
        <div className="biz-panel-grid">
          <div className="biz-panel-head">
            <h2>Key benefits of our PFI model</h2>
          </div>
          <div className="biz-accordion">
            {BENEFITS.map((item, index) => {
              const isOpen = open === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  className={`biz-accordion-item${isOpen ? '' : ' collapsed'}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <div className="biz-accordion-head">
                    <div className="biz-accordion-icon-row">
                      <span className="biz-accordion-icon">
                        <img src={`${P}${item.icon}`} alt="" />
                      </span>
                      <p className="biz-accordion-title">{item.title}</p>
                    </div>
                    <span className="biz-accordion-toggle">
                      <img src={`${P}${isOpen ? 'icon-minus.svg' : 'icon-plus.svg'}`} alt={isOpen ? 'Collapse' : 'Expand'} />
                    </span>
                  </div>
                  {isOpen && <p className="biz-accordion-body">{item.body}</p>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="biz-cta">
        <img className="bg" src={`${P}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="biz-cta-copy">
          <h2>Explore our full PFI product portfolio</h2>
        </div>
        <a className="cp-cta-btn" href="/business/fd">View Product List</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

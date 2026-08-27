import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';

const A = '/assets/api/';

const THERAPEUTIC_AREAS = [
  { label: 'Anti-inflammatories', icon: 'icon-anti-inflammatories.svg' },
  { label: 'Anti-diabetics', icon: 'icon-anti-diabetics.svg' },
  { label: 'CNS (Central Nervous System)', icon: 'icon-cns.svg' },
  { label: 'Anti-infectives', icon: 'icon-anti-infectives.svg' },
  { label: 'Analgesics', icon: 'icon-analgesics.svg' },
  { label: 'Oncology', icon: 'icon-oncology.svg' },
  { label: 'Anti-histamines', icon: 'icon-anti-histamines.svg' },
  { label: 'Anti-coagulants', icon: 'icon-anti-coagulants.svg' },
  { label: 'Anti-retrovirals', icon: 'icon-anti-retrovirals.svg' },
  { label: 'Anti-hypertensives', icon: 'icon-anti-hypertensives.svg' },
];

type ScaleItem = { title: string; body: string; icon: string; image?: string | null };

const SCALE_ITEMS: ScaleItem[] = [
  {
    title: '40,000+ TPA Installed Capacity',
    body: 'The installed capacity spans four locations in Hyderabad and Vizag, totaling over 40,000 TPA.',
    icon: 'icon-capacity.svg',
    image: 'scale-bg.png',
  },
  {
    title: 'Automation with DCS',
    body: 'Distributed Control Systems (DCS) minimize human error and optimize consistency',
    icon: 'icon-manufacturing.svg',
    image: null,
  },
  {
    title: 'Global Market Presence',
    body: 'Proven ability to serve 80+ countries across regulated markets.',
    icon: 'icon-globe.svg',
    image: null,
  },
];

export default function ApiPage() {
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    document.title = 'Active Pharmaceutical Ingredients — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const activeImage = (open >= 0 && SCALE_ITEMS[open]?.image) ? `${A}${SCALE_ITEMS[open].image}` : (SCALE_ITEMS[0]?.image ? `${A}${SCALE_ITEMS[0].image}` : null);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Business</span>
        <span className="sep">{'>'}</span>
        <span className="current">Active Pharmaceutical Ingredients</span>
      </p>
      <h1 className="cp-page-title">Active pharmaceutical ingredients</h1>
      <div className="cp-hero-banner">
        <img src={`${A}hero-banner.png`} alt="Granules API manufacturing facility" />
      </div>

      <div className="biz-intro">
        <p>
          We are a globally trusted API manufacturer, delivering both high-volume and niche APIs
          across regulated and semi-regulated markets. Our product range includes legacy products
          such as{' '}
          <span className="muted">Paracetamol, Metformin, Guaifenesin, and Methocarbamol, alongside a growing portfolio of complex molecules/non-legacy products.</span>
        </p>
      </div>

      <div className="biz-section-head">
        <div className="copy">
          <h2>Global reach, therapeutic expertise</h2>
          <p>
            We address diverse chronic and acute conditions with a strong portfolio of therapies,
            ensuring reliable, high-quality solutions for patients worldwide.
          </p>
        </div>
        <a className="cp-cta-btn" href="/business/api">View Product List</a>
      </div>

      <div className="biz-tag-grid">
        {THERAPEUTIC_AREAS.map((area) => (
          <div className="biz-tag" key={area.label}>
            <img src={`${A}${area.icon}`} alt="" />
            <span>{area.label}</span>
          </div>
        ))}
      </div>

      <div className="biz-panel">
        {activeImage && <img className="bg" src={activeImage} alt="" />}
        <div className="overlay" />
        <div className="biz-panel-grid">
          <div className="biz-panel-head">
            <h2>Delivering scale with reliability and reach</h2>
            <p>
              With strong infrastructure and regulatory alignment, we deliver APIs at scale to
              meet global healthcare demands:
            </p>
          </div>
          <div className="biz-accordion">
            {SCALE_ITEMS.map((item, index) => {
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
                        <img src={`${A}${item.icon}`} alt="" />
                      </span>
                      <p className="biz-accordion-title">{item.title}</p>
                    </div>
                    <span className="biz-accordion-toggle">
                      <img src={`${A}${isOpen ? 'icon-minus.svg' : 'icon-plus.svg'}`} alt={isOpen ? 'Collapse' : 'Expand'} />
                    </span>
                  </div>
                  {isOpen && item.body && <p className="biz-accordion-body">{item.body}</p>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="biz-cta biz-cta--placeholder">
        <div className="biz-cta-copy">
          <h2>Let&rsquo;s build long-term, scalable API partnerships.</h2>
        </div>
        <a className="cp-cta-btn" href="/business/api">View Product List</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

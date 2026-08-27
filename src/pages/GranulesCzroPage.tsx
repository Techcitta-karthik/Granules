import { useEffect, useRef, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './czro.css';

const C = '/assets/czro/';

type CapabilityCard = { title: string; image: string };

const CAPABILITIES: CapabilityCard[] = [
  { title: 'Green Molecules at the Core', image: 'card-green-molecules.png' },
  { title: '24/7 Carbon-Free Energy', image: 'card-carbon-free.png' },
  { title: 'Circular Economy by Design', image: 'card-circular-economy.png' },
  { title: 'Vertically Integrated Manufacturing', image: 'card-vertically-integrated.png' },
  { title: 'Advanced Technologies', image: 'card-advanced-tech.png' },
];

type FacilityItem = { title: string; body: string; tags?: string[] };

const FACILITIES: FacilityItem[] = [
  {
    title: 'Pilot Plant – Visakhapatnam',
    body: 'A pilot plant in Visakhapatnam, launched in 2024, has demonstrated the commercial viability of zero-carbon API production.',
  },
  {
    title: 'Greenfield Facility in Kakinada',
    body: 'A 100-acre Integrated Green Pharmaceutical Zone is being developed in Kakinada, Andhra Pradesh.',
    tags: ['Use renewable energy', 'Create emissions-free APIs & KSMs', 'Reduce reliance on external resources', 'Meet decarbonisation goals'],
  },
];

function FacilityAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="czro-accordion">
      {FACILITIES.map((item, index) => {
        const isOpen = open === index;
        return (
          <button
            key={item.title}
            type="button"
            className="czro-accordion-item"
            onClick={() => setOpen(isOpen ? -1 : index)}
          >
            <div className="czro-accordion-head">
              <div className="czro-accordion-icon-row">
                <span className="czro-accordion-icon">
                  <img src={`${C}icon-building.svg`} alt="" />
                </span>
                <p className="czro-accordion-title">{item.title}</p>
              </div>
              <span className="czro-accordion-toggle">
                <img src={`${C}${isOpen ? 'icon-minus.svg' : 'icon-plus.svg'}`} alt="" />
              </span>
            </div>
            {isOpen && (
              <>
                <p className="czro-accordion-body">{item.body}</p>
                {item.tags && (
                  <div className="czro-tags">
                    {item.tags.map((tag) => (
                      <span className="czro-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function GranulesCzroPage() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Granules CZRO — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const scroll = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 500, behavior: 'smooth' });
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Company</span>
        <span className="sep">{'>'}</span>
        <span className="current">Granules CZRO</span>
      </p>
      <h1 className="cp-page-title">Granules CZRO</h1>
      <div className="czro-hero-wrap">
        <div className="cp-hero-banner">
          <img src={`${C}hero-banner.png`} alt="Granules CZRO facility" />
        </div>
        <span className="czro-badge">
          <img src={`${C}brandmark-1.svg`} alt="G-CZRO" />
        </span>
      </div>

      <div className="czro-intro">
        <p>
          At Granules CZRO, we are reshaping how the world manufactures medicines. As a wholly
          owned subsidiary of Granules India, CZRO&rsquo;s mission is ambitious: achieve near-zero
          <span className="muted"> emissions across the pharmaceutical value chain—from raw materials to finished APIs.</span>
        </p>
        <p>
          By combining cutting-edge green chemistry, 24/7 renewable energy, and circular
          manufacturing principles, we are tackling the industry&rsquo;s toughest challenge—reducing
          Scope 3 emissions, which account for over 80% of pharma&rsquo;s carbon footprint.
        </p>
      </div>

      <div className="czro-section-head">
        <div className="copy">
          <span className="cp-section-badge">Our Capabilities</span>
          <h2>Technology. Integration. Impact</h2>
          <p>
            Building sustainability into every process, we integrate green molecules, renewable
            energy, and advanced technologies to minimize emissions and maximize efficiency.
          </p>
        </div>
        <a className="cp-cta-btn" href="/sustainability/strategy">Sustainability Strategy</a>
      </div>

      <div className="czro-carousel">
        <div className="czro-track" ref={trackRef}>
          {CAPABILITIES.map((card) => (
            <article className="czro-card" key={card.title}>
              <img className="bg" src={`${C}${card.image}`} alt="" />
              <div className="czro-card-label">
                <span>{card.title}</span>
                <span className="czro-card-arrow">
                  <img src={`${C}arrow-plus.svg`} alt="" style={{ width: 20, height: 20 }} />
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="czro-carousel-nav">
          <button type="button" aria-label="Scroll left" onClick={() => scroll(-1)}>
            <img src={`${C}carousel-arrow-left.svg`} alt="" />
          </button>
          <button type="button" aria-label="Scroll right" onClick={() => scroll(1)}>
            <img src={`${C}carousel-arrow-right.svg`} alt="" />
          </button>
        </div>
      </div>

      <div className="czro-facility">
        <img className="bg" src={`${C}facility-kakinada-bg.png`} alt="" />
        <div className="overlay" />
        <div className="czro-facility-grid">
          <div className="czro-facility-head">
            <span className="cp-section-badge" style={{ background: '#d9f4dd', color: '#197b0c', alignSelf: 'flex-start' }}>Facility &amp; Progress</span>
            <h3>Granules CZRO Private Limited</h3>
            <p>
              Granules CZRO Private Limited (G-CZRO) was established to accelerate Granules
              India&rsquo;s sustainability transformation through green chemical production and
              climate-conscious manufacturing.
            </p>
          </div>
          <FacilityAccordion />
        </div>
      </div>

      <div className="czro-partnership">
        <div className="czro-partnership-copy">
          <h3>Strategic partnerships for a cleaner future</h3>
          <p>
            In partnership with Greenko, we are building India&rsquo;s first net-zero
            pharmaceutical zone that integrates renewable energy infrastructure, green molecule
            synthesis, and circular chemistry. This collaboration sets a new benchmark for
            climate-conscious drug manufacturing designed in India, delivered to the world.
          </p>
        </div>
        <div className="czro-partnership-image">
          <img className="bg" src={`${C}partnership-bg.png`} alt="" />
          <img className="logo" src={`${C}greenko-logo.png`} alt="Greenko" />
        </div>
      </div>

      <div className="czro-cta">
        <img className="bg" src={`${C}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="czro-cta-copy">
          <h2>Driving impact beyond CZRO</h2>
          <p>
            Discover the strategy powering our transition to a net-zero, circular, and
            future-ready pharmaceutical ecosystem.
          </p>
        </div>
        <a className="cp-cta-btn" href="/#sustainability">Sustainability</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

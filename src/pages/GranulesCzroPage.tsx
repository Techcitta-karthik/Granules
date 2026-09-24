import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './czro.css';

const C = '/assets/czro/';

type CapabilityCard = { title: string; image: string; desc: string };

const CAPABILITIES: CapabilityCard[] = [
  {
    title: 'Green Molecules at the Core',
    image: 'card-green-molecules.png',
    desc: 'Producing vital chemicals like green hydrogen, ammonia, nitric acid, and methanol from renewable resources, water, air, and captured CO₂, replacing fossil fuel-based feedstocks.',
  },
  {
    title: '24/7 Carbon-Free Energy',
    image: 'card-carbon-free.png',
    desc: 'Manufacturing operates entirely on renewable energy sourced from solar, wind, and pumped hydro storage, ensuring zero operational emissions.',
  },
  {
    title: 'Circular Economy by Design',
    image: 'card-circular-economy.png',
    desc: 'By reusing by-products and minimising waste, we close the loop on chemical manufacturing, reducing environmental impact and conserving resources. Leveraging the CZRO platform, we collaborate with suppliers to decarbonize these inputs and embed sustainability across the entire product lifecycle.',
  },
  {
    title: 'Vertically Integrated Manufacturing',
    image: 'card-vertically-integrated.png',
    desc: 'We produce APIs and their Key Starting Materials (KSMs) on-site, dramatically reducing reliance on external inputs and cutting Scope 3 emissions.',
  },
  {
    title: 'Advanced Technologies',
    image: 'card-advanced-tech.png',
    desc: 'Utilising bio-catalysis and continuous flow systems, we enhance production efficiency while lowering energy consumption and carbon emissions.',
  },
];

type FacilityItem = { title: string; body: string; tags?: string[] };

const FACILITIES: FacilityItem[] = [
  {
    title: 'Greenfield Facility in Kakinada',
    body: 'A 100-acre Integrated Green Pharmaceutical Zone (GPZ) is under development in Kakinada, Andhra Pradesh, designed to:',
    tags: [
      'Operate on round-the-clock renewable energy',
      'Produce APIs, intermediates, and KSMs without carbon emissions',
      'Minimise reliance on external inputs and natural resources',
      'Achieve Scope 1, 2, and 3 decarbonisation targets',
    ],
  },
  {
    title: 'Pilot Plant – Visakhapatnam',
    body: 'Our model is already in motion. A pilot plant in Visakhapatnam, launched in 2024, has demonstrated the commercial viability of zero-carbon API production.',
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

  useEffect(() => {
    document.title = 'Granules CZRO — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/company">ABOUT US</Link>
        <span className="sep">›</span>
        <Link to="/company/global-subsidiaries">GLOBAL SUBSIDIARIES</Link>
        <span className="sep">›</span>
        <span className="current">GRANULES CZRO</span>
      </p>
      <h1 className="cp-page-title">Granules CZRO</h1>
      <div className="czro-hero-wrap">
        <div className="cp-hero-banner">
          <img src={`${C}hero-banner.png`} alt="Granules CZRO facility" />
          <div className="czro-hero-scrim" />
          <div className="czro-hero-overlay">
            <h2 className="czro-hero-heading">Reimagining Pharma for a Carbon-Free Future</h2>
          </div>
        </div>
        <span className="czro-badge">
          <img src={`${C}brandmark-1.svg`} alt="G-CZRO" />
        </span>
      </div>

      <div className="czro-intro">
        <p>
          At Granules CZRO, we are reshaping how the world manufactures medicines. As a wholly
          owned subsidiary of Granules India, CZRO&rsquo;s mission is ambitious: achieve near-zero
          <span className="muted"> emissions across the pharmaceutical value chain, from raw materials to finished APIs.</span>
        </p>
        <p>
          By combining cutting-edge green chemistry, 24/7 renewable energy, and circular
          manufacturing principles, we are tackling the industry&rsquo;s toughest challenge of
          reducing Scope 3 emissions, which account for over 80% of pharma&rsquo;s carbon footprint.
        </p>
      </div>

      {/* Facility & Progress Section Pulled Up */}
      <div className="czro-facility">
        <img className="bg" src={`${C}facility-kakinada-bg.png`} alt="" />
        <div className="overlay" />
        <div className="czro-facility-grid">
          <div className="czro-facility-head">
            <span className="cp-section-badge" style={{ background: '#d9f4dd', color: '#197b0c', alignSelf: 'flex-start' }}>Facility &amp; Progress</span>
            <h3>Granules CZRO Private Limited (G-CZRO)</h3>
            <p>
              Granules CZRO Private Limited (G-CZRO) was established to accelerate Granules
              India&rsquo;s sustainability transformation through green chemical production and
              climate-conscious manufacturing.
            </p>
          </div>
          <FacilityAccordion />
        </div>
      </div>

      {/* Our Capabilities Section */}
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

      <div className="biz-carousel">
        <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
          {CAPABILITIES.map((card, idx) => {
            const isOpenCard = openCard === idx;
            return (
              <article
                className={`biz-card${isOpenCard ? ' is-open' : ''}`}
                key={card.title}
                onMouseEnter={() => setOpenCard(idx)}
                onMouseLeave={() => setOpenCard(-1)}
                onClick={() => setOpenCard(isOpenCard ? -1 : idx)}
              >
                <img className="bg" src={`${C}${card.image}`} alt={card.title} />
                <div className="biz-sheet">
                  <div className="biz-sheet-head">
                    <span className="biz-sheet-title">{card.title}</span>
                    <span className="biz-sheet-symbol" aria-hidden="true">+</span>
                  </div>
                  <div className="biz-sheet-body">
                    <p className="biz-sheet-desc">{card.desc}</p>
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

      {/* Strategic Partnerships Section */}
      <div className="czro-partnership">
        <div className="czro-partnership-copy">
          <h3>Strategic Partnerships for a Cleaner Future</h3>
          <p>
            In partnership with Greenko, we are building India&rsquo;s first net-zero
            pharmaceutical zone that integrates renewable energy infrastructure, green molecule
            synthesis, and circular chemistry. This collaboration sets a new benchmark for
            climate-conscious drug manufacturing that&rsquo;s designed in India, delivered to the world.
          </p>
        </div>
        <div className="czro-partnership-image">
          <img className="bg" src={`${C}partnership-bg.png`} alt="" />
          <img className="logo" src={`${C}greenko-logo.png`} alt="Greenko" />
        </div>
      </div>

      {/* CTA Section */}
      <div className="czro-cta">
        <img className="bg" src={`${C}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="czro-cta-copy">
          <h2>Driving Impact Beyond CZRO</h2>
          <p>
            Discover the strategy powering our transition to a net-zero, circular, and
            future-ready pharmaceutical ecosystem.
          </p>
        </div>
        <a className="cp-cta-btn" href="/sustainability/strategy">Know More</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

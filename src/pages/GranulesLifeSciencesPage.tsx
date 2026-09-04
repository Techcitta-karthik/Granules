import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';
import './gls.css';

const G = '/assets/gls/';

type CapabilityCard = { title: string; image: string; desc: string };

const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title: 'Automated Production',
    image: 'card-automated-production.png',
    desc: 'Advanced automated production lines and high-speed encapsulation delivering 10 billion oral solid dosages annually.',
  },
  {
    title: 'Lean Process Design',
    image: 'card-lean-process.png',
    desc: 'Optimized material flows, zero-defect quality systems, and shortened lead times for supplies into regulated markets.',
  },
  {
    title: 'Digital Oversight',
    image: 'card-digital-oversight.png',
    desc: 'Real-time batch tracking, digital quality control release, and continuous environmental and process monitoring.',
  },
];

const RESPONSIBILITY_ITEMS = [
  'Sustainable design & green manufacturing systems',
  'Energy-efficient systems & low-emission footprint',
  'Advanced safety protocols & workforce standards',
  'GMP-compliant infrastructure & USFDA approvals',
  'Advanced automation & high-throughput robotics',
  'Digital oversight & end-to-end quality assurance',
];

export default function GranulesLifeSciencesPage() {
  const [openCard, setOpenCard] = useState(-1);

  useEffect(() => {
    document.title = 'Granules Life Sciences | Pharmaceutical Manufacturing in India';

    const descriptionContent =
      'A state-of-the-art vertically integrated manufacturing facility in Genome Valley, Hyderabad, capable of producing 10 billion oral solid dosage units annually.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <a href="/">HOMEPAGE</a>
        <span className="sep">›</span>
        <a href="/company">COMPANY</a>
        <span className="sep">›</span>
        <span className="current">GRANULES LIFE SCIENCES</span>
      </p>
      <h2 className="gls-page-header">Engineered for the Future of Oral Solid Dosage Manufacturing</h2>
      <div className="cp-hero-banner">
        <img src={`${G}hero-banner.png`} alt="Granules Life Sciences facility" />
        <div className="api-hero-scrim" />
        <div className="api-hero-overlay">
          <a className="cp-cta-btn" href="/contact">Explore Partnership Opportunities</a>
        </div>
      </div>

      <div className="gls-intro">
        <p>
          <span>Granules Life Sciences (GLS) is a wholly owned subsidiary of Granules India, located in Genome Valley, Hyderabad. GLS is a state-of-the-art vertically integrated manufacturing facility capable of producing <strong>10 billion oral solid dosage (OSD) units annually</strong>, </span>
          <span className="muted">approved by the USFDA and with EU GMP certification underway.</span>
        </p>
        <p>
          Strategically designed layout in five acres of land to produce 10 billion oral solid dosages/annum, with additional 14 acres of land reserved for future expansion—ensuring we are equipped to meet growing global demand with speed, flexibility, and compliance. With advanced automation, GMP-compliant infrastructure, and green manufacturing systems at its core, GLS is built for precision, reliability, and sustained growth.
        </p>
      </div>

      <div className="gls-section">
        <div className="gls-section-head">
          <span className="cp-section-badge">Operational Excellence</span>
          <h2>High-Performance Formulation Manufacturing</h2>
          <p>
            With automated production lines, lean process design, and digital oversight, we deliver
            consistent quality with high throughput and shorter lead time for supplies into regulated markets.
          </p>
        </div>
        <div className="gls-cards-grid">
          {CAPABILITY_CARDS.map((card, idx) => {
            const isOpenCard = openCard === idx;
            return (
              <article
                className={`biz-card gls-card-fixed${isOpenCard ? ' is-open' : ''}`}
                key={card.title}
                onMouseEnter={() => setOpenCard(idx)}
                onMouseLeave={() => setOpenCard(-1)}
                onClick={() => setOpenCard(isOpenCard ? -1 : idx)}
              >
                <img className="bg" src={`${G}${card.image}`} alt={card.title} />
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
      </div>

      <div className="gls-culture">
        <img className="bg" src={`${G}culture-of-action-bg.png`} alt="" />
        <div className="overlay" />
        <div className="gls-culture-inner">
          <h3>Built for Long-Term Responsibility</h3>
          <div className="gls-culture-card">
            <p>
              Built for long-term responsibility, the site integrates sustainable design, energy-efficient
              systems, and advanced safety protocols, ensuring operational excellence without compromising
              environmental or workforce safety standards. GLS reflects our commitment to building a
              future-ready pharmaceutical supply chain.
            </p>
            <div className="gls-culture-list">
              {RESPONSIBILITY_ITEMS.map((item) => (
                <div className="gls-culture-list-item" key={item}>
                  <span className="gls-culture-bullet">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="4" fill="#0061f8" />
                    </svg>
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="gls-cta">
        <img className="bg" src={`${G}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="gls-cta-copy">
          <h2>Explore Our Finished Dosages Capabilities</h2>
          <p>
            Driving formulation-led growth through innovation, integration, and customer focus
            across global finished dosage operations.
          </p>
        </div>
        <a className="cp-cta-btn" href="/business/fd">Finished Dosages</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

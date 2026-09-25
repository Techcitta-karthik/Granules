import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';
import './gls.css';

const G = '/assets/gls/';

type CapabilityCard = { title: string; image: string; desc: string };

const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title: 'Automated Production',
    image: 'automated-production.jpg',
    desc: 'Advanced automated production lines and high-speed encapsulation delivering 10 billion oral solid dosages annually.',
  },
  {
    title: 'Lean Process Design',
    image: '43.webp',
    desc: 'Optimized material flows, zero-defect quality systems, and shortened lead times for supplies into regulated markets.',
  },
  {
    title: 'Digital Oversight',
    image: 'card-digital-oversight.png',
    desc: 'Real-time batch tracking, digital quality control release, and continuous environmental and process monitoring.',
  },
];

export default function GranulesLifeSciencesPage() {
  const [openCard, setOpenCard] = useState(-1);

  useEffect(() => {
    document.title = 'Granules Life Sciences | Pharmaceutical Manufacturing in India';

    const descriptionContent =
      'A state-of-the-art vertically integrated manufacturing facility in Genome Valley, Hyderabad, capable of delivering 10 billion oral solid dosage units annually.';
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
    <div className="cp gls-page">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(85%, 1632px)', maxWidth: '1632px', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/company">ABOUT US</Link>
        <span className="sep">›</span>
        <Link to="/company/global-subsidiaries">GLOBAL SUBSIDIARIES</Link>
        <span className="sep">›</span>
        <span className="current">GRANULES LIFE SCIENCES</span>
      </p>
      <h1 className="cp-page-title">Granules Life Sciences</h1>
      <div className="cp-hero-banner">
        <img src={`${G}hero-banner.png`} alt="Granules Life Sciences facility" />
        <div className="gls-hero-scrim" />
        <div className="gls-hero-overlay">
          <h2 className="gls-hero-heading">Engineered for the Future of Oral Solid Dosage Manufacturing</h2>
        </div>
      </div>

      <div className="cp-about-desc gls-intro">
        <p>
          <span>Granules Life Sciences (GLS) is a wholly owned subsidiary of Granules India, located in Genome Valley, Hyderabad. GLS is a state-of-the-art formulations manufacturing facility capable of delivering 10 billion oral solid dosage (OSD) units annually. </span>
          <span>This facility is approved by the USFDA and with EU GMP certification underway.</span>
        </p>
        <p>
          Strategically designed layout in five acres of land to produce 10 billion oral solid dosages/annum, with additional 14.6 acres of land reserved for future expansion—ensuring we are equipped to meet growing global demand with speed, flexibility, and compliance. With advanced automation, GMP-compliant infrastructure, and green manufacturing systems at its core, GLS is built for precision, reliability, and sustained growth.
        </p>
      </div>

      <div className="gls-section">
        <div className="gls-section-head">
          <span className="cp-section-badge" style={{ alignSelf: 'flex-start', width: 'fit-content' }}>Operational Excellence</span>
          <h2>High-Performance Formulation Manufacturing</h2>
          <h3 className="gls-section-desc">
            With automated production lines, lean process design, and digital oversight, we deliver
            consistent quality with high throughput and shorter lead time for supplies into regulated markets.
          </h3>
          <h3 className="gls-section-desc">
            Built for long-term responsibility, the site integrates sustainable design, energy-efficient systems, and advanced safety protocols, ensuring operational excellence without compromising environmental or workforce safety standards. GLS reflects our commitment to building a future-ready pharmaceutical supply chain.
          </h3>
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
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="gls-cta">
        <div className="gls-cta-copy">
          <h2>Explore Our Finished Dosages Capabilities</h2>
          <p>
            Driving formulation-led growth through innovation, integration, and customer focus
            across global finished dosage operations.
          </p>
        </div>
        <Link className="cp-cta-btn" to="/business/fd">FINISHED DOSAGES</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

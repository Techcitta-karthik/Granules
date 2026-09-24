import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { getAssetUrl } from '../lib/pdf';
import '../components/company/company.css';
import './business.css';

const A = '/assets/api/';

const THERAPEUTIC_AREAS = [
  { label: 'Anti-diabetics', icon: 'icon-anti-diabetics.svg' },
  { label: 'Anti-inflammatories', icon: 'icon-anti-inflammatories.svg' },
  { label: 'CNS/ADHD', icon: 'icon-cns.svg' },
  { label: 'Oncology', icon: 'icon-oncology.svg' },
  // No dedicated Gastroenterology icon is available. Reusing a freed-up icon from a
  // different therapeutic area (anti-infectives/analgesics/anti-retrovirals) risked
  // implying the wrong therapeutic meaning, so a neutral, non-therapeutic icon is used instead.
  { label: 'Gastroenterology', icon: 'icon-manufacturing.svg' },
  { label: 'Anti-histamines', icon: 'icon-anti-histamines.svg' },
  { label: 'Anti-coagulants', icon: 'icon-anti-coagulants.svg' },
  { label: 'Anti-hypertensives', icon: 'icon-anti-hypertensives.svg' },
];

type ScaleItem = { title: string; body: string; icon: string; image?: string | null };

const SCALE_ITEMS: ScaleItem[] = [
  {
    title: 'Portfolio Breadth Across Wide Therapeutic Segments',
    body: 'Diverse portfolio of 100+ DMFs across wide range of therapeutic areas including Anti-diabetics, Anti-inflammatories, CNS/ADHD, Oncology, Gastroenterology, Anti-histamines, Anti-coagulants, Anti-hypertensives, and others.',
    icon: 'icon-globe.svg',
    image: '/assets/facilities/bonthapally-2.png',
  },
  {
    title: 'Manufacturing Infrastructure Supporting Global Scale',
    body: '40,000 TPA installed capacity across four specialized facilities, with seamless vertical integration from key starting materials and intermediates to downstream PFI and Finished Dosage operations, enhancing supply security and cost competitiveness.',
    icon: 'icon-capacity.svg',
    image: '/assets/api/2.jpg',
  },
  {
    title: 'Quality, Compliance & Global Regulatory Reach',
    body: 'Global regulatory accreditations enabling supplies to 80+ countries, supported by industry-leading practices including Quality by Design (QbD), closed-loop operations, robust GMP systems, data integrity controls, and a deeply embedded safety culture.',
    icon: 'icon-globe.svg',
    image: '/assets/api/8.jpg',
  },
  {
    title: 'Innovation-led, Technology-Driven, Sustainability-Focused',
    body: 'Our API operations are enabled by advanced Industry 4.0 technologies, including PLC, DCS, and Electronic Batch Manufacturing Records, while embedding Green Chemistry and sustainable innovation into R&D and manufacturing to improve yields, reduce waste, and enhance operational efficiency.',
    icon: 'icon-manufacturing.svg',
    image: '/assets/api/5.png',
  },
];

export default function ApiPage() {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    document.title = 'High-Volume & Niche API Manufacturer | Sustainable, Scalable APIs | Granules India';

    const descriptionContent =
      'Scalable API manufacturing for Paracetamol, Metformin, Guaifenesin & more. Backward integrated, sustainable, and trusted by global pharma leaders across 80+ countries.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    window.scrollTo(0, 0);
  }, []);

  const activeImage = (open >= 0 && SCALE_ITEMS[open]?.image) ? SCALE_ITEMS[open].image : SCALE_ITEMS[0]?.image;

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(85%, 1632px)', maxWidth: '1632px', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <span className="cp-breadcrumb-plain">BUSINESS</span>
        <span className="sep">›</span>
        <Link to="/business/generics">GENERICS</Link>
        <span className="sep">›</span>
        <span className="current">ACTIVE PHARMACEUTICAL INGREDIENTS</span>
      </p>
      <h1 className="api-page-header">Active Pharmaceutical Ingredients</h1>
      <div className="cp-hero-banner">
        <img src={`${A}hero-banner.png`} alt="Granules API manufacturing facility" />
        <div className="api-hero-scrim" />
        <div className="api-hero-overlay">
          <div className="api-hero-overlay-content">
            <h2 className="api-hero-heading api-hero-overlay-title">Built for Scale. Engineered for Precision. Committed to Global Compliance.</h2>
          </div>
        </div>
      </div>

      <div className="biz-intro">
        <p>
          For over four decades, Granules has been a globally trusted manufacturer of Active
          Pharmaceutical Ingredients (APIs), delivering a diverse portfolio both high-volume legacy
          molecules and a growing pipeline of complex, high-barrier APIs. We combine our deep process
          chemistry know-how with modern manufacturing scale, digital quality systems and disciplined
          regulatory execution. Our integrated API platform supports both internal formulation
          requirements and external customer demand across regulated and semi-regulated markets.
        </p>
      </div>

      <div className="biz-panel">
        {activeImage && <img className="bg" src={activeImage} alt="" />}
        <div className="overlay" />
        <div className="biz-panel-grid">
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
          <h2>Let&rsquo;s Build Long-Term, Scalable API Partnerships</h2>
          <p>
            Explore our full API portfolio and discover how Granules can be your strategic
            manufacturing partner for quality, scale, and sustainability.
          </p>
        </div>
        <a
          className="cp-cta-btn"
          href={getAssetUrl('pdfs/2025/05/Granules_Product_Brochure_API.pdf')}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Our API Portfolio &rarr;
        </a>
      </div>

      <CompanyFooter />
    </div>
  );
}

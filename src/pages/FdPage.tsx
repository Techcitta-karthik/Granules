import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { getAssetUrl } from '../lib/pdf';
import '../components/company/company.css';
import './business.css';

const F = '/assets/fd/';

type BenefitItem = { title: string; body: string; icon: string; image?: string };

const BENEFITS: BenefitItem[] = [
  {
    title: 'Expanding Access to Diverse Therapeutic Segments',
    body: 'Broad portfolio across wide range of therapeutic areas including Anti-diabetics, CNS/ADHD, Oncology, Gastroenterology, and others, made accessible to millions of patients globally through a combination of commercial capabilities, strategic partnerships, and reliable supply networks.',
    icon: 'icon-circles.svg',
    image: '/assets/fd/2.jpg',
  },
  {
    title: 'Reliable Supply Through Vertical Integration',
    body: '40+ Bn units annual capacity across five manufacturing facilities supported by backward integrated model, with dedicated infrastructure for controlled substances and oncology, strengthening quality, supply continuity, and operational efficiency.',
    icon: '/assets/pfi/icon-manufacturing.svg',
    image: '/assets/fd/3.jpg',
  },
  {
    title: 'Formulation Expertise in Complex Generics',
    body: 'We offer patient-centric solutions through a wide range of capabilities across modified-release formulations, MUPS technologies, controlled substances, chewable dosage forms, oncology products and complex oral solids. Formulation capability includes sachet and liquid filling lines.',
    icon: 'icon-test-tube.svg',
    image: '/assets/fd/4.jpg',
  },
  {
    title: 'Global Reach with Local Customization',
    body: 'With approvals from global regulatory authorities, including USFDA, EDQM, EU-GMP, ANVISA, COFEPRIS, WHO-GMP, TGA, KFDA, DEA, and others, we enable market-specific solutions that address diverse healthcare and compliance needs worldwide.',
    icon: 'icon-globe.svg',
    image: '/assets/fd/6.png',
  },
  {
    title: 'Flexible Partnership Models',
    body: 'Whether through dossier licensing, contract manufacturing, development collaborations, or commercialization partnerships, we create solutions aligned to our partners\' strategic objectives.',
    icon: 'icon-box.svg',
    image: '/assets/fd/7.jpg',
  },
  {
    title: 'Technology-Enabled by Digitalisation',
    body: 'From digitally enabled product development and data-driven formulation design to electronic quality management systems and industry 4.0 manufacturing platforms, we are leveraging technology to accelerate innovation, strengthen data integrity, improve operational excellence, and support scalable, compliant delivery of high-quality medicines.',
    icon: 'icon-digital.svg',
    image: '/assets/fd/digitalisation.jpg',
  },
];

export default function FdPage() {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    document.title = 'Finished Dosage Formulations — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp fd-page">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(85%, 1632px)', maxWidth: '1632px', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <span className="cp-breadcrumb-plain">BUSINESS</span>
        <span className="sep">›</span>
        <Link to="/business/generics">GENERICS</Link>
        <span className="sep">›</span>
        <span className="current">FINISHED DOSAGE FORMULATIONS</span>
      </p>
      <h1 className="cp-page-title">Finished Dosage Formulations</h1>
      <div className="cp-hero-banner">
        <img src={`${F}5.jpg`} alt="Granules finished dosages manufacturing" />
        <div className="api-hero-scrim" />
        <div className="api-hero-overlay">
          <h2 className="api-hero-heading">Bringing Affordable Medicines to Patients Worldwide</h2>
        </div>
      </div>

      <div className="biz-intro">
        <p>
          At Granules, we are committed to improving access to high-quality medicines for patients
          around the world. Through our own commercial presence and strategic partnerships with
          pharmaceutical companies, we develop, manufacture, and supply a broad range of oral dosage
          formulations across key therapeutic areas. Combining formulation expertise, vertically
          integrated operations, advanced manufacturing technologies, and global regulatory
          capabilities, we help transform scientific innovation into accessible healthcare solutions
          that improve patient outcomes at scale. Our flexible business model allows us to support
          partners across the product lifecycle while ensuring reliable access to medicines in
          diverse markets worldwide.
        </p>
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
          <div className="biz-accordion">
            {BENEFITS.map((item, index) => {
              const isOpen = open === index;
              const iconSrc = item.icon.startsWith('/') ? item.icon : `${F}${item.icon}`;
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
                        <img src={iconSrc} alt="" />
                      </span>
                      <p className="biz-accordion-title">{item.title}</p>
                    </div>
                    <span className="biz-accordion-toggle">
                      <img src={`${F}${isOpen ? 'icon-minus.svg' : 'icon-plus.svg'}`} alt={isOpen ? 'Collapse' : 'Expand'} />
                    </span>
                  </div>
                  {isOpen && item.body && <p className="biz-accordion-body">{item.body}</p>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="biz-cta">
        <div className="biz-cta-copy">
          <h2>Explore Our Finished Dosage Portfolio</h2>
          <p>
            Discover high-volume, cost-efficient, and globally compliant finished formulations across core therapeutic areas.
          </p>
        </div>
        <a
          className="cp-cta-btn"
          href={getAssetUrl('pdfs/2025/06/GIL_Product_Brochure_May_20_2025_Master_FD.pdf')}
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW PRODUCT LIST
        </a>
      </div>

      <CompanyFooter />
    </div>
  );
}

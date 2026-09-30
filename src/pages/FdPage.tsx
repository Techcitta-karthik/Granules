import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';

const F = '/assets/fd/';

type BenefitItem = { title: string; body: string; icon: string; image?: string };

const BENEFITS: BenefitItem[] = [
  {
    title: 'Expanding Access to Diverse Therapeutic Segments',
    body: 'A broad portfolio spanning anti-diabetics, CNS/ADHD, oncology, gastroenterology and more — reaching millions of patients worldwide through our commercial presence, strategic partnerships and reliable supply.',
    icon: 'icon-circles.svg',
    image: '/assets/fd/2.jpg',
  },
  {
    title: 'Reliable Supply through Vertical Integration',
    body: '40+ billion units of annual capacity across five backward-integrated facilities — with dedicated infrastructure for controlled substances and oncology — ensuring consistent quality, operational efficiency, and supply reliability.',
    icon: '/assets/pfi/icon-manufacturing.svg',
    image: '/assets/fd/3.jpg',
  },
  {
    title: 'Formulation Expertise in Complex Generics',
    body: 'Patient-centric formulations across modified-release, MUPS, chewables, controlled substances, oncology and complex oral solids — plus sachet and liquid filling capabilities.',
    icon: 'icon-test-tube.svg',
    image: '/assets/fd/4.jpg',
  },
  {
    title: 'Global Reach with Local Customization',
    body: 'Approved by USFDA, EDQM, EU-GMP, ANVISA, COFEPRIS, WHO-GMP, TGA, KFDA, DEA and more — delivering market-specific solutions for patients worldwide.',
    icon: 'icon-globe.svg',
    image: '/assets/fd/6.png',
  },
  {
    title: 'Flexible Partnership Models',
    body: 'Dossier licensing, contract manufacturing, co-development or commercialization — partnership models tailored to our partners goals.',
    icon: 'icon-box.svg',
    image: '/assets/fd/7.jpg',
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
          At Granules, we are committed to improving access to high-quality medicines for patients around the world. Through our own commercial presence and strategic partnerships, we develop, manufacture, and supply a broad range of oral dosage medicines across key therapeutic areas.
          Formulation expertise, vertically integrated operations, advanced manufacturing and global regulatory capabilities let us turn science into affordable treatments that improve patient outcomes at scale.
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
        <Link
          className="cp-cta-btn"
          to="/business/generics#our-portfolio"
        >
          VIEW PRODUCT LIST
        </Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

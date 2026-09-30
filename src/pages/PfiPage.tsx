import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';

const P = '/assets/pfi/';

type BenefitItem = { title: string; body: string; icon: string; image?: string };

const BENEFITS: BenefitItem[] = [
  {
    title: 'Unmatched Scale and Reliability',
    body: 'Backward-integrated, high-volume manufacturing ensures consistent quality, dependable supply and efficient commercial-scale production.',
    icon: 'icon-manufacturing.svg',
    image: '/assets/pfi/1.jpg',
  },
  {
    title: 'Simplifying Supply Chain Complexity',
    body: 'Our proprietary “Drum to Hopper” direct-compression blends minimize development effort, streamline supply chain steps and ease inventory pressure.',
    icon: 'icon-box.svg',
    image: '/assets/pfi/2.jpg',
  },
  {
    title: 'Supporting Asset-Light Market Entry',
    body: 'PFIs replace more than 80% of the infrastructure needed in a conventional oral solid dosage facility — significantly lowering capital investment for customers.',
    icon: 'icon-production-belt.svg',
    image: '/assets/pfi/3.png',
  },
  {
    title: 'Customized Formulation Solutions',
    body: 'Tailor-made PFIs for complex formulations, fixed-dose combinations and homogeneous blending with other APIs — with flexible batch sizes of up to 6,000 kg.',
    icon: 'icon-test-tube.svg',
    image: '/assets/pfi/4.png',
  },
  {
    title: 'Global Regulatory Adaptability',
    body: 'Backed by global regulatory approvals, our PFI platform is tailored to market-specific requirements worldwide.',
    icon: 'icon-circles.svg',
    image: '/assets/pfi/5.png',
  },
];

export default function PfiPage() {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    document.title = 'Pharmaceutical Formulation Intermediates — Granules India';
    window.scrollTo(0, 0);
  }, []);

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
        <span className="current">PHARMACEUTICAL FORMULATION INTERMEDIATES</span>
      </p>
      <h1 className="cp-page-title">Pharmaceutical Formulation Intermediates</h1>
      <div className="cp-hero-banner">
        <img src={`${P}key-benefits-bg.png`} alt="Granules PFI manufacturing facility" />
        <div className="pfi-hero-scrim" />
        <div className="pfi-hero-overlay">
          <h2 className="pfi-hero-heading">
            <span style={{ whiteSpace: 'nowrap' }}>Simplifying Formulation.</span>
            <br />
            <span style={{ whiteSpace: 'nowrap' }}>Accelerating Access.</span>
          </h2>
        </div>
      </div>

      <div className="biz-intro">
        <p>
          A global pioneer and the world's largest PFI manufacturer by volume, Granules delivers scalable, cost-effective intermediates for oral solid dosages. Our proprietary “Drum to Hopper” direct-compression blends are tailored to market-specific regulatory needs, cut development effort, complexity and infrastructure needs — helping partners bring medicines to patients faster. Six-tonne batch capacity supports customers in 80+ countries.
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
        <div className="biz-cta-copy">
          <h2>Explore Our Full PFI Product Portfolio</h2>
          <p>
            Industry-leading pharmaceutical formulation intermediates engineered for superior compressibility and flowability.
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

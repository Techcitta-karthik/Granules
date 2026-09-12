import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';

const P = '/assets/pfi/';

type BenefitItem = { title: string; body: string; icon: string; image?: string };

const BENEFITS: BenefitItem[] = [
  {
    title: 'Unmatched Scale and Reliability',
    body: 'Backward integrated and high-volume manufacturing assures consistent quality, dependable supply, and efficient commercial-scale production.',
    icon: 'icon-manufacturing.svg',
    image: '/assets/pfi/1.png',
  },
  {
    title: 'Simplifying Supply Chain Complexity',
    body: 'Our proprietary “Drum to Hopper” model enables direct compression with minimal development effort, helping customers streamline supply chain steps and inventory pressure',
    icon: 'icon-box.svg',
    image: '/assets/pfi/2.png',
  },
  {
    title: 'Supporting Asset-Light Market Entry',
    body: 'PFIs replicate more than 80% of the infrastructure required in a conventional oral solid dosage facility, reducing the need for significant capital investment.',
    icon: 'icon-production-belt.svg',
    image: '/assets/pfi/3.png',
  },
  {
    title: 'Customized Formulation Solutions',
    body: 'Tailor-made PFIs support complex formulations, fixed-dose combinations, and homogeneous blending with other APIs.',
    icon: 'icon-test-tube.svg',
    image: '/assets/pfi/4.png',
  },
  {
    title: 'Global Regulatory Adaptability',
    body: 'With approvals from global regulatory authorities, our PFI platform can be tailored to meet market-specific regulatory requirements across global markets.',
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

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <a href="/">HOME</a>
        <span className="sep">›</span>
        <a href="/business/api">BUSINESS</a>
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
        <img className="bg" src={`${P}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="biz-cta-copy">
          <h2>Explore Our Full PFI Product Portfolio</h2>
        </div>
        <a
          className="cp-cta-btn"
          href="/documents/GIL_Product_Brochure_May_20_2025_Master_PFI-7abcdf7c89b2.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Product List &rarr;
        </a>
      </div>

      <CompanyFooter />
    </div>
  );
}

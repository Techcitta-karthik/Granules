import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';

const F = '/assets/fd/';

type BenefitItem = { title: string; body: string; icon: string };

const BENEFITS: BenefitItem[] = [
  {
    title: 'Modified Release Technologies',
    body: 'Tailored for therapeutic precision and patient compliance.',
    icon: 'icon-test-tube.svg',
  },
  {
    title: 'Different Dosage Forms',
    body: 'Including tablets, capsules, powders and pediatric-friendly formats tailored for global markets.',
    icon: 'icon-circles.svg',
  },
  {
    title: 'Flexible Batch Size and Packaging Formats',
    body: 'Designed for global distribution and market-specific regulatory needs.',
    icon: 'icon-box.svg',
  },
  {
    title: 'Global Regulatory Submissions',
    body: 'Backed by deep expertise and region-specific regulatory filing strategies across US, EU, and global agencies.',
    icon: 'icon-globe.svg',
  },
];

export default function FdPage() {
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    document.title = 'Finished Dosages — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Business</span>
        <span className="sep">{'>'}</span>
        <span className="current">Finished Dosages</span>
      </p>
      <h1 className="cp-page-title">Finished dosages</h1>
      <div className="cp-hero-banner">
        <img src={`${F}hero-banner.png`} alt="Granules finished dosages manufacturing" />
      </div>

      <div className="biz-intro">
        <p>
          At Granules India we offer end-to-end development and manufacturing solutions for oral
          dosage forms. Our capabilities bring together regulatory-compliant facilities, advanced
          technologies, and global dossier readiness to ensure seamless delivery from concept to
          commercialization. Customer-centric by design, our model supports tailored solutions,
          rapid scale-up, and market-specific flexibility.{' '}
          <span className="muted">Continuous manufacturing and vertically integrated operations allow us to deliver large batch sizes while maintaining high quality and compliance standards.</span>
        </p>
        <p className="muted">
          We specialize in the development and manufacturing of a wide range of oral solid dosage
          forms, including immediate-release, extended-release, delayed-release, and
          multi-particulate pellet systems&mdash;across both tablets and capsules. Our
          capabilities extend to various dosage forms such as: Tablets, Capsules, Press-fits, Oral
          solutions and suspensions and Powders. Therapeutic focus areas include CNS,
          antidepressants, anti-diabetics, and antihistamines.
        </p>
        <p className="muted">
          With vertically integrated operations and regulatory approvals from authorities such as
          US FDA, EU, GMP and DEA, we serve pharmaceutical companies in over 80 countries,
          delivering high-quality, scalable and compliant solutions.
        </p>
      </div>

      <div className="biz-panel">
        <img className="bg" src={`${F}partnership-bg.png`} alt="" />
        <div className="overlay" />
        <div className="biz-panel-grid">
          <div className="biz-panel-head">
            <h2>Flexible partnership models</h2>
            <p>
              We collaborate with leading pharma companies worldwide across a range of
              partnership models, from dossier licensing to contract manufacturing. With a strong
              presence in North America, Europe, LATAM, and AMEA, we have filed dossiers and
              supported product launches across diverse regulatory landscapes.
            </p>
          </div>
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
                        <img src={`${F}${item.icon}`} alt="" />
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
        <img className="bg" src={`${F}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="biz-cta-copy">
          <h2>Explore our Finished Dosage portfolio</h2>
        </div>
        <a className="cp-cta-btn" href="/business/fd">View Product List</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

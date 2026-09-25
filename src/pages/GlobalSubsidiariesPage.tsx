import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './subsidiaries.css';

type SubsidiaryItem = {
  index: string;
  name: string;
  image: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  isExternal?: boolean;
};

const SUBSIDIARY_ITEMS: SubsidiaryItem[] = [
  {
    index: '01',
    name: 'Granules Pharmaceuticals Inc.',
    image: '/assets/company/GPI-Cover.jpeg',
    description:
      "Strengthening patient access in North America through direct commercial presence and manufacturing base.",
    ctaText: 'Know More',
    ctaHref: 'https://www.granulespharma.com/',
    isExternal: true,
  },
  {
    index: '02',
    name: 'Senn Tides India Private Limited',
    image: '/assets/facilities/Senn Chem.png',
    description:
      'Advancing peptide-based therapies through specialized CDMO capabilities.',
    ctaText: 'Know More',
    ctaHref: '/company/senn-tides',
  },
  {
    index: '03',
    name: 'Granules Life Sciences',
    image: '/assets/gls/hero-banner.webp',
    description:
      'State-of-the-art oral solid facility designed to accelerate the next phase of growth in regulated markets through quality, innovation and manufacturing excellence.',
    ctaText: 'Know More',
    ctaHref: '/company/granules-life-sciences',
  },
  {
    index: '04',
    name: 'Granules CZRO',
    image: '/assets/czro/hero-banner.webp',
    description:
      "Integrating sustainability through green chemistry, circular manufacturing, and net-zero innovation.",
  },
];

export default function GlobalSubsidiariesPage() {
  useEffect(() => {
    document.title = 'Global Subsidiaries — Granules India';

    const descriptionContent =
      'Explore Granules India global subsidiaries: Granules Life Sciences, Granules CZRO, Granules Pharmaceuticals Inc, and Senn Tides India Private Limited.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);
    window.scrollTo(0, 0);
  }, []);

  const renderCard = (sub?: SubsidiaryItem) => {
    if (!sub) return null;
    return (
      <article className="global-sub-card" key={sub.name}>
        <div className="global-sub-card-media">
          <img
            src={sub.image}
            alt={`${sub.name} facility`}
            loading="lazy"
            decoding="async"
          />
          <span className="global-sub-card-index">{sub.index}</span>
        </div>

        <div className="global-sub-card-content">
          <h2 className="global-sub-card-title">{sub.name}</h2>
          <p className="global-sub-card-desc">{sub.description}</p>

          {sub.ctaHref && (
            <div className="global-sub-card-action">
              {sub.isExternal ? (
                <a
                  href={sub.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="global-sub-card-cta"
                >
                  <span>{sub.ctaText}</span>
                  <span className="global-sub-cta-icon-circle">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
              ) : (
                <Link to={sub.ctaHref} className="global-sub-card-cta">
                  <span>{sub.ctaText}</span>
                  <span className="global-sub-cta-icon-circle">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className="cp">
      <NavBar />

      {/* Breadcrumb Navigation */}
      <p className="cp-breadcrumb" style={{ width: 'min(85%, 1632px)', maxWidth: '1632px', margin: 'clamp(60px, 8vw, 118px) auto 16px' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/company">ABOUT US</Link>
        <span className="sep">›</span>
        <span className="current">GLOBAL SUBSIDIARIES</span>
      </p>

      {/* Page Title */}
      <h1 className="cp-page-title">Expanding Horizons. Enhancing Access</h1>

      {/* Intro Section - identical to /company/milestone */}
      <div className="cp-about-desc global-sub-intro">
        <h4>
          With strategically differentiated offerings, our subsidiaries play a vital role in enabling us to deliver high-quality, affordable, and sustainable healthcare solutions to patients worldwide. Beyond driving business growth, our subsidiaries help drive a shared commitment to common values, consistent standards, and a collective focus on creating long-term value for patients, partners, communities, and the planet.
        </h4>
      </div>

      {/* 4 Featured Subsidiaries Showcase - Staggered Columns matching R&D page */}
      <section className="global-sub-section" aria-label="Global Subsidiaries">
        <div className="global-sub-columns">
          <div className="global-sub-col">
            {[SUBSIDIARY_ITEMS[0], SUBSIDIARY_ITEMS[2]].map(renderCard)}
          </div>
          <div className="global-sub-col global-sub-col--staggered">
            {[SUBSIDIARY_ITEMS[1], SUBSIDIARY_ITEMS[3]].map(renderCard)}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <div className="cp-career">
        <div className="cp-career-copy">
          <h2>Advancing Healthcare Through Science &amp; Scale</h2>
          <p>
            Advancing healthcare through a growing portfolio of complex, high-value pharmaceutical products.
          </p>
        </div>
        <Link className="cp-cta-btn" to="/business/generics">GENERICS</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

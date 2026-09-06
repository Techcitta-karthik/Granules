import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './subsidiaries.css';

type SubsidiaryItem = {
  name: string;
  badge: string;
  location: string;
  image: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  tags: string[];
};

const SUBSIDIARY_ITEMS: SubsidiaryItem[] = [
  {
    name: 'Granules Life Sciences',
    badge: 'Oral Solid Dosage',
    location: 'Genome Valley, Hyderabad',
    image: '/assets/gls/hero-banner.webp',
    description:
      'State-of-the-art oral solid facility designed to accelerate the next phase of growth in regulated markets through quality, innovation and manufacturing excellence.',
    ctaText: 'Learn More',
    ctaHref: '/company/granules-life-sciences',
    tags: ['10B Dosages / Year', 'USFDA Approved', 'Automated Production'],
  },
  {
    name: 'Granules CZRO',
    badge: 'Green Science & Net-Zero',
    location: 'Visakhapatnam & Kakinada',
    image: '/assets/czro/hero-banner.webp',
    description:
      'Integrating sustainability through green chemistry, circular manufacturing, and net-zero innovation.',
    ctaText: 'Know More',
    ctaHref: '/company/granules-czro',
    tags: ['Green Chemistry', 'Circular Manufacturing', 'Zero Carbon APIs'],
  },
  {
    name: 'Granules Pharmaceuticals Inc',
    badge: 'North America Hub',
    location: 'Virginia, United States',
    image: '/assets/company/gpi-facility.webp',
    description:
      'Strengthening patient access in North America through direct commercial presence and manufacturing base',
    ctaText: 'Learn More',
    ctaHref: '/company/facilities',
    tags: ['Direct US Presence', 'Rx Distribution', 'Formulation R&D'],
  },
  {
    name: 'Senn Tides Private Limited',
    badge: 'Peptide CDMO',
    location: 'Switzerland & India',
    image: '/assets/ascelis/hero-banner.webp',
    description:
      'Integrated CDMO platform providing custom peptide APIs, amino acid derivatives, fragments and theranostic peptides across Switzerland and India.',
    ctaText: 'Learn More',
    ctaHref: '/company/senn-tides',
    tags: ['Specialized CDMO', 'Swiss Quality & cGMP', 'LPPS & SPPS Synthesis'],
  },
];

const SHARED_PILLARS = [
  {
    title: 'Common Values & Governance',
    desc: 'United by integrity, compliance, and transparent corporate governance across every global entity and operating market.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Consistent Quality Standards',
    desc: 'Uncompromising adherence to global regulatory compliance including USFDA, EDQM, and WHO-GMP across all manufacturing lines.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: 'Sustainable Long-Term Impact',
    desc: 'Targeted decarbonisation, renewable power utilization, and circular economy principles embedded into every facility.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
];

export default function GlobalSubsidiariesPage() {
  useEffect(() => {
    document.title = 'Our Global Subsidiaries — Granules India';

    const descriptionContent =
      'With strategically differentiated offerings, our subsidiaries play a vital role in enabling us to deliver high-quality, affordable, and sustainable healthcare solutions to patients worldwide.';
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

      {/* Breadcrumb Navigation */}
      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOMEPAGE</Link>
        <span className="sep">›</span>
        <Link to="/company">COMPANY</Link>
        <span className="sep">›</span>
        <span className="current">GLOBAL SUBSIDIARIES</span>
      </p>

      {/* Page Title */}
      <h1 className="cp-page-title">Our Global Subsidiaries</h1>

      {/* Hero Visual Banner */}
      <div className="cp-hero-banner">
        <img
          src="/assets/company/values-bg-2.webp"
          alt="Granules India Global Subsidiaries Network"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Interactive Scroll-Highlight Lead Paragraph */}
      <div className="global-sub-intro">
        <p>
          <span>
            With strategically differentiated offerings, our subsidiaries play a vital role in enabling us to deliver high-quality, affordable, and sustainable healthcare solutions to patients worldwide.
          </span>
        </p>
        <p>
          <span>
            Beyond driving business growth, our subsidiaries help drive a shared commitment to common values, consistent standards, and a collective focus on creating long-term value for patients, partners, communities, and the planet.
          </span>
        </p>
      </div>

      {/* 4 Featured Subsidiaries Grid */}
      <section className="global-sub-section" aria-label="Our Global Subsidiaries Showcase">
        <div className="global-sub-section-head">
          <span className="cp-section-badge">Strategic Network</span>
          <h2>Differentiated Capabilities, Shared Purpose</h2>
          <p>
            Explore our specialized global subsidiaries driving manufacturing excellence, green science, and direct patient access across global markets.
          </p>
        </div>

        <div className="global-sub-grid">
          {SUBSIDIARY_ITEMS.map((sub) => (
            <article className="global-sub-card" key={sub.name}>
              <div className="global-sub-card-media">
                <img
                  src={sub.image}
                  alt={`${sub.name} facility`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="global-sub-card-badge">{sub.badge}</span>
                <span className="global-sub-card-location">{sub.location}</span>
              </div>

              <div className="global-sub-card-body">
                <div className="global-sub-card-info">
                  <h3 className="global-sub-card-title">{sub.name}</h3>
                  <p className="global-sub-card-desc">{sub.description}</p>
                  
                  <div className="global-sub-card-tags">
                    {sub.tags.map((tag) => (
                      <span className="global-sub-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Link to={sub.ctaHref} className="global-sub-card-cta">
                    <span>{sub.ctaText}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Shared Pillars / Value Grid */}
      <section className="global-sub-pillars" aria-label="Shared Commitment and Standards">
        <div className="global-sub-pillars-head">
          <span className="global-sub-pillars-badge">Unified Foundation</span>
          <h2>Driven by Shared Values and Standards</h2>
          <p>
            Across all locations and business models, Granules subsidiaries operate with a cohesive ethos to ensure long-term value creation for all stakeholders.
          </p>
        </div>

        <div className="global-sub-pillars-grid">
          {SHARED_PILLARS.map((pillar) => (
            <div className="global-sub-pillar-card" key={pillar.title}>
              <div className="global-sub-pillar-icon" aria-hidden="true">
                {pillar.icon}
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="global-sub-cta" aria-label="Partner with our subsidiaries">
        <div className="global-sub-cta-copy">
          <h2>Partner with Our Global Network</h2>
          <p>
            Connect with our subsidiary teams to explore collaborative pharmaceutical manufacturing, specialized CDMO, and commercial supply partnerships worldwide.
          </p>
        </div>
        <Link to="/contact" className="global-sub-cta-btn">
          <span>Contact Our Team</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>

      <CompanyFooter />
    </div>
  );
}

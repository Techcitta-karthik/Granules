import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';
import './rd.css';

const R = '/assets/rd/';

type RdCenter = {
  id: string;
  location: string;
  title: string;
  desc: string;
  image: string;
  ctaText?: string;
  ctaHref?: string;
};

const RD_CENTERS: RdCenter[] = [
  {
    id: 'genome-valley',
    location: 'Genome Valley, India',
    title: 'GENOME VALLEY, TELANGANA',
    desc: 'Integrated Product Development for APIs and Finished Dosages.',
    image: 'hero-banner.png',
    ctaHref: '/business/rd',
  },
  {
    id: 'pragathi-nagar',
    location: 'Pragathi Nagar, India',
    title: 'PRAGATHI NAGAR, TELANGANA',
    desc: 'Centre of Excellence for Complex FD, CII API development, KSMs, and Bio Lab (enzymes & fermentation).',
    image: 'centers-bg.png',
    ctaHref: '/business/rd',
  },
  {
    id: 'pune',
    location: 'Pune, India',
    title: 'PUNE, MAHARASHTRA',
    desc: 'New technology platforms with focus on KSM innovation and backward integration.',
    image: 'capabilities-bg.png',
    ctaHref: '/business/api',
  },
  {
    id: 'virginia',
    location: 'Virginia, USA',
    title: 'VIRGINIA, USA',
    desc: 'US-specific complex FD design, controlled substances and clinical support.',
    image: '/assets/rd/vir.jpg',
    ctaHref: '/business/fd',
  },
  {
    id: 'switzerland',
    location: 'Switzerland',
    title: 'SENN CHEMICALS, SWITZERLAND',
    desc: 'Peptide & CDMO innovation — decades of peptide synthesis expertise.',
    image: 'capabilities-bg.png',
    ctaHref: '/business/peptides',
  },
];

type InfoItem = {
  title: string;
  body: string;
  image?: string;
};

const STRATEGIC_PRIORITIES: InfoItem[] = [
  {
    title: 'Strengthen Scientific Capabilities',
    body: 'Strengthen Scientific Capabilities to deepen expertise across chemistry, formulation and process sciences.',
    image: 'priority-scientific-capabilities.webp',
  },
  {
    title: 'Building a Differentiated Product Pipeline',
    body: 'Building a differentiated product pipeline focused on complex generics, oncology, CNS and peptides.',
    image: 'priority-product-pipeline.webp',
  },
  {
    title: 'Accelerate Product Development',
    body: 'Accelerate product development to reduce time-to-market through integrated development and digital tools.',
    image: 'priority-accelerate-development.webp',
  },
  {
    title: 'Advance Future-Ready Technologies',
    body: 'Advance future-ready technologies through biocatalysis, particle engineering, peptides and digital R&D.',
    image: 'priority-future-ready-technologies.webp',
  },
];

type TechItem = {
  title: string;
  body: string;
  image: string;
  icon: string;
};

const TECH_ITEMS: TechItem[] = [
  {
    title: 'Electronic Lab Notebooks (ELN)',
    body: 'Electronic Lab Notebooks (ELN) for structured, traceable and searchable capture of experimental data.',
    image: '1.png',
    icon: '/assets/company/icon-safety-cert.svg',
  },
  {
    title: 'Design of Experiments (DoE) Software',
    body: 'Design of Experiments (DoE) Software enabling efficient exploration of critical formulation and process variables.',
    image: '2.png',
    icon: '/assets/company/icon-idea.svg',
  },
  {
    title: 'Process Analytical Technology (PAT)',
    body: 'Process Analytical Technology (PAT) for real-time monitoring and control of critical process parameters for Quality by Design (QbD).',
    image: '3.png',
    icon: '/assets/company/icon-production-belt.svg',
  },
  {
    title: 'AI/ML-Assisted Formulation Development',
    body: 'AI/ML-Assisted Formulation Development to accelerate design decisions across complex formulations and process chemistry.',
    image: '4.png',
    icon: '/assets/rd/icon-dna.svg',
  },
  {
    title: 'Predictive Dissolution Modelling',
    body: 'Predictive Dissolution Modelling reducing development risk through in-silico prediction of in-vitro and in-vivo outcomes.',
    image: '5.png',
    icon: '/assets/rd/icon-pills.svg',
  },
  {
    title: 'Electronic CMC Documentation Systems',
    body: 'Electronic CMC Documentation Systems supporting faster, more consistent regulatory dossier preparation.',
    image: '6.png',
    icon: '/assets/company/icon-leaf.svg',
  },
];


type GreenCard = {
  title: string;
  body: string;
  image: string;
};

const GREEN_CARDS: GreenCard[] = [
  {
    title: 'Catalysis over stoichiometric reagents',
    body: 'Less waste, more efficiency',
    image: 'card-catalysis.png',
  },
  {
    title: 'Usage of Safer Solvents',
    body: 'Water and ethanol replace harmful chlorinated hydrocarbons',
    image: 'card-solvents.png',
  },
  {
    title: 'Energy-efficient Synthesis Routes',
    body: 'Reactions run at ambient temperatures and pressures',
    image: 'card-synthesis.png',
  },
  {
    title: 'Biocatalysis',
    body: 'Cleaner transformations with fewer by-products',
    image: 'card-biocatalysis.png',
  },
];

export default function RdPage() {
  const [activeCenterIdx, setActiveCenterIdx] = useState<number>(0);
  const [openPriority, setOpenPriority] = useState<number>(-1);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = 'R&D and Innovation — Granules India';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCenterIdx((prev) => (prev + 1) % RD_CENTERS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevCenter = () => {
    setActiveCenterIdx((prev) => (prev === 0 ? RD_CENTERS.length - 1 : prev - 1));
  };

  const handleNextCenter = () => {
    setActiveCenterIdx((prev) => (prev + 1) % RD_CENTERS.length);
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/business/api">BUSINESS</Link>
        <span className="sep">›</span>
        <span className="current">RESEARCH &amp; DEVELOPMENT</span>
      </p>
      <h1 className="cp-page-title">Research &amp; Development</h1>
      <div className="cp-hero-banner">
        <img src={`${R}hero-banner.png`} alt="Granules R&D laboratory" />
        <div className="rd-hero-scrim" />
        <div className="rd-hero-overlay">
          <h2 className="rd-hero-heading">Accelerating Innovation Through Integration and Digitalization</h2>
        </div>
      </div>

      <div className="rd-intro">
        <h4>
          Our integrated R&amp;D ecosystem, spanning APIs, PFIs, Finished Dosages and Peptide
          CDMO, enables us to deliver safe, effective and affordable healthcare solutions
          worldwide.
        </h4>
        <h4>
          Granules R&amp;D is powering the transformation of a legacy-scale generics company into
          a differentiated, science-led global pharmaceutical platform &mdash; advancing complex
          generics, oncology, CNS/ADHD, peptides and next-generation drug delivery through a
          global network of six specialised research centres. Our R&amp;D strategy is designed to
          strengthen these capabilities while supporting long-term growth through a diversified
          and differentiated product portfolio
        </h4>
      </div>

      {/* R&D Strategic Priorities */}
      <section className="rd-priorities" id="rd-priorities">
        <div className="rd-priorities-head">
          <h2>R&amp;D Strategic Priorities</h2>
        </div>
        <div className="rd-priorities-grid">
          {STRATEGIC_PRIORITIES.map((item, index) => {
            const isOpen = openPriority === index;
            const itemNumber = String(index + 1).padStart(2, '0');
            return (
              <article
                className={`rd-priority-card${isOpen ? ' is-open' : ''}`}
                key={item.title}
                onMouseEnter={() => setOpenPriority(index)}
                onMouseLeave={() => setOpenPriority(-1)}
              >
                <button
                  className="rd-priority-toggle"
                  type="button"
                  onClick={() => setOpenPriority(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? 'Close' : 'Explore'} ${item.title}`}
                >
                  {/* Background scientific graphic */}
                  <div className="rd-priority-img-wrap">
                    {item.image && (
                      <img
                        src={`${R}${item.image}`}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>

                  {/* Sliding Blue Drawer Sheet (Homepage Product-Bar Style) */}
                  <div className="rd-priority-sheet">
                    <div className="rd-priority-sheet-head">
                      <div className="rd-priority-sheet-title-group">
                        <span className="rd-priority-sheet-index">{itemNumber}</span>
                        <h3 className="rd-priority-sheet-title">{item.title}</h3>
                      </div>
                      <span className="rd-priority-symbol" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>

                    <div className="rd-priority-sheet-body">
                      <p className="rd-priority-description">{item.body}</p>
                      <div className="rd-priority-pill">
                        <span>PRIORITY {itemNumber}</span>
                        <span aria-hidden="true" style={{ marginLeft: '6px' }}>&rarr;</span>
                      </div>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* R&D Centers Section (Interactive Careers Workday Banner Style) */}
      <div className="rd-centers-section-head">
        <span className="cp-section-badge">R&amp;D Centers</span>
        <h2>Our Global R&amp;D Network</h2>
        <h4 className="rd-centers-section-intro">
          Our R&amp;D infrastructure spans multiple centres of excellence, each contributing
          specialised expertise while operating within an integrated development framework.
        </h4>
      </div>

      <div className="rd-centers-wrap">
        <div className="rd-centers-banner">
          {RD_CENTERS.map((center, index) => (
            <div
              key={center.id}
              className={`rd-centers-slide ${index === activeCenterIdx ? 'active' : ''}`}
            >
              <img
                className="bg"
                src={center.image.startsWith('/') ? center.image : `${R}${center.image}`}
                alt={center.title}
              />
              <div className="overlay" />
            </div>
          ))}


          <div className="rd-centers-story" key={activeCenterIdx}>
            <span className="rd-centers-badge">
              <span className="rd-badge-dot" />
              Centre of Excellence
            </span>
            <h3>{RD_CENTERS[activeCenterIdx].title}</h3>
            <p>{RD_CENTERS[activeCenterIdx].desc}</p>
          </div>

          <button
            type="button"
            className="rd-centers-arrow prev"
            onClick={handlePrevCenter}
            aria-label="Previous R&D center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="rd-centers-arrow next"
            onClick={handleNextCenter}
            aria-label="Next R&D center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="rd-centers-pill-tabs">
            {RD_CENTERS.map((center, index) => (
              <button
                key={center.id}
                type="button"
                className={`rd-centers-pill-tab ${index === activeCenterIdx ? 'active' : ''}`}
                onClick={() => setActiveCenterIdx(index)}
              >
                <span>{center.location}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rd-iit-note">
        <p>
          Complemented by Two Strategic Centres of Excellence at IIT Hyderabad, Telangana focused on Peptide Development and Particle Engineering
        </p>
      </div>


      {/* Innovation Enabled by Technology */}
      <div className="rd-tech">
        <div className="rd-tech-head">
          <h2>Innovation Enabled by Technology</h2>
          <h4>
            We are actively deploying a range of digital tools to support our integrated
            development platform with a more connected, efficient and future-ready innovation
            ecosystem.
          </h4>
        </div>
        <div className="rd-tech-grid">
          {TECH_ITEMS.map((item) => {
            const hasValidImage = item.image && !imgErrors[item.image];
            return (
              <article
                key={item.title}
                className={`rd-tech-card${hasValidImage ? ' rd-tech-card--has-image' : ''}`}
                tabIndex={0}
              >
                {item.image && (
                  <>
                    <img
                      className="rd-tech-card-bg"
                      src={`${R}${item.image}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onError={() => {
                        setImgErrors((prev) => ({ ...prev, [item.image]: true }));
                      }}
                      style={imgErrors[item.image] ? { display: 'none' } : undefined}
                    />
                    {hasValidImage && <div className="rd-tech-card-overlay" />}
                  </>
                )}
                <div className="rd-tech-header">
                  <span className="rd-tech-icon">
                    <img src={item.icon} alt="" loading="lazy" decoding="async" />
                  </span>
                  <h4 className="rd-tech-title-top">{item.title}</h4>
                </div>
                <div className="rd-tech-body">
                  <h4 className="rd-tech-title-bottom" aria-hidden="true">
                    {item.title}
                  </h4>
                  <p className="rd-tech-desc">{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Cascading Alternating Green Chemistry Section */}
      <div className="rd-green-wrapper">
        <div className="rd-green-section">
          <h2>Pioneering Green Pharmaceutical Solutions</h2>
          <h4>
            At Granules India, sustainability is embedded at the molecular level. We apply green
            chemistry principles, such as atom economy, e-factor optimization, and solvent
            minimization, across every stage of product development. Examples include:
          </h4>
        </div>

        <div className="rd-green-columns">
          <div className="rd-green-col">
            {[GREEN_CARDS[0], GREEN_CARDS[2]].map((card) => (
              <article className="rd-green-card" key={card.title}>
                <div className="rd-green-card-media">
                  <img src={`${R}${card.image}`} alt={card.title} />
                </div>
                <div className="rd-green-card-content">
                  <h3 className="rd-green-card-title">{card.title}</h3>
                  <p className="rd-green-card-desc">{card.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="rd-green-col rd-green-col--staggered">
            {[GREEN_CARDS[1], GREEN_CARDS[3]].map((card) => (
              <article className="rd-green-card" key={card.title}>
                <div className="rd-green-card-media">
                  <img src={`${R}${card.image}`} alt={card.title} />
                </div>
                <div className="rd-green-card-content">
                  <h3 className="rd-green-card-title">{card.title}</h3>
                  <p className="rd-green-card-desc">{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <h3 className="rd-eco-note">
        Our proprietary Eco-Scale framework evaluates processes across six core parameters and 38 sub-parameters, ensuring our chemistries align with operational efficiency, global standards, and environmental stewardship.
      </h3>

      {/* Built for Global Quality and Compliance */}
      <div className="biz-section-head rd-quality-head">
        <div className="copy">
          <h2>Built for Global Quality and Compliance</h2>
          <h4>
            We maintain a strong regulatory track record, driven by a culture of quality
            that&rsquo;s embedded across every phase of our R&amp;D journey. From initial product
            design and development, through early-stage safety and toxicology evaluations, to
            clinical alignment and global regulatory submissions, our processes are built to meet
            the highest standards of compliance, reliability, and global readiness.
          </h4>
        </div>
      </div>

      {/* Certified to global quality standards banner */}
      <div className="rd-cert-banner-wrap" aria-label="Quality certifications">
        <div className="rd-cert-banner-inner">
          <div className="rd-cert-lead-card">
            <h3 className="rd-cert-lead-title">
              Certified to<br />
              global quality<br />
              standards
            </h3>
          </div>

          <div className="rd-cert-badges-card">
            <div className="rd-cert-badge-tile">
              <img
                src="/assets/qc/cert-1.webp"
                alt="ISO 9001:2015 Quality Management System Certification"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="rd-cert-badge-tile">
              <img
                src="/assets/qc/cert-2.webp"
                alt="ISO 14001:2015 Environmental Management Company Certification"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="rd-cert-badge-tile">
              <img
                src="/assets/qc/cert-3.webp"
                alt="ISO 45001 Occupational Health and Safety Certification"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rd-cta">
        <img className="bg" src={`${R}cta-bg.png`} alt="Granules Facility" />
        <div className="overlay" />
        <div className="rd-cta-copy">
          <h2>Discover Our Product Portfolio</h2>
          <p>
            Explore our science-led generics, complex formulations, and integrated Active Pharmaceutical Ingredients.
          </p>
        </div>
        <Link className="cp-cta-btn" to="/business/generics">
          <span>Generics</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
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
    image: 'genome-valley.jpg',
    ctaHref: '/business/rd',
  },
  {
    id: 'pragathi-nagar',
    location: 'Pragathi Nagar, India',
    title: 'PRAGATHI NAGAR, TELANGANA',
    desc: 'Centre of Excellence for Complex FD, CII API development, KSMs, and Bio Lab (enzymes & fermentation).',
    image: 'pragathi-nagar.jpg',
    ctaHref: '/business/rd',
  },
  {
    id: 'IIT Hyderabad',
    location: 'IITH, India',
    title: 'IIT Hyderabad, India',
    desc: '2 Centres of Excellence focused on Peptide Development and Particle Engineering.',
    image: 'iith.jpg',
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
    image: 'virginia.jpg',
    ctaHref: '/business/fd',
  },
  {
    id: 'switzerland',
    location: 'Zurich, Switzerland',
    title: 'SENN CHEMICALS, SWITZERLAND',
    desc: 'Peptide & CDMO innovation — decades of peptide synthesis expertise.',
    image: 'senn-zurich.jpg',
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
    image: 'priority-01-strengthen.jpg',
  },
  {
    title: 'Building a Differentiated Product Pipeline',
    body: 'Building a differentiated product pipeline focused on complex generics, oncology, CNS and peptides.',
    image: 'priority-02-pipeline.jpg',
  },
  {
    title: 'Accelerate Product Development',
    body: 'Accelerate product development to reduce time-to-market through integrated development and digital tools.',
    image: 'priority-03-accelerate.jpg',
  },
  {
    title: 'Advance Future-Ready Technologies',
    body: 'Advance future-ready technologies through biocatalysis, particle engineering, peptides and digital R&D.',
    image: 'priority-04-future-tech.jpg',
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
    body: 'Water and ethanol replace harmful chlorinated solvents are discouraged, giving emphasis to green solvents',
    image: 'card-solvents.png',
  },
  {
    title: 'Energy-efficient Synthesis Routes',
    body: 'Efforts are always towards running the reactions at ambient temperatures and pressures',
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
  const {
    swipeProps,
    isDragging,
    hasScroll,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
  } = useSwipeScroll();

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

      <p className="cp-breadcrumb" style={{ width: 'min(85%, 1632px)', maxWidth: '1632px', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <span className="cp-breadcrumb-plain">BUSINESS</span>
        <span className="sep">›</span>
        <span className="current">RESEARCH &amp; DEVELOPMENT</span>
      </p>
      <h1 className="cp-page-title">Research &amp; Development</h1>
      <div className="cp-hero-banner">
        <img src={`${R}hero-banner.png`} alt="Granules R&D laboratory" />
        <div className="rd-hero-scrim" />
        <div className="rd-hero-overlay">
          <h2 className="rd-hero-heading">Accelerating Innovation Through Integrated R&D Platform</h2>
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

      {/* R&D Strategic Priorities — same carousel as Peptides CDMO portfolio */}
      <section className="rd-priorities" id="rd-priorities">
        <div className="rd-priorities-head">
          <h2>R&amp;D Strategic Priorities</h2>
        </div>
        <div className="biz-carousel rd-priorities-carousel">
          <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
            {STRATEGIC_PRIORITIES.map((item, index) => {
              const isOpen = openPriority === index;
              return (
                <article
                  className={`biz-card rd-priority-slide${isOpen ? ' is-open' : ''}`}
                  key={item.title}
                  onMouseEnter={() => setOpenPriority(index)}
                  onMouseLeave={() => setOpenPriority(-1)}
                  onClick={() => {
                    if (isDragging) return;
                    setOpenPriority(isOpen ? -1 : index);
                  }}
                >
                  {item.image && (
                    <img
                      className="bg"
                      src={`${R}${item.image}`}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="biz-sheet">
                    <div className="biz-sheet-head">
                      <span className="biz-sheet-title">{item.title}</span>
                      <span className="biz-sheet-symbol" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                    <div className="biz-sheet-body">
                      <p className="biz-sheet-desc">{item.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {hasScroll && (
            <div className="biz-carousel-controls">
              <div className="biz-progress-track">
                <div
                  className="biz-progress-bar"
                  style={{
                    width: `${thumbWidth}%`,
                    left: `${scrollProgress * (100 - thumbWidth)}%`,
                  }}
                />
              </div>
              <div className="biz-carousel-arrows">
                <button
                  type="button"
                  className="biz-arrow-btn"
                  onClick={() => scroll(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Scroll left"
                >
                  <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  type="button"
                  className="biz-arrow-btn"
                  onClick={() => scroll(1)}
                  disabled={!canScrollRight}
                  aria-label="Scroll right"
                >
                  <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          )}
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


      {/* Innovation Enabled by Technology — same panel as Company Values */}
      <section className="cp-values-section rd-tech" aria-label="Innovation enabled by technology">
        <img
          className="cp-bg"
          src="/assets/rd/tech-mesh.jpg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="cp-values-inner">
          <span className="cp-values-badge">Innovation</span>
          <div className="cp-values-grid">
            {TECH_ITEMS.map((item) => (
              <article className="cp-value-card" tabIndex={0} key={item.title}>
                <div className="cp-value-header">
                  <span className="cp-value-icon">
                    <img src={item.icon} alt="" loading="lazy" decoding="async" />
                  </span>
                  <h4 className="cp-value-title-top">{item.title}</h4>
                </div>
                <p className="cp-value-desc">{item.body}</p>
                <h4 className="cp-value-title-bottom" aria-hidden="true">{item.title}</h4>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cascading Alternating Green Chemistry Section */}
      <div className="rd-green-wrapper">
        <div className="rd-green-section">
          <h2>Pioneering Green Pharmaceutical Solutions</h2>
          <h4>
            At Granules India, sustainability is embedded at the molecular level. We apply green chemistry principles, coupled with Our proprietary Eco-Scale framework to evaluate processes across 6 core parameters and 50 sub-parameters, ensuring our chemistries align with operational efficiency, global standards, and environmental stewardship.
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


      <div className="rd-cta">
        <div className="rd-cta-copy">
          <h2>Discover Our Product Portfolio</h2>
          <p>
            Explore our science-led generics, complex formulations, and integrated Active Pharmaceutical Ingredients.
          </p>
        </div>
        <Link className="cp-cta-btn" to="/business/generics">
          GENERICS
        </Link>
      </div>

      <CompanyFooter />
    </div>
  );
}
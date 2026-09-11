import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './business.css';
import './rd.css';

const R = '/assets/rd/';

type SlideData = {
  index: string;
  title: string;
  desc?: string;
  points?: string[];
  image: string | null;
  ctaText?: string;
  ctaHref?: string;
};

type TabData = {
  name: string;
  slides: SlideData[];
};

const CENTER_TABS_DATA: TabData[] = [
  {
    name: 'India R&D Centres',
    slides: [
      {
        index: '01 / 02',
        title: 'GENOME VALLEY R&D,\nTELANGANA',
        desc: 'Integrated Product Development for APIs and Finished Dosages.',
        image: 'hero-banner.png',
        ctaText: 'KNOW MORE',
        ctaHref: '/business/rd',
      },
      {
        index: '02 / 02',
        title: 'PRAGATHI NAGAR R&D,\nTELANGANA',
        desc: 'Centre of Excellence for Complex FD, CII API development, KSMs, and Bio Lab (enzymes & fermentation).',
        image: 'centers-bg.png',
        ctaText: 'KNOW MORE',
        ctaHref: '/business/rd',
      },
    ],
  },
  {
    name: 'Global R&D Centres',
    slides: [
      {
        index: '01 / 02',
        title: 'VIRGINIA R&D,\nUSA',
        desc: 'US-specific complex FD design, controlled substances and clinical support.',
        image: '/assets/facilities/virginia-usa.png',
        ctaText: 'KNOW MORE',
        ctaHref: '/business/fd',
      },
      {
        index: '02 / 02',
        title: 'SENN CHEMICALS,\nSWITZERLAND',
        desc: 'Peptide & CDMO innovation — decades of peptide synthesis expertise.',
        image: 'capabilities-bg.png',
        ctaText: 'KNOW MORE',
        ctaHref: '/business/peptides',
      },
    ],
  },
  {
    name: 'New Technology Platforms',
    slides: [
      {
        index: '01 / 01',
        title: 'PUNE R&D,\nMAHARASHTRA',
        desc: 'New technology platforms with focus on KSM innovation and backward integration.',
        image: 'capabilities-bg.png',
        ctaText: 'KNOW MORE',
        ctaHref: '/business/api',
      },
    ],
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

const TECH_ITEMS: InfoItem[] = [
  {
    title: 'Electronic Lab Notebooks (ELN)',
    body: 'Electronic Lab Notebooks (ELN) for structured, traceable and searchable capture of experimental data.',
  },
  {
    title: 'Design of Experiments (DoE) Software',
    body: 'Design of Experiments (DoE) Software enabling efficient exploration of critical formulation and process variables.',
  },
  {
    title: 'Process Analytical Technology (PAT)',
    body: 'Process Analytical Technology (PAT) for real-time monitoring and control of critical process parameters for Quality by Design (QbD).',
  },
  {
    title: 'AI/ML-Assisted Formulation Development',
    body: 'AI/ML-Assisted Formulation Development to accelerate design decisions across complex formulations and process chemistry.',
  },
  {
    title: 'Predictive Dissolution Modelling',
    body: 'Predictive Dissolution Modelling reducing development risk through in-silico prediction of in-vitro and in-vivo outcomes.',
  },
  {
    title: 'Electronic CMC Documentation Systems',
    body: 'Electronic CMC Documentation Systems supporting faster, more consistent regulatory dossier preparation.',
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
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    document.title = 'R&D and Innovation — Granules India';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prevSlide) => {
        const currentSlides = CENTER_TABS_DATA[activeTabIndex]?.slides || [];
        if (prevSlide + 1 < currentSlides.length) {
          return prevSlide + 1;
        } else {
          setActiveTabIndex((prevTab) => (prevTab + 1) % CENTER_TABS_DATA.length);
          return 0;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeTabIndex]);

  const currentTab = CENTER_TABS_DATA[activeTabIndex] || CENTER_TABS_DATA[0];
  const slides = currentTab.slides;
  const currentSlide = slides[activeSlideIndex] || slides[0];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < slides.length - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    } else {
      setActiveTabIndex((prevTab) => (prevTab + 1) % CENTER_TABS_DATA.length);
      setActiveSlideIndex(0);
    }
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
      <h1 className="cp-page-title">Accelerating Innovation Through Integration and Digitalization</h1>
      <div className="cp-hero-banner">
        <img src={`${R}hero-banner.png`} alt="Granules R&D laboratory" />
        <div className="rd-hero-scrim" />
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
      <div className="rd-priorities">
        <div className="rd-priorities-head">
          <h2>R&amp;D Strategic Priorities</h2>
        </div>
        <div className="rd-priorities-grid">
          {STRATEGIC_PRIORITIES.map((item, i) => (
            <div className={`rd-info-card${item.image ? ' rd-info-card--has-media' : ''}`} key={item.title}>
              {item.image && (
                <div className="rd-info-card-media">
                  <img src={`${R}${item.image}`} alt={item.title} loading="lazy" decoding="async" />
                </div>
              )}
              <span className="rd-info-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* R&D Centers Interactive Section */}
      <div className="rd-centers">
        {currentSlide.image ? (
          <>
            <img
              className="bg"
              src={currentSlide.image.startsWith('/') ? currentSlide.image : `${R}${currentSlide.image}`}
              alt={currentSlide.title.replace('\n', ' ')}
            />
            <div className="overlay" />
          </>
        ) : (
          <>
            <div className="rd-centers-bg--checkerboard" />
            <div className="rd-centers-checkerboard-overlay" />
          </>
        )}

        <div className="rd-centers-nav rd-centers-nav--prev">
          <button
            type="button"
            aria-label="Previous R&D centre"
            onClick={handlePrevSlide}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="rd-centers-nav rd-centers-nav--next">
          <button
            type="button"
            aria-label="Next R&D centre"
            onClick={handleNextSlide}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="rd-centers-content">
          <div className="rd-centers-top-row">
            <div>
              <span className="rd-center-badge">R&amp;D Center</span>
              <h2>Our Global R&amp;D Network</h2>
              <h4 className="rd-centers-intro">
                Our R&amp;D infrastructure spans multiple centres of excellence, each contributing
                specialised expertise while operating within an integrated development framework.
              </h4>
            </div>
          </div>

          <div className="rd-centers-slide">
            <h3 className="rd-slide-title">{currentSlide.title}</h3>

            {currentSlide.desc && (
              <p className="rd-slide-desc">{currentSlide.desc}</p>
            )}

            {currentSlide.points && (
              <ul className="rd-slide-points">
                {currentSlide.points.map((pt) => (
                  <li key={pt}>
                    <svg className="rd-bullet-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" />
                      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rd-centers-tabs">
          {CENTER_TABS_DATA.map((tab, index) => (
            <button
              type="button"
              className={`rd-centers-tab${activeTabIndex === index ? ' active' : ''}`}
              key={tab.name}
              onClick={() => {
                setActiveTabIndex(index);
                setActiveSlideIndex(0);
              }}
            >
              <span>{tab.name}</span>
              <svg className="rd-tab-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
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
          {TECH_ITEMS.map((item, i) => (
            <div className="rd-info-card" key={item.title}>
              <span className="rd-info-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
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

      <h2 className="rd-eco-note">
        Our proprietary Eco-Scale framework evaluates processes across six core parameters and 38 sub-parameters, ensuring our chemistries align with operational efficiency, global standards, and environmental stewardship.
      </h2>

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
        <img className="bg" src={`${R}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="rd-cta-copy">
          <h2>Discover Our Product Portfolio</h2>
          <div className="rd-cta-links">
            <Link className="rd-know-more-btn" to="/business/generics">Generics</Link>
          </div>
        </div>
      </div>

      <CompanyFooter />
    </div>
  );
}

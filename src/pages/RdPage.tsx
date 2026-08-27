import { useEffect, useState } from 'react';
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
  needClarity?: boolean;
  ctaText?: string;
  ctaHref?: string;
};

type TabData = {
  name: string;
  slides: SlideData[];
};

const CENTER_TABS_DATA: TabData[] = [
  {
    name: 'Integrated Product Development',
    slides: [
      {
        index: '01 / 02',
        title: 'GENOME VALLEY R&D,\nHYDERABAD',
        desc: 'State-of-the-art facility spanning APIs and Finished Dosages with focus on oncology and complex generics.',
        image: 'hero-banner.png',
        needClarity: true,
        ctaText: 'KNOW MORE',
        ctaHref: '/business/rd',
      },
      {
        index: '02 / 02',
        title: 'GAGILLAPUR R&D,\nTELANGANA',
        desc: 'Formulation development & PFI innovation center for advanced solid oral dosage delivery.',
        image: 'capabilities-bg.png',
        needClarity: true,
        ctaText: 'KNOW MORE',
        ctaHref: '/business/rd',
      },
    ],
  },
  {
    name: 'Controlled Substances',
    slides: [
      {
        index: '01 / 02',
        title: 'PRAGATHI NAGAR R&D,\nTELANGANA',
        points: [
          'Centre of Excellence for CII API development',
          'Focus on select KSMs',
        ],
        image: 'centers-bg.png',
        needClarity: true,
        ctaText: 'KNOW MORE',
        ctaHref: '/business/rd',
      },
      {
        index: '02 / 02',
        title: 'GPI R&D',
        points: [
          'Develops complex finished dosages under CII.',
          'Specialized in high-barrier technologies for differentiated formulations.',
        ],
        image: null,
        needClarity: true,
        ctaText: 'KNOW MORE',
        ctaHref: '/business/rd',
      },
    ],
  },
  {
    name: 'New Technologies',
    slides: [
      {
        index: '01 / 02',
        title: 'BIO LAB AT PRAGATHI\nNAGAR, TELANGANA',
        desc: 'Focused on enzyme and fermentation capabilities to enable novel product pathways.',
        image: null,
        needClarity: true,
        ctaText: 'KNOW MORE',
        ctaHref: '/business/rd',
      },
      {
        index: '02 / 02',
        title: 'PUNE R&D',
        desc: 'Developing new technology platforms with a focus on KSM innovation and backward integration.',
        image: null,
        needClarity: true,
        ctaText: 'KNOW MORE',
        ctaHref: '/business/rd',
      },
    ],
  },
];

type CapabilityItem = {
  title: string;
  body: string;
  icon: string;
};

const CAPABILITY_ITEMS: CapabilityItem[] = [
  {
    title: 'Targeting High Barrier Segments',
    body: 'Our API R&D is advancing high-barrier products in oncology and metabolic disorders through novel polymorphs, amorphous solid dispersions, and strategic collaborations with the Indian Institute of Technology (IIT) Hyderabad, National Institute of Pharmaceutical Education and Research (NIPER), CSIR-Indian Institute of Chemical Technology, and global partners.',
    icon: 'icon-pills.svg',
  },
  {
    title: 'Biocatalysis as a Strategic Platform',
    body: 'Developing clean, enzyme-catalyzed synthesis pathways that replace hazardous reagents, achieve high stereo-selectivity, and reduce environmental impact.',
    icon: 'icon-circles.svg',
  },
  {
    title: 'Enzyme & Biotransformation Technologies',
    body: 'Leveraging immobilized enzymes, engineered biocatalysts, and continuous flow biotransformations for sustainable, commercial-scale production.',
    icon: 'icon-dna.svg',
  },
];

type GreenCard = {
  title: string;
  body: string;
  image: string;
};

const GREEN_CARDS: GreenCard[] = [
  {
    title: 'CATALYSIS OVER STOICHIOMETRIC REAGENTS',
    body: 'Less waste, more efficiency',
    image: 'card-catalysis.png',
  },
  {
    title: 'USAGE OF SAFER SOLVENTS',
    body: 'Water and ethanol replace harmful chlorinated hydrocarbons',
    image: 'card-solvents.png',
  },
  {
    title: 'ENERGY-EFFICIENT SYNTHESIS ROUTES',
    body: 'Reactions run at ambient temperatures and pressures',
    image: 'card-synthesis.png',
  },
  {
    title: 'BIOCATALYSIS & NOVEL PLATFORMS',
    body: 'Cleaner transformations with fewer by-products',
    image: 'card-biocatalysis.png',
  },
];

export default function RdPage() {
  const [openCapability, setOpenCapability] = useState<number>(0);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(1);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    document.title = 'R&D and Innovation — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const currentTab = CENTER_TABS_DATA[activeTabIndex] || CENTER_TABS_DATA[0];
  const slides = currentTab.slides;
  const currentSlide = slides[activeSlideIndex] || slides[0];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Business</span>
        <span className="sep">{'>'}</span>
        <span className="current">Research &amp; Development</span>
      </p>
      <h1 className="cp-page-title">R&amp;D and innovation</h1>
      <div className="cp-hero-banner">
        <img src={`${R}hero-banner.png`} alt="Granules R&D laboratory" />
      </div>

      <div className="rd-intro">
        <p>
          At Granules India, research and development drives our transformation into a vertically
          integrated and diversified pharmaceutical company. Our comprehensive R&amp;D ecosystem
          spanning APIs, PFIs, and FDs, enables us to deliver safe, effective, and affordable
          healthcare solutions across regulated and emerging markets.
        </p>
        <p>
          With over 400 scientists across four global R&amp;D centres, we specialise in
          cost-efficient, regulatory-compliant, and commercially scalable product development.{' '}
          <span className="muted">
            Our efforts cover the entire pharmaceutical value chain, from chemical intermediates
            and APIs to finished dosages&mdash;designed for speed, quality, and global alignment.
          </span>
        </p>
      </div>

      {/* R&D Centers Interactive Section */}
      <div className="rd-centers">
        {currentSlide.image ? (
          <>
            <img className="bg" src={`${R}${currentSlide.image}`} alt="" />
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
              <h2>Revolutionizing global manufacturing</h2>
            </div>
            {currentSlide.needClarity && (
              <div className="rd-clarity-badge">
                Need Clarity in facilities images
              </div>
            )}
          </div>

          <div className="rd-centers-slide">
            <p className="rd-slide-index">{currentSlide.index}</p>
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

            <a className="rd-know-more-btn" href={currentSlide.ctaHref || '/business/rd'}>
              {currentSlide.ctaText || 'KNOW MORE'}
            </a>
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

      {/* Building capabilities in complex and sustainable chemistry */}
      <div className="biz-panel">
        <img className="bg" src={`${R}capabilities-bg.png`} alt="Complex chemistry and biocatalysis laboratory" />
        <div className="overlay" />
        <div className="biz-panel-grid">
          <div className="biz-panel-head">
            <h2>Building capabilities in complex and sustainable chemistry</h2>
          </div>
          <div className="biz-accordion">
            {CAPABILITY_ITEMS.map((item, index) => {
              const isOpen = openCapability === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  className={`biz-accordion-item${isOpen ? '' : ' collapsed'}`}
                  onClick={() => setOpenCapability(isOpen ? -1 : index)}
                >
                  <div className="biz-accordion-head">
                    <div className="biz-accordion-icon-row">
                      <span className="biz-accordion-icon">
                        <img src={`${R}${item.icon}`} alt="" />
                      </span>
                      <p className="biz-accordion-title">{item.title}</p>
                    </div>
                    <span className="biz-accordion-toggle">
                      <img src={`${R}${isOpen ? 'icon-minus.svg' : 'icon-plus.svg'}`} alt={isOpen ? 'Collapse' : 'Expand'} />
                    </span>
                  </div>
                  {isOpen && item.body && <p className="biz-accordion-body">{item.body}</p>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cascading Alternating Green Chemistry Section */}
      <div className="rd-green-wrapper">
        <div className="rd-green-section">
          <h2>Pioneering green pharmaceutical solutions</h2>
          <p>
            At Granules India, sustainability is embedded at the molecular level. We apply green
            chemistry principles, such as atom economy, e-factor optimization, and solvent
            minimization, across every stage of product development. Examples include:
          </p>
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

      <p className="rd-eco-note scroll-intro">
        <span className="part-1">Our proprietary Eco-Scale framework evaluates processes across six core </span>
        <span className="part-2 muted">
          parameters and 38 sub-parameters, ensuring our chemistries align with operational efficiency,
          global standards, and environmental stewardship.
        </span>
      </p>

      <div className="rd-cta">
        <img className="bg" src={`${R}cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="rd-cta-copy">
          <h2>Global manufacturing powerhouse</h2>
          <p>
            GMP-compliant facilities across India and the US enable consistent, high-quality,
            large-scale production for global pharmaceutical partners.
          </p>
        </div>
        <a className="cp-cta-btn" href="/company/facilities">Facilities</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

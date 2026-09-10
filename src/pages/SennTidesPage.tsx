import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { useSwipeScroll } from '../hooks/useSwipeScroll';
import '../components/company/company.css';
import './business.css';
import './senn-tides.css';

interface CapabilityCard {
  title: string;
  image: string;
  desc: string;
}

const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title: 'Peptide APIs',
    image: '/assets/ascelis/card-peptide-apis.webp',
    desc: 'Peptides ranging from short sequences to chains exceeding 40 amino acid residues, including cyclic, bridged and lipidated structures.',
  },
  {
    title: 'Amino Acid Derivatives',
    image: '/assets/ascelis/card-cdmo-services.webp',
    desc: 'Senn Chemicals pioneered AAD synthesis and it remains a core capability. Our catalogue includes more than 190 SKUs, including Fmoc-, Boc- and Z-protected derivatives, beta-amino acids, N-methylated derivatives and side-chain-modified derivatives. Selected derivatives can be manufactured under the same cGMP quality systems applied to our peptide APIs.',
  },
  {
    title: 'Peptide Fragments',
    image: '/assets/peptides/card-generic-apis.webp',
    desc: 'Building blocks supplied to innovators and to other peptide manufacturers.',
  },
  {
    title: 'Theranostic Peptides',
    image: '/assets/ascelis/card-theragnostic-peptides.webp',
    desc: 'Linker-ready peptides, chelator conjugation, purification and characterisation. We have delivered more than ten GMP campaigns, including cold-side precursor supply at commercial scale.',
  },
  {
    title: 'Cosmetic Peptides',
    image: '/assets/ascelis/card-cosmetic-peptides.webp',
    desc: 'TFA-free peptide ingredients developed for the European cosmetics market.',
  },
  {
    title: 'Oligonucleotides and Antibody-Drug Conjugates',
    image: '/assets/peptides/card-contract-services.webp',
    desc: 'Expansion is underway.',
  },
];

const SYNTHESIS_ROUTES = [
  {
    route: 'Solid phase (SPPS)',
    scale: 'mg to a few kg',
    advantage: 'Complex and lower-volume peptides',
  },
  {
    route: 'Liquid phase (LPPS)',
    scale: '5 kg to tons',
    advantage: 'Large-scale manufacturing',
  },
  {
    route: 'Hybrid',
    scale: 'Project-dependent',
    advantage: 'Combination of SPPS and LPPS',
  },
  {
    route: 'Tag-assisted (TAPS)',
    scale: 'Project-dependent',
    advantage: 'Reduced purification burden',
  },
];

const PHASES_DATA = [
  {
    phase: '1',
    quantity: 'Under 1 g',
    stage: 'Feasibility & Scouting',
    activity: 'Feasibility, analytical sample, route finding',
  },
  {
    phase: '2',
    quantity: 'Under 100 g',
    stage: 'Process Development',
    activity: 'Process and purification development, representative sample',
  },
  {
    phase: '3',
    quantity: '1 to 10 kg',
    stage: 'Scale-Up & Pilot',
    activity: 'Scale-up, pilot or initial production batch',
  },
  {
    phase: '4',
    quantity: 'Above 10 kg',
    stage: 'Commercial Production',
    activity: 'Commercial production with capability extending to ton scale',
  },
];

const MANUFACTURING_DATA = [
  {
    category: 'GMP Manufacturing, Dielsdorf',
    badge: 'Switzerland Facility',
    description: 'Commercial and pilot cGMP production hub with comprehensive synthesis, purification, and isolation suites.',
    items: [
      'Stainless steel reactor 2,500 L, operating from -20 °C to 150 °C',
      'Glass-lined reactors range from 100 to 2,500 L, operating from -20 °C to 150 °C',
      'Hydrogenation reactors range from 20 to 2,500 L, operating at pressures up to 6 bar',
      'SPPS synthesizer, with capacity for up to 12 kg of resin',
      'Preparative HPLC chromatography using DAC columns up to 30 cm internal diameter',
      'Filtration using Nutsche and pressurised filters, together with centrifugation under nitrogen',
      'Vacuum tray drying, filter drying and lyophilisation with an ice-condensing capacity of up to 20 kg',
    ],
  },
  {
    category: 'Kilo Laboratory',
    badge: 'Pilot & Scale-Up',
    description: 'Specialized kilo-scale pilot plant for process optimization and mid-scale intermediate development.',
    items: [
      'Jacketed glass reactors range from 10 to 30 L',
      'Hydrogenation reactors up to 20 L',
      'Purification by ion exchange, reversed phase HPLC and normal phase chromatography',
    ],
  },
  {
    category: 'Small-Scale GMP Laboratory',
    badge: 'Clinical Supply',
    description: 'Controlled cGMP environment designed for early-phase clinical batches and precision aliquoting.',
    items: [
      'LPPS from mg to 0.5 kg, SPPS at 0.5, 2 and 5 L',
      'Double-jacketed glass reactors, 0.25 to 5 L, -40 °C to 180 °C',
      'API aliquoting into vials, up to 2,000 vials per batch',
      'Open product handling under laminar airflow within a Grade D equivalent environment',
    ],
  },
];

const ANALYTICAL_CAPABILITIES = [
  'Physical characterisation',
  'Impurity identification',
  'Residual-solvent testing',
  'Pharmacopeial testing',
  'Chromatographic assays',
  'Enantiomeric-purity analysis',
  'Spectrometric techniques',
  'HPLC and GC',
  'Potentiometric titration',
  'Karl Fischer water determination',
  'LC-MS',
  'Circular dichroism',
  'MALS',
];

const COMPLIANCE_PILLARS = [
  {
    title: 'ISO 9001:2015 & Swissmedic cGMP',
    badge: 'Authorized Compliance',
    text: 'Senn Chemicals is ISO 9001:2015 certified and authorized by Swissmedic for cGMP manufacturing of peptide APIs and custom derivatives.',
  },
  {
    title: 'Switzerland–United States GMP MRA',
    badge: 'Mutual Recognition',
    text: 'The site operates within the regulatory context of the Switzerland–United States GMP Mutual Recognition Agreement for streamlined global filings.',
  },
  {
    title: 'Global Filing & Audit Readiness',
    badge: 'Worldwide Markets',
    text: 'We operate quality systems, documentation practices and change-control processes designed to support customer filings in the United States, Europe and other regulated markets.',
  },
];

const FOOTPRINT_LIST = [
  {
    country: 'Switzerland',
    location: 'Senn Chemicals AG, Dielsdorf, Zurich',
    details: 'R&D, kilo-scale development, GMP production, QC, QA and warehousing. The site employs more than 80 people and has been operational since 1963.',
  },
  {
    country: 'India',
    location: 'Development Centre, Hyderabad',
    details: 'Development, process optimisation, structural characterisation and analytical capabilities at Technology Research Park, IIT Hyderabad.',
  },
  {
    country: 'India',
    location: 'Manufacturing Facility, Vizag',
    details: 'Large-scale peptide manufacturing facility under development on a 283,000 sq. ft. site, with completion expected by December 2027.',
  },
];

const LEADERSHIP_TEAM = [
  {
    name: 'Sanjay Kumar',
    title: 'Chief Executive Officer',
  },
  {
    name: 'Frédéric Besançon',
    title: 'Chief Executive Officer, Senn Chemicals',
  },
  {
    name: 'Dr Srinivas PV',
    title: 'Chief Scientific Officer',
  },
  {
    name: 'Markus Löweneck',
    title: 'Head of Corporate R&D',
  },
];

export default function SennTidesPage() {
  const [openCard, setOpenCard] = useState<number>(-1);
  const {
    swipeProps,
    isDragging,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
  } = useSwipeScroll();

  useEffect(() => {
    document.title = 'Senn Tides | Peptide CDMO in Switzerland and India | Granules India';

    const descriptionContent =
      'Senn Tides is Granules India’s peptide CDMO platform, providing custom peptide APIs, amino acid derivatives, fragments and theranostic peptides from feasibility through commercial supply.';

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

      {/* Breadcrumbs */}
      <p className="cp-breadcrumb">
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/company">ABOUT US</Link>
        <span className="sep">›</span>
        <Link to="/company/global-subsidiaries">GLOBAL SUBSIDIARIES</Link>
        <span className="sep">›</span>
        <span className="current">SENN TIDES</span>
      </p>

      {/* Page Title */}
      <h1 className="senn-page-header">Senn Tides Private Limited</h1>

      {/* Hero Banner */}
      <div className="senn-hero-wrap">
        <div className="cp-hero-banner">
          <img
            src="/assets/ascelis/hero-banner.webp"
            alt="Senn Tides Integrated CDMO Facility"
            loading="eager"
            decoding="async"
          />
          <div className="senn-hero-scrim" />
          <div className="senn-hero-overlay">
            <span className="senn-hero-badge">
              <span className="senn-flag-dot" />
              Switzerland &amp; India
            </span>
            <h2 className="senn-hero-heading">
              Integrated CDMO Platform. Switzerland and India.
            </h2>
          </div>
        </div>
      </div>

      {/* Overview Intro */}
      <section className="senn-intro" aria-label="Overview">
        <h4>
          Senn Tides is a wholly owned subsidiary of Granules India and its integrated CDMO platform, with an established foundation in peptides and expansion into oligonucleotides and antibody-drug conjugates underway. It was incorporated in June 2025 following Granules India&rsquo;s acquisition of Senn Chemicals AG, a Swiss peptide CDMO founded in Dielsdorf, Zurich, in 1963.
        </h4>
        <h4>
          We operate development and manufacturing capabilities across Dielsdorf, Switzerland, and Hyderabad, India. Zurich operations form the core of our CDMO offerings, with a long track record in R&amp;D, process development and small-scale manufacturing of peptide APIs, peptide fragments and protected AADs for pharmaceutical innovators, cosmetic companies and theranostic developers. Building on this Swiss foundation, Senn Tides is developing a two-continent operating model, with complementary large-scale infrastructure, R&amp;D and manufacturing in India.
        </h4>
        <h4>
          Customers are supported by one integrated platform and project team across both geographies.
        </h4>
      </section>

      {/* What We Do Section */}
      <section className="senn-section-head" aria-label="What We Do">
        <div className="copy">
          <span className="cp-section-badge">What We Do</span>
          <h2>What We Do</h2>
          <h4>
            We provide custom development and manufacturing services for peptide ingredients, from route selection and process development through scale-up, validation and commercial supply.
          </h4>
        </div>
        <a className="cp-cta-btn" href="https://www.sennchem.com" target="_blank" rel="noreferrer">
          Visit Senn Chemicals ↗
        </a>
      </section>

      {/* Interactive Capabilities Carousel */}
      <div className="biz-carousel senn-portfolio-carousel">
        <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
          {CAPABILITY_CARDS.map((card, idx) => {
            const isOpen = openCard === idx;
            return (
              <article
                className={`biz-card senn-cap-article${isOpen ? ' is-open' : ''}`}
                key={card.title}
                onMouseEnter={() => setOpenCard(idx)}
                onMouseLeave={() => setOpenCard(-1)}
                onClick={() => {
                  if (isDragging) return;
                  setOpenCard(isOpen ? -1 : idx);
                }}
              >
                <img className="bg" src={card.image} alt={card.title} loading="lazy" decoding="async" />
                <div className="biz-sheet">
                  <div className="biz-sheet-head">
                    <span className="biz-sheet-title">{card.title}</span>
                    <span className="biz-sheet-symbol" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  <div className="biz-sheet-body">
                    <p className="biz-sheet-desc">{card.desc}</p>
                    <span className="biz-sheet-learn">LEARN MORE ↗</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Controls */}
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
      </div>

      <div className="senn-audience-note">
        <div className="senn-audience-note-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <p>
          We work with pharmaceutical innovators, cosmetic brand owners and specialty therapeutic developers.
        </p>
      </div>

      {/* Four Synthesis Routes Table */}
      <section className="senn-routes-section" aria-label="Four Synthesis Routes">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Synthesis Methodologies</span>
            <h2>Four Synthesis Routes</h2>
            <h4>
              Most peptide manufacturers run one synthesis platform and fit every molecule to it. Our platform brings together four synthesis approaches, enabling route selection based on the molecule, target scale and purification requirements.
            </h4>
          </div>
        </div>

        <div className="senn-routes-table-wrap">
          <table className="senn-routes-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Typical Scale</th>
                <th>Key Application or Advantage</th>
              </tr>
            </thead>
            <tbody>
              {SYNTHESIS_ROUTES.map((row) => (
                <tr key={row.route}>
                  <td className="senn-route-name">{row.route}</td>
                  <td>
                    <span className="senn-route-scale">{row.scale}</span>
                  </td>
                  <td>{row.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Why Liquid Phase Matters Callout */}
        <div className="senn-lpps-callout">
          <h3 className="callout-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Why Liquid Phase Matters
          </h3>
          <h4>
            For suitable molecules, LPPS can offer substantially lower process mass intensity than SPPS and may reduce or eliminate chromatography, supporting the commercial viability of large-scale peptide manufacturing.
          </h4>
        </div>
      </section>

      {/* From Feasibility to Commercial Supply (Signature Ice-Blue Boxes Grid) */}
      <section className="senn-block-section" aria-label="From Feasibility to Commercial Supply">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Development Lifecycle</span>
            <h2>From Feasibility to Commercial Supply</h2>
            <h4>
              Programs can progress from feasibility to commercial supply within the same CDMO platform, reducing the need for an external vendor transfer.
            </h4>
          </div>
        </div>

        <div className="senn-stat-grid-4">
          {PHASES_DATA.map((p) => (
            <article className="senn-stat-card" key={p.phase}>
              <span className="senn-stat-num">{p.quantity}</span>
              <span className="senn-stat-tag">Phase {p.phase} &bull; {p.stage}</span>
              <p className="senn-stat-text">{p.activity}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Manufacturing Capacity (Signature Ice-Blue Cards Grid) */}
      <section className="senn-block-section" aria-label="Manufacturing Capacity">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Infrastructure &amp; Scale</span>
            <h2>Manufacturing Capacity</h2>
            <h4>
              Comprehensive pilot, clinical, and commercial equipment trains operating under Swissmedic cGMP standards.
            </h4>
          </div>
        </div>

        <div className="senn-mfg-grid-3">
          {MANUFACTURING_DATA.map((block) => (
            <article className="senn-mfg-box" key={block.category}>
              <div className="senn-mfg-box-head">
                <span className="senn-stat-tag">{block.badge}</span>
                <h3 className="senn-mfg-box-title">{block.category}</h3>
                <p className="senn-mfg-box-desc">{block.description}</p>
              </div>
              <ul className="senn-mfg-box-list">
                {block.items.map((item, idx) => (
                  <li key={idx}>
                    <span className="senn-box-bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Development and Analytical Support */}
      <section className="senn-block-section" aria-label="Development and Analytical Support">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">R&amp;D &amp; Analytics</span>
            <h2>Development and Analytical Support</h2>
            <h4>
              An experienced R&amp;D team, including doctoral-level scientists, provides route scouting, process development, analytical method development and validation, stability studies, DMF preparation and technology-transfer support.
            </h4>
          </div>
        </div>

        <div className="senn-analytics-card">
          <div className="senn-analytics-intro">
            <span className="senn-stat-tag">Analytical Suite</span>
            <h3 className="senn-analytics-heading">Specialized Testing &amp; Structural Characterization</h3>
            <p>
              Our comprehensive testing protocols ensure complete impurity identification, purity profiling, and regulatory readiness across all synthesis pathways:
            </p>
          </div>
          <div className="senn-pills-wrap">
            {ANALYTICAL_CAPABILITIES.map((cap) => (
              <span className="senn-blue-pill" key={cap}>{cap}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Quality and Compliance (Ice-Blue 3-Card Grid) */}
      <section className="senn-block-section" aria-label="Quality and Compliance">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Quality Systems</span>
            <h2>Quality and Compliance</h2>
            <h4>
              Operating to the highest global standards with authorization from Swissmedic and alignment with international regulatory frameworks.
            </h4>
          </div>
        </div>

        <div className="senn-grid-3">
          {COMPLIANCE_PILLARS.map((pillar) => (
            <article className="senn-feature-card" key={pillar.title}>
              <span className="senn-stat-tag">{pillar.badge}</span>
              <h3 className="senn-feature-title">{pillar.title}</h3>
              <p className="senn-feature-desc">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Footprint (Ice-Blue 3-Card Grid) */}
      <section className="senn-block-section" aria-label="Global Footprint">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Locations</span>
            <h2>Footprint</h2>
            <h4>
              Operating across Switzerland and India with established European facilities and major capacity additions underway.
            </h4>
          </div>
        </div>

        <div className="senn-grid-3">
          {FOOTPRINT_LIST.map((loc, i) => (
            <article className="senn-feature-card" key={i}>
              <span className="senn-stat-tag">{loc.country}</span>
              <h3 className="senn-feature-title">{loc.location}</h3>
              <p className="senn-feature-desc">{loc.details}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Building Capacity in India (Ice-Blue 2-Card Grid) */}
      <section className="senn-block-section" aria-label="Building Capacity in India">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">India Expansion</span>
            <h2>Building Capacity in India</h2>
            <h4>
              Scaling next-generation development infrastructure and commercial manufacturing in India.
            </h4>
          </div>
        </div>

        <div className="senn-grid-2">
          <article className="senn-feature-card">
            <span className="senn-stat-tag">IIT Hyderabad &bull; R&amp;D Centre</span>
            <h3 className="senn-feature-title">Technology Research Park Development Centre</h3>
            <p className="senn-feature-desc">
              Dedicated development centre at IIT Hyderabad supporting route scouting, process optimization, and structural characterization across LPPS, SPPS, hybrid, and tag-assisted synthesis with comprehensive LC-MS, CD, MALS, and HPLC testing suites.
            </p>
          </article>
          <article className="senn-feature-card">
            <span className="senn-stat-tag">Vizag Site &bull; 283,000 Sq. Ft.</span>
            <h3 className="senn-feature-title">Commercial Manufacturing Facility (Dec 2027)</h3>
            <p className="senn-feature-desc">
              Large-scale multi-ton peptide manufacturing facility under construction across a 283,000 sq. ft. campus in Visakhapatnam. Scheduled for completion by December 2027 to deliver commercial-scale peptide and oligonucleotide CDMO supply.
            </p>
          </article>
        </div>
      </section>

      {/* Leadership (Ice-Blue 4-Card Grid) */}
      <section className="senn-block-section" aria-label="Leadership">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Leadership</span>
            <h2>Executive Leadership</h2>
            <h4>
              Guided by experienced scientific and commercial leaders driving peptide CDMO innovation worldwide.
            </h4>
          </div>
        </div>

        <div className="senn-lead-grid-4">
          {LEADERSHIP_TEAM.map((leader) => (
            <article className="senn-lead-stat-card" key={leader.name}>
              <h3 className="senn-lead-stat-name">{leader.name}</h3>
              <span className="senn-stat-tag">{leader.title}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Contact Locations (Ice-Blue 2-Card Grid) */}
      <section className="senn-block-section" aria-label="Contact">
        <div className="senn-section-head">
          <div className="copy">
            <span className="cp-section-badge">Contact</span>
            <h2>Connect with Our CDMO Team</h2>
            <h4>
              Discuss your development and manufacturing program with Senn Tides across our Swiss and Indian headquarters.
            </h4>
          </div>
        </div>

        <div className="senn-grid-2">
          <article className="senn-feature-card">
            <span className="senn-stat-tag">Switzerland Headquarters</span>
            <h3 className="senn-feature-title">Senn Chemicals AG</h3>
            <address className="senn-address-text">
              Industriestrasse 12<br />
              CH-8157 Dielsdorf, Zurich<br />
              Switzerland
            </address>
          </article>
          <article className="senn-feature-card">
            <span className="senn-stat-tag">India Headquarters</span>
            <h3 className="senn-feature-title">Senn Tides Private Limited</h3>
            <address className="senn-address-text">
              15th Floor, Granules Tower,<br />
              Botanical Garden Road, Kondapur,<br />
              Hyderabad 500084, Telangana<br />
              India
            </address>
          </article>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="senn-cta" aria-label="Connect with Senn Tides">
        <div className="senn-cta-copy">
          <h2>Discuss Your Development and Manufacturing Program with Senn Tides</h2>
          <h4>
            Connect with our CDMO team for peptide feasibility, process development, scale-up or commercial supply.
          </h4>
          <div className="senn-cta-links">
            <span>Email: <a href="mailto:sales@sennchem.com">sales@sennchem.com</a></span>
            <span>Web: <a href="https://www.sennchem.com" target="_blank" rel="noreferrer">www.sennchem.com</a></span>
          </div>
        </div>

        <div className="senn-cta-actions">
          <Link to="/contact" className="senn-cta-btn senn-cta-btn--primary">
            <span>Connect With Us</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="https://www.sennchem.com"
            target="_blank"
            rel="noreferrer"
            className="senn-cta-btn senn-cta-btn--secondary"
          >
            <span>Visit Senn Chemicals</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </section>

      <CompanyFooter />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
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

const PHASES = [
  {
    phase: '1',
    quantity: 'Under 1 g',
    activity: 'Feasibility, analytical sample, route finding',
  },
  {
    phase: '2',
    quantity: 'Under 100 g',
    activity: 'Process and purification development, representative sample',
  },
  {
    phase: '3',
    quantity: '1 to 10 kg',
    activity: 'Scale-up, pilot or initial production batch',
  },
  {
    phase: '4',
    quantity: 'Above 10 kg',
    activity: 'Commercial production with capability extending to ton scale',
  },
];

const GMP_CAPACITY_ITEMS = [
  'Stainless steel reactor 2,500 L, operating from -20 °C to 150 °C',
  'Glass-lined reactors range from 100 to 2,500 L, operating from -20 °C to 150 °C',
  'Hydrogenation reactors range from 20 to 2,500 L, operating at pressures up to 6 bar',
  'SPPS synthesizer, with capacity for up to 12 kg of resin',
  'Preparative HPLC chromatography using DAC columns up to 30 cm internal diameter',
  'Filtration using Nutsche and pressurised filters, together with centrifugation under nitrogen',
  'Vacuum tray drying, filter drying and lyophilisation with an ice-condensing capacity of up to 20 kg',
];

const KILO_LAB_ITEMS = [
  'Jacketed glass reactors range from 10 to 30 L',
  'Hydrogenation reactors up to 20 L',
  'Purification by ion exchange, reversed phase HPLC and normal phase chromatography',
];

const SMALL_SCALE_GMP_ITEMS = [
  'LPPS from mg to 0.5 kg, SPPS at 0.5, 2 and 5 L',
  'Double-jacketed glass reactors, 0.25 to 5 L, -40 °C to 180 °C',
  'API aliquoting into vials, up to 2,000 vials per batch',
  'Open product handling under laminar airflow within a Grade D equivalent environment',
];

const ANALYTICAL_TAGS = [
  'Physical characterisation',
  'Impurity identification',
  'Residual-solvent testing',
  'Pharmacopeial testing',
  'Chromatographic assays',
  'Enantiomeric-purity analysis',
  'Spectrometric techniques',
  'HPLC',
  'GC',
  'Potentiometric titration',
  'Karl Fischer water determination',
];

const LEADERSHIP = [
  {
    name: 'Sanjay Kumar',
    role: 'Chief Executive Officer',
    initials: 'SK',
  },
  {
    name: 'Frédéric Besançon',
    role: 'Chief Executive Officer, Senn Chemicals',
    initials: 'FB',
  },
  {
    name: 'Dr Srinivas PV',
    role: 'Chief Scientific Officer',
    initials: 'SP',
  },
  {
    name: 'Markus Löweneck',
    role: 'Head of Corporate R&D',
    initials: 'ML',
  },
];

export default function SennTidesPage() {
  const [openCard, setOpenCard] = useState<number>(-1);

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

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      'peptide CDMO Switzerland and India, custom peptide synthesis, peptide API manufacturer, amino acid derivatives, LPPS peptide manufacturing, Senn Chemicals'
    );

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      {/* Breadcrumbs */}
      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOMEPAGE</Link>
        <span className="sep">›</span>
        <Link to="/company">COMPANY</Link>
        <span className="sep">›</span>
        <span className="current">SENN TIDES</span>
      </p>

      {/* Page Title */}
      <h1 className="senn-page-header">Senn Tides Private Limited</h1>

      {/* Hero Visual Banner */}
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
            <span className="senn-hero-badge">Switzerland &amp; India</span>
            <h2 className="senn-hero-heading">
              Integrated CDMO Platform. Switzerland and India.
            </h2>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="senn-intro" aria-label="Overview">
        <p>
          <span>
            Senn Tides is a wholly owned subsidiary of Granules India and its integrated CDMO platform, with an established foundation in peptides and expansion into oligonucleotides and antibody-drug conjugates underway.{' '}
          </span>
          <span className="muted">
            It was incorporated in June 2025 following Granules India&rsquo;s acquisition of Senn Chemicals AG, a Swiss peptide CDMO founded in Dielsdorf, Zurich, in 1963.
          </span>
        </p>
        <p>
          We operate development and manufacturing capabilities across Dielsdorf, Switzerland, and Hyderabad, India. Zurich operations form the core of our CDMO offerings, with a long track record in R&amp;D, process development and small-scale manufacturing of peptide APIs, peptide fragments and protected AADs for pharmaceutical innovators, cosmetic companies and theranostic developers. Building on this Swiss foundation, Senn Tides is developing a two-continent operating model, with complementary large-scale infrastructure, R&amp;D and manufacturing in India.
        </p>
        <p>
          Customers are supported by one integrated platform and project team across both geographies.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="senn-section-head" aria-label="What We Do">
        <div className="copy">
          <span className="cp-section-badge">What We Do</span>
          <h2>Custom Development &amp; Manufacturing Services</h2>
          <p>
            We provide custom development and manufacturing services for peptide ingredients, from route selection and process development through scale-up, validation and commercial supply.
          </p>
        </div>
        <a className="cp-cta-btn" href="http://www.sennchem.com" target="_blank" rel="noreferrer">
          Visit Senn Chemicals ↗
        </a>
      </section>

      {/* Interactive Capabilities Grid */}
      <div className="senn-capabilities-grid">
        {CAPABILITY_CARDS.map((card, idx) => {
          const isOpen = openCard === idx;
          return (
            <article
              className={`biz-card senn-cap-article${isOpen ? ' is-open' : ''}`}
              key={card.title}
              onMouseEnter={() => setOpenCard(idx)}
              onMouseLeave={() => setOpenCard(-1)}
              onClick={() => setOpenCard(isOpen ? -1 : idx)}
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

      <div style={{ width: '85%', margin: '28px auto 0' }}>
        <p style={{ font: "500 18px/1.6 'Manrope', sans-serif", color: 'var(--n7, #4b5563)', margin: 0 }}>
          We work with pharmaceutical innovators, cosmetic brand owners and specialty therapeutic developers.
        </p>
      </div>

      {/* Four Synthesis Routes Section */}
      <section className="senn-routes-section" aria-label="Four Synthesis Routes">
        <div className="senn-section-head" style={{ width: '100%', margin: 0 }}>
          <div className="copy">
            <span className="cp-section-badge">Synthesis Methodologies</span>
            <h2>Four Synthesis Routes</h2>
            <p>
              Most peptide manufacturers run one synthesis platform and fit every molecule to it. Our platform brings together four synthesis approaches, enabling route selection based on the molecule, target scale and purification requirements.
            </p>
          </div>
        </div>

        {/* Synthesis Table */}
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

        {/* Why Liquid Phase Matters Hero Callout */}
        <div className="senn-lpps-callout">
          <h4>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Why Liquid Phase Matters
          </h4>
          <p>
            For suitable molecules, LPPS can offer substantially lower process mass intensity than SPPS and may reduce or eliminate chromatography. This can materially improve the commercial viability of large-scale peptide manufacturing. It is where Senn Chemicals built its reputation and it remains our core strength.
          </p>
        </div>
      </section>

      {/* From Feasibility to Commercial Supply */}
      <section className="senn-phases-section" aria-label="From Feasibility to Commercial Supply">
        <div className="senn-section-head" style={{ width: '100%', margin: 0 }}>
          <div className="copy">
            <span className="cp-section-badge">Lifecycle Progression</span>
            <h2>From Feasibility to Commercial Supply</h2>
            <p>
              Programs can progress from feasibility to commercial supply within the same CDMO platform, reducing the need for an external vendor transfer.
            </p>
          </div>
        </div>

        <div className="senn-phases-grid">
          {PHASES.map((p) => (
            <div className="senn-phase-card" key={p.phase}>
              <span className="senn-phase-num-badge">Phase {p.phase}</span>
              <span className="senn-phase-qty">{p.quantity}</span>
              <p className="senn-phase-act">{p.activity}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manufacturing Capacity */}
      <section className="senn-capacity-section" aria-label="Manufacturing Capacity">
        <div className="senn-section-head" style={{ width: '100%', margin: 0 }}>
          <div className="copy">
            <span className="cp-section-badge">Infrastructure</span>
            <h2>Manufacturing Capacity</h2>
            <p>
              Scalable equipment trains engineered for small-scale development, kilo-scale pilot trials, and commercial cGMP campaigns.
            </p>
          </div>
        </div>

        <div className="senn-capacity-grid">
          <div className="senn-capacity-card">
            <h3>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              GMP Manufacturing, Dielsdorf
            </h3>
            <ul className="senn-capacity-list">
              {GMP_CAPACITY_ITEMS.map((item, idx) => (
                <li key={idx}>
                  <span className="senn-capacity-check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="senn-capacity-card">
            <h3>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
              </svg>
              Kilo Laboratory
            </h3>
            <ul className="senn-capacity-list">
              {KILO_LAB_ITEMS.map((item, idx) => (
                <li key={idx}>
                  <span className="senn-capacity-check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="senn-capacity-card">
            <h3>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Small-Scale GMP Laboratory
            </h3>
            <ul className="senn-capacity-list">
              {SMALL_SCALE_GMP_ITEMS.map((item, idx) => (
                <li key={idx}>
                  <span className="senn-capacity-check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Development & Analytical Support */}
      <section className="senn-analytical-section" aria-label="Development and Analytical Support">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span className="cp-section-badge" style={{ width: 'fit-content' }}>R&amp;D &amp; Analytics</span>
          <h2 style={{ margin: 0, font: "700 clamp(26px, 3.5vw, 42px)/1.2 'Manrope', sans-serif", color: '#0f172a' }}>
            Development and Analytical Support
          </h2>
          <p className="senn-analytical-lead">
            An experienced R&amp;D team, including doctoral-level scientists, provides route scouting, process development, analytical method development and validation, stability studies, DMF preparation and technology-transfer support.
          </p>
          <p style={{ font: "400 16.5px/1.65 'Manrope', sans-serif", color: '#475569', margin: 0 }}>
            Analytical capabilities include physical characterisation, impurity identification, residual-solvent testing, pharmacopeial testing, chromatographic assays, enantiomeric-purity analysis, spectrometric techniques, HPLC, GC, potentiometric titration and Karl Fischer water determination.
          </p>
        </div>

        <div className="senn-tags-wrap">
          {ANALYTICAL_TAGS.map((tag) => (
            <span className="senn-tech-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Quality and Compliance */}
      <section className="senn-analytical-section" style={{ background: '#ffffff', marginTop: 'clamp(40px, 5vw, 60px)' }} aria-label="Quality and Compliance">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span className="cp-section-badge" style={{ width: 'fit-content' }}>Standards &amp; Regulatory</span>
          <h2 style={{ margin: 0, font: "700 clamp(26px, 3.5vw, 42px)/1.2 'Manrope', sans-serif", color: '#0f172a' }}>
            Quality and Compliance
          </h2>
        </div>

        <div className="senn-compliance-grid">
          <div className="senn-compliance-card">
            <h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              ISO 9001 &amp; Swissmedic
            </h4>
            <p>
              Senn Chemicals is ISO 9001:2015 certified and authorized by Swissmedic for cGMP manufacturing.
            </p>
          </div>

          <div className="senn-compliance-card">
            <h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Switzerland–US GMP MRA
            </h4>
            <p>
              The site also operates within the regulatory context of the Switzerland--United States GMP Mutual Recognition Agreement.
            </p>
          </div>

          <div className="senn-compliance-card">
            <h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Global Filings
            </h4>
            <p>
              We operate quality systems, documentation practices and change-control processes designed to support customer filings in the United States, Europe and other regulated markets.
            </p>
          </div>
        </div>
      </section>

      {/* Footprint */}
      <section className="senn-footprint-section" aria-label="Footprint">
        <div className="senn-section-head" style={{ width: '100%', margin: 0 }}>
          <div className="copy">
            <span className="cp-section-badge">Global Footprint</span>
            <h2>Two Continents. One Integrated Model</h2>
            <p>
              Combining Swiss legacy expertise with India&rsquo;s expanding manufacturing and research capabilities.
            </p>
          </div>
        </div>

        <div className="senn-footprint-grid">
          <div className="senn-footprint-card">
            <span className="senn-footprint-country">Switzerland</span>
            <h3>Senn Chemicals AG, Dielsdorf, Zurich</h3>
            <p>
              R&amp;D, kilo-scale development, GMP production, QC, QA and warehousing. The site employs more than 80 people and has been operational since 1963.
            </p>
          </div>

          <div className="senn-footprint-card">
            <span className="senn-footprint-country">India — Hyderabad</span>
            <h3>Development &amp; Characterisation</h3>
            <p>
              Development, process optimisation, structural characterisation and analytical capabilities.
            </p>
          </div>

          <div className="senn-footprint-card">
            <span className="senn-footprint-country">India — Vizag</span>
            <h3>Large-Scale Peptide Facility (Dec 2027)</h3>
            <p>
              Large-scale peptide manufacturing facility under development, with completion expected by December 2027.
            </p>
          </div>
        </div>
      </section>

      {/* Building Capacity in India */}
      <section className="senn-analytical-section" style={{ background: '#ffffff', marginTop: 'clamp(40px, 5vw, 60px)' }} aria-label="Building Capacity in India">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span className="cp-section-badge" style={{ width: 'fit-content' }}>Expansion</span>
          <h2 style={{ margin: 0, font: "700 clamp(26px, 3.5vw, 42px)/1.2 'Manrope', sans-serif", color: '#0f172a' }}>
            Building Capacity in India
          </h2>
          <p className="senn-analytical-lead">
            The Senn Tides development centre at the Technology Research Park, IIT Hyderabad, supports peptide development, process optimization and structural characterization across LPPS, SPPS, hybrid and tag-assisted synthesis. Analytical capabilities include LC-MS, circular dichroism, MALS, HPLC and GC.
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px 32px', marginTop: '14px' }}>
            <h4 style={{ margin: '0 0 10px 0', font: "700 20px/1.3 'Manrope', sans-serif", color: '#0061f8' }}>
              Manufacturing
            </h4>
            <p style={{ margin: 0, font: "500 16.5px/1.65 'Manrope', sans-serif", color: '#334155' }}>
              A large-scale peptide manufacturing facility is being developed on a 283,000 sq. ft. site in Vizag, with completion expected by December 2027.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="senn-leadership-section" aria-label="Leadership">
        <div className="senn-section-head" style={{ width: '100%', margin: 0 }}>
          <div className="copy">
            <span className="cp-section-badge">Executive Team</span>
            <h2>Leadership</h2>
            <p>
              Led by seasoned industry executives and scientific leaders across Swiss and Indian peptide operations.
            </p>
          </div>
        </div>

        <div className="senn-leadership-grid">
          {LEADERSHIP.map((lead) => (
            <div className="senn-lead-card" key={lead.name}>
              <div className="senn-lead-avatar">{lead.initials}</div>
              <h3>{lead.name}</h3>
              <p>{lead.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="senn-contact-section" aria-label="Contact">
        <div className="senn-contact-box">
          <h3>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Senn Chemicals AG
          </h3>
          <address>
            Industriestrasse 12<br />
            CH-8157 Dielsdorf, Zurich<br />
            Switzerland
          </address>
        </div>

        <div className="senn-contact-box">
          <h3>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Senn Tides Private Limited
          </h3>
          <address>
            15th Floor, Granules Tower,<br />
            Botanical Garden Road, Kondapur, Hyderabad 500084, Telangana<br />
            India
          </address>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="senn-cta" aria-label="Discuss your development and manufacturing program">
        <div className="senn-cta-copy">
          <h2>Discuss Your Development and Manufacturing Program with Senn Tides</h2>
          <p>
            Visit the Senn Chemicals website to connect with our CDMO team.
          </p>
          <div className="senn-cta-links">
            <span>Email: <a href="mailto:sales@sennchem.com">sales@sennchem.com</a></span>
            <span>Web: <a href="http://www.sennchem.com" target="_blank" rel="noreferrer">www.sennchem.com</a></span>
          </div>
        </div>

        <a
          href="http://www.sennchem.com"
          target="_blank"
          rel="noreferrer"
          className="senn-cta-btn"
        >
          <span>Visit Senn Chemicals</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </section>

      <CompanyFooter />
    </div>
  );
}

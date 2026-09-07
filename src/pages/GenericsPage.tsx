import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import '../styles.css';
import './business.css';

const products = [
  {
    image: 'api.webp',
    title: 'Active Pharmaceutical Ingredients (APIs)',
    eyebrow: 'API',
    body: 'Large-scale manufacturing capabilities, integrated operations, and deep process chemistry delivering high-volume legacy molecules and complex niche APIs across 80+ countries.',
    href: '/business/api',
    cta: 'Click here to know more',
  },
  {
    image: 'pfi.webp',
    title: 'Pharmaceutical Formulation Intermediates (PFIs)',
    eyebrow: 'PFI',
    body: 'Custom pharmaceutical formulation intermediates optimized for efficiency and flexibility with proprietary "Drum to Hopper" direct compression blends that eliminate manufacturing complexity.',
    href: '/business/pfi',
    cta: 'Click here to know more',
  },
  {
    image: 'finished-dosage.webp',
    title: 'Finished Dosages (FDs)',
    eyebrow: 'FD',
    body: 'Scale and complexity supported by multi-site supply capabilities, comprehensive oral solid dosage solutions engineered for affordability, patient safety, and global compliance.',
    href: '/business/fd',
    cta: 'Click here to know more',
  },
];

const THERAPY_EXPANSION = [
  {
    title: 'Complex Generics',
    desc: 'High-barrier formulations requiring sophisticated delivery mechanisms, specialized bio-equivalence, and tailored release profiles.',
    icon: 'icon-manufacturing.svg',
  },
  {
    title: 'Controlled Substances',
    desc: 'Secure, DEA- and FDA-compliant production facilities engineered for tightly regulated therapeutic categories.',
    icon: 'icon-capacity.svg',
  },
  {
    title: 'Oncology Therapies',
    desc: 'High-containment suites and precision synthesis supporting specialized oncology regimens.',
    icon: 'icon-oncology.svg',
  },
  {
    title: 'CNS & ADHD Treatments',
    desc: 'Targeted central nervous system therapies formulated with strict particle size and content uniformity standards.',
    icon: 'icon-cns.svg',
  },
  {
    title: 'Peptides CDMO',
    desc: 'Synthesizing complex peptide sequences via green chemistry, continuous flow, and solid-phase peptide synthesis.',
    icon: 'icon-globe.svg',
  },
  {
    title: 'Advanced Drug Delivery',
    desc: 'Extended-release, multi-particulate, and fixed-dose combination platforms maximizing therapeutic adherence.',
    icon: 'icon-anti-diabetics.svg',
  },
];

export default function GenericsPage() {
  const [openProduct, setOpenProduct] = useState<number>(-1);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Generics — Advancing Healthcare Through Science & Scale | Granules India';

    const descriptionContent =
      'Granules India offers a diverse and continually evolving portfolio spanning APIs, PFIs, Finished Dosages, and Peptides CDMO products with integrated excellence.';
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

      <main className="biz-main">
        {/* Breadcrumb Navigation */}
        <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <Link to="/business/generics">BUSINESS</Link>
          <span className="sep">›</span>
          <span className="current">GENERICS</span>
        </p>

        {/* Hero / Page Main Heading */}
        <h1 className="api-page-header">
          Advancing Healthcare through Science, Scale and Integrated Excellence
        </h1>

        {/* Hero Banner */}
        <div className="cp-hero-banner">
          <img src="/assets/hero-1.webp" alt="Granules Generics Manufacturing" />
          <div className="api-hero-scrim" />
          <div className="api-hero-overlay">
            <a className="cp-cta-btn" href="#three-verticals">Explore Generic Platforms</a>
          </div>
        </div>

        {/* Narrative / Intro Section with interactive scroll highlight */}
        <div className="biz-intro">
          <p>
            <span>
              Granules India offers a diverse and continually evolving portfolio to the global pharmaceutical market, spanning Active Pharmaceutical Ingredients (APIs), Pharmaceutical Formulation Intermediates (PFIs), Finished Dosages (FDs) and Peptides CDMO products. Guided by science and a clear focus on advancing high-value, specialised therapies, our teams are committed to delivering safe, effective and affordable medicines that meet the expectations of partners and patients across geographies.
            </span>
          </p>
          <p>
            <span>
              Our portfolio strategy encompasses our core strength of scale, while expanding into complex generics, controlled substances, oncology therapies, CNS/ADHD treatments, peptides and advanced drug delivery systems. Supported by a global manufacturing and R&amp;D network, Granules continues to strengthen its position as a trusted partner to customers worldwide.
            </span>
          </p>
        </div>

        {/* Three Boxes Section (API, PFI, FD) */}
        <section className="gen-verticals-wrap" id="three-verticals" aria-label="Core Generic Verticals">
          <div className="biz-section-head" style={{ width: '85%', margin: 'clamp(56px, 7vw, 90px) auto clamp(24px, 3vw, 40px)' }}>
            <div className="copy">
              <span className="comm-section-tag" style={{ alignSelf: 'flex-start' }}>Core Verticals</span>
              <h2>Integrated Across the Value Chain</h2>
              <p>
                From pure API molecules to ready-to-compress PFIs and finished patient-ready dosages.
              </p>
            </div>
          </div>

          <div className="product-grid" style={{ width: '85%', margin: '0 auto clamp(60px, 8vw, 100px)' }}>
            {products.map((product, index) => {
              const isOpen = openProduct === index;
              return (
                <article
                  className={`product-card${isOpen ? ' is-open' : ''}`}
                  key={product.title}
                  onMouseEnter={() => setOpenProduct(index)}
                  onMouseLeave={() => setOpenProduct(-1)}
                >
                  <button
                    className="product-toggle"
                    type="button"
                    onClick={() => {
                      if (isOpen) {
                        navigate(product.href);
                      } else {
                        setOpenProduct(index);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? 'Close' : 'Explore'} ${product.title}`}
                  >
                    {/* Background product image */}
                    <div className="product-img-wrap">
                      <img
                        src={`/assets/${product.image}`}
                        alt={product.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Sliding blue drawer sheet */}
                    <div className="product-sheet">
                      <div className="product-sheet-head">
                        <span className="product-sheet-title">{product.title}</span>
                        <span className="product-symbol" aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>

                      <div className="product-sheet-body">
                        <p className="product-description">{product.body}</p>
                        <Link
                          to={product.href}
                          className="product-learn"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <span>{product.cta}</span>
                          <span aria-hidden="true" style={{ marginLeft: '6px' }}>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Portfolio Strategy & Specialized Therapies */}
        <section className="gen-strategy-section" aria-label="Portfolio Strategy and Therapies">
          <div className="biz-section-head" style={{ width: '85%', margin: 'clamp(56px, 7vw, 90px) auto clamp(32px, 4vw, 48px)' }}>
            <div className="copy">
              <span className="comm-section-tag" style={{ alignSelf: 'flex-start' }}>Expanding Horizons</span>
              <h2>High-Value, Specialized Therapies</h2>
              <p>
                Strengthening core volume strengths while accelerating complex and niche healthcare solutions.
              </p>
            </div>
          </div>

          <div className="gen-therapy-grid">
            {THERAPY_EXPANSION.map((t, idx) => (
              <div key={idx} className="gen-therapy-card">
                <div className="gen-therapy-icon-wrap">
                  <img src={`/assets/api/${t.icon}`} alt="" />
                </div>
                <h3 className="gen-therapy-title">{t.title}</h3>
                <p className="gen-therapy-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="biz-section-head" style={{ width: '85%', margin: 'clamp(56px, 7vw, 90px) auto clamp(32px, 4vw, 48px)' }}>
          <div className="copy">
            <span className="comm-section-tag" style={{ alignSelf: 'flex-start' }}>Portfolio</span>
            <h2>High-Value, Specialized Therapies</h2>
            <p>
              Strengthening core volume strengths while accelerating complex and niche healthcare solutions.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="biz-cta biz-cta--placeholder" style={{ marginBottom: 'clamp(60px, 8vw, 110px)' }}>
          <div className="biz-cta-copy">
            <h2>Partner with Granules on Generic Innovation</h2>
            <p>
              Leverage our end-to-end scale, global regulatory compliance, and formulation science to bring high-quality medicines to market faster.
            </p>
          </div>
          <Link to="/contact" className="cp-cta-btn">Connect With Us</Link>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import { asset } from '../components/company/constants';
import '../components/company/company.css';
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
  const introRef = useRef<HTMLDivElement>(null);
  const [isIntroScrolled, setIsIntroScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (!introRef.current) return;
      const rect = introRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerPoint = viewportHeight * 0.45;
      setIsIntroScrolled(rect.top < triggerPoint);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="cp gen-page">
      <NavBar />

      <section className="cp-hero">
        <p className="cp-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <Link to="/business/generics">BUSINESS</Link>
          <span className="sep">›</span>
          <span className="current">GENERICS</span>
        </p>

        <h1 className="cp-page-title">
          Advancing Healthcare through Science, Scale and Integrated Excellence
        </h1>

        <div className="cp-hero-panel">
          <img
            src="/assets/hero-1.webp"
            alt="Granules Generics Manufacturing"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div className="cp-scroll-indicator">
            <img src={asset('scroll-down-icon.webp')} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <div
        ref={introRef}
        className={`cp-about-desc${isIntroScrolled ? ' is-scrolled' : ''}`}
      >
        <p>
          <span className="part-1">
            Granules India offers a diverse and continually evolving portfolio to the global
            pharmaceutical market, spanning Active Pharmaceutical Ingredients (APIs), Pharmaceutical
            Formulation Intermediates (PFIs), Finished Dosages (FDs) and Peptides CDMO products.
          </span>{' '}
          <span className="part-2">
            Guided by science and a clear focus on advancing high-value, specialised therapies, our
            teams are committed to delivering safe, effective and affordable medicines that meet the
            expectations of partners and patients across geographies.
          </span>
        </p>
        <p className="part-2">
          Our portfolio strategy encompasses our core strength of scale, while expanding into complex
          generics, controlled substances, oncology therapies, CNS/ADHD treatments, peptides and
          advanced drug delivery systems. Supported by a global manufacturing and R&amp;D network,
          Granules continues to strengthen its position as a trusted partner to customers worldwide.
        </p>
      </div>
      <div className="cp-divider" />

      <section className="gen-verticals-wrap" id="three-verticals" aria-label="Core Generic Verticals">
          <div className="biz-section-head gen-section-head">
            <div className="copy">
              <span className="cp-section-badge">Core Verticals</span>
              <h2>Integrated Across the Value Chain</h2>
              <p>
                From pure API molecules to ready-to-compress PFIs and finished patient-ready dosages.
              </p>
            </div>
          </div>

          <div className="product-grid gen-product-grid">
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
          <div className="biz-section-head gen-section-head gen-section-head--therapy">
            <div className="copy">
              <span className="cp-section-badge">Expanding Horizons</span>
              <h2>High-Value, Specialized Therapies</h2>
              <p>
                Strengthening core volume strengths while accelerating complex and niche healthcare solutions.
              </p>
            </div>
            <Link to="/business/product-portfolio" className="cp-cta-btn gen-products-btn">
              Our Products
            </Link>
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

        <div className="biz-cta biz-cta--placeholder gen-cta">
          <div className="biz-cta-copy">
            <h2>Partner with Granules on Generic Innovation</h2>
            <p>
              Leverage our end-to-end scale, global regulatory compliance, and formulation science to bring high-quality medicines to market faster.
            </p>
          </div>
          <Link to="/contact" className="cp-cta-btn">Connect With Us</Link>
        </div>

      <CompanyFooter />
    </div>
  );
}

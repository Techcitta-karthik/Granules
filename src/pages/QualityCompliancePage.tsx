import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './qc.css';

const Q = '/assets/qc/';

type Highlight = { value: string; label: string };
type Story = {
  title: string;
  body: string;
  image: string;
  reverse?: boolean;
  highlights?: Highlight[];
};
type Certification = { name: string; category: string; image: string };

const STORIES: Story[] = [
  {
    title: 'Quality Systems that Deliver Confidence',
    body: 'From molecule to market, our digital-first, risk-based Quality Management System (QMS) ensures consistent, compliant, and audit-ready operations worldwide. Designed to scale rapidly and meet the most rigorous global standards, our integrated QMS goes beyond compliance to become a competitive advantage built on trust, transparency, and pursuit of excellence. We also integrate environmental responsibility and safety-first practices, ensuring sustainability coexists seamlessly with quality at every stage.',
    image: 'story-confidence.webp',
  },
  {
    title: 'Building a Quality Culture Across Teams',
    body: 'We strengthen quality culture across all manufacturing locations by harmonizing systems, sharing best practices, and empowering teams at every level. This collaborative approach ensures that quality is not just a system, but a shared commitment embedded in our people.',
    image: 'story-culture.webp',
    reverse: true,
  },
  {
    title: 'Digital Transformation for Quality 4.0',
    body: 'Investing in Pharma 4.0, we are digitizing our quality systems to enhance traceability and operational visibility across the entire product lifecycle. Our digital-first approach supports faster decision-making and real-time quality assurance.',
    image: 'story-digital.webp',
  },
  {
    title: 'Customer Feedback, Transparency, and Trust',
    body: 'Collaborating with over 300 global customers in more than 100 countries, we maintain robust feedback loops that drive continuous product and process improvement. Transparency and responsiveness are core to building lasting trust.',
    image: 'story-feedback.webp',
    reverse: true,
  },
];

/* Artwork in /assets/qc verified against each standard's badge. */
const CERTIFICATIONS: Certification[] = [
  { name: 'ISO 9001:2015', category: 'Quality Management', image: 'cert-1.webp' },
  { name: 'ISO 14001:2015', category: 'Environmental Management', image: 'cert-2.webp' },
  { name: 'ISO 45001 / OHSAS 18001', category: 'Occupational Health & Safety', image: 'cert-3.webp' },
];

export default function QualityCompliancePage() {
  useEffect(() => {
    document.title = 'Quality & Compliance — Granules India';
    const descriptionContent =
      'Granules India end-to-end quality systems, grounded in cGMP compliance, regulatory readiness, and culture of accountability across North America, Europe, and Asia.';
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

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/business/api">BUSINESS</Link>
        <span className="sep">›</span>
        <span className="current">QUALITY &amp; COMPLIANCE</span>
      </p>
      <h1 className="cp-page-title">Built for Compliance. Enabled by Technology. Trusted by Partners</h1>
      <div className="cp-hero-banner">
        <img src={`${Q}hero-banner.webp`} alt="Granules quality control laboratory" />
        <div className="qc-hero-scrim" />
      </div>

      <div className="qc-intro">
        <p>
          With regulated markets operations across North America, Europe, and Asia, Granules is
          trusted by leading global pharmaceutical companies for one reason:{' '}
          <span className="muted">consistent, uncompromised quality.</span>
        </p>
        <p>
          Our end-to-end quality systems, covering sourcing, manufacturing, packaging, and global
          distribution, are grounded in cGMP compliance, regulatory readiness, and a culture of
          accountability. With more than 45 successful global inspections and approvals from
          agencies including USFDA, EDQM, MHRA, TGA, WHO, ANVISA, and PMDA, Granules continues to
          raise the global standard for pharmaceutical manufacturing excellence.
        </p>
      </div>

      <section className="qc-metrics" aria-labelledby="qc-metrics-title">
        <div className="qc-metrics-head">
          <span className="cp-section-badge">Key Metrics</span>
          <h2 id="qc-metrics-title">Proven Global Compliance</h2>
        </div>
        <ul className="qc-metrics-grid">
          <li className="qc-metric-card">
            <p className="qc-metric-value">45+</p>
            <p className="qc-metric-label">
              successful inspections by USFDA, EDQM, WHO, ANVISA, PMDA &amp; more
            </p>
          </li>
          <li className="qc-metric-card">
            <p className="qc-metric-value">300+</p>
            <p className="qc-metric-label">
              filings (DMFs, ANDAs, MAAs, CEPs) across regulated markets
            </p>
          </li>
          <li className="qc-metric-card">
            <p className="qc-metric-value">100%</p>
            <p className="qc-metric-label">
              Sites aligned with cGMP, ICH Q10, and ISO 9001:2015 standards
            </p>
          </li>
        </ul>
      </section>

      <div className="qc-systems">
        <div className="qc-systems-head">
          <span className="cp-section-badge" style={{ alignSelf: 'flex-start', background: '#fff' }}>Our Quality Systems</span>
        </div>

        {STORIES.map((story, index) => (
          <div
            className={`qc-stack-card qc-stack-card--${index}${story.reverse ? ' qc-stack-card--reverse' : ''}`}
            key={story.title}
          >
            <div className="qc-card-copy">
              <h3>{story.title}</h3>
              <h4>{story.body}</h4>
              {story.highlights && (
                <ul className="qc-card-highlights">
                  {story.highlights.map((highlight) => (
                    <li className="qc-card-highlight" key={highlight.label}>
                      <span className="qc-card-highlight-value">{highlight.value}</span>
                      <span className="qc-card-highlight-label">{highlight.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="qc-card-media">
              <img src={`${Q}${story.image}`} alt={story.title} loading="lazy" decoding="async" />
            </div>
          </div>
        ))}

        <div className="qc-below-stack">
          <div className="qc-certs">
            <div className="qc-certs-badge">
              <span className="cp-section-badge" style={{ alignSelf: 'flex-start', background: '#fff' }}>Certifications</span>
              <h3>Certified to Global Standards</h3>
              <h4>
                Strict adherence to international standards governing quality management, environmental stewardship, and workplace safety.
              </h4>
            </div>
            <ul className="qc-certs-icons">
              {CERTIFICATIONS.map((cert) => (
                <li className="qc-cert-tile" key={cert.name}>
                  <div className="qc-cert-img-wrap">
                    <img
                      src={`${Q}${cert.image}`}
                      alt={`${cert.name} ${cert.category} certification`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="qc-cert-name">{cert.name}</p>
                  <p className="qc-cert-category">{cert.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="qc-cta" aria-label="Partner with Granules for Quality & Compliance">
        <img className="bg" src={`${Q}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="qc-cta-copy">
          <h2>Ready to Partner with us?</h2>
        </div>
        <div className="qc-cta-actions">
          <Link to="/contact" className="qc-cta-btn qc-cta-btn--primary">
            <span>Contact Us</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <CompanyFooter />
    </div>
  );
}

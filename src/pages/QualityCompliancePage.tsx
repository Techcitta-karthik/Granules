import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './qc.css';

const Q = '/assets/qc/';

type Story = { title: string; body: string; image: string; reverse?: boolean };

const STORIES: Story[] = [
  {
    title: 'Quality Systems that Deliver Confidence',
    body: 'From molecule to market, our digital-first, risk-based Quality Management System (QMS) ensures consistent, compliant, and audit-ready operations worldwide. Designed to scale rapidly and meet the most rigorous global standards, our integrated QMS goes beyond compliance—it’s a competitive advantage built on trust, transparency, and relentless pursuit of excellence. We also integrate environmental responsibility and safety-first practices, ensuring sustainability coexists seamlessly with quality at every stage.',
    image: 'story-confidence.png',
  },
  {
    title: 'Building a Quality Culture Across Teams',
    body: 'We strengthen quality culture across all manufacturing locations by harmonizing systems, sharing best practices, and empowering teams at every level. This collaborative approach ensures that quality is not just a system, but a shared commitment embedded in our people.',
    image: 'story-culture.png',
    reverse: true,
  },
  {
    title: 'Digital Transformation for Quality 4.0',
    body: 'Investing in Pharma 4.0, we are digitizing our quality systems to enhance traceability and operational visibility across the entire product lifecycle. Our digital-first approach supports faster decision-making and real-time quality assurance.',
    image: 'story-digital.png',
  },
  {
    title: 'Customer Feedback, Transparency and Trust',
    body: 'Collaborating with over 300 global customers in more than 80 countries, we maintain robust feedback loops that drive continuous product and process improvement. Transparency and responsiveness are core to building lasting trust.',
    image: 'story-feedback.png',
    reverse: true,
  },
];

export default function QualityCompliancePage() {
  useEffect(() => {
    document.title = 'Quality & Compliance — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Business</span>
        <span className="sep">{'>'}</span>
        <span className="current">Quality Control &amp; Compliance</span>
      </p>
      <h1 className="cp-page-title">Quality &amp; compliance</h1>
      <div className="cp-hero-banner">
        <img src={`${Q}hero-banner.png`} alt="Granules quality control laboratory" />
      </div>

      <div className="qc-intro">
        <p>
          With a presence in regulated markets across North America, Europe, and Asia, we are
          trusted by leading global pharmaceutical companies for one reason: we deliver
          uncompromised quality, <span className="muted">every time.</span>
        </p>
        <p>
          From sourcing and manufacturing to packaging and global distribution, our quality
          systems are built on cGMP compliance, regulatory readiness, and a culture of
          accountability. With 45+ successful global inspections, certifications from top
          agencies (USFDA, EDQM, MHRA, TGA, WHO, ANVISA, PMDA), Granules continues to raise the
          global standard for pharmaceutical manufacturing excellence.
        </p>
      </div>

      <div className="qc-systems">
        <div className="qc-systems-head">
          <span className="cp-section-badge" style={{ alignSelf: 'flex-start', background: '#fff' }}>Our Quality Systems</span>
          <h2>Embedding quality at every stage</h2>
        </div>

        {STORIES.map((story, index) => (
          <div
            className={`qc-stack-card qc-stack-card--${index}${story.reverse ? ' qc-stack-card--reverse' : ''}`}
            key={story.title}
          >
            <div className="qc-card-copy">
              <h3>{story.title}</h3>
              <p>{story.body}</p>
            </div>
            <div className="qc-card-media">
              <img src={`${Q}${story.image}`} alt={story.title} />
            </div>
          </div>
        ))}

        <div className="qc-below-stack">
          <div className="qc-certs">
            <div className="qc-certs-badge">Certified to global quality standards</div>
            <div className="qc-certs-icons">
              {['cert-1.png', 'cert-2.png', 'cert-3.png'].map((cert) => (
                <div className="qc-cert-tile" key={cert}>
                  <img src={`${Q}${cert}`} alt="Quality certification" />
                </div>
              ))}
            </div>
          </div>

          <div className="qc-cta">
            <img className="bg" src={`${Q}cta-bg.png`} alt="" />
            <div className="overlay" />
            <div className="qc-cta-copy">
              <h2>Lorem ipsum convallis consectetur</h2>
              <p>Lorem ipsum dolor sit amet consectetur. Ipsum magna a ac nibh morbi malesuada molestie mauris.</p>
            </div>
            <a className="cp-cta-btn" href="/business/api">Lorem ipsum</a>
          </div>
        </div>
      </div>

      <CompanyFooter />
    </div>
  );
}

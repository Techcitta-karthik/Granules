import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import '../styles.css';
import './community.css';

const CSR = '/assets/csr/';

interface CSRStat {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
}

const IMPACT_GOALS: CSRStat[] = [
  {
    value: '1M+',
    label: 'Our Goal',
    sublabel: 'Touch 1 million lives by 2030',
    badge: 'Vision 2030',
  },
  {
    value: '3.5L+',
    label: 'Our Progress',
    sublabel: '3.5+ lakhs Lives positively touched in FY26',
    badge: 'FY26 Impact',
  },
];

interface FocusArea {
  id: string;
  title: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  metric: string;
  unit: string;
  desc: string;
  image: string;
  highlights: string[];
}

const CSR_FOCUS_AREAS: FocusArea[] = [
  {
    id: 'skill-development',
    title: 'Skill Development',
    tag: 'Vocational Skilling',
    tagBg: 'rgba(0, 97, 248, 0.08)',
    tagColor: '#0061f8',
    metric: '1,600+',
    unit: 'Individuals Trained',
    desc: '1,600+ Individuals trained through Pharma Patashala since its inception in 2017',
    image: 'skill-development.webp',
    highlights: [
      'Pharma Patashala specialized academy',
      'Hands-on technical & lab operations training',
      'Employment linkages & career mentorship',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    tag: 'Preventive & Community Health',
    tagBg: 'rgba(13, 148, 136, 0.08)',
    tagColor: '#0d9488',
    metric: '15,000+',
    unit: 'Beneficiaries Reached',
    desc: '15,000+ Beneficiaries reached through Breast Cancer Screening Camps, awareness sessions and eye screening programmes for school children.',
    image: 'healthcare.webp',
    highlights: [
      'Mobile mammography & early cancer detection',
      'School health & pediatric vision screening',
      'Preventive health camps in rural clusters',
    ],
  },
  {
    id: 'education',
    title: 'Education',
    tag: 'Quality Learning Support',
    tagBg: 'rgba(217, 119, 6, 0.08)',
    tagColor: '#d97706',
    metric: '2,000+',
    unit: 'Students Benefited',
    desc: '2,000+ Students benefited through Vidya Volunteers and educational support initiatives implemented through NGO partnerships.',
    image: 'education.webp',
    highlights: [
      'Vidya Volunteers grassroots classroom teaching',
      'School infrastructure & learning aid support',
      'NGO partnerships for student retention',
    ],
  },
  {
    id: 'environment',
    title: 'Environment',
    tag: 'Afforestation & Ecology',
    tagBg: 'rgba(5, 150, 105, 0.08)',
    tagColor: '#059669',
    metric: '18,000+',
    unit: 'Native Trees Planted',
    desc: '18,000+ Native trees planted',
    image: 'environment.webp',
    highlights: [
      'Native species plantation drives',
      'Local biodiversity conservation',
      'Community green belt nurturing',
    ],
  },
];

const CSR_DOCUMENTS = [
  {
    title: 'Corporate Social Responsibility Policy',
    meta: 'Statutory Board-Approved Policy Framework',
    pdf: '/documents/CSR-Policy-7f3b00771044.pdf',
    filename: 'Granules_CSR_Policy.pdf',
    badge: 'Policy',
  },
  {
    title: 'Social Policy & Human Rights Standards',
    meta: 'Community & Workplace Ethical Guidelines',
    pdf: '/documents/8328CSR-Policy-30ada84aca1b.pdf',
    filename: 'Granules_Social_Standards_Policy.pdf',
    badge: 'Standards',
  },
  {
    title: 'Integrated Annual Report FY 24-25',
    meta: 'Comprehensive CSR & ESG Performance Disclosures',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_Integrated_Annual_Report_FY24-25.pdf',
    badge: 'Annual Report',
  },
];

export default function CommunityPage() {
  const [openPillar, setOpenPillar] = useState<number>(-1);

  useEffect(() => {
    document.title = 'Corporate Social Responsibility — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp comm-root">
      <NavBar />

      <main className="comm-main">
        {/* Breadcrumb Navigation */}
        <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
          <Link to="/">HOMEPAGE</Link>
          <span className="sep">›</span>
          <Link to="/sustainability">SUSTAINABILITY</Link>
          <span className="sep">›</span>
          <span className="current">CORPORATE SOCIAL RESPONSIBILITY</span>
        </p>

        {/* Page Title */}
        <h1 className="cp-page-title" style={{ width: '85%', margin: 'clamp(20px, 2.5vw, 32px) auto clamp(24px, 3vw, 36px)' }}>
          Corporate Social Responsibility
        </h1>

        {/* Executive Speech & Quote Banner */}
        <section className="comm-speech-banner-wrap" aria-label="Executive Leadership Quote">
          <div className="comm-speech-banner-card">
            <div className="comm-speech-banner-left">
              <div className="comm-speech-banner-img-frame">
                <img
                  className="comm-speech-banner-img"
                  src={`${CSR}banner-1.webp`}
                  alt="Ms. Uma Devi Chigurupati, Executive Director, Granules India Limited"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <h2 className="comm-speech-banner-headline">
                Driving Meaningful Impact,<br />Enriching Communities
              </h2>
            </div>

            <div className="comm-speech-banner-quote-col">
              <svg
                className="comm-speech-quote-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="comm-speech-quote-text">
                &ldquo;We believe lasting progress comes from strong, meaningful relationships with our
                communities and stakeholders. Guided by empathy and responsibility, we support healthcare,
                education, and social development, creating long-term value beyond business.&rdquo;
              </blockquote>

              <div className="comm-speech-author">
                <p className="comm-speech-name">Ms. Uma Chigurupati</p>
                <p className="comm-speech-role">Executive Director, Granules India Limited</p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Goals & Progress Highlight Banner */}
        <section className="comm-impact-section" aria-label="Our Goal and Progress">
          <div className="comm-impact-header">
            <span className="comm-section-tag">Impact Horizon</span>
            <h2 className="comm-impact-heading">Our Purpose-Led Milestones</h2>
            <p className="comm-impact-subtitle">
              Guided by a long-term vision to touch lives meaningfully through sustainable community development.
            </p>
          </div>

          <div className="comm-impact-grid">
            {IMPACT_GOALS.map((goal) => (
              <div key={goal.label} className="comm-impact-card">
                <div className="comm-impact-card-top">
                  <span className="comm-impact-badge">{goal.badge}</span>
                  <h3 className="comm-impact-card-label">{goal.label}</h3>
                </div>
                <div className="comm-impact-val-row">
                  <strong className="comm-impact-val">{goal.value}</strong>
                </div>
                <p className="comm-impact-desc">{goal.sublabel}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4 Core Focus Areas Showcase (with Interactive Sliding Drawer Sheet on Hover) */}
        <section className="comm-pillars-section" id="initiatives" aria-label="Core Focus Areas">
          <div className="comm-section-head-simple">
            <span className="comm-section-tag">Key Initiatives</span>
            <h2>Core Focus Areas</h2>
            <p className="comm-section-desc">
              Dedicated social investments creating lasting value across health, skilling, education, and ecology.
            </p>
          </div>

          <div className="comm-pillars-showcase">
            {CSR_FOCUS_AREAS.map((card, index) => {
              const isOpen = openPillar === index;
              return (
                <article
                  key={card.id}
                  className={`comm-pillar-item-card${isOpen ? ' is-open' : ''}`}
                  onMouseEnter={() => setOpenPillar(index)}
                  onMouseLeave={() => setOpenPillar(-1)}
                >
                  <div className="comm-pillar-item-media">
                    <img
                      src={`${CSR}${card.image}`}
                      alt={card.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <span
                      className="comm-pillar-item-badge"
                      style={{ background: card.tagBg, color: card.tagColor }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Sliding Drawer Sheet like Homepage Product Card */}
                  <div className="comm-pillar-sheet">
                    <div
                      className="comm-pillar-sheet-head"
                      onClick={() => setOpenPillar(isOpen ? -1 : index)}
                    >
                      <h3 className="comm-pillar-sheet-title">{card.title}</h3>
                      <span className="comm-pillar-symbol" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>

                    <div className="comm-pillar-sheet-body">
                      <div className="comm-pillar-item-stat-box">
                        <strong className="comm-pillar-item-num">{card.metric}</strong>
                        <span className="comm-pillar-item-unit">{card.unit}</span>
                      </div>

                      <p className="comm-pillar-item-desc">{card.desc}</p>

                      <ul className="comm-pillar-highlights" aria-label={`${card.title} highlights`}>
                        {card.highlights.map((h, i) => (
                          <li key={i}>
                            <span className="comm-bullet-dot" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* CSR Policies & Statutory Disclosures */}
        <section className="comm-docs-section" aria-label="CSR Policies and Governance">
          <div className="comm-section-head-simple">
            <span className="comm-section-tag">Governance &amp; Transparency</span>
            <h2>CSR Policies &amp; Disclosures</h2>
            <p className="comm-section-desc">
              Statutory documents, annual reports, and social governance standards guiding our community programs.
            </p>
          </div>

          <div className="comm-docs-grid">
            {CSR_DOCUMENTS.map((doc, idx) => (
              <a
                key={idx}
                href={doc.pdf}
                download={doc.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="comm-doc-card"
                title={`Download ${doc.title}`}
              >
                <div className="comm-doc-card-body">
                  <span className="comm-doc-badge">{doc.badge}</span>
                  <h3 className="comm-doc-title">{doc.title}</h3>
                  <p className="comm-doc-meta">{doc.meta}</p>
                </div>
                <div className="comm-doc-card-action">
                  <span className="comm-doc-download-btn">
                    <span>PDF</span>
                    <svg className="comm-doc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <CompanyFooter />
    </div>
  );
}

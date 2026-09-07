import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter, CareerSection } from '../components/company';
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
  iconGradient: string;
  icon: React.ReactNode;
  highlights: string[];
}

const CSR_FOCUS_AREAS: FocusArea[] = [
  {
    id: 'skill-development',
    title: 'Skill Development',
    tag: 'Vocational Skilling',
    tagBg: 'rgba(0, 97, 248, 0.08)',
    tagColor: '#0061f8',
    iconGradient: 'linear-gradient(135deg, #0061f8 0%, #004ecc 100%)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    metric: '1,600+',
    unit: 'Individuals Trained',
    desc: '1,600+ Individuals trained through Pharma Patashala since its inception in 2017 with hands-on pharmaceutical manufacturing and analytical curriculum.',
    image: 'skill-development.webp',
    highlights: [
      'Pharma Patashala specialized technical academy for youth',
      'Hands-on cGMP equipment and laboratory operations training',
      '100% employment linkages and career mentorship programs',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    tag: 'Preventive & Community Health',
    tagBg: 'rgba(13, 148, 136, 0.08)',
    tagColor: '#0d9488',
    iconGradient: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    metric: '15,000+',
    unit: 'Beneficiaries Reached',
    desc: '15,000+ Beneficiaries reached through Breast Cancer Screening Camps, awareness sessions and eye screening programmes for school children.',
    image: 'healthcare.webp',
    highlights: [
      'State-of-the-art mobile mammography and early cancer detection bus',
      'Comprehensive pediatric eye examinations & prescription spectacles',
      'Preventive health diagnostic camps across underserved rural clusters',
    ],
  },
  {
    id: 'education',
    title: 'Education',
    tag: 'Quality Learning Support',
    tagBg: 'rgba(217, 119, 6, 0.08)',
    tagColor: '#d97706',
    iconGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    metric: '2,000+',
    unit: 'Students Benefited',
    desc: '2,000+ Students benefited through Vidya Volunteers and educational support initiatives implemented through NGO partnerships.',
    image: 'education.webp',
    highlights: [
      'Vidya Volunteers grassroots classroom teaching and mentoring',
      'Government school infrastructure refurbishment and digital learning aids',
      'Non-profit partnerships to curb dropout rates and promote girls’ education',
    ],
  },
  {
    id: 'environment',
    title: 'Environment',
    tag: 'Afforestation & Ecology',
    tagBg: 'rgba(5, 150, 105, 0.08)',
    tagColor: '#059669',
    iconGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    metric: '18,000+',
    unit: 'Native Trees Planted',
    desc: '18,000+ Native trees planted across community green belts, schools, and factory buffer zones to nurture local biodiversity.',
    image: 'environment.webp',
    highlights: [
      'Miyawaki dense native forestation drives in peri-urban corridors',
      'Groundwater recharge structures and rural watershed conservation',
      'Community ownership and geotagged tree survival monitoring',
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
  const [openPillar, setOpenPillar] = useState<number>(0);
  const [activeBgIndex, setActiveBgIndex] = useState<number>(0);

  const currentBg =
    activeBgIndex >= 0 && CSR_FOCUS_AREAS[activeBgIndex]?.image
      ? `${CSR}${CSR_FOCUS_AREAS[activeBgIndex].image}`
      : `${CSR}${CSR_FOCUS_AREAS[0].image}`;

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
          <Link to="/">HOME</Link>
          <span className="sep">›</span>
          <Link to="/sustainability">SUSTAINABILITY</Link>
          <span className="sep">›</span>
          <span className="current">Community</span>
        </p>
        {/* Page Title */}
        <h1 className="cp-page-title" style={{ width: '85%', margin: 'clamp(20px, 2.5vw, 32px) auto clamp(24px, 3vw, 36px)' }}>
          Driving Meaningful Impact, Enriching Communities
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

        {/* Core Focus Areas Showcase - Converted to Homepage Sustainability Layout with sustainability-overlay & Dynamic Background Switching */}
        <section
          className="sustainability comm-sustainability"
          id="initiatives"
          style={{ backgroundImage: `url(${currentBg})` }}
          aria-label="Core Focus Areas"
        >
          <div className="sustainability-overlay" />
          <div className="sustainability-copy comm-sustainability-copy">
            <span className="comm-section-tag comm-sustain-tag">
              Key Initiatives
            </span>
            <h2>Core Focus Areas</h2>
            <p>
              Dedicated social investments creating lasting value across health, skilling, education, and ecology.
            </p>
            <div className="comm-sustain-stats-mini">
              <div className="comm-sustain-stat-item">
                <strong>3.5L+</strong>
                <span>Lives Positively Touched</span>
              </div>
              <div className="comm-sustain-stat-item">
                <strong>1M+</strong>
                <span>Vision 2030 Target</span>
              </div>
            </div>
          </div>

          <div className="accordion comm-accordion">
            {CSR_FOCUS_AREAS.map((item, index) => {
              const isOpen = openPillar === index;
              return (
                <article
                  className={isOpen ? 'open' : ''}
                  key={item.id}
                  onMouseEnter={() => setActiveBgIndex(index)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveBgIndex(index);
                      setOpenPillar(isOpen ? -1 : index);
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`comm-pillar-panel-${item.id}`}
                  >
                    <span className="accordion-head">
                      <i className="accordion-icon comm-accordion-icon" style={{ background: item.iconGradient }}>
                        {item.icon}
                      </i>
                      <span>{item.title}</span>
                    </span>
                    <span className="comm-accordion-toggle-wrap">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="comm-accordion-toggle"
                      >
                        {isOpen ? (
                          <path d="M23.75 16.25H6.25V13.75H23.75V16.25Z" fill="#0061f8" />
                        ) : (
                          <path d="M23.75 16.25H16.25V23.75H13.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25Z" fill="#0061f8" />
                        )}
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div id={`comm-pillar-panel-${item.id}`} className="comm-accordion-body">
                      <div className="comm-accordion-meta">
                        <span className="comm-accordion-tag" style={{ background: item.tagBg, color: item.tagColor }}>
                          {item.tag}
                        </span>
                        <div className="comm-accordion-metric">
                          <strong>{item.metric}</strong> <span>{item.unit}</span>
                        </div>
                      </div>

                      <p className="comm-accordion-desc">{item.desc}</p>

                      <ul className="comm-accordion-highlights">
                        {item.highlights.map((h, i) => (
                          <li key={i}>
                            <span className="comm-accordion-bullet" style={{ background: item.tagColor }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Growth Story Journey Banner */}
        <CareerSection />
      </main>

      <CompanyFooter />
    </div>
  );
}

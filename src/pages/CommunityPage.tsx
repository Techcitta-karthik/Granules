import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter, CareerSection } from '../components/company';
import '../components/company/company.css';
import '../styles.css';
import './overview.css';
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
  desc: string;
  image: string;
  icon: React.ReactNode;
}

const CSR_FOCUS_AREAS: FocusArea[] = [
  {
    id: 'skill-development',
    title: 'Skill Development',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    desc: 'Through Pharma Patashala, our specialized technical academy established in 2017, we have trained over 1,600 individuals with hands-on pharmaceutical manufacturing and analytical curriculum, delivering 100% employment linkages and career mentorship programs.',
    image: 'skill-development.webp',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    desc: 'Over 15,000 beneficiaries reached through mobile mammography early cancer detection screening, comprehensive pediatric eye examinations with prescription spectacles, and preventive health diagnostic camps across underserved communities.',
    image: 'healthcare.webp',
  },
  {
    id: 'education',
    title: 'Education',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    desc: 'Empowering more than 2,000 students through Vidya Volunteers grassroots classroom mentoring, government school infrastructure refurbishment, digital learning aids, and non-profit partnerships to curb dropout rates and promote girls’ education.',
    image: 'education.webp',
  },
  {
    id: 'environment',
    title: 'Environment',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    desc: 'Over 18,000 native trees planted across community green belts, schools, and factory buffer zones through Miyawaki dense afforestation drives, groundwater recharge structures, and rural watershed conservation initiatives.',
    image: 'environment.webp',
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

        {/* Executive Leadership Quote Card */}
        <section
          style={{
            width: '85%',
            maxWidth: '85%',
            margin: '20px auto 0',
            padding: '0',
            position: 'relative',
          }}
          aria-label="Executive Leadership Quote"
        >
          <div className="ov-leadership" style={{ width: '100%', maxWidth: '100%', margin: '0' }}>
            <img
              className="ov-leadership-bg"
              src="/assets/csr/uma-devi-hero.webp"
              alt="Mrs. Uma Devi Chigurupati"
              loading="eager"
              decoding="async"
            />
            <div className="ov-leadership-overlay" />
            <div className="ov-quote-card">
              <div className="ov-quote-mark" aria-hidden="true">
                <svg width="46" height="34" viewBox="0 0 36 28" fill="#0061f8">
                  <path d="M0 16.5C0 7.387 6.188 0 15.188 0v6.188c-4.95 0-7.875 3.375-8.438 7.312h8.438V28H0V16.5zm20.812 0C20.812 7.387 27 0 36 0v6.188c-4.95 0-7.875 3.375-8.438 7.312H36V28H20.812V16.5z" />
                </svg>
              </div>
              <p className="ov-quote-text p4">
                We believe lasting progress comes from strong, meaningful relationships with our
                communities and stakeholders. Guided by empathy and responsibility, we support healthcare,
                education, and social development, creating long-term value beyond business.
              </p>
              <p className="ov-quote-name p3">Mrs. Uma Devi Chigurupati</p>
              <p className="ov-quote-role p4">EXECUTIVE DIRECTOR</p>
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
          data-photo={CSR_FOCUS_AREAS[activeBgIndex].id}
          id="initiatives"
          style={{ backgroundImage: `url("${encodeURI(currentBg)}")` }}
          aria-label="Core Focus Areas"
        >

          <div className="accordion comm-accordion">
            {CSR_FOCUS_AREAS.map((item, index) => {
              const isOpen = openPillar === index;
              return (
                <article
                  className={isOpen ? 'open' : ''}
                  key={item.id}
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
                      <i className="accordion-icon comm-accordion-icon">
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
                      <p className="comm-accordion-desc">{item.desc}</p>
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

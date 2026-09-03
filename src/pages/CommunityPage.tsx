import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import '../styles.css';
import './community.css';

const S = '/assets/esg/';
const L = '/assets/leadership/';

interface MetricCard {
  value: string;
  label: string;
}

const COMMUNITY_HERO_METRICS: MetricCard[] = [
  {
    value: '1M+',
    label: 'Touch 1 million lives by 2030',
  },
  {
    value: '3.5L+',
    label: 'Lives positively touched in FY26',
  },
  {
    value: '1,600+',
    label: 'Trained via Pharma Patashala',
  },
  {
    value: '15,000+',
    label: 'Beneficiaries of healthcare camps',
  },
  {
    value: '2,000+',
    label: 'Students benefited by Vidya Volunteers',
  },
  {
    value: '18,000+',
    label: 'Native trees planted & nurtured',
  },
];

interface PillarData {
  id: string;
  category: string;
  tag: string;
  metric: string;
  unit: string;
  desc: string;
  image: string;
  badgeBg: string;
  badgeColor: string;
}

const PILLARS_DATA: PillarData[] = [
  {
    id: 'skill-development',
    category: 'Skill Development',
    tag: 'Vocational Training',
    metric: '1,600+',
    unit: 'Individuals Trained',
    desc: 'Individuals trained through Pharma Patashala since its inception in 2017 with certified curriculum and direct pharmaceutical industry placements.',
    image: 'social-1.webp',
    badgeBg: '#eff6ff',
    badgeColor: '#0061f8',
  },
  {
    id: 'healthcare',
    category: 'Healthcare',
    tag: 'Preventive Care',
    metric: '15,000+',
    unit: 'Beneficiaries Reached',
    desc: 'Beneficiaries reached through Breast Cancer Screening Camps, awareness sessions and eye screening programmes for school children.',
    image: 'community-mammography.webp',
    badgeBg: '#f0fdfa',
    badgeColor: '#0d9488',
  },
  {
    id: 'education',
    category: 'Education',
    tag: 'Student Support',
    metric: '2,000+',
    unit: 'Students Benefited',
    desc: 'Students benefited through Vidya Volunteers and educational support initiatives implemented through NGO partnerships.',
    image: 'social-2.webp',
    badgeBg: '#fffbeb',
    badgeColor: '#d97706',
  },
  {
    id: 'environment',
    category: 'Environment',
    tag: 'Afforestation',
    metric: '18,000+',
    unit: 'Native Trees Planted',
    desc: 'Native trees planted and nurtured across local communities and Granules Green biodiversity initiatives.',
    image: 'esg-biodiversity.webp',
    badgeBg: '#ecfdf5',
    badgeColor: '#059669',
  },
];

export default function CommunityPage() {
  useEffect(() => {
    document.title = 'Community — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp comm-root">
      <NavBar />

      <main className="comm-main">
        {/* Breadcrumb Navigation */}
        <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
          <a href="/">HOMEPAGE</a>
          <span className="sep">›</span>
          <span className="current">COMMUNITY</span>
        </p>

        {/* 1. Hero Split Section: Left Headline/Description/Button + Right 2x3 Metric Cards (Matching Screenshot) */}
        <section className="comm-hero-split">
          <div className="comm-hero-left">
            <h1 className="comm-hero-title">
              Empowering communities through sustainable social development
            </h1>
            <p className="comm-hero-desc">
              With over four decades of industry leadership, Granules India is committed
              to delivering high-impact, sustainable development across local communities.
              Through targeted social initiatives, we drive progress across Skill Development (Pharma Patashala),
              Preventive Healthcare (Mobile Mammography Camps), Quality Education (Vidya Volunteers),
              and Ecological Sustainability.
            </p>
            <a href="#initiatives" className="comm-hero-btn">
              ABOUT COMMUNITY &rarr;
            </a>
          </div>

          <div className="comm-hero-right">
            <div className="comm-hero-metrics-grid">
              {COMMUNITY_HERO_METRICS.map((item, idx) => (
                <div key={idx} className="comm-metric-card">
                  <div className="comm-metric-value">{item.value}</div>
                  <div className="comm-metric-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Leadership Quote Banner */}
        <section className="comm-quote-banner-section">
          <div className="comm-quote-banner">
            <div className="comm-quote-content">
              <span className="comm-quote-icon">“</span>
              <p className="comm-quote-text">
                We believe lasting progress comes from strong, meaningful relationships with our
                communities and stakeholders. Guided by empathy and responsibility, we support
                healthcare, education, and social development, creating long-term value beyond business.
              </p>
              <div className="comm-quote-author">
                <strong>Ms. Uma Devi Chigurupati</strong>
                <span>Executive Director, Granules India Limited</span>
              </div>
            </div>
            <div className="comm-quote-photo-card">
              <img
                src={`${L}uma-devi.webp`}
                alt="Ms. Uma Devi Chigurupati"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* 3. Core Focus Areas Showcase */}
        <section className="comm-pillars-section" id="initiatives">
          <div className="comm-section-head-simple">
            <span className="comm-section-tag">Key Initiatives</span>
            <h2>Core Focus Areas</h2>
            <p className="comm-section-desc">
              Dedicated social investments creating lasting value across health, skilling, education, and ecology.
            </p>
          </div>

          <div className="comm-pillars-showcase">
            {PILLARS_DATA.map((card) => (
              <div key={card.id} className="comm-pillar-item-card">
                <div className="comm-pillar-item-media">
                  <img
                    src={`${S}${card.image}`}
                    alt={card.category}
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    className="comm-pillar-item-badge"
                    style={{ background: card.badgeBg, color: card.badgeColor }}
                  >
                    {card.tag}
                  </span>
                </div>

                <div className="comm-pillar-item-content">
                  <h3 className="comm-pillar-item-title">{card.category}</h3>
                  <div className="comm-pillar-item-stat-box">
                    <strong className="comm-pillar-item-num">{card.metric}</strong>
                    <span className="comm-pillar-item-unit">{card.unit}</span>
                  </div>
                  <p className="comm-pillar-item-desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <CompanyFooter />
    </div>
  );
}

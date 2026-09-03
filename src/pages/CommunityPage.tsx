import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import '../styles.css';
import './community.css';

const S = '/assets/esg/';
const L = '/assets/leadership/';

interface MetricCard {
  tag: string;
  value: string;
  label: string;
}

const COMMUNITY_METRICS: MetricCard[] = [
  {
    tag: 'Our Goal',
    value: '1 Million',
    label: 'Touch 1 million lives by 2030',
  },
  {
    tag: 'Our Progress',
    value: '3.5+ Lakhs',
    label: 'Lives positively touched in FY26',
  },
  {
    tag: 'Skill Development',
    value: '1,600+',
    label: 'Individuals trained through Pharma Patashala since its inception in 2017',
  },
  {
    tag: 'Healthcare',
    value: '15,000+',
    label: 'Beneficiaries reached through Breast Cancer Screening Camps, awareness sessions and eye screening programmes for school children.',
  },
  {
    tag: 'Education',
    value: '2,000+',
    label: 'Students benefited through Vidya Volunteers and educational support initiatives implemented through NGO partnerships.',
  },
  {
    tag: 'Environment',
    value: '18,000+',
    label: 'Native trees planted',
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
          <span>Homepage</span>
          <span className="sep">{'>'}</span>
          <span className="current">Community</span>
        </p>

        {/* 1. Hero Section: Editorial Layout with Signature Title, Human Quote & Sky-Blue Portrait Card */}
        <section className="comm-hero-editorial">
          <div className="comm-hero-editorial-left">
            <h1 className="comm-hero-editorial-title">Community</h1>
            <p className="comm-hero-editorial-quote">
              “We believe lasting progress comes from strong, meaningful relationships with our
              communities and stakeholders. Guided by empathy and responsibility, we support
              healthcare, education, and social development, creating long-term value beyond business.”
            </p>
            <div className="comm-hero-editorial-author">
              – Ms. Uma Chigurupati, Executive Director, Granules India Limited
            </div>
          </div>

          <div className="comm-hero-editorial-right">
            <div className="comm-portrait-blue-card">
              <img
                src={`${L}uma-devi.webp`}
                alt="Ms. Uma Chigurupati, Executive Director, Granules India Limited"
                className="comm-portrait-blue-img"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* 2. Grid of Natural Pale-Blue Metric Cards */}
        <section className="comm-stats-section">
          <div className="comm-stats-cards-grid">
            {COMMUNITY_METRICS.map((item) => (
              <div key={item.tag} className="comm-stat-box">
                <span className="comm-stat-box-tag">{item.tag}</span>
                <strong className="comm-stat-box-num">{item.value}</strong>
                <p className="comm-stat-box-lbl">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Core Focus Areas Showcase */}
        <section className="comm-pillars-section">
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

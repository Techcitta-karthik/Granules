import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './career.css';

const A = '/assets/career/';

const STATS = [
  { label: 'Structured Talent Development', image: 'life-stat-talent.png' },
  { label: '24+ Annual Training Hours', image: 'life-stat-training.png' },
  { label: 'Leadership Development', image: 'life-stat-leadership.png' },
];

const WORKDAY_TABS = [
  {
    label: 'Granules Family Fest',
    title: 'Granules Family Fest',
    desc: 'An annual celebration that brings together employees and their families for cultural activities and fun.',
  },
  { label: 'Sports Fest and 5K Run' },
  { label: "Women's day Celebrations" },
];

const TESTIMONIALS = [
  { name: 'Swathi Marella', role: 'Deputy General Manager, Regulatory Affairs', image: 'testimonial-swathi.png' },
  { name: 'Ch Laxmana Rao', role: 'General Manager, QA', image: null },
  { name: 'Pavani Veeramalla', role: 'Manager, QA', image: 'testimonial-pavani.png' },
  { name: 'Khaleel Shaik', role: 'Vice President – Marketing', image: 'testimonial-khaleel.png' },
];

export default function LifeAtGranulesPage() {
  const [workdayTab, setWorkdayTab] = useState(0);
  const active = WORKDAY_TABS[workdayTab].title ? WORKDAY_TABS[workdayTab] : WORKDAY_TABS[0];

  useEffect(() => {
    document.title = 'Life at Granules — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Life at Granules</span>
      </p>
      <h1 className="cp-page-title">Life at Granules</h1>

      <div className="car-hero">
        <img src={`${A}life-hero.png`} alt="Granules India colleagues in an informal discussion" />
      </div>

      <div className="car-intro-row">
        <div className="car-intro-copy">
          <p className="lede">
            At Granules, we believe in careers that go beyond tasks; where people grow with
            purpose, are empowered to lead, and contribute to something bigger. We have built a
            workplace that supports your <span className="muted">ambitions and celebrates your contributions, professionally and personally.</span>
          </p>
          <p className="sub">
            We recognise that the skills and dedication of our teams play a vital role in
            achieving operational efficiency, advancing pharmaceutical innovation, and enabling
            sustainable business growth. By nurturing talent and caring for people across
            functions and levels, we strengthen our competitiveness, reinforce our role in the
            healthcare value chain, and cultivate a performance-driven culture across Granules.
          </p>
        </div>
      </div>

      <div className="car-why-head" style={{ width: 'min(1464px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 100px) auto 0' }}>
        <div className="car-why-copy">
          <span className="car-why-tag">Empowering Your Growth</span>
          <h2>Talent management and growth</h2>
          <p>We invest in building a capable, resilient, and future-ready workforce through</p>
        </div>
        <a className="car-cta-btn" href="/#footer">Explore Current Openings</a>
      </div>

      <div className="car-stats">
        {STATS.map((stat) => (
          <div className="car-stat-card" key={stat.label}>
            <img className="photo" src={`${A}${stat.image}`} alt="" />
            <div className="car-stat-bar">
              <p>{stat.label}</p>
              <div className="car-stat-icon">
                <img src={`${A}icon-card-arrow.svg`} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="car-workday">
        <img className="bg" src={`${A}beyond-workday-bg.png`} alt="Granules Family Fest celebration" />
        <div className="overlay" />
        <div className="car-workday-inner">
          <div className="car-workday-head">
            <h2>Beyond the workday</h2>
            <p>
              Strong teams are built on shared experiences, not just shared tasks. Our flagship
              engagement events across Hyderabad and Vishakhapatnam celebrate connection, energy,
              and belonging.
            </p>
          </div>
          {active.title && (
            <div className="car-workday-active">
              <p className="label">{active.title}</p>
              <p className="desc">{active.desc}</p>
            </div>
          )}
        </div>
        <div className="car-workday-tabs">
          {WORKDAY_TABS.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              className={`car-workday-tab${index === workdayTab ? ' active' : ''}`}
              onClick={() => setWorkdayTab(index)}
            >
              {tab.label}
              <img src={`${A}icon-plus-small.svg`} alt="" style={index === workdayTab ? { filter: 'invert(1)' } : undefined} />
            </button>
          ))}
        </div>
      </div>

      <div className="car-testimonials">
        <h2>Voices from Granules</h2>
        <div className="car-testimonial-track">
          {TESTIMONIALS.map((t) => (
            <div className="car-testimonial-card" key={t.name}>
              <div className="car-testimonial-photo">
                {t.image && <img src={`${A}${t.image}`} alt={t.name} />}
              </div>
              <div className="car-testimonial-foot">
                <div>
                  <p className="name">{t.name}</p>
                  <p className="role">{t.role}</p>
                </div>
                <div className="car-testimonial-add">
                  <img src={`${A}icon-plus-round.svg`} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="car-cta-photo">
        <img className="bg" src={`${A}life-cta-bg.png`} alt="" />
        <div className="overlay" />
        <div className="car-cta-copy">
          <h2>Let&rsquo;s grow together</h2>
          <p>
            Granules is where your ambition meets opportunity. Join a purpose-led community where
            your growth is the goal.
          </p>
        </div>
        <a className="car-cta-btn" href="/#footer">Apply now</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

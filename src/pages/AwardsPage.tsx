import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './awards.css';

const AW = '/assets/awards/';

type AwardEntry = { image: string; contain?: boolean; caption: string };

const CATEGORIES = ['Leadership', 'Sustainability', 'Innovation'] as const;
type Category = (typeof CATEGORIES)[number];

const AWARDS_BY_CATEGORY: Record<Category, AwardEntry[]> = {
  Leadership: [
    { image: 'award-1.png', caption: 'Dr. Krishna Prasad Chigurupati, Chairman and Managing Director, Granules India Limited received BW Pharma Person of the Year Award 2024 by BW Pharma World & BW Healthcare World' },
    { image: 'award-2.png', caption: 'Mrs. Uma Chigurupati, Executive Director, Granules India Limited Awarded for Exemplary Leadership in Social Impact & Corporate Responsibility 2024 by EdelGive Foundation & HURUN INDIA' },
    { image: 'award-3.png', caption: 'Mr. Mukesh Surana, Chief Financial Officer, Granules India Limited Honoured with CII CFO Excellence Award 2024 for the Pharma & Chemicals Sector by Confederation of Indian Industry (CII)' },
    { image: 'award-4.png', caption: 'Ms. Priyanka Chigurupati Awarded with the BW Healthcare World 40 Under 40 Young Achievers 2023 by Businessworld' },
    { image: 'award-5.png', caption: 'FDD Leadership Award 2023 by Express Pharma and The Indian Express Pvt. Ltd.' },
    { image: 'award-6.png', caption: 'Future Ready Organization Award 2023 by Economic Times' },
    { image: 'award-7-bg.png', contain: true, caption: 'Most Trusted Brands of India 2023 by Team Marksmen' },
    { image: 'award-8.png', contain: true, caption: 'Glory of India Award 2022 Presented to Chairman & Managing Director' },
  ],
  Sustainability: [],
  Innovation: [],
};

export default function AwardsPage() {
  const [category, setCategory] = useState<Category>('Leadership');

  useEffect(() => {
    document.title = 'Awards and Recognitions — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const entries = AWARDS_BY_CATEGORY[category];

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Company</span>
        <span className="sep">{'>'}</span>
        <span className="current">Awards</span>
      </p>

      <div className="aw-hero">
        <h1 className="cp-page-title" style={{ margin: 0, width: 'auto' }}>Awards and recognitions</h1>
        <p>
          Our recognitions are a direct result of how we operate — with precision, responsibility,
          and consistency across complex, regulated markets. Whether it&rsquo;s for operational{' '}
          <span className="muted">
            excellence, integration of innovation across the value chain, or responsible business
            conduct, each award reaffirms the standards we uphold every day at Granules.
          </span>
        </p>
      </div>

      <div className="aw-tabs">
        {CATEGORIES.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`aw-tab${tab === category ? ' active' : ''}`}
            onClick={() => setCategory(tab)}
          >
            {tab}
          </button>
        ))}
        <span className="aw-year">2025</span>
      </div>

      {entries.length > 0 ? (
        <div className="aw-grid">
          {entries.map((award, index) => (
            <article className="aw-card" key={index}>
              <div className={`aw-card-image${award.contain ? ' contain' : ''}`}>
                <img src={`${AW}${award.image}`} alt="" />
              </div>
              <p>{award.caption}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="aw-empty">More {category.toLowerCase()} awards will be published soon.</p>
      )}

      <div className="aw-cta">
        <img className="cp-bg" src={`${AW}cta-bg.png`} alt="" />
        <div className="cp-bg-overlay" />
        <div className="aw-cta-copy">
          <h2>Lorem ipsum mattis viverra tortor</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. At malesuada at sed phasellus. Ipsum posuere
            aliquam dignissim suspendisse arcu tellus.
          </p>
        </div>
        <a className="cp-cta-btn" href="/company">Lorem ipsum</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

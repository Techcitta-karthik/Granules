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
    { image: 'award-1.webp', caption: 'Dr. Krishna Prasad Chigurupati, Chairman and Managing Director, Granules India Limited received BW Pharma Person of the Year Award 2024 by BW Pharma World & BW Healthcare World' },
    { image: 'award-2.webp', caption: 'Mrs. Uma Chigurupati, Executive Director, Granules India Limited Awarded for Exemplary Leadership in Social Impact & Corporate Responsibility 2024 by EdelGive Foundation & HURUN INDIA' },
    { image: 'award-3.webp', caption: 'Mr. Mukesh Surana, Chief Financial Officer, Granules India Limited Honoured with CII CFO Excellence Award 2024 for the Pharma & Chemicals Sector by Confederation of Indian Industry (CII)' },
    { image: 'award-4.webp', caption: 'Ms. Priyanka Chigurupati Awarded with the BW Healthcare World 40 Under 40 Young Achievers 2023 by Businessworld' },
    { image: 'award-5.webp', caption: 'FDD Leadership Award 2023 by Express Pharma and The Indian Express Pvt. Ltd.' },
    { image: 'award-6.webp', caption: 'Future Ready Organization Award 2023 by Economic Times' },
    { image: 'award-7-bg.webp', contain: true, caption: 'Most Trusted Brands of India 2023 by Team Marksmen' },
    { image: 'award-8.webp', contain: true, caption: 'Glory of India Award 2022 Presented to Chairman & Managing Director' },
  ],
  Sustainability: [
    { image: 'award-9.webp', caption: 'Golden Peacock Award for Sustainability 2024 by the Institute of Directors (IOD)' },
    { image: 'award-10.webp', caption: 'CII 25th National Award for Excellence in Energy Management 2024 by CII Energy Efficiency Council' },
    { image: 'award-11.webp', caption: 'Valued Partner of Ashray Akruti 2024 by Ashray Akruti Foundation' },
    { image: 'award-12.webp', caption: 'Gold Medal at the Indian Red Cross Annual General Meeting 2024 for establishing the Dr. Chigurupati Nageshwara Rao Rotary Dialysis Centre' },
  ],
  Innovation: [
    { image: 'award-17.webp', caption: 'Best Management Award 2025 by Government of Telangana, Department of Labour' },
    { image: 'award-18.webp', caption: 'Pharma Quality Excellence Awards 2024 by Eminence Business Media' },
    { image: 'award-19.webp', caption: '49th CII National Kaizen Competition 2024 by Confederation of Indian Industry (CII)' },
    { image: 'award-20.webp', caption: 'CII SR-EHS Excellence Awards 2024 by Confederation of Indian Industry – Southern Region' },
    { image: 'award-21.webp', caption: 'Excellence in Use of Technology by The Economic Times Re-Pharma Award 2024' },
    { image: 'award-24.webp', caption: 'Gold Winner at the 10th CII National Poka-Yoke Competition 2022 by CII' },
  ],
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

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
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
          and consistency across complex, regulated markets. Whether it&rsquo;s for operational
          excellence, integration of innovation across the value chain, or responsible business
          conduct, each award reaffirms the standards we uphold every day at Granules.
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
                <img src={`${AW}${award.image}`} alt="" loading="lazy" decoding="async" />
              </div>
              <p>{award.caption}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="aw-empty">More {category.toLowerCase()} awards will be published soon.</p>
      )}

      <div className="aw-cta">
        <img className="cp-bg" src={`${AW}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
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
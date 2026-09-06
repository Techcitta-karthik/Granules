import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './facilities.css';

const F = '/assets/facilities/';

type Facility = {
  name: string;
  location: string;
  country: 'India' | 'USA' | 'Switzerland';
  countryCode: 'IN' | 'US' | 'CH';
  image: string;
};

const FACILITIES: Facility[] = [
  // India Facilities
  { name: 'Bonthapally', location: 'TELANGANA', country: 'India', countryCode: 'IN', image: 'bonthapally.webp' },
  { name: 'Bonthapally II (API Intermediate)', location: 'TELANGANA', country: 'India', countryCode: 'IN', image: 'bonthapally-2.webp' },
  { name: 'Jeedimetla', location: 'TELANGANA', country: 'India', countryCode: 'IN', image: 'jeedimetla.webp' },
  { name: 'Gagillapur', location: 'TELANGANA', country: 'India', countryCode: 'IN', image: 'gagillapur.webp' },
  { name: 'Granules Life Sciences (GLS)', location: 'TELANGANA', country: 'India', countryCode: 'IN', image: 'gls.webp' },
  { name: 'Visakhapatnam (Unit IV)', location: 'ANDHRA PRADESH', country: 'India', countryCode: 'IN', image: 'vizag-unit4.webp' },
  { name: 'Visakhapatnam (Unit V)', location: 'ANDHRA PRADESH', country: 'India', countryCode: 'IN', image: 'vizag-unit5.webp' },

  // USA Facilities
  {
    name: 'Granules Pharmaceuticals, Inc.',
    location: 'CHANTILLY, VIRGINIA',
    country: 'USA',
    countryCode: 'US',
    image: 'gpi-chantilly.webp',
  },
  {
    name: 'Granules Consumer Health (Packaging & Distribution)',
    location: 'MANASSAS, VIRGINIA',
    country: 'USA',
    countryCode: 'US',
    image: 'granules-manassas.jpg',
  },
  {
    name: 'Granules USA Inc.',
    location: 'PARSIPPANY, NEW JERSEY',
    country: 'USA',
    countryCode: 'US',
    image: 'granules-parsippany.jpg',
  },
  {
    name: 'Manufacturing Facility',
    location: 'VIRGINIA, USA',
    country: 'USA',
    countryCode: 'US',
    image: 'virginia-usa.webp',
  },

  // Switzerland Facility
  {
    name: 'Senn Chemicals AG',
    location: 'DIELSDORF, SWITZERLAND',
    country: 'Switzerland',
    countryCode: 'CH',
    image: 'senn-chemicals-dielsdorf.jpg',
  },
];

const FILTERS = ['All', 'India', 'USA', 'Switzerland'] as const;
type Filter = (typeof FILTERS)[number];

export default function FacilitiesPage() {
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    document.title = 'Our Facilities — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const facilities = filter === 'All' ? FACILITIES : FACILITIES.filter((f) => f.country === filter);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <a href="/">HOME</a>
        <span className="sep">›</span>
        <a href="/company">ABOUT US</a>
        <span className="sep">›</span>
        <span className="current">FACILITIES</span>
      </p>
      <h1 className="cp-page-title">Our facilities</h1>

      <div className="fac-intro">
        <p>
          Granules India operates GMP-compliant facilities across India, the United States, and Switzerland,
          serving North America, Europe, India, Latin America, and emerging markets. Our vertical
          integration&mdash;from raw materials to finished formulations&mdash;ensures speed to
          market, tight quality control, and supply resilience.
        </p>
        <p>
          With specialized R&amp;D hubs, advanced packaging lines, and regulatory-aligned plants worldwide, Granules delivers on its
          promise of affordable, high-quality, chronic care innovation at scale.
        </p>
      </div>

      <div className="fac-filters">
        {FILTERS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`fac-filter${tab === filter ? ' active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="fac-grid">
        {facilities.map((facility) => (
          <article className="fac-card" key={facility.name}>
            <div className="fac-card-image">
              <img src={`${F}${facility.image}`} alt={facility.name} loading="lazy" decoding="async" />
              <span className="fac-country-badge">
                <span className="fac-country-code">{facility.countryCode}</span> {facility.country}
              </span>
            </div>
            <div className="fac-card-info">
              <div>
                <p className="fac-card-name">{facility.name}</p>
                <p className="fac-card-loc">{facility.location}</p>
              </div>
              <span className="fac-card-icon">
                <img src={`${F}icon-plus.svg`} alt="" loading="lazy" decoding="async" />
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="fac-cta">
        <img className="bg" src={`${F}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="fac-cta-copy">
          <h2>World-Class Global Manufacturing &amp; Supply Resilience</h2>
          <p>
            Operating 12 state-of-the-art facilities across India, North America, and Switzerland,
            Granules empowers worldwide healthcare with unmatched pharmaceutical excellence.
          </p>
        </div>
        <a className="cp-cta-btn" href="/company/global-presence">Global Presence</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

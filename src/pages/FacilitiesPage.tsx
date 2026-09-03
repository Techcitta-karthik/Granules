import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './facilities.css';

const F = '/assets/facilities/';

type Facility = { name: string; location: string; country: 'India' | 'USA'; image: string };

const FACILITIES: Facility[] = [
  { name: 'Bonthapally', location: 'Telangana', country: 'India', image: 'bonthapally.webp' },
  { name: 'Bonthapally II (API Intermediate)', location: 'Telangana', country: 'India', image: 'bonthapally-2.webp' },
  { name: 'Jeedimetla', location: 'Telangana', country: 'India', image: 'jeedimetla.webp' },
  { name: 'Gagillapur', location: 'Telangana', country: 'India', image: 'gagillapur.webp' },
  { name: 'Granules Life Sciences (GLS)', location: 'Telangana', country: 'India', image: 'gls.webp' },
  { name: 'Visakhapatnam (Unit IV)', location: 'Andhra Pradesh', country: 'India', image: 'vizag-unit4.webp' },
  { name: 'Visakhapatnam (Unit V)', location: 'Andhra Pradesh', country: 'India', image: 'vizag-unit5.webp' },
  { name: 'Manufacturing Facility', location: 'Virginia, USA', country: 'USA', image: 'virginia-usa.webp' },
];

const FILTERS = ['All', 'India', 'USA'] as const;
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
        <a href="/">HOMEPAGE</a>
        <span className="sep">›</span>
        <a href="/company">COMPANY</a>
        <span className="sep">›</span>
        <span className="current">FACILITIES</span>
      </p>
      <h1 className="cp-page-title">Our facilities</h1>

      <div className="fac-intro">
        <p>
          Granules India operates GMP-compliant facilities across India and the United States
          serving North America, Europe, India, Latin America, and emerging markets. Our vertical
          integration&mdash;from raw materials to finished formulations&mdash;ensures speed to
          market, tight quality control, and supply resilience.
        </p>
        <p>
          With specialized R&amp;D hubs and regulatory-aligned plants, Granules delivers on its
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

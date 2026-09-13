import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './facilities.css';

const F = '/assets/facilities/';

type FacilityCategory = 'Formulations' | 'API' | 'PFI' | 'CDMO';

type Facility = {
  name: string;
  location: string;
  category: 'Formulations' | 'API' | 'CDMO';
  categories?: FacilityCategory[];
  country: 'India' | 'USA' | 'Switzerland';
  countryCode: 'IN' | 'US' | 'CH';
  image: string;
  apiCapacity?: string;
  fdCapacity?: string;
  pfiCapacity?: string;
  packaging?: string;
  specialization?: string;
};

/* Strictly the 10 manufacturing bases from "Our Manufacturing Network" */
const FACILITIES: Facility[] = [
  // Formulations
  {
    name: 'Gagillapur',
    location: 'HYDERABAD, TELANGANA',
    category: 'Formulations',
    categories: ['Formulations', 'PFI'],
    country: 'India',
    countryCode: 'IN',
    image: 'gagillapur.webp',
    fdCapacity: '2.7 Bn',
    pfiCapacity: '23 KTPA',
  },
  {
    name: 'Unit-V, Vizag (ONCO)',
    location: 'VISAKHAPATNAM, ANDHRA PRADESH',
    category: 'Formulations',
    categories: ['Formulations', 'API'],
    country: 'India',
    countryCode: 'IN',
    image: 'vizag-unit5.webp',
    apiCapacity: '15 KLPA',
    fdCapacity: '1.1 Bn',
  },
  {
    name: 'Granules Life Sciences',
    location: 'HYDERABAD, TELANGANA',
    category: 'Formulations',
    categories: ['Formulations'],
    country: 'India',
    countryCode: 'IN',
    image: 'gls.webp',
    fdCapacity: '10 Bn',
  },
  {
    name: 'Granules Pharmaceuticals, Inc.',
    location: 'CHANTILLY, VIRGINIA',
    category: 'Formulations',
    categories: ['Formulations'],
    country: 'USA',
    countryCode: 'US',
    image: 'GPI-Cover.jpeg',
    fdCapacity: '2 Bn',
  },
  {
    name: 'GPAK (Packaging & Distribution)',
    location: 'MANASSAS, VIRGINIA',
    category: 'Formulations',
    categories: ['Formulations'],
    country: 'USA',
    countryCode: 'US',
    image: 'granules-manassas.jpg',
    packaging: '2 OTC Lines | 1 Rx Line',
  },

  // API
  {
    name: 'Bonthapally (Unit I)',
    location: 'HYDERABAD, TELANGANA',
    category: 'API',
    categories: ['API'],
    country: 'India',
    countryCode: 'IN',
    image: 'bonthapally.webp',
    apiCapacity: '35 KTPA',
  },
  {
    name: 'Jeedimetla',
    location: 'HYDERABAD, TELANGANA',
    category: 'API',
    categories: ['API', 'PFI'],
    country: 'India',
    countryCode: 'IN',
    image: 'jeedimetla.webp',
    apiCapacity: '4,800 TPA',
    pfiCapacity: '1,440 TPA',
  },
  {
    name: 'Bonthapally (Unit II)',
    location: 'HYDERABAD, TELANGANA',
    category: 'API',
    categories: ['API'],
    country: 'India',
    countryCode: 'IN',
    image: 'bonthapally-2.webp',
    apiCapacity: '62 KLPA',
  },
  {
    name: 'Unit-IV, Vizag',
    location: 'VISAKHAPATNAM, ANDHRA PRADESH',
    category: 'API',
    categories: ['API'],
    country: 'India',
    countryCode: 'IN',
    image: 'vizag-unit4.webp',
    apiCapacity: '380 KLPA',
  },

  // CDMO
  {
    name: 'Senn Chemicals AG (Zurich)',
    location: 'DIELSDORF, ZURICH, SWITZERLAND',
    category: 'CDMO',
    categories: ['CDMO'],
    country: 'Switzerland',
    countryCode: 'CH',
    image: 'Senn Chem.png',
    specialization: 'Peptide CDMO',
  },
];

const getFacilityCategories = (facility: Facility): FacilityCategory[] => {
  if (facility.categories && facility.categories.length > 0) {
    return facility.categories;
  }
  const tags: FacilityCategory[] = [];
  if (facility.category === 'Formulations' || facility.fdCapacity) tags.push('Formulations');
  if (facility.category === 'API' || facility.apiCapacity) tags.push('API');
  if (facility.pfiCapacity) tags.push('PFI');
  if (facility.category === 'CDMO') tags.push('CDMO');
  return Array.from(new Set(tags));
};

const FILTERS = ['All', 'Formulations', 'API', 'PFI', 'CDMO'] as const;
type Filter = (typeof FILTERS)[number];

export default function FacilitiesPage() {
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    document.title = 'Our Facilities — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const facilities =
    filter === 'All'
      ? FACILITIES
      : FACILITIES.filter((f) => getFacilityCategories(f).includes(filter));

  return (
    <div className="cp fac-page">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/business">BUSINESS</Link>
        <span className="sep">›</span>
        <span className="current">FACILITIES</span>
      </p>
      <h1 className="cp-page-title">Our Facilities</h1>

      <div className="fac-intro">
        <p>
          Granules India operates 10 specialized manufacturing bases across India, the United States, and Switzerland,
          serving North America, Europe, India, Latin America, and emerging markets. Our vertical
          integration&mdash;from raw materials to finished formulations&mdash;ensures speed to
          market, tight quality control, and supply resilience.
        </p>
        <p>
          With specialized R&amp;D hubs, advanced packaging lines, and regulatory-aligned plants worldwide, Granules delivers on its
          promise of affordable, high-quality, chronic care innovation at scale.
        </p>
      </div>

      {/* Facilities Filter Showcase */}
      <section className="fac-showcase-section" aria-label="Manufacturing Bases Showcase">
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
                <div className="fac-card-tags">
                  {getFacilityCategories(facility).map((cat) => (
                    <span className="fac-category-tag" key={cat}>
                      {cat}
                    </span>
                  ))}
                </div>
                <span className="fac-country-badge">
                  <span className="fac-country-code">{facility.countryCode}</span> {facility.country}
                </span>
              </div>
              <div className="fac-card-info">
                <div>
                  <p className="fac-card-name">{facility.name}</p>
                  <p className="fac-card-loc">{facility.location}</p>
                  <div className="fac-card-caps">
                    {facility.apiCapacity && (
                      <span className="fac-cap-pill">API: {facility.apiCapacity}</span>
                    )}
                    {facility.fdCapacity && (
                      <span className="fac-cap-pill">FD: {facility.fdCapacity}</span>
                    )}
                    {facility.pfiCapacity && (
                      <span className="fac-cap-pill">PFI: {facility.pfiCapacity}</span>
                    )}
                    {facility.packaging && (
                      <span className="fac-cap-pill">{facility.packaging}</span>
                    )}
                    {facility.specialization && (
                      <span className="fac-cap-pill">{facility.specialization}</span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="fac-cta">
        <img className="bg" src={`${F}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="fac-cta-copy">
          <h2>World-Class Global Manufacturing &amp; Supply Resilience</h2>
          <p>
            Operating 10 state-of-the-art facilities across India, North America, and Switzerland,
            Granules empowers worldwide healthcare with unmatched pharmaceutical excellence.
          </p>
        </div>
        <Link className="cp-cta-btn" to="/company/global-presence">Global Presence</Link>
      </div>

      <CompanyFooter />
    </div>
  );
}

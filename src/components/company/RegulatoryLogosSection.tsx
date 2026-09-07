import { useState } from 'react';
import { REGULATORY_LOGOS } from '../../data/regulatoryLogosData';
import './regulatoryLogos.css';

const REGIONS = ['All', 'North America', 'Europe', 'Asia-Pacific', 'Latin America & Other'];

export default function RegulatoryLogosSection() {
  const [activeRegion, setActiveRegion] = useState('All');

  const filteredLogos = REGULATORY_LOGOS.filter((item) => {
    if (activeRegion === 'All') return true;
    if (activeRegion === 'North America') return item.region === 'North America';
    if (activeRegion === 'Europe') return item.region === 'Europe';
    if (activeRegion === 'Asia-Pacific') return item.region === 'Asia-Pacific';
    if (activeRegion === 'Latin America & Other') {
      return ['Latin America', 'Middle East', 'Africa', 'Global'].includes(item.region);
    }
    return true;
  });

  return (
    <section className="cp-shell cp-reg-section" aria-labelledby="cp-reg-title">
      <div className="cp-reg-header">
        <span className="cp-section-badge">Global Accreditations &amp; Approvals</span>
        <h2 id="cp-reg-title" className="cp-reg-title">
          Trusted by the World’s Leading Health Authorities
        </h2>
        <p className="cp-reg-subtitle">
          With more than 45 successful global inspections, Granules’ advanced manufacturing sites
          consistently uphold rigorous international quality standards and cGMP compliance across major regulated markets.
        </p>
      </div>

      <div className="cp-reg-filters" role="tablist" aria-label="Regulatory Regions">
        {REGIONS.map((region) => (
          <button
            key={region}
            type="button"
            role="tab"
            aria-selected={activeRegion === region}
            className={`cp-reg-filter-btn ${activeRegion === region ? 'is-active' : ''}`}
            onClick={() => setActiveRegion(region)}
          >
            {region}
            {region === 'All' ? ` (${REGULATORY_LOGOS.length})` : ''}
          </button>
        ))}
      </div>

      <div className="cp-reg-grid">
        {filteredLogos.map((logo) => (
          <article className="cp-reg-card" key={logo.id}>
            <div className="cp-reg-logo-wrap">
              <img
                src={logo.image}
                alt={`${logo.name} logo`}
                className="cp-reg-logo-img"
                loading="lazy"
              />
            </div>
            <div className="cp-reg-card-content">
              <div className="cp-reg-card-top">
                <span className="cp-reg-country-tag">{logo.country}</span>
                {logo.badge && <span className="cp-reg-status-pill">{logo.badge}</span>}
              </div>
              <h3 className="cp-reg-card-name">{logo.name}</h3>
              <p className="cp-reg-card-desc">{logo.fullName}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

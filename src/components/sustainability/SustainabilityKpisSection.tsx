import React from 'react';

const KPI_ROWS = [
  [
    {
      icon: '/assets/sustainability/non-fin1.png',
      value: '45.7%',
      label: 'Absolute reduction in GHG emissions (Scope 1 and 2)',
    },
    {
      icon: '/assets/sustainability/non-fin2x.png',
      value: '98%',
      label: 'Of electricity consumption from renewable sources (PPA, rooftop solar, I-RECs)',
    },
    {
      icon: '/assets/sustainability/non-fin3x.png',
      value: '~39%',
      label: 'Of our wastewater is recycled',
    },
  ],
  [
    {
      icon: '/assets/sustainability/non-fin4x.png',
      value: '93%',
      label: 'Waste diverted from landfill',
    },
    {
      icon: '/assets/sustainability/non-fin5.png',
      value: '82%',
      label: 'Vendors engaged for carbon footprint and climate commitment',
    },
    {
      icon: '/assets/sustainability/non-fin6.png',
      value: '6,523+',
      label: 'Total Work Force',
    },
  ],
  [
    {
      icon: '/assets/sustainability/non-fin7.png',
      value: '14.1%',
      label: 'Female Work Force',
    },
    {
      icon: '/assets/sustainability/non-fin8.png',
      value: '21.5%',
      label: 'Increase in Female employees compared to previous Year',
    },
    {
      icon: '/assets/sustainability/non-fin9x.png',
      value: '100%',
      label: 'Return-to-work rate',
    },
  ],
  [
    {
      icon: '/assets/sustainability/non-fin10.png',
      value: '1,600+',
      label: 'Students trained through Pharma Pathshala',
    },
    {
      icon: '/assets/sustainability/non-fin11.png',
      value: '0%',
      label: 'Confirmed cases of discrimination',
    },
    {
      icon: '/assets/sustainability/non-fin12.png',
      value: '27%',
      label: 'Women on the Board',
    },
  ],
];

export default function SustainabilityKpisSection() {
  return (
    <section className="sus-kpi-sec-img2">
      <div className="sus-kpi-eyebrow-container">
        <div className="sus-kpi-eyebrow-line" />
        <span className="sus-kpi-eyebrow-star">★</span>
        <div className="sus-kpi-eyebrow-line" />
      </div>
      <p className="sus-kpi-eyebrow-text">Key Performance Indicators</p>
      <h2 className="sus-kpi-title-img2">Progressing With Purpose</h2>

      <div className="sus-kpi-rows-wrap">
        {KPI_ROWS.map((row, rowIdx) => (
          <React.Fragment key={rowIdx}>
            <div className="sus-kpi-row-grid">
              {row.map((item, itemIdx) => (
                <div key={itemIdx} className="sus-kpi-card-img2">
                  <img
                    src={item.icon}
                    alt=""
                    className="sus-kpi-card-img2-icon"
                    loading="lazy"
                  />
                  <div className="sus-kpi-card-img2-content">
                    <p className="sus-kpi-card-img2-val">{item.value}</p>
                    <p className="sus-kpi-card-img2-label">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
            {rowIdx < KPI_ROWS.length - 1 && (
              <div className="sus-kpi-row-divider" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

interface KpiItem {
  icon: string;
  value: string;
  label: string;
}

const SUSTAINABILITY_KPIS: KpiItem[] = [
  {
    icon: '/assets/sustainability/non-fin1-light.png',
    value: '45.7%',
    label: 'Absolute reduction in GHG emissions (Scope 1 and 2)',
  },
  {
    icon: '/assets/sustainability/non-fin2x-light.png',
    value: '98%',
    label: 'Of electricity consumption from renewable sources (PPA, rooftop solar, I-RECs)',
  },
  {
    icon: '/assets/sustainability/non-fin3x-light.png',
    value: '~39%',
    label: 'Of our wastewater is recycled',
  },
  {
    icon: '/assets/sustainability/non-fin4x-light.png',
    value: '93%',
    label: 'Waste diverted from landfill',
  },
  {
    icon: '/assets/sustainability/non-fin5-light.png',
    value: '82%',
    label: 'Vendors engaged for carbon footprint and climate commitment',
  },
  {
    icon: '/assets/sustainability/non-fin6-light.png',
    value: '6,523+',
    label: 'Total Work Force',
  },
  {
    icon: '/assets/sustainability/non-fin7-light.png',
    value: '14.1%',
    label: 'Female Work Force',
  },
  {
    icon: '/assets/sustainability/non-fin8-light.png',
    value: '21.5%',
    label: 'Increase in Female employees compared to previous Year',
  },
  {
    icon: '/assets/sustainability/non-fin9x-light.png',
    value: '100%',
    label: 'Return-to-work rate',
  },
  {
    icon: '/assets/sustainability/non-fin10-light.png',
    value: '1,600+',
    label: 'Students trained through Pharma Pathshala',
  },
  {
    icon: '/assets/sustainability/non-fin11-light.png',
    value: '0%',
    label: 'Confirmed cases of discrimination',
  },
  {
    icon: '/assets/sustainability/non-fin12-light.png',
    value: '27%',
    label: 'Women on the Board',
  },
];

export default function SustainabilityKpisSection() {
  return (
    <section className="sus-kpi-sec-img2" id="kpis" aria-label="Progressing With Purpose">
      <span className="tag">Key Performance Indicators</span>
      <h2 className="sus-kpi-title-img2">Progressing With Purpose</h2>

      <div className="sus-kpi-tag-grid">
        {SUSTAINABILITY_KPIS.map((item) => (
          <div className="sus-kpi-tag" key={item.label}>
            <img
              src={item.icon}
              alt=""
              className="sus-kpi-tag-icon"
              loading="lazy"
              decoding="async"
            />
            <div className="sus-kpi-tag-content">
              <span className="sus-kpi-tag-val">{item.value}</span>
              <span className="sus-kpi-tag-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

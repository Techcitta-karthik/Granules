import { asset } from './constants';
import { VALUES } from './data';
import ValueCard from './ValueCard';

export default function ValuesSection() {
  return (
    <section className="cp-values-section" aria-label="Our values">
      <img className="cp-bg" src={asset('values-bg-2.png')} alt="" />
      <div className="cp-bg-overlay" />
      <span className="cp-values-badge">Our Values</span>
      <div className="cp-values-grid">
        {VALUES.map((value) => (
          <ValueCard key={value.title} {...value} />
        ))}
      </div>
    </section>
  );
}

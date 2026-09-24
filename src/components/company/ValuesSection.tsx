import { VALUES } from './data';
import { asset } from './constants';
import ValueCard from './ValueCard';

export default function ValuesSection() {
  return (
    <section className="cp-values-section" aria-label="Our values">
      <img className="cp-bg" src={asset('values-mesh.jpg')} alt="" loading="lazy" decoding="async" />
      <div className="cp-values-inner">
        <span className="cp-values-badge">Our Values</span>
        <div className="cp-values-grid">
          {VALUES.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
}

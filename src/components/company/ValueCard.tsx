import { asset } from './constants';
import type { ValueItem } from './types';

export default function ValueCard({ icon, title, body }: ValueItem) {
  return (
    <article className="cp-value-card" tabIndex={0}>
      <div className="cp-value-header">
        <span className="cp-value-icon">
          <img src={asset(icon)} alt="" loading="lazy" decoding="async" />
        </span>
        <h4 className="cp-value-title-top">{title}</h4>
      </div>
      <p className="cp-value-desc">{body}</p>
      <h4 className="cp-value-title-bottom" aria-hidden="true">{title}</h4>
    </article>
  );
}

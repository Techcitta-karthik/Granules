import { asset } from './constants';
import type { ValueItem } from './types';

export default function ValueCard({ icon, title, body }: ValueItem) {
  return (
    <article className="cp-value-card" tabIndex={0}>
      <span className="cp-value-icon">
        <img src={asset(icon)} alt="" loading="lazy" decoding="async" />
      </span>
      <div className="cp-value-body">
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </article>
  );
}

import { asset } from './constants';
import type { ValueItem } from './types';

export default function ValueCard({ icon, title, body, image }: ValueItem) {
  return (
    <article className={`cp-value-card${image ? ' cp-value-card--has-image' : ''}`} tabIndex={0}>
      {image && (
        <>
          <img
            className="cp-value-card-bg"
            src={asset(image)}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="cp-value-card-overlay" />
        </>
      )}
      <div className="cp-value-header">
        <span className="cp-value-icon">
          <img src={asset(icon)} alt="" loading="lazy" decoding="async" />
        </span>
        <h4 className="cp-value-title-top">{title}</h4>
      </div>
      <div className="cp-value-body">
        <h4 className="cp-value-title-bottom" aria-hidden="true">{title}</h4>
        <p className="cp-value-desc">{body}</p>
      </div>
    </article>
  );
}

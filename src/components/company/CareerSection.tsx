import { asset } from './constants';

export default function CareerSection() {
  return (
    <div className="cp-career">
      <img className="cp-bg" src={asset('career-bg.png')} alt="" />
      <div className="cp-bg-overlay" />
      <div className="cp-career-copy">
        <h2>Discover our growth story</h2>
        <p>
          Explore the milestones and achievements that shaped Granules into a trusted name in
          global pharma manufacturing.
        </p>
      </div>
      <a className="cp-cta-btn" href="/#footer">View Milestones</a>
    </div>
  );
}

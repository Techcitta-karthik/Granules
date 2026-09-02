import { Link } from 'react-router-dom';
import { asset } from './constants';

export default function CareerSection() {
  return (
    <div className="cp-career">
      <img className="cp-bg" src={asset('career-bg.png')} alt="" />
      <div className="cp-bg-overlay" />
      <div className="cp-career-copy">
        <h2>Discover our growth story</h2>
        <p>
          Explore the milestones that shaped Granules into a trusted name in global pharma
          manufacturing.
        </p>
      </div>
      <Link className="cp-cta-btn" to="/company/milestone">View Milestones</Link>
    </div>
  );
}

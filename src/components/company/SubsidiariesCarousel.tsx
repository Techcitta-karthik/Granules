import { Link } from 'react-router-dom';

export default function SubsidiariesCarousel() {
  return (
    <section className="cp-subsidiaries" id="subsidiaries" aria-label="Global Subsidiaries">
      <div className="cp-sub-header">
        <h2>Global Subsidiaries</h2>
        <h4>
          Our subsidiaries play a vital role in advancing Granules’ integrated business model across the pharmaceutical value chain. Strategically located, they enhance our ability to deliver affordable, high-quality healthcare solutions while maintaining a reliable and agile global supply chain.
        </h4>
        <div className="cp-sub-cta-wrap">
          <Link to="/company/global-subsidiaries" className="cp-cta-btn">
            EXPLORE GLOBAL SUBSIDIARIES &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

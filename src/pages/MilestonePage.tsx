import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './milestone.css';

const M = '/assets/milestone/';

type MilestoneEntry = { year: string; eyebrow?: string; image: string; caption: string };

const MILESTONES: MilestoneEntry[] = [
  { year: '1984', eyebrow: 'The Beginning', image: 'y1984.png', caption: 'Formed Triton Laboratories to produce Paracetamol API at our Bonthapally facility in Hyderabad.' },
  { year: '1990', image: 'y1990.png', caption: 'Opened Triton’s second manufacturing facility at Jeedimetla to produce multiple APIs' },
  { year: '1991', image: 'y1991.png', caption: 'Incorporated Granules India Private Limited' },
  { year: '1993', image: 'y1993.png', caption: 'Established our first PFI facility at Jeedimetla' },
  { year: '1995', image: 'y1995.png', caption: 'Became a listed company following an IPO at the Hyderabad Stock Exchange.' },
  { year: '2003', image: 'y2003.png', caption: 'Set up a new large volume PFI facility in Gagillapur; Set up wholly owned subsidiary, Granules USA, for marketing in the US.' },
  { year: '2005', image: 'y2005.png', caption: 'Built a new Paracetamol plant in Bonthapally, Hyderabad' },
  { year: '2008', image: 'y2008.png', caption: 'Entered the Finished Dosages segment' },
  { year: '2010', image: 'y2010.png', caption: 'Received US FDA approval for our first Abbreviated New Drug Application (ANDA).' },
  { year: '2013', image: 'y2013.png', caption: 'Established API R&D facility in Pragathi Nagar; Acquired Auctus Pharma – an API manufacturing facility with regulatory approvals.' },
  { year: '2014', image: 'y2014.png', caption: 'Set up a wholly owned subsidiary in the US. Granules Pharmaceuticals began focusing on formulation R&D to forward integrate APIs' },
  { year: '2015', image: 'y2015.png', caption: 'Laid the foundation for our Oncology API and OSD plant and a multiple product API plant in Visakhapatnam.' },
  { year: '2019', image: 'y2019.png', caption: 'Entered the frontend business for the sale of Rx Products in the US under the GPI label.' },
  { year: '2021', image: 'y2021.png', caption: 'Set up the largest single-site manufacturing unit for multi-unit pellet systems at Gagillapur.' },
  { year: '2023', image: 'y2023.png', caption: 'Set up GPAK, a ~80,000 sq. ft. packaging facility with four packaging suites and a warehousing facility; Established new purpose, mission and values.' },
  { year: '2024', image: 'y2024.png', caption: 'Granules Life Sciences (GLS) successfully commenced operations with a planned FD capacity of 10 billion dosages annually; Granules CZRO pilot plant commenced operations.' },
  { year: '2025', image: 'y2025.png', caption: 'Successfully acquired Switzerland’s peptide CDMO firm Senn Chemicals AG; Inaugurated phase-II of GLS expanding dosage capacity to 10bn dosages.' },
  { year: '2026', image: '2026.jpg', caption: 'Expanded innovation capabilities through new R&D centres at IIT Hyderabad dedicated to peptide development and particle engineering' },
];

export default function MilestonePage() {
  useEffect(() => {
    document.title = 'Our Journey — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb">
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <Link to="/company">ABOUT US</Link>
        <span className="sep">›</span>
        <span className="current">OUR JOURNEY</span>
      </p>
      <h1 className="cp-page-title">A Journey of Progress and Purpose</h1>

      <div className="cp-about-desc ms-intro">
        <h4>
          What began as a focused API manufacturer has transformed into a diversified pharmaceutical company with capabilities spanning APIs, PFIs, Finished Dosages, Peptide CDMO services, and global market access. Each milestone represents a step forward in our mission to improve lives through affordable and accessible healthcare.
        </h4>
      </div>

      <div className="ms-systems">
        {MILESTONES.map((entry, index) => {
          const isReverse = index % 2 === 1;
          return (
            <div
              className={`ms-stack-card ms-stack-card--${index}${isReverse ? ' ms-stack-card--reverse' : ''}`}
              key={entry.year}
              style={{
                zIndex: index + 1,
                top: 'clamp(100px, 12vh, 130px)',
              }}
            >
              <div className="ms-card-content">
                {entry.eyebrow && <span className="ms-card-eyebrow">{entry.eyebrow}</span>}
                <div className="ms-card-media">
                  <img src={`${M}${entry.image}`} alt={`Granules milestone ${entry.year}`} />
                </div>
                <p className="ms-card-caption">{entry.caption}</p>
              </div>
              <div className="ms-card-year-wrap">
                <h3 className="ms-card-year">{entry.year}</h3>
              </div>
            </div>
          );
        })}

        <div className="ms-below-stack">
          <div className="ms-leadership">
            <img className="cp-bg" src={`${M}achievements-cta-bg.webp`} alt="" loading="lazy" decoding="async" />
            <div className="cp-bg-overlay" />
            <div className="ms-leadership-copy">
              <Link className="cp-cta-btn" to="/company/leadership">OUR LEADERSHIP &rarr;</Link>
              <h2>Meet the Leadership Shaping our Future</h2>
              <p>
                Discover the team leading Granules with purpose, innovation, and a commitment to
                excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CompanyFooter />
    </div>
  );
}

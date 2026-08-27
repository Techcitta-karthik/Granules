import { useEffect } from 'react';
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
];

function TimelineRow({ entry, index }: { entry: MilestoneEntry; index: number }) {
  const imageOnLeft = index % 2 === 1;
  const yearBlock = (
    <div>
      {entry.eyebrow && <span className="ms-year-eyebrow">{entry.eyebrow}</span>}
      <span className="ms-year">{entry.year}</span>
    </div>
  );
  const imageBlock = (
    <div>
      <div className="ms-image">
        <img src={`${M}${entry.image}`} alt={`Granules milestone ${entry.year}`} />
      </div>
      <p className="ms-caption">{entry.caption}</p>
    </div>
  );
  return (
    <div className={`ms-row${imageOnLeft ? ' ms-row--year-right' : ''}`}>
      {imageOnLeft ? (
        <>
          {imageBlock}
          {yearBlock}
        </>
      ) : (
        <>
          {yearBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

export default function MilestonePage() {
  useEffect(() => {
    document.title = 'Milestone — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Company</span>
        <span className="sep">{'>'}</span>
        <span className="current">Milestone</span>
      </p>
      <h1 className="cp-page-title">Key milestones</h1>
      <div className="cp-hero-banner">
        <img src={`${M}hero-banner.png`} alt="Granules India facility" />
      </div>

      <div className="ms-intro">
        <p>
          Granules India has been redefining pharmaceutical manufacturing since 1984. What began
          as a single facility in Hyderabad has evolved into a global leader in APIs, PFIs, and
          finished dosages, driven by scientific innovation, operational scale, and regulatory
          excellence.
        </p>
        <p>
          From pioneering Pharmaceutical Formulation Intermediates (PFIs) in India to launching
          front-end U.S. operations and investing in ESG-aligned infrastructure, every milestone
          reflects our commitment to quality, access, and strengthening global pharmaceutical
          supply chains.
        </p>
      </div>

      <div className="ms-timeline">
        {MILESTONES.map((entry, index) => (
          <TimelineRow entry={entry} index={index} key={entry.year} />
        ))}
      </div>

      <div className="ms-cta">
        <img className="cp-bg" src={`${M}achievements-cta-bg.png`} alt="" />
        <div className="cp-bg-overlay" />
        <div className="ms-cta-copy">
          <h2>Celebrating our achievements</h2>
          <p>
            From breakthrough innovations to sustainable practices, these accolades highlight our
            pursuit of progress.
          </p>
        </div>
        <a className="cp-cta-btn" href="/company/awards">Awards</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

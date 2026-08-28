import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './leadership.css';

const L = '/assets/leadership/';

type Member = { image: string; name: string; role: string };

const MEMBERS: Member[] = [
  { image: 'krishna-prasad.png', name: 'Dr. Krishna Prasad Chigurupati', role: 'Chairman and Managing Director' },
  { image: 'uma-devi.png', name: 'Mrs. Uma Devi Chigurupati', role: 'Executive Director' },
  { image: 'priyanka.png', name: 'Mrs. Priyanka Chigurupati', role: 'Executive Director' },
  { image: 'harsha.png', name: 'Mr. Harsha Chigurupati', role: 'Executive Director' },
  { image: 'mukesh-surana.png', name: 'Mr. Mukesh Surana', role: 'Chief Financial Officer' },
  { image: 'atul-dhavle.png', name: 'Mr. Atul Dhavle', role: 'Chief Human Resources Officer' },
  { image: 'pv-srinivas.png', name: 'Mr. PV Srinivas', role: 'Chief Technology Officer' },
  { image: 'sanjay-kumar.png', name: 'Mr. Sanjay Kumar', role: 'President & Chief Strategy and Sustainability Officer' },
  { image: 'ramraj-rangarajalu.png', name: 'Mr. Ramraj Rangarajalu', role: 'President and Head - Formulations Operations' },
  { image: 'baskaran-pn.png', name: 'Dr. Baskaran PN', role: 'President & Head - API Operations' },
  { image: 'vijay-raghavan.png', name: 'Dr. Vijay Raghavan', role: 'President, Global Portfolio' },
  { image: 'manikandan-ramalingam.png', name: 'Mr. Manikandan Ramalingam', role: 'Senior Vice President & Head Formulation R&D' },
  { image: 'rajesh-kapoor.png', name: 'Dr. Rajesh Kapoor', role: 'Global Head - Quality' },
];

export default function LeadershipPage() {
  useEffect(() => {
    document.title = 'Leadership Team — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span>Company</span>
        <span className="sep">{'>'}</span>
        <span className="current">Leadership</span>
      </p>

      <div className="ld-hero">
        <h1 className="cp-page-title" style={{ margin: 0, width: 'auto' }}>Leadership team</h1>
        <p>
          Granules India is led by a seasoned executive team with deep pharmaceutical expertise
          and a forward-looking vision. Together, they{' '}
          <span className="muted">
            drive operational excellence, global growth, and sustainable value through strategic
            leadership.
          </span>
        </p>
      </div>

      <div className="ld-tabs">
        <span className="ld-tab-label">Board of Directors</span>
        <span className="ld-tab-label">Management Team</span>
      </div>

      <div className="ld-grid">
        {MEMBERS.map((member) => (
          <article className="ld-card" key={member.name}>
            <div className="ld-photo">
              <img src={`${L}${member.image}`} alt={member.name} />
            </div>
            <div>
              <p className="ld-name">{member.name}</p>
              <p className="ld-role">{member.role}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="ld-cta">
        <img className="cp-bg" src={`${L}cta-bg.png`} alt="" />
        <div className="cp-bg-overlay" />
        <div className="ld-cta-copy">
          <h2>Find your next role at Granules</h2>
          <p>Join us in shaping the future of sustainable healthcare.</p>
        </div>
        <a className="cp-cta-btn" href="/#careers">Careers</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

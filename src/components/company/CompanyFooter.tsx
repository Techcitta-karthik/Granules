import { Link } from 'react-router-dom';

const ABOUT_LINKS = [
  { label: 'Company', href: '/company' },
  { label: 'Vision & Mission', href: '/company#vision' },
  { label: 'Leadership', href: '/company/leadership' },
  { label: 'Milestone', href: '/company/milestone' },
  { label: 'Group Companies', href: '/company#subsidiaries' },
];

const SOLUTIONS_LINKS = [
  { label: 'Products', href: '/business/api' },
  { label: 'Manufacturing', href: '/company/facilities' },
  { label: 'Quality', href: '/business/quality-compliance' },
  { label: 'R&D', href: '/business/rd' },
  { label: 'Facilities', href: '/company/facilities' },
];

const IMPACT_LINKS = [
  { label: 'IMPACT', href: '/sustainability' },
  { label: 'INVESTORS', href: '/investor' },
  { label: 'NEWSROOM', href: '/media' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'CONNECT', href: '/contact' },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: '/assets/facebook.svg', href: 'https://www.facebook.com/share/1BSgd7PiTC/?mibextid=wwXIfr' },
  { name: 'Instagram', icon: '/assets/instagram.svg', href: 'https://instagram.com' },
  { name: 'X', icon: '/assets/x.svg', href: 'https://x.com/GranulesIndia' },
  { name: 'LinkedIn', icon: '/assets/linkedin.svg', href: 'https://www.linkedin.com/company/granules-india-limited/' },
  { name: 'YouTube', icon: '/assets/youtube.svg', href: 'https://www.youtube.com/@Granules-IndiaLimited/featured' },
];

export default function CompanyFooter() {
  return (
    <footer className="cp-footer" id="footer">
      <div className="cp-footer-bg-wrap">
        <img className="cp-bg" src="/assets/footer-bg.webp" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="cp-footer-inner">
        <div className="cp-footer-top">
          <div className="cp-footer-brand">
            <Link to="/" className="cp-footer-logo-badge" aria-label="Granules Homepage">
              <img src="/assets/footer-logo.webp" alt="Granules" loading="eager" decoding="async" />
            </Link>
            <p>
              Granules India, headquartered in Hyderabad, is a vertically integrated pharma
              manufacturer delivering APIs, PFIs, FDs and peptides/CDMO globally with
              regulatory-compliant operations in India, U.S. and Europe, ensuring quality, scale,
              and sustainability.
            </p>
          </div>

          <div className="cp-footer-cols">
            <div className="cp-footer-col">
              <h5>ABOUT</h5>
              <div className="cp-footer-link-group">
                {ABOUT_LINKS.map((link) => (
                  <Link to={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="cp-footer-col">
              <h5>SOLUTIONS &amp; R&amp;D</h5>
              <div className="cp-footer-link-group">
                {SOLUTIONS_LINKS.map((link) => (
                  <Link to={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="cp-footer-col cp-footer-impact">
              <div className="cp-footer-link-group">
                {IMPACT_LINKS.map((link) => (
                  <Link to={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="cp-footer-divider" />

        <div className="cp-footer-bottom">
          <div className="cp-footer-legal">
            <span className="cp-legal-copy">COPYRIGHT © 2025 GRANULES. ALL RIGHTS RESERVED.</span>
            <Link to="/privacy-policy">PRIVACY POLICY</Link>
            <Link to="/cookies-policy">COOKIES POLICY</Link>
            <Link to="/disclaimer">DISCLAIMER</Link>
            <Link to="/data-protection-notice">DATA PROTECTION NOTICE</Link>
            <Link to="/terms-conditions">TERMS &amp; CONDITION</Link>
          </div>

          <div className="cp-footer-socials">
            {SOCIAL_LINKS.map((item) => (
              <a
                href={item.href}
                key={item.name}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
              >
                <img src={item.icon} alt={item.name} loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

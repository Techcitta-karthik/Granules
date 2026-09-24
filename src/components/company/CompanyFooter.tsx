import { Link } from 'react-router-dom';

const ABOUT_LINKS = [
  { label: 'Overview', href: '/company' },
  { label: 'Our Journey', href: '/company/milestone' },
  { label: 'Leadership', href: '/company/leadership' },
  { label: 'Global Subsidiaries', href: '/company/global-subsidiaries' },
];

const SOLUTIONS_LINKS = [
  { label: 'Generics', href: '/business/generics' },
  { label: 'Peptide CDMO', href: '/business/peptides' },
  { label: 'R&D', href: '/business/rd' },
  { label: 'Quality & Compliance', href: '/business/quality-compliance' },
  { label: 'Facilities', href: '/business/facilities' },
];

const IMPACT_LINKS = [
  { label: 'Investors', href: '/investor' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Community', href: '/community' },
  { label: 'Media', href: '/media' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },

];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: '/assets/linkedin.svg', href: 'https://www.linkedin.com/company/granules-india-limited/' },
  { name: 'Instagram', icon: '/assets/instagram.svg', href: 'https://www.instagram.com/granulesindialimited_official/followers/' },
  { name: 'X', icon: '/assets/x.svg', href: 'https://x.com/GranulesIndia' },
  { name: 'Facebook', icon: '/assets/facebook.svg', href: 'https://www.facebook.com/share/1BSgd7PiTC/?mibextid=wwXIfr' },
  { name: 'YouTube', icon: '/assets/youtube.svg', href: 'https://www.youtube.com/@Granules-IndiaLimited/featured' },
];

export default function CompanyFooter() {
  return (
    <footer className="cp-footer" id="footer">
      <div className="cp-footer-inner">
        <div className="cp-footer-top">
          <div className="cp-footer-brand">
            <Link to="/" className="cp-footer-logo-badge" aria-label="Granules Homepage">
              <img src="/assets/footer-logo.webp" alt="Granules" loading="eager" decoding="async" />
            </Link>
            <span style={{ fontSize: '14px' }}>
              Granules India Limited, headquartered in Hyderabad, India, is a vertically integrated pharma company delivering healthcare solutions across the value chain globally with regulatory-compliant operations in India, U.S. and Europe, ensuring quality, scale, and sustainability.
            </span>
          </div>

          <div className="cp-footer-cols">
            <div className="cp-footer-col">
              <h5>About Us</h5>
              <div className="cp-footer-link-group">
                {ABOUT_LINKS.map((link) =>
                  link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      key={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} key={link.label}>
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="cp-footer-col">
              <h5>Business</h5>
              <div className="cp-footer-link-group">
                {SOLUTIONS_LINKS.map((link) => (
                  <Link to={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="cp-footer-col">
              <h5>Quick Links</h5>
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
            <span className="cp-legal-copy">Copyright © 2026 Granules. All rights reserved.</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/cookies-policy">Cookies Policy</Link>
            <Link to="/disclaimer">Disclaimer</Link>
            <Link to="/data-protection-notice">Data Protection Notice</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
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

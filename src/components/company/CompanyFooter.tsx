import { Link } from 'react-router-dom';

const PRODUCT_LINKS = [
  { label: 'Active Pharmaceutical Ingredients', href: '/business/api' },
  { label: 'Pharmaceutical Formulation Intermediates', href: '/business/pfi' },
  { label: 'Finished Dosages', href: '/business/fd' },
  { label: 'Peptides', href: '/business/peptides' },
];

const COMPANY_LINKS = [
  { label: 'ABOUT US', href: '/company' },
  { label: 'SUSTAINABILITY', href: '/sustainability' },
  { label: 'INVESTORS', href: '/investor' },
  { label: 'MEDIA', href: '/media' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'CONTACT US', href: '/contact' },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: '/assets/facebook.svg', href: 'https://facebook.com' },
  { name: 'Instagram', icon: '/assets/instagram.svg', href: 'https://instagram.com' },
  { name: 'X', icon: '/assets/x.svg', href: 'https://x.com' },
  { name: 'LinkedIn', icon: '/assets/linkedin.svg', href: 'https://linkedin.com' },
  { name: 'YouTube', icon: '/assets/youtube.svg', href: 'https://youtube.com' },
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
              manufacturer delivering APIs, PFIs, and FDs globally with regulatory-compliant
              operations in India, US and Europe ensuring quality, scale, and sustainability.
            </p>
          </div>

          <div className="cp-footer-cols">
            <div className="cp-footer-col">
              <h5>PRODUCTS</h5>
              <div className="cp-footer-link-group">
                {PRODUCT_LINKS.map((link) => (
                  <Link to={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="cp-footer-col cp-footer-impact">
              <div className="cp-footer-link-group">
                {COMPANY_LINKS.map((link) => (
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
            <Link to="/#footer">PRIVACY POLICY</Link>
            <Link to="/#footer">COOKIES POLICY</Link>
            <Link to="/#footer">DISCLAIMER</Link>
            <Link to="/#footer">DATA PROTECTION NOTICE</Link>
            <Link to="/#footer">TERMS &amp; CONDITION</Link>
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

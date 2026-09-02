import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './contact.css';

const A = '/assets/contact/';

type TabKey = 'key-contacts' | 'business-contacts' | 'investor-contacts';

type TabData = {
  title: string;
  address: string;
  cin?: string;
  phone1: string;
  phone2?: string;
  email: string;
};

// Only the two tabs that map to a simple address / phone / email block use
// TAB_DATA. "investor-contacts" has its own richer layout below.
const TAB_DATA: Record<'key-contacts' | 'business-contacts', TabData> = {
  'key-contacts': {
    title: 'Corporate Office Address',
    address: '15th Floor, Granules Tower, Botanical Garden Road, Kondapur, Hyderabad – 500084, Telangana, India.',
    cin: 'CIN: L24110TG1991PLC012471',
    phone1: '+91 40 69043500',
    phone2: '+91 40 23115145',
    email: 'mail@granulesindia.com',
  },
  'business-contacts': {
    title: 'Business Enquiries',
    address: '15th Floor, Granules Tower, Botanical Garden Road, Kondapur, Hyderabad – 500084, Telangana, India.',
    phone1: '+91 40 69043500',
    email: 'sales@granulesindia.com',
  },
};

const SUBJECT_OPTIONS = [
  'API',
  'PFI',
  'Formulation Development',
  'Research & Development',
  'Business Development',
  'Drugs Safety — For Reporting Adverse Effects',
  'Product Queries',
  'Careers',
  'Others',
];

function toTelHref(value: string) {
  return value.replace(/[^0-9+]/g, '');
}

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

/* -------- Small inline icon helpers (kept in the same style as the rest of the page) -------- */

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LinkPillIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const PhoneInputIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('key-contacts');
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    email: '',
    contactNumber: '',
    subject: '',
    message: '',
  });
  const [messageLength, setMessageLength] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 1000) {
      setFormData((prev) => ({ ...prev, message: val }));
      setMessageLength(val.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const captchaCorrect = parseInt(captchaInput, 10) === captcha.answer;

    // Regenerate the captcha challenge after every submit attempt.
    setCaptcha(generateCaptcha());
    setCaptchaInput('');

    if (!captchaCorrect) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ fullName: '', designation: '', email: '', contactNumber: '', subject: '', message: '' });
      setMessageLength(0);
      setSubmitted(false);
    }, 4000);
  };

  const isInvestorTab = activeTab === 'investor-contacts';
  const currentTabInfo = !isInvestorTab ? TAB_DATA[activeTab as 'key-contacts' | 'business-contacts'] : null;

  return (
    <div className="cp ct-page-wrap">
      <NavBar />

      <main className="ct-main-content">
        {/* Top Hero + Floating Form Section */}
        <section className="ct-hero-form-section">
          {/* Background image & Left Side Intro Copy */}
          <div className="ct-hero-bg-container">
            <img src={`${A}hero-photo.png`} alt="Granules India team" className="ct-hero-bg-img" />

            <div className="ct-hero-text-overlay">
              <h1 className="ct-hero-heading">Let’s connect</h1>
              <p className="ct-hero-desc">
                We’re here to help and answer any questions you may have.
              </p>
              <div className="ct-hero-underline" />
            </div>
          </div>

          {/* Right Floating Form Card */}
          <div className="ct-form-floating-card">
            <h2 className="ct-form-card-title">Send us a message</h2>

            {submitted ? (
              <div className="ct-form-success-box">
                <div className="ct-form-success-icon">✓</div>
                <div>
                  <h4>Message Sent Successfully</h4>
                  <p>Thank you for reaching out. Our team will contact you shortly.</p>
                </div>
              </div>
            ) : (
              <form className="ct-card-form" onSubmit={handleSubmit}>
                <div className="ct-form-grid-row">
                  {/* Your Name */}
                  <div className="ct-form-input-box">
                    <span className="ct-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      aria-label="Your Name (required)"
                    />
                  </div>

                  {/* Designation */}
                  <div className="ct-form-input-box">
                    <span className="ct-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Designation *"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      aria-label="Designation (required)"
                    />
                  </div>
                </div>

                <div className="ct-form-grid-row">
                  {/* Email address */}
                  <div className="ct-form-input-box">
                    <span className="ct-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Email address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      aria-label="Email Address (required)"
                    />
                  </div>

                  {/* Contact Number (optional) */}
                  <div className="ct-form-input-box">
                    <span className="ct-input-icon">
                      <PhoneInputIcon />
                    </span>
                    <input
                      type="tel"
                      placeholder="Contact number (optional)"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      aria-label="Contact Number (optional)"
                    />
                  </div>
                </div>

                {/* Choose subject */}
                <div className="ct-form-input-box select-box">
                  <span className="ct-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    aria-label="Choose subject (required)"
                  >
                    <option value="" disabled>Choose subject *</option>
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="ct-select-chevron">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>

                {/* Message Textarea */}
                <div className="ct-form-textarea-box">
                  <span className="ct-textarea-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </span>
                  <textarea
                    required
                    placeholder="Write your message here... *"
                    rows={4}
                    value={formData.message}
                    onChange={handleMessageChange}
                    aria-label="Your Message (required)"
                  />
                  <span className="ct-char-count">{messageLength} / 1000</span>
                </div>

                {/* Captcha */}
                <div className="ct-form-grid-row ct-captcha-grid-row">
                  <div className="ct-captcha-prompt">
                    <span className="ct-input-icon">
                      <ShieldIcon />
                    </span>
                    <span>
                      What is {captcha.a} + {captcha.b}? <span className="ct-required-mark">*</span>
                    </span>
                  </div>
                  <div className="ct-form-input-box">
                    <span className="ct-input-icon">
                      <LockIcon />
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      placeholder="Your answer"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError(false);
                      }}
                      aria-label={`Captcha: what is ${captcha.a} plus ${captcha.b}? (required)`}
                    />
                  </div>
                </div>
                {captchaError && (
                  <p className="ct-captcha-error" role="alert">
                    Incorrect captcha answer. Please try again.
                  </p>
                )}

                {/* Submit Button */}
                <div className="ct-form-btn-row">
                  <button type="submit" className="ct-submit-pill-btn">
                    <span>SEND MESSAGE</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Bottom Details Section matching Reference Image */}
        <section className="ct-bottom-unified-card">
          {/* Tabs Header */}
          <div className="ct-bottom-tabs-header">
            <button
              type="button"
              className={`ct-bottom-tab ${activeTab === 'key-contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('key-contacts')}
            >
              KEY CONTACTS
            </button>
            <button
              type="button"
              className={`ct-bottom-tab ${activeTab === 'business-contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('business-contacts')}
            >
              BUSINESS CONTACTS
            </button>
            <button
              type="button"
              className={`ct-bottom-tab ${activeTab === 'investor-contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('investor-contacts')}
            >
              INVESTOR RELATION CONTACT
            </button>
          </div>

          {/* Block 1: Active Tab Content */}
          {isInvestorTab ? (
            <div className="ct-investor-tab-content">
              <div className="ct-investor-subsection">
                <a
                  href="https://granulesindia.com/investors/investor-relation-contact/#tab-1-1-content"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-action-pill"
                >
                  <span className="ct-pill-icon"><LinkPillIcon /></span>
                  <span>Investor Relations Contact</span>
                </a>
              </div>

              <hr className="ct-section-divider" />

              <div className="ct-investor-subsection">
                <h4 className="ct-investor-subheading">Institutional Investors &amp; Financial Analysts</h4>
                <div className="ct-action-pills-row">
                  <a href={`tel:${toTelHref('+040-69043500')}`} className="ct-action-pill">
                    <span className="ct-pill-icon"><PhoneIcon /></span>
                    <span>+040-69043500</span>
                  </a>
                  <a href="mailto:investorrelations@granulesindia.com" className="ct-action-pill">
                    <span className="ct-pill-icon"><MailIcon /></span>
                    <span>investorrelations@granulesindia.com</span>
                  </a>
                  <a href="mailto:irfan.raeen@linkintime.co.in" className="ct-action-pill">
                    <span className="ct-pill-icon"><MailIcon /></span>
                    <span>irfan.raeen@linkintime.co.in</span>
                  </a>
                </div>
              </div>

              <hr className="ct-section-divider" />

              <div className="ct-investor-subsection">
                <h4 className="ct-investor-subheading">Registrar and Transfer Agent</h4>
                <div className="ct-address-text-block">
                  <p className="ct-address-line"><strong>M/s. KFin Technologies Limited</strong></p>
                  <p className="ct-address-line">
                    Selenium Tower B, Plot 31-32, Gachibowli, Financial District, Nanakramguda, Hyderabad – 500 032.
                  </p>
                </div>
                <div className="ct-action-pills-row">
                  <a href={`tel:${toTelHref('1-800-309-4001')}`} className="ct-action-pill">
                    <span className="ct-pill-icon"><PhoneIcon /></span>
                    <span>Toll Free: 1-800-309-4001</span>
                  </a>
                  <a href="mailto:einward.ris@kfintech.com" className="ct-action-pill">
                    <span className="ct-pill-icon"><MailIcon /></span>
                    <span>Investor Grievance: einward.ris@kfintech.com</span>
                  </a>
                  <a href="https://www.kfintech.com/" target="_blank" rel="noopener noreferrer" className="ct-action-pill">
                    <span className="ct-pill-icon"><LinkPillIcon /></span>
                    <span>www.kfintech.com</span>
                  </a>
                </div>
              </div>

              <hr className="ct-section-divider" />

              <div className="ct-investor-subsection">
                <h4 className="ct-investor-subheading">Retail Investors and Grievance</h4>
                <div className="ct-address-text-block">
                  <p className="ct-address-line">
                    <strong>Ms. Chaitanya Tummala</strong><br />
                    Company Secretary, Compliance Officer and Nodal Officer<br />
                    Granules India Limited
                  </p>
                  <p className="ct-address-line">
                    15th Floor, Granules Tower, Botanical Garden Road, Kondapur, Hyderabad – 500084, Telangana, India.
                  </p>
                </div>
                <div className="ct-action-pills-row">
                  <a href={`tel:${toTelHref('+91 40 69043500')}`} className="ct-action-pill">
                    <span className="ct-pill-icon"><PhoneIcon /></span>
                    <span>+91 40 69043500</span>
                  </a>
                  <a href={`tel:${toTelHref('+91 40 23115145')}`} className="ct-action-pill">
                    <span className="ct-pill-icon"><PhoneIcon /></span>
                    <span>Fax: +91 40 23115145</span>
                  </a>
                  <a href="mailto:chaitanya.tummala@granulesindia.com" className="ct-action-pill">
                    <span className="ct-pill-icon"><MailIcon /></span>
                    <span>chaitanya.tummala@granulesindia.com</span>
                  </a>
                </div>
                <a href="mailto:investorrelations@granulesindia.com" className="ct-action-pill">
                  <span className="ct-pill-icon"><MailIcon /></span>
                  <span>Write to us at: investorrelations@granulesindia.com</span>
                </a>
              </div>
            </div>
          ) : (
            currentTabInfo && (
              <div className="ct-stacked-block">
                <div className="ct-address-text-block">
                  <p className="ct-address-line">{currentTabInfo.address}</p>
                  {currentTabInfo.cin && <p className="ct-address-cin">{currentTabInfo.cin}</p>}
                </div>

                <div className="ct-action-pills-row">
                  <a href={`tel:${toTelHref(currentTabInfo.phone1)}`} className="ct-action-pill">
                    <span className="ct-pill-icon"><PhoneIcon /></span>
                    <span>{currentTabInfo.phone1}</span>
                  </a>

                  {currentTabInfo.phone2 && (
                    <a href={`tel:${toTelHref(currentTabInfo.phone2)}`} className="ct-action-pill">
                      <span className="ct-pill-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                          <line x1="6" y1="6" x2="6.01" y2="6" />
                          <line x1="6" y1="18" x2="6.01" y2="18" />
                        </svg>
                      </span>
                      <span>Fax: {currentTabInfo.phone2}</span>
                    </a>
                  )}

                  <a href={`mailto:${currentTabInfo.email}`} className="ct-action-pill">
                    <span className="ct-pill-icon"><MailIcon /></span>
                    <span>{currentTabInfo.email}</span>
                  </a>
                </div>
              </div>
            )
          )}

          <hr className="ct-section-divider" />

          {/* Block 2: Business Enquiries */}
          <div className="ct-stacked-block">
            <h3 className="ct-stacked-heading">Business Enquiries</h3>
            <a href="mailto:sales@granulesindia.com" className="ct-action-pill">
              sales@granulesindia.com
            </a>
          </div>

          <hr className="ct-section-divider" />

          {/* Block 3: General Enquiries */}
          <div className="ct-stacked-block">
            <h3 className="ct-stacked-heading">General Enquiries</h3>
            <a href="mailto:mail@granulesindia.com" className="ct-action-pill">
              mail@granulesindia.com
            </a>
          </div>

          <hr className="ct-section-divider" />

          {/* Block 4: Media Enquiries */}
          <div className="ct-stacked-block">
            <h3 className="ct-stacked-heading">Media Enquiries</h3>
            <a href="mailto:Priyanka.Chawla@granulesindia.com" className="ct-action-pill">
              Priyanka.Chawla@granulesindia.com
            </a>
          </div>
        </section>

        {/* Adverse Event Reporting Card matching Reference Image */}
        <section className="ct-adverse-section">
          <div className="ct-adverse-card">
            <h3 className="ct-adverse-title">For Adverse Event Reporting</h3>
            <p className="ct-adverse-desc">
              To report an adverse experience with a specific Granules drug product, please call or mail Granules Pharmacovigilance Team
            </p>
            <div className="ct-adverse-pills-row">
              <a href="tel:18777703183" className="ct-adverse-pill">
                1-877-770-3183
              </a>
              <a href="mailto:drugs.safety@granulesindia.com" className="ct-adverse-pill">
                drugs.safety@granulesindia.com
              </a>
            </div>
          </div>
        </section>

        {/* Follow Us Section with Horizontal Top Divider & Solid Blue Circular Buttons */}
        <section className="ct-follow-us-section">
          <h2 className="ct-follow-us-heading">
            Follow us for updates<br />and company news
          </h2>
          <div className="ct-follow-circles-list">
            <a
              href="https://www.linkedin.com/company/granules-india-limited"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-follow-circle-btn"
              aria-label="LinkedIn"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            <a
              href="https://twitter.com/Granules_India"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-follow-circle-btn"
              aria-label="X (Twitter)"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a
              href="https://www.facebook.com/GranulesIndiaLtd"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-follow-circle-btn"
              aria-label="Facebook"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/granulesindia"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-follow-circle-btn"
              aria-label="Instagram"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </section>
      </main>

      <CompanyFooter />
    </div>
  );
}

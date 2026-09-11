import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './contact.css';

const A = '/assets/contact/';

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

function toTelHref(v: string) { return v.replace(/[^0-9+]/g, ''); }
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'corporate' | 'enquiries' | 'investor'>('corporate');
  const [form, setForm] = useState({ fullName: '', designation: '', email: '', contactNumber: '', subject: '', message: '' });
  const [msgLen, setMsgLen] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const handleMsg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 1000) {
      setForm(p => ({ ...p, message: e.target.value }));
      setMsgLen(e.target.value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = parseInt(captchaInput, 10) === captcha.answer;
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    if (!ok) { setCaptchaError(true); return; }
    setCaptchaError(false);
    setSubmitted(true);
    setTimeout(() => {
      setForm({ fullName: '', designation: '', email: '', contactNumber: '', subject: '', message: '' });
      setMsgLen(0);
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="cp ct-page">
      <NavBar />

      {/* ═══════════════════════════════════════════════
          ABOVE THE FOLD — Hero + Floating Form Card
      ═══════════════════════════════════════════════ */}
      <section className="ct-hero-wrap">
        {/* photo + overlay */}
        <div className="ct-hero-photo">
          <div className="ct-hero-veil" />
        </div>

        {/* content row */}
        <div className="ct-hero-inner">

          {/* left — brand copy */}
          <div className="ct-hero-copy">
            <span className="ct-label">Contact Us</span>
            <h1 className="ct-hero-h1">We're here<br />to help.</h1>
            <p className="ct-hero-p">
              Reach our teams for business enquiries, investor relations,
              regulatory support, media, or pharmacovigilance.
            </p>
            {/* Key contacts — scannable */}
            <ul className="ct-contact-list" aria-label="Key contact details">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <a href={`tel:${toTelHref('+91 40 69043500')}`}>+91 40 69043500</a>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <a href="mailto:mail@granulesindia.com">mail@granulesindia.com</a>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>15th Floor, Granules Tower, Kondapur, Hyderabad – 500084</span>
              </li>
            </ul>
          </div>

          {/* right — contact form card */}
          <div className="ct-form-card" role="region" aria-label="Send us a message">

            {submitted ? (
              <div className="ct-success" role="status">
                <span className="ct-success-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <div>
                  <strong>Message sent successfully</strong>
                  <p>Thank you — our team will be in touch shortly.</p>
                </div>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit} noValidate>

                <div className="ct-form-row">
                  <input
                    type="text" required
                    className="ct-field" placeholder="Full Name"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    aria-label="Full Name (required)"
                  />
                  <input
                    type="text" required
                    className="ct-field" placeholder="Designation"
                    value={form.designation}
                    onChange={e => setForm({ ...form, designation: e.target.value })}
                    aria-label="Designation (required)"
                  />
                </div>

                <div className="ct-form-row">
                  <input
                    type="email" required
                    className="ct-field" placeholder="Email address"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    aria-label="Email address (required)"
                  />
                  <input
                    type="text" required
                    className="ct-field" placeholder="Choose subject"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    aria-label="Subject (required)"
                  />
                </div>

                <div className="ct-textarea-wrap">
                  <textarea
                    required rows={5}
                    className="ct-field ct-textarea"
                    placeholder="Write your message here."
                    value={form.message}
                    onChange={handleMsg}
                    aria-label="Message (required)"
                  />
                </div>

                <button type="submit" className="ct-submit-btn">
                  SEND MESSAGE
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT INFO TABS
      ═══════════════════════════════════════════ */}
      <section className="ct-info-section cp-shell">

        {/* Tab strip — KEY CONTACTS / BUSINESS CONTACTS / INVESTOR RELATION CONTACT */}
        <div className="ct-tabs" role="tablist" aria-label="Contact sections">
          <button role="tab" type="button"
            aria-selected={activeTab === 'corporate'}
            className={`ct-tab${activeTab === 'corporate' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('corporate')}>
            KEY CONTACTS
          </button>
          <button role="tab" type="button"
            aria-selected={activeTab === 'enquiries'}
            className={`ct-tab${activeTab === 'enquiries' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('enquiries')}>
            BUSINESS CONTACTS
          </button>
          <button role="tab" type="button"
            aria-selected={activeTab === 'investor'}
            className={`ct-tab${activeTab === 'investor' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('investor')}>
            INVESTOR RELATION CONTACT
          </button>
        </div>

        {/* Panel content */}
        <div className="ct-panel" role="tabpanel">

          {/* KEY CONTACTS */}
          {activeTab === 'corporate' && (
            <div className="ct-panel-body">
              <h2 className="ct-panel-heading">Corporate Office Address</h2>
              <h4 className="ct-panel-addr">
                15th Floor, Granules Tower, Botanical Garden Road, Kondapur,<br />
                Hyderabad – 500084, Telangana, India.
              </h4>
              <p className="ct-panel-cin">CIN: L24110TG1991PLC012471</p>
              <div className="ct-contact-chips">
                <a href={`tel:${toTelHref('+91 40 69043500')}`} className="ct-contact-chip">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  +91 40 69043500
                </a>
                <a href={`tel:${toTelHref('+91 40 23115145')}`} className="ct-contact-chip">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 22 11 16 5 5 5 5 17" /><rect x="2" y="17" width="20" height="5" rx="1" /><rect x="16" y="5" width="6" height="6" /></svg>
                  +91 40 23115145
                </a>
                <a href="mailto:mail@granulesindia.com" className="ct-contact-chip">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  mail@granulesindia.com
                </a>
              </div>
            </div>
          )}

          {/* BUSINESS CONTACTS — divided sub-sections like reference */}
          {activeTab === 'enquiries' && (
            <div className="ct-panel-body">

              <div className="ct-subsection">
                <h3 className="ct-sub-heading">General Enquiries</h3>
                <div className="ct-contact-chips">
                  <a href="mailto:mail@granulesindia.com" className="ct-contact-chip ct-contact-chip--email">
                    mail@granulesindia.com
                  </a>
                </div>
              </div>

              <hr className="ct-divider" />

              <div className="ct-subsection">
                <h3 className="ct-sub-heading">Business Enquiries</h3>
                <div className="ct-contact-chips">
                  <a href="mailto:sales@granulesindia.com" className="ct-contact-chip ct-contact-chip--email">
                    sales@granulesindia.com
                  </a>
                </div>
              </div>

              <hr className="ct-divider" />

              <div className="ct-subsection">
                <h3 className="ct-sub-heading">Media Enquiries</h3>
                <div className="ct-contact-chips">
                  <a href="mailto:Priyanka.Chawla@granulesindia.com" className="ct-contact-chip ct-contact-chip--email">
                    Priyanka.Chawla@granulesindia.com
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* INVESTOR RELATION CONTACT — divided sub-sections */}
          {activeTab === 'investor' && (
            <div className="ct-panel-body">

              <div className="ct-subsection">
                <h3 className="ct-sub-heading">Investor Relations</h3>
                <div className="ct-contact-chips">
                  <a href={`tel:${toTelHref('+040-69043500')}`} className="ct-contact-chip ct-contact-chip--phone">
                    +040-69043500
                  </a>
                  <a href="mailto:investorrelations@granulesindia.com" className="ct-contact-chip ct-contact-chip--email">
                    investorrelations@granulesindia.com
                  </a>
                </div>
              </div>

              <hr className="ct-divider" />

              <div className="ct-subsection">
                <h3 className="ct-sub-heading">Retail Investors &amp; Grievance</h3>
                <p className="ct-sub-desc">Ms. Chaitanya Tummala — Company Secretary &amp; Nodal Officer</p>
                <div className="ct-contact-chips">
                  <a href="mailto:chaitanya.tummala@granulesindia.com" className="ct-contact-chip ct-contact-chip--email">
                    chaitanya.tummala@granulesindia.com
                  </a>
                </div>
              </div>

              <hr className="ct-divider" />

              <div className="ct-subsection">
                <h3 className="ct-sub-heading">Registrar — KFin Technologies</h3>
                <p className="ct-sub-desc">Selenium Tower B, Gachibowli, Financial District, Hyderabad – 500 032.</p>
                <div className="ct-contact-chips">
                  <a href="tel:18003094001" className="ct-contact-chip ct-contact-chip--phone">
                    1-800-309-4001 (Toll Free)
                  </a>
                  <a href="mailto:einward.ris@kfintech.com" className="ct-contact-chip ct-contact-chip--email">
                    einward.ris@kfintech.com
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          ADVERSE EVENT REPORTING  — white card style
      ═══════════════════════════════════════════════ */}
      <section className="ct-adverse-section cp-shell">
        <div className="ct-adverse-card">
          <a href="mailto:drugs.safety@granulesindia.com" className="ct-adverse-title-link">For Adverse Event Reporting</a>
          <h4 className="ct-adverse-p">
            To report an adverse experience with a specific Granules drug product,
            please call or mail Granules Pharmacovigilance Team
          </h4>
          <div className="ct-adverse-pills">
            <a href="tel:18777703183" className="ct-adverse-contact-pill">1-877-770-3183</a>
            <a href="mailto:drugs.safety@granulesindia.com" className="ct-adverse-contact-pill">drugs.safety@granulesindia.com</a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOLLOW US  — solid blue circles
      ═══════════════════════════════════════════════ */}
      <section className="ct-social-section cp-shell">
        <div className="ct-social-inner">
          <h2 className="ct-social-h2">Follow us for updates<br />and company news</h2>
          <div className="ct-social-icons">
            <a href="https://www.linkedin.com/company/granules-india-limited" target="_blank" rel="noopener noreferrer" className="ct-sicon" aria-label="LinkedIn">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            </a>
            <a href="https://x.com/GranulesIndia" target="_blank" rel="noopener noreferrer" className="ct-sicon" aria-label="X">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://www.facebook.com/share/1BSgd7PiTC/" target="_blank" rel="noopener noreferrer" className="ct-sicon" aria-label="Facebook">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
            </a>
            <a href="https://www.instagram.com/granulesindialimited_official/" target="_blank" rel="noopener noreferrer" className="ct-sicon" aria-label="Instagram">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://www.youtube.com/@Granules-IndiaLimited/featured" target="_blank" rel="noopener noreferrer" className="ct-sicon" aria-label="YouTube">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C21.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
          </div>
        </div>
      </section>

      <CompanyFooter />
    </div>
  );
}

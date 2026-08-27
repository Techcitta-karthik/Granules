import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './contact.css';

const A = '/assets/contact/';
const M = '/assets/media/';

type AccordionItem = { label: string; email?: string };

const TABS: { label: string; items: AccordionItem[] }[] = [
  {
    label: 'Our Key Markets Contact',
    items: [
      { label: 'India', email: 'khaleel.shaik@granulesindia.com' },
      { label: 'North America & Canada' },
      { label: 'Latin America' },
      { label: 'Asia, Middle East and Africa (AMEA)' },
      { label: 'Gulf Cooperation Council (GCC)' },
      { label: 'Europe' },
    ],
  },
  {
    label: 'Departmental Contacts',
    items: [
      { label: 'For Media Enquiries', email: 'Priyanka.Chawla@granulesindia.com' },
      { label: 'For General Enquiries' },
    ],
  },
  {
    label: 'Investor Relation Contact',
    items: [
      { label: 'Institutional Investor & Financial Analysts' },
      { label: 'Registrar and Transfer Agent' },
      { label: 'Retail Investors and Grievance' },
    ],
  },
];

const SOCIALS = [
  { icon: 'social-linkedin.svg', label: 'LinkedIn' },
  { icon: 'social-x.svg', label: 'X' },
  { icon: 'social-facebook.svg', label: 'Facebook' },
  { icon: 'social-instagram.svg', label: 'Instagram' },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    document.title = 'Contact Us — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const selectTab = (index: number) => {
    setActiveTab(index);
    setExpanded(0);
  };

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: 'min(1463px, 100% - 3.2rem)', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <span>Homepage</span>
        <span className="sep">{'>'}</span>
        <span className="current">Contact</span>
      </p>
      <h1 className="cp-page-title">Contact us</h1>

      <div className="ct-hero">
        <img src={`${A}hero-photo.png`} alt="Granules India team members reviewing work on a tablet" />
        <div className="overlay" />
      </div>

      <div className="ct-form-wrap">
        <form className="ct-form" onSubmit={(e) => e.preventDefault()}>
          <div className="ct-form-row">
            <input className="ct-form-field" placeholder="Full Name" aria-label="Full Name" />
            <input className="ct-form-field" placeholder="Designation" aria-label="Designation" />
          </div>
          <div className="ct-form-row">
            <input className="ct-form-field" placeholder="Email address" type="email" aria-label="Email address" />
            <input className="ct-form-field" placeholder="Choose subject" aria-label="Choose subject" />
          </div>
          <textarea className="ct-form-message" placeholder="Write Your Message Here.." aria-label="Message" />
          <button className="ct-form-submit" type="submit">Send Message</button>
        </form>
      </div>

      <div className="ct-details">
        <div className="ct-tabs" style={{ ['--tab-offset' as string]: `${activeTab * 33.33}%` }}>
          {TABS.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              className={`ct-tab${index === activeTab ? ' active' : ''}`}
              onClick={() => selectTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ct-accordion">
          {TABS[activeTab].items.map((item, index) => {
            const isExpanded = index === expanded;
            return (
              <button
                key={item.label}
                type="button"
                className={`ct-accordion-item${isExpanded ? ' expanded' : ''}`}
                onClick={() => setExpanded(isExpanded ? -1 : index)}
              >
                <div className="ct-accordion-head">
                  <p className="ct-accordion-title">{item.label}</p>
                  <img
                    className="ct-accordion-toggle"
                    src={`${A}${isExpanded ? 'icon-minus.svg' : 'icon-plus-outline.svg'}`}
                    alt=""
                  />
                </div>
                {isExpanded && item.email && (
                  <div className="ct-accordion-body">
                    <div className="ct-accordion-email-card">
                      <a href={`mailto:${item.email}`} onClick={(e) => e.stopPropagation()}>{item.email}</a>
                      <img src={`${A}icon-plus-small.svg`} alt="" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="ct-follow">
        <h2>Follow us for updates and company news</h2>
        <div className="ct-follow-icons">
          {SOCIALS.map((social) => (
            <a className="ct-follow-icon" href="/#footer" key={social.label} aria-label={social.label}>
              <img src={`${M}${social.icon}`} alt="" />
            </a>
          ))}
        </div>
      </div>

      <CompanyFooter />
    </div>
  );
}

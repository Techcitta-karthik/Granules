import { useEffect, useState } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

const ROLES = ['Customer', 'Employee', 'Other'] as const;

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh',
  'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Denmark', 'Egypt',
  'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Hong Kong SAR China', 'India',
  'Indonesia', 'Ireland', 'Israel', 'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico',
  'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea',
  'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey',
  'United Arab Emirates', 'United Kingdom', 'United States of America (USA)', 'Vietnam',
];

const EMPTY = {
  name: '',
  role: '',
  street: '',
  country: '',
  phone: '',
  email: '',
  complaint: '',
};

export default function DataPrivacyComplaintFormPage() {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Data Privacy Complaint Form — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(EMPTY);
  };

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">Data Privacy Complaint Form</h1>
          <div className="policy-divider" />

          <div className="policy-content">
            <section className="policy-section">
              <p className="policy-text">
                You may file a complaint, in writing, with the Data Privacy Officer of Granules regarding the
                privacy practices of Granules without fear of retaliation.
              </p>
              <p className="policy-text">To be completed by the person filing complaint:</p>
            </section>

            {submitted ? (
              <p className="policy-success" role="status">
                Your complaint has been recorded. Please also forward a copy to the Data Privacy Officer using the address below.
              </p>
            ) : (
              <form className="policy-form" onSubmit={handleSubmit}>
                <label className="policy-field">
                  <span className="policy-label">Your Name</span>
                  <input className="policy-input" type="text" value={form.name} onChange={set('name')} autoComplete="name" />
                </label>

                <fieldset className="policy-field" style={{ border: 'none', margin: 0, padding: 0 }}>
                  <legend className="policy-label">Role</legend>
                  <div className="policy-roles">
                    {ROLES.map((role) => (
                      <label className="policy-role" key={role}>
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={form.role === role}
                          onChange={set('role')}
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="policy-field">
                  <span className="policy-label">Street Address</span>
                  <input className="policy-input" type="text" value={form.street} onChange={set('street')} autoComplete="street-address" />
                </label>

                <label className="policy-field">
                  <span className="policy-label">Country</span>
                  <select className="policy-select" value={form.country} onChange={set('country')} autoComplete="country-name">
                    <option value="">Select country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </label>

                <label className="policy-field">
                  <span className="policy-label">Phone Number</span>
                  <input className="policy-input" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                </label>

                <label className="policy-field">
                  <span className="policy-label">Email Address</span>
                  <input className="policy-input" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
                </label>

                <label className="policy-field">
                  <span className="policy-label">Please tell us about your complaint<span className="req">*</span></span>
                  <textarea className="policy-textarea" required value={form.complaint} onChange={set('complaint')} />
                </label>

                <button className="policy-submit" type="submit">Submit</button>
              </form>
            )}

            <p className="policy-note">
              <strong>Please forward this complaint to:</strong>
              Data Privacy Officer<br />
              Granules India Limited<br />
              15th Floor, Granules Tower, Botanical Garden Road,<br />
              Kondapur, Hyderabad – 500084, Telangana, India
            </p>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

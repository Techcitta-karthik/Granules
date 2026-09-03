import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Granules Privacy Policy — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">Granules Privacy Policy</h1>
          <div className="policy-divider" />

          <div className="policy-content">
            <section className="policy-section">
              <h2 className="policy-section-title">Data Privacy Policy</h2>
              <p className="policy-text">
                This Data Privacy Policy outlines how Granules India Limited (hereinafter referred to
                as &ldquo;Granules&rdquo; or &ldquo;the Company&rdquo;) collects, uses, stores, discloses,
                or otherwise processes personal data, including any information shared while using the
                Company’s website. It also describes your rights in relation to your personal data.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Commitment to Privacy</h2>
              <p className="policy-text">
                Granules respects the privacy of all website visitors and is committed to protecting the
                confidentiality and security of their personal information. The Company ensures the
                highest standards of data protection for employees, vendors, clients, and customers in
                accordance with applicable data protection laws and regulations.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">What Constitutes Personal Data</h2>
              <p className="policy-text">
                Personal data refers to any information collected and processed directly or indirectly,
                including but not limited to:
              </p>
              <ul className="policy-list">
                <li>Identity and contact details such as name, email ID, and phone number</li>
                <li>Data received from third parties</li>
                <li>Information collected via cookies, forms, or similar technologies on the website</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Access to Personal Data</h2>
              <p className="policy-text">
                Access to your personal data is strictly limited:
              </p>
              <ul className="policy-list">
                <li>It is granted only on a need-to-know basis or as required by law</li>
                <li>
                  Granules may record or monitor communications to comply with regulatory obligations and
                  internal policies, where permitted by law
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Our Assurance</h2>
              <p className="policy-text">
                Granules ensures the following while handling personal and sensitive information:
              </p>
              <ul className="policy-list">
                <li>
                  Robust security measures are in place to prevent unauthorized access, loss, or misuse
                  of personal data
                </li>
                <li>
                  Usage of personal data is strictly limited to what is necessary for business
                  operations and service delivery
                </li>
                <li>
                  Third-party service providers engaged by the Company are bound to comply with
                  Granules&rsquo; privacy policies and are subject to audit.
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Data Retention</h2>
              <p className="policy-text">
                Personal data is retained only for as long as necessary to fulfill the purpose for which
                it was collected, or to meet legal, regulatory, or contractual obligations. After the
                retention period, data will be securely deleted or archived in compliance with
                applicable laws.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Policy Updates</h2>
              <p className="policy-text">
                Granules reserves the right to update, change, or modify this Privacy Policy at any
                time. Any changes will be posted on the Company website with the revised date of update.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Contact Us</h2>
              <p className="policy-text">
                For questions, comments, or requests regarding this Data Privacy Policy or the protection
                of your personal data, please contact us at:{' '}
                <a href="mailto:contact@granulesindia.com" className="policy-link">
                  contact@granulesindia.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

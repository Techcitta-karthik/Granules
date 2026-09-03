import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

export default function DataProtectionNoticePage() {
  useEffect(() => {
    document.title = 'Data Protection Notice — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">Data Protection Notice</h1>
          <div className="policy-divider" />

          <div className="policy-content">
            <section className="policy-section">
              <p className="policy-text">
                Granules India Limited is committed to safeguarding personal data and ensuring full compliance
                with applicable data protection laws and regulations, including the Information Technology Act,
                2000 and relevant international standards where applicable.
              </p>
              <p className="policy-text">
                This Data Protection Notice outlines how Granules collects, uses, stores, shares, and protects
                personal data of its employees, customers, vendors, and website users.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Key Principles:</h2>
              <ul className="policy-list" style={{ gap: '6px' }}>
                <li>
                  <strong>Lawfulness and Transparency:</strong> Personal data will be processed fairly and
                  transparently, and only for lawful purposes.
                </li>
                <li>
                  <strong>Purpose Limitation:</strong> Data will only be used for the purposes it was collected
                  for and not for any incompatible purposes.
                </li>
                <li>
                  <strong>Data Minimization:</strong> Only data that is necessary and relevant will be collected
                  and processed.
                </li>
                <li>
                  <strong>Accuracy:</strong> Granules will take reasonable steps to ensure data is accurate and
                  kept up to date.
                </li>
                <li>
                  <strong>Storage Limitation:</strong> Personal data will not be retained longer than necessary
                  for the intended purpose or legal requirements.
                </li>
                <li>
                  <strong>Security:</strong> Appropriate technical and organizational measures are in place to
                  ensure the confidentiality, integrity, and availability of personal data.
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Contact Us</h2>
              <p className="policy-text">
                Granules ensures that third parties processing personal data on its behalf are bound by strict
                confidentiality and data protection obligations. For more information, please contact us at:{' '}
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

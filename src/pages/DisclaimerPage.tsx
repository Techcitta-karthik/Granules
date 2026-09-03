import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

export default function DisclaimerPage() {
  useEffect(() => {
    document.title = 'Disclaimer — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">Disclaimer</h1>
          <div className="policy-divider" />

          <div className="policy-content">
            <section className="policy-section">
              <p className="policy-text">
                The information provided on the Granules India Limited (&ldquo;Granules&rdquo;) website is for
                general informational purposes only. While we strive to ensure that all information presented is
                accurate and up to date, Granules makes no representations or warranties of any kind, express or
                implied, about the completeness, accuracy, reliability, suitability, or availability of the
                information, products, services, or related graphics contained on the website for any purpose.
              </p>
              <p className="policy-text">
                Nothing on this website constitutes professional, medical, or pharmaceutical advice. Users are
                advised to consult relevant professionals before making decisions based on any content on this site.
              </p>
              <p className="policy-text">
                Granules shall not be held responsible or liable for any loss, injury, or damage including without
                limitation, indirect or consequential loss or damage, arising from the use of or reliance on any
                information contained on the website.
              </p>
              <p className="policy-text">
                Links to external websites are provided for convenience and informational purposes only. Granules
                does not endorse or take responsibility for the content or availability of any third-party sites.
              </p>
            </section>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

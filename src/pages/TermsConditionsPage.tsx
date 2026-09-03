import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

export default function TermsConditionsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">Terms &amp; Conditions</h1>
          <div className="policy-divider" />

          <div className="policy-content">
            <section className="policy-section">
              <p className="policy-text">
                These Terms &amp; Conditions govern your access and use of the website operated by Granules India Limited
                (&ldquo;Granules&rdquo;). By accessing this website, you agree to be bound by these terms. If you do not
                agree, please do not use the site.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Use of Website</h2>
              <ul className="policy-list" style={{ gap: '6px' }}>
                <li>This website is intended for informational purposes only.</li>
                <li>Unauthorized use of this site may give rise to a claim for damages and/or be a criminal offense.</li>
                <li>You must not misuse the site by knowingly introducing viruses or other harmful material.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Intellectual Property</h2>
              <ul className="policy-list" style={{ gap: '6px' }}>
                <li>
                  All content, including text, graphics, logos, images, and software, is the property of Granules or its
                  licensors and is protected by applicable intellectual property laws.
                </li>
                <li>
                  No part of the website may be reproduced or distributed without prior written permission from
                  Granules.
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">User Responsibilities</h2>
              <ul className="policy-list" style={{ gap: '6px' }}>
                <li>
                  You agree not to use the website in any way that may damage, disable, or impair it or interfere with
                  any other party&rsquo;s use.
                </li>
                <li>
                  You must not attempt to gain unauthorized access to any part of the website, server, or any system
                  connected to it.
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Limitation of Liability</h2>
              <ul className="policy-list" style={{ gap: '6px' }}>
                <li>
                  Granules will not be liable for any direct, indirect, or consequential loss or damage arising out of
                  or in connection with the use or inability to use the website.
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Modifications</h2>
              <ul className="policy-list" style={{ gap: '6px' }}>
                <li>
                  Granules may revise these terms at any time without prior notice. Users are encouraged to review this
                  page periodically for any changes.
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Governing Law</h2>
              <ul className="policy-list" style={{ gap: '6px' }}>
                <li>
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes will
                  be subject to the exclusive jurisdiction of courts in Hyderabad, India.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

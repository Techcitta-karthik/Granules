import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

export default function CookiePolicyPage() {
  useEffect(() => {
    document.title = 'How We Use Cookies — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">How We Use Cookies</h1>
          <div className="policy-divider" />

          <div className="policy-content">
            <section className="policy-section">
              <h2 className="policy-section-title">Cookie Policy</h2>
              <p className="policy-text">
                This Cookie Policy explains how Granules India Limited (hereinafter referred to as &ldquo;Granules&rdquo;,
                &ldquo;we&rdquo;, or &ldquo;our&rdquo;) uses cookies and similar technologies on its website to enhance
                user experience, analyze website traffic, and support personalized services. By continuing to use our
                website, you consent to the use of cookies in accordance with this policy.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">What Are Cookies?</h2>
              <p className="policy-text">
                Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when
                you visit a website. They help the website recognize your device and store certain information about
                your preferences or past actions.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Types of Cookies We Use</h2>
              <ul className="policy-list">
                <li>
                  <strong>Essential Cookies</strong>
                  <span className="policy-list-subtext">
                    These cookies are necessary for the website to function properly. They enable basic features such as
                    page navigation, secure access, and form submissions.
                  </span>
                </li>
                <li>
                  <strong>Performance and Analytics Cookies</strong>
                  <span className="policy-list-subtext">
                    These cookies help us understand how visitors interact with our website by collecting information such
                    as page visits, traffic sources, and user behavior. This data helps us improve the performance and
                    usability of our site.
                  </span>
                </li>
                <li>
                  <strong>Functionality Cookies</strong>
                  <span className="policy-list-subtext">
                    These cookies remember your preferences and settings, such as language or region, to provide a more
                    personalized experience.
                  </span>
                </li>
                <li>
                  <strong>Third-Party Cookies</strong>
                  <span className="policy-list-subtext">
                    We may use third-party services (such as analytics or video hosting platforms) that set their own cookies
                    to collect data or deliver content. These cookies are subject to the privacy policies of the respective
                    third parties.
                  </span>
                </li>
              </ul>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Managing Cookies</h2>
              <p className="policy-text">
                You can control or disable cookies through your browser settings. Most web browsers allow you to:
              </p>
              <ul className="policy-list" style={{ gap: '6px' }}>
                <li>View what cookies are stored</li>
                <li>Delete cookies</li>
                <li>Block cookies entirely</li>
                <li>Set preferences for certain websites</li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                Please note that disabling cookies may affect the functionality and user experience of our website.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Consent</h2>
              <p className="policy-text">
                When you visit our website for the first time, a cookie banner will be displayed asking for your consent
                to use non-essential cookies. By clicking &ldquo;Accept&rdquo; or continuing to use the website, you agree
                to our use of cookies as described in this policy.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Policy Updates</h2>
              <p className="policy-text">
                Granules may update this Cookie Policy periodically to reflect changes in technology, legal requirements,
                or our practices. The updated policy will be posted on this page with the revised effective date.
              </p>
            </section>

            <section className="policy-section">
              <h2 className="policy-section-title">Contact Us</h2>
              <p className="policy-text">
                If you have any questions or concerns about our use of cookies, please contact us at:{' '}
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

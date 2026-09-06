import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

export default function CookiePolicyPage() {
  useEffect(() => {
    document.title = 'Cookie Policy — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">Cookie Policy</h1>
          <p
            className="policy-effective-date"
            style={{ color: '#6b7280', fontSize: '15px', fontWeight: 600, margin: '-12px 0 20px' }}
          >
            Last updated: Jul 24, 2025, 3:24 PM
          </p>
          <div className="policy-divider" />

          <div className="policy-content">
            {/* INTRO */}
            <section className="policy-section">
              <p className="policy-text">
                Thank you for visiting our and/or our affiliate&rsquo;s (&ldquo;Granules&rdquo;/&ldquo;We&rdquo;/&ldquo;Us&rdquo;/&ldquo;Our&rdquo;) website. We understand that your privacy is important to data subject (&ldquo;You&rdquo;, &ldquo;Your&rdquo;, &ldquo;User&rdquo;) and we are committed for being transparent about the technologies we use.
              </p>
            </section>

            {/* 1. About our Cookie Policy */}
            <section className="policy-section">
              <h2 className="policy-section-title">1. About our Cookie Policy</h2>
              <p className="policy-text">
                This cookie policy (&ldquo;Cookie Policy&rdquo;) explains what cookies and other similar technologies are and how we use them. You should read this Cookie Policy to understand what cookies and other similar tracking technologies are, how we use them, the types of cookies we use i.e., the information we collect using cookies and how that information is used and how to control the cookie preferences. For further information on how we use, store and keep your personal data secure, see our{' '}
                <Link to="/privacy-policy" className="policy-link">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            {/* 2. What are Cookies */}
            <section className="policy-section">
              <h2 className="policy-section-title">2. What are Cookies</h2>
              <p className="policy-text">
                Cookies are alphanumeric identifiers with a small amount of data that are commonly used as an anonymous unique identifier (&ldquo;Cookies&rdquo;). These are sent to your browser from the website that you visit and are stored on your computer’s hard drive. A cookie in no way gives us access to your computer/device and cookies cannot access any other information on your computer/device.
              </p>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                We majorly use the following types of cookies:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Strictly necessary:</strong> Necessary cookies are essential for the website to function properly. These cookies ensure basic functionalities and security features of the website, anonymously such as accessing secure areas of the website. Therefore, we do not ask for your explicit consent for such cookies. For all other cookies, we give you the choice to provide us with explicit and informed consent.
                </li>
                <li>
                  <strong>Performance (Statistics):</strong> Also known as &ldquo;statistics cookies&rdquo;, these cookies collect information about how visitors use a website, for instance which pages visitors go to most often and if they receive error messages. They are used to improve how a website works in future versions.
                </li>
                <li>
                  <strong>Analytics:</strong> Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics of the number of visitors, bounce rate, traffic source, etc.
                </li>
                <li>
                  <strong>Functional:</strong> These cookies allow the website to remember choices you make such as username, language or region you are in and provide an enhanced personal experience.
                </li>
                <li>
                  <strong>Third-Party Cookies:</strong> Our website may also use third-party cookies which are placed on our website by third parties whose solutions have been integrated into our platforms. Such cookies include, but are not limited to, marketing cookies, targeting cookies. These cookies track your online activity between different platforms to present you with more relevant advertisements, products or services based on your preferences and search history. Such cookies may also enable you to view our promotional content using social media networks such as YouTube as well as on our social media accounts on platforms such as Meta, LinkedIn and Twitter, when accessed from our website. These cookies can share that information with other organizations or advertisers. Such cookies are always optional, and you may choose to consent to them.
                </li>
                <li>
                  <strong>Others:</strong> Other uncategorized cookies are those that are being analysed and have not been categorized yet.
                </li>
              </ul>
            </section>

            {/* 3. How we use Cookies */}
            <section className="policy-section">
              <h2 className="policy-section-title">3. How we use Cookies</h2>
              <p className="policy-text">
                Our website uses these cookies to collect information and to improve our service by making your interaction with us faster. It enables the website to remember your actions and preferences (such as login, language, font size and other display preferences) over a period, to avoid re-entering the data upon re-visiting the website or browsing from one page to another. They may be used for the purposes of managing your preferences, maintaining and optimizing security, marketing, communication, analytics, and research.
              </p>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                The first-party cookies are mostly necessary for the website to function the right way.
              </p>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                <strong>Other tracking technologies:</strong> Our website uses cookies, Web Beacons and other web technologies such as CAPTCHAs (sometimes referred to as web server logs and/or tracking pixels) to improve our website’s performance and to enhance your browsing experience. These technologies are designed to provide usage information for purposes of analysing and improving the performance of the services we provide to you.
              </p>
            </section>

            {/* 4. Third-Party Plug-ins */}
            <section className="policy-section">
              <h2 className="policy-section-title">4. Third-Party Plug-ins</h2>
              <p className="policy-text">
                All information about the role of third-party in processing the data collected via cookies or other tracking technologies is included in our Privacy Policy. The cookies may allow us and our third parties to collect the following information about you:
              </p>
              <ul className="policy-list">
                <li>data relating to your device (including device ID, MAC address, IP address, operating system, device settings, in particular the language settings, screen resolution, type of web browser, etc.);</li>
                <li>data relating to your visits to our website (including time and length of your visit, date, subpages visited on our website, search data, etc.);</li>
                <li>your location (if you have provided your separate consent);</li>
                <li>information about advertisements you have viewed, including information about links you have clicked;</li>
                <li>information about your activities on other website (if you have provided your separate consent), including information on the other website you visit and the frequency of the visits.</li>
              </ul>
            </section>

            {/* 5. What is the legal basis for processing? */}
            <section className="policy-section">
              <h2 className="policy-section-title">5. What is the legal basis for processing?</h2>
              <p className="policy-text">
                The basis under which we process your personal data depends on several factors, the personal data being processed itself, as well as the business purpose for which we are processing it. These bases may include:
              </p>
              <ul className="policy-list">
                <li>your consent (in line with Article 6(1)(a) of the General Data Protection Regulation (GDPR)) with respect to cookies which require a consent; or</li>
                <li>under our legitimate interest (in line with Article 6(1)(f) General Data Protection Regulation (GDPR)) with respect to cookies which are necessary to operate the website;</li>
                <li>your explicit consent (in line with Section 4(1)(a) of The Digital Personal Data Protection Act of India (DPDPA)), which is required to process your personal data;</li>
                <li>other data privacy laws in the US;</li>
                <li>to establish, exercise or defend legal claims;</li>
                <li>to perform a contract (e.g., to compensate a person);</li>
                <li>to perform a task in the public’s interest (i.e., to avoid a major public threat); and/or</li>
                <li>to protect the vital interest of the person (e.g., safety or survival of the person).</li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                You have the right to withdraw your consent at any time or object to processing of your personal data made under our legitimate interest. To withdraw your consent, you may contact us in accordance with our{' '}
                <Link to="/privacy-policy" className="policy-link">
                  Privacy Policy
                </Link>
                . Any processing of the personal data before the withdrawal of the consent shall not be held unlawful.
              </p>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                For more details on legal basis of processing please read our{' '}
                <Link to="/privacy-policy" className="policy-link">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            {/* 6. How can you control your Cookies? */}
            <section className="policy-section">
              <h2 className="policy-section-title">6. How can you control your Cookies?</h2>
              <p className="policy-text">
                When you visit the website for the first time, we will show you the &ldquo;Cookie Control Banner&rdquo; (elaborated below). You may either accept the selected cookies, or review and choose your cookie preferences. You may enable or disable the cookie categories on the pop-up according to your cookie preferences by clicking on the &ldquo;Toggle&rdquo; button against each category except for strictly necessary cookies which are mandatory by default. By clicking &ldquo;Accept all&rdquo; you agree to the usage of all cookies and the corresponding data, for processing. If you want us to only collect cookies that are essential for you to use this website, select &ldquo;Accept only Necessary&rdquo;. Should you decide to change your preferences later through your browsing session, you may click on the &ldquo;Privacy &amp; Cookie Policy&rdquo; tab on your screen. This will re-display the consent notice enabling you to change your preferences or withdraw your consent entirely.
              </p>
              <p className="policy-text" style={{ marginTop: '8px', fontWeight: 600 }}>
                Options on the banner:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Accept all:</strong> You consent to use of all cookies and corresponding data processing.
                </li>
                <li>
                  <strong>Accept only Necessary:</strong> Only essential cookies will be used.
                </li>
              </ul>
            </section>

            {/* 7. Changes to this Cookie Policy */}
            <section className="policy-section">
              <h2 className="policy-section-title">7. Changes to this Cookie Policy</h2>
              <p className="policy-text">
                We reserve the right to make changes and corrections to this Cookie Policy. Please refer to this Cookie Policy occasionally to review updates.
              </p>
            </section>

            {/* 8. Cookie Consent Banner */}
            <section className="policy-section">
              <h2 className="policy-section-title">8. Cookie Consent Banner</h2>
              <p className="policy-text">
                You may see a &ldquo;Cookie Consent Banner&rdquo; on our website and dashboards. When you consent in this manner, we and our advertising partners may set advertising cookies on the website you are visiting and our other dashboards, and services. We will display the banner to you periodically, to allow you to amend your consent.
              </p>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                If you have questions about this Cookie Policy, please contact us via our{' '}
                <Link to="/contact" className="policy-link">
                  Contact page
                </Link>{' '}
                or at:{' '}
                <a href="mailto:samhita.boindala@granulesindia.com" className="policy-link">
                  samhita.boindala@granulesindia.com
                </a>
                .
              </p>
            </section>

            {/* DOWNLOAD POLICY */}
            <section
              className="policy-section"
              style={{
                marginTop: '12px',
                padding: '20px',
                background: '#eff6ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe',
              }}
            >
              <p className="policy-text" style={{ color: '#1e3a8a', fontWeight: 500, margin: 0 }}>
                You can download our scanned, signed Cookie-Policy by{' '}
                <a
                  href="http://granulesindia.com/wp-content/uploads/2025/08/Cookie-Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="policy-link"
                  style={{ fontWeight: 700, textDecoration: 'underline' }}
                >
                  clicking here
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import { getAssetUrl } from '../lib/pdf';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Data Privacy Policy — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">DATA PRIVACY POLICY</h1>
          <p
            className="policy-effective-date"
            style={{ color: '#6b7280', fontSize: '15px', fontWeight: 600, margin: '-12px 0 20px' }}
          >
            Effective Date: Jul 24, 2025, 3:24 PM
          </p>
          <div className="policy-divider" />

          <div className="policy-content">
            {/* INTRODUCTION */}
            <section className="policy-section">
              <h2 className="policy-section-title">INTRODUCTION.</h2>
              <p className="policy-text">
                Granules India Limited, including its global affiliates and subsidiaries (hereinafter referred to as
                &ldquo;Granules&rdquo; or &ldquo;We&rdquo; or &ldquo;Us&rdquo; or &ldquo;Company&rdquo;) is committed to
                safeguarding the privacy of Privacy Data entrusted to Us. This Internal Privacy Policy outlines our
                approach to collecting, processing, storing, and protecting Privacy Data in compliance with relevant
                laws and regulations across our operations in India, Europe, and the United States. This global policy
                ensures a consistent and comprehensive approach to data protection across all legal entities within our
                corporate group.
              </p>
            </section>

            {/* REFERENCES */}
            <section className="policy-section">
              <h2 className="policy-section-title">REFERENCES.</h2>
              <p className="policy-text">
                This Privacy Policy is developed based on Generally Accepted Privacy Principles (GAPP) and aligns with
                industry best practices. It reflects our commitment to transparency, accountability, and the protection
                of individual rights. We continuously review and update this Data Privacy Policy to maintain the highest
                standards of data protection, incorporating the latest legal requirements and industry advancements.
              </p>
            </section>

            {/* SCOPE */}
            <section className="policy-section">
              <h2 className="policy-section-title">SCOPE.</h2>
              <p className="policy-text">
                This Data Privacy Policy (&ldquo;Policy&rdquo;) applies to Granules&rsquo; global employees and
                representatives of businesses and organizations Granules interacts with (e.g., vendors, suppliers,
                healthcare professionals, customers etc.) officers, staff members, Visitors to Granules&rsquo; website
                and other directly linked website or apps, members of the public who interact with Granules, Employees
                and contractors (including permanent, fixed term, temporary staff, any third-party representatives and
                contractors, agency workers, volunteers, interns, and agents engaged with Granules). It governs the
                handling of Privacy Data in both online and offline environments, ensuring that our practices align with
                legal requirements and industry standards. For the purposes of this Policy, all the aforementioned
                stakeholders will collectively be referred to as &ldquo;Users.&rdquo;
              </p>
              <p className="policy-text">
                If you disagree with our Policy, please contact us at the address, or Telephone or Fax or Email
                provided in this Policy requesting that we cease processing your Privacy information. We will take
                appropriate action, but please note that this may affect our ability to provide you with the requested
                information, goods, or services.
              </p>
              <p className="policy-text">
                Our website may contain links to external sites beyond our control. The Company is not responsible for the
                privacy practices of these external website.
              </p>
              <p className="policy-text">
                Our website is not intended for children. We do not knowingly collect or process Data relating to
                children.
              </p>
            </section>

            {/* TYPES OF PRIVACY DATA COLLECTED */}
            <section className="policy-section">
              <h2 className="policy-section-title">TYPES OF PRIVACY DATA COLLECTED.</h2>
              <p className="policy-text">
                We collect a diverse range of Privacy Data, reflecting the various interactions We have with individuals
                across our business operations. The types of Privacy Data collected include, but are not limited to:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Government-Issued Identifiers:</strong> This includes sensitive identification numbers such as
                  Permanent Account Numbers (PAN) in India, Aadhar details, Social Security Numbers (SSN) in the United
                  States, and other similar identifiers required by local regulations. These are essential for compliance
                  with financial, tax, and other regulatory obligations.
                </li>
                <li>
                  <strong>Personal Identifiers:</strong> We collect basic Privacy information such as full names, dates of
                  birth, email addresses, and phone numbers. This data is crucial for managing relationships with our Users,
                  as well as for verifying identities in various contexts.
                </li>
                <li>
                  <strong>Sensitive and Biometric Data:</strong> In certain cases, We may collect sensitive information,
                  including health-related data, which is integral for providing health insurance benefits to our
                  employees. Biometric data, such as fingerprints or facial recognition data, may be collected for
                  attendance tracking and security purposes, particularly in controlling access to secure areas and
                  systems.
                </li>
                <li>
                  <strong>Digital and Visual Data:</strong> Photographs and other visual data may be collected for
                  identification, security, marketing, presentations, uses on social media and other purposes. Additionally,
                  data generated through digital interactions, such as IP addresses, device information, and user activity
                  on our websites is collected to enhance User experience.
                </li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                This variety of data enables Us to effectively operate our business, maintain compliance with legal
                obligations, and deliver personalized services.
              </p>
            </section>

            {/* LEGAL BASIS FOR PROCESSING YOUR PRIVACY DATA */}
            <section className="policy-section">
              <h2 className="policy-section-title">LEGAL BASIS FOR PROCESSING YOUR PRIVACY DATA</h2>
              <p className="policy-text">
                We will only use your Privacy Data when the law permits us to do so. We must have a valid basis for using
                your Privacy Data and we may not collect, store or use information shared via our website other than as
                described in the privacy notice. Following is the legal basis on which we may process your Privacy Data:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>• Fulfilling a contract:</strong> The information we collect from you may be necessary to
                  allow us to fulfil our contract with you or to enter in a contract with you.
                </li>
                <li>
                  <strong>• Consent:</strong> You may provide your consent for us to contact you or to collect your
                  information. If you have given consent to our use of your Privacy information, you are entitled to
                  withdraw this consent at any time by contacting Data Privacy Officer at the address, or Telephone or Fax
                  or Email provided in Clause 16 of this Policy.
                </li>
                <li>
                  <strong>• Legitimate interest:</strong> We may also have a legitimate interest in using your Privacy
                  Data to enable us to give you the best service/product and the best and most secure experience. If this is
                  our reason for using your Privacy Data, we must make sure that our interests do not override yours and you
                  can object to this use of your Privacy Data.
                </li>
                <li>
                  <strong>• Legal obligation:</strong> Lastly, we may have a legal obligation to use your Privacy Data in
                  certain ways or to protect your interests under the various laws of the land where we operate, for
                  example we may exchange information with other companies and organisations for the purposes of fraud
                  protection and credit risk reduction or to monitor adverse effects of marketed products.
                </li>
              </ul>
            </section>

            {/* DATA COLLECTION METHODS */}
            <section className="policy-section">
              <h2 className="policy-section-title">DATA COLLECTION METHODS.</h2>
              <p className="policy-text">
                Privacy Data is collected through multiple channels, including online platforms and offline methods (such
                as paper forms and direct interactions). We conduct data collection transparently and in accordance with
                applicable Consent requirements.
              </p>
              <p className="policy-text">
                At Granules We employ a variety of data collection methods tailored to our business needs and regulatory
                obligations. These methods are designed to capture the necessary Privacy Data while respecting individual
                privacy and being compliant with applicable laws. Our data collection methods include the following:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Websites and Mobile Applications:</strong> Privacy Data is collected when Users interact with our
                  websites and mobile applications. This includes data entered into forms, such as registration forms,
                  contact forms, and surveys. We also collect data related to user behaviour on our websites, including pages
                  visited, time spent on each page, and actions taken (e.g., downloads, clicks), using Cookies and similar
                  tracking technologies.
                </li>
                <li>
                  <strong>Email and Digital Communication:</strong> Privacy Data is collected through email interactions,
                  digital communication platforms and social media. For instance, when individuals subscribe to our
                  newsletters, request information, or participate in webinars, We collect their email addresses and any other
                  information they choose to share. These communications may be tracked to analyse engagement and improve our
                  services.
                </li>
                <li>
                  <strong>Paper Forms and Documents:</strong> We collect Privacy Data through paper forms and documents in
                  various contexts, such as job applications and customer feedback surveys. These forms are often used in
                  face-to-face interactions at our offices, research facilities, or during events.
                </li>
                <li>
                  <strong>In-Person Interactions:</strong> Privacy Data is often collected during direct interactions with
                  our Users whether in a healthcare setting, at trade shows, during business meetings or during discussions
                  with doctors and medical representatives. This includes exchanging contact details, discussing personal
                  preferences, or obtaining Consent for participation in research activities.
                </li>
                <li>
                  <strong>Partner Organizations:</strong> We collaborate with healthcare providers, research institutions,
                  and other partner Organizations that collect Privacy Data as part of joint initiatives. These partners are
                  contractually bound to adhere to our data protection standards and to collect data in a manner that is
                  compliant with applicable laws.
                </li>
                <li>
                  <strong>Outsourced Services:</strong> Certain services, such as customer support, IT management, and Data
                  Processing, are outsourced to third-party vendors who collect and handle Privacy Data on our behalf.
                </li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                By utilizing these diverse and comprehensive data collection methods, Granules ensures that Privacy Data is
                collected in a manner that is both effective and compliant with the highest standards of privacy and data
                protection.
              </p>
            </section>

            {/* PURPOSE OF DATA COLLECTION */}
            <section className="policy-section">
              <h2 className="policy-section-title">PURPOSE OF DATA COLLECTION.</h2>
              <p className="policy-text">
                We use different methods to collect data from and about you including through automated technologies or
                interactions.
              </p>
              <p className="policy-text">
                As you interact with our website, we may automatically collect technical data about your equipment,
                browsing actions and patterns. We collect this Privacy Data by using cookies and similar technologies.
                Cookies are small pieces of information that are stored by your browser on your computer’s hard drive, and
                they are used to record how you navigate this website on each visit. Please see our{' '}
                <a href="/cookie-policy" className="policy-link">Cookie Policy</a> for further information.
              </p>
              <p className="policy-text">
                The Privacy Data We collect serves several vital functions within our Organization, all of which are
                aligned with our business objectives and legal obligations:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Internal Administrative Functions:</strong> We use Privacy Data to manage our internal
                  operations, including human resources activities such as recruitment, payroll, benefits administration,
                  and employee performance management. Additionally, Privacy Data is essential for financial reporting,
                  compliance with tax laws, and maintaining accurate records.
                </li>
                <li>
                  <strong>Research and Development:</strong> As a pharmaceutical company, research and development are at the
                  core of our business. We use health-related data, among other Privacy Data, to conduct clinical trials,
                  develop new products, and improve existing ones. This data is often collected from participants with their
                  explicit Consent and under strict ethical guidelines to protect their rights and safety.
                </li>
                <li>
                  <strong>Marketing and Communication:</strong> Privacy Data enables Us to engage with our Users through
                  targeted marketing efforts. This includes sending promotional materials, newsletters, and updates about
                  our products and services. We make sure that marketing communications are relevant to the recipients and
                  that they have the option to opt out of such communications at any time.
                </li>
                <li>
                  <strong>Compliance and Legal Obligations:</strong> We collect certain Privacy Data to comply with legal
                  requirements, such as Know Your Customer (KYC) regulations, anti-money laundering laws, and other
                  industry-specific legal obligations. This allows Us to operate within the legal frameworks of the
                  jurisdictions in which We do business.
                </li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                We make sure that Privacy Data is processed only for legitimate business purposes and that Data Subjects are
                informed of the intended use of their information at the point of collection. Additionally, We regularly
                review our Data Processing activities to confirm they remain aligned with the purposes for which the data was
                originally collected.
              </p>
            </section>

            {/* DATA STORAGE AND SECURITY */}
            <section className="policy-section">
              <h2 className="policy-section-title">DATA STORAGE AND SECURITY.</h2>
              <p className="policy-text">
                The security of Privacy Data is of paramount importance to Granules. We have implemented a comprehensive
                data storage and security framework designed to protect the confidentiality, integrity, and availability
                of Privacy Data across all our operations:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Data Storage Locations:</strong> Privacy Data is stored in both on-premises data centers and cloud
                  environments, depending on the nature of the data and the operational needs. On-premises storage is used
                  for certain data and in regions where local laws require data to be stored within the country. Cloud storage
                  is used for its scalability, accessibility, and resilience, particularly for data that needs to be
                  accessed by multiple offices or teams across different regions.
                </li>
                <li>
                  <strong>Data Protection:</strong> All Privacy Data is protected both at rest and in transit using
                  appropriate measures. Protection at rest involves securing data stored in databases, files, and backup
                  systems with Encryption and other safeguards to maintain its security even if the storage medium is
                  compromised. Protection in transit includes using Encryption, password protection, and secure transmission
                  protocols to safeguard data as it moves across networks, ensuring that it cannot be intercepted or tampered
                  with during transmission.
                </li>
                <li>
                  <strong>Access Controls:</strong> We have implemented Access Controls to restrict access to Privacy Data
                  to authorized personnel only. Access is granted based on the principle of least privilege, meaning that
                  Users are granted the minimum level of access necessary to perform their duties. Access logs are
                  maintained and regularly reviewed to detect and respond to unauthorized access attempts.
                </li>
                <li>
                  <strong>Security Audits and Assessments:</strong> Regular security audits and assessments are conducted to
                  identify vulnerabilities in our systems and processes. These audits include both internal assessments and
                  third-party penetration testing. We also conduct regular reviews of our security policies and procedures
                  to be effective and up to date with the latest security threats and industry best practices.
                </li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                Privacy Data stored within and outside the EEA is protected through GDPR-compliant mechanisms such as
                Standard Contractual Clauses (SCCs). We implement security measures in accordance with GDPR Article 32,
                the Virginia Consumer Data Protection Act (VCDPA), and New Jersey Data Protection Act to safeguard Privacy
                Data against unauthorized access and breaches.
              </p>
            </section>

            {/* DATA RETENTION */}
            <section className="policy-section">
              <h2 className="policy-section-title">DATA RETENTION.</h2>
              <p className="policy-text">
                We are committed to retaining Privacy Data only for as long as it is necessary to fulfil the purposes for
                which it was collected, in compliance with applicable legal and regulatory requirements. We will only
                retain your Privacy Data for as long as necessary to fulfil the purposes we collected it for, including the
                fulfilment of the contract, the initiation of a contract, or for the purposes of satisfying any legal,
                accounting, or other regulatory reporting requirements. Data no longer needed is securely deleted or
                anonymized.
              </p>
              <p className="policy-text">
                Our Data Retention practices are guided by the following principles:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Purpose-Driven Retention:</strong> Privacy Data is retained only for as long as it serves a
                  legitimate business purpose or is required by law. For instance, employee data may be retained for the
                  duration of employment and for a specified period afterward, as required by labour laws and tax
                  regulations.
                </li>
                <li>
                  <strong>Legal Compliance:</strong> We adhere to statutory retention periods as prescribed by laws in the
                  jurisdictions where We operates. For example, in India, certain financial and tax records must be
                  retained for a specific number of years. Similarly, health-related data may be subject to longer retention
                  periods under medical regulations.
                </li>
                <li>
                  <strong>Regular Review:</strong> We conduct regular reviews of the Privacy Data We holds to confirm that
                  it is still required for the purposes for which it was collected. Data that is no longer needed is
                  securely deleted, anonymized, or archived in compliance with our Data Retention policies.
                </li>
                <li>
                  <strong>Secure Disposal:</strong> When Privacy Data is no longer required, We dispose of securely to
                  prevent unauthorized access or misuse. This may involve securely shredding physical documents, wiping
                  electronic storage devices, or using certified data destruction services for digital records. The Company
                  shall dispose of Privacy Data using a secure destruction mechanism only.
                </li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                Our Data Retention process is designed to balance the need to retain data for business and legal purposes
                with the rights of individuals to have their Privacy Data deleted when it is no longer necessary. To
                determine the appropriate retention period for personal information, we consider the amount, nature, and
                sensitivity of the Privacy Data, the potential risk of harm from unauthorized use or disclosure of your
                Privacy Data, the purposes for which we process your Privacy Data and whether we can achieve those purposes
                through other means, and the applicable legal requirements.
              </p>
            </section>

            {/* DATA SHARING AND THIRD-PARTY PROCESSING */}
            <section className="policy-section">
              <h2 className="policy-section-title">DATA SHARING AND THIRD-PARTY PROCESSING.</h2>
              <p className="policy-text">
                To efficiently manage our global operations and deliver our services, We may need to share Privacy Data
                with third parties. Our approach to data sharing and third-party processing is guided by strict controls and
                oversight:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Data Sharing with Third Parties:</strong> We may share Privacy Data with selected third-party
                  service providers who assist Us in various aspects of our operations, such as IT services, cloud hosting,
                  marketing, and payroll services. Such third-party vendors may process Privacy Data on the Company’s behalf
                  as necessary, in connection with providing the Company’s products and services, fulfilling contractual
                  arrangements and legal or regulatory requirements. Before engaging any third-party provider, We conduct a
                  due diligence process to assess their data protection practices and verify that they have the ability to
                  meet our stringent requirements. The Company requires that the third-party vendors protect your Privacy
                  Data, only process it for the purposes it was shared for and not disclose it further.
                </li>
                <li>
                  <strong>Data Sharing with Group Companies:</strong> In some cases, Privacy Data may be shared with
                  affiliated companies within our corporate group to support joint business activities, such as product
                  development, marketing campaigns, or centralized administrative functions. Data shared within the group
                  is subject to the same level of protection as data handled directly by Granules.
                </li>
                <li>
                  <strong>Data Processing Agreements:</strong> Where required, third-party service providers with whom We
                  share Privacy Data are required to enter into Data Processing Agreements (DPAs). These agreements outline
                  the responsibilities of each party, including obligations related to data protection, confidentiality, and
                  security. DPAs also specify the purposes for which the data can be processed and the conditions under
                  which it can be shared with sub-processors. If a confidentiality agreement is in place with a third party,
                  its terms will take precedence over the requirements set out in this Privacy Policy.
                </li>
                <li>
                  <strong>Cross-Border Data Transfers:</strong> Given our global operations, Privacy Data may be transferred
                  across borders to jurisdictions where our offices, partners, or service providers are located. We confirm
                  that all Cross-Border Data Transfers comply with applicable data protection laws, including the use of
                  appropriate safeguards such as Standard Contractual Clauses (SCCs) or Binding Corporate Rules (BCRs)
                  where required by law.
                </li>
                <li>
                  <strong>Data Sharing with Law Enforcement and Government Authorities:</strong> We may share your Privacy
                  Data with law enforcement or government authorities where they have followed due legal process to request
                  the Company to disclose the information.
                </li>
                <li>
                  <strong>Monitoring and Compliance:</strong> We actively monitor our third-party service providers to verify
                  ongoing compliance with our data protection standards. This includes regular audits, assessments, and
                  reviews of their data handling practices. In the event of any breach or noncompliance, We take immediate
                  action to address the issue and, if necessary, terminate the relationship with the third party.
                </li>
              </ul>
            </section>

            {/* COMPLIANCE WITH LEGAL AND REGULATORY REQUIREMENTS */}
            <section className="policy-section">
              <h2 className="policy-section-title">COMPLIANCE WITH LEGAL AND REGULATORY REQUIREMENTS.</h2>
              <p className="policy-text">
                Granules adhere to the data protection laws applicable in the regions where We operate, including but not
                limited to the data privacy laws of India, USA and Europe. We regularly review and update our practices to
                confirm ongoing compliance with these legal frameworks of the regions.
              </p>
            </section>

            {/* SOCIAL MEDIA AND DIGITAL ENGAGEMENT */}
            <section className="policy-section">
              <h2 className="policy-section-title">SOCIAL MEDIA AND DIGITAL ENGAGEMENT.</h2>
              <p className="policy-text">
                Social media plays a key role in our communication strategy, allowing Us to engage with a broad audience,
                including customers, partners, and the general public. However, We recognize the importance of handling
                Privacy Data responsibly in these digital spaces:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Social Media Usage:</strong> Employees engaging on social media platforms on behalf of Granules
                  must do so responsibly, ensuring that no Privacy Data is shared without proper authorization. This
                  includes avoiding the sharing of sensitive information, such as health data or government-issued
                  identifiers, unless explicit Consent has been obtained or it is necessary for legitimate business
                  purposes.
                </li>
                <li>
                  <strong>Compliance with Policies:</strong> All digital interactions, including those on social media,
                  must comply with our internal social media policy, which outlines the guidelines for appropriate use of
                  social media in a business context. This Privacy Policy is designed to protect both the company's
                  reputation and the privacy of individuals who interact with Us online.
                </li>
                <li>
                  <strong>Third-Party Platforms:</strong> When We use third-party platforms for social media engagement, We
                  verify that these platforms comply with applicable data protection laws. We also inform Users about how
                  their data will be used, and We provide options for managing privacy settings and preferences.
                </li>
                <li>
                  <strong>Monitoring and Response:</strong> We monitor our social media channels for any potential privacy
                  issues, such as the unauthorized sharing of Privacy Data or breaches of our social media policy. If a
                  privacy issue is identified, We take immediate action to rectify the situation and prevent further
                  incidents. By adhering to these guidelines, We conduct our social media activities in a manner that
                  respects the privacy and rights of all individuals involved.
                </li>
              </ul>
            </section>

            {/* COOKIES AND WEBSITE USAGE */}
            <section className="policy-section">
              <h2 className="policy-section-title">COOKIES AND WEBSITE USAGE.</h2>
              <p className="policy-text">
                Our websites use Cookies and similar technologies to enhance user experience and analyse traffic. We inform
                visitors about our use of Cookies through a clear notice and provide options to manage Cookie preferences.
                Users can opt-out of non-essential Cookies in accordance with our Cookie management policy.
              </p>
            </section>

            {/* USER RIGHTS AND GRIEVANCE MECHANISM */}
            <section className="policy-section">
              <h2 className="policy-section-title">USER RIGHTS AND GRIEVANCE MECHANISM.</h2>
              <p className="policy-text">
                We recognize the rights of individuals to control their Privacy Data and provide mechanisms for them to
                exercise these rights. Our approach to User Rights and grievances includes the following:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Right to Access:</strong> Individuals have the right to request access to the Privacy Data We hold
                  about them. This includes the right to obtain a copy of the data, understand how it is being used, and
                  verify its accuracy. Requests for access will be responded to within the timeframe specified by applicable
                  law ensuring transparency and openness in our data practices.
                </li>
                <li>
                  <strong>Right to Correction:</strong> If any Privacy Data We hold is inaccurate or incomplete, individuals
                  have the right to request corrections. We will promptly correct any inaccuracies upon verification of the
                  request.
                </li>
                <li>
                  <strong>Right to Deletion:</strong> In certain circumstances, individuals have the right to request the
                  deletion of their Privacy Data. This right applies when the data is no longer necessary for the purposes
                  for which it was collected, the individual withdraws Consent, or the data has been unlawfully processed.
                  We will assess each deletion request in accordance with legal requirements and, where applicable, delete
                  the data securely.
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> Individuals have the right to request the restriction of
                  Data Processing in certain circumstances, such as when they contest the accuracy of the data or when the
                  processing is unlawful, but the individual opposes deletion. We honour such requests by temporarily
                  limiting the use of the data while We address the issue.
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Under GDPR, individuals have the right to request a copy of
                  their Privacy Data in a structured, commonly used, and machine-readable format. This right applies to data
                  that has been provided to Us by the individual and is processed based on Consent or for the performance
                  of a contract. We facilitate the transfer of this data to another service provider if requested by the
                  individual.
                </li>
                <li>
                  <strong>Right to Object:</strong> Individuals have the right to object to certain types of Data
                  Processing, such as processing for direct marketing purposes. We will respect objections unless We can
                  demonstrate compelling legitimate grounds for the processing that override the individual's interests,
                  rights, and freedoms.
                </li>
                <li>
                  <strong>Grievance Mechanism:</strong> We are committed to addressing any concerns or grievances related to
                  our Data Processing practices. Individuals can raise grievances by contacting our designated grievance
                  officer via email at{' '}
                  <a href="mailto:GrievanceOfficer@GranulesIndia.Com" className="policy-link">
                    GrievanceOfficer@GranulesIndia.Com
                  </a>
                  . We have established a clear process for handling grievances, which includes logging the complaint,
                  conducting a thorough investigation, and providing a response within a reasonable timeframe. If the
                  grievance is not resolved to the individual's satisfaction, they have the right to escalate the matter to
                  the relevant data protection authority.
                </li>
                <li>
                  <strong>Transparent Communication:</strong> We inform individuals of their rights and the procedures for
                  exercising them through clear and accessible communication channels. This includes providing detailed
                  information on our website, in privacy notices, and in responses to inquiries.
                </li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                By empowering individuals to exercise their rights and providing a transparent Grievance Mechanism, We
                reinforce our commitment to ethical data handling and build trust with our stakeholders.
              </p>
            </section>

            {/* DATA BREACH RESPONSE */}
            <section className="policy-section">
              <h2 className="policy-section-title">DATA BREACH RESPONSE.</h2>
              <p className="policy-text">
                In the event of a Data Breach, Granules is committed to taking immediate and effective action to mitigate
                the impact and comply with legal obligations:
              </p>
              <ul className="policy-list">
                <li>
                  <strong>Notification to Authorities:</strong> If a breach involving Privacy Data occurs, We will promptly
                  notify the relevant regulatory authority of the country where the Company operates, as mandated under the
                  applicable laws. In the case of a breach that poses a high risk to individuals' rights and freedoms, We
                  will notify the affected individuals without undue delay.
                </li>
                <li>
                  <strong>Containment and Mitigation:</strong> We take immediate steps to contain the breach, prevent
                  further data loss, and mitigate the potential impact on individuals. This may involve isolating affected
                  systems, resetting access credentials, or implementing additional security measures.
                </li>
                <li>
                  <strong>Investigation and Analysis:</strong> We conduct a thorough investigation to determine the cause of
                  the breach, the extent of the data loss, and the potential impact on individuals. The findings of the
                  investigation inform our response and any corrective actions needed to prevent future breaches. Complaints
                  are reviewed and investigated and a report of the same is provided to the Advisory Committee (&ldquo;Committee&rdquo;).
                  The investigation shall be completed within 72 hours of receipt of the complaint. Actions of the
                  violations (if any) should be determined by the Committee.
                </li>
                <li>
                  <strong>Communication and Support:</strong> We communicate transparently with affected individuals,
                  providing them with information about the breach, the steps We have taken to mitigate the impact, and any
                  actions they can take to protect themselves. We also offer support to help individuals navigate the
                  situation and minimize any harm.
                </li>
              </ul>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                Our breach response plan is regularly reviewed and updated to maintain its effectiveness in addressing
                emerging threats and complying with legal requirements.
              </p>
            </section>

            {/* CONTACT US */}
            <section className="policy-section">
              <h2 className="policy-section-title">CONTACT US.</h2>
              <p className="policy-text">
                If you have any questions or concerns about this Privacy Statement or how We handle your Privacy Data,
                please contact Us at{' '}
                <a href="mailto:GrievanceOfficer@GranulesIndia.com" className="policy-link">
                  GrievanceOfficer@GranulesIndia.com
                </a>{' '}
                or at{' '}
                <a href="tel:+914069043711" className="policy-link">
                  +91-40- 69043711
                </a>
                .
              </p>
              <p className="policy-text">
                Should you have any questions about our Policy and practices, or if you have any concern, feel free to
                contact our Data Privacy Officer at the address, or Telephone or Fax or Email provided in Clause 17 of
                this Policy. We shall not be responsible for any communication, if addressed, to any non-designated person
                in this regard. If you have any queries or complaints about our compliance with this Policy or you believe
                that any Privacy Data, we have about you is incorrect, has been, or might be used inappropriately or there
                is a Data Privacy Breach, please directly complain to our Data Privacy Officer or anonymously through our
                whistleblower reporting mechanism.
              </p>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  marginTop: '4px',
                }}
              >
                <p className="policy-text" style={{ fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Our Data Privacy Officer may be also reached at:
                </p>
                <p className="policy-text" style={{ margin: 0, lineHeight: 1.6 }}>
                  Data Privacy Officer<br />
                  Granules India Limited<br />
                  15th Floor, Granules Tower, Botanical Garden Road,<br />
                  Kondapur, Hyderabad - 500084, Telangana.
                </p>
              </div>
              <p className="policy-text" style={{ marginTop: '8px' }}>
                The Company shall put in reasonable efforts to effectively and efficiently provide redressal for any
                grievances raised under this Policy.
              </p>
            </section>

            {/* POLICY REVIEW AND UPDATES */}
            <section className="policy-section">
              <h2 className="policy-section-title">POLICY REVIEW AND UPDATES.</h2>
              <p className="policy-text">
                Granules is committed to continuously improving our data protection practices. We regularly review and
                update this Policy to reflect changes in legal requirements, industry standards, and technological
                advancements. Employee training programs are conducted to make sure that our staff is aware of and
                complies with this Policy and is equipped to handle Privacy Data responsibly.
              </p>
              <p className="policy-text">
                This Policy shall be reviewed every 2 years to ensure that it remains relevant to the current needs of the
                Company and legislative changes in the jurisdictions where the Company operates. The Policy may be
                amended at any time, if required.
              </p>
              <p className="policy-text">
                The Company reserves the right to add, revise, amend, modify or delete any part of this Policy (in part
                or in full) at its discretion. The updated version of this Policy in force will be posted on the Company’s
                Website from time to time. In the event of any change in the applicable law, this Policy shall be deemed to
                be amended or modified to the extent necessary to comply with such amendment or to meet any requirement
                under the applicable laws.
              </p>
            </section>

            {/* NON-COMPLIANCE AND VIOLATIONS */}
            <section className="policy-section">
              <h2 className="policy-section-title">NON-COMPLIANCE AND VIOLATIONS.</h2>
              <p className="policy-text">
                Violation of this Privacy Policy may result in disciplinary action up to and including termination of
                employment and / or legal action.
              </p>
            </section>

            {/* EXCEPTION MANAGEMENT */}
            <section className="policy-section">
              <h2 className="policy-section-title">EXCEPTION MANAGEMENT.</h2>
              <p className="policy-text">
                If a department or function is unable to comply with any requirements detailed within this Privacy Policy,
                an exception shall be obtained. Such exceptions shall be documented, indicating the rationale for the
                exception and the related risks. Exceptions to this Privacy Policy shall follow the exception management
                process for prior authorization and approval.
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
                You can download our scanned, signed Privacy Policy by{' '}
                <a
                  href={getAssetUrl('pdfs/2025/08/Privacy-Policy.docx.pdf')}
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

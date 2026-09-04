import { useEffect } from 'react';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './PrivacyPolicyPage.css';

export default function TermsOfUsePage() {
  useEffect(() => {
    document.title = 'Terms of Use — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp policy-page">
      <NavBar />

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">Terms of Use</h1>
          <div className="policy-divider" />

          <div className="policy-content">
            {/* TERMS OF USE */}
            <section className="policy-section">
              <h2 className="policy-section-title">TERMS OF USE</h2>
              <p className="policy-text">
                These Terms of Use (&ldquo;Terms of Use&rdquo;) govern the terms and conditions of the use by the
                individual user (&ldquo;User&rdquo;) of the right to use (a) the website &lsquo;
                <a href="https://granulesindia.com/" className="policy-link">http://granulesindia.com/</a>&rsquo;; and (b)
                other content (that includes without limitation news, webcasts, reference tools and applications,
                sponsored programming, personalized content, continuing medical education, communication tools and
                discussion board) and updates thereto made available by Granules India Limited and its affiliates
                (&ldquo;Granules&rdquo;) (collectively referred to as, the &ldquo;Information&rdquo;).By accessing, using and
                browsing this Information, it is deemed that the User has read, understood and accepted, without
                limitation or qualification, the terms and conditions set out in the Terms of Use herein. The Site and its
                contents are designed to comply with the laws and regulations of India. Although accessible in other parts
                of the world, the Site and its contents are intended for access and use by Indian residents only.
              </p>
            </section>

            {/* USE OF INFORMATION AND RESTRICTIONS. */}
            <section className="policy-section">
              <h2 className="policy-section-title">USE OF INFORMATION AND RESTRICTIONS.</h2>
              <p className="policy-text">
                The User may freely browse the Site, but may only access, download or use Information strictly for
                non-commercial use. The User may not distribute, modify, transmit, reuse, repost or use the Information
                for commercial purposes, without written permission of Granules. User may not use, copy, modify, or
                transfer the Information, or any part thereof, in whole or in part, except as expressly provided in these
                Terms of Use. User may not reverse engineer, disassemble, decompile, or translate the Information, or
                otherwise attempt to derive the source code of the Information, or authorize any third party to do any of
                the foregoing. The User is prohibited from developing, selling or distributing applications that are capable
                of launching, being launched from, or are otherwise integrated with, the Information without the express
                written consent of Granules. User shall not rent, lease, loan, resell for profit, distribute, or
                sublicense the Information, or any part thereof. The User shall not alter any Information, post or transmit
                any unlawful, threatening, libelous, defamatory, obscene, scandalous, inflammatory, or profane material
                that could constitute or encourage conduct that would be considered a criminal offense, give rise to a
                civil liability or otherwise violate any law.
              </p>
              <p className="policy-text">
                Granules will cooperate with any law enforcement authorities or court order requesting or directing
                Granules to disclose the identity of anyone posting such information or materials.User should assume that
                everything the User reads or sees on this Site is copyrighted according to applicable laws, unless
                otherwise noted; and may not be used except as laid down in these Terms of Use. All access and use of the
                content of the Site hereof is at the own and sole risk of the User as to the cost and consequence. Use of
                this website does not confer any license or right to the Information or any copyright of Granules. All
                content related to Granules’ corporate and business activities, as well as those of its associates
                included on this portal such as text, graphics, logos, icons, images and software, (collectively the
                &ldquo;Copyrights&rdquo;); the trade names, logos and service marks (collectively the
                &ldquo;Trademarks&rdquo;) displayed on the site are registered and unregistered Trademarks of Granules and
                are the exclusive property of Granules and is protected by applicable legislations concerning protection
                and preservation of intellectual property rights and international treaties relating thereto. Products,
                trademarks, product labeling and product labeling as displayed herein may undergo modifications in
                different territories.
              </p>
              <p className="policy-text">
                Nothing in this Site should be construed as granting any license or right to use any Trademarks or
                Information without the prior written permission of Granules. Except as expressly authorized herein, the
                User should not display, download, distribute, reproduce, republish, or transmit any information, text,
                images, documents contained in the Site, without the express prior written consent of Granules. All
                intellectual property appearing on this Site are the property of their respective owners. The inclusion or
                reference to any such proprietary materials is for identification and informational purposes only and does
                not imply any affiliation with or endorsement by the intellectual property holders. Granules makes no
                claim of ownership or rights to any third-party intellectual property referenced on this Site. Any
                inadvertent infringement is unintentional, and Granules is committed to respecting the intellectual
                property rights of others. If you believe your intellectual property rights have been used inappropriately
                on this Site, please contact us so the matter can be promptly addressed.
              </p>
            </section>

            {/* OWNERSHIP. */}
            <section className="policy-section">
              <h2 className="policy-section-title">OWNERSHIP.</h2>
              <p className="policy-text">
                The Information is the property of Granules and others and is protected by copyright and/or other
                intellectual property laws. The Information is only licensed to the User for use only under the terms of
                these Terms of Use, and Granules reserves all rights not expressly granted to User.
              </p>
            </section>

            {/* MEDICAL INFORMATION. */}
            <section className="policy-section">
              <h2 className="policy-section-title">MEDICAL INFORMATION.</h2>
              <p className="policy-text">
                Information relating to any products or medical devices on this Site (collectively the
                &ldquo;Products&rdquo;) is provided by Granules for general information purposes only. Information on the
                Products may vary from country-to-country. A reference to a Product or service on this Site does not imply
                that such Product or service is available in your country. All Products listed are available only in India
                and only upon prescription from a qualified doctor or medical professional. The Product information is not
                intended to provide complete medical information. Product Information on this Site is not intended to be
                used as an alternative to consulting with qualified doctors or medical professionals. Product information
                outlined herein should not be construed as a promotion or solicitation for any Product or service or for
                the use of any Product or service that is not authorized by the laws and regulations of India. This Site may
                contain details on unlabeled use of a commercial product or an investigational use of a product not yet
                approved for the said purpose; such details being entirely informational in nature.
              </p>
            </section>

            {/* WARRANTY; DISCLAIMER. */}
            <section className="policy-section">
              <h2 className="policy-section-title">WARRANTY; DISCLAIMER.</h2>
              <p className="policy-text">
                The Information is provided to the User &ldquo;as is&rdquo;. Except as expressly provided under these
                Terms of Use, Granules and its affiliates, agents and licensors: (a) cannot and do not warrant the
                accuracy, completeness, currency or non-infringement of the Information provided hereunder; and (b)
                expressly disclaim all warranties and conditions, express, implied or statutory, including without
                limitation the implied warranties or conditions of merchantability, fitness for a particular purpose, and
                non-infringement. The User’s reliance upon the Information is solely at the User’s own risk. Granules does
                not assume any liability or responsibility for damage or injury (including death) to the User, other
                persons or property arising from any use of the Information, material, idea or instruction contained in
                the Information.
              </p>
            </section>

            {/* USER INFORMATION. */}
            <section className="policy-section">
              <h2 className="policy-section-title">USER INFORMATION.</h2>
              <p className="policy-text">
                Any communication or material that the User transmits or posts on the Site. The User also expressly
                acknowledge that Granules, or any of its affiliates, are free to store, use any ideas, concepts, know-how
                or techniques contained in any User Information, for any purpose whatsoever, including but not limited to,
                developing, manufacturing and marketing products, without any compensation to the User. Notwithstanding
                the above, the Users are prohibited from altering the Site or posting or transmitting any unlawful,
                threatening, libelous, defamatory, obscene, scandalous, inflammatory, profane material that could
                constitute or encourage conduct that would be considered a criminal offence, give rise to a civil
                liability or otherwise violate any law. Granules will cooperate with any law enforcement authorities or
                court order requesting or directing Granules to disclose the identity of anyone posting such information or
                materials. The User agrees to indemnify and hold Granules, its Affiliates, Directors, employees, consultants
                harmless from any claim, demand or damage, including reasonable attorney fees due to or arising out of the
                users conduct on Granules. In case of a change in control of Granules, Granules reserves the right to
                transfer the User Information to the new party.
              </p>
            </section>

            {/* PRODUCT INFORMATION. */}
            <section className="policy-section">
              <h2 className="policy-section-title">PRODUCT INFORMATION.</h2>
              <p className="policy-text">
                Products listed in the Information may not be available in all countries or may be available under a
                different brand name, in different strengths, or for different indications. Many of the products listed
                are available only by prescription through your local health care professional. Except as expressly stated
                and agreed upon in advance by Granules, no director, employee, agent, or representative of Granules, its
                subsidiaries and affiliates are engaged in rendering medical advice, diagnosis, treatment or other
                medical services that in any way create a physician-patient relationship.
              </p>
            </section>

            {/* NON-TRANSFERRABLE. */}
            <section className="policy-section">
              <h2 className="policy-section-title">NON-TRANSFERRABLE.</h2>
              <p className="policy-text">
                Users right to access the Site and related websites is strictly non-transferrable. Any password, right or
                access given to a User to obtain information or documents is not transferrable and remains the exclusive
                property of Granules.
              </p>
            </section>

            {/* NO ADVICE. */}
            <section className="policy-section">
              <h2 className="policy-section-title">NO ADVICE.</h2>
              <p className="policy-text">
                Nothing contained in the Information should be construed as medical, legal, investment, financial or other
                advice. Without limitation, nothing contained in the Information should replace medical advice, medical
                visits, or recommendations from health care providers.
              </p>
            </section>

            {/* LINKING TO US. */}
            <section className="policy-section">
              <h2 className="policy-section-title">LINKING TO US.</h2>
              <p className="policy-text">
                The User must first seek written permission from Granules if the User intends to use the Information or
                incorporate portions of the Information into a different site. The User is not allowed to link to Granules
                if the User is engaged in the publication or promotion of illegal, obscene, or offensive content, or if
                the link in any way negatively impacts the reputation of Granules. The Site may contain links to third-party
                web sites, which are provided as a convenience to the Users. These links are not under the control of
                Granules, and inclusion of any link does not imply endorsement by Granules of such web site. Granules or
                any of its Affiliates, Directors, employees, officers, consultants make no claim, and are not responsible
                for, any information found in such third-party web sites.
              </p>
            </section>

            {/* INDEMNITY, ASSUMPTION OF RISK. */}
            <section className="policy-section">
              <h2 className="policy-section-title">INDEMNITY, ASSUMPTION OF RISK.</h2>
              <p className="policy-text">
                The User assumes all risk for selection and use of the Information and content provided thereon. Although
                care has been taken to ensure completeness and accuracy of the content, Granules shall not be responsible
                for any errors, misstatements, inaccuracies or omissions regarding content delivered through the
                Information or any delays in or interruptions of such delivery. The User acknowledges that Granules: (a) has
                no control of or responsibility for the User’s use of the Information or content provided herein, (b) has
                no knowledge of the specific or unique circumstances under which the Information or content provided thereon
                may be used by the User, (c) undertakes no obligation to supplement or update content of the Information,
                and (d) has no liability to any person for any data or material, including personal and identifiable
                material, input on the Information by persons other than Granules. Granules shall not be liable to any
                person (including but not limited to the User and persons treated by or on behalf of the User) for, and the
                User agrees to indemnify and hold Granules, its affiliates, directors, employees and agents, harmless from
                any claims, lawsuits, proceedings, costs, attorneys’ fees, damages or other losses (collectively,
                &ldquo;Losses&rdquo;) arising out of or relating to (a) the User’s use of the Information or content
                provided thereon or any equipment furnished in connection therewith and (b) any data or material input on
                the service by User, in all cases including but not limited to losses for tort, personal injury, medical
                malpractice or product liability. Further, without limiting the foregoing, in no event shall Granules be
                liable for any special, incidental, consequential, or indirect damages, including damages for loss of
                profits, loss of business, even if Granules has been advised of the possibility of such damages.
              </p>
            </section>

            {/* LIMITATION OF LIABILITY. */}
            <section className="policy-section">
              <h2 className="policy-section-title">LIMITATION OF LIABILITY.</h2>
              <p className="policy-text">
                The use of the Site is at the risk of the User. Neither Granules nor its affiliates, agents or licensors
                shall be liable under any claim, demand or action arising out of or relating to the User’s use of the
                Information, nor Granules’ performance of (or failure to perform) any obligation under these Terms of Use,
                nor for direct, special, incidental or consequential damages, including, without limitation, damages due to
                lost profits or business interruption, or other damages, even if Granules, its affiliates, agents or
                licensors have been advised of the possibility of such loss or damages and whether or not such loss or
                damages is/are foreseeable and notwithstanding the failure of essential purpose of any limited remedy. In
                no event shall Granules, its affiliates, agents or licensors be liable to the User under these Terms of Use
                for any reason whatsoever. In no event shall Granules or any of its Affiliates, Directors, employees,
                officers, consultants, be liable for, directly or indirectly, any damages of any kind or nature, including
                without limitation, direct, indirect, incidental, consequential, or any claims or losses, whether
                foreseeable or not; or whether the User has been informed of the possibility in advance, resulting from or
                in connection with the creation or use of, or reliance in the Site, any other third-party site, the links
                contained in any site or the inability to use the Site. This limitation includes damage to your computer
                equipment or any viruses that may infect your computer equipment.
              </p>
            </section>

            {/* COPYRIGHT NOTICE */}
            <section className="policy-section">
              <h2 className="policy-section-title">COPYRIGHT NOTICE</h2>
              <p className="policy-text">
                This Site and its entire contents are subject to copyright protection. The contents of the Site should not
                be copied in anycircumstances without the prior express consent of Granules. Except as expressly authorized
                herein, the User should not display, download, distribute, reproduce, republish, or transmit any
                information, text, images, documents contained in the Site, without the express prior written consent of
                Granules.
              </p>
            </section>

            {/* GENERAL. */}
            <section className="policy-section">
              <h2 className="policy-section-title">GENERAL.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
                <div>
                  <h3 className="policy-section-title" style={{ fontSize: '17px', marginBottom: '6px' }}>
                    14.1 Governing Law and Dispute Resolution.
                  </h3>
                  <p className="policy-text">
                    These Terms of Use and the legal relations between the parties arising hereunder shall be governed by
                    and interpreted exclusively in accordance with the laws of India. Any dispute, controversy or claim
                    arising out of or relating to these Terms of Use shall be settled exclusively by reference to courts of
                    Hyderabad. By using this website, the User agrees to personal jurisdiction and venue in the courts in
                    Hyderabad, Telangana, India and waives any objection to such jurisdiction and venue.
                  </p>
                </div>

                <div>
                  <h3 className="policy-section-title" style={{ fontSize: '17px', marginBottom: '6px' }}>
                    14.2 Amendment.
                  </h3>
                  <p className="policy-text">
                    Granules shall be entitled to, at any time, without prior written notice to the User, modify these
                    Terms of Use. The User is bound by any such revisions and should therefore periodically visit this page
                    to review the most updated Terms of Use to which the User is bound.
                  </p>
                </div>

                <div>
                  <h3 className="policy-section-title" style={{ fontSize: '17px', marginBottom: '6px' }}>
                    14.3 Notices and Take Down Procedures.
                  </h3>
                  <p className="policy-text">
                    Any notices to Granules shall be in writing and delivered personally or by internationally reputed
                    courier service to: <strong>Granules India Limited, 15th Floor, Granules Tower, Botanical Garden Road, Kondapur, Hyderabad – 500084, Telangana, India.</strong> If the User has any queries in respect of the Information or believes that the Information (or any part thereof) infringe any copyright, the User may request removal of those materials (or access thereto) from the Information contacting Granules at{' '}
                    <a href="mailto:GrievanceOfficer@granulesindia.com" className="policy-link">
                      GrievanceOfficer@granulesindia.com
                    </a>
                    , provided that such User shall provide Granules with (a) details of the copyrighted work that is alleged to be infringed, (b) its location, (c) its URL (d) A statement that the User has a good faith belief that the complained of use of the materials is not authorized by the copyright owner, its agent, or the law, (e) A statement that the information that the User has supplied is accurate, and indicating that such statement is &ldquo;under penalty of perjury&rdquo; (f) A signature or the electronic equivalent from the copyright holder or authorized representative (g) or any other pertinent information that will allow Granules to locate and confirm the authenticity of the material.
                  </p>
                </div>

                <div>
                  <h3 className="policy-section-title" style={{ fontSize: '17px', marginBottom: '6px' }}>
                    14.4 Severability.
                  </h3>
                  <p className="policy-text">
                    If any part of these Terms of Use is for any reason found to be unenforceable, all other parts
                    nevertheless remain enforceable as long as a party’s rights under these Terms of Use are not materially
                    affected. If any part of these Terms of Use is held by a court or other tribunal of competent
                    jurisdiction to be void or unenforceable, such provisions will be limited or eliminated to the
                    minimum extent necessary and replaced with a valid provision that best embodies the intent of these
                    Terms of Use so that these Terms of Use will remain in full effect.
                  </p>
                </div>

                <div>
                  <h3 className="policy-section-title" style={{ fontSize: '17px', marginBottom: '6px' }}>
                    14.5 Complete Terms of Use.
                  </h3>
                  <p className="policy-text">
                    This Terms of Use is the complete and exclusive statement of the agreement between Information and the
                    User which supersedes any proposal or prior agreement, oral or written, and any other communications
                    between the parties in relation to the subject matter of this Terms of Use.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <CompanyFooter />
    </div>
  );
}

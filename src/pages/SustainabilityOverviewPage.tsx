import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import SustainabilityGoalsSection from '../components/sustainability/SustainabilityGoalsSection';
import SustainabilityKpisSection from '../components/sustainability/SustainabilityKpisSection';
import SustainabilityCarousel, { CarouselItem } from '../components/sustainability/SustainabilityCarousel';
import '../components/company/company.css';
import './sustainability.css';
import './overview.css';
import './investor.css';
import { toCdnPdf } from '../lib/pdf';

const S = '/assets/sustainability/';
const L = '/assets/leadership/';
const SUS_UPLOADS = 'https://granulesindia.com/sustainability/wp-content/uploads';

// Carousels Data (Images 3 & 4 - 5s auto-scroll)
const COMMITMENTS_CAROUSEL_ITEMS: CarouselItem[] = [
  { img: `${S}commitments-logo-image-013.webp`, alt: 'PSCI Supplier Partner' },
  { img: `${S}commitments-logo-image-012.webp`, alt: 'Science Based Targets' },
  { img: `${S}commitments-logo-image-019.webp`, alt: "In support of Women's Empowerment Principles" },
  { img: `${S}commitments-logo-image-018.webp`, alt: 'WE SUPPORT UN GLOBAL COMPACT' },
  { img: `${S}commitments-logo-image-0167.webp`, alt: 'National Safety Council MEMBER' },
  { img: `${S}commitments-logo-image-015.webp`, alt: 'British Safety Council Member' },
  { img: `${S}commitments-logo-image-014.webp`, alt: 'SMETA Sedex Members Ethical Trade Audit' },
];

const RATINGS_CAROUSEL_ITEMS: CarouselItem[] = [
  { img: `${S}Ratings-certifications-logo-image-0113.webp`, alt: 'MSCI ESG RATINGS BB' },
  { img: `${S}Ratings-certifications-logo-image-03.webp`, alt: 'EcoVadis GOLD Top 5%' },
  { img: `${S}Ratings-certifications-logo-image-04.webp`, alt: 'S&P Global CSA Score 2025 62/100' },
  { img: `${S}Ratings-certifications-logo-image-06.webp`, alt: 'Sedex SUPPLIER PLUS' },
  { img: `${S}Ratings-certifications-logo-image-09.webp`, alt: 'Bureau Veritas ZERO WASTE TO LANDFILL' },
  { img: `${S}Ratings-certifications-logo-image-08.webp`, alt: 'CII-TRIVENI WATER INSTITUTE Aspiring Water Positive Plant' },
  { img: `${S}Ratings-certifications-logo-image-0112.webp`, alt: 'CDP Discloser 2025' },
  { img: `${S}Ratings-certifications-logo-image-0114.webp`, alt: 'CDP Supplier Engagement Leader A 2025' },
];

const PARTNERS_CAROUSEL_ITEMS: CarouselItem[] = [
  { img: `${S}Partner-collaboration-platforms-logo-image-03.webp`, alt: 'Together For Sustainability (TfS)' },
  { img: `${S}Partner-collaboration-platforms-logo-image-02.webp`, alt: 'EcoVadis partner platform' },
  { img: `${S}Partner-collaboration-platforms-logo-image-05.webp`, alt: 'inspectorio' },
  { img: `${S}Partner-collaboration-platforms-logo-image-01.webp`, alt: 'ProjectGigaton' },
  { img: `${S}Partner-collaboration-platforms-logo-image-04.webp`, alt: 'Oren' },
];

// 3. Sustainability Policies (12 item grid)
const SUSTAINABILITY_POLICIES = [
  {
    title: 'Climate and Environmental Policy',
    meta: 'Next Review Dec 26',
    detail: 'Environmental Stewardship & Decarbonization Roadmap',
    pdf: `${SUS_UPLOADS}/2026/04/1.Climate-and-Environmental-Policy.pdf`,
    filename: '1.Climate-and-Environmental-Policy.pdf',
  },
  {
    title: 'Social Policy Standards',
    meta: 'Next Review Dec 26',
    detail: 'Labor Rights, Social Accountability & Workplace Equality',
    pdf: `${SUS_UPLOADS}/2026/04/2.Social-Policy.pdf`,
    filename: '2.Social-Policy.pdf',
  },
  {
    title: 'Business Ethics Policy',
    meta: 'Next Review Dec 26',
    detail: 'Corporate Governance & Anti-Corruption Framework',
    pdf: `${SUS_UPLOADS}/2026/04/3.Business-Ethics-Policy.pdf`,
    filename: '3.Business-Ethics-Policy.pdf',
  },
  {
    title: 'Sustainable Procurement Policy',
    meta: 'Next Review Dec 26',
    detail: 'Responsible Sourcing, Supplier Standards & ESG Criteria',
    pdf: `${SUS_UPLOADS}/2026/04/4.Sustainable-Procurement-Policy.pdf`,
    filename: '4.Sustainable-Procurement-Policy.pdf',
  },
  {
    title: 'Sustainability Policy',
    meta: 'Next Review Dec 26',
    detail: 'Board-Approved ESG Commitment & Value Creation',
    pdf: `${SUS_UPLOADS}/2026/04/5.Sustainability-Policy.pdf`,
    filename: '5.Sustainability-Policy.pdf',
  },
  {
    title: 'EHS Policy Framework',
    meta: 'Updated on April 2026',
    detail: 'Environment, Health & Safety Zero-Harm Standards',
    pdf: `${SUS_UPLOADS}/2026/04/Granules-EHS-Wellness-Policy-_-Apr-2026.pdf`,
    filename: 'Granules-EHS-Wellness-Policy-_-Apr-2026.pdf',
  },
  {
    title: 'Supplier Code of Conduct',
    meta: 'Next Review Dec 26',
    detail: 'Vendor Compliance & Supply Chain Integrity Guidelines',
    pdf: `${SUS_UPLOADS}/2026/04/7.Supplier-Code-of-Conduct.pdf`,
    filename: '7.Supplier-Code-of-Conduct.pdf',
  },
  {
    title: 'Business Code of Conduct',
    meta: 'Next Review Dec 26',
    detail: 'Senior Management & Board Ethical Conduct',
    pdf: `${SUS_UPLOADS}/2026/04/8.Business-code-of-Conduct.pdf`,
    filename: '8.Business-code-of-Conduct.pdf',
  },
  {
    title: 'Biodiversity and Afforestation Policy',
    meta: 'Next Review Dec 26',
    detail: 'Ecosystem Protection, Native Green Belts & Tree Planting',
    pdf: `${SUS_UPLOADS}/2026/04/9.Biodiversity-and-Afforestation-Policy.pdf`,
    filename: '9.Biodiversity-and-Afforestation-Policy.pdf',
  },
  {
    title: 'Tax Policy Framework',
    meta: 'Next Review Jan 28',
    detail: 'Fiscal Transparency, Governance & Statutory Compliance',
    pdf: `${SUS_UPLOADS}/2026/04/10.Tax-Policy.pdf`,
    filename: '10.Tax-Policy.pdf',
  },
  {
    title: 'Human Rights Policy',
    meta: 'Next Review Jan 28',
    detail: 'Fair Labor, Anti-Discrimination & Dignity at Work',
    pdf: `${SUS_UPLOADS}/2026/04/11.Human-Rights-Policy.pdf`,
    filename: '11.Human-Rights-Policy.pdf',
  },
  {
    title: 'Grievance Redressal Policy',
    meta: 'Next Review Jan 28',
    detail: 'Independent Stakeholder Dispute Resolution Mechanism',
    pdf: `${SUS_UPLOADS}/2026/04/12.-Grievance-Redressal-Policy.pdf`,
    filename: '12.-Grievance-Redressal-Policy.pdf',
  },
];

// 4. Reports & Disclosures
const REPORTS_DISCLOSURES = [
  {
    title: 'Integrated Annual Report FY 25-26',
    meta: 'Integrated Sustainability & Corporate Overview',
    period: 'FY 2025–26',
    pdf: `${SUS_UPLOADS}/2026/07/Integrated-Annual-Report-FY-25-26.pdf`,
    filename: 'Integrated-Annual-Report-FY-25-26.pdf',
  },
  {
    title: 'Business Responsibility & Sustainability Report FY 25-26',
    meta: 'BRSR Mandatory Statutory Filing',
    period: 'FY 2025–26',
    pdf: `${SUS_UPLOADS}/2026/07/Business-Responsibility-Sustainability-Report-FY-25-26.pdf`,
    filename: 'Business-Responsibility-Sustainability-Report-FY-25-26.pdf',
  },
  {
    title: 'ESG Supplementary Report FY 25-26',
    meta: 'Available Soon',
    period: 'FY 2025–26',
    pdf: null,
    filename: '',
  },
  {
    title: 'Integrated Annual Sustainability Report FY 24-25',
    meta: 'Complete Sustainability Disclosure',
    period: 'FY 2024–25',
    pdf: `${SUS_UPLOADS}/2026/08/1.Integrated-Annual-Report-FY-2024-25.pdf`,
    filename: '1.Integrated-Annual-Report-FY-2024-25.pdf',
  },
  {
    title: 'Business Responsibility and Sustainability Report FY 24-25',
    meta: 'SEBI BRSR Comprehensive Disclosure',
    period: 'FY 2024–25',
    pdf: `${SUS_UPLOADS}/2026/04/2.Business-Responsibility-And-Sustainability-Report-FY-24-25.pdf`,
    filename: '2.Business-Responsibility-And-Sustainability-Report-FY-24-25.pdf',
  },
  {
    title: 'Sustainability Report FY 23-24',
    meta: 'GRI Standards & Sustainability Report',
    period: 'FY 2023–24',
    pdf: `${SUS_UPLOADS}/2026/04/3.-Sustainability-report-23-24.pdf`,
    filename: '3.-Sustainability-report-23-24.pdf',
  },
  {
    title: 'TCFD Report',
    meta: 'Task Force on Climate-Related Financial Disclosures',
    period: 'Annual Filing',
    pdf: `${SUS_UPLOADS}/2026/04/4.TCFD-Report.pdf`,
    filename: '4.TCFD-Report.pdf',
  },
  {
    title: 'Net Zero Roadmap',
    meta: 'Science-Based Targets & Decarbonization Strategy',
    period: 'Target 2050',
    pdf: `${SUS_UPLOADS}/2026/04/5.Net-Zero-Road-Map.pdf`,
    filename: '5.Net-Zero-Road-Map.pdf',
  },
  {
    title: 'UNGC – Communication on Progress Report FY 24-25',
    meta: 'United Nations Global Compact CoP',
    period: 'FY 2024–25',
    pdf: `${SUS_UPLOADS}/2026/04/6.UNGC-Communication-on-Progress-Report-FY-24-25.pdf`,
    filename: '6.UNGC-Communication-on-Progress-Report-FY-24-25.pdf',
  },
  {
    title: 'UNGC – Communication on Progress Report FY 23-24',
    meta: 'United Nations Global Compact CoP',
    period: 'FY 2023–24',
    pdf: `${SUS_UPLOADS}/2026/04/7.UNGC-Communication-on-Progress-Report-FY-23-24.pdf`,
    filename: '7.UNGC-Communication-on-Progress-Report-FY-23-24.pdf',
  },
  {
    title: 'Biodiversity Assessment Report (Bonthapally Unit)',
    meta: 'Local Ecosystem & Habitat Assessment',
    period: 'Annual Audit',
    pdf: `${SUS_UPLOADS}/2026/04/8.-Biodiversity-Assessment-Report-Bonthapally-Unit.pdf`,
    filename: '8.-Biodiversity-Assessment-Report-Bonthapally-Unit.pdf',
  },
  {
    title: 'GHG Inventorization Methodology FY 25-26',
    meta: 'Scope 1, 2, and 3 Accounting Criteria',
    period: 'FY 2025–26',
    pdf: `${SUS_UPLOADS}/2026/07/GHG-Inventorization-Methodology-FY-25-26.pdf`,
    filename: 'GHG-Inventorization-Methodology-FY-25-26.pdf',
  },
  {
    title: 'GHG Inventorization Methodology FY 24-25',
    meta: 'GHG Protocol Standard Alignment',
    period: 'FY 2024–25',
    pdf: `${SUS_UPLOADS}/2026/08/GHG-Inventorization-Methodology-FY-24-25.pdf`,
    filename: 'GHG-Inventorization-Methodology-FY-24-25.pdf',
  },
  {
    title: 'World Environment Day 2026 Celebrations Souvenir',
    meta: 'Employee Engagement & Green Initiatives',
    period: 'June 2026',
    pdf: `${SUS_UPLOADS}/2026/08/World-Environment-Day2026-Celebrations-Souvenir.pdf`,
    filename: 'World-Environment-Day2026-Celebrations-Souvenir.pdf',
  },
  {
    title: 'Granules National Safety Day Celebrations 2026 Souvenir',
    meta: 'Zero Harm Culture & EHS Excellence',
    period: 'March 2026',
    pdf: `${SUS_UPLOADS}/2026/08/Granules-National-Safety-Day-Celebrations-2026-Souvenir.pdf`,
    filename: 'Granules-National-Safety-Day-Celebrations-2026-Souvenir.pdf',
  },
];

// 5. Assurance & Verification Reports
const ASSURANCE_REPORTS = [
  {
    title: 'Sustainability Assurance (GRI/IR) Report FY 25-26',
    meta: 'Independent External Verification',
    period: 'FY 2025–26',
    pdf: `${SUS_UPLOADS}/2026/07/Sustainability-Assurance-GRIIR-Report-FY-25-26.pdf`,
    filename: 'Sustainability-Assurance-GRIIR-Report-FY-25-26.pdf',
  },
  {
    title: 'Business Responsibility and Sustainability (BRSR) Assurance Report FY 25-26',
    meta: 'Reasonable Assurance Statement',
    period: 'FY 2025–26',
    pdf: `${SUS_UPLOADS}/2026/07/Business-Responsibility-and-Sustainability-BRSR-Assurance-Report-FY-25-26.pdf`,
    filename: 'Business-Responsibility-and-Sustainability-BRSR-Assurance-Report-FY-25-26.pdf',
  },
  {
    title: 'GHG Verification Report FY 25-26',
    meta: 'ISO 14064-3 Carbon Verification',
    period: 'FY 2025–26',
    pdf: `${SUS_UPLOADS}/2026/07/GHG-Verification-Report-FY-25-26.pdf`,
    filename: 'GHG-Verification-Report-FY-25-26.pdf',
  },
  {
    title: 'Sustainability Assurance (GRI/IR) Report FY 24-25',
    meta: 'Independent Assurance Opinion',
    period: 'FY 2024–25',
    pdf: `${SUS_UPLOADS}/2026/04/1.1-Sustainability-AssuranceGRIIR-Report-FY-24-25.pdf`,
    filename: '1.1-Sustainability-AssuranceGRIIR-Report-FY-24-25.pdf',
  },
  {
    title: 'BR and Sustainability (BRSR) Assurance Report FY 24-25',
    meta: 'Statutory Assurance Statement',
    period: 'FY 2024–25',
    pdf: `${SUS_UPLOADS}/2026/04/1.2-Business-Responsibility-and-Sustainability-BRSR-Assurance-Report-FY-2024-25.pdf`,
    filename: '1.2-Business-Responsibility-and-Sustainability-BRSR-Assurance-Report-FY-2024-25.pdf',
  },
  {
    title: 'GHG Verification Report FY 24-25',
    meta: 'Third-Party GHG Emissions Audit',
    period: 'FY 2024–25',
    pdf: `${SUS_UPLOADS}/2026/04/1.3-GHG-Verification-Report-FY-2024-25.pdf`,
    filename: '1.3-GHG-Verification-Report-FY-2024-25.pdf',
  },
  {
    title: 'Sustainability Assurance (GRI/IR) Report FY 23-24',
    meta: 'GRI External Assurance',
    period: 'FY 2023–24',
    pdf: `${SUS_UPLOADS}/2026/04/2.1-SR-Assurance-GIL-Report-_FY-23-24.pdf`,
    filename: '2.1-SR-Assurance-GIL-Report-_FY-23-24.pdf',
  },
  {
    title: 'BRSR + GRI Assurance Report FY 22-23',
    meta: 'Assurance Statement',
    period: 'FY 2022–23',
    pdf: `${SUS_UPLOADS}/2026/08/BRSRGRI-Assurance-Report_FY-22-23.pdf`,
    filename: 'BRSRGRI-Assurance-Report_FY-22-23.pdf',
  },
  {
    title: 'BRSR & Sustainability Report Assurance (GRI) Report FY 23-24',
    meta: 'Comprehensive Verification',
    period: 'FY 2023–24',
    pdf: `${SUS_UPLOADS}/2026/04/2.2-BRSR-Assurance-GIL-Report-_FY-23-24.pdf`,
    filename: '2.2-BRSR-Assurance-GIL-Report-_FY-23-24.pdf',
  },
  {
    title: 'GHG Verification Report FY 23-24',
    meta: 'Carbon Audit',
    period: 'FY 2023–24',
    pdf: `${SUS_UPLOADS}/2026/04/2.3-GHG-Verification-Report-FY-23-24.pdf`,
    filename: '2.3-GHG-Verification-Report-FY-23-24.pdf',
  },
  {
    title: 'GHG Verification Report FY 22-23',
    meta: 'Baseline Verification Statement',
    period: 'FY 2022–23',
    pdf: `${SUS_UPLOADS}/2026/04/3.2-GHG-Verification-Report_-FY-22-23.pdf`,
    filename: '3.2-GHG-Verification-Report_-FY-22-23.pdf',
  },
];

// 6. Commitments, Memberships & Ratings
const COMMITMENTS_DATA = [
  {
    title: 'United Nations Global Compact (UNGC)',
    meta: 'Signatory to 10 Universal Principles',
    period: 'Member Since Sep 2023',
    pdf: `${SUS_UPLOADS}/2026/06/UNGC-Participation-Certificate-Granules_FY-26-27.pdf`,
    filename: 'UNGC-Participation-Certificate-Granules_FY-26-27.pdf',
  },
  {
    title: 'Pharmaceutical Supply Chain Initiative (PSCI)',
    meta: 'Supplier Partner Member Framework',
    period: 'Partner Since July 2025',
    pdf: `${SUS_UPLOADS}/2026/07/Pharmaceutical-Supply-Chain-Initiative-PSCI-Supplier-Partner.pdf`,
    filename: 'Pharmaceutical-Supply-Chain-Initiative-PSCI-Supplier-Partner.pdf',
  },
  {
    title: "UN Women's Empowerment Principles (UN-WEP)",
    meta: 'Signatory to Gender Equality Principles',
    period: 'Signatory Since Dec 2025',
    pdf: `${SUS_UPLOADS}/2026/04/3.UN-Womens-Principles-UN-WEP.pdf`,
    filename: '3.UN-Womens-Principles-UN-WEP.pdf',
  },
  {
    title: 'National Safety Council (NSC)',
    meta: 'Corporate Safety & Health Membership',
    period: 'Member Since June 2025',
    pdf: `${SUS_UPLOADS}/2026/07/National-Safety-Council-NSC.pdf`,
    filename: 'National-Safety-Council-NSC.pdf',
  },
  {
    title: 'SEDEX Supplier Plus Membership',
    meta: 'Ethical Supply Chain & Labor Standards',
    period: 'Valid till Oct 2026',
    pdf: `${SUS_UPLOADS}/2026/04/6.SEDEX-Supplier-Plus-Membership.pdf`,
    filename: '6.SEDEX-Supplier-Plus-Membership.pdf',
  },
  {
    title: 'British Safety Council (BSC)',
    meta: 'International Occupational Health & Safety',
    period: 'Member Since June 2025',
    pdf: `${SUS_UPLOADS}/2026/04/4.British-Safety-Council-BSC.zip`,
    filename: '4.British-Safety-Council-BSC.zip',
  },
];

const RATINGS_DATA = [
  {
    title: 'EcoVadis Sustainability Rating',
    meta: 'Gold Rating, 79/100 (97th percentile)',
    period: 'Updated on May 2025',
    pdf: `${SUS_UPLOADS}/2026/04/1.Ecovadis.pdf`,
    filename: '1.Ecovadis.pdf',
  },
  {
    title: 'CDP Climate Change, Water Security & Forest',
    meta: 'Scores A / B / B-',
    period: 'Updated on Dec 2025',
    pdf: `${SUS_UPLOADS}/2026/04/2.CDP-Climate-Change-Water-Security-Forest.pdf`,
    filename: '2.CDP-Climate-Change-Water-Security-Forest.pdf',
  },
  {
    title: 'S&P Global CSA',
    meta: 'Climate Change, Water Security & Forest — 62/100',
    period: 'Updated on Feb 2026',
    pdf: `${SUS_UPLOADS}/2026/04/3.SP-Global-CSA-2025.pdf`,
    filename: '3.SP-Global-CSA-2025.pdf',
  },
  {
    title: 'CDP Supplier Engagement Leader',
    meta: 'A List',
    period: 'Updated on May 2025',
    pdf: `${SUS_UPLOADS}/2026/04/4.CDP-Supplier-Engagement-Leader.pdf`,
    filename: '4.CDP-Supplier-Engagement-Leader.pdf',
  },
  {
    title: 'SBTi Approval',
    meta: 'Near-term, long-term, and Net Zero targets aligned to 1.5°C',
    period: 'Targets Approved on Nov 2024',
    pdf: `${SUS_UPLOADS}/2026/04/5.SBTi-Approval.pdf`,
    filename: '5.SBTi-Approval.pdf',
  },
];

// 7. Certifications Table
interface CertItem {
  category: string;
  facility: string;
  validity: string;
  pdf: string | null;
  filename?: string;
}

const CERTIFICATIONS: CertItem[] = [
  {
    category: 'ISO 37001 - Anti-bribery management systems (ABMS)',
    facility: 'Granules India Limited (Group)',
    validity: '-',
    pdf: null,
  },
  {
    category: 'ISO 20400 - Sustainability Procurement',
    facility: 'Granules India Limited (Group)',
    validity: '-',
    pdf: null,
  },
  {
    category: 'Zero Waste To Landfill (ZWTL) Certification',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Issued on Dec 25',
    pdf: `${SUS_UPLOADS}/2026/04/Zero-Waste-To-Landfill-ZWTL-Certification-GGP.pdf`,
    filename: 'Zero-Waste-To-Landfill-ZWTL-Certification-GGP.pdf',
  },
  {
    category: 'Water Neutrality Certification',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Issued On Nov 25',
    pdf: `${SUS_UPLOADS}/2026/04/Water-Neutrality-Certificate-Aspiring_Gagillapur.pdf`,
    filename: 'Water-Neutrality-Certificate-Aspiring_Gagillapur.pdf',
  },
  {
    category: 'Water Neutrality Certification',
    facility: 'GIL – Bonthapally Unit -1',
    validity: 'Issued On Nov 25',
    pdf: `${SUS_UPLOADS}/2026/04/Water-Neutrality-Certificate-Aspiring_Bonthapally-Unit-1-.pdf`,
    filename: 'Water-Neutrality-Certificate-Aspiring_Bonthapally-Unit-1-.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Valid Till July 2027',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-14001_Gagillapur.pdf`,
    filename: 'ISO-14001_Gagillapur.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 1, Bonthapally',
    validity: 'Valid Till April 2029',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-14001_Bonthapally-Unit-1.pdf`,
    filename: 'ISO-14001_Bonthapally-Unit-1.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 2, Jeedimetla',
    validity: 'Valid Till May 2027',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-14001_Jeedimetla-Unit-2.pdf`,
    filename: 'ISO-14001_Jeedimetla-Unit-2.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 4, Parawada',
    validity: 'Valid Till Dec 2027',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-14001-_Unit-4-Vizag.pdf`,
    filename: 'ISO-14001-_Unit-4-Vizag.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 5, Parawada',
    validity: 'Valid Till Feb 2028',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-14001_Unit-5-Vizag.pdf`,
    filename: 'ISO-14001_Unit-5-Vizag.pdf',
  },
  {
    category: 'ISO 45001 - Occupational health and safety (OH&S) management systems',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Valid Till Aug 2028',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-45001_Gagillapur.pdf`,
    filename: 'ISO-45001_Gagillapur.pdf',
  },
  {
    category: 'ISO 45001 - Occupational health and safety (OH&S) management systems',
    facility: 'GIL – Unit 1, Bonthapally',
    validity: 'Valid Till Oct 2028',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-45001_Bonthapally-Unit-1.pdf`,
    filename: 'ISO-45001_Bonthapally-Unit-1.pdf',
  },
  {
    category: 'ISO 45001 - Occupational health and safety (OH&S) management systems',
    facility: 'GIL – Unit 2, Jeedimetla',
    validity: 'Valid Till July 2027',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-45001_Jeedimetla-Unit-2.pdf`,
    filename: 'ISO-45001_Jeedimetla-Unit-2.pdf',
  },
  {
    category: 'ISO 45001 - Occupational health and safety (OH&S) management systems',
    facility: 'GIL – Unit 4, Parawada',
    validity: 'Valid Till Dec 2027',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-45001-_Unit-4-Vizag.pdf`,
    filename: 'ISO-45001-_Unit-4-Vizag.pdf',
  },
  {
    category: 'ISO 45001 - Occupational health and safety (OH&S) management systems',
    facility: 'GIL – Unit 5, Parawada',
    validity: 'Valid Till Feb 2028',
    pdf: `${SUS_UPLOADS}/2026/04/ISO-45001_Unit-5-Vizag.pdf`,
    filename: 'ISO-45001_Unit-5-Vizag.pdf',
  },
  {
    category: 'Social Accountability 8000',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Valid Till Dec 2028',
    pdf: `${SUS_UPLOADS}/2026/04/SA-8000-Compliance-Certificate_GGP.pdf`,
    filename: 'SA-8000-Compliance-Certificate_GGP.pdf',
  },
  {
    category: 'Social Accountability 8000',
    facility: 'GIL – Unit 1, Bonthapally',
    validity: 'Valid Till July 2028',
    pdf: `${SUS_UPLOADS}/2026/07/SA-8000-Compliance-Certificate-Bonthapally-Unit.pdf`,
    filename: 'SA-8000-Compliance-Certificate-Bonthapally-Unit.pdf',
  },
  {
    category: 'Social Accountability 8000',
    facility: 'GIL – Unit 2, Jeedimetla',
    validity: 'Valid Till July 2028',
    pdf: `${SUS_UPLOADS}/2026/04/SA-8000-Compliance-Certificate-_Jeedimetla-Unit.pdf`,
    filename: 'SA-8000-Compliance-Certificate-_Jeedimetla-Unit.pdf',
  },
  {
    category: 'Social Accountability 8000',
    facility: 'GIL – Unit 4, Parawada',
    validity: 'Valid Till Jan 2029',
    pdf: `${SUS_UPLOADS}/2026/07/SA-8000-Compliance-Certificate_VIZAG-IV.pdf`,
    filename: 'SA-8000-Compliance-Certificate_VIZAG-IV.pdf',
  },
  {
    category: 'Social Accountability 8000',
    facility: 'GIL – Unit 5, Parawada',
    validity: 'Valid Till Jan 2029',
    pdf: `${SUS_UPLOADS}/2026/04/SA-8000-Compliance-Certificate_VIZAG-V.pdf`,
    filename: 'SA-8000-Compliance-Certificate_VIZAG-V.pdf',
  },
  {
    category: 'Social Accountability 8000',
    facility: 'GRANULES LIFE SCIENCES, Lalgadimalakpet',
    validity: 'Valid Till Oct 2028',
    pdf: `${SUS_UPLOADS}/2026/07/SA-8000-Compliance-Certificate_GLS.pdf`,
    filename: 'SA-8000-Compliance-Certificate_GLS.pdf',
  },
];

export default function SustainabilityOverviewPage() {
  const [membershipTab, setMembershipTab] = useState<'commitments' | 'ratings'>('commitments');

  const groupedCertifications = useMemo(() => {
    const groups: { category: string; items: CertItem[] }[] = [];
    CERTIFICATIONS.forEach((cert) => {
      let group = groups.find((g) => g.category === cert.category);
      if (!group) {
        group = { category: cert.category, items: [] };
        groups.push(group);
      }
      group.items.push(cert);
    });
    return groups;
  }, []);

  useEffect(() => {
    document.title = 'Sustainability Overview — Granules India';
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  interface DocRowItem {
    title: string;
    detail?: string;
    period?: string;
    pdf?: string | null;
    filename?: string;
    href?: string;
  }

  const renderDocTable = (
    items: DocRowItem[],
    col1 = 'Document / Report Name',
    col2: string | null = 'Framework / Scope',
    col3: string | null = 'Review / Period'
  ) => (
    <div className="inv-table-wrap">
      <table className="inv-data-table">
        <thead>
          <tr>
            <th style={!col2 && !col3 ? { width: '80%' } : !col2 ? { width: '56%' } : undefined}>{col1}</th>
            {col2 && <th>{col2}</th>}
            {col3 && <th style={!col2 ? { width: '24%' } : undefined}>{col3}</th>}
            <th style={{ textAlign: 'right', width: !col2 && !col3 ? '20%' : !col2 ? '20%' : undefined }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={idx}>
              <td className="inv-table-title-cell">{row.title}</td>
              {col2 && <td className="inv-table-detail-cell">{row.detail}</td>}
              {col3 && <td className="inv-table-period-cell">{row.period}</td>}
              <td className="inv-table-action-cell">
                {row.href ? (
                  <Link className="inv-action-link" to={row.href} title={`View ${row.title}`}>
                    VIEW
                  </Link>
                ) : row.pdf ? (
                  <div className="inv-table-actions">
                    <a
                      className="inv-action-link"
                      href={toCdnPdf(row.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`View ${row.title} in a new tab`}
                    >
                      VIEW
                    </a>
                    <span className="inv-action-slash">/</span>
                    <a
                      className="inv-action-link"
                      href={toCdnPdf(row.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={row.filename || `${row.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`}
                      title={`Download ${row.title}`}
                    >
                      DOWNLOAD
                    </a>
                  </div>
                ) : (
                  <span className="inv-table-btn inv-table-btn--disabled">Available Soon</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <Link to="/">HOME</Link>
        <span className="sep">›</span>
        <span className="current">SUSTAINABILITY</span>
      </p>

      <section className="sus-lead-hero-wrap" style={{ marginTop: 'clamp(30px, 4vw, 50px)' }}>
        {/* Quick Jump Cards with ESG World beside Certifications */}
        <div className="sus-jump-nav-grid" role="navigation" aria-label="Jump to sustainability document sections">
          <button
            type="button"
            className="sus-jump-card"
            onClick={() => scrollToSection('sec-policies')}
          >
            <span className="sus-jump-label">Policies</span>
            <span className="sus-jump-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="sus-jump-card"
            onClick={() => scrollToSection('sec-reports')}
          >
            <span className="sus-jump-label">Reports &amp; Disclosures</span>
            <span className="sus-jump-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="sus-jump-card"
            onClick={() => scrollToSection('sec-assurance')}
          >
            <span className="sus-jump-label">Assurance &amp; Verification Report</span>
            <span className="sus-jump-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="sus-jump-card"
            onClick={() => scrollToSection('sec-commitments')}
          >
            <span className="sus-jump-label">Commitments, Memberships &amp; Ratings</span>
            <span className="sus-jump-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="sus-jump-card"
            onClick={() => scrollToSection('sec-certifications')}
          >
            <span className="sus-jump-label">Certifications</span>
            <span className="sus-jump-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
          </button>

          <Link
            to="/sustainability/ehs-documents"
            className="sus-jump-card"
            title="View Statutory EHS Documents & Submissions"
          >
            <span className="sus-jump-label">EHS Documents</span>
            <span className="sus-jump-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </Link>

          <Link
            to="/sustainability/esg-profile"
            className="sus-jump-card sus-jump-card--esg"
            title="View Granules ESG Profile on ESG World"
          >
            <img
              src="/assets/esg/esg-world-logo.png"
              alt="ESG World - Our ESG Profile"
              className="sus-jump-esg-img"
            />
          </Link>
        </div>

        {/* Leadership Speech Banner matching reference image */}
        <div className="ov-leadership" style={{ width: '100%', maxWidth: '100%', margin: '0' }}>
          <img
            className="ov-leadership-bg"
            src="/assets/sustainability/leadership-bg.webp"
            alt=""
            loading="eager"
            decoding="async"
          />
          <div className="ov-leadership-overlay" />
          <img
            className="ov-leadership-person"
            src="/assets/sustainability/leadership-portrait.webp"
            alt="Dr. Krishna Prasad Chigurupati"
            loading="eager"
            decoding="async"
          />
          <div className="ov-quote-card">
            <div className="ov-quote-mark" aria-hidden="true">
              <svg width="46" height="34" viewBox="0 0 36 28" fill="#0061f8">
                <path d="M0 16.5C0 7.387 6.188 0 15.188 0v6.188c-4.95 0-7.875 3.375-8.438 7.312h8.438V28H0V16.5zm20.812 0C20.812 7.387 27 0 36 0v6.188c-4.95 0-7.875 3.375-8.438 7.312H36V28H20.812V16.5z" />
              </svg>
            </div>
            <p className="ov-quote-text p4">
              The pharmaceutical industry has a dual responsibility: to heal lives and the planet. At Granules, sustainability is not an add-on. It is the core of our business.
            </p>
            <p className="ov-quote-name p3">Dr. Krishna Prasad Chigurupati</p>
            <p className="ov-quote-role p4">CHAIRMAN AND MANAGING DIRECTOR</p>
          </div>
        </div>
      </section>

      {/* Section 1: Sustainability Goals and Targets (Image 1) */}
      <SustainabilityGoalsSection />

      {/* Section 2: Key Performance Indicators - Progressing With Purpose (Image 2) */}
      <SustainabilityKpisSection />

      {/* Section 3: Commitments Carousel (Image 3) */}
      <SustainabilityCarousel
        title="Commitments"
        items={COMMITMENTS_CAROUSEL_ITEMS}
        visibleDesktop={4}
        visibleTablet={3}
        visibleMobile={2}
        autoPlayInterval={5000}
      />

      {/* Section 4: Ratings & Certifications Carousel (Images 3 & 4) */}
      <SustainabilityCarousel
        title="Ratings & Certifications"
        items={RATINGS_CAROUSEL_ITEMS}
        visibleDesktop={6}
        visibleTablet={4}
        visibleMobile={2}
        autoPlayInterval={5000}
      />

      {/* Section 5: Partner Collaboration Platforms Carousel (Image 4) */}
      <SustainabilityCarousel
        title="Partner Collaboration Platforms"
        items={PARTNERS_CAROUSEL_ITEMS}
        visibleDesktop={4}
        visibleTablet={3}
        visibleMobile={2}
        autoPlayInterval={5000}
      />


      {/* Section 1 Anchor: Sustainability Policies */}
      <section id="sec-policies" className="sus-doc-section">
        <div className="sus-section-header-center">
          <h2>Sustainability Policies</h2>
          <p>
            We are committed to responsible growth that upholds the highest standards of
            sustainability. Our comprehensive suite of sustainability policies reflects our
            dedication to Environmental, Social, and Governance principles. These policies guide
            every aspect of our operations, enabling us to create lasting, positive impacts on our
            stakeholders, the environment, and the communities we serve.
          </p>
        </div>

        {renderDocTable(
          SUSTAINABILITY_POLICIES.map((item) => ({
            title: item.title,
            period: item.meta,
            pdf: item.pdf,
            filename: item.filename,
          })),
          'Policy / Document Name',
          null,
          'Review Timeline'
        )}
      </section>


      {/* Section 2 Anchor: Reports & Disclosures */}
      <section id="sec-reports" className="sus-doc-section">
        <div className="sus-section-header-center">
          <h2>Reports &amp; Disclosures</h2>
          <p>
            Comprehensive statutory and voluntary disclosures covering Integrated Reports,
            Business Responsibility and Sustainability Reports (BRSR), TCFD analysis, and GHG
            accounting.
          </p>
        </div>

        {renderDocTable(
          REPORTS_DISCLOSURES.map((item) => ({
            title: item.title,
            pdf: item.pdf,
            filename: item.filename,
          })),
          'Report / Disclosure Name',
          null,
          null
        )}
      </section>

      {/* Section 3 Anchor: Assurance & Verification Report */}
      <section id="sec-assurance" className="sus-doc-section">
        <div className="sus-section-header-center">
          <h2>Assurance &amp; Verification Report</h2>
          <p>
            Independent third-party assurance opinions and carbon verification statements
            confirming the integrity of our environmental, social, and ESG reporting.
          </p>
        </div>

        {renderDocTable(
          ASSURANCE_REPORTS.map((item) => ({
            title: item.title,
            pdf: item.pdf,
            filename: item.filename,
          })),
          'Statement / Assurance Report',
          null,
          null
        )}
      </section>

      {/* Section 4 Anchor: Commitments, Memberships & Ratings */}
      <section id="sec-commitments" className="sus-doc-section">
        <div className="sus-section-header-center">
          <h2>Commitments, Memberships And Ratings</h2>
          <p>
            We are committed to responsible growth that upholds the highest standards of
            sustainability. Our global alliances and external ratings reflect third-party validation
            of our sustainable leadership.
          </p>
        </div>

        {/* Tab switch between Commitments and Ratings */}
        <div className="ld-tabs-wrap">
          <div className="ld-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={membershipTab === 'commitments'}
              className={`ld-tab-btn ${membershipTab === 'commitments' ? 'active' : ''}`}
              onClick={() => setMembershipTab('commitments')}
            >
              Commitments &amp; Membership
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={membershipTab === 'ratings'}
              className={`ld-tab-btn ${membershipTab === 'ratings' ? 'active' : ''}`}
              onClick={() => setMembershipTab('ratings')}
            >
              Ratings &amp; Accreditations
            </button>
            <div
              className="ld-tab-indicator"
              style={{
                transform: membershipTab === 'commitments' ? 'translateX(0%)' : 'translateX(100%)',
              }}
            />
          </div>
        </div>

        {renderDocTable(
          (membershipTab === 'commitments' ? COMMITMENTS_DATA : RATINGS_DATA).map((item) => ({
            title: item.title,
            detail: item.meta,
            period: item.period || (membershipTab === 'commitments' ? 'Global Charter' : 'External Rating'),
            pdf: item.pdf,
            filename: item.filename,
          })),
          membershipTab === 'commitments' ? 'Charter / Alliance' : 'Agency / Standard',
          membershipTab === 'commitments' ? null : 'Score / Achievement',
          membershipTab === 'commitments' ? 'Status / Timeline' : 'Validity'
        )}
      </section>

      {/* Section 5 Anchor: Certifications Table */}
      <section id="sec-certifications" className="sus-doc-section">
        <div className="sus-section-header-center">
          <h2>Certifications</h2>
          <p>
            International accreditations and site-specific certifications across Environmental
            Management (ISO 14001), Occupational Safety (ISO 45001), and Social Accountability (SA 8000).
          </p>
        </div>

        <div className="sus-cert-groups">
          {groupedCertifications.map((group) => (
            <div key={group.category} className="sus-cert-card">
              <div className="sus-cert-header">
                <h3 className="sus-cert-title">{group.category}</h3>
              </div>
              <div className="sus-cert-table-wrap">
                <table className="sus-cert-table">
                  <tbody>
                    {group.items.map((cert, idx) => (
                      <tr key={idx}>
                        <td className="sus-cert-facility">{cert.facility}</td>
                        <td className="sus-cert-validity">{cert.validity}</td>
                        <td className="sus-cert-actions">
                          {cert.pdf ? (
                            <div className="inv-table-actions">
                              <a
                                className="inv-action-link"
                                href={toCdnPdf(cert.pdf)}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`View ${cert.category} - ${cert.facility}`}
                              >
                                VIEW
                              </a>
                              <span className="inv-action-slash">/</span>
                              <a
                                className="inv-action-link"
                                href={toCdnPdf(cert.pdf)}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={cert.filename || `${cert.facility.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`}
                                title={`Download ${cert.category} - ${cert.facility}`}
                              >
                                DOWNLOAD
                              </a>
                            </div>
                          ) : (
                            <span className="sus-cert-soon">
                              Download (Available Soon)
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA to Strategy */}
      <div className="sus-cta" style={{ width: '85%', margin: 'clamp(80px, 10vw, 120px) auto 0' }}>
        <img className="bg" src={`${S}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="sus-cta-copy">
          <h2>Together for Stronger Communities</h2>
          <p>
            Through focused interventions in healthcare, education, skill development, and environmental conservation, we are helping build healthier, more resilient communities.
          </p>
        </div>
        <a className="cp-cta-btn" href="/community">Community</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

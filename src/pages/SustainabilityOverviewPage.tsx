import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import SustainabilityGoalsSection from '../components/sustainability/SustainabilityGoalsSection';
import SustainabilityKpisSection from '../components/sustainability/SustainabilityKpisSection';
import SustainabilityCarousel, { CarouselItem } from '../components/sustainability/SustainabilityCarousel';
import '../components/company/company.css';
import './sustainability.css';
import './overview.css';

const S = '/assets/sustainability/';
const L = '/assets/leadership/';

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
  { img: `${S}Ratings-certifications-logo-image-07.webp`, alt: 'Great Place To Work Certified' },
  { img: `${S}Ratings-certifications-logo-image-06.webp`, alt: 'Sedex SUPPLIER PLUS' },
  { img: `${S}Ratings-certifications-logo-image-09.webp`, alt: 'Bureau Veritas ZERO WASTE TO LANDFILL' },
  { img: `${S}Ratings-certifications-logo-image-08.webp`, alt: 'CII-TRIVENI WATER INSTITUTE Aspiring Water Positive Plant' },
  { img: `${S}Ratings-certifications-logo-image-0112.webp`, alt: 'CDP Discloser 2025' },
  { img: `${S}Ratings-certifications-logo-image-0114.webp`, alt: 'CDP Supplier Engagement Leader A 2025' },
];

const PARTNERS_CAROUSEL_ITEMS: CarouselItem[] = [
  { img: `${S}Partner-collaboration-platforms-logo-image-03.webp`, alt: 'sphera' },
  { img: `${S}Partner-collaboration-platforms-logo-image-02.webp`, alt: 'Secaro' },
  { img: `${S}Partner-collaboration-platforms-logo-image-05.webp`, alt: 'inspectorio' },
  { img: `${S}Partner-collaboration-platforms-logo-image-01.webp`, alt: 'ProjectGigaton' },
  { img: `${S}Partner-collaboration-platforms-logo-image-04.webp`, alt: 'Oren' },
];

// 3. Sustainability Policies (12 item grid)
const SUSTAINABILITY_POLICIES = [
  {
    title: 'Climate and Environmental Policy',
    meta: 'Next Review Dec 26',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'Granules_Climate_and_Environmental_Policy.pdf',
  },
  {
    title: 'Social Policy Standards',
    meta: 'Next Review Dec 26',
    pdf: '/documents/CSR-Policy-7f3b00771044.pdf',
    filename: 'Granules_Social_Policy_Standards.pdf',
  },
  {
    title: 'Business Ethics Policy',
    meta: 'Next Review Dec 26',
    pdf: '/documents/Code-Of-Business-Conduct-file-01561d26ee79.pdf',
    filename: 'Granules_Business_Ethics_Policy.pdf',
  },
  {
    title: 'Sustainable Procurement Policy',
    meta: 'Next Review Dec 26',
    pdf: '/documents/Granules-Code-of-Business-Conduct-for-Suppliers-b394765c24cf.pdf',
    filename: 'Granules_Sustainable_Procurement_Policy.pdf',
  },
  {
    title: 'Sustainability Policy',
    meta: 'Next Review Dec 26',
    pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf',
    filename: 'Granules_Sustainability_Policy.pdf',
  },
  {
    title: 'EHS Policy Framework',
    meta: 'Updated on April 2026',
    pdf: '/documents/ISO-14001-45001-ceritificate-933b65fc494c.pdf',
    filename: 'Granules_EHS_Policy_Framework.pdf',
  },
  {
    title: 'Supplier Code of Conduct',
    meta: 'Next Review Dec 26',
    pdf: '/documents/Supplier-Code-of-Conduct-Sustainability-Program-2024-1-a6c058f75a2f.pdf',
    filename: 'Granules_Supplier_Code_of_Conduct.pdf',
  },
  {
    title: 'Business Code of Conduct',
    meta: 'Next Review Dec 26',
    pdf: '/documents/Code-of-Conduct-for-Board-SMP-d491fd64de1a.pdf',
    filename: 'Granules_Business_Code_of_Conduct.pdf',
  },
  {
    title: 'Biodiversity and Afforestation Policy',
    meta: 'Next Review Dec 26',
    pdf: '/documents/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental--7c3fd95ad004.pdf',
    filename: 'Granules_Biodiversity_and_Afforestation_Policy.pdf',
  },
  {
    title: 'Tax Policy Framework',
    meta: 'Next Review Jan 28',
    pdf: '/documents/Tax-on-Dividend-1-7e9ccaddc95d.pdf',
    filename: 'Granules_Tax_Policy_Framework.pdf',
  },
  {
    title: 'Human Rights Policy',
    meta: 'Next Review Jan 28',
    pdf: '/documents/8328CSR-Policy-30ada84aca1b.pdf',
    filename: 'Granules_Human_Rights_Policy.pdf',
  },
  {
    title: 'Grievance Redressal Policy',
    meta: 'Next Review Jan 28',
    pdf: '/documents/Investor-Grievance-Redressal-Policy-4d87da144751.pdf',
    filename: 'Granules_Grievance_Redressal_Policy.pdf',
  },
];

// 4. Reports & Disclosures
const REPORTS_DISCLOSURES = [
  {
    title: 'Integrated Annual Report FY 25-26',
    meta: 'Integrated Sustainability & Corporate Overview',
    pdf: '/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf',
    filename: 'Granules_Integrated_Annual_Report_FY25-26.pdf',
  },
  {
    title: 'Business Responsibility & Sustainability Report FY 25-26',
    meta: 'BRSR Mandatory Statutory Filing',
    pdf: '/documents/Granules_Annual-Report-FY26-1-4857602b3724.pdf',
    filename: 'Granules_BRSR_Report_FY25-26.pdf',
  },
  {
    title: 'ESG Supplementary Report FY 25-26',
    meta: 'Available Soon',
    pdf: null,
    filename: '',
  },
  {
    title: 'Integrated Annual Sustainability Report FY 24-25',
    meta: 'Complete Sustainability Disclosure',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_Integrated_Sustainability_Report_FY24-25.pdf',
  },
  {
    title: 'Business Responsibility and Sustainability Report FY 24-25',
    meta: 'SEBI BRSR Comprehensive Disclosure',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_BRSR_Report_FY24-25.pdf',
  },
  {
    title: 'Sustainability Report FY 23-24',
    meta: 'GRI Standards & Sustainability Report',
    pdf: '/documents/GranulesIndia-limited-AR-2023-24-18f7c7ff8700.pdf',
    filename: 'Granules_Sustainability_Report_FY23-24.pdf',
  },
  {
    title: 'TCFD Report',
    meta: 'Task Force on Climate-Related Financial Disclosures',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_TCFD_Report.pdf',
  },
  {
    title: 'Net Zero Roadmap',
    meta: 'Science-Based Targets & Decarbonization Strategy',
    pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf',
    filename: 'Granules_Net_Zero_Roadmap.pdf',
  },
  {
    title: 'UNGC – Communication on Progress Report FY 24-25',
    meta: 'United Nations Global Compact CoP',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_UNGC_CoP_Report_FY24-25.pdf',
  },
  {
    title: 'UNGC – Communication on Progress Report FY 23-24',
    meta: 'United Nations Global Compact CoP',
    pdf: '/documents/GranulesIndia-limited-AR-2023-24-18f7c7ff8700.pdf',
    filename: 'Granules_UNGC_CoP_Report_FY23-24.pdf',
  },
  {
    title: 'Biodiversity Assessment Report (Bonthapally Unit)',
    meta: 'Local Ecosystem & Habitat Assessment',
    pdf: '/documents/Press-Release-Granules-India-Limited-Inaugurated-an-Overhead-Water-Tank-at-Bonthapally-0cc922afda83.pdf',
    filename: 'Granules_Biodiversity_Assessment_Bonthapally.pdf',
  },
  {
    title: 'GHG Inventorization Methodology FY 25-26',
    meta: 'Scope 1, 2, and 3 Accounting Criteria',
    pdf: '/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf',
    filename: 'Granules_GHG_Methodology_FY25-26.pdf',
  },
  {
    title: 'GHG Inventorization Methodology FY 24-25',
    meta: 'GHG Protocol Standard Alignment',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_GHG_Methodology_FY24-25.pdf',
  },
  {
    title: 'World Environment Day 2026 Celebrations Souvenir',
    meta: 'Employee Engagement & Green Initiatives',
    pdf: '/documents/Granules-India-Limited-Honored-with-Golden-Peacock-Award-for-Sustainability-e36c3f2a8a41.pdf',
    filename: 'Granules_Environment_Day_2026_Souvenir.pdf',
  },
  {
    title: 'Granules National Safety Day Celebrations 2026 Souvenir',
    meta: 'Zero Harm Culture & EHS Excellence',
    pdf: '/documents/Unit-4-Bio-Medical-Waste-Annual-Return-for-the-year-2025-Jan-Dec-df0e4b40ccfc.pdf',
    filename: 'Granules_National_Safety_Day_2026_Souvenir.pdf',
  },
];

// 5. Assurance & Verification Reports
const ASSURANCE_REPORTS = [
  {
    title: 'Sustainability Assurance (GRI/IR) Report FY 25-26',
    meta: 'Independent External Verification',
    pdf: '/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf',
    filename: 'Granules_Sustainability_Assurance_FY25-26.pdf',
  },
  {
    title: 'Business Responsibility and Sustainability (BRSR) Assurance Report FY 25-26',
    meta: 'Reasonable Assurance Statement',
    pdf: '/documents/Granules_Annual-Report-FY26-1-4857602b3724.pdf',
    filename: 'Granules_BRSR_Assurance_Report_FY25-26.pdf',
  },
  {
    title: 'GHG Verification Report FY 25-26',
    meta: 'ISO 14064-3 Carbon Verification',
    pdf: '/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf',
    filename: 'Granules_GHG_Verification_FY25-26.pdf',
  },
  {
    title: 'Sustainability Assurance (GRI/IR) Report FY 24-25',
    meta: 'Independent Assurance Opinion',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_Sustainability_Assurance_FY24-25.pdf',
  },
  {
    title: 'BR and Sustainability (BRSR) Assurance Report FY 24-25',
    meta: 'Statutory Assurance Statement',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_BRSR_Assurance_Report_FY24-25.pdf',
  },
  {
    title: 'GHG Verification Report FY 24-25',
    meta: 'Third-Party GHG Emissions Audit',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_GHG_Verification_FY24-25.pdf',
  },
  {
    title: 'Sustainability Assurance (GRI/IR) Report FY 23-24',
    meta: 'GRI External Assurance',
    pdf: '/documents/GranulesIndia-limited-AR-2023-24-18f7c7ff8700.pdf',
    filename: 'Granules_Sustainability_Assurance_FY23-24.pdf',
  },
  {
    title: 'BRSR + GRI Assurance Report FY 22-23',
    meta: 'Assurance Statement',
    pdf: '/documents/Granules-AR-2022-23-532f737451a2.pdf',
    filename: 'Granules_BRSR_GRI_Assurance_FY22-23.pdf',
  },
  {
    title: 'BRSR & Sustainability Report Assurance (GRI) Report FY 23-24',
    meta: 'Comprehensive Verification',
    pdf: '/documents/GranulesIndia-limited-AR-2023-24-18f7c7ff8700.pdf',
    filename: 'Granules_BRSR_GRI_Assurance_FY23-24.pdf',
  },
  {
    title: 'GHG Verification Report FY 23-24',
    meta: 'Carbon Audit',
    pdf: '/documents/GranulesIndia-limited-AR-2023-24-18f7c7ff8700.pdf',
    filename: 'Granules_GHG_Verification_FY23-24.pdf',
  },
  {
    title: 'GHG Verification Report FY 22-23',
    meta: 'Baseline Verification Statement',
    pdf: '/documents/Granules-AR-2022-23-532f737451a2.pdf',
    filename: 'Granules_GHG_Verification_FY22-23.pdf',
  },
];

// 6. Commitments, Memberships & Ratings
const COMMITMENTS_DATA = [
  {
    title: 'United Nations Global Compact (UNGC)',
    meta: 'Member Since Sep 2023',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_UNGC_Commitment.pdf',
  },
  {
    title: 'Pharmaceutical Supply Chain Initiative (PSCI)',
    meta: 'Supplier Partner Member Since July 2025',
    pdf: '/documents/Granules-Code-of-Business-Conduct-for-Suppliers-b394765c24cf.pdf',
    filename: 'Granules_PSCI_Supplier_Partner.pdf',
  },
  {
    title: "UN Women's Empowerment Principles (UN-WEP)",
    meta: 'Signatory Member Since Dec 2025',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_UN_WEP_Commitment.pdf',
  },
  {
    title: 'National Safety Council (NSC)',
    meta: 'Member Since June 2025',
    pdf: '/documents/ISO-14001-45001-ceritificate-933b65fc494c.pdf',
    filename: 'Granules_NSC_Membership.pdf',
  },
  {
    title: 'SEDEX Supplier Plus Membership',
    meta: 'Valid till Oct 2026',
    pdf: '/documents/Supplier-Code-of-Conduct-Sustainability-Program-2024-1-a6c058f75a2f.pdf',
    filename: 'Granules_SEDEX_Supplier_Plus_Membership.pdf',
  },
  {
    title: 'British Safety Council (BSC)',
    meta: 'Member Since June 2025',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'Granules_British_Safety_Council_Membership.pdf',
  },
];

const RATINGS_DATA = [
  {
    title: 'EcoVadis Sustainability Rating',
    meta: 'Score: 62/100 (Silver Medal Performance)',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_EcoVadis_Rating.pdf',
  },
  {
    title: 'CDP Climate Change & Water Security',
    meta: 'Discloser 2025 - Rating B',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_CDP_Disclosure.pdf',
  },
  {
    title: 'Great Place to Work Certification',
    meta: 'Certified May 2025 – May 2026',
    pdf: '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf',
    filename: 'Granules_Great_Place_To_Work.pdf',
  },
  {
    title: 'Zero Waste to Landfill (ZWTL) Platinum',
    meta: 'Gold Standard Facility Rating',
    pdf: '/documents/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental--7c3fd95ad004.pdf',
    filename: 'Granules_ZWTL_Certification.pdf',
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
    validity: 'Valid Till Mar 2029',
    pdf: null,
  },
  {
    category: 'ISO 20400 – Sustainability Procurement',
    facility: 'Granules India Limited (Group)',
    validity: 'Valid Till Mar 2029',
    pdf: null,
  },
  {
    category: 'Zero Waste To Landfill (ZWTL) Certification',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental--7c3fd95ad004.pdf',
    filename: 'GIL_Gagillapur_ZWTL_Certification.pdf',
  },
  {
    category: 'Water Neutrality Certification',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Issued On Nov 25',
    pdf: '/documents/Press-Release-Granules-India-Limited-Inaugurated-a-Overhead-Water-Tank-at-Bonthapally-1-254a750cb84c.pdf',
    filename: 'GIL_Gagillapur_Water_Neutrality_Certification.pdf',
  },
  {
    category: 'Water Neutrality Certification',
    facility: 'GIL – Bonthapally Unit -1',
    validity: 'Issued On Nov 25',
    pdf: '/documents/Press-Release-Granules-India-Limited-Inaugurated-an-Overhead-Water-Tank-at-Bonthapally-0cc922afda83.pdf',
    filename: 'GIL_Bonthapally_Water_Neutrality_Certification.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_14001_Gagillapur.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 1, Bonthapally',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_14001_Bonthapally_Unit1.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 2, Jeedimetla',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-ceritificate-933b65fc494c.pdf',
    filename: 'ISO_14001_Jeedimetla_Unit2.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 3, Bonthapally',
    validity: 'Valid Till Dec 2028',
    pdf: null,
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 4, Parawada',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_14001_Parawada_Unit4.pdf',
  },
  {
    category: 'ISO 14001 - Environmental Management Systems (EMS)',
    facility: 'GIL – Unit 5, Parawada',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_14001_Parawada_Unit5.pdf',
  },
  {
    category: 'ISO 45001 - Occupational Health & Safety (OH&S)',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_45001_Gagillapur.pdf',
  },
  {
    category: 'ISO 45001 - Occupational Health & Safety (OH&S)',
    facility: 'GIL – Unit 1, Bonthapally',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_45001_Bonthapally_Unit1.pdf',
  },
  {
    category: 'ISO 45001 - Occupational Health & Safety (OH&S)',
    facility: 'GIL – Unit 2, Jeedimetla',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-ceritificate-933b65fc494c.pdf',
    filename: 'ISO_45001_Jeedimetla_Unit2.pdf',
  },
  {
    category: 'ISO 45001 - Occupational Health & Safety (OH&S)',
    facility: 'GIL – Unit 3, Bonthapally',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_45001_Bonthapally_Unit3.pdf',
  },
  {
    category: 'ISO 45001 - Occupational Health & Safety (OH&S)',
    facility: 'GIL – Unit 4, Parawada',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_45001_Parawada_Unit4.pdf',
  },
  {
    category: 'ISO 45001 - Occupational Health & Safety (OH&S)',
    facility: 'GIL – Unit 5, Parawada',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_45001_Parawada_Unit5.pdf',
  },
  {
    category: 'Social Accountability 8000 (SA 8000)',
    facility: 'GIL – Gagillapur Unit',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf',
    filename: 'SA8000_Gagillapur.pdf',
  },
  {
    category: 'Social Accountability 8000 (SA 8000)',
    facility: 'GIL – Unit 1, Bonthapally',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf',
    filename: 'SA8000_Bonthapally_Unit1.pdf',
  },
  {
    category: 'Social Accountability 8000 (SA 8000)',
    facility: 'GIL – Unit 2, Jeedimetla',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf',
    filename: 'SA8000_Jeedimetla_Unit2.pdf',
  },
  {
    category: 'Social Accountability 8000 (SA 8000)',
    facility: 'GIL – Unit 3, Bonthapally',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf',
    filename: 'SA8000_Bonthapally_Unit3.pdf',
  },
  {
    category: 'Social Accountability 8000 (SA 8000)',
    facility: 'GIL – Unit 4, Parawada',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf',
    filename: 'SA8000_Parawada_Unit4.pdf',
  },
  {
    category: 'Social Accountability 8000 (SA 8000)',
    facility: 'GIL – Unit 5, Parawada',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf',
    filename: 'SA8000_Parawada_Unit5.pdf',
  },
  {
    category: 'Social Accountability 8000 (SA 8000)',
    facility: 'GRANULES LIFE SCIENCES, Lalgadimalakpet',
    validity: 'Valid Till Dec 2028',
    pdf: '/documents/Granules-Life-Sciences-Biomedical-Waste-Annual-Report-2024-8c2630f9bdf6.pdf',
    filename: 'SA8000_Granules_Life_Sciences.pdf',
  },
  {
    category: 'ISO 9001 : Quality Management Systems (QMS)',
    facility: 'Granules India Limited (Group)',
    validity: 'Valid Till Mar 2026',
    pdf: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf',
    filename: 'ISO_9001_Quality_Management.pdf',
  },
];

export default function SustainabilityOverviewPage() {
  const [membershipTab, setMembershipTab] = useState<'commitments' | 'ratings'>('commitments');

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

  return (
    <div className="cp">
      <NavBar />

      <p className="cp-breadcrumb" style={{ width: '85%', margin: 'clamp(60px, 8vw, 118px) auto 0' }}>
        <a href="/">HOME</a>
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
              <svg width="38" height="28" viewBox="0 0 36 28" fill="#0061f8">
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

        <div className="sus-doc-grid-4">
          {SUSTAINABILITY_POLICIES.map((item) => (
            <div key={item.title} className="sus-doc-card sus-doc-card--light">
              <div>
                <h3 className="sus-doc-card-title">{item.title}</h3>
                <p className="sus-doc-card-meta">{item.meta}</p>
              </div>
              <a
                className="sus-doc-btn"
                href={item.pdf}
                download={item.filename}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>


      {/* Section 2 Anchor: Reports & Disclosures (Dark Teal Container) */}
      <section id="sec-reports" className="sus-doc-section sus-doc-section--dark-teal">
        <div className="sus-section-header-center">
          <h2>Reports &amp; Disclosures</h2>
          <p>
            Comprehensive statutory and voluntary disclosures covering Integrated Reports,
            Business Responsibility and Sustainability Reports (BRSR), TCFD analysis, and GHG
            accounting.
          </p>
        </div>

        <div className="sus-doc-grid-4">
          {REPORTS_DISCLOSURES.map((item, idx) => (
            <div key={idx} className="sus-doc-card">
              <div>
                <h3 className="sus-doc-card-title">{item.title}</h3>
                <p className="sus-doc-card-meta">{item.meta}</p>
              </div>
              {item.pdf ? (
                <a
                  className="sus-doc-btn"
                  href={item.pdf}
                  download={item.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Download</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              ) : (
                <span className="sus-doc-btn sus-doc-btn--disabled">Available Soon</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 Anchor: Assurance & Verification Report (Dark Blue Container) */}
      <section id="sec-assurance" className="sus-doc-section sus-doc-section--dark-blue">
        <div className="sus-section-header-center">
          <h2>Assurance &amp; Verification Report</h2>
          <p>
            Independent third-party assurance opinions and carbon verification statements
            confirming the integrity of our environmental, social, and ESG reporting.
          </p>
        </div>

        <div className="sus-doc-grid-4">
          {ASSURANCE_REPORTS.map((item, idx) => (
            <div key={idx} className="sus-doc-card">
              <div>
                <h3 className="sus-doc-card-title">{item.title}</h3>
                <p className="sus-doc-card-meta">{item.meta}</p>
              </div>
              <a
                className="sus-doc-btn"
                href={item.pdf}
                download={item.filename}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 Anchor: Commitments, Memberships & Ratings */}
      <section id="sec-commitments" className="sus-doc-section sus-doc-section--slate">
        <div className="sus-section-header-center">
          <h2>Commitments, Memberships And Ratings</h2>
          <p>
            We are committed to responsible growth that upholds the highest standards of
            sustainability. Our global alliances and external ratings reflect third-party validation
            of our sustainable leadership.
          </p>
        </div>

        {/* Tab switch between Commitments and Ratings */}
        <div className="ld-tabs-wrap" style={{ margin: '0 auto' }}>
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

        <div className="sus-doc-grid-3">
          {(membershipTab === 'commitments' ? COMMITMENTS_DATA : RATINGS_DATA).map((item) => (
            <div key={item.title} className="sus-doc-card sus-doc-card--light">
              <div>
                <h3 className="sus-doc-card-title">{item.title}</h3>
                <p className="sus-doc-card-meta">{item.meta}</p>
              </div>
              <a
                className="sus-doc-btn"
                href={item.pdf}
                download={item.filename}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 Anchor: Certifications Table */}
      <section id="sec-certifications" className="sus-doc-section">
        <div className="sus-section-header-center">
          <h2>Certifications</h2>
          <p>
            International accreditations and site-specific certifications across Environmental
            Management (ISO 14001), Occupational Safety (ISO 45001), Social Accountability (SA 8000),
            and Quality Management (ISO 9001).
          </p>
        </div>

        <div className="sus-cert-table-wrap">
          <table className="sus-cert-table">
            <thead>
              <tr>
                <th>Standard / Certification</th>
                <th>Unit / Facility</th>
                <th>Validity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {CERTIFICATIONS.map((cert, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{cert.category}</td>
                  <td>{cert.facility}</td>
                  <td style={{ color: '#64748b' }}>{cert.validity}</td>
                  <td>
                    {cert.pdf ? (
                      <a
                        className="sus-doc-btn"
                        href={cert.pdf}
                        download={cert.filename}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Download</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </a>
                    ) : (
                      <span className="sus-doc-btn sus-doc-btn--disabled">Available Soon</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA to Strategy */}
      <div className="sus-cta" style={{ width: '85%', margin: 'clamp(80px, 10vw, 120px) auto 0' }}>
        <img className="bg" src={`${S}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="overlay" />
        <div className="sus-cta-copy">
          <h2>Building a sustainable tomorrow</h2>
          <p>
            Sustainability is central to Granules&rsquo; strategy, integrating science, people,
            and planet to drive long-term, responsible growth.
          </p>
        </div>
        <a className="cp-cta-btn" href="/sustainability/strategy">Sustainability Strategy</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

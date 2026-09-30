import { getAssetUrl } from '../lib/pdf';

export interface EhsDocument {
  id: string;
  title: string;
  facility: string;
  category: string;
  period: string;
  year: string;
  pdf: string;
  docType: string;
  scope?: string;
}

export interface EhsFacilityGroup {
  facility: string;
  items: EhsDocument[];
}

export const EHS_FACILITIES = [
  'ALL',
  'Unit 1 - Bonthapally',
  'Gagillapur',
  'Jeedimetla',
  'Granules Life Sciences',
  'Unit 4 - Vizag',
  'Unit 5 - Vizag',
  'PLI Documents',
] as const;

export const EHS_CATEGORIES = [
  'ALL',
  'Bio-Medical Waste',
  'Hazardous & E-Waste',
  'Consent & Orders',
  'Certifications',
  'Audit & Compliance',
] as const;

export const EHS_DOCUMENTS: EhsDocument[] = [
  // --- Unit 1 - Bonthapally ---
  {
    id: 'ehs-bpl-1',
    title: 'Bio-Medical Waste Form-IV Annual Report',
    facility: 'Unit 1 - Bonthapally',
    category: 'Bio-Medical Waste',
    docType: 'Form-IV Annual Report',
    period: 'FY 2025-26',
    year: '2026',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2026/05/BPL-Bio-Medical-Waste-Form-IV-Annual-Report.pdf'),
    scope: 'Bonthapally (BPL) Facility Bio-Medical Waste Annual Compliance',
  },
  {
    id: 'ehs-bpl-2',
    title: 'Biomedical Waste Annual Returns 2025',
    facility: 'Unit 1 - Bonthapally',
    category: 'Bio-Medical Waste',
    docType: 'Annual Return',
    period: 'FY 2025',
    year: '2025',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2025/10/Gagillapur-Biomedical-Waste-Annual-Report-2024.pdf'),
    scope: 'Bonthapally Manufacturing Site Biomedical Waste Filing',
  },

  // --- Gagillapur ---
  {
    id: 'ehs-ggp-1',
    title: 'Annual Returns - Hazardous Waste (Form-4), E-Waste (Form-3) Biomedical Waste (Form-IV) and Environmental Statement (Form-V)',
    facility: 'Gagillapur',
    category: 'Hazardous & E-Waste',
    docType: 'Form 3, 4, IV & V',
    period: 'FY 2025-26',
    year: '2026',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2026/05/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental-Statement-Form-V.pdf'),
    scope: 'Gagillapur Comprehensive Environmental & Waste Statutory Statement',
  },
  {
    id: 'ehs-ggp-2',
    title: 'Biomedical Waste Annual Report-2024',
    facility: 'Gagillapur',
    category: 'Bio-Medical Waste',
    docType: 'Annual Report',
    period: 'FY 2024',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2025/10/Gagillapur-Biomedical-Waste-Annual-Report-2024.pdf'),
    scope: 'Gagillapur Site Biomedical Waste Compliance Audit',
  },

  // --- Jeedimetla ---
  {
    id: 'ehs-jdm-1',
    title: 'Bio-Medical Waste Form- IV Annual Report FY-2025 (From Jan-2025 to Dec-2025)',
    facility: 'Jeedimetla',
    category: 'Bio-Medical Waste',
    docType: 'Form-IV Annual Report',
    period: 'FY 2025',
    year: '2025',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2026/05/JDM-Bio-Medical-Waste-Form-IV-Annual-Report-FY-2025-From-Jan-2025-to-Dec-2025.pdf'),
    scope: 'Jeedimetla Plant Bio-Medical Waste Annual Filing',
  },
  {
    id: 'ehs-jdm-2',
    title: 'Biomedical Waste Annual Report 2024',
    facility: 'Jeedimetla',
    category: 'Bio-Medical Waste',
    docType: 'Annual Report',
    period: 'FY 2024',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2025/10/Jeedimetla-Biomedical-Waste-Annual-Report-2024.pdf'),
    scope: 'Jeedimetla Facility Statutory Waste Compliance',
  },

  // --- Granules Life Sciences ---
  {
    id: 'ehs-gls-1',
    title: 'Bio-Medical Waste Form-IV Annual Report for the period from January-2025 to December-2025',
    facility: 'Granules Life Sciences',
    category: 'Bio-Medical Waste',
    docType: 'Form-IV Annual Report',
    period: 'FY 2025',
    year: '2025',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2026/05/GLS-Bio-Medical-Waste-Form-IV-Annual-Report-for-the-period-from-January-2025.pdf'),
    scope: 'GLS Finished Dosage Site Bio-Medical Waste Filing',
  },
  {
    id: 'ehs-gls-2',
    title: 'Biomedical Waste Annual Report 2024',
    facility: 'Granules Life Sciences',
    category: 'Bio-Medical Waste',
    docType: 'Annual Report',
    period: 'FY 2024',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2025/10/Granules-Life-Sciences-Biomedical-Waste-Annual-Report-2024.pdf'),
    scope: 'GLS Manufacturing Site Annual Waste Review',
  },

  // --- Unit 4 - Vizag ---
  {
    id: 'ehs-u4-1',
    title: 'CFE & CFO order',
    facility: 'Unit 4 - Vizag',
    category: 'Consent & Orders',
    docType: 'Statutory Order',
    period: 'Regulatory Consent',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/pdf/other-information/CFE%26CFO-order.pdf'),
    scope: 'Unit 4 Consent for Establishment & Operation from Pollution Control Board',
  },
  {
    id: 'ehs-u4-2',
    title: 'ISO-14001 & 45001 Certificate',
    facility: 'Unit 4 - Vizag',
    category: 'Certifications',
    docType: 'ISO Certification',
    period: 'Environmental & Safety Standard',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/pdf/other-information/ISO-14001%2645001-Certificate.pdf'),
    scope: 'Occupational Health & Safety (45001) & Environmental Management (14001)',
  },
  {
    id: 'ehs-u4-3',
    title: 'Bio Medical Waste Annual Return for the year 2025 (Jan-Dec)',
    facility: 'Unit 4 - Vizag',
    category: 'Bio-Medical Waste',
    docType: 'Annual Return',
    period: 'FY 2025',
    year: '2025',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2026/05/Unit-4-Bio-Medical-Waste-Annual-Return-for-the-year-2025-Jan-Dec.pdf'),
    scope: 'Unit 4 Vizag Bio-Medical Waste Filing',
  },
  {
    id: 'ehs-u4-4',
    title: 'Biomedical Waste Annual Report 2024',
    facility: 'Unit 4 - Vizag',
    category: 'Bio-Medical Waste',
    docType: 'Annual Report',
    period: 'FY 2024',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2025/10/Unit-4-Biomedical-Waste-Annual-Report-2024.pdf'),
    scope: 'Unit 4 Vizag Statutory Compliance Report',
  },

  // --- Unit 5 - Vizag ---
  {
    id: 'ehs-u5-1',
    title: 'CFE (Consent for Establishment)',
    facility: 'Unit 5 - Vizag',
    category: 'Consent & Orders',
    docType: 'Establishment Consent',
    period: 'Statutory Filing',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/pdf/other-information/CFE.pdf'),
    scope: 'Unit 5 Consent for Establishment Approval',
  },
  {
    id: 'ehs-u5-2',
    title: 'CFO (Consent for Operation)',
    facility: 'Unit 5 - Vizag',
    category: 'Consent & Orders',
    docType: 'Operation Consent',
    period: 'Statutory Filing',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/pdf/other-information/CFO.pdf'),
    scope: 'Unit 5 Consent for Operation Approval',
  },
  {
    id: 'ehs-u5-3',
    title: 'ISO 14001 & 45001 Certificate',
    facility: 'Unit 5 - Vizag',
    category: 'Certifications',
    docType: 'ISO Certification',
    period: 'Environmental & Safety Standard',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/pdf/other-information/ISO-14001%2645001-ceritificate.pdf'),
    scope: 'Unit 5 Vizag Site Certified Management Systems',
  },
  {
    id: 'ehs-u5-4',
    title: 'Bio Medical Waste & E-Waste Annual Returns for the year 2025-2026',
    facility: 'Unit 5 - Vizag',
    category: 'Bio-Medical Waste',
    docType: 'Annual Return',
    period: 'FY 2025-26',
    year: '2026',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2026/05/Unit-5-Bio-Medical-Waste-E-Waste-Annual-Returns-for-the-year-2025-2026.pdf'),
    scope: 'Unit 5 Vizag Bio-Medical & E-Waste Compliance',
  },
  {
    id: 'ehs-u5-5',
    title: 'Biomedical Waste Annual Report 2024',
    facility: 'Unit 5 - Vizag',
    category: 'Bio-Medical Waste',
    docType: 'Annual Report',
    period: 'FY 2024',
    year: '2024',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/2025/10/Unit-V-Biomedical-Waste-Annual-Returns-2024.pdf'),
    scope: 'Unit 5 Vizag API Site Waste Return',
  },

  // --- PLI Documents ---
  {
    id: 'ehs-pli-1',
    title: 'PLI (Production Linked Incentive) Certificate',
    facility: 'PLI Documents',
    category: 'Certifications',
    docType: 'Government Certificate',
    period: 'PLI Scheme',
    year: '2021',
    pdf: getAssetUrl('https://d3uvya50m9yz9t.cloudfront.net/pdfs/pdf/other-information/GRANULES-HCL-2021.pdf'),
    scope: 'Department of Pharmaceuticals Government of India PLI Approval',
  },
];

export const EHS_FACILITY_GROUPS: EhsFacilityGroup[] = [
  {
    facility: 'Unit 1 - Bonthapally',
    items: EHS_DOCUMENTS.filter((d) => d.facility === 'Unit 1 - Bonthapally'),
  },
  {
    facility: 'Gagillapur',
    items: EHS_DOCUMENTS.filter((d) => d.facility === 'Gagillapur'),
  },
  {
    facility: 'Jeedimetla',
    items: EHS_DOCUMENTS.filter((d) => d.facility === 'Jeedimetla'),
  },
  {
    facility: 'Granules Life Sciences',
    items: EHS_DOCUMENTS.filter((d) => d.facility === 'Granules Life Sciences'),
  },
  {
    facility: 'Unit 4 - Vizag',
    items: EHS_DOCUMENTS.filter((d) => d.facility === 'Unit 4 - Vizag'),
  },
  {
    facility: 'Unit 5 - Vizag',
    items: EHS_DOCUMENTS.filter((d) => d.facility === 'Unit 5 - Vizag'),
  },
  {
    facility: 'PLI Documents',
    items: EHS_DOCUMENTS.filter((d) => d.facility === 'PLI Documents'),
  },
];

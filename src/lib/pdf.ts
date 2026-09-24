import pdfCatalog from './pdf-catalog.json';

export const CLOUDFRONT_URL = "https://d16d47oyl512wy.cloudfront.net";
export const PDF_CDN_BASE = `${CLOUDFRONT_URL}/pdfs`;

function decodePathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function collapseKey(value: string): string {
  return decodePathSegment(value)
    .replace(/\.pdf$/i, '')
    .replace(/-[a-f0-9]{8,12}$/i, '')
    .replace(/[^a-z0-9]+/gi, '')
    .toLowerCase();
}

const PATH_BY_LOWER = new Map<string, string>();
const PATHS_BY_COLLAPSED = new Map<string, string[]>();

for (const rel of pdfCatalog.paths) {
  const normalized = rel.replace(/\\/g, '/');
  PATH_BY_LOWER.set(normalized.toLowerCase(), normalized);
  const name = normalized.split('/').pop() || normalized;
  const key = collapseKey(name);
  const list = PATHS_BY_COLLAPSED.get(key) || [];
  list.push(normalized);
  PATHS_BY_COLLAPSED.set(key, list);
}

/** Map a WP/CloudFront-relative path onto the real uploads filename, including spaces. */
export function resolveUploadPath(rel: string): string {
  const decoded = rel.split('/').map(decodePathSegment).filter(Boolean).join('/');
  const exact = PATH_BY_LOWER.get(decoded.toLowerCase());
  if (exact) return exact;

  const parts = decoded.split('/');
  const filename = parts.pop() || '';
  const dir = parts.join('/');
  const hits = PATHS_BY_COLLAPSED.get(collapseKey(filename)) || [];
  const sameDir = hits.filter((item) => item.split('/').slice(0, -1).join('/').toLowerCase() === dir.toLowerCase());
  if (sameDir.length) return sameDir[0];
  if (hits.length) return hits[0];
  return decoded;
}

function withPdfPrefix(rel: string): string {
  return `pdfs/${resolveUploadPath(rel.replace(/^pdfs\//i, ''))}`;
}

/** Encode each CloudFront path segment so spaces and special characters work in the browser. */
export function getAssetUrl(path?: string | null): string {
  if (!path) return "";

  let raw = path.trim();
  let query = "";

  if (/^https?:\/\//i.test(raw)) {
    const safe = raw.replace(/ /g, '%20');
    try {
      const parsed = new URL(safe);
      raw = parsed.pathname;
      query = parsed.search;
    } catch {
      const [pathname, search] = safe.replace(/^https?:\/\/[^/]+/i, "").split("?");
      raw = pathname;
      query = search ? `?${search}` : "";
    }
  } else {
    const qIndex = raw.indexOf("?");
    if (qIndex >= 0) {
      query = raw.slice(qIndex);
      raw = raw.slice(0, qIndex);
    }
  }

  let cleanPath = raw.replace(/^\/+/, "");
  if (!cleanPath) return query ? `${CLOUDFRONT_URL}/${query}` : CLOUDFRONT_URL;

  if (/^pdfs\//i.test(cleanPath) || /^pdf\//i.test(cleanPath) || /^\d{4}\/\d{2}\//.test(cleanPath)) {
    cleanPath = withPdfPrefix(cleanPath);
  }

  const encoded = cleanPath
    .split("/")
    .map((segment) => encodeURIComponent(decodePathSegment(segment)))
    .join("/");

  return `${CLOUDFRONT_URL}/${encoded}${query}`;
}

const WP_UPLOADS = /^(?:https?:\/\/(?:www\.)?granulesindia\.com)?(?:\[home_url\])?\/+wp-content\/uploads/i;
const SUSTAINABILITY_UPLOADS =
  /^https?:\/\/(?:www\.)?granulesindia\.com\/sustainability\/wp-content\/uploads/i;

const DOCUMENT_PDF_MAP: Record<string, string> = {
  "/documents/03-01-2022-NSEBSE-5f23fc10d148.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/02/03-01-2022-NSEBSE.pdf",
  "/documents/1121Transfer-of-Physical-Shares-in-Demat-Mode-only-5dacd41e988f.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/1121Transfer of Physical Shares in Demat Mode only.pdf",
  "/documents/1322Intimation-of-Trading-Window-Closure-2824434a88d6.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/notice/1322Intimation of Trading Window Closure.pdf",
  "/documents/185924th-AGM-Voting-Results-93df2c5c6b2c.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/185924th AGM Voting Results.pdf",
  "/documents/2027Annual-Report---FY13-14-6e22e01460e9.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2027Annual Report - FY13-14.pdf",
  "/documents/2157Annual-Report---FY07-08-b0699957797f.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2157Annual Report - FY07-08.pdf",
  "/documents/2198AR2016-17-1ab38b383c01.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2198AR2016-17.pdf",
  "/documents/2202EGM-voting-results-00b30443ad19.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/2202EGM voting results.pdf",
  "/documents/2342Granules-India-Limited---Dispatch-Advertisement-e2e7cd7fceb8.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2342Granules India Limited - Dispatch Advertisement.pdf",
  "/documents/2427Annual-Report---FY14-15-9d8526bf403c.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2427Annual Report - FY14-15.pdf",
  "/documents/2668Annual-Report-2015-2016-053d09b9dde9.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/2668Annual Report 2015-2016.pdf",
  "/documents/2960Granules-India-Conference-Call-Hosted-by-Edelweiss-Securities---June-02-1cd554a67bf9.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/notice/2960Granules India Conference Call, Hosted by Edelweiss Securities - June 02....pdf",
  "/documents/3127Annual-Report---FY18-19-c9cc39471683.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/3127Annual Report - FY18-19.pdf",
  "/documents/3268Annual-Report---FY10-11-0dd6a2bd1a12.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/3268Annual Report - FY10-11.pdf",
  "/documents/3280BSE-Observation-Letter-d63a8e7e0e09.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/3280BSE Observation Letter.pdf",
  "/documents/3616Clause-24F-documents-Complaint-Report-d7ff29ce5373.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/3616Clause 24F documents Complaint Report.pdf",
  "/documents/3913High-Court-Order-of-Amalgamation-2eda882af1c6.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/3913High Court Order of Amalgamation.pdf",
  "/documents/4106Oral-order-of-Amalgamation-4c3c2b7db5dc.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/4106Oral order of Amalgamation.pdf",
  "/documents/4531Buyback---Granules-f663d4a3d5eb.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/notice/4531Buyback - Granules.pdf",
  "/documents/4679NSE-Observation-Letter-ded00e005836.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/4679NSE Observation Letter.pdf",
  "/documents/5329BSE-Approval-Part-B-reg-Scheme-of-Amalgamation-d2a343ccd484.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/5329BSE Approval-Part B reg Scheme of Amalgamation.pdf",
  "/documents/5667Outcome-of-23rd-AGM-of-Granules-India-Limited-a96461187983.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/5667Outcome of 23rd AGM of Granules India Limited.pdf",
  "/documents/6127Annual-Report---FY11-12-b035b60a4347.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/6127Annual Report - FY11-12.pdf",
  "/documents/6181Annual-Report---FY09-10-7d097d5806ea.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/6181Annual Report - FY09-10.pdf",
  "/documents/6249Annual-Report---FY06-07-480c9456423e.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/6249Annual Report - FY06-07.pdf",
  "/documents/6708Reply-to-Bombay-Stock-Exchange-9f900bae1b3d.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/6708Reply to Bombay Stock Exchange.pdf",
  "/documents/6994Annual-Report---FY08-09-188f254a3537.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/6994Annual Report - FY08-09.pdf",
  "/documents/8058Annual-Report---FY17-18-0e6badda55f0.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/8058Annual Report - FY17-18.pdf",
  "/documents/8328CSR-Policy-30ada84aca1b.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/12/CSR-Policy.pdf",
  "/documents/8742Annual-Report---FY12-13-5012f3f34ee5.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/8742Annual Report - FY12-13.pdf",
  "/documents/8938Intimation-of-Schedule-of-the-Non-Deal-Road-Show-bca671f2cc3d.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/notice/8938Intimation of Schedule of the Non Deal Road Show.pdf",
  "/documents/9853GOPL-Financials-17-18-min-c7cdaee4f683.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/Annual-Accounts-of-Subsidiaries/9853GOPL Financials 17-18-min.pdf",
  "/documents/Annual-Report-2019-20-2e269e7676d8.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/09/Annual-Report-2019-20.pdf",
  "/documents/Annual-Report-2020-21-7948a9c23581.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/09/Annual-Report-2020-21.pdf",
  "/documents/Annual-Report-2021-22-ce6deff6f867.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/09/Annual-Report-2021-22.pdf",
  "/documents/Annual-return-website-24-25-80a7926488aa.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/07/Annual-return-website-24-25.pdf",
  "/documents/annualsecretarial-complaince-report-23-31ac1ac51554.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/investors/annualsecretarial-complaince-report-23.pdf",
  "/documents/Appointment-of-Independent-Directors-9c78611c8cf7.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2024/04/Appointment-of-Independent-Directors.pdf",
  "/documents/BSENSEINTIMATION-f14353e32d64.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/05/BSENSEINTIMATION.pdf",
  "/documents/COBC-9b98735608b9.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/03/COBC.pdf",
  "/documents/Code-Of-Business-Conduct-file-01561d26ee79.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2024/12/Code-Of-Business-Conduct-file.pdf",
  "/documents/Code-of-Conduct-for-Board-SMP-d491fd64de1a.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Code-of-Conduct-for-Board-SMP.pdf",
  "/documents/Committees-of-the-Board-as-on-01.08.2025-ceb2be8520eb.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/08/Committees-of-the-Board-as-on-01.08.2025.pdf",
  "/documents/CSR-Annual-Report-2023-24-5d55fa4f91e9.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2024/07/GranulesIndia-limited-AR-2023-24.pdf",
  "/documents/CSR-Policy-7f3b00771044.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/12/CSR-Policy.pdf",
  "/documents/Details-Of-Share-Transferred-To-The-Iepf-Authority-5f861d461def.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Details-Of-Share-Transferred-To-The-Iepf-Authority.pdf",
  "/documents/Earnings-Presentation-Q2FY26-Circulation-fb2ccd8cf24d.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Earnings-Presentation-Q2FY26-Circulation.pdf",
  "/documents/ESOP-Schemes-c6f2c928720f.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/04/ESOP-Schemes.pdf",
  "/documents/Familarisation-Programme-for-Independent-Directors-2025-26-5d9c26495637.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2026/04/Familarisation-Programme-for-Independent-Directors-2025-26.pdf",
  "/documents/Financial-Result-18.05.2022-0e55e6fbe630.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/05/Financial Result 18.05.2022.pdf",
  "/documents/Financials-CZRO-2023-425ee535e48e.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/investors/Financials-CZRO-2023.pdf",
  "/documents/Form-SH-4-16aa99502642.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/09/Form-SH-4.pdf",
  "/documents/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental--7c3fd95ad004.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2026/05/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental-Statement-Form-V.pdf",
  "/documents/GIL_Product_Brochure_May_20_2025_Master_FD-9f15994d9ad2.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/06/GIL_Product_Brochure_May_20_2025_Master_FD.pdf",
  "/documents/GIL_Product_Brochure_May_20_2025_Master_PFI-7abcdf7c89b2.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/06/GIL_Product_Brochure_May_20_2025_Master_PFI.pdf",
  "/documents/GRAN_TOP-200-AS-ON-31.03.2026-fbd278e76278.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2026/07/GRAN_TOP-200-AS-ON-31.03.2026.pdf",
  "/documents/Granules_Annual-Report-FY26-1-4857602b3724.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2026/07/Granules_Annual-Report-FY26-1.pdf",
  "/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2026/07/Granules_Annual-Report-FY26.pdf",
  "/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/07/Granules_Integrated-Report-2024-25.pdf",
  "/documents/Granules_Product_Brochure_API-2e0d50e7805c.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/05/Granules_Product_Brochure_API.pdf",
  "/documents/Granules-AR-2022-23-532f737451a2.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/Granules-AR-2022-23.pdf",
  "/documents/Granules-Code-of-Business-Conduct-for-Suppliers-b394765c24cf.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/05/Supplier-Code-of-Conduct.pdf",
  "/documents/Granules-Evoting-and-AGM-Instructions-8d59d6fa9667.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2023/07/Granules-Evoting-and-AGM-Instructions.pdf",
  "/documents/Granules-India-Limited_EGM-Notice_30.12.2025-V1-ec9fea7c51e6.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/12/Granules-India-Limited_EGM-Notice_30.12.2025-V1.pdf",
  "/documents/Granules-India-Limited-Honored-with-Golden-Peacock-Award-for-Sustainability-e36c3f2a8a41.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2024/11/Granules-India-Limited-Honored-with-Golden-Peacock-Award-for-Sustainability.pdf",
  "/documents/Granules-India-Transforms-BC-Government-Boys-Hostel-in-Parawada-ac5a57c033b8.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/08/Granules-India-Transforms-BC-Government-Boys-Hostel-in-Parawada.pdf",
  "/documents/Granules-Life-Sciences-Biomedical-Waste-Annual-Report-2024-8c2630f9bdf6.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/10/Granules-Life-Sciences-Biomedical-Waste-Annual-Report-2024.pdf",
  "/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/07/Granules_Integrated-Report-2024-25.pdf",
  "/documents/GranulesIndia-limited-AR-2023-24-18f7c7ff8700.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2024/07/GranulesIndia-limited-AR-2023-24.pdf",
  "/documents/GranulesIndia-Q2-FY26-Transcript-Clean-Version-faeecef8a9cb.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/GranulesIndia-Q2-FY26-Transcript-Clean-Version.pdf",
  "/documents/Investor-Grievance-Redressal-Policy-4d87da144751.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/03/Investor-Grievance-Redressal-Policy.pdf",
  "/documents/ISO-14001-45001-ceritificate-933b65fc494c.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/ISO-14001&45001-ceritificate.pdf",
  "/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/ISO-14001&45001-Certificate.pdf",
  "/documents/Notice-of-Board-Meeting-Scheduled-on-May-16-2023-97d1e47a1aee.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2023/04/Notice-of-Board-Meeting-Scheduled-on-May-16-2023.pdf",
  "/documents/Post-Buyback-Public-Announcement-3046b59d85af.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/10/Post-Buyback-Public-Announcement.pdf",
  "/documents/Press-Release-Granules-India-Limited-Inaugurated-a-Overhead-Water-Tank-at-Bonthapally-1-254a750cb84c.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/10/Press-Release-Granules-India-Limited-Inaugurated-an-Overhead-Water-Tank-at-Bonthapally.pdf",
  "/documents/Press-Release-Granules-India-Limited-Inaugurated-an-Overhead-Water-Tank-at-Bonthapally-0cc922afda83.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/10/Press-Release-Granules-India-Limited-Inaugurated-an-Overhead-Water-Tank-at-Bonthapally.pdf",
  "/documents/Press-Release-Q2-FY26-07edcf6db296.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Press-Release-Q2-FY26.pdf",
  "/documents/Schedule-of-Analyst-and-Investor-Earnings-Conference-Call-Q4-2022-23-46bcf59128ca.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2023/04/Schedule-of-Analyst-and-Investor-Earnings-Conference-Call-Q4-2022-23.pdf",
  "/documents/Scheme-of-Arrangement-Clause-24f-documents-700b6e8182a6.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/pdf/other-information/Scheme of Arrangement Clause 24f documents.pdf",
  "/documents/Supplier-Code-of-Conduct-Sustainability-Program-2024-1-a6c058f75a2f.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/05/Supplier-Code-of-Conduct.pdf",
  "/documents/Tax-on-Dividend-1-7e9ccaddc95d.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/02/Tax-on-Dividend-1.pdf",
  "/documents/Third-Quarter-SHP-2025-b306d92c9c75.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/01/Third-Quarter-SHP-2025.pdf",
  "/documents/Unit-4-Bio-Medical-Waste-Annual-Return-for-the-year-2025-Jan-Dec-df0e4b40ccfc.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2026/05/Unit-4-Bio-Medical-Waste-Annual-Return-for-the-year-2025-Jan-Dec.pdf",
  "/documents/Unpaid-Final-Dividend-FY-2024-2025-07965a1cbed6.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2025/11/Unpaid-Final-Dividend-FY-2024-2025.pdf",
  "/documents/3975Granules-India-s-Revenue-increases-c3fcfefdab37.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2026/07/Granules_Annual-Report-FY26-1.pdf",
  "/documents/Form-ISR-1-For-Updating-KYC-1dce8e0ec06b.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/01/Form-ISR-1-For-Updating-KYC.pdf",
  "/documents/Form-ISR-4-2910e0ac2dd4.pdf": "https://d16d47oyl512wy.cloudfront.net/pdfs/2022/04/Form-ISR-4.pdf",
};

function decodePdfEntities(url: string): string {
  return url.replace(/&amp;/g, '&').replace(/&#039;/g, "'");
}

/** Rewrite a WordPress or local /documents PDF path to the CloudFront CDN. */
export function toCdnPdf(url?: string | null): string {
  if (!url) return '';
  const decoded = decodePdfEntities(url);
  const pathOnly = decoded.split('?')[0];
  if (DOCUMENT_PDF_MAP[pathOnly]) {
    return getAssetUrl(DOCUMENT_PDF_MAP[pathOnly]);
  }
  if (decoded.startsWith(PDF_CDN_BASE) || decoded.includes('d16d47oyl512wy.cloudfront.net')) {
    return getAssetUrl(decoded);
  }
  // Sustainability microsite files are hosted on granulesindia.com, not the main CDN bucket.
  if (SUSTAINABILITY_UPLOADS.test(decoded)) {
    return decoded;
  }
  if (WP_UPLOADS.test(decoded)) {
    return getAssetUrl(decoded.replace(WP_UPLOADS, PDF_CDN_BASE));
  }
  if (/^\/?pdfs\//i.test(decoded) || /^\/?pdf\//i.test(decoded)) {
    return getAssetUrl(decoded);
  }
  return decoded;
}

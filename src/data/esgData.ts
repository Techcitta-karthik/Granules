export interface DocLinkItem {
  name: string;
  url: string;
  type: 'pdf' | 'web' | 'linkedin';
}

export interface EsgSubfactorItem {
  id: string;
  factor: string;
  subfactor: string;
  keywords: string[];
  docLinks: DocLinkItem[];
  factsheet?: string;
  highlights: string;
  frameworks?: string[];
  ratings?: string[];
  brsrPrinciple?: string;
  assetManager?: string;
  year?: string;
}

export const ESG_FACTORS_ORDER: string[] = [
  'Management Approach',
  'Company Overview',
  'Board of Directors',
  'Environment',
  'Social',
  'Governance',
  'Resilience',
  'Materiality Assessment',
  'Awards and Recognitions',
  'Verification and Assurances',
  'Ratings and Indices',
  'ISO and Certifications',
  'Memberships',
  'Partnerships',
  'ESG Videos and News',
  'ESG Press Releases',
  'Corporate Information',
  'Profile Sources',
  'BRSR Section A: General Disclosures',
  'BRSR Section B: Management And Process Disclosures',
  'BRSR Section C: Principle 1',
  'BRSR Section C: Principle 2',
  'BRSR Section C: Principle 3',
  'BRSR Section C: Principle 4',
  'BRSR Section C: Principle 5',
  'BRSR Section C: Principle 6',
  'BRSR Section C: Principle 7',
  'BRSR Section C: Principle 8',
  'BRSR Section C: Principle 9',
];

const PDF_DEFAULT = '/documents/Granules_Integrated-Report-2024-25-6f0e58611b3c.pdf';
const ANNUAL_REPORT_PDF = '/documents/Granules_Annual-Report-FY26-8dce345b8083.pdf';

export const COMPLETE_ESG_DATA: EsgSubfactorItem[] = [
  // ==================== MANAGEMENT APPROACH ====================
  {
    id: 'ma-1',
    factor: 'Management Approach',
    subfactor: 'Message from Chairperson',
    keywords: ['Board of Directors', 'Chairman'],
    docLinks: [
      { name: 'Integrated Annual Report 2024-25', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Sustainability Policy', url: '/documents/Granules-Sustainability-Webpage-Content-56f22fc084e5.pdf', type: 'pdf' },
    ],
    highlights:
      'Dr. Krishna Prasad Chigurupati (Chairman and Managing Director): Sustainability has become an increasingly important determinant of long-term competitiveness in the pharmaceutical industry, influencing market access, stakeholder expectations and capital allocation. Our purpose of healing lives responsibly through pioneering green science is supported by SBTi-validated targets aligned with the 1.5°C pathway and our commitment to achieve net zero emissions by 2050. During FY2025–26: We earned an EcoVadis Gold rating, placing us among the top 5% globally. We received a CDP Climate Change score of ‘A’. The Gagillapur facility achieved Zero Waste to Landfill Platinum Plus certification. We became a signatory to the UN Women’s Empowerment Principles. Our S&P Corporate Sustainability Assessment score improved to 62, positioning us within the top 10% globally. These outcomes reflect the growing maturity of our sustainability journey and reinforce our standing as a responsible partner in global pharmaceutical supply chains. Senn brings decades of scientific expertise in peptide synthesis and longstanding customer relationships across the pharmaceutical and cosmetics industries. This is a deliberate step into an area of global therapeutics where scientific capability, manufacturing precision and long-term partnerships will increasingly define value creation. On the India side, our Peptides Platform, anchored by a new Centre of Excellence at IIT Hyderabad, is engaged in customer programmes in close collaboration with our Zurich team. Together, this provides us with a differentiated platform that combines Swiss scientific capability with Indian scale.',
    frameworks: ['GRI Standards', 'UN SDGs', 'TCFD', 'UNGC', 'BRSR Core'],
    ratings: ['EcoVadis Gold', 'CDP A', 'S&P CSA 62'],
    brsrPrinciple: 'Principle 1',
    assetManager: 'BlackRock / Vanguard Aligned',
    year: '2026',
  },
  {
    id: 'ma-2',
    factor: 'Management Approach',
    subfactor: 'Message from Chairperson of Sustainability Committee',
    keywords: ['Board of Directors', 'Chairman'],
    docLinks: [
      { name: 'CSR Policy', url: '/documents/CSR-Policy-7f3b00771044.pdf', type: 'pdf' },
    ],
    highlights:
      'Mrs. Uma Devi Chigurupati (Executive Director): At Granules, we believe our true strength lies in our people and the communities we serve. We are committed to fostering a culture of care, inclusivity, and innovation that empowers our employees to thrive. Our focus on gender diversity, employee well-being, and professional growth ensures that every individual feels valued, supported, and inspired to excel. We actively promote learning, development, and skilling opportunities, nurturing talent to meet future challenges. Beyond our workplace, our CSR initiatives prioritize health, skilling, and well-being, driving impactful programs that uplift communities. By integrating these values into our operations and strengthening our bonds with stakeholders, we remain dedicated to healing lives responsibly and sustainably while creating a positive, enduring impact on society.',
    frameworks: ['UN SDGs', 'UN WEPs', 'GRI 400', 'BRSR Core'],
    ratings: ['Great Place to Work'],
    brsrPrinciple: 'Principle 3',
    assetManager: 'State Street Global Advisors',
    year: '2026',
  },
  {
    id: 'ma-3',
    factor: 'Management Approach',
    subfactor: 'Message from Head of Corporate Strategy and ESG',
    keywords: ['Leadership', 'Corporate Strategy', 'Decarbonization'],
    docLinks: [
      { name: 'GHG Verification Report FY 25-26', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      "Sanjay Kumar (Chief Strategy and Sustainability Officer): At Granules, sustainability is more than a commitment—it is the cornerstone of our strategy to deliver long-term value responsibly. As we navigate the challenges of climate change, we are proud of our comprehensive approach to decarbonization. Our Science Based Targets initiative (SBTi)-validated goals, spanning near-term, long-term, and net zero pathways, reflect our alignment with the 1.5°C trajectory. Granules' focus extends beyond reducing Scope 1 and 2 emissions; with Scope 3 emissions constituting approximately 88% of our footprint, we have launched a Supplier Sustainability Program to collaborate with top suppliers, driving transparency, disclosures, and actionable climate goals. Initiatives such as Granules CZRO and our green molecule platform underscore our dedication to pioneering innovative solutions for a comprehensive solution to Scope 3 emissions and thus driving a sustainable future. Equally, we prioritize employee well-being, gender diversity, and skill development while advancing impactful CSR programs in health, education, and community well-being. By integrating ESG principles across our operations and fostering trust-based partnerships with stakeholders, we aim to create a resilient, sustainable ecosystem.",
    frameworks: ['TCFD', 'SBTi 1.5°C', 'GRI 300', 'CDP'],
    ratings: ['CDP Climate A', 'EcoVadis Gold'],
    brsrPrinciple: 'Principle 6',
    assetManager: 'Fidelity ESG Index',
    year: '2026',
  },
  {
    id: 'ma-4',
    factor: 'Management Approach',
    subfactor: 'Company Vision and Mission',
    keywords: [],
    docLinks: [
      { name: 'Vision & Mission', url: '/company', type: 'web' },
    ],
    highlights:
      'Our Purpose: Deeply rooted in our hearts, our purpose drives us to responsibly heal lives through pioneering green science. With a strong commitment to environmental stewardship, we strive to integrate sustainability and growth in our journey; Our Vision: With ambition that creates change exceeding far beyond our horizons, our vision inspires us to push boundaries and redefine possibilities.',
    frameworks: ['UN SDGs'],
    brsrPrinciple: 'Principle 1',
    year: '2026',
  },

  // ==================== COMPANY OVERVIEW ====================
  {
    id: 'co-1',
    factor: 'Company Overview',
    subfactor: 'Company Overview',
    keywords: [],
    docLinks: [{ name: 'Corporate Factsheet', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      "Granules India Limited is a vertically integrated pharmaceutical Company with capabilities spanning the entire value chain, including Active Pharmaceutical Ingredients (APIs), Pharmaceutical Formulation Intermediates (PFIs), Finished Dosages (FDs) and peptide/CDMO operations. The Company's integrated business model, supported by scale, cost efficiency, backward integration and strong regulatory capabilities, enables it to serve more than 300 customers across over 80 countries. North America continued to remain the Company's largest market during FY 2025-26, while Europe emerged as a strong growth contributor. Finished dosages remained the core business, contributing 74% of total revenues, supported by a growing portfolio of complex generics and value-added formulations. Granules is steadily transitioning towards a more differentiated and value-driven business model with increasing focus on complex generics, controlled substances, oncology and peptide therapeutics.",
  },
  {
    id: 'co-2',
    factor: 'Company Overview',
    subfactor: 'ESG a Core Pillar of Strategy',
    keywords: ['Strategy'],
    docLinks: [
      { name: 'Governance Framework', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Strategic Vision', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      'Our sustainability governance framework enables structured oversight, cross-functional coordination and organisation-wide alignment of ESG priorities. The framework integrates sustainability considerations into strategic planning, operational execution and performance monitoring, supporting responsible business practices and long-term value creation. Built on a multi-tier governance structure, the framework strengthens accountability at every level of the organisation while enabling timely decision-making, continuous monitoring and effective implementation of ESG initiatives across functions and locations; At Granules India, sustainability is embedded in the way we operate, innovate and create long-term value. Guided by our purpose of healing lives responsibly through pioneering green science, we remain focused on reducing our environmental footprint while advancing more sustainable manufacturing practices. Our approach centres on responsible resource stewardship, climate action and circularity, enabling us to create positive outcomes for both people and the planet.',
  },
  {
    id: 'co-3',
    factor: 'Company Overview',
    subfactor: 'ESG Reporting Track Record',
    keywords: ['Affiliations', 'Reporting'],
    docLinks: [
      { name: 'Reporting History', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'ESG Profile Record', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 10',
    highlights: 'Details related to ESG are available since FY2017.',
  },
  {
    id: 'co-4',
    factor: 'Company Overview',
    subfactor: 'Sustainability Plan and Goals',
    keywords: ['Commitments', 'Goals', 'Plan'],
    docLinks: [{ name: 'Sustainability Plan 2026', url: PDF_DEFAULT, type: 'pdf' }],
    highlights: 'Specific commitments, goals and targets set by the entity with defined timelines are disclosed in Integrated Annual Report 2026.',
  },
  {
    id: 'co-5',
    factor: 'Company Overview',
    subfactor: 'ESG Materiality Assessment',
    keywords: ['Materiality', 'Assessment'],
    docLinks: [{ name: 'Double Materiality Dossier', url: ANNUAL_REPORT_PDF, type: 'pdf' }],
    factsheet: 'A : 13',
    highlights:
      'Our sustainability priorities are shaped through a structured materiality assessment process that integrates stakeholder perspectives, industry developments and strategic business considerations. During FY26, we conducted a Double Materiality Assessment to identify ESG topics that are most relevant to our operations, long-term growth trajectory and stakeholder expectations. The process supports informed decision-making, strengthens risk management and enables ESG integration across the organisation. The materiality assessment was conducted through a structured, phased evaluation process aligned with recognised global reporting and disclosure frameworks including GRI, SASB, BRSR, CDP and TCFD.',
  },
  {
    id: 'co-6',
    factor: 'Company Overview',
    subfactor: 'Dedicated Executive ESG Role',
    keywords: ['Board of Directors', 'Board Skills', 'Strategy'],
    docLinks: [
      { name: 'ESG Committee Charter', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Board Composition', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      'Sustainability & Corporate Social Responsibility Committee: Chairman: Mr. Kapil Kumar Mehan; Members: Dr. Sethurathnam Ravi, Mr. K.B. Sankar Rao and Dr. Krishna Prasad Chigurupati.',
  },
  {
    id: 'co-7',
    factor: 'Company Overview',
    subfactor: 'Board Skill Depth',
    keywords: ['Board of Directors', 'Board Skills'],
    docLinks: [{ name: 'Board Skills Matrix', url: ANNUAL_REPORT_PDF, type: 'pdf' }],
    factsheet: 'A : 6',
    highlights: 'Matrix setting out the core skills/ expertise/competence of the Board of Directors is disclosed in the Integrated Annual Report 2026.',
  },
  {
    id: 'co-8',
    factor: 'Company Overview',
    subfactor: 'Recognised ESG Frameworks',
    keywords: ['Frameworks'],
    docLinks: [{ name: 'ESG Framework Alignment', url: PDF_DEFAULT, type: 'pdf' }],
    factsheet: 'A : GRI, UNSDGs, TCFD, SASB, UNGC',
    highlights:
      'The Report adheres to the Global Reporting Initiative (GRI) 2021 standards and aligns with the Task Force on Climate-Related Financial Disclosures (TCFD) recommendations. The GRI Framework provides a comprehensive structure for disclosing our sustainability performance, enhancing the Report’s global relevance. Integrating TCFD elements, especially in the risk assessment section, underscores Granules’ commitment to achieving net zero emissions by 2050, with climate action being a strategic priority. We have mapped our initiatives to the United Nations Sustainable Development Goals (UNSDGs) and are proud signatories of the United Nations Global Compact (UNGC). We also follow the Sustainability Accounting Standards Board (SASB) guidelines for Biotechnology & Pharmaceuticals, ensuring industry-specific disclosures. These frameworks support our broader sustainability strategy and demonstrate our commitment to tackling pressing global challenges.',
  },
  {
    id: 'co-9',
    factor: 'Company Overview',
    subfactor: 'Supply Chain ESG Influence',
    keywords: ['Supply Chain'],
    docLinks: [{ name: 'Supplier Code of Conduct', url: '/documents/Granules-Code-of-Business-Conduct-for-Suppliers-b394765c24cf.pdf', type: 'pdf' }],
    highlights:
      'Granules is committed to maintaining responsible procurement practices across its supply chain by implementing stringent protocols for vendor identification and approval. We ensure rigorous standards are met through periodic site audits, regulatory approval checks, and regular sample analyses to uphold the highest product quality. As part of our procurement process, suppliers and vendors undergo thorough evaluations based on material risk assessments, compliance with environmental regulations, labor laws, carbon footprint considerations, and health and safety parameters. Granules have established a Supplier Code of Conduct that articulates our vision and expectations from Manufacturers, Suppliers, Service Providers, Traders, Consultants, and Contractors (collectively referred to as "Suppliers"). Key elements of our Supplier Code of Conduct include: Ethical conduct and integrity in all business dealings. Compliance with human rights standards, ensuring the dignity and protection of employees. Adherence to all relevant environmental regulations and maintenance of necessary permits and licenses. Provision of a safe and conducive work environment with a Health and Safety Policy/Guideline that aligns with local and national regulations. Implementation of a management system to ensure compliance with laws and regulations, manage operational risks, and drive continuous improvement.',
  },
  {
    id: 'co-10',
    factor: 'Company Overview',
    subfactor: 'Standalone Sustainability / ESG Report',
    keywords: ['Reporting'],
    docLinks: [
      { name: 'BRSR Report 2026', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Integrated Report 2026', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights: 'Business Responsibility and Sustainability Report is included in Integrated Annual Report 2026.',
  },
  {
    id: 'co-11',
    factor: 'Company Overview',
    subfactor: 'Integrated Report',
    keywords: ['Reporting'],
    docLinks: [{ name: 'Integrated Report Dossier', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'Integrated Annual Report adheres to the Global Reporting Initiative (GRI) 2021 standards and aligns with the Task Force on Climate-Related Financial Disclosures (TCFD) recommendations. The GRI Framework provides a comprehensive structure for disclosing our sustainability performance, enhancing the Report’s global relevance. Integrating TCFD elements, especially in the risk assessment section, underscores Granules’ commitment to achieving net zero emissions by 2050, with climate action being a strategic priority. We have mapped our initiatives to the United Nations Sustainable Development Goals (UNSDGs) and are proud signatories of the United Nations Global Compact (UNGC). We also follow the Sustainability Accounting Standards Board (SASB) guidelines for Biotechnology & Pharmaceuticals, ensuring industry-specific disclosures.',
  },
  {
    id: 'co-12',
    factor: 'Company Overview',
    subfactor: 'Carbon Disclosure / GHG Report',
    keywords: ['Climate', 'Environment', 'GHG', 'Emissions', 'Reporting'],
    docLinks: [{ name: 'GHG Verification Statement', url: ANNUAL_REPORT_PDF, type: 'pdf' }],
    highlights:
      'Information on GHG emissions is available in the Integrated Annual Report 2026; The Company achieved total energy savings of 2,309,552 kWh, resulting in a GHG emission reduction of 1,640 tCO2 e through energy efficiency measures. Further, increased adoption of renewable electricity contributed to an additional 6,027 tCO2 e reduction in Scope 2 emissions. Additionally, for offsetting emissions, Granules procured 80,000 MWh of I-RECs for its API, FD, and R&D units, resulting in a reduction of approximately 56,800 tCO2 e of GHG emissions. Collectively, these initiatives generated annual cost savings of approximately ₹176.4 lakhs, and the avoided GHG emissions is 64,467 tCO2 e strengthened energy resilience, and supported alignment with statutory disclosures and ESG reporting requirements under BRSR, GRI, and global rating frameworks.',
  },
  {
    id: 'co-13',
    factor: 'Company Overview',
    subfactor: 'Gender Pay, Diversity and Inclusions Report',
    keywords: ['Diversity and Equality', 'Reporting'],
    docLinks: [
      { name: 'Diversity & Inclusion Disclosures', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Equal Opportunity Policy', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      'Information on Inclusion and Diversity is disclosed in the Integrated Annual Report 2026; Diversity and Inclusion: Strengthening an inclusive workplace culture that supports equal opportunities, diversity and employee participation. Employee Well-being: Supporting the physical, mental and emotional well-being of employees through workplace engagement and support initiatives.',
  },
  {
    id: 'co-14',
    factor: 'Company Overview',
    subfactor: 'Company Website ESG Links',
    keywords: ['Approach'],
    docLinks: [{ name: 'Granules Sustainability Web', url: '/sustainability', type: 'web' }],
    highlights: "Sustainability section is available on Company's Website.",
  },
  {
    id: 'co-15',
    factor: 'Company Overview',
    subfactor: 'Company Website Governance Links',
    keywords: ['Approach'],
    docLinks: [{ name: 'Granules Governance Web', url: '/investor', type: 'web' }],
    highlights: "Governance section is available on the company's website.",
  },

  // ==================== BOARD OF DIRECTORS ====================
  {
    id: 'bod-1',
    factor: 'Board of Directors',
    subfactor: 'Dr. Krishna Prasad Chigurupati',
    keywords: ['Chairman', 'Managing Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Leadership Dossier', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Dr. Krishna Prasad Chigurupati (Chairman and Managing Director): Dr. Krishna Prasad Chigurupati is the Chairman and Managing Director of Granules India Limited. Under his leadership, the organisation has transformed itself into one of the largest pharmaceutical manufacturing Companies. His pharmaceutical journey started in 1984 with the manufacturing of Paracetamol for quality-conscious customers in the global markets. He pioneered many innovations in pharmaceutical manufacturing, including commercialising Pharmaceutical Formulation Intermediates as a cost-effective product for global finished dosage manufacturers. Dr. Prasad, with his passion for innovation undertook research in process chemistry and filed 33 patents, out of which 5 patents were granted so far. He also ventured into setting up facilities across the continents in cities and countries such as China and the US. He was awarded an Honorary Doctor of Science by GITAM Deemed University for his exemplary contribution to science & society. Dr. Prasad is an avid marathon runner and has participated in many marathons across the globe. In 2010, he along with his wife, Mrs. Uma Devi Chigurupati, ran marathons on all seven continents including Antarctica and the North Pole. In 2015, they completed the ‘World Marathon Challenge’ of running seven marathons on seven continents in seven days. Both these achievements have been recognised by the Guinness Book of World Records. He is a passionate wine connoisseur and is the co-founder of KRSMA. The vineyard and the winery are located near Hampi. Today the wine from this vineyard is recognised worldwide and has put Hampi Hills and India on the world wine map. Dr. Prasad is the President of the Hyderabad Chapter of Swarna Bharat Trust, an NGO involved in the holistic improvement of the face of rural India, in the fields of Health, Education, Employment and Human Development.',
  },
  {
    id: 'bod-2',
    factor: 'Board of Directors',
    subfactor: 'Mrs. Uma Devi Chigurupati',
    keywords: ['Executive Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Executive Director Dossier', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Mrs. Uma Devi Chigurupati (Executive Director): An entrepreneur, a successful businesswoman, a sportsperson, and a two-time Guinness Book of World Record holder, Mrs. Uma Devi Chigurupati is also the Executive Director of Granules India Limited. She spearheads the Corporate Social Responsibility and Human Resources functions in the Company. A post-graduate in Soil Microbiology from Nagarjuna University, she holds more than three decades of experience in Pharmaceuticals across various corporate functions. Mrs. Chigurupati has been the Chairperson of FICCI FLO Hyderabad. During her tenure, she has taken up many initiatives to empower women at both the grassroots and white-collar levels. Mrs. Chigurupati is also Director of KRSMA Estates Private Limited, one of India’s premier boutique wineries. Under her tenure, she has established the vineyard in the Hampi Hills of Karnataka and has been vital to the ongoing operations at the site.',
  },
  {
    id: 'bod-3',
    factor: 'Board of Directors',
    subfactor: 'Ms. Priyanka Chigurupati',
    keywords: ['Executive Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Executive Director Dossier', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Ms. Priyanka Chigurupati (Executive Director): Ms. Priyanka Chigurupati, Executive Director, Granules India Limited leads Global Sales, Strategy and Quality Compliance, among other roles within the Company. She has been with Granules for over 15 years and has contributed across multiple divisions, serving in various leadership capacities. She is currently also serving as a Director at Granules Pharmaceuticals Inc., where she held the position of Executive Director from 2017 to 2024. Priyanka holds a Bachelor of Science in Business Management from Case Western Reserve University in Cleveland, Ohio, and has completed an Executive Leadership Program at Harvard Business School, Boston, Massachusetts.',
  },
  {
    id: 'bod-4',
    factor: 'Board of Directors',
    subfactor: 'Mr. Harsha Chigurupati',
    keywords: ['Executive Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Executive Director Dossier', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Mr. Harsha Chigurupati (Executive Director): Mr. Harsha Chigurupati has been with Granules India since 2006 and was operational in multiple departments across the company. Over the years he has focused on driving transformation, innovation, and long-term strategic growth across the pharmaceutical and healthcare sectors. With leadership responsibilities spanning technology, transformation, and organizational development, He is particularly passionate about leveraging emerging technologies, artificial intelligence, and advanced manufacturing to create scalable, globally competitive businesses. Combining an entrepreneurial mindset with a strong emphasis on accountability, agility, and execution, he continues to champion initiatives that strengthen organizational capabilities, foster innovation, and position the company for sustained global growth.',
  },
  {
    id: 'bod-5',
    factor: 'Board of Directors',
    subfactor: 'Mr. K. B. Sankar Rao',
    keywords: ['Non-Executive Non Independent Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Director Profile PDF', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Mr. K. B. Sankar Rao (Non-Executive Non Independent Director): Mr. K. B. Sankar Rao is an M.Pharm from Andhra University and has rich experience of more than three decades in various domains including manufacturing, projects, supply chain, quality, R-D and business strategy. Mr. K. B. Sankar Rao was associated with various reputed organizations like Warner Hindustan, Cipla and Dr. Reddy’s. He led large teams in manufacturing while institutionalizing systems and processes to drive efficiencies. He was involved in the implementation of ‘Theory of Constraints’ principles to improve due date performance in R-D. He was instrumental in deploying a self-managed team concept to empower the workforce in manufacturing while driving productivity. Mr. K.B. Sankar Rao was the Managing Director of Raje Retail Private Limited, a pharmacy retail chain under the brand name- “My Health Pharmacy” in Hyderabad.',
  },
  {
    id: 'bod-6',
    factor: 'Board of Directors',
    subfactor: 'Mrs. Sucharita Rao Palepu',
    keywords: ['Non-Executive Independent Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Director Profile PDF', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Mrs. Sucharita Rao Palepu (Non-Executive Independent Director): Sucharita Rao Palepu is a Chartered Accountant and possesses over three decades of professional experience in Information Technology and Financial Services Industries. She is currently an Independent Advisor, specialising in Organisation & HR Transformation. She was earlier in HR Leadership positions at Tech Mahindra, Infosys and Mahindra Satyam and was also associated with SMIFS Capital Markets & Pennar Paterson Securities. She has worked extensively on HR Strategy, Talent Management, Learning & Development, Global Reward programs and Diversity initiatives. Over her career in HR, she has led several transformation programs and large-scale initiatives that have been recognised across various platforms. She is actively involved in a few NGOs and is also a certified coach. She was awarded the Exemplary Woman in Leadership Award (APAC) in HR Branding Awards 2015- 16.',
  },
  {
    id: 'bod-7',
    factor: 'Board of Directors',
    subfactor: 'Mr. Kapil Kumar Mehan',
    keywords: ['Non-Executive Independent Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Director Profile PDF', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Mr. Kapil Kumar Mehan (Non-Executive Independent Director): Kapil Kumar Mehan is an accomplished business leader with deep managerial, domain and strategic expertise in the areas of Agri/Agri tech sectors, green technology (green ammonia), business strategy, management, business performance improvement, setting up a new business and strategic/financial investments in the manufacturing/Agribusiness sectors. He has keen insights into business and policy/ regulatory dynamics of the Agri and green chemistry industries. With his vast exposure across fertiliser, chemicals, consumer products and the agriculture industry globally, he is providing advisory and expertise across varied consulting assignments with industry (covering Indian and African markets) and marquee consulting firms such as E & Y, BCG, etc. A graduate of Veterinary Sciences and animal health, a Postgraduate in Management-SPA from the Indian Institute of Management (IIM)- Ahmedabad and has completed the Advanced Management Program from Harvard Business School. He has experience in multiple Industry verticals such as fertilisers, Crop Protection Products, Seeds, and Agri Input retail, Fresh Produce Supply Chain, Industrial Chemicals, Consumer Products and Cement. Prior to the current advisory role, during his tenure in the industry, he has served in the capacity of Group Chief Executive Officer–Agribusiness of Adventz Group, as Managing Director of Coromandel International Limited in the Fertiliser industry and as an Executive Director in Tata Chemicals Limited. Key initiatives/activities handled in his role with Industry encompass Acquisitions, Mergers and Post Merger integration, Business transformational interventions, new business development / Inorganic growth, Brownfield expansions with direct involvement in EPC / EPCM, Technology contracts, overseas and local strategic sourcing tie-ups. He is an active participant in key industry bodies at the National and International levels, including the Fertiliser Association of India (FAI), the International Fertiliser Association (IFA), the National Agriculture Council of Confederation of Indian Industry (CII), Chairman of Agricultural Committee of Northern Regional Council of CII, etc. He has been the past Chairman of the Alkali Manufacturers Association of India and the Salt Producers Association, Co-Chairman of FAI, and Chairman of the Marketing Committee of FAI. He has served on the Board of the International Fertilisers Association (IFA) and Chaired its Agriculture Committee. He has led many industry-level advocacy efforts for a healthy enabling policy framework for growth, sustainability, ease of doing business and meeting the requirements of multiple stakeholders in the fertiliser sector. He serves on the Board of Directors, as an Independent Director of Nuziveedu Seeds Limited & Punjab Chemicals and Crop Protection Limited.',
  },
  {
    id: 'bod-8',
    factor: 'Board of Directors',
    subfactor: 'Dr. Sethurathnam Ravi',
    keywords: ['Non-Executive Independent Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Director Profile PDF', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Dr. Sethurathnam Ravi (Non-Executive Independent Director): Dr. Sethurathnam Ravi has a doctorate in finance and is a practising Chartered Accountant, having over 36 years of experience. He holds a diploma in Information Systems Audit (DISA) and is an Associate Member of the Association of Certified Fraud Examiners (CFE), USA. He is also registered as an Insolvency Resolution Professional. He is the Founder of Ravi Rajan & Co. LLP, a chartered accountancy firm specialising in Forensic and Insolvency assignments, Finance & Management, Turnaround Strategies, Business Valuations, Brand and Share Valuation, Assurance, Audit and Taxation. Dr. Ravi is Chairman of Tourism Finance Corporation of India Limited and 360 One Asset Management Limited. He also serves on the Boards of Aditya Birla Health Insurance Company Limited, Aditya Birla ARC Limited, Aditya Birla Money Limited, PCBL Chemicals Limited, Usha Martin Limited, BillMart Fintech Limited, Xander Advisors India Private. Limited., Usha Martin UK Limited. and S Ravi Financial Management Services Private Limited. He has served as the Chairman and Director of BSE Ltd and Chairman and Director of UTI Trustee Company Private Limited. Dr. Ravi was the Jury Chair for ICAI’s Awards for Excellence in Financial Reporting 2023-24 and 2024-25, was a Special Invitee to ICAI’s Strategy Perspective Planning and Monitoring Committee (SPPMC), he was a member of SEBI’s Takeover Panel as well as its Mutual Fund Advisory Committee. He was also a Member of the Working Group formed by the Reserve Bank of India for the preparation of the Draft Government Securities Regulations within the Framework of the Government Securities Bill 2004. Over the span of his career, Dr. Ravi has served on the Boards of more than 45 Companies across various sectors. He is regularly invited by educational institutions and regulatory bodies to give talks, panel discussions, etc.',
  },
  {
    id: 'bod-9',
    factor: 'Board of Directors',
    subfactor: 'Mr. Rajiv Pritidas Kakodkar',
    keywords: ['Non-Executive Independent Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Director Profile PDF', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Mr. Rajiv Pritidas Kakodkar (Non-Executive Independent Director): Mr. Rajiv Pritidas Kakodkar has over four decades of experience in the Indian pharmaceutical industry. He holds a Bachelor of Pharmacy degree from the University of Mumbai, and an MBA from the Stuart School of Business - Illinois Institute of Technology, USA. Mr. Kakodkar’s areas of expertise include global sourcing, indenting, trading and distribution of pharmaceutical ingredients. He founded Daiwat Chemicals in 1983 which began as an exclusive representative and indent sales agent of a French multinational. Over the decades, he has been involved in the sourcing of drug substances from India on behalf of multiple innovators and generic pharmaceutical Companies, as well as worldwide distributors of APIs. Through this long association with the industry, he has had a first-hand view of its evolution from technocrat-driven single-product factories to world-class, multi-workshop facilities with all the requisite regulatory approvals. He owns and operates businesses in India and Singapore. He also served as an Independent Director on the Board of Directors of Indoco Remedies Limited and Vasundhara Rasayans Limited.',
  },
  {
    id: 'bod-10',
    factor: 'Board of Directors',
    subfactor: 'Mr. Arun Sawhney',
    keywords: ['Non-Executive Independent Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Director Profile PDF', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Mr. Arun Sawhney (Non-Executive Independent Director): Mr. Arun Sawhney holds bachelor’s degree in commerce from the University of Mumbai and Post Graduate Diploma in Management from IMI, New Delhi. Mr. Sawhney brings four decades of rich experience in Chemical and Pharmaceutical industry while working with Companies like Ranbaxy, Dr Reddys, Max-Gb Limited. Mr Sawhney possess deep expertise in the areas of corporate strategy, business development, sales and marketing and new product planning to commercialization. In his last assignment as CEO and Managing Director of Ranbaxy, Mr. Sawhney successfully led one of the largest mergers in Indian Corporate history. Mr. Sawhney was also a founder member of Indian Pharmaceutical Export Promotion Council (Pharmexcil) and was Chairman of Pharmaceutical Committee of the Confederation of Indian Industries (CII) during 2012-2014. Mr. Sawhney is currently engaged with leading Companies in advisory capacity and a visiting faculty at IIM-Lucknow for subjects of Leadership and Organisation Behaviour.',
  },
  {
    id: 'bod-11',
    factor: 'Board of Directors',
    subfactor: 'Dr. Saumen Chakraborty',
    keywords: ['Non-Executive Independent Director'],
    docLinks: [
      { name: 'Profile on Website', url: '/company/leadership', type: 'web' },
      { name: 'Director Profile PDF', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Director Page', url: '/company', type: 'web' },
    ],
    highlights:
      'Dr. Saumen Chakraborty (Non-Executive Independent Director): Dr. Saumen Chakraborty is a Graduate in Physics from Visvabharati University- Santiniketan, a Postgraduate in Management from the Indian Institute of Management (IIM)- Ahmedabad and is an Executive Fellow in Management from the Indian School of Business (ISB)- Hyderabad. He possesses over four decades of rich experience in Corporate Finance, Human Resources, IT& BPE, Manufacturing Operations and Quality functions while working with Dr. Reddy’s, Tecumseh, Eicher, C-DoT and CMC. He had played a significant role in the evolution of Dr. Reddy´s as a Global Pharmaceutical Company, while handling various CXOs roles over 20 years. As a Global CFO at Dr. Reddy’s, he built robust financial systems and strong corporate governance thereby enhancing shareholders value. Dr. Saumen as Global Chief of HR, built contemporary HR processes and systems to make Dr. Reddy’s a Great Place to Work. He established the Business Process Excellence function and led TOC implementation in Dr. Reddy’s. Saumen has sharp business acumen, strong process orientation and leadership capabilities to build high-performing teams. He is the recipient of the Best CFO award from various bodies, including CNBC, IMA and BW-Yes Bank. He has been a speaker at multiple global and national conferences and academic institutes. He serves as an Independent Director for Krishna Institute of Medical Sciences Limited. He is the founder and Managing Director of Samarjita Management Consultancy Private Limited.',
  },

  // ==================== ENVIRONMENT ====================
  {
    id: 'env-1',
    factor: 'Environment',
    subfactor: 'Environment Strategy in Place',
    keywords: ['Strategy'],
    docLinks: [
      { name: 'Environmental Strategy Dossier', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Sustainability Portal', url: '/sustainability', type: 'web' },
    ],
    highlights:
      'At Granules India, sustainability is embedded in the way we operate, innovate and create long-term value. Guided by our purpose of healing lives responsibly through pioneering green science, we remain focused on reducing our environmental footprint while advancing more sustainable manufacturing practices. Our approach centres on responsible resource stewardship, climate action and circularity, enabling us to create positive outcomes for both people and the planet. Natural capital is a core pillar of our sustainability strategy, shaping the way we manage greenhouse gas (GHG) emissions, energy consumption, water resources, waste, and climate-related risks. Through a holistic and data-driven approach, we focus on lowering emissions through energy optimisation, process efficiencies, and the increasing adoption of cleaner energy sources. Our water stewardship initiatives emphasise responsible water management, enhanced recycling, conservation, and long-term water security across operations.',
  },
  {
    id: 'env-2',
    factor: 'Environment',
    subfactor: 'Environmental Reporting',
    keywords: ['Reporting'],
    docLinks: [{ name: 'BRSR Reporting Annexure', url: ANNUAL_REPORT_PDF, type: 'pdf' }],
    highlights:
      'Details of total energy consumption and energy intensity, disclosures related to water, water discharged, air emissions (other than GHG emissions), greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity, waste management, total scope 3 emissions & its intensity is available in the Integrated Annual Report 2026.',
  },
  {
    id: 'env-3',
    factor: 'Environment',
    subfactor: 'Environmental Policy and Commitments',
    keywords: ['Commitments', 'Policies'],
    docLinks: [
      { name: 'EHS Policy', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Climate Change Position', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      'At Granules India, sustainability is embedded in the way we operate, innovate and create long-term value. Guided by our purpose of healing lives responsibly through pioneering green science, we remain focused on reducing our environmental footprint while advancing more sustainable manufacturing practices. Our approach centres on responsible resource stewardship, climate action and circularity, enabling us to create positive outcomes for both people and the planet. Natural capital is a core pillar of our sustainability strategy, shaping the way we manage greenhouse gas (GHG) emissions, energy consumption, water resources, waste, and climate-related risks. Through a holistic and data-driven approach, we focus on lowering emissions through energy optimisation, process efficiencies, and the increasing adoption of cleaner energy sources. Our water stewardship initiatives emphasise responsible water management, enhanced recycling, conservation, and long-term water security across operations. We also promote circular economy principles through waste reduction at source, resource recovery, and minimisation of landfill dependency. In parallel, we integrate climate risk assessment and resilience planning into our business processes to address the evolving impacts of climate change. Through these integrated efforts, we remain committed to safeguarding natural ecosystems, optimising resource efficiency, and delivering long-term environmental and business value.',
  },
  {
    id: 'env-4',
    factor: 'Environment',
    subfactor: 'Identifying and Assessing Climate and Environment Related Risks',
    keywords: ['Climate Risk Control'],
    docLinks: [{ name: 'Climate Risk Assessment', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'Climate Change will increase the frequency of natural disasters like heat waves, flooding, and cyclones, which have the potential to physically impact our operations. Climate Change will also lead to transition risks like regulatory, legal, technological, and marketbased risks. Granules is adopting a comprehensive approach to GHG risk management and mitigation, aligned with its long-term net zero ambition. During the reporting year, the Company strengthened its GHG emissions estimation across Scope 1, 2, and 3 categories, supported by an enhanced supplier sustainability program to improve upstream data and engagement. Focused initiatives on energy efficiency across manufacturing operations, along with increased adoption of renewable energy and energy optimisation measures, have contributed to reducing overall emissions. Additionally, the Company is adopting the biofuels consumption to lower Scope 1 emissions, further supporting its decarbonisation pathway while integrating climate considerations into core business processes.',
  },
  {
    id: 'env-5',
    factor: 'Environment',
    subfactor: 'Identifying Physical Climate Risks',
    keywords: ['Climate Risk Control'],
    docLinks: [{ name: 'Physical Climate Risk Assessment', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'Water: Our multiple manufacturing locations are subjected to high water risks in the medium- and long-term due to rising temperatures, decrease in rainfall and groundwater levels, associated with increasing population levels and urbanization/industrialization, leading to increased demand for water resources. Water risks could lead to high operating costs for the manufacturing units due to water procurement from third-party or private sources. In addition, reduction in water supply can also affect operational efficiency, leading to a reduction in production capacity; Drought: The prevalence of drought at some of our manufacturing locations could lead to high exposure to third-party water procurement and high water procurement costs; Floods: With the changing climate, we expect increased exposure to flooding due to tropical cyclones and heavy rainfall, especially in coastal districts, which can disrupt or delay manufacturing processes due to property and/or infrastructure damage, repairs, freshwater availability, etc., and further lead to supply chain disruptions. Risks related to floods have critical repercussions due to infrastructure/property damage, power outages and operational shutdown, which can further lead to supply chain disruptions due to unavailability of raw materials and other products, resulting in production losses; Extreme Heat: Enhanced exposure to extreme heat will lead to increased operating costs for energy consumption and cooling needs (or HVAC devices) to ensure optimum efficiency of our equipment and processes. Additionally, an increase in heat waves may lead to illnesses such as heatstroke, reduce labour productivity and further impact supply chains through increased stress on cold-chain logistics. Exposure to excessive heat during work restricts physical capability, work capacity and productivity of workers. Regular exposure to thermally stressful environments can cause negative health impacts, leading to loss of man-days and/or reduced productivity of employees; Cyclone: The intensity and frequency of tropical cyclones is expected to rise in the Bay of Bengal, which can disrupt or delay manufacturing processes due to property and/or infrastructure damage, repairs, freshwater availability, etc., and further lead to supply chain disruptions such as transportation network disruptions, e.g., delays in delivery of raw materials to sites or finished products. The landfall of a cyclone can result in infrastructure damage, uprooting of trees or overhead installations affecting operations. It can also impact the supply chain by making ports and other transportation services inaccessible.',
  },
  {
    id: 'env-6',
    factor: 'Environment',
    subfactor: 'Identifying Transitional Climate Risks',
    keywords: ['Climate Risk Control'],
    docLinks: [{ name: 'Transitional Risk Assessment', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      "Transition Risks: Carbon Pricing Policy and Legal: The financial risks associated with emissions across the business operations and supply chain, levied in the form of carbon taxes. Currently, we are exposed to carbon pricing policies across different jurisdictions where it is in place (in the EU and the UK) or is under consideration (in India, USA, etc.). Commitment to achieve carbon neutrality by 2050. Commitment to reduce Scope 1, 2 and 3 emissions in accordance with SBTi. By reducing CO2 emissions and energy consumption, we aim to mitigate this risk. Along with this, we plan to reduce our energy demand by adopting new and advanced manufacturing technologies and transitioning to clean energy solutions for our business operations; Changing Consumer Preferences: The risk is associated with not making sustainable products, and consumer purchasing behaviour shifting towards more sustainable brands, such as products with less plastic or more recyclable packaging. Hence, there is increasing pressure to decarbonize products across their whole life cycle, including Scope 3 emissions. As ~74% of Granules' emissions are Scope 3, there is additional complexity in sustainable manufacturing as it relies on suppliers decarbonizing their operations. Also, grid decarbonization in 2 countries – China / India – will impact the majority of our Scope 3 emissions. Procurement of sustainable packaging materials. Decarbonizing the supply chain.",
  },
  {
    id: 'env-7',
    factor: 'Environment',
    subfactor: 'Climate Risk Management Processes',
    keywords: ['Climate', 'Process', 'Systems', 'Risk Control'],
    docLinks: [{ name: 'Climate Risk Protocols', url: ANNUAL_REPORT_PDF, type: 'pdf' }],
    highlights:
      '1. Climate Risk Assessment: Facility Assessments: Conduct comprehensive climate risk assessments for all facilities to identify vulnerabilities to physical climate risks such as extreme weather events, flooding, and temperature changes. Supplier Assessments: Evaluate climate risks for strategic suppliers to ensure the resilience of the supply chain. 2. Emission Reduction Initiatives: Energy Efficiency: Implement energy efficiency measures across operations to reduce greenhouse gas emissions. This includes upgrading equipment, optimizing processes, and adopting energy-saving technologies. Renewable Energy: Increase the use of renewable energy sources, such as solar and wind, to power operations. This includes commissioning new renewable energy projects and purchasing renewable energy certificates. 3. Water Management: Water Conservation: Implement water-saving technologies and practices to reduce water consumption. This includes recycling and reusing water in operations and improving water use efficiency. Water Risk Assessments: Conduct water risk assessments to identify and mitigate potential water-related risks, ensuring sustainable water use. 4. Waste Management: Zero Waste to Landfill: Aim to achieve zero waste to landfill by increasing recycling and co-processing of waste. This involves improving waste segregation and finding innovative ways to reuse waste materials. Hazardous Waste Management: Implement strict protocols for the safe handling, storage, and disposal of hazardous waste to minimize environmental impact.',
  },
  {
    id: 'env-8',
    factor: 'Environment',
    subfactor: 'Net Zero / Other Climate Related Commitments',
    keywords: ['Climate', 'Commitments', 'GHG', 'Emissions', 'Targets'],
    docLinks: [
      { name: 'Net Zero Target Dossier', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'SBTi Approval Statement', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 2050',
    highlights:
      "Granules India's Net Zero Commitment and Emissions Reduction Goals. Net Zero Commitment: Achieve net zero GHG emissions across the value chain, including subsidiaries, by FY50. Near-Term Targets: Reduce absolute Scope 1, 2 and 3 emissions by 42% by FY30 from the FY23 baseline and transition to 100% renewable electricity by FY30; Our metrics cover a range of areas including greenhouse gas emissions, energy consumption, water usage, and waste management, reflecting our dedication to achieving net zero emissions by 2050 and fostering a sustainable future.",
  },
  {
    id: 'env-9',
    factor: 'Environment',
    subfactor: 'Amount of GHG Emissions',
    keywords: ['GHG', 'Emissions', 'Metrics'],
    docLinks: [
      { name: 'GHG Verification Audit', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Integrated Annual Report 2026', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 621429, B : 544329, C : 721723',
    highlights:
      'Total GHG Emission FY2026: 6,21,429 tCO2e; FY2025: 5,44,329 tCO2e; FY2024: 7,21,723 tCO2e.',
  },
  {
    id: 'env-10',
    factor: 'Environment',
    subfactor: 'GHG Emission Scope Breakdown',
    keywords: ['GHG', 'Emissions', 'Metrics'],
    docLinks: [
      { name: 'Scope 1-3 Verification', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'BRSR Disclosures', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 59851, B : 66252, C : 560293, D : 57414, E : 18853, F : 468062',
    highlights:
      'FY2026: Scope 1 Emission: 59,851 tCO2e; Scope 2 Emission: 66,252 tCO2e; Scope 3 Emission: 5,60,293 tCO2e; FY2025: Scope 1 Emission: 57,414 tCO2e; Scope 2 Emission: 18,853 tCO2e; Scope 3 Emission: 4,68,062 tCO2e; FY2024: Scope 1 Emission: 56,254 tCO2e; Scope 2 Emission: 31,632 tCO2e; Scope 3 Emission: 6,33,837 tCO2e.',
  },
  {
    id: 'env-11',
    factor: 'Environment',
    subfactor: 'Amount of Water Usage',
    keywords: ['Metrics', 'Water'],
    docLinks: [
      { name: 'Water Consumption Log', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Annual Report Water Disclosures', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 239951, B : 216823, C : 226082',
    highlights:
      'Total volume of water consumption FY2026: 2,39,951 KL; FY2025: 2,16,823 KL; FY2024: 2,26,082 KL.',
  },
  {
    id: 'env-12',
    factor: 'Environment',
    subfactor: 'Sources of Water',
    keywords: ['Water'],
    docLinks: [
      { name: 'Water Sourcing Assessment', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Groundwater & Third-Party Logs', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 393791, B : 4517, C : 356980, D : 2169',
    highlights:
      'Water withdrawal by source FY2026: Third Party Water: 3,93,791 KL, Others: 4517 KL; FY2025: Third Party Water: 3,56,980 KL, Others: 2169 KL; FY2024: Third Party Water: 3,68,002 KL.',
  },
  {
    id: 'env-13',
    factor: 'Environment',
    subfactor: 'Amount of Water Withdrawn',
    keywords: ['Metrics', 'Water'],
    docLinks: [
      { name: 'Water Withdrawal Verification', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Integrated Report 2026', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 398308, B : 359149, C : 368002',
    highlights:
      'Total volume of water withdrawal FY2026: 3,98,308 KL; FY2025: 3,59,149 KL; FY2024: 3,68,002 KL.',
  },
  {
    id: 'env-14',
    factor: 'Environment',
    subfactor: 'Water Intensity',
    keywords: ['Metrics', 'Water'],
    docLinks: [
      { name: 'Water Intensity Calculations', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'BRSR Reporting Annexure', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 6.91, B : 7.16, C : 6.02',
    highlights:
      'Water Intensity FY2026: 6.91 KL/Million Rupee; FY2025: 7.16 KL/Million Rupee; FY2024: 6.02 KL/Million Rupee.',
  },
  {
    id: 'env-15',
    factor: 'Environment',
    subfactor: 'Water Recycled',
    keywords: ['Metrics', 'Water'],
    docLinks: [{ name: 'ZLD Water Recycling Report', url: PDF_DEFAULT, type: 'pdf' }],
    highlights: '39% Wastewater recycled/reused.',
  },
  {
    id: 'env-16',
    factor: 'Environment',
    subfactor: 'Waste Water Safe Discharge',
    keywords: ['Initiatives', 'Metrics', 'Waste Management', 'Water'],
    docLinks: [{ name: 'ZLD Compliance Certificate', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'We maintain Zero Liquid Discharge Systems and Effluent Treatment Plants with RO Recovery Systems to ensure that the effluents generated are treated to minimize the environmental impact and reuse resources wherever possible. The treated water is suitably recycled back into the utility makeup. We treat our wastewater in ETP/ZLD plants wherever possible, and the treated water is used in utility makeup. About 39% of our wastewater is recycled and reused in the operations through our ZLD systems.',
  },
  {
    id: 'env-17',
    factor: 'Environment',
    subfactor: 'Energy Consumption',
    keywords: ['Energy', 'Metrics'],
    docLinks: [
      { name: 'Energy Audit Report', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'BRSR Annexure', url: ANNUAL_REPORT_PDF, type: 'pdf' },
      { name: 'Electricity Logs', url: PDF_DEFAULT, type: 'pdf' },
    ],
    factsheet: 'A : 990.10, B : 881.18, C : 875.95',
    highlights:
      'Total energy consumed FY2026: 990.10 TJ; FY2025: 881.18 TJ; FY2024: 875.95 TJ; We also expanded renewable energy generation through the installation of rooftop solar panels at the MUPS block in Gagillapur, generating 1,203 MWh of solar power. Complementary initiatives, including auto tube cleaning systems for chillers, automatic capacitor banks and energy-efficient lighting solutions, contributed to improved facility performance and resource utilisation. In addition, progress was achieved through the purchase of 80,000 MWh of Renewable Energy Certificates and the procurement of 7,286 MWh of renewable electricity under Power Purchase Agreements.',
  },
  {
    id: 'env-18',
    factor: 'Environment',
    subfactor: 'Renewable Energy Consumption',
    keywords: ['Energy', 'Metrics'],
    docLinks: [
      { name: 'Renewable Power Verification', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'PPA & I-REC Certificates', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 366.30, B : 213.24, C : 143.59',
    highlights:
      'Total energy consumed from renewable sources FY2026: 366.30 TJ; FY2025: 213.24 TJ; FY2024: 143.59 TJ.',
  },
  {
    id: 'env-19',
    factor: 'Environment',
    subfactor: 'Transition to Renewable Energy',
    keywords: ['Energy', 'Initiatives'],
    docLinks: [{ name: 'Renewable Energy Roadmap', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'In FY26, we accelerated our transition towards cleaner energy sources, increasing renewable energy consumption to 366.30 TJ, compared to 213.24 TJ in FY25. Renewable energy accounted for 37% of our total energy mix, up from 24.2% in the previous year, reflecting our continued investments in renewable energy procurement and infrastructure. During the year, 98% of the electricity consumed across our operations was sourced from renewable energy sources, supported by a combination of power purchase agreements (PPAs), onsite solar generation and International Renewable Energy Certificates (I-RECs). To support this transition, we procured 80,000 MWh of renewable electricity through I-RECs and sourced 7,286 MWh of renewable power through PPAs at our Gagillapur facility. These initiatives contributed to a substantial shift in our energy composition, reducing the share of non-renewable energy to 63% and enhancing the proportion of cleaner energy sources within our operational energy requirements.',
  },
  {
    id: 'env-20',
    factor: 'Environment',
    subfactor: 'Amount of Hazardous Waste Generated',
    keywords: ['Metrics', 'Waste Management'],
    docLinks: [
      { name: 'Hazardous Waste Form 4', url: '/documents/GGP-Annual-Returns-Hazardous-Waste-Form-4-E-Waste-Form-3-Biomedical-Waste-Form-IV-and-Environmental--7c3fd95ad004.pdf', type: 'pdf' },
      { name: 'Unit 4 Bio-Medical Waste Return', url: '/documents/Unit-4-Bio-Medical-Waste-Annual-Return-for-the-year-2025-Jan-Dec-df0e4b40ccfc.pdf', type: 'pdf' },
    ],
    factsheet: 'A : 5594.5, B : 3194.38, C : 3953.5',
    highlights:
      'Hazardous Waste FY2026: 5594.5 metric tonnes; FY2025: 3194.38 metric tonnes; FY2024: 3953.5 metric tonnes.',
  },
  {
    id: 'env-21',
    factor: 'Environment',
    subfactor: 'Eliminating Landfill Waste',
    keywords: ['Targets', 'Waste Management'],
    docLinks: [
      { name: 'Bureau Veritas ZWTL Platinum Plus Certificate', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Co-Processing Compliance Report', url: ANNUAL_REPORT_PDF, type: 'pdf' },
      { name: 'Waste Diversion Log', url: PDF_DEFAULT, type: 'pdf' },
    ],
    factsheet: 'A : 934.11, B : 584.2, C : 398',
    highlights:
      'Landfill Waste FY2026: 934.11 MT; FY2025: 584.2 MT; FY2024: 398 MT; The Gagillapur facility achieved a significant sustainability milestone by securing the Zero Waste to Landfill (ZWTL) Certification from Bureau Veritas with an exceptional Platinum+ rating of 99.64%. The recognition highlights the site’s ability to implement world-class waste diversion practices and sets a new benchmark for environmental performance across our manufacturing network. The certification was supported by a waste diversion rate of 99.64%, with only 14.87 MT of waste directed to landfill. Through disciplined segregation practices, streamlined collection systems and the effective routing of waste into recycling and co-processing channels, the facility successfully minimised landfill disposal. Building on this achievement, Granules India is working towards its goal of achieving Zero Waste to Landfill across all manufacturing sites by 2030, reinforcing its focus on resource efficiency, circularity and responsible environmental stewardship.',
  },

  // ==================== SOCIAL ====================
  {
    id: 'soc-1',
    factor: 'Social',
    subfactor: 'Social Strategy in Place',
    keywords: ['Strategy'],
    docLinks: [
      { name: 'CSR Impact Strategy', url: '/documents/CSR-Policy-7f3b00771044.pdf', type: 'pdf' },
      { name: 'Annual Report Social Chapter', url: ANNUAL_REPORT_PDF, type: 'pdf' },
      { name: 'Social Accountability Dossier', url: PDF_DEFAULT, type: 'pdf' },
    ],
    highlights:
      'We work proactively with a broad and diverse supplier ecosystem to strengthen supply chain resilience, mitigate potential risks and maintain access to critical materials and products. Through structured engagement, assessments and collaborative initiatives, we encourage suppliers to align with responsible business practices while supporting shared sustainability goals. At Granules, we recognise that our responsibility towards sustainability extends beyond our operations to encompass our value chain. Our Supplier Sustainability Programme reflects this commitment by promoting environmental stewardship, social responsibility and ethical business practices across our supplier network; We focus on creating opportunities for learning, leadership development and career growth while supporting employee wellbeing, inclusion and workplace safety. Through a people-centric approach, we seek to build a skilled, engaged and future-ready workforce capable of delivering sustainable business success and advancing our strategic priorities; Strong relationships with suppliers, communities, institutions and implementation partners enable us to create value that extends beyond our operations. Through responsible sourcing practices, supplier engagement initiatives and community development programmes, we seek to strengthen trust, enhance resilience across our value chain and contribute to inclusive and sustainable growth. By advancing ethical business conduct, expanding access to opportunities and supporting social well-being, we create meaningful outcomes for stakeholders while reinforcing the foundations of long-term value creation.',
  },
  {
    id: 'soc-2',
    factor: 'Social',
    subfactor: 'Diversity and Inclusion',
    keywords: ['Diversity and Equality', 'Employees', 'Metrics'],
    docLinks: [
      { name: 'UN WEPs Signatory Statement', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Workforce Diversity Disclosures', url: ANNUAL_REPORT_PDF, type: 'pdf' },
      { name: 'Careers Diversity Portal', url: '/careers', type: 'web' },
    ],
    factsheet: 'A : 14.1',
    highlights:
      'Increasing the participation of women across the organisation remains an important focus area within our people strategy. Through focused hiring, development and retention initiatives, we are creating opportunities for greater representation across functions and levels. We support the advancement of women employees through targeted development initiatives that strengthen leadership capabilities, professional growth and career progression opportunities. Mentorship programmes connect women employees with experienced leaders, while focused leadership development initiatives help build confidence, decision-making capabilities and professional networks. Employee well-being encompasses physical, emotional, mental, financial and professional wellness. We seek to create an environment where employees have access to the resources, programmes and support needed to lead healthy and fulfilling lives. Our well-being approach focuses on preventive care, awareness, support systems and employee assistance initiatives that contribute to overall quality of life and workplace satisfaction. During FY26, women represented 10.8% of employees and 14.1% of the overall workforce, while women held 27% of Board positions, reflecting progress towards our diversity aspirations; Granules is committed to respecting and promoting human rights across its operations and value chain by fostering a workplace culture built on dignity, equality, fairness, and inclusion. The Company upholds internationally recognized human rights principles through alignment with global frameworks such as the United Nations Global Compact (UNGC), UN Women’s Empowerment Principles (UN-WEP), and SA8000 Social Accountability standards. Granules ensures fair treatment of employees through nondiscriminatory practices, fair wages, equal opportunity, and safe working conditions.',
  },
  {
    id: 'soc-3',
    factor: 'Social',
    subfactor: 'Health and Safety Policies',
    keywords: ['Employees', 'Health and Safety', 'Policies'],
    docLinks: [
      { name: 'ISO 45001 EHS Policy', url: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf', type: 'pdf' },
      { name: 'Zero Harm Framework', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'OH&S Manual', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      'Granules India Limited maintains a strong focus on upholding high standards of Environment, Health, and Safety (EHS) as a critical enabler of sustainable operations. Recognising that any shortcomings in EHS performance can result in regulatory non-compliance, reputational risks, and potential business disruptions, the Company continues to strengthen its systems and governance frameworks to safeguard long-term value creation. During the year, the EHS policy was revised to reflect strengthened management commitment, supported by a structured implementation framework incorporating defined KPIs, targets, and corporate-level procedures covering critical areas such as process safety, contractor safety, electrical safety, mission safety, and rehabilitation and return-to-work protocols. A robust review and monitoring mechanism has also been instituted to assess the effectiveness of OHS standards and drive continuous improvement across all sites. Our commitment is reinforced through an ISO 45001:2018 certified Occupational Health and Safety Management System, implemented across all our manufacturing and R&D locations at Gagillapur, Jeedimetla, Bonthapally, Pragati Nagar, Genome Valley & Visakhapatnam. Dedicated Occupational Health Centres (OHCs) at these sites support a safe and healthy work environment, led by specialized teams focused on continuously enhancing occupational health and safety practices. To further support employee well-being, full-time doctors are available at each manufacturing location, supported by round-the-clock onsite nursing assistance to ensure timely medical care and emergency response. Through these integrated measures, Granules reinforces its commitment to protecting workforce health and safety, ensuring environmental compliance, and promoting responsible and sustainable operations, thereby strengthening stakeholder trust and organisational resilience.',
  },
  {
    id: 'soc-4',
    factor: 'Social',
    subfactor: 'Supporting Protected Classes',
    keywords: ['Diversity and Equality'],
    docLinks: [
      { name: 'CSR Annual Report 2024', url: '/documents/CSR-Annual-Report-2023-24-5d55fa4f91e9.pdf', type: 'pdf' },
      { name: 'Parawada Model Hostel Dossier', url: '/documents/Granules-India-Transforms-BC-Government-Boys-Hostel-in-Parawada-ac5a57c033b8.pdf', type: 'pdf' },
    ],
    highlights:
      'Breast Health Express - Mobile mammography and awareness initiative improving early detection and access to screening services for underserved women in rural communities, 3677 - Total Consultations, 1769 mammograms, 395 ultrasounds, 90%; Pharma Pathshala - Placement-linked skill development programme for rural youth in collaboration with Swarna Bharat Trust, 1600+ Students (Since inception in 2017) with 150+ participants in the current year, 100%; Vidya Volunteers - Deployment of dedicated volunteers to strengthen teaching support and improve learning outcomes in government schools, 600+ Students, 100%; TB Nutrition Support - Distribution of nutritional kits to TB patients to improve recovery and treatment adherence, 1,030 - Patients, 100%; BC Hostel Transformation - Renovation and infrastructure improvement of BC Welfare Hostel to create a safe learning environment, 100+ Students, 100%; Granules Vidya Scholarships - Financial aid, study materials, and mentorship were provided across Andhra Pradesh and Telangana to address financial barriers to civil service preparation, 20 - Students, 90%; In partnership with Putouchuki Somasundra Trust, a fully constructed building was donated to support educational activities for government school students in Bonthapally, providing them with essential resources and training for academic success, 70 students, 90%; Education kits were distributed to differently abled children to address lack of access to essential learning resources, 300+ Students, 100%; Eco friendly clay idols were distributed to address environmental pollution caused by traditional idols, 6,000+, 90%; A blood donation camp was organized in Gagillapur to support cancer patients, addressing healthcare needs through voluntary blood donation, 150 units, 100%; Drinking water bottles were distributed during large gatherings to ensure access to safe drinking water and address the need for reliable hydration support, 4 lakh water bottles; Education and nutrition support were provided to underprivileged children in Khammam to address educational and nutritional challenges, improving access to learning and overall well-being, 40 students, 100%; Sponsorship support was provided to promote mountaineering talent, encouraging sports development, 1, 100%; Mid-day meals were sponsored in Jinnaram, Telangana to address nutritional gaps affecting student performance, improving nutrition levels and school attendance, 300+ students, 100%; A marathon and plantation drive were organized in Hyderabad to promote environmental awareness and fitness, fostering sustainability and community engagement, 1,00,000+ participants; One of the sponsors for Examthon Marathon which was conducted with the objective of promoting stress free education for the students, 5000+ participants, 90%; Granules in association with LV Prasad Eye Institute has conducted eye screening tests to 23 government school going children, 2900+, 100%.',
  },
  {
    id: 'soc-5',
    factor: 'Social',
    subfactor: 'Community Support Initiatives',
    keywords: ['Community', 'Initiatives'],
    docLinks: [
      { name: 'CSR Policy Report', url: '/documents/CSR-Policy-7f3b00771044.pdf', type: 'pdf' },
      { name: 'Pharma Pathashala Announcement', url: 'https://www.linkedin.com/company/granules-india-limited/', type: 'linkedin' },
      { name: 'Breast Cancer Mobile Unit Campaign', url: 'https://www.linkedin.com/company/granules-india-limited/', type: 'linkedin' },
      { name: 'Swarna Bharat Trust Collaboration', url: 'https://www.linkedin.com/company/granules-india-limited/', type: 'linkedin' },
      { name: 'Community Dialysis Centre News', url: 'https://www.linkedin.com/company/granules-india-limited/', type: 'linkedin' },
    ],
    highlights:
      'Pharma Pathashala is a flagship skill development initiative of Granules India, implemented in partnership with Swarna Bharathi Trust. The programme was established to support young people from underserved communities who often face financial barriers, limited access to quality vocational training and uncertainty in transitioning from education to employment. By combining technical learning, workplace readiness and mentorship, the initiative helps participants build confidence, strengthen employability and pursue sustainable livelihood opportunities, creating pathways towards greater economic independence and social mobility; Access to quality healthcare remains a significant challenge for many underserved communities, where financial constraints, limited awareness and gaps in healthcare infrastructure often delay diagnosis and treatment. Through targeted interventions spanning preventive healthcare, specialised medical support, nutrition assistance and community health initiatives, Granules seeks to improve access to essential healthcare services and promote better health outcomes for vulnerable populations; Arts, literature and cultural expression have the power to inspire curiosity and strengthen connections within communities. They create spaces where ideas can be shared, stories can be celebrated and individuals can engage with diverse viewpoints. Through its support for cultural initiatives, Granules seeks to nurture learning, encourage meaningful dialogue and contribute to a more vibrant and inclusive society; Projects in Health: Granules Mobile Women’s Cancer Screening Unit: This bus features advanced mammography technology on mammography and travels to underserved rural areas to offer free breast cancer screenings for women; Dr. Chigurupati Nageswara Rao Rotary Dialysis Centre: A dialysis center has been set up in Guntur to provide affordable services to the local population in partnership with Helping Hands of Rotary. Managed by St. Joseph Hospital and the Red Cross Society, it can offer up to 750 monthly treatments at a reasonable cost; Free Eye Screening: Granules, in association with LV Prasad Eye Institute, has conducted free eye screening camps in seven government schools around our manufacturing units; Support to Children Battling Cancer: Granules has collaborated with St. Jude India Childcare Centre by providing essential non-medical assistance; Primary Health Center: The center, which was established in Gagillapur village and is managed by the Health Department of the Government of Telangana, serves over 8,000 residents of Gagillapur and surrounding villages; Supporting Disabilities: For nearly two decades, Granules partnered with Ashray Akruti, a non-profit organization dedicated to uplifting marginalized communities, including individuals with disabilities; Dr. Chigurupati Nageswara Rao Ocular Research Center: Granules has collaborated with the Hyderabad Eye Research Foundation of LV Prasad Eye Institute.',
  },

  // ==================== GOVERNANCE ====================
  {
    id: 'gov-1',
    factor: 'Governance',
    subfactor: 'Corporate Governance Policies',
    keywords: ['Policies', 'Stakeholders'],
    docLinks: [
      { name: 'Corporate Governance Report', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Investor Governance Page', url: '/investor', type: 'web' },
    ],
    factsheet: 'A : 14',
    highlights:
      'Corporate Governance encompasses a set of systems and practices to ensure that the Company’s affairs are managed to ensure accountability, transparency, and fairness in all transactions in the widest sense. The objective is to meet stakeholder’s aspirations and societal expectations. Good governance practices stem from the dynamic culture and positive mindset of the organization. We are committed to meeting the aspirations of all our stakeholders. The essence of corporate governance lies in promoting and maintaining the integrity, transparency and accountability of the management. The demands of corporate governance require professionals to raise their competence and capability levels to meet the expectations of managing the enterprise and its resources effectively with the highest standards of ethics. It has thus become crucial to foster and sustain a culture that integrates all components of good governance by carefully balancing the inter-relationship among the Board of Directors, Board Committees, Auditors, and the Senior Management Personnel. Granules adheres to the prescribed corporate governance practices as per the Listing Regulations and is committed to sound corporate governance principles and practices. The Company also believes that an active, well-informed and independent Board is necessary to ensure the highest standard of corporate governance. At Granules, the Board of Directors is at the core of corporate governance and oversees how the management serves and protects the interests of the stakeholders. The Board of Granules is responsible for and committed to the sound principles of corporate governance in the Company. Our corporate governance framework ensures that we make timely and transparent disclosures regarding our financials and performance, as well as the leadership and governance of the Company. The Company acknowledges the individual and collective responsibility to manage the business activities with integrity.',
  },
  {
    id: 'gov-2',
    factor: 'Governance',
    subfactor: 'Governance Oversight Framework',
    keywords: ['Board of Directors'],
    docLinks: [
      { name: 'Board Charter', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Risk Management Charter', url: ANNUAL_REPORT_PDF, type: 'pdf' },
      { name: 'Corporate Governance Page', url: '/investor', type: 'web' },
    ],
    highlights:
      'The Board of Directors is the apex body constituted by the shareholders for overseeing the Company’s overall functioning. The Board provides and evaluates the Company’s strategic direction, management policies and effectiveness and ensures that shareholders’ long-term interests are being served; The Board of Directors provides strategic supervision, supported by the Risk Management Committee (RMC) constituted in accordance with SEBI (LODR) Regulations. The RMC is responsible for reviewing the risk management policy, overseeing the ERM framework and monitoring exposure across financial, operational, regulatory, technological, sectoral, talent, geopolitical and ESG-related risks.',
  },
  {
    id: 'gov-3',
    factor: 'Governance',
    subfactor: 'Anti Corruption Policy',
    keywords: ['Policies', 'Risk Control'],
    docLinks: [
      { name: 'Anti-Bribery Policy (ABMS)', url: '/documents/Code-of-Conduct-for-Board-SMP-d491fd64de1a.pdf', type: 'pdf' },
      { name: 'Supplier Code of Conduct', url: '/documents/Granules-Code-of-Business-Conduct-for-Suppliers-b394765c24cf.pdf', type: 'pdf' },
      { name: 'Code of Business Conduct (COBC)', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      'We adhere to uncompromising integrity in the conduct of business and do not tolerate corrupt and immoral practices. The Code of Conduct addresses these aspects of anti-corruption/anti-bribery and covers all the stakeholders including groups/ Suppliers/ Contractors/ NGOs/Others. We have procedures in place to ensure that the business is carried out fairly and responsibly. An Employee cannot solicit, encourage, or receive any bribe or other payment, contribution, gift, or favour that could influence our or another’s decision; To be competitive in the global market place, it is important to thoroughly understand the present and potential customers, suppliers and regulations while referring to the information available in the public domain.',
  },
  {
    id: 'gov-4',
    factor: 'Governance',
    subfactor: 'Whistle Blower Policy',
    keywords: ['Board of Directors', 'Employees', 'Policies', 'Risk Control'],
    docLinks: [
      { name: 'Vigil Mechanism Policy', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'Whistleblower Protocol', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      'We have devised an effective whistleblower mechanism enabling employees to freely communicate their concerns about illegal or unethical practices. The Company has also established a vigil mechanism for employees to report concerns about any unethical behaviour, actual or suspected fraud or violation of the Company’s code of conduct. The prime objective of this policy is to provide employees and Directors an avenue to raise concerns in line with the commitment of Granules to the highest possible standards of ethical, moral, and legal business conduct and its commitment to open, fearless, genuine concern communication. The pre-eminent intention of this policy is to provide necessary safeguards for the protection of employees from reprisals or victimization for whistleblowing in good faith.',
  },

  // ==================== AWARDS & RECOGNITIONS ====================
  {
    id: 'awd-1',
    factor: 'Awards and Recognitions',
    subfactor: 'Environment Awards',
    keywords: ['Awards'],
    docLinks: [{ name: 'CII Water Innovation Award', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'Our facilities in Gagillapur and Bonthapally Unit-I have been recognized as Water Neutrality Aspiring Plants by the CIITriveni Water Institute at the 11th Water Innovation Summit 2025 in New Delhi; Recognized with the Telangana Green Manufacturing Leadership Award presented by the Asian Confederation of Businesses.',
  },
  {
    id: 'awd-2',
    factor: 'Awards and Recognitions',
    subfactor: 'Governance Awards',
    keywords: ['Awards'],
    docLinks: [{ name: 'IOD Distinguished Fellow Citation', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'We were honoured to receive the Pharma Quality Excellence Award for Continuous Learning, recognising the learning culture we are building at Granules India Limited; Our Executive Director, Ms. Priyanka Chigurupati, has been honoured with the Most Powerful Women in Business Award 2025 hosted by Business Today at the National Stock Exchange, Mumbai; India Philanthropy Summit 2025 by EdelGive Foundation Award conferred on Mrs Uma Chigurupati for her contributions to social impact and corporate responsibility; Our Founder, Chairman and Managing Director, Dr. Krishna Prasad Chigurupati, was honoured as the Distinguished Fellow 2025 by the Institute of Directors (IOD), India, recognising his contribution to innovation, sustainability and ethical enterprise. He dedicated the honour to the entire Granules family; We were recognised with the Excellence in Strategic Automation Award (Above INR 2000 Cr. Category) at the Pharma Manufacturing and Automation Excellence Awards 2025, recognising our automation initiatives focused on: Automation and mechanisation to reduce manual effort, IIoT and AI driven predictive maintenance to minimise downtime, Digitalisation to strengthen compliance, quality and data integrity.',
  },
  {
    id: 'awd-3',
    factor: 'Awards and Recognitions',
    subfactor: 'Social Awards',
    keywords: ['Awards'],
    docLinks: [{ name: 'Indian Social Impact Award', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'We were recognized with the “Best CSR Initiative” Award for Breast Cancer Screening & Awareness in Rural Communities in the Year 2025 at the Indian Social Impact Awards 2025, an initiative by Indian CSR Awards held in New Delhi. Our valued health partner, Dr. Pragnya Chigurupati, Consultant Breast Oncologist at AIG Hospitals and Founder of UC Breast Foundation; Granules received the Silver Award at the CII National EHS Excellence Awards 2025 for its Gagillapur Unit and Granules Life Sciences site, while Unit-I Bonthapally and UnitIV Visakhapatnam were recognized with the Bronze Award during the same ceremony.',
  },
  {
    id: 'awd-4',
    factor: 'Awards and Recognitions',
    subfactor: 'Sustainability Recognition Awards',
    keywords: ['Awards'],
    docLinks: [{ name: 'Haleon Supplier Award 2026', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'Granules was honoured the Sustainability Award at Haleon’s Winning Together – Supplier Summit 2026, recognising Granules India’s measurable progress in reducing our environmental footprint and our team’s commitment to sustainable growth.',
  },

  // ==================== RATINGS AND INDICES ====================
  {
    id: 'rat-1',
    factor: 'Ratings and Indices',
    subfactor: 'CDP Rating',
    keywords: ['External Validation'],
    docLinks: [
      { name: 'CDP Climate Score Card', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'CDP Supplier Assessment', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : A, B : B-, C : B, D : A',
    highlights:
      '2025: CDP Climate Change Score: A; CDP Forests Score: B-; CDP Water Security Score: B; Achieved an A List rating in CDP’s Supplier Engagement Assessment (SEA) 2025, demonstrating strong leadership in engaging its supply chain on climate action.',
  },
  {
    id: 'rat-2',
    factor: 'Ratings and Indices',
    subfactor: 'CRISIL ESG Rating',
    keywords: ['External Validation'],
    docLinks: [{ name: 'CRISIL ESG Scorecard', url: 'https://granulesindia.com/sustainability', type: 'web' }],
    factsheet: 'A : 67',
    highlights: 'ESG Score: 67 (Strong) as of 24 Aug 2026.',
  },
  {
    id: 'rat-3',
    factor: 'Ratings and Indices',
    subfactor: 'S&P Global Ratings',
    keywords: ['External Validation'],
    docLinks: [
      { name: 'S&P Global Portal', url: 'https://granulesindia.com/sustainability', type: 'web' },
      { name: 'S&P CSA Score 2026', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'S&P Scorecard', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    factsheet: 'A : 62, B : 61',
    highlights: 'ESG Score: 62; CSA Score: 61, as on February 09, 2026.',
  },
  {
    id: 'rat-4',
    factor: 'Ratings and Indices',
    subfactor: 'Ecovadis',
    keywords: ['External Validation'],
    docLinks: [
      { name: 'EcoVadis Gold Certificate', url: PDF_DEFAULT, type: 'pdf' },
      { name: 'EcoVadis Assessment Dossier', url: ANNUAL_REPORT_PDF, type: 'pdf' },
    ],
    highlights:
      'Achieved a Gold rating in the EcoVadis Sustainability Assessment with 97% percentile, placing us in the top 5% of the participating companies.',
  },

  // ==================== ISO AND CERTIFICATIONS ====================
  {
    id: 'iso-1',
    factor: 'ISO and Certifications',
    subfactor: 'ISO 9001 - Quality Management System',
    keywords: ['External Validation'],
    docLinks: [
      { name: 'Quality Portal', url: '/business/quality-compliance', type: 'web' },
      { name: 'ISO 9001 Certificate', url: PDF_DEFAULT, type: 'pdf' },
    ],
    highlights: 'Certification: ISO 9001 : Quality Management Systems (QMS).',
  },
  {
    id: 'iso-2',
    factor: 'ISO and Certifications',
    subfactor: 'ISO-14001 Environmental Management',
    keywords: ['External Validation'],
    docLinks: [
      { name: 'EHS Portal', url: '/sustainability', type: 'web' },
      { name: 'ISO 14001 Certificate', url: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf', type: 'pdf' },
    ],
    highlights: 'All Granules manufacturing and R&D units are certified to ISO 14001.',
  },
  {
    id: 'iso-3',
    factor: 'ISO and Certifications',
    subfactor: 'ISO 37001 - Anti-Bribery Management System',
    keywords: ['External Validation'],
    docLinks: [
      { name: 'Governance Portal', url: '/investor', type: 'web' },
      { name: 'ISO 37001 Certificate', url: PDF_DEFAULT, type: 'pdf' },
    ],
    highlights: 'Certifications: ISO 37001 - Anti-bribery management systems (ABMS).',
  },
  {
    id: 'iso-4',
    factor: 'ISO and Certifications',
    subfactor: 'ISO 45001 - Occupational Health and Safety Management Systems',
    keywords: ['External Validation'],
    docLinks: [
      { name: 'Health & Safety Portal', url: '/sustainability', type: 'web' },
      { name: 'ISO 45001 Certificate', url: '/documents/ISO-14001-45001-Certificate-b5f10f6ce70f.pdf', type: 'pdf' },
    ],
    highlights: 'All Granules manufacturing and R&D units are certified to ISO 45001.',
  },
  {
    id: 'iso-5',
    factor: 'ISO and Certifications',
    subfactor: 'SA 8000',
    keywords: ['External Validation'],
    docLinks: [
      { name: 'Social Accountability Portal', url: '/sustainability', type: 'web' },
      { name: 'SA 8000 Certificate', url: PDF_DEFAULT, type: 'pdf' },
    ],
    highlights: 'All Granules manufacturing and R&D units are compliant with SA8000 requirements through internationally accredited certification bodies.',
  },
  {
    id: 'iso-6',
    factor: 'ISO and Certifications',
    subfactor: "Zero Waste to Landfill (UL's)",
    keywords: ['External Validation'],
    docLinks: [
      { name: 'ZWTL Portal', url: '/sustainability', type: 'web' },
      { name: 'ZWTL Platinum Plus Certificate', url: PDF_DEFAULT, type: 'pdf' },
    ],
    highlights: 'Gagillapur unit has achieved Zero Waste to Landfill (ZWTL) Certification with Platinum + Rating with over 99% waste diversion rate from Landfill.',
  },

  // ==================== ESG PRESS RELEASES ====================
  {
    id: 'pr-1',
    factor: 'ESG Press Releases',
    subfactor: 'Pharma Pathashala by Granules India: Building Brighter Futures',
    keywords: [],
    docLinks: [
      { name: 'LinkedIn Announcement', url: 'https://www.linkedin.com/company/granules-india-limited/', type: 'linkedin' },
    ],
    highlights:
      'July 2026: On WorldYouthSkillsDay, we celebrate the resilience and aspirations of rural youth empowered through Pharma Pathashala, a skill development initiative by Granules India Limited in collaboration with Swarna Bharat Trust. Since 2017, the CSR program has equipped over 1,600 young individuals from rural background with industry-relevant skills for pharmaceutical manufacturing, while fostering confidence, discipline, and workplace readiness. We are committed to create opportunities that help youth overcome socio-economic challenges and build sustainable, self-reliant futures.',
  },
  {
    id: 'pr-2',
    factor: 'ESG Press Releases',
    subfactor: 'Granules India Expands Breast Cancer Screening and Awareness Programme',
    keywords: [],
    docLinks: [
      { name: 'LinkedIn Press Release', url: 'https://www.linkedin.com/company/granules-india-limited/', type: 'linkedin' },
    ],
    highlights:
      'August 2026: As part of its ongoing CSR commitment to preventive healthcare, Granules India Limited India, along with its healthcare partners, has launched the second phase of its breast cancer screening and awareness initiative in Sangareddy district. In addition to screening and awareness camps, the initiative will focus on training Self-Help Groups representatives and ASHA workers, beginning in Kandi and Mogudampally Mandal and gradually expanding across the district. The program aims to strengthen its reach among women in rural communities by promoting early identification, awareness, and timely referrals for breast health screening. The training program was attended by Shri Prateek Jain, IAS, District Collector & Magistrate, Sangareddy District; Ms. Lalitha Devi, District Medical & Health Officer; Ms. Jyothi, District Rural Development Officer; and other district officials. Strengthened by the support of SERP (Society for Elimination of Rural Poverty), Government of Telangana, the initiative has screened over 6,000 women and raised breast health awareness across rural communities since its inception.',
  },
  {
    id: 'pr-3',
    factor: 'ESG Press Releases',
    subfactor: 'Granules India Fosters Research Excellence with CSIR-IICT Collaboration',
    keywords: [],
    docLinks: [
      { name: 'LinkedIn Press Release', url: 'https://www.linkedin.com/company/granules-india-limited/', type: 'linkedin' },
    ],
    highlights:
      'August 2026: Granules India is proud to partner with IICT CSIR (CSIR -Indian Institute of Chemical Technology) creating a unique opportunity for our employees to pursue PhD programmes while continuing to contribute to the organisation. As part of this initiative, Granules will support eligible employees by funding research and laboratory expenses, enabling them to advance their expertise and contribute to pharmaceutical research. Through this collaboration, we aim to: (a) Strengthen our culture of research and innovation; (b) Bridge academia and industry to accelerate healthcare solutions; (c) Advance knowledge sharing and scientific progress. This initiative is also closely aligned with our core values of empowering our people and embracing futuristic thinking, driving meaningful and lasting impact.',
  },
  {
    id: 'pr-4',
    factor: 'ESG Press Releases',
    subfactor: 'Granules India Earns Advanced Recognition for Ethical and Sustainable Operations',
    keywords: [],
    docLinks: [
      { name: 'LinkedIn Post', url: 'https://www.linkedin.com/company/granules-india-limited/', type: 'linkedin' },
    ],
    highlights:
      'August 2026: We are proud to share that Granules India Limited has been ranked among the Top 2% of industry peers in the latest Sedex assessment, achieving an Advanced Rating of 4.4/5. This recognition reinforces our focus on transparency, accountability, ethical operations, and continuous improvement as we work to create sustainable value for all our stakeholders.',
  },

  // ==================== BRSR SECTION A ====================
  {
    id: 'brsr-a1',
    factor: 'BRSR Section A: General Disclosures',
    subfactor: 'CIN',
    keywords: ['BRSR SEBI: Company Details'],
    docLinks: [{ name: 'Corporate Registration Filing', url: PDF_DEFAULT, type: 'pdf' }],
    highlights: 'L24110TG1991PLC012471.',
  },
  {
    id: 'brsr-a2',
    factor: 'BRSR Section A: General Disclosures',
    subfactor: 'Name of the Listed Entity',
    keywords: ['BRSR SEBI: Company Details'],
    docLinks: [{ name: 'SEBI Company Details', url: PDF_DEFAULT, type: 'pdf' }],
    highlights: 'Granules India Limited.',
  },
  {
    id: 'brsr-a3',
    factor: 'BRSR Section A: General Disclosures',
    subfactor: 'Year of Incorporation',
    keywords: ['BRSR SEBI: Company Details'],
    docLinks: [{ name: 'Incorporation Certificate', url: PDF_DEFAULT, type: 'pdf' }],
    highlights: '1991.',
  },
  {
    id: 'brsr-a4',
    factor: 'BRSR Section A: General Disclosures',
    subfactor: 'Registered Office Address',
    keywords: ['BRSR SEBI: Company Details'],
    docLinks: [{ name: 'Registered Office Details', url: PDF_DEFAULT, type: 'pdf' }],
    highlights: '15th Floor, Granules Tower, Botanical Garden Road, Kondapur, Hyderabad, Telangana - 500084, India.',
  },
  {
    id: 'brsr-a5',
    factor: 'BRSR Section A: General Disclosures',
    subfactor: 'Geographical Presence and Customer Overview',
    keywords: ['BRSR SEBI: Operations'],
    docLinks: [{ name: 'BRSR Geographic Operations', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      "Markets served by the entity: (a) Number of locations: (i) National: Pan India; (ii) International: 80+ Countries; (b) 92.10% of the business comes from exports; (c) Granules India Limited (GIL) is a distinguished pharmaceutical company specializing in the production of Active Pharmaceutical Ingredients (API), Pharmaceutical Formulation Intermediates (PFI), and Finished Dosages (FD) products. Since its establishment in 1991, the company has successfully expanded into key international pharmaceutical markets, including the United States of America, Canada, Latin America, Europe, Asia Pacific, and India. Renowned for its innovative processes and exceptional efficiencies, Granules India Limited supplies a diverse range of over 60 molecules and pharmaceutical products to more than 300 customers across 80 countries. The company maintains a strong global presence with offices strategically located in India, the United States, and the United Kingdom. Granules India Limited operates six state-of-the-art manufacturing facilities, with four located in Hyderabad, Telangana, and two in Visakhapatnam, Andhra Pradesh. These facilities hold regulatory approvals from esteemed agencies such as the US FDA, EDQM, EU GMP, COFEPRIS, WHO GMP, TGA, KFDA, DEA, MCC, and HALAL, ensuring adherence to international quality standards. Granules is a preferred supplier of superior quality pharmaceutical products for the world's leading branded pharma and generics companies, as well as to the top retailers in developed markets. Exports now contribute over 92% of the Company’s revenue.",
  },

  // ==================== BRSR SECTION B ====================
  {
    id: 'brsr-b1',
    factor: 'BRSR Section B: Management And Process Disclosures',
    subfactor: 'Policies and Management Processes',
    keywords: ['BRSR SEBI: Structures Policies and Processes'],
    docLinks: [{ name: 'NGRBC Policies Document', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      '(a) Yes, entity’s policy/policies cover each principle and its core elements of the NGRBCs; (b) Yes, the policy been approved by the Board; (c) Web Link of the Policies: https://granulesindia.com/investors/investor-resources/policies/; https://granulesindia.com/sustainability/.',
  },
  {
    id: 'brsr-b2',
    factor: 'BRSR Section B: Management And Process Disclosures',
    subfactor: 'Mapped Standards and Principles',
    keywords: ['BRSR SEBI: Structures Policies and Processes'],
    docLinks: [{ name: 'ISO Standards Matrix', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'P1: Quality Management System (ISO 9001:2015); Implementation of ISO 37001 is progressing, with Stage 1 audit completed, strengthening antibribery management practices; P2: Integration of ISO 20400 principles is progressing, with Stage 1 audit completed, strengthening sustainable procurement practices; P3: Occupational Health and Safety Management System (ISO 45001:2018); P4: At Granules, we involve key stakeholders in the process of devising our long-term ESG vision. We conduct Materiality assessment in consultation with all our Internal and External Stakeholders as per GRI standards; P5: We conduct our business in a manner that abides by human rights and the dignity of people. We have Completed SA8000 Social Accountability Compliance certification across all our sites, demonstrating our commitment to responsible and ethical workplace practices; P6: Environmental Management System (ISO 14001:2015), ISO 14064 (GHG Accounting), GHG protocol; P7: We play a strong role in public policy advocacy through regular engagement with specific external stakeholders, including industry associations, government bodies, and regulatory departments. We are Developing a public advocacy policy at Granules for policy advocacy engagements; P8: Our CSR initiatives are aligned with UN SDGs, UNGC, WEP, and PSCI principles, addressing key community needs across health, education, livelihood, environmental sustainability, and social inclusion, while promoting ethical practices and inclusive development; P9: Granules is committed to understanding and meeting customer expectations while fostering longterm business partnerships. Operating in a highly regulated industry overseen by global health authorities, our products consistently meet regulatory standards. we undergo regular audits by various health authorities to ensure the quality and safety of our products and facilities.',
  },

  // ==================== BRSR SECTION C: PRINCIPLE 1-9 ====================
  {
    id: 'brsr-c1',
    factor: 'BRSR Section C: Principle 1',
    subfactor: 'Training and Awareness Programs',
    keywords: ['BRSR SEBI: Essential'],
    docLinks: [{ name: 'Training & Ethics Report', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      "Training and awareness programmes: (a) Board of Directors: Total number of training and awareness programmes held: 6; Topics / principles covered under the training and its impact: Periodic familiarisation, awareness programmes and Abundance Longevity are conducted for the Board of Directors and Key Managerial Personnel (KMPs) as part of the Board process. These sessions cover key aspects of the business, strategy, risks, operations, regulatory developments, the Code of Business Conduct and Ethics, as well as environmental, social, and governance (ESG) matters; % of persons in respective category covered by the awareness programmes: 100%; (b) Key Managerial Personnel: Total number of training and awareness programmes held: 5; Topics / principles covered under the training and its impact: Goal Setting FY'25-26 Generative Leadership, POSH, Master class on ex strategy, GPTW survey findings & action plan, Team Building- Finance & Accounts; % of persons in respective category covered by the awareness programmes: 100%; (c) Employees other than BoD and KMPs: Total number of training and awareness programmes held: 38; Topics / principles covered under the training and its impact: First Time Leader, Team Building outbound - F&A, COBC, POSH, Insider Trading, Whistle Blower Policy, Cyber Security, DPDPA, Standing Orders, Emotional Intelligence, GIL Mission, Vision, Values & Motivation, Audit Readiness, Legal SOP Awareness, GPTW Insights & action plan, Arth Sakhi - Finance Acumen, Accountability, AI & Digitalization - Copilot, ChatGPT, Productivity Improvement, Time Management, Organization Skills, Strategic Thinking, Decision Making, Leadership Accountability, Phased Induction, Strategic Leadership for Exponential Business Growth, Mercer Mash 2025 round table, QbD for API development, Technical training at ACG labs, Bootcamp on pharma biopharma industry orientation, RCA, Safety, First aid; % of persons in respective category covered by the awareness programmes: 94%; (d) Workers: Total number of training and awareness programmes held: 7; Topics / principles covered under the training and its impact: Standing Orders, POSH, Human Rights, Major labour laws &acts, COBC, DPDPA, Cyber Security; % of persons in respective category covered by the awareness programmes: 91%.",
  },
  {
    id: 'brsr-c2',
    factor: 'BRSR Section C: Principle 2',
    subfactor: 'R&D and Technology Expenditure',
    keywords: ['BRSR SEBI: Essential'],
    docLinks: [{ name: 'R&D Sustainable Capex Report', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      '(a) R&D: (i) FY2026: 100%; (ii) FY2025: 100%; Details of improvements in environmental and social impacts: At Granules, we are investing in a green molecule platform to reimagine pharmaceutical manufacturing and complete supply chain decarbonization, including solving the scope 3 challenge for the pharma industry, NIPER collaboration; (b) Capex: (i) FY2026: 8.60%; (ii) FY2025: 8.80%; Details of improvements in environmental and social impacts: Efforts have been focused on reducing non-renewable energy use and freshwater consumption through energy efficiency, water conservation projects, and technology upgrades in wastewater treatment.',
  },
  {
    id: 'brsr-c3',
    factor: 'BRSR Section C: Principle 3',
    subfactor: 'Employees Well-being',
    keywords: ['BRSR SEBI: Essential'],
    docLinks: [{ name: 'Employee Health & Wellbeing Report', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'Granules prioritizes employee well-being through a wide range of structured initiatives designed to support overall health and quality of life. The organisation ensures comprehensive coverage for its workforce through group medical insurance, ESI benefits, and a Group Personal Accident policy, which also includes maternity and paternity support. Strategic partnerships with reputed healthcare providers such as AIG, Apollo, and Star Hospitals enable the delivery of expert-led health awareness programmes and facilitate access to professional medical consultations at concessional terms. The Company also conducts regular initiatives on mental wellness, ergonomics, and workplace health, including specialised programmes focused on women’s health, complemented by periodic free medical check-ups to strengthen preventive care practices. Further enhancing its preventive healthcare approach, Granules has collaborated with Previa to implement structured pre-employment and annual health assessments. Comprehensive health camps covering key screenings; including vision, dental, and cardiac health are conducted periodically, alongside quarterly awareness drives to promote informed health choices. Sessions on yoga, mindfulness, and stress management are also organised to strengthen psychological well-being. In addition, the Company is working on deploying a digital wellness platform to enable integrated health monitoring, offering features such as individual health scoring, data-driven insights, fitness recommendations, and personalised nutrition guidance. To encourage active lifestyles, Granules regularly organises engagement initiatives such as yoga programmes, walking challenges, and step-based activities, fostering a culture that supports physical fitness, inclusivity, and overall employee well-being; Details of measures for the well-being of employees: (a) Permanent Employees: (i) Health insurance: 100% (Male: 100%; Female: 100%); (ii) Accident insurance: 100% (Male: 100%; Female: 100%); (iii) Maternity benefits: 100% (Female: 100%); (iv) Paternity Benefits: 100% (Male: 100%); (v) Day Care facilities: 94.6% (Male: 95.2%; Female: 89.4%); (b) Other than Permanent Employees: Not Applicable.',
  },
  {
    id: 'brsr-c6',
    factor: 'BRSR Section C: Principle 6',
    subfactor: 'Amount of GHG Emission (Scope 1 and 2)',
    keywords: ['BRSR SEBI: Essential Core'],
    docLinks: [{ name: 'Scope 1 and 2 Assurance Report', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      '(1) Details of greenhouse gas emissions: (a)Total Scope 1 emissions: (i) FY2026: 59,851 tCO2e; (ii) FY2025: 57,414 tCO2e; (b) Total Scope 2 emissions: (i) FY2026: 1,285 tCO2e; (ii) FY2025: 18,853 tCO2e; (c) Total Scope 1 + 2 Emissions: (i) FY2026: 61,136 tCO2e; (ii) FY2025: 76,267 tCO2e; (d) Total Scope 1 and Scope 2 emissions per rupee of turnover: (i) FY2026: 1.76 tCO2e / Million Rupees; (ii) FY2025: 2.52 tCO2e / Million Rupees; (e) Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP): (i) FY2026: 0.429 tCO2e /Million Rupees adjusted for Purchasing Power Parity (PPP); (ii) FY2025: 0.667 tCO2e /Million Rupees adjusted for Purchasing Power Parity (PPP); (f) Total Scope 1 and Scope 2 emission intensity in terms of physical output: (i) FY2026: 1.06 tCO2e /Ton of Production; (ii) FY2025: 1.52 tCO2e /Ton of Production; (2) Yes, the independent assurance is carried out by the Bureau Veritas (India) Pvt. Ltd.',
  },
  {
    id: 'brsr-c9',
    factor: 'BRSR Section C: Principle 9',
    subfactor: 'Consumer Complaints and Feedback Collection Mechanisms',
    keywords: ['BRSR SEBI: Essential'],
    docLinks: [{ name: 'Quality SOP & Feedback Mechanism', url: PDF_DEFAULT, type: 'pdf' }],
    highlights:
      'At Granules India, we place a strong emphasis on delivering high-quality products and ensuring timely service to our customers. Customer feedback is actively gathered through multiple channels, including surveys, direct interactions, and service touchpoints. This feedback is systematically analysed to identify improvement areas and enhance our products and services in line with customer expectations. All customer complaints are addressed within the timelines defined in our Quality Standard Operating Procedures, with necessary corrective and preventive actions integrated into our processes. The Company ensures that no complaints remain unresolved beyond the stipulated resolution period by the end of the financial year. Each complaint is thoroughly investigated, and appropriate responses along with action plans are communicated to customers and relevant internal stakeholders. This structured approach enables timely resolution of issues while driving continuous improvement in product quality and customer satisfaction. Integrating customer feedback into our continuous improvement efforts demonstrates our commitment to excellence and dedication to maintaining the highest standards in everything we do. This proactive approach ensures that our customers receive the best products and services, reinforcing our reputation for quality and reliability.',
  },
];

export interface JobOpening {
  id: number;
  designation: string;
  department: string;
  level: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export const ALL_JOBS: JobOpening[] = [
  {
    id: 1,
    designation: 'Analyst',
    department: 'Regulatory Affairs',
    level: '3+ Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Coordinate and compile regulatory dossiers for global submissions. Requires strong knowledge of international regulations and hands-on documentation experience for APIs and formulations.',
    responsibilities: [
      'Prepare and review CTD/eCTD dossier modules for global regulatory authority submissions.',
      'Coordinate with R&D, Quality, and Manufacturing teams to assemble technical data and variation filings.',
      'Assist with deficiency letter responses, query resolution, and post-approval lifecycle documentation.',
    ],
    qualifications: [
      'B.Pharm / M.Pharm or M.Sc. in Chemistry / Life Sciences.',
      '3+ years experience in pharmaceutical regulatory affairs for regulated or semi-regulated markets.',
      'Sound understanding of ICH guidelines, US FDA, and EU regulatory expectations.',
    ],
  },
  {
    id: 2,
    designation: 'Analyst',
    department: 'Formulation Analytical R&D',
    level: '3+ Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Work on analytical method development and validation for formulations. Role involves handling high-throughput HPLC/GC instruments, interpreting complex data, and meeting global regulatory standards.',
    responsibilities: [
      'Develop, optimize, and validate analytical methods (HPLC, UPLC, UV, Dissolution) for generic formulations.',
      'Perform forced degradation studies, bench stability analysis, and method transfer protocols.',
      'Maintain rigorous cGMP laboratory documentation, calibration logs, and raw data audit readiness.',
    ],
    qualifications: [
      'M.Sc. in Analytical Chemistry / Organic Chemistry or M.Pharm in Pharmaceutical Analysis.',
      '3+ years experience in formulation analytical R&D within a cGMP regulated facility.',
      'Hands-on experience with Waters/Agilent HPLC instruments, Empower 3 software, and dissolution testers.',
    ],
  },
  {
    id: 3,
    designation: 'Associate Director',
    department: 'Regulatory Strategy (US Market)',
    level: '8+ Years',
    location: 'Chantilly, Virginia (USA)',
    type: 'Full-time',
    description:
      'Lead US ANDA submissions, FDA meeting briefings, and post-approval regulatory lifecycle strategy for our expanding generic formulation and finished dosage portfolio in North America.',
    responsibilities: [
      'Serve as primary regulatory liaison with the US FDA for commercial ANDAs and supplement filings.',
      'Provide strategic guidance on bioequivalence study design, labeling, and CMC dossiers.',
      'Collaborate cross-functionally with Indian R&D centers and US commercial distribution teams.',
    ],
    qualifications: [
      'M.S. or Pharm.D. in Pharmacy, Regulatory Science, or related life science discipline.',
      '8+ years in US regulatory affairs with proven track record of successful ANDA approvals.',
      'Deep expertise in eCTD module requirements and FDA cGMP guidance.',
    ],
  },
  {
    id: 4,
    designation: 'Principal Scientist',
    department: 'Peptides CDMO (Senn Tides)',
    level: '7+ Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Spearhead complex therapeutic peptide synthesis, novel hybrid SPPS/LPPS process design, and scalable purification strategies in collaboration with our Swiss CDMO facility (Senn Chemicals).',
    responsibilities: [
      'Design and execute synthetic chemistry routes for multi-step therapeutic peptides and peptidomimetics.',
      'Scale up solid-phase and liquid-phase peptide workflows from bench to kilogram-scale manufacturing.',
      'Troubleshoot impurity profiles using prep-HPLC, LC-MS, and orthogonal analytical methodologies.',
    ],
    qualifications: [
      'Ph.D. in Synthetic Organic Chemistry, Peptide Chemistry, or Chemical Biology.',
      '7+ years industrial peptide development experience in CDMO or pharma settings.',
      'Demonstrated expertise in high-load resins, coupling reagents, and green peptide solvents.',
    ],
  },
  {
    id: 5,
    designation: 'Associate Director',
    department: 'Formulation R&D (Oral Solid Dosage)',
    level: '10+ Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Lead a team of formulation scientists developing high-barrier modified release tablets, multi-particulate capsules, and commercial PFIs (Pharmaceutical Formulation Intermediates).',
    responsibilities: [
      'Direct formulation development programs for complex oral solid dosages (OSD) and PFI blends.',
      'Apply Quality by Design (QbD) and Process Analytical Technology (PAT) to ensure robust scale-up.',
      'Guide product technology transfer into our world-scale Gagillapur manufacturing facility.',
    ],
    qualifications: [
      'M.Pharm or Ph.D. in Pharmaceutics / Pharmaceutical Formulation.',
      '10+ years hands-on formulation experience with commercialized regulated-market products.',
      'Strong leadership in managing cross-functional R&D, patent assessment, and scale-up teams.',
    ],
  },
  {
    id: 6,
    designation: 'Senior Scientist',
    department: 'Formulation Analytical R&D',
    level: '5-7 Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Drive analytical method development, forced degradation studies, and dissolution profiling for innovative generic formulations and finished dosages targeting global health authorities.',
    responsibilities: [
      'Develop and validate stability-indicating HPLC, UPLC, and GC methods per ICH guidelines.',
      'Perform characterization of degradation products, nitrosamine screening, and extractables/leachables.',
      'Author analytical test procedures (ATP) and validation reports for global regulatory filings.',
    ],
    qualifications: [
      'M.Sc. in Analytical Chemistry or M.Pharm in Pharmaceutical Analysis.',
      '5+ years experience in analytical R&D supporting US FDA, EU MHRA, and PMDA submissions.',
      'Hands-on expertise with Empower software, Waters/Agilent LC systems, and LC-MS/MS.',
    ],
  },
  {
    id: 7,
    designation: 'Senior Scientist',
    department: 'Peptides & Swiss CDMO',
    level: '5+ Years',
    location: 'Dielsdorf, Switzerland',
    type: 'Full-time',
    description:
      'Lead peptide process chemistry, customer project management, and cGMP compliance for high-potency API and peptide clinical batches at our Senn Chemicals facility.',
    responsibilities: [
      'Supervise clinical peptide batch production in accordance with European GMP standards.',
      'Interface with international biotech clients to define process milestones and analytical specifications.',
      'Collaborate closely with the Hyderabad R&D team to facilitate global knowledge transfer.',
    ],
    qualifications: [
      'Ph.D. or Master’s in Chemistry with specialization in bio-organic or peptide synthesis.',
      '5+ years working in European or Swiss cGMP pharmaceutical environments.',
      'Fluency in English; proficiency in German is a strong advantage.',
    ],
  },
  {
    id: 8,
    designation: 'General Manager',
    department: 'Formulation Plant Operations',
    level: '12+ Years',
    location: 'Gagillapur, India',
    type: 'Full-time',
    description:
      'Oversee operational performance, capacity planning, continuous manufacturing, and regulatory readiness at one of the world’s largest single-site finished dosage manufacturing facilities.',
    responsibilities: [
      'Drive world-class operational excellence, high equipment availability (OEE), and OTIF delivery metrics.',
      'Ensure uncompromising adherence to US FDA, WHO, and MHRA cGMP regulatory requirements.',
      'Lead large cross-functional teams across Production, Engineering, EHS, Quality, and Supply Chain.',
    ],
    qualifications: [
      'B.Pharm / M.Pharm or Degree in Chemical / Industrial Engineering.',
      '12+ years in pharmaceutical manufacturing leadership with regulated facility experience.',
      'Proven track record in Lean manufacturing, cost optimization, and automation implementations.',
    ],
  },
  {
    id: 9,
    designation: 'Manager',
    department: 'Global Regulatory Affairs (EU & RoW)',
    level: '7-10 Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Lead regulatory filing submissions (MAA, CEP, national procedures) across European member states, Health Canada, TGA Australia, and emerging markets in Asia and Latin America.',
    responsibilities: [
      'Compile, review, and dispatch Module 1, 2, and 3 eCTD dossiers for global regulatory agencies.',
      'Formulate responses to health authority assessment reports and technical queries efficiently.',
      'Track global pharmacopoeial monograph updates and implement variation submissions.',
    ],
    qualifications: [
      'M.Pharm in Regulatory Affairs / Pharmaceutics or M.Sc. in Life Sciences.',
      '7+ years experience managing European or RoW regulatory submissions.',
      'Thorough knowledge of EDQM CEP guidelines and EU variation regulations.',
    ],
  },
  {
    id: 10,
    designation: 'Senior Scientist',
    department: 'API Process Chemistry & Scale-Up',
    level: '5+ Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Design sustainable, cost-competitive synthetic routes for high-volume active pharmaceutical ingredients (APIs) utilizing continuous flow chemistry and green catalytic methodologies.',
    responsibilities: [
      'Develop scalable, non-infringing chemical routes with robust safety and yield profiles.',
      'Perform reaction calorimetry (RC1), thermal screening, and process safety evaluations.',
      'Support commercial plant tech-transfer and validation at our Visakhapatnam manufacturing site.',
    ],
    qualifications: [
      'Ph.D. in Synthetic Organic Chemistry or Chemical Engineering.',
      '5+ years experience in generic API process R&D and pilot plant scale-up.',
      'Experience in flow chemistry, continuous crystallization, or enzymatic catalysis is preferred.',
    ],
  },
  {
    id: 11,
    designation: 'Lead Engineer',
    department: 'Cleanroom Automation & SCADA Systems',
    level: '5+ Years',
    location: 'Visakhapatnam, India',
    type: 'Full-time',
    description:
      'Architect and maintain automated manufacturing process controls, distributed control systems (DCS), PLC integrations, and 21 CFR Part 11 compliant digital plant infrastructures.',
    responsibilities: [
      'Program and validate Siemens / Rockwell PLCs and SCADA networks across API manufacturing blocks.',
      'Ensure data integrity compliance and electronic batch record (eBR) audit trail configurations.',
      'Lead commissioning, qualification, and preventive maintenance of industrial process instrumentation.',
    ],
    qualifications: [
      'B.Tech / B.E. in Instrumentation, Electrical, or Electronics Engineering.',
      '5+ years experience in automated pharmaceutical plant engineering and GAMP 5 standards.',
      'Certified in industrial automation frameworks, Wonderware, or DeltaV systems.',
    ],
  },
  {
    id: 12,
    designation: 'Manager',
    department: 'Analytical Quality Assurance (AQA)',
    level: '7-10 Years',
    location: 'Gagillapur, India',
    type: 'Full-time',
    description:
      'Ensure end-to-end data integrity, analytical documentation compliance, and laboratory governance across QC and R&D facilities in alignment with global regulatory expectations.',
    responsibilities: [
      'Oversee audit trail reviews for computerized chromatography data systems (CDS).',
      'Investigate Out-of-Specification (OOS) and Out-of-Trend (OOT) analytical laboratory results.',
      'Host technical regulatory inspections by US FDA, MHRA, and customer quality audits.',
    ],
    qualifications: [
      'M.Sc. in Chemistry or M.Pharm in Pharmaceutical Analysis.',
      '7+ years experience in AQA / QC in a US FDA approved finished dosage facility.',
      'Expertise in ALCOA+ data integrity principles and laboratory computerized system validation (CSV).',
    ],
  },
  {
    id: 13,
    designation: 'Senior Manager',
    department: 'Global Strategic Sourcing & Procurement',
    level: '8-10 Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Lead strategic raw material procurement, vendor risk management, and key supplier relationships across 80+ international markets to safeguard continuous supply chain resilience.',
    responsibilities: [
      'Develop long-term sourcing strategies for key starting materials (KSMs), excipients, and solvents.',
      'Execute price negotiations, contract frameworks, and vendor development audits.',
      'Mitigate geopolitical and commodity volatility through multi-source qualification programs.',
    ],
    qualifications: [
      'B.Tech / B.Pharm with an MBA in Supply Chain, Operations, or International Trade.',
      '8+ years in global pharmaceutical procurement with strong chemical market intelligence.',
      'Proven expertise in cost optimization, SAP MM, and supplier relationship management (SRM).',
    ],
  },
  {
    id: 14,
    designation: 'Senior Manager',
    department: 'Commercial Supply Chain (US Distribution)',
    level: '7+ Years',
    location: 'Chantilly, Virginia (USA)',
    type: 'Full-time',
    description:
      'Direct US 3PL warehouse operations, wholesale distributor relationships, inventory positioning, and DSCSA track-and-trace serialization compliance for North American accounts.',
    responsibilities: [
      'Manage nationwide distribution logistics through regional 3PL partners and central fulfillment hubs.',
      'Coordinate sales & operations planning (S&OP) to minimize stockouts and backorders.',
      'Ensure strict compliance with DSCSA (Drug Supply Chain Security Act) serialization standards.',
    ],
    qualifications: [
      'Bachelor’s or Master’s in Supply Chain Management, Logistics, or Business Administration.',
      '7+ years in US pharmaceutical distribution, dealing with major wholesalers and health systems.',
      'Proficiency in SAP S/4HANA, EDI transaction sets, and serialization platforms.',
    ],
  },
  {
    id: 15,
    designation: 'Executive',
    department: 'Quality Control (Microbiology)',
    level: '3-5 Years',
    location: 'Bonthapally, India',
    type: 'Full-time',
    description:
      'Conduct routine environmental monitoring, cleanroom viable/non-viable counts, water testing, and microbial limit assays in compliance with current pharmacopoeial monographs.',
    responsibilities: [
      'Perform sterility testing, bacterial endotoxin testing (LAL), and microbial identification.',
      'Carry out environmental monitoring of Grade A/B/C cleanroom manufacturing facilities.',
      'Maintain accurate cGMP laboratory notebooks and microbial trend analysis dashboards.',
    ],
    qualifications: [
      'M.Sc. in Microbiology, Biotechnology, or Applied Biology.',
      '3+ years experience in a sterile formulation or regulated API QC microbiology lab.',
      'Familiarity with cleanroom gowning protocols and aseptic manipulation techniques.',
    ],
  },
  {
    id: 16,
    designation: 'Manager',
    department: 'Operational Excellence (Lean Six Sigma)',
    level: '6-9 Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Champion business transformation, cycle time compression, Gemba continuous improvement, and waste elimination initiatives across our manufacturing and support functions.',
    responsibilities: [
      'Facilitate Value Stream Mapping (VSM) and Kaizen blitz events at key manufacturing plants.',
      'Mentor green belt candidates and implement data-driven DMAIC Six Sigma projects.',
      'Drive yield enhancement and changeover time reduction (SMED) across high-speed packaging lines.',
    ],
    qualifications: [
      'Degree in Chemical Engineering, Mechanical Engineering, or B.Pharm with MBA/Industrial Engg.',
      'Certified Lean Six Sigma Black Belt from an accredited organization.',
      '6+ years driving proven cost-saving operational excellence programs in manufacturing.',
    ],
  },
  {
    id: 17,
    designation: 'Lead Scientist',
    department: 'Solid State Chemistry & Polymorphism',
    level: '5+ Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Investigate API polymorph screening, salt selection, co-crystals, and crystallization thermodynamics to ensure product patentability, stability, and bioavailability.',
    responsibilities: [
      'Execute high-throughput polymorph screens, solvate studies, and amorphous solid dispersions.',
      'Characterize solid-state attributes using PXRD, DSC, TGA, DVS, FTIR, and Raman spectroscopy.',
      'Support patent drafting and non-infringement argument generation for regulatory submissions.',
    ],
    qualifications: [
      'Ph.D. in Physical Chemistry, Solid State Chemistry, or Materials Science.',
      '5+ years experience in solid-state drug development in pharmaceutical R&D.',
      'Deep proficiency in powder diffraction indexing, Rietveld refinement, and crystal structure elucidation.',
    ],
  },
  {
    id: 18,
    designation: 'Senior Manager',
    department: 'Enterprise Digital Systems & SAP S/4HANA',
    level: '8+ Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Drive enterprise architecture modernizations, smart factory Industry 4.0 integrations, and cloud ERP systems across Granules’ global manufacturing sites.',
    responsibilities: [
      'Lead SAP S/4HANA pharmaceutical functional implementations across PP, QM, and PM modules.',
      'Integrate manufacturing execution systems (MES) with laboratory information management (LIMS).',
      'Oversee cybersecurity frameworks, disaster recovery architectures, and digital compliance audits.',
    ],
    qualifications: [
      'B.Tech / B.E. / M.C.A. in Computer Science, Information Technology, or related discipline.',
      '8+ years leading enterprise IT transformation in life sciences or regulated process industries.',
      'Deep hands-on experience with GxP validation, SAP integration, and cloud migrations.',
    ],
  },
  {
    id: 19,
    designation: 'Lead Analyst',
    department: 'Pharma Data Science & Process Analytical Tech (PAT)',
    level: '4-6 Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Apply machine learning, multivariate statistical analysis, and real-time sensor analytics to optimize continuous manufacturing yields and batch-to-batch consistency.',
    responsibilities: [
      'Build predictive modeling pipelines for granulation, blend uniformity, and tablet compression.',
      'Implement real-time in-line NIR and Raman spectroscopy for continuous process verification.',
      'Collaborate with R&D and manufacturing engineers to deploy intelligent process control algorithms.',
    ],
    qualifications: [
      'Master’s or Ph.D. in Data Science, Chemometrics, Chemical Engineering, or Bio-statistics.',
      '4+ years applying predictive machine learning models to industrial chemistry or pharma processes.',
      'Proficiency in Python/R, SIMCA, Matlab, and industrial IoT sensor telemetry.',
    ],
  },
  {
    id: 20,
    designation: 'Lead',
    department: 'Green Chemistry & Sustainability Operations',
    level: '5-8 Years',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Pioneer decarbonization, biocatalysis, solvent recovery, and circular economy methodologies across our API and formulation production plants to achieve net-zero ESG milestones.',
    responsibilities: [
      'Evaluate process mass intensity (PMI) and atom economy to replace hazardous solvent chemistry.',
      'Lead pilot demonstrations of bio-catalytic conversions and renewable energy integrations.',
      'Develop carbon accounting metrics aligned with Science-Based Targets initiative (SBTi).',
    ],
    qualifications: [
      'Ph.D. or Master’s in Green Chemistry, Environmental Engineering, or Chemical Technology.',
      '5+ years in sustainable chemical processing or pharmaceutical ESG operationalization.',
      'Passionate advocate for renewable manufacturing and life cycle assessment (LCA).',
    ],
  },
];

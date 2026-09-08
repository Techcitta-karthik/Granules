export interface RegulatoryLogo {
  id: string;
  name: string;
  fullName: string;
  country: string;
  region: string;
  image: string;
  badge?: string;
}

export const REGULATORY_LOGOS: RegulatoryLogo[] = [
  {
    id: 'us-fda',
    name: 'US FDA',
    fullName: 'Food and Drug Administration',
    country: 'United States',
    region: 'North America',
    image: '/assets/logos/us-fda.jpeg',
    badge: 'cGMP Approved',
  },
  {
    id: 'edqm',
    name: 'EDQM',
    fullName: 'European Directorate for the Quality of Medicines',
    country: 'Council of Europe',
    region: 'Europe',
    image: '/assets/logos/edqm.webp',
    badge: 'CEP Certified',
  },
  {
    id: 'eu-gmp',
    name: 'EU GMP',
    fullName: 'European Union Good Manufacturing Practice',
    country: 'European Union',
    region: 'Europe',
    image: '/assets/logos/eu-gmp.png',
    badge: 'GMP Compliance',
  },
  {
    id: 'health-canada',
    name: 'Health Canada',
    fullName: 'Santé Canada / Health Canada',
    country: 'Canada',
    region: 'North America',
    image: '/assets/logos/health-canada.svg',
    badge: 'DEL Compliance',
  },
  {
    id: 'tga',
    name: 'TGA Australia',
    fullName: 'Therapeutic Goods Administration',
    country: 'Australia',
    region: 'Asia-Pacific',
    image: '/assets/logos/tga.svg',
    badge: 'GMP Clearance',
  },
  {
    id: 'pmda',
    name: 'PMDA Japan',
    fullName: 'Pharmaceuticals and Medical Devices Agency',
    country: 'Japan',
    region: 'Asia-Pacific',
    image: '/assets/logos/pmda.svg',
    badge: 'Accredited Foreign Mfg',
  },
  {
    id: 'anvisa',
    name: 'ANVISA',
    fullName: 'Agência Nacional de Vigilância Sanitária',
    country: 'Brazil',
    region: 'Latin America',
    image: '/assets/logos/anvisa.png',
    badge: 'CBPF Approved',
  },
  {
    id: 'cofepris',
    name: 'COFEPRIS',
    fullName: 'Comisión Federal para la Protección contra Riesgos Sanitarios',
    country: 'Mexico',
    region: 'Latin America',
    image: '/assets/logos/cofepris.png',
    badge: 'GMP Certified',
  },
  {
    id: 'nmpa',
    name: 'NMPA China',
    fullName: 'National Medical Products Administration',
    country: 'China',
    region: 'Asia-Pacific',
    image: '/assets/logos/nmpa.jpeg',
    badge: 'Import DMF Filed',
  },
  {
    id: 'mfds',
    name: 'MFDS Korea',
    fullName: 'Ministry of Food and Drug Safety',
    country: 'South Korea',
    region: 'Asia-Pacific',
    image: '/assets/logos/mfds.png',
    badge: 'K-GMP Approved',
  },
  {
    id: 'sfda',
    name: 'SFDA Saudi',
    fullName: 'Saudi Food and Drug Authority',
    country: 'Saudi Arabia',
    region: 'Middle East',
    image: '/assets/logos/sfda.svg',
    badge: 'GCC GMP Approved',
  },
  {
    id: 'sahpra',
    name: 'SAHPRA',
    fullName: 'South African Health Products Regulatory Authority',
    country: 'South Africa',
    region: 'Africa',
    image: '/assets/logos/sahpra.svg',
    badge: 'GMP Approved',
  },
  {
    id: 'halal',
    name: 'Halal Certified',
    fullName: 'Global Halal Quality Compliance Certification',
    country: 'Global',
    region: 'Global',
    image: '/assets/logos/halal.svg',
    badge: 'Certified',
  },
];

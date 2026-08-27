import type { NavLink, SubsidiaryCard, ValueItem } from './types';

const VALUE_BODY =
  'Our unwavering belief in pushing boundaries and thinking beyond the possible drives us to ' +
  'challenge the status quo, embrace risk, and consistently pursue innovation fearlessly, ' +
  'without necessarily conforming to established practice. In doing so, we leverage the power ' +
  'of science in the best way possible.';

export const VALUES: ValueItem[] = [
  { icon: 'icon-safety-cert.svg', title: 'Challenging Limits', body: VALUE_BODY },
  { icon: 'icon-idea.svg', title: 'Futuristic Thinking', body: VALUE_BODY },
  { icon: 'icon-user-solid.svg', title: 'Customer Driven', body: VALUE_BODY },
  { icon: 'icon-hand-fist.svg', title: 'Empowering Employees', body: VALUE_BODY },
  { icon: 'icon-production-belt.svg', title: 'Quality Everywhere', body: VALUE_BODY },
  { icon: 'icon-leaf.svg', title: 'Environmental Stewardship', body: VALUE_BODY },
];

export const SUBSIDIARIES: SubsidiaryCard[] = [
  {
    fullName: 'GRANULES PHARMACEUTICALS INC. (GPI), US',
    shortName: 'GPI-US',
    description:
      "R&D and manufacturing facility producing oral solid dosage forms and drives commercialisation of products manufactured at Granules's India facility.",
    image: 'company/gpi-facility.png',
    href: '/company/facilities',
    logoBadge: 'company/nav-logo.png',
  },
  {
    fullName: 'GRANULES LIFE SCIENCES PRIVATE LIMITED (GLS), INDIA',
    shortName: 'GLS-IND',
    description:
      'Hyderabad facility expanding finished dosage capacity, adding significant annual volume through advanced manufacturing excellence.',
    image: 'gls/hero-banner.png',
    href: '/company/granules-life-sciences',
    logoBadge: 'company/nav-logo.png',
  },
  {
    fullName: 'GRANULES CZRO (CZRO), INDIA',
    shortName: 'G-CZRO',
    description:
      'Pioneering sustainable green pharmaceutical manufacturing with near net-zero carbon footprint and 24/7 carbon-free energy.',
    image: 'czro/hero-banner.png',
    href: '/company/granules-czro',
    logoBadge: 'company/nav-logo.png',
  },
  {
    fullName: 'ASCELIS PEPTIDES PRIVATE LIMITED, INDIA',
    shortName: 'Ascelis peptides-IND',
    description:
      'Global platform for therapeutic, cosmetic, and diagnostic peptides combining Swiss CDMO precision with Indian scale.',
    image: 'ascelis/hero-banner.png',
    href: '/company/ascelis-peptides',
    logoBadge: 'company/nav-logo.png',
  },
  {
    fullName: 'GRANULES USA INC., US',
    shortName: 'GUSA-US',
    description:
      'Distribution and commercial headquarters serving the North American pharmaceutical and healthcare markets.',
    image: 'company/gpi-facility.png',
    href: '/company',
    logoBadge: 'company/nav-logo.png',
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: 'Company', href: '/company', matchPrefix: '/company' },
  { label: 'Business', href: '/business/api', matchPrefix: '/business' },
  { label: 'Sustainability', href: '/sustainability', matchPrefix: '/sustainability' },
  { label: 'Investor', href: '/investor', matchPrefix: '/investor' },
  { label: 'Media', href: '/media', matchPrefix: '/media' },
  { label: 'Careers', href: '/careers', matchPrefix: '/careers' },
  { label: 'Contact', href: '/contact', matchPrefix: '/contact' },
];

export const FOOTER_SOCIALS = ['social-1.svg', 'social-2.svg', 'social-3.svg', 'social-4.svg', 'social-5.svg'];

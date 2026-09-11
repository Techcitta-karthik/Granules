import type { NavLink, SubsidiaryCard, ValueItem } from './types';

export const VALUES: ValueItem[] = [
  {
    icon: 'icon-safety-cert.svg',
    title: 'Challenging Limits',
    body: 'Our unwavering belief in pushing boundaries and thinking beyond the possible drives us to challenge the status quo, embrace risk, and consistently pursue innovation fearlessly, without necessarily conforming to established practice. In doing so, we leverage the power of science in the best way possible.',
    image: 'challenging-limits.webp',
  },
  {
    icon: 'icon-idea.svg',
    title: 'Futuristic Thinking',
    body: 'We think about tomorrow and beyond. Our actions and efforts must have a positive and transformative impact for a long time to come, and everything we do is evaluated through this prism.',
    image: 'futuristic-thinking.webp',
  },
  {
    icon: 'icon-user-solid.svg',
    title: 'Customer Driven',
    body: 'Being driven by the customer’s best interests is a way of life for us. It fuels our passion to develop tailored solutions that prioritize customer preferences. It inspires us to go above and beyond and forge lasting, meaningful relationships.',
    image: 'customer-driven.webp',
  },
  {
    icon: 'icon-hand-fist.svg',
    title: 'Empowering Employees',
    body: 'People are the beating heart of Granules. They must be encouraged and empowered to be the best version of themselves. Through our approach, we enable and empower our colleagues and communities to achieve their highest potential, cocreating opportunities for collaboration and impact.',
    image: 'empowering-employees.webp',
  },
  {
    icon: 'icon-production-belt.svg',
    title: 'Quality Everywhere',
    body: 'Quality excellence is not just a goal, but a relentless pursuit embedded in our DNA. We are driven by an approach to achieve ‘best-in-class’ across our products, operations, processes, and conduct. We believe this is the only way to go further, be a preferred partner for our customers, and inspire confidence and ambition in all stakeholders.',
    image: 'quality-everywhere.webp',
  },
  {
    icon: 'icon-leaf.svg',
    title: 'Environmental Stewardship',
    body: 'Being a positive force for the planet and its preservation is a fundamental duty that we fulfil through our efforts in green science, responsible practices, and a trusteeship approach. Long term success is based on our ability to partner in fostering a harmonious relationship with the planet and caring for it for the benefit of future generations.',
    image: 'environmental-stewardship.webp',
  },
];

export const SUBSIDIARIES: SubsidiaryCard[] = [
  {
    fullName: 'GRANULES PHARMACEUTICALS INC., US',
    shortName: 'GPI-US',
    description:
      "R&D and manufacturing facility producing oral solid dosage forms and drives commercialisation of products manufactured at Granules' India facility.",
    image: 'company/gpi-facility.webp',
    href: '/business/facilities',
  },
  {
    fullName: 'GRANULES LIFE SCIENCES PRIVATE LIMITED (GLS), INDIA',
    shortName: 'GLS-IND',
    description:
      'Hyderabad facility expanding finished dosage capacity, adding significant annual volume through advanced manufacturing excellence.',
    image: 'gls/hero-banner.webp',
    href: '/company/granules-life-sciences',
  },
  {
    fullName: 'GRANULES CZRO PRIVATE LIMITED (G-CZRO), INDIA',
    shortName: 'G-CZRO',
    description:
      'Facility advancing sustainable manufacturing, producing green chemicals including Dicyandiamide (DCDA) with pilot operations now in Visakhapatnam.',
    image: 'czro/hero-banner.webp',
    href: '/company/granules-czro',
  },
  {
    fullName: 'SENN TIDES PRIVATE LIMITED (STPL), SWITZERLAND & INDIA',
    shortName: 'SENN TIDES',
    description:
      'Acquired Senn Chemicals, enabling custom peptide development and commercial manufacturing for metabolic, oncology, and specialty therapies',
    image: 'ascelis/hero-banner.webp',
    href: '/company/senn-tides',
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: 'About Us', href: '/company', matchPrefix: '/company' },
  { label: 'Business', href: '/business/generics', matchPrefix: '/business' },
  { label: 'Sustainability', href: '/sustainability', matchPrefix: '/sustainability' },
  { label: 'Community', href: '/community', matchPrefix: '/community' },
  { label: 'Investor', href: '/investor', matchPrefix: '/investor' },
  { label: 'Media', href: '/media', matchPrefix: '/media' },
  { label: 'Careers', href: '/careers', matchPrefix: '/careers' },
  { label: 'Contact Us', href: '/contact', matchPrefix: '/contact' },
];

export const FOOTER_SOCIALS = ['social-1.svg', 'social-2.svg', 'social-3.svg', 'social-4.svg', 'social-5.svg'];

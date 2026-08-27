import type { ReactNode } from 'react';

export type ValueItem = {
  icon: string;
  title: string;
  body: string;
};

export type SubsidiaryCard = {
  fullName: string;
  shortName: string;
  description: string;
  image: string;
  href: string;
  logoBadge?: string;
};

export type NavLink = {
  label: string;
  href: string;
  /** Pathname prefix that marks this link active; omit for links with no page yet. */
  matchPrefix?: string;
};

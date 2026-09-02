export const COMPANY_ASSET_BASE = '/assets/company/';

export const asset = (name: string) => {
  if (!name) return '';
  if (name.startsWith('/') || name.startsWith('http')) return name;
  if (name.startsWith('assets/')) return `/${name}`;
  if (
    name.startsWith('company/') ||
    name.startsWith('czro/') ||
    name.startsWith('gls/') ||
    name.startsWith('ascelis/') ||
    name.startsWith('api/') ||
    name.startsWith('fd/') ||
    name.startsWith('pfi/') ||
    name.startsWith('rd/') ||
    name.startsWith('leadership/') ||
    name.startsWith('career/') ||
    name.startsWith('facilities/') ||
    name.startsWith('investor/') ||
    name.startsWith('media/') ||
    name.startsWith('esg/') ||
    name.startsWith('milestone/') ||
    name.startsWith('awards/')
  ) {
    return `/assets/${name}`;
  }
  if (name === 'esg-world-profile.webp' || name === 'investor-report-cover.webp') {
    return `/assets/${name}`;
  }
  return `${COMPANY_ASSET_BASE}${name}`;
};

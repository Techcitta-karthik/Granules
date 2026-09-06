import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { asset } from './constants';
import { NAV_LINKS } from './data';
import type { NavLink as NavLinkItem } from './types';

type QuickLink = {
  label: string;
  href: string;
};

type SubmenuSection = {
  title?: string;
  quickLinks: QuickLink[];
};

type Submenu = {
  title?: string;
  quickLinks?: QuickLink[];
  sections?: SubmenuSection[];
  links?: { label: string; href: string }[];
  image: string;
  imageHref?: string;
};

const SUBMENUS: Record<string, Submenu> = {
  'About Us': {
    sections: [
      {
        title: 'Overview',
        quickLinks: [
          { label: 'About Us', href: '/company' },
          { label: 'Our Journey', href: '/company/milestone' },
          { label: 'Leadership', href: '/company/leadership' },
          { label: 'Awards', href: '/company/awards' },
        ],
      },
      {
        title: 'Global Subsidiaries',
        quickLinks: [
          { label: 'Overview', href: '/company/global-subsidiaries' },
          { label: 'Granules Pharmaceuticals Inc. (GPI)', href: 'https://www.granulespharma.com/' },
          { label: 'Granules Life Sciences', href: '/company/granules-life-sciences' },
          { label: 'Senn Tides', href: '/company/senn-tides' },
          { label: 'Granules CZRO', href: '/company/granules-czro' },
        ],
      },
    ],
    links: [
      { label: 'Operational Excellence', href: '/company/operational-excellence' },
    ],
    image: 'company/values-bg-2.webp',
  },
  Company: {
    sections: [
      {
        title: 'Overview',
        quickLinks: [
          { label: 'About Us', href: '/company' },
          { label: 'Our Journey', href: '/company/milestone' },
          { label: 'Leadership', href: '/company/leadership' },
          { label: 'Awards', href: '/company/awards' },
        ],
      },
      {
        title: 'Global Subsidiaries',
        quickLinks: [
          { label: 'Overview', href: '/company/global-subsidiaries' },
          { label: 'Granules Pharmaceuticals Inc. (GPI)', href: 'https://www.granulespharma.com/' },
          { label: 'Granules Life Sciences', href: '/company/granules-life-sciences' },
          { label: 'Senn Tides', href: '/company/senn-tides' },
          { label: 'Granules CZRO', href: '/company/granules-czro' },
        ],
      },
    ],
    links: [
      { label: 'Operational Excellence', href: '/company/operational-excellence' },
    ],
    image: 'company/values-bg-2.webp',
  },
  Business: {
    sections: [
      {
        title: 'GENERICS',
        quickLinks: [
          { label: 'OVERVIEW', href: '/business/generics' },
          { label: 'API', href: '/business/api' },
          { label: 'PFI', href: '/business/pfi' },
          { label: 'FINISHED DOSAGES', href: '/business/fd' },
        ],
      },
    ],
    links: [
      { label: 'Peptides CDMO', href: '/business/peptides' },
      { label: 'Research & Development', href: '/business/rd' },
      { label: 'Quality & Compliance', href: '/business/quality-compliance' },
      { label: 'Facilities', href: '/company/facilities' },
    ],
    image: 'company/gpi-facility.webp',
  },
  Careers: {
    sections: [
      {
        title: 'CAREERS',
        quickLinks: [
          { label: 'Overview', href: '/careers' },
          { label: 'Opportunities', href: '/careers/opportunities' },
        ],
      },
    ],
    links: [],
    image: 'company/career-bg.webp',
  },
};

function isActive(link: NavLinkItem, pathname: string) {
  if (link.label === 'About Us' || link.label === 'Company') {
    return (
      pathname.startsWith('/company') ||
      pathname.startsWith('/global-subsidiaries') ||
      pathname.startsWith('/granules-life-sciences') ||
      pathname.startsWith('/gls')
    );
  }
  if (link.label === 'Business') {
    return pathname.startsWith('/business') || pathname.startsWith('/generics');
  }
  if (link.label === 'Sustainability') {
    return (
      pathname.startsWith('/sustainability') &&
      !pathname.startsWith('/sustainability/community') &&
      !pathname.startsWith('/sustainability/csr') &&
      !pathname.startsWith('/sustainability/corporate-social-responsibility')
    );
  }
  if (link.label === 'Community') {
    return (
      pathname.startsWith('/community') ||
      pathname.startsWith('/csr') ||
      pathname.startsWith('/corporate-social-responsibility') ||
      pathname.startsWith('/sustainability/community') ||
      pathname.startsWith('/sustainability/csr') ||
      pathname.startsWith('/sustainability/corporate-social-responsibility')
    );
  }
  if (link.label === 'Investor') {
    return pathname.startsWith('/investor');
  }
  if (link.label === 'Media') {
    return pathname.startsWith('/media');
  }
  if (link.label === 'Careers') {
    return pathname.startsWith('/careers');
  }
  if (link.label === 'Contact Us') {
    return pathname.startsWith('/contact');
  }
  return !!link.matchPrefix && pathname.startsWith(link.matchPrefix);
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  const showMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredMenu(label);
  };

  const hideMenu = () => {
    closeTimer.current = setTimeout(() => setHoveredMenu(null), 200);
  };

  return (
    <div className="cp-nav-wrap">
      <nav className={`cp-nav${open ? ' cp-nav--open' : ''}`} aria-label="Primary navigation">
        <div className="cp-nav-bar">
          <Link to="/" className="cp-nav-logo" aria-label="Granules home" onClick={() => setOpen(false)}>
            <img src={asset('nav-logo.webp')} alt="Granules" loading="eager" decoding="async" />
          </Link>

          <button
            className="cp-nav-toggle"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="cp-nav-links" onMouseLeave={hideMenu}>
            {NAV_LINKS.map((link) => {
              const submenu = SUBMENUS[link.label];
              const active = isActive(link, pathname);
              return (
                <div
                  className={`cp-nav-item${active ? ' is-active' : ''}`}
                  key={link.label}
                  onMouseEnter={() => showMenu(link.label)}
                >
                  <Link
                    to={link.href}
                    className={`cp-nav-link${active ? ' active' : ''}`}
                  >
                    <span>{link.label}</span>
                    <span className="cp-nav-underline" />
                  </Link>

                  {submenu && (
                    <div
                      className={`cp-nav-submenu${hoveredMenu === link.label ? ' is-open' : ''}`}
                      onMouseEnter={() => showMenu(link.label)}
                    >
                      <div className="cp-nav-submenu-copy">
                        {(submenu.sections || (submenu.title && submenu.quickLinks ? [{ title: submenu.title, quickLinks: submenu.quickLinks }] : [])).map((section, idx) => (
                          <div className="cp-nav-submenu-header-box" key={section.title || idx}>
                            {section.title && <span className="cp-nav-submenu-title">{section.title}</span>}
                            <div className="cp-nav-quick-links">
                              {(section.quickLinks || []).map((item) =>
                                item.href.startsWith('http') ? (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={item.label}
                                    onClick={() => {
                                      setHoveredMenu(null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span>{item.label}</span>
                                    <span className="cp-nav-arrow-diag" aria-hidden="true">↗</span>
                                  </a>
                                ) : (
                                  <Link
                                    to={item.href}
                                    key={item.label}
                                    onClick={() => {
                                      setHoveredMenu(null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span>{item.label}</span>
                                    <span className="cp-nav-arrow-diag" aria-hidden="true">↗</span>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        ))}

                        {submenu.links && submenu.links.length > 0 && (
                          <div className="cp-nav-submenu-links">
                            {submenu.links.map((item) =>
                              item.href.startsWith('http') ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  key={item.label}
                                  onClick={() => {
                                    setHoveredMenu(null);
                                    setOpen(false);
                                  }}
                                >
                                  {item.label}
                                </a>
                              ) : (
                                <Link
                                  to={item.href}
                                  key={item.label}
                                  onClick={() => {
                                    setHoveredMenu(null);
                                    setOpen(false);
                                  }}
                                >
                                  {item.label}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </div>

                      {submenu.imageHref ? (
                        <a
                          href={submenu.imageHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cp-nav-submenu-thumb"
                          title="View Profile"
                        >
                          <img src={asset(submenu.image)} alt="" loading="lazy" decoding="async" />
                        </a>
                      ) : (
                        <div className="cp-nav-submenu-thumb">
                          <img src={asset(submenu.image)} alt="" loading="lazy" decoding="async" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <button className="cp-nav-search" type="button" aria-label="Search">
              <img src={asset('search-icon.svg')} alt="" loading="lazy" decoding="async" />
            </button>

            <span className="cp-nav-global">
              <span className="cp-nav-globe">
                <img src={asset('group-globe-1.svg')} alt="" loading="lazy" decoding="async" />
              </span>
              Global
            </span>
          </div>
        </div>

        {open && (
          <div className="cp-nav-drawer">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`cp-nav-drawer-link${isActive(link, pathname) ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <span className="cp-nav-drawer-global">
              <img src={asset('group-globe-1.svg')} alt="" loading="lazy" decoding="async" /> Global
            </span>
          </div>
        )}
      </nav>
    </div>
  );
}

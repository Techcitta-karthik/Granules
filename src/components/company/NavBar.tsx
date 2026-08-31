import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { asset } from './constants';
import { NAV_LINKS } from './data';
import type { NavLink as NavLinkItem } from './types';

type Submenu = {
  title: string;
  quickLinks: { label: string; href: string }[];
  links: { label: string; href: string }[];
  image: string;
};

const SUBMENUS: Record<string, Submenu> = {
  'About Us': {
    title: 'About Us',
    quickLinks: [
      { label: 'ABOUT US', href: '/company' },
      { label: 'MILESTONE', href: '/company/milestone' },
      { label: 'AWARDS', href: '/company/awards' },
    ],
    links: [
      { label: 'Leadership', href: '/company/leadership' },
      { label: 'Group Companies', href: '/company#subsidiaries' },
      { label: 'Sub Companies', href: '/company#subsidiaries' },
      { label: 'Operational Excellence', href: '/company/operational-excellence' },
    ],
    image: 'company/values-bg-2.png',
  },
  Company: {
    title: 'About Us',
    quickLinks: [
      { label: 'ABOUT US', href: '/company' },
      { label: 'MILESTONE', href: '/company/milestone' },
      { label: 'AWARDS', href: '/company/awards' },
    ],
    links: [
      { label: 'Leadership', href: '/company/leadership' },
      { label: 'Group Companies', href: '/company#subsidiaries' },
      { label: 'Sub Companies', href: '/company#subsidiaries' },
      { label: 'Operational Excellence', href: '/company/operational-excellence' },
    ],
    image: 'company/values-bg-2.png',
  },
  Business: {
    title: 'Product',
    quickLinks: [
      { label: 'ACTIVE PHARMACEUTICAL INGREDIENTS', href: '/business/api' },
      { label: 'PEPTIDES', href: '/business/peptides' },
      { label: 'PHARMACEUTICAL FORMULATION INTERMEDIATES', href: '/business/pfi' },
      { label: 'FINISHED DOSAGES', href: '/business/fd' },
    ],
    links: [
      { label: 'Research & Development', href: '/business/rd' },
      { label: 'Quality Control & Compliance Facilities', href: '/business/quality-compliance' },
      { label: 'Facilities', href: '/company/facilities' },
    ],
    image: 'czro/hero-banner.png',
  },
  Sustainability: {
    title: 'Sustainability',
    quickLinks: [
      { label: 'OVERVIEW', href: '/sustainability' },
      { label: 'STRATEGY', href: '/sustainability/strategy' },
      { label: 'ESG IN ACTION', href: '/sustainability/esg-in-action' },
    ],
    links: [
      { label: 'Policies', href: '/sustainability#policies' },
      { label: 'Reports & Disclosures', href: '/sustainability#reports' },
      { label: 'Assurance & Verification Report', href: '/sustainability#assurance' },
      { label: 'Commitments Memberships & Ratings', href: '/sustainability#commitments' },
      { label: 'Certifications', href: '/sustainability#certifications' },
    ],
    image: 'esg-world-profile.png',
  },
  Investor: {
    title: 'Investor Relations',
    quickLinks: [
      { label: 'OVERVIEW', href: '/investor' },
      { label: 'ANNUAL REPORTS', href: '/investor/annual-reports' },
    ],
    links: [
      { label: 'Investor V2', href: '/investor/v2' },
      { label: 'Investor Resources', href: '/investor' },
      { label: 'Financial Highlights', href: '/investor' },
    ],
    image: 'investor-report-cover.png',
  },
  Media: {
    title: 'Media & News',
    quickLinks: [
      { label: 'PRESS RELEASES', href: '/media' },
      { label: 'NEWS & COVERAGE', href: '/media' },
    ],
    links: [
      { label: 'Corporate Announcements', href: '/media' },
      { label: 'Media Kit', href: '/media' },
    ],
    image: 'company/leadership-photo-main-2.png',
  },
  Careers: {
    title: 'Careers',
    quickLinks: [
      { label: 'OVERVIEW', href: '/careers' },
      { label: 'OPPORTUNITIES', href: '/careers/opportunities' },
      { label: 'LIFE AT GRANULES', href: '/careers/life-at-granules' },
    ],
    links: [
      { label: 'Culture, Purpose & People', href: '/careers' },
      { label: 'Graduate & Internship Programs', href: '/careers' },
    ],
    image: 'company/career-bg.png',
  },
  Contact: {
    title: 'Contact',
    quickLinks: [
      { label: 'CONTACT US', href: '/contact' },
      { label: 'GLOBAL LOCATIONS', href: '/contact' },
    ],
    links: [
      { label: 'Corporate Headquarters', href: '/contact' },
      { label: 'Investor & Media Relations', href: '/investor' },
    ],
    image: 'company/gpi-facility.png',
  },
};

function isActive(link: NavLinkItem, pathname: string) {
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
            <img src={asset('nav-logo.png')} alt="Granules" />
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
                        <div className="cp-nav-submenu-header-box">
                          <span className="cp-nav-submenu-title">{submenu.title}</span>
                          <div className="cp-nav-quick-links">
                            {submenu.quickLinks.map((item) => (
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
                            ))}
                          </div>
                        </div>

                        <div className="cp-nav-submenu-links">
                          {submenu.links.map((item) => (
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
                          ))}
                        </div>
                      </div>

                      <div className="cp-nav-submenu-thumb">
                        <img src={asset(submenu.image)} alt="" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button className="cp-nav-search" type="button" aria-label="Search">
              <img src={asset('search-icon.svg')} alt="" />
            </button>

            <span className="cp-nav-global">
              <span className="cp-nav-globe">
                <img src={asset('group-globe-1.svg')} alt="" />
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
              <img src={asset('group-globe-1.svg')} alt="" /> Global
            </span>
          </div>
        )}
      </nav>
    </div>
  );
}

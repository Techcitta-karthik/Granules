import { useEffect, useRef, useState } from 'react';
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
  href?: string;
  quickLinks: QuickLink[];
};

type Submenu = {
  title?: string;
  href?: string;
  quickLinks?: QuickLink[];
  sections?: SubmenuSection[];
  links?: { label: string; href: string }[];
};

const SUBMENUS: Record<string, Submenu> = {
  'About Us': {
    sections: [],
    links: [
      { label: 'Overview', href: '/company' },
      { label: 'Our Journey', href: '/company/milestone' },
      { label: 'Leadership', href: '/company/leadership' },
      { label: 'Global Subsidiaries', href: '/company/global-subsidiaries' },
    ],
  },
  Company: {
    sections: [],
    links: [
      { label: 'Overview', href: '/company' },
      { label: 'Our Journey', href: '/company/milestone' },
      { label: 'Leadership', href: '/company/leadership' },
      { label: 'Global Subsidiaries', href: '/company/global-subsidiaries' },
    ],
  },
  Business: {
    sections: [],
    links: [
      { label: 'Generics', href: '/business/generics' },
      { label: 'Peptide CDMO', href: '/business/peptides' },
      { label: 'Research & Development', href: '/business/rd' },
      { label: 'Quality & Compliance', href: '/business/quality-compliance' },
      { label: 'Facilities', href: '/business/facilities' },
    ],
  },
  Careers: {
    sections: [],
    links: [
      { label: 'Life at Granules', href: '/careers#culture-values' },
      { label: 'Work with us', href: 'https://careers.mygranules.com/' },
    ],
  },
};

function isActive(link: NavLinkItem, pathname: string, activeSection?: string | null) {
  if (pathname === '/' || pathname === '') {
    return !!activeSection && link.label === activeSection;
  }
  if (link.label === 'About Us' || link.label === 'Company') {
    return (
      (pathname.startsWith('/company') ||
        pathname.startsWith('/global-subsidiaries') ||
        pathname.startsWith('/granules-life-sciences') ||
        pathname.startsWith('/gls')) &&
      !pathname.startsWith('/company/facilities')
    );
  }
  if (link.label === 'Business') {
    return (
      pathname.startsWith('/business') ||
      pathname.startsWith('/generics') ||
      pathname.startsWith('/facilities') ||
      pathname.startsWith('/company/facilities')
    );
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
    return pathname.startsWith('/career') || pathname.startsWith('/work-with-us');
  }
  if (link.label === 'Contact Us') {
    return pathname.startsWith('/contact');
  }
  return !!link.matchPrefix && pathname.startsWith(link.matchPrefix);
}

export default function NavBar({
  onSearch,
  activeSectionOverride,
}: {
  onSearch?: () => void;
  activeSectionOverride?: string | null;
} = {}) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close dropdown on route changes
  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  // Auto-expand the active section's submenu when mobile drawer opens
  useEffect(() => {
    if (open) {
      const initialExpanded: Record<string, boolean> = {};
      NAV_LINKS.forEach((link) => {
        if (isActive(link, pathname, activeSection)) {
          initialExpanded[link.label] = true;
        }
      });
      setExpandedMobileMenus((prev) => ({ ...initialExpanded, ...prev }));
    }
  }, [open, pathname, activeSection]);

  const toggleMobileMenu = (label: string) => {
    setExpandedMobileMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toggleMenu = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Homepage scroll-spy to glow current section in navbar
  useEffect(() => {
    if (pathname !== '/' && pathname !== '') {
      setActiveSection(null);
      return;
    }

    const SECTIONS = [
      { id: 'about', label: 'About Us' },
      { id: 'business', label: 'Business' },
      { id: 'sustainability', label: 'Sustainability' },
      { id: 'investor', label: 'Investor' },
      { id: 'media', label: 'Media' },
      { id: 'careers', label: 'Careers' },
    ];

    const handleScrollSpy = () => {
      if (window.scrollY < 200) {
        setActiveSection(null);
        return;
      }

      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 100) {
        setActiveSection('Careers');
        return;
      }

      const mid = window.innerHeight * 0.38;
      let matchedLabel: string | null = null;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= mid) {
            matchedLabel = sec.label;
            break;
          }
        }
      }

      if (matchedLabel === 'Sustainability' && activeSectionOverride) {
        matchedLabel = activeSectionOverride;
      }

      setActiveSection(matchedLabel);
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [pathname, activeSectionOverride]);

  return (
    <div className={`cp-nav-wrap${scrolled ? ' is-scrolled' : ''}`} ref={navRef}>
      <nav className={`cp-nav${open ? ' cp-nav--open' : ''}${scrolled ? ' is-scrolled' : ''}`} aria-label="Primary navigation">
        <div className="cp-nav-bar">
          <Link to="/" className="cp-nav-logo" aria-label="Granules home" onClick={() => { setOpen(false); setOpenMenu(null); }}>
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

          <div className="cp-nav-links">
            {NAV_LINKS.map((link) => {
              const submenu = SUBMENUS[link.label];
              const active = isActive(link, pathname, activeSection);
              const isOpen = openMenu === link.label;

              return (
                <div
                  className={`cp-nav-item${active ? ' is-active' : ''}${isOpen ? ' is-menu-open' : ''}`}
                  key={link.label}
                >
                  {submenu ? (
                    <button
                      type="button"
                      className={`cp-nav-link${active ? ' active' : ''}${isOpen ? ' is-menu-open' : ''}`}
                      onClick={(e) => toggleMenu(link.label, e)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span className="cp-nav-label-wrap">
                        <span>{link.label}</span>
                        <svg
                          className={`cp-nav-chevron${isOpen ? ' is-open' : ''}`}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                      <span className="cp-nav-underline" />
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`cp-nav-link${active ? ' active' : ''}`}
                      onClick={() => setOpenMenu(null)}
                    >
                      <span className="cp-nav-label-wrap">
                        <span>{link.label}</span>
                      </span>
                      <span className="cp-nav-underline" />
                    </Link>
                  )}

                  {submenu && (
                    <div
                      className={`cp-nav-submenu${isOpen ? ' is-open' : ''}`}
                    >
                      <div className="cp-nav-submenu-copy">
                        {(submenu.sections || (submenu.title && submenu.quickLinks ? [{ title: submenu.title, href: submenu.href, quickLinks: submenu.quickLinks }] : [])).map((section, idx) => (
                          <div className="cp-nav-submenu-header-box" key={section.title || idx}>
                            {section.title && (
                              section.href ? (
                                section.href.startsWith('http') ? (
                                  <a
                                    href={section.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cp-nav-submenu-title"
                                    onClick={() => {
                                      setOpenMenu(null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span>{section.title}</span>
                                  </a>
                                ) : (
                                  <Link
                                    to={section.href}
                                    className="cp-nav-submenu-title"
                                    onClick={() => {
                                      setOpenMenu(null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span>{section.title}</span>
                                  </Link>
                                )
                              ) : (
                                <span className="cp-nav-submenu-title">{section.title}</span>
                              )
                            )}
                            <div className="cp-nav-quick-links">
                              {(section.quickLinks || []).map((item) =>
                                item.href.startsWith('http') ? (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={item.label}
                                    onClick={() => {
                                      setOpenMenu(null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span>{item.label}</span>
                                  </a>
                                ) : (
                                  <Link
                                    to={item.href}
                                    key={item.label}
                                    onClick={() => {
                                      setOpenMenu(null);
                                      setOpen(false);
                                    }}
                                  >
                                    <span>{item.label}</span>
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
                                    setOpenMenu(null);
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
                                    setOpenMenu(null);
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
                    </div>
                  )}
                </div>
              );
            })}

            <button className="cp-nav-search" type="button" aria-label="Search" onClick={() => { setOpenMenu(null); onSearch?.(); }}>
              <img src={asset('search-icon.svg')} alt="" loading="lazy" decoding="async" />
            </button>
          </div>
        </div>

        {open && (
          <div className="cp-nav-drawer" role="menu">
            {NAV_LINKS.map((link) => {
              const submenu = SUBMENUS[link.label];
              const subItems = submenu
                ? submenu.links && submenu.links.length > 0
                  ? submenu.links
                  : submenu.quickLinks || []
                : [];
              const hasSubmenu = subItems.length > 0;
              const isParentActive = isActive(link, pathname, activeSection);
              const isExpanded = !!expandedMobileMenus[link.label];

              return (
                <div className={`cp-nav-drawer-item${hasSubmenu ? ' has-submenu' : ''}`} key={link.label}>
                  <div className="cp-nav-drawer-row">
                    {hasSubmenu ? (
                      <button
                        type="button"
                        className={`cp-nav-drawer-link${isParentActive ? ' active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMobileMenu(link.label);
                        }}
                      >
                        <span>{link.label}</span>
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        className={`cp-nav-drawer-link${isParentActive ? ' active' : ''}`}
                        onClick={() => setOpen(false)}
                      >
                        <span>{link.label}</span>
                      </Link>
                    )}

                    {hasSubmenu && (
                      <button
                        type="button"
                        className={`cp-nav-drawer-chevron${isExpanded ? ' is-expanded' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleMobileMenu(link.label);
                        }}
                        aria-label={`Toggle ${link.label} submenu`}
                        aria-expanded={isExpanded}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {hasSubmenu && isExpanded && (
                    <div className="cp-nav-drawer-submenu">
                      {subItems.map((sub) => {
                        const isExternal = sub.href.startsWith('http');
                        const isSubActive =
                          !isExternal &&
                          (pathname === sub.href ||
                            (sub.href !== '/company' &&
                              sub.href !== '/careers' &&
                              sub.href !== '/business/generics' &&
                              pathname.startsWith(sub.href)));

                        return isExternal ? (
                          <a
                            key={sub.label}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cp-nav-drawer-sublink"
                            onClick={() => setOpen(false)}
                          >
                            <span>{sub.label}</span>
                            <svg className="cp-nav-ext-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        ) : (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className={`cp-nav-drawer-sublink${isSubActive ? ' active' : ''}`}
                            onClick={() => setOpen(false)}
                          >
                            <span>{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </div>
  );
}

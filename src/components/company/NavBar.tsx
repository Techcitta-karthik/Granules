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
    sections: [
      {
        title: 'Global Subsidiaries',
        href: '/company/global-subsidiaries',
        quickLinks: [
          { label: 'LEADERSHIP', href: '/company/leadership' },
          { label: 'GRANULES PHARMACEUTICALS INC. (GPI)', href: 'https://www.granulespharma.com/' },
          { label: 'GRANULES LIFE SCIENCES', href: '/company/granules-life-sciences' },
          { label: 'SENN TIDES', href: '/company/senn-tides' },
          { label: 'GRANULES CZRO', href: '/company/granules-czro' },
        ],
      },
    ],
    links: [],
  },
  Business: {
    sections: [],
    links: [
      { label: 'Generics', href: '/business/generics' },
      { label: 'Peptides CDMO', href: '/business/peptides' },
      { label: 'Research & Development', href: '/business/rd' },
      { label: 'Quality & Compliance', href: '/business/quality-compliance' },
      { label: 'Facilities', href: '/company/facilities' },
    ],
  },
  Careers: {
    sections: [
      {
        quickLinks: [
          { label: 'Life at Granules', href: '/careers' },
          { label: 'Current Openings', href: '/careers/opportunities' },
        ],
      },
    ],
    links: [],
  },
};

function isActive(link: NavLinkItem, pathname: string, activeSection?: string | null) {
  if (pathname === '/' || pathname === '') {
    return !!activeSection && link.label === activeSection;
  }
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

export default function NavBar({
  onSearch,
  activeSectionOverride,
}: {
  onSearch?: () => void;
  activeSectionOverride?: string | null;
} = {}) {
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

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

  useEffect(() => {
    if (pathname === '/' || pathname === '') {
      const el = document.getElementById('sustainability');
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 120) {
          setActiveSection(activeSectionOverride || 'Sustainability');
        }
      }
    }
  }, [activeSectionOverride, pathname]);

  const showMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredMenu(label);
  };

  const hideMenu = () => {
    closeTimer.current = setTimeout(() => setHoveredMenu(null), 200);
  };

  return (
    <div className={`cp-nav-wrap${scrolled ? ' is-scrolled' : ''}`}>
      <nav className={`cp-nav${open ? ' cp-nav--open' : ''}${scrolled ? ' is-scrolled' : ''}`} aria-label="Primary navigation">
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
              const active = isActive(link, pathname, activeSection);
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
                                      setHoveredMenu(null);
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
                                      setHoveredMenu(null);
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
                                      setHoveredMenu(null);
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
                                      setHoveredMenu(null);
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
                    </div>
                  )}
                </div>
              );
            })}

            <button className="cp-nav-search" type="button" aria-label="Search" onClick={onSearch}>
              <img src={asset('search-icon.svg')} alt="" loading="lazy" decoding="async" />
            </button>
          </div>
        </div>

        {open && (
          <div className="cp-nav-drawer">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`cp-nav-drawer-link${isActive(link, pathname, activeSection) ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}

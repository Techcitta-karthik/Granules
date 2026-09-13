import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import {
  BOARD_OF_DIRECTORS,
  MANAGEMENT_TEAM,
  LeadershipMember,
} from '../data/leadershipData';
import '../components/company/company.css';
import './leadership.css';

const L = '/assets/leadership/';

export default function LeadershipPage() {
  const [activeTab, setActiveTab] = useState<'board' | 'management'>('board');
  const [selectedMember, setSelectedMember] = useState<LeadershipMember | null>(null);

  const activeMembers = activeTab === 'board' ? BOARD_OF_DIRECTORS : MANAGEMENT_TEAM;

  // Sync document title, scroll, and URL hash
  useEffect(() => {
    if (selectedMember) {
      document.title = `${selectedMember.name} — Leadership — Granules India`;
      window.history.replaceState(null, '', `#${selectedMember.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.title = 'Leadership Team — Granules India';
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [selectedMember]);

  // Handle hash on initial load & on hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        const allMembers = [...BOARD_OF_DIRECTORS, ...MANAGEMENT_TEAM];
        const match = allMembers.find((m) => m.id === hash);
        if (match) {
          const isManagement = MANAGEMENT_TEAM.some((m) => m.id === hash);
          if (isManagement && !BOARD_OF_DIRECTORS.some((m) => m.id === hash)) {
            setActiveTab('management');
          }
          setSelectedMember(match);
        }
      } else {
        setSelectedMember(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectMember = (member: LeadershipMember) => {
    setSelectedMember(member);
  };

  const handleBack = useCallback(() => {
    setSelectedMember(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    const initials = name
      .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
      <rect width="100%" height="100%" fill="#f1f5f9"/>
      <circle cx="200" cy="190" r="75" fill="#dbeafe"/>
      <path d="M100 390 C100 290, 300 290, 300 390 Z" fill="#dbeafe"/>
      <text x="200" y="205" font-family="sans-serif" font-size="48" font-weight="bold" fill="#0061f8" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>`;
    e.currentTarget.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // ---- PROFILE VIEW ----
  if (selectedMember) {
    const pronoun =
      selectedMember.name.startsWith('Mrs.') || selectedMember.name.startsWith('Ms.')
        ? 'Her'
        : 'His';

    return (
      <div className="cp">
        <NavBar />

        <div className="ld-profile-view">
          {/* Breadcrumb */}
          <p className="cp-breadcrumb ld-profile-breadcrumb">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>HOME</Link>
            <span className="sep">›</span>
            <Link to="/company" style={{ color: 'inherit', textDecoration: 'none' }}>ABOUT US</Link>
            <span className="sep">›</span>
            <button type="button" className="ld-breadcrumb-btn" onClick={handleBack}>LEADERSHIP</button>
            <span className="sep">›</span>
            <span className="current">
              {selectedMember.name.toUpperCase()}
            </span>
          </p>

          {/* Photo Banner with Image on Left & Text Content on Banner */}
          <div className="ld-profile-banner">
            <div className="ld-profile-banner-left">
              <div className={`ld-profile-img-frame ld-profile-img--${selectedMember.id}`}>
                <img
                  src={`${L}${encodeURIComponent(selectedMember.image).replace(/%2F/g, '/')}`}
                  alt={selectedMember.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleImageError(e, selectedMember.name)}
                />
              </div>
            </div>

            <div className="ld-profile-banner-right">
              <h1 className="ld-profile-name">{selectedMember.name}</h1>
              <p className="ld-profile-role">{selectedMember.role.toUpperCase()}</p>
              <div className="ld-profile-divider" />

              <div className="ld-profile-body">
                {selectedMember.profile && selectedMember.profile.length > 0 ? (
                  selectedMember.profile.map((paragraph, idx) => (
                    <p className="ld-profile-paragraph" key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p className="ld-profile-paragraph">
                    {selectedMember.name} serves as {selectedMember.role} at Granules India Limited.
                  </p>
                )}

                {selectedMember.directorships && selectedMember.directorships.length > 0 && (
                  <div className="ld-profile-directorships">
                    <p className="ld-profile-directorships-title">
                      {pronoun} directorships and other full-time positions in bodies corporate are as follows :
                    </p>
                    <ul className="ld-profile-directorships-list">
                      {selectedMember.directorships.map((dir, idx) => (
                        <li key={idx}>
                          <span className="ld-profile-bullet-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="18" height="18" rx="4" fill="#0061F8" />
                              <circle cx="9" cy="9" r="3.5" stroke="white" strokeWidth="1.5" />
                              <circle cx="9" cy="9" r="1.5" fill="white" />
                            </svg>
                          </span>
                          <span className="ld-profile-directorship-text">{dir}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button type="button" className="ld-back-btn" onClick={handleBack}>
                  BACK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="ld-bottom-divider" />

        <div className="ld-cta">
          <img className="cp-bg" src={`${L}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
          <div className="cp-bg-overlay" />
          <div className="ld-cta-copy">
            <h2>Find your next role at Granules</h2>
            <p>Join us in shaping the future of sustainable healthcare.</p>
            <Link className="cp-cta-btn" to="/careers">CAREERS &rarr;</Link>
          </div>
        </div>

        <CompanyFooter />
      </div>
    );
  }

  // ---- GRID VIEW (default) ----
  return (
    <div className="cp">
      <NavBar />

      <div className="ld-main-view">
        <p className="cp-breadcrumb ld-main-breadcrumb">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>HOME</Link>
          <span className="sep">›</span>
          <Link to="/company" style={{ color: 'inherit', textDecoration: 'none' }}>ABOUT US</Link>
          <span className="sep">›</span>
          <span className="current">LEADERSHIP</span>
        </p>

        <div className="ld-hero">
          <h1 className="ld-main-title">Our Leadership Team</h1>
        </div>

        <div className="ld-tabs-container">
          <div className="ld-tabs-bar" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'board'}
              className={`ld-tab-nav-btn ${activeTab === 'board' ? 'active' : ''}`}
              onClick={() => setActiveTab('board')}
            >
              <span>BOARD OF DIRECTORS</span>
              {activeTab === 'board' && <span className="ld-active-bar" />}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'management'}
              className={`ld-tab-nav-btn ${activeTab === 'management' ? 'active' : ''}`}
              onClick={() => setActiveTab('management')}
            >
              <span>MANAGEMENT TEAM</span>
              {activeTab === 'management' && <span className="ld-active-bar" />}
            </button>
          </div>
        </div>

        <div className="ld-grid">
          {activeMembers.map((member) => (
            <article
              className="ld-card"
              key={`${activeTab}-${member.id}`}
              onClick={() => handleSelectMember(member)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectMember(member);
                }
              }}
              aria-label={`View profile for ${member.name}`}
            >
              <div className={`ld-photo ld-photo--${member.id}`}>
                <img
                  src={`${L}${encodeURIComponent(member.image).replace(/%2F/g, '/')}`}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleImageError(e, member.name)}
                />
                <div className="ld-photo-badge">
                  <span>View Profile</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
              <div className="ld-card-info">
                <p className="ld-name">{member.name}</p>
                <p className="ld-role">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="ld-bottom-divider" />

      <div className="ld-cta">
        <img className="cp-bg" src={`${L}cta-bg.webp`} alt="" loading="lazy" decoding="async" />
        <div className="cp-bg-overlay" />
        <div className="ld-cta-copy">
          <h2>Find your next role at Granules</h2>
          <p>Join us in shaping the future of sustainable healthcare.</p>
          <Link className="cp-cta-btn" to="/careers">CAREERS &rarr;</Link>
        </div>
      </div>

      <CompanyFooter />
    </div>
  );
}

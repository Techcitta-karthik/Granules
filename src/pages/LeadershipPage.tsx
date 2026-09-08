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

  // Handle hash on initial load
  useEffect(() => {
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
    }
  }, []);

  const handleSelectMember = (member: LeadershipMember) => {
    setSelectedMember(member);
  };

  const handleBack = useCallback(() => {
    setSelectedMember(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ---- PROFILE VIEW ----
  if (selectedMember) {
    const currentIndex = activeMembers.findIndex((m) => m.id === selectedMember.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex >= 0 && currentIndex < activeMembers.length - 1;

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
            <span className="current" style={{ color: '#0061f8', fontWeight: 700 }}>
              {selectedMember.name.toUpperCase()}
            </span>
          </p>

          {/* Photo */}
          <div className="ld-profile-hero">
            <div className="ld-profile-photo-card">
              <img
                src={`${L}${selectedMember.image}`}
                alt={selectedMember.name}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Name + Role + Bio */}
          <div className="ld-profile-details">
            <h1 className="ld-profile-name">{selectedMember.name}</h1>
            <p className="ld-profile-role">{selectedMember.role}</p>
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
                    {pronoun} directorships and other full-time positions in bodies corporate are as follows:
                  </p>
                  <ul className="ld-profile-directorships-list">
                    {selectedMember.directorships.map((dir, idx) => (
                      <li key={idx}>
                        <span className="ld-profile-bullet">◆</span>
                        <span>{dir}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation between members */}
              <div className="ld-profile-nav-row">
                {hasPrev && (
                  <button
                    type="button"
                    className="ld-profile-nav-btn"
                    onClick={() => setSelectedMember(activeMembers[currentIndex - 1])}
                  >
                    ‹ Previous
                  </button>
                )}
                {hasNext && (
                  <button
                    type="button"
                    className="ld-profile-nav-btn"
                    onClick={() => setSelectedMember(activeMembers[currentIndex + 1])}
                  >
                    Next ›
                  </button>
                )}
              </div>

              <button type="button" className="ld-back-btn" onClick={handleBack}>
                Back
              </button>
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
          </div>
          <a className="ld-cta-btn" href="/careers">CAREERS</a>
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
          <h1 className="ld-main-title">
            <span>Making Granules</span>
            <span>Future-Ready</span>
          </h1>
          <p className="ld-main-desc">
            Granules India is led by a team of seasoned professionals of the pharmaceutical industry. Each leader
            brings in-depth expertise and a modern outlook to tackle the challenges of today's dynamic business.
            Collectively, the Granules leadership chalks out strategies that help in building organisational
            capability while delivering sustainable growth.
          </p>
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
              <div className="ld-photo">
                <img
                  src={`${L}${member.image}`}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
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
        </div>
        <a className="ld-cta-btn" href="/careers">CAREERS</a>
      </div>

      <CompanyFooter />
    </div>
  );
}

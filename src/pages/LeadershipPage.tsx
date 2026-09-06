import { useEffect, useState, useCallback } from 'react';
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

  // Sync document title and URL hash
  useEffect(() => {
    if (selectedMember) {
      document.title = `${selectedMember.name} — Leadership — Granules India`;
      window.history.replaceState(null, '', `#${selectedMember.id}`);
      document.body.style.overflow = 'hidden';
    } else {
      document.title = 'Leadership Team — Granules India';
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
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

  const handleCloseModal = useCallback(() => {
    setSelectedMember(null);
  }, []);

  // Modal Next / Previous Navigation
  const currentIndex = selectedMember
    ? activeMembers.findIndex((m) => m.id === selectedMember.id)
    : -1;

  const handlePrevMember = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedMember(activeMembers[currentIndex - 1]);
    }
  }, [currentIndex, activeMembers]);

  const handleNextMember = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < activeMembers.length - 1) {
      setSelectedMember(activeMembers[currentIndex + 1]);
    }
  }, [currentIndex, activeMembers]);

  // Keyboard navigation (ESC, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowLeft') {
        handlePrevMember();
      } else if (e.key === 'ArrowRight') {
        handleNextMember();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember, handleCloseModal, handlePrevMember, handleNextMember]);

  return (
    <div className="cp">
      <NavBar />

      {/* Main Leadership Overview & Grid View */}
      <div className="ld-main-view">
        <p className="cp-breadcrumb ld-main-breadcrumb">
          <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>HOME</a>
          <span className="sep">›</span>
          <a href="/company" style={{ color: 'inherit', textDecoration: 'none' }}>ABOUT US</a>
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
            brings in-depth expertise and a modern outlook to tackle the challenges of today’s dynamic business.
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
              onClick={() => {
                setActiveTab('board');
                setSelectedMember(null);
              }}
            >
              <span>BOARD OF DIRECTORS</span>
              {activeTab === 'board' && <span className="ld-active-bar" />}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'management'}
              className={`ld-tab-nav-btn ${activeTab === 'management' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('management');
                setSelectedMember(null);
              }}
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

      {/* ==========================================================================
          LEADER PROFILE DETAILS MODAL (Overlay Dialog)
          ========================================================================== */}
      {selectedMember && (
        <div
          className="ld-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ld-modal-title"
        >
          <div className="ld-modal-dialog">
            <header className="ld-modal-header">
              <span className="ld-modal-badge">
                {activeTab === 'board' ? 'Board of Directors' : 'Management Team'}
              </span>

              <div className="ld-modal-actions">
                <button
                  type="button"
                  className="ld-modal-nav-btn"
                  onClick={handlePrevMember}
                  disabled={currentIndex <= 0}
                  aria-label="Previous leader"
                  title="Previous leader (Left Arrow)"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="ld-modal-nav-btn"
                  onClick={handleNextMember}
                  disabled={currentIndex >= activeMembers.length - 1}
                  aria-label="Next leader"
                  title="Next leader (Right Arrow)"
                >
                  ›
                </button>
                <button
                  type="button"
                  className="ld-modal-close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>
            </header>

            <div className="ld-modal-content">
              <div className="ld-modal-hero">
                <div className="ld-modal-avatar">
                  <img
                    src={`${L}${selectedMember.image}`}
                    alt={selectedMember.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="ld-modal-meta">
                  <h2 className="ld-modal-title" id="ld-modal-title">
                    {selectedMember.name}
                  </h2>
                  <p className="ld-modal-role">{selectedMember.role}</p>
                </div>
              </div>

              <div className="ld-modal-body-text">
                {selectedMember.profile && selectedMember.profile.length > 0 ? (
                  selectedMember.profile.map((paragraph, idx) => (
                    <p className="ld-modal-p" key={idx}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="ld-modal-p">
                    {selectedMember.name} serves as {selectedMember.role} at Granules India Limited.
                  </p>
                )}

                {selectedMember.directorships && selectedMember.directorships.length > 0 && (
                  <div className="ld-modal-directorships">
                    <p className="ld-modal-directorships-title">
                      {selectedMember.name.startsWith('Mrs.') || selectedMember.name.startsWith('Ms.')
                        ? 'Her'
                        : 'His'}{' '}
                      directorships and other positions in bodies corporate:
                    </p>
                    <ul className="ld-modal-directorships-list">
                      {selectedMember.directorships.map((dir, idx) => (
                        <li key={idx}>
                          <span>{dir}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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

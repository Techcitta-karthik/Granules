import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SUBSIDIARIES } from './data';

export default function SubsidiariesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIndex = (activeIndex - 1 + SUBSIDIARIES.length) % SUBSIDIARIES.length;
  const nextIndex = (activeIndex + 1) % SUBSIDIARIES.length;

  const current = SUBSIDIARIES[activeIndex];
  const prevItem = SUBSIDIARIES[prevIndex];
  const nextItem = SUBSIDIARIES[nextIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((curr) => (curr - 1 + SUBSIDIARIES.length) % SUBSIDIARIES.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((curr) => (curr + 1) % SUBSIDIARIES.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const getImgUrl = (path: string) => (path.startsWith('/') ? path : `/assets/${path}`);

  return (
    <section className="cp-subsidiaries" id="subsidiaries" aria-label="Global Subsidiaries">
      <h2>Global Subsidiaries</h2>

      <div className="cp-subsidiaries-stage">
        {/* Left preview card */}
        <button
          type="button"
          className="cp-sub-preview-card cp-sub-preview--prev"
          onClick={handlePrev}
          aria-label={`View ${prevItem.shortName}`}
        >
          <span>{prevItem.shortName}</span>
          <svg
            className="cp-sub-arrow-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>

        {/* Center active featured card */}
        <article className="cp-sub-featured-card" key={activeIndex}>
          <div className="cp-sub-featured-info">
            <h3>
              <Link to={current.href}>{current.fullName}</Link>
            </h3>
            <p>{current.description}</p>
          </div>

          <div className="cp-sub-featured-visual">
            <Link to={current.href} className="cp-sub-img-link" tabIndex={-1} aria-hidden="true">
              <img
                src={getImgUrl(current.image)}
                alt={current.fullName}
                className="cp-sub-facility-img"
                loading="lazy"
                decoding="async"
              />
              <div className="cp-sub-logo-badge">
                <img src="/assets/company/nav-logo.webp" alt="Granules" loading="eager" decoding="async" />
              </div>
            </Link>
          </div>
        </article>

        {/* Right preview card */}
        <button
          type="button"
          className="cp-sub-preview-card cp-sub-preview--next"
          onClick={handleNext}
          aria-label={`View ${nextItem.shortName}`}
        >
          <span>{nextItem.shortName}</span>
          <svg
            className="cp-sub-arrow-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>

      {/* Navigation Controls */}
      <div className="cp-sub-nav">
        <button
          type="button"
          aria-label="Previous subsidiary"
          onClick={handlePrev}
          className="cp-sub-nav-btn"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next subsidiary"
          onClick={handleNext}
          className="cp-sub-nav-btn"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

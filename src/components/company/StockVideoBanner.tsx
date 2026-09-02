import React, { useRef } from 'react';

export type StockVideoBannerProps = {
  videoSrc?: string;
  posterSrc?: string;
  alt?: string;
  targetScrollSelector?: string;
  badgeText?: string;
  className?: string;
};

export default function StockVideoBanner({
  videoSrc,
  posterSrc,
  alt = 'Banner',
  targetScrollSelector,
  badgeText = 'Stock Video',
  className = '',
}: StockVideoBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleScrollDown = () => {
    if (targetScrollSelector) {
      const target = document.querySelector(targetScrollSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`cp-hero-banner cp-video-banner ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : posterSrc ? (
        <img
          src={posterSrc}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" decoding="async" />
      ) : null}

      {badgeText && (
        <span
          className="med-hero-badge"
          style={{ position: 'absolute', top: 24, right: 32, zIndex: 2 }}
        >
          {badgeText}
        </span>
      )}

      {targetScrollSelector && (
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll to content"
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0061f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_STORAGE_KEY = 'granules_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent =
        sessionStorage.getItem(COOKIE_STORAGE_KEY) ||
        localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        const timer = setTimeout(() => setVisible(true), 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore storage access restrictions
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, choice);
      sessionStorage.setItem(COOKIE_STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-popup-card" role="region" aria-label="We Use Cookies">
      <div className="cookie-popup-header">
        <div className="cookie-popup-icon-wrap" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21.5 12a9.5 9.5 0 1 1-9.5-9.5c.27 0 .54.01.8.03a1 1 0 0 1 .9.73 2.5 2.5 0 0 0 2.4 1.84h.2a1 1 0 0 1 .98.81 2.5 2.5 0 0 0 2.45 2.09h.1a1 1 0 0 1 .98.8 9.4 9.4 0 0 1 .69 3.2z"
              fill="url(#cookie-radial-grad)"
            />
            <circle cx="8.5" cy="9.5" r="1.25" fill="#ffffff" />
            <circle cx="12" cy="14.5" r="1.4" fill="#ffffff" />
            <circle cx="7.5" cy="15.5" r="1" fill="#ffffff" />
            <circle cx="15.5" cy="11.5" r="1.2" fill="#ffffff" />
            <circle cx="14" cy="17" r="1" fill="#ffffff" />
            <defs>
              <linearGradient id="cookie-radial-grad" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00e676" />
                <stop offset="0.5" stopColor="#00b0ff" />
                <stop offset="1" stopColor="#0061f8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3 className="cookie-popup-title">We Use Cookies</h3>
      </div>

      <p className="cookie-popup-desc">
        We use cookies to improve your experience and analyze site usage. By clicking &quot;Accept&quot;, you agree to our use of cookies. See our{' '}
        <Link to="/cookie-policy" className="cookie-popup-link">Cookie Policy</Link> to learn more.
      </p>

      <div className="cookie-popup-actions">
        <button
          type="button"
          className="cookie-popup-btn cookie-popup-accept"
          onClick={() => handleConsent('accepted')}
        >
          ACCEPT
        </button>
        <button
          type="button"
          className="cookie-popup-btn cookie-popup-reject"
          onClick={() => handleConsent('rejected')}
        >
          REJECT
        </button>
      </div>
    </div>
  );
}

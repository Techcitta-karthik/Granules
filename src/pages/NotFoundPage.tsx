import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, CompanyFooter } from '../components/company';
import '../components/company/company.css';
import './NotFoundPage.css';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Page Not Found — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp err-page">
      <NavBar />

      <main className="err-main">
        <div className="err-visual">
          <img
            src="/assets/404-pill.png"
            alt="404 Page Not Found"
            loading="eager"
            decoding="async"
          />
        </div>

        <h1 className="err-title">Page Not Found</h1>

        <p className="err-desc">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <Link to="/" className="err-btn">
          GO TO HOMEPAGE
        </Link>
      </main>

      <CompanyFooter />
    </div>
  );
}

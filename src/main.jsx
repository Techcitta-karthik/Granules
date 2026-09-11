import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import './styles.css';
import './typography.css';

import HomePage from './pages/HomePage.jsx';
import CompanyPage from './pages/CompanyPage.tsx';
import GlobalSubsidiariesPage from './pages/GlobalSubsidiariesPage.tsx';
import MilestonePage from './pages/MilestonePage.tsx';
import AwardsPage from './pages/AwardsPage.tsx';
import LeadershipPage from './pages/LeadershipPage.tsx';
import GranulesCzroPage from './pages/GranulesCzroPage.tsx';
import AscelisPeptidesPage from './pages/AscelisPeptidesPage.tsx';
import SennTidesPage from './pages/SennTidesPage.tsx';
import GranulesLifeSciencesPage from './pages/GranulesLifeSciencesPage.tsx';
import OperationalExcellencePage from './pages/OperationalExcellencePage.tsx';
import GenericsPage from './pages/GenericsPage.tsx';
import ApiPage from './pages/ApiPage.tsx';
import PfiPage from './pages/PfiPage.tsx';
import FdPage from './pages/FdPage.tsx';
import RdPage from './pages/RdPage.tsx';
import QualityCompliancePage from './pages/QualityCompliancePage.tsx';
import FacilitiesPage from './pages/FacilitiesPage.tsx';
import PeptidesPage from './pages/PeptidesPage.tsx';
import SustainabilityOverviewPage from './pages/SustainabilityOverviewPage.tsx';
import SustainabilityStrategyPage from './pages/SustainabilityStrategyPage.tsx';
import EsgInActionPage from './pages/EsgInActionPage.tsx';
import EsgProfilePage from './pages/EsgProfilePage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import InvestorOverviewPage from './pages/InvestorOverviewPage.tsx';
import InvestorAnnualReportsPage from './pages/InvestorAnnualReportsPage.tsx';
import MediaPage from './pages/MediaPage.tsx';
import CareerOverviewPage from './pages/CareerOverviewPage.tsx';
import LifeAtGranulesPage from './pages/LifeAtGranulesPage.tsx';
import CareerOpportunitiesPage from './pages/CareerOpportunitiesPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';
import CookiePolicyPage from './pages/CookiePolicyPage.tsx';
import DisclaimerPage from './pages/DisclaimerPage.tsx';
import DataProtectionNoticePage from './pages/DataProtectionNoticePage.tsx';
import TermsConditionsPage from './pages/TermsConditionsPage.tsx';
import ProductPortfolioPage from './pages/ProductPortfolioPage.tsx';
import BackToTopButton from './components/common/BackToTopButton';

function App() {
  return (
    <BrowserRouter>
      <BackToTopButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/company/global-subsidiaries" element={<GlobalSubsidiariesPage />} />
        <Route path="/company/subsidiaries" element={<GlobalSubsidiariesPage />} />
        <Route path="/global-subsidiaries" element={<GlobalSubsidiariesPage />} />
        <Route path="/company/milestone" element={<MilestonePage />} />
        <Route path="/company/awards" element={<AwardsPage />} />
        <Route path="/company/leadership" element={<LeadershipPage />} />
        <Route path="/company/granules-czro" element={<GranulesCzroPage />} />
        <Route path="/company/senn-tides" element={<SennTidesPage />} />
        <Route path="/senn-tides" element={<SennTidesPage />} />
        <Route path="/company/ascelis-peptides" element={<AscelisPeptidesPage />} />
        <Route path="/company/granules-life-sciences" element={<GranulesLifeSciencesPage />} />
        <Route path="/granules-life-sciences" element={<GranulesLifeSciencesPage />} />
        <Route path="/gls" element={<GranulesLifeSciencesPage />} />
        <Route path="/company/operational-excellence" element={<OperationalExcellencePage />} />
        <Route path="/business" element={<GenericsPage />} />
        <Route path="/business/generics" element={<GenericsPage />} />
        <Route path="/generics" element={<GenericsPage />} />
        <Route path="/business/api" element={<ApiPage />} />
        <Route path="/business/pfi" element={<PfiPage />} />
        <Route path="/business/fd" element={<FdPage />} />
        <Route path="/business/product-portfolio" element={<ProductPortfolioPage />} />
        <Route path="/business/products" element={<ProductPortfolioPage />} />
        <Route path="/business/rd" element={<RdPage />} />
        <Route path="/business/quality-compliance" element={<QualityCompliancePage />} />
        <Route path="/business/facilities" element={<FacilitiesPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/company/facilities" element={<Navigate to="/business/facilities" replace />} />
        <Route path="/business/peptides" element={<PeptidesPage />} />
        <Route path="/sustainability" element={<SustainabilityOverviewPage />} />
        <Route path="/sustainability/strategy" element={<SustainabilityStrategyPage />} />
        <Route path="/sustainability/esg-in-action" element={<EsgInActionPage />} />
        <Route path="/sustainability/esg-profile" element={<EsgProfilePage />} />
        <Route path="/esg-profile" element={<EsgProfilePage />} />
        <Route path="/sustainability/esg-world" element={<EsgProfilePage />} />
        <Route path="/esg-world" element={<EsgProfilePage />} />
        <Route path="/sustainability/esg-in-action/community" element={<CommunityPage />} />
        <Route path="/sustainability/corporate-social-responsibility" element={<CommunityPage />} />
        <Route path="/sustainability/csr" element={<CommunityPage />} />
        <Route path="/sustainability/community" element={<CommunityPage />} />
        <Route path="/corporate-social-responsibility" element={<CommunityPage />} />
        <Route path="/csr" element={<CommunityPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/investor" element={<InvestorOverviewPage />} />
        <Route path="/investors" element={<InvestorOverviewPage />} />
        <Route path="/investor/v2" element={<InvestorOverviewPage />} />
        <Route path="/investor/annual-reports" element={<InvestorAnnualReportsPage />} />
        <Route path="/investors/*" element={<InvestorOverviewPage />} />
        <Route path="/investor/*" element={<InvestorOverviewPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/careers" element={<CareerOverviewPage />} />
        <Route path="/careers/life-at-granules" element={<LifeAtGranulesPage />} />
        <Route path="/careers/opportunities" element={<CareerOpportunitiesPage />} />
        <Route path="/careers/current-openings" element={<CareerOpportunitiesPage />} />
        <Route path="/careers/openings" element={<CareerOpportunitiesPage />} />
        <Route path="/careers/career-opportunities" element={<CareerOpportunitiesPage />} />
        <Route path="/career-opportunities" element={<CareerOpportunitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/cookies-policy" element={<CookiePolicyPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/data-protection-notice" element={<DataProtectionNoticePage />} />
        <Route path="/data-protection" element={<DataProtectionNoticePage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/terms-condition" element={<TermsConditionsPage />} />
        <Route path="/terms" element={<TermsConditionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Granules App Runtime Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: "'Manrope', sans-serif",
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          color: '#0f172a'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#0061f8' }}>
            Something went wrong
          </h1>
          <p style={{ maxWidth: '500px', marginBottom: '1.5rem', color: '#64748b' }}>
            An unexpected error occurred while loading this page. Please try refreshing or return to the homepage.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                backgroundColor: '#0061f8',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
            <button
              type="button"
              onClick={() => { window.location.href = '/'; }}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                backgroundColor: '#e2e8f0',
                color: '#1e293b',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

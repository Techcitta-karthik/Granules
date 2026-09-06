import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import './styles.css';

function ScrollHighlightManager() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const selectors = [
        '.biz-intro',
        '.gls-intro',
        '.czro-intro',
        '.asc-intro',
        '.senn-intro',
        '.sus-intro',
        '.rd-intro',
        '.qc-intro',
        '.oe-intro',
        '.ms-intro',
        '.ld-hero',
        '.aw-hero',
        '.car-intro-copy',
        '.fac-intro',
        '.cp-about-desc',
        '.scroll-intro',
        '.global-sub-intro',
      ];
      const elements = document.querySelectorAll(selectors.join(', '));
      const threshold = window.innerHeight * 0.45;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < threshold) {
          el.classList.add('is-scrolled');
        } else {
          el.classList.remove('is-scrolled');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return null;
}

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

function App() {
  return (
    <BrowserRouter>
      <ScrollHighlightManager />
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
        <Route path="/business/rd" element={<RdPage />} />
        <Route path="/business/quality-compliance" element={<QualityCompliancePage />} />
        <Route path="/company/facilities" element={<FacilitiesPage />} />
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
        <Route path="/investor/v2" element={<InvestorOverviewPage />} />
        <Route path="/investor/annual-reports" element={<InvestorAnnualReportsPage />} />
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

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

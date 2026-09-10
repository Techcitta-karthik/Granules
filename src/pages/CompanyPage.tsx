import { useEffect } from 'react';
import '../components/company/company.css';
import {
  NavBar,
  HeroSection,
  AboutSection,
  PurposeVisionSection,
  ValuesSection,
  LeadershipSection,
  SubsidiariesCarousel,
  CareerSection,
  CompanyFooter,
} from '../components/company';

export default function CompanyPage() {
  useEffect(() => {
    document.title = 'Company > About us — Granules India';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cp">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <h2 className="cp-drives-us">What Drives Us</h2>
      <PurposeVisionSection />
      <ValuesSection />
      <LeadershipSection />
      <SubsidiariesCarousel />
      <CareerSection />
      <CompanyFooter />
    </div>
  );
}
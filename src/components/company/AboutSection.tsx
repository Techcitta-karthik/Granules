import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // When the top of the about text reaches the upper-middle region of the viewport (45%),
      // shift the highlight from the first section to the second section
      const triggerPoint = viewportHeight * 0.45;
      setIsScrolled(rect.top < triggerPoint);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={`cp-about-desc ${isScrolled ? 'is-scrolled' : ''}`}
      >
        <p>
          <span className="part-1">
            With over four decades of rich legacy, Granules India Limited is committed to
            delivering safe, effective and affordable medicines that meet the expectations of
            partners and patients across the globe, through a robust and large-scale
            manufacturing platform.
          </span>{' '}
          <span className="part-2">
            Headquartered in Hyderabad, Granules develops, manufactures, and commercializes
            Active Pharmaceutical Ingredients (APIs), Pharmaceutical Formulation Intermediates
            (PFIs), Finished Dosage Forms (FDFs), and Peptide CDMO products for global markets.
          </span>
        </p>
        <p className="part-2">
          Our vertically integrated manufacturing model covers everything from key starting
          materials to finished formulations, enabling speed to market, underpinned by rigorous
          compliance at every stage. With sustained investments in formulation technologies,
          digitalization, and sustainable manufacturing, we are expanding access to healthcare
          innovation while reducing our environmental impact.
        </p>
      </div>
      <div className="cp-divider" />
    </>
  );
}

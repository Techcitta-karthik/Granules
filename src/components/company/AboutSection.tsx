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
            For over four decades, Granules India Limited has been delivering affordable medicines
            through a robust and vertically integrated manufacturing platform. Headquartered in
            Hyderabad, Granules develops and manufactures Active Pharmaceutical Ingredients (APIs),
            Pharmaceutical
          </span>{' '}
          <span className="part-2">
            Formulation Intermediates (PFIs), and Finished Dosage Forms (FDFs) for patients across
            North America, Europe, India, Latin America, and other key global markets.
          </span>
        </p>
        <p className="part-2">
          Our backward integration process covers everything from key starting materials to
          finished formulations. With sustained investments in formulation technologies,
          biocatalysis, and continuous manufacturing, we are expanding access to essential
          medicines while reducing our environmental impact.
        </p>
      </div>
      <div className="cp-divider" />
      <h2 className="cp-drives-us">What drives us</h2>
    </>
  );
}

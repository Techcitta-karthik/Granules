import React, { useState, useRef, useCallback } from 'react';

export interface SustainabilityGoalItem {
  id: string;
  title: string;
  category: string;
  yearHeading: string;
  yearTag: string;
  metric: string;
  label: string;
  subdetails?: string[];
  image: string;
  imageAlt: string;
}

export const SUSTAINABILITY_GOALS: SustainabilityGoalItem[] = [
  {
    id: 'emissions',
    title: 'Emissions',
    category: 'Emissions',
    yearHeading: 'By 2030',
    yearTag: '2030',
    metric: '42%',
    label: 'Reduce Scope 1 and Scope 2 absolute emissions by 42% by FY30 from FY23 baseline. Reduce Scope 3 absolute emissions by 42% by FY30 from FY23 baseline. Achieve Net Zero by 2050.',
    subdetails: [
      'Achieve Net Zero by 2050',
      'Reduce Scope 1 and Scope 2 absolute emissions by 42% by FY30 from FY23 baseline',
      'Reduce Scope 3 absolute emissions by 42% by FY30 from FY23 baseline',
    ],
    image: '/assets/strategy/hero-video-poster.webp',
    imageAlt: 'Wind turbine clean renewable energy field',
  },
  {
    id: 'responsible-sourcing',
    title: 'Responsible Sourcing',
    category: 'Responsible Sourcing',
    yearHeading: 'By FY27',
    yearTag: 'FY27',
    metric: 'FY27',
    label: 'Implement a supplier sustainability framework and encourage suppliers to adopt science-based targets by FY27',
    image: '/assets/sustainability/sus/2.png',
    imageAlt: 'Sustainable supply chain and responsible sourcing',
  },
  {
    id: 'dei',
    title: 'DEI',
    category: 'DEI',
    yearHeading: 'By 2030',
    yearTag: '2030',
    metric: '100%',
    label: 'Achieve a 100% increase in women’s employment by 2030 compared to FY24',
    image: '/assets/sustainability/sus/dei.jpg?v=2',
    imageAlt: 'Women’s health awareness session at Granules',
  },
  {
    id: 'community',
    title: 'Community',
    category: 'Community',
    yearHeading: 'By 2030',
    yearTag: '2030',
    metric: '1M+',
    label: 'Touch 1 Million+ lives through CSR programs by 2030',
    image: '/assets/sustainability/sus/community.jpg',
    imageAlt: 'Community healthcare and rural development programs',
  },
  {
    id: 'safety',
    title: 'Safety',
    category: 'Safety',
    yearHeading: 'Safety Target',
    yearTag: 'Zero',
    metric: 'Zero',
    label: 'Targeting to zero workplace fatality',
    image: '/assets/company/empowering-employees.png',
    imageAlt: 'Safety and discipline across all manufacturing facilities',
  },
  {
    id: 'water',
    title: 'Water',
    category: 'Water',
    yearHeading: 'By 2032',
    yearTag: '2032',
    metric: 'Water Positive',
    label: 'Achieve Water Positivity by 2032',
    image: '/assets/sustainability/sus/water.jpg',
    imageAlt: 'Zero liquid discharge process water conservation',
  },
  {
    id: 'waste',
    title: 'Waste',
    category: 'Waste',
    yearHeading: 'By 2030',
    yearTag: '2030',
    metric: 'Zero',
    label: 'Achieve Zero waste to landfill by 2030',
    image: '/assets/sustainability/sus/waste.jpg',
    imageAlt: 'Zero waste to landfill and circular resource recovery',
  },
  {
    id: 'energy',
    title: 'Energy',
    category: 'Energy',
    yearHeading: 'By 2030',
    yearTag: '2030',
    metric: '100%',
    label: 'Sourcing 100% renewable electricity by 2030',
    image: '/assets/sustainability/sus/energy.jpg',
    imageAlt: 'Solar and clean renewable power across plants',
  },
];

export default function SustainabilityGoalsSection() {
  const [activeIndex, setActiveIndex] = useState(0); // Default to index 0 (Emissions)
  const total = SUSTAINABILITY_GOALS.length;
  const touchStartX = useRef<number | null>(null);

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const activeItem = SUSTAINABILITY_GOALS[activeIndex];
  const prevItem = SUSTAINABILITY_GOALS[prevIndex];
  const nextItem = SUSTAINABILITY_GOALS[nextIndex];

  return (
    <section
      className="sus-goals-section-v2"
      id="sustainability-goals"
      aria-label="Our Sustainability Goals"
    >
      <div className="sus-goals-v2-container">
        <h2 className="sus-goals-v2-title">Our Sustainability Goals</h2>

        <div
          className="sus-goals-stage"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Left Peek Card */}
          <div
            className="sus-goals-peek-card sus-goals-peek-card--left"
            onClick={handlePrev}
            role="button"
            tabIndex={0}
            aria-label={`Go to goal ${prevItem.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handlePrev();
            }}
          >
            <div className="sus-goals-peek-inner">
              <span className="sus-goals-peek-title">{prevItem.title}</span>
            </div>
          </div>

          {/* Active Center Card */}
          <div className="sus-goals-active-card">
            <div className="sus-goals-card-content">
              <div className="sus-goals-card-top-row">
                <span className="sus-goals-title-heading">{activeItem.title}</span>
              </div>

              <div className="sus-goals-statement-wrap">
                {activeItem.subdetails && activeItem.subdetails.length > 0 ? (
                  <div className="sus-goals-subdetails">
                    {activeItem.subdetails.map((sub, i) => (
                      <p key={i} className="sus-goals-card-desc sus-goals-card-desc--statement">
                        • {sub}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="sus-goals-card-desc sus-goals-card-desc--statement">
                    {activeItem.label}
                  </p>
                )}
              </div>

              {/* Progress Dashes */}
              <div className="sus-goals-segments" role="tablist" aria-label="Goals navigation">
                {SUSTAINABILITY_GOALS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Goal: ${item.title}`}
                    title={item.title}
                    className={`sus-goals-segment-dash ${idx === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
            </div>

            <div className="sus-goals-card-img-wrap">
              <img
                src={activeItem.image}
                alt={activeItem.imageAlt}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Peek Card */}
          <div
            className="sus-goals-peek-card sus-goals-peek-card--right"
            onClick={handleNext}
            role="button"
            tabIndex={0}
            aria-label={`Go to goal ${nextItem.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleNext();
            }}
          >
            <div className="sus-goals-peek-inner">
              <span className="sus-goals-peek-title">{nextItem.title}</span>
            </div>
          </div>
        </div>

        {/* Bottom Circular Arrow Controls */}
        <div className="sus-goals-controls-row">
          <button
            type="button"
            className="sus-goals-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous sustainability goal"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
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
            className="sus-goals-arrow-btn"
            onClick={handleNext}
            aria-label="Next sustainability goal"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
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
      </div>
    </section>
  );
}


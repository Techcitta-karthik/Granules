import { useState } from 'react';
import { useSwipeScroll } from '../../hooks/useSwipeScroll';

export interface GoalCard {
  title: string;
  image: string;
  desc: string;
}

const GOALS_ITEMS: GoalCard[] = [
  {
    title: 'Emissions',
    image: '/assets/sustainability/sus/1.jpg',
    desc: 'Achieve Net Zero by 2050. Reduce Scope 1 and Scope 2 absolute emissions by 42% by FY30 from FY23 baseline. Reduce Scope 3 absolute emissions by 42% by FY30 from FY23 baseline.',
  },
  {
    title: 'Responsible Sourcing',
    image: '/assets/sustainability/sus/2.png',
    desc: 'Implement a comprehensive supplier sustainability framework and encourage suppliers to adopt science-based targets by FY27.',
  },
  {
    title: 'DEI',
    image: '/assets/sustainability/sus/3.png',
    desc: 'Achieve a 100% increase in women’s employment across operational and leadership levels by 2030 compared to FY24.',
  },
  {
    title: 'Community',
    image: '/assets/sustainability/sus/4.jpg',
    desc: 'Touch 1 Million+ lives through targeted CSR programs in healthcare, education, skill development, and rural ecosystems by 2030.',
  },
  {
    title: 'Safety',
    image: '/assets/sustainability/sus/5.png',
    desc: 'Targeting zero workplace fatality and maintaining world-class occupational health and process safety standards across all facilities.',
  },
  {
    title: 'Water',
    image: '/assets/esg/esg-water.webp',
    desc: 'Achieve Water Positivity by 2032 through zero liquid discharge (ZLD), rainwater harvesting, and closed-loop process wastewater recycling.',
  },
  {
    title: 'Waste',
    image: '/assets/esg/esg-waste.webp',
    desc: 'Achieve Zero waste to landfill by 2030 through circular resource recovery, scrap recycling, co-processing, and material recovery.',
  },
  {
    title: 'Energy',
    image: '/assets/czro/card-carbon-free.webp',
    desc: 'Sourcing 100% renewable electricity by 2030 across all manufacturing facilities and transitioning thermal demand to green fuels.',
  },
];

export default function SustainabilityGoalsSection() {
  const [openCard, setOpenCard] = useState<number>(-1);
  const {
    isDragging,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
    swipeProps,
  } = useSwipeScroll();

  return (
    <section className="sus-goals-sec-img1" id="sustainability-goals" aria-label="Sustainability Goals And Targets">
      <h2 className="sus-goals-title-img1">Sustainability Goals And Targets</h2>

      <div className="biz-carousel sus-goals-carousel">
        <div className={`biz-track${isDragging ? ' is-dragging' : ''}`} {...swipeProps}>
          {GOALS_ITEMS.map((card, idx) => {
            const isOpen = openCard === idx;
            return (
              <article
                className={`biz-card sus-goal-card${isOpen ? ' is-open' : ''}`}
                key={card.title}
                onMouseEnter={() => setOpenCard(idx)}
                onMouseLeave={() => setOpenCard(-1)}
                onClick={() => {
                  if (isDragging) return;
                  setOpenCard(isOpen ? -1 : idx);
                }}
              >
                <img className="bg" src={card.image} alt={card.title} loading="lazy" decoding="async" />
                <div className="biz-sheet">
                  <div className="biz-sheet-head">
                    <span className="biz-sheet-title">{card.title}</span>
                    <span className="biz-sheet-symbol" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  <div className="biz-sheet-body">
                    <p className="biz-sheet-desc">{card.desc}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dynamic progress bar and smooth arrow navigation */}
        <div className="biz-carousel-controls">
          <div className="biz-progress-track">
            <div
              className="biz-progress-bar"
              style={{
                width: `${thumbWidth}%`,
                left: `${scrollProgress * (100 - thumbWidth)}%`,
              }}
            />
          </div>
          <div className="biz-carousel-arrows">
            <button
              type="button"
              className="biz-arrow-btn"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              type="button"
              className="biz-arrow-btn"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

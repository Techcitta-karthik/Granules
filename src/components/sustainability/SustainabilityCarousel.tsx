import { useState, useEffect, useRef } from 'react';

export interface CarouselItem {
  img: string;
  alt: string;
}

export interface SustainabilityCarouselProps {
  id?: string;
  title: string;
  items: CarouselItem[];
  visibleDesktop?: number;
  visibleTablet?: number;
  visibleMobile?: number;
  autoPlayInterval?: number;
}

export default function SustainabilityCarousel({
  id,
  title,
  items,
  visibleDesktop = 4,
  visibleTablet = 3,
  visibleMobile = 2,
  autoPlayInterval = 5000,
}: SustainabilityCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(visibleDesktop);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const total = items.length;

  useEffect(() => {
    const updateCount = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisibleCount(visibleDesktop);
      else if (w >= 680) setVisibleCount(visibleTablet);
      else setVisibleCount(visibleMobile);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, [visibleDesktop, visibleTablet, visibleMobile]);

  // Extended items array: 3 sets to allow continuous wrapping
  const extendedItems = [...items, ...items, ...items];
  // Start in the middle block of items
  const [trackIndex, setTrackIndex] = useState(total);

  // Auto-scroll every 5 seconds (5000ms)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTrackIndex((prev) => prev + 1);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isHovered, autoPlayInterval]);

  const handleTransitionEnd = () => {
    if (trackIndex >= total * 2) {
      setIsTransitioning(false);
      setTrackIndex(trackIndex - total);
    } else if (trackIndex < total) {
      setIsTransitioning(false);
      setTrackIndex(trackIndex + total);
    }
  };

  const next = () => {
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIsTransitioning(true);
    setTrackIndex((prev) => prev - 1);
  };

  const activeDot = ((trackIndex % total) + total) % total;

  const goToSlide = (dotIdx: number) => {
    setIsTransitioning(true);
    const diff = dotIdx - activeDot;
    setTrackIndex((prev) => prev + diff);
  };

  const slideWidth = 100 / visibleCount;

  return (
    <div
      id={id}
      className="sus-carousel-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sus-hatched-heading">
        <div className="sus-hatched-line" />
        <h2 className="sus-hatched-title">{title}</h2>
        <div className="sus-hatched-line" />
      </div>

      <div className="sus-carousel-outer">
        <button
          type="button"
          className="sus-carousel-arrow sus-carousel-arrow--prev"
          onClick={prev}
          aria-label={`Previous ${title}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="sus-carousel-viewport">
          <div
            className="sus-carousel-track"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${trackIndex * (100 / extendedItems.length)}%)`,
              width: `${(extendedItems.length / visibleCount) * 100}%`,
              transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            }}
          >
            {extendedItems.map((item, idx) => (
              <div
                key={idx}
                className="sus-carousel-slide"
                style={{ width: `${100 / extendedItems.length}%` }}
              >
                <div className="sus-carousel-card">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="sus-carousel-img"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="sus-carousel-arrow sus-carousel-arrow--next"
          onClick={next}
          aria-label={`Next ${title}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="sus-carousel-dots" role="tablist">
        {items.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            className={`sus-carousel-dot ${dotIdx === activeDot ? 'active' : ''}`}
            onClick={() => goToSlide(dotIdx)}
            aria-label={`Go to ${title} slide ${dotIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

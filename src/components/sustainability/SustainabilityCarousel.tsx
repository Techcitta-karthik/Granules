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
  reverse?: boolean;
}

export default function SustainabilityCarousel({
  id,
  title,
  items,
  reverse = false,
}: SustainabilityCarouselProps) {
  // Ensure sufficient items for a continuous, seamless marquee on all display sizes (including 4K)
  const repeatCount = Math.max(2, Math.ceil(16 / Math.max(items.length, 1)));
  const fullGroup = Array.from({ length: repeatCount }, () => items).flat();

  return (
    <section
      id={id}
      className="sus-carousel-section sus-marquee-section"
      aria-label={title}
    >
      <h2 className="sus-carousel-title">{title}</h2>
      <div
        className={`cert-row sus-cert-row${reverse ? ' sus-cert-row--reverse' : ''}`}
        aria-label={`${title} logos`}
      >
        <div className="cert-track">
          <div className="cert-group">
            {fullGroup.map((item, index) => (
              <img
                src={item.img}
                alt={item.alt}
                title={item.alt}
                key={`primary-${index}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <div className="cert-group" aria-hidden="true">
            {fullGroup.map((item, index) => (
              <img
                src={item.img}
                alt=""
                title={item.alt}
                key={`clone-${index}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

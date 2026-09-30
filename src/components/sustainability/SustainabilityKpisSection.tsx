import React, { useEffect, useRef, useState } from 'react';

export interface KpiCardItem {
  id: string;
  icon: string;
  value: string;
  title: string;
  description: string;
}

export const SUSTAINABILITY_KPIS: KpiCardItem[] = [
  {
    id: 'people-driving-purpose',
    icon: 'users',
    value: '6,523+',
    title: 'People Driving Our Purpose Forward',
    description: 'A talented and passionate global workforce',
  },
  {
    id: 'women-workforce',
    icon: 'female',
    value: '14.1%',
    title: 'Women Powering Our Workforce',
    description: 'Building a more diverse and inclusive future',
  },
  {
    id: 'growth-women-employees',
    icon: 'growth',
    value: '21.5%',
    title: 'Growth in Women Employees',
    description: 'Year-on-year increase, creating more opportunities',
  },
  {
    id: 'return-to-work',
    icon: 'return-work',
    value: '100%',
    title: 'Supporting a Successful Return to Work',
    description: 'Enabling our people through every life stage',
  },
  {
    id: 'pharma-patashala',
    icon: 'pharma-patashala',
    value: '1,600+',
    title: 'Students Empowered Through Pharma Patashala',
    description: 'Nurturing the next generation of talent',
  },
  {
    id: 'zero-discrimination',
    icon: 'shield',
    value: 'Zero Cases',
    title: 'Building a Workplace Free from Discrimination',
    description: 'A respectful, inclusive and equitable workplace for all',
  },
  {
    id: 'women-board-leadership',
    icon: 'board',
    value: '27%',
    title: 'Women Strengthening Board Leadership',
    description: 'Greater representation for a more inclusive tomorrow',
  },
  {
    id: 'lower-ghg-emissions',
    icon: 'emissions',
    value: '45.7%',
    title: 'Lower Greenhouse Gas Emissions',
    description: 'Scope 1 & 2 reduction vs. baseline',
  },
  {
    id: 'powered-renewable-electricity',
    icon: 'renewable',
    value: '98%',
    title: 'Powered by Renewable Electricity',
    description: 'Including PPAs, rooftop solar and I-RECs',
  },
  {
    id: 'water-recycled-reused',
    icon: 'water',
    value: '~39%',
    title: 'Water Recycled and Reused',
    description: 'Conserving water for a more resilient tomorrow',
  },
  {
    id: 'waste-diverted-landfill',
    icon: 'waste',
    value: '93%',
    title: 'Waste Diverted from Landfill',
    description: 'Advancing circular management for zero waste to landfill',
  },
  {
    id: 'suppliers-climate-action',
    icon: 'suppliers',
    value: '82%',
    title: 'Key Suppliers Engaged on Climate Action',
    description: 'Building a more responsible and resilient value chain',
  },
];

function KpiIcon({ name }: { name: string }) {
  switch (name) {
    case 'users':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'female':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M12 13v9" />
          <path d="M8 18h8" />
        </svg>
      );
    case 'growth':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M7 16v-4" />
          <path d="M12 16V9" />
          <path d="M17 16V5" />
          <polyline points="7 11 12 7 17 4 21 4 21 8" />
        </svg>
      );
    case 'return-work':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M17 9a4 4 0 1 1-1.2 5.5" />
          <polyline points="13 9 17 9 17 5" />
        </svg>
      );
    case 'pharma-pathshala':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case 'board':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
          <circle cx="19" cy="11" r="2" />
        </svg>
      );
    case 'emissions':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case 'renewable':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'water':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case 'waste':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
          <path d="M11 19h8.2a1.8 1.8 0 0 0 1.56-.88 1.8 1.8 0 0 0 0-1.78L18.8 13" />
          <path d="M20.7 7.2 16.5 2.5a1.8 1.8 0 0 0-2.4 0L9.9 7.2" />
          <polyline points="4 15 7 19 11 19" />
          <polyline points="20 11 18.8 13 15 13" />
          <polyline points="8 4 9.9 7.2 13 7.2" />
        </svg>
      );
    case 'suppliers':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L13 12" />
          <path d="m13 12 1.7-1.7a1 1 0 0 0 0-1.4L13 7.2a1 1 0 0 0-1.4 0L10.3 8.5" />
          <path d="m14 7.2-2.3-2.3a1 1 0 0 0-1.4 0L7.5 7.7a1 1 0 0 0 0 1.4l1.3 1.3" />
          <path d="M2 13l6 6" />
          <path d="M18 5l4 4" />
          <path d="m3 7 4-4" />
          <path d="m17 21 4-4" />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

function parseKpiValue(raw: string) {
  if (raw === 'Zero') {
    return { prefix: 'Zero', target: 0, suffix: '', decimals: 0, hasComma: false, isStatic: true };
  }
  const prefixMatch = raw.match(/^[^\d.]*/);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  const suffixMatch = raw.match(/[^\d.]*$/);
  const suffix = suffixMatch ? suffixMatch[0] : '';
  const cleanNumberStr = raw.slice(prefix.length, raw.length - suffix.length).replace(/,/g, '');
  const target = parseFloat(cleanNumberStr);
  const decimals = cleanNumberStr.includes('.') ? cleanNumberStr.split('.')[1].length : 0;
  const hasComma = raw.includes(',');

  return {
    prefix,
    target: isNaN(target) ? 0 : target,
    suffix,
    decimals,
    hasComma,
    isStatic: false,
  };
}

function formatValue(num: number, decimals: number, hasComma: boolean): string {
  if (decimals > 0) {
    const fixed = num.toFixed(decimals);
    if (hasComma) {
      const [intPart, decPart] = fixed.split('.');
      return `${parseInt(intPart, 10).toLocaleString('en-US')}.${decPart}`;
    }
    return fixed;
  }
  const rounded = Math.round(num);
  return hasComma ? rounded.toLocaleString('en-US') : `${rounded}`;
}

function AnimatedKpiValue({ raw, delay = 0, duration = 1200 }: { raw: string; delay?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, target, suffix, decimals, hasComma, isStatic } = parseKpiValue(raw);
  const [displayValue, setDisplayValue] = useState<string>(() =>
    isStatic ? raw : `${prefix}${formatValue(0, decimals, hasComma)}${suffix}`
  );
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (isStatic) return;

    const node = ref.current;
    if (!node) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(raw);
      return;
    }

    let frameId: number;
    let timerId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        timerId = setTimeout(() => {
          const startTime = performance.now();

          const tick = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;

            setDisplayValue(`${prefix}${formatValue(current, decimals, hasComma)}${suffix}`);

            if (progress < 1) {
              frameId = requestAnimationFrame(tick);
            } else {
              setDisplayValue(raw);
            }
          };

          frameId = requestAnimationFrame(tick);
        }, delay);

        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timerId) clearTimeout(timerId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [raw, target, prefix, suffix, decimals, hasComma, duration, delay, isStatic]);

  return <span ref={ref} className="sus-kpi-card-val">{displayValue}</span>;
}

export default function SustainabilityKpisSection() {
  return (
    <section className="sus-kpi-sec-img2" id="kpis" aria-label="Progressing With Purpose">
      <span className="tag">Key Performance Indicators</span>
      <h2 className="sus-kpi-title-img2">Progressing With Purpose</h2>

      {/* Unified 3-column KPI Cards Grid */}
      <div className="sus-kpi-cards-grid">
        {SUSTAINABILITY_KPIS.map((item, idx) => (
          <div className="sus-kpi-card" key={item.id}>
            {/* Equal colour circular icon badge */}
            <div className="sus-kpi-card-icon-badge" aria-hidden="true">
              <KpiIcon name={item.icon} />
            </div>
            <div className="sus-kpi-card-content">
              <AnimatedKpiValue raw={item.value} delay={(idx % 3) * 60} />
              <h3 className="sus-kpi-card-title">{item.title}</h3>
              <p className="sus-kpi-card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

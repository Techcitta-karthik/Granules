import { useEffect, useRef, useState } from 'react';

interface KpiItem {
  icon: string;
  value: string;
  label: string;
}

const SUSTAINABILITY_KPIS: KpiItem[] = [
  {
    icon: '/assets/sustainability/non-fin1-light.png',
    value: '45.7%',
    label: 'Absolute reduction in GHG emissions (Scope 1 and 2)',
  },
  {
    icon: '/assets/sustainability/non-fin2x-light.png',
    value: '98%',
    label: 'Of electricity consumption from renewable sources (PPA, rooftop solar, I-RECs)',
  },
  {
    icon: '/assets/sustainability/non-fin3x-light.png',
    value: '~39%',
    label: 'Of our wastewater is recycled',
  },
  {
    icon: '/assets/sustainability/non-fin4x-light.png',
    value: '93%',
    label: 'Waste diverted from landfill',
  },
  {
    icon: '/assets/sustainability/non-fin5-light.png',
    value: '82%',
    label: 'Vendors engaged for carbon footprint and climate commitment',
  },
  {
    icon: '/assets/sustainability/non-fin6-light.png',
    value: '6,523+',
    label: 'Total Work Force',
  },
  {
    icon: '/assets/sustainability/non-fin7-light.png',
    value: '14.1%',
    label: 'Female Work Force',
  },
  {
    icon: '/assets/sustainability/non-fin8-light.png',
    value: '21.5%',
    label: 'Increase in Female employees compared to previous Year',
  },
  {
    icon: '/assets/sustainability/non-fin9x-light.png',
    value: '100%',
    label: 'Return-to-work rate',
  },
  {
    icon: '/assets/sustainability/non-fin10-light.png',
    value: '1,600+',
    label: 'Students trained through Pharma Pathshala',
  },
  {
    icon: '/assets/sustainability/non-fin11-light.png',
    value: '0%',
    label: 'Confirmed cases of discrimination',
  },
  {
    icon: '/assets/sustainability/non-fin12-light.png',
    value: '27%',
    label: 'Women on the Board',
  },
];

function parseKpiValue(raw: string) {
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

function AnimatedKpiValue({ raw, delay = 0, duration = 1300 }: { raw: string; delay?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, target, suffix, decimals, hasComma } = parseKpiValue(raw);
  const [displayValue, setDisplayValue] = useState<string>(() => `${prefix}${formatValue(0, decimals, hasComma)}${suffix}`);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
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
            // Smooth easeOutCubic curve
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
  }, [raw, target, prefix, suffix, decimals, hasComma, duration, delay]);

  return <span ref={ref} className="sus-kpi-tag-val">{displayValue}</span>;
}

export default function SustainabilityKpisSection() {
  return (
    <section className="sus-kpi-sec-img2" id="kpis" aria-label="Progressing With Purpose">
      <span className="tag">Key Performance Indicators</span>
      <h2 className="sus-kpi-title-img2">Progressing With Purpose</h2>

      <div className="sus-kpi-tag-grid">
        {SUSTAINABILITY_KPIS.map((item, idx) => (
          <div className="sus-kpi-tag" key={item.label}>
            <img
              src={item.icon}
              alt=""
              className="sus-kpi-tag-icon"
              loading="lazy"
              decoding="async"
            />
            <div className="sus-kpi-tag-content">
              <AnimatedKpiValue raw={item.value} delay={(idx % 2) * 80} />
              <span className="sus-kpi-tag-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

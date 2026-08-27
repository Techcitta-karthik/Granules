import { useRef, useState, useCallback, useEffect } from 'react';

export function useSwipeScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [thumbWidth, setThumbWidth] = useState(30);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  const updateProgress = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const progress = Math.min(1, Math.max(0, scrollLeft / maxScroll));
      setScrollProgress(progress);
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < maxScroll - 2);
      const ratio = Math.max(0.25, Math.min(0.5, clientWidth / scrollWidth));
      setThumbWidth(ratio * 100);
    } else {
      setScrollProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      setThumbWidth(100);
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      el.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [updateProgress]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDown.current = true;
    setIsDragging(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (e.pageX - lastX.current) / dt;
      lastX.current = e.pageX;
      lastTime.current = now;
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsDragging(false);

    if (trackRef.current && Math.abs(velocity.current) > 0.2) {
      const momentum = velocity.current * 250;
      trackRef.current.scrollBy({
        left: -momentum,
        behavior: 'smooth',
      });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (isDown.current) {
      isDown.current = false;
      setIsDragging(false);
    }
  }, []);

  const scroll = useCallback((direction: 1 | -1, amount?: number) => {
    if (!trackRef.current) return;
    const cardWidth = amount || (trackRef.current.clientWidth * 0.5 || 440);
    trackRef.current.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth',
    });
  }, []);

  return {
    trackRef,
    isDragging,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    scroll,
    swipeProps: {
      ref: trackRef,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
    },
  };
}

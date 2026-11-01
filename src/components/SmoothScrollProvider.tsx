import React, { useEffect, createContext, useContext, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis buttery inertia scrolling
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential decay
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Connect Lenis to requestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Apply real-time scroll velocity to CSS variables for dynamic skew & tilt
    lenis.on('scroll', (e: { velocity: number; scroll: number; progress: number }) => {
      const clampedVelocity = Math.max(Math.min(e.velocity, 12), -12);
      document.documentElement.style.setProperty('--scroll-velocity', `${clampedVelocity}`);
      document.documentElement.style.setProperty('--scroll-skew', `${clampedVelocity * 0.15}deg`);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -40,
        duration: options?.duration ?? 1.4,
      });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

import React, { useEffect, useRef } from 'react';

interface ScrollMarqueeProps {
  text?: string;
  secondaryText?: string;
  theme?: 'ivory' | 'pastel' | 'charcoal';
}

export const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({
  text = 'DIGITAL EXPERIENCES · INTERACTIVE INTERFACES · WHATSAPP AI AUTOMATION · BHAIYU STUDIO · CRAFTED WITH PURPOSE ·',
  secondaryText = 'REACT · NEXT.JS · TYPESCRIPT · TAILWIND CSS · GSAP · CREATIVE DIRECTION · PYTHON · 2026 EDITION ·',
  theme = 'ivory',
}) => {
  const ribbon1Ref = useRef<HTMLDivElement>(null);
  const ribbon2Ref = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const velocityRef = useRef(0);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = Math.max(currentTime - lastTime, 16);

      // Compute scroll velocity (pixels per ms * factor)
      const instantVelocity = (deltaY / deltaTime) * 4;
      velocityRef.current = instantVelocity;

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      // Natural base speed plus velocity friction decay
      velocityRef.current *= 0.92; // smooth decay
      const speed1 = 0.8 + velocityRef.current;
      const speed2 = -0.7 - velocityRef.current;

      offset1Ref.current -= speed1;
      offset2Ref.current -= speed2;

      // Wrap around when scrolled too far (repeating track length ~2000px)
      if (Math.abs(offset1Ref.current) > 2000) offset1Ref.current = 0;
      if (Math.abs(offset2Ref.current) > 2000) offset2Ref.current = 0;

      if (ribbon1Ref.current) {
        ribbon1Ref.current.style.transform = `translate3d(${offset1Ref.current}px, 0, 0)`;
      }
      if (ribbon2Ref.current) {
        ribbon2Ref.current.style.transform = `translate3d(${offset2Ref.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="py-6 sm:py-8 overflow-hidden select-none border-y border-[#EAE6DD] bg-[#FAF9F6]">
      {/* Top Track (Leftbound velocity) */}
      <div className="overflow-hidden flex whitespace-nowrap">
        <div ref={ribbon1Ref} className="inline-flex will-change-transform">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="inline-flex items-center gap-6 px-4">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A]">
                {text}
              </span>
              <span className="w-3 h-3 rounded-full bg-[#FF887D]" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track (Rightbound velocity with pastel accents) */}
      <div className="overflow-hidden flex whitespace-nowrap mt-2 sm:mt-3">
        <div ref={ribbon2Ref} className="inline-flex will-change-transform">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="inline-flex items-center gap-6 px-4">
              <span className="text-xs sm:text-sm font-mono-code uppercase tracking-widest text-[#555555]">
                {secondaryText}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#BFF4D5]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

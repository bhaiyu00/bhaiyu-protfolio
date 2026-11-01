import React, { useState, useEffect } from 'react';
import { calculateScrollProgress } from '../utils/portfolioLogic';
import { useSmoothScroll } from './SmoothScrollProvider';

interface ScrollProgressTrackerProps {
  activeSection: string;
}

export const ScrollProgressTracker: React.FC<ScrollProgressTrackerProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = calculateScrollProgress(currentScroll, totalHeight, windowHeight);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', label: '00 INTRO', target: '#home' },
    { id: 'about', label: '01 PERSPECTIVE', target: '#about' },
    { id: 'work', label: '02 SELECTED WORK', target: '#work' },
    { id: 'github', label: '03 GITHUB CODE', target: '#github' },
    { id: 'skills', label: '04 TOOLKIT', target: '#skills' },
    { id: 'process', label: '05 PROCESS', target: '#process' },
    { id: 'contact', label: '06 INITIATION', target: '#contact' },
  ];

  const handleScrollTo = (target: string) => {
    scrollTo(target, { offset: -60, duration: 1.2 });
  };


  return (
    <>
      {/* Top Header Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#BFF4D5] via-[#FFE58F] to-[#FF887D] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Right-Edge Ultra-Minimalist Scroll Rail on Desktop */}
      <aside
        aria-label="Scroll section navigator"
        className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden 2xl:flex flex-col items-end gap-2.5 pointer-events-auto select-none"
      >
        <div className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur-md px-2 py-3 rounded-full border border-[#E8E4DA] shadow-xs">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleScrollTo(sec.target)}
                className="group relative flex items-center justify-center p-1 transition-all"
                title={sec.label}
              >
                {/* Floating label on hover */}
                <span className="absolute right-6 whitespace-nowrap bg-[#1A1A1A] text-white text-[10px] font-mono-code px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-sm">
                  {sec.label}
                </span>
                <span
                  className={`rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-2 h-4 bg-[#1A1A1A]'
                      : 'w-1.5 h-1.5 bg-[#D4D0C5] group-hover:bg-[#888888]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Live Percent Badge */}
        <div className="text-[9px] font-mono-code font-bold tabular-nums text-[#666666] bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-full border border-[#E8E4DA] mx-auto">
          {Math.round(scrollProgress)}%
        </div>
      </aside>
    </>
  );
};

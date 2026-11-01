import React, { useEffect, useState } from 'react';
import { BhaiyuSignature } from './BhaiyuSignature';
import { ArrowRight } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if ?autostart=1 is present
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      onComplete();
      return;
    }

    // Smooth progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleFinish();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 14) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-12 bg-[#FAF9F6] text-[#222222] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Top Header in Preloader */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#666666]">
          Creative Engineering · 2026
        </span>
        <button
          onClick={handleFinish}
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#444444] hover:text-[#111111] bg-white/70 hover:bg-white border border-[#E5E2DA] rounded-full transition-all duration-200"
          aria-label="Skip introduction"
        >
          <span>Skip intro</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Center Reveal Typography & Signature */}
      <div className="my-auto flex flex-col items-center justify-center text-center px-4">
        <div className="overflow-hidden mb-3">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-[#1A1A1A] transition-transform duration-700 ease-out">
            NISHANT
          </h1>
        </div>

        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="font-handwriting text-2xl sm:text-3xl text-[#555555]">aka</span>
          <div className="transform scale-110 sm:scale-125 my-1">
            <BhaiyuSignature size="md" color="#111111" strokeWidth={3} animated={true} />
          </div>
        </div>

        <p className="mt-6 text-xs sm:text-sm tracking-widest uppercase text-[#777777] font-medium max-w-md">
          Web Experiences · Interfaces · AI Automation
        </p>
      </div>

      {/* Bottom Progress & Metadata */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E5DD] pt-4">
        <div className="text-xs text-[#777777] font-mono-code">
          Crafting digital experiences that move people
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:w-48 h-1.5 bg-[#EAE7DF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#222222] transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-mono-code font-bold tabular-nums text-[#222222] min-w-[3ch]">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

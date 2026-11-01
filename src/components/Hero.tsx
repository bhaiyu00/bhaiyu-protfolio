import React, { useState, useEffect, useRef } from 'react';
import { BhaiyuSignature } from './BhaiyuSignature';
import { useSmoothScroll } from './SmoothScrollProvider';
import { ROTATOR_WORDS, getNextRotatorIndex } from '../utils/portfolioLogic';
import { ArrowDown, ArrowUpRight, Compass, Sparkles, Github } from 'lucide-react';

export const Hero: React.FC = () => {
  const [rotatorIndex, setRotatorIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [badgeTilt, setBadgeTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Dynamic word rotator (DESIGN, CODE, CREATE, AUTOMATE)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex((prev) => getNextRotatorIndex(prev));
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    setBadgeTilt({ x: y * 16, y: -x * 16 });
  };

  const currentWord = ROTATOR_WORDS[rotatorIndex];

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-[#FAF9F6]"
    >
      {/* Organic atmospheric glow circles responding to cursor */}
      <div
        className="absolute top-20 right-[12%] w-80 h-80 rounded-full pointer-events-none transition-transform duration-700 ease-out opacity-40 parallax-layer-slow"
        style={{
          background: 'radial-gradient(circle, rgba(191, 244, 213, 0.6) 0%, rgba(250, 249, 246, 0) 70%)',
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
        }}
      />
      <div
        className="absolute bottom-16 left-[8%] w-96 h-96 rounded-full pointer-events-none transition-transform duration-700 ease-out opacity-35 parallax-layer-fast"
        style={{
          background: 'radial-gradient(circle, rgba(217, 200, 255, 0.5) 0%, rgba(250, 249, 246, 0) 70%)',
          transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full my-auto relative z-10">
        {/* Editorial Sub-Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] font-mono-code font-bold text-[#666666]">
            PORTFOLIO 2026 · INDEPENDENT CREATIVE DEVELOPER
          </span>
          <span className="w-10 h-px bg-[#D9D6CD]" />
          <span className="text-xs font-handwriting text-[#FF887D] hidden sm:inline-block text-lg">
            crafting with care
          </span>
        </div>

        {/* Huge Main Headline */}
        <div className="space-y-1 sm:space-y-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-[#1A1A1A]">
              Hey, I'm Nishant.
            </h1>
            <div className="transform scale-95 sm:scale-115 lg:scale-130 origin-left inline-flex">
              <BhaiyuSignature size="md" color="#1A1A1A" strokeWidth={2.8} animated={true} />
            </div>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-2">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#2B2B2B]">
              I make the internet feel
            </h2>
            <div
              className="inline-flex items-center px-4 py-1 sm:py-2 rounded-2xl transition-all duration-500 ease-out transform"
              style={{
                backgroundColor: currentWord.color,
                color: currentWord.textColor,
              }}
            >
              <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                MORE ALIVE.
              </span>
            </div>
          </div>
        </div>

        {/* Human Editorial Split */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-lg sm:text-2xl text-[#3A3A3A] font-normal leading-relaxed max-w-2xl text-balance">
              I design and build websites, interactive experiences and intelligent automation that bring ideas to life.
            </p>

            {/* Handwritten statement */}
            <div className="mt-5 flex items-center gap-2">
              <span className="font-handwriting text-2xl sm:text-3xl text-[#111111]">
                "I don't just build websites. I create digital experiences that make people stop and explore."
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#work', { offset: -40, duration: 1.2 });
                }}
                data-cursor
                data-cursor-text="EXPLORE"
                className="group inline-flex items-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1A1A1A] hover:bg-[#000000] rounded-full transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Explore my work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact', { offset: -40, duration: 1.2 });
                }}
                data-cursor
                className="inline-flex items-center gap-2 px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-white hover:bg-[#F2EFE8] border border-[#E0DCD2] rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-2xs"
              >
                <span>Let's talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/bhaiyu00"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                data-cursor-text="GITHUB"
                className="inline-flex items-center gap-2 px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#333333] hover:text-[#111111] bg-white hover:bg-[#F2ECE1] border border-[#E0DCD2] rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-2xs"
                title="View Nishant's GitHub profile (@bhaiyu00)"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono-code text-[#777777]">
                <span>currently focusing on:</span>
                <span className="font-bold underline decoration-2 decoration-[#FF887D] text-[#1A1A1A]">
                  {currentWord.word}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Handcrafted Studio Artifact (No generic AI cards) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className="relative transition-transform duration-300 ease-out max-w-sm w-full scroll-skew-reactive"
              style={{
                transform: `perspective(1000px) rotateX(${badgeTilt.x}deg) rotateY(${badgeTilt.y}deg)`,
              }}
            >
              {/* Washi tape graphic */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#FFE58F]/80 backdrop-blur-2xs transform -rotate-2 z-20 shadow-2xs border-x border-black/5" />


              {/* Physical note card */}
              <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl shadow-xl border border-[#E8E4DA] relative z-10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE4]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/aistudio/imagesprofile_clean.jpg"
                      alt="Nishant (bhaiyu)"
                      className="w-8 h-8 rounded-full object-cover border border-[#E8E4DA] shadow-2xs"
                    />
                    <div>
                      <span className="text-[10px] font-mono-code tracking-widest text-[#888888] uppercase block">
                        STUDIO DISPATCH // 026
                      </span>
                      <span className="text-[11px] font-bold text-[#1A1A1A] block">
                        Nishant (bhaiyu)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#0F5132] font-semibold bg-[#BFF4D5]/40 px-2 py-0.5 rounded">
                    OPEN FOR CLIENTS
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="font-handwriting text-2xl text-[#1A1A1A] block">
                    Hey friend, welcome to my digital journal.
                  </span>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    I believe great software doesn't feel like software — it feels like magic. Every interaction is coded from scratch with intention, performance, and emotion.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0ECE4] flex items-center justify-between text-xs font-mono-code">
                  <div className="flex items-center gap-2 text-[#444444]">
                    <Compass className="w-3.5 h-3.5 text-[#FF887D]" />
                    <span>India · Remote Worldwide</span>
                  </div>
                  <span className="text-[#888888]">UTC+5:30</span>
                </div>
              </div>

              {/* Underlying decorative stamp */}
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#FAF0E6] rounded-2xl -z-10 border border-[#E8DCC8] rotate-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom subtle indicator */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full mt-12 flex items-center justify-between text-xs text-[#888888] font-mono-code">
        <span>SCROLL TO DISCOVER</span>
        <div className="flex items-center gap-2">
          <span>CREATIVE DEVELOPER</span>
          <span>·</span>
          <span>BHAIYU</span>
        </div>
      </div>
    </section>
  );
};

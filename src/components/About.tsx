import React from 'react';
import { BhaiyuSignature } from './BhaiyuSignature';
import { Compass, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-36 bg-[#FAF9F6] border-t border-[#EAE6DD] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono-code font-bold text-[#666666]">
                01 — PERSPECTIVE
              </span>
              <span className="w-8 h-px bg-[#D9D6CD]" />
              <span className="font-handwriting text-lg text-[#FF887D]">behind the screen</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]">
              A little about what I do.
            </h2>
          </div>
          <div className="text-xs font-mono-code text-[#777777]">
            CREATIVE DISCIPLINE & IDENTITY
          </div>
        </div>

        {/* Editorial Layout: Polaroid Photo + Human Monograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hand-annotated Portrait Composition */}
          <div className="lg:col-span-5 relative scroll-skew-reactive">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Realistic washi tape at top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#FFE58F]/85 backdrop-blur-2xs transform -rotate-1 z-20 shadow-xs border-x border-black/5" />

              {/* Physical Polaroid-style Frame */}
              <div className="relative bg-white p-4 sm:p-5 pb-8 rounded-2xl shadow-xl border border-[#E5E0D5] rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-xl bg-[#FAF9F6]">
                  <img
                    src="/assets/aistudio/imagesprofile_clean.jpg"
                    alt="Nishant (bhaiyu) personal portrait"
                    className="w-full aspect-[3/4] object-cover bg-black"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Hand-annotated caption at bottom of Polaroid */}
                <div className="pt-4 px-2 flex items-center justify-between">
                  <div>
                    <span className="font-handwriting text-2xl text-[#1A1A1A] block">Nishant (bhaiyu)</span>
                    <span className="text-[11px] font-mono-code text-[#888888]">Studio portrait · 2026</span>
                  </div>
                  <a
                    href="https://www.instagram.com/bhaiyu_0001/?utm_source=ig_web_button_share_sheet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-handwriting text-xl text-[#FF887D] hover:underline"
                  >
                    @bhaiyu_0001
                  </a>
                </div>
              </div>

              {/* Floating Hand-Annotated Sticky Note with subtle parallax counter-drift */}
              <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-[#FFC7A9] text-[#551E06] p-4 rounded-2xl shadow-lg border border-[#ECA785] rotate-3 max-w-[210px] hidden sm:block parallax-layer-slow">
                <p className="font-handwriting text-lg leading-snug">
                  "Code is just the brush. Experience is the painting."
                </p>
              </div>
            </div>
          </div>


          {/* Right Column: Authentic Human Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#1A1A1A] leading-relaxed">
                "I'm Nishant, a developer who enjoys turning ideas into useful digital experiences. I work across web development, creative interfaces and AI-powered automation. I love experimenting with technology, motion and design to make products feel intuitive and memorable."
              </p>

              <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
                I don't fit into the typical corporate developer mold. I care deeply about how a product feels the exact second someone opens it. Whether that's sculpting a 60fps micro-interaction that makes someone smile, or engineering a WhatsApp automation workflow that actually solves real customer problems without robotic loops.
              </p>
            </div>

            {/* Human Craft Principles */}
            <div className="p-6 bg-white rounded-3xl border border-[#E8E4DA] shadow-xs space-y-4">
              <span className="text-xs font-mono-code uppercase tracking-wider font-bold text-[#888888] block">
                WHAT I VALUE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-code text-[#333333]">
                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#EAE6DD]">
                  <span className="font-bold text-[#1A1A1A] block mb-1">01. Emotion in Motion</span>
                  <span>Animations must have purpose, rhythm, and intention — never gratuitous lag.</span>
                </div>
                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#EAE6DD]">
                  <span className="font-bold text-[#1A1A1A] block mb-1">02. Human-Centric AI</span>
                  <span>Automations that respect the user's time and communicate with natural clarity.</span>
                </div>
              </div>
            </div>

            {/* Signature Endorsement */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-mono-code text-[#777777]">AUTHENTIC IDENTITY:</span>
              <BhaiyuSignature size="sm" color="#1A1A1A" strokeWidth={2.4} animated={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

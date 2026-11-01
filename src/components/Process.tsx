import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Understand the idea, requirements and actual problem.',
      description:
        'Every great project begins with listening and ruthless clarity. I dissect what you actually want to achieve, who will use it, and what technical hurdles exist before writing any code.',
      handwrittenNote: 'No assumptions. Just real user questions.',
      deliverables: ['Clear project scope & goals', 'Architecture & stack map', 'User journey flowcharts'],
      color: '#BFF4D5',
      textColor: '#0F5132',
    },
    {
      step: '02',
      title: 'Design',
      tagline: 'Create the visual direction, layout and interaction system.',
      description:
        'Art-directing the layout, typography scale, and motion personality. I craft distinctive editorial aesthetics with custom pastel accents rather than generic cookie-cutter templates.',
      handwrittenNote: 'Giving the interface a distinctive soul.',
      deliverables: ['Editorial visual language', 'Interactive motion choreography', 'Responsive grid systems'],
      color: '#D9C8FF',
      textColor: '#371B70',
    },
    {
      step: '03',
      title: 'Develop',
      tagline: 'Build the experience with clean, responsive and maintainable code.',
      description:
        'Translating designs into clean, modular, and maintainable TypeScript and React. Integrating intelligent WhatsApp workflows, webhooks, and performant state handling.',
      handwrittenNote: 'Code written like fine architecture.',
      deliverables: ['Production Next.js / React build', 'Intelligent WhatsApp API pipelines', 'Accessible semantic HTML'],
      color: '#FFE58F',
      textColor: '#594400',
    },
    {
      step: '04',
      title: 'Refine',
      tagline: 'Test, optimize, polish and deliver.',
      description:
        'Auditing 60fps animations, mobile responsive reflow, and load performance. Ensuring every edge case is handled so the delivered experience feels rock-solid.',
      handwrittenNote: 'The final 10% that makes it 10x.',
      deliverables: ['Cross-device stress testing', 'Speed & bundle optimization', 'Clean code handover'],
      color: '#FF887D',
      textColor: '#841910',
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-36 bg-[#FAF9F6] border-t border-[#EAE6DD] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono-code font-bold text-[#666666]">
                04 — PRODUCTION METHODOLOGY
              </span>
              <span className="w-8 h-px bg-[#D9D6CD]" />
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]">
              From idea to experience.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#666666] max-w-md leading-relaxed">
            A collaborative four-step journey transforming raw ideas into memorable digital products.
          </p>
        </div>

        {/* Editorial Journal Steps: Vertical Expanded Log */}
        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isOpen = activeStep === idx;
            return (
              <div
                key={stage.step}
                onClick={() => setActiveStep(idx)}
                className={`group cursor-pointer rounded-3xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white p-7 sm:p-10 border-[#1A1A1A] shadow-xl'
                    : 'bg-white/60 p-5 sm:p-7 border-[#E8E4DA] hover:bg-white hover:border-[#CCC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className="text-2xl sm:text-4xl font-black font-mono-code px-3 py-1 rounded-xl transition-colors"
                      style={{
                        backgroundColor: isOpen ? stage.color : '#FAF9F6',
                        color: isOpen ? stage.textColor : '#888888',
                      }}
                    >
                      {stage.step}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
                        {stage.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#666666] mt-0.5 font-medium">
                        {stage.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="font-handwriting text-xl text-[#FF887D] hidden md:inline-block">
                    {stage.handwrittenNote}
                  </span>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="mt-6 pt-6 border-t border-[#F0ECE4] grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
                    <div className="lg:col-span-7">
                      <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    <div className="lg:col-span-5 bg-[#FAF9F6] p-5 rounded-2xl border border-[#EAE6DD]">
                      <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#777777] block mb-3 font-bold">
                        Phase Deliverables
                      </span>
                      <div className="space-y-2">
                        {stage.deliverables.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-mono-code text-[#333333]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

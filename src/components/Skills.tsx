import React, { useState } from 'react';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';

interface SkillEntry {
  name: string;
  category: string;
  humanNote: string;
  tag: string;
  accent: string;
}

export const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<SkillEntry | null>({
    name: 'GSAP & Motion',
    category: 'Creative Motion & Interaction',
    humanNote: 'Because the difference between a good website and an unforgettable one is in the easing curves.',
    tag: 'Choreography',
    accent: '#FF887D',
  });

  const skills: SkillEntry[] = [
    {
      name: 'React & Next.js',
      category: 'Frontend Engineering',
      humanNote: 'Component architectures built modularly, accessible by default, and optimized for instant first paint.',
      tag: 'Architecture',
      accent: '#BFF4D5',
    },
    {
      name: 'TypeScript',
      category: 'Languages',
      humanNote: 'Strict contracts and static safety so I can sleep peacefully without unexpected runtime surprises.',
      tag: 'Type Safety',
      accent: '#D9C8FF',
    },
    {
      name: 'GSAP & Motion',
      category: 'Creative Motion & Interaction',
      humanNote: 'Because the difference between a good website and an unforgettable one is in the easing curves.',
      tag: 'Choreography',
      accent: '#FF887D',
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling & Systems',
      humanNote: 'Sculpting custom typography scales and responsive layouts without bloated CSS stylesheets.',
      tag: 'Design System',
      accent: '#FFE58F',
    },
    {
      name: 'Node.js & Express',
      category: 'Backend & APIs',
      humanNote: 'Event-driven server services, secure API routing, and ultra-reliable webhook handlers.',
      tag: 'Backend',
      accent: '#BFF4D5',
    },
    {
      name: 'WhatsApp Cloud API',
      category: 'AI & Automation',
      humanNote: 'Building multi-turn conversational agents that actually answer questions without robotic frustration.',
      tag: 'Automation',
      accent: '#B8E0FF',
    },
    {
      name: 'Python',
      category: 'Automation & Scripting',
      humanNote: 'Data parsing, AI agent pipelines, and custom scraping utilities.',
      tag: 'Scripting',
      accent: '#FFE58F',
    },
  ];

  return (
    <section id="skills" className="py-24 sm:py-36 bg-[#FAF9F6] border-t border-[#EAE6DD] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono-code font-bold text-[#666666]">
                03 — CAPABILITIES & TOOLKIT
              </span>
              <span className="w-8 h-px bg-[#D9D6CD]" />
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]">
              My creative toolkit.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#666666] max-w-md leading-relaxed">
            Technologies I've learned through real, messy, late-night production projects — not online quizzes.
          </p>
        </div>

        {/* Editorial Layout: Large Interactive Typography List + Real Commentary Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Typographic List */}
          <div className="lg:col-span-7 divide-y divide-[#EAE6DD] border-y border-[#EAE6DD]">
            {skills.map((skill) => {
              const isSelected = hoveredSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onClick={() => setHoveredSkill(skill)}
                  className={`group py-5 sm:py-6 cursor-pointer flex items-center justify-between transition-all duration-200 ${
                    isSelected ? 'px-4 bg-white/70 -mx-4 rounded-xl shadow-2xs' : 'hover:px-2'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-2xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] group-hover:text-[#FF887D] transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono-code text-[#777777] hidden sm:inline-block">
                      {skill.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono-code text-[#666666] bg-[#FAF9F6] border border-[#E5E0D5] px-2.5 py-1 rounded-full">
                      {skill.tag}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 text-[#1A1A1A] transition-transform duration-200 ${
                        isSelected ? 'translate-x-1' : 'opacity-40 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Handcrafted Commentary Board */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E4DA] shadow-lg relative overflow-hidden">
              {/* Paper grain backdrop */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-40 transition-colors duration-300"
                style={{ backgroundColor: hoveredSkill?.accent || '#BFF4D5' }}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE4]">
                  <span className="text-[10px] font-mono-code tracking-widest text-[#888888] uppercase">
                    TOOLKIT PERSPECTIVE
                  </span>
                  <span className="text-xs font-mono-code font-bold text-[#1A1A1A]">
                    {hoveredSkill?.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
                    {hoveredSkill?.name}
                  </h3>
                  <div className="mt-4 p-4 bg-[#FAF9F6] rounded-2xl border border-[#EAE6DD]">
                    <span className="font-handwriting text-2xl text-[#1A1A1A] leading-snug block">
                      "{hoveredSkill?.humanNote}"
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs font-mono-code text-[#777777] space-y-2">
                  <div className="flex items-center justify-between">
                    <span>PHILOSOPHY:</span>
                    <span className="font-bold text-[#1A1A1A]">NO FRAMEWORK BLOAT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>EXECUTION:</span>
                    <span className="font-bold text-[#1A1A1A]">PERFORMANCE & FEEL FIRST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

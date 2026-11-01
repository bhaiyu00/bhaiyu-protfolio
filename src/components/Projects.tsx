import React, { useState, useRef } from 'react';
import { ProjectItem, PROJECTS_DATA } from '../utils/portfolioLogic';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Eye, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollToProject = (index: number) => {
    setActiveProjectIndex(index);
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    const nextIdx = (activeProjectIndex + 1) % PROJECTS_DATA.length;
    handleScrollToProject(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeProjectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    handleScrollToProject(prevIdx);
  };

  return (
    <section id="work" className="py-24 sm:py-36 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono-code font-bold text-[#666666]">
                02 — SELECTED WORK
              </span>
              <span className="w-8 h-px bg-[#D9D6CD]" />
              <span className="font-handwriting text-lg text-[#FF887D]">handcrafted builds</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]">
              Crafted with intent.
            </h2>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono-code text-[#777777] hidden sm:inline-block">
              PROJECT {activeProjectIndex + 1} OF {PROJECTS_DATA.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-11 h-11 rounded-full bg-white border border-[#E5E0D5] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next project"
                className="w-11 h-11 rounded-full bg-white border border-[#E5E0D5] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Selector Tab Strip (Clean editorial buttons, no pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#EAE6DD] text-xs font-mono-code scrollbar-none">
          {PROJECTS_DATA.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => handleScrollToProject(idx)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeProjectIndex === idx
                  ? 'bg-[#1A1A1A] text-white font-bold shadow-xs'
                  : 'bg-white/80 text-[#666666] hover:text-[#111111] border border-[#EAE6DD]'
              }`}
            >
              <span>0{idx + 1}.</span>
              <span>{proj.title}</span>
            </button>
          ))}
        </div>

        {/* Horizontal Smooth Scroll Showcase Track */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none gap-6 pb-6"
        >
          {PROJECTS_DATA.map((project, idx) => {
            return (
              <div
                key={project.id}
                className="min-w-full sm:min-w-[95%] lg:min-w-full snap-center bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DA] shadow-lg hover:shadow-2xl transition-all duration-300 scroll-skew-reactive"
              >

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Project Narrative */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#0F5132] bg-[#BFF4D5]/40 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-5xl font-black font-mono-code text-[#E5E0D5]">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1A1A1A]">
                      {project.title}
                    </h3>

                    <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2 border-t border-[#F0ECE4] space-y-2">
                      <span className="text-[11px] uppercase tracking-wider text-[#888888] font-bold block">
                        Architecture & Stack
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#444444]">
                        {project.technologies.map((tech, tIdx) => (
                          <React.Fragment key={tech}>
                            <span className="font-semibold">{tech}</span>
                            {tIdx < project.technologies.length - 1 && (
                              <span className="text-[#CCC]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        data-cursor
                        data-cursor-text="PREVIEW"
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1A1A1A] hover:bg-black rounded-full transition-all duration-200 shadow-md hover:shadow-xl"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Explore Case & Sandbox</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Frame with Hover Magnification */}
                  <div className="lg:col-span-7">
                    <div
                      onClick={() => setSelectedProject(project)}
                      data-cursor
                      data-cursor-text="EXPAND"
                      className="group/img relative cursor-pointer overflow-hidden rounded-2xl border border-[#E5E0D5] bg-[#FAF9F6] shadow-inner h-[320px] sm:h-[440px]"
                    >
                      <img
                        src={project.imagePath}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover/img:scale-106 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-xl text-[#1A1A1A] flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-[#FF887D]" />
                          <span>Launch Sandbox</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

import React from 'react';
import { BhaiyuSignature } from './BhaiyuSignature';
import { useSmoothScroll } from './SmoothScrollProvider';
import { ArrowUp, Github, Linkedin, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { scrollTo } = useSmoothScroll();

  const scrollToTop = () => {
    scrollTo('#home', { offset: 0, duration: 1.5 });
  };


  return (
    <footer className="bg-[#FAF9F6] border-t border-[#EAE6DD] py-14 sm:py-20 text-[#222222]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top Tier: Signature + Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 border-b border-[#EAE6DD]">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-2xl tracking-tight text-[#111111]">
              NISHANT
            </span>
            <span className="text-[#888888]">/</span>
            <BhaiyuSignature size="sm" color="#111111" strokeWidth={2.4} animated={false} />
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#333333] hover:text-[#111111] bg-white border border-[#E5E0D5] rounded-full hover:bg-[#F2ECE1] transition-all shadow-2xs"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Middle Tier: Statement & Socials */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="font-handwriting text-2xl sm:text-3xl text-[#222222] leading-snug">
              "I don't just build websites. I create digital experiences that make people stop and explore."
            </p>
            <p className="text-xs text-[#777777] font-mono-code mt-2">
              Made with curiosity, creativity and code.
            </p>
          </div>

          {/* Nav & Social link lists */}
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-6 text-xs font-semibold text-[#555555]">
            <a href="mailto:nishantbarman04k@gmail.com" className="hover:text-[#111111] transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <a href="https://github.com/bhaiyu00" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] transition-colors flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/nishant" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] transition-colors flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/bhaiyu_0001/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] transition-colors flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Dynamic Year */}
        <div className="pt-8 border-t border-[#EAE6DD] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#777777]">
          <span>Designed & developed by Nishant.</span>
          <span>© {currentYear} All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

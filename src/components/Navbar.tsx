import React, { useState, useEffect } from 'react';
import { BhaiyuSignature } from './BhaiyuSignature';
import { useSmoothScroll } from './SmoothScrollProvider';
import { Menu, X, ArrowUpRight, Github } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'GitHub', href: '#github', id: 'github' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -60, duration: 1.2 });
  };


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE7DF] shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
          {/* Zone 1: Wordmark & Signature */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
            aria-label="Nishant bhaiyu home"
          >
            <span className="font-extrabold text-xl tracking-tight text-[#111111]">
              NISHANT
            </span>
            <div className="opacity-90 group-hover:scale-105 transition-transform">
              <BhaiyuSignature size="sm" color="#111111" strokeWidth={2.4} animated={false} />
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#555555]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive ? 'text-[#111111] font-semibold' : 'hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF887D] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Availability Indicator & Primary CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/bhaiyu00"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/90 border border-[#E8E5DD] text-[#333333] hover:text-[#111111] hover:bg-[#F2ECE1] transition-all shadow-2xs"
              title="Nishant's GitHub profile (@bhaiyu00)"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <div className="inline-flex items-center gap-2 text-xs text-[#555555] bg-white/80 border border-[#E8E5DD] px-3 py-1.5 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="whitespace-nowrap">Available for select work</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#222222] hover:bg-[#000000] rounded-full transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#222222] hover:bg-black/5 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#FAF9F6] flex flex-col justify-between p-6 pt-24 md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-2xl font-bold py-2 border-b border-[#EAE7DF] transition-colors ${
                  activeSection === link.id ? 'text-[#FF887D]' : 'text-[#222222]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-6">
            <div className="inline-flex items-center gap-2 text-xs text-[#555555] bg-white border border-[#E8E5DD] px-3 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Available for freelance & collaborations</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full text-center py-3 text-sm font-semibold text-white bg-[#222222] rounded-full"
            >
              Let's talk
            </a>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { ScrollProgressTracker } from './components/ScrollProgressTracker';
import { ScrollMarquee } from './components/ScrollMarquee';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { GitHubShowcase } from './components/GitHubShowcase';
import { Skills } from './components/Skills';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Check URL query parameters for ?autostart=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setShowPreloader(false);
    }
  }, []);

  // Section observer to update active nav link
  useEffect(() => {
    const sections = ['home', 'about', 'work', 'github', 'skills', 'process', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#FAF9F6] text-[#222222] font-sans selection:bg-[#FFE58F] selection:text-[#222222] relative">
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}

        {/* Editorial Custom Cursor (Desktop) */}
        <CustomCursor />

        {/* Advanced Global Scroll Progress Tracker & Desktop Floating Rail */}
        <ScrollProgressTracker activeSection={activeSection} />

        <Navbar activeSection={activeSection} />

        <main className="will-change-transform">
          <Hero />

          {/* Dynamic Velocity Scroll Marquee Ribbon 1 */}
          <ScrollMarquee
            text="DIGITAL EXPERIENCES · INTERACTIVE INTERFACES · WHATSAPP AI AUTOMATION · BHAIYU · CRAFTED WITH PURPOSE ·"
            secondaryText="REACT · NEXT.JS · TYPESCRIPT · TAILWIND CSS · GSAP · CREATIVE DIRECTION · 2026 EDITION ·"
          />

          <About />
          <Projects />
          <GitHubShowcase />

          {/* Dynamic Velocity Scroll Marquee Ribbon 2 */}
          <ScrollMarquee
            text="ENGINEERED TO MOVE PEOPLE · MOTION SYSTEMS · KINETIC TYPOGRAPHY · VELOCITY PARALLAX · BOLD CREATIVE VISIONS ·"
            secondaryText="DESIGN · CODE · CREATE · AUTOMATE · NO GENERIC TEMPLATES · ART-DIRECTED CODE ·"
          />

          <Skills />
          <Process />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}


import React, { useState } from 'react';
import { BhaiyuSignature } from './BhaiyuSignature';
import {
  validateContactForm,
  generateMailtoUrl,
  generateWhatsAppUrl,
  ContactFormData,
} from '../utils/portfolioLogic';
import { Mail, MessageCircle, Github, Linkedin, Instagram, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'Web Development',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const mailtoUrl = generateMailtoUrl(formData);
  const whatsappUrl = generateWhatsAppUrl(formData);

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FAF9F6] border-t border-[#EAE6DD] relative overflow-hidden">
      {/* Decorative Warm Ambient Gradient */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FFE58F]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF887D]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#666666]">
              06 — INITIATION
            </span>
            <span className="w-8 h-px bg-[#D9D6CD]" />
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]">
            Have something interesting in mind?
          </h2>

          <p className="text-lg sm:text-2xl text-[#555555] mt-4 font-normal leading-relaxed">
            Let's turn your next idea into something people remember.
          </p>
        </div>

        {/* 2-Column Grid: Functional Form + Direct Social Connections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-[#E8E4DA] shadow-md">
            {submitted ? (
              <div className="py-10 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#BFF4D5] text-[#0F5132] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A]">Message Prepared!</h3>
                  <p className="text-sm text-[#555555] mt-2 max-w-md mx-auto">
                    Thank you, {formData.name}. You can send this inquiry directly via your preferred channel:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F5132] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#0A3622] transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', projectType: 'Web Development', message: '' });
                  }}
                  className="text-xs text-[#777777] underline hover:text-[#111111]"
                >
                  Write another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider font-bold text-[#444444] mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe or Studio Team"
                    className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl text-sm text-[#222222] focus:outline-none transition-colors ${
                      errors.name ? 'border-[#FF887D]' : 'border-[#E5E0D5] focus:border-[#222222]'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-[#FF887D] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider font-bold text-[#444444] mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl text-sm text-[#222222] focus:outline-none transition-colors ${
                      errors.email ? 'border-[#FF887D]' : 'border-[#E5E0D5] focus:border-[#222222]'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-[#FF887D] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-xs uppercase tracking-wider font-bold text-[#444444] mb-2">
                    What kind of project?
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E0D5] rounded-xl text-sm text-[#222222] focus:outline-none focus:border-[#222222]"
                  >
                    <option value="Web Development">Web Development & Frontends</option>
                    <option value="Creative Web Experience">Creative Motion & Interactive Experiences</option>
                    <option value="WhatsApp AI Automation">WhatsApp AI Agent & Intelligent Workflows</option>
                    <option value="Full-Stack Application">Full-Stack Application / SaaS</option>
                    <option value="General Conversation">Other / Say Hello</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-bold text-[#444444] mb-2">
                    Tell me about your vision
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share what you are building, timeline expectations, or any exciting details..."
                    className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl text-sm text-[#222222] focus:outline-none transition-colors ${
                      errors.message ? 'border-[#FF887D]' : 'border-[#E5E0D5] focus:border-[#222222]'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-[#FF887D] mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1A1A1A] hover:bg-[#000000] rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start a conversation</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Info & Signature */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E4DA] shadow-sm">
              <span className="text-xs uppercase tracking-wider font-bold text-[#777777] block mb-2">
                Direct Email
              </span>
              <a
                href="mailto:nishantbarman04k@gmail.com"
                className="text-base sm:text-lg font-bold text-[#1A1A1A] hover:text-[#0F5132] transition-colors flex items-center justify-between group"
              >
                <span className="break-all">nishantbarman04k@gmail.com</span>
                <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-[#1A1A1A] shrink-0 ml-2" />
              </a>
            </div>

            {/* Social & Platform Channels */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E4DA] shadow-sm space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold text-[#777777] block">
                Connect Across The Web
              </span>

              <div className="space-y-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF9F6] border border-transparent hover:border-[#E8E4DA] transition-all text-xs font-semibold text-[#222222]"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-[#0F5132]" />
                    <span>WhatsApp Quick Chat</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#999]" />
                </a>

                <a
                  href="https://github.com/bhaiyu00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF9F6] border border-transparent hover:border-[#E8E4DA] transition-all text-xs font-semibold text-[#222222]"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-[#111111]" />
                    <span>GitHub (@bhaiyu00)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#999]" />
                </a>

                <a
                  href="https://linkedin.com/in/nishant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF9F6] border border-transparent hover:border-[#E8E4DA] transition-all text-xs font-semibold text-[#222222]"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#999]" />
                </a>

                <a
                  href="https://www.instagram.com/bhaiyu_0001/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF9F6] border border-transparent hover:border-[#E8E4DA] transition-all text-xs font-semibold text-[#222222]"
                >
                  <div className="flex items-center gap-3">
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span>Instagram (@bhaiyu_0001)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#999]" />
                </a>
              </div>
            </div>

            {/* Custom Bhaiyu Signature Display */}
            <div className="p-6 bg-[#FAF9F6] rounded-3xl border border-[#E8E4DA] flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase tracking-widest font-mono-code text-[#777777] mb-2">
                PERSONAL CREATIVE IDENTITY
              </span>
              <BhaiyuSignature size="md" color="#1A1A1A" strokeWidth={2.8} animated={false} />
              <p className="font-handwriting text-xl text-[#333333] mt-2">
                "Let's make something memorable."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

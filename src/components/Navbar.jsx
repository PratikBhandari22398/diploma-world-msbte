import React, { useState } from 'react';
import { Shield, Menu, X, ChevronRight, Home, BookOpen, User, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';
import { YouTubeIcon, WhatsAppIcon, InstagramIcon } from './BrandIcons';

export default function Navbar({ currentView, setCurrentView }) {
  // Secret: Triple click on logo opens Admin Panel
  const [clickCount, setClickCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 3) {
      setCurrentView(currentView === 'admin' ? 'public' : 'admin');
      setClickCount(0);
      setMobileMenuOpen(false);
    } else {
      setTimeout(() => setClickCount(0), 1200);
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        
        {/* Brand (Triple click logo for secret admin access) */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group flex-shrink-0"
          title="Diploma World MSBTE (Tap 3x for Admin)"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-amber-500 overflow-hidden bg-black p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <img src="/assets/logo.png" alt="Diploma World MSBTE Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-white text-sm sm:text-base tracking-tight leading-none group-hover:text-amber-400 transition-colors">
              Diploma World <span className="text-amber-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider ml-0.5 sm:ml-1">MSBTE</span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-400">Polytechnic Exam Hub</div>
          </div>
        </div>

        {/* Desktop Nav Links (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            Home
          </button>

          <button 
            onClick={() => scrollToSection('questions')}
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            IMP Questions
          </button>

          <button 
            onClick={() => scrollToSection('about')}
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            About Pratik
          </button>

          {/* Social Quick Action Buttons */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <a
              href={APP_CONFIG.SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-slate-200 hover:text-white border border-red-500/30 text-xs font-bold transition-all shadow-sm group"
              title="Subscribe on YouTube"
            >
              <YouTubeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Subscribe</span>
            </a>

            <a
              href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-slate-200 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all shadow-sm group"
              title="Join WhatsApp Channel"
            >
              <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* If in admin view, show Exit button */}
          {currentView === 'admin' && (
            <button
              onClick={() => setCurrentView('public')}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 transition-all ml-1"
            >
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span>Exit Admin</span>
            </button>
          )}
        </nav>

        {/* Mobile Header Action Icons & Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-1.5">
          <a
            href={APP_CONFIG.SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-red-600/15 text-red-400 border border-red-500/30 active:scale-95 transition-transform"
            title="YouTube"
          >
            <YouTubeIcon className="w-4 h-4" />
          </a>

          <a
            href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 active:scale-95 transition-transform"
            title="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 transition-all ml-0.5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Sliding Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay (closes menu on outside tap) */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-16 bg-black/75 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative z-50 md:hidden border-b border-slate-800 bg-[#0b1120] px-4 pt-3 pb-6 shadow-2xl space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            
            <div className="space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-800/80 active:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-blue-400" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => scrollToSection('questions')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-800/80 active:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>IMP Questions Bank</span>
                </div>
                <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">K & I</span>
              </button>

              <button
                onClick={() => scrollToSection('about')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-800/80 active:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>About Pratik</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Mobile Direct Social CTAs */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <a
                href={APP_CONFIG.SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold shadow-md active:scale-98 transition-transform"
              >
                <div className="flex items-center gap-2.5">
                  <YouTubeIcon className="w-4 h-4" />
                  <span>Subscribe on YouTube</span>
                </div>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full">5.26K+ Subs</span>
              </a>

              <a
                href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold shadow-md active:scale-98 transition-transform"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Join WhatsApp Channel</span>
                </div>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full">PDF Alerts</span>
              </a>

              <a
                href={APP_CONFIG.SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-pink-500/30 text-pink-300 text-xs font-bold hover:bg-slate-800 active:scale-98 transition-transform"
              >
                <div className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4" />
                  <span>Exam Doubts? DM on Instagram</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
              </a>
            </div>

            {/* Admin Exit if in admin view */}
            {currentView === 'admin' && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentView('public');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold"
                >
                  <Shield className="w-4 h-4 text-red-400" />
                  <span>Exit Admin Dashboard</span>
                </button>
              </div>
            )}

          </div>
        </>
      )}
    </header>
  );
}

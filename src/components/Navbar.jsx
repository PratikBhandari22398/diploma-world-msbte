import React, { useState } from 'react';
import { Youtube, MessageCircle, Shield } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';

export default function Navbar({ currentView, setCurrentView }) {
  // Secret: Triple click on logo opens Admin Panel
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 3) {
      setCurrentView(currentView === 'admin' ? 'public' : 'admin');
      setClickCount(0);
    } else {
      setTimeout(() => setClickCount(0), 1200);
    }
  };

  const scrollToSection = (id) => {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand (Triple click logo for secret admin access) */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          title="Diploma World MSBTE"
        >
          <div className="w-10 h-10 rounded-full border-2 border-amber-500 overflow-hidden bg-black p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <img src="/assets/logo.png" alt="Diploma World MSBTE Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-white text-base tracking-tight leading-none group-hover:text-amber-400 transition-colors">
              Diploma World <span className="text-amber-500 text-xs font-bold uppercase tracking-wider ml-1">MSBTE</span>
            </div>
            <div className="text-[11px] font-medium text-slate-400 hidden sm:block">Maharashtra Polytechnic Hub</div>
          </div>
        </div>

        {/* Proper Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-6">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            Home
          </button>

          <button 
            onClick={() => scrollToSection('questions')}
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            IMP Questions
          </button>

          <button 
            onClick={() => scrollToSection('about')}
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            About Pratik
          </button>

          {/* Social Quick Action Buttons */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <a
              href={APP_CONFIG.SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-bold transition-all shadow-sm"
              title="Subscribe on YouTube"
            >
              <Youtube className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline">Subscribe</span>
            </a>

            <a
              href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all shadow-sm"
              title="Join WhatsApp Channel"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline">WhatsApp</span>
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

      </div>
    </header>
  );
}

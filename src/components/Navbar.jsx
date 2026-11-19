import React from 'react';
import { Shield, Sparkles, Youtube, MessageCircle, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('public')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-amber-500 overflow-hidden bg-black p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <img src="/assets/logo.png" alt="Diploma World Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-white text-base tracking-tight leading-none group-hover:text-amber-400 transition-colors">
              Diploma World <span className="text-amber-500 text-xs font-bold uppercase tracking-wider ml-1">MSBTE</span>
            </div>
            <div className="text-[11px] font-medium text-slate-400">Maharashtra Exam Portal</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-6">
          <button 
            onClick={() => setCurrentView('public')}
            className={`text-sm font-semibold transition-colors px-2 py-1 rounded-md ${currentView === 'public' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Question Bank
          </button>

          <a 
            href="#about"
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors hidden sm:inline-block"
          >
            About Pratik
          </a>

          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'public' : 'admin')}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              currentView === 'admin' 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20' 
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{currentView === 'admin' ? 'Exit Admin' : 'Admin'}</span>
          </button>
        </nav>

      </div>
    </header>
  );
}

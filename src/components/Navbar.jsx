import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView }) {
  // Secret Trick: 3 quick clicks on logo opens Admin Panel
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      setCurrentView(currentView === 'admin' ? 'public' : 'admin');
      setClickCount(0);
    } else {
      setTimeout(() => setClickCount(0), 1200);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand (Secret: Triple click the logo to open Admin) */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group"
          title="Diploma World MSBTE"
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

        {/* Public Nav Links (Hidden Admin Button from students) */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={() => setCurrentView('public')}
            className={`text-sm font-semibold transition-colors px-2 py-1 rounded-md ${currentView === 'public' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Question Bank
          </button>

          <a 
            href="#about"
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            About Pratik
          </a>

          {/* If currently in admin view, show Exit button */}
          {currentView === 'admin' && (
            <button
              onClick={() => setCurrentView('public')}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 transition-all"
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

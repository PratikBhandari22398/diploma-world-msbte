import React from 'react';
import { Youtube, MessageCircle, Users, CheckCircle2, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';

export default function Hero({ visitorCount }) {
  return (
    <section className="relative pt-12 pb-14 border-b border-slate-800/80 bg-gradient-to-b from-[#0f172a]/60 to-[#080d1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Academic Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>MSBTE Board Exams • Winter/Summer Question Bank</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.15] mb-5">
          Important Questions for <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-400">
            MSBTE Diploma Exams
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
          Targeted, high-yield Important Questions (IMP) and last-minute exam prep tailored for MSBTE K-Scheme & I-Scheme polytechnic students across Maharashtra.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
          <a
            href={APP_CONFIG.SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Youtube className="w-5 h-5 fill-current" />
            <span>Subscribe on YouTube</span>
          </a>

          <a
            href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Join WhatsApp Channel</span>
          </a>
        </div>

        {/* Real Visitor Counter & Trust Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Users className="w-4 h-4 text-emerald-400" />
            <span><strong className="text-white font-bold text-sm">{visitorCount.toLocaleString()}</strong> Students Visited</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>K-Scheme & I-Scheme</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>100% Free Verified IMPs</span>
          </div>
        </div>

      </div>
    </section>
  );
}

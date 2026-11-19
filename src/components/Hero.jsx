import React from 'react';
import { Users, CheckCircle2, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';
import { YouTubeIcon, WhatsAppIcon } from './BrandIcons';

export default function Hero() {
  return (
    <section id="home" className="relative pt-12 pb-14 border-b border-slate-800/80 bg-gradient-to-b from-[#0f172a]/60 to-[#080d1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Academic Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] sm:text-xs font-bold tracking-wide uppercase mb-5 sm:mb-6 shadow-sm max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse flex-shrink-0" />
          <span className="truncate sm:whitespace-normal">MSBTE Board Exams • Question Bank</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.2] mb-4 sm:mb-5">
          Important Questions for <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-400">
            MSBTE Diploma Exams
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
          Targeted, high-yield Important Questions (IMP) and last-minute exam prep tailored for MSBTE K-Scheme & I-Scheme polytechnic students across Maharashtra.
        </p>

        {/* Big High-Converting CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-lg mx-auto mb-8 sm:mb-10 px-1 sm:px-0">
          <a
            href={APP_CONFIG.SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex flex-col items-center justify-center py-3.5 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-[0.98] text-white shadow-lg shadow-red-600/30 transition-all border border-red-400/20 group cursor-pointer"
          >
            <div className="flex items-center gap-2 font-heading font-extrabold text-sm sm:text-base">
              <YouTubeIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Subscribe on YouTube</span>
            </div>
            <span className="text-[11px] text-red-100 font-medium mt-0.5">
              {APP_CONFIG.STATS.subscribers} Subscribers • {APP_CONFIG.STATS.channelViews} Video Views
            </span>
          </a>

          <a
            href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex flex-col items-center justify-center py-3.5 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:scale-[0.98] text-white shadow-lg shadow-emerald-600/30 transition-all border border-emerald-400/20 group cursor-pointer"
          >
            <div className="flex items-center gap-2 font-heading font-extrabold text-sm sm:text-base">
              <WhatsAppIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Join WhatsApp Channel</span>
            </div>
            <span className="text-[11px] text-emerald-100 font-medium mt-0.5">
              Instant Question Paper PDF Alerts
            </span>
          </a>
        </div>

        {/* Real YouTube Subscribers & Educational Trust Highlights (Symmetrical 2x2 grid on mobile) */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-2 sm:gap-4 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <YouTubeIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate"><strong className="text-white font-bold">{APP_CONFIG.STATS.subscribers}</strong> YouTube</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <TrendingUp className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span className="truncate"><strong className="text-white font-bold">{APP_CONFIG.STATS.channelViews}</strong> Views</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <BookOpen className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span className="truncate"><strong className="text-white font-bold">{APP_CONFIG.STATS.videosCount}</strong> Lectures</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">K & I Schemes</span>
          </div>
        </div>

      </div>
    </section>
  );
}

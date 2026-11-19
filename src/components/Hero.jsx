import React from 'react';
import { Users, CheckCircle2, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';
import { YouTubeIcon, WhatsAppIcon } from './BrandIcons';

export default function Hero() {
  return (
    <section id="home" className="relative pt-12 pb-14 border-b border-slate-800/80 bg-gradient-to-b from-[#0f172a]/60 to-[#080d1a]">
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

        {/* Big High-Converting CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-10">
          <a
            href={APP_CONFIG.SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex flex-col items-center justify-center py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-red-400/20 group"
          >
            <div className="flex items-center gap-2 font-heading font-extrabold text-sm sm:text-base">
              <YouTubeIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Subscribe on YouTube</span>
            </div>
            <span className="text-[11px] text-red-200 font-medium mt-0.5">
              {APP_CONFIG.STATS.subscribers} Subscribers • {APP_CONFIG.STATS.channelViews} Video Views
            </span>
          </a>

          <a
            href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex flex-col items-center justify-center py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-emerald-400/20 group"
          >
            <div className="flex items-center gap-2 font-heading font-extrabold text-sm sm:text-base">
              <WhatsAppIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Join WhatsApp Channel</span>
            </div>
            <span className="text-[11px] text-emerald-200 font-medium mt-0.5">
              Instant Question Paper PDF Alerts
            </span>
          </a>
        </div>

        {/* Real YouTube Subscribers & Educational Trust Highlights (No Public Visitor Count) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <YouTubeIcon className="w-4 h-4" />
            <span><strong className="text-white font-bold text-sm">{APP_CONFIG.STATS.subscribers}</strong> YouTube Subscribers</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <TrendingUp className="w-4 h-4 text-red-400" />
            <span><strong className="text-white font-bold text-sm">{APP_CONFIG.STATS.channelViews}</strong> Video Views</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span><strong className="text-white font-bold text-sm">{APP_CONFIG.STATS.videosCount}</strong> Video Lectures</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>K & I Scheme Verified IMPs</span>
          </div>
        </div>

      </div>
    </section>
  );
}

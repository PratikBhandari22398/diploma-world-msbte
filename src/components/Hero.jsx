import React from 'react';
import { Users, CheckCircle2, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';
import { YouTubeIcon, WhatsAppIcon } from './BrandIcons';
import AnimatedCounter from './AnimatedCounter';

export default function Hero() {
  return (
    <section id="home" className="relative pt-7 pb-9 sm:pt-12 sm:pb-14 border-b border-slate-800/80 bg-gradient-to-b from-[#0f172a]/60 to-[#080d1a]">
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 text-center">
        
        {/* Academic Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] sm:text-xs font-bold tracking-wide uppercase mb-4 sm:mb-6 shadow-sm max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse flex-shrink-0" />
          <span className="truncate sm:whitespace-normal">MSBTE Board Exams • Question Bank</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.2] mb-3 sm:mb-5">
          Important Questions for <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-400">
            MSBTE Diploma Exams
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-slate-300 text-xs sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 px-1 sm:px-0">
          Targeted, high-yield Important Questions (IMP) and last-minute exam prep tailored for MSBTE K-Scheme & I-Scheme polytechnic students across Maharashtra.
        </p>

        {/* Premium Compact CTA Buttons (Soft Corners, Minimal Text) */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto mb-7 sm:mb-9 px-2">
          <a
            href={APP_CONFIG.SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#FF0000] to-[#D90000] hover:from-[#E60000] hover:to-[#B30000] active:scale-95 text-white shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/40 border border-red-400/30 transition-all transform hover:-translate-y-0.5 group cursor-pointer"
            title="Subscribe on YouTube"
          >
            <div className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center p-0.5 flex-shrink-0 group-hover:scale-105 transition-transform">
              <YouTubeIcon className="w-4 h-4" />
            </div>
            <span className="font-heading font-extrabold text-xs sm:text-sm tracking-wide">YouTube</span>
          </a>

          <a
            href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20BA5A] hover:to-[#17A04D] active:scale-95 text-white shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/40 border border-emerald-400/30 transition-all transform hover:-translate-y-0.5 group cursor-pointer"
            title="Join WhatsApp Channel"
          >
            <div className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center p-0.5 flex-shrink-0 group-hover:scale-105 transition-transform">
              <WhatsAppIcon className="w-4 h-4" />
            </div>
            <span className="font-heading font-extrabold text-xs sm:text-sm tracking-wide">WhatsApp</span>
          </a>
        </div>

        {/* Real YouTube Subscribers & Educational Trust Highlights with Counting Effect */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-2 sm:gap-4 pt-5 sm:pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <YouTubeIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">
              <strong className="text-white font-bold font-mono">
                <AnimatedCounter target={5.26} suffix="K+" decimals={2} duration={1600} />
              </strong> YouTube
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span className="truncate">
              <strong className="text-white font-bold font-mono">
                <AnimatedCounter target={1.37} suffix="M+" decimals={2} duration={1800} />
              </strong> Views
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span className="truncate">
              <strong className="text-white font-bold font-mono">
                <AnimatedCounter target={236} suffix="+" duration={1500} />
              </strong> Lectures
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate font-medium">K & I Schemes</span>
          </div>
        </div>

      </div>
    </section>
  );
}

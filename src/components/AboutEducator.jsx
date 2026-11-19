import React from 'react';
import { Twitter, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';
import { YouTubeIcon, WhatsAppIcon, InstagramIcon } from './BrandIcons';

export default function AboutEducator() {
  return (
    <section id="about" className="py-16 border-t border-slate-800 bg-[#0f172a]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-lg">
          
          {/* Avatar with gold border */}
          <div className="w-24 h-24 rounded-full border-4 border-amber-500 mx-auto mb-4 overflow-hidden shadow-xl shadow-amber-500/10 bg-black">
            <img src="/assets/logo.png" alt="Pratik - Diploma World MSBTE" className="w-full h-full object-cover" />
          </div>

          {/* Verified Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified MSBTE Educator</span>
          </div>

          <h3 className="text-2xl font-heading font-extrabold text-white mb-2">
            {APP_CONFIG.AUTHOR_NAME}
          </h3>

          <div className="mb-4">
            <a
              href={APP_CONFIG.SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-amber-500/15 border border-pink-500/30 text-pink-300 hover:text-white text-xs sm:text-sm font-bold tracking-wide transition-all hover:scale-105 hover:border-pink-400 shadow-sm shadow-pink-500/10 cursor-pointer"
              title="Send DM on Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Any doubt? Instagram pe DM karo</span>
              <span className="text-[11px] text-pink-400/80 font-medium">(@diplo.verse)</span>
            </a>
          </div>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            {APP_CONFIG.AUTHOR_BIO}
          </p>

          {/* Official Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_CONFIG.SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 text-slate-200 hover:text-white text-xs font-bold transition-all group"
            >
              <YouTubeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>YouTube Channel</span>
            </a>

            <a
              href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-200 hover:text-white text-xs font-bold transition-all group"
            >
              <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>WhatsApp Channel</span>
            </a>

            <a
              href={APP_CONFIG.SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-pink-500/50 hover:bg-pink-500/10 text-slate-200 hover:text-white text-xs font-bold transition-all group"
            >
              <InstagramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Instagram DM</span>
            </a>

            <a
              href={APP_CONFIG.SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-sky-500/50 hover:bg-sky-500/10 text-slate-200 hover:text-sky-400 text-xs font-bold transition-all"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              <span>X (Twitter)</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

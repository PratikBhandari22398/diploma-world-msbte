import React from 'react';
import { Youtube, MessageCircle, Instagram, Twitter, CheckCircle2, Award } from 'lucide-react';
import { APP_CONFIG } from '../lib/supabase';

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

          <h3 className="text-2xl font-heading font-extrabold text-white mb-1">
            {APP_CONFIG.AUTHOR_NAME}
          </h3>

          <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">
            {APP_CONFIG.AUTHOR_ROLE}
          </p>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            {APP_CONFIG.AUTHOR_BIO}
          </p>

          {/* Official Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_CONFIG.SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 text-slate-200 hover:text-red-400 text-xs font-bold transition-all"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>YouTube</span>
            </a>

            <a
              href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-200 hover:text-emerald-400 text-xs font-bold transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp Channel</span>
            </a>

            <a
              href={APP_CONFIG.SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-pink-500/50 hover:bg-pink-500/10 text-slate-200 hover:text-pink-400 text-xs font-bold transition-all"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Instagram</span>
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

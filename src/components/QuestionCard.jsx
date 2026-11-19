import React, { useState } from 'react';
import { Calendar, Flame, Copy, Check, Lock, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';

export default function QuestionCard({ post, isUnlocked, onUnlockClick, showToast }) {
  const [copied, setCopied] = useState(false);

  // Check if updated/created within last 24h
  const postDate = new Date(post.created_at || Date.now());
  const isUpdatedToday = (Date.now() - postDate.getTime()) <= 24 * 60 * 60 * 1000;

  // Format exam date
  let examDateStr = '';
  if (post.exam_date) {
    try {
      const d = new Date(post.exam_date);
      examDateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      examDateStr = post.exam_date;
    }
  }

  // Split questions
  const questionsList = (post.questions || '')
    .split('\n')
    .map(q => q.trim())
    .filter(q => q.length > 0);

  const handleCopyAll = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(post.questions).then(() => {
      setCopied(true);
      showToast('📋 All questions copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out MSBTE IMP Questions for ${post.subject} on Diploma World MSBTE!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyAll();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between group">
      
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/25">
            {post.scheme}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/25">
            {post.semester}
          </span>
          {examDateStr && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25">
              <Calendar className="w-3.5 h-3.5" />
              <span>Exam: {examDateStr}</span>
            </span>
          )}
          {isUpdatedToday && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-red-500/15 text-red-300 border border-red-500/30 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-red-400 fill-current" />
              <span>Updated Today</span>
            </span>
          )}
        </div>

        {/* Title & Subject */}
        <h3 className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight leading-snug mb-1 group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-sky-400 mb-4 sm:mb-5 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <span>{post.subject}</span>
        </p>

        {/* Questions Box */}
        {isUnlocked ? (
          <div className="bg-[#0b1120] border border-slate-800/80 rounded-xl p-3 sm:p-4 mb-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400 font-semibold">
              <span>Questions List ({questionsList.length})</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyAll}
                  className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-2 py-1 rounded"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy All'}</span>
                </button>
              </div>
            </div>

            <ul className="space-y-2.5 text-sm text-slate-300">
              {questionsList.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-bold text-amber-400 text-xs mt-0.5 flex-shrink-0 font-mono">
                    Q.{idx + 1}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="relative bg-[#0b1120] border border-slate-800/80 rounded-xl min-h-[220px] p-5 mb-4 overflow-hidden flex flex-col items-center justify-center">
            {/* Background Blurred Skeleton / Questions Preview */}
            <div className="absolute inset-0 p-4 filter blur-[5px] select-none opacity-20 pointer-events-none space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-amber-400 text-xs font-mono">Q.1</span>
                <span>{questionsList[0] || 'Explain relational database concepts and architecture...'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-amber-400 text-xs font-mono">Q.2</span>
                <span>{questionsList[1] || 'State and describe ACID properties of transaction management...'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-amber-400 text-xs font-mono">Q.3</span>
                <span>Explain Normalization: Define 1NF, 2NF, and 3NF with table examples...</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-amber-400 text-xs font-mono">Q.4</span>
                <span>Compare Primary Key vs Foreign Key constraints in SQL...</span>
              </div>
            </div>

            {/* Lock Overlay Prompt (Centered, cleanly padded, never cut off) */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm mx-auto py-2">
              <div className="w-11 h-11 rounded-full bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 mb-2.5 shadow-lg shadow-amber-500/10">
                <Lock className="w-5 h-5" />
              </div>
              <div className="font-heading font-extrabold text-white text-base sm:text-lg mb-1 tracking-tight">
                Unlock Question Paper
              </div>
              <p className="text-xs text-slate-300 max-w-xs mb-3.5 leading-relaxed">
                Fill any 2 basic details to view all {Math.max(questionsList.length, 10)} board exam questions instantly.
              </p>
              <button
                onClick={onUnlockClick}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Unlock Questions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-500">
        <span>Posted: {postDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        <span className="text-slate-400 font-semibold">MSBTE Verified</span>
      </div>

    </div>
  );
}

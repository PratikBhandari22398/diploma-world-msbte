import React, { useState } from 'react';
import { X, Lock, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';

export default function EntryGateModal({ isOpen, onClose, onSuccess, showToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Calculate filled count
  let filledCount = 0;
  if (name.trim()) filledCount++;
  if (email.trim()) filledCount++;
  if (college.trim()) filledCount++;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation 1: Email format if entered
    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setError('Please enter a valid email address (e.g. name@gmail.com).');
        return;
      }
    }

    // Validation 2: At least ANY 2 of 3
    if (filledCount < 2) {
      setError('Please fill at least ANY 2 details (Name, Email, or College/City).');
      return;
    }

    setLoading(true);

    try {
      // Insert into Supabase leads table
      await supabase.from('leads').insert([{
        name: name.trim() || null,
        email: email.trim() || null,
        college_city: college.trim() || null
      }]);
    } catch (err) {
      console.warn('Lead insert error:', err);
    }

    // Persist in localStorage so it never asks again on this device
    localStorage.setItem('dw_lead_submitted', 'true');

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    setLoading(false);
    onSuccess();
    onClose();
    showToast('🎉 IMP Questions Unlocked! Best of luck for MSBTE Exams!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#131d31] border border-slate-700 rounded-2xl p-5 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-extrabold text-xl text-white mb-1">
            Unlock MSBTE Question Bank
          </h3>
          <p className="text-xs text-slate-300">
            Fill any 2 basic details to get instant access to verified exam question sets.
          </p>
        </div>

        {/* Progress Pill */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 mb-5 text-xs flex items-center justify-between">
          <span className="text-slate-400">Requirement: Any 2 details</span>
          <span className={`font-bold flex items-center gap-1 ${filledCount >= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {filledCount >= 2 && <CheckCircle2 className="w-3.5 h-3.5" />}
            {filledCount >= 2 ? 'Ready to Unlock!' : `${filledCount} of 2 filled`}
          </span>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-xs mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Patil"
              className="w-full bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@gmail.com"
              className="w-full bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Polytechnic College / City</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g. Govt Polytechnic Pune / Mumbai"
              className="w-full bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <p className="text-[11px] text-slate-400 text-center pt-1">
            🔒 Your details are strictly used for exam updates. No spam.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
          >
            <span>{loading ? 'Unlocking...' : 'Unlock All IMP Questions'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

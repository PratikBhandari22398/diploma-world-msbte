import React from 'react';
import { Search, Filter, BookMarked, Layers } from 'lucide-react';

export default function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedSem, 
  setSelectedSem, 
  selectedScheme, 
  setSelectedScheme,
  posts 
}) {
  const semesters = ['all', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];
  const schemes = ['all', 'K-Scheme', 'I-Scheme'];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg mb-8 space-y-4">
      
      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by subject name or code (e.g. Operating Systems, 313301, Java)..."
          className="w-full bg-[#080d1a] border border-slate-700/80 text-white placeholder-slate-500 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Filter Tabs Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        
        {/* Semester Segmented Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1.5 flex items-center gap-1 flex-shrink-0">
            <Layers className="w-3.5 h-3.5" />
            <span>Sem:</span>
          </span>
          {semesters.map((sem) => {
            const isActive = selectedSem.toLowerCase() === sem.toLowerCase();
            return (
              <button
                key={sem}
                onClick={() => setSelectedSem(sem)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {sem === 'all' ? 'All Semesters' : sem}
              </button>
            );
          })}
        </div>

        {/* Scheme Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1.5 flex items-center gap-1 flex-shrink-0">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Scheme:</span>
          </span>
          {schemes.map((scheme) => {
            const isActive = selectedScheme.toLowerCase() === scheme.toLowerCase();
            return (
              <button
                key={scheme}
                onClick={() => setSelectedScheme(scheme)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {scheme === 'all' ? 'All Schemes' : scheme}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}

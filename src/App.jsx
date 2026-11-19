import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import QuestionCard from './components/QuestionCard';
import EntryGateModal from './components/EntryGateModal';
import AboutEducator from './components/AboutEducator';
import AdminDashboard from './components/AdminDashboard';
import { supabase, APP_CONFIG } from './lib/supabase';
import { YouTubeIcon, WhatsAppIcon, InstagramIcon } from './components/BrandIcons';

export default function App() {
  const [currentView, setCurrentView] = useState('public'); // 'public' | 'admin'
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSem, setSelectedSem] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState('all');

  // Check URL path or hash for /admin
  useEffect(() => {
    if (window.location.pathname.includes('/admin') || window.location.hash.includes('admin')) {
      setCurrentView('admin');
    }

    // Secret Keyboard Shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentView((prev) => (prev === 'admin' ? 'public' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Check entry gate submission state
    const submitted = localStorage.getItem('dw_lead_submitted') === 'true';
    setIsUnlocked(submitted);

    // Track unique visitor quietly in the background for Admin Panel
    trackVisitorQuietly();

    // Fetch posts
    fetchPosts();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const trackVisitorQuietly = async () => {
    let visitorId = localStorage.getItem('dw_visitor_id');
    if (!visitorId) {
      visitorId = 'dw_v_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      localStorage.setItem('dw_visitor_id', visitorId);
    }

    try {
      await supabase.rpc('record_visitor', { p_visitor_id: visitorId });
    } catch (err) {
      console.warn('Visitor counter error:', err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('imp_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setPosts(data);
      }
    } catch (err) {
      console.warn('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (selectedSem !== 'all' && post.semester.toLowerCase() !== selectedSem.toLowerCase()) {
      return false;
    }
    if (selectedScheme !== 'all' && post.scheme.toLowerCase() !== selectedScheme.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (post.title || '').toLowerCase().includes(q);
      const matchSub = (post.subject || '').toLowerCase().includes(q);
      const matchQ = (post.questions || '').toLowerCase().includes(q);
      if (!matchTitle && !matchSub && !matchQ) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-200">
      
      {/* Top Notice */}
      <div className="bg-[#1e1b4b] border-b border-indigo-900/50 py-1.5 px-3 sm:px-4 text-center text-[11px] sm:text-xs text-indigo-200 font-semibold leading-tight">
        📢 <strong>MSBTE Question Banks:</strong> Verified K-Scheme & I-Scheme high-yield exam questions are live!
      </div>

      {/* Sticky Header with Proper Working Nav Options */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main View Switch */}
      {currentView === 'admin' ? (
        <main className="flex-grow">
          <AdminDashboard showToast={showToast} />
        </main>
      ) : (
        <main className="flex-grow">
          
          {/* Hero Section (Showcases 5.26K+ Subscribers, no public visitor count) */}
          <Hero />

          {/* Question Bank Feed */}
          <section id="questions" className="max-w-6xl mx-auto px-3.5 sm:px-6 py-8 sm:py-12 scroll-mt-20">
            
            <div className="mb-5 sm:mb-6">
              <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                MSBTE Important Questions (IMP)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Handpicked questions updated before each examination. Filter by semester & scheme.
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedSem={selectedSem}
              setSelectedSem={setSelectedSem}
              selectedScheme={selectedScheme}
              setSelectedScheme={setSelectedScheme}
              posts={posts}
            />

            {/* Questions Grid */}
            {loading ? (
              <div className="text-center py-16 text-slate-400 text-sm">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p>Loading latest MSBTE question papers...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-1">No Question Papers Found</h3>
                <p className="text-xs text-slate-400">Try clearing your search query or selecting another semester filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <QuestionCard
                    key={post.id}
                    post={post}
                    isUnlocked={isUnlocked}
                    onUnlockClick={() => setIsGateOpen(true)}
                    showToast={showToast}
                  />
                ))}
              </div>
            )}

          </section>

          {/* About Pratik Section */}
          <AboutEducator />

        </main>
      )}

      {/* Entry Gate Modal */}
      <EntryGateModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        onSuccess={() => setIsUnlocked(true)}
        showToast={showToast}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#050811] pt-8 pb-32 sm:pb-12 text-center text-xs text-slate-400 select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/assets/logo.png" alt="Diploma World MSBTE" className="w-7 h-7 rounded-full border border-amber-500" />
            <span className="font-heading font-extrabold text-white text-sm">Diploma World MSBTE</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-4 text-slate-300">
            <a href={APP_CONFIG.SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors group">
              <YouTubeIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>YouTube</span>
            </a>
            <a href={APP_CONFIG.SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors group">
              <WhatsAppIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>WhatsApp</span>
            </a>
            <a href={APP_CONFIG.SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors group">
              <InstagramIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>Instagram</span>
            </a>
            <a href={APP_CONFIG.SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
              X (Twitter)
            </a>
          </div>

          <p className="text-slate-500 max-w-xl mx-auto mb-2 text-[11px] leading-relaxed px-2">
            Disclaimer: Diploma World MSBTE is an independent student support initiative founded by Pratik and is not officially affiliated with MSBTE.
          </p>

          <p className="text-slate-400 text-[11px] flex items-center justify-center gap-1">
            <span>&copy; 2026 Diploma World MSBTE. All rights reserved. Made with ❤️ for MSBTE Students.</span>
            <span 
              onClick={() => setCurrentView('admin')}
              className="cursor-pointer text-slate-700 hover:text-slate-500 transition-colors ml-1 p-0.5"
              title="Portal"
            >
              🔒
            </span>
          </p>
        </div>
      </footer>

      {/* Sticky Mobile Floating Action Bar (App-like touch experience with safe area) */}
      {currentView === 'public' && (
        <aside aria-label="Mobile quick actions" className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#0b1120]/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2 shadow-2xl flex items-center justify-between gap-2 shadow-black/80 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <a
            href={APP_CONFIG.SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center p-0.5 flex-shrink-0 shadow-sm">
              <YouTubeIcon className="w-4 h-4" />
            </div>
            <span className="truncate">YouTube (5.26K+)</span>
          </a>

          <a
            href={APP_CONFIG.SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center p-0.5 flex-shrink-0 shadow-sm">
              <WhatsAppIcon className="w-4 h-4" />
            </div>
            <span className="truncate">WhatsApp PDFs</span>
          </a>
        </aside>
      )}

      {/* Toast Notification (Offset above mobile floating bar on mobile) */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-50 bg-slate-900 border border-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xl animate-bounce-in max-w-[90vw]">
          {toastMessage}
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Users, 
  FileText, 
  UserCheck, 
  Download, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  LogOut, 
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import Chart from 'chart.js/auto';
import { supabase } from '../lib/supabase';
import AnimatedCounter from './AnimatedCounter';

export default function AdminDashboard({ showToast }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard Data
  const [stats, setStats] = useState({
    totalVisitors: 0,
    visitorsToday: 0,
    totalLeads: 0,
    leadsToday: 0,
    totalPosts: 0,
  });
  const [posts, setPosts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [leadsSearch, setLeadsSearch] = useState('');

  // Post Form State
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postSubject, setPostSubject] = useState('');
  const [postSemester, setPostSemester] = useState('Sem 3');
  const [postScheme, setPostScheme] = useState('K-Scheme');
  const [postExamDate, setPostExamDate] = useState('');
  const [postQuestions, setPostQuestions] = useState('');
  const [postPublished, setPostPublished] = useState(true);
  const [savingPost, setSavingPost] = useState(false);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Check Auth Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Data when authenticated
  useEffect(() => {
    if (session) {
      loadAdminData();
    }
  }, [session]);

  const getLocalDateString = (d) => {
    if (!d) return '';
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const loadAdminData = async () => {
    try {
      const todayStr = getLocalDateString(new Date());

      // 1. Visitors
      const { data: vData } = await supabase.from('visitors').select('*');
      const visitors = vData || [];
      const vToday = visitors.filter(v => getLocalDateString(v.last_seen || v.first_seen) === todayStr).length;

      // 2. Leads
      const { data: lData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      const allLeads = lData || [];
      const lToday = allLeads.filter(l => getLocalDateString(l.created_at) === todayStr).length;

      // 3. Posts
      const { data: pData } = await supabase.from('imp_posts').select('*').order('created_at', { ascending: false });
      const allPosts = pData || [];

      setStats({
        totalVisitors: visitors.length,
        visitorsToday: vToday,
        totalLeads: allLeads.length,
        leadsToday: lToday,
        totalPosts: allPosts.length,
      });

      setPosts(allPosts);
      setLeads(allLeads);

      // Render chart
      render14DayChart(visitors);
    } catch (err) {
      console.warn('Error loading admin metrics:', err);
    }
  };

  const render14DayChart = (visitors) => {
    if (!chartRef.current) return;

    const days = 14;
    const labels = [];
    const counts = [];
    const mapCounts = {};

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = getLocalDateString(d);
      const displayLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      labels.push(displayLabel);
      mapCounts[key] = 0;
    }

    visitors.forEach(v => {
      const dateKey = getLocalDateString(v.last_seen || v.first_seen);
      if (mapCounts[dateKey] !== undefined) {
        mapCounts[dateKey]++;
      }
    });

    Object.keys(mapCounts).forEach(k => counts.push(mapCounts[k]));

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Daily Students',
          data: counts,
          borderColor: '#38bdf8',
          borderWidth: 2,
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#f59e0b',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
          y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8', precision: 0 } }
        }
      }
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message || 'Login failed. Check admin email & password.');
    } else {
      showToast('Logged in as Admin!');
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    showToast('Signed out successfully.');
  };

  // Post CRUD
  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!postTitle || !postSubject || !postQuestions) {
      alert('Please fill Title, Subject, and at least 1 Question.');
      return;
    }

    setSavingPost(true);
    const payload = {
      title: postTitle.trim(),
      subject: postSubject.trim(),
      semester: postSemester,
      scheme: postScheme,
      exam_date: postExamDate || null,
      questions: postQuestions.trim(),
      published: postPublished,
      updated_at: new Date().toISOString()
    };

    try {
      if (formMode === 'edit' && editingId) {
        const { error } = await supabase.from('imp_posts').update(payload).eq('id', editingId);
        if (error) throw error;
        showToast('✅ Post updated!');
      } else {
        payload.created_at = new Date().toISOString();
        const { error } = await supabase.from('imp_posts').insert([payload]);
        if (error) throw error;
        showToast('✅ New IMP Post published!');
      }

      resetForm();
      loadAdminData();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSavingPost(false);
    }
  };

  const handleEditClick = (post) => {
    setFormMode('edit');
    setEditingId(post.id);
    setPostTitle(post.title);
    setPostSubject(post.subject);
    setPostSemester(post.semester);
    setPostScheme(post.scheme);
    setPostExamDate(post.exam_date || '');
    setPostQuestions(post.questions);
    setPostPublished(post.published);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormMode('create');
    setEditingId(null);
    setPostTitle('');
    setPostSubject('');
    setPostSemester('Sem 3');
    setPostScheme('K-Scheme');
    setPostExamDate('');
    setPostQuestions('');
    setPostPublished(true);
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Delete this question set? This cannot be undone.')) return;
    try {
      await supabase.from('imp_posts').delete().eq('id', id);
      showToast('Post deleted.');
      loadAdminData();
    } catch (err) {
      alert('Delete error: ' + err.message);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await supabase.from('imp_posts').update({ published: !currentStatus }).eq('id', id);
      loadAdminData();
    } catch (err) {
      alert('Error updating: ' + err.message);
    }
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    if (!leads || leads.length === 0) {
      alert('No leads to export.');
      return;
    }
    const headers = ['ID', 'Student Name', 'Email', 'College / City', 'Date'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.college_city || '').replace(/"/g, '""')}"`,
      `"${l.created_at}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `msbte_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter leads
  const filteredLeads = leads.filter(l => {
    const q = leadsSearch.toLowerCase();
    return (l.name || '').toLowerCase().includes(q) ||
           (l.email || '').toLowerCase().includes(q) ||
           (l.college_city || '').toLowerCase().includes(q);
  });

  // Login View if not authenticated
  if (!session) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full border-2 border-amber-500 mx-auto mb-4 overflow-hidden bg-black p-1 shadow-md">
            <img src="/assets/logo.png" alt="Diploma World Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-white mb-1">Admin Sign In</h2>
          <p className="text-xs text-slate-400 mb-6">Enter your Supabase credentials to access the admin portal.</p>

          {authError && (
            <div className="p-3 mb-4 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-xs text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pratik@diplomaworld.com"
                required
                className="w-full bg-[#080d1a] border border-slate-700 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#080d1a] border border-slate-700 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {authLoading ? 'Signing In...' : 'Sign In as Admin'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Admin Management Portal
          </h2>
          <p className="text-xs text-slate-400">
            Logged in as <span className="text-amber-400 font-semibold">{session.user.email}</span>
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 text-xs font-bold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* 5 Overview Metric Cards with Counting Effect */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Visitors</div>
          <div className="text-2xl font-heading font-extrabold text-sky-400 font-mono">
            <AnimatedCounter target={stats.totalVisitors} duration={1200} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Visitors Today</div>
          <div className="text-2xl font-heading font-extrabold text-amber-400 font-mono">
            <AnimatedCounter target={stats.visitorsToday} duration={1200} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Leads</div>
          <div className="text-2xl font-heading font-extrabold text-emerald-400 font-mono">
            <AnimatedCounter target={stats.totalLeads} duration={1200} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Leads Today</div>
          <div className="text-2xl font-heading font-extrabold text-amber-400 font-mono">
            <AnimatedCounter target={stats.leadsToday} duration={1200} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">IMP Posts</div>
          <div className="text-2xl font-heading font-extrabold text-blue-400 font-mono">
            <AnimatedCounter target={stats.totalPosts} duration={1200} />
          </div>
        </div>
      </div>

      {/* 14-Day Visitor Trend Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sky-400" />
            <h3 className="font-heading font-extrabold text-white text-base">Visitor Activity (Last 14 Days)</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">Real Unique Visitors</span>
        </div>
        <div className="h-60 w-full">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Post Manager (Fast Mobile Entry) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>{formMode === 'edit' ? 'Edit IMP Question Set' : 'Post New IMP Questions'}</span>
          </h3>
          <span className="text-xs text-blue-400 font-bold">Fast Exam-Night Posting</span>
        </div>

        <form onSubmit={handleSavePost} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Post Title *</label>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="e.g. Top 10 IMP Questions - Operating Systems"
                required
                className="w-full bg-[#080d1a] border border-slate-700 text-white px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Subject Name & Code *</label>
              <input
                type="text"
                value={postSubject}
                onChange={(e) => setPostSubject(e.target.value)}
                placeholder="e.g. Operating Systems (313301)"
                required
                className="w-full bg-[#080d1a] border border-slate-700 text-white px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Semester</label>
              <select
                value={postSemester}
                onChange={(e) => setPostSemester(e.target.value)}
                className="w-full bg-[#080d1a] border border-slate-700 text-white px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Sem 1">Sem 1</option>
                <option value="Sem 2">Sem 2</option>
                <option value="Sem 3">Sem 3</option>
                <option value="Sem 4">Sem 4</option>
                <option value="Sem 5">Sem 5</option>
                <option value="Sem 6">Sem 6</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Scheme</label>
              <select
                value={postScheme}
                onChange={(e) => setPostScheme(e.target.value)}
                className="w-full bg-[#080d1a] border border-slate-700 text-white px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="K-Scheme">K-Scheme (New 2023+)</option>
                <option value="I-Scheme">I-Scheme</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Exam Date</label>
              <input
                type="date"
                value={postExamDate}
                onChange={(e) => setPostExamDate(e.target.value)}
                className="w-full bg-[#080d1a] border border-slate-700 text-white px-3.5 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-300">Questions (One per line) *</label>
              <span className="text-[11px] text-amber-400 font-semibold">Press Enter for new question</span>
            </div>
            <textarea
              value={postQuestions}
              onChange={(e) => setPostQuestions(e.target.value)}
              placeholder="Explain the role of Operating System as Extended Machine...&#10;Compare Monolithic and Microkernel...&#10;What is Deadlock? State 4 conditions..."
              rows={6}
              required
              className="w-full bg-[#080d1a] border border-slate-700 text-white px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="publishedToggle"
              checked={postPublished}
              onChange={(e) => setPostPublished(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-800 border-slate-700"
            />
            <label htmlFor="publishedToggle" className="text-xs font-bold text-slate-300 cursor-pointer">
              Publish immediately (visible to all students)
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={savingPost}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
            >
              {savingPost ? 'Saving...' : formMode === 'edit' ? 'Update IMP Post' : 'Publish IMP Post'}
            </button>

            {formMode === 'edit' && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* Existing Posts List */}
        <div className="pt-6 border-t border-slate-800">
          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Existing Posts ({posts.length})</h4>
          <div className="space-y-2.5">
            {posts.map((p) => (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#080d1a] border border-slate-800 gap-3">
                <div>
                  <div className="text-sm font-bold text-white">{p.title}</div>
                  <div className="text-xs text-slate-400 flex flex-wrap gap-2 mt-1">
                    <span className="text-blue-400 font-semibold">{p.subject}</span>
                    <span>• {p.semester}</span>
                    <span>• {p.scheme}</span>
                    <span className={p.published ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                      {p.published ? '🟢 Published' : '🟡 Draft'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleTogglePublish(p.id, p.published)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                    title={p.published ? 'Hide' : 'Publish'}
                  >
                    {p.published ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => handleDeletePost(p.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Leads Table & Export */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-heading font-extrabold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>Student Leads ({leads.length})</span>
            </h3>
            <p className="text-xs text-slate-400">Captured via the entry gate modal</p>
          </div>

          <div className="flex items-center gap-2.5">
            <input
              type="text"
              value={leadsSearch}
              onChange={(e) => setLeadsSearch(e.target.value)}
              placeholder="Search leads..."
              className="bg-[#080d1a] border border-slate-700 text-white placeholder-slate-500 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#080d1a] text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">College / City</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">{l.name || 'Anonymous'}</td>
                  <td className="py-2.5 px-4 text-sky-400">{l.email || '-'}</td>
                  <td className="py-2.5 px-4">{l.college_city || '-'}</td>
                  <td className="py-2.5 px-4 text-slate-400">
                    {l.created_at ? new Date(l.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

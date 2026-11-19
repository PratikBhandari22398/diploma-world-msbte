/**
 * ==============================================================================
 * DIPLOMA WORLD MSBTE - ADMIN DASHBOARD LOGIC
 * ==============================================================================
 */

const adminState = {
  supabase: null,
  user: null,
  posts: [],
  leads: [],
  visitors: [],
  editingPostId: null,
  chartInstance: null
};

document.addEventListener('DOMContentLoaded', async () => {
  initAdminSupabase();
  await checkAuthSession();
});

/**
 * 1. Initialize Supabase Client
 */
function initAdminSupabase() {
  const config = window.APP_CONFIG || {};
  if (!config.SUPABASE_URL || config.SUPABASE_URL.includes("YOUR_PROJECT_ID")) {
    const errorNotice = document.getElementById('configNotice');
    if (errorNotice) errorNotice.style.display = 'block';
    return;
  }

  if (window.supabase) {
    adminState.supabase = window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
    
    // Listen for auth state changes
    adminState.supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        adminState.user = session.user;
        showDashboard();
      } else {
        adminState.user = null;
        showLogin();
      }
    });
  }
}

/**
 * 2. Auth Session Verification
 */
async function checkAuthSession() {
  if (!adminState.supabase) {
    showLogin();
    return;
  }

  try {
    const { data: { session }, error } = await adminState.supabase.auth.getSession();
    if (session && session.user) {
      adminState.user = session.user;
      showDashboard();
    } else {
      showLogin();
    }
  } catch (err) {
    console.error("Session check error:", err);
    showLogin();
  }
}

function showLogin() {
  document.getElementById('loginView').style.display = 'flex';
  document.getElementById('dashboardView').style.display = 'none';
  document.getElementById('adminNavPill').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginView').style.display = 'none';
  document.getElementById('dashboardView').style.display = 'block';
  document.getElementById('adminNavPill').style.display = 'flex';
  
  if (adminState.user && adminState.user.email) {
    document.getElementById('adminEmailDisplay').textContent = adminState.user.email;
  }

  loadAllAdminData();
}

/**
 * 3. Handle Admin Login
 */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('adminEmail').value || '').trim();
    const password = (document.getElementById('adminPassword').value || '').trim();
    const errorEl = document.getElementById('loginError');
    const submitBtn = document.getElementById('loginSubmitBtn');

    errorEl.style.display = 'none';

    if (!adminState.supabase) {
      errorEl.textContent = "Supabase URL is not configured yet. Please update config.js first!";
      errorEl.style.display = 'block';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Signing In...";

    try {
      const { data, error } = await adminState.supabase.auth.signInWithPassword({ email, password });
      if (error) {
        errorEl.textContent = error.message || "Invalid credentials. Please check your admin email & password.";
        errorEl.style.display = 'block';
      } else if (data && data.user) {
        adminState.user = data.user;
        showDashboard();
      }
    } catch (err) {
      errorEl.textContent = "Connection failed: " + err.message;
      errorEl.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Sign In as Admin";
    }
  });
}

/**
 * Handle Admin Sign Out
 */
const signOutBtn = document.getElementById('signOutBtn');
if (signOutBtn) {
  signOutBtn.addEventListener('click', async () => {
    if (adminState.supabase) {
      await adminState.supabase.auth.signOut();
    }
    showLogin();
  });
}

/**
 * 4. Load All Admin Data (Overview, Chart, Posts, Leads)
 */
async function loadAllAdminData() {
  await Promise.all([
    fetchAdminOverview(),
    fetchAdminPosts(),
    fetchAdminLeads()
  ]);
}

/**
 * 5. Fetch Overview Metrics & 14-Day Visitor Chart
 */
async function fetchAdminOverview() {
  if (!adminState.supabase) return;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayIso = today.toISOString();

    // 1. Visitors Data (Full table query allowed for authenticated admin via RLS)
    const { data: visitorsData } = await adminState.supabase
      .from('visitors')
      .select('*');

    const totalVisitors = (visitorsData && visitorsData.length) || 0;
    const visitorsToday = visitorsData ? visitorsData.filter(v => new Date(v.last_seen) >= today).length : 0;
    
    document.getElementById('statTotalVisitors').textContent = totalVisitors.toLocaleString();
    document.getElementById('statVisitorsToday').textContent = visitorsToday.toLocaleString();

    adminState.visitors = visitorsData || [];
    renderVisitorChart(adminState.visitors);

    // 2. Leads Data
    const { data: leadsData } = await adminState.supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    const totalLeads = (leadsData && leadsData.length) || 0;
    const leadsToday = leadsData ? leadsData.filter(l => new Date(l.created_at) >= today).length : 0;

    document.getElementById('statTotalLeads').textContent = totalLeads.toLocaleString();
    document.getElementById('statLeadsToday').textContent = leadsToday.toLocaleString();

    // 3. Posts Count
    const { count: postsCount } = await adminState.supabase
      .from('imp_posts')
      .select('*', { count: 'exact', head: true });

    document.getElementById('statTotalPosts').textContent = (postsCount || 0).toLocaleString();

  } catch (err) {
    console.error("Error loading overview metrics:", err);
  }
}

/**
 * 6. Render 14-Day Visitor Trend Chart (Chart.js)
 */
function renderVisitorChart(visitors) {
  const canvas = document.getElementById('visitorChart');
  if (!canvas || !window.Chart) return;

  // Build last 14 days labels
  const days = 14;
  const labels = [];
  const counts = [];
  const mapCounts = {};

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const displayLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    labels.push(displayLabel);
    mapCounts[key] = 0;
  }

  // Aggregate visitor last_seen by day
  if (visitors && visitors.length > 0) {
    visitors.forEach(v => {
      const dateKey = (v.last_seen || v.first_seen || '').split('T')[0];
      if (mapCounts[dateKey] !== undefined) {
        mapCounts[dateKey]++;
      }
    });
  }

  Object.keys(mapCounts).forEach(k => {
    counts.push(mapCounts[k]);
  });

  if (adminState.chartInstance) {
    adminState.chartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
  gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

  adminState.chartInstance = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Daily Visitors',
        data: counts,
        borderColor: '#38bdf8',
        borderWidth: 2.5,
        backgroundColor: gradient,
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#fbbf24',
        pointBorderColor: '#070b14',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#fff',
          bodyColor: '#38bdf8',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 10
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', font: { size: 10 } }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', precision: 0, font: { size: 10 } }
        }
      }
    }
  });
}

/**
 * 7. Posts Manager (CRUD Operations)
 */
async function fetchAdminPosts() {
  if (!adminState.supabase) return;

  try {
    const { data, error } = await adminState.supabase
      .from('imp_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      adminState.posts = data;
      renderAdminPostsList();
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
}

function renderAdminPostsList() {
  const container = document.getElementById('adminPostsList');
  if (!container) return;

  if (adminState.posts.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: #94a3b8;">
        No posts yet. Use the form above to post your first MSBTE IMP question set!
      </div>
    `;
    return;
  }

  container.innerHTML = adminState.posts.map(post => {
    const qCount = (post.questions || '').split('\n').filter(q => q.trim().length > 0).length;
    const examDateStr = post.exam_date ? new Date(post.exam_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'No Date';

    return `
      <div class="admin-post-item" id="postItem_${post.id}">
        <div class="admin-post-info">
          <div class="admin-post-title">${escapeHtml(post.title)}</div>
          <div class="admin-post-meta">
            <span style="color: #38bdf8; font-weight: 700;">${escapeHtml(post.subject)}</span>
            <span>• ${escapeHtml(post.semester)}</span>
            <span>• ${escapeHtml(post.scheme)}</span>
            <span>• 📅 Exam: ${examDateStr}</span>
            <span>• ${qCount} Questions</span>
            <span style="color: ${post.published ? '#10b981' : '#f59e0b'}; font-weight: 700;">
              ${post.published ? '🟢 Published' : '🟡 Draft'}
            </span>
          </div>
        </div>
        <div class="admin-post-actions">
          <button class="btn-action btn-action-edit" onclick="editPost('${post.id}')">
            ✏️ Edit
          </button>
          <button class="btn-action btn-action-toggle ${post.published ? 'published' : ''}" onclick="togglePublishPost('${post.id}', ${!post.published})">
            ${post.published ? 'Hide' : 'Publish'}
          </button>
          <button class="btn-action btn-action-delete" onclick="deletePost('${post.id}')">
            🗑️ Delete
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Post Form Submit (Create or Update)
const postForm = document.getElementById('postForm');
if (postForm) {
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = (document.getElementById('postTitle').value || '').trim();
    const subject = (document.getElementById('postSubject').value || '').trim();
    const semester = document.getElementById('postSemester').value;
    const scheme = document.getElementById('postScheme').value;
    const examDate = document.getElementById('postExamDate').value || null;
    const questions = (document.getElementById('postQuestions').value || '').trim();
    const published = document.getElementById('postPublished').checked;

    if (!title || !subject || !questions) {
      alert("Please fill in Title, Subject, and at least 1 Question!");
      return;
    }

    const saveBtn = document.getElementById('savePostBtn');
    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    const postPayload = {
      title,
      subject,
      semester,
      scheme,
      exam_date: examDate,
      questions,
      published,
      updated_at: new Date().toISOString()
    };

    try {
      if (adminState.editingPostId) {
        // Update existing post
        const { error } = await adminState.supabase
          .from('imp_posts')
          .update(postPayload)
          .eq('id', adminState.editingPostId);

        if (error) throw error;
        alert("✅ Post updated successfully!");
      } else {
        // Create new post
        postPayload.created_at = new Date().toISOString();
        const { error } = await adminState.supabase
          .from('imp_posts')
          .insert([postPayload]);

        if (error) throw error;
        alert("✅ New IMP Post published!");
      }

      resetPostForm();
      await fetchAdminPosts();
      await fetchAdminOverview();
    } catch (err) {
      alert("Error saving post: " + err.message);
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = adminState.editingPostId ? "Update IMP Post" : "Publish IMP Post";
    }
  });
}

// Edit Post Helper
function editPost(id) {
  const post = adminState.posts.find(p => p.id === id);
  if (!post) return;

  adminState.editingPostId = id;
  document.getElementById('formModeTitle').textContent = "✏️ Edit IMP Post";
  document.getElementById('postTitle').value = post.title || '';
  document.getElementById('postSubject').value = post.subject || '';
  document.getElementById('postSemester').value = post.semester || 'Sem 3';
  document.getElementById('postScheme').value = post.scheme || 'K-Scheme';
  document.getElementById('postExamDate').value = post.exam_date || '';
  document.getElementById('postQuestions').value = post.questions || '';
  document.getElementById('postPublished').checked = Boolean(post.published);

  document.getElementById('savePostBtn').textContent = "Update IMP Post";
  document.getElementById('cancelEditBtn').style.display = 'inline-block';

  // Scroll to form smoothly
  document.getElementById('postFormCard').scrollIntoView({ behavior: 'smooth' });
}

function resetPostForm() {
  adminState.editingPostId = null;
  document.getElementById('formModeTitle').textContent = "⚡ Post IMP Questions";
  document.getElementById('postForm').reset();
  document.getElementById('savePostBtn').textContent = "Publish IMP Post";
  document.getElementById('cancelEditBtn').style.display = 'none';
}

const cancelEditBtn = document.getElementById('cancelEditBtn');
if (cancelEditBtn) {
  cancelEditBtn.addEventListener('click', resetPostForm);
}

// Toggle Publish State
async function togglePublishPost(id, newStatus) {
  try {
    const { error } = await adminState.supabase
      .from('imp_posts')
      .update({ published: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    await fetchAdminPosts();
  } catch (err) {
    alert("Could not update publish state: " + err.message);
  }
}

// Delete Post
async function deletePost(id) {
  if (!confirm("Are you sure you want to delete this IMP question set? This action cannot be undone.")) {
    return;
  }

  try {
    const { error } = await adminState.supabase
      .from('imp_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchAdminPosts();
    await fetchAdminOverview();
  } catch (err) {
    alert("Error deleting post: " + err.message);
  }
}

/**
 * 8. Leads Management & CSV Export
 */
async function fetchAdminLeads() {
  if (!adminState.supabase) return;

  try {
    const { data, error } = await adminState.supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      adminState.leads = data;
      renderAdminLeads(data);
    }
  } catch (err) {
    console.error("Error fetching leads:", err);
  }
}

function renderAdminLeads(leads) {
  const tbody = document.getElementById('leadsTableBody');
  const countBar = document.getElementById('leadsCountBar');
  if (!tbody) return;

  if (leads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 2rem;">No student leads recorded yet.</td></tr>`;
    if (countBar) countBar.textContent = `Showing 0 of ${adminState.leads.length} leads`;
    return;
  }

  tbody.innerHTML = leads.map(l => {
    const dateStr = l.created_at ? new Date(l.created_at).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }) : '-';

    return `
      <tr>
        <td style="font-weight: 700; color: #fff;">${escapeHtml(l.name || 'Anonymous')}</td>
        <td style="color: #38bdf8;">${escapeHtml(l.email || '-')}</td>
        <td>${escapeHtml(l.college_city || '-')}</td>
        <td style="color: #94a3b8; font-size: 0.8rem;">${dateStr}</td>
      </tr>
    `;
  }).join('');

  if (countBar) {
    countBar.textContent = `Showing ${leads.length} of ${adminState.leads.length} total student leads`;
  }
}

// Search Leads Filter
const leadsSearchInput = document.getElementById('leadsSearchInput');
if (leadsSearchInput) {
  leadsSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderAdminLeads(adminState.leads);
      return;
    }

    const filtered = adminState.leads.filter(l => {
      const name = (l.name || '').toLowerCase();
      const email = (l.email || '').toLowerCase();
      const college = (l.college_city || '').toLowerCase();
      return name.includes(query) || email.includes(query) || college.includes(query);
    });

    renderAdminLeads(filtered);
  });
}

// Export Leads to CSV
const exportCsvBtn = document.getElementById('exportCsvBtn');
if (exportCsvBtn) {
  exportCsvBtn.addEventListener('click', () => {
    if (!adminState.leads || adminState.leads.length === 0) {
      alert("No leads available to export!");
      return;
    }

    const headers = ["ID", "Student Name", "Email Address", "College / City", "Submitted Date"];
    const rows = adminState.leads.map(l => [
      `"${l.id || ''}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.college_city || '').replace(/"/g, '""')}"`,
      `"${l.created_at || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute("download", `diploma_world_leads_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Expose handlers globally
window.editPost = editPost;
window.togglePublishPost = togglePublishPost;
window.deletePost = deletePost;

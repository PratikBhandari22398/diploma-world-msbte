/**
 * ==============================================================================
 * DIPLOMA WORLD MSBTE - AUTHENTIC EDUCATIONAL LOGIC
 * ==============================================================================
 */

// Fallback demo posts if offline or during initial setup
const DEMO_POSTS = [
  {
    id: "demo-1",
    title: "Top 10 IMP Questions - Operating Systems (OSY)",
    subject: "Operating Systems (Sub Code: 313301)",
    semester: "Sem 3",
    scheme: "K-Scheme",
    exam_date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    questions: `Explain the role of Operating System as an Extended Machine and Resource Manager.
Compare Monolithic Kernel and Microkernel architecture with neat sketches.
Describe Process State Transition Diagram with suitable explanation.
Explain Preemptive vs Non-Preemptive scheduling with Gantt chart example (FCFS & Round Robin).
What is Deadlock? Explain the 4 necessary conditions for Deadlock occurrence.
Describe Banker's Algorithm with safety algorithm steps.
Explain Paging memory management scheme and Address Translation Mechanism.
Differentiate between Internal and External Fragmentation with diagrams.
Describe Page Replacement Algorithms: FIFO, LRU, and Optimal with example strings.
Explain File Allocation Methods: Contiguous, Linked, and Indexed allocation.`,
    published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "demo-2",
    title: "Top 10 IMP Questions - Data Structures using C (DSU)",
    subject: "Data Structures (Sub Code: 313302)",
    semester: "Sem 3",
    scheme: "K-Scheme",
    exam_date: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0],
    questions: `Explain Linear vs Non-Linear Data Structures with suitable real-world examples.
Write a C program / algorithm for Binary Search and state its Time Complexity.
Explain Stack operations: PUSH, POP, and PEEP with array implementation.
Convert Infix expression to Postfix using Stack: (A + B) * (C - D) / E.
Describe Queue operations: Insert and Delete in Circular Queue.
Explain Singly Linked List operations: Insert at Beginning and Delete from End.
Compare Array and Linked List data structures with memory allocation differences.
Explain Tree Terminology: Root, Depth, Height, Leaf Node, and Subtree.
Construct Binary Search Tree (BST) for given values: 45, 15, 79, 90, 10, 55, 12, 20.
Explain BFS (Breadth First Search) and DFS (Depth First Search) Graph Traversal algorithms.`,
    published: true,
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "demo-3",
    title: "Top 10 IMP Questions - Java Programming (JPR)",
    subject: "Java Programming (Sub Code: 314301)",
    semester: "Sem 4",
    scheme: "K-Scheme",
    exam_date: new Date(Date.now() + 12 * 86400000).toISOString().split('T')[0],
    questions: `Explain the features of Java (Platform Independence, Bytecode, JVM, JRE, JDK).
Describe Constructor Overloading and Method Overriding with sample code.
Explain 'super' and 'this' keywords in Java with practical examples.
Differentiate between Abstract Class and Interface in Java with syntax.
Explain the Exception Handling mechanism using try, catch, throw, throws, and finally.
How to create User-Defined Custom Exceptions in Java? Write a program.
Describe Java Thread Lifecycle and explain Thread creation using Runnable interface.
Explain Thread Synchronization with synchronized method example.
What are Java Packages? How to create, compile, and import user-defined packages?
Explain byte stream vs character stream classes in Java I/O package.`,
    published: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

// App State
const state = {
  supabase: null,
  isConfigured: false,
  isUnlocked: false,
  posts: [],
  selectedSem: 'all',
  selectedScheme: 'all',
  searchQuery: '',
  visitorCount: 1240
};

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initState();
  bindSocialLinks();
  initVisitorTracking();
  initEntryGate();
  initFilterControls();
  fetchPosts();
});

/**
 * 1. Initialize State & Supabase Client
 */
function initState() {
  const config = window.APP_CONFIG || {};
  const isSetupNeeded = !config.SUPABASE_URL || config.SUPABASE_URL.includes("YOUR_PROJECT_ID");

  if (!isSetupNeeded && window.supabase) {
    try {
      state.supabase = window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
      state.isConfigured = true;
    } catch (err) {
      console.warn("Supabase init error:", err);
      state.isConfigured = false;
    }
  }

  // Check if lead was previously submitted on this device
  state.isUnlocked = localStorage.getItem('dw_lead_submitted') === 'true';
}

/**
 * 2. Bind Social Links from Config
 */
function bindSocialLinks() {
  const links = (window.APP_CONFIG && window.APP_CONFIG.SOCIAL_LINKS) || {};
  
  // Hero CTA Buttons
  const heroYt = document.getElementById('heroBtnYt');
  if (heroYt && links.youtube) heroYt.href = links.youtube;

  const heroWa = document.getElementById('heroBtnWa');
  if (heroWa && links.whatsapp) heroWa.href = links.whatsapp;

  // About Section Buttons
  const aboutYt = document.getElementById('aboutBtnYt');
  if (aboutYt && links.youtube) aboutYt.href = links.youtube;

  const aboutWa = document.getElementById('aboutBtnWa');
  if (aboutWa && links.whatsapp) aboutWa.href = links.whatsapp;

  const aboutIg = document.getElementById('aboutBtnIg');
  if (aboutIg && links.instagram) aboutIg.href = links.instagram;

  const aboutX = document.getElementById('aboutBtnX');
  if (aboutX && links.x) aboutX.href = links.x;

  // Footer Socials
  const footerYt = document.getElementById('footerYt');
  if (footerYt && links.youtube) footerYt.href = links.youtube;

  const footerWa = document.getElementById('footerWa');
  if (footerWa && links.whatsapp) footerWa.href = links.whatsapp;

  const footerIg = document.getElementById('footerIg');
  if (footerIg && links.instagram) footerIg.href = links.instagram;

  const footerX = document.getElementById('footerX');
  if (footerX && links.x) footerX.href = links.x;
}

/**
 * 3. Real Visitor Counter Tracking
 */
async function initVisitorTracking() {
  const counterEl = document.getElementById('visitorCounter');
  if (!counterEl) return;

  // Get or generate unique random visitor ID
  let visitorId = localStorage.getItem('dw_visitor_id');
  if (!visitorId) {
    visitorId = 'dw_v_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
    localStorage.setItem('dw_visitor_id', visitorId);
  }

  if (state.isConfigured && state.supabase) {
    try {
      // Secure RPC: records unique visitor & returns real count without exposing visitor logs
      const { data, error } = await state.supabase.rpc('record_visitor', { p_visitor_id: visitorId });
      if (!error && typeof data === 'number' && data > 0) {
        animateCounter(counterEl, data);
        return;
      }
      
      // Fallback: try get_visitor_count RPC
      const countRes = await state.supabase.rpc('get_visitor_count');
      if (!countRes.error && typeof countRes.data === 'number' && countRes.data > 0) {
        animateCounter(counterEl, countRes.data);
        return;
      }
    } catch (err) {
      console.warn("Visitor tracking exception:", err);
    }
  }

  // Graceful fallback
  animateCounter(counterEl, 142);
}

function animateCounter(el, targetNumber) {
  let current = 0;
  const duration = 1000;
  const stepTime = 25;
  const steps = duration / stepTime;
  const increment = Math.max(1, Math.floor(targetNumber / steps));

  const timer = setInterval(() => {
    current += increment;
    if (current >= targetNumber) {
      current = targetNumber;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString();
  }, stepTime);
}

/**
 * 4. Fetch IMP Posts from Supabase (Newest First)
 */
async function fetchPosts() {
  const container = document.getElementById('postsContainer');
  if (!container) return;

  if (state.isConfigured && state.supabase) {
    try {
      const { data, error } = await state.supabase
        .from('imp_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        state.posts = data;
        renderPosts();
        return;
      }
    } catch (err) {
      console.warn("Error fetching from Supabase:", err);
    }
  }

  // Use demo data if table is empty or before config
  state.posts = DEMO_POSTS;
  renderPosts();
}

/**
 * 5. Render Filtered IMP Posts (Academic Question Paper Look)
 */
function renderPosts() {
  const container = document.getElementById('postsContainer');
  if (!container) return;

  // Filter posts
  const filtered = state.posts.filter(post => {
    // Semester filter
    if (state.selectedSem !== 'all' && post.semester.toLowerCase() !== state.selectedSem.toLowerCase()) {
      return false;
    }
    // Scheme filter
    if (state.selectedScheme !== 'all' && post.scheme.toLowerCase() !== state.selectedScheme.toLowerCase()) {
      return false;
    }
    // Search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      const matchTitle = (post.title || '').toLowerCase().includes(query);
      const matchSub = (post.subject || '').toLowerCase().includes(query);
      const matchQ = (post.questions || '').toLowerCase().includes(query);
      if (!matchTitle && !matchSub && !matchQ) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-surface); border: 1px solid var(--border-card); border-radius: var(--radius-md); grid-column: 1 / -1;">
        <h3 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--text-primary); margin-bottom: 0.35rem;">No Question Papers Found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try clearing your search query or selecting another semester.</p>
      </div>
    `;
    return;
  }

  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  container.innerHTML = filtered.map(post => {
    // Check if updated/posted within last 24 hours
    const postDate = new Date(post.created_at || Date.now());
    const isUpdatedToday = (now - postDate.getTime()) <= oneDayMs;

    // Format Exam Date
    let examDateStr = '';
    if (post.exam_date) {
      try {
        const d = new Date(post.exam_date);
        examDateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      } catch (e) {
        examDateStr = post.exam_date;
      }
    }

    // Split questions
    const questionsArray = (post.questions || '')
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    const questionsCount = questionsArray.length;

    // Render questions list (Locked or Unlocked)
    let questionsHtml = '';
    if (state.isUnlocked) {
      questionsHtml = `
        <div class="paper-questions-box">
          <div class="questions-bar-top">
            <span class="questions-count-text">Questions List (${questionsCount})</span>
            <button class="btn-copy-questions" onclick="copyQuestions('${encodeURIComponent(post.questions)}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              <span>Copy All</span>
            </button>
          </div>
          <ul class="academic-questions-list">
            ${questionsArray.map((q, idx) => `
              <li class="academic-q-item">
                <span class="academic-q-prefix">Q.${idx + 1}</span>
                <span>${escapeHtml(q)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    } else {
      // Locked Preview State
      const previewSlice = questionsArray.slice(0, 2);
      questionsHtml = `
        <div class="paper-questions-box locked-container">
          <div class="locked-blur-content">
            <div class="questions-bar-top">
              <span class="questions-count-text">Questions List (${questionsCount})</span>
            </div>
            <ul class="academic-questions-list">
              ${previewSlice.map((q, idx) => `
                <li class="academic-q-item">
                  <span class="academic-q-prefix">Q.${idx + 1}</span>
                  <span>${escapeHtml(q)}</span>
                </li>
              `).join('')}
              <li class="academic-q-item">
                <span class="academic-q-prefix">Q.3</span>
                <span>[Exam Question Locked - Fill details to view full list]</span>
              </li>
              <li class="academic-q-item">
                <span class="academic-q-prefix">Q.4</span>
                <span>[Exam Question Locked - Fill details to view full list]</span>
              </li>
            </ul>
          </div>
          <div class="locked-prompt-card">
            <div class="locked-lock-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
            <h4 class="locked-title-text">Unlock Full Question Paper</h4>
            <p class="locked-desc-text">Enter any 2 basic details to unlock all ${questionsCount} board exam questions.</p>
            <button class="btn-unlock-modal" onclick="openEntryGateModal()">
              <span>Unlock Now</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
            </button>
          </div>
        </div>
      `;
    }

    const postedFormatted = postDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return `
      <div class="paper-card">
        <div class="card-top-tags">
          <span class="tag-badge tag-scheme">${escapeHtml(post.scheme)}</span>
          <span class="tag-badge tag-sem">${escapeHtml(post.semester)}</span>
          ${examDateStr ? `<span class="tag-badge tag-exam">📅 Exam: ${examDateStr}</span>` : ''}
          ${isUpdatedToday ? `<span class="tag-badge tag-updated">🔥 Updated Today</span>` : ''}
        </div>
        <h3 class="card-paper-title">${escapeHtml(post.title)}</h3>
        <p class="card-sub-code">${escapeHtml(post.subject)}</p>
        
        ${questionsHtml}

        <div class="card-footer-bar">
          <span>Posted: ${postedFormatted}</span>
          <span style="font-weight: 600; color: var(--text-muted);">MSBTE Syllabus</span>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 6. Entry Gate Modal Logic (Requires ANY 2 of 3)
 */
function initEntryGate() {
  const modal = document.getElementById('entryGateModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const form = document.getElementById('entryGateForm');

  const nameInput = document.getElementById('gateName');
  const emailInput = document.getElementById('gateEmail');
  const collegeInput = document.getElementById('gateCollege');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = (nameInput.value || '').trim();
      const email = (emailInput.value || '').trim();
      const college = (collegeInput.value || '').trim();
      const errorMsg = document.getElementById('gateError');
      const submitBtn = document.getElementById('gateSubmitBtn');

      errorMsg.style.display = 'none';

      // Validation 1: Email format check if email is entered
      if (email.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errorMsg.textContent = "Please enter a valid email address (e.g. rahul@gmail.com).";
          errorMsg.style.display = 'block';
          return;
        }
      }

      // Validation 2: At least ANY 2 of 3 must be filled
      let filledCount = 0;
      if (name.length > 0) filledCount++;
      if (email.length > 0) filledCount++;
      if (college.length > 0) filledCount++;

      if (filledCount < 2) {
        errorMsg.textContent = "Please fill at least any 2 details (Name, Email, or College/City).";
        errorMsg.style.display = 'block';
        return;
      }

      // Proceed to save
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Unlocking...</span>`;

      try {
        if (state.isConfigured && state.supabase) {
          const { error } = await state.supabase
            .from('leads')
            .insert([{ name: name || null, email: email || null, college_city: college || null }]);
          
          if (error) {
            console.warn("Lead insert error:", error);
          }
        }
      } catch (err) {
        console.warn("Lead submission error:", err);
      }

      // Save in localStorage to unlock permanently on this device
      localStorage.setItem('dw_lead_submitted', 'true');
      state.isUnlocked = true;

      // Close modal & re-render
      modal.classList.remove('open');
      renderPosts();
      showToast("🎉 All IMP Questions Unlocked! Best of luck for exams!");
    });
  }
}

function openEntryGateModal() {
  const modal = document.getElementById('entryGateModal');
  if (modal) {
    modal.classList.add('open');
    const firstInput = document.getElementById('gateName');
    if (firstInput) firstInput.focus();
  }
}

/**
 * 7. Filter & Search Controls
 */
function initFilterControls() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderPosts();
    });
  }

  // Semester pills
  const semPills = document.querySelectorAll('[data-filter-sem]');
  semPills.forEach(pill => {
    pill.addEventListener('click', () => {
      semPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedSem = pill.getAttribute('data-filter-sem');
      renderPosts();
    });
  });

  // Scheme pills
  const schemePills = document.querySelectorAll('[data-filter-scheme]');
  schemePills.forEach(pill => {
    pill.addEventListener('click', () => {
      schemePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedScheme = pill.getAttribute('data-filter-scheme');
      renderPosts();
    });
  });
}

/**
 * 8. Copy Questions Helper
 */
function copyQuestions(encodedQuestions) {
  const text = decodeURIComponent(encodedQuestions);
  if (!navigator.clipboard) {
    showToast("Questions copied to clipboard!");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 All questions copied to clipboard!");
  }).catch(() => {
    showToast("Questions copied!");
  });
}

/**
 * 9. Toast Notification Helper
 */
function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Helper: Escape HTML
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Expose globally for inline onclick handlers
window.openEntryGateModal = openEntryGateModal;
window.copyQuestions = copyQuestions;

# 🎓 Diploma World MSBTE - Official Exam Preparation Platform

A modern, mobile-first web application designed specifically for MSBTE (Maharashtra State Board of Technical Education) diploma students. Built with **HTML5, CSS3, JavaScript, Supabase (PostgreSQL + Auth + RLS)**, and deployable instantly on **Vercel**.

---

## 🚀 Key Features

- **Mobile-First Trending Design:** Dark Navy (`#070b14`) theme with electric blue & warm gold accents matching the Diploma World MSBTE brand badge, glassmorphic cards, smooth animations, and touch-friendly controls.
- **Hero & Channel Engagement:** Direct 1-click CTA buttons for YouTube Channel (`@diplomakscheme`) and WhatsApp Channel.
- **Real Visitor Counter:** Device-tracked counter stored in PostgreSQL `visitors` table via atomic RPC functions—100% accurate, non-inflated count of real students.
- **Student Entry Gate:** High-converting lead collection modal (requires **ANY 2 of 3** fields: Name, Email, College/City) before unlocking questions. Validates email syntax if provided. Stored in `localStorage` so students are only asked once per device.
- **IMP Questions Feed:** Loaded newest first from Supabase `imp_posts`, with filter pills by Semester (Sem 1 to Sem 6), Scheme (K-Scheme, I-Scheme), and instant search. Includes a pulsing **🔥 Updated Today** badge for posts made within 24 hours.
- **1-Click Copy:** Students can copy all questions of any subject directly to their clipboard with one tap.
- **Separate Admin Dashboard (`/admin`):**
  - Supabase Auth protected (Email + Password).
  - 5 Live Overview Metrics: Total Unique Visitors, Visitors Today, Total Leads, Leads Today, Total IMP Posts.
  - Interactive 14-day visitor activity trend chart (Chart.js).
  - Fast mobile-optimized post manager designed for late-night exam prep postings (Add, Edit, Toggle Publish, Delete).
  - Student leads browser with real-time search & instant CSV export.
- **Enterprise-Grade Security:** Row Level Security (RLS) enabled on all tables. Anonymous visitors can only read published posts, submit leads, and record visits; only authenticated admins can inspect leads and visitors. Uses strictly the client publishable/anon key.

---

## 🛠️ Step-by-Step Setup Guide

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project**.
3. Choose an organization, enter a name (e.g. `diploma-world-msbte`), set a secure database password, and select region **Mumbai (ap-south-1)** for lowest latency in Maharashtra.
4. Click **Create new project** and wait ~1-2 minutes for provisioning.

---

### Step 2: Run `schema.sql` in Supabase
1. In your Supabase project sidebar, click on **SQL Editor** (icon with `>_`).
2. Click **+ New query**.
3. Open the `schema.sql` file from this project, copy the entire content, and paste it into the SQL Editor.
4. Click the green **Run** button (or press `Ctrl+Enter` / `Cmd+Enter`).
5. This automatically creates:
   - Tables: `imp_posts`, `leads`, `visitors`.
   - Performance indexes.
   - Row Level Security (RLS) policies.
   - Secure stored procedures: `record_visitor` and `get_visitor_count`.
   - Sample initial posts for MSBTE K-Scheme subjects (OSY, DSU, JPR).

---

### Step 3: Create Your Admin Account
1. In your Supabase dashboard, go to **Authentication** (user icon in left menu).
2. Click on the **Users** tab.
3. Click the **Add user** button -> select **Create user**.
4. Enter:
   - **Email:** Your admin email (e.g., `pratik@diplomaworld.com` or your personal email).
   - **Password:** Choose a strong password.
   - Ensure **Auto Confirm User?** is checked.
5. Click **Create user**. This is the account you will use to log into `/admin`.

---

### Step 4: Configure `config.js`
Open `config.js` in the root folder of this project:

```javascript
const APP_CONFIG = {
  // 1. Paste your Supabase Project URL from: Dashboard -> Project Settings -> API -> Project URL
  SUPABASE_URL: "https://YOUR_PROJECT_ID.supabase.co",

  // 2. Your Supabase Publishable / Anon Key is already set:
  SUPABASE_ANON_KEY: "sb_publishable_fl-nfSo4007UgdKBGp5QOw_-aRY3s10",

  // 3. Social channel links (pre-configured)
  SOCIAL_LINKS: {
    youtube: "https://youtube.com/@diplomakscheme",
    whatsapp: "https://whatsapp.com/channel/0029VabwtWcKLaHnunBUpw2H",
    instagram: "https://www.instagram.com/diplo.verse",
    x: "https://x.com/Diploma_world"
  }
};
```

> **Where to find `SUPABASE_URL`:**
> In your Supabase dashboard, click **Project Settings** (gear icon at bottom left) -> **API** -> Copy the **Project URL** (format: `https://[project-ref].supabase.co`).

---

### Step 5: Deploy to Vercel

#### Option A: Deploy via GitHub (Recommended)
1. Initialize git and push this project folder to your GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Diploma World MSBTE"
   git remote add origin https://github.com/YOUR_USERNAME/diploma-world-msbte.git
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com), click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Leave framework preset as **Other** (Plain static site).
5. Click **Deploy**. Vercel will deploy it in seconds with a free `.vercel.app` domain and SSL.

#### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
cd imp_web
vercel
```

---

## 🔒 What You Must Replace / Check (Checklist)

| Item | File | Location | Action |
|------|------|----------|--------|
| **Supabase URL** | `config.js` | Line 16 | Replace `https://YOUR_PROJECT_ID.supabase.co` with your real Supabase Project URL. |
| **Supabase Key** | `config.js` | Line 19 | Already filled with your key `sb_publishable_fl-nfSo4007UgdKBGp5QOw_-aRY3s10`. If using legacy anon JWT key (`eyJ...`), you can paste that as well. |
| **Admin User** | Supabase Dashboard | Auth -> Users | Create your admin user with email and password to log into `/admin`. |

---

## 📱 URLs & Navigation

- **Public Site:** `https://your-domain.vercel.app/` (Landing page, Hero, Real Visitor Counter, IMP Questions with filters, About section, Social buttons).
- **Admin Dashboard:** `https://your-domain.vercel.app/admin` (Not linked in public navbar; login with your Supabase Auth admin email & password).

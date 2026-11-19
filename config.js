/**
 * ==============================================================================
 * DIPLOMA WORLD MSBTE - GLOBAL CONFIGURATION
 * ==============================================================================
 * 
 * IMPORTANT: REPLACE THE SUPABASE_URL WITH YOUR PROJECT URL
 * 
 * 1. Go to your Supabase Project: https://supabase.com/dashboard
 * 2. Click "Project Settings" (gear icon) -> "API"
 * 3. Copy "Project URL" and paste it in SUPABASE_URL below.
 * 4. Your Supabase Publishable Key is already filled in below!
 * ==============================================================================
 */

const APP_CONFIG = {
  // 👉 REPLACE THIS WITH YOUR SUPABASE PROJECT URL (e.g. "https://abcdefghijklm.supabase.co")
  SUPABASE_URL: "https://etypchixcsweesiktamp.supabase.co",

  // 👉 YOUR SUPABASE PUBLISHABLE / ANON KEY (Already configured)
  SUPABASE_ANON_KEY: "sb_publishable_fl-nfSo4007UgdKBGp5QOw_-aRY3s10",

  // Channel Branding & Author Details
  CHANNEL_NAME: "Diploma World MSBTE",
  TAGLINE: "Important Questions for MSBTE Exams",
  AUTHOR_NAME: "Pratik",
  AUTHOR_BIO: "Hey Diploma Engineers! I'm Pratik from Diploma World MSBTE. We provide targeted, high-yield Important Questions (IMP), model answers, and last-night exam tips tailored for MSBTE K-Scheme & I-Scheme diploma students across Maharashtra.",

  // Social Channels (All open in new tab with rel="noopener noreferrer")
  SOCIAL_LINKS: {
    youtube: "https://youtube.com/@diplomakscheme",
    whatsapp: "https://whatsapp.com/channel/0029VabwtWcKLaHnunBUpw2H",
    instagram: "https://www.instagram.com/diplo.verse",
    x: "https://x.com/Diploma_world"
  }
};

// Make accessible to all scripts
window.APP_CONFIG = APP_CONFIG;

import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = "https://etypchixcsweesiktamp.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_fl-nfSo4007UgdKBGp5QOw_-aRY3s10";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const APP_CONFIG = {
  CHANNEL_NAME: "Diploma World MSBTE",
  TAGLINE: "Important Questions for MSBTE Exams",
  AUTHOR_NAME: "Pratik",
  AUTHOR_ROLE: "Founder & MSBTE Exam Mentor",
  AUTHOR_BIO: "Hey Diploma Engineers! I'm Pratik from Diploma World MSBTE. We provide targeted, high-yield Important Questions (IMP), practical guidance, and last-night exam tips tailored for MSBTE K-Scheme & I-Scheme students across Maharashtra.",
  SOCIAL_LINKS: {
    youtube: "https://youtube.com/@diplomakscheme",
    whatsapp: "https://whatsapp.com/channel/0029VabwtWcKLaHnunBUpw2H",
    instagram: "https://www.instagram.com/diplo.verse",
    x: "https://x.com/Diploma_world"
  }
};

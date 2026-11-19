import React from 'react';

/**
 * Official YouTube Logo: Red rounded rectangle with white triangle
 */
export function YouTubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="YouTube"
    >
      <path 
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" 
        fill="#FF0000"
      />
      <path 
        d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Official WhatsApp Logo: Green speech bubble with white phone handset
 */
export function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WhatsApp"
    >
      <path 
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" 
        fill="#25D366"
      />
      <path 
        d="M17.47 14.38C17.17 14.23 15.71 13.51 15.44 13.41C15.17 13.31 14.97 13.26 14.77 13.56C14.57 13.86 14 14.53 13.83 14.73C13.66 14.93 13.48 14.95 13.18 14.8C12.89 14.65 11.93 14.34 10.8 13.33C9.91 12.54 9.32 11.57 9.14 11.27C8.97 10.97 9.12 10.81 9.27 10.66C9.41 10.53 9.57 10.31 9.72 10.14C9.87 9.97 9.92 9.85 10.02 9.65C10.12 9.45 10.07 9.28 10 9.13C9.92 8.98 9.33 7.52 9.08 6.92C8.84 6.34 8.6 6.42 8.41 6.41C8.24 6.4 8.04 6.4 7.84 6.4C7.64 6.4 7.32 6.48 7.05 6.77C6.77 7.07 6 7.79 6 9.25C6 10.71 7.07 12.13 7.21 12.33C7.36 12.53 9.31 15.53 12.29 16.82C13 17.12 13.55 17.31 13.98 17.44C14.7 17.67 15.34 17.64 15.86 17.56C16.43 17.48 17.62 16.84 17.86 16.15C18.11 15.46 18.11 14.86 18.04 14.74C17.96 14.61 17.77 14.53 17.47 14.38Z" 
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Official Instagram Logo: Colorful radial gradient with camera outline
 */
export function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Instagram"
    >
      <defs>
        <radialGradient id="ig-badge-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="10%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-badge-grad)" />
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="#ffffff" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.6" fill="none" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  );
}

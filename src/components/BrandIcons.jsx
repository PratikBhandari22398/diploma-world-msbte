import React from 'react';

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

export function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WhatsApp"
    >
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path 
        d="M35.1 12.9C32.2 10 28.3 8.4 24.2 8.4 15.6 8.4 8.6 15.4 8.6 24c0 2.8.7 5.4 2.1 7.8L8 38.6l7-1.8c2.3 1.2 4.8 1.9 7.4 1.9 8.6 0 15.6-7 15.6-15.6 0-4.1-1.6-8-4.5-10.9zm-10.9 23c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5 1.3 1.3-4.8-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.1 5.8-12.9 12.9-12.9 3.4 0 6.7 1.3 9.1 3.8 2.4 2.4 3.8 5.7 3.8 9.1 0 7.1-5.8 12.8-12.6 12.8zm7.1-9.7c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.3-2.2-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.6.2-.2.2-.4.3-.6.1-.2 0-.5-.1-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.4 1.4-1.4 3.3s1.4 3.8 1.6 4.1c.2.2 2.8 4.3 6.8 6 1 .4 1.7.7 2.3.9 1 .3 1.9.3 2.6.2.8-.1 2.3-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.3-.3-.7-.5z" 
        fill="#FFFFFF" 
      />
    </svg>
  );
}

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

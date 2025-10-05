'use client';

import { useEffect } from 'react';

export default function PWA() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('✅ Service Worker registered successfully:', registration);

          // Check if the service worker is controlling the page
          if (navigator.serviceWorker.controller) {
            console.log('✅ Service Worker is controlling the page');
          } else {
            console.log('⚠️ Service Worker registered but not yet controlling');
          }
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });

      // Listen for controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker controller changed');
      });
    } else {
      console.warn('⚠️ Service Worker not supported in this browser');
      console.log('💡 For full PWA experience, use a modern browser like Chrome, Firefox, Safari, or Edge');
    }
  }, []);

  return null;
}

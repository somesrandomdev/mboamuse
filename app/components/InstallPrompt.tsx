'use client';

import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShow(false);
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-[#FFD700] text-black px-4 py-3 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Installer MboaMuse</p>
          <p className="text-sm">Profitez de l'expérience hors connexion</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setShow(false)}
            className="text-black/60 hover:text-black"
          >
            Plus tard
          </button>
          <button
            onClick={handleInstall}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Installer
          </button>
        </div>
      </div>
    </div>
  );
}

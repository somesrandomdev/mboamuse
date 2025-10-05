"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { oeuvres } from "./data/oeuvres";
import { SparklesIcon, CameraIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Check PWA requirements
    const checkPWARequirements = async () => {
      console.log('Checking PWA requirements...');

      // Check if manifest is accessible
      try {
        const manifestResponse = await fetch('/manifest.json');
        if (manifestResponse.ok) {
          const manifest = await manifestResponse.json();
          console.log('Manifest loaded:', manifest);
        } else {
          console.error('Manifest not accessible');
        }
      } catch (error) {
        console.error('Error loading manifest:', error);
      }

      // Check service worker
      if ('serviceWorker' in navigator) {
        console.log('✅ Service Worker supported');
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          console.log('Service Worker registrations:', registrations);
        } catch (error) {
          console.warn('Could not get service worker registrations:', error);
        }
      } else {
        console.warn('⚠️ Service Worker not supported - PWA features limited');
        console.log('For full PWA experience, use Chrome, Firefox, Safari, or Edge');
      }

      // Check if HTTPS or localhost
      const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
      console.log('Is secure context:', isSecure);

      // Check if already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('App is already installed');
      }
    };

    checkPWARequirements();

    const handler = (e: Event) => {
      console.log('beforeinstallprompt event fired - PWA install available!');
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('Install prompt is now available');
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Also listen for appinstalled event
    const installedHandler = () => {
      console.log('PWA installed successfully');
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", installedHandler);

    // Make install function globally available
    (window as any).installPWA = install;

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, [deferredPrompt]);

  const install = async () => {
    console.log('Install button clicked, deferredPrompt:', deferredPrompt);

    // Check if service worker is supported (required for PWA)
    if (!('serviceWorker' in navigator)) {
      alert('PWA non supporté dans ce navigateur. Utilise Chrome, Firefox, Safari ou Edge pour l\'expérience complète.');
      return;
    }

    if (deferredPrompt) {
      console.log('Prompting install...');
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install outcome:', outcome);
        if (outcome === "accepted") {
          setDeferredPrompt(null);
          console.log('App installed successfully');
        } else {
          console.log('App install dismissed');
        }
      } catch (error) {
        console.error('Error during install prompt:', error);
        showManualInstallInstructions();
      }
    } else {
      console.log('No deferredPrompt available, showing fallback');
      showManualInstallInstructions();
    }
  };

  const showManualInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    let instructions = 'Pour installer MboaMuse :\n\n';

    if (isIOS) {
      instructions += 'Safari iOS :\n';
      instructions += '1. Appuie sur le bouton partager 📤\n';
      instructions += '2. Sélectionne "Sur l\'écran d\'accueil"\n';
    } else if (isAndroid) {
      instructions += 'Chrome Android :\n';
      instructions += '1. Appuie sur ⋮ (menu)\n';
      instructions += '2. Sélectionne "Ajouter à l\'écran d\'accueil"\n';
    } else if (isFirefox) {
      instructions += 'Firefox :\n';
      instructions += '1. Appuie sur ⋮ (menu)\n';
      instructions += '2. Sélectionne "Installer cette application"\n';
    } else {
      instructions += 'Chrome/Edge :\n';
      instructions += '1. Appuie sur ⋮ (menu)\n';
      instructions += '2. Sélectionne "Installer MboaMuse"\n';
      instructions += '\nOu :\n';
      instructions += '1. Clique sur l\'icône 🔒 dans la barre d\'adresse\n';
      instructions += '2. Sélectionne "Installer MboaMuse"\n';
    }

    alert(instructions);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-amber-300 flex flex-col items-center justify-center px-6 pb-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        className="w-full max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* HERO */}
        <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center mb-12">
          <motion.h1
            className="text-7xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            MboaMuse
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-amber-200/90 font-light tracking-wide"
            variants={itemVariants}
          >
            Scanner · Écouter · Devenir Royal
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/scan"
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center gap-3">
              <CameraIcon className="w-6 h-6" />
              📷 Scanner QR
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <button
            onClick={install}
            className="group relative px-8 py-4 rounded-2xl border-2 border-amber-400/50 bg-black/50 backdrop-blur-sm text-amber-400 font-semibold text-lg hover:bg-amber-400 hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center gap-3">
              <ArrowDownTrayIcon className="w-6 h-6" />
              📲 Installer l'App
            </span>
          </button>
        </motion.div>

        {/* CARDS */}
        <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }} className="grid gap-8 md:grid-cols-3">
          {oeuvres.map((oeuvre, index) => (
            <Link key={oeuvre.id} href={`/oeuvre/${oeuvre.id}`}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm shadow-2xl hover:shadow-amber-500/20 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={oeuvre.image}
                    alt={oeuvre.titre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <SparklesIcon className="w-8 h-8 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                    {oeuvre.titre}
                  </h3>
                  <p className="text-amber-200/80 text-sm leading-relaxed">
                    {oeuvre.description}
                  </p>
                  <div className="mt-4 flex items-center text-amber-400 font-medium">
                    <span>Découvrir l'histoire</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}

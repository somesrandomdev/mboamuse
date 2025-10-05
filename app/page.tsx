"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { oeuvres } from "./data/oeuvres";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setDeferredPrompt(null);
    } else {
      alert("Installe depuis le menu de ton navigateur : ⋮  → 'Installer l'appli'");
    }
  };
  return (
    <main className="min-h-screen bg-black text-amber-300 flex flex-col items-center justify-center px-6 pb-20">
      <div className="w-full max-w-6xl mx-auto">
      {/* HERO */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500"
      >
        MboaMuse
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-lg text-amber-200"
      >
        Scanner · Écouter · Devenir Royal
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-10"
      >
        <Link
          href="/scan"
          className="inline-block px-8 py-4 rounded-full border-2 border-amber-400 text-amber-400 font-semibold
                     hover:bg-amber-400 hover:text-black transition-all duration-300"
        >
          📷 Scanner QR
        </Link>
      </motion.div>

      {/* BOUTON INSTALL */}
      {deferredPrompt && (
        <button
          onClick={install}
          className="mt-6 px-6 py-3 rounded-full border-2 border-amber-400 text-amber-400 font-semibold hover:bg-amber-400 hover:text-black transition"
        >
          📲 Installer MboaMuse
        </button>
      )}

      {/* CARDS */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {oeuvres.map((oeuvre) => (
          <Link key={oeuvre.id} href={`/oeuvre/${oeuvre.id}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-black"
            >
              <img
                src={oeuvre.image}
                alt={oeuvre.titre}
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-amber-100">{oeuvre.titre}</h3>
                <p className="text-sm text-amber-300">Appuyez pour découvrir</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      </div>
    </main>
  );
}

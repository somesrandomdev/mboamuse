'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, ShareIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SharePageContent() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('image');
  const [userName, setUserName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;
    setIsDownloading(true);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mboamuse-${userName || 'royal'}-portrait.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct download
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `mboamuse-${userName || 'royal'}-portrait.png`;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'MboaMuse - Mon Portrait Royal',
          text: `Regardez mon portrait royal transformé par MboaMuse! Je suis ${userName || 'un roi/une reine'}`,
          url: window.location.href,
        });
      } else {
        // Fallback to WhatsApp
        const text = encodeURIComponent(`Regardez mon portrait royal transformé par MboaMuse! Je suis ${userName || 'un roi/une reine'} 👑 ${window.location.href}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
      }
    } catch (err) {
      console.log('Share cancelled or failed');
    } finally {
      setIsSharing(false);
    }
  };

  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-[#FFD700] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-xl">Aucune image trouvée</p>
          <Link href="/face" className="mt-4 inline-block text-[#FFD700] hover:text-white underline">
            Retour à l'upload
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-[#FFD700] flex flex-col px-4 py-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,215,0,0.1),transparent_70%)]" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <Link href="/face">
            <button className="flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors duration-300 group">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center group-hover:bg-[#FFD700]/30 transition-colors">
                ←
              </div>
              Retour
            </button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold text-center bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent"
          >
            Ta Carte Postale
          </motion.h1>

          {/* Image with overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-md"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFD700] bg-gradient-to-br from-gray-900 to-black">
              <img
                src={imageUrl}
                alt="Portrait royal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Overlay elements */}
              <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-sm rounded-2xl px-4 py-2 border border-[#FFD700]/30">
                <p className="text-[#FFD700] text-lg font-serif font-bold flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5" />
                  MboaMuse 2025
                </p>
              </div>

              <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm rounded-2xl px-4 py-2 border border-[#FFD700]/30">
                <p className="text-[#FFD700] text-lg font-serif font-bold">
                  {userName || 'Ton Nom'}
                </p>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-[#FFD700] rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-[#FFD700] rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-[#FFD700] rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-[#FFD700] rounded-br-lg" />
            </div>
          </motion.div>

          {/* Name input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-md"
          >
            <label htmlFor="name" className="block text-[#FFD700] mb-3 text-lg font-semibold">
              Personnalise ta carte
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Entre ton nom royal"
                className="w-full bg-black/50 backdrop-blur-sm border-2 border-[#FFD700]/50 rounded-2xl px-6 py-4 text-[#FFD700] placeholder-[#FFD700]/60 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300 text-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FFD700]/40">
                👑
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 bg-gradient-to-r from-[#FFD700] to-amber-500 text-black py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#FFD700]/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isDownloading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <ArrowDownTrayIcon className="w-6 h-6" />
              )}
              {isDownloading ? 'Téléchargement...' : 'Télécharger'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              disabled={isSharing}
              className="flex-1 bg-transparent border-2 border-[#FFD700] text-[#FFD700] py-4 rounded-2xl font-bold text-lg hover:bg-[#FFD700]/10 hover:border-[#FFD700]/80 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isSharing ? (
                <div className="w-5 h-5 border-2 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin" />
              ) : (
                <ShareIcon className="w-6 h-6" />
              )}
              {isSharing ? 'Partage...' : 'Partager'}
            </motion.button>
          </motion.div>

          {/* Certificate Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Link
              href={`/certificat?image=${encodeURIComponent(imageUrl)}&name=${encodeURIComponent(userName)}`}
              className="inline-flex items-center gap-2 text-[#FFD700]/80 hover:text-[#FFD700] transition-colors duration-300 text-sm underline"
            >
              📜 Obtenir mon certificat royal
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SharePageContent() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('image');
  const [userName, setUserName] = useState('');

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'royal-portrait.png';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MboaMuse - Mon Portrait Royal',
          text: `Regardez mon portrait royal transformé par MboaMuse! Je suis ${userName}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to WhatsApp
      const text = encodeURIComponent(`Regardez mon portrait royal transformé par MboaMuse! Je suis ${userName} ${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-black text-[#FFD700] flex items-center justify-center">
        <p>Aucune image trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#FFD700] flex flex-col items-center justify-center px-4 py-8 space-y-8">
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-center">
        Ta Carte Postale
      </h1>

      {/* Image with overlay */}
      <div className="relative max-w-md w-full">
        <img
          src={imageUrl}
          alt="Royal portrait"
          className="w-full aspect-square object-cover rounded-lg border-4 border-[#FFD700]"
        />
        <div className="absolute inset-0 border-4 border-[#FFD700] rounded-lg pointer-events-none">
          <div className="absolute top-4 left-4">
            <p className="text-[#FFD700] text-lg font-serif font-bold">MboaMuse 2025</p>
          </div>
          <div className="absolute bottom-4 right-4">
            <p className="text-[#FFD700] text-lg font-serif font-bold">{userName || 'Ton Nom'}</p>
          </div>
        </div>
      </div>

      {/* Name input */}
      <div className="max-w-md w-full">
        <label htmlFor="name" className="block text-[#FFD700] mb-2">
          Ton nom
        </label>
        <input
          id="name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Entre ton nom"
          className="w-full bg-transparent border-2 border-[#FFD700] rounded-lg px-4 py-3 text-[#FFD700] placeholder-[#FFD700]/60 focus:outline-none focus:border-[#FFD700]/80"
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleDownload}
          className="bg-[#FFD700] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#FFD700]/80 transition-colors"
        >
          Télécharger
        </button>
        <button
          onClick={handleShare}
          className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-6 py-3 rounded-full font-semibold hover:bg-[#FFD700]/20 transition-colors"
        >
          Partager sur WhatsApp
        </button>
      </div>
    </div>
  );
}

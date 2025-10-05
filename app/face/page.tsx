'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FaceUploadPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [royalImage, setRoyalImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const generateRoyalImage = async () => {
    if (!imageFile) return;

    setLoading(true);

    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // For demo purposes, use a mock royal image
      // In production, replace with actual API call
      const mockRoyalImages = [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
      ];

      const randomImage = mockRoyalImages[Math.floor(Math.random() * mockRoyalImages.length)];
      setRoyalImage(randomImage);

      // Uncomment below for actual API integration when API key is available
      /*
      const prompt = "A majestic African king/queen, traditional golden crown, tribal paint, cinematic lighting, ultra-realistic, facing camera, 4k";

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          model: "stabilityai/stable-diffusion-xl-base-1.0",
          prompt: prompt,
          width: 1024,
          height: 1024,
          steps: 20,
          n: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Handle different possible response structures
      let imageUrl = null;
      if (data && data.data && Array.isArray(data.data) && data.data[0] && data.data[0].url) {
        imageUrl = data.data[0].url;
      } else if (data && data.output && Array.isArray(data.output) && data.output[0]) {
        imageUrl = data.output[0];
      } else if (data && typeof data === 'string') {
        imageUrl = data;
      } else if (data && data.url) {
        imageUrl = data.url;
      }

      if (imageUrl) {
        setRoyalImage(imageUrl);
      } else {
        throw new Error("Invalid API response structure");
      }
      */
    } catch (error) {
      console.error("Image generation failed:", error);
      // Fallback to placeholder
      setRoyalImage("https://via.placeholder.com/400x400/FFD700/000000?text=Generation+Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-[#FFD700] flex flex-col px-4 py-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,215,0,0.1),transparent_70%)]" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors duration-300 group">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center group-hover:bg-[#FFD700]/30 transition-colors">
                ←
              </div>
              Retour
            </button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            Deviens Royauté
          </h1>

          {!previewUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <label
                htmlFor="imageUpload"
                className="group block w-full p-8 border-2 border-dashed border-[#FFD700]/50 rounded-3xl cursor-pointer hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all duration-300 text-center backdrop-blur-sm bg-black/20"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#FFD700]/20 flex items-center justify-center group-hover:bg-[#FFD700]/30 transition-colors">
                    📸
                  </div>
                  <div>
                    <p className="text-[#FFD700] text-xl font-semibold">Choisis une photo de ton visage</p>
                    <p className="text-[#FFD700]/60 text-sm mt-2">PNG, JPG jusqu'à 10MB</p>
                  </div>
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full space-y-8"
            >
              {/* Preview */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-[#FFD700]/20">
                  <img
                    src={previewUrl}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#FFD700] text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Aperçu
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {!royalImage ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateRoyalImage}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#FFD700] to-amber-500 text-black py-5 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-[#FFD700]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        ✨ Générer mon portrait royal
                      </>
                    )}
                  </span>
                  {!loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-[#FFD700] opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  )}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Link
                    href={`/share?image=${encodeURIComponent(royalImage)}`}
                    className="block w-full bg-gradient-to-r from-[#FFD700] to-amber-500 text-black py-5 rounded-3xl font-bold text-lg text-center shadow-2xl hover:shadow-[#FFD700]/25 transition-all duration-300 transform hover:scale-105"
                  >
                    🎉 Partager mon portrait royal
                  </Link>

                  {/* Royal Image Result */}
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFD700]">
                      <img
                        src={royalImage}
                        alt="Portrait royal"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 to-transparent" />
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-[#FFD700] text-sm font-semibold">👑 Royal</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#FFD700] to-amber-500 text-black px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                        ✨ Portrait Royal Généré
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Loading Animation */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <p className="text-[#FFD700]/80 animate-pulse">Créant votre couronne royale...</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

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

    // Note: This is a simplified version. In production, you'd need proper facial analysis
    // to detect king/queen and features for the prompt

    const prompt = "A majestic African king/queen, traditional golden crown, tribal face paint, cinematic lighting, ultra-realistic, facing camera, 4k";

    try {
      const response = await fetch("https://api.together.xyz/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          model: "stabilityai/stable-diffusion-xl-base-1.0",
          prompt,
          width: 1024,
          height: 1024,
          steps: 20,
          n: 1,
        }),
      });

      const data = await response.json();
      const imageUrl = data.data[0].url;
      setRoyalImage(imageUrl);
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#FFD700] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-center">
        Deviens Royauté
      </h1>

      {!previewUrl ? (
        <div className="max-w-md w-full">
          <label
            htmlFor="imageUpload"
            className="block w-full p-6 border-2 border-dashed border-[#FFD700] rounded-lg cursor-pointer hover:border-[#FFD700]/80 transition-colors text-center"
          >
            <p className="text-[#FFD700]">Choisis une photo de ton visage</p>
            <p className="text-[#FFD700]/60 text-sm mt-2">PNG, JPG up to 10MB</p>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="max-w-md w-full space-y-6">
          <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {!royalImage ? (
            <button
              onClick={generateRoyalImage}
              disabled={loading}
              className="w-full bg-[#FFD700] text-black py-4 rounded-full font-semibold hover:bg-[#FFD700]/80 transition-colors disabled:opacity-50"
            >
              {loading ? "Génération en cours..." : "Générer mon portrait royal"}
            </button>
          ) : (
            <Link
              href={`/share?image=${encodeURIComponent(royalImage)}`}
              className="block w-full bg-[#FFD700] text-black py-4 rounded-full font-semibold text-center hover:bg-[#FFD700]/80 transition-colors"
            >
              Partager
            </Link>
          )}

          {loading && (
            <div className="text-center">
              <div className="animate-pulse">Créant votre couronne royale...</div>
            </div>
          )}

          {royalImage && (
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={royalImage}
                alt="Royal portrait"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

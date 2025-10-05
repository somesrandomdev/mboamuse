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

    const prompt = "A majestic African king/queen, traditional golden crown, tribal paint, cinematic lighting, ultra-realistic, facing camera, 4k";

    try {
      const response = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: { "api-key": "quickstart-QU1JTVFYUNDFT1NG" },
        body: new URLSearchParams({ text: prompt }),
      });

      const { output_url } = await response.json();
      setRoyalImage(output_url);
    } catch (error) {
      console.error("DeepAI failed, trying fallback...");
      // Fallback to HuggingFace if DeepAI fails
      try {
        const fallbackRes = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: prompt,
            }),
          }
        );
        const blob = await fallbackRes.blob();
        const url = URL.createObjectURL(blob);
        setRoyalImage(url);
      } catch (fallbackError) {
        console.error("Fallback failed:", fallbackError);
      }
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

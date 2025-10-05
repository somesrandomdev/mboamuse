"use client";
import Link from "next/link";
import { oeuvres, Oeuvre } from '../../data/oeuvres';
import { useRef } from "react";
import { useParams } from 'next/navigation';

export default function OeuvrePage() {
  const params = useParams();
  const id = params.id as string;
  const oeuvre = (oeuvres as Oeuvre[]).find((o: Oeuvre) => o.id === id);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!oeuvre) {
    return <div>Not found</div>;
  }

  return (
    <main className="min-h-screen bg-black text-[#FFD700]">
      <div className="p-4">
        <Link href="/">
          <button className="text-[#FFD700] hover:text-white">← Retour</button>
        </Link>
      </div>
      <img
        src={oeuvre.image}
        alt={oeuvre.titre}
        className="w-full max-h-[60vh] object-cover"
      />
      <div className="p-6">
        <h1 className="text-4xl font-black">{oeuvre.titre}</h1>
        <p className="mt-2 text-lg text-[#FFD700]/80">{oeuvre.description}</p>

        {/* LECTEUR MANUEL */}
        <audio ref={audioRef} src={oeuvre.audio} className="mt-4 w-full" />
        <button
          onClick={() => audioRef.current?.play()}
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#FFD700] text-[#FFD700] font-semibold hover:bg-[#FFD700] hover:text-black transition"
        >
          ▶ Écouter l'histoire
        </button>

        <Link href={`/face?oeuvre=${oeuvre.id}`}>
          <button className="ml-4 mt-4 px-6 py-3 rounded-full bg-[#FFD700] text-black font-semibold hover:bg-[#FFD700]/80 transition">
            Deviens le roi
          </button>
        </Link>
      </div>
    </main>
  );
}

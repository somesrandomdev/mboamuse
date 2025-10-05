'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import oeuvres from '../../../data/oeuvres.json';

interface Oeuvre {
  id: string;
  titre: string;
  description: string;
  narration: string;
  audio: string;
  image: string;
}

export default function OeuvrePage() {
  const params = useParams();
  const id = params.id as string;
  const oeuvre = (oeuvres as Oeuvre[]).find((o: Oeuvre) => o.id === id);

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.5]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [narration, setNarration] = useState('');
  const [currentNarrationIndex, setCurrentNarrationIndex] = useState(0);

  useEffect(() => {
    if (!oeuvre) return;

    // Web Speech API for narration
    const utterance = new SpeechSynthesisUtterance(oeuvre.narration);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setNarration(oeuvre.narration);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    speechSynthesis.speak(utterance);

    return () => {
      speechSynthesis.cancel();
    };
  }, [oeuvre]);

  if (!oeuvre) {
    return <div>Not found</div>;
  }

  return (
<main className="min-h-screen bg-black text-amber-100">
  <div className="relative">
    <img
      src={oeuvre.image}
      className="w-full max-h-[70vh] object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <h1 className="text-5xl font-black">{oeuvre.titre}</h1>
      <p className="mt-2 text-lg text-amber-200">{oeuvre.description}</p>
      <Link href="/face">
        <button className="mt-6 px-6 py-3 rounded-full border-2 border-amber-400 text-amber-400 font-semibold hover:bg-amber-400 hover:text-black transition">
          Deviens le roi
        </button>
      </Link>
    </div>
  </div>
</main>
  );
}

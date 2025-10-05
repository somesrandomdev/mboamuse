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
    <div className="min-h-screen bg-black text-[#FFD700] relative overflow-hidden">
      {/* Fullscreen image with zoom */}
      <motion.div
        style={{ scale }}
        className="fixed inset-0 z-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('https://via.placeholder.com/1000x800/000000/FFD700?text=${oeuvre.titre}')` }}
        />
      </motion.div>

      {/* Overlay content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4">
        {/* Narration text */}
        <div className="absolute bottom-20 left-4 right-4 md:left-8 md:right-8">
          <motion.p
            className="text-xl md:text-2xl font-serif text-[#FFD700] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {narration}
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Link
            href="/face"
            className="inline-block bg-[#FFD700] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#FFD700]/80 transition-colors text-xl"
          >
            Deviens le roi
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

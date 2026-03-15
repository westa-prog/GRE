'use client';

import { useState } from 'react';
import { VocabWord } from '@/types';
import { motion } from 'framer-motion';
import { Volume2, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

interface FlashcardProps {
  word: VocabWord;
  onGrade: (grade: number) => void;
}

// Shared inline styles for each face to guarantee correct 3D behaviour
// across all browsers. Tailwind's `backface-hidden` class is NOT in core
// Tailwind and requires a plugin — using inline styles is the safest option.
const faceBase: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

const backFace: React.CSSProperties = {
  ...faceBase,
  transform: 'rotateY(180deg)',
};

export function Flashcard({ word, onGrade }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((f) => !f);

  const playPronunciation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-lg mx-auto h-[400px] relative" style={{ perspective: '1200px' }}>
      <motion.div
        className="w-full h-full relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 240, damping: 22 }}
        onClick={handleFlip}
      >
        {/* ── FRONT ─────────────────────────────────────────────────────── */}
        <div
          className="w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center border-2 border-border/50 shadow-xl bg-gradient-to-br from-card to-secondary/30"
          style={faceBase}
        >
          <button
            onClick={playPronunciation}
            className="absolute top-6 right-6 p-3 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
          >
            <Volume2 className="w-6 h-6" />
          </button>

          <h2 className="text-5xl font-bold tracking-tight mb-4 text-foreground text-center">
            {word.word}
          </h2>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Tap to flip
          </p>

          {/* Mastery bar */}
          <div className="absolute bottom-6 flex gap-2 w-full px-8 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  'h-1.5 flex-1 rounded-full',
                  i < word.masteryLevel ? 'bg-primary' : 'bg-primary/20'
                )}
              />
            ))}
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────────────────── */}
        <div
          className="w-full h-full rounded-3xl p-8 flex flex-col border-2 border-border/50 shadow-xl overflow-hidden bg-gradient-to-bl from-card to-indigo-500/10"
          style={backFace}
        >
          <div className="flex-1 overflow-y-auto pr-1 space-y-5">
            {/* Word header on back */}
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-primary">{word.word}</span>
              <button
                onClick={(e) => { e.stopPropagation(); playPronunciation(e); }}
                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                Definition
              </h3>
              <p className="text-xl font-medium leading-snug text-foreground">
                {word.definition}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                Example
              </h3>
              <p className="text-base text-muted-foreground italic border-l-4 border-indigo-500/40 pl-4 py-1">
                &ldquo;{word.example}&rdquo;
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Synonyms
              </h3>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((syn) => (
                  <span
                    key={syn}
                    className="px-3 py-1 bg-secondary rounded-full text-sm font-medium border border-border/50"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grading buttons — rendered outside the 3D container so they aren't affected */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-24 w-full flex justify-center gap-3"
        >
          <button
            onClick={() => { onGrade(1); setIsFlipped(false); }}
            className="px-5 py-3 rounded-xl font-bold bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white hover:border-transparent transition-all shadow-sm"
          >
            Again
          </button>
          <button
            onClick={() => { onGrade(3); setIsFlipped(false); }}
            className="px-5 py-3 rounded-xl font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-white hover:border-transparent transition-all shadow-sm"
          >
            Hard
          </button>
          <button
            onClick={() => { onGrade(4); setIsFlipped(false); }}
            className="px-5 py-3 rounded-xl font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white hover:border-transparent transition-all shadow-sm"
          >
            Good
          </button>
          <button
            onClick={() => { onGrade(5); setIsFlipped(false); }}
            className="px-5 py-3 rounded-xl font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white hover:border-transparent transition-all shadow-sm"
          >
            Easy
          </button>
        </motion.div>
      )}
    </div>
  );
}

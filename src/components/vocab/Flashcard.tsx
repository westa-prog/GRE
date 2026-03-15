import { useState } from 'react';
import { VocabWord } from '@/types';
import { motion } from 'framer-motion';
import { Volume2, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

interface FlashcardProps {
  word: VocabWord;
  onGrade: (grade: number) => void;
}

export function Flashcard({ word, onGrade }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playPronunciation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-lg mx-auto h-[400px] perspective-1000 relative">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        onClick={handleFlip}
      >
        {/* Front */}
        <div className={clsx(
          "absolute inset-0 w-full h-full backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center border-2 border-border/50 shadow-xl",
          "bg-gradient-to-br from-card to-secondary/30"
        )}>
          <button 
            onClick={playPronunciation}
            className="absolute top-6 right-6 p-3 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
          >
            <Volume2 className="w-6 h-6" />
          </button>
          
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-foreground">{word.word}</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Tap to flip
          </p>
          
          <div className="absolute bottom-6 flex gap-2 w-full px-8 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className={clsx(
                  "h-1.5 flex-1 rounded-full",
                  i < word.masteryLevel ? "bg-primary" : "bg-primary/20"
                )}
              />
            ))}
          </div>
        </div>

        {/* Back */}
        <div 
          className={clsx(
            "absolute inset-0 w-full h-full backface-hidden rounded-3xl p-8 flex flex-col border-2 border-border/50 shadow-xl overflow-hidden",
            "bg-gradient-to-bl from-card to-indigo-500/5 dark:to-indigo-500/10"
          )}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Definition</h3>
              <p className="text-2xl font-medium leading-tight text-foreground">{word.definition}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">Example</h3>
              <p className="text-lg text-muted-foreground italic border-l-4 border-indigo-500/30 pl-4 py-1">"{word.example}"</p>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Synonyms</h3>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map(syn => (
                  <span key={syn} className="px-3 py-1 bg-secondary rounded-full text-sm font-medium border border-border/50">
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grading Buttons (only visible when flipped) */}
      {isFlipped && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-24 w-full flex justify-center gap-3"
        >
          <button onClick={() => { onGrade(1); setIsFlipped(false); }} className="px-6 py-3 rounded-xl font-bold bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive text-white hover:border-transparent transition-all shadow-sm">
            Again (1)
          </button>
          <button onClick={() => { onGrade(3); setIsFlipped(false); }} className="px-6 py-3 rounded-xl font-bold bg-orange-500/10 text-orange-600 border border-orange-500/20 hover:bg-orange-500 text-white hover:border-transparent transition-all shadow-sm">
            Hard (3)
          </button>
          <button onClick={() => { onGrade(4); setIsFlipped(false); }} className="px-6 py-3 rounded-xl font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500 text-white hover:border-transparent transition-all shadow-sm">
            Good (4)
          </button>
          <button onClick={() => { onGrade(5); setIsFlipped(false); }} className="px-6 py-3 rounded-xl font-bold bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500 text-white hover:border-transparent transition-all shadow-sm">
            Easy (5)
          </button>
        </motion.div>
      )}
    </div>
  );
}

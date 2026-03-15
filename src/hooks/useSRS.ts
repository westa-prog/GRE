import { useState, useCallback } from 'react';
import { VocabWord } from '@/types';
import { mockVocab } from '@/lib/mockVocab';

export function useSRS() {
  const [deck, setDeck] = useState<VocabWord[]>(mockVocab);
  const [sessionQueue, setSessionQueue] = useState<VocabWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize a daily session
  const startSession = useCallback((limit = 20) => {
    const now = new Date();
    // Filter words whose nextReviewDate is past or today
    let due = deck.filter(w => new Date(w.nextReviewDate) <= now);
    
    // If fewer due than limit, throw in some new ones 
    if (due.length < limit) {
      const remainingNew = deck.filter(w => w.masteryLevel === 0 && !due.includes(w));
      due = [...due, ...remainingNew.slice(0, limit - due.length)];
    }
    
    // Shuffle
    due.sort(() => Math.random() - 0.5);
    setSessionQueue(due.slice(0, limit));
    setCurrentIndex(0);
  }, [deck]);

  const gradeCard = (wordId: string, grade: number) => {
    setDeck(prev => prev.map(w => {
      if (w.id !== wordId) return w;
      
      // Basic SM-2 Logic representation
      let newMastery = w.masteryLevel;
      if (grade >= 4) {
        newMastery = Math.min(5, newMastery + 1);
      } else if (grade < 3) {
        newMastery = Math.max(0, newMastery - 1);
      }
      
      // Calculate next interval (simplified)
      const nextDate = new Date();
      let daysToAdd = 1;
      if (newMastery === 1) daysToAdd = 1;
      else if (newMastery === 2) daysToAdd = 3;
      else if (newMastery === 3) daysToAdd = 7;
      else if (newMastery === 4) daysToAdd = 14;
      else if (newMastery === 5) daysToAdd = 30;
      
      if (grade < 3) daysToAdd = 0; // review today
      
      nextDate.setDate(nextDate.getDate() + daysToAdd);
      
      return {
        ...w,
        masteryLevel: newMastery,
        nextReviewDate: nextDate.toISOString()
      };
    }));
    
    setCurrentIndex(prev => prev + 1);
  };

  const currentWord = sessionQueue[currentIndex];
  const isComplete = sessionQueue.length > 0 && currentIndex >= sessionQueue.length;

  return {
    deck,
    sessionQueue,
    currentWord,
    isComplete,
    progress: sessionQueue.length > 0 ? (currentIndex / sessionQueue.length) * 100 : 0,
    startSession,
    gradeCard
  };
}

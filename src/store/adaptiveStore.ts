import { create } from 'zustand';
import { Question } from '../types';

interface AdaptiveStore {
  theta: number; // Ability estimate (-3 to +3 usually in IRT, we can scale to 130-170)
  currentQuestion: Question | null;
  history: { question: Question; isCorrect: boolean }[];
  
  submitAnswer: (isCorrect: boolean) => void;
  nextQuestion: (question: Question) => void;
  resetSession: () => void;
}

export const useAdaptiveStore = create<AdaptiveStore>((set) => ({
  theta: 150, // Start average
  currentQuestion: null,
  history: [],
  
  submitAnswer: (isCorrect) =>
    set((state) => {
      if (!state.currentQuestion) return state;
      
      // Simple IRT update: theta increases if correct, decreases if wrong
      // Magnitude depends on difficulty
      const diffImpact = (state.currentQuestion.difficulty - 3) * 0.5; 
      let newTheta = state.theta;
      
      if (isCorrect) {
        newTheta += 2 - diffImpact;
      } else {
        newTheta -= 2 + diffImpact;
      }
      
      // Bound it between 130 and 170
      newTheta = Math.max(130, Math.min(170, newTheta));
      
      return {
        theta: newTheta,
        history: [...state.history, { question: state.currentQuestion, isCorrect }]
      };
    }),
    
  nextQuestion: (question) => 
    set({ currentQuestion: question }),
    
  resetSession: () =>
    set({ theta: 150, currentQuestion: null, history: [] })
}));

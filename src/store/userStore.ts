import { create } from 'zustand';
import { UserStats } from '../types';

interface UserStore {
  stats: UserStats;
  updateTargetScores: (quant: number, verbal: number) => void;
  recordPracticeResult: (isCorrect: boolean) => void;
  updateTopicMastery: (topic: string, amount: number) => void;
}

const initialStats: UserStats = {
  targetScoreQuant: 165,
  targetScoreVerbal: 160,
  currentScoreQuant: 155,
  currentScoreVerbal: 152,
  questionsAnswered: 142,
  accuracy: 68,
  studyStreakDays: 12,
  recentScores: [
    { date: '2023-10-01', quant: 150, verbal: 148 },
    { date: '2023-10-08', quant: 151, verbal: 150 },
    { date: '2023-10-15', quant: 153, verbal: 151 },
    { date: '2023-10-22', quant: 155, verbal: 152 },
  ],
  topicMastery: {
    'Algebra': 75,
    'Geometry': 60,
    'Number Properties': 82,
    'Text Completion': 65,
    'Reading Comprehension': 70,
    'Sentence Equivalence': 55,
  }
};

export const useUserStore = create<UserStore>((set) => ({
  stats: initialStats,
  
  updateTargetScores: (quant, verbal) => 
    set((state) => ({ 
      stats: { ...state.stats, targetScoreQuant: quant, targetScoreVerbal: verbal } 
    })),
    
  recordPracticeResult: (isCorrect) => 
    set((state) => {
      const { questionsAnswered, accuracy } = state.stats;
      const correctAnswers = Math.round((accuracy / 100) * questionsAnswered);
      const newTotal = questionsAnswered + 1;
      const newCorrect = correctAnswers + (isCorrect ? 1 : 0);
      const newAccuracy = Math.round((newCorrect / newTotal) * 100);
      
      return {
        stats: {
          ...state.stats,
          questionsAnswered: newTotal,
          accuracy: newAccuracy,
        }
      };
    }),
    
  updateTopicMastery: (topic, amount) =>
    set((state) => {
      const currentMastery = state.stats.topicMastery[topic] || 50;
      const newMastery = Math.max(0, Math.min(100, currentMastery + amount));
      
      return {
        stats: {
          ...state.stats,
          topicMastery: {
            ...state.stats.topicMastery,
            [topic]: newMastery
          }
        }
      };
    })
}));

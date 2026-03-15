export type QuestionType = 'verbal' | 'quant' | 'awa';
export type QuestionFormat = 'multiple-choice' | 'multiple-select' | 'numeric-entry' | 'text-completion' | 'sentence-equivalence' | 'essay';
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  type: QuestionType;
  format: QuestionFormat;
  difficulty: Difficulty;
  content: string; // The prompt or question text
  options?: string[]; // For MCQs/MSQs
  correctAnswer: string | string[]; // Can be single option, multiple options, or numeric value
  explanation: string;
  topic: string; // e.g., 'Algebra', 'Geometry', 'Reading Comprehension'
}

export interface VocabWord {
  id: string;
  word: string;
  definition: string;
  example: string;
  synonyms: string[];
  masteryLevel: number; // 0 to 5, based on SM-2 algorithm
  nextReviewDate: string; // ISO date string
}

export interface UserStats {
  targetScoreQuant: number;
  targetScoreVerbal: number;
  currentScoreQuant: number;
  currentScoreVerbal: number;
  questionsAnswered: number;
  accuracy: number; // percentage
  studyStreakDays: number;
  lastPracticeDate?: string;
  practiceDates: string[];
  recentScores: { date: string; quant: number; verbal: number }[];
  topicMastery: Record<string, number>; // topic -> mastery level (0-100)
}

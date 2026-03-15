import { create } from 'zustand';
import { Question } from '../types';

type SectionType = 'AWA' | 'Verbal 1' | 'Quant 1' | 'Verbal 2' | 'Quant 2';
type TestState = 'not-started' | 'in-progress' | 'paused' | 'finished';

interface TestStore {
  status: TestState;
  currentSectionIndex: number;
  sections: SectionType[];
  timeRemaining: number; // in seconds
  questions: Record<string, Question[]>; // SectionType as string -> Questions
  userAnswers: Record<string, string | string[]>; // questionId -> answer
  
  startTest: () => void;
  pauseTest: () => void;
  resumeTest: () => void;
  endTest: () => void;
  nextSection: () => void;
  submitAnswer: (questionId: string, answer: string | string[]) => void;
  tickTimer: () => void;
}

const SECTION_TIMES: Record<SectionType, number> = {
  'AWA': 1800, // 30 mins
  'Verbal 1': 1800,
  'Quant 1': 2100, // 35 mins
  'Verbal 2': 1800,
  'Quant 2': 2100,
};

export const useTestStore = create<TestStore>((set) => ({
  status: 'not-started',
  currentSectionIndex: 0,
  sections: ['AWA', 'Verbal 1', 'Quant 1', 'Verbal 2', 'Quant 2'],
  timeRemaining: SECTION_TIMES['AWA'],
  questions: {},
  userAnswers: {},
  
  startTest: () => 
    set({ status: 'in-progress', currentSectionIndex: 0, timeRemaining: SECTION_TIMES['AWA'] }),
    
  pauseTest: () => set({ status: 'paused' }),
  
  resumeTest: () => set({ status: 'in-progress' }),
  
  endTest: () => set({ status: 'finished', timeRemaining: 0 }),
  
  nextSection: () => 
    set((state) => {
      const nextIndex = state.currentSectionIndex + 1;
      if (nextIndex >= state.sections.length) {
        return { status: 'finished', currentSectionIndex: nextIndex, timeRemaining: 0 };
      }
      return { 
        currentSectionIndex: nextIndex, 
        timeRemaining: SECTION_TIMES[state.sections[nextIndex]] 
      };
    }),
    
  submitAnswer: (questionId, answer) =>
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [questionId]: answer
      }
    })),
    
  tickTimer: () =>
    set((state) => ({
      timeRemaining: Math.max(0, state.timeRemaining - 1)
    }))
}));

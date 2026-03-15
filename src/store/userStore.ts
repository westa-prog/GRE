'use client';

import { create } from 'zustand';
import type { UserStats } from '../types';

const USERS_KEY = 'gre_users';

export const initialStats: UserStats = {
  targetScoreQuant: 160,
  targetScoreVerbal: 160,
  currentScoreQuant: 0,
  currentScoreVerbal: 0,
  questionsAnswered: 0,
  accuracy: 0,
  studyStreakDays: 0,
  practiceDates: [],
  recentScores: [],
  topicMastery: {},
};

function loadUsers(): Record<string, { password: string; membership?: string; stats: UserStats }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, { password: string; membership?: string; stats: UserStats }>) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, { password: string; membership?: string; stats: UserStats }>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUserFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('gre_current_user');
}

function persistStats(stats: UserStats) {
  const currentUser = getCurrentUserFromStorage();
  if (!currentUser) return;

  const users = loadUsers();
  if (!users[currentUser]) return;

  users[currentUser] = { ...users[currentUser], stats };
  saveUsers(users);
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function calculateStreak(prevDate?: string, newDate?: string, currentStreak = 0) {
  if (!newDate) return currentStreak;
  const today = new Date(newDate);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (!prevDate) return 1;

  const prev = new Date(prevDate);

  if (prev.toISOString().slice(0, 10) === newDate) {
    return currentStreak;
  }

  if (prev.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10)) {
    return currentStreak + 1;
  }

  return 1;
}

interface UserStore {
  stats: UserStats;
  setStats: (stats: UserStats) => void;
  resetStats: () => void;
  updateTargetScores: (quant: number, verbal: number) => void;
  updateTopicMastery: (topic: string, amount: number) => void;
  recordSessionResult: (options: {
    quantScore: number;
    verbalScore: number;
    questionsAnswered: number;
    correctAnswers: number;
    date?: string;
  }) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  stats: initialStats,

  setStats: (stats) => {
    set({ stats });
    persistStats(stats);
  },

  resetStats: () => {
    set({ stats: initialStats });
    persistStats(initialStats);
  },

  updateTargetScores: (quant, verbal) => {
    set((state) => {
      const next = { ...state.stats, targetScoreQuant: quant, targetScoreVerbal: verbal };
      persistStats(next);
      return { stats: next };
    });
  },

  updateTopicMastery: (topic, amount) => {
    set((state) => {
      const currentMastery = state.stats.topicMastery[topic] ?? 50;
      const newMastery = Math.max(0, Math.min(100, currentMastery + amount));
      const next = {
        ...state.stats,
        topicMastery: {
          ...state.stats.topicMastery,
          [topic]: newMastery,
        },
      };
      persistStats(next);
      return { stats: next };
    });
  },

  recordSessionResult: ({ quantScore, verbalScore, questionsAnswered, correctAnswers, date }) => {
    set((state) => {
      const today = date ?? getToday();
      const newTotalQuestions = state.stats.questionsAnswered + questionsAnswered;
      const newCorrect = Math.round((state.stats.accuracy / 100) * state.stats.questionsAnswered) + correctAnswers;
      const newAccuracy = newTotalQuestions ? Math.round((newCorrect / newTotalQuestions) * 100) : 0;

      const nextPracticeDates = Array.from(new Set([...state.stats.practiceDates, today]));
      const streak = calculateStreak(state.stats.lastPracticeDate, today, state.stats.studyStreakDays);

      const nextRecentScores = [{ date: today, quant: quantScore, verbal: verbalScore }, ...state.stats.recentScores].slice(0, 10);

      const nextStats: UserStats = {
        ...state.stats,
        currentScoreQuant: quantScore,
        currentScoreVerbal: verbalScore,
        questionsAnswered: newTotalQuestions,
        accuracy: newAccuracy,
        studyStreakDays: streak,
        lastPracticeDate: today,
        practiceDates: nextPracticeDates,
        recentScores: nextRecentScores,
      };

      persistStats(nextStats);
      return { stats: nextStats };
    });
  },
}));

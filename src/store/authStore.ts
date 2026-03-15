'use client';

import { create } from 'zustand';
import { useUserStore, initialStats } from './userStore';
import type { UserStats } from '@/types';

const USERS_KEY = 'gre_users';
const CURRENT_USER_KEY = 'gre_current_user';

export interface StoredUser {
  username: string;
  password: string;
  membership?: string;
  stats: UserStats;
}

export interface AuthStore {
  currentUser: string | null;
  membership?: string;
  isLoaded: boolean;
  login: (username: string, password: string) => { success: boolean; message?: string };
  signup: (username: string, password: string, membership?: string) => { success: boolean; message?: string };
  logout: () => void;
  loadFromStorage: () => void;
}

function loadUsers(): Record<string, StoredUser> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredUser>) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, StoredUser>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(username: string | null) {
  if (typeof window === 'undefined') return;
  if (username) {
    window.localStorage.setItem(CURRENT_USER_KEY, username);
  } else {
    window.localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function getCurrentUserFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(CURRENT_USER_KEY);
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  membership: undefined,
  isLoaded: false,

  login: (username, password) => {
    const users = loadUsers();
    const user = users[username];

    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }

    set({ currentUser: username, membership: user.membership ?? undefined, isLoaded: true });
    setCurrentUser(username);

    useUserStore.getState().setStats(user.stats);

    return { success: true };
  },

  signup: (username, password, membership) => {
    const users = loadUsers();
    if (users[username]) {
      return { success: false, message: 'Username already taken.' };
    }

    const newUser: StoredUser = {
      username,
      password,
      membership: membership ?? 'Free',
      stats: initialStats,
    };

    users[username] = newUser;
    saveUsers(users);

    set({ currentUser: username, membership: newUser.membership, isLoaded: true });
    setCurrentUser(username);
    useUserStore.getState().setStats(newUser.stats);

    return { success: true };
  },

  logout: () => {
    set({ currentUser: null, membership: undefined, isLoaded: true });
    setCurrentUser(null);
    useUserStore.getState().resetStats();
  },

  loadFromStorage: () => {
    const username = getCurrentUserFromStorage();
    if (!username) {
      set({ currentUser: null, membership: undefined, isLoaded: true });
      return;
    }

    const users = loadUsers();
    const user = users[username];
    if (!user) {
      set({ currentUser: null, membership: undefined, isLoaded: true });
      setCurrentUser(null);
      return;
    }

    set({ currentUser: username, membership: user.membership, isLoaded: true });
    useUserStore.getState().setStats(user.stats);
  }
}));

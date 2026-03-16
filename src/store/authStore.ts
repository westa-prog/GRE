'use client';

import { create } from 'zustand';
import { useUserStore, initialStats } from './userStore';
import type { UserStats } from '@/types';

const USERS_KEY = 'gre_users';
const CURRENT_USER_KEY = 'gre_current_user';
const INVITES_KEY = 'gre_invites';

export interface StoredUser {
  username: string;
  password: string;
  membership?: string;
  role?: 'admin' | 'user';
  stats: UserStats;
}

export interface AuthStore {
  currentUser: string | null;
  membership?: string;
  role?: 'admin' | 'user';
  isLoaded: boolean;
  login: (username: string, password: string) => { success: boolean; message?: string };
  signup: (username: string, password: string, inviteCode?: string) => { success: boolean; message?: string };
  adminCreateUser: (username: string, password: string, membership?: string) => { success: boolean; message?: string };
  logout: () => void;
  loadFromStorage: () => void;
  generateInviteCode: () => string;
  getInviteCodes: () => string[];
}

function loadUsers(): Record<string, StoredUser> {
  let users: Record<string, StoredUser> = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(USERS_KEY);
      if (raw) users = JSON.parse(raw);
    } catch {
      users = {};
    }
  }

  // Seed default admin account
  if (!users['Sunnatilla']) {
    users['Sunnatilla'] = {
      username: 'Sunnatilla',
      password: '7799',
      membership: 'Admin',
      role: 'admin',
      stats: initialStats,
    };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }

  return users;
}

function saveUsers(users: Record<string, StoredUser>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadInvites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(INVITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveInvites(codes: string[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(INVITES_KEY, JSON.stringify(codes));
}

function getCurrentUserFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(CURRENT_USER_KEY);
}

function setCurrentUser(username: string | null) {
  if (typeof window === 'undefined') return;
  if (username) {
    window.localStorage.setItem(CURRENT_USER_KEY, username);
  } else {
    window.localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function consumeInviteCode(code: string): boolean {
  const codes = loadInvites();
  const index = codes.indexOf(code);
  if (index === -1) return false;
  codes.splice(index, 1);
  saveInvites(codes);
  return true;
}

function createInviteCode(): string {
  const code = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2).toUpperCase();
  const codes = loadInvites();
  codes.push(code);
  saveInvites(codes);
  return code;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  membership: undefined,
  role: undefined,
  isLoaded: false,

  login: (username, password) => {
    const users = loadUsers();
    
    // Case-insensitive user lookup
    const userKey = Object.keys(users).find(
      key => key.toLowerCase() === username.toLowerCase()
    );

    if (!userKey) {
      return { success: false, message: 'User not found.' };
    }

    const user = users[userKey];

    if (user.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }

    set({
      currentUser: user.username,
      membership: user.membership ?? undefined,
      role: user.role ?? 'user',
      isLoaded: true,
    });
    setCurrentUser(user.username);

    useUserStore.getState().setStats(user.stats);

    return { success: true };
  },

  signup: (username, password, inviteCode) => {
    const users = loadUsers();

    if (users[username]) {
      return { success: false, message: 'Username already taken.' };
    }

    const isFirstUser = Object.keys(users).length === 0;
    const isAdmin = isFirstUser;

    if (!isFirstUser) {
      if (!inviteCode) {
        return { success: false, message: 'Invite code is required.' };
      }

      if (!consumeInviteCode(inviteCode)) {
        return { success: false, message: 'Invalid or expired invite code.' };
      }
    }

    const newUser: StoredUser = {
      username,
      password,
      membership: isAdmin ? 'Admin' : 'Free',
      role: isAdmin ? 'admin' : 'user',
      stats: initialStats,
    };

    users[username] = newUser;
    saveUsers(users);

    set({
      currentUser: username,
      membership: newUser.membership,
      role: newUser.role,
      isLoaded: true,
    });
    setCurrentUser(username);
    useUserStore.getState().setStats(newUser.stats);

    return { success: true };
  },

  adminCreateUser: (username, password, membership = 'Free') => {
    const users = loadUsers();

    if (users[username]) {
      return { success: false, message: 'Username already taken.' };
    }

    const newUser: StoredUser = {
      username,
      password,
      membership,
      role: 'user',
      stats: initialStats,
    };

    users[username] = newUser;
    saveUsers(users);

    return { success: true };
  },

  logout: () => {
    set({ currentUser: null, membership: undefined, role: undefined, isLoaded: true });
    setCurrentUser(null);
    useUserStore.getState().resetStats();
  },

  loadFromStorage: () => {
    const username = getCurrentUserFromStorage();
    if (!username) {
      set({ currentUser: null, membership: undefined, role: undefined, isLoaded: true });
      return;
    }

    const users = loadUsers();
    const user = users[username];
    if (!user) {
      set({ currentUser: null, membership: undefined, role: undefined, isLoaded: true });
      setCurrentUser(null);
      return;
    }

    set({
      currentUser: username,
      membership: user.membership,
      role: user.role ?? 'user',
      isLoaded: true,
    });
    useUserStore.getState().setStats(user.stats);
  },

  generateInviteCode: () => {
    return createInviteCode();
  },

  getInviteCodes: () => {
    return loadInvites();
  },
}));

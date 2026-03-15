'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const router = useRouter();
  const { currentUser, loadFromStorage, isLoaded } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    isLoaded: state.isLoaded,
    loadFromStorage: state.loadFromStorage,
  }));

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!isLoaded) return;
    if (currentUser) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [currentUser, isLoaded, router]);

  return null;
}

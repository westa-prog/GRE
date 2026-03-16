'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  const isLoaded = useAuthStore((state) => state.isLoaded);

  useEffect(() => {
    useAuthStore.getState().loadFromStorage();
  }, []);

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

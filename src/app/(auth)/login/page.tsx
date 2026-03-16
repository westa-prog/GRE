'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  const isLoaded = useAuthStore((state) => state.isLoaded);
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    useAuthStore.getState().loadFromStorage();
  }, []);

  useEffect(() => {
    if (isLoaded && currentUser) {
      router.push('/dashboard');
    }
  }, [isLoaded, currentUser, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const result = login(username.trim(), password);
    if (!result.success) {
      setError(result.message || 'Login failed');
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="bg-card/70 border border-white/10 shadow-xl rounded-3xl p-10 backdrop-blur-sm">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to continue your GRE training.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-border/50 bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="your username"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-border/50 bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && <div className="text-sm text-destructive font-medium">{error}</div>}

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-primary font-semibold hover:underline">
          Create one
        </Link>
        .
      </div>
    </div>
  );
}

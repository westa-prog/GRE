'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Lock, User, Key } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { currentUser, isLoaded, signup, loadFromStorage } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    isLoaded: state.isLoaded,
    signup: state.signup,
    loadFromStorage: state.loadFromStorage,
  }));

  const [inviteCode, setInviteCode] = useState('');
  const [requiresInvite, setRequiresInvite] = useState(true);

  useEffect(() => {
    // Determine if there are existing users; if not, allow initial admin signup without an invite
    const rawUsers = typeof window !== 'undefined' ? window.localStorage.getItem('gre_users') : null;
    const userCount = rawUsers ? Object.keys(JSON.parse(rawUsers)).length : 0;
    setRequiresInvite(userCount > 0);
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (isLoaded && currentUser) {
      router.push('/dashboard');
    }
  }, [isLoaded, currentUser, router]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = signup(username.trim(), password, inviteCode.trim() || undefined);
    if (!result.success) {
      setError(result.message || 'Signup failed.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="bg-card/70 border border-white/10 shadow-xl rounded-3xl p-10 backdrop-blur-sm">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start tracking your progress and saving scores.</p>
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
              placeholder="choose a username"
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
              placeholder="Enter a password"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-border/50 bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Repeat your password"
              required
            />
          </div>
        </div>

        {requiresInvite && (
          <div className="space-y-1">
            <label className="text-sm font-medium">Invite Code</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-border/50 bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter invite code"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Invite code is required to create an account. If you are the first user, leave this blank.
            </p>
          </div>
        )}

        {error && <div className="text-sm text-destructive font-medium">{error}</div>}

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}

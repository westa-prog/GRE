'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { UserPlus, ShieldAlert, Key, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const adminCreateUser = useAuthStore((state) => state.adminCreateUser);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [membership, setMembership] = useState('Free');
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You must be an administrator to view this page.</p>
        <button 
          onClick={() => router.push('/dashboard')}
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const result = adminCreateUser(username.trim(), password, membership);
    
    if (result.success) {
      setStatusMsg({ text: `Successfully created user: ${username}`, type: 'success' });
      setUsername('');
      setPassword('');
      setMembership('Free');
    } else {
      setStatusMsg({ text: result.message || 'Error creating user', type: 'error' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-primary" />
            Admin Portal
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage student accounts for the GRE platform.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">Create New Student Account</h2>
        
        <form onSubmit={handleCreateUser} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-border/50 bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Student username"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-border/50 bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Assign a password"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Membership Tier</label>
            <select
              value={membership}
              onChange={(e) => setMembership(e.target.value)}
              className="w-full px-3 py-3 rounded-xl border border-border/50 bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Free">Free Basic</option>
              <option value="Premium">Premium Access</option>
            </select>
          </div>

          {statusMsg && (
            <div className={`p-4 rounded-xl text-sm font-medium ${
              statusMsg.type === 'success' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'
            }`}>
              {statusMsg.text}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors mt-4"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

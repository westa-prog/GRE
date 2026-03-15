import type { Metadata } from 'next';
import './auth.css';

export const metadata: Metadata = {
  title: 'Stratosphere GRE - Login',
  description: 'Login to access GRE practice and analytics',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-foreground flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        {children}
      </div>
    </div>
  );
}

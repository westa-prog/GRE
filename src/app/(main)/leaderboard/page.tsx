'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Flame } from 'lucide-react';
import type { StoredUser } from '@/store/authStore';

type LeaderboardEntry = {
  username: string;
  totalScore: number;
  quantScore: number;
  verbalScore: number;
  accuracy: number;
  streak: number;
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    try {
      const rawUsers = localStorage.getItem('gre_users');
      if (rawUsers) {
        const parsed: Record<string, StoredUser> = JSON.parse(rawUsers);
        const entries = Object.entries(parsed).map(([username, data]) => {
          const stats = data.stats;
          return {
            username,
            totalScore: stats.currentScoreQuant + stats.currentScoreVerbal,
            quantScore: stats.currentScoreQuant,
            verbalScore: stats.currentScoreVerbal,
            accuracy: stats.accuracy,
            streak: stats.studyStreakDays,
          };
        });
        
        // Sort by total score descending, then by accuracy
        entries.sort((a, b) => {
          if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
          return b.accuracy - a.accuracy;
        });
        
        setUsers(entries);
      }
    } catch (e) {
      console.error('Failed to load leaderboard', e);
    }
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Global Leaderboard
          </h1>
          <p className="text-muted-foreground mt-2">
            See how you rank against other GRE test takers. Top performers earn special badges.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/50 border-b border-border/50 text-muted-foreground text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold text-center w-20">Rank</th>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold text-right">Total Score</th>
              <th className="p-4 font-semibold text-right hidden sm:table-cell">Quant / Verbal</th>
              <th className="p-4 font-semibold text-right hidden md:table-cell">Accuracy</th>
              <th className="p-4 font-semibold text-right">Streak</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No users found on the leaderboard yet.
                </td>
              </tr>
            ) : (
              users.map((user, index) => {
                const isTop3 = index < 3;
                const badges = [
                  <Medal key={1} className="w-6 h-6 text-yellow-500" />,
                  <Medal key={2} className="w-5 h-5 text-zinc-300" />,
                  <Medal key={3} className="w-5 h-5 text-amber-600" />
                ];
                
                return (
                  <tr 
                    key={user.username} 
                    className={`border-b border-border/10 transition-colors ${isTop3 ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-secondary/20'}`}
                  >
                    <td className="p-4 font-bold text-lg text-center">
                      <div className="flex justify-center items-center">
                        {isTop3 ? badges[index] : <span className="text-muted-foreground">#{index + 1}</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                          alt={user.username}
                          className="w-10 h-10 rounded-full border border-border" 
                        />
                        <span className="font-bold">{user.username}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`font-mono text-xl font-bold ${isTop3 ? 'text-primary' : 'text-foreground'}`}>
                        {user.totalScore > 0 ? user.totalScore : '-'}
                      </span>
                    </td>
                    <td className="p-4 text-right hidden sm:table-cell text-muted-foreground">
                      {user.quantScore} / {user.verbalScore}
                    </td>
                    <td className="p-4 text-right hidden md:table-cell">
                      <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-secondary text-xs font-semibold">
                        {user.accuracy}%
                      </span>
                    </td>
                    <td className="p-4 text-right text-orange-500 font-medium whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Flame className="w-4 h-4" />
                        {user.streak} days
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

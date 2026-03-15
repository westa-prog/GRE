'use client';

import { useUserStore } from '@/store/userStore';
import { Target, TrendingUp, CheckCircle, Flame } from 'lucide-react';

export function StatCards() {
  const { stats, resetStats } = useUserStore();

  const cards = [
    {
      title: 'Current Quant',
      value: stats.currentScoreQuant,
      target: stats.targetScoreQuant,
      icon: Target,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Current Verbal',
      value: stats.currentScoreVerbal,
      target: stats.targetScoreVerbal,
      icon: TrendingUp,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Total Accuracy',
      value: `${stats.accuracy}%`,
      subtitle: `${stats.questionsAnswered} questions`,
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      title: 'Study Streak',
      value: `${stats.studyStreakDays} days`,
      subtitle: 'Keep it up!',
      icon: Flame,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <h3 className="text-3xl font-bold mt-2 text-foreground">{card.value}</h3>
                {card.target ? (
                  <p className="text-sm mt-1 text-muted-foreground">Target: {card.target}</p>
                ) : (
                  <p className="text-sm mt-1 text-muted-foreground">{card.subtitle}</p>
                )}
              </div>
              <div className={`p-3 rounded-xl ${card.bg} ${card.color} transition-transform group-hover:scale-110`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
            
            {/* Decorative glow */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 ${card.bg}`} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => resetStats()}
          className="text-xs text-muted-foreground hover:text-foreground hover:underline"
        >
          Reset progress
        </button>
      </div>
    </>
  );
}

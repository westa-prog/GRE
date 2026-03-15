'use client';

import { useUserStore } from '@/store/userStore';
import { AlertCircle, ArrowRight } from 'lucide-react';

export function WeaknessTable() {
  const { stats } = useUserStore();

  const weaknesses = Object.entries(stats.topicMastery)
    .map(([topic, score]) => ({ topic, score }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 4);

  const getPriority = (score: number) => {
    if (score < 60) return { label: 'High Priority', color: 'bg-destructive/10 text-destructive border-destructive/20' };
    if (score < 75) return { label: 'Medium Priority', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' };
    return { label: 'Low Priority', color: 'bg-green-500/10 text-green-500 border-green-500/20' };
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border/50 flex justify-between items-center">
        <h3 className="text-lg font-bold">Actionable Weaknesses</h3>
        <button className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-secondary/30 text-muted-foreground text-xs uppercase tracking-wider">
            <th className="p-4 font-semibold">Topic Area</th>
            <th className="p-4 font-semibold">Mastery</th>
            <th className="p-4 font-semibold text-right">Recommended Action</th>
          </tr>
        </thead>
        <tbody>
          {weaknesses.map((item, i) => {
            const priority = getPriority(item.score);
            return (
              <tr key={i} className="border-b border-border/10 hover:bg-secondary/10 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary">
                      <AlertCircle className={`w-4 h-4 ${priority.color.includes('destructive') ? 'text-destructive' : 'text-orange-500'}`} />
                    </div>
                    <span className="font-semibold">{item.topic}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-medium">{item.score}%</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${priority.color}`}>
                      {priority.label}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
                    Practice Now
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

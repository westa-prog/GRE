'use client';

import { useUserStore } from '@/store/userStore';

export function PerformanceSummary() {
  const { stats } = useUserStore();
  
  // Sort topics by mastery to find strengths and weaknesses
  const topics = Object.entries(stats.topicMastery).map(([name, level]) => ({ name, level }));
  const sorted = [...topics].sort((a, b) => b.level - a.level);
  
  const strengths = sorted.slice(0, 3);
  const weaknesses = sorted.slice(-3).reverse();

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold mb-6">Topic Mastery Summary</h3>
      
      <div className="space-y-6 flex-1">
        <div>
          <h4 className="text-sm font-semibold text-green-500 mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Top Strengths
          </h4>
          <div className="space-y-3">
            {strengths.map(topic => (
              <div key={topic.name} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{topic.name}</span>
                  <span className="text-muted-foreground">{topic.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${topic.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-border/50" />

        <div>
          <h4 className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            Focus Areas
          </h4>
          <div className="space-y-3">
            {weaknesses.map(topic => (
              <div key={topic.name} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{topic.name}</span>
                  <span className="text-muted-foreground">{topic.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-destructive/80 rounded-full" style={{ width: `${topic.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

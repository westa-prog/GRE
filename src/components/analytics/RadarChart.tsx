'use client';

import { useUserStore } from '@/store/userStore';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export function TopicRadarChart() {
  const { stats } = useUserStore();
  
  const data = Object.entries(stats.topicMastery).map(([subject, A]) => ({
    subject,
    A,
    fullMark: 100,
  }));

  return (
    <div className="bg-card py-6 rounded-2xl border border-border/50 shadow-sm w-full h-[400px] flex flex-col">
      <h3 className="text-lg font-bold px-6 mb-2">Topic Mastery Radar</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Radar
              name="Mastery %"
              dataKey="A"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

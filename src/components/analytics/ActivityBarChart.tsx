'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', questions: 24 },
  { name: 'Tue', questions: 35 },
  { name: 'Wed', questions: 18 },
  { name: 'Thu', questions: 42 },
  { name: 'Fri', questions: 30 },
  { name: 'Sat', questions: 55 },
  { name: 'Sun', questions: 48 },
];

export function ActivityBarChart() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm w-full h-[400px] flex flex-col">
      <h3 className="text-lg font-bold mb-6">Daily Practice Volume</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--secondary))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="questions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

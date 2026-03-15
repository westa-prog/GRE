'use client';

import { useUserStore } from '@/store/userStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export function ScoreChart() {
  const { stats } = useUserStore();

  const data = stats.recentScores.map(score => {
    // Basic date formatter: "10/01" instead of "2023-10-01"
    const dateObj = new Date(score.date);
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    return {
      date: formattedDate,
      Quant: score.quant,
      Verbal: score.verbal,
    };
  });

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm w-full h-[400px] flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Score Progression</h3>
        <select className="bg-secondary text-sm px-3 py-1.5 rounded-lg border border-border/50 outline-none hover:bg-secondary/80 focus:ring-2 focus:ring-primary/50 transition-all">
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>All Time</option>
        </select>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" aspect={2}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorQuant" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorVerbal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              domain={[130, 170]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }} 
            />
            <Legend iconType="circle" />
            <Area 
              type="monotone" 
              dataKey="Quant" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorQuant)" 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area 
              type="monotone" 
              dataKey="Verbal" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVerbal)" 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

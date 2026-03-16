'use client';

import { BarChart3 } from 'lucide-react';
import { TopicRadarChart } from '@/components/analytics/RadarChart';
import { ActivityBarChart } from '@/components/analytics/ActivityBarChart';
import { WeaknessTable } from '@/components/analytics/WeaknessTable';
import { ScoreChart } from '@/components/dashboard/ScoreChart';

import { ExportPDFButton } from '@/components/analytics/ExportPDFButton';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            Deep dive into your performance metrics and weaknesses to optimize your prep.
          </p>
        </div>
        <ExportPDFButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoreChart />
        <TopicRadarChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeaknessTable />
        </div>
        <div className="lg:col-span-1">
          <ActivityBarChart />
        </div>
      </div>
    </div>
  );
}

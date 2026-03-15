import { StatCards } from '@/components/dashboard/StatCards';
import { ScoreChart } from '@/components/dashboard/ScoreChart';
import { StudyPlan } from '@/components/dashboard/StudyPlan';
import { PerformanceSummary } from '@/components/dashboard/PerformanceSummary';

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome back to Stratosphere GRE. Monitor your progress and stay on track.</p>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ScoreChart />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[400px]">
            <StudyPlan />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PerformanceSummary />
        </div>
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-2">Ready for a real challenge?</h3>
            <p className="text-muted-foreground mb-6">Take a full-length adaptive practice exam to get an accurate score prediction.</p>
            <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Start Full Simulator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

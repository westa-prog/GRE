'use client';

import Link from 'next/link';
import { StatCards } from '@/components/dashboard/StatCards';
import { ScoreChart } from '@/components/dashboard/ScoreChart';
import { StudyPlan } from '@/components/dashboard/StudyPlan';
import { PerformanceSummary } from '@/components/dashboard/PerformanceSummary';
import { useUserStore } from '@/store/userStore';
import { BrainCircuit, BookOpen, PenTool, MonitorPlay, BarChart3, Lightbulb, ArrowRight, Flame, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const QUICK_ACTIONS = [
  { href: '/practice', icon: BrainCircuit, label: 'Adaptive Practice', description: 'IRT-based session', color: 'from-primary/20 to-primary/5', border: 'border-primary/20', iconColor: 'text-primary' },
  { href: '/vocab', icon: BookOpen, label: 'Vocabulary', description: 'Spaced repetition', color: 'from-violet-500/20 to-violet-500/5', border: 'border-violet-500/20', iconColor: 'text-violet-500' },
  { href: '/writing', icon: PenTool, label: 'AWA Writing', description: 'Essay practice', color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/20', iconColor: 'text-emerald-500' },
  { href: '/simulator', icon: MonitorPlay, label: 'Full Test', description: '4-hour simulation', color: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/20', iconColor: 'text-amber-500' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics', description: 'Track progress', color: 'from-pink-500/20 to-pink-500/5', border: 'border-pink-500/20', iconColor: 'text-pink-500' },
  { href: '/resources', icon: Lightbulb, label: 'Resources', description: 'Tips & strategies', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/20', iconColor: 'text-cyan-500' },
];

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getLastSevenDays() {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    return date.toISOString().slice(0, 10);
  });
}

export default function DashboardPage() {
  const { stats } = useUserStore();
  const lastSeven = getLastSevenDays();
  const practiced = new Set(stats.practiceDates ?? []);
  const studied = lastSeven.map((d) => practiced.has(d));
  const todayIdx = lastSeven.length - 1;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ── Hero welcome bar ────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden border border-border/50 p-8 bg-gradient-to-br from-primary/10 via-transparent to-violet-600/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Welcome back</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Ready to crush your target score?
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Your adaptive engine is calibrated and ready. Pick up where you left off — every question moves you closer to your goal.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {/* Streak tracker */}
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl px-4 py-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-sm font-bold text-foreground">{stats.studyStreakDays}-Day Streak</div>
                <div className="text-xs text-muted-foreground">Keep it going!</div>
              </div>
            </div>
            {/* Week dots */}
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl px-4 py-3">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex gap-1.5">
                {WEEK_DAYS.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${i === todayIdx ? 'ring-2 ring-primary' : ''}
                      ${studied[i] ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                      {studied[i] ? '✓' : day}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────── */}
      <StatCards />

      {/* ── Quick Actions ───────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
          Jump Right In
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div key={action.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link
                href={action.href}
                className={`group flex flex-col items-start p-4 rounded-2xl bg-gradient-to-b ${action.color} border ${action.border} hover:shadow-lg transition-all hover:-translate-y-1 h-full`}
              >
                <action.icon className={`w-6 h-6 ${action.iconColor} mb-3`} />
                <span className="text-sm font-semibold text-foreground">{action.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{action.description}</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Main content grid ────────────────────────────────────────── */}
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

      {/* ── Performance + Simulator CTA ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PerformanceSummary />
        </div>
        <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 via-card to-violet-500/10 rounded-2xl p-8 border border-border/50 shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-md">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
              <MonitorPlay className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ready to go full-length?</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Take a complete 4-hour GRE simulation — two Verbal sections, two Quant sections, and an AWA. Get a precise score prediction and section breakdown.
            </p>
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Start Full Simulator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

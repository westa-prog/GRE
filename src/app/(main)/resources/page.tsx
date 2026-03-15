'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { TipsGrid } from '@/components/resources/TipsGrid';
import { ResourceLinks } from '@/components/resources/ResourceLinks';

export default function ResourcesPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden p-10 border border-border/50">
        {/* Futuristic animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-violet-600/10" />
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-violet-500/5 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-5"
          >
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <Lightbulb className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Resources & Prep Tips
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Expert strategies, battle-tested techniques, and curated external resources to help you score in the 90th+ percentile. Built for serious GRE preparation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Score Stats Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Questions Practiced', value: '1,200+', color: 'text-primary' },
          { label: 'Vocab Words Covered', value: '1,000+', color: 'text-violet-500' },
          { label: 'Avg Score Improvement', value: '+8 pts', color: 'text-emerald-500' },
          { label: 'Percentile Achievable', value: '90%+', color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 border border-border/50 text-center">
            <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Tips Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          <h2 className="text-2xl font-bold tracking-tight shrink-0">
            ⚡ Expert Prep Strategies
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-border to-transparent" />
        </div>
        <TipsGrid />
      </section>

      {/* Resources Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          <h2 className="text-2xl font-bold tracking-tight shrink-0">
            🔗 Trusted External Resources
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-border to-transparent" />
        </div>
        <ResourceLinks />
      </section>
    </div>
  );
}

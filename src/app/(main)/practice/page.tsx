'use client';

import { useState } from 'react';
import { useAdaptiveEngine } from '@/hooks/useAdaptiveEngine';
import { useAdaptiveStore } from '@/store/adaptiveStore';
import { useUserStore } from '@/store/userStore';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { Timer } from '@/components/practice/Timer';
import { BrainCircuit, Calculator, BookOpen, PenTool, CheckCircle2, TrendingUp, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

type Mode = 'all' | 'verbal' | 'quant' | 'awa';

const MODES: { id: Mode; label: string; icon: React.ElementType; desc: string; color: string }[] = [
  { id: 'all', label: 'Mixed Adaptive', icon: BrainCircuit, desc: 'Full adaptive session across all GRE sections', color: 'text-primary' },
  { id: 'quant', label: 'Quantitative', icon: Calculator, desc: 'Problem Solving, QC, and Data Interpretation', color: 'text-blue-500' },
  { id: 'verbal', label: 'Verbal', icon: BookOpen, desc: 'Reading Comprehension, Text Completion, SE', color: 'text-violet-500' },
  { id: 'awa', label: 'Analytical Writing', icon: PenTool, desc: 'Issue and Argument essay tasks', color: 'text-emerald-500' },
];

export default function PracticePage() {
  const { getNextQuestion } = useAdaptiveEngine();
  const { currentQuestion, theta, history, resetSession } = useAdaptiveStore();
  const { updateTopicMastery, recordPracticeResult } = useUserStore();
  const [started, setStarted] = useState(false);
  const [selectedMode, setSelectedMode] = useState<Mode>('all');
  const [sessionDone, setSessionDone] = useState(false);

  const correct = history.filter(h => h.isCorrect).length;
  const accuracy = history.length > 0 ? Math.round((correct / history.length) * 100) : 0;
  const estimatedScore = Math.round(130 + ((theta - 130) / 40) * 40);

  const handleStart = () => {
    resetSession?.();
    getNextQuestion();
    setStarted(true);
    setSessionDone(false);
  };

  const handleNext = () => {
    if (history.length > 0) {
      const last = history[history.length - 1];
      recordPracticeResult(last.isCorrect);
      updateTopicMastery(last.question.topic, last.isCorrect ? 5 : -2);
    }
    getNextQuestion();
  };

  const handleFinish = () => setSessionDone(true);

  // Pre-session landing
  if (!started) {
    return (
      <div className="space-y-10 max-w-4xl mx-auto animate-in fade-in duration-500">
        <div className="text-center pt-4">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/10 mx-auto mb-5">
            <BrainCircuit className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Adaptive Practice</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Our IRT-based engine adapts to your exact ability level in real time, serving questions at precisely the right difficulty.
          </p>
        </div>

        {/* Mode selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MODES.map((m) => (
            <motion.button
              key={m.id}
              onClick={() => setSelectedMode(m.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                selectedMode === m.id
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border/50 bg-card hover:border-border'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl bg-secondary ${selectedMode === m.id ? 'border border-primary/20' : 'border border-border/50'}`}>
                  <m.icon className={`w-5 h-5 ${m.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{m.label}</span>
                    {selectedMode === m.id && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all"
        >
          Launch {MODES.find(m => m.id === selectedMode)?.label} Session
        </button>
      </div>
    );
  }

  // Post-session summary
  if (sessionDone || (!currentQuestion && history.length > 0)) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-500 pt-12">
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border-4 border-emerald-500/20 shadow-xl mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-2">Session Complete!</h2>
          <p className="text-muted-foreground text-lg">Here's how you performed this session.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Questions', value: history.length, color: 'text-primary' },
            { label: 'Accuracy', value: `${accuracy}%`, color: 'text-emerald-500' },
            { label: 'Est. Score', value: `${estimatedScore}`, color: 'text-violet-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-5 border border-border/50">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Question breakdown */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 text-left space-y-3">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Question Breakdown
          </h3>
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-border/30 last:border-0">
              <span className="text-muted-foreground truncate max-w-[60%]">Q{i + 1}. {h.question.topic}</span>
              <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${h.isCorrect ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                {h.isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setStarted(false); setSessionDone(false); }}
          className="flex items-center gap-2 mx-auto px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Start New Session
        </button>
      </div>
    );
  }

  // Active session
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Session header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-5">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" />
            {MODES.find(m => m.id === selectedMode)?.label} Session
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{history.length} answered</p>
        </div>
        <div className="flex items-center gap-5">
          {/* Accuracy pill */}
          {history.length > 0 && (
            <div className="text-right">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Accuracy</div>
              <div className={`text-lg font-bold ${accuracy >= 70 ? 'text-emerald-500' : accuracy >= 50 ? 'text-amber-500' : 'text-destructive'}`}>
                {accuracy}%
              </div>
            </div>
          )}
          {/* theta bar */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Ability (θ)</p>
            <div className="flex items-center justify-end gap-2">
              <div className="h-2 w-20 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, ((theta - 130) / 40) * 100))}%` }} />
              </div>
              <span className="font-mono text-primary font-bold text-sm">{Math.round(theta)}</span>
            </div>
          </div>
          <Timer />
          <button
            onClick={handleFinish}
            className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
          >
            End Session
          </button>
        </div>
      </div>

      {currentQuestion ? (
        <QuestionCard question={currentQuestion} onNext={handleNext} />
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Question Bank Exhausted</h2>
          <p className="text-muted-foreground mb-6">You have answered all available questions for this mode.</p>
          <button onClick={handleFinish} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            View Results
          </button>
        </div>
      )}
    </div>
  );
}

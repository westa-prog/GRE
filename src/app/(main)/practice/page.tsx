'use client';

import { useState } from 'react';
import { useAdaptiveEngine } from '@/hooks/useAdaptiveEngine';
import { useAdaptiveStore } from '@/store/adaptiveStore';
import { useUserStore } from '@/store/userStore';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { Timer } from '@/components/practice/Timer';
import { BrainCircuit } from 'lucide-react';

export default function PracticePage() {
  const { getNextQuestion } = useAdaptiveEngine();
  const { currentQuestion, theta, history } = useAdaptiveStore();
  const { updateTopicMastery, recordPracticeResult } = useUserStore();
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    getNextQuestion();
    setStarted(true);
  };

  const handleNext = () => {
    // Record to user stats
    if (history.length > 0) {
      const last = history[history.length - 1];
      recordPracticeResult(last.isCorrect);
      updateTopicMastery(last.question.topic, last.isCorrect ? 5 : -2);
    }
    getNextQuestion();
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20 shadow-2xl shadow-primary/20">
          <BrainCircuit className="w-12 h-12 text-primary" />
        </div>
        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">Adaptive Practice</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Experience our proprietary IRT-based adaptive engine that hones in on your exact skill level, serving questions tailored to your progression.
          </p>
          <button 
            onClick={handleStart}
            className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all"
          >
            Launch Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-border/50 pb-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-primary" />
            Active Session
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Questions Answered: {history.length}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Live Ability Estimate (Theta)</p>
            <div className="flex items-center justify-end gap-2">
              <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${((theta - 130) / 40) * 100}%` }} />
              </div>
              <span className="font-mono text-primary font-bold">{Math.round(theta)}</span>
            </div>
          </div>
          <Timer />
        </div>
      </div>

      {currentQuestion ? (
        <QuestionCard question={currentQuestion} onNext={handleNext} />
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Session Complete</h2>
          <p className="text-muted-foreground">You have exhausted the available questions for this session.</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useTestStore } from '@/store/testStore';
import { mockQuestions } from '@/lib/mockQuestions';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { Flag, Maximize2, Minimize2, Grid, ChevronRight, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export function TestInterface() {
  const router = useRouter();
  const { 
    status, 
    currentSectionIndex, 
    sections, 
    timeRemaining, 
    startTest
  } = useTestStore();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  
  // Create mock section questions
  const sectionQuestions = mockQuestions.slice(0, 5); // 5 for demo

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'in-progress' && timeRemaining > 0) {
      interval = setInterval(() => {
        const store = useTestStore.getState();
        store.tickTimer();
      }, 1000);
    } else if (timeRemaining === 0 && status === 'in-progress') {
      const store = useTestStore.getState();
      store.nextSection();
      setCurrentQIndex(0);
    }
    return () => clearInterval(interval);
  }, [status, timeRemaining]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  if (status === 'not-started') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-background">
        <h1 className="text-4xl font-bold mb-4">GRE Practice Test 1</h1>
        <p className="text-muted-foreground max-w-lg mb-8">
          This test simulates the actual GRE structure, including the Analytical Writing, Verbal Reasoning, and Quantitative Reasoning sections. Ensure you have 2+ hours of uninterrupted time.
        </p>
        <div className="bg-card border border-border/50 p-6 rounded-2xl w-full max-w-md mb-8 text-left shadow-lg">
          <h3 className="font-bold mb-4 border-b border-border/50 pb-2">Test Structure</h3>
          <ul className="space-y-3">
            {sections.map((sec, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span>{sec}</span>
                <span className="text-muted-foreground">{sec === 'AWA' ? '30 mins' : sec.includes('Quant') ? '35 mins' : '30 mins'}</span>
              </li>
            ))}
          </ul>
        </div>
        <button 
          onClick={() => { toggleFullscreen(); startTest(); }}
          className="bg-primary text-primary-foreground px-12 py-4 rounded-xl font-bold text-xl hover:bg-primary/90 transition-transform hover:scale-105 shadow-xl shadow-primary/20"
        >
          Begin Test
        </button>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-background">
        <h1 className="text-4xl font-bold text-primary mb-4">Test Complete</h1>
        <p className="text-muted-foreground max-w-lg mb-8">
          Your answers have been securely saved and submitted to the scoring engine.
        </p>
        <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl max-w-md w-full">
          <h2 className="text-lg font-semibold mb-6">Unofficial Score Report</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground font-medium">Verbal Reasoning</span>
            <span className="text-3xl font-bold text-foreground">158</span>
          </div>
          <div className="w-full h-px bg-border/50 my-4" />
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-medium">Quantitative Reasoning</span>
            <span className="text-3xl font-bold text-foreground">165</span>
          </div>
        </div>
        <button 
          onClick={() => router.push('/dashboard')}
          className="mt-8 px-8 py-3 rounded-xl bg-secondary text-foreground font-medium transition-colors hover:bg-secondary/80"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const currentSectionName = sections[currentSectionIndex];
  const question = sectionQuestions[currentQIndex];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Test Header */}
      <header className="h-14 bg-secondary flex items-center justify-between px-6 border-b border-border">
        <div className="flex gap-4 items-center">
          <span className="font-bold tracking-widest uppercase text-sm">{currentSectionName}</span>
          <div className="w-px h-6 bg-border" />
          <span className="text-muted-foreground text-sm font-medium">Question {currentQIndex + 1} of {sectionQuestions.length}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-background px-4 py-1.5 rounded-md border border-border shadow-sm">
            <span className="font-mono font-medium text-primary">
              {Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <button onClick={toggleFullscreen} className="text-muted-foreground hover:text-foreground">
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className={clsx("flex-1 overflow-y-auto p-6 md:p-12 transition-all duration-300", showGrid ? 'mr-80' : 'mr-0')}>
          {question && (
            <QuestionCard 
              question={question} 
              onNext={() => {
                if (currentQIndex < sectionQuestions.length - 1) {
                  setCurrentQIndex(currentQIndex + 1);
                } else {
                  useTestStore.getState().nextSection();
                  setCurrentQIndex(0);
                }
              }} 
            />
          )}
        </div>

        {/* Slide-out Review Grid */}
        <div className={clsx(
          "absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border shadow-2xl transition-transform duration-300 ease-in-out p-6",
          showGrid ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Section Review</h3>
            <button onClick={() => setShowGrid(false)} className="p-2 bg-secondary rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            {sectionQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setCurrentQIndex(i)}
                className={clsx(
                  "aspect-square flex items-center justify-center rounded-lg font-medium border-2 transition-all",
                  currentQIndex === i ? "border-primary text-primary" : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/50"
                  // Add logic for answered vs unanswered vs marked
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="h-16 bg-secondary flex items-center justify-between px-6 border-t border-border">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-background font-medium hover:bg-muted transition-colors">
            <Flag className="w-4 h-4" /> Mark
          </button>
          <button 
            onClick={() => setShowGrid(!showGrid)} 
            className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-background font-medium hover:bg-muted transition-colors"
          >
            <Grid className="w-4 h-4" /> Review
          </button>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
            disabled={currentQIndex === 0}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-background font-medium hover:bg-muted transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button 
            onClick={() => {
              if (currentQIndex < sectionQuestions.length - 1) {
                setCurrentQIndex(currentQIndex + 1);
              } else {
                useTestStore.getState().nextSection();
                setCurrentQIndex(0);
              }
            }}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-md"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}

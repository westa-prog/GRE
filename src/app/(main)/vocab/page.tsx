'use client';

import { useState } from 'react';
import { useSRS } from '@/hooks/useSRS';
import { Flashcard } from '@/components/vocab/Flashcard';
import { BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function VocabPage() {
  const { deck, startSession, currentWord, gradeCard, isComplete, progress } = useSRS();
  const [view, setView] = useState<'study' | 'list'>('study');
  const [sessionActive, setSessionActive] = useState(false);

  const handleStart = () => {
    startSession(15); // limit to 15 words per mini-session
    setSessionActive(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-border/50 pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Vocabulary Mastery
          </h1>
          <p className="text-muted-foreground mt-2">
            Learn words faster with SM-2 spaced repetition algorithms and 3D flashcards.
          </p>
        </div>
        
        <div className="flex bg-secondary p-1 rounded-xl">
          <button 
            onClick={() => setView('study')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${view === 'study' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Study Session
          </button>
          <button 
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${view === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Word List
          </button>
        </div>
      </div>

      {view === 'study' && (
        <div className="min-h-[600px] flex flex-col pt-8">
          {!sessionActive ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center bg-card rounded-3xl border border-border/50 shadow-sm p-12">
              <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6">
                <Layers className="w-12 h-12 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Ready to study?</h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                You have words due for review today. Consistency helps cement them in your long-term memory.
              </p>
              <button 
                onClick={handleStart}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                Start Daily Review
              </button>
            </div>
          ) : isComplete ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center bg-card rounded-3xl border border-border/50 shadow-sm p-12">
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-6 text-green-500">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
              <p className="text-muted-foreground mb-8">
                Great job! You&apos;ve completed your reviewing queue for now.
              </p>
              <button 
                onClick={() => setSessionActive(false)}
                className="bg-secondary text-foreground px-8 py-3 rounded-xl font-bold transition-all hover:bg-secondary/80"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center max-w-3xl mx-auto w-full">
              <div className="w-full flex justify-between items-center mb-4 text-sm font-medium text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-12">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              
              {currentWord && (
                <Flashcard key={currentWord.id} word={currentWord} onGrade={(g) => gradeCard(currentWord.id, g)} />
              )}
            </div>
          )}
        </div>
      )}

      {view === 'list' && (
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border/50 text-muted-foreground text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Word</th>
                <th className="p-4 font-semibold">Definition</th>
                <th className="p-4 font-semibold">Mastery</th>
              </tr>
            </thead>
            <tbody>
              {deck.map((word) => (
                <tr key={word.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                  <td className="p-4 font-bold text-lg">{word.word}</td>
                  <td className="p-4 text-muted-foreground">{word.definition}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-4 h-2 rounded-full ${i < word.masteryLevel ? 'bg-primary' : 'bg-secondary'}`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

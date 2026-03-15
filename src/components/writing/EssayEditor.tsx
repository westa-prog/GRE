'use client';

import { useState } from 'react';
import { PenTool } from 'lucide-react';
import { mockQuestions } from '@/lib/mockQuestions';

export function EssayEditor() {
  const [essay, setEssay] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);

  const prompt = mockQuestions.find(q => q.type === 'awa')?.content || 'Discuss a topic.';
  const wordCount = essay.trim() === '' ? 0 : essay.trim().split(/\s+/).length;

  const handleGrade = () => {
    setIsGrading(true);
    // Simulate AI grading delay
    setTimeout(() => {
      setIsGrading(false);
      
      // Mock logic: longer essay = better score (just for demo purposes)
      let score = 3.0;
      if (wordCount > 400) score = 5.5;
      else if (wordCount > 300) score = 4.5;
      else if (wordCount > 200) score = 4.0;
      
      setResult({
        score,
        feedback: "Your essay presents a clear position and supports it with relevant examples. To improve to a 6.0, ensure your transitions between paragraphs are more seamless and address potential counterarguments more thoroughly."
      });
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl mx-auto h-[calc(100vh-12rem)]">
      {/* Prompt Panel */}
      <div className="lg:col-span-4 bg-card rounded-2xl border border-border/50 shadow-sm p-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <PenTool className="w-5 h-5" />
          <h2 className="font-bold uppercase tracking-wider text-sm">Issue Task Prompt</h2>
        </div>
        <p className="text-lg leading-relaxed text-foreground font-medium mb-6">
          {prompt}
        </p>
        <div className="mt-auto p-4 rounded-xl bg-secondary/50 border border-border/50 text-sm text-muted-foreground">
          <strong>Instructions:</strong> Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take.
        </div>
      </div>

      {/* Editor Panel */}
      <div className="lg:col-span-8 bg-card rounded-2xl border border-border/50 shadow-sm flex flex-col h-full overflow-hidden relative">
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-secondary/20">
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-destructive/50"></span>
            <span className="w-3 h-3 rounded-full bg-orange-500/50"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            <span className={wordCount < 300 ? 'text-orange-500' : 'text-green-500'}>
              {wordCount} words
            </span>
            <span className="mx-2">|</span>
            Target: 400+
          </div>
        </div>
        
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          disabled={isGrading || !!result}
          placeholder="Start typing your essay here..."
          className="flex-1 w-full bg-transparent resize-none p-6 outline-none text-foreground leading-relaxed custom-scrollbar"
        />

        {/* Grading Overlay */}
        {(isGrading || result) && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
            {isGrading ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl font-bold">AI Tutor is Grading...</h3>
                <p className="text-muted-foreground mt-2">Analyzing vocabulary, coherence, and structure.</p>
              </div>
            ) : result ? (
              <div className="bg-card w-full max-w-lg rounded-3xl p-8 border border-border shadow-2xl text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary border-4 border-primary/20">
                  <span className="text-3xl font-bold">{result.score}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Estimated Score</h3>
                <p className="text-muted-foreground mb-6 text-left p-4 bg-secondary/50 rounded-xl">
                  <strong className="text-foreground block mb-2">AI Feedback:</strong>
                  {result.feedback}
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => { setResult(null); setEssay(''); }}
                    className="px-6 py-2 rounded-xl font-medium border border-border hover:bg-secondary transition-colors"
                  >
                    Start New Essay
                  </button>
                  <button 
                    onClick={() => setResult(null)}
                    className="px-6 py-2 rounded-xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Revise Essay
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="p-4 border-t border-border/50 bg-secondary/20 flex justify-end">
          <button
            onClick={handleGrade}
            disabled={wordCount < 50 || isGrading || !!result}
            className="px-8 py-2.5 rounded-xl font-bold bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
          >
            Submit for AI Grading
          </button>
        </div>
      </div>
    </div>
  );
}

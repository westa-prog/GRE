'use client';

import { useState } from 'react';
import { Question } from '@/types';
import { useAdaptiveStore } from '@/store/adaptiveStore';
import { Check, X, BotMessageSquare } from 'lucide-react';
import clsx from 'clsx';

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
}

export function QuestionCard({ question, onNext }: QuestionCardProps) {
  const { submitAnswer } = useAdaptiveStore();
  const [selected, setSelected] = useState<string | string[]>('');
  const [essay, setEssay] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const isEssay = question.format === 'essay';
  const isMultipleSelect = question.format === 'multiple-select' || question.format === 'text-completion' || question.format === 'sentence-equivalence';

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    
    if (isMultipleSelect) {
      const current = Array.isArray(selected) ? selected : [];
      if (current.includes(opt)) {
        setSelected(current.filter(x => x !== opt));
      } else {
        setSelected([...current, opt]);
      }
    } else {
      setSelected(opt);
    }
  };

  const isCorrect = () => {
    if (isEssay) {
      // We cannot automatically grade an essay, so treat short responses as incorrect
      return essay.trim().length > 50;
    }

    if (isMultipleSelect) {
      const target = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
      const current = Array.isArray(selected) ? selected : [];
      if (target.length !== current.length) return false;
      return target.every(t => current.includes(t));
    }
    return selected === question.correctAnswer;
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      onNext();
      setIsSubmitted(false);
      setSelected(isMultipleSelect ? [] : '');
      setEssay('');
      return;
    }
    
    setIsSubmitted(true);
    submitAnswer(isCorrect());
  };

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg w-full max-w-4xl mx-auto flex flex-col min-h-[500px]">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          {question.topic.toUpperCase()}
        </span>
        <span className="text-sm text-muted-foreground font-mono">
          Difficulty: {question.difficulty}/5
        </span>
      </div>

      <div className="flex-1">
        <p className="text-lg md:text-xl font-medium leading-relaxed whitespace-pre-wrap mb-8">
          {question.content}
        </p>

        {question.options && (
          <div className="space-y-3 mb-8">
            {question.options.map((opt, i) => {
              const isSelected = isMultipleSelect 
                ? Array.isArray(selected) && selected.includes(opt)
                : selected === opt;
                
              let statusClass = "border-border/50 bg-secondary/30 hover:bg-secondary/80 text-foreground";
              
              if (isSubmitted) {
                const targetIncludes = isMultipleSelect 
                  ? (Array.isArray(question.correctAnswer) && question.correctAnswer.includes(opt))
                  : question.correctAnswer === opt;
                  
                if (targetIncludes) {
                  statusClass = "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400";
                } else if (isSelected) {
                  statusClass = "border-destructive/50 bg-destructive/10 text-destructive";
                } else {
                  statusClass = "border-border/20 bg-transparent opacity-50";
                }
              } else if (isSelected) {
                statusClass = "border-primary bg-primary/10 text-primary shadow-sm";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  disabled={isSubmitted}
                  className={clsx(
                    "w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between",
                    statusClass
                  )}
                >
                  <span className="font-medium">{opt}</span>
                  {isSubmitted && isSelected && (
                    isCorrect() ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {isEssay && (
          <div className="mb-8">
            <textarea
              value={essay}
              disabled={isSubmitted}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Write your essay response here..."
              className="w-full min-h-[220px] bg-background border border-border rounded-xl p-4 resize-none text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {isSubmitted && (
              <div className="mt-3 text-sm font-medium">
                {isCorrect() ? (
                  <span className="text-green-500 flex items-center gap-2"><Check className="w-4 h-4"/> Response saved.</span>
                ) : (
                  <span className="text-destructive flex items-center gap-2"><X className="w-4 h-4"/> Try expanding your response (at least 50 characters).</span>
                )}
              </div>
            )}
          </div>
        )}
        
        {question.format === 'numeric-entry' && (
          <div className="mb-8 p-4 bg-secondary/30 rounded-xl border border-border/50 max-w-sm">
             <input 
               type="text" 
               value={selected as string}
               disabled={isSubmitted}
               onChange={(e) => setSelected(e.target.value)}
               placeholder="Enter numeric value"
               className="w-full bg-background border border-border rounded-lg px-4 py-2 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
             />
             {isSubmitted && (
               <div className="mt-3 text-sm font-medium">
                 {isCorrect() ? (
                   <span className="text-green-500 flex items-center gap-2"><Check className="w-4 h-4"/> Correct</span>
                 ) : (
                   <span className="text-destructive flex items-center gap-2"><X className="w-4 h-4"/> Incorrect. Answer: {question.correctAnswer}</span>
                 )}
               </div>
             )}
          </div>
        )}
      </div>

      {/* AI Tutor Explanation */}
      {isSubmitted && (
        <div className="mt-6 mb-6 p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-2 text-indigo-500">
            <BotMessageSquare className="w-5 h-5" />
            <h4 className="font-bold">AI Tutor Explanation</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      <div className="mt-auto border-t border-border/50 pt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={
            !isSubmitted && (
              (isEssay && essay.trim().length === 0) ||
              (!isEssay && (!selected || (Array.isArray(selected) && selected.length === 0)))
            )
          }
          className={clsx(
            "px-8 py-3 rounded-xl font-bold transition-all shadow-lg",
            isSubmitted 
              ? "bg-foreground text-background hover:bg-foreground/90" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25",
            (!isSubmitted && (
              (isEssay && essay.trim().length === 0) ||
              (!isEssay && (!selected || (Array.isArray(selected) && selected.length === 0)))
            )) && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSubmitted ? 'Continue to Next' : 'Submit Answer'}
        </button>
      </div>
    </div>
  );
}

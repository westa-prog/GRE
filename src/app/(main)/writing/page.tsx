'use client';

import { EssayEditor } from '@/components/writing/EssayEditor';
import { PenTool } from 'lucide-react';

export default function WritingPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto h-[calc(100vh-10rem)]">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <PenTool className="w-8 h-8 text-primary" />
            Writing Trainer (AWA)
          </h1>
          <p className="text-muted-foreground mt-2">
            Practice Analytical Writing prompts with our AI grading engine.
          </p>
        </div>
      </div>

      <EssayEditor />
    </div>
  );
}

'use client';

import { Bell, Search, Settings } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export function Header() {
  const { stats } = useUserStore();

  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search concepts, questions..." 
            className="w-full bg-secondary/50 border border-border/50 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-sm font-medium bg-secondary/30 px-4 py-1.5 rounded-full border border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Target Quant:</span>
            <span className="text-primary">{stats.targetScoreQuant}</span>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Target Verbal:</span>
            <span className="text-primary">{stats.targetScoreVerbal}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-[1.5px] border-background"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}

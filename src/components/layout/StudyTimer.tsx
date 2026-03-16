'use client';

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check for an existing session start time
    const navStartTime = sessionStorage.getItem('gre_session_start');
    if (navStartTime) {
      const start = parseInt(navStartTime, 10);
      const now = Date.now();
      setSeconds(Math.floor((now - start) / 1000));
      setIsActive(true);
    } else {
      // Start a new session tracking
      sessionStorage.setItem('gre_session_start', Date.now().toString());
      setIsActive(true);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  if (!isClient) return null;

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    if (h > 0) {
      return `${h}h ${m}m`;
    }
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
      <Timer className="w-4 h-4 text-primary" />
      <span className="text-sm font-semibold text-primary font-mono w-16 text-center">
        {formatTime(seconds)}
      </span>
    </div>
  );
}

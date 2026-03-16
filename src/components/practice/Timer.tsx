import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialSeconds?: number;
  onExpire?: () => void;
  isPaused?: boolean;
}

export function Timer({ initialSeconds = 0, onExpire, isPaused = false }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds(s => {
        if (s > 0) return s - 1;
        
        // If it was counting down and reached 0
        if (initialSeconds > 0 && s === 0) {
          clearInterval(interval);
          return 0;
        }
        
        // If counting up (initialSeconds = 0)
        return s + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, initialSeconds]);

  useEffect(() => {
    if (seconds === 0 && initialSeconds > 0 && onExpire) {
      onExpire();
    }
  }, [seconds, initialSeconds, onExpire]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(Math.abs(totalSeconds) / 60);
    const s = Math.abs(totalSeconds) % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-border/50 text-sm font-medium text-muted-foreground w-fit">
      <Clock className="w-4 h-4 text-primary" />
      <span className="font-mono">{formatTime(seconds)}</span>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BrainCircuit, 
  BookOpen, 
  PenTool, 
  MonitorPlay, 
  BarChart3 
} from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Practice', href: '/practice', icon: BrainCircuit },
  { name: 'Vocabulary', href: '/vocab', icon: BookOpen },
  { name: 'Writing (AWA)', href: '/writing', icon: PenTool },
  { name: 'Simulator', href: '/simulator', icon: MonitorPlay },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      className={clsx(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-border bg-card/50 backdrop-blur-xl flex flex-col",
        isHovered ? "w-64" : "w-20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-16 items-center justify-center border-b border-border/50">
        <div className="flex items-center gap-3 w-full px-4 overflow-hidden">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shrink-0">
            <span className="font-bold text-xl">S</span>
          </div>
          <span className={clsx(
            "font-bold text-lg whitespace-nowrap transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0 w-0"
          )}>
            Stratosphere GRE
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-2 py-6 px-3 relative overflow-hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) || (pathname === '/' && item.href === '/dashboard');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "group flex items-center gap-4 rounded-xl px-3 py-3 font-medium transition-all duration-200 relative",
                isActive 
                  ? "text-primary-foreground shadow-md bg-primary/90" 
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              <item.icon className={clsx("h-6 w-6 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
              <span className={clsx(
                "whitespace-nowrap transition-all duration-300",
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 hidden"
              )}>
                {item.name}
              </span>
              {/* Active Indicator Line */}
              {isActive && !isHovered && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-background rounded-r-md" />
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary shrink-0 overflow-hidden border-2 border-border/50">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          <div className={clsx(
            "flex flex-col whitespace-nowrap transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0 w-0 hidden"
          )}>
            <span className="text-sm font-semibold text-foreground">Aiden Smith</span>
            <span className="text-xs text-muted-foreground">Pro Member</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

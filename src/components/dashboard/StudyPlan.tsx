import { PlayCircle, CheckCircle2 } from 'lucide-react';

export function StudyPlan() {
  const tasks = [
    { id: 1, title: 'Adaptive Quant Practice', description: '20 questions • Focus: Algebra', duration: '30 mins', completed: true },
    { id: 2, title: 'Vocab Review', description: '50 words • SM-2 Spaced Repetition', duration: '15 mins', completed: false },
    { id: 3, title: 'Verbal Practice', description: 'Reading Comprehension', duration: '45 mins', completed: false },
  ];

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Today&apos;s Study Plan</h3>
          <p className="text-sm text-muted-foreground mt-1">Consistency is key to a 330+</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary">{percent}%</span>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-secondary rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="space-y-4 flex-1">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-secondary/50 transition-colors group"
          >
            <div className="flex gap-4 items-center">
              {task.completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <div className="h-6 w-6 rounded-full border-2 border-muted-foreground flex items-center justify-center group-hover:border-primary transition-colors" />
              )}
              <div>
                <h4 className={`font-semibold ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {task.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{task.description} • {task.duration}</p>
              </div>
            </div>
            {!task.completed && (
              <button className="text-primary hover:scale-110 transition-transform p-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100">
                <PlayCircle className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

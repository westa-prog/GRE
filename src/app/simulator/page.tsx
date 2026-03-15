import { TestInterface } from '@/components/simulator/TestInterface';

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 antialiased">
      <TestInterface />
    </div>
  );
}

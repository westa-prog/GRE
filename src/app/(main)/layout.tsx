import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-20 transition-all duration-300 peer-hover:ml-64 relative z-10 w-[calc(100%-5rem)]">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 w-full bg-slate-50/50 dark:bg-background/95">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

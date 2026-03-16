'use client';

import { Download } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuthStore } from '@/store/authStore';

export function ExportPDFButton() {
  const { stats } = useUserStore();
  const currentUser = useAuthStore((state) => state.currentUser);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(33, 37, 41);
    doc.text('GRE Progress Report', 14, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(108, 117, 125);
    doc.text(`Generated for: ${currentUser || 'Guest'}`, 14, 28);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 34);

    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41);
    doc.text('Performance Summary', 14, 45);

    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Current', 'Target']],
      body: [
        ['Quant Score', stats.currentScoreQuant, stats.targetScoreQuant],
        ['Verbal Score', stats.currentScoreVerbal, stats.targetScoreVerbal],
        ['Overall Accuracy', `${stats.accuracy}%`, '-'],
        ['Questions Answered', stats.questionsAnswered, '-'],
        ['Study Streak', `${stats.studyStreakDays} days`, '-'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [89, 99, 243] }, // Matches primary color roughly
    });

    // Topic Mastery Section
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text('Topic Mastery Breakdown', 14, nextY);

    const masteryData = Object.entries(stats.topicMastery)
      .map(([topic, score]) => [topic, `${score}%`])
      .sort((a, b) => parseInt(b[1]) - parseInt(a[1]));

    autoTable(doc, {
      startY: nextY + 5,
      head: [['Topic Area', 'Mastery Level']],
      body: masteryData.length > 0 ? masteryData : [['No data available', '-']],
      theme: 'striped',
      headStyles: { fillColor: [89, 99, 243] },
    });

    // Save PDF
    doc.save(`GRE_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm"
    >
      <Download className="w-4 h-4" />
      Export PDF
    </button>
  );
}

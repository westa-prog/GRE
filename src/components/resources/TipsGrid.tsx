'use client';

import { motion } from 'framer-motion';

interface Tip {
  icon: string;
  category: string;
  title: string;
  body: string;
  accentColor: string;
}

const tips: Tip[] = [
  {
    icon: '⏱️',
    category: 'PACING',
    title: 'Master Section Timing',
    body: 'GRE Quant: 1 min 45 sec/question. Verbal: 1 min 30 sec/question. If you exceed 2 minutes on any single question, mark it and move on immediately. Time management is a skill that compounds across all sections.',
    accentColor: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    icon: '🔍',
    category: 'STRATEGY',
    title: 'Elimination Before Guessing',
    body: 'Even eliminating one answer choice on a 5-option GRE question raises your odds from 20% to 25%. Eliminating two raises them to 33%. Never guess blind — always eliminate first using the wording of the passage or the structure of the math.',
    accentColor: 'from-cyan-500/20 to-teal-500/20',
  },
  {
    icon: '🧠',
    category: 'VERBAL',
    title: 'Read the Clue Words',
    body: 'GRE Text Completion and Sentence Equivalence questions always contain a contextual "clue word" or "clue phrase" — a pivot word like "despite", "although", or "because" that signals the relationship between blanks. Identify the pivot FIRST.',
    accentColor: 'from-emerald-500/20 to-green-500/20',
  },
  {
    icon: '📖',
    category: 'VERBAL',
    title: 'Reading Comprehension Approach',
    body: 'Do NOT read the entire passage on first pass. Skim for structure (topic sentence of each paragraph). Then answer questions — return to the specific paragraph for evidence. "Main Idea" questions can usually be answered after the skim alone.',
    accentColor: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    icon: '📐',
    category: 'QUANT',
    title: 'Quantitative Comparison Tactics',
    body: 'For Column A vs Column B questions: try extreme values (0, 1, -1, large numbers) to test if the relationship is always the same. If you find even ONE case where it changes, the answer is (D) — "Cannot be determined."',
    accentColor: 'from-pink-500/20 to-rose-500/20',
  },
  {
    icon: '📊',
    category: 'QUANT',
    title: 'Data Interpretation Shortcuts',
    body: 'On Data Interpretation question sets, always read the chart title, axes labels, and units FIRST before looking at the questions. Common errors come from misreading units (thousands vs millions) or confusing percentage points with percent change.',
    accentColor: 'from-orange-500/20 to-red-500/20',
  },
  {
    icon: '✍️',
    category: 'AWA',
    title: 'Essay Structure That Scores 5.5+',
    body: 'Introduction (1 para): Clear thesis + roadmap. Body 1 & 2 (2 paras each): Strongest arguments with concrete examples. Concession (1 para): Acknowledge opposing views, then rebut. Conclusion (1 para): Restate refined position. Aim for 500-600 words.',
    accentColor: 'from-sky-500/20 to-blue-500/20',
  },
  {
    icon: '🗂️',
    category: 'VOCABULARY',
    title: 'Learn Words in Families',
    body: 'GRE vocabulary is more efficiently acquired when learned as semantic families. Instead of memorizing "obdurate" alone, learn its family: intransigent, recalcitrant, refractory, pigheaded. When you see one word on the test, your mind activates the whole cluster.',
    accentColor: 'from-purple-500/20 to-violet-500/20',
  },
  {
    icon: '🧘',
    category: 'MINDSET',
    title: 'Test Day Mental Protocol',
    body: 'The GRE is adaptive. If questions suddenly feel "easier," do NOT relax — it may mean you incorrectly answered earlier items. If questions feel brutally hard, it is likely a SIGN you are performing WELL. Judge your score by the raw feedback after, not by perceived difficulty.',
    accentColor: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    icon: '🔁',
    category: 'STUDY PLAN',
    title: 'The Spaced Repetition Rule',
    body: 'Review new material after 1 day, 3 days, 7 days, then 14 days. After a final review at 30 days, material is likely in long-term memory. This Ebbinghaus Forgetting Curve principle is why our Vocabulary Trainer uses SM-2 — the optimal interval scheduling algorithm.',
    accentColor: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    icon: '🎯',
    category: 'TEST STRATEGY',
    title: 'Section Selection Strategy',
    body: 'The GRE is computer-adaptive between sections, not within. Perform well in the first Verbal/Quant section and you get a harder (higher-ceiling) second section. Aim to answer every question in section 1 — if stuck, use educated guessing. Each question counts equally.',
    accentColor: 'from-rose-500/20 to-pink-500/20',
  },
  {
    icon: '📝',
    category: 'AWA',
    title: 'Argument Task Red Flags',
    body: 'Look for these common logical flaws in Argument tasks: (1) Correlation vs Causation, (2) Hasty Generalization from small sample, (3) False Analogy between two unlike situations, (4) Unwarranted Assumptions about future behavior based on past data. Name the flaw explicitly.',
    accentColor: 'from-green-500/20 to-emerald-500/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TipsGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tips.map((tip, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative rounded-2xl p-6 border border-border/50 bg-gradient-to-br ${tip.accentColor} backdrop-blur-sm overflow-hidden group cursor-default`}
        >
          {/* Glow border on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-2 ring-primary/30 pointer-events-none" />

          {/* Animated background particle */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl group-hover:scale-150 transition-transform duration-700" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{tip.icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/20 text-foreground/70 border border-white/10">
                {tip.category}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-3 leading-tight text-foreground">
              {tip.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tip.body}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

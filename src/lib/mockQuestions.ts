import { Question } from '../types';

export const mockQuestions: Question[] = [
  // Quant
  {
    id: 'q1',
    type: 'quant',
    format: 'multiple-choice',
    difficulty: 3,
    content: 'If $x^2 - 5x + 6 = 0$, what is the sum of the possible values of $x$?',
    options: ['-5', '-1', '1', '5', '6'],
    correctAnswer: '5',
    explanation: 'The quadratic factors to $(x-2)(x-3) = 0$, so the roots are $x=2$ and $x=3$. Their sum is $5$.',
    topic: 'Algebra'
  },
  {
    id: 'q2',
    type: 'quant',
    format: 'multiple-select',
    difficulty: 4,
    content: 'Which of the following integers are divisible by both 3 and 7? Select all that apply.',
    options: ['21', '42', '56', '84', '105'],
    correctAnswer: ['21', '42', '84', '105'],
    explanation: 'Numbers divisible by both 3 and 7 must be divisible by their least common multiple, 21. 56 is not a multiple of 21.',
    topic: 'Number Properties'
  },
  {
    id: 'q3',
    type: 'quant',
    format: 'numeric-entry',
    difficulty: 5,
    content: 'A sequence is defined by $a_n = a_{n-1} + a_{n-2}$ for $n \ge 3$. If $a_1 = 2$ and $a_2 = 3$, what is the value of $a_5$?',
    correctAnswer: '13',
    explanation: '$a_3 = 2+3=5$; $a_4 = 3+5=8$; $a_5 = 5+8=13$.',
    topic: 'Sequences'
  },
  {
    id: 'q4',
    type: 'quant',
    format: 'multiple-choice',
    difficulty: 2,
    content: 'In a triangle, the lengths of two sides are 4 and 9. Which of the following could be the length of the third side?',
    options: ['4', '5', '8', '13', '14'],
    correctAnswer: '8',
    explanation: 'By the triangle inequality theorem, the third side $x$ must satisfy $9-4 < x < 9+4$, or $5 < x < 13$. The only option in this range is 8.',
    topic: 'Geometry'
  },

  // Verbal
  {
    id: 'q5',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 3,
    content: 'Despite his generally (i) _____ demeanor, he was capable of surprisingly (ii) _____ outbursts when his authority was challenged.',
    options: ['placid', 'volatile', 'melancholy', 'vehement', 'lucid', 'tepid'],
    correctAnswer: ['placid', 'vehement'],
    explanation: 'The word "Despite" indicates a contrast. A "placid" (calm) demeanor contrasts with "vehement" (passionate/intense) outbursts.',
    topic: 'Text Completion'
  },
  {
    id: 'q6',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 4,
    content: 'The director’s latest film was criticized for being too _____, relying heavily on tired clichés rather than offering a fresh perspective.',
    options: ['innovative', 'banal', 'profound', 'derivative', 'arcane', 'lucid'],
    correctAnswer: ['banal', 'derivative'],
    explanation: 'The clue "relying heavily on tired clichés" points to something unoriginal. Both "banal" and "derivative" fit this meaning and produce equivalent sentences.',
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q7',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 5,
    content: 'Passage: The author argues that modern historical analyses often fail because they impose contemporary moral frameworks onto past events, a practice known as presentism. By doing so, historians obscure the complex realities of the eras they study, reducing nuanced actors to two-dimensional heroes or villains.\n\nQuestion: According to the passage, what is the primary flaw of presentism?',
    options: [
      'It overcomplicates historical narratives by introducing too many variables.',
      'It excuses immoral behavior in the past by attributing it to context.',
      'It distorts the understanding of historical events by applying modern standards to them.',
      'It focuses too heavily on individual actors rather than broad societal trends.',
      'It prevents historians from making any moral judgments whatsoever.'
    ],
    correctAnswer: 'It distorts the understanding of historical events by applying modern standards to them.',
    explanation: 'The passage explicitly states that presentism imposes contemporary moral frameworks onto past events, which obscures the complex realities of those eras.',
    topic: 'Reading Comprehension'
  },

  // AWA
  {
    id: 'q8',
    type: 'awa',
    format: 'essay',
    difficulty: 3,
    content: 'Discuss the extent to which you agree or disagree with the following statement: "To understand the most important characteristics of a society, one must study its major cities."',
    correctAnswer: '',
    explanation: 'Score is based on clear position, compelling reasons, persuasive examples, and strong organization.',
    topic: 'Issue Task'
  }
];

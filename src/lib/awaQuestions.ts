import { Question } from '../types';

export const awaQuestions: Question[] = [
  {
    id: 'q21',
    type: 'quant',
    format: 'multiple-choice',
    difficulty: 4,
    content: 'Data: A company\'s quarterly revenue (in millions): Q1=$12M, Q2=$15M, Q3=$18M, Q4=$21M.\n\nWhat is the percent increase in revenue from Q1 to Q4?',
    options: ['50%', '56%', '75%', '80%', '90%'],
    correctAnswer: '75%',
    explanation: 'Percent increase = [(21 – 12) / 12] × 100 = [9/12] × 100 = 75%.',
    topic: 'Data Interpretation'
  },
  {
    id: 'q22',
    type: 'quant',
    format: 'numeric-entry',
    difficulty: 4,
    content: 'The integers from 1 to 20, inclusive, are written on separate slips of paper. If one slip is drawn at random, what is the probability of drawing a prime number? Enter your answer as a fraction.',
    correctAnswer: '2/5',
    explanation: 'Primes from 1–20: 2, 3, 5, 7, 11, 13, 17, 19 = 8 primes. Probability = 8/20 = 2/5.',
    topic: 'Probability'
  },
  {
    id: 'q23',
    type: 'quant',
    format: 'multiple-choice',
    difficulty: 4,
    content: `A sequence is defined by aₙ = 2aₙ₋₁ + 1 for n ≥ 2. If a₁ = 1, what is the value of a₄?`,
    options: ['7', '15', '31', '63', '127'],
    correctAnswer: '15',
    explanation: `a₂ = 2(1)+1=3; a₃ = 2(3)+1=7; a₄ = 2(7)+1=15.`,
    topic: 'Sequences'
  },
  {
    id: 'q24',
    type: 'awa',
    format: 'essay',
    difficulty: 3,
    content: 'Issue Task: "Technology has made our lives more complicated rather than simpler." Discuss the extent to which you agree or disagree with this statement and support your position with reasons and examples.',
    correctAnswer: '',
    explanation: 'A strong response weighs both sides: technology simplifies some tasks (communication, information access) but complicates others (privacy concerns, information overload). Use specific examples like smartphones or social media.',
    topic: 'Issue Task'
  },
  {
    id: 'q25',
    type: 'awa',
    format: 'essay',
    difficulty: 4,
    content: 'Argument Task: The following appeared in a memo from a regional director: "Sales in our downtown stores have declined over the past year. Our suburban stores, however, have seen a 15% increase. We should therefore close all downtown locations and open new stores only in suburban areas." Discuss what questions would need to be answered to decide whether the recommendation is warranted.',
    correctAnswer: '',
    explanation: 'A strong response identifies logical flaws: the memo assumes correlation implies causation, ignores potential reasons for the urban decline (e.g., construction), doesn\'t consider long-term trends, and fails to account for different customer profiles.',
    topic: 'Argument Task'
  },
  {
    id: 'q36',
    type: 'awa',
    format: 'essay',
    difficulty: 4,
    content: 'Issue Task: "The best way to solve environmental problems is through international cooperation rather than individual national efforts." Discuss the extent to which you agree or disagree with this statement and support your position with reasons and examples.',
    correctAnswer: '',
    explanation: 'A strong response acknowledges benefits of international cooperation (e.g., climate agreements) but notes challenges (free-riding, enforcement) and potential advantages of national initiatives (local solutions, faster implementation).',
    topic: 'Issue Task'
  }
];
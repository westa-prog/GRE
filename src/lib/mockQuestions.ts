import { Question } from '../types';
import { quantQuestions } from './quantQuestions';
import { verbalQuestions } from './verbalQuestions';
import { awaQuestions } from './awaQuestions';

export const mockQuestions: Question[] = [
  ...quantQuestions,
  ...verbalQuestions,
  ...awaQuestions
];

import { Answer } from '@/types/test-creator/answers';

import { BaseQuestion } from './baseQuestion';

export interface OpenQuestionWithoutAnswers extends BaseQuestion {
  questionType: 'OPEN';
}

export interface OpenQuestion extends OpenQuestionWithoutAnswers {
  answers: Answer[];
}

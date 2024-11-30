import { SelectAnswer } from '@schema/answers';

import { BaseQuestion } from './baseQuestion';

export interface BooleanQuestionWithoutAnswers extends BaseQuestion {
  questionType: 'BOOLEAN';
}

export interface BooleanQuestion extends BooleanQuestionWithoutAnswers {
  answers: SelectAnswer[];
}

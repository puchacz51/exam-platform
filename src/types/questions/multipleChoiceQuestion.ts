import { SelectAnswer } from '@schema/answers';

import { BaseQuestion } from './baseQuestion';

export interface MultipleChoiceQuestionWithoutAnswers extends BaseQuestion {
  questionType: 'MULTIPLE_CHOICE';
  answers: Omit<SelectAnswer, 'correct'>[];
}

export interface MultipleChoiceQuestion
  extends MultipleChoiceQuestionWithoutAnswers {
  answers: SelectAnswer[];
}

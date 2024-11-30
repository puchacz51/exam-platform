import { SelectAnswer } from '@schema/answers';

import { BaseQuestion } from './baseQuestion';

export interface SingleChoiceQuestionWithoutAnswers extends BaseQuestion {
  questionType: 'SINGLE_CHOICE';
  answers: Omit<SelectAnswer, 'correct'>[];
}

export interface SingleChoiceQuestion
  extends SingleChoiceQuestionWithoutAnswers {
  answers: SelectAnswer[];
}

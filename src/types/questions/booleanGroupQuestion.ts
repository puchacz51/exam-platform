import { SelectGroupSubQuestion } from '@schema/groupSubQuestions';

import { BaseQuestion } from './baseQuestion';

export interface BooleanGroupQuestionWithoutSubQuestions extends BaseQuestion {
  questionType: 'BOOLEAN_GROUP';
}

export interface BooleanGroupQuestion
  extends BooleanGroupQuestionWithoutSubQuestions {
  groupSubQuestions: SelectGroupSubQuestion[];
}

import { SelectGroupSubQuestion } from '@schema/groupSubQuestions';

import { BaseQuestion } from './baseQuestion';

export interface NumericGroupQuestionWithoutSubQuestions extends BaseQuestion {
  questionType: 'NUMERIC_GROUP';
}

export interface NumericGroupQuestion
  extends NumericGroupQuestionWithoutSubQuestions {
  groupSubQuestions: SelectGroupSubQuestion[];
}

import { BaseQuestion } from '@/types/questions/baseQuestion';
import { SelectGroupSubQuestion } from '@schema/groupSubQuestions';

export interface BooleanGroupQuestionWithoutSubQuestions extends BaseQuestion {
  questionType: 'BOOLEAN_GROUP';
}

export interface BooleanGroupQuestion
  extends BooleanGroupQuestionWithoutSubQuestions {
  groupSubQuestions: SelectGroupSubQuestion[];
}

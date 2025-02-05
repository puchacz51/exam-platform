import { BaseQuestion } from '@/types/questions/baseQuestion';
import {
  NumericGroupSubQuestion,
  NumericGroupSubQuestionWithoutAnswer,
} from '@/types/questions/numericQuestion';

export interface NumericGroupQuestionWithoutAnswer extends BaseQuestion {
  questionType: 'NUMERIC_GROUP';
  GSQ: NumericGroupSubQuestionWithoutAnswer[];
}

export interface NumericGroupQuestion
  extends NumericGroupQuestionWithoutAnswer {
  GSQ: NumericGroupSubQuestion[];
}

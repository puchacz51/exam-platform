import { BaseQuestion } from '@/types/questions/baseQuestion';

export interface BooleanGroupSubQuestionWithoutAnswer {
  id: string;
  text: string;
  type: 'BOOLEAN';
}

export interface BooleanGroupSubQuestion
  extends BooleanGroupSubQuestionWithoutAnswer {
  booleanAnswer: boolean | null;
}

export interface BooleanQuestionWithoutAnswers extends BaseQuestion {
  questionType: 'BOOLEAN';
  GSQ: BooleanGroupSubQuestionWithoutAnswer[];
}

export interface BooleanQuestion extends BooleanQuestionWithoutAnswers {
  answers: BooleanGroupSubQuestion[];
}

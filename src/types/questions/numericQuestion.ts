import { BaseQuestion } from '@/types/questions/baseQuestion';

export interface NumericGroupSubQuestionWithoutAnswer {
  id: string;
  text: string;
  type: 'NUMERIC';
  tolerance: number | null;
}

export interface NumericGroupSubQuestion
  extends NumericGroupSubQuestionWithoutAnswer {
  numericAnswer: number | null;
}

export interface NumericQuestionWithoutSubQuestions extends BaseQuestion {
  questionType: 'NUMERIC';
  groupSubQuestions: NumericGroupSubQuestionWithoutAnswer[];
}

export interface NumericQuestion extends NumericQuestionWithoutSubQuestions {
  groupSubQuestions: NumericGroupSubQuestion[];
}

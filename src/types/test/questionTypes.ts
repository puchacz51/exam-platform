import { SelectAnswer } from '@schema/answers';
import { SelectMatchingPair } from '@schema/matchingPairs';
import { SelectOrderItem } from '@schema/orderItems';
import { SelectGroupSubQuestion } from '@schema/groupSubQuestions';
import { SelectQuestion } from '@schema/questions';

type BaseQuestion = Omit<SelectQuestion, 'questionType'>;

export interface OpenQuestion extends BaseQuestion {
  questionType: 'OPEN';
  answers: SelectAnswer[];
}

export interface SingleChoiceQuestion extends BaseQuestion {
  questionType: 'SINGLE_CHOICE';
  answers: SelectAnswer[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  questionType: 'MULTIPLE_CHOICE';
  answers: SelectAnswer[];
}

export interface OrderQuestion extends BaseQuestion {
  questionType: 'ORDER';
  orderItems: SelectOrderItem[];
}

export interface BooleanQuestion extends BaseQuestion {
  questionType: 'BOOLEAN';
  answers: SelectAnswer[];
}

export interface NumericQuestion extends BaseQuestion {
  questionType: 'NUMERIC';
  groupSubQuestions: SelectGroupSubQuestion[];
}

export interface MatchingQuestion extends BaseQuestion {
  questionType: 'MATCHING';
  matchingPairs: SelectMatchingPair[];
}

export interface BooleanGroupQuestion extends BaseQuestion {
  questionType: 'BOOLEAN_GROUP';
  groupSubQuestions: SelectGroupSubQuestion[];
}

export interface NumericGroupQuestion extends BaseQuestion {
  questionType: 'NUMERIC_GROUP';
  groupSubQuestions: SelectGroupSubQuestion[];
}

export type Question =
  | OpenQuestion
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | OrderQuestion
  | BooleanQuestion
  | NumericQuestion
  | MatchingQuestion
  | BooleanGroupQuestion
  | NumericGroupQuestion;

import { questionTypeEnum } from '@schema/questions';
import { NewOpenAnswer } from '@schema/answer-attempts/openAnswers';
import { NewChoiceAnswer } from '@schema/answer-attempts/choiceAnswers';
import { NewMatchingAnswer } from '@schema/answer-attempts/matchingAnswers';
import { NewOrderAnswer } from '@schema/answer-attempts/orderAnswers';
import { NewNumericAnswer } from '@schema/answer-attempts/numericAnswers';
import { NewBooleanAnswer } from '@schema/answer-attempts/booleanAnswers';

type QuestionType = (typeof questionTypeEnum.enumValues)[number];

export interface BaseAnswerInput {
  type: QuestionType;
  points?: number | null;
  questionId: string;
  attemptId: string;
}

export type OpenAnswerInput = Omit<BaseAnswerInput, 'type'> & {
  type: 'OPEN';
  answer: Pick<NewOpenAnswer, 'text'>;
};

export type ChoiceAnswerInput = Omit<BaseAnswerInput, 'type'> & {
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  answers: Array<Pick<NewChoiceAnswer, 'answerId'>>;
};

export type MatchingAnswerInput = Omit<BaseAnswerInput, 'type'> & {
  type: 'MATCHING';
  pairs: Array<Pick<NewMatchingAnswer, 'keyItemId' | 'valueItemId'>>;
};

export type OrderAnswerInput = Omit<BaseAnswerInput, 'type'> & {
  type: 'ORDER';
  items: Array<Pick<NewOrderAnswer, 'itemId' | 'position'>>;
};

export type NumericGroupAnswerInput = Omit<BaseAnswerInput, 'type'> & {
  type: 'NUMERIC_GROUP' | 'NUMERIC';
  answers: Array<Pick<NewNumericAnswer, 'subQuestionId' | 'value'>>;
};

export type BooleanGroupAnswerInput = Omit<BaseAnswerInput, 'type'> & {
  type: 'BOOLEAN_GROUP' | 'BOOLEAN';
  answers: Array<Pick<NewBooleanAnswer, 'subQuestionId' | 'value'>>;
};

export type AnswerInput =
  | OpenAnswerInput
  | ChoiceAnswerInput
  | MatchingAnswerInput
  | OrderAnswerInput
  | NumericGroupAnswerInput
  | BooleanGroupAnswerInput;

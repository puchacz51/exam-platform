import {
  MultipleChoiceQuestion,
  MultipleChoiceQuestionWithoutAnswers,
} from '@/types/questions/multipleChoiceQuestion';
import {
  OrderQuestion,
  OrderQuestionWithoutItems,
} from '@/types/questions/orderQuestion';
import {
  BooleanQuestion,
  BooleanQuestionWithoutAnswers,
} from '@/types/questions/booleanQuestion';
import {
  NumericQuestion,
  NumericQuestionWithoutSubQuestions,
} from '@/types/questions/numericQuestion';
import { MatchingQuestion } from '@/types/questions/matchingQuestion';
import {
  OpenQuestion,
  OpenQuestionWithoutAnswers,
} from '@/types/questions/openQuestion';
import {
  SingleChoiceQuestion,
  SingleChoiceQuestionWithoutAnswers,
} from '@/types/questions/singleChoiceQuestion';
import {
  BooleanGroupQuestion,
  BooleanGroupQuestionWithoutSubQuestions,
} from '@/types/questions/booleanGroupQuestion';
import {
  NumericGroupQuestion,
  NumericGroupQuestionWithoutSubQuestions,
} from '@/types/questions/numericGroupQuestion';

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

export type QuestionWithoutAnswers =
  | OpenQuestionWithoutAnswers
  | SingleChoiceQuestionWithoutAnswers
  | MultipleChoiceQuestionWithoutAnswers
  | OrderQuestionWithoutItems
  | BooleanQuestionWithoutAnswers
  | NumericQuestionWithoutSubQuestions
  | MatchingQuestion
  | BooleanGroupQuestionWithoutSubQuestions
  | NumericGroupQuestionWithoutSubQuestions;

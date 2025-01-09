import { z } from 'zod';

import {
  booleanSubQuestionSchema,
  matchingPairSchema,
  numericSubQuestionSchema,
  questionTypeSchema,
} from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { Answer, OrderItem } from '@/types/test-creator/answers';
import { questionBaseSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionSchema';

export type TestCreatorQuestion = z.infer<typeof questionTypeSchema> & {
  groupId?: string;
};

export type TestCreatorQuestionWithAnswers = TestCreatorQuestion & {
  answers: Answer[];
};

export type BaseQuestion<T extends string> = z.infer<
  typeof questionBaseSchema
> & {
  questionType: T;
};

export type OpenQuestion = BaseQuestion<'OPEN'> & {
  answers?: Answer[];
  correctAnswer?: string;
};

export type SingleChoiceQuestion = BaseQuestion<'SINGLE_CHOICE'> & {
  answers: Answer[];
};

export type MultipleChoiceQuestion = BaseQuestion<'MULTIPLE_CHOICE'> & {
  answers: Answer[];
};

export type OrderQuestion = BaseQuestion<'ORDER'> & {
  orderItems: OrderItem[];
};

export type BooleanQuestion = BaseQuestion<'BOOLEAN'> & {
  correctAnswer: boolean;
};

export type NumericQuestion = BaseQuestion<'NUMERIC'> & {
  correctAnswer: number;
  tolerance?: number;
};

export type MatchingQuestion = BaseQuestion<'MATCHING'> & {
  matchingPairs: Array<z.infer<typeof matchingPairSchema>>;
};

export type BooleanGroupQuestion = BaseQuestion<'BOOLEAN_GROUP'> & {
  subQuestions: Array<z.infer<typeof booleanSubQuestionSchema>>;
};

export type NumericGroupQuestion = BaseQuestion<'NUMERIC_GROUP'> & {
  subQuestions: Array<z.infer<typeof numericSubQuestionSchema>>;
};

export type Question =
  // | OpenQuestion
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | OrderQuestion
  | BooleanQuestion
  | NumericQuestion
  | MatchingQuestion
  | BooleanGroupQuestion
  | NumericGroupQuestion;

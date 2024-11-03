import {
  array,
  boolean,
  discriminatedUnion,
  literal,
  number,
  object,
  string,
  z,
} from 'zod';

import { answerSchema } from './answerSchema';
import { questionBaseSchema } from './questionSchema';

const matchingPairSchema = object({
  key: string().min(1, 'Klucz jest wymagany'),
  value: string().min(1, 'Wartość jest wymagana'),
});

const booleanSubQuestionSchema = object({
  text: string().min(1, 'Treść podpytania jest wymagana'),
  correctAnswer: boolean(),
  order: number().optional(),
});

const numericSubQuestionSchema = object({
  text: string().min(1, 'Treść podpytania jest wymagana'),
  correctAnswer: number(),
  numericTolerance: number().optional(),
  order: number().optional(),
});

export const questionOpenSchema = questionBaseSchema.extend({
  questionType: literal('OPEN'),
  answers: array(answerSchema)
    .max(1, 'Pytanie otwarte może mieć tylko jedną odpowiedź')
    .optional(),
});

export const questionSingleChoiceSchema = questionBaseSchema.extend({
  questionType: literal('SINGLE_CHOICE'),
  answers: array(answerSchema)
    .min(2, 'Wymagane są co najmniej dwie odpowiedzi')
    .refine(
      (answers) => answers.filter((a) => a.isCorrect).length === 1,
      'Musi być dokładnie jedna poprawna odpowiedź'
    ),
});

export const questionMultipleChoiceSchema = questionBaseSchema.extend({
  questionType: literal('MULTIPLE_CHOICE'),
  answers: array(answerSchema)
    .min(2, 'Wymagane są co najmniej dwie odpowiedzi')
    .refine(
      (answers) => answers.filter((a) => a.isCorrect).length > 1,
      'Musi być więcej niż jedna poprawna odpowiedź'
    ),
});

export const questionOrderSchema = questionBaseSchema.extend({
  questionType: literal('ORDER'),
  orderItems: array(
    object({
      text: string().min(1, 'Tekst elementu jest wymagany'),
      order: number(),
    })
  ).min(2, 'Wymagane są co najmniej dwa elementy'),
});

export const questionBooleanSchema = questionBaseSchema.extend({
  questionType: literal('BOOLEAN'),
  correctAnswer: boolean(),
});

export const questionNumericSchema = questionBaseSchema.extend({
  questionType: literal('NUMERIC'),
  correctAnswer: number(),
  tolerance: number().optional(),
});

export const questionMatchingSchema = questionBaseSchema.extend({
  questionType: literal('MATCHING'),
  matchingPairs: array(matchingPairSchema).min(
    2,
    'Wymagane są co najmniej dwie pary do dopasowania'
  ),
});

export const questionBooleanGroupSchema = questionBaseSchema.extend({
  questionType: literal('BOOLEAN_GROUP'),
  subQuestions: array(booleanSubQuestionSchema).min(
    2,
    'Wymagane są co najmniej dwa podpytania'
  ),
});

export const questionNumericGroupSchema = questionBaseSchema.extend({
  questionType: literal('NUMERIC_GROUP'),
  subQuestions: array(numericSubQuestionSchema).min(
    2,
    'Wymagane są co najmniej dwa podpytania'
  ),
});

export const questionTypeSchema = discriminatedUnion('questionType', [
  questionOpenSchema,
  questionSingleChoiceSchema,
  questionMultipleChoiceSchema,
  questionOrderSchema,
  questionBooleanSchema,
  questionNumericSchema,
  questionMatchingSchema,
  questionBooleanGroupSchema,
  questionNumericGroupSchema,
]);

export type QuestionType = z.infer<typeof questionTypeSchema>;
export type MatchingPair = z.infer<typeof matchingPairSchema>;
export type BooleanSubQuestion = z.infer<typeof booleanSubQuestionSchema>;
export type NumericSubQuestion = z.infer<typeof numericSubQuestionSchema>;

export type BaseQuestion<T extends string> = z.infer<
  typeof questionBaseSchema
> & {
  questionType: T;
};

// Typy dla każdego rodzaju pytania, używając generycznego typu bazowego
export type OpenQuestion = BaseQuestion<'OPEN'> & {
  answers?: Array<z.infer<typeof answerSchema>>;
};

export type SingleChoiceQuestion = BaseQuestion<'SINGLE_CHOICE'> & {
  answers: Array<z.infer<typeof answerSchema>>;
};

export type MultipleChoiceQuestion = BaseQuestion<'MULTIPLE_CHOICE'> & {
  answers: Array<z.infer<typeof answerSchema>>;
};

export type OrderQuestion = BaseQuestion<'ORDER'> & {
  orderItems: Array<{
    text: string;
    order: number;
  }>;
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
  | OpenQuestion
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | OrderQuestion
  | BooleanQuestion
  | NumericQuestion
  | MatchingQuestion
  | BooleanGroupQuestion
  | NumericGroupQuestion;

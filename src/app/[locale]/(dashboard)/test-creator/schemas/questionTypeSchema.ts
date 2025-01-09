import {
  array,
  boolean,
  discriminatedUnion,
  literal,
  number,
  object,
  string,
} from 'zod';

import { answerSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/answerSchema';
import { questionBaseSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionSchema';

export const matchingPairSchema = object({
  id: string().default(() => Math.random().toString(36).substr(2, 9)),
  key: string().min(1, 'Klucz jest wymagany'),
  value: string().min(1, 'Wartość jest wymagana'),
});

export const booleanSubQuestionSchema = object({
  id: string().default(() => Math.random().toString(36).substr(2, 9)),
  text: string().min(1, 'Treść podpytania jest wymagana'),
  correctAnswer: boolean(),
  order: number().optional(),
});

export const numericSubQuestionSchema = object({
  id: string().default(() => Math.random().toString(36).substr(2, 9)),
  text: string().min(1, 'Treść podpytania jest wymagana'),
  correctAnswer: number(),
  numericTolerance: number().optional(),
  order: number().optional(),
});

export const orderItemSchema = object({
  id: string().default(() => Math.random().toString(36).substr(2, 9)),
  text: string().min(1, 'Tekst elementu jest wymagany'),
  order: number(),
});

// export const questionOpenSchema = questionBaseSchema.extend({
//   questionType: literal('OPEN'),
//   answers: array(answerSchema)
//     .max(1, 'Pytanie otwarte może mieć tylko jedną odpowiedź')
//     .optional(),
// });

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
  orderItems: array(orderItemSchema).min(
    2,
    'Wymagane są co najmniej dwa elementy'
  ),
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
  // questionOpenSchema,
  questionSingleChoiceSchema,
  questionMultipleChoiceSchema,
  questionOrderSchema,
  questionBooleanSchema,
  questionNumericSchema,
  questionMatchingSchema,
  questionBooleanGroupSchema,
  questionNumericGroupSchema,
]);

import { array, discriminatedUnion, literal, string } from 'zod';

import { answerSchema } from './answerSchema';
import { questionBaseSchema } from './questionSchema';

export const questionOpenSchema = questionBaseSchema.extend({
  questionType: literal('OPEN'),
  answers: array(answerSchema).max(
    0,
    'Pytanie otwarte nie powinno mieć odpowiedzi'
  ),
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
  answers: array(answerSchema)
    .min(2, 'Wymagane są co najmniej dwie odpowiedzi')
    .refine(
      (answers) => answers.every((a) => a.isCorrect === undefined),
      'Odpowiedzi w pytaniu typu ORDER nie powinny mieć określonej poprawności'
    ),
});

export const questionBooleanSchema = questionBaseSchema.extend({
  questionType: literal('BOOLEAN'),
  answers: array(answerSchema)
    .length(2, 'Muszą być dokładnie dwie odpowiedzi (prawda/fałsz)')
    .refine(
      (answers) => answers.filter((a) => a.isCorrect).length === 1,
      'Musi być dokładnie jedna poprawna odpowiedź'
    ),
});

export const questionNumericSchema = questionBaseSchema.extend({
  questionType: literal('NUMERIC'),
  answers: array(answerSchema).max(
    0,
    'Pytanie numeryczne nie powinno mieć predefiniowanych odpowiedzi'
  ),
  correctAnswer: string().optional(),
});

export const questionTypeSchema = discriminatedUnion('questionType', [
  questionOpenSchema,
  questionSingleChoiceSchema,
  questionMultipleChoiceSchema,
  questionOrderSchema,
  questionBooleanSchema,
  questionNumericSchema,
]);

import { z } from 'zod';

import { answerSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/answerSchema';
import {
  booleanSubQuestionSchema,
  matchingPairSchema,
  numericSubQuestionSchema,
  orderItemSchema,
  questionTypeSchema,
} from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';

export type Answer = z.infer<typeof answerSchema>;
export type QuestionType = z.infer<typeof questionTypeSchema>;
export type MatchingPair = z.infer<typeof matchingPairSchema>;
export type BooleanSubQuestion = z.infer<typeof booleanSubQuestionSchema>;
export type NumericSubQuestion = z.infer<typeof numericSubQuestionSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;

import { randomBytes } from 'crypto';

import { pgEnum } from 'drizzle-orm/pg-core';
import {  object, string, z } from 'zod';

export const questionTypeEnum = pgEnum('question_type', [
  'OPEN',
  'SINGLE_CHOICE',
  'MULTIPLE_CHOICE',
  'ORDER',
  'BOOLEAN',
  'NUMERIC',
  'MATCHING',
  'BOOLEAN_GROUP',
  'NUMERIC_GROUP',
]);

export const questionBaseSchema = object({
  id: string().default(randomBytes(20).toString('hex')),
  text: string().nonempty('Treść pytania jest wymagana'),
  questionType: z.enum(questionTypeEnum.enumValues),
  categoryId: string().min(1, 'Kategoria jest wymagana'),
  points: z.number().min(0, 'Punkty muszą być nieujemne'),
});

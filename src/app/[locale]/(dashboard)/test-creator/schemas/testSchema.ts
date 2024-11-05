import { z } from 'zod';

import { accessTypeEnum } from '@schema/test';
import {
  navigationModeEnum,
  questionDisplayModeEnum,
  scoringSystemEnum,
} from '@schema/testSettings';

export const testSchema = z.object({
  title: z
    .string()
    .min(1, 'Tytuł jest wymagany')
    .max(256, 'Tytuł musi mieć maksymalnie 256 znaków'),
  description: z.string().optional(),
  categoryId: z
    .string()
    .uuid('Nieprawidłowy format ID kategorii')
    .min(1, 'Kategoria jest wymagana'),
  accessType: z.enum(accessTypeEnum.enumValues),
  accessCode: z
    .string()
    .max(20, 'Kod dostępu może mieć maksymalnie 20 znaków')
    .optional()
    .refine(
      (val, ctx) => {
        if (ctx.parent.accessType === 'CODE' && (!val || val.length === 0)) {
          return false;
        }
        return true;
      },
      {
        message:
          'Kod dostępu jest wymagany gdy typ dostępu ustawiony jest na CODE',
      }
    ),
  settings: z
    .object({
      navigationMode: z.enum(navigationModeEnum.enumValues),
      allowGoBack: z.boolean().default(true),
      confirmBeforeGroupChange: z.boolean().default(true),

      scoringSystem: z.enum(scoringSystemEnum.enumValues),
      allowPartialPoints: z.boolean().default(true),
      minimumPointsPerQuestion: z.number().min(0).default(0),
      negativePointsPercentage: z.number().min(0).max(100).default(0),
      roundingPrecision: z.number().int().min(0).max(10).default(2),

      questionDisplayMode: z.enum(questionDisplayModeEnum.enumValues),
      questionsPerPage: z.number().int().positive().optional(),
      shuffleQuestionsInGroup: z.boolean().default(false),
      shuffleAnswers: z.boolean().default(false),

      showProgressBar: z.boolean().default(true),
      showTimeRemaining: z.boolean().default(true),
      showQuestionPoints: z.boolean().default(true),
      allowQuestionFlagging: z.boolean().default(true),
      autosaveInterval: z.number().int().min(0).default(60),

      showPartialResults: z.boolean().default(false),
      showCorrectAnswers: z.boolean().default(false),
      showPointsPerQuestion: z.boolean().default(true),
      showFinalScore: z.boolean().default(true),
    })
    .optional(),
});

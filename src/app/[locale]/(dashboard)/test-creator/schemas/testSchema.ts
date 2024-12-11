import { z } from 'zod';

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

  settings: z.object({
    navigationMode: z
      .enum(navigationModeEnum.enumValues)
      .default('ANSWER_LOCK'),
    allowGoBack: z.boolean().default(true),

    scoringSystem: z.enum(scoringSystemEnum.enumValues).default('STANDARD'),
    allowPartialPoints: z.boolean().default(true),

    questionDisplayMode: z
      .enum(questionDisplayModeEnum.enumValues)
      .default('GROUP'),
    shuffleQuestionsInGroup: z.boolean().default(false),
    shuffleAnswers: z.boolean().default(false),

    showProgressBar: z.boolean().default(true),
    showTimeRemaining: z.boolean().default(true),
    showQuestionPoints: z.boolean().default(true),

    showCorrectAnswers: z.boolean().default(false),
    showPointsPerQuestion: z.boolean().default(true),
    showFinalScore: z.boolean().default(true),
  }),
});

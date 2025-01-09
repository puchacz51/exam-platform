import { z } from 'zod';

import {
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
    scoringSystem: z.enum(scoringSystemEnum.enumValues).default('STANDARD'),
    allowPartialPoints: z.boolean().default(true),
    allowGoBack: z.boolean().default(true),

    questionDisplayMode: z
      .enum(questionDisplayModeEnum.enumValues)
      .default('GROUP'),
    shuffleQuestionsInGroup: z.boolean().default(false),
    shuffleAnswers: z.boolean().default(false),

    showQuestionPoints: z.boolean().default(true),

    showCorrectAnswers: z.boolean().default(false),
    showPointsPerQuestion: z.boolean().default(true),
    showFinalScore: z.boolean().default(true),
  }),
});

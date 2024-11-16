import { z } from 'zod';

import { questionTypeEnum } from '@schema/questions';

export const aiGeneratorSchema = z
  .object({
    topic: z.string().min(1, 'Topic is required'),
    detail: z.string().optional(),
    selectedTypes: z.array(
      z.object({
        type: z.enum(questionTypeEnum.enumValues),
        count: z.number().min(1).max(12),
      })
    ),
    language: z.enum(['en', 'pl']).default('en'),
    category: z.object({
      id: z.string(),
      name: z.string(),
    }),
    step: z.enum(['select', 'configure']).default('select'),
    selectedGroupId: z.string().optional(),
    selectedQuestionIds: z.array(z.string()).default([]),
    generatedQuestions: z.array(z.any()).nullable().default(null),
  })
  .refine(
    (data) => {
      const total = data.selectedTypes.reduce((sum, qt) => sum + qt.count, 0);
      return total <= 12;
    },
    {
      message: 'Total number of questions cannot exceed 12',
      path: ['selectedTypes'],
    }
  );

export type AiGeneratorFormData = z.infer<typeof aiGeneratorSchema>;

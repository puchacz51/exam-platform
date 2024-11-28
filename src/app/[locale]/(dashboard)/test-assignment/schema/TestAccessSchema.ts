import { z } from 'zod';

export const testAccessFormSchema = z
  .object({
    accessType: z.enum(['GROUP', 'CODE']),
    accessCode: z.string().optional(),
    groupIds: z.array(z.string()).optional(),
    startsAt: z.date().default(new Date()),
    endsAt: z.date().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    timeLimit: z
      .number()
      .int()
      .optional()
      .refine(
        (val) => !val || val >= 1,
        'Time limit must be at least 1 minute'
      ),
    requiresRegistration: z.boolean().default(true),
    showResultsAfterSubmission: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    if (!data.endsAt) return true;
    const timeLimit = data.timeLimit || 0;
    const minEndTime = new Date(
      data.startsAt.getTime() + timeLimit * 60 * 1000
    );

    if (data.endsAt < minEndTime) {
      ctx.addIssue({
        code: 'invalid_date',
        message: 'End time must be at least time limit after start time',
        path: ['endsAt'],
      });
    }
  });

export type TestAccessFormValues = z.infer<typeof testAccessFormSchema>;

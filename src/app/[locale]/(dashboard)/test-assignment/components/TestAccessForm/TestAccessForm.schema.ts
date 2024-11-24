import { z } from 'zod';

export const testAccessFormSchema = z.object({
  accessType: z.enum(['GROUP', 'CODE', 'EMAIL']),
  accessCode: z.string().optional(),
  groupId: z.string().optional(),
  startsAt: z.date().optional(),
  endsAt: z.date().optional(),
  timeLimit: z.number().optional(),
  maxAttempts: z.number().optional(),
  minTimeBetweenAttempts: z.number().optional(),
  requiresRegistration: z.boolean().default(true),
  showResultsAfterSubmission: z.boolean().default(true),
});

export type TestAccessFormValues = z.infer<typeof testAccessFormSchema>;

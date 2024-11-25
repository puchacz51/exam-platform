import { z } from 'zod';

export const testAccessFormSchema = z.object({
  accessType: z.enum(['GROUP', 'CODE', 'EMAIL']),
  accessCode: z.string().optional(),
  groupIds: z.array(z.string()).optional(), // Change from groupId to groupIds array
  startsAt: z.date().optional(),
  endsAt: z.date().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  timeLimit: z.number().int().optional(),
  maxAttempts: z.number().int().optional(),
  minTimeBetweenAttempts: z.number().int().optional(),
  requiresRegistration: z.boolean().default(true),
  showResultsAfterSubmission: z.boolean().default(true),
});

export type TestAccessFormValues = z.infer<typeof testAccessFormSchema>;

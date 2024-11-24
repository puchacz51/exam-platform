import { z } from 'zod';

export const createGroupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().optional(),
  users: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;

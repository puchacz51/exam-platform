import { object, string, z } from 'zod';

import { accessTypeEnum } from '@schema/test';

export const testSchema = object({
  title: string()
    .min(1, 'Tytuł jest wymagany')
    .max(256, 'Tytuł musi mieć maksymalnie 256 znaków'),
  description: string().optional(),
  categoryId: string().min(1, 'Kategoria jest wymagana'),
  accessType: z.enum(accessTypeEnum.enumValues),
  accessCode: string()
    .optional()
    .refine(
      (val) => {
        if (val === 'code' && (!val || val.length === 0)) {
          return false;
        }
        return true;
      },
      {
        message: 'Kod dostępu jest wymagany',
      }
    ),
});

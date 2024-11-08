import { z } from 'zod';

import { testSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/testSchema';

export type TestCreatorTest = z.infer<typeof testSchema>;

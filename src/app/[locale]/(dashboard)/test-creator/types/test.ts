import { z } from 'zod';

import { testSchema } from '../schemas/testSchema';

export type TestCreatorTest = z.infer<typeof testSchema>;

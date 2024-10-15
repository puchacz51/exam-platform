import { z } from 'zod';

import { questionTypeSchema } from '../schemas/questionTypeSchema';

export type TestCreatorQuestion = z.infer<typeof questionTypeSchema> & {
  groupId?: string;
};

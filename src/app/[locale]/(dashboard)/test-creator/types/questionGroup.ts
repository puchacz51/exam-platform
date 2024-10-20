import { z } from 'zod';

import { questionGroupSchema } from '../schemas/questionsGroup';
import { TestCreatorQuestion } from './question';

export type TestCreatorQuestionGroup = z.infer<typeof questionGroupSchema> & {
  questions?: TestCreatorQuestion[];
};

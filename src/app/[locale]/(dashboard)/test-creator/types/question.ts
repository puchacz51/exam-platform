import { z } from 'zod';

import { questionTypeSchema } from '../schemas/questionTypeSchema';
import { Answer } from './answers';

export type TestCreatorQuestion = z.infer<typeof questionTypeSchema> & {
  groupId?: string;
};

export type TestCreatorQuestionWithAnswers = TestCreatorQuestion & {
  answers: Answer[];
};

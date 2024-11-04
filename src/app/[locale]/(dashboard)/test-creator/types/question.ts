import { z } from 'zod';

import { questionTypeSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { Answer } from '@/app/[locale]/(dashboard)/test-creator/types/answers';

export type TestCreatorQuestion = z.infer<typeof questionTypeSchema> & {
  groupId?: string;
};

export type TestCreatorQuestionWithAnswers = TestCreatorQuestion & {
  answers: Answer[];
};

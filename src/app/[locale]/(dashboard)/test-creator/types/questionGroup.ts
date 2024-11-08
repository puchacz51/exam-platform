import { z } from 'zod';

import { questionGroupSchema } from '@/app/[locale]/(dashboard)/test-creator//schemas/questionsGroup';
import { TestCreatorQuestion } from '@/app/[locale]/(dashboard)/test-creator/types/question';

export type TestCreatorQuestionGroup = z.infer<typeof questionGroupSchema> & {
  questions: TestCreatorQuestion[];
};

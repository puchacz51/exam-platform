import { z } from 'zod';

import { SelectTest } from '@schema/test';
import { SelectTestSettings } from '@schema/testSettings';
import { SelectQuestionGroup } from '@schema/questionGroups';
import { testSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/testSchema';
import { Question } from '@/types/test-creator/question';

export type TestCreatorTest = z.infer<typeof testSchema>;

export type TestWithQuestion = SelectTest & {
  settings: SelectTestSettings;
  questionGroups: (SelectQuestionGroup & {
    questions: Question;
  })[];
};

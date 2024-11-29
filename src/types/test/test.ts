import { SelectTest } from '@schema/test';
import { SelectCategory } from '@schema/categories';
import { SelectTestSettings } from '@schema/testSettings';
import { SelectQuestion } from '@schema/questions';
import { SelectAnswer } from '@schema/answers';
import { SelectMatchingPair } from '@schema/matchingPairs';
import { SelectOrderItem } from '@schema/orderItems';
import { SelectGroupSubQuestion } from '@schema/groupSubQuestions';
import { SelectQuestionGroup } from '@schema/questionGroups';

export type CompleteQuestion = SelectQuestion & {
  answers?: SelectAnswer[];
  matchingPairs?: SelectMatchingPair[];
  orderItems?: SelectOrderItem[];
  groupSubQuestions?: SelectGroupSubQuestion[];
};

export type CompleteQuestionGroup = SelectQuestionGroup & {
  questions: CompleteQuestion[];
};

export type CompleteTest = SelectTest & {
  settings: SelectTestSettings;
  QG: CompleteQuestionGroup[];
};

export type TestWithBasicInfo = Pick<
  SelectTest,
  'id' | 'title' | 'description' | 'createdAt'
> & {
  category?: Pick<SelectCategory, 'id' | 'name'>;
  _count?: {
    questionGroups: number;
  };
};

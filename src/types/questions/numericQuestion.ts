import { SelectGroupSubQuestion } from '@schema/groupSubQuestions';

import { BaseQuestion } from './baseQuestion';

export interface NumericQuestionWithoutSubQuestions extends BaseQuestion {
  questionType: 'NUMERIC';
  groupSubQuestions: Pick<
    SelectGroupSubQuestion,
    'id' | 'tolerance' | 'text' | 'type'
  >[];
}

export interface NumericQuestion extends NumericQuestionWithoutSubQuestions {
  groupSubQuestions: Pick<
    SelectGroupSubQuestion,
    'id' | 'text' | 'type' | 'tolerance' | 'numericAnswer'
  >[];
}

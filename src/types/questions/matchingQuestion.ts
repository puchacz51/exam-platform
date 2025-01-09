import { SelectMatchingPair } from '@schema/matchingPairs';

import { BaseQuestion } from './baseQuestion';

export interface MatchingQuestion extends BaseQuestion {
  questionType: 'MATCHING';
  matchingPairs: SelectMatchingPair[];
}

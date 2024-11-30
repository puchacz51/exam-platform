import { SelectOrderItem } from '@schema/orderItems';

import { BaseQuestion } from './baseQuestion';

export interface OrderQuestionWithoutItems extends BaseQuestion {
  questionType: 'ORDER';
}

export interface OrderQuestion extends OrderQuestionWithoutItems {
  orderItems: SelectOrderItem[];
}

import { BaseQuestion } from '@/types/questions/baseQuestion';
import { SelectOrderItem } from '@schema/orderItems';

export interface OrderQuestionWithoutAnswer extends BaseQuestion {
  questionType: 'ORDER';
  orderItems: Omit<SelectOrderItem, 'order'>[];
}

export interface OrderQuestion extends OrderQuestionWithoutAnswer {
  orderItems: SelectOrderItem[];
}

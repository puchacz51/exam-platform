import { SelectQuestion } from '@schema/questions';

export type BaseQuestion = Omit<SelectQuestion, 'questionType'>;

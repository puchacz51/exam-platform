import { boolean, object, string } from 'zod';

export const answerSchema = object({
  text: string().min(1, 'Treść odpowiedzi jest wymagana'),
  isCorrect: boolean().optional(),
});

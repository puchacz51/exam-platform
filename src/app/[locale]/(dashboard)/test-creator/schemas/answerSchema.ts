import { boolean, object, string } from 'zod';

export const answerSchema = object({
  id: string().default(() => Math.random().toString(36).substr(2, 9)),
  text: string().min(1, 'Treść odpowiedzi jest wymagana'),
  isCorrect: boolean().optional(),
});

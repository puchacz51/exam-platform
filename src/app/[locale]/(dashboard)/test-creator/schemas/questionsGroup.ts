import { number, object, string } from 'zod';

export const questionGroupSchema = object({
  id: string(),
  name: string()
    .min(1, 'Nazwa grupy jest wymagana')
    .max(256, 'Nazwa grupy nie może przekraczać 256 znaków'),
  order: number()
    .int('Kolejność musi być liczbą całkowitą')
    .min(0, 'Kolejność nie może być ujemna'),
});

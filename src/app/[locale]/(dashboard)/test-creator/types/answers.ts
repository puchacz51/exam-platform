import { z } from 'zod';

import { answerSchema } from '../schemas/answerSchema';

export type Answer = z.infer<typeof answerSchema>;

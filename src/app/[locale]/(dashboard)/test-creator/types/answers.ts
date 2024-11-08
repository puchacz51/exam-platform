import { z } from 'zod';

import { answerSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/answerSchema';

export type Answer = z.infer<typeof answerSchema>;

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';

export const createQuestionAttempt = async () => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    // const questionAttempt = await db.insert(test);
    // return questionAttempt;
  } catch (error) {
    // throw new Error(error);
  }
};

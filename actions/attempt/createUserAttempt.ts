'use server'

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { testAttemptsTable } from '@schema/testAttempt';

export const createUserAttempt = async (testAssignmentId: string) => {
  const session = await auth();

  if (!session?.user.userID) {
    throw new Error('Unauthorized');
  }

  try {
    const [userAttempt] = await db
      .insert(testAttemptsTable)
      .values({
        testAccessId: testAssignmentId,
        userId: session.user.userID,
      })
      .returning();

    return { data: userAttempt, error: null };
  } catch (error) {
    return { error: '', data: null };
  }
};

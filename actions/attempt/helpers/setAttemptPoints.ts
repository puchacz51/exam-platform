'use server';

import { eq } from 'drizzle-orm';

import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';
import { getUserPoints } from '@actions/attempt/helpers/getUserPoints';

export const setAttemptPoints = async (attemptId: string) => {
  const session = await auth();

  if (!session?.user.userID)
    return {
      error: 'User not authenticated',
    };

    const { data, error } = await getUserPoints(attemptId);
  if (error || !data) {
    return { error };
  }

  const { receivedPoints } = data;

  const attempt = await db
    ?.update(testAttemptsTable)
    .set({ totalPoints: receivedPoints, finishedAt: new Date() })
    .where(eq(testAttemptsTable.id, attemptId))
    .returning();

  return {
    data: { points: attempt },
  };
};

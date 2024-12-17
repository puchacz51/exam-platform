'use server';

import { eq } from 'drizzle-orm';

import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';
import { getUserPoints } from '@actions/attempt/helpers/getUserPoints';

export const setAttemptPoints = async (attemptId: string) => {
  const session = await auth();
  console.log('session', session);
  if (!session?.user.userID)
    return {
      error: 'User not authenticated',
    };

  const { data, error } = await getUserPoints(attemptId);

  if (error || !data) {
    return { error };
  }

  const { receivedPoints, attempt } = data;

  await db
    ?.update(testAttemptsTable)
    .set({ totalPoints: receivedPoints, finishedAt: new Date() })
    .where(eq(testAttemptsTable.id, attemptId))
    .execute();

  if (!attempt.finishedAt) {
    await db
      ?.update(testAttemptsTable)
      .set({ finishedAt: new Date() })
      .where(eq(testAttemptsTable.id, attemptId))
      .execute();
  }

  return {
    data: { points: receivedPoints },
  };
};

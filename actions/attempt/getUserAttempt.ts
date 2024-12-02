import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { auth } from '@/next-auth/auth';
import { testAccessConfigTable } from '@schema/testAccess';
import { testAttemptsTable } from '@schema/testAttempt';

export const getUserAttempt = async (assignmentId: string) => {
  const session = await auth();

  if (!session?.user.userID) {
    throw new Error('Unauthorized');
  }

  try {
    const userAttempt = await db.query.testAttempts.findFirst({
      where: and(
        eq(testAttemptsTable.userId, session.user.userID),
        eq(testAccessConfigTable.id, assignmentId)
      ),
      with: {
        testAccess: true,
        answers: true,
      },
    });

    if (!userAttempt) {
      return { data: null, error: 'Attempt not found' };
    }

    return { data: userAttempt, error: null };
  } catch (error) {
    return { error: 'Error fetching attempt', data: null };
  }
};

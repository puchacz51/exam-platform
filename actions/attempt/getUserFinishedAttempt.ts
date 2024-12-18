import { and, eq, isNull, lt, not, or } from 'drizzle-orm';

import db from '@/lib/db';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export const getUserFinishedAttempts = async () => {
  const session = await auth();

  if (!session?.user.userID) {
    throw new Error('Unauthorized');
  }
  try {
    const userAttempt = await db.query.testAttempts.findMany({
      where: and(eq(testAttemptsTable.userId, session.user.userID)),
      with: {
        testAccess: {
          with: {
            test: {
              with: {
                QG: {
                  with: {
                    qOnQG: {
                      with: {
                        question: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        answers: true,
      },
    });

    if (!userAttempt) {
      return { data: userAttempt, error: 'Attempt not found' };
    }

    return { data: userAttempt, error: null };
  } catch (error) {
    return { error: 'Error fetching attempt', data: null };
  }
};

export type UserFinishedAttemptResponse = Awaited<
  ReturnType<typeof getUserFinishedAttempts>
>;

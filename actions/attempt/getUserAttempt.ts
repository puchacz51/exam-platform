import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export const getUserAttemptWithTestSettings = async (assignmentId: string) => {
  const session = await auth();

  if (!session?.user.userID) {
    throw new Error('Unauthorized');
  }
  try {
    const userAttempt = await db.query.testAttempts.findFirst({
      where: and(
        eq(testAttemptsTable.userId, session.user.userID),
        eq(testAttemptsTable.testAccessId, assignmentId)
      ),
      with: {
        testAccess: {
          with: {
            test: {
              with: {
                settings: true,
                QG: {
                  with: {
                    qOnQG: {
                      with: {
                        question: {
                          with: {
                            groupSubQuestions: true,
                            matchingPairs: true,
                            answers: true,
                          },
                        },
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

export type UserAttemptResponse = Awaited<
  ReturnType<typeof getUserAttemptWithTestSettings>
>;

export type UserAttempt = NonNullable<UserAttemptResponse['data']>;
export type QG = UserAttempt['testAccess']['test']['QG'][0];

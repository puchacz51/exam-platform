import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export const getUserScore = async (assignmentId: string) => {
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
              },
            },
          },
        },
        answers: {
          with: {
            booleanAnswers: true,
            choiceAnswers: true,
            matchingAnswers: true,
            numericAnswers: true,
            openAnswers: true,
            orderAnswers: true,
          },
        },
      },
    });

    if (!userAttempt) {
      return { data: userAttempt, error: 'Attempt not found' };
    }

    const answers = userAttempt.answers;
    const points = answers.reduce((acc, answer) => {
      return acc + (answer.points || 0);
    }, 0);

    return {
      data: {
        type: points,
      },
      error: null,
    };
  } catch (error) {
    return { error: 'Error fetching attempt', data: null };
  }
};

export type UserScoreResponse = Awaited<ReturnType<typeof getUserScore>>;

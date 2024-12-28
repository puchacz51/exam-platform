'use server';

import { and, eq } from 'drizzle-orm';

import { testAttemptsTable } from '@schema/testAttempt';
import { auth } from '@/next-auth/auth';
import db from '@/lib/db';

export const getUserPoints = async (attemptId: string) => {
  const session = await auth();
  if (!session?.user.userID)
    return {
      error: 'User not authenticated',
    };

  const attempt = await db?.query.testAttempts.findFirst({
    where: and(
      eq(testAttemptsTable.userId, session.user.userID),
      eq(testAttemptsTable.id, attemptId)
    ),
    with: {
      answers: {
        columns: {
          points: true,
          id: true,
        },
        with: {
          question: {
            columns: {
              points: true,
              questionType: true,
            },
          },
        },
      },
      testAccess: {
        with: {
          test: {
            with: {
              QG: {
                with: {
                  qOnQG: {
                    with: {
                      question: {
                        columns: {
                          points: true,
                          questionType: true,
                        },
                      },
                    },
                  },
                },
              },
              settings: true,
            },
          },
        },
      },
    },
  });

  if (!attempt)
    return {
      error: 'Attempt not found',
    };

  const receivedPoints = attempt.answers.reduce((acc, answer) => {
    return acc + (answer.points || 0);
  }, 0);

  // const totalPoints = attempt.answers.reduce((acc, answer) => {
  //   return acc + (answer.question.points || 0);
  // }, 0);
  const totalPoints = attempt.testAccess.test.QG.reduce((acc, qg) => {
    return (
      acc +
      qg.qOnQG.reduce((acc, q) => {
        return acc + (q.question.points || 0);
      }, 0)
    );
  }, 0);

  const receivedPointsPercentage = Math.round(
    (receivedPoints / totalPoints) * 100
  );
  const receivedPointsWithoutOpenQuestions = attempt.answers.reduce(
    (acc, answer) => {
      return acc + (answer.points || 0);
    },
    0
  );
  const pointsFromOpenQuestions = attempt.answers.reduce((acc, answer) => {
    return acc + (answer.points || 0);
  }, 0);

  const pointsFromClosedQuestions = totalPoints - pointsFromOpenQuestions;
  const receivedPointsPercentageWithoutOpenQuestions =
    Math.round(
      (receivedPointsWithoutOpenQuestions / pointsFromClosedQuestions) * 100
    ) || 0;

  return {
    data: {
      receivedPoints,
      attempt,
      receivedPointsPercentage,
      pointsFromOpenQuestions,
      pointsFromClosedQuestions,
      receivedPointsPercentageWithoutOpenQuestions,
    },
  };
};

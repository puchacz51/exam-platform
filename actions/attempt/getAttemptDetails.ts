'use server';

import { eq } from 'drizzle-orm';

import db from '@/lib/db';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export const getAttemptDetails = async (attemptId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      throw new Error('Unauthorized');
    }

    const attempt = await db.query.testAttempts.findFirst({
      where: eq(testAttemptsTable.id, attemptId),
      with: {
        user: {
          columns: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
          },
        },
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
                            GSQ: {
                              columns: {
                                id: true,
                                text: true,
                                type: true,
                                tolerance: true,
                                booleanAnswer: true,
                                numericAnswer: true,
                              },
                            },
                            matchingPairs: true,
                            answers: {
                              columns: {
                                id: true,
                                text: true,
                                isCorrect: true,
                              },
                            },
                            orderItems: {
                              columns: {
                                id: true,
                                text: true,
                                order: true,
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

    if (!attempt) {
      throw new Error('Attempt not found');
    }

    return attempt;
  } catch (error) {
    console.error('Error fetching attempt details:', error);
    throw new Error('Failed to fetch attempt details');
  }
};

export type AttemptDetailsResponse = Awaited<
  ReturnType<typeof getAttemptDetails>
>;

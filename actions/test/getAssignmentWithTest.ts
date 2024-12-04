'use server';

import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccess';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';
import { createUserAttempt } from '@actions/attempt/createUserAttempt';

export async function getAssignmentWithTest(id: string) {
  const session = await auth();

  if (!session?.user.userID) {
    throw new Error('Unauthorized');
  }

  try {
    const assignment = await db.query.testAccess.findFirst({
      where: and(eq(testAccessConfigTable.id, id)),
      columns: {
        id: true,
        testId: true,
        accessType: true,
        endsAt: true,
        timeLimit: true,
        showResultsAfterSubmission: true,
        startsAt: true,
      },
      with: {
        TAGroup: {
          columns: {
            id: true,
            sourceType: true,
          },
          with: {
            group: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        test: {
          with: {
            QG: {
              columns: {
                id: true,
                name: true,
              },
              with: {
                qOnQG: {
                  with: {
                    question: {
                      with: {
                        groupSubQuestions: {
                          columns: {
                            id: true,
                            tolerance: true,
                            text: true,
                            type: true,
                          },
                        },
                        matchingPairs: true,
                        orderItems: true,
                        category: true,
                        answers: {
                          columns: {
                            id: true,
                            text: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            settings: true,
          },
        },
        attempts: {
          where: eq(testAttemptsTable.userId, session.user.userID),
          with: {
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
        },
      },
    });

    if (!assignment) {
      throw new Error('Assignment not found');
    }

    const questionGroups = assignment.test.QG.map((qg) => ({
      id: qg.id,
      name: qg.name,
      questions: qg.qOnQG
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((q) => q.question),
    }));

    if (!assignment.attempts.length) {
      const userAttempt = (await createUserAttempt(assignment.id)).data;

      if (!userAttempt) throw new Error('Failed to create user attempt');

      return {
        ...assignment,
        attempts: [userAttempt],
        questionGroups,
      };
    }

    return {
      ...assignment,
      questionGroups,
      attempts: assignment.attempts,
    };
  } catch (error) {
    console.error('Error fetching assignment with test:', error);
    throw new Error('Failed to fetch assignment with test data');
  }
}

'use server';

import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/TestAccess';
import { auth } from '@/next-auth/auth';
import { SelectTestAttempt, testAttemptsTable } from '@schema/testAttempt';
import { createUserAttempt } from '@actions/attempt/createUserAttempt';

export async function getAssignmentWithTest(id: string) {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  let userAttempt: SelectTestAttempt;

  const data = await db.query.testAttempts.findFirst({
    where: and(
      eq(testAccessConfigTable.id, id),
      eq(testAttemptsTable.userId, session.user.userID)
    ),
  });

  if (!data) {
    const response = await createUserAttempt(id);

    if (response.data) {
      userAttempt = response.data;
    }
  } else {
    userAttempt = data;
  }

  try {
    const assignment = await db.query.testAccess.findFirst({
      where: eq(testAccessConfigTable.id, id),
      columns: {
        id: true,
        testId: true,
        accessType: true,
        accessCode: true,
        startsAt: true,
        endsAt: true,
        timeLimit: true,
        requiresRegistration: true,
        showResultsAfterSubmission: true,
      },
      with: {
        testAccessGroups: {
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
                        groupSubQuestions: true,
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
      },
    });

    if (!assignment) {
      throw new Error('Assignment not found');
    }

    const t = assignment.test.QG[0].qOnQG[0].question.groupSubQuestions[0];

    return {
      ...assignment,
      questionGroups: assignment.test.QG.flatMap((qg) =>
        qg.qOnQG.map((q) => q.question)
      ),
    };
  } catch (error) {
    console.error('Error fetching assignment with test:', error);
    throw new Error('Failed to fetch assignment with test data');
  }
}

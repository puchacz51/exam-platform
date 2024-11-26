'use server';

import { eq, asc } from 'drizzle-orm';
import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/TestAccess';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';

export async function getAssignmentWithTest(id: string) {
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
        maxAttempts: true,
        minTimeBetweenAttempts: true,
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
            questionGroups: {
              with: {
                questionOnQuestionGroup: {
                  orderBy: [asc(questionOnQuestionGroupTable.order)],
                  with: {
                    question: {
                      columns: {
                        questionType: true,
                        id: true,
                        text: true,
                        points: true,
                        isPublic: true,
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

    // Transform question groups to match the expected format
    if (assignment.test) {
      assignment.test.questionGroups = assignment.test.questionGroups.map(
        (group) => ({
          ...group,
          questions: group.questionOnQuestionGroup.map((qog) => qog.question),
        })
      );
    }

    return assignment;
  } catch (error) {
    console.error('Error fetching assignment with test:', error);
    throw new Error('Failed to fetch assignment with test data');
  }
}

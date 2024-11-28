'use server';

import { eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/TestAccess';
import { auth } from '@/next-auth/auth';

export async function getAssignmentWithTest(id: string) {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
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
            questionGroups: {
              columns: {
                id: true,
                name: true,
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
    // if (assignment.test) {
    //   assignment.test.questionGroups = assignment.test.questionGroups.map(
    //     (group) => ({
    //       ...group,
    //       questions: group.questionOnQuestionGroup.map((qog) => qog.question),
    //     })
    //   );
    // }

    return assignment;
  } catch (error) {
    console.error('Error fetching assignment with test:', error);
    throw new Error('Failed to fetch assignment with test data');
  }
}

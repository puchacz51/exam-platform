'use server';

import { eq } from 'drizzle-orm';
import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/TestAccess';

export async function getTestAssignment(id: string) {
  try {
    const assignment = await db.query.testAccess.findFirst({
      where: eq(testAccessConfigTable.id, id),
      columns: {
        id: true,
        accessType: true,
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
          columns: {
            title: true,
            description: true,
          },
        },
      },
    });

    return assignment;
  } catch (error) {
    console.error('Error fetching test assignment:', error);
    throw new Error('Failed to fetch test assignment');
  }
}

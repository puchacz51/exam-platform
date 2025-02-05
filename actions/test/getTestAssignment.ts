'use server';

import { eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export async function getTestAssignment(id: string) {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const assignment = await db.query.testAccess.findFirst({
      where: eq(testAccessConfigTable.id, id),
      columns: {
        id: true,
        accessType: true,
        startsAt: true,
        endsAt: true,
        timeLimit: true,
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
          columns: {
            title: true,
            description: true,
          },
        },
        attempts: {
          where: eq(testAttemptsTable.userId, session.user.userID),
        },
      },
    });

    return assignment;
  } catch (error) {
    console.error('Error fetching test assignment:', error);
    throw new Error('Failed to fetch test assignment');
  }
}

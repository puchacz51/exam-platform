'use server';

import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';
import { userGroupsTable } from '@schema/userGroups';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export async function isUserAssignedToTest(id: string) {
  const session = await auth();
  if (!session) return false;

  const userId = session.user.userID;
  try {
    const accessConfig = await db.query.testAccess.findFirst({
      where: eq(testAccessConfigTable.id, id),
      with: {
        TAGroup: {
          with: {
            group: {
              with: {
                testAccessGroups: {
                  with: {
                    group: {
                      with: {
                        userGroups: {
                          where: and(eq(userGroupsTable.userId, userId)),
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        attempts: {
          where: and(eq(testAttemptsTable.userId, userId)),
          with: {
            answers: true,
          },
        },
      },
    });
    console.log('accessConfig:', accessConfig?.attempts);

    if (!accessConfig) return false;

    return accessConfig.TAGroup.some((group) =>
      group.group.testAccessGroups.some(
        (group) => group.group.userGroups.length > 0
      )
    );
  } catch (error) {
    console.error('Error checking test access:', error);
    throw new Error('Failed to check test access');
  }
}

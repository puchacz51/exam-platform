'use server';

import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';
import { userGroupsTable } from '@schema/userGroups';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';
import { CheckIfTeamMember } from '@actions/attempt/helpers/checkIIfTeamMember';

export async function isUserAssignedToTest(id: string, code?: string) {
  const session = await auth();
  if (!session?.user?.userID) return false;

  const userId = session?.user?.userID;
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

    if (code && accessConfig?.accessCode === code) return true;

    const hasUserAccessInGroup = accessConfig?.TAGroup.some((group) =>
      group.group?.testAccessGroups.some(
        (group) => (group?.group?.userGroups?.length || 0) > 0
      )
    );

    if (hasUserAccessInGroup) return true;
    const isAzureProvider = session.user?.authProvider === 'azure-ad';

    return isAzureProvider && (await CheckIfTeamMember(id, userId));
  } catch (error) {
    console.error('Error checking test access:', error);
    throw new Error('Failed to check test access');
  }
}

export type isUserAssignedToTestResponse = Awaited<
  ReturnType<typeof isUserAssignedToTest>
>;

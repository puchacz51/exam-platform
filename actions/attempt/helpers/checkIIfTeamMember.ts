'use server';

import { and, eq } from 'drizzle-orm';

import { testAttemptsTable } from '@schema/testAttempt';
import { testAccessConfigTable } from '@schema/testAccesss';
import db from '@/lib/db';
import { getUserTeamsGroups } from '@actions/groups/teamsGroup';

export const CheckIfTeamMember = async (id: string, userId: string) => {
  const accessConfig = await db.query.testAccess.findFirst({
    where: eq(testAccessConfigTable.id, id),
    with: {
      TAGroup: {
        with: {
          group: {
            with: {
              testAccessGroups: {
                with: {
                  group: true,
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

  if (!accessConfig) return false;

  const externalGroup = accessConfig.TAGroup.filter(
    (group) => !!group.externalId
  );

  const teamsGroupAssigned = await getUserTeamsGroups();

  return teamsGroupAssigned.some((group) =>
    externalGroup.some((extGroup) => extGroup.externalId === group.id)
  );
};

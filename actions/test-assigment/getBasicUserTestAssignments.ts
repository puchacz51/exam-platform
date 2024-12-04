import { and, asc, eq, gt, isNull, or } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccess';
import { testsTable } from '@schema/test';
import { testAccessGroupsTable } from '@schema/testAccessGroups';
import { groupsTable } from '@schema/groups';
import { userGroupsTable } from '@schema/userGroups';
import { auth } from '@/next-auth/auth';

export async function getBasicUserTestAssignments() {
  const session = await auth();

  if (!session?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const now = new Date();

  const accessibleTests = await db
    .select({
      id: testAccessConfigTable.id,
      title: testsTable.title,
      startsAt: testAccessConfigTable.startsAt,
      endsAt: testAccessConfigTable.endsAt,
    })
    .from(testAccessConfigTable)
    .innerJoin(testsTable, eq(testAccessConfigTable.testId, testsTable.id))
    .innerJoin(
      testAccessGroupsTable,
      eq(testAccessGroupsTable.testAccessConfigId, testAccessConfigTable.id)
    )
    .innerJoin(groupsTable, eq(testAccessGroupsTable.groupId, groupsTable.id))
    .innerJoin(
      userGroupsTable,
      and(eq(userGroupsTable.groupId, groupsTable.id))
    )
    .where(
      and(
        or(
          isNull(testAccessConfigTable.endsAt),
          gt(testAccessConfigTable.endsAt, now)
        ),
        or(
          isNull(testAccessConfigTable.startsAt),
          or(
            gt(testAccessConfigTable.endsAt, now),
            isNull(testAccessConfigTable.endsAt)
          )
        ),
        eq(userGroupsTable.userId, session.user.userID)
      )
    )
    .orderBy(asc(testAccessConfigTable.startsAt))
    .limit(8);
  return accessibleTests;
}

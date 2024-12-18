import { and, asc, eq, gt, isNull, or } from 'drizzle-orm';
import { sql } from 'drizzle-orm/sql';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';
import { testsTable } from '@schema/test';
import { testAccessGroupsTable } from '@schema/testAccessGroups';
import { groupsTable } from '@schema/groups';
import { userGroupsTable } from '@schema/userGroups';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export async function getBasicUserTestAssignments(
  page: number = 1,
  limit: number = 8
) {
  const session = await auth();

  if (!session?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const now = new Date();
  const offset = (page - 1) * limit;

  const [accessibleTests, totalCountResult] = await Promise.all([
    db
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
      .innerJoin(
        testAttemptsTable,
        and(eq(testAttemptsTable.testAccessId, testAccessConfigTable.id))
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
          eq(userGroupsTable.userId, session.user.userID),
          isNull(testAttemptsTable.finishedAt)
        )
      )
      .offset(offset)
      .limit(limit)
      .orderBy(asc(testAccessConfigTable.startsAt)),

    db
      .select({ count: sql<number>`count(*)` })
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
      ),
  ]);

  return {
    items: accessibleTests,
    metadata: {
      totalCount: totalCountResult[0].count,
      currentPage: page,
      totalPages: Math.ceil(totalCountResult[0].count / limit),
      limit,
    },
  };
}

export type BasicUserTestAssignmentsResponse = Awaited<
  ReturnType<typeof getBasicUserTestAssignments>
>;

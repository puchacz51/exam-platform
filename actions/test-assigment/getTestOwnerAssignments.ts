'use server';

import { asc, eq, sql } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';
import { testsTable } from '@schema/test';
import { testAccessGroupsTable } from '@schema/testAccessGroups';
import { groupsTable } from '@schema/groups';
import { auth } from '@/next-auth/auth';

export async function getTestOwnerAssignments(
  page: number = 1,
  limit: number = 10
) {
  const data = await auth();
  const userID = data?.user?.userID;

  if (!userID) {
    throw new Error('Unauthorized');
  }

  const userId = userID;
  const offset = (page - 1) * limit;

  try {
    const [assignments, totalCountResult] = await Promise.all([
      db
        .select({
          id: testAccessConfigTable.id,
          testId: testsTable.id,
          testTitle: testsTable.title,
          testDescription: testsTable.description,
          accessType: testAccessConfigTable.accessType,
          accessCode: testAccessConfigTable.accessCode,
          assignedBy: testAccessConfigTable.assignedBy,
          startAt: testAccessConfigTable.startsAt,
          endAt: testAccessConfigTable.endsAt,
        })
        .from(testAccessConfigTable)
        .innerJoin(testsTable, eq(testAccessConfigTable.testId, testsTable.id))
        .where(eq(testAccessConfigTable.assignedBy, userId))
        .limit(limit)
        .offset(offset)
        .orderBy(asc(testAccessConfigTable.createdAt)),

      db
        .select({ count: sql<number>`count(*)` })
        .from(testAccessConfigTable)
        .where(eq(testAccessConfigTable.assignedBy, userId)),
    ]);

    return {
      items: assignments,
      metadata: {
        totalCount: totalCountResult[0].count,
        currentPage: page,
        totalPages: Math.ceil(totalCountResult[0].count / limit),
        limit,
      },
    };
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw new Error('Failed to fetch assignments data');
  }
}

export type TestOwnerAssignment = Awaited<
  ReturnType<typeof getTestOwnerAssignments>
>;

'use server';
import { and, asc, eq, sql } from 'drizzle-orm';

import db from '@/lib/db';
import { auth } from '@/next-auth/auth';
import { testAccessConfigTable } from '@schema/testAccesss';

export const getTestTestAccess = async (
  testId: string,
  page: number = 1,
  limit: number = 10
) => {
  const session = await auth();
  const userId = session?.user.userID;

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const offset = (page - 1) * limit;

  try {
    const [testAccesses, totalCountResult] = await Promise.all([
      db.query.testAccess.findMany({
        where: and(
          eq(testAccessConfigTable.testId, testId),
          eq(testAccessConfigTable.assignedBy, userId)
        ),
        limit: limit,
        offset: offset,
        orderBy: asc(testAccessConfigTable.createdAt),
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(testAccessConfigTable)
        .where(
          and(
            eq(testAccessConfigTable.testId, testId),
            eq(testAccessConfigTable.assignedBy, userId)
          )
        ),
    ]);

    return {
      testAccesses,
      totalCount: totalCountResult[0].count,
      currentPage: page,
      totalPages: Math.ceil(totalCountResult[0].count / limit),
    };
  } catch (error) {
    console.error('Error fetching test accesses:', error);
    throw new Error('Failed to fetch test access data');
  }
};

export type TestAccessResponse = Awaited<ReturnType<typeof getTestTestAccess>>;
export type TestAccess = TestAccessResponse['testAccesses'][0];

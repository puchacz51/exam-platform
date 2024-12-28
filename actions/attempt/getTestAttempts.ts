'use server';

import { eq, max, sql } from 'drizzle-orm';

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { testAttemptsTable } from '@schema/testAttempt';
import { getTestAccessInfo } from '../test-access/getTestAccessInfo';

export const getTestAttempts = async (
  testAccessId: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      throw new Error('Unauthorized');
    }

    const offset = (page - 1) * limit;

    const getAttempts = () =>
      db.query.testAttempts.findMany({
        where: eq(testAttemptsTable.testAccessId, testAccessId),
        limit,
        offset,
        with: {
          user: {
            columns: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      });
      
    const getMaxPoints = async () => {
      const testAccess = await getTestAccessInfo(testAccessId);
      return testAccess?.test.QG.flatMap((qg) =>
        qg.qOnQG.flatMap((qOnQG) => qOnQG.question.points)
      ).reduce((a, b) => a + b, 0);
    };

    const getTotalCount = () =>
      db
        .select({ count: sql<number>`count(*)` })
        .from(testAttemptsTable)
        .where(eq(testAttemptsTable.testAccessId, testAccessId));

    const [attempts, totalCountResult, maxPoints] = await Promise.all([
      getAttempts(),
      getTotalCount(),
      getMaxPoints(),
    ]);

    return {
      attempts,
      totalCount: totalCountResult[0].count,
      currentPage: page,
      totalPages: Math.ceil(totalCountResult[0].count / limit),
      maxPoints,
    };
  } catch (error) {
    console.error('Error fetching test attempts:', error);
    throw new Error('Failed to fetch test attempts');
  }
};

export type TestAttemptsResponse = Awaited<ReturnType<typeof getTestAttempts>>;

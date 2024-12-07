'use server';

import { eq, sql } from 'drizzle-orm';

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { testAttemptsTable } from '@schema/testAttempt';

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
          answers: true,
        },
      });

    const getTotalCount = () =>
      db
        .select({ count: sql<number>`count(*)` })
        .from(testAttemptsTable)
        .where(eq(testAttemptsTable.testAccessId, testAccessId));

    const [attempts, totalCountResult] = await Promise.all([
      getAttempts(),
      getTotalCount(),
    ]);

    return {
      attempts,
      totalCount: totalCountResult[0].count,
      currentPage: page,
      totalPages: Math.ceil(totalCountResult[0].count / limit),
    };
  } catch (error) {
    console.error('Error fetching test attempts:', error);
    throw new Error('Failed to fetch test attempts');
  }
};

export type TestAttemptsResponse = Awaited<ReturnType<typeof getTestAttempts>>;

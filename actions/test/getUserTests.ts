'use server';

import { desc, eq } from 'drizzle-orm';
import { asc, sql } from 'drizzle-orm/sql';

import db from '@/lib/db';
import { testsTable } from '@schema/test';
import { TestWithCategory } from '@/types/test/testWithCategory';
import { auth } from '@/next-auth/auth';

export async function getUserTests(
  page: number = 1,
  limit: number = 8,
  sort: {
    field: 'createdAt';
    direction: 'asc' | 'desc';
  } = { field: 'createdAt', direction: 'desc' }
) {
  const session = await auth();
  if (!session?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const offset = (page - 1) * limit;
  const userId = session.user.userID;

  try {
    const [tests, totalCountResult] = await Promise.all([
      db.query.tests.findMany({
        where: eq(testsTable.creatorId, userId),
        limit,
        offset,
        orderBy: [
          sort.direction === 'desc'
            ? desc(testsTable.createdAt)
            : asc(testsTable.createdAt),
        ],
        with: {
          QG: {
            with: {
              qOnQG: {
                with: {
                  question: {
                    with: {
                      category: {
                        columns: {
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(testsTable)
        .where(eq(testsTable.creatorId, userId)),
    ]);

    const items = tests.map((test) => {
      const questionCount = test.QG.reduce(
        (acc, group) => acc + group.qOnQG.length,
        0
      );

      const categories = test.QG.flatMap((group) =>
        group.qOnQG.map((qog) => qog.question.category?.name).filter(Boolean)
      ).filter((value, index, self) => self.indexOf(value) === index);

      return {
        id: test.id,
        title: test.title,
        description: test.description,
        createdAt: test.createdAt,
        questionCount,
        categories,
      } as TestWithCategory;
    });

    return {
      items,
      metadata: {
        totalCount: totalCountResult[0].count,
        currentPage: page,
        totalPages: Math.ceil(totalCountResult[0].count / limit),
        limit,
      },
    };
  } catch (error) {
    console.error('Error fetching user tests:', error);
    throw new Error('Failed to fetch user tests');
  }
}

export type UserTestsResponse = Awaited<ReturnType<typeof getUserTests>>;

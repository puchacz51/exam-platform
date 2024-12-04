'use server';

import { desc, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testsTable } from '@schema/test';
import { TestWithCategory } from '@/types/test/testWithCategory';
import { auth } from '@/next-auth/auth';

export async function getLatestUserTests(limit: number = 5) {
  const session = await auth();
  if (!session?.user?.userID) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.userID;
  try {
    const tests = await db.query.tests.findMany({
      where: eq(testsTable.creatorId, userId),
      limit,
      orderBy: [desc(testsTable.createdAt)],
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
    });

    return tests.map((test) => {
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
  } catch (error) {
    console.error('Error fetching user tests:', error);
    throw new Error('Failed to fetch user tests');
  }
}

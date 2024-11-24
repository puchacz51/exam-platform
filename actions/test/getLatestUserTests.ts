'use server';

import { desc, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testsTable } from '@schema/test';

export async function getLatestUserTests(userId: string, limit: number = 5) {
  try {
    const tests = await db.query.tests.findMany({
      where: eq(testsTable.creatorId, userId),
      limit,
      orderBy: [desc(testsTable.createdAt)],
      with: {
        questionGroups: {
          with: {
            questionOnQuestionGroup: {
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
      const questionCount = test.questionGroups.reduce(
        (acc, group) => acc + group.questionOnQuestionGroup.length,
        0
      );

      const categories = test.questionGroups
        .flatMap((group) =>
          group.questionOnQuestionGroup
            .map((qog) => qog.question.category?.name)
            .filter(Boolean)
        )
        .filter((value, index, self) => self.indexOf(value) === index);

      return {
        id: test.id,
        title: test.title,
        description: test.description,
        createdAt: test.createdAt,
        questionCount,
        categories,
      };
    });
  } catch (error) {
    console.error('Error fetching user tests:', error);
    throw new Error('Failed to fetch user tests');
  }
}

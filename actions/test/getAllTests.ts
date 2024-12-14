'use server';

import { asc, eq, sql } from 'drizzle-orm';

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { testsTable } from '@schema/test';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';

export const getAllUserTests = async (page: number = 1, limit: number = 10) => {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      throw new Error('Unauthorized');
    }

    const offset = (page - 1) * limit;

    const [tests, totalCountResult] = await Promise.all([
      db.query.tests.findMany({
        where: eq(testsTable.creatorId, session.user.userID),
        limit: limit,
        offset: offset,
        with: {
          QG: {
            with: {
              qOnQG: {
                orderBy: [asc(questionOnQuestionGroupTable.order)],
                with: {
                  question: {
                    columns: {
                      questionType: true,
                      id: true,
                      text: true,
                      points: true,
                      isPublic: true,
                    },
                    with: {
                      orderItems: {
                        columns: {
                          id: true,
                          text: true,
                        },
                      },
                      category: {
                        columns: {
                          id: true,
                          name: true,
                        },
                      },
                      matchingPairs: true,
                      answers: true,
                      GSQ: true,
                    },
                  },
                },
              },
            },
          },
          settings: true,
        },
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(testsTable)
        .where(eq(testsTable.creatorId, session.user.userID)),
    ]);

    const processedTests = tests.map((test) => ({
      ...test,
      questionGroups: test.QG.map((group) => ({
        ...group,
        questions: group.qOnQG.map((qog) => qog.question),
      })),
    }));

    return {
      tests: processedTests,
      totalCount: totalCountResult[0].count,
      currentPage: page,
      totalPages: Math.ceil(totalCountResult[0].count / limit),
    };
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw new Error('Failed to fetch tests data');
  }
};

export type OwnedTestResponse = Awaited<ReturnType<typeof getAllUserTests>>;
export type OwnedTest = OwnedTestResponse['tests'][0];

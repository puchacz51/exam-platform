'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { asc } from 'drizzle-orm';

import { testsTable } from '@schema/test';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';
import db from '@/lib/db';
import { CompleteTest } from '@/types/test/test';

interface GetTestOptions {
  includeAnswers?: boolean;
  revalidate?: boolean;
}
export async function getTest(testId: string, options: GetTestOptions = {}) {
  try {
    const { includeAnswers = true, revalidate = false } = options;

    const test = await db.query.tests.findFirst({
      where: eq(testsTable.id, testId),
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
                  },
                  with: {
                    ...(includeAnswers && {
                      answers: {
                        columns: {
                          id: true,
                          text: true,
                          order: true,
                        },
                      },
                    }),
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
    });

    if (test) {
      test.QG = test.QG.map((group) => ({
        ...group,
        questions: group.qOnQG.map((qog) => qog.question),
      }));
    }

    if (revalidate) {
      revalidatePath(`/test/${testId}`);
    }

    return test as unknown as CompleteTest;
  } catch (error) {
    console.error('Error fetching test2:', error);
    throw new Error('Failed to fetch test data');
  }
}

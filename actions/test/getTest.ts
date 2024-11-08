'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testsTable } from '@schema/test';
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
        category: {
          columns: {
            id: true,
            name: true,
          },
        },
        questionGroups: {
          with: {
            questions: {
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
              },
            },
          },
        },
      },
    });


    if (revalidate) {
      revalidatePath(`/test/${testId}`);
    }

    return test;
  } catch (error) {
    console.error('Error fetching test:', error);
    throw new Error('Failed to fetch test data');
  }
}

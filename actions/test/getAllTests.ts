'use server';

import { eq, asc } from 'drizzle-orm';

import { auth } from '@/next-auth/auth';
import db from '@/lib/db';
import { testsTable } from '@schema/test';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';
import { CompleteTest } from '@/types/test/test';

export const getAllUserTests = async () => {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      throw new Error('Unauthorized');
    }

    const tests = await db.query.tests.findMany({
      where: eq(testsTable.creatorId, session.user.userID),
      with: {
        questionGroups: {
          with: {
            questionOnQuestionGroup: {
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
                    groupSubQuestions: true,
                  },
                },
              },
            },
          },
        },
        settings: true,
      },
    });

    const processedTests = tests.map((test) => ({
      ...test,
      questionGroups: test.questionGroups.map((group) => ({
        ...group,
        questions: group.questionOnQuestionGroup.map((qog) => qog.question),
      })),
    }));

    return processedTests as unknown as CompleteTest[];
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw new Error('Failed to fetch tests data');
  }
};

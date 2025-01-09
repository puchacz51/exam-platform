import { and, eq, sql } from 'drizzle-orm';

import db from '@/lib/db';
import { auth } from '@/next-auth/auth';
import { testAttemptsTable } from '@schema/testAttempt';

export const getUserAttemptWithTestSettings = async (
  assignmentId: string,
  showAnswer = false
) => {
  const session = await auth();

  if (!session?.user.userID) {
    throw new Error('Unauthorized');
  }
  try {
    const userAttempt = await db.query.testAttempts.findFirst({
      where: and(
        eq(testAttemptsTable.userId, session.user.userID),
        eq(testAttemptsTable.testAccessId, assignmentId)
      ),
      with: {
        testAccess: {
          with: {
            test: {
              with: {
                settings: true,
                QG: {
                  with: {
                    qOnQG: {
                      with: {
                        question: {
                          with: {
                            GSQ: {
                              columns: {
                                id: true,
                                text: true,
                                type: true,
                                tolerance: true,
                                ...(showAnswer && {
                                  booleanAnswer: true,
                                  choiceAnswer: true,
                                  numericAnswer: true,
                                }),
                              },
                            },
                            matchingPairs: true,
                            answers: {
                              columns: {
                                id: true,
                                text: true,
                                ...(showAnswer && {
                                  isCorrect: true,
                                }),
                              },
                            },
                            orderItems: {
                              columns: {
                                id: true,
                                text: true,
                                ...(showAnswer && {
                                  order: true,
                                }),
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        answers: {
          with: {
            booleanAnswers: true,
            choiceAnswers: true,
            matchingAnswers: true,
            numericAnswers: true,
            openAnswers: true,
            orderAnswers: true,
          },
        },
      },
    });

    if (!userAttempt) {
      return { data: userAttempt, error: 'Attempt not found' };
    }

    const shouldShuffleAnswers = showAnswer
      ? false
      : !!userAttempt.testAccess.test.settings.shuffleAnswers;

    const QGWithRandomizedQuestions = userAttempt.testAccess.test.QG.map(
      (qg) => ({
        ...qg,
        qOnQG: qg.qOnQG.map((qOnQG) => ({
          ...qOnQG,
          question: {
            ...qOnQG.question,
            GSQ: !shouldShuffleAnswers
              ? qOnQG.question.GSQ
              : qOnQG.question.GSQ.sort(() => Math.random() - 0.5),
            matchingPairs: !shouldShuffleAnswers
              ? qOnQG.question.matchingPairs
              : (() => {
                  if (!qOnQG.question.matchingPairs) return [];
                  const shuffledValues = [...qOnQG.question.matchingPairs]
                    .map((mp) => mp.value)
                    .sort(() => Math.random() - 0.5);

                  return qOnQG.question.matchingPairs.map((mp, index) => ({
                    id: mp.id,
                    questionId: mp.questionId,
                    key: mp.key,
                    value: shuffledValues[index],
                  }));
                })(),
            answers: !shouldShuffleAnswers
              ? qOnQG.question.answers
              : qOnQG.question.answers.sort(() => Math.random() - 0.5),
            orderItems: qOnQG.question.orderItems.sort(() => Math.random() - 0.5),
          },
        })),
      })
    );
    return {
      data: {
        ...userAttempt,
        testAccess: {
          ...userAttempt.testAccess,
          test: {
            ...userAttempt.testAccess.test,
            QG: QGWithRandomizedQuestions,
          },
        },
      },
      error: null,
    };
  } catch (error) {
    return { error: 'Error fetching attempt', data: null };
  }
};

export type UserAttemptResponse = Awaited<
  ReturnType<typeof getUserAttemptWithTestSettings>
>;

export type UserAttempt = NonNullable<UserAttemptResponse['data']>;
export type QG = UserAttempt['testAccess']['test']['QG'][0];
export type TestSettings = UserAttempt['testAccess']['test']['settings'];
export type UserAttemptAnswers = UserAttempt['answers'];
export type QuestionGroups = {
  id: string;
  name: string;
  questions: UserAttempt['testAccess']['test']['QG'][number]['qOnQG'][number]['question'][];
};

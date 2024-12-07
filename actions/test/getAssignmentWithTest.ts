'use server';

import { and, asc, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { testAccessConfigTable } from '@schema/testAccesss';
import { auth } from '@/next-auth/auth';
import { createUserAttempt } from '@actions/attempt/createUserAttempt';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';
import { checkIfNoMoreQuestions } from '@actions/test/helpers/questionResolver';

export async function getAssignmentWithTest(id: string) {
  const session = await auth();

  if (!session?.user.userID) {
    throw new Error('Unauthorized');
  }

  try {
    const assignment = await db.query.testAccess.findFirst({
      where: and(eq(testAccessConfigTable.id, id)),
      columns: {
        id: true,
        testId: true,
        accessType: true,
        endsAt: true,
        timeLimit: true,
        showResultsAfterSubmission: true,
        startsAt: true,
      },
      with: {
        TAGroup: {
          columns: {
            id: true,
            sourceType: true,
          },
          with: {
            group: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        test: {
          with: {
            QG: {
              columns: {
                id: true,
                name: true,
                order: true,
              },
              orderBy: asc(questionOnQuestionGroupTable.order),
              with: {
                qOnQG: {
                  with: {
                    question: {
                      with: {
                        groupSubQuestions: {
                          columns: {
                            id: true,
                            tolerance: true,
                            text: true,
                            type: true,
                          },
                        },
                        matchingPairs: true,
                        orderItems: true,
                        category: true,
                        answers: {
                          columns: {
                            id: true,
                            text: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            settings: true,
          },
        },
        attempts: {
          with: {
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
        },
      },
    });
    if (!assignment) {
      throw new Error('Assignment not found');
    }

    const { questionDisplayMode } = assignment.test.settings;
    const questionGroups = assignment.test.QG.map((qg) => ({
      id: qg.id,
      name: qg.name,
      questions: qg.qOnQG
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((q) => q.question),
    }));

    const questionGroupsAnsweredQuestion = questionGroups.reduce(
      (acc, group) => {
        let questionAnsweredCount = 0;
        group.questions.forEach((question) => {
          if (
            assignment.attempts[0].answers.find(
              (answer) =>
                answer.questionId === question.id && !!answer.answeredAt
            )
          ) {
            questionAnsweredCount++;
          }
        });

        return [...acc, questionAnsweredCount];
      },
      [] as number[]
    );
    const totalAnsweredQuestions = questionGroupsAnsweredQuestion.reduce(
      (acc, count) => acc + count,
      0
    );

    const isAllQuestionsAnswered =
      totalAnsweredQuestions === questionGroups.flat().length;
    const groupLength = questionGroups.length;
    const isNoMoreQuestionsToAnswer = checkIfNoMoreQuestions(
      totalAnsweredQuestions,
      isAllQuestionsAnswered,
      questionDisplayMode,
      groupLength
    );

    if (!assignment.attempts.length) {
      const userAttempt = (await createUserAttempt(assignment.id)).data;

      if (!userAttempt) throw new Error('Failed to create user attempt');

      return {
        ...assignment,
        attempts: [userAttempt],
        questionGroups,
        isNoMoreQuestionsToAnswer,
      };
    }

    return {
      ...assignment,
      questionGroups,
      attempts: assignment.attempts,
      isNoMoreQuestionsToAnswer,
    };
  } catch (error) {
    console.error('Error fetching assignment with test:', error);
    throw new Error('Failed to fetch assignment with test data');
  }
}

export type AssignmentWithTest = ReturnType<typeof getAssignmentWithTest>;

'use server';

import db from '@/lib/db';
import { TestCreatorQuestionGroup } from '@/types/test-creator/questionGroup';
import { TestCreatorTest } from '@/types/test-creator/test';
import { testsTable } from '@schema/test';
import { questionGroupsTable } from '@schema/questionGroups';
import { questionsTable } from '@schema/questions';
import { auth } from '@/next-auth/auth';
import { testSettingsTable } from '@schema/testSettings';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';
import { validateTestSubmission } from '@actions/test/validateTest';
import { createQuestionTypeSpecificData } from '@actions/test/questionHandler';

type TransactionFunction = Parameters<typeof db.transaction>[0];
export type Tx = Parameters<TransactionFunction>[0];

async function createTest(
  test: TestCreatorTest,
  questionGroups: TestCreatorQuestionGroup[],
  userId: string
) {
  const { success, errors } = await validateTestSubmission({
    test,
    questionGroups,
  });
  if (!success) {
    return { success: false, errors };
  }

  return await db.transaction(async (tx) => {
    const [createdTest] = await tx
      .insert(testsTable)
      .values({
        title: test.title,
        description: test.description ?? '',
        creatorId: userId,
        createdAt: new Date(),
      })
      .returning();

    await tx.insert(testSettingsTable).values({
      testId: createdTest.id,
      navigationMode: test.settings.navigationMode,
      allowGoBack: test.settings.allowGoBack,
      confirmBeforeGroupChange: test.settings.confirmBeforeGroupChange,
      scoringSystem: test.settings.scoringSystem,
      allowPartialPoints: test.settings.allowPartialPoints,
      questionDisplayMode: test.settings.questionDisplayMode,
      shuffleQuestionsInGroup: test.settings.shuffleQuestionsInGroup,
      shuffleAnswers: test.settings.shuffleAnswers,
      showProgressBar: test.settings.showProgressBar,
      showTimeRemaining: test.settings.showTimeRemaining,
      showQuestionPoints: test.settings.showQuestionPoints,
      allowQuestionFlagging: test.settings.allowQuestionFlagging,
      showCorrectAnswers: test.settings.showCorrectAnswers,
      showPointsPerQuestion: test.settings.showPointsPerQuestion,
      showFinalScore: test.settings.showFinalScore,
    });

    for (const [i, group] of Object.entries(questionGroups)) {
      if (!group.questions.length) {
        continue;
      }

      const [createdGroup] = await tx
        .insert(questionGroupsTable)
        .values({
          testId: createdTest.id,
          name: group.name,
          order: parseInt(i) + 1,
        })
        .returning();

      for (const [index, question] of Object.entries(group.questions)) {
        const [createdQuestion] = await tx
          .insert(questionsTable)
          .values({
            text: question.text,
            questionType: question.questionType as 'OPEN',
            isPublic: question.isPublic,
            categoryId: question.categoryId,
            points: question.points,
          })
          .returning();

        await createQuestionTypeSpecificData(tx, question, createdQuestion.id);

        await tx.insert(questionOnQuestionGroupTable).values({
          questionId: createdQuestion.id,
          questionGroupId: createdGroup.id,
          order: parseInt(index) + 1,
        });
      }
    }

    return createdTest;
  });
}

export async function createTestAction(
  test: TestCreatorTest,
  questionGroups: TestCreatorQuestionGroup[]
) {
  try {
    const session = await auth();
    if (!session?.user?.userID) {
      return {
        success: false,
        error: 'Unauthorized access. Please log in.',
      };
    }

    const userId = session.user.userID;
    const result = await createTest(test, questionGroups, userId);
    if ('errors' in result) {
      return { success: false, errors: result.errors };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

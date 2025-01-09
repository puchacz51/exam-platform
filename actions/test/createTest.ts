'use server';

import db from '@/lib/db';
import { TestCreatorQuestionGroup } from '@/types/test-creator/questionGroup';
import { TestCreatorTest } from '@/types/test-creator/test';
import { testsTable } from '@schema/test';
import {
  InsertQuestionGroup,
  questionGroupsTable,
} from '@schema/questionGroups';
import { InsertQuestion, questionsTable } from '@schema/questions';
import { auth } from '@/next-auth/auth';
import { testSettingsTable } from '@schema/testSettings';
import {
  InsertQuestionOnQuestionGroup,
  questionOnQuestionGroupTable,
} from '@schema/questionOnQuestionGroup';
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
      allowGoBack: test.settings.allowGoBack,
      scoringSystem: test.settings.scoringSystem,
      allowPartialPoints: test.settings.allowPartialPoints,
      questionDisplayMode: test.settings.questionDisplayMode,
      shuffleQuestionsInGroup: test.settings.shuffleQuestionsInGroup,
      shuffleAnswers: test.settings.shuffleAnswers,
      showQuestionPoints: test.settings.showQuestionPoints,
      showCorrectAnswers: test.settings.showCorrectAnswers,
      showPointsPerQuestion: test.settings.showPointsPerQuestion,
      showFinalScore: test.settings.showFinalScore,
    });

    const groupInserts: InsertQuestionGroup[] = [];
    const questionInserts: InsertQuestion[] = [];
    const questionGroupRelations: InsertQuestionOnQuestionGroup[] = [];
    const questionTypeData: Promise<void>[] = [];

    for (const [i, group] of Object.entries(questionGroups)) {
      if (!group.questions.length) continue;

      groupInserts.push({
        testId: createdTest.id,
        name: group.name,
        order: parseInt(i) + 1,
      });
    }

    const createdGroups = await tx
      .insert(questionGroupsTable)
      .values(groupInserts)
      .returning();

    questionGroups.forEach((group) => {
      if (!group.questions.length) return;

      group.questions.forEach((question) => {
        questionInserts.push({
          text: question.text,
          questionType: question.questionType as 'NUMERIC',
          categoryId: question.categoryId,
          points: question.points,
        });
      });
    });

    const createdQuestions = await tx
      .insert(questionsTable)
      .values(questionInserts)
      .returning();

    let questionCounter = 0;
    questionGroups.forEach((group, groupIndex) => {
      if (!group.questions.length) return;
      const groupId = createdGroups[groupIndex].id;

      group.questions.forEach((question, questionIndex) => {
        const questionId = createdQuestions[questionCounter].id;

        questionGroupRelations.push({
          questionId: questionId,
          questionGroupId: groupId,
          order: questionIndex + 1,
        });

        questionTypeData.push(
          createQuestionTypeSpecificData(tx, question, questionId)
        );

        questionCounter++;
      });
    });

    await Promise.all([
      tx.insert(questionOnQuestionGroupTable).values(questionGroupRelations),
      ...questionTypeData,
    ]);

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
      console.error('Error creating test:', result.errors);
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

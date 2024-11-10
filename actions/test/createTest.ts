'use server';

import db from '@/lib/db';
import { TestCreatorQuestionGroup } from '@/app/[locale]/(dashboard)/test-creator/types/questionGroup';
import { TestCreatorTest } from '@/app/[locale]/(dashboard)/test-creator/types/test';
import { testsTable } from '@schema/test';
import { questionGroupsTable } from '@schema/questionGroups';
import { questionsTable } from '@schema/questions';
import { auth } from '@/next-auth/auth';
import { testSettingsTable } from '@schema/testSettings';

import { validateTestSubmission } from './validateTest';
import { createQuestionTypeSpecificData } from './questionHandler';

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
        description: test.description,
        categoryId: test.categoryId,
        creatorId: userId,
        createdAt: new Date(),
      })
      .returning();
    await tx.insert(testSettingsTable).values({
      ...test.settings,
      testId: createdTest.id,
    });

    for (const group of questionGroups) {
      const [createdGroup] = await tx
        .insert(questionGroupsTable)
        .values({
          testId: createdTest.id,
          name: group.name,
          maxQuestionPerPage: group.maxQuestionPerPage,
        })
        .returning();

      for (const [i, question] of Object.entries(group.questions)) {
        const [createdQuestion] = await tx
          .insert(questionsTable)
          .values({
            groupId: createdGroup.id,
            text: question.text,
            questionType: question.questionType as 'OPEN',
            isPublic: question.isPublic,
            categoryId: question.categoryId,
            points: question.points,
          })
          .returning();

        await createQuestionTypeSpecificData(tx, question, createdQuestion.id);
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
    console.log('session', session);
    if (!session?.user?.userID) {
      return {
        success: false,
        error: 'Unauthorized access. Please log in.',
      };
    }

    const userId = session.user.userID;
    const result = await createTest(test, questionGroups, userId);
    console.log('result', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

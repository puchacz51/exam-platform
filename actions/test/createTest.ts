'use server';

import db from '@/lib/db';
import { TestCreatorQuestionGroup } from '@/app/[locale]/(dashboard)/test-creator/types/questionGroup';
import {
  BooleanQuestion,
  MultipleChoiceQuestion,
  NumericQuestion,
  OpenQuestion,
  OrderQuestion,
  Question,
  SingleChoiceQuestion,
} from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { TestCreatorTest } from '@/app/[locale]/(dashboard)/test-creator/types/test';
import { testsTable } from '@schema/test';
import { questionGroupsTable } from '@schema/questionGroups';
import { questionsTable } from '@schema/questions';
import { answersTable } from '@schema/answers';
import { orderItemsTable } from '@schema/orderItems';
import { numericQuestionsTable } from '@schema/numericQuestion';

type TransactionFunction = Parameters<typeof db.transaction>[0];
type Tx = Parameters<TransactionFunction>[0];

async function createTest(
  test: TestCreatorTest,
  questionGroups: TestCreatorQuestionGroup[],
  userId: string
) {
  return await db.transaction(async (tx) => {
    const [createdTest] = await tx
      .insert(testsTable)
      .values({
        title: test.title,
        description: test.description,
        categoryId: test.categoryId,
        creatorId: userId,
        accessType: test.accessType,
        accessCode: test.accessCode,
        createdAt: new Date(),
      })
      .returning();

    for (const group of questionGroups) {
      const [createdGroup] = await tx
        .insert(questionGroupsTable)
        .values({
          testId: createdTest.id,
          name: group.name,
          order: group.order,
          maxQuestionPerPage: group.maxQuestionPerPage,
        })
        .returning();

      group.questions.forEach(async (question, i) => {
        const [createdQuestion] = await tx
          .insert(questionsTable)
          .values({
            groupId: createdGroup.id,
            text: question.text,
            questionType: question.questionType as 'OPEN',
            order: i,
            isPublic: question.isPublic,
            categoryId: question.categoryId,
            points: question.points,
          })
          .returning();

        await createQuestionTypeSpecificData(tx, question, createdQuestion.id);
      });
    }

    return createdTest;
  });
}

async function createQuestionTypeSpecificData(
  tx: Tx,
  question: Question,
  questionId: string
) {
  switch (question.questionType) {
    case 'OPEN':
      await handleOpenQuestion(tx, question as OpenQuestion, questionId);
      break;
    case 'SINGLE_CHOICE':
    case 'MULTIPLE_CHOICE':
      await handleChoiceQuestion(
        tx,
        question as SingleChoiceQuestion | MultipleChoiceQuestion,
        questionId
      );
      break;
    case 'ORDER':
      await handleOrderQuestion(tx, question as OrderQuestion, questionId);
      break;
    case 'BOOLEAN':
      await handleBooleanQuestion(tx, question as BooleanQuestion, questionId);
      break;
    case 'NUMERIC':
      await handleNumericQuestion(tx, question as NumericQuestion, questionId);
      break;
  }
}

async function handleOpenQuestion(
  tx: Tx,
  question: OpenQuestion,
  questionId: string
) {
  if (question.answers && question.answers.length > 0) {
    await tx.insert(answersTable).values({
      questionId,
      text: question.answers[0].text,
      isCorrect: true,
    });
  }
}

async function handleChoiceQuestion(
  tx: Tx,
  question: SingleChoiceQuestion | MultipleChoiceQuestion,
  questionId: string
) {
  const answersToInsert = question.answers.map((answer, index) => ({
    questionId,
    text: answer.text,
    isCorrect: answer.isCorrect,
    order: index,
  }));

  await tx.insert(answersTable).values(answersToInsert);
}

async function handleOrderQuestion(
  tx: Tx,
  question: OrderQuestion,
  questionId: string
) {
  const itemsToInsert = question.orderItems.map((item) => ({
    questionId,
    text: item.text,
    order: item.order,
  }));

  await tx.insert(orderItemsTable).values(itemsToInsert);
}

async function handleBooleanQuestion(
  tx: Tx,
  question: BooleanQuestion,
  questionId: string
) {
  await tx.insert(answersTable).values({
    questionId,
    text: question.correctAnswer.toString(),
    isCorrect: true,
  });
}

async function handleNumericQuestion(
  tx: Tx,
  question: NumericQuestion,
  questionId: string
) {
  await tx.insert(numericQuestionsTable).values({
    questionId,
    correctAnswer: question.correctAnswer,
    tolerance: question.tolerance,
  });
}

export async function createTestAction(
  test: TestCreatorTest,
  questionGroups: TestCreatorQuestionGroup[]
) {
  try {
    const userId = 'current-user-id';

    const result = await createTest(test, questionGroups, userId);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

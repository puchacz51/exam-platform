'use server';

import db from '@/lib/db';
import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import {
  booleanAnswersTable,
  choiceAnswersTable,
  matchingAnswersTable,
  numericAnswersTable,
  openAnswersTable,
  orderAnswersTable,
} from '@schema/attemptAnswerDetails';
import { attemptAnswersTable } from '@schema/attemptAnswers';

export async function submitAnswer(input: AnswerInput) {
  try {
    return await db.transaction(async (tx) => {
      const [attemptAnswer] = await tx
        .insert(attemptAnswersTable)
        .values({
          attemptId: input.attemptId,
          questionId: input.questionId,
          type: input.type,
        })
        .returning();
      console.log('attemptAnswer', attemptAnswer);
      switch (input.type) {
        case 'OPEN':
          await tx.insert(openAnswersTable).values({
            attemptAnswerId: attemptAnswer.id,
            text: input.answer.text,
          });
          break;

        case 'SINGLE_CHOICE':
        case 'MULTIPLE_CHOICE':
          await tx.insert(choiceAnswersTable).values(
            input.answers.map(({ answerId }) => ({
              attemptAnswerId: attemptAnswer.id,
              answerId,
            }))
          );
          break;

        case 'MATCHING':
          await tx.insert(matchingAnswersTable).values(
            input.pairs.map((pair) => ({
              attemptAnswerId: attemptAnswer.id,
              keyItemId: pair.keyItemId,
              valueItemId: pair.valueItemId,
            }))
          );
          break;

        case 'ORDER':
          await tx.insert(orderAnswersTable).values(
            input.items.map((item) => ({
              attemptAnswerId: attemptAnswer.id,
              itemId: item.itemId,
              position: item.position,
            }))
          );
          break;

        case 'NUMERIC_GROUP':
          await tx.insert(numericAnswersTable).values(
            input.answers.map((answer) => ({
              attemptAnswerId: attemptAnswer.id,
              subQuestionId: answer.subQuestionId,
              value: answer.value,
            }))
          );
          break;

        case 'BOOLEAN_GROUP':
          await tx.insert(booleanAnswersTable).values(
            input.answers.map((answer) => ({
              attemptAnswerId: attemptAnswer.id,
              subQuestionId: answer.subQuestionId,
              value: answer.value,
            }))
          );
          break;
      }

      return { data: attemptAnswer, error: null };
    });
  } catch (error) {
    console.error('Failed to submit answer', error?.message);
    return { data: null, error: 'Failed to submit answer' };
  }
}

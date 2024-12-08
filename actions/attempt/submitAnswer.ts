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

type TransactionFunction = Parameters<typeof db.transaction>[0];
export type Tx = Parameters<TransactionFunction>[0];

export async function submitAnswer(input: AnswerInput, externalTx?: Tx) {
  const operation = async (tx: Tx) => {
    const [attemptAnswer] = await tx
      .insert(attemptAnswersTable)
      .values({
        attemptId: input.attemptId,
        questionId: input.questionId,
        type: input.type,
        ...(input.type !== 'OPEN' ? { points: input.points } : {}),
      })
      .returning();

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
            key: pair.key,
            value: pair.value,
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

      case 'NUMERIC':
        await tx.insert(numericAnswersTable).values(
          input.answers.map((answer) => ({
            attemptAnswerId: attemptAnswer.id,
            value: answer.value,
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

      default:
        return {
          data: null,
          error: 'Invalid answer type',
        };
    }

    return { data: attemptAnswer, error: null };
  };

  try {
    if (externalTx) {
      return await operation(externalTx);
    }
    return await db.transaction(operation);
  } catch (error) {
    return { data: null, error: 'Failed to submit answer' };
  }
}

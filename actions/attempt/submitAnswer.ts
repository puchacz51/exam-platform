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
        if (!input.answer.text) break;
        await tx.insert(openAnswersTable).values({
          attemptAnswerId: attemptAnswer.id,
          text: input.answer.text,
        });
        break;

      case 'SINGLE_CHOICE':
      case 'MULTIPLE_CHOICE':
        if (!input.answers.length) break;
        await tx.insert(choiceAnswersTable).values(
          input.answers.map(({ answerId }) => ({
            attemptAnswerId: attemptAnswer.id,
            answerId,
          }))
        );
        break;

      case 'MATCHING':
        if (!input.pairs.length) break;
        await tx.insert(matchingAnswersTable).values(
          input.pairs.map((pair) => ({
            attemptAnswerId: attemptAnswer.id,
            key: pair.key,
            value: pair.value,
          }))
        );
        break;

      case 'ORDER':
        if (!input.items.length) break;
        await tx.insert(orderAnswersTable).values(
          input.items.map((item) => ({
            attemptAnswerId: attemptAnswer.id,
            itemId: item.itemId,
            position: item.position,
          }))
        );
        break;

      case 'NUMERIC':
        if (!input.answers.length) break;
        await tx.insert(numericAnswersTable).values(
          input.answers.map((answer) => ({
            attemptAnswerId: attemptAnswer.id,
            value: answer.value,
          }))
        );
        break;

      case 'NUMERIC_GROUP':
        if (!input.answers.length) break;
        await tx.insert(numericAnswersTable).values(
          input.answers.map((answer) => ({
            attemptAnswerId: attemptAnswer.id,
            subQuestionId: answer.subQuestionId,
            value: answer.value,
          }))
        );
        break;

      case 'BOOLEAN_GROUP':
      case 'BOOLEAN':
        if (!input.answers.length) break;
        await tx.insert(booleanAnswersTable).values(
          input.answers.map((answer) => ({
            attemptAnswerId: attemptAnswer.id,
            subQuestionId:
              input.type === 'BOOLEAN_GROUP' ? answer.subQuestionId : null,
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
    console.error('Error submitting answer:', input);
    return { data: null, error: 'Failed to submit answer' };
  }
}

'use server';

import { eq } from 'drizzle-orm';

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
import { Tx } from '@actions/attempt/submitAnswer';

export async function editAnswer(
  answerId: string,
  input: AnswerInput,
  externalTx?: Tx
) {
  const operation = async (tx: Tx) => {
    await tx
      .update(attemptAnswersTable)
      .set({
        attemptId: input.attemptId,
        questionId: input.questionId,
        type: input.type,
      })
      .where(eq(attemptAnswersTable.id, answerId));

    const deleteDetails = async () => {
      switch (input.type) {
        case 'OPEN':
          await tx
            .delete(openAnswersTable)
            .where(eq(openAnswersTable.attemptAnswerId, answerId));
          break;
        case 'SINGLE_CHOICE':
        case 'MULTIPLE_CHOICE':
          await tx
            .delete(choiceAnswersTable)
            .where(eq(choiceAnswersTable.attemptAnswerId, answerId));
          break;
        case 'MATCHING':
          await tx
            .delete(matchingAnswersTable)
            .where(eq(matchingAnswersTable.attemptAnswerId, answerId));
          break;
        case 'ORDER':
          await tx
            .delete(orderAnswersTable)
            .where(eq(orderAnswersTable.attemptAnswerId, answerId));
          break;
        case 'NUMERIC':
          await tx
            .delete(numericAnswersTable)
            .where(eq(numericAnswersTable.attemptAnswerId, answerId));
          break;
        case 'NUMERIC_GROUP':
          await tx
            .delete(numericAnswersTable)
            .where(eq(numericAnswersTable.attemptAnswerId, answerId));
          break;
        case 'BOOLEAN_GROUP':
          await tx
            .delete(booleanAnswersTable)
            .where(eq(booleanAnswersTable.attemptAnswerId, answerId));
          break;
      }
    };

    await deleteDetails();

    switch (input.type) {
      case 'OPEN':
        await tx.insert(openAnswersTable).values({
          attemptAnswerId: answerId,
          text: input.answer.text,
        });
        break;

      case 'SINGLE_CHOICE':
      case 'MULTIPLE_CHOICE':
        await tx.insert(choiceAnswersTable).values(
          input.answers.map(({ answerId: choiceId }) => ({
            attemptAnswerId: answerId,
            answerId: choiceId,
          }))
        );
        break;

      case 'MATCHING':
        await tx.insert(matchingAnswersTable).values(
          input.pairs.map((pair) => ({
            attemptAnswerId: answerId,
            key: pair.key,
            value: pair.value,
          }))
        );
        break;

      case 'ORDER':
        await tx.insert(orderAnswersTable).values(
          input.items.map((item) => ({
            attemptAnswerId: answerId,
            itemId: item.itemId,
            position: item.position,
          }))
        );
        break;

      case 'NUMERIC':
        await tx.insert(numericAnswersTable).values(
          input.answers.map((answer) => ({
            attemptAnswerId: answerId,
            value: answer.value,
          }))
        );
        break;

      case 'NUMERIC_GROUP':
        await tx.insert(numericAnswersTable).values(
          input.answers.map((answer) => ({
            attemptAnswerId: answerId,
            subQuestionId: answer.subQuestionId,
            value: answer.value,
          }))
        );
        break;

      case 'BOOLEAN_GROUP':
        await tx.insert(booleanAnswersTable).values(
          input.answers.map((answer) => ({
            attemptAnswerId: answerId,
            subQuestionId: answer.subQuestionId,
            value: answer.value,
          }))
        );
        break;
    }

    return { data: { id: answerId }, error: null };
  };

  try {
    if (externalTx) {
      return await operation(externalTx);
    }
    return await db.transaction(operation);
  } catch (error) {
    return { data: null, error: 'Failed to edit answer' };
  }
}

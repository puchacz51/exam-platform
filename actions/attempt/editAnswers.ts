'use server';

import db from '@/lib/db';
import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { editAnswer } from '@actions/attempt/editAnswer';

export async function editAnswers(answerIds: string[], answers: AnswerInput[]) {
  if (
    !answers?.length ||
    !answerIds?.length ||
    answerIds.length !== answers.length
  ) {
    return {
      data: [],
      error: null,
    };
  }

  try {
    return await db.transaction(async (trx) => {
      const results = await Promise.all(
        answers.map((answer, index) =>
          editAnswer(answerIds[index], answer, trx)
        )
      );

      const error = results.find((result) => result.error);
      if (error) {
        throw new Error(error?.error || '');
      }

      return {
        data: results.map((result) => result.data),
        error: null,
      };
    });
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Failed to edit answers',
    };
  }
}

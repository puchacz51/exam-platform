'use server';

import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import db from '@/lib/db';
import { submitAnswer } from '@actions/attempt/submitAnswer';

export async function submitAnswers(answers: AnswerInput[]) {
  if (!answers?.length) {
    return {
      data: [],
      error: null,
    };
  }

  try {
    return await db.transaction(async (trx) => {
      const filteredAnswers = answers.filter(Boolean).filter((answer) => {
        return answer.questionId && typeof answer.points === 'number';
      });
      console.log('filteredAnswers', filteredAnswers);

      const results = await Promise.all(
        filteredAnswers.map((answer) => submitAnswer(answer, trx))
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
      error:
        error instanceof Error ? error.message : 'Failed to submit answers',
    };
  }
}

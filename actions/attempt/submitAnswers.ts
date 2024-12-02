'use server';

import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import db from '@/lib/db';
import { submitAnswer } from '@actions/attempt/submitAnswer';

export async function submitAnswers(answers: AnswerInput[]) {
  try {
    return await db.transaction(async () => {
      const results = [];
      for (const answer of answers) {
        const result = await submitAnswer(answer);
        if (result.error) {
          throw new Error(result.error);
        }
        results.push(result.data);
      }
      console.log('results', results);
      return { data: results, error: null };
    });
  } catch (error) {
    return {
      data: null,
      error: 'Failed to submit answers',
    };
  }
}

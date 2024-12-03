'use server';

import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { editAnswers } from '@actions/attempt/editAnswers';
import { submitAnswers } from '@actions/attempt/submitAnswers';
import { getUserAttemptWithTestSettings } from '@actions/attempt/getUserAttempt';

export async function createAnswer(
  testAccessId: string,
  answers: AnswerInput[]
) {
  const { data: userAttempt, error } =
    await getUserAttemptWithTestSettings(testAccessId);

  console.log('userAttempt', userAttempt, testAccessId);

  if (error || !userAttempt) {
    return { data: null, error: 'Attempt not found' };
  }

  const testSettings = userAttempt.testAccess.test.settings;
  const allowEdit = testSettings.allowGoBack;

  try {
    const existingAnswers = answers.map((answer) =>
      userAttempt.answers.find(
        (existing) => existing.questionId === answer.questionId
      )
    );

    if (allowEdit && existingAnswers.some((answer) => answer)) {
      const answersToEdit: AnswerInput[] = [];
      const answerIdsToEdit: string[] = [];
      const answersToSubmit: AnswerInput[] = [];

      answers.forEach((answer, index) => {
        if (existingAnswers[index]) {
          answersToEdit.push(answer);
          answerIdsToEdit.push(existingAnswers[index]!.id);
        } else {
          answersToSubmit.push(answer);
        }
      });

      const results = await Promise.all([
        answersToEdit.length > 0
          ? editAnswers(answerIdsToEdit, answersToEdit)
          : { data: [], error: null },
        answersToSubmit.length > 0
          ? submitAnswers(answersToSubmit)
          : { data: [], error: null },
      ]);

      const editError = results[0].error;
      const submitError = results[1].error;

      if (editError || submitError) {
        throw new Error('Failed to process answers');
      }

      return {
        data: [...(results[0].data || []), ...(results[1].data || [])],
        error: null,
      };
    }

    return await submitAnswers(answers);
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to process answers',
    };
  }
}

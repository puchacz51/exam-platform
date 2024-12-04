'use server';

import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { editAnswers } from '@actions/attempt/editAnswers';
import { submitAnswers } from '@actions/attempt/submitAnswers';
import { getUserAttemptWithTestSettings } from '@actions/attempt/getUserAttempt';
import { calculatePoints } from '@actions/attempt/helpers/calculatePoints';

export async function createAnswer(
  testAccessId: string,
  answers: AnswerInput[]
) {
  const strartTime = new Date().getTime();

  const { data: userAttempt, error } =
    await getUserAttemptWithTestSettings(testAccessId);

  if (error || !userAttempt) {
    return { data: null, error: 'Attempt not found' };
  }

  const testSettings = userAttempt.testAccess.test.settings;
  const allowEdit = testSettings.allowGoBack;

  try {
    const answersToEdit: AnswerInput[] = [];
    const answerIdsToEdit: string[] = [];
    const answersToSubmit: AnswerInput[] = [];

    const existingAnswers = answers.map((answer) =>
      userAttempt.answers.find(
        (existing) => existing.questionId === answer.questionId
      )
    );

    if (allowEdit && existingAnswers.some((answer) => answer)) {
      answers.forEach((answer, index) => {
        if (existingAnswers[index]) {
          answersToEdit.push(answer);
          answerIdsToEdit.push(existingAnswers[index]!.id);
        } else {
          answersToSubmit.push(answer);
        }
      });

      const points = calculatePoints({
        answers: answersToEdit,
        questions: userAttempt.testAccess.test.QG.flatMap((q) =>
          q.qOnQG.map((qq) => qq.question)
        ),
        settings: testSettings,
      });
      console.log(points);
      console.log(
        'createAnswer time1',
        (new Date().getTime() - strartTime) / 1000
      );

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

      console.log('createAnswer time', new Date().getTime() - strartTime);
      // in seconds
      console.log(
        'createAnswer time',
        (new Date().getTime() - strartTime) / 1000
      );
      return {
        data: [...(results[0].data || []), ...(results[1].data || [])],
        error: null,
      };
    }

    const addedAttempt = await submitAnswers(answers);

    if (addedAttempt.error) {
      throw new Error('Failed to process answers');
    }

    console.log('createAnswer time', new Date().getTime() - strartTime);
    // in seconds
    console.log(
      'createAnswer time',
      (new Date().getTime() - strartTime) / 1000
    );

    return {
      data: addedAttempt.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to process answers',
    };
  }
}

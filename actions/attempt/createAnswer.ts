'use server';

import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { editAnswers } from '@actions/attempt/editAnswers';
import { submitAnswers } from '@actions/attempt/submitAnswers';
import { getUserAttemptWithTestSettings } from '@actions/attempt/getUserAttempt';
import { calculatePoints } from '@actions/attempt/helpers/calculatePoints';

const logTime = (start: number, label = '') =>
  console.log(label || 'Execution time', (Date.now() - start) / 1000);

export async function createAnswer(
  testAccessId: string,
  answers: AnswerInput[]
) {
  const startTime = Date.now();

  const { data: userAttempt, error } =
    await getUserAttemptWithTestSettings(testAccessId);

  if (!userAttempt || error) {
    return { data: null, error: 'Attempt not found' };
  }

  const { allowGoBack } = userAttempt.testAccess.test.settings;

  if (!allowGoBack) {
    return submitAnswers(answers);
  }

  try {
    // Process answers in a single pass
    const { existing, new: newAnswers } = answers.reduce(
      (acc, answer) => {
        const found = userAttempt.answers.find(
          (a) => a.questionId === answer.questionId
        );
        if (found) {
          acc.existing.push({ id: found.id, answer });
        } else {
          acc.new.push(answer);
        }
        return acc;
      },
      {
        existing: [] as { id: string; answer: AnswerInput }[],
        new: [] as AnswerInput[],
      }
    );

    if (!existing.length && !newAnswers.length) {
      return { data: [], error: null };
    }

    if (existing.length) {
      const questions = userAttempt.testAccess.test.QG.flatMap((qg) =>
        qg.qOnQG.map((q) => q.question)
      );

      const points = calculatePoints({
        answers: existing.map((e) => e.answer),
        questions,
        settings: userAttempt.testAccess.test.settings,
      });

      logTime(startTime, 'Points calculation');
    }

    const [editResult, submitResult] = await Promise.all([
      existing.length
        ? editAnswers(
            existing.map((e) => e.id),
            existing.map((e) => e.answer)
          )
        : { data: [], error: null },
      newAnswers.length ? submitAnswers(newAnswers) : { data: [], error: null },
    ]);

    if (editResult.error || submitResult.error) {
      throw new Error(editResult.error || submitResult.error || '');
    }

    logTime(startTime);

    return {
      data: [...(editResult.data || []), ...(submitResult.data || [])],
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

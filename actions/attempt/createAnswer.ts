'use server';

import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { editAnswers } from '@actions/attempt/editAnswers';
import { submitAnswers } from '@actions/attempt/submitAnswers';
import { getUserAttemptWithTestSettings } from '@actions/attempt/getUserAttempt';
import { calculatePoints } from '@actions/attempt/helpers/calculatePoints';
import { getGroupedAnswers } from '@actions/attempt/helpers/answerAggregation';

export async function createAnswer(
  testAccessId: string,
  answers: AnswerInput[]
) {
  const { data: userAttempt, error } =
    await getUserAttemptWithTestSettings(testAccessId);

  if (!userAttempt || error) {
    return { data: null, error: 'Attempt not found' };
  }

  const {
    testAccess: { test },
  } = userAttempt;

  const questions = test.QG.flatMap((qg) => qg.qOnQG.map((q) => q.question));
  const calculatedPoints = calculatePoints({
    questions,
    answers,
    settings: test.settings,
  });

  const answersWithPoints = answers
    .map((answer) => {
      const question = calculatedPoints.find(
        (p) => p.questionId === answer.questionId
      );

      if (!question) {
        return null;
      }

      return { ...answer, points: question.points };
    })
    .filter((a) => a !== null);

  const { allowGoBack } = userAttempt.testAccess.test.settings;

  if (!allowGoBack) {
    return submitAnswers(answers);
  }

  try {
    const { existing, newAnswers } = getGroupedAnswers(answersWithPoints, userAttempt);

    if (!existing.length && !newAnswers.length) {
      return { data: [], error: null };
    }

    const [editResult, submitResult] = await Promise.all([
      editAnswers(
        existing.map((e) => e.id),
        existing.map((e) => e.answer)
      ),
      submitAnswers(newAnswers),
    ]);

    if (editResult.error || submitResult.error) {
      throw new Error(editResult.error || submitResult.error || '');
    }
    editResult.data;
    return {
      data: {
        prevQuestions: [...editResult.data, ...submitResult.data],
        newQuestions: newAnswers,
        isEnd: false,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error creating answers:', error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to process answers',
    };
  }
}

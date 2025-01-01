'use server';

import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { editAnswers } from '@actions/attempt/editAnswers';
import { submitAnswers } from '@actions/attempt/submitAnswers';
import { getUserAttemptWithTestSettings } from '@actions/attempt/getUserAttempt';
import { calculatePoints } from '@actions/attempt/helpers/calculatePoints';
import { getGroupedAnswers } from '@actions/attempt/helpers/answerAggregation';
import { CompleteQuestion } from '@/types/test/test';

export async function createAnswer(
  testAccessId: string,
  answers: AnswerInput[]
) {
  const { data: userAttempt, error } = await getUserAttemptWithTestSettings(
    testAccessId,
    true
  );

  if (!userAttempt || error) {
    return { data: null, error: 'Attempt not found' };
  }

  const {
    testAccess: { test, timeLimit },
  } = userAttempt;
  const { finishedAt, startedAt } = userAttempt;
  if (finishedAt) {
    return { data: null, error: 'Test is finished' };
  }

  if (
    timeLimit &&
    Date.now() > new Date(startedAt).getTime() + timeLimit * 60 * 1000
  ) {
    return { data: null, error: 'Time is over' };
  }

  const questions = test.QG.flatMap((qg) =>
    qg.qOnQG.map((q) => q.question)
  ) as unknown as CompleteQuestion[];

  const calculatedPoints = calculatePoints({
    questions,
    answers,
    settings: test.settings,
  }).filter((p) => typeof p.points === 'number');

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

  const { allowGoBack, showPointsPerQuestion } =
    userAttempt.testAccess.test.settings;

  if (!allowGoBack) {
    await submitAnswers(answers);

    return {
      data: {
        points: showPointsPerQuestion ? calculatedPoints : [],
        answeredQuestions: calculatedPoints.map((p) => p.questionId),
      },
      error: null,
    };
  }

  try {
    const { existing, newAnswers } = getGroupedAnswers(
      answersWithPoints,
      userAttempt
    );

    if (!existing.length && !newAnswers.length) {
      return {
        data: {
          points: showPointsPerQuestion && !allowGoBack ? calculatedPoints : [],
          answeredQuestions: calculatedPoints.map((p) => p.questionId),
        },
        error: null,
      };
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

    return {
      data: {
        points: showPointsPerQuestion && !allowGoBack ? calculatedPoints : [],
        answeredQuestions: calculatedPoints.map((p) => p.questionId),
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

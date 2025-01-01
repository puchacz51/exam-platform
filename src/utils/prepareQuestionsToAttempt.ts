import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { UserAttemptAnswers } from '@actions/attempt/getUserAttempt';

import { GroupFlowResponse } from '../../types/attempt';

export const prepareQuestionToAttempt = (
  questions: GroupFlowResponse['questionsGroups'][number]['questions'],
  {
    attemptId,
    userAttemptAnswers,
  }: { attemptId: string; userAttemptAnswers: UserAttemptAnswers }
) =>
  questions.reduce(
    (acc, question) => {
      const answer = userAttemptAnswers.find(
        (a) => a.questionId === question.id
      );
      if (question.questionType === 'ORDER') {
        const answers =
          (answer &&
            answer.type === 'ORDER' &&
            answer.orderAnswers.map((a) => ({
              position: a.position,
              itemId: a.itemId,
            }))) ||
          [];

        acc[question.id] = {
          type: 'ORDER',
          questionId: question.id,
          attemptId: attemptId,
          points: typeof answer?.points === 'number' ? answer.points : null,
          items: !!answers ? answers : [],
          answered: !!answers?.length,
        };
      }

      if (question.questionType === 'MATCHING') {
        const answers =
          (answer?.type === 'MATCHING' &&
            answer?.matchingAnswers?.map((p) => ({
              key: p.key || '',
              value: p.value || '',
            }))) ||
          [];

        acc[question.id] = {
          type: 'MATCHING',
          questionId: question.id,
          attemptId,
          points: typeof answer?.points === 'number' ? answer.points : null,
          pairs: !!answers ? answers : [{}],
          answered: !!answers?.length,
        };
      }

      if (
        question.questionType === 'SINGLE_CHOICE' ||
        question.questionType === 'MULTIPLE_CHOICE'
      ) {
        const answers =
          (answer &&
            (answer.type === 'SINGLE_CHOICE' ||
              answer.type === 'MULTIPLE_CHOICE') &&
            answer.choiceAnswers.map((a) => ({ answerId: a.answerId }))) ||
          [];

        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          points: typeof answer?.points === 'number' ? answer.points : null,
          answers: !!answers ? answers : [],
          answered: !!answers?.length,
        };
      }

      if (
        question.questionType === 'NUMERIC' ||
        question.questionType === 'NUMERIC_GROUP'
      ) {
        const answers =
          (answer &&
            (answer.type === 'NUMERIC' || answer.type === 'NUMERIC_GROUP') &&
            answer.numericAnswers.map((a) => ({
              subQuestionId: a.subQuestionId,
              points: typeof answer?.points === 'number' ? answer.points : null,
              value: a.value,
            }))) ||
          [];
        answers.forEach((a) => {
          console.log(a);
        });

        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          points: typeof answer?.points === 'number' ? answer.points : null,
          answers: !!answers ? answers : [],
          answered: !!answers?.length,
        };
      }

      if (
        question.questionType === 'BOOLEAN_GROUP' ||
        question.questionType === 'BOOLEAN'
      ) {
        const answers =
          (answer &&
            (answer.type === 'BOOLEAN' || answer.type === 'BOOLEAN_GROUP') &&
            answer.booleanAnswers.map((a) => ({
              subQuestionId: a.subQuestionId,
              value: a.value,
            }))) ||
          [];
        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          points: typeof answer?.points === 'number' ? answer.points : null,
          answers: !!answers ? answers : [],
          answered: !!answers?.length,
        };
      }

      // if (question.questionType === 'OPEN') {
      //   const answers =
      //     (answer && answer.type === 'OPEN' && answer.openAnswers) || [];
      //   acc[question.id] = {
      //     type: 'OPEN',
      //     questionId: question.id,
      //     points: typeof answer?.points === 'number' ? answer.points : null,
      //     attemptId,
      //     answer: { text: answers[0]?.text || '' },
      //     answered: !!answers?.length,
      //   };
      // }

      return acc;
    },
    {} as Record<string, AnswerInput>
  );

import { AnswerInput } from '@/types/answers/testAttemptAnswers';

import { GroupFlowResponse } from '../../types/attempt';

export const prepareQuestionToAttempt = (
  questions: GroupFlowResponse['questionsGroups'][number]['questions'],
  { attemptId }: { attemptId: string }
) =>
  questions.reduce(
    (acc, question) => {
      if (question.questionType === 'ORDER') {
        acc[question.id] = {
          type: 'ORDER',
          questionId: question.id,
          attemptId: attemptId,
          points: null,
          items: [],
        };
      }

      if (question.questionType === 'MATCHING') {
        acc[question.id] = {
          type: 'MATCHING',
          questionId: question.id,
          attemptId,
          points: null,
          pairs: [],
        };
      }

      if (
        question.questionType === 'SINGLE_CHOICE' ||
        question.questionType === 'MULTIPLE_CHOICE'
      ) {
        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          points: null,
          answers: [],
        };
      }

      if (
        question.questionType === 'NUMERIC' ||
        question.questionType === 'NUMERIC_GROUP'
      ) {
        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          points: null,
          answers: [],
        };
      }

      if (
        question.questionType === 'BOOLEAN_GROUP' ||
        question.questionType === 'BOOLEAN'
      ) {
        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          points: null,
          answers: [],
        };
      }

      if (question.questionType === 'OPEN') {
        acc[question.id] = {
          type: 'OPEN',
          questionId: question.id,
          points: null,
          attemptId,
          answer: { text: '' },
        };
      }

      return acc;
    },
    {} as Record<string, AnswerInput>
  );

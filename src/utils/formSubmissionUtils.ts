import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { TestAttemptFormData } from '@/types/forms/testAttemptForm';

export const prepareFormSubmission = (
  data: TestAttemptFormData,
  attemptId: string
): AnswerInput[] => {
  return Object.entries(data.questions)
    .map(([questionId, questionData]) => {
      const baseAnswer = {
        questionId,
        attemptId,
        type: questionData.type,
      };

      switch (questionData.type) {
        case 'OPEN':
          if (!('answer' in questionData)) return;
          return {
            ...baseAnswer,
            answer: questionData.answer,
          };

        case 'SINGLE_CHOICE':
        case 'MULTIPLE_CHOICE':
          if (!('answers' in questionData)) return;
          return {
            ...baseAnswer,
            answers: questionData.answers,
          };

        case 'MATCHING':
          if (!('pairs' in questionData)) return;
          return {
            ...baseAnswer,
            pairs: questionData.pairs,
          };

        case 'ORDER':
          if (!('items' in questionData)) return;
          return {
            ...baseAnswer,
            items: questionData.items,
          };

        case 'NUMERIC':
        case 'NUMERIC_GROUP':
        case 'BOOLEAN':
        case 'BOOLEAN_GROUP':
          if (!('answers' in questionData)) return;
          return {
            ...baseAnswer,
            answers: questionData.answers,
          };

        default:
          throw new Error(`Unsupported question type: ${questionData.type}`);
      }
    })
    .filter(Boolean) as AnswerInput[];
};

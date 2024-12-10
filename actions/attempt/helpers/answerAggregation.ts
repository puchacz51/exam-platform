import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { UserAttempt } from '@actions/attempt/getUserAttempt';

export const getGroupedAnswers = (
  answers: AnswerInput[],
  previousAttempts: UserAttempt
) =>
  answers.reduce(
    (acc, answer) => {
      const found = previousAttempts?.answers.find(
        (a) => a.questionId === answer.questionId
      );
      if (found) {
        acc.existing.push({ id: found.id, answer });
      } else {
        acc.newAnswers.push(answer);
      }
      return acc;
    },
    {
      existing: [] as { id: string; answer: AnswerInput }[],
      newAnswers: [] as AnswerInput[],
    }
  );

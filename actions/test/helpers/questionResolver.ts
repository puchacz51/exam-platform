import { questionDisplayModeEnum } from '@schema/testSettings';

export function checkIfNoMoreQuestions(
  totalAnsweredQuestions: number,
  isAllQuestionsAnswered: boolean,
  questionDisplayMode: (typeof questionDisplayModeEnum.enumValues)[number],
  questionGroupsLength: number
): boolean {
  return (
    (isAllQuestionsAnswered && questionDisplayMode === 'ALL') ||
    questionDisplayMode === 'SINGLE' ||
    (questionDisplayMode === 'GROUP' &&
      totalAnsweredQuestions >= questionGroupsLength - 1)
  );
}

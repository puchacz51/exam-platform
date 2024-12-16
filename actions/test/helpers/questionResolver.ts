import { questionDisplayModeEnum } from '@schema/testSettings';

export function checkIfNoMoreQuestions(
  totalAnsweredQuestions: number,
  questionDisplayMode: (typeof questionDisplayModeEnum.enumValues)[number],
  questionGroupsLength: number
): boolean {
  return (
    questionDisplayMode === 'SINGLE' ||
    (questionDisplayMode === 'GROUP' &&
      totalAnsweredQuestions >= questionGroupsLength - 1)
  );
}

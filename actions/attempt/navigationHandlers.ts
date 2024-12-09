import { SelectTestSettings } from '@schema/testSettings';

import { GroupFlowResponse } from '../../types/attempt';
import { shiftArrayLeftByUUID } from './helpers/shiftArrayLeft';

export const handleGroupLockWithBackNavigation = (
  selectedGroupId: string,
  QG: any[],
  userId: string,
  attemptId: string,
  testSettings: SelectTestSettings,
  questionsGroups: any[]
): { data: GroupFlowResponse | null; error?: string } => {
  const selectedGroupIndex = QG.findIndex(
    (group) => group.id === selectedGroupId
  );

  if (selectedGroupIndex === -1) {
    return { data: null, error: 'Group not found' };
  }

  const selectedGroup = QG[selectedGroupIndex];
  const nextGroupId = QG[selectedGroupIndex + 1]?.id || null;
  const previousGroupId = QG[selectedGroupIndex - 1]?.id || null;

  return {
    data: {
      type: 'GROUP',
      attemptId,
      testSettings,
      questionsGroups: questionsGroups.map((group) => ({
        id: group.id,
        questions:
          group.id === selectedGroup.id
            ? shiftArrayLeftByUUID(group.questions, userId)
            : [],
      })),
      currentGroupId: selectedGroup.id,
      currentQuestionId: null,
      nextGroupId,
      previousGroupId,
    },
  };
};

export const handleAnswerLockWithBackNavigation = (
  navOptions: { questionId?: string },
  QG: any[],
  userId: string,
  attemptId: string,
  testSettings: any,
  shuffleQuestionsInGroup: boolean
): { data: QuestionFlowResponse | null; error?: string } => {
  const testQuestions = QG.flatMap((qg) => qg.qOnQG.map((q) => q.question));
  const selectedQuestionId = navOptions?.questionId || testQuestions[0].id;
  const shuffledTestQuestions = shuffleQuestionsInGroup
    ? shiftArrayLeftByUUID(testQuestions, userId)
    : testQuestions;

  const selectedQuestionIndex = testQuestions.findIndex(
    (question) => question.id === selectedQuestionId
  );
  const selectedQuestion = testQuestions[selectedQuestionIndex];

  return {
    data: {
      type: 'QUESTION',
      attemptId,
      testSettings,
      questionsGroups: [
        {
          id: 'all',
          questions: shuffledTestQuestions,
        },
      ],
      currentGroupId: null,
      currentQuestionId: selectedQuestion.id,
      nextQuestionId: testQuestions[selectedQuestionIndex + 1]?.id || null,
      previousQuestionId: testQuestions[selectedQuestionIndex - 1]?.id || null,
    },
  };
};

export const handleGroupLockWithoutBack = (
  questionsGroups: any[],
  userAttempt: any,
  userId: string,
  attemptId: string,
  testSettings: any,
  shuffleQuestionsInGroup: boolean
): { data: GroupFlowResponse | null; error?: string } => {
  const answeredGroups = questionsGroups.filter((group) =>
    group.questions.some((question) =>
      userAttempt.answers.some((answer) => answer.questionId === question.id)
    )
  );

  if (answeredGroups.length === questionsGroups.length) {
    return {
      data: null,
      error: 'All questions are already answered',
    };
  }

  const nextGroup = questionsGroups.find(
    (group) =>
      !answeredGroups.some((answeredGroup) => answeredGroup.id === group.id)
  );

  if (!nextGroup) {
    return { data: null, error: 'No next group found' };
  }

  return {
    data: {
      type: 'GROUP',
      attemptId,
      testSettings,
      currentGroupId: null,
      currentQuestionId: null,
      nextGroupId: null,
      questionsGroups: [
        {
          ...nextGroup,
          questions: shuffleQuestionsInGroup
            ? shiftArrayLeftByUUID(nextGroup.questions, userId)
            : nextGroup.questions,
        },
      ],
    },
  };
};

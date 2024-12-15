import { QG, UserAttempt } from '@actions/attempt/getUserAttempt';

import { GroupFlowResponse, QuestionFlowResponse } from '../../types/attempt';
import { shiftArrayLeftByUUID } from './helpers/shiftArrayLeft';

export const handleGroupLockWithBackNavigation = (
  selectedGroupId: string | undefined,
  QG: QG[],
  attempt: UserAttempt
): { data: GroupFlowResponse | null; error?: string } => {
  const { userId, testAccess } = attempt;
  const {
    test: { settings: testSettings },
  } = testAccess;
  const questionsGroups = QG.map((qg) => ({
    id: qg.id,
    name: qg.name,
    questions: qg.qOnQG.map((q) => q.question),
  }));

  const selectedGroupIndex = QG.findIndex(
    (group) => group.id === (selectedGroupId || questionsGroups[0].id)
  );

  if (selectedGroupIndex === -1) {
    return { data: null, error: 'Group not found' };
  }


  const { shuffleQuestionsInGroup } = testSettings;
  const selectedGroup = QG[selectedGroupIndex];
  const nextGroupId = QG[selectedGroupIndex + 1]?.id || null;
  const previousGroupId = QG[selectedGroupIndex - 1]?.id || null;
  const selectedGroupQuestions = questionsGroups.find(
    (group) => group.id === selectedGroup.id
  );
  const shuffledTestQuestions = shuffleQuestionsInGroup
    ? shiftArrayLeftByUUID(
        selectedGroupQuestions?.questions || [],
        userId as string
      )
    : selectedGroupQuestions?.questions;

  return {
    data: {
      type: 'GROUP',
      attemptId: attempt.id,
      testSettings,
      questionsGroups: questionsGroups.map((group) => ({
        id: group.id,
        questions:
          group.id === selectedGroup.id ? shuffledTestQuestions || [] : [],
      })),
      currentGroupId: selectedGroup.id,
      currentQuestionId: null,
      nextGroupId,
      previousGroupId,
    },
  };
};

export const handleAnswerLockWithBackNavigation = (
  questionId: string | undefined,
  QG: QG[],
  attempt: UserAttempt
): { data: QuestionFlowResponse | null; error?: string } => {
  const { userId, testAccess } = attempt;
  const {
    test: { settings: testSettings },
  } = testAccess;
  const { shuffleQuestionsInGroup } = testSettings;
  const testQuestions = QG.flatMap((qg) => qg.qOnQG.map((q) => q.question));
  const selectedQuestionId = questionId || testQuestions[0].id;
  const shuffledTestQuestions = shuffleQuestionsInGroup
    ? shiftArrayLeftByUUID(testQuestions, userId as string)
    : testQuestions;

  const selectedQuestionIndex = testQuestions.findIndex(
    (question) => question.id === selectedQuestionId
  );
  const selectedQuestion = shuffledTestQuestions[selectedQuestionIndex];

  return {
    data: {
      type: 'QUESTION',
      attemptId: attempt.id,
      testSettings,
      questionsGroups: [
        {
          id: 'all',
          questions: [selectedQuestion],
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
  QG: QG[],
  attempt: UserAttempt
): { data: GroupFlowResponse | null; error?: string } => {
  const {
    userId,
    testAccess: {
      test: { settings: testSettings },
    },
  } = attempt;
  const { shuffleQuestionsInGroup } = testSettings;
  const questionsGroups = QG.map((qg) => ({
    id: qg.id,
    name: qg.name,
    questions: qg.qOnQG.map((q) => q.question),
  }));
  const answeredGroups = questionsGroups.filter((group) =>
    group.questions.some((question) =>
      attempt.answers.some((answer) => answer.questionId === question.id)
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
      attemptId: attempt.id,
      testSettings,
      currentGroupId: null,
      currentQuestionId: null,
      nextGroupId: null,
      questionsGroups: [
        {
          ...nextGroup,
          questions: shuffleQuestionsInGroup
            ? shiftArrayLeftByUUID(nextGroup.questions, userId as string)
            : nextGroup.questions,
        },
      ],
    },
  };
};

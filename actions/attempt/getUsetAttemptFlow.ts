'use server';

import { getUserAttemptWithTestSettings } from '@actions/attempt/getUserAttempt';
import { shiftArrayLeftByUUID } from '@actions/attempt/helpers/shiftArrayLeft';

type NavOptions =
  | {
      groupId: string;
      questionId?: undefined;
    }
  | {
      groupId?: undefined;
      questionId: string;
    };

export const getUserAttemptFlow = async (
  testAccessId: string,
  navOptions?: NavOptions
) => {
  const userAttemptWithTestSettings =
    await getUserAttemptWithTestSettings(testAccessId);
  const { data: userAttempt, error } = userAttemptWithTestSettings;

  if (error || !userAttempt) {
    return { data: null, error };
  }
  const { userId, testAccess } = userAttempt;

  if (!userId) return { data: null, error: 'No userId provided' };

  const { settings, QG } = testAccess.test;
  const { navigationMode, allowGoBack, shuffleQuestionsInGroup } = settings;

  const questionsGroups = QG.map((qg) => ({
    id: qg.id,
    questions: qg.qOnQG.map((q) => q.question),
  }));

  if (allowGoBack) {
    const selectedGroupId = navOptions?.groupId || questionsGroups[0].id;

    if (navigationMode === 'GROUP_LOCK') {
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
          type: 'GROUP' as const,
          attemptId: userAttempt.id,
          testSettings:
            userAttemptWithTestSettings.data.testAccess.test.settings,
          questionsGroups: questionsGroups.map((group) => {
            if (group.id === selectedGroup.id) {
              return {
                id: group.id,
                questions: shiftArrayLeftByUUID(group.questions, userId),
              };
            }
            return {
              id: group.id,
              questions: [],
            };
          }),
          currentGroupId: selectedGroup.id,
          currentQuestionId: null,
          nextGroupId,
          previousGroupId,
        },
      };
    }

    if (navigationMode === 'ANSWER_LOCK') {
      const testQuestions = QG.flatMap((qg) => qg.qOnQG.map((q) => q.question));
      const selectedQuestionId = navOptions?.questionId || testQuestions[0].id;

      const shuffledTestQuestions = shuffleQuestionsInGroup
        ? shiftArrayLeftByUUID(testQuestions, userId)
        : testQuestions;

      const selectedQuestionIndex = testQuestions.findIndex(
        (question) => question.id === selectedQuestionId
      );
      const selectedQuestion = testQuestions[selectedQuestionIndex];
      const nextQuestionId =
        testQuestions[selectedQuestionIndex + 1]?.id || null;
      const previousQuestionId =
        testQuestions[selectedQuestionIndex - 1]?.id || null;

      return {
        data: {
          type: 'QUESTION' as const,
          attemptId: userAttempt.id,
          testSettings:
            userAttemptWithTestSettings.data.testAccess.test.settings,
          questionsGroups: [
            {
              id: 'all',
              questions: shuffledTestQuestions,
            },
          ],
          currentGroupId: null,
          currentQuestionId: selectedQuestion.id,
          nextQuestionId,
          previousQuestionId,
        },
      };
    }
  }

  if (navigationMode === 'GROUP_LOCK') {
    const answeredGroups = questionsGroups.filter((group) =>
      group.questions.some((question) =>
        userAttempt.answers.some((answer) => answer.questionId === question.id)
      )
    );

    const isAllQuestionsAnswered =
      answeredGroups.length === questionsGroups.length;

    if (isAllQuestionsAnswered) {
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
        attemptId: userAttempt.id,
        testSettings: userAttemptWithTestSettings.data.testAccess.test.settings,
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
  }
};

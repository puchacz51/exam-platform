'use server';

import { getUserAttemptWithTestSettings } from '@actions/attempt/getUserAttempt';

import {
  handleAnswerLockWithBackNavigation,
  handleGroupLockWithBackNavigation,
  handleGroupLockWithoutBack,
} from './navigationHandlers';
import { NavOptions } from '../../types/attempt';

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
    if (navigationMode === 'GROUP_LOCK') {
      return handleGroupLockWithBackNavigation(
        navOptions?.groupId || questionsGroups[0].id,
        QG,
        userId,
        userAttempt.id,
        userAttemptWithTestSettings.data.testAccess.test.settings,
        questionsGroups
      );
    }

    if (navigationMode === 'ANSWER_LOCK') {
      return handleAnswerLockWithBackNavigation(
        navOptions || { questionId: '' },
        QG,
        userId,
        userAttempt.id,
        userAttemptWithTestSettings.data.testAccess.test.settings,
        !!shuffleQuestionsInGroup
      );
    }
  }

  if (navigationMode === 'GROUP_LOCK') {
    return handleGroupLockWithoutBack(
      questionsGroups,
      userAttempt,
      userId,
      userAttempt.id,
      userAttemptWithTestSettings.data.testAccess.test.settings,
      !!shuffleQuestionsInGroup
    );
  }

  return { data: null, error: 'Unsupported navigation mode' };
};

export type UserAttemptFlowResponse = Awaited<
  ReturnType<typeof getUserAttemptFlow>
>;

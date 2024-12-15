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
  console.log('getUserAttemptFlow', testAccessId, navOptions);
  const userAttemptWithTestSettings =
    await getUserAttemptWithTestSettings(testAccessId);
  const { data: userAttempt, error } = userAttemptWithTestSettings;

  if (error || !userAttempt) {
    return { data: null, error };
  }

  const { userId, testAccess } = userAttempt;
  // const { timeLimit } = testAccess;
  if (!userId) return { data: null, error: 'No userId provided' };
  // const isTimeOver =
  //   timeLimit &&
  //   Date.now() > new Date(startedAt).getTime() + timeLimit * 60 * 1000;
  // const isTestFinished = userAttempt.finishedAt || isTimeOver;

  // if (isTestFinished) {
  //   return { data: null, error: 'Test is finished' };
  // }

  const { settings, QG } = testAccess.test;
  const { navigationMode, allowGoBack } = settings;
  if (allowGoBack) {
    if (navigationMode === 'GROUP_LOCK') {
      return handleGroupLockWithBackNavigation(
        navOptions?.groupId,
        QG,
        userAttempt
      );
    }

    if (navigationMode === 'ANSWER_LOCK') {
      return handleAnswerLockWithBackNavigation(
        navOptions?.questionId,
        QG,
        userAttempt
      );
    }
  }

  if (navigationMode === 'GROUP_LOCK') {
    return handleGroupLockWithoutBack(QG, userAttempt);
  }

  return { data: null, error: 'Unsupported navigation mode' };
};

export type UserAttemptFlowResponse = Awaited<
  ReturnType<typeof getUserAttemptFlow>
>;

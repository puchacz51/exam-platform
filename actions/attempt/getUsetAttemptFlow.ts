'use server';

import { getUserAttemptWithTestSettings } from '@actions/attempt/getUserAttempt';
import {
  handleGroupNavigation,
  handleQuestionNavigation,
} from '@actions/attempt/navigationHandlers';

import { NavOptions } from '../../types/attempt';

export const getUserAttemptFlow = async (
  testAccessId: string,
  navOptions?: NavOptions
) => {
  console.log('userAttempt', navOptions);

  const userAttemptWithTestSettings =
    await getUserAttemptWithTestSettings(testAccessId);
  const { data: userAttempt, error } = userAttemptWithTestSettings;


  if (error || !userAttempt) {
    return { data: null, error };
  }

  const { userId, testAccess, startedAt } = userAttempt;

  const { timeLimit } = testAccess;

  if (!userId) return { data: null, error: 'No userId provided' };
  const isTimeOver =
    timeLimit &&
    Date.now() > new Date(startedAt).getTime() + timeLimit * 60 * 1000;

  const isTestFinished = userAttempt.finishedAt || isTimeOver;

  if (isTestFinished) {
    return { data: null, error: 'Test is finished' };
  }

  const { settings, QG } = testAccess.test;
  const { questionDisplayMode } = settings;

  if (questionDisplayMode === 'GROUP') {
    return handleGroupNavigation(navOptions?.groupId, QG, userAttempt);
  }

  if (questionDisplayMode === 'SINGLE') {
    return handleQuestionNavigation(navOptions?.questionId, QG, userAttempt);
  }

  return { data: null, error: 'Unsupported navigation mode' };
};

export type UserAttemptFlowResponse = Awaited<
  ReturnType<typeof getUserAttemptFlow>
>;

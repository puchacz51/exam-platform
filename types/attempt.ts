import {
  QuestionGroups,
  UserAttemptAnswers,
} from '@actions/attempt/getUserAttempt';
import { SelectTestSettings } from '@schema/testSettings';

export type NavOptions =
  | {
      groupId: string;
      questionId?: undefined;
    }
  | {
      groupId?: undefined;
      questionId: string;
    };

export type GroupFlowResponse = {
  type: 'GROUP';
  attemptId: string;
  testSettings: SelectTestSettings;
  startAt: Date;
  questionsGroups: QuestionGroups[];
  duration: number;
  currentGroupId: string | null;
  currentQuestionId: null;
  nextGroupId: string | null;
  previousGroupId?: string | null;
  userAttemptAnswers: UserAttemptAnswers;
};

export type QuestionFlowResponse = {
  questionsIds: string[];
  type: 'QUESTION';
  attemptId: string;
  testSettings: SelectTestSettings;
  duration: number;
  startAt: Date;
  questionsGroups: QuestionGroups[];
  currentGroupId: null;
  currentQuestionId: string;
  nextQuestionId: string | null;
  previousQuestionId: string | null;
  userAttemptAnswers: UserAttemptAnswers;
};

export type FlowResponse = GroupFlowResponse | QuestionFlowResponse;

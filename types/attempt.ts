import { QuestionGroups } from '@actions/attempt/getUserAttempt';

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
  testSettings: any;
  questionsGroups: QuestionGroups[];
  currentGroupId: string | null;
  currentQuestionId: null;
  nextGroupId: string | null;
  previousGroupId?: string | null;
  userAttemptAnswers: any;
};

export type QuestionFlowResponse = {
  type: 'QUESTION';
  attemptId: string;
  testSettings: any;
  questionsGroups: QuestionGroups[];
  currentGroupId: null;
  currentQuestionId: string;
  nextQuestionId: string | null;
  previousQuestionId: string | null;
  userAttemptAnswers: any;
};

export type FlowResponse = GroupFlowResponse | QuestionFlowResponse;

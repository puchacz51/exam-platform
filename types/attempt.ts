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
  questionsGroups: Array<{
    id: string;
    questions: Array<any>;
  }>;
  currentGroupId: string | null;
  currentQuestionId: null;
  nextGroupId: string | null;
  previousGroupId?: string | null;
};

export type QuestionFlowResponse = {
  type: 'QUESTION';
  attemptId: string;
  testSettings: any; 
  questionsGroups: Array<{
    id: string;
    questions: Array<any>;
  currentGroupId: null;
  currentQuestionId: string;
  nextQuestionId: string | null;
  previousQuestionId: string | null;
};

export type FlowResponse = GroupFlowResponse | QuestionFlowResponse;

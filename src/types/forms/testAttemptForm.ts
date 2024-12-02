import {
  AnswerInput,
  BooleanGroupAnswerInput,
  ChoiceAnswerInput,
  MatchingAnswerInput,
  NumericGroupAnswerInput,
  OpenAnswerInput,
  OrderAnswerInput,
} from '@/types/answers/testAttemptAnswers';

export interface TestAttemptFormData {
  questions: {
    [questionId: string]: Omit<AnswerInput, 'questionId'>;
  };
}

export interface TestAttemptFormDataMultiChoice {
  questions: {
    [questionId: string]: ChoiceAnswerInput;
  };
}

export interface TestAttemptFormDataOpen {
  questions: {
    [questionId: string]: Omit<OpenAnswerInput, 'questionId'>;
  };
}

export interface TestAttemptFormDataMatching {
  questions: {
    [questionId: string]: Omit<MatchingAnswerInput, 'questionId'>;
  };
}

export interface TestAttemptFormDataOrder {
  questions: {
    [questionId: string]: Omit<OrderAnswerInput, 'questionId'>;
  };
}

export interface TestAttemptFormDataNumericGroup {
  questions: {
    [questionId: string]: Omit<NumericGroupAnswerInput, 'questionId'>;
  };
}

export interface TestAttemptFormDataBooleanGroup {
  questions: {
    [questionId: string]: Omit<BooleanGroupAnswerInput, 'questionId'>;
  };
}

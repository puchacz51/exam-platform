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

export interface TestAttemptFormDataMatching {
  questions: {
    [questionId: string]: Omit<MatchingAnswerInput, 'questionId'>;
  };
}

export interface TestAttemptFormDataNumericGroup {
  questions: {
    [questionId: string]: NumericGroupAnswerInput;
  };
}

export interface TestAttemptFormDataBooleanGroup {
  questions: {
    [questionId: string]: Omit<BooleanGroupAnswerInput, 'questionId'>;
  };
}

export interface TestAttemptFormDataSingleChoice {
  questions: {
    [questionId: string]: ChoiceAnswerInput;
  };
}

export interface TestAttemptFormDataNumeric {
  questions: {
    [questionId: string]: NumericGroupAnswerInput;
  };
}

export interface TestAttemptFormDataOrder {
  questions: {
    [questionId: string]: OrderAnswerInput;
  };
}

export interface TestAttemptFormDataBoolean {
  questions: {
    [questionId: string]: BooleanGroupAnswerInput;
  };
}

export interface TestAttemptFormDataOpen {
  questions: {
    [questionId: string]: OpenAnswerInput;
  };
}

import { QG, UserAttempt } from '@actions/attempt/getUserAttempt';

import { GroupFlowResponse, QuestionFlowResponse } from '../../types/attempt';
import { shiftArrayLeftByUUID } from './helpers/shiftArrayLeft';

const getShuffledQuestions = (
  questions: QG['qOnQG'][number]['question'][],
  shuffle: boolean,
  userId: string
) => (shuffle ? shiftArrayLeftByUUID(questions, userId) : questions);

export const handleGroupNavigation = (
  selectedGroupId: string | undefined,
  QG: QG[],
  attempt: UserAttempt
): { data: GroupFlowResponse | null; error?: string } => {
  const { userId, testAccess } = attempt;
  const { settings: testSettings } = testAccess.test;
  const { shuffleQuestionsInGroup, allowGoBack, showPointsPerQuestion } =
    testSettings;

  const questionsGroups = QG.map((qg) => ({
    id: qg.id,
    name: qg.name,
    questions: qg.qOnQG.map((q) => q.question),
  }));

  let selectedGroupIndex = QG.findIndex(
    (group) => group.id === selectedGroupId
  );
  if (selectedGroupIndex === -1) {
    selectedGroupIndex = 0;
  }

  const selectedGroup = questionsGroups[selectedGroupIndex];
  const shuffledQuestions = getShuffledQuestions(
    selectedGroup.questions,
    !!shuffleQuestionsInGroup,
    userId as string
  );

  const nextGroupId = questionsGroups[selectedGroupIndex + 1]?.id || null;

  const previousGroupId = allowGoBack
    ? questionsGroups[selectedGroupIndex - 1]?.id || null
    : null;
  const userAttemptAnswers = allowGoBack
    ? attempt.answers.map((a) => ({ ...a, points: null }))
    : attempt.answers;

  return {
    data: {
      type: 'GROUP',
      attemptId: attempt.id,
      duration: attempt.testAccess.timeLimit || 0,
      testSettings,
      startAt: attempt.startedAt,
      questionsGroups: [
        {
          id: selectedGroup.id,
          name: selectedGroup.name || '',
          questions: shuffledQuestions,
        },
      ],
      currentGroupId: selectedGroup.id,
      currentQuestionId: null,
      nextGroupId,
      previousGroupId,
      userAttemptAnswers: !showPointsPerQuestion ? [] : userAttemptAnswers,
    },
  };
};

export const handleQuestionNavigation = (
  questionId: string | undefined,
  QG: QG[],
  attempt: UserAttempt
): { data: QuestionFlowResponse | null; error?: string } => {
  const { userId, testAccess } = attempt;
  const { settings: testSettings } = testAccess.test;
  const { shuffleQuestionsInGroup, showPointsPerQuestion, allowGoBack } =
    testSettings;

  const allQuestions = QG.flatMap((qg) => qg.qOnQG.map((q) => q.question));
  const shuffledQuestions = getShuffledQuestions(
    allQuestions,
    !!shuffleQuestionsInGroup,
    userId as string
  );

  let selectedQuestionIndex = shuffledQuestions.findIndex(
    (question) => question.id === questionId
  );

  if (selectedQuestionIndex === -1) {
    selectedQuestionIndex = 0;
  }

  const selectedQuestion = shuffledQuestions[selectedQuestionIndex];
  const nextQuestionId = shuffledQuestions[selectedQuestionIndex + 1]?.id;
  const previousQuestionId =
    shuffledQuestions[selectedQuestionIndex - 1]?.id || null;

  const userAttemptAnswers = allowGoBack
    ? attempt.answers.map((a) => ({ ...a, points: null }))
    : attempt.answers;

  return {
    data: {
      type: 'QUESTION',
      attemptId: attempt.id,
      startAt: attempt.startedAt,
      duration: attempt.testAccess.timeLimit || 0,
      testSettings,
      questionsGroups: [
        {
          id: 'single',
          name: '',
          questions: [selectedQuestion],
        },
      ],
      currentGroupId: null,
      currentQuestionId: selectedQuestion.id,
      nextQuestionId,
      previousQuestionId,
      userAttemptAnswers: !showPointsPerQuestion ? [] : userAttemptAnswers,
    },
  };
};

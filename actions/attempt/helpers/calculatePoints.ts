import {
  AnswerInput,
  BooleanGroupAnswerInput,
  ChoiceAnswerInput,
  MatchingAnswerInput,
  NumericGroupAnswerInput,
  OrderAnswerInput,
} from '@/types/answers/testAttemptAnswers';
import { CompleteQuestion } from '@/types/test/test';
import { SelectTestSettings } from '@schema/testSettings';

interface CalculatePointsInput {
  questions: CompleteQuestion[];
  answers: AnswerInput[];
  settings: SelectTestSettings;
}

export const calculatePoints = ({
  questions,
  answers,
  settings,
}: CalculatePointsInput) =>
  questions.map((question) => {
    const { scoringSystem, allowPartialPoints } = settings;
    const { points } = question;
    const answer = answers.find((a) => a.questionId === question.id);

    if (!answer) {
      return null;
    }

    const accuracy = calculateQuestionAccuracy(question, answer);
    if (!accuracy) {
      return null;
    }

    const [correct, total] = accuracy;

    if (scoringSystem === 'STANDARD' && !allowPartialPoints) {
      return {
        questionId: question.id,
        points: correct >= total ? points : 0,
      };
    }

    if (scoringSystem === 'STANDARD' && allowPartialPoints) {
      return {
        questionId: question.id,
        points: (correct / total) * points,
      };
    }

    if (allowPartialPoints) {
      return {
        questionId: question.id,
        points: 2,
      };
    }

    return {
      questionId: question.id,
      points,
    };
  });

const calculateQuestionAccuracy = (
  question: CompleteQuestion,
  answer: AnswerInput
) => {
  switch (question.questionType) {
    case 'SINGLE_CHOICE':
    case 'MULTIPLE_CHOICE':
      return calculateChoiceAccuracy(question, answer as ChoiceAnswerInput);
    case 'MATCHING':
      return calculateMatchingAccuracy(question, answer as MatchingAnswerInput);
    case 'ORDER':
      return calculateOrderAccuracy(question, answer as OrderAnswerInput);
    case 'NUMERIC':
    case 'NUMERIC_GROUP':
      return calculateNumericAccuracy(
        question,
        answer as NumericGroupAnswerInput
      );
    case 'BOOLEAN':
    case 'BOOLEAN_GROUP':
      return calculateBooleanAccuracy(
        question,
        answer as BooleanGroupAnswerInput
      );
    default:
      return null;
  }
};

const calculateChoiceAccuracy = (
  question: CompleteQuestion,
  answer: ChoiceAnswerInput
) => {
  const correctAnswers = question.answers?.filter((a) => a.isCorrect) || [];
  const correctAnswerIds = correctAnswers.map((a) => a.id);
  const userAnswerIds = answer.answers.map((a) => a.answerId);
  const correct = correctAnswerIds.filter((id) => userAnswerIds.includes(id));

  return [correct.length, correctAnswers.length];
};

const calculateMatchingAccuracy = (
  question: CompleteQuestion,
  answer: MatchingAnswerInput
) => {
  const correctPairs =
    question.matchingPairs?.filter((pair) => {
      const userPair = answer.pairs.find(
        (p) => p.key === pair.key && p.value === pair.value
      );
      return userPair?.key === pair.key && userPair?.value === pair.value;
    }) || [];

  return [correctPairs.length, question.matchingPairs?.length || 0];
};

const calculateOrderAccuracy = (
  question: CompleteQuestion,
  answer: OrderAnswerInput
) => {
  const correctOrder = question.orderItems?.map((item) => item.id) || [];
  const userOrder = answer.items
    .sort((a, b) => a?.position - b?.position)
    .map((item) => item.itemId);
  const correct = correctOrder.filter((id, index) => id === userOrder[index]);

  return [correct.length, correctOrder.length];
};

const calculateNumericAccuracy = (
  question: CompleteQuestion,
  answer: NumericGroupAnswerInput
) => {
  const correctAnswers = question.groupSubQuestions || [];
  const correct = correctAnswers.filter((a) => {
    const userAnswer = answer.answers.find((ua) => ua.subQuestionId === a.id);
    return (
      (userAnswer?.value || 0) - (a?.numericAnswer || 0) < (a.tolerance || 0)
    );
  });

  return [correct.length, correctAnswers.length];
};

const calculateBooleanAccuracy = (
  question: CompleteQuestion,
  answer: BooleanGroupAnswerInput
) => {
  const correctAnswers = question.groupSubQuestions || [];
  const correct = correctAnswers.filter((a) => {
    const userAnswer = answer.answers.find((ua) => ua.subQuestionId === a.id);
    return userAnswer?.value === a.booleanAnswer;
  });

  return [correct.length, correctAnswers.length];
};

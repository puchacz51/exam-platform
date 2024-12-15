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
      return {
        questionId: question.id,
        points: 0,
      };
    }

    const accuracy = calculateQuestionAccuracy(question, answer);
    if (!accuracy) {
      return {
        questionId: question.id,
        points: 0,
      };
    }

    console.log('accuracy', accuracy);

    const scoreRatio =
      Math.max(accuracy.correct - accuracy.incorrect, 0) / accuracy.total;

    if (scoringSystem === 'STANDARD') {
      if (!allowPartialPoints) {
        return {
          questionId: question.id,
          points: scoreRatio === 1 ? points : 0,
        };
      }
      return {
        questionId: question.id,
        points: Math.round(scoreRatio * points * 100) / 100,
      };
    }

    const negativeScoreRatio = scoreRatio - accuracy.incorrect / accuracy.total;

    if (scoringSystem === 'NEGATIVE') {
      if (!allowPartialPoints) {
        return {
          questionId: question.id,
          points: negativeScoreRatio === 1 ? points : 0,
        };
      }
      return {
        questionId: question.id,
        points:
          negativeScoreRatio === 1
            ? points
            : Math.round(negativeScoreRatio * points * 100) / 100,
      };
    }

    return {
      questionId: question.id,
      points: 0,
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
  const correctCount = correctAnswerIds.filter((id) =>
    userAnswerIds.includes(id)
  ).length;
  const total = question.answers?.length || 0;

  return {
    correct: correctCount,
    incorrect: total - correctCount,
    total,
  };
};

const calculateMatchingAccuracy = (
  question: CompleteQuestion,
  answer: MatchingAnswerInput
) => {
  const total = question.matchingPairs?.length || 0;
  const correctCount =
    question.matchingPairs?.filter((pair) => {
      const userPair = answer.pairs.find(
        (p) => p.key === pair.key && p.value === pair.value
      );
      return userPair?.key === pair.key && userPair?.value === pair.value;
    }).length || 0;

  return {
    correct: correctCount,
    incorrect: total - correctCount,
    total,
  };
};

const calculateOrderAccuracy = (
  question: CompleteQuestion,
  answer: OrderAnswerInput
) => {
  const correctOrder = question.orderItems?.map((item) => item.id) || [];
  const userOrder = answer.items
    .sort((a, b) => a?.position - b?.position)
    .map((item) => item.itemId);
  const correctCount = correctOrder.filter(
    (id, index) => id === userOrder[index]
  ).length;
  const total = correctOrder.length;

  return {
    correct: correctCount,
    incorrect: total - correctCount,
    total,
  };
};

const calculateNumericAccuracy = (
  question: CompleteQuestion,
  answer: NumericGroupAnswerInput
) => {
  const correctAnswers = question.groupSubQuestions || [];
  const correctCount = correctAnswers.filter((a) => {
    const userAnswer = answer.answers.find((ua) => ua.subQuestionId === a.id);
    return (
      Math.abs((userAnswer?.value || 0) - (a?.numericAnswer || 0)) <=
      (a.tolerance || 0)
    );
  }).length;
  const total = question.groupSubQuestions?.length || 0;

  return {
    correct: correctCount,
    incorrect: total - correctCount,
    total,
  };
};

const calculateBooleanAccuracy = (
  question: CompleteQuestion,
  answer: BooleanGroupAnswerInput
) => {
  console.log('question', question);
  console.log('answer', answer);
  const subQuestions = question.groupSubQuestions || [];
  const total = subQuestions.length || 1;
  let correctCount = 0;
  let incorrectCount = 0;

  subQuestions.forEach((subQuestion) => {
    const userAnswer = answer.answers.find(
      (ua) => ua.subQuestionId === subQuestion.id
    );
    if (userAnswer) {
      if (userAnswer.value === subQuestion.booleanAnswer) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    } else {
      // If no answer provided, consider it incorrect
      incorrectCount += 1;
    }
  });

  return {
    correct: correctCount,
    incorrect: incorrectCount,
    total,
  };
};

'use server';

import { answersTable } from '@schema/answers';
import { orderItemsTable } from '@schema/orderItems';
import { matchingPairsTable } from '@schema/matchingPairs';
import { groupSubQuestionsTable } from '@schema/groupSubQuestions';
import { Tx } from '@actions/test/createTest';
import {
  BooleanGroupQuestion,
  BooleanQuestion,
  MatchingQuestion,
  MultipleChoiceQuestion,
  NumericGroupQuestion,
  NumericQuestion,
  OpenQuestion,
  OrderQuestion,
  Question,
  SingleChoiceQuestion,
} from '@/types/test-creator/question';

export const createQuestionTypeSpecificData = async (
  tx: Tx,
  question: Question,
  questionId: string
) => {
  switch (question.questionType) {
    case 'OPEN':
      await handleOpenQuestion(tx, question as OpenQuestion, questionId);
      break;
    case 'SINGLE_CHOICE':
    case 'MULTIPLE_CHOICE':
      await handleChoiceQuestion(
        tx,
        question as SingleChoiceQuestion | MultipleChoiceQuestion,
        questionId
      );
      break;
    case 'ORDER':
      await handleOrderQuestion(tx, question as OrderQuestion, questionId);
      break;
    case 'BOOLEAN':
      await handleBooleanQuestion(tx, question as BooleanQuestion, questionId);
      break;
    case 'NUMERIC':
      await handleNumericQuestion(tx, question as NumericQuestion, questionId);
      break;
    case 'BOOLEAN_GROUP':
      await handleBooleanGroupQuestion(
        tx,
        question as BooleanGroupQuestion,
        questionId
      );
      break;
    case 'NUMERIC_GROUP':
      await handleNumericGroupQuestion(
        tx,
        question as NumericGroupQuestion,
        questionId
      );
      break;
    case 'MATCHING':
      await handleMatchingQuestion(
        tx,
        question as MatchingQuestion,
        questionId
      );
      break;
  }
};

export const handleOpenQuestion = async (
  tx: Tx,
  question: OpenQuestion,
  questionId: string
) => {
  if (question.answers && question.answers.length > 0) {
    await tx.insert(answersTable).values({
      questionId,
      text: question.answers[0].text,
      isCorrect: true,
    });
  }
};

export const handleChoiceQuestion = async (
  tx: Tx,
  question: SingleChoiceQuestion | MultipleChoiceQuestion,
  questionId: string
) => {
  const answersToInsert = question.answers.map((answer, index) => ({
    text: answer.text,
    isCorrect: answer.isCorrect,
    order: index,
    questionId,
  }));

  await tx.insert(answersTable).values(answersToInsert);
};

export const handleOrderQuestion = async (
  tx: Tx,
  question: OrderQuestion,
  questionId: string
) => {
  const itemsToInsert = question.orderItems.map((item) => ({
    questionId,
    text: item.text,
    order: item.order,
  }));

  await tx.insert(orderItemsTable).values(itemsToInsert);
};

export const handleBooleanQuestion = async (
  tx: Tx,
  question: BooleanQuestion,
  questionId: string
) => {
  await tx.insert(answersTable).values({
    questionId,
    text: question.correctAnswer.toString(),
    isCorrect: true,
  });
};

export const handleNumericQuestion = async (
  tx: Tx,
  question: NumericQuestion,
  questionId: string
) => {
  await tx.insert(groupSubQuestionsTable).values({
    questionId,
    text: question.text,
    type: 'NUMERIC',
    numericAnswer: question.correctAnswer,
    tolerance: question.tolerance,
  });
};

export const handleBooleanGroupQuestion = async (
  tx: Tx,
  question: BooleanGroupQuestion,
  questionId: string
) => {
  const subQuestionsToInsert = question.subQuestions.map(
    (subQuestion, index) =>
      ({
        questionId,
        text: subQuestion.text,
        type: 'BOOLEAN',
        booleanAnswer: subQuestion.correctAnswer,
        order: subQuestion.order ?? index,
      }) as const
  );

  await tx.insert(groupSubQuestionsTable).values(subQuestionsToInsert);
};

export const handleNumericGroupQuestion = async (
  tx: Tx,
  question: NumericGroupQuestion,
  questionId: string
) => {
  const subQuestionsToInsert = question.subQuestions.map(
    (subQuestion, index) =>
      ({
        questionId,
        text: subQuestion.text,
        type: 'NUMERIC',
        numericAnswer: subQuestion.correctAnswer,
        tolerance: subQuestion.numericTolerance,
        order: subQuestion.order ?? index,
      }) as const
  );

  await tx.insert(groupSubQuestionsTable).values(subQuestionsToInsert);
};

export const handleMatchingQuestion = async (
  tx: Tx,
  question: MatchingQuestion,
  questionId: string
) => {
  const pairsToInsert = question.matchingPairs.map((pair) => ({
    questionId,
    key: pair.key,
    value: pair.value,
  }));

  await tx.insert(matchingPairsTable).values(pairsToInsert);
};

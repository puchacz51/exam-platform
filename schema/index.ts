import { usersRelations, usersTable } from '@schema/users';
import {
  verificationTokensRelations,
  verificationTokensTable,
} from '@schema/email_verification_tokens';
import {
  matchingPairsRelations,
  matchingPairsTable,
} from '@schema/matchingPairs';
import {
  questionGroupRelations,
  questionGroupsTable,
} from '@schema/questionGroups';
import { orderItemsRelations, orderItemsTable } from '@schema/orderItems';
import { answerRelations, answersTable } from '@schema/answers';
import { questionRelations, questionsTable } from '@schema/questions';
import { categoriesRelations, categoriesTable } from '@schema/categories';
import { testsRelations, testsTable } from '@schema/test';
import {
  questionOnQuestionGroupRelations,
  questionOnQuestionGroupTable,
} from '@schema/questionOnQuestionGroup';
import { testSettingsRelations, testSettingsTable } from '@schema/testSettings';
import {
  groupSubQuestionsRelations,
  groupSubQuestionsTable,
} from '@schema/groupSubQuestions';
import { groupsRelations, groupsTable } from '@schema/groups';
import { userGroupsRelations, userGroupsTable } from '@schema/userGroups';
import {
  testAccessGroupsRelations,
  testAccessGroupsTable,
} from '@schema/testAccessGroups';
import {
  attemptAnswersRelations,
  attemptAnswersTable,
} from '@schema/attemptAnswers';
import {
  booleanAnswerRelations,
  booleanAnswersTable,
  choiceAnswerRelations,
  choiceAnswersTable,
  matchingAnswerRelations,
  matchingAnswersTable,
  numericAnswerRelations,
  numericAnswersTable,
  openAnswerRelations,
  openAnswersTable,
  orderAnswerRelations,
  orderAnswersTable,
} from '@schema/attemptAnswerDetails';
import {
  testAccessConfigRelations,
  testAccessConfigTable,
} from '@schema/testAccess';
import { testAttemptsRelations, testAttemptsTable } from '@schema/testAttempt';

export const schema = {
  // Tables
  answers: answersTable,
  attemptAnswers: attemptAnswersTable,
  booleanAnswers: booleanAnswersTable,
  categories: categoriesTable,
  choiceAnswers: choiceAnswersTable,
  groupSubQuestions: groupSubQuestionsTable,
  groups: groupsTable,
  matchingAnswers: matchingAnswersTable,
  matchingPairs: matchingPairsTable,
  numericAnswers: numericAnswersTable,
  openAnswers: openAnswersTable,
  orderAnswers: orderAnswersTable,
  orderItems: orderItemsTable,
  questionGroups: questionGroupsTable,
  questionOnQuestionGroup: questionOnQuestionGroupTable,
  questions: questionsTable,
  testAccess: testAccessConfigTable,
  testAccessGroups: testAccessGroupsTable,
  testAttempts: testAttemptsTable,
  tests: testsTable,
  testSettings: testSettingsTable,
  userGroups: userGroupsTable,
  users: usersTable,
  verificationTokens: verificationTokensTable,

  answerRelations,
  attemptAnswersRelations,
  booleanAnswerRelations,
  categoriesRelations,
  choiceAnswerRelations,
  groupsRelations,
  groupSubQuestionsRelations,
  matchingAnswerRelations,
  matchingPairsRelations,
  numericAnswerRelations,
  openAnswerRelations,
  orderAnswerRelations,
  orderItemsRelations,
  questionGroupRelations,
  questionOnQuestionGroupRelations,
  questionRelations,
  testAccessConfigRelations,
  testAccessGroupsRelations,
  testAttemptsRelations,
  testsRelations,
  testSettingsRelations,
  userGroupsRelations,
  usersRelations,
  verificationTokensRelations,
};

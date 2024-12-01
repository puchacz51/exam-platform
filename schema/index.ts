import { usersRelations, usersTable } from '@schema/users';
import { emailVerificationTokensTable } from '@schema/email_verification_tokens';
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
  attemptAnswerRelations,
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
} from '@schema/TestAccess';
import { testAttemptsRelations, testAttemptsTable } from '@schema/testAttempt';

export const schema = {
  users: usersTable,
  email_verification_tokens: emailVerificationTokensTable,
  tests: testsTable,
  categories: categoriesTable,
  questions: questionsTable,
  matchingPairs: matchingPairsTable,
  questionGroups: questionGroupsTable,
  answers: answersTable,
  orderItems: orderItemsTable,
  questionOnQuestionGroup: questionOnQuestionGroupTable,
  testSettings: testSettingsTable,
  groupSubQuestions: groupSubQuestionsTable,
  groups: groupsTable,
  userGroups: userGroupsTable,
  testAccessGroups: testAccessGroupsTable,
  testAttempts: testAttemptsTable,
  attemptAnswers: attemptAnswersTable,
  openAnswers: openAnswersTable,
  choiceAnswers: choiceAnswersTable,
  matchingAnswers: matchingAnswersTable,
  orderAnswers: orderAnswersTable,
  testAccess: testAccessConfigTable,
  numericAnswers: numericAnswersTable,
  booleanAnswers: booleanAnswersTable,
  usersRelations,
  testsRelations,
  matchingPairsRelations,
  questionGroupRelations,
  orderItemsRelations,
  answerRelations,
  questionRelations,
  categoriesRelations,
  questionOnQuestionGroupRelations,
  testSettingsRelations,
  groupSubQuestionsRelations,
  groupsRelations,
  userGroupsRelations,
  testAccessGroupsRelations,
  testAttemptsRelations,
  attemptAnswerRelations,
  attemptAnswersRelations,
  openAnswerRelations,
  choiceAnswerRelations,
  matchingAnswerRelations,
  orderAnswerRelations,
  numericAnswerRelations,
  booleanAnswerRelations,
  testAccessConfigRelations,
};

import { usersTable } from '@schema/users';
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
};

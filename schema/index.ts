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
import {
  numericQuestionsRelations,
  numericQuestionsTable,
} from '@schema/numericQuestion';
import { answerRelations, answersTable } from '@schema/answers';
import { questionRelations, questionsTable } from '@schema/questions';
import { categoriesRelations, categoriesTable } from '@schema/categories';
import { testsRelations, testsTable } from '@schema/test';
import {
  questionOnQuestionGroupRelations,
  questionOnQuestionGroupTable,
} from '@schema/questionOnQuestionGroup';
import {
  booleanGroupSubQuestionsRelations,
  booleanGroupSubQuestionsTable,
} from './booleanGroupQuestion';
import { numericGroupSubQuestionsRelations } from './numericGroupQuestion';

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
  numericQuestions: numericQuestionsTable,
  questionOnQuestionGroup: questionOnQuestionGroupTable,
  booleanGroupSubQuestionsTable,
  numericQuestionsTable,
  testsRelations,
  matchingPairsRelations,
  questionGroupRelations,
  orderItemsRelations,
  numericQuestionsRelations,
  answerRelations,
  questionRelations,
  categoriesRelations,
  questionOnQuestionGroupRelations,
  booleanGroupSubQuestionsRelations,
  numericGroupSubQuestionsRelations,
};

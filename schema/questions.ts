import {
  boolean,
  pgEnum,
  pgTable,
  real,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { matchingPairsTable } from '@schema/matchingPairs';
import { categoriesTable } from '@schema/categories';
import { answersTable } from '@schema/answers';
import { orderItemsTable } from '@schema/orderItems';
import { groupSubQuestionsTable } from '@schema/groupSubQuestions';
import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';

export const questionTypeEnum = pgEnum('question_type', [
  'OPEN',
  'SINGLE_CHOICE',
  'MULTIPLE_CHOICE',
  'ORDER',
  'BOOLEAN',
  'NUMERIC',
  'MATCHING',
  'BOOLEAN_GROUP',
  'NUMERIC_GROUP',
]);

export const questionsTable = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  text: text('text').notNull(),
  questionType: questionTypeEnum('question_type').notNull(),
  isPublic: boolean('is_public').default(false),
  categoryId: uuid('category_id').references(() => categoriesTable.id),
  points: real('points').notNull().default(1),
});

export const questionRelations = relations(questionsTable, ({ one, many }) => ({
  questionOnQuestionGroup: many(questionOnQuestionGroupTable),
  category: one(categoriesTable, {
    fields: [questionsTable.categoryId],
    references: [categoriesTable.id],
  }),
  answers: many(answersTable),
  orderItems: many(orderItemsTable),
  matchingPairs: many(matchingPairsTable),
  groupSubQuestions: many(groupSubQuestionsTable),
}));

export type InsertQuestion = typeof questionsTable.$inferInsert;
export type SelectQuestion = typeof questionsTable.$inferSelect;

import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { matchingPairsTable } from '@schema/matchingPairs';
import { categoriesTable } from '@schema/categories';
import { questionGroupsTable } from '@schema/questionGroups';
import { answersTable } from '@schema/answers';
import { orderItemsTable } from '@schema/orderItems';
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
  groupId: uuid('group_id').references(() => questionGroupsTable.id, {
    onDelete: 'cascade',
  }),
  text: text('text').notNull(),
  questionType: questionTypeEnum('question_type').notNull(),
  isPublic: boolean('is_public').default(false),
  categoryId: uuid('category_id').references(() => categoriesTable.id),
  points: real('points').notNull().default(1),
});

export const questionRelations = relations(questionsTable, ({ one, many }) => ({
  group: one(questionGroupsTable, {
    fields: [questionsTable.groupId],
    references: [questionGroupsTable.id],
  }),
  category: one(categoriesTable, {
    fields: [questionsTable.categoryId],
    references: [categoriesTable.id],
  }),
  answers: many(answersTable),
  questionOnQuestionGroup: many(questionOnQuestionGroupTable),
  orderItems: many(orderItemsTable),
  numericQuestions: one(questionsTable, {
    fields: [questionsTable.id],
    references: [questionsTable.id],
  }),
  matchingPairs: many(matchingPairsTable),
}));

export type InsertQuestion = typeof questionsTable.$inferInsert;
export type SelectQuestion = typeof questionsTable.$inferSelect;

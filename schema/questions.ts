import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionGroupsTable } from './questionGroups';
import { categoriesTable } from './categories';
import { answersTable } from './answers';
import { questionOnQuestionGroupTable } from './questionOnQuestionGroup';
import { orderItemsTable } from './orderItems';

export const questionTypeEnum = pgEnum('question_type', [
  'OPEN',
  'SINGLE_CHOICE',
  'MULTIPLE_CHOICE',
  'ORDER',
  'BOOLEAN',
  'NUMERIC',
  'MATCHING',
]);

export const questionsTable = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id').references(() => questionGroupsTable.id),
  text: text('text').notNull(),
  questionType: questionTypeEnum('question_type').notNull(),
  order: integer('order'),
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
}));

export type InsertQuestion = typeof questionsTable.$inferInsert;
export type SelectQuestion = typeof questionsTable.$inferSelect;

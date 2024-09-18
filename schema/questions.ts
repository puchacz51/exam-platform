import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionGroupsTable } from './questionGroups';
import { categoriesTable } from './categories';

export const questionTypeEnum = pgEnum('question_type', [
  'open',
  'closed',
  'scale',
  'matrix',
  'order',
  'boolean',
]);

export const questionsTable = pgTable('questions', {
  id: serial('id').primaryKey(),
  groupID: integer('group_id').references(() => questionGroupsTable.id),
  text: text('text'),
  questionTypeID: questionTypeEnum('question_type').notNull(),
  order: integer('order'),
  isPublic: boolean('is_public'),
  categoryID: integer('category_id').references(() => categoriesTable.id),
});

export const questionRelations = relations(questionsTable, ({ many }) => ({
  questions: many(questionsTable),
}));

export type InsertQuestion = typeof questionsTable.$inferInsert;
export type SelectQuestion = typeof questionsTable.$inferSelect;

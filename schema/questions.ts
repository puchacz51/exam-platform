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
import { answersTable } from './answers';

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
  text: text('text').notNull(),
  questionType: questionTypeEnum('question_type').notNull(),
  order: integer('order'),
  isPublic: boolean('is_public').default(false),
  categoryID: integer('category_id').references(() => categoriesTable.id),
});

export const questionRelations = relations(questionsTable, ({ one, many }) => ({
  group: one(questionGroupsTable, {
    fields: [questionsTable.groupID],
    references: [questionGroupsTable.id],
  }),
  category: one(categoriesTable, {
    fields: [questionsTable.categoryID],
    references: [categoriesTable.id],
  }),
  answers: many(answersTable),
}));

export type InsertQuestion = typeof questionsTable.$inferInsert;
export type SelectQuestion = typeof questionsTable.$inferSelect;

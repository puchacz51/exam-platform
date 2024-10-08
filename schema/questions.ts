import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionGroupsTable } from './questionGroups';
import { categoriesTable } from './categories';
import { answersTable } from './answers';
import { questionOnQuestionGroup } from './questionOnQuestionGroup';

export const questionTypeEnum = pgEnum('question_type', [
  'OPEN',
  'SINGLE_CHOICE',
  'MULTIPLE_CHOICE',
  'ORDER',
  'BOOLEAN',
  'NUMERIC',
]);

export const questionsTable = pgTable('questions', {
  id: uuid('id').primaryKey(),
  groupId: integer('group_id').references(() => questionGroupsTable.id),
  text: text('text').notNull(),
  questionType: questionTypeEnum('question_type').notNull(),
  order: integer('order'),
  isPublic: boolean('is_public').default(false),
  categoryId: integer('category_id').references(() => categoriesTable.id),
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
  questionOnQuestionGroup: many(questionOnQuestionGroup),
}));

export type InsertQuestion = typeof questionsTable.$inferInsert;
export type SelectQuestion = typeof questionsTable.$inferSelect;
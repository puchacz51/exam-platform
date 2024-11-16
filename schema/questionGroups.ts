import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';

import { testsTable } from './test';

export const questionGroupsTable = pgTable('question_groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  testId: uuid('test_id').references(() => testsTable.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 256 }),
  maxQuestionPerPage: integer('max_question_per_page'),
});

export const questionGroupRelations = relations(
  questionGroupsTable,
  ({ one, many }) => ({
    test: one(testsTable, {
      fields: [questionGroupsTable.testId],
      references: [testsTable.id],
    }),
    questionOnQuestionGroup: many(questionOnQuestionGroupTable),
  })
);

export type InsertQuestionGroup = typeof questionGroupsTable.$inferInsert;
export type SelectQuestionGroup = typeof questionGroupsTable.$inferSelect;

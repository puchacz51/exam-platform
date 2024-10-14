import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { testsTable } from './test';
import { questionsTable } from './questions';

export const questionGroupsTable = pgTable('question_groups', {
  id: uuid('id').primaryKey(),
  testId: uuid('test_id').references(() => testsTable.id),
  name: varchar('name', { length: 256 }),
  order: integer('order'),
  maxQuestionPerPage: integer('max_question_per_page'),
});

export const questionGroupRelations = relations(
  questionGroupsTable,
  ({ one, many }) => ({
    test: one(testsTable, {
      fields: [questionGroupsTable.testId],
      references: [testsTable.id],
    }),
    questions: many(questionsTable),
  })
);

export type InsertQuestionGroup = typeof questionGroupsTable.$inferInsert;
export type SelectQuestionGroup = typeof questionGroupsTable.$inferSelect;

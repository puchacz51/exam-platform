import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { testsTable } from './test';
import { questionsTable } from './questions';

export const questionGroupsTable = pgTable('question_groups', {
  id: serial('id').primaryKey(),
  testID: integer('test_id').references(() => testsTable.id),
  name: varchar('name', { length: 256 }),
  order: integer('order'),
});

export const questionGroupRelations = relations(
  questionGroupsTable,
  ({ one, many }) => ({
    test: one(testsTable, {
      fields: [questionGroupsTable.testID],
      references: [testsTable.id],
    }),
    questions: many(questionsTable),
  })
);

export type InsertQuestionGroup = typeof questionGroupsTable.$inferInsert;
export type SelectQuestionGroup = typeof questionGroupsTable.$inferSelect;

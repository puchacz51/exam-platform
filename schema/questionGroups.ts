import { pgTable, smallint, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionOnQuestionGroupTable } from '@schema/questionOnQuestionGroup';
import { testsTable } from '@schema/test';

export const questionGroupsTable = pgTable('question_groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  testId: uuid('test_id').references(() => testsTable.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 256 }),
  order: smallint('order'),
});

export const questionGroupRelations = relations(
  questionGroupsTable,
  ({ one, many }) => ({
    test: one(testsTable, {
      fields: [questionGroupsTable.testId],
      references: [testsTable.id],
    }),
    qOnQG: many(questionOnQuestionGroupTable),
  })
);

export type InsertQuestionGroup = typeof questionGroupsTable.$inferInsert;
export type SelectQuestionGroup = typeof questionGroupsTable.$inferSelect;

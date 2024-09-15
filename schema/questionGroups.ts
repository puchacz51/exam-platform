import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import { testsTable } from './test';

export const questionGroupsTable = pgTable('question_groups', {
  id: serial('id').primaryKey(),
  testID: integer('test_id').references(() => testsTable.id),
  name: varchar('name', { length: 256 }),
  order: integer('order'),
});

export type InsertQuestionGroup = typeof questionGroupsTable.$inferInsert;
export type SelectQuestionGroup = typeof questionGroupsTable.$inferSelect;
